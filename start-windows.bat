@echo off
echo 🚀 AI Content Assistant - Starting Development Environment...
echo.

echo 📦 Installing Web App Dependencies...
cd web
call npm install
if errorlevel 1 (
    echo ❌ Failed to install web dependencies
    pause
    exit /b 1
)

echo 📦 Installing Backend Dependencies...
cd ..\backend\api-gateway
call npm install
if errorlevel 1 (
    echo ❌ Failed to install API Gateway dependencies
    pause
    exit /b 1
)

cd ..\auth-service
call npm install
if errorlevel 1 (
    echo ❌ Failed to install Auth Service dependencies
    pause
    exit /b 1
)

cd ..\ai-service
call npm install
if errorlevel 1 (
    echo ❌ Failed to install AI Service dependencies
    pause
    exit /b 1
)

echo.
echo ✅ All dependencies installed successfully!
echo.
echo 🚀 Starting development servers...
echo.
echo Opening in separate windows...

cd ..\..\

REM Start API Gateway
start "API Gateway" cmd /k "cd backend\api-gateway && npm run dev"

REM Wait 3 seconds
timeout /t 3 /nobreak >nul

REM Start Auth Service
start "Auth Service" cmd /k "cd backend\auth-service && npm run dev"

REM Wait 3 seconds
timeout /t 3 /nobreak >nul

REM Start AI Service
start "AI Service" cmd /k "cd backend\ai-service && npm run dev"

REM Wait 3 seconds
timeout /t 3 /nobreak >nul

REM Start Web App
start "Web App" cmd /k "cd web && npm run dev"

echo.
echo 🎉 All services are starting!
echo.
echo 📋 Access Points:
echo    • Web Application: http://localhost:3001
echo    • API Gateway: http://localhost:3000
echo.
echo 📝 Demo Login:
echo    • Email: demo@example.com
echo    • Password: demo123456
echo.
echo ⚠️  Make sure to add your OpenAI API key to backend/.env files for full functionality
echo.
echo Press any key to exit...
pause >nul