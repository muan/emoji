var fs     = require('fs')
var data   = JSON.parse(fs.read('emojis.json'))
var keys   = fs.read('emojis.json').toString().match(/\"(.+)\"\:/g).map(function(key){return key.replace(/\"|\:/g,'')})
var failed = function() { console.log("\033[91mFAILED\033[0m\n") }
var passed = function() { console.log("\033[92mPASSED\033[0m\n") }

//
console.log("\nTEST: Correct number of emojis")

var testForOrphan = keys.length != 884

if(keys.length != 884) {
  console.log("There are 884 emojis, but emojis.json has " + keys.length + " entries.")
  failed()
} else {
  passed()
}

//
console.log("TEST: No duplicated entries")

var arr = []
var dups = []

keys.forEach(function(key) {
  if(arr.indexOf(key) < 0) {
    arr.push(key)
  } else {
    dups.push(key)
  }
})

var testForDups = dups.length > 0

if(testForDups) {
  dups.forEach(function(key) {
    console.log("There is more than one \"" + key + "\" in emojis.json.")
  })
  failed()
} else {
  passed()
}

//
console.log("TEST: No unnecessary keywords")

var unnecessities = []

keys.forEach(function(key) {
  data[key].forEach(function(keyword) {
    if(key.match(keyword)) unnecessities.push([key, keyword])
  })
})

var testForUnnecessities = unnecessities.length > 0

if(testForUnnecessities) {
  unnecessities.forEach(function(arr) {
    console.log("\"" + arr[1] + "\" is unnecessary as it is already part of \"" + arr[0] + "\" and will be matched.")
  })
  failed()
} else {
  passed()
}

var buildFailed = testForOrphan || testForDups || testForUnnecessities

if(buildFailed) {
  console.log(":cry: \033[91mNo good, something failed.\033[0m :boom:\n")
  phantom.exit(buildFailed)
} else {
  console.log(":sparkles: \033[96mWho's awesome? You're awesome!\033[0m :+1:\n")
  phantom.exit()
}
