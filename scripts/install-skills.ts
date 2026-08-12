import { execSync } from "node:child_process"
import fs from "node:fs"
import path from "node:path"
import os from "node:os"
import { BRAND } from "../packages/core/src/branding"

console.log("🚀 Installing Lensetek Agent Skill Collections...")

const globalConfigDir = process.env.APPDATA
  ? path.join(process.env.APPDATA, BRAND.appDataDir, "skills")
  : path.join(os.homedir(), ".config", "opencode", "skills")

if (!fs.existsSync(globalConfigDir)) {
  fs.mkdirSync(globalConfigDir, { recursive: true })
}

console.log(`📁 Target global skills directory: ${globalConfigDir}\n`)

for (const repoUrl of BRAND.skillRepositories) {
  const repoName = path.basename(repoUrl, ".git")
  const targetPath = path.join(globalConfigDir, repoName)

  if (fs.existsSync(targetPath)) {
    console.log(`🔄 Updating existing skill repo: ${repoName}...`)
    try {
      execSync("git pull", { cwd: targetPath, stdio: "inherit" })
    } catch {
      console.warn(`⚠️ Failed to pull ${repoName}, skipping update.`)
    }
  } else {
    console.log(`📥 Cloning new skill repo: ${repoName}...`)
    try {
      execSync(`git clone ${repoUrl} "${targetPath}"`, { stdio: "inherit" })
    } catch {
      console.warn(`⚠️ Failed to clone ${repoName}.`)
    }
  }
}

console.log("\n✅ All Lensetek Agent Skill collections have been installed successfully!")
console.log("💡 You can now invoke any of these skills directly inside Lensetek CLI or Desktop!")
