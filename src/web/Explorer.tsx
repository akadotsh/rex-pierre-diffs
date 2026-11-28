import * as stylex from "@stylexjs/stylex";
import { styles } from "./styles";
import React, { useCallback, useEffect, useRef, useState } from "react";
import { marked } from "marked";
import DOMPurify from "dompurify";
import { createPortal } from "react-dom";
import { File, Virtualizer } from "@pierre/diffs/react";
import type { LineAnnotation, SelectedLineRange } from "@pierre/diffs";
import { prepareFileTreeInput, type GitStatusEntry } from "@pierre/trees";
import { FileTree, useFileTree } from "@pierre/trees/react";

type Listing = { paths: string[]; statuses: Record<string, string> };
const editorBackground = (theme: "dark" | "light") => theme === "light" ? "#ffffff" : "#19191b";
const fileOptions = (theme: "dark" | "light", onPostRender: (node: HTMLElement) => void) => ({
  theme: theme === "light" ? "pierre-light" : "pierre-dark",
  themeType: theme,
  overflow: "scroll" as const,
  onPostRender,
  unsafeCSS: `:host { --diffs-bg: ${editorBackground(theme)}; } [data-code] { scrollbar-width: none; } [data-code]::-webkit-scrollbar { display: none; }`,
});
export function Explorer({ sidebar, token, active, theme, onSelect }: { sidebar: HTMLElement; token: string; active: boolean; theme: "dark" | "light"; onSelect: () => void }) {
  const [listing, setListing] = useState<Listing>();
  const [error, setError] = useState("");
  const [tabState, setTabState] = useState<{ open: string[]; active?: string }>({ open: [] });
  const { open: tabs, active: selected } = tabState;
  const [file, setFile] = useState<{ name: string; contents: string }>();
  const [previewError, setPreviewError] = useState("");
  const [revision, setRevision] = useState(0);
  const [selectedLines, setSelectedLines] = useState<SelectedLineRange | null>(null);
  const [question, setQuestion] = useState("");
  const [targets, setTargets] = useState<{id:string;label:string;agent:string}[]>([]);
  const [target, setTarget] = useState("");
  const [messageStatus, setMessageStatus] = useState("");
  const [markdownPreview, setMarkdownPreview] = useState(true);
  const [codeElement, setCodeElement] = useState<HTMLElement | null>(null);
  const [scrollWidth, setScrollWidth] = useState(0);
  const [gutterWidth, setGutterWidth] = useState(0);
  const horizontalScroll = useRef<HTMLDivElement>(null);
  const captureCode = useCallback((node: HTMLElement) => {
    setCodeElement(node.shadowRoot?.querySelector<HTMLElement>("[data-code]") ?? null);
  }, []);
  useEffect(() => {
    const bar = horizontalScroll.current;
    if (!codeElement || !bar) return;
    const measure = () => {
      const gutter = codeElement.querySelector<HTMLElement>("[data-gutter]");
      setGutterWidth(gutter?.getBoundingClientRect().width ?? 0);
      const overflow = codeElement.scrollWidth - codeElement.clientWidth;
      setScrollWidth(overflow > 0 ? overflow + bar.clientWidth : 0);
    };
    const sync = () => { bar.scrollLeft = codeElement.scrollLeft; };
    const resize = new ResizeObserver(measure);
    resize.observe(codeElement);
    resize.observe(bar);
    const mutations = new MutationObserver(measure);
    mutations.observe(codeElement, { childList: true, subtree: true, characterData: true });
    codeElement.addEventListener("scroll", sync, { passive: true });
    measure();
    sync();
    return () => { resize.disconnect(); mutations.disconnect(); codeElement.removeEventListener("scroll", sync); };
  }, [codeElement]);
  const activeTabRef = useRef<HTMLButtonElement>(null);
  function openFile(path: string) {
    setTabState(current => ({
      open: current.open.includes(path) ? current.open : [...current.open, path],
      active: path,
    }));
    if (selected !== path) setSelectedLines(null);
    onSelect();
  }
  function closeFile(path: string) {
    setTabState(current => {
      const index = current.open.indexOf(path);
      if (index < 0) return current;
      const open = current.open.filter(item => item !== path);
      return {
        open,
        active: current.active === path ? open[index] ?? open[index - 1] : current.active,
      };
    });
    if (selected === path) {
      setSelectedLines(null);
      onSelect();
    }
  }
  useEffect(() => {
    activeTabRef.current?.scrollIntoView({ block: "nearest", inline: "nearest" });
  }, [selected]);
  const request = (url: string, signal: AbortSignal) => fetch(url, { signal, headers: { "x-review-token": token } }).then(async response => {
    const data = await response.json();
    if (!response.ok) throw new Error(data.error || "Could not load repository");
    return data;
  });
  const { model } = useFileTree({ paths: [], icons: { set: "standard", colored: false }, initialExpansion: "closed", renaming: false, dragAndDrop: false,
    onSelectionChange: paths => { const path = paths[paths.length - 1]; if (path && model.getItem(path)?.isDirectory() === false) openFile(path); },
    unsafeCSS: ":host { font-family: -apple-system, BlinkMacSystemFont, sans-serif; }",
  });
  const previousPaths = useRef("");
  useEffect(() => {
    const controller = new AbortController();
    let sequence = 0;
    const load = () => {
      const current = ++sequence;
      void request("/api/files", controller.signal).then(data => {
        if (current !== sequence) return;
        setListing(data); setError(""); setRevision(value => value + 1);
      }).catch(error => { if (!controller.signal.aborted) setError(String(error.message)); });
    };
    load();
    const events = new EventSource("/events");
    events.onmessage = load;
    return () => { controller.abort(); events.close(); };
  }, []);
  useEffect(() => {
    if (!listing) return;
    const key = JSON.stringify(listing.paths);
    if (key !== previousPaths.current) {
      const expanded = model.getVisibleRows(0, model.getVisibleCount()).filter(row => row.kind === "directory" && row.isExpanded).map(row => row.path);
      model.resetPaths({ preparedInput: prepareFileTreeInput(listing.paths), initialExpandedPaths: expanded });
      previousPaths.current = key;
    }
    const statuses: GitStatusEntry[] = Object.entries(listing.statuses).map(([path, code]) => ({ path, status: code === "??" ? "untracked" : code.includes("D") ? "deleted" : code.includes("R") ? "renamed" : code.includes("A") ? "added" : "modified" }));
    model.setGitStatus(statuses);
  }, [listing, model]);
  const pathsKey = JSON.stringify(listing?.paths);
  useEffect(() => {
    if (!listing) return;
    let cancelled = false;
    void import("./materialIcons").then(({ materialIcons }) => materialIcons(listing.paths))
      .then(icons => { if (!cancelled) model.setIcons(icons); })
      .catch(() => { if (!cancelled) setError("Could not load Material file icons."); });
    return () => { cancelled = true; };
  }, [pathsKey, model]);
  useEffect(() => {
    if (!selected || /\.(png|jpe?g|gif|webp|avif|svg)$/i.test(selected)) { setFile(undefined); setPreviewError(""); return; }
    const controller = new AbortController();
    setPreviewError("");
    void request("/api/file?path=" + encodeURIComponent(selected), controller.signal)
      .then(next => { if (!controller.signal.aborted) setFile(current => current?.name === next.name && current?.contents === next.contents ? current : next); })
      .catch(error => { if (!controller.signal.aborted) { setFile(undefined); setPreviewError(error.message); } });
    return () => controller.abort();
  }, [selected, revision]);
  const displayed = file?.name === selected ? file : undefined;
  const image = !!selected && /\.(png|jpe?g|gif|webp|avif|svg)$/i.test(selected);
  const markdown = !!selected && /\.mdx?$/i.test(selected);
  useEffect(() => {
    if (!selectedLines) return;
    const controller = new AbortController();
    void fetch("/api/targets", {signal:controller.signal}).then(async response => {
      const data = await response.json();
      if (!response.ok) throw new Error(data.error || "Could not find agent panes");
      return data.blocks as typeof targets;
    }).then(blocks => { setTargets(blocks); setTarget(current => blocks.some(block => block.id === current) ? current : ""); })
      .catch(error => { if (!controller.signal.aborted) setMessageStatus(String(error.message)); });
    return () => controller.abort();
  }, [selectedLines]);
  const annotations: LineAnnotation[] = selectedLines ? [{lineNumber:selectedLines.end}] : [];
  async function sendToAgent() {
    if (!selected || !displayed || !selectedLines || !target) return;
    const code = displayed.contents.split("\n").slice(selectedLines.start - 1, selectedLines.end).join("\n");
    const body = `Please review this selected code context.\nFile: ${selected}\nLines: ${selectedLines.start}${selectedLines.end === selectedLines.start ? "" : `–${selectedLines.end}`}\n\n\`\`\`\n${code}\n\`\`\`${question.trim() ? `\n\nQuestion: ${question.trim()}` : ""}`;
    setMessageStatus("Sending…");
    try {
      const response = await fetch("/api/send", {method:"POST", headers:{"content-type":"application/json","x-review-token":token}, body:JSON.stringify({blockId:target,message:body})});
      const result = await response.json();
      if (!response.ok) throw new Error(result.error || "Delivery failed");
      setQuestion(""); setSelectedLines(null); setMessageStatus("Inserted into selected pane. It was not submitted.");
    } catch(error) { setMessageStatus(String(error)); }
  }
  return <>
    {createPortal(<div className={`explorer-sidebar ${stylex.props(styles.explorerSidebar).className}`} hidden={!active}>
      {error && <p role="alert">{error}</p>}
      {!listing && !error && <p role="status">Loading repository…</p>}
      {listing?.paths.length === 0 && <p>No repository files.</p>}
      <FileTree
        model={model}
        // React 18 forwards className as "classname" on custom elements.
        {...{ class: `repository-tree ${stylex.props(styles.repositoryTree).className}` }}
        aria-label="Repository files"
        style={{
          colorScheme: theme,
          "--trees-padding-inline-override": "0px",
          "--trees-theme-sidebar-bg": theme === "light" ? "#ffffff" : "#202022",
          "--trees-theme-sidebar-fg": theme === "light" ? "#4b4b52" : "#bdbdc6",
          "--trees-theme-list-active-selection-bg": theme === "light" ? "#18181b0d" : "#ffffff0b",
          "--trees-theme-list-active-selection-fg": theme === "light" ? "#222225" : "#f0f0f3",
          "--trees-theme-list-hover-bg": theme === "light" ? "#18181b08" : "#ffffff08",
        } as React.CSSProperties}
      />
    </div>, sidebar)}
    <section className={`source-content ${stylex.props(styles.sourceContent).className}`} style={{ background: editorBackground(theme) }} aria-label="File preview" hidden={!active}>
      {tabs.length > 0 && <nav className={`explorer-tabs ${stylex.props(styles.explorerTabs).className}`} aria-label="Open files"
        onWheel={event => {
          const strip = event.currentTarget;
          if (event.ctrlKey || event.deltaX !== 0 || strip.scrollWidth <= strip.clientWidth) return;
          const delta = event.deltaMode === 1 ? event.deltaY * 16 : event.deltaMode === 2 ? event.deltaY * strip.clientWidth : event.deltaY;
          strip.scrollLeft += delta;
        }}
      >
        {tabs.map(path => {
          const filename = path.split("/").at(-1) || path;
          const duplicateName = tabs.some(other => other !== path && (other.split("/").at(-1) || other) === filename);
          const name = duplicateName ? path : filename;
          const isActive = selected === path;
          return <div className={`explorer-tab${isActive ? " is-active" : ""} ${stylex.props(styles.explorerTab).className}${isActive ? ` ${stylex.props(styles.explorerTabActive).className}` : ""}`} key={path}>
            <button
              type="button"
              className={`explorer-tab-select ${stylex.props(styles.explorerTabSelect).className}${isActive ? ` ${stylex.props(styles.explorerTabLabelActive).className}` : ""}`}
              aria-current={isActive ? "page" : undefined}
              ref={isActive ? activeTabRef : undefined}
              title={path}
              onClick={() => openFile(path)}
            >{name}</button>
            <button
              type="button"
              className={`explorer-tab-close ${stylex.props(styles.explorerTabClose).className}`}
              aria-label={`Close ${name}`}
              style={isActive ? { opacity: 1 } : undefined}
              title={`Close ${name}`}
              onClick={() => closeFile(path)}
            ><svg viewBox="0 0 16 16" aria-hidden="true"><path d="m4 4 8 8M12 4l-8 8" /></svg></button>
          </div>;
        })}
      </nav>}
      <Virtualizer className={`code-scroll ${stylex.props(styles.codeScroll).className}`} contentClassName={stylex.props(styles.codeScrollContent).className}>
      {!selected ? <div className={`empty-state ${stylex.props(styles.emptyState).className}`}><h1>Explore your repository</h1><p>Select a file to read its source.</p></div>
        : image ? <img className={`repository-image-preview ${stylex.props(styles.repositoryImagePreview).className}`} src={"/api/file-asset?path=" + encodeURIComponent(selected) + "&token=" + encodeURIComponent(token)} alt={selected} />
        : previewError ? <div className={`empty-state ${stylex.props(styles.emptyState).className}`} role="alert"><h1>Could not preview file</h1><p>{previewError}</p></div>
        : !displayed ? <div className={`empty-state ${stylex.props(styles.emptyState).className}`} role="status">Loading {selected}…</div>
        : markdown && markdownPreview ? <><div className={`markdown-preview-toolbar ${stylex.props(styles.markdownPreviewToolbar).className}`}><span>{selected}</span><button onClick={() => setMarkdownPreview(false)}>Source</button></div><article className={`markdown-preview ${stylex.props(styles.markdownPreview).className}`} dangerouslySetInnerHTML={{__html:DOMPurify.sanitize(marked.parse(displayed.contents) as string)}} /></>
        : <><div className={`source-toolbar ${stylex.props(styles.sourceToolbar).className}`}>{markdown && <button onClick={() => setMarkdownPreview(true)}>Preview</button>}</div><File file={displayed} options={{...fileOptions(theme, captureCode), enableLineSelection:true, onLineSelectionEnd:setSelectedLines}} selectedLines={selectedLines} lineAnnotations={annotations} renderAnnotation={(annotation: LineAnnotation) => annotation.lineNumber === selectedLines?.end ? <div className={`inline-composer ${stylex.props(styles.inlineComposer).className}`} role="region" aria-label="Ask Agent about selected lines"><div className={`composer-heading ${stylex.props(styles.composerHeading).className}`}><strong>Ask Agent · {selectedLines.start}{selectedLines.end !== selectedLines.start ? `–${selectedLines.end}` : ""}</strong><button className={`composer-close ${stylex.props(styles.composerClose).className}`} aria-label="Close composer" onClick={() => setSelectedLines(null)}>×</button></div><textarea aria-label="Question for agent" value={question} onChange={event => setQuestion(event.target.value)} placeholder="Ask about these lines…" rows={3}/><div className={`composer-actions ${stylex.props(styles.composerActions).className}`}><select aria-label="Target Rex pane" value={target} onChange={event => setTarget(event.target.value)}><option value="">{targets.length ? "Choose agent pane…" : "No recognized agent panes"}</option>{targets.map(agent => <option key={agent.id} value={agent.id}>{agent.agent} · {agent.id.slice(-6)}</option>)}</select><button className={`ask-agent-button ${stylex.props(styles.askAgentButton).className}`} disabled={!targets.some(agent => agent.id === target)} onClick={() => void sendToAgent()}>Ask Agent</button></div>{messageStatus && <small>{messageStatus}</small>}</div> : null} />{!displayed.contents && <p className="source-empty">This file is empty.</p>}</>}

      </Virtualizer>
      <div ref={horizontalScroll} className="source-horizontal-scroll" aria-label="Scroll file horizontally" tabIndex={0}
        style={{ marginLeft: gutterWidth, height: selected && !image && !previewError && displayed && !(markdown && markdownPreview) && scrollWidth > 0 ? 12 : 0 }}
        onScroll={event => { if (codeElement) codeElement.scrollLeft = event.currentTarget.scrollLeft; }}>
        <div style={{ width: scrollWidth, height: 1 }} />
      </div>
    </section>
  </>;
}
