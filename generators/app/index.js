'use strict';
var yeoman = require('yeoman-generator');
var chalk = require('chalk');
var yosay = require('yosay');
var request = require('request');
var url = require('url');
var progressBar = require('progress');
var fs = require('fs');
var admZip = require('adm-zip');
var winston = require('winston');
var exec = require('child_process').exec;

module.exports = yeoman.generators.Base.extend({
  prompting: function () {
    var done = this.async();

    // Have Yeoman greet the user.
    this.log(yosay(
      'Welcome to the fantastic ' + chalk.red('PrestaShop') + ' generator!'
    ));

    var prompts = [{
      type: 'confirm',
      name: 'latestStableVersion',
      message: 'Would you like to use the latest stable version?',
      default: true
    }];

    this.prompt(prompts, function (props) {
      this.props = props;
      // To access props later use this.props.someOption;

      done();
    }.bind(this));
  },

  writing: function () {
    winston.level = 'info';
    if (this.props.latestStableVersion) {
      var zipUrl = 'https://www.prestashop.com/download/old/prestashop_1.6.1.4.zip';
      // prestashop_1.6.1.4.zip
      var zipName = url.parse(zipUrl).pathname.split('/').pop();
      var req = request(zipUrl);
      var bar;
      // path/to/destination/tmp
      var zipDestination = this.destinationPath('tmp');
      // path/to/destination/prestashop_1.6.1.4
      var extractDestination = this.destinationPath('presta');
      var finalName = this.destinationPath(zipName).slice(0, -4);
      req
      .on('data', function (chunk) {
        bar = bar || new progressBar('Downloading... [:bar] :percent :etas', {
          complete: '=',
          incomplete: ' ',
          width: 50,
          total: parseInt(req.response.headers['content-length'])
        });

        bar.tick(chunk.length);
      })
      .pipe(fs.createWriteStream(zipDestination))
      .on('close', function (err) {
        bar.tick(bar.total - bar.curr);
        winston.log('info', 'Extracting the archive... Don\'t your dare ^C !');
        var zip = new admZip(zipDestination);
        zip.extractAllTo(extractDestination);
        fs.unlink(zipDestination, function (err) {
          if (err) {
            winston.log('error', err.toString());
          } else {
          }
        });
        winston.log('info', 'Cleanup everything...');
        fs.rename(extractDestination + '/prestashop', finalName, function (err) {
          if (err) {
            winston.log('error', err.toString());
          } else {
            exec('rm -r ' + extractDestination, function (err, stdout, stderr) {
              if (err) {
                winston.log('error', err.toString());
              } else if (stdout) {
                winston.log('error', stdout.toString());
              } else if (stderr) {
                winston.log('error', stderr.toString());
              } else {
                winston.log('info', '...done.');
                console.log(chalk.green('A new PrestaShop store is born!'));
              }
            });
          }
        });
      });
    } else {
      console.log(chalk.red('Sorry dude, I\'m not able to fetch old PrestaShop version yet'));
    }
  },

  install: function () {
    // this.installDependencies();
  }
});
