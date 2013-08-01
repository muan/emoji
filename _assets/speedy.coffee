$ ->
  $(".speedy-filter").speedy() if $(".speedy-filter").length

$.fn.speedy = (result_selector) ->
  $input = $(this)
  window.speedy_keyword = ""
  result_selector ?= ".result"

  search = (keyword) ->
    $(".add-all").toggle( !!keyword )

    unless window.speedy_keyword == keyword
      window.speedy_keyword = keyword
      if keyword.length
        reg = new RegExp( $.trim(keyword) ,"gi")
        $(result_selector).hide()
        $(result_selector).each (i, ele) ->
          $(this).show() if ele.innerText.match(reg)
      else
        $(result_selector).show()
  
  $input.on "search keyup", -> 
    search( $(this).val() )
    location.hash = $(this).val()

  $(".group").click ->
    search $(this).attr("href").substr(1)

  if location.hash.length
    search $input.val(location.hash.substr(1)).val()
  else
    search ""

  $(".speedy-remover").click ->
    $input.val("")
    $(result_selector).show()
    search (location.hash = "")