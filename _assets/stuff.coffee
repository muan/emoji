$ ->
  $("li").on "mouseover click", ->
    i = $(this).find("input").get(0)
    $(i).select()
    i.selectionStart = 0
    i.selectionEnd = i.value.length