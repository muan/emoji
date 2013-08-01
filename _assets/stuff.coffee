$ ->
  $("input").on "hover click", ->
    $(this).focus()
    this.selectionStart = 0
    this.selectionEnd = this.value.length