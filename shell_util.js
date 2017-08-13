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
      (sn) => shell.exec(`nvr -c "checktime" --servername ${sn}`) );
  }
};

