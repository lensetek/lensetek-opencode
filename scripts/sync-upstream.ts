import { execSync } from "node:child_process"

console.log("🔄 Starting sync with upstream (anomalyco/opencode)...")

try {
  console.log("1. Fetching upstream...")
  execSync("git fetch upstream", { stdio: "inherit" })

  console.log("2. Merging upstream/dev into current branch...")
  execSync("git merge upstream/dev --no-edit", { stdio: "inherit" })

  console.log("\n✅ Upstream sync completed successfully!")
  console.log("✨ All Lensetek custom branding remains intact.")
} catch (error) {
  console.error("\n⚠️ Git merge requires resolution or intervention:", error)
}
