/* global ga, $ */

$(document).on('emoji:ready', function () {
  if (window.location.hash.length) {
    search($('.speedy-filter').val(window.location.hash.substr(1)).val())
  } else {
    search()
  }
})

function myFoo(){
  console.log("Help");
}

// This funciton is called upon once there is any activity in search field
function search (keyword) {
  // checks if keyword is of the defined type other wise make it empty string
  keyword = typeof keyword === 'undefined' ? '' : keyword
  $('.keyword').text(keyword)
  // trim the string
  keyword = keyword.trim()

// if keyword is not from the keywords of any emoticon hide the result pane and show the result nothing matches 
// Else show the results
  if (window.speedy_keyword !== keyword) {
    window.speedy_keyword = keyword
    if (keyword.length) {
      $('.result').hide()
      $('.result').each(function () {
        if ($(this).text().toLowerCase().indexOf(keyword.toLowerCase()) > -1) {
          $(this).show()
        }
      })
    } else {
      
      $('.result').show()
    }
  }
  setRelatedDOMVisibility(keyword)
}

function setRelatedDOMVisibility (keyword) {
  var foundSomething = Boolean($('.result:visible').length)
  $('.no-results').toggle(!foundSomething)

  if (keyword.length >= 3) {
    if (!foundSomething) {
      ga('send', 'event', 'search', 'no results')
    } else {
      ga('send', 'event', 'search', keyword)
    }
  }
}

$(document).on('search keyup', '.speedy-filter', function () {
  window.location.hash = $(this).val().replace(' ', '_')
})

$(document).on('click', '.group', function () {
  ga('send', 'event', 'search', 'quick group search')
  search($('.speedy-filter').val($(this).attr('href').substr(1)).val())
})

$(document).on('click', '.speedy-remover', function () {
  $('.speedy-filter').val('')
  $('.result').show()
  window.location.hash = ''
})

window.onhashchange = function () {
  search($('.speedy-filter').val(window.location.hash.substr(1)).val())
  $('[href^="#"]').removeClass('active')
  $("[href='#{window.location.hash}']").addClass('active')
}
