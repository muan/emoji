$(document).on('emoji:ready', function () {
  $(".input-search").focus()
  $(".loading").remove()

  var hasFlash = false
  try {
    hasFlash = Boolean(new ActiveXObject('ShockwaveFlash.ShockwaveFlash'))
  } catch (exception) {
    hasFlash = ('undefined' != typeof navigator.mimeTypes['application/x-shockwave-flash'])
  }

  if (!hasFlash || navigator.userAgent.match(/iPad|iPhone/i)) {
    $(document).on('click', '.emoji-code', function () {
      this.select()
      document.execCommand('copy')
      getSelection().removeAllRanges()
      alertCopied(this.value)
    })
  } else {
    var clip = new ZeroClipboard( $('[data-clipboard-text]'),{ moviePath: '/assets/zeroclipboard.swf'} )
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
  if (e.keyCode == 191 && !searchField.length) {
    searchField.focus()
    var t = searchField.get(0)
    if (t.value.length) {
      t.selectionStart = 0
      t.selectionEnd = t.value.length
    }
    return false
  }
}

$.getJSON('/javascripts/emojilib/emojis.json', function (emojis) {
  var hasFont = hasAppleColorEmoji()
  var container = $('.emojis-container')
  Object.keys(emojis).forEach( function (key) {
    var emoji = emojis[key]
    var charHTML
    if (hasFont && emoji["char"]) {
      charHTML = "<div class='native-emoji' title='" + key + "'>" + emoji['char'] + "</div>"
    } else {
      charHTML = "<div class='emoji s_" + key.replace(/\+/,'') + "' title='" + key + "'>" + key + "</div>"
    }
    container.append("<li class='result emoji-wrapper' data-clipboard-text=':" + key + ":'>" +
      charHTML + "<input type='text' class='autofocus plain emoji-code' value=':" + key +
      ":' /><span class='keywords'>" + key + " " + emoji["keywords"] + "</span></li>")
  })
  $(document).trigger('emoji:ready')
})

$(document).keydown(function (e) { focusOnSearch(e) })

$(document).on('keydown', '.emoji-wrapper input', function (e) {
  $(".input-search").blur()
  focusOnSearch(e)
})

$(document).on('click', '[data-clipboard-text]', function () {
  ga('send', 'event', 'copy', $(this).attr('data-clipboard-text'))
})

$(document).on('click', '.js-hide-text', function () {
  $('.emojis-container').toggleClass('hide-text')
  var showorhide = $('.emojis-container').hasClass('hide-text') ? 'hide' : 'show'
  ga('send', 'event', 'toggle text', showorhide)
  return false
})

$(document).on('click', '.js-clear-search, .mojigroup.active', function () {
  location.hash = ""
  return false
})

$(document).on('click', '.js-contribute', function () {
  ga('send', 'event', 'contribute', 'click')
})
