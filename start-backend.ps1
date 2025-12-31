Write-Host "Starting Vending Machine Backend..." -ForegroundColor Green
Write-Host ""

$backendPath = "vending-machine-backend\vending-machine-backend"
Set-Location $backendPath

Write-Host "Checking Java..." -ForegroundColor Yellow
java -version
Write-Host ""

Write-Host "Checking JAR file..." -ForegroundColor Yellow
if (Test-Path "target\vending-machine-backend-0.0.1-SNAPSHOT.jar") {
    Write-Host "JAR file found!" -ForegroundColor Green
    Write-Host ""
    Write-Host "Starting backend server..." -ForegroundColor Yellow
    Write-Host "Press Ctrl+C to stop the server" -ForegroundColor Cyan
    Write-Host ""
    java -jar target\vending-machine-backend-0.0.1-SNAPSHOT.jar
} else {
    Write-Host "ERROR: JAR file not found!" -ForegroundColor Red
    Write-Host "Please build the project first with: mvn clean package" -ForegroundColor Yellow
}

Write-Host ""
Write-Host "Backend stopped." -ForegroundColor Red
Read-Host "Press Enter to close"

