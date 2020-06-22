const fs = require('fs')
const readline = require('readline')

const config = {}

const readInterface = readline.createInterface({
  input: fs.createReadStream('.env'),
  output: process.stdout,
  console: false
})

readInterface.on('line', function(line) {
  const [name, value] = line.split('=')
  
  if (name.startsWith('REACT_APP_')) {
    if (process.env[name]) {
      config[name] = process.env[name]
    }
    config[name] = value
  }
})

readInterface.on('close', function(line) {
  fs.writeFileSync('public/env-config.js', `window.env = ${JSON.stringify(config)}`)
})