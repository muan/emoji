/* global $, localStorage */
var searchField = document.querySelector('.input-search')
var container = document.querySelector('.emojis-container')
var url = '//unpkg.com/emojilib@^3.0.0'

document.addEventListener('click', function (evt) {
  const emoji = evt.target.closest('.js-emoji')
  if (emoji) {
    getSelection().removeAllRanges()
    var range = document.createRange()
    const node = emoji.querySelector('.js-emoji-char')
    range.selectNodeContents(node)
    getSelection().addRange(range)
    document.execCommand('copy')
    alertCopied(node.getAttribute('data-emoji'))
  } else if (evt.target.classList.contains('js-twemoji')) {
    prepareTwemoji()
    evt.target.hidden = true
    document.querySelector('.js-remove-twemoji').hidden = false
    localStorage.setItem('twemoji-display', 'true')
  } else if (evt.target.classList.contains('js-remove-twemoji')) {
    localStorage.setItem('twemoji-display', 'false')
    window.location.reload()
  }
})

function prepareTwemoji () {
  var twemojiScript = document.createElement('script')
  twemojiScript.src = '//twemoji.maxcdn.com/2/twemoji.min.js?2.2.3'
  twemojiScript.onload = function () {
    twemoji.parse(document.body)
    document.body.classList.add('twemojified')
  }
  document.head.append(twemojiScript)
}

function alertCopied (emoji) {
  var alert = document.createElement('div')
  alert.classList.add('alert')
  alert.textContent = `Copied ${emoji}`
  document.body.append(alert)
  setTimeout(function() {
    alert.remove()
  }, 1000)
}

document.addEventListener('keydown', event => {
  if (event.key === '/' && searchField) {
    if (searchField.value.length) {
      searchField.selectionStart = 0
      searchField.selectionEnd = searchField.value.length
    }
    searchField.focus()
    event.preventDefault()
  }
})

const showingTwemoji = localStorage.getItem('twemoji-display') === 'true'
document.querySelector('.js-remove-twemoji').hidden = !showingTwemoji
document.querySelector('.js-twemoji').hidden = showingTwemoji

fetch(url).then(data => data.json()).then(json => {
  var html
  if (showingTwemoji) prepareTwemoji()
  for (emoji in json) {
    html += `<li class="result emoji-wrapper js-emoji" title="${json[emoji]}">
      <div class="js-emoji-char native-emoji" data-emoji="${emoji}" >${emoji}</div></li>`
  }
  container.innerHTML = html
  document.querySelector('.loading').remove()
  document.dispatchEvent(new CustomEvent('emoji:ready'))
})
