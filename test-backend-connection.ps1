Write-Host "Testing Backend Connection..." -ForegroundColor Cyan
Write-Host ""

# Check if backend is running
$backendRunning = Test-NetConnection -ComputerName localhost -Port 8080 -InformationLevel Quiet -WarningAction SilentlyContinue

if ($backendRunning) {
    Write-Host "Backend is running on port 8080" -ForegroundColor Green
    
    Write-Host ""
    Write-Host "Testing /api/products endpoint..." -ForegroundColor Yellow
    try {
        $response = Invoke-RestMethod -Uri "http://localhost:8080/api/products" -Method GET -ErrorAction Stop
        Write-Host "API is responding!" -ForegroundColor Green
        Write-Host "Found $($response.Count) products" -ForegroundColor Cyan
    } catch {
        Write-Host "API error: $($_.Exception.Message)" -ForegroundColor Red
    }
    
    Write-Host ""
    Write-Host "Testing /api/user/auth/login endpoint..." -ForegroundColor Yellow
    try {
        $body = @{
            username = "demo_user"
            password = "user123"
        } | ConvertTo-Json
        
        $response = Invoke-RestMethod -Uri "http://localhost:8080/api/user/auth/login" -Method POST -Body $body -ContentType "application/json" -ErrorAction Stop
        if ($response.success) {
            Write-Host "Login endpoint is working!" -ForegroundColor Green
        } else {
            Write-Host "Login failed: $($response.message)" -ForegroundColor Yellow
        }
    } catch {
        Write-Host "Login endpoint error: $($_.Exception.Message)" -ForegroundColor Red
    }
} else {
    Write-Host "Backend is NOT running on port 8080" -ForegroundColor Red
    Write-Host ""
    Write-Host "To start the backend:" -ForegroundColor Yellow
    Write-Host "  1. Open PowerShell in the project root" -ForegroundColor White
    Write-Host "  2. Run: .\start-backend.ps1" -ForegroundColor White
}

Write-Host ""
