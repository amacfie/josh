#!/usr/bin/env node

var util = require('util');
var colors = require('colors/safe');
var shellUtil = require('./shell_util.js')
var shell = require('shelljs');
require('shelljs-plugin-clear');
require('shelljs-plugin-sleep');


var inspect = function(obj) {
  if (obj && typeof obj === 'object') {
    obj['__inspect'] = true;
  }
  return obj;
};

var myWriter = function(output) {
  var isSS = (
      output &&
      typeof output === 'object' &&
      output.hasOwnProperty('stdout') &&
      output.hasOwnProperty('stderr') &&
      !output.hasOwnProperty('__inspect'));
  if (isSS) {
    if (output['__hidden']) {
      delete output['__hidden'];
      return '';
    } else {
      var stderrPart = output.stderr || '';
      var stdoutPart = output.stdout || '';
      return colors.cyan(stderrPart + stdoutPart);
    }
  } else {
    if (output && typeof output === 'object') {
      delete output['__inspect'];
    }
    return util.inspect(output, null, null, true);
  }
};

// terminal:false disables readline (just like env NODE_NO_READLINE=1):
var myrepl = require("repl").start({
  terminal: false,
  prompt: colors.green('% '),
  ignoreUndefined: true,
  useColors: true,
  writer: myWriter});

var hideWrap = function (fun, key) {
  var outerRet = function() {
    var ret = fun.apply(this, arguments);
    if (ret instanceof Object) {
      ret['__hidden'] = true;
    }
    return ret;
  };
  return outerRet;
};

['echo', 'exec'].forEach(function (key) {
  shell[key] = hideWrap(shell[key], key);
});
Object.assign(myrepl.context, shell);
myrepl.context['inspect'] = inspect;
myrepl.context['shellUtil'] = shellUtil;

// add REPL command rlwrap_complete(prefix) that prints a simple list of completions of prefix
myrepl.context['rlwrap_complete'] =  function(prefix) {
  myrepl.complete(prefix, function(err,data) { for (x of data[0]) {console.log(x)}});
}

