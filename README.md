# ![Logo](docs/logo-small.png) Local Diff

A graphical Git diff viewer for your terminal, powered by [Pierre Diffs](https://diffs.com/docs). Review changes, select lines, and send code context to a coding agent without leaving your terminal.

> [!NOTE]
> Terminal support is expanding. The current release integrates with [Rex Terminal](https://www.superlogical.com/rex) on macOS; support for other terminals is in development. This is an independent, community-maintained project.

![Local Diff showing a real Git diff beside a terminal](https://raw.githubusercontent.com/akadotsh/local-diff/main/docs/screenshot.png)

## Terminal support

Local Diff uses the [Pixel viewer](hosts/pixel/README.md) by default to display its React interface and Pierre diff renderer through Chromium inside the terminal. Rex-specific commands handle pane layout, agent discovery, and inserting context into an agent pane.

Pixel installs its own Electron runtime. Tested on macOS ARM64 in Rex; other terminals need Pixel graphics support. RexWeb is no longer required to launch Local Diff.

## Features

- Review staged, unstaged, and untracked changes with syntax-highlighted diffs.
- Navigate changed files and see updates as repository files change.
- Select added or removed lines as context for your agent.
- Ask an agent about selected code in a chosen Rex pane. Choose an agent pane and click **Ask Agent** to insert the selected code and your question; the app does not press Enter for you.
- Use a right-side or top/bottom split, with comfortable and compact display density.

## Installation

### Standalone (Apple Silicon macOS)

Requires macOS 14 or newer, Git, and Rex Terminal. Pixel and its Electron runtime are included. Node.js and npm are not required.

```sh
curl -fsSL https://raw.githubusercontent.com/akadotsh/local-diff/main/install.sh | sh
local-diff
```

The installer verifies the latest release and installs `~/.local/bin/local-diff`.

To upgrade, rerun the curl command.

To uninstall the curl installation:

```sh
rm -f "$HOME/.local/bin/local-diff"
rm -rf "$HOME/.local/share/local-diff"
```

See **Optional Rex shortcut** below to add the Rex shortcut.

### npm or pnpm

Requires Node.js 22 or newer, Git, and Rex Terminal. Allow install scripts for `@zenbu-labs/pixel` if your package manager blocks them.

```sh
# Install
npm install -g local-diff --allow-scripts=@zenbu-labs/pixel
# or
pnpm add -g local-diff

# Upgrade
local-diff upgrade
```

Use `local-diff upgrade` to update. To uninstall, remove the global package with the package manager you used.

## Use

Open a Git repository in Rex and run:

```sh
local-diff
```

The viewer opens beside your terminal and shows the repository's current changes. Use **All changes**, **Working tree**, or **Staged** to choose what to review. Select changed lines to ask an agent a question. The agent picker lists recognized foreground coding-agent processes, excluding ordinary shells and browser panes. Agents hidden behind generic Node.js or Python wrapper processes may not be detected.

Use the sidebar’s **Changes** and **Explorer** icon buttons to switch between Git review and the full repository tree. Explorer includes tracked files and non-ignored untracked files, with Git status badges. Open files in tabs, switch between them, and close them when you’re done; switching back restores your review context. Drag the sidebar’s right edge to resize it on desktop; its width is remembered. You can also focus the edge and use the arrow keys, or double-click to reset it. Browsing is read-only. Binary files, non-UTF-8 text, and files over 1 MB show a preview message. Git does not track empty directories.

For a top/bottom layout, run:

```sh
local-diff --split below
```

The `--split` option also accepts `right` (the default), `left`, and `above`. `local-diff` is the command name. Run `local-diff --help` for all CLI options. From a coding agent's shell command input in Rex, `local-diff` works the same way when shell commands are enabled.

### Optional Rex shortcut

The included `local-diff.lua` adds **Open Local Diff** to Rex's Command Palette and binds `Cmd`+`Shift`+`G`. Copy it from the globally installed package into your Rex config directory:

```sh
rex_config_dir="${XDG_CONFIG_HOME:-$HOME/.config}/rex"
mkdir -p "$rex_config_dir"
cp -n "$(npm root -g)/local-diff/local-diff.lua" "$rex_config_dir/"
```

If you installed with pnpm, use `$(pnpm root -g)` in place of `$(npm root -g)`. Add this line to your existing `~/.config/rex/init.lua`:

```lua
require("local-diff")
```

Then run `rex config check` and `rex config reload`. The shortcut and split direction can be changed at the top of the copied Lua file. If Rex cannot find `local-diff` from the action, replace the command there with the absolute path returned by `command -v local-diff`.

## Development

See the [development guide](docs/development.md) to build and test from a checkout.

## License

MIT. See [LICENSE](LICENSE) and [third-party notices](THIRD_PARTY_NOTICES/).
