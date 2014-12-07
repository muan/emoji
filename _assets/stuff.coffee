$(document).on 'emoji:ready', ->
  $(".input-search").focus()
  $(".loading").remove()

  if navigator.userAgent.match(/iPad|iPhone/i)
    $(document).on 'click', '.emoji-code, .queue', ->
      this.selectionStart = 0
      this.selectionEnd = this.value.length
  else
    clip = new ZeroClipboard( $("[data-clipboard-text]"),{ moviePath: "/assets/zeroclipboard.swf"} )
    clip.on "complete", (_, args) -> $("<div class=alert></div>").text("Copied " + args.text).appendTo("body").fadeIn().delay(1000).fadeOut()

    $(".emoji-code").attr("readonly", "readonly")

focusOnSearch = (e) ->
  if e.keyCode == 83 && !$(".input-search:focus").length
    $(".input-search").focus()
    t = $(".input-search").get(0)
    if t.value.length
      t.selectionStart = 0
      t.selectionEnd = t.value.length
    false

$.getJSON 'emojis.json', (emojis) ->
  container = $('.emojis-container')
  i = 0
  $.each emojis, (name, keywords) ->
    i++
    container.append "<li class='result emoji-wrapper'><div class='emoji s_#{name.replace(/\+/,'')}' title='#{name}'>#{name}</div>
      <input type='text' class='autofocus plain emoji-code' value=':#{name}:' data-clipboard-text=':#{name}:' />
      <span class='keywords'>#{name} #{keywords}</span>
      </li>"
    $(document).trigger 'emoji:ready' if Object.keys(emojis).length == i

$(document).keydown (e) -> focusOnSearch(e)

$(document).on 'keydown', '.emoji-wrapper input', (e) ->
  $(".input-search").blur(); focusOnSearch(e)

$(document).on 'click', '.js-queue-all', ->
  $("li:visible .emoji").click()
  false

$(document).on 'click', '.js-hide-text', ->
  $("ul").toggleClass("hide-text")
  false

$(document).on 'click', '.story .emoji', (e)->
  $(this).remove()
  updateQueue()
  false

$(document).on "click", ".list .emoji", (e) ->
  $(this).clone().appendTo(".story")
  updateQueue()
  false

$(document).on 'click', '.label.active', ->
  location.hash = ""
  false

$(document).on 'click', '.js-clear-queue', ->
  $(".story .emoji").remove()
  updateQueue()
  false

$(document).on 'click', '.js-contribute', ->
  ga 'send', 'event', 'contribute', 'click'

updateQueue = ->
  val = $.map( $(".story .emoji"), (e) -> ":" + $(e).attr("title") + ":" ).join("")
  $(".js-copy-queue").attr("data-clipboard-text", val)
  $(".story").toggleClass("queued", !!$(".story .emoji").length )
