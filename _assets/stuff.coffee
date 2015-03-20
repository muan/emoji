$(document).on 'emoji:ready', ->
  $(".input-search").focus()
  $(".loading").remove()

  if navigator.userAgent.match(/iPad|iPhone/i)
    $(document).on 'click', '.emoji-code', ->
      this.selectionStart = 0
      this.selectionEnd = this.value.length
  else
    clip = new ZeroClipboard( $("[data-clipboard-text]"),{ moviePath: "/assets/zeroclipboard.swf"} )
    clip.on "complete", (_, args) -> $("<div class=alert></div>").text("Copied " + args.text).appendTo("body").fadeIn().delay(1000).fadeOut()
    $(".emoji-code").attr("readonly", "readonly")

focusOnSearch = (key) ->
  if !$(".input-search:focus").length
    $('.input-search').focus()
    t = $(".input-search").get(0)
    if t.value.length
      t.selectionStart = 0
      t.selectionEnd = t.value.length
    true

$.getJSON 'emojis.json', (emojis) ->
  container = $('.emojis-container')
  $.each emojis, (name, keywords) ->
    container.append "<li class='result emoji-wrapper' data-clipboard-text=':#{name}:'>
      <div class='emoji s_#{name.replace(/\+/,'')}' title='#{name}'>#{name}</div>
      <input type='text' class='autofocus plain emoji-code' value=':#{name}:' />
      <span class='keywords'>#{name} #{keywords}</span>
      </li>"
  $(document).trigger 'emoji:ready'

$(document).keydown (key) -> focusOnSearch(key)

$(document).on 'keydown', '.emoji-wrapper input', (key) ->
   $(".input-search").blur()
   focusOnSearch(key)

$(document).on 'click', '[data-clipboard-text]', ->
  ga 'send', 'event', 'copy', $(this).attr('data-clipboard-text')

$(document).on 'click', '.js-hide-text', ->
  $('.emojis-container').toggleClass('hide-text')
  showorhide = if $('.emojis-container').hasClass('hide-text') then 'hide' else 'show'
  ga 'send', 'event', 'toggle text', showorhide
  false

$(document).on 'click', '.js-clear-search, .mojigroup.active', ->
  location.hash = ""
  false

$(document).on 'click', '.js-contribute', ->
  ga 'send', 'event', 'contribute', 'click'
