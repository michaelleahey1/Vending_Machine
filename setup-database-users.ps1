Write-Host "Setting up database users..." -ForegroundColor Cyan
Write-Host ""

$mysqlPath = "mysql"
$dbName = "vending_products_db"
$dbUser = "root"
$dbPass = "NotreDame@1"
$sqlFile = "database\insert-users.sql"

Write-Host "Checking if MySQL is accessible..." -ForegroundColor Yellow
try {
    $test = mysql -u $dbUser -p"$dbPass" -e "SELECT 1;" 2>&1
    if ($LASTEXITCODE -eq 0) {
        Write-Host "MySQL connection successful!" -ForegroundColor Green
    } else {
        Write-Host "MySQL connection failed. Please ensure MySQL is running." -ForegroundColor Red
        Write-Host "You can manually run: mysql -u root -p < database\insert-users.sql" -ForegroundColor Yellow
        exit
    }
} catch {
    Write-Host "Could not find mysql command. Please run manually:" -ForegroundColor Yellow
    Write-Host "  mysql -u root -p < database\insert-users.sql" -ForegroundColor White
    exit
}

Write-Host ""
Write-Host "Inserting users and admins..." -ForegroundColor Yellow
mysql -u $dbUser -p"$dbPass" $dbName < $sqlFile

if ($LASTEXITCODE -eq 0) {
    Write-Host ""
    Write-Host "Database users setup complete!" -ForegroundColor Green
    Write-Host ""
    Write-Host "Test credentials:" -ForegroundColor Cyan
    Write-Host "  Admin: username=admin, password=admin123" -ForegroundColor White
    Write-Host "  User:  username=demo_user, password=user123" -ForegroundColor White
} else {
    Write-Host ""
    Write-Host "Error inserting users. Please check MySQL connection." -ForegroundColor Red
    Write-Host "You can manually run: mysql -u root -p < database\insert-users.sql" -ForegroundColor Yellow
}

