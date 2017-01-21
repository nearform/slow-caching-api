var fs = require('fs')
var mustache = require('mustache')
var template = fs.readFileSync('./template.mustache').toString()

module.exports = function (locals) {
  doThingsThatTakeAWhile()
  return mustache.render(template, locals)
}

function doThingsThatTakeAWhile() {
  var i = 1e8
  while(i--){} //<--taking a while ლ(ಠ益ಠლ) ...makes each render take around 60ms
}