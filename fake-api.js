'use strict'

const http = require('http')
const pino = require('pino-http')()
const server = http.createServer(handle)

function handle (req, res) {
  pino(req, res)

  setTimeout(function () {
    res.setHeader('content-type', 'application/json')
    res.end(JSON.stringify({
      name: 'Bologna',
      sys: {
        country: 'Italy',
      },
      weather: [{
        description: 'AAAAA'
      }],
      units: 'metric',
      main: {
        temperature: Math.random() * 70,
        pressure: Math.random() * 70,
        humidity: Math.random() * 70
      }
    }))
  }, 500)
}

server.listen(3042)
