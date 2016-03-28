'use strict';
var path = require('path');
var helpers = require('yeoman-test');

describe('generator-prestashop:app', function () {
  before(function (done) {
    helpers.run(path.join(__dirname, '../generators/app'))
      .withOptions({someOption: true})
      .withPrompts({someAnswer: true})
      .on('end', done);
  });
});
