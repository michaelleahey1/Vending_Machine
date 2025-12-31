# Test password hashing
Add-Type -AssemblyName System.Security

$password = "user123"
$sha256 = [System.Security.Cryptography.SHA256]::Create()
$hashBytes = $sha256.ComputeHash([System.Text.Encoding]::UTF8.GetBytes($password))
$hashString = [System.BitConverter]::ToString($hashBytes).Replace("-", "").ToLower()

Write-Host "Password: $password" -ForegroundColor Cyan
Write-Host "SHA-256 Hash: $hashString" -ForegroundColor Yellow

# Expected hash from database
$expectedHash = "a665a45920422f9d417e4867efdc4fb8a04a1f3fff1fa07e998e86f7f7a27ae3"
Write-Host "Expected Hash: $expectedHash" -ForegroundColor Cyan

if ($hashString -eq $expectedHash) {
    Write-Host "✓ Hashes MATCH!" -ForegroundColor Green
} else {
    Write-Host "✗ Hashes DO NOT MATCH!" -ForegroundColor Red
    Write-Host "This explains why login fails!" -ForegroundColor Red
}

