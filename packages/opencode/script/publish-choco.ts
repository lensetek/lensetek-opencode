import { $ } from "bun"
import { cp, mkdtemp, rm } from "node:fs/promises"
import { join } from "node:path"
import { tmpdir } from "node:os"

const version = process.env.OPENCODE_VERSION
const repo = process.env.GH_REPO

if (!version || !repo) {
  throw new Error("OPENCODE_VERSION and GH_REPO are required")
}

const response = await fetch(
  `https://github.com/${repo}/releases/download/v${version}/SHA256SUMS.txt`,
)
if (!response.ok) {
  throw new Error(`Downloading SHA256SUMS.txt failed with HTTP ${response.status}`)
}

const match = (await response.text()).match(
  /^([0-9a-f]{64})\s+\.\/lensetek-windows-x64\.zip$/m,
)
if (!match) {
  throw new Error("Missing sha256 for lensetek-windows-x64.zip")
}
const checksum = match[1]

const packageDir = await mkdtemp(join(tmpdir(), "lensetek-choco-"))
await cp(join(import.meta.dir, "../../../etc/chocolatey"), packageDir, {
  recursive: true,
})

for (const file of ["lensetek.nuspec", "tools/chocolateyinstall.ps1"]) {
  const path = join(packageDir, file)
  const content = await Bun.file(path).text()
  await Bun.write(
    path,
    content.replaceAll("$version$", version).replaceAll("$checksum$", checksum),
  )
}

const search = await $`choco search lensetek --exact --source https://community.chocolatey.org/api/v2/`.nothrow()
if (/\blensetek\b[^0-9]*\b${version.replaceAll(".", "\\.")}\b/.test(`${search.stdout}`)) {
  await rm(packageDir, { recursive: true, force: true })
  console.log(`lensetek ${version} already published; skipping`)
  process.exit(0)
}

await $`choco pack ${join(packageDir, "lensetek.nuspec")}`.cwd(packageDir)

const apiKey = process.env.CHOCOLATEY_API_KEY
const push = await $`choco push ${join(packageDir, `lensetek.${version}.nupkg`)} --source https://push.chocolatey.org/ ${apiKey ? `--api-key ${apiKey}` : ""}`.nothrow()
const pushOutput = `${push.stdout}`.trim()
if (push.exitCode !== 0) {
  throw new Error(`choco push failed with exit ${push.exitCode}: ${pushOutput || "no output"}`)
}

await rm(packageDir, { recursive: true, force: true })
console.log(`Published lensetek ${version} to chocolatey`)