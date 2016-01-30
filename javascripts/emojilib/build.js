var fs = require('fs')
var path = require('path')
var JSONStream = require('JSONStream')
var format = require('format-json-stream')

var simplemap = fs.createWriteStream(path.join(__dirname, 'simplemap.json'))

fs.createReadStream(path.join(__dirname, 'emojis.json'))
  .pipe(JSONStream.parse('*', function (val, key) {
    if (val.char) {
      return [key[0], val.char]
    }
  }))
  .pipe(JSONStream.stringifyObject())
  .pipe(format())
  .pipe(simplemap)
