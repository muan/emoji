/* global ga, ZeroClipboard, ActiveXObject, $, localStorage */

$(document).on('emoji:ready', function () {
  $('.input-search').focus()
  $('.loading').remove()

  var hasFlash = false
  try {
    hasFlash = Boolean(new ActiveXObject('ShockwaveFlash.ShockwaveFlash'))
  } catch (exception) {
    hasFlash = (typeof navigator.mimeTypes['application/x-shockwave-flash'] !== 'undefined')
  }

  if (!hasFlash || navigator.userAgent.match(/iPad|iPhone|Chrome/i)) {
    $(document).on('click', '.emoji-code', function () {
      this.select()
      document.execCommand('copy')
      window.getSelection().removeAllRanges()
      alertCopied(this.value)
    })
  } else {
    var clip = new ZeroClipboard($('[data-clipboard-text]'), { moviePath: '/assets/zeroclipboard.swf' })
    clip.on('complete', function (_, args) {
      alertCopied(args.text)
    })
    $('.emoji-code').attr('readonly', 'readonly')
  }
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
/*
  All data related to emoticons are stored in /javascripts/emojilib/emojis.json
  each emoticon has data as follows -
  "joy": { "keywords": ["face", "cry", "tears", "weep", "happy", "haha"], "char": "😂", "category": "people" }
  
  $.getJSON is an special Jquery http GET request to read a JSON file over HTTP.

*/

$.getJSON('/javascripts/emojilib/emojis.json', function (emojis) {
  // Here it checks that browser or the device actually suppports the emoticons or not
  var hasFont = window.hasAppleColorEmoji()
  // It creates the conatined
  var container = $('.emojis-container')
  // Iterates over the all emoticons present in JSON file
  Object.keys(emojis).forEach(function (key) {
    // get the data as object of the single emoticon
    var emoji = emojis[key]
    var charHTML
    // If browser supports emoticons then show the emoticon present as emoji['char'] or simply put name which is same as key
    if ((hasFont || navigator.platform.match(/Mac/)) && emoji['char']) {
      charHTML = '<div class="native-emoji" title="' + key + '">' + emoji['char'] + '</div>'
    } else {
      charHTML = '<div class="emoji s_' + key.replace(/\+/, '') + '" title="' + key + '">' + key + '</div>'
    }
    // iterating over container and putting all info in the html
    container.append('<li class="result emoji-wrapper" data-clipboard-text=":' + key + ':">' +
      charHTML + '<input type="text" class="autofocus plain emoji-code" value=":' + key +
      ':" /><span class="keywords">' + key + ' ' + emoji['keywords'] + '</span></li>')
  })
  // As soon as all emoticons displayed properly trigger the ready even so that search can be possible
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
