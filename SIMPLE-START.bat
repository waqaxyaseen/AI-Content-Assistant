@echo off
echo 🚀 AI Content Assistant - Compatible Version
echo.
echo Node.js version detected: v18.12.0
echo Installing compatible Next.js version...
echo.

cd web

echo 🧹 Cleaning previous installation...
if exist node_modules rmdir /s /q node_modules
if exist package-lock.json del package-lock.json

echo.
echo 📦 Installing compatible dependencies...
call npm install

if errorlevel 1 (
    echo.
    echo ❌ Installation failed. Trying with --force flag...
    call npm install --force
)

echo.
echo ✅ Installation complete!
echo.
echo 🌐 Starting the web application...
echo.
echo 🎯 What you'll see at http://localhost:3001:
echo   ✓ Professional landing page
echo   ✓ Login page (enter any email/password)
echo   ✓ Dashboard with demo data
echo   ✓ Responsive design
echo.
echo 🛑 Press Ctrl+C to stop the server
echo.

call npm run dev

echo.
echo Server stopped. Press any key to exit...
pause >nul