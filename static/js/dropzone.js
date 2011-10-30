(function() {
  var DropZone, StyleSheet;
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
        console.log(reader);
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
      console.log(name);
      this.check_content('.append', '#css_files');
    }
    StyleSheet.prototype.check_content = function(selector, template) {
      var html;
      selector = $(selector);
      html = selector.html();
      if (!html) {
        return console.log("nope");
      }
    };
    return StyleSheet;
  })();
  (function() {
    return new DropZone('.dropzone');
  })();
}).call(this);
