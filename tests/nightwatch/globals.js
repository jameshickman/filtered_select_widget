/**
 * Nightwatch global setup and teardown
 */
const { spawn } = require('child_process');
let httpServer;

module.exports = {
  // Before all tests, start http-server
  before: function(done) {
    console.log('Starting HTTP server...');
    httpServer = spawn('npx', ['http-server', '-p', '8080', '--silent'], {
      detached: true,
      stdio: ['ignore', 'pipe', 'pipe']
    });
    
    // Give the server some time to start
    setTimeout(function() {
      console.log('HTTP server started');
      done();
    }, 2000);
  },
  
  // After all tests, kill http-server
  after: function(done) {
    console.log('Stopping HTTP server...');
    if (httpServer) {
      process.kill(-httpServer.pid);
      console.log('HTTP server stopped');
    }
    done();
  }
};