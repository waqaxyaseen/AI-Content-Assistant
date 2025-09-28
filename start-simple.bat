@echo off
echo 🚀 AI Content Assistant - Simple Startup
echo.

echo Step 1: Installing Web App Dependencies...
cd web
echo Current directory: %cd%
call npm install --legacy-peer-deps
if errorlevel 1 (
    echo.
    echo ❌ Error installing web dependencies
    echo This might be due to missing dependencies or network issues.
    echo.
    echo Try running these commands manually:
    echo   1. cd web
    echo   2. npm install --legacy-peer-deps
    echo.
    echo Press any key to continue anyway or Ctrl+C to exit...
    pause >nul
)

echo.
echo Step 2: Installing Backend API Gateway Dependencies...
cd ..\backend\api-gateway
echo Current directory: %cd%
call npm install --legacy-peer-deps
if errorlevel 1 (
    echo.
    echo ❌ Error installing API Gateway dependencies
    echo Press any key to continue anyway or Ctrl+C to exit...
    pause >nul
)

echo.
echo ✅ Basic setup completed!
echo.
echo Starting Web App Only (simplified version)...
cd ..\..\web

echo.
echo 🌐 Starting Next.js development server...
echo This will open on http://localhost:3001
echo.
echo Press Ctrl+C to stop the server when you're done testing.
echo.

npm run dev

echo.
echo Server stopped. Press any key to exit...
pause >nul