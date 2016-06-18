// flightplan.js
var plan = require('flightplan');

// configuration

plan.target('production', [
  {
    host: 'shafaiatul.com',
    username: 'shafaiat',
    port: 18765,
    agent: process.env.SSH_AUTH_SOCK
  },
]);


// run commands on localhost
plan.local(function(local) {
  // local.log('Run build');
  // local.exec('gulp build');

  local.log('Copy files to remote hosts');
  var filesToCopy = local.exec('git ls-files', {silent: true});
  // rsync files to all the target's remote hosts
  local.transfer(filesToCopy, + '~/www/');
});
