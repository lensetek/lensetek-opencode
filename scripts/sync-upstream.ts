import { execSync } from "node:child_process"

// Sync the Lensetek fork with upstream opencode (anomalyco/opencode).
//
// Fork-owned branding files (see .gitattributes, merge=ours) always keep the
// Lensetek version when git would otherwise conflict, so a merge can never
// silently overwrite the rebrand with upstream opencode's values.

const UPSTREAM = "upstream"
const UPSTREAM_BRANCH = "upstream/dev"

const PROTECTED_FILES = [
  "packages/core/src/branding.ts",
  "packages/tui/src/logo.ts",
  "packages/tui/src/component/logo.tsx",
]

function run(command: string) {
  execSync(command, { stdio: "inherit" })
}

function capture(command: string) {
  return execSync(command, { encoding: "utf8" }).trim()
}

function captureOrEmpty(command: string) {
  try {
    return execSync(command, { encoding: "utf8" }).trim()
  } catch {
    return ""
  }
}

function ensureRemote() {
  const remotes = capture("git remote")
  if (remotes.split("\n").includes(UPSTREAM)) return
  console.log(`Adding ${UPSTREAM} remote: https://github.com/anomalyco/opencode.git`)
  run(`git remote add ${UPSTREAM} https://github.com/anomalyco/opencode.git`)
}

function ensureMergeDriver() {
  const driver = captureOrEmpty("git config --get merge.ours.driver")
  if (driver) return
  console.log("Registering 'ours' merge driver (used by .gitattributes)…")
  run("git config merge.ours.driver true")
}

function snapshotBranch() {
  const now = new Date()
  const name = `pre-sync-${String(now.getMonth() + 1).padStart(2, "0")}${String(now.getDate()).padStart(2, "0")}`
  const exists = captureOrEmpty(`git branch --list ${name}`)
  if (!exists) {
    run(`git branch ${name}`)
    console.log(`📸 Snapshot branch created: ${name}`)
  } else {
    console.log(`📸 Snapshot branch already exists: ${name}`)
  }
}

function warnUpstreamBrandingChanges() {
  const base = captureOrEmpty(`git merge-base HEAD ${UPSTREAM_BRANCH}`)
  if (!base) return
  const changed = captureOrEmpty(`git diff --name-only ${base} ${UPSTREAM_BRANCH} -- ${PROTECTED_FILES.join(" ")}`)
  if (!changed) return
  console.log("⚠️  Upstream modified fork-owned branding files since the last sync:")
  for (const file of changed.split("\n")) {
    if (file) console.log(`   - ${file}`)
  }
  console.log("   Logos keep the Lensetek version automatically. For branding.ts, review")
  console.log("   upstream's diff and port any new fields (for example new brand keys) manually.")
}

function reportConflicts() {
  const unmerged = captureOrEmpty("git diff --name-only --diff-filter=U")
  if (!unmerged) return
  console.error("⛔ Merge left unresolved conflicts:")
  for (const file of unmerged.split("\n")) {
    if (file) console.error(`   - ${file}`)
  }
  console.error("   Resolve them, then commit the merge manually.")
}

console.log(`🔄 Starting sync with upstream (anomalyco/opencode)…`)

ensureRemote()
ensureMergeDriver()

console.log("1. Fetching upstream…")
run(`git fetch ${UPSTREAM}`)

warnUpstreamBrandingChanges()
snapshotBranch()

console.log(`2. Merging ${UPSTREAM_BRANCH} into current branch…`)
try {
  run(`git merge ${UPSTREAM_BRANCH} --no-edit`)
} catch {
  reportConflicts()
  process.exit(1)
}

console.log("\n✅ Upstream sync completed successfully!")
console.log("✨ Lensetek branding files are preserved via .gitattributes (merge=ours).")
console.log(`   The merge is pending review; complete it with 'git commit' if needed, or `)
console.log("   reset to the snapshot branch if something went wrong.")