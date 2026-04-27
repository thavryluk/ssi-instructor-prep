param([int]$Port = 8866)
$ErrorActionPreference = 'Stop'
$root = Split-Path -Parent $MyInvocation.MyCommand.Path
$stateDir = Join-Path $root 'state'
$stateFile = Join-Path $stateDir 'state.json'
if (-not (Test-Path $stateDir)) { New-Item -ItemType Directory -Path $stateDir | Out-Null }

$prefix = "http://localhost:$Port/"
$listener = [System.Net.HttpListener]::new()
$listener.Prefixes.Add($prefix)
try { $listener.Start() } catch {
    Write-Host "Failed to bind $prefix" -ForegroundColor Red
    exit 1
}

Write-Host ""
Write-Host "  SSI Instructor Prep (PowerShell static server + /state)" -ForegroundColor Cyan
Write-Host "  -> $prefix" -ForegroundColor White
Write-Host ""

$mime = @{
    '.html' = 'text/html; charset=utf-8'
    '.js'   = 'application/javascript; charset=utf-8'
    '.css'  = 'text/css; charset=utf-8'
    '.json' = 'application/json; charset=utf-8'
    '.svg'  = 'image/svg+xml'
    '.png'  = 'image/png'
    '.ico'  = 'image/x-icon'
}

while ($listener.IsListening) {
    try { $ctx = $listener.GetContext() } catch { break }
    $req = $ctx.Request
    $res = $ctx.Response
    $rawPath = [uri]::UnescapeDataString($req.Url.AbsolutePath)
    $path = $rawPath.Split('?')[0]

    if ($path -eq '/state') {
        if ($req.HttpMethod -eq 'GET') {
            $body = if (Test-Path $stateFile) {
                try {
                    $text = Get-Content -Raw -Encoding UTF8 $stateFile
                    [void]([System.Text.Json.JsonDocument]::Parse($text))
                    $text
                } catch { '{}' }
            } else { '{}' }
            $bytes = [System.Text.Encoding]::UTF8.GetBytes($body)
            $res.ContentType = 'application/json; charset=utf-8'
            $res.Headers.Add('Cache-Control', 'no-store')
            $res.StatusCode = 200
            $res.OutputStream.Write($bytes, 0, $bytes.Length)
            $res.Close()
            continue
        } elseif ($req.HttpMethod -eq 'POST') {
            $reader = [System.IO.StreamReader]::new($req.InputStream, [System.Text.Encoding]::UTF8)
            $bodyText = $reader.ReadToEnd()
            try {
                [void]([System.Text.Json.JsonDocument]::Parse($bodyText))
                $tmp = $stateFile + '.tmp'
                [System.IO.File]::WriteAllText($tmp, $bodyText, [System.Text.Encoding]::UTF8)
                if (Test-Path $stateFile) { Remove-Item $stateFile }
                Move-Item $tmp $stateFile
                $ok = [System.Text.Encoding]::UTF8.GetBytes('{"ok":true}')
                $res.ContentType = 'application/json'
                $res.StatusCode = 200
                $res.OutputStream.Write($ok, 0, $ok.Length)
            } catch {
                $err = [System.Text.Encoding]::UTF8.GetBytes("Bad JSON: $_")
                $res.StatusCode = 400
                $res.OutputStream.Write($err, 0, $err.Length)
            }
            $res.Close()
            continue
        }
    }

    if ($path -eq '/' -or $path -eq '') { $path = '/index.html' }
    $rel = $path.TrimStart('/').Replace('/', '\')
    $full = Join-Path $root $rel
    $fullResolved = [System.IO.Path]::GetFullPath($full)
    $rootResolved = [System.IO.Path]::GetFullPath($root)
    $safe = $fullResolved.StartsWith($rootResolved, [StringComparison]::OrdinalIgnoreCase)

    if (-not $safe -or -not (Test-Path $fullResolved -PathType Leaf)) {
        $body = [System.Text.Encoding]::UTF8.GetBytes("404 Not Found: $path")
        $res.ContentType = 'text/plain; charset=utf-8'
        $res.StatusCode = 404
    } else {
        $ext = [System.IO.Path]::GetExtension($fullResolved).ToLower()
        $res.ContentType = if ($mime.ContainsKey($ext)) { $mime[$ext] } else { 'application/octet-stream' }
        $body = [System.IO.File]::ReadAllBytes($fullResolved)
        $res.Headers.Add('Cache-Control', 'no-store')
        $res.StatusCode = 200
    }
    try { $res.OutputStream.Write($body, 0, $body.Length) } catch {}
    $res.Close()
}
$listener.Stop()
