var fs   = require('fs')
var data = JSON.parse(fs.read('emojis.json'))
var keys = Object.keys(data)

if(keys.length != 884) {
  console.log("Emojis.json has " + keys.length + " entries, but there are 884 emojis.")
}

var testForDups = []

keys.forEach(function(key) {
  if(testForDups.indexOf(key) < 0) testForDups.push(key)
})

if(testForDups.length != keys.length) {
  testForDups.forEach(function(key) {
    console.log("There is more than one " + key + " in emojis.json.")
  })
}

var testForUnnecessities = []

keys.forEach(function(key) {
  data[key].forEach(function(keyword) {
    if(key.match(keyword)) testForUnnecessities.push([key, keyword])
  })
})

if(testForUnnecessities.length > 0) {
  testForUnnecessities.forEach(function(arr) {
    console.log("\"" + arr[1] + "\" is unnecessary as it is already part of \"" + arr[0] + "\" and will be matched.")
  })
}

var buildFailed = keys.length != 884 || testForDups.length != keys.length || testForUnnecessities.length > 0

if(buildFailed) {
  phantom.exit(buildFailed)
} else {
  console.log(":sparkles::+1:")
  phantom.exit()
}
