var fs = require('fs')
var lru = require('lru-cache')
var express = require('express')
var request = require('request')

var render = require('./render')

var cache = lru({maxAge: 6e5}) //10 mins
var api = 'http://localhost:3042/?'
var app = express()

app.get('/:city', function (req, res) {
  var city = req.params.city || 'London' 
  var units = req.query.units || 'metric'
  var url = api + city + '&units=' + units
  var html = cache.get(url)

  if (html) { return res.send(html) }

  request(url, function (err, data) {
    if (err) { return res.sendStatus(500) }
    data = JSON.parse(data.body)
    var html = render({
      city: data.name,
      country: data.sys.country,
      status: data.weather[0].description,
      unit: units === 'metric' ? 'C' : (units === 'imperial' ? 'F' : 'K'),
      temperature: data.main.temp,
      pressure: data.main.pressure,
      humidity: data.main.humidity
    })
    cache.set(url, html)
    res.send(html)
  })

})

app.listen(3000)
