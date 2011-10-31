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
    files = event.files or event.dataTransfer.files or event.target.files
    if event.preventDefault
      event.preventDefault()
    for file in files
      do (file) ->
        reader = new FileReader()
        reader.onload = (event) ->
          name = file.name
          result = event.target.result
          new StyleSheet(name, result)
        reader.readAsText(file)
    return false


class StyleSheet
  """Make a new HTML element from a dropped CSS file."""

  constructor: (name, result) ->
    append = $('.append')
    list = append.find('ul')
    sortable = $('#sortable').mustache(name: name)
    @check_visibility(append)
    sortable.data('style', result)
    list.append(sortable)
    new Compressor

  check_visibility: (element) ->
    if element.hasClass('hidden')
      element.removeClass('hidden')
      $('html, body').animate(scrollTop: 550)


class Compressor
  """Compress the dropped CSS files."""

  constructor: ->
    files = $('.sortable-list').children()
    styles = ''
    files.each( (index, element) ->
      data = $(element).data('style')
      styles = "#{styles} #{data}"
    )
    clean = CleanCSS.process(styles)
    $('#output').val(clean)


class Sortable
    """A class to handle sortable functionality."""

    constructor: ->
        list = $('.sortable-list')
        list.sortable({
            axis: 'y'
            placeholder: 'alert-message highlight'
            update: -> new Compressor
        })
        list.delegate('.close', 'click', (event) ->
            $(this).parents('li').remove()
            event.preventDefault()
            new Compressor
        )
        list.disableSelection()


do ->
  new DropZone('.dropzone')
  new Sortable
