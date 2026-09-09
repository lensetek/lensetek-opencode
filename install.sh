#!/usr/bin/env bash
set -euo pipefail

# Lensetek installer.
# Downloads the latest (or pinned) lensetek CLI from GitHub Releases of
# lensetek/lensetek-opencode and installs it into ~/.lensetek/bin.
#
# Usage:
#   curl -fsSL https://raw.githubusercontent.com/lensetek/lensetek-opencode/dev/install.sh | bash
#
# Environment:
#   VERSION              Pin a release version (default: latest). The leading
#                        "v" is optional.
#   LENSETEK_INSTALL_DIR Install prefix (default: $HOME/.lensetek).
#   GH_REPO              Repository to install from (default: lensetek/lensetek-opencode).

GH_REPO="${GH_REPO:-lensetek/lensetek-opencode}"
INSTALL_DIR="${LENSETEK_INSTALL_DIR:-$HOME/.lensetek}"
BIN_DIR="$INSTALL_DIR/bin"

# ---- platform detection -----------------------------------------------------
case "$(uname -s)" in
  Linux) OS="linux" ;;
  Darwin) OS="darwin" ;;
  MINGW* | MSYS* | CYGWIN*) OS="windows" ;;
  *) echo "error: unsupported platform $(uname -s)" >&2; exit 1 ;;
esac

case "$(uname -m)" in
  x86_64 | amd64) ARCH="x64" ;;
  aarch64 | arm64) ARCH="arm64" ;;
  *) echo "error: unsupported architecture $(uname -m)" >&2; exit 1 ;;
esac

# ---- resolve version --------------------------------------------------------
VERSION="${VERSION:-latest}"
if [ "$VERSION" = "latest" ]; then
  VERSION="$(curl -fsSL "https://api.github.com/repos/$GH_REPO/releases/latest" | \
    sed -n 's/.*"tag_name": *"\([^"]*\)".*/\1/p')"
fi
VERSION="${VERSION#v}"

# ---- download ---------------------------------------------------------------
ASSET_ROOT="lensetek-${OS}-${ARCH}"
if [ "$OS" = "linux" ]; then
  ASSET="$ASSET_ROOT.tar.gz"
  TAR_FLAG="-xzf"
else
  ASSET="$ASSET_ROOT.zip"
  TAR_FLAG="-xzf"
fi

echo "Installing lensetek v${VERSION} for ${OS}/${ARCH} into $BIN_DIR" >&2
URL="https://github.com/$GH_REPO/releases/download/v${VERSION}/$ASSET"
TMP_DIR="$(mktemp -d)"
trap 'rm -rf "$TMP_DIR"' EXIT
curl -fsSL "$URL" -o "$TMP_DIR/$ASSET"

mkdir -p "$BIN_DIR"
if [ "$OS" = "windows" ]; then
  if ! command -v unzip >/dev/null 2>&1; then
    echo "error: unzip is required (or unzip $ASSET manually into $BIN_DIR)" >&2
    exit 1
  fi
  (cd "$TMP_DIR" && unzip -q -o "$ASSET")
else
  tar $TAR_FLAG "$TMP_DIR/$ASSET" -C "$TMP_DIR"
fi

BINARY="$(find "$TMP_DIR" -type f -name "lensetek*" ! -name "*.zip" ! -name "*.tar.gz" ! -name "package.json" | head -n 1)"
if [ -z "$BINARY" ]; then
  echo "error: could not find the lensetek binary inside $ASSET" >&2
  exit 1
fi
install -m 0755 "$BINARY" "$BIN_DIR/lensetek"
rm -rf "$TMP_DIR"
trap - EXIT

echo "Installed $("$BIN_DIR/lensetek" --version 2>&1)" >&2
echo "" >&2
echo "Add $BIN_DIR to your PATH:" >&2
case "$(basename "${SHELL:-}")" in
  zsh) echo '  echo '"'"'export PATH="'"$BIN_DIR"':$PATH'"'"' >> ~/.zshrc' >&2 ;;
  fish) echo '  fish_add_path '"$BIN_DIR" >&2 ;;
  *) echo '  echo '"'"'export PATH="'"$BIN_DIR"':$PATH'"'"' >> ~/.bashrc' >&2 ;;
esac
echo "Then run: lensetek --help" >&2