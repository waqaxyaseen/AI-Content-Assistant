#!/usr/bin/env node

const { execSync } = require('child_process');
const fs = require('fs');
const path = require('path');

console.log('🚀 Setting up AI Content Assistant...\n');

// Check if Node.js version is compatible
const nodeVersion = process.version;
const requiredVersion = '18.0.0';
if (nodeVersion < `v${requiredVersion}`) {
  console.error(`❌ Node.js ${requiredVersion} or higher is required. Current version: ${nodeVersion}`);
  process.exit(1);
}

// Function to run commands with error handling
function runCommand(command, description) {
  console.log(`📦 ${description}...`);
  try {
    execSync(command, { stdio: 'inherit' });
    console.log(`✅ ${description} completed\n`);
  } catch (error) {
    console.error(`❌ Failed to ${description.toLowerCase()}`);
    console.error(error.message);
    process.exit(1);
  }
}

// Function to create .env files if they don't exist
function createEnvFiles() {
  const envFiles = [
    { src: '.env.example', dest: '.env' },
    { src: 'backend/api-gateway/.env.example', dest: 'backend/api-gateway/.env' },
    { src: 'backend/auth-service/.env.example', dest: 'backend/auth-service/.env' },
    { src: 'backend/ai-service/.env.example', dest: 'backend/ai-service/.env' },
    { src: 'mobile/.env.example', dest: 'mobile/.env' },
    { src: 'web/.env.example', dest: 'web/.env' },
  ];

  envFiles.forEach(({ src, dest }) => {
    if (fs.existsSync(src) && !fs.existsSync(dest)) {
      fs.copyFileSync(src, dest);
      console.log(`📝 Created ${dest} from ${src}`);
    }
  });
}

// Main setup process
async function setup() {
  try {
    // Install root dependencies
    runCommand('npm install', 'Installing root dependencies');

    // Setup backend services
    console.log('🔧 Setting up backend services...');
    runCommand('cd backend/api-gateway && npm install', 'Installing API Gateway dependencies');
    runCommand('cd backend/auth-service && npm install', 'Installing Auth Service dependencies');
    runCommand('cd backend/content-service && npm install', 'Installing Content Service dependencies');
    runCommand('cd backend/ai-service && npm install', 'Installing AI Service dependencies');
    runCommand('cd backend/user-service && npm install', 'Installing User Service dependencies');
    runCommand('cd backend/analytics-service && npm install', 'Installing Analytics Service dependencies');
    runCommand('cd backend/notification-service && npm install', 'Installing Notification Service dependencies');

    // Setup web dashboard
    console.log('🌐 Setting up web dashboard...');
    runCommand('cd web && npm install', 'Installing Web Dashboard dependencies');

    // Setup mobile app
    console.log('📱 Setting up mobile app...');
    runCommand('cd mobile && npm install', 'Installing Mobile App dependencies');

    // Create environment files
    console.log('⚙️ Setting up environment files...');
    createEnvFiles();

    // Create necessary directories
    const directories = [
      'logs',
      'uploads',
      'backend/logs',
      'mobile/android/app/src/main/assets',
    ];

    directories.forEach(dir => {
      if (!fs.existsSync(dir)) {
        fs.mkdirSync(dir, { recursive: true });
        console.log(`📁 Created directory: ${dir}`);
      }
    });

    console.log('✨ Setup completed successfully!\n');
    console.log('📋 Next steps:');
    console.log('1. Configure your environment variables in the .env files');
    console.log('2. Set up your database (PostgreSQL) and Redis');
    console.log('3. Add your AI API keys (OpenAI, Anthropic, etc.)');
    console.log('4. Run "npm run docker:up" to start the services');
    console.log('5. Run "npm run dev" to start development servers\n');

    console.log('📖 For detailed instructions, check the README.md file');
    console.log('🐛 For issues, visit: https://github.com/yourusername/ai-content-assistant/issues\n');

  } catch (error) {
    console.error('❌ Setup failed:', error.message);
    process.exit(1);
  }
}

// Run setup
setup();