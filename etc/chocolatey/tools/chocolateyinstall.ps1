$ErrorActionPreference = 'Stop'

$version = '$version$'
$toolsDir = "$(Split-Path -Parent $MyInvocation.MyCommand.Definition)"

$packageArgs = @{
  packageName    = 'lensetek'
  unzipLocation  = $toolsDir
  url            = "https://github.com/lensetek/lensetek-opencode/releases/download/v$version/lensetek-windows-x64.zip"
  checksum       = '$checksum$'
  checksumType   = 'sha256'
}

Install-ChocolateyZipPackage @packageArgs
Install-ChocolateyBinFile -PackageName 'lensetek' -FilePath "$toolsDir\lensetek.exe"