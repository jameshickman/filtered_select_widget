// Nightwatch configuration file
module.exports = {
  src_folders: ['tests/nightwatch'],
  page_objects_path: ['tests/pages'],
  globals_path: 'tests/nightwatch/globals.js',
  
  webdriver: {
    start_process: true,
    server_path: require('chromedriver').path,
    port: 9515
  },
  
  test_settings: {
    default: {
      launch_url: 'http://localhost:8080',
      desiredCapabilities: {
        browserName: 'chrome',
        'goog:chromeOptions': {
          w3c: true,
          args: ['--headless', '--no-sandbox', '--disable-dev-shm-usage']
        }
      },
      screenshots: {
        enabled: true,
        on_failure: true,
        on_error: true,
        path: 'tests/screenshots'
      }
    },
    
    firefox: {
      webdriver: {
        server_path: require('geckodriver').path,
        port: 4444
      },
      desiredCapabilities: {
        browserName: 'firefox',
        'moz:firefoxOptions': {
          args: ['--headless']
        }
      }
    }
  }
};