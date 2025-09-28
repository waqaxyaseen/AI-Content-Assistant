#!/usr/bin/env node

const { spawn, execSync } = require('child_process');
const fs = require('fs');
const path = require('path');
const readline = require('readline');

console.log('🚀 AI Content Assistant - Web App Starter\n');

const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout
});

// Check if Node.js version is compatible
function checkNodeVersion() {
  const nodeVersion = process.version;
  const requiredVersion = '18.0.0';
  if (nodeVersion < `v${requiredVersion}`) {
    console.error(`❌ Node.js ${requiredVersion} or higher is required. Current version: ${nodeVersion}`);
    process.exit(1);
  }
  console.log(`✅ Node.js version check passed (${nodeVersion})`);
}

// Function to run commands with error handling
function runCommand(command, description, cwd = process.cwd()) {
  console.log(`📦 ${description}...`);
  try {
    execSync(command, { stdio: 'inherit', cwd });
    console.log(`✅ ${description} completed\n`);
    return true;
  } catch (error) {
    console.error(`❌ Failed to ${description.toLowerCase()}`);
    return false;
  }
}

// Create environment files
function createEnvFiles() {
  console.log('⚙️ Setting up environment files...');

  const webEnvContent = `# API Configuration
NEXT_PUBLIC_API_URL=http://localhost:3000
NEXT_PUBLIC_APP_URL=http://localhost:3001

# Authentication
NEXTAUTH_URL=http://localhost:3001
NEXTAUTH_SECRET=your-super-secret-nextauth-key

# Analytics
NEXT_PUBLIC_GA_ID=your-google-analytics-id

# Environment
NODE_ENV=development
`;

  const backendEnvContent = `# Database Configuration
DATABASE_URL=postgresql://postgres:postgres123@localhost:5432/ai_content_db
REDIS_URL=redis://localhost:6379

# JWT Configuration
JWT_SECRET=your-super-secret-jwt-key-change-in-production
JWT_EXPIRE_TIME=7d

# AI Service API Keys (REQUIRED FOR DEMO)
OPENAI_API_KEY=your-openai-api-key-here
ANTHROPIC_API_KEY=your-anthropic-api-key-here

# Email Service (Optional for demo)
SMTP_HOST=smtp.gmail.com
SMTP_PORT=587
SMTP_USER=your-email@gmail.com
SMTP_PASS=your-app-password

# Environment
NODE_ENV=development
PORT=3000
`;

  // Create web .env file
  if (!fs.existsSync('web/.env.local')) {
    fs.writeFileSync('web/.env.local', webEnvContent);
    console.log('📝 Created web/.env.local');
  }

  // Create backend .env files
  const backendServices = ['api-gateway', 'auth-service', 'ai-service'];
  backendServices.forEach(service => {
    const envPath = `backend/${service}/.env`;
    if (!fs.existsSync(envPath)) {
      fs.writeFileSync(envPath, backendEnvContent);
      console.log(`📝 Created ${envPath}`);
    }
  });

  console.log('✅ Environment files created\n');
}

// Create demo data
function createDemoData() {
  console.log('📊 Creating demo data...');

  const demoData = {
    users: [
      {
        id: '1',
        email: 'demo@example.com',
        firstName: 'Demo',
        lastName: 'User',
        plan: 'professional',
        role: 'user'
      }
    ],
    content: [
      {
        id: '1',
        title: 'Welcome to AI Content Assistant',
        content: 'This is a demo blog post created with AI assistance...',
        type: 'blog',
        status: 'published',
        createdAt: new Date().toISOString()
      }
    ]
  };

  const demoPath = 'backend/demo-data.json';
  fs.writeFileSync(demoPath, JSON.stringify(demoData, null, 2));
  console.log('✅ Demo data created\n');
}

// Install dependencies
function installDependencies() {
  console.log('📦 Installing dependencies...\n');

  // Install web dependencies
  if (!runCommand('npm install', 'Installing web app dependencies', 'web')) {
    return false;
  }

  // Install backend dependencies
  const backendServices = ['api-gateway', 'auth-service', 'ai-service'];
  for (const service of backendServices) {
    if (!runCommand('npm install', `Installing ${service} dependencies`, `backend/${service}`)) {
      return false;
    }
  }

  return true;
}

// Start services
function startServices() {
  console.log('🚀 Starting services...\n');

  const processes = [];

  // Start backend services
  const backendServices = [
    { name: 'API Gateway', port: 3000, dir: 'backend/api-gateway' },
    { name: 'Auth Service', port: 3001, dir: 'backend/auth-service' },
    { name: 'AI Service', port: 3003, dir: 'backend/ai-service' }
  ];

  backendServices.forEach(service => {
    const process = spawn('npm', ['run', 'dev'], {
      cwd: service.dir,
      stdio: 'pipe',
      shell: true
    });

    process.stdout.on('data', (data) => {
      console.log(`\x1b[34m[${service.name}]\x1b[0m ${data.toString().trim()}`);
    });

    process.stderr.on('data', (data) => {
      console.log(`\x1b[34m[${service.name}]\x1b[31m ${data.toString().trim()}\x1b[0m`);
    });

    processes.push({ name: service.name, process });
  });

  // Start web app
  setTimeout(() => {
    const webProcess = spawn('npm', ['run', 'dev'], {
      cwd: 'web',
      stdio: 'pipe',
      shell: true
    });

    webProcess.stdout.on('data', (data) => {
      console.log(`\x1b[36m[Web App]\x1b[0m ${data.toString().trim()}`);
    });

    webProcess.stderr.on('data', (data) => {
      console.log(`\x1b[36m[Web App]\x1b[31m ${data.toString().trim()}\x1b[0m`);
    });

    processes.push({ name: 'Web App', process: webProcess });
  }, 3000);

  // Handle process termination
  process.on('SIGINT', () => {
    console.log('\n🛑 Shutting down all services...');
    processes.forEach(({ name, process }) => {
      console.log(`Stopping ${name}...`);
      process.kill('SIGTERM');
    });
    setTimeout(() => {
      console.log('✅ All services stopped');
      process.exit(0);
    }, 2000);
  });

  return processes;
}

// Main setup and start function
async function main() {
  try {
    checkNodeVersion();

    console.log('🎯 Welcome to AI Content Assistant Setup!\n');
    console.log('This script will help you set up and run the web application.\n');

    // Ask if user wants to continue
    const answer = await new Promise((resolve) => {
      rl.question('Do you want to continue with the setup? (y/n): ', resolve);
    });

    if (answer.toLowerCase() !== 'y' && answer.toLowerCase() !== 'yes') {
      console.log('Setup cancelled.');
      rl.close();
      return;
    }

    console.log('\n🔧 Starting setup...\n');

    // Create environment files
    createEnvFiles();

    // Create demo data
    createDemoData();

    // Install dependencies
    if (!installDependencies()) {
      console.error('❌ Failed to install dependencies. Please check the error messages above.');
      rl.close();
      return;
    }

    console.log('✨ Setup completed successfully!\n');

    // Ask if user wants to start services
    const startAnswer = await new Promise((resolve) => {
      rl.question('Do you want to start the development servers now? (y/n): ', resolve);
    });

    rl.close();

    if (startAnswer.toLowerCase() === 'y' || startAnswer.toLowerCase() === 'yes') {
      console.log('\n🚀 Starting development servers...\n');

      const processes = startServices();

      setTimeout(() => {
        console.log('\n🎉 All services are running!\n');
        console.log('📋 Access Points:');
        console.log('   • Web Application: http://localhost:3001');
        console.log('   • API Gateway: http://localhost:3000');
        console.log('   • API Documentation: http://localhost:3000/api/docs');
        console.log('\n📝 Demo Login:');
        console.log('   • Email: demo@example.com');
        console.log('   • Password: demo123456');
        console.log('\n🛑 Press Ctrl+C to stop all services\n');
      }, 5000);
    } else {
      console.log('\n📋 To start the services later, run:');
      console.log('   npm run dev:web    (for web app only)');
      console.log('   npm run dev        (for all services)');
      console.log('\n🌐 Access the web app at: http://localhost:3001\n');
    }

  } catch (error) {
    console.error('❌ Setup failed:', error.message);
    rl.close();
    process.exit(1);
  }
}

// Run the setup
main();