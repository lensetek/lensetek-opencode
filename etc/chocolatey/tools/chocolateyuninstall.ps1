$ErrorActionPreference = 'Stop'

$toolsDir = "$(Split-Path -Parent $MyInvocation.MyCommand.Definition)"

Uninstall-BinFile -PackageName 'lensetek' -FilePath "$toolsDir\lensetek.exe"
Remove-Item "$toolsDir\lensetek.exe" -Force -ErrorAction SilentlyContinue