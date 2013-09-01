$ ->
  $(".speedy-filter").speedy() if $(".speedy-filter").length

$.fn.speedy = (result_selector) ->
  $input = $(this)
  window.speedy_keyword = ""
  result_selector ?= ".result"

  search = (keyword) ->
    $(".keyword").text keyword

    unless window.speedy_keyword == keyword
      window.speedy_keyword = keyword
      if keyword.length
        reg = new RegExp( $.trim(keyword) ,"gi")
        $(result_selector).hide()
        $(result_selector).each ->
          $(this).show() if reg.test $(this).text()
      else
        $(result_selector).show()

    $(".js-queue-all").toggle (!!keyword.length && !!$(".result:visible").length)
    $(".no-result").toggle( !$(".result:visible").length )
  
  $input.on "search keyup", -> 
    search( $(this).val() )
    location.hash = $(this).val()

  $(".group").click ->
    search $input.val($(this).attr("href").substr(1)).val()

  if location.hash.length
    search $input.val(location.hash.substr(1)).val()
  else
    search ""

  $(".speedy-remover").click ->
    $input.val("")
    $(result_selector).show()
    search (location.hash = "")
