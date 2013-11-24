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
        reg = new RegExp( $.trim(keyword) ,"i")
        $(result_selector).hide()
        $(result_selector).each ->
          $(this).show() if reg.test $(this).text()
      else
        $(result_selector).show()

    foundSomething = !!$(".result:visible").length
    $(".js-queue-all").toggle (!!keyword.length && foundSomething)
    $(".no-result").toggle( !foundSomething )
  
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

  window.onhashchange = ->
    search $input.val(location.hash.substr(1)).val()
    $("[href^='#']").removeClass("active")
    $("[href=#{location.hash}]").addClass("active")