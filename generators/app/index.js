'use strict';
var yeoman = require('yeoman-generator');
var chalk = require('chalk');
var yosay = require('yosay');
var request = require('request');
var url = require('url');
var progressBar = require('progress');
var fs = require('fs');
var admZip = require('adm-zip');

module.exports = yeoman.generators.Base.extend({
  prompting: function () {
    var done = this.async();

    // Have Yeoman greet the user.
    this.log(yosay(
      'Welcome to the fantastic ' + chalk.red('generator-prestashop') + ' generator!'
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
    if (this.props.latestStableVersion) {
      var targetUrl = 'https://www.prestashop.com/download/old/prestashop_1.6.1.4.zip';
      var targetName = url.parse(targetUrl).pathname.split('/').pop();
      var req = request(targetUrl);
      var bar;
      var targetDestination = this.destinationPath(targetName);
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
      .pipe(fs.createWriteStream(targetDestination))
      .on('close', function (err) {
        bar.tick(bar.total - bar.curr);
        console.log('Extracting the archive...');
        var zip = new admZip(targetDestination);
        zip.extractAllTo(targetDestination.slice(0, -4));
      });
    }
  },

  install: function () {
    // this.installDependencies();
  }
});
