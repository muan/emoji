/* global $, localStorage */
var searchField = document.querySelector('.input-search')
var container = document.querySelector('.emojis-container')
var url = '//unpkg.com/emojilib@^2.0.0/emojis.json'
var hasFont = hasAppleColorEmoji()

document.addEventListener('click', function (evt) {
  const emoji = evt.target.closest('.js-emoji')
  if (emoji) {
    var node
    var text

    if (evt.shiftKey) {
      getSelection().removeAllRanges()
      var range = document.createRange()
      node = emoji.querySelector('.js-emoji-char')
      range.selectNodeContents(node)
      getSelection().addRange(range)

      text = hasFont ? node.textContent : node.querySelector('img').alt
    } else {
      node = emoji.querySelector('.js-emoji-code')
      node.select()
      text = node.value
    }

    document.execCommand('copy')
    alertCopied(text)
  } else if (evt.target.classList.contains('js-hide-text')) {
    container.classList.toggle('hide-text')
    var showorhide = container.classList.contains('hide-text') ? 'hide' : 'show'
    localStorage.setItem('emoji-text-display', !showorhide)
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

fetch(url).then(data => data.json()).then(json => {
  var html
  for (key in json) {
    var emoji = json[key]
    if (emoji['category'] === '_custom') return

    html += `<li class="result emoji-wrapper js-emoji">
      <div class="js-emoji-char native-emoji" title="${key}">${emoji['char']}</div>
      <input type="text" class="js-emoji-code autofocus plain emoji-code" value=":${key}:" readonly>
      <span class="keywords">${key} ${emoji['keywords']}</span></li>`
  }
  container.innerHTML = html
  container.classList.toggle('hide-text', localStorage.getItem('emoji-text-display') === 'false')
  if (!hasFont) prepareTwemoji()
  document.querySelector('.loading').remove()
  document.dispatchEvent(new CustomEvent('emoji:ready'))
})
