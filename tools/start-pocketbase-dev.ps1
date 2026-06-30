$ErrorActionPreference = "Stop"

$root = Split-Path -Parent $PSScriptRoot
$envFile = Join-Path $root ".env.local"
$pbExe = Join-Path $root "backend\pocketbase.exe"
$pbDir = if ($env:PB_DATA_DIR) { $env:PB_DATA_DIR } else { Join-Path $root "backend\pb_data_dev" }
$httpAddr = if ($env:PB_HTTP_ADDR) { $env:PB_HTTP_ADDR } else { "127.0.0.1:8090" }
$hooksDir = Join-Path $root "backend\pb_hooks"
$devMigrationsDir = Join-Path $root "backend\pb_migrations_dev"
$migrationsDir = if ($env:PB_MIGRATIONS_DIR) {
  $env:PB_MIGRATIONS_DIR
} elseif (Test-Path $devMigrationsDir) {
  $devMigrationsDir
} else {
  Join-Path $root "backend\pb_migrations"
}

if (Test-Path $envFile) {
  Get-Content $envFile | ForEach-Object {
    $line = $_.Trim()
    if (-not $line -or $line.StartsWith("#") -or -not $line.Contains("=")) {
      return
    }

    $parts = $line.Split("=", 2)
    [Environment]::SetEnvironmentVariable($parts[0].Trim(), $parts[1].Trim(), "Process")
  }
}

if (-not (Test-Path $pbExe)) {
  throw "PocketBase executable not found at $pbExe"
}

& $pbExe serve `
  --http=$httpAddr `
  --dir=$pbDir `
  --migrationsDir=$migrationsDir `
  --hooksDir=$hooksDir `
  --hooksWatch=false `
  --encryptionEnv=PB_ENCRYPTION_KEY
