function hasAppleColorEmoji () {
  const dimensions = []
  const tags = [document.createElement('span'), document.createElement('span')]

  function dimensionsFor (font) {
    const span = document.createElement('span')
    span.innerText = '☺'
    span.style.fontFamily = font
    document.body.appendChild(span)
    const dimensions = {w: span.offsetWidth, h: span.offsetHeight}
    document.body.removeChild(span)

    return dimensions
  }

  const notAFont = dimensionsFor('thisisnotafont')
  const appleColorEmoji = dimensionsFor('AppleColorEmoji')

  return notAFont.w !== appleColorEmoji.w || notAFont.h !== appleColorEmoji.h
}
