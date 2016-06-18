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

var tmpDir = 'example-com-' + new Date().getTime();

// run commands on localhost
plan.local(function(local) {
  local.log('Run build');
  local.exec('gulp build');

  local.log('Copy files to remote hosts');
  var filesToCopy = local.exec('git ls-files', {silent: true});
  // rsync files to all the target's remote hosts
  local.transfer(filesToCopy, '/tmp/' + tmpDir);
});

// run commands on the target's remote hosts
plan.remote(function(remote) {
  remote.log('Move folder to web root');
  remote.sudo('cp -R /tmp/' + tmpDir + ' ~', {user: 'www'});
  remote.rm('-rf /tmp/' + tmpDir);

  remote.log('Install dependencies');
  remote.sudo('npm --production --prefix ~/' + tmpDir
                            + ' install ~/' + tmpDir, {user: 'www'});

  remote.log('Reload application');
  remote.sudo('ln -snf ~/' + tmpDir + ' ~/example-com', {user: 'www'});
  remote.sudo('pm2 reload example-com', {user: 'www'});
});

// run more commands on localhost afterwards
plan.local(function(local) { /* ... */ });
// ...or on remote hosts
plan.remote(function(remote) { /* ... */ });
