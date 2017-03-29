/* global ga, $, localStorage */

$(document).on('emoji:ready', function () {
  $('.input-search').focus()
  $('.loading').remove()

  $(document).on('click', '.js-emoji', function (evt) {
    var node

    if (evt.shiftKey) {
      getSelection().removeAllRanges()
      var range = document.createRange()
      node = this.querySelector('.js-emoji-char')
      range.selectNodeContents(node)
      getSelection().addRange(range)
    } else {
      node = this.querySelector('.js-emoji-code')
      node.select()
    }

    document.execCommand('copy')

    alertCopied(evt.shiftKey ? node.innerText : node.value)
  })
})

function alertCopied (emoji) {
  $('<div class=alert></div>').text('Copied ' + emoji).appendTo('body').fadeIn().delay(1000).fadeOut()
}

function focusOnSearch (e) {
  var searchField = $('.input-search')[0]
  if (e.keyCode === 191 && searchField) {
    if (searchField.value.length) {
      searchField.selectionStart = 0
      searchField.selectionEnd = searchField.value.length
    }
    searchField.focus()
    e.preventDefault()
    return false
  }
}

$.getJSON('/javascripts/emojilib/emojis.json', function (emojis) {
  var hasFont = window.hasAppleColorEmoji()
  var container = $('.emojis-container')
  Object.keys(emojis).forEach(function (key) {
    var emoji = emojis[key]
    var charHTML
    charHTML = '<div class="js-emoji-char native-emoji" title="' + key + '">' + emoji['char'] + '</div>'
    container.append('<li class="result emoji-wrapper js-emoji">' +
      charHTML + '<input type="text" class="js-emoji-code autofocus plain emoji-code" value=":' + key +
      ':" readonly /><span class="keywords">' + key + ' ' + emoji['keywords'] + '</span></li>')
  })
  $(document).trigger('emoji:ready')
  $('.emojis-container').toggleClass('hide-text', localStorage.getItem('emoji-text-display') === 'false')
})

$(document).keydown(function (e) { focusOnSearch(e) })

$(document).on('keydown', '.emoji-wrapper input', function (e) {
  $('.input-search').blur()
  focusOnSearch(e)
})

$(document).on('click', '[data-clipboard-text]', function () {
  ga('send', 'event', 'copy', $(this).attr('data-clipboard-text'))
})

$(document).on('click', '.js-hide-text', function () {
  $('.emojis-container').toggleClass('hide-text')
  var showorhide = $('.emojis-container').hasClass('hide-text') ? 'hide' : 'show'
  localStorage.setItem('emoji-text-display', !$('.emojis-container').hasClass('hide-text'))
  ga('send', 'event', 'toggle text', showorhide)
  return false
})

$(document).on('click', '.js-clear-search, .mojigroup.active', function () {
  window.location.hash = ''
  return false
})

$(document).on('click', '.js-contribute', function () {
  ga('send', 'event', 'contribute', 'click')
})
