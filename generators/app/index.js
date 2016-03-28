'use strict';
var yeoman = require('yeoman-generator');
var chalk = require('chalk');
var yosay = require('yosay');
var http = require('http');
var url = require('url');
var fs = require('fs');

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
      var file_url = 'https://www.prestashop.com/download/old/prestashop_1.6.1.4.zip';
      var options = {
        host: url.parse(file_url).host,
        port: 80,
        path: url.parse(file_url).pathname
      };

      var file_name = url.parse(file_url).pathname.split('/').pop();
      var file = fs.createWriteStream(this.destinationPath(file_name));

      http.get(options, function (res) {
        res.on('data', function(data) {
          file.write(data);
        }).on('end', function () {
          file.end();
          console.log(yosay('A new PrestaShop store is born!'));
        });
      });

    }
    // this.fs.copy(
    //   this.templatePath('dummyfile.txt'),
    //   this.destinationPath('dummyfile.txt')
    // );
  },

  install: function () {
    // this.installDependencies();
  }
});
