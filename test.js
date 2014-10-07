var fs          = require('fs')
var data        = JSON.parse(fs.read('emojis.json'))
var keys        = fs.read('emojis.json').toString().match(/\"(.+)\"\:/g).map(function(key){return key.replace(/\"|\:/g,'')})
var buildFailed = false
var passed      = function() { console.log("\033[92mPASSED\033[0m\n") }
var failed      = function() { 
  console.log("\033[91mFAILED\033[0m\n")
  buildFailed = true
}

//
console.log("\nTEST: Correct number of emojis")

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

if(dups.length > 0) {
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

if(unnecessities.length > 0) {
  unnecessities.forEach(function(arr) {
    console.log("\"" + arr[1] + "\" is unnecessary as it is already part of \"" + arr[0] + "\" and will be matched.")
  })
  failed()
} else {
  passed()
}

//
if(buildFailed) {
  console.log(":cry: \033[91mNo good, something failed.\033[0m :boom:\n")
  phantom.exit(buildFailed)
} else {
  console.log(":sparkles: \033[96mWho's awesome? You're awesome!\033[0m :+1:\n")
  phantom.exit()
}
