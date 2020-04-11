var eejs = require("ep_etherpad-lite/node/eejs");
var settings = require('ep_etherpad-lite/node/utils/Settings');


exports.eejsBlock_mySettings = function (hook_name, args, cb) { // setup tab
  var checked_state = 'checked';
  if(settings.ep_autocomp){
    if (settings.ep_nomnoml.disable_by_default === true){
      checked_state = 'unchecked';
    }
  }
  args.content = args.content + eejs.require('ep_nomnoml/templates/settings.ejs', {checked : checked_state});
  return cb();
}

exports.eejsBlock_body = function (hook_name, args, cb) { 
  args.content = args.content + eejs.require("ep_nomnoml/templates/body.html", {}, module);
  return cb();
};

exports.eejsBlock_styles = function (hook_name, args, cb) { // add custom stylesheet
  args.content = args.content + '<link href="../static/plugins/ep_nomnoml/static/css/nomnoml.css" rel="stylesheet">';
  return cb();
};

exports.eejsBlock_scripts = function (hook_name, args, cb) { // add custom script
  args.content = args.content + eejs.require("ep_nomnoml/templates/scripts.html", {}, module);
  return cb();
};
