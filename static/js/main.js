if (typeof exports == 'undefined') {
  var exports = this['mymodule'] = {};
}




exports.nomnoml = {
  show: function () {
    $('#nomnoml').show();
    exports.nomnoml.update();
  },
  
  hide: function () {
    $('#nomnoml').hide();
  },
  
  update: function () {
    var editorContainerTop = $('#editorcontainer').offset().top;
    var editorContainerHeight = $('#editorcontainer').height();
    if (!($('#settings').is(':hidden'))) {
      editorContainerTop = $('#settings').height() + $('#settings').offset().top + 25;
      editorContainerHeight -= $('#settings').height();
    }
    const heightTarged = 800;
    var height = heightTarged;
    if (editorContainerHeight < heightTarged + 25 + 100) {
      if (editorContainerHeight > 50 + 25) {
        height = editorContainerHeight - 25 - 100
      } else {
        height = 100
      } 
    }    
    $('#nomnoml').css("top", (editorContainerTop + 25) + 'px');
    $('#nomnoml').css("height", (height) + 'px');
  
    const widthTarged = 800;
    var width = widthTarged;
    var editorContainerWidth = $('#editorcontainer').width();
    if (editorContainerWidth < widthTarged + 25 + 500) {
      if (editorContainerWidth > 100 + 25) {
        width = editorContainerWidth - 25 - 500
      } else {
        width = 100
      } 
    }
    $('#nomnoml').css("width", width + 'px');

//dirty hack to convert html 2 text with new lines
    var canvas = document.getElementById('nomnoml-canvas');
    var html = $('iframe[name="ace_outer"]').contents().find('iframe').contents().find("#innerdocbody").html();
    const regex1 = /<br>/gi;
    html = html.replace(regex1, '@@@XXX@@@');    
    const regex2 = /"ace-line">/gi;
    html = html.replace(regex2, '>@@@XXX@@@');    
    var tmp = document.createElement("DIV");
    tmp.innerHTML = html;
    var text = tmp.textContent || tmp.innerText || "";
    const regex3 = /@@@XXX@@@/g;
    var textescaped = text.replace(regex3, "\n");    
    var source = textescaped;
    try {
      nomnoml.draw(canvas, source);
    } catch (e) {
      nomnoml.draw(canvas, "nomnoml error...");
    }
  }
}



exports.postAceInit = function (hook, context) {
  if ($('#options-nomnoml').is(':checked')) {
    exports.nomnoml.show();
  } else {
    exports.nomnoml.hide();
  }  
  $('#options-nomnoml').on('click', function () {
    if ($('#options-nomnoml').is(':checked')) {
      exports.nomnoml.show();
    } else {
      exports.nomnoml.hide();
    }
  });
}

exports.aceEditEvent = function (hook_name, event, cb) {
  exports.nomnoml.update();
}
