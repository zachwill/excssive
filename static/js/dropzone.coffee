class DropZone
  """This class handles drag and drop functionality."""

  constructor: (selector) ->
    selector = $(selector)
    selector.bind('dragover', -> false)
            .bind('drop', @drop)

  drop: (event) ->
    # Find the appropriate event. Semi-convoluted because of Silverlight shim.
    silverlight = if event and event.originalEvent then event.originalEvent else window.event
    event = silverlight or event
    files = event.files or event.dataTransfer.files
    if event.preventDefault
      event.preventDefault()
    for file in files
      do (file) ->
        reader = new FileReader()
        console.log reader
        reader.onload = (event) ->
          name = file.name
          result = event.target.result
          new StyleSheet(name, result)
        reader.readAsText(file)
    return false


class StyleSheet
  """Make a new HTML element from a dropped CSS file."""

  constructor: (name, result) ->
    console.log name
    @check_content('.append', '#css_files')

  check_content: (selector, template) ->
    selector = $(selector)
    html = selector.html()
    if not html
      console.log "nope"


do ->
  new DropZone('.dropzone')
