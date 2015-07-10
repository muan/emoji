$(document).on('emoji:ready', function () {
  if (location.hash.length) {
    search($('.speedy-filter').val(location.hash.substr(1)).val())
  } else {
    search()
  }
})

function search (keyword) {
  var keyword = typeof keyword === 'undefined' ? '' : keyword
  $('.keyword').text(keyword)
  keyword = keyword.trim()

  if (window.speedy_keyword !== keyword) {
    window.speedy_keyword = keyword
    if (keyword.length) {
      $('.result').hide()
      $('.result').each(function () {
        if($(this).text().toLowerCase().indexOf(keyword.toLowerCase()) > -1) {
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
  $('.no-results').toggle( !foundSomething )

  if (keyword.length >= 3) {
    if (!foundSomething) {
      ga('send', 'event', 'search', 'no results')
    } else {
      ga('send', 'event', 'search', keyword)
    }
  }
}

$(document).on('search keyup', '.speedy-filter', function () {
  location.hash = $(this).val().replace(' ', '_')
})

$(document).on('click', '.group', function () {
  ga('send', 'event', 'search', 'quick group search')
  search($('.speedy-filter').val($(this).attr('href').substr(1)).val())
})

$(document).on('click', '.speedy-remover', function () {
  $('.speedy-filter').val('')
  $('.result').show()
  location.hash = ''
})

window.onhashchange = function () {
  search($('.speedy-filter').val(location.hash.substr(1)).val())
  $('[href^="#"]').removeClass('active')
  $("[href='#{location.hash}']").addClass('active')
}
