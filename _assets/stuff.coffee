$ ->
  $("li, .storyline").on "mouseover", ->
    i = $(this).find("input").get(0)
    $(i).select()
    i.selectionStart = 0
    i.selectionEnd = i.value.length

  $("li img").on "click", ->
    $(".placeholder").remove()
    $(this).clone().appendTo(".story")
    $(".queue")[0].value = $(".queue")[0].value + ":" + $(this).attr("title") + ":" 