(function() {
  var Compressor, DropZone, Sortable, StyleSheet;
  DropZone = (function() {
    "This class handles drag and drop functionality.";    function DropZone(selector) {
      selector = $(selector);
      selector.bind('dragover', function() {
        return false;
      }).bind('drop', this.drop);
    }
    DropZone.prototype.drop = function(event) {
      var file, files, silverlight, _fn, _i, _len;
      silverlight = event && event.originalEvent ? event.originalEvent : window.event;
      event = silverlight || event;
      files = event.files || event.dataTransfer.files;
      if (event.preventDefault) {
        event.preventDefault();
      }
      _fn = function(file) {
        var reader;
        reader = new FileReader();
        reader.onload = function(event) {
          var name, result;
          name = file.name;
          result = event.target.result;
          return new StyleSheet(name, result);
        };
        return reader.readAsText(file);
      };
      for (_i = 0, _len = files.length; _i < _len; _i++) {
        file = files[_i];
        _fn(file);
      }
      return false;
    };
    return DropZone;
  })();
  StyleSheet = (function() {
    "Make a new HTML element from a dropped CSS file.";    function StyleSheet(name, result) {
      var append, list, sortable;
      append = $('.append');
      list = append.find('ul');
      sortable = $('#sortable').mustache({
        name: name
      });
      this.check_visibility(append);
      sortable.data('style', result);
      list.append(sortable);
      new Compressor;
    }
    StyleSheet.prototype.check_visibility = function(element) {
      if (element.hasClass('hidden')) {
        return element.removeClass('hidden');
      }
    };
    return StyleSheet;
  })();
  Compressor = (function() {
    "Compress the dropped CSS files.";    function Compressor() {
      var clean, files, styles;
      files = $('.sortable-list').children();
      styles = '';
      files.each(function(index, element) {
        var data;
        data = $(element).data('style');
        return styles = "" + styles + " " + data;
      });
      clean = CleanCSS.process(styles);
      $('#output').val(clean);
    }
    return Compressor;
  })();
  Sortable = (function() {
    "A class to handle sortable functionality.";    function Sortable() {
      var list;
      list = $('.sortable-list');
      list.sortable({
        axis: 'y',
        placeholder: 'alert-message highlight'
      });
      list.disableSelection();
    }
    return Sortable;
  })();
  (function() {
    new DropZone('.dropzone');
    return new Sortable;
  })();
}).call(this);
