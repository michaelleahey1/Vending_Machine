@echo off
title Vending Machine Backend Server
echo ========================================
echo   Vending Machine Backend Server
echo ========================================
echo.
cd /d "%~dp0"
echo Starting with database auto-create enabled...
echo.
java -jar -Dspring.datasource.url="jdbc:mysql://localhost:3306/vending_products_db?createDatabaseIfNotExist=true" -Dspring.datasource.username=root -Dspring.datasource.password=NotreDame@1 target\vending-machine-backend-0.0.1-SNAPSHOT.jar
echo.
echo Server stopped.
pause

