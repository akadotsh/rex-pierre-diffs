import * as stylex from "@stylexjs/stylex";

export const styles = stylex.create({
  appHeader: {
    flex: "none",
    minHeight: "52px",
    display: "flex",
    alignItems: "center",
    gap: {
      default: "10px",
      "@media (max-width: 800px)": "8px"
    },
    padding: {
      default: "10px 16px",
      "@media (max-width: 800px)": "8px 12px"
    },
    background: "var(--surface)",
    borderBottom: "1px solid var(--border)",
    flexWrap: {
      default: null,
      "@media (max-width: 800px)": "wrap"
    }
  },
  appIdentity: {
    display: "flex",
    alignItems: "center",
    gap: "9px",
    flex: {
      default: "1",
      "@media (max-width: 800px)": "1"
    },
    whiteSpace: "nowrap"
  },
  mobileTabs: {
    display: {
      default: "none",
      "@media (max-width: 800px)": "flex"
    },
    gap: {
      default: null,
      "@media (max-width: 800px)": "4px"
    }
  },
  sidebarHeading: {
    display: "flex",
    alignItems: "center",
    gap: "8px",
    minHeight: "32px",
    marginBottom: "10px",
    flexShrink: "0"
  },
  fileCount: {
    minWidth: "20px",
    textAlign: "center",
    borderRadius: "5px",
    padding: "0 5px",
    background: "var(--selected)",
    color: "var(--text-secondary)",
    fontSize: "11px",
    fontVariantNumeric: "tabular-nums"
  },
  sidebarToggle: {
    display: {
      default: "grid",
      "@media (max-width: 800px)": "none"
    },
    placeItems: "center",
    flex: "none",
    width: "28px",
    minHeight: "28px",
    padding: "4px",
    background: "transparent",
    borderColor: "transparent",
    color: "var(--text-secondary)"
  },
  sidebarModeButton: {
    display: "grid",
    placeItems: "center",
    flex: "none",
    width: "28px",
    minHeight: "28px",
    padding: "4px",
    background: "transparent",
    borderColor: "transparent",
    color: "var(--text-secondary)"
  },
  fileItem: {
    display: "flex",
    alignItems: "center",
    gap: "4px",
    borderRadius: "5px",
    flexShrink: "0"
  },
  viewedToggle: {
    display: "grid",
    placeItems: "center",
    flex: "none",
    width: "28px",
    minHeight: "28px",
    padding: "5px",
    background: "transparent",
    border: "0",
    color: "var(--muted)"
  },
  changeTotals: {
    display: "flex",
    gap: "5px",
    fontSize: "10px",
    fontVariantNumeric: "tabular-nums"
  },
  sidebarFooter: {
    display: "flex",
    alignItems: "center",
    gap: "7px",
    marginTop: "auto",
    padding: "20px 4px 2px",
    color: "var(--muted)",
    fontSize: "10px",
    whiteSpace: "nowrap",
    flexShrink: "0"
  },
  connectionDot: {
    width: "5px",
    height: "5px",
    borderRadius: "50%",
    background: "#94bda0",
    flex: "none"
  },
  sidebarSettings: {
    position: "relative",
    flex: "none"
  },
  sidebarSettingsTrigger: {
    display: "grid",
    placeItems: "center",
    width: "28px",
    minHeight: "28px",
    padding: "5px",
    borderColor: "transparent",
    background: "transparent",
    color: "var(--muted)"
  },
  settingsDialog: {
    width: {
      default: "min(640px, calc(100vw - 32px))",
      "@media (max-width: 560px)": "min(460px, calc(100vw - 20px))"
    },
    maxWidth: "none",
    maxHeight: {
      default: "calc(100vh - 32px)",
      "@media (max-width: 560px)": "calc(100vh - 20px)"
    },
    padding: "0",
    overflow: "auto",
    border: "1px solid var(--outline-border)",
    borderRadius: "10px",
    background: "var(--surface-raised)",
    color: "var(--text)",
    boxShadow: "0 16px 48px #0007",
    opacity: "1",
    transform: "translateY(0) scale(1)",
    transition: {
      default: "opacity 160ms var(--ease-out), transform 160ms var(--ease-out)",
      "@media (prefers-reduced-motion: reduce)": "none"
    }
  },
  settingsDialogHeader: {
    display: "flex",
    alignItems: "flex-start",
    justifyContent: "space-between",
    gap: "16px",
    padding: "17px 20px 14px",
    borderBottom: "1px solid var(--border)"
  },
  settingsClose: {
    display: "grid",
    placeItems: "center",
    width: "30px",
    minHeight: "30px",
    padding: "5px",
    borderColor: "transparent",
    background: "transparent",
    color: "var(--muted)"
  },
  settingsDialogBody: {
    display: "grid",
    gridTemplateColumns: {
      default: "136px minmax(0, 1fr)",
      "@media (max-width: 560px)": "1fr"
    },
    minHeight: {
      default: "284px",
      "@media (max-width: 560px)": "0"
    }
  },
  settingsNav: {
    padding: {
      default: "14px 9px",
      "@media (max-width: 560px)": "9px 14px 0"
    },
    borderRight: {
      default: "1px solid var(--border)",
      "@media (max-width: 560px)": "0"
    },
    background: {
      default: "color-mix(in srgb, var(--surface-inset) 70%, transparent)",
      "@media (max-width: 560px)": "transparent"
    }
  },
  settingsNavItem: {
    display: "flex",
    alignItems: "center",
    gap: "9px",
    width: {
      default: "100%",
      "@media (max-width: 560px)": "auto"
    },
    minHeight: {
      default: "34px",
      "@media (max-width: 560px)": "30px"
    },
    padding: {
      default: "6px 9px",
      "@media (max-width: 560px)": "5px 8px"
    },
    border: "1px solid transparent",
    borderRadius: "6px",
    background: "transparent",
    color: "var(--text-secondary)",
    textAlign: "left",
    fontSize: "12px",
    transition: {
      default: "color 120ms ease, background-color 120ms ease",
      "@media (prefers-reduced-motion: reduce)": "none"
    }
  },
  settingsContent: {
    minWidth: "0",
    padding: {
      default: "19px 20px 20px",
      "@media (max-width: 560px)": "15px 14px 16px"
    }
  },
  layoutChoices: {
    display: "grid",
    gridTemplateColumns: "repeat(2, minmax(0, 1fr))",
    gap: {
      default: "9px",
      "@media (max-width: 560px)": "7px"
    },
    margin: "0",
    padding: "0"
  },
  layoutChoice: {
    position: "relative",
    display: "flex",
    flexDirection: "column",
    gap: "8px",
    minWidth: "0",
    padding: {
      default: "8px",
      "@media (max-width: 560px)": "7px"
    },
    border: "1px solid var(--outline-border)",
    borderRadius: "7px",
    background: "var(--app-bg)",
    cursor: "pointer",
    transition: {
      default: "transform 120ms var(--ease-out), border-color 120ms ease, background-color 120ms ease",
      "@media (prefers-reduced-motion: reduce)": "none"
    }
  },
  layoutChoiceHeading: {
    display: "flex",
    alignItems: "center",
    justifyContent: "space-between",
    gap: "8px"
  },
  layoutChoiceLabel: {
    fontSize: "12px",
    fontWeight: "550"
  },
  layoutChoiceRadio: {
    display: "grid",
    placeItems: "center",
    flex: "none",
    width: "16px",
    height: "16px",
    border: "1px solid #777780",
    borderRadius: "50%",
    color: "#19191b"
  },
  layoutPreview: {
    display: "grid",
    gridTemplateAreas: "\"chrome chrome\" \"sidebar main\"",
    gridTemplateColumns: "27% minmax(0, 1fr)",
    gridTemplateRows: "10px minmax(0, 1fr)",
    gap: "4px",
    height: {
      default: "72px",
      "@media (max-width: 560px)": "60px"
    },
    padding: "6px",
    overflow: "hidden",
    border: "1px solid var(--border)",
    borderRadius: "5px",
    background: "var(--preview-bg)"
  },
  layoutPreviewRight: {
    gridTemplateAreas: "\"chrome chrome\" \"main sidebar\"",
    gridTemplateColumns: "minmax(0, 1fr) 27%"
  },
  layoutPreviewChrome: {
    gridArea: "chrome",
    display: "flex",
    alignItems: "center",
    gap: "3px",
    borderBottom: "1px solid #ffffff10"
  },
  layoutPreviewSidebar: {
    gridArea: "sidebar",
    display: "flex",
    flexDirection: "column",
    gap: "5px",
    padding: "6px 4px",
    borderRadius: "2px",
    background: "var(--preview-sidebar)"
  },
  layoutPreviewMain: {
    gridArea: "main",
    display: "flex",
    flexDirection: "column",
    gap: "5px",
    padding: "7px",
    borderRadius: "2px",
    background: "var(--preview-main)"
  },
  themeChoices: {
    display: "grid",
    gridTemplateColumns: "repeat(3, minmax(0, 1fr))",
    gap: {
      default: "8px",
      "@media (max-width: 560px)": "6px"
    }
  },
  themeChoice: {
    position: "relative",
    display: "flex",
    flexDirection: "column",
    gap: "8px",
    minWidth: "0",
    padding: {
      default: "8px",
      "@media (max-width: 560px)": "6px"
    },
    border: "1px solid var(--outline-border)",
    borderRadius: "7px",
    background: "var(--app-bg)",
    cursor: "pointer",
    transition: {
      default: "border-color 120ms ease, background-color 120ms ease, transform 120ms var(--ease-out)",
      "@media (prefers-reduced-motion: reduce)": "none"
    }
  },
  themeSwatch: {
    display: "flex",
    gap: "4px",
    height: {
      default: "60px",
      "@media (max-width: 560px)": "48px"
    },
    padding: "6px",
    overflow: "hidden",
    border: "1px solid var(--border)",
    borderRadius: "4px"
  },
  themeSwatchDark: {
    background: "#19191b",
    color: "#a5a5af"
  },
  themeSwatchLight: {
    background: "#f4f4f6",
    color: "#73737c"
  },
  themeSwatchSystem: {
    background: "linear-gradient(90deg, #19191b 0 50%, #f4f4f6 50%)",
    color: "#8e8e98"
  },
  themeChoiceLabel: {
    color: "var(--text)",
    fontSize: "12px",
    fontWeight: "550"
  },
  footerBranch: {
    marginLeft: "auto",
    overflow: "hidden",
    textOverflow: "ellipsis",
    maxWidth: "80px"
  },
  diffContent: {
    display: "flex",
    flexDirection: "column",
    minWidth: "0",
    overflow: "hidden"
  },
  codeScroll: {
    flex: "1",
    minHeight: "0",
    overflow: "auto"
  },
  codeScrollContent: {
    display: "flex",
    flexDirection: "column",
    minHeight: "100%"
  },
  reviewNotes: {
    padding: "9px 18px",
    borderBottom: "1px solid var(--border)",
    flexShrink: "0",
    color: "var(--muted)",
    fontSize: "12px"
  },
  emptyState: {
    display: "flex",
    flex: "1",
    flexDirection: "column",
    alignItems: "center",
    justifyContent: "center",
    minHeight: "220px",
    padding: "40px 24px",
    textAlign: "center"
  },
  emptyIcon: {
    display: "grid",
    placeItems: "center",
    width: "48px",
    height: "48px",
    marginBottom: "17px",
    border: "1px solid var(--border)",
    borderRadius: "13px",
    background: "var(--hover)",
    color: "var(--text-secondary)",
    boxShadow: "0 2px 5px #0002"
  },
  collapsedDiff: {
    width: "100%",
    padding: "12px 18px",
    border: "0",
    borderRadius: "0",
    background: "var(--surface)",
    textAlign: "left",
    color: "var(--muted)"
  },
  status: {
    position: "fixed",
    zIndex: "6",
    bottom: "16px",
    right: "16px",
    maxWidth: "calc(100% - 32px)",
    border: "1px solid var(--outline-border)",
    borderRadius: "8px",
    padding: "10px 14px",
    background: "var(--surface-raised)",
    boxShadow: "0 6px 24px #0003",
    fontSize: "12px"
  },
  appError: {
    color: "#ffb4ab",
    whiteSpace: "pre-wrap"
  },
  copyFilename: {
    display: "inline-grid",
    placeItems: "center",
    width: "28px",
    minHeight: "28px",
    marginLeft: "4px",
    padding: "5px",
    borderColor: "transparent",
    background: "transparent",
    color: "var(--muted)",
    verticalAlign: "middle"
  },
  inlineComposer: {
    margin: {
      default: "10px 14px 14px",
      "@media (max-width: 480px)": "8px"
    },
    border: "1px solid var(--outline-border)",
    borderRadius: "9px",
    background: "var(--composer-bg)",
    boxShadow: "0 2px 8px #0002",
    color: "var(--text)",
    font: "13px/1.5 -apple-system, BlinkMacSystemFont, \"Segoe UI\", sans-serif",
    whiteSpace: "normal",
    overflowWrap: "anywhere",
    overflow: "hidden",
    transition: {
      default: null,
      "@media (prefers-reduced-motion: no-preference)": "opacity 180ms var(--ease-out), transform 180ms var(--ease-out)"
    }
  },
  composerHeading: {
    display: "flex",
    alignItems: "center",
    justifyContent: "space-between",
    gap: "8px",
    padding: "10px 12px 0 14px",
    paddingLeft: {
      default: null,
      "@media (max-width: 480px)": "12px"
    }
  },
  composerTitle: {
    display: "flex",
    alignItems: "center",
    gap: "8px",
    minWidth: "0"
  },
  composerLineBadge: {
    marginLeft: "2px",
    padding: "1px 5px",
    border: "1px solid var(--border)",
    borderRadius: "4px",
    color: "var(--muted)",
    font: "10px/1.5 ui-monospace, SFMono-Regular, monospace",
    whiteSpace: "nowrap"
  },
  composerClose: {
    display: "grid",
    placeItems: "center",
    flex: "none",
    padding: "4px",
    width: "24px",
    minHeight: "24px",
    border: "0",
    background: "transparent",
    color: "var(--muted)"
  },
  composerActions: {
    display: "flex",
    alignItems: "center",
    justifyContent: "space-between",
    gap: {
      default: "12px",
      "@media (max-width: 480px)": "8px"
    },
    padding: "8px 10px",
    borderTop: "1px solid var(--border)",
    background: "var(--composer-footer)",
    flexWrap: {
      default: null,
      "@media (max-width: 480px)": "wrap"
    }
  },
  composerDestination: {
    display: "flex",
    alignItems: "center",
    gap: "6px",
    minWidth: "0",
    maxWidth: {
      default: "65%",
      "@media (max-width: 480px)": "100%"
    },
    flex: {
      default: null,
      "@media (max-width: 480px)": "1 1 140px"
    }
  },
  askAgentButton: {
    display: "inline-flex",
    alignItems: "center",
    justifyContent: "center",
    flex: "none",
    gap: "7px",
    minWidth: "112px",
    minHeight: "28px",
    padding: "4px 9px",
    borderColor: "var(--border)",
    borderRadius: "5px",
    background: "var(--primary-button-bg)",
    color: "var(--primary-button-text)",
    fontSize: "11px",
    fontWeight: "600",
    whiteSpace: "nowrap",
    boxShadow: "0 1px 2px #0002",
    marginLeft: {
      default: null,
      "@media (max-width: 480px)": "auto"
    }
  },
  agentIcon: {
    colorScheme: "light",
    display: "block",
    width: "14px",
    height: "14px",
    objectFit: "contain",
    flexShrink: "0"
  },
  sidebarModes: {
    display: "flex",
    gap: "2px"
  },
  changesSidebar: {
    flex: "1",
    minHeight: "0",
    overflow: "auto"
  },
  explorerHost: {
    display: "flex",
    flex: "1",
    minHeight: "0",
    flexDirection: "column"
  },
  explorerSidebar: {
    display: "flex",
    flex: "1",
    minHeight: "0",
    flexDirection: "column"
  },
  repositoryTree: {
    flex: "1",
    minHeight: "0"
  },
  sourceContent: {
    minWidth: "0",
    overflow: "hidden",
    display: "flex",
    flexDirection: "column"
  },
  explorerTabs: {
    display: "flex",
    alignItems: "stretch",
    flexShrink: "0",
    minWidth: "0",
    minHeight: "34px",
    gap: "3px",
    padding: "3px 6px",
    overflowX: "auto",
    borderBottom: "1px solid var(--border)",
    background: "var(--surface)"
  },
  explorerTab: {
    display: "flex",
    flex: "0 0 auto",
    alignItems: "center",
    width: "fit-content",
    minWidth: "0",
    maxWidth: "180px",
    border: "1px solid transparent",
    borderRadius: "5px",
    background: "transparent"
  },
  explorerTabSelect: {
    flex: "0 1 auto",
    minWidth: "0",
    overflow: "hidden",
    textOverflow: "ellipsis",
    whiteSpace: "nowrap",
    minHeight: "26px",
    padding: "0 4px 0 8px",
    border: "0",
    borderRadius: "4px",
    background: "transparent",
    color: "var(--muted)",
    fontSize: "12px",
    cursor: "pointer"
  },
  explorerTabActive: {
    borderColor: "var(--border)",
    background: "var(--selected)"
  },
  explorerTabLabelActive: {
    color: "var(--text)"
  },
  explorerTabClose: {
    display: "grid",
    placeItems: "center",
    width: "20px",
    height: "20px",
    marginRight: "3px",
    minHeight: "0",
    flexShrink: "0",
    border: "0",
    borderRadius: "4px",
    padding: "0",
    background: "transparent",
    color: "var(--muted)",
    opacity: "0",
    cursor: "pointer",
    transition: "opacity 100ms ease-out, color 100ms ease-out, transform 120ms var(--ease-out)",
    ":hover": { color: "var(--text)" },
    ":focus-visible": { opacity: "1" }
  },
  srOnly: {
    position: "absolute",
    width: "1px",
    height: "1px",
    overflow: "hidden",
    clipPath: "inset(50%)",
    whiteSpace: "nowrap"
  },
  sidebarResize: {
    position: "absolute",
    zIndex: "3",
    top: "0",
    bottom: "0",
    left: "calc(var(--sidebar-width) - 4px)",
    width: "8px",
    cursor: "col-resize",
    touchAction: "none",
    display: {
      default: null,
      "@media (max-width: 800px)": "none"
    }
  },
  markdownPreviewToolbar: {
    display: "flex",
    justifyContent: "flex-end",
    alignItems: "center",
    gap: "10px",
    padding: "8px 16px",
    borderBottom: "1px solid var(--border)",
    color: "var(--muted)",
    fontSize: "12px"
  },
  sourceToolbar: {
    display: "flex",
    justifyContent: "flex-end",
    alignItems: "center",
    gap: "10px",
    padding: "8px 16px",
    borderBottom: "1px solid var(--border)",
    color: "var(--muted)",
    fontSize: "12px"
  },
  markdownPreview: {
    width: "min(820px,100%)",
    margin: "24px auto",
    padding: "0 24px 48px",
    lineHeight: "1.75",
    overflowWrap: "anywhere"
  },
  repositoryImagePreview: {
    display: "block",
    maxWidth: "100%",
    maxHeight: "100%",
    objectFit: "contain",
    margin: "auto"
  }
});
