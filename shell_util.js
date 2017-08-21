var shell = require('shelljs');
require('shelljs-plugin-sleep');

var exports = module.exports = {};

exports.checkNow = function () {
  while (true) {
    shell.sleep(15);
    var servernames = shell.exec('nvr --serverlist').trim().split('\n');
    if (!servernames.length || !servernames[0]) {
      continue;
    }
    servernames.forEach(
      (sn) => shell.exec(`NVR_CMD=echo nvr -c "checktime" --servername ${sn}`) );
  }
};

exports.stripExtension = function (fn) {
  return fn.replace(/\.[^/.]+$/, '');
};

