@echo off
echo 🚀 AI Content Assistant - Quick Start
echo.

echo 📦 Installing minimal dependencies...
cd web
call npm install next@14.0.4 react@18.2.0 react-dom@18.2.0 typescript@5.3.3 tailwindcss@3.3.6
if errorlevel 1 (
    echo ❌ Installation failed. Trying alternative approach...
    call npm install --force
)

echo.
echo 🌐 Starting the web application...
echo This will open on http://localhost:3001
echo.
echo ✨ What you'll see:
echo   • Professional landing page
echo   • Login/Register pages
echo   • Dashboard with demo data
echo   • Responsive design
echo.
echo Press Ctrl+C to stop when done testing
echo.

call npm run dev

echo.
echo 👋 Thanks for testing AI Content Assistant!
pause