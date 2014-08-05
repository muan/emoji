$(document).on 'emoji:ready', ->
  if location.hash.length
    search $('.speedy-filter').val(location.hash.substr(1)).val()
  else
    search()

search = (keyword) ->
  keyword ?= ''
  $('.keyword').text keyword
  keyword = keyword.trim()

  unless window.speedy_keyword == keyword
    window.speedy_keyword = keyword
    if keyword.length
      $('.result').hide()
      $('.result').each ->
        $(this).show() if $(this).text().toLowerCase().indexOf(keyword.toLowerCase()) > -1
    else
      $('.result').show()

  setRelatedDOMVisibility(keyword)

setRelatedDOMVisibility = (keyword) ->
  foundSomething = !!$('.result:visible').length
  $('.js-queue-all').toggle (!!keyword.length && foundSomething)
  $('.no-result').toggle( !foundSomething )

$(document).on 'search keyup', '.speedy-filter', ->
  location.hash = $(this).val()

$(document).on 'click', '.group', ->
  search $('.speedy-filter').val($(this).attr('href').substr(1)).val()

$(document).on 'click', '.speedy-remover', ->
  $('.speedy-filter').val('')
  $('.result').show()
  location.hash = ''

window.onhashchange = ->
  search $('.speedy-filter').val(location.hash.substr(1)).val()
  $('[href^="#"]').removeClass('active')
  $("[href='#{location.hash}']").addClass('active')
