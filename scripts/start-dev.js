#!/usr/bin/env node

const { spawn } = require('child_process');
const path = require('path');

console.log('🚀 Starting AI Content Assistant Development Environment...\n');

// Array of processes to start
const processes = [
  {
    name: 'API Gateway',
    command: 'npm',
    args: ['run', 'dev'],
    cwd: path.join(__dirname, '..', 'backend', 'api-gateway'),
    color: '\x1b[32m', // Green
  },
  {
    name: 'Auth Service',
    command: 'npm',
    args: ['run', 'dev'],
    cwd: path.join(__dirname, '..', 'backend', 'auth-service'),
    color: '\x1b[33m', // Yellow
  },
  {
    name: 'AI Service',
    command: 'npm',
    args: ['run', 'dev'],
    cwd: path.join(__dirname, '..', 'backend', 'ai-service'),
    color: '\x1b[34m', // Blue
  },
  {
    name: 'Content Service',
    command: 'npm',
    args: ['run', 'dev'],
    cwd: path.join(__dirname, '..', 'backend', 'content-service'),
    color: '\x1b[35m', // Magenta
  },
  {
    name: 'Web Dashboard',
    command: 'npm',
    args: ['run', 'dev'],
    cwd: path.join(__dirname, '..', 'web'),
    color: '\x1b[36m', // Cyan
  }
];

const runningProcesses = [];

// Function to start a process
function startProcess(processConfig) {
  const { name, command, args, cwd, color } = processConfig;

  console.log(`${color}[${name}]\x1b[0m Starting...`);

  const process = spawn(command, args, {
    cwd,
    stdio: 'pipe',
    shell: true
  });

  // Handle stdout
  process.stdout.on('data', (data) => {
    const output = data.toString().trim();
    if (output) {
      console.log(`${color}[${name}]\x1b[0m ${output}`);
    }
  });

  // Handle stderr
  process.stderr.on('data', (data) => {
    const output = data.toString().trim();
    if (output) {
      console.log(`${color}[${name}]\x1b[31m ${output}\x1b[0m`);
    }
  });

  // Handle process exit
  process.on('close', (code) => {
    if (code !== 0) {
      console.log(`${color}[${name}]\x1b[31m Process exited with code ${code}\x1b[0m`);
    } else {
      console.log(`${color}[${name}]\x1b[0m Process exited successfully`);
    }
  });

  process.on('error', (error) => {
    console.error(`${color}[${name}]\x1b[31m Error: ${error.message}\x1b[0m`);
  });

  return process;
}

// Start all processes
processes.forEach(processConfig => {
  const process = startProcess(processConfig);
  runningProcesses.push({ name: processConfig.name, process });
});

console.log('\n✨ All services are starting up...');
console.log('📋 Services:');
processes.forEach(p => {
  console.log(`   • ${p.name}`);
});

console.log('\n🌐 Access points:');
console.log('   • API Gateway: http://localhost:3000');
console.log('   • Web Dashboard: http://localhost:3001');
console.log('   • API Documentation: http://localhost:3000/api/docs');

console.log('\n📱 Mobile Development:');
console.log('   • Run "cd mobile && npm run android" for Android');
console.log('   • Run "cd mobile && npm run ios" for iOS');

console.log('\n🛑 Press Ctrl+C to stop all services\n');

// Handle process termination
process.on('SIGINT', () => {
  console.log('\n🛑 Shutting down all services...');

  runningProcesses.forEach(({ name, process }) => {
    console.log(`Stopping ${name}...`);
    process.kill('SIGTERM');
  });

  setTimeout(() => {
    console.log('✅ All services stopped');
    process.exit(0);
  }, 2000);
});

process.on('SIGTERM', () => {
  runningProcesses.forEach(({ process }) => {
    process.kill('SIGTERM');
  });
  process.exit(0);
});