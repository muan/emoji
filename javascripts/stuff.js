var multiSelect = (function () {

  /**
   * currently selected emoji
   * @type {Array}
   * @example [':necktie:', ':jeans:', ':bowtie:']
   */
  var selectedEmojis = [];

  /**
   * indicates if multi select behaviour is active
   * @type {Boolean}
   */
  this.active = false;

  /**
   * add emoji string as selection 
   * @param {String}
   */
  this.add = function (text) {
    var arr = text.split(' ');
    var newEmoji;

    if(arr.length) {
      newEmoji = arr[arr.length - 1];
    } else {
      newEmoji = text;
    }

    selectedEmojis.push(newEmoji);

    this.update();
    this.highlight();
  };

  /**
   * Highlight current selections
   */
  this.highlight = function () {
    $.each(selectedEmojis, function (index, value) {
      $('[data-clipboard-text$="' + value + '"]').addClass('emoji--highlight')
    })
  };

  /**
   * Dehighight selections
   */
  this.dehighight = function () {
    $('.emoji--highlight').removeClass('emoji--highlight');
  };

  /**
   * Reset the selection, including the array, clipboards texts and the highlighting
   */
  this.reset = function () {
    selectedEmojis = [];

    $('[data-clipboard-text]').each(function () {
      var emojis = $(this).data('clipboard-text').split(' ');
      var original = emojis[emojis.length - 1];
      $(this).attr('data-clipboard-text', original);
    });

    this.dehighight();
  };

  /**
   * Append to all clipboard texts the multi selected emojis
   */
  this.update = function () {
    if(!selectedEmojis.length) return;

    $('[data-clipboard-text]').each(function () {
      var prefix = selectedEmojis.join(' ');
      var newContent = prefix + ' ' + $(this).data('clipboard-text');
      $(this).attr('data-clipboard-text', newContent)
    });
  };

  /**
   * turn on multi selection when SHIFT key is pressed
   */
  $(document).on('keydown', function () {
    if(event.which === 16) {
      event.preventDefault();
      this.active = true;
    }
  }.bind(this));

  /**
   * turn off and reset multi selection when SHIFT key is released
   */
  $(document).on('keyup', function (event) {
    if(event.which === 16) {
      event.preventDefault();
      this.active = false;
      this.reset();
    }
  }.bind(this));

  return this;
})();
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
      this.selectionStart = 0
      this.selectionEnd = this.value.length
    })
  } else {
    var nodes = $('[data-clipboard-text]');

    var clip = new ZeroClipboard(nodes, { 
      moviePath: '/assets/zeroclipboard.swf'
    });

    clip.on('complete', function (clip, args) {
      $('<div class=alert></div>').text('Copied ' + args.text).appendTo('body').fadeIn().delay(1000).fadeOut()

      // is SHIFT key is pressed, add multi select emoji
      if(multiSelect.active) {
        multiSelect.add(args.text);
      }
    });

    $('.emoji-code').attr('readonly', 'readonly')
  }
})

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
