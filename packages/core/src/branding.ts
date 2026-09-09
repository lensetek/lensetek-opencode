export const BRAND = {
  name: "Lensetek",
  appName: "Lensetek Dev",
  appNameProd: "Lensetek",
  binaryName: "lensetek",
  title: "Lensetek-OPENCODE",
  appId: "com.lensetek.desktop.dev",
  appIdProd: "com.lensetek.desktop",
  appDataDir: "lensetek",
  watermarkText: "LENSETEK-OPENCODE",
  npmPackage: "lensetek",
  githubRepo: "lensetek/lensetek-opencode",
  // Distribution endpoints used by `lensetek upgrade`. Scoop and npm are
  // published on release; brew and choco channels fail cleanly until a
  // lensetek/homebrew-tap repo (GH_PAT) and a chocolatey API key are set.
  installUrl: "https://lensetek.github.io/lensetek-opencode/install.sh",
  brewTap: "lensetek/tap",
  brewFormula: "lensetek",
  chocoPackage: "lensetek",
  scoopPackage: "lensetek",
  skillRepositories: [
    "https://github.com/lensetek/Research-Agent-Skills-Collection",
    "https://github.com/lensetek/Startup-Agent-Skills-Hub",
    "https://github.com/lensetek/BrevetAB-Agent-Skills",
    "https://github.com/lensetek/Book-Author-Agent-Skills",
    "https://github.com/lensetek/Digital-Marketing-Agent_Skills",
    "https://github.com/lensetek/SkillForge",
    "https://github.com/lensetek/Fiction-book-agent-skills",
  ],
} as const
