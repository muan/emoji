function hasAppleColorEmoji () {
  var widths = []
  var tags = [document.createElement('span'), document.createElement('span')]
  tags.forEach(function (tag, i) {
    tag.innerText = '☺'
    tag.style.fontFamily = i === 1 ? 'thisisnotafont' : 'AppleColorEmoji'
    document.body.appendChild(tag)
    widths.push(tag.offsetWidth)
    document.body.removeChild(tag)
  })
  return widths[0] !== widths[1]
}
