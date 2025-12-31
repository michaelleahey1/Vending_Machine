@echo off
title Vending Machine Backend Server
echo ========================================
echo   Vending Machine Backend Server
echo ========================================
echo.
cd /d "%~dp0vending-machine-backend\vending-machine-backend"
echo Current directory: %CD%
echo.
echo Starting backend server...
echo This window will show server logs and errors.
echo Press Ctrl+C to stop the server.
echo.
echo ========================================
echo.
java -jar target\vending-machine-backend-0.0.1-SNAPSHOT.jar
echo.
echo ========================================
echo Server stopped.
pause

