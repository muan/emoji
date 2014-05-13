$(document).on 'emoji:ready', ->
  if location.hash.length
    search $('.speedy-filter').val(location.hash.substr(1)).val()
  else
    search()

#flag to help decide if hash is being set by us or by user
currently_setting_hash = false

currentTimeout = undefined
    
#We keep track of the fact that we're setting the hash programmatically.
#To give JQuery a chance to detect the change, we use setTimeout.
#If we didn't use setTimeout, the onhashchange method would never see the
#currently_setting_hash variable as true.
updateHash = (keyword) ->
  currently_setting_hash = true
  window.location.hash = keyword
  currentTimeout = setTimeout ->
    currently_setting_hash = false
  , 100
    
updateLabels = (keyword) ->
  $('[href^="#"]').removeClass('active')
  $("[href=##{keyword}]").addClass('active')
    
search = (keyword) ->
  console.log('searchin')
  keyword ?= ''
  $('.keyword').text keyword
  updateLabels keyword
  unless window.speedy_keyword == keyword
    window.speedy_keyword = keyword
    if keyword.length
      $('.result').hide()
      $('.result').each ->
        $(this).show() if $(this).text().indexOf(keyword) > -1
    else
      $('.result').show()

  setRelatedDOMVisibility(keyword)

setRelatedDOMVisibility = (keyword) ->
  foundSomething = !!$('.result:visible').length
  $('.js-queue-all').toggle (!!keyword.length && foundSomething)
  $('.no-result').toggle( !foundSomething )

$(document).on 'search keyup', '.speedy-filter', -> 
  search( $(this).val() )
  updateHash($(this).val())

$(document).on 'click', '.group', ->
  search $('.speedy-filter').val($(this).attr('href').substr(1)).val()

$(document).on 'click', '.speedy-remover', ->
  $('.speedy-filter').val('')
  updatehash('')
  $('.result').show()
  search ('')
    
   
$(window)
  .on 'hashchange', ->
    if currently_setting_hash
      clearTimeout currentTimeout
      currently_setting_hash = false
      return
    else
      currently_setting_hash = false
      search $('.speedy-filter').val(window.location.hash.substr(1)).val()
      updateLabels(window.location.hash)
  .trigger('hashchange')