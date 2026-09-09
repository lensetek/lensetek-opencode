#!/usr/bin/env bun
import { $ } from "bun"
import path from "path"
import { fileURLToPath } from "url"
import { Script } from "@opencode-ai/script"
import { BRAND } from "@opencode-ai/core/branding"
import pkg from "../package.json"

const __filename = fileURLToPath(import.meta.url)
const __dirname = path.dirname(__filename)
const dir = path.resolve(__dirname, "..")

process.chdir(dir)

async function published(name: string, version: string) {
  return (await $`npm view ${name}@${version} version`.nothrow()).exitCode === 0
}

async function publish(dir: string, name: string, version: string) {
  // GitHub artifact downloads can drop the executable bit, and Docker uses the
  // unpacked dist binaries directly rather than the published tarball.
  if (process.platform !== "win32") await $`chmod -R 755 .`.cwd(dir)
  if (await published(name, version)) {
    console.log(`already published ${name}@${version}`)
    return
  }
  await $`bun pm pack`.cwd(dir)
  await $`npm publish *.tgz --access public --tag ${Script.channel}`.cwd(dir)
}

const binaries: Record<string, string> = {}
for (const filepath of new Bun.Glob("*/package.json").scanSync({ cwd: "./dist" })) {
  const bin = await Bun.file(`./dist/${filepath}`).json()
  binaries[bin.name] = bin.version
}
console.log("binaries", binaries)
const version = Object.values(binaries)[0]
if (!version) throw new Error("no binaries found in ./dist; run script/build.ts first")

const umbrella = BRAND.npmPackage
await $`mkdir -p ./dist/${umbrella}`
await $`mkdir -p ./dist/${umbrella}/bin`
await $`cp ./script/postinstall.mjs ./dist/${umbrella}/postinstall.mjs`
await Bun.file(`./dist/${umbrella}/LICENSE`).write(await Bun.file("../../LICENSE").text())
await Bun.file(`./dist/${umbrella}/bin/${umbrella}.exe`).write(
  [
    `echo "Error: ${umbrella}'s postinstall script was not run." >&2`,
    'echo "" >&2',
    'echo "This occurs when using --ignore-scripts during installation, or when using a" >&2',
    'echo "package manager like pnpm that does not run postinstall scripts by default." >&2',
    'echo "" >&2',
    'echo "To fix this, run the postinstall script manually:" >&2',
    `echo "  cd node_modules/${umbrella} && node postinstall.mjs" >&2`,
    'echo "" >&2',
    `echo "Or reinstall ${umbrella} without the --ignore-scripts flag." >&2`,
    "exit 1",
    "",
  ].join("\n"),
)

await Bun.file(`./dist/${umbrella}/package.json`).write(
  JSON.stringify(
    {
      name: umbrella,
      bin: {
        [umbrella]: `./bin/${umbrella}.exe`,
      },
      scripts: {
        postinstall: "node ./postinstall.mjs",
      },
      version,
      license: pkg.license,
      os: ["darwin", "linux", "win32"],
      cpu: ["arm64", "x64"],
      optionalDependencies: binaries,
    },
    null,
    2,
  ),
)

const tasks = Object.entries(binaries).map(async ([name]) => publish(`./dist/${name}`, name, binaries[name]))
await Promise.all(tasks)
await publish(`./dist/${umbrella}`, umbrella, version)