'use strict';
var yeoman = require('yeoman-generator');
var chalk = require('chalk');
var yosay = require('yosay');
var request = require('request');
var url = require('url');
var ProgressBar = require('progress');
var fs = require('fs');
var AdmZip = require('adm-zip');
var exec = require('child_process').exec;
var validator = require('validator');
var mysql = require('mysql');
var Q = require('q');
var path = require('path');

module.exports = yeoman.Base.extend({

  prompting: function () {
    var done = this.async();
    // Have Yeoman greet the user.
    this.log(yosay(
      'Welcome to the fantastic ' + chalk.red('PrestaShop') + ' generator!'
    ));

    var prompts = [
      {
        type: 'confirm',
        name: 'latestStableVersion',
        message: 'Would you like to grab the latest PrestaShop release?',
        default: true
      },
      {when: function (response) {
        return !response.latestStableVersion;
      },
        type: 'list',
        name: 'release',
        message: 'Which one do you want ?',
        // I'm fucking lost in callbacks hell when trying to build this array
        // programmatically
        choices: [
          '1.7.0.0-alpha.4.0',
          '1.7.0.0-alpha.3.0',
          '1.6.1.4',
          '1.6.1.3',
          '1.6.1.3-rc1',
          '1.6.1.2',
          '1.6.1.2-rc4',
          '1.6.1.2-rc3',
          '1.6.1.2-rc2',
          '1.6.1.2-rc1',
          '1.6.1.1',
          '1.6.1.1-rc2',
          '1.6.1.1-rc1',
          '1.6.1.0',
          '1.6.1.0-rc5',
          '1.6.1.0-rc4',
          '1.6.0.14',
          '1.6.0.13',
          '1.6.0.12',
          '1.6.0.11',
          '1.6.0.9',
          '1.6.0.8',
          '1.6.0.7',
          '1.6.0.6',
          '1.6.0.5',
          '1.6.0.4',
          '1.6.0.3',
          '1.6.0.2',
          '1.6.0.1',
          '1.5.6.3',
          '1.5.6.2',
          '1.5.6.1',
          '1.5.6.0',
          '1.5.5.0',
          '1.5.4.1',
          '1.5.4.0',
          '1.5.3.1',
          '1.5.3.0',
          '1.5.2.0',
          '1.5.1.0',
          '1.5.0.17',
          '1.5.0.15',
          '1.5.0.13',
          '1.5.0.9',
          '1.5.0.5',
          '1.5.0.3',
          '1.5.0.2',
          '1.5.0.1',
          '1.4.11.1',
          '1.4.11.0',
          '1.4.10.0',
          '1.4.9.0',
          '1.4.8.3',
          '1.4.8.2',
          '1.4.7.3',
          '1.4.7.2',
          '1.4.7.0',
          '1.4.6.2',
          '1.4.6.1',
          '1.4.5.1',
          '1.4.4.1',
          '1.4.4.0',
          '1.4.3.0',
          '1.4.2.5',
          '1.4.1.0',
          '1.4.0.17',
          '1.4.0.14',
          '1.4.0.13',
          '1.4.0.12',
          '1.4.0.11',
          '1.4.0.10',
          '1.4.0.9',
          '1.4.0.8',
          '1.4.0.7',
          '1.4.0.6',
          '1.4.0.5',
          '1.4.0.4',
          '1.4.0.3',
          '1.4.0.2',
          '1.4.0.1',
          '1.3.7.0',
          '1.3.6.0',
          '1.3.5.0',
          '1.3.4.0',
          '1.3.3.0',
          '1.3.2.3',
          '1.3.0.10',
          '1.3.0.9',
          '1.3.0.8',
          '1.3.0.7',
          '1.3.0.6',
          '1.3.0.5',
          '1.3.0.4',
          '1.3.0.3',
          '1.3.0.2',
          '1.3.1',
          '1.3.0.1',
          '1.3',
          '1.2.5.0',
          '1.2.4.0',
          '1.2.3.0',
          '1.2.2.0',
          '1.2.1.0',
          '1.2.0.8',
          '1.2.0.7',
          '1.2.0.6',
          '1.2.0.5',
          '1.2.0.4',
          '1.2.0.3',
          '1.2.0.1',
          '1.1.0.1',
          '1.1',
          '1.0',
          '0.9.7'
        ]
      },
      {
        type: 'input',
        name: 'storeDomain',
        message: 'Domain Name (IP or FQDN)',
        validate: function (str) {
          return validator.isIP(str) || validator.isFQDN(str);
        },
        default: '127.0.0.1'
      },
      {
        type: 'input',
        name: 'dbServer',
        message: 'Database Server',
        default: 'localhost'
      },
      {
        type: 'input',
        name: 'dbUser',
        message: 'Datase User',
        default: 'root'
      },
      {
        type: 'password',
        name: 'dbPassword',
        message: 'Datase Password',
        default: 'root'
      },
      {
        type: 'input',
        name: 'dbName',
        message: 'Datase Name (will be created if not exists)',
        default: 'prestashop'
      },
      {
        type: 'confirm',
        name: 'dbClear',
        message: 'Drop existing tables if any?',
        default: true
      },
      {
        type: 'input',
        name: 'dbPrefix',
        message: 'Table prefix',
        default: 'ps_'
      },
      {
        type: 'list',
        name: 'dbEngine',
        message: 'Database Engine',
        choices: [
          'InnoDB',
          'MyISAM'
        ],
        default: 'InnoDB'
      },
      {
        type: 'input',
        name: 'storeName',
        message: 'Name of the shop',
        default: 'MyPrestaShop'
      },
      {
        type: 'input',
        name: 'boEmail',
        message: 'BackOffice login (email)',
        validate: function (str) {
          return validator.isEmail(str);
        },
        default: 'pub@prestashop.com'
      },
      {
        type: 'password',
        name: 'boPassword',
        message: 'BackOffice password (8 characters)',
        validate: function (str) {
          return validator.isLength(str, {min: 8, max: undefined});
        },
        default: '12345678'
      }
    ];

    this.prompt(prompts, function (props) {
      if (props.latestStableVersion) {
        props.release = '1.6.1.5';
      }
      this.props = props;
      done();
    }.bind(this));
  },

  writing: function () {
    var zipUrl = 'https://www.prestashop.com/download/old/prestashop_' + this.props.release + '.zip';
    var zipName = url.parse(zipUrl).pathname.split('/').pop();
    var bar;
    var zipDestination = this.destinationPath('tmp');
    var extractDestination = this.destinationPath('presta');
    var finalName = this.destinationPath(zipName).slice(0, -4);
    var parent = this;

    function download () {
      var req = request(zipUrl);
      var deferred = Q.defer();
      req
      .on('data', function (chunk) {
        bar = bar || new ProgressBar('Downloading... [:bar] :percent :etas', {
          complete: '=',
          incomplete: ' ',
          width: 50,
          total: parseInt(req.response.headers['content-length'], 10)
        });
        bar.tick(chunk.length);
      })
      .pipe(fs.createWriteStream(zipDestination))
      .on('close', function () {
        bar.tick(bar.total - bar.curr);
      });

      req.on('end', deferred.makeNodeResolver());
      return deferred.promise;
    }

    function extract () {
      var deferred = Q.defer();
      console.log('Extracting the archive... Don\'t your dare ^C !');
      var zip = new AdmZip(zipDestination);
      zip.extractAllTo(extractDestination);
      fs.unlink(zipDestination, deferred.makeNodeResolver());
      return deferred.promise;
    }

    function renameFolder () {
      var deferred = Q.defer();
      console.log('Cleanup everything...');
      fs.rename(extractDestination + '/prestashop', finalName, deferred.makeNodeResolver());
      return deferred.promise;
    }

    function removeZip () {
      var deferred = Q.defer();
      console.log('Removing zip...');
      exec('rm -r ' + extractDestination, deferred.makeNodeResolver());
      return deferred.promise;
    }

    function DBcheck () {
      var deferred = Q.defer();
      var connection = mysql.createConnection({
        host: parent.props.dbServer,
        user: parent.props.dbUser,
        password: parent.props.dbPassword
      });
      connection.connect();
      connection.on('error', function (err) {
        console.log(chalk.red('Error: Invalid database credentials'));
        return false;
      });
      connection.query('CREATE DATABASE IF NOT EXISTS ' + parent.props.dbName + ';', function(err) {
        connection.end();
        if (!err) {
	  deferred.resolve('ok');
        } else {
          console.log(chalk.red('Error: Failed to create database'));
	  deferred.reject('Failed to create database');
        }
      });

      return deferred.promise;
    }

    function installPrestaShop () {
      console.log('Installing PrestaShop...');
      var deferred = Q.defer();

      // Prevent installation if the PrestaShop release does not contain a CLI installer
      // TODO: Complete list 
      if (parent.props.release === '0.9.7') {
        console.log(chalk.red('This release does not have a CLI installer. Please ' +
                        'process the installation from your browser'));
        deferred.reject('No CLI installer found');
        return deferred.promise;
      } 

      var installScript = finalName + '/install/index_cli.php';
      var args = 
        ' --domain=' + parent.props.storeDomain + 
        ' --db_server=' + parent.props.dbServer +
        ' --db_user=' + parent.props.dbUser +
        ' --db_password=' + parent.props.dbPassword +
        ' --db_name=' + parent.props.dbName +
        ' --db_clear=' + Number(parent.props.dbClear).toString() +
        ' --prefix=' + parent.props.dbPrefix +
        ' --engine=' + parent.props.dbEngine +
        ' --name=' + parent.props.storeName +
        ' --password=' + parent.props.boPassword +
        ' --email=' + parent.props.boEmail +
        ' --newsletter=0';
      exec('php -d memory_limit=256M ' + installScript + args, deferred.makeNodeResolver());
      return deferred.promise;
    }

    function fixPhysicalUri () {
      var deferred = Q.defer();
      var physicalUri = '/prestashop_' + parent.props.release + '/';
      var updateQuery = 'UPDATE ' + parent.props.dbPrefix + 'shop_url SET physical_uri=\'' + physicalUri + '\' WHERE id_shop=1';
      var connection = mysql.createConnection({
        host: parent.props.dbServer,
        user: parent.props.dbUser,
        password: parent.props.dbPassword,
        database: parent.props.dbName
      });
      connection.connect();
      connection.query(updateQuery, deferred.makeNodeResolver());
      connection.end();
      return deferred.promise;
    }

    function deleteInstallDir () {
      var deferred = Q.defer();
      console.log('Deleting the install directory...');
      exec('rm -r ' + finalName + '/install', deferred.makeNodeResolver());
      return deferred.promise;
    }

    function renameAdminDir () {
      var deferred = Q.defer();
      console.log('Renaming the admin directory...');
      fs.rename(finalName + '/admin', finalName + '/backoffice', deferred.makeNodeResolver());
      return deferred.promise;
    }

    function outputSummary () {
      var deferred = Q.defer()
      fs.readFile(parent.templatePath('ascii-puffin.txt'), 'utf8', function (err, data) {
        if (err) {
          deferred.reject(err);
        } else {
          console.log(chalk.blue(data));
        }
      });
      console.log(chalk.blue('BackOffice: http://' + parent.props.storeDomain + '/' + path.basename(finalName) + '/backoffice'));
      console.log(chalk.blue('Login: ' + parent.props.boEmail));
      console.log(chalk.blue('Password: ' + parent.props.boPassword));
      deferred.resolve('ok');
      return deferred.promise;
    }

    Q().then(download)
    .then(extract)
    .then(renameFolder)
    .then(removeZip)
    .then(DBcheck)
    .then(installPrestaShop)
    .then(fixPhysicalUri)
    .then(deleteInstallDir)
    .then(renameAdminDir)
    .then(outputSummary)
    .catch(console.log);
  }
});
