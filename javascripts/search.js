var filter = document.querySelector('.speedy-filter')

function searchHash() {
  if (window.location.hash.length) {
    filter.value = window.location.hash.substr(1)
    search(filter.value)
  } else {
    search()
  }
}
document.addEventListener('emoji:ready', searchHash)

function search (keyword) {
  keyword = typeof keyword === 'undefined' ? '' : keyword
  document.querySelector('.keyword').textContent = keyword
  keyword = keyword.trim()

  if (window.speedyKeyword !== keyword) {
    window.speedyKeyword = keyword
    for (const result of document.querySelectorAll('.result')) {
      result.hidden = keyword.length > 0 ? result.getAttribute('title').toLowerCase().indexOf(keyword.toLowerCase()) < 0 : false
    }
  }
  setRelatedDOMVisibility(keyword)
}

function setRelatedDOMVisibility (keyword) {
  var foundSomething = !!document.querySelector('.result:not([hidden])')
  document.querySelector('.no-results').hidden = foundSomething
}

function updateHashWithInputValue() {
  window.location.hash = filter.value.replace(' ', '_')
}

filter.addEventListener('input', updateHashWithInputValue)

document.addEventListener('click', event => {
  if (event.target.classList.contains('group')) {
    filter.value = event.target.href.substr(1)
    search(filter.value)
  } else if (event.target.classList.contains('js-clear-search')) {
    filter.value = ''
    filter.focus()
  }
})

window.onhashchange = function () {
  searchHash()
  for (const link of document.querySelectorAll('.active[href^="#"]')) {
    link.classList.remove('active')
  }
  var active = document.querySelector("[href='#{window.location.hash}']")
  if (active) active.classList.add('active')
}
