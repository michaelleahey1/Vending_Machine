@echo off
echo Starting Vending Machine Backend...
echo.
cd /d "%~dp0"
java -jar target\vending-machine-backend-0.0.1-SNAPSHOT.jar
pause

