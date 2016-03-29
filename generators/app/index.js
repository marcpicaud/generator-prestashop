'use strict';
var yeoman = require('yeoman-generator');
var chalk = require('chalk');
var yosay = require('yosay');
var request = require('request');
var url = require('url');
var ProgressBar = require('progress');
var fs = require('fs');
var AdmZip = require('adm-zip');
var winston = require('winston');
var exec = require('child_process').exec;
var validator = require('validator');
var mysql = require('mysql');

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
          '1.6.1.4 (latest)',
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
        message: 'Datase Name',
        default: 'prestashop'
      },
      {
        type: 'confirm',
        name: 'dbClear',
        message: 'Drop existing tables?',
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
        props.release = '1.6.1.4';
      }
      this.props = props;
      done();
    }.bind(this));
  },

  writing: function () {
    winston.level = 'info';
    var zipUrl = 'https://www.prestashop.com/download/old/prestashop_' + this.props.release + '.zip';
    var zipName = url.parse(zipUrl).pathname.split('/').pop();
    var req = request(zipUrl);
    var bar;
    var zipDestination = this.destinationPath('tmp');
    var extractDestination = this.destinationPath('presta');
    var finalName = this.destinationPath(zipName).slice(0, -4);
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
    .on('close', function (err) {
      if (err) {
        winston.log('error', err.toString());
      }
      bar.tick(bar.total - bar.curr);
      winston.log('info', 'Extracting the archive... Don\'t your dare ^C !');
      var zip = new AdmZip(zipDestination);
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
            }
          });
          var installScript = this.destinationPath('prestashop_' + this.props.release + '/install/index_cli.php');
          var args = ' --domain=' + this.props.storeDomain + 
            ' --db_server=' + this.props.dbServer +
            ' --db_user=' + this.props.dbUser +
            ' --db_password=' + this.props.dbPassword +
            ' --db_name=' + this.props.dbName +
            ' --db_clear=' + Number(this.props.dbClear).toString() +
            ' --prefix=' + this.props.dbPrefix +
            ' --engine=' + this.props.dbEngine +
            ' --name=' + this.props.storeName +
            ' --password=' + this.props.boPassword +
            ' --email=' + this.props.boEmail +
            ' --newsletter=0';
          winston.log('info', 'Installation in progress...');
          exec('php ' + installScript + args, function (err, stdout, stderr) {
            if (err) {
              winston.log('error', err.toString());
            }
            if (stdout) {
              winston.log('info', 'stdout: ' + stdout);
            }
            if (stderr) {
              winston.log('info', 'stderr: ' + stderr);
            }
          });
          var connection = mysql.createConnection({
            host: this.props.dbServer,
            user: this.props.dbUser,
            password: this.props.dbPassword,
            database: this.props.dbName
          });

          connection.connect();
          var physicalUri = '/prestashop_' + this.props.release + '/';
          connection.query('UPDATE ' + this.props.dbPrefix + 'shop_url SET physical_uri=' + physicalUri + ' WHERE id_shop=1', function (err) {
            if (err) {
              winston.log('error', err.toString());
            }
          });
          connection.end();

          winston.log('info', 'removing the install directory...');
          exec('rm -r ' + this.destinationPath('prestashop_' + this.props.release + '/install'), function (err, stdout, stderr) {
            if (err) {
              winston.log('error', err.toString());
            }
            if (stdout) {
              winston.log('info', stdout);
            }
            if (stderr) {
              winston.log('error', stderr);
            }
          });
          winston.log('info', 'renaming the admin directory...');
          fs.rename(finalName + '/admin', finalName + '/admin1234', function (err) {
            if (err) {
              winston.log('error', err.toString());
            } else {
              console.log(chalk.green('A new PrestaShop store is born!'));
            }
          });
        }
      }.bind(this));
    }.bind(this));
  }
});
