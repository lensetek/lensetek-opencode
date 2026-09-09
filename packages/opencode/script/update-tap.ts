import { $ } from "bun"
import { join } from "node:path"

const version = process.env.OPENCODE_VERSION
const repo = process.env.GH_REPO
const token = process.env.GH_TOKEN
const tapRepo = "lensetek/homebrew-tap"

if (!version || !repo || !token) {
  throw new Error("OPENCODE_VERSION, GH_REPO, and GH_TOKEN are required")
}

const response = await fetch(
  `https://github.com/${repo}/releases/download/v${version}/SHA256SUMS.txt`,
)
if (!response.ok) {
  throw new Error(`Downloading SHA256SUMS.txt failed with HTTP ${response.status}`)
}

const hashes = new Map<string, string>()
for (const line of (await response.text()).split("\n")) {
  const match = line.match(/^([0-9a-f]{64})\s+\.\/(\S+)$/)
  if (match) hashes.set(match[2], match[1])
}

function requireHash(file: string) {
  const hash = hashes.get(file)
  if (!hash) throw new Error(`Missing sha256 for ${file}`)
  return hash
}

const darwinArm = requireHash("lensetek-darwin-arm64.zip")
const darwinX64 = requireHash("lensetek-darwin-x64.zip")
const linuxArm = requireHash("lensetek-linux-arm64.tar.gz")
const linuxX64 = requireHash("lensetek-linux-x64.tar.gz")

const formula = `class Lensetek < Formula
  desc "AI-powered development tool"
  homepage "https://github.com/lensetek/lensetek-opencode"
  version "${version}"
  license "MIT"

  on_macos do
    on_arm do
      url "https://github.com/lensetek/lensetek-opencode/releases/download/v#{version}/lensetek-darwin-arm64.zip"
      sha256 "${darwinArm}"
    end
    on_intel do
      url "https://github.com/lensetek/lensetek-opencode/releases/download/v#{version}/lensetek-darwin-x64.zip"
      sha256 "${darwinX64}"
    end
  end

  on_linux do
    on_arm do
      url "https://github.com/lensetek/lensetek-opencode/releases/download/v#{version}/lensetek-linux-arm64.tar.gz"
      sha256 "${linuxArm}"
    end
    on_intel do
      url "https://github.com/lensetek/lensetek-opencode/releases/download/v#{version}/lensetek-linux-x64.tar.gz"
      sha256 "${linuxX64}"
    end
  end

  def install
    bin.install "lensetek"
  end

  test do
    assert_equal "${version}", shell_output("#{bin}/lensetek --version").strip
  end
end
`

const dir = (await $`mktemp -d`.text()).trim()
await $`gh repo create ${tapRepo} --public --confirm`.quiet().nothrow()
await $`git clone --depth 1 https://x-access-token:${token}@github.com/${tapRepo}.git .`.cwd(dir)
await Bun.write(join(dir, "lensetek.rb"), formula)

const changed = (await $`git status --porcelain`.cwd(dir).text()).trim()
if (changed) {
  await $`git config user.name "lensetek-release-bot"`.cwd(dir)
  await $`git config user.email "release@lensetek.ai"`.cwd(dir)
  await $`git add lensetek.rb`.cwd(dir)
  await $`git commit -m "Update lensetek formula to v${version}"`.cwd(dir)
  await $`git push origin HEAD`.cwd(dir)
  console.log(`Pushed lensetek.rb v${version} to ${tapRepo}`)
} else {
  console.log(`lensetek.rb already at v${version}; nothing to commit`)
}