/* eslint max-depth: ["error", 10] max-nested-callbacks: ["error", 10] */

'use strict';

var chai = require('chai');
var expect = chai.expect;
var fs = require('fs');
var handyman = require('../');
var packageName = require('../package.json').name;
var sinon = require('sinon');
var sinonChai = require('sinon-chai');
var util = require('gulp-util');
var del = require('del');

chai.use(sinonChai);

describe('gulp-handyman', function () {

  describe('clean directories', function () {
    var dir = './tmp';

    beforeEach(function () {
      if (!fs.existsSync(dir)) {
        fs.mkdirSync(dir);
      }
    });

    afterEach(function () {
      if (fs.existsSync(dir)) {
        del.sync(dir);
      }
    });

    describe('cleanSync method', function () {

      it('should expose a cleanSync method', function () {
        expect(handyman.cleanSync).to.exist;
      });

      it('should return an array of deleted directories/files', function () {
        var result = handyman.cleanSync([dir]);

        expect(result).to.be.an.array;
        expect(result[0]).to.contain('tmp');
      });

      it('should delete the path passed as a param', function () {
        handyman.cleanSync([dir]);

        expect(fs.existsSync(dir)).to.be.false;
      });

      it('should pass options to del.sync method', function () {
        var spy = sinon.spy(del, 'sync');
        var opts = { dryRun: true };

        handyman.cleanSync([dir], { dryRun: true });

        expect(spy).to.have.been.calledWith(sinon.match.array, opts);
      });

    });

    describe('clean method', function () {

      it('should expose a clean method', function () {
        expect(handyman.clean).to.exist;
      });

      it('should return a Promise object', function () {
        var result = handyman.clean([dir]);

        expect(result.then).to.exist;
        expect(result.then).to.be.a('function');
      });

      it('should delete the path passed as a param', function (done) {
        handyman.clean([dir])
          .then(function () {
            expect(fs.existsSync(dir)).to.be.false;
            done();

          });
      });

    });

  });

  describe('Update configuration', function () {
    var defaultConfig;
    var providerConfig;
    var updatedConf;

    beforeEach(function () {
      sinon.spy(util, 'log');

      defaultConfig = {
        key1: 'test',
        key2: true
      };
      providerConfig = {
        key1: 'userKey'
      };
    });

    afterEach(function () {
      util.log.restore();
    });

    it('Should update the default configuration', function () {

      updatedConf = handyman.mergeConfig(defaultConfig, providerConfig);

      expect(updatedConf.key1).to.equal('userKey');
      expect(updatedConf.key2).to.be.true;
    });

    it('Should replace arrays if necessary', function () {
      defaultConfig.key3 = ['A1'];
      providerConfig.key3 = ['A2', 'A1'];

      updatedConf = handyman.mergeConfig(defaultConfig, providerConfig);

      expect(updatedConf.key1).to.equal('userKey');
      expect(updatedConf.key2).to.be.true;
      expect(updatedConf.key3).to.eql(['A2', 'A1']);
    });

  });

  describe('log', function () {

    it('Should test that log works when passed a string', function () {

      handyman.log('hello world');
      expect(util.log.calledOnce);
    });

    it('Should test that log works when place a flat object', function () {

      handyman.log({ length: 4 });
      expect(util.log.calledOnce);
    });

    it('Should test that log works when passed an object with two properties', function () {

      handyman.log({ hello: 'value', key: 'something' });
      expect(util.log.calledOnce);
    });

  });

  describe('Get package name', function () {

    it('Should get package name from package.json', function () {

      var handyPackageName = handyman.getPackageName();

      expect(handyPackageName).to.equal(packageName);
    });

  });

  describe('Slugify', function () {
    var input;

    it('should expose a slugify method', function () {
      expect(handyman.slugify).to.exist;
    });

    it('should return the input as is when the input contains special characters', function () {
      input = 'inputwithoutspecialcharacters';
      expect(handyman.slugify(input)).to.equal(input);
    });

    it('should replace all spaces with hyphens', function () {
      input = 'input with spaces';
      expect(handyman.slugify(input)).to.equal('input-with-spaces');
    });

    it('should convert the string to lower case', function () {
      input = 'input With Capital characters';
      expect(handyman.slugify(input)).to.equal('input-with-capital-characters');
    });

    it('should strip out non-alpha characters', function () {
      input = 'input with & some % special characters';
      expect(handyman.slugify(input)).to.equal('input-with-some-special-characters');
    });

  });
});