$ ->
  $("li, .storyline").on "mouseover", ->
    i = $(this).find("input").get(0)
    if i.value
      $(i).select()
      i.selectionStart = 0
      i.selectionEnd = i.value.length

  $(".add-all").click ->
    $("li:visible img").click()

  $.fn.addToStoryLine = ->
    $(this).clone().appendTo(".story").click ->
      $(this).remove()
      $(".queue").val $.map( $(".story img"), (e) -> ":" + $(e).attr("title") + ":" ).join("")
    $(".queue").val $.map( $(".story img"), (e) -> ":" + $(e).attr("title") + ":" ).join("")

  $("li img").on "click", -> $(this).addToStoryLine()