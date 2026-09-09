<p align="center">
  <a href="https://github.com/lensetek/lensetek-opencode">
    <picture>
      <source srcset="packages/console/app/src/asset/logo-ornate-dark.svg" media="(prefers-color-scheme: dark)">
      <source srcset="packages/console/app/src/asset/logo-ornate-light.svg" media="(prefers-color-scheme: light)">
      <img src="packages/console/app/src/asset/logo-ornate-light.svg" alt="Lensetek logo">
    </picture>
  </a>
</p>
<p align="center">AI-powered development tool.</p>
<p align="center">
  <a href="https://www.npmjs.com/package/lensetek"><img alt="npm" src="https://img.shields.io/npm/v/lensetek?style=flat-square" /></a>
  <a href="https://github.com/lensetek/lensetek-opencode/releases"><img alt="GitHub Release" src="https://img.shields.io/github/v/release/lensetek/lensetek-opencode?style=flat-square" /></a>
  <a href="./LICENSE"><img alt="License" src="https://img.shields.io/github/license/lensetek/lensetek-opencode?style=flat-square" /></a>
</p>

<p align="center">
  <a href="README.md">English</a> |
  <a href="README.zh.md">简体中文</a> |
  <a href="README.zht.md">繁體中文</a> |
  <a href="README.ko.md">한국어</a> |
  <a href="README.de.md">Deutsch</a> |
  <a href="README.es.md">Español</a> |
  <a href="README.fr.md">Français</a> |
  <a href="README.it.md">Italiano</a> |
  <a href="README.da.md">Dansk</a> |
  <a href="README.ja.md">日本語</a> |
  <a href="README.pl.md">Polski</a> |
  <a href="README.ru.md">Русский</a> |
  <a href="README.bs.md">Bosanski</a> |
  <a href="README.ar.md">العربية</a> |
  <a href="README.no.md">Norsk</a> |
  <a href="README.br.md">Português (Brasil)</a> |
  <a href="README.th.md">ไทย</a> |
  <a href="README.tr.md">Türkçe</a> |
  <a href="README.uk.md">Українська</a> |
  <a href="README.bn.md">বাংলা</a> |
  <a href="README.gr.md">Ελληνικά</a> |
  <a href="README.vi.md">Tiếng Việt</a>
</p>

[![Lensetek Terminal UI](packages/web/src/assets/lander/screenshot.png)](https://github.com/lensetek/lensetek-opencode)

---

### Installation

```bash
# Install script (cross-platform, latest release)
curl -LsS https://raw.githubusercontent.com/lensetek/lensetek-opencode/dev/install.sh | bash

# Package managers
npm i -g lensetek                    # macOS, Linux, Windows
brew install lensetek/tap/lensetek   # macOS and Linux (Homebrew)
scoop bucket add lensetek https://github.com/lensetek/lensetek-opencode
scoop install lensetek               # Windows (Scoop)
choco install lensetek               # Windows (Chocolatey)
```

You can also download a binary directly from the [releases page](https://github.com/lensetek/lensetek-opencode/releases).

> [!TIP]
> Remove versions older than 0.1.x before installing.

#### Installation Directory

The install script puts the `lensetek` binary in `$LENSETEK_INSTALL_DIR/bin`
(default: `$HOME/.lensetek`) and prints the PATH line you need for your shell:

```bash
# Examples
LENSETEK_INSTALL_DIR="$HOME/bin" curl -LsS https://raw.githubusercontent.com/lensetek/lensetek-opencode/dev/install.sh | bash
```

### Agents

Lensetek includes two built-in agents you can switch between with the `Tab` key.

- **build** - Default, full-access agent for development work
- **plan** - Read-only agent for analysis and code exploration
  - Denies file edits by default
  - Asks permission before running bash commands
  - Ideal for exploring unfamiliar codebases or planning changes

Also included is a **general** subagent for complex searches and multistep tasks.
This is used internally and can be invoked using `@general` in messages.

### Documentation

For more info on how to configure Lensetek and use the underlying agent
toolkit, see the [docs](./packages/docs) and the issue/PR discussions in this
repository.

### Contributing

If you're interested in contributing to Lensetek, please read our [contributing docs](./CONTRIBUTING.md) before submitting a pull request.

### A Note from the Fork

Lensetek is a branded fork of [anomalyco/opencode](https://github.com/anomalyco/opencode) — the open source AI coding agent. Agent behavior, most features, and this documentation base come from the upstream project, which does great work; Lensetek adds its own distribution channels, branding, and publishing pipeline on top.

If you are working on a project that's related to Lensetek and is using "lensetek" as part of its name, for example "lensetek-dashboard" or "lensetek-mobile", please add a note to your README to clarify that it is not built by the Lensetek team and is not affiliated with us in any way.

---

**Project** [lensetek/lensetek-opencode](https://github.com/lensetek/lensetek-opencode)