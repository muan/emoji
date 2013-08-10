$ ->

  $("input.search").focus()

  $(document).keydown (e) ->
    if e.keyCode == 83 && !$("input.search:focus").length
      $("input.search").focus()
      false

  if navigator.userAgent.match(/iPad|iPhone/i)
    $("li input, .queue").click ->
      this.selectionStart = 0
      this.selectionEnd = this.value.length
  else
    clip = new ZeroClipboard( $("[data-clipboard-text]"),{ moviePath: "/assets/zeroclipboard.swf"} )
    clip.on "complete", (_, args) -> $("<div class=alert></div>").text("Copied " + args.text).appendTo("body").fadeIn().delay(1000).fadeOut()

    $("li input").attr("readonly", "readonly")
    $("li, .storyline").on "mouseover", ->
      i = $(this).find("input").get(0)
      i.selectionStart = 0
      i.selectionEnd = i.value.length

  $(".add-all").click ->
    $("li:visible .emoji").click()

  $.fn.addToStoryLine = ->
    $(this).clone().appendTo(".story").click ->
      $(this).remove()
      val = $.map( $(".story .emoji"), (e) -> ":" + $(e).attr("title") + ":" ).join("")
      $(".queue").val(val).attr("data-clipboard-text", val)
    val = $.map( $(".story .emoji"), (e) -> ":" + $(e).attr("title") + ":" ).join("")
    $(".queue").val(val).val(val).attr("data-clipboard-text", val)

  $("body").on "click", ".emoji", (e) ->
    e.stopPropagation()
    $(this).addToStoryLine()
