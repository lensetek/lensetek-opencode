#!/usr/bin/env bun
import { $ } from "bun"

import { cpSync, existsSync, mkdirSync } from "node:fs"
import path from "node:path"
import os from "node:os"
import { downloadCliToResources, resolveChannel } from "./utils"

const channel = resolveChannel()
await $`bun ../../scripts/install-skills.ts`
await $`bun ./scripts/copy-icons.ts ${channel}`
await $`bun ./scripts/copy-metainfo.ts ${channel}`

const appDataSkills = process.env.APPDATA
  ? path.join(process.env.APPDATA, "lensetek", "skills")
  : path.join(os.homedir(), ".config", "opencode", "skills")

const targetResourcesSkills = path.join(import.meta.dirname, "../resources/skills")
if (existsSync(appDataSkills)) {
  mkdirSync(targetResourcesSkills, { recursive: true })
  cpSync(appDataSkills, targetResourcesSkills, {
    recursive: true,
    filter: (src) => !src.includes(`${path.sep}.git`),
  })
}

await $`cd ../opencode && bun script/build-node.ts`
if (channel === "dev") await downloadCliToResources()
