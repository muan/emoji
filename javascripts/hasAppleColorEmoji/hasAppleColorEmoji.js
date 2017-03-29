function hasAppleColorEmoji () {
  var dimentions = []
  tags = [document.createElement('span'), document.createElement('span')]
  tags.forEach(function(tag, i) {
    tag.innerText = '☺'
    tag.style.fontFamily = i === 1 ? 'thisisnotafont' : 'AppleColorEmoji'
    document.body.appendChild(tag)
    dimentions.push([tag.offsetWidth, tag.offsetHeight])
    document.body.removeChild(tag)
  })
  return dimentions[0] != dimentions[1]
}
