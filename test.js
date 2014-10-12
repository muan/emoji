var fs          = require('fs')
var rawData     = fs.read('emojis.json').toString()
var data        = JSON.parse(fs.read('emojis.json'))
var keys        = rawData.match(/"(.+)":/g).map(function(key){return key.replace(/"|:/g,'')})
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
    console.log('There is more than one "' + key + '" in emojis.json.')
  })
  failed()
} else {
  passed()
}

//
console.log("TEST: No unnecessary keywords")

var unnecessities = []
var unnecessitiesInKeywords = []

keys.forEach(function(key) {
  data[key].forEach(function(keyword) {
    if(key.match(keyword)) unnecessities.push([key, keyword])

    var otherKeywords = data[key]
    otherKeywords.splice(data[key].indexOf(keyword), 1)
    otherKeywords.forEach(function(otherKeyword) {
      if(otherKeyword.match(keyword)) unnecessitiesInKeywords.push([otherKeyword, keyword, key])
    })
  })
})

if(unnecessities.length > 0 || unnecessitiesInKeywords.length > 0) {
  unnecessities.forEach(function(arr) {
    console.log('"' + arr[1] + '" is unnecessary as it is already part of "' + arr[0] + '" and will be matched.')
  })
  unnecessitiesInKeywords.forEach(function(arr) {
    console.log('"' + arr[1] + '" is unnecessary as a "' + arr[2] + '" already has a keyword "' + arr[0] + '".')
  })

  failed()
} else {
  passed()
}

//
console.log("TEST: Line format")

var offenses = []
var lines = rawData.replace(/^{\n([\s\S]*)\n}\n$/, '$1').split("\n")
var baseRegex = '^  "[\\w+-]+": \\["[\\w- ]+"(, "[\\w- ]+")*\\]'
var contentRegex = new RegExp(baseRegex + ',$')
var lastLineRegex = new RegExp(baseRegex + '$')
lines.forEach(function(line, index) {
  if(index == lines.length - 1) {
    if(!line.match(lastLineRegex)) {
      offenses.push(index + 2)
    }
  } else {
    if(!line.match(contentRegex)) {
      offenses.push(index + 2)
    }
  }
})

if(offenses.length > 0) {
  offenses.forEach(function(lineNo) {
    console.log('Line ' + lineNo + ' has the wrong format.')
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
