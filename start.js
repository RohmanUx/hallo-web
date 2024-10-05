const { spawn } = require('child_process');

// Start the API server
const api = spawn('npm', ['run', 'dev'], { cwd: 'apps./api', shell: true });

// Start the web server
const web = spawn('npm', ['run', 'dev'], { cwd: 'apps./web', shell: true });

// Log output for API
api.stdout.on('data', (data) => {
  console.log(`API: ${data}`);
});

api.stderr.on('data', (data) => {
  console.error(`API Error: ${data}`);
});

// Log output for web
web.stdout.on('data', (data) => {
  console.log(`Web: ${data}`);
});

web.stderr.on('data', (data) => {
  console.error(`Web Error: ${data}`);
});

// Handle exit events
api.on('exit', (code) => {
  console.log(`API process exited with code ${code}`);
});

web.on('exit', (code) => {
  console.log(`Web process exited with code ${code}`);
});
