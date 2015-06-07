'use strict';

import assert from 'assert';
import ajax from './../_src/helpers/ajax';

describe('Ajax Helper', () => {
  let call;

  // Creation Tests
  describe('Creation', () => {
    it('Should be a function', () => assert.equal(typeof ajax, 'function'));

    call = ajax('/api/nav.json');
    it('Should work with string', () => assert(call instanceof Promise));

    call = ajax({url: '/api/nav.json'});
    it('Should work with object', () => assert(call instanceof Promise));

    it('Should throw on another type', () => assert.throws(ajax([]), 'No URL'));
    it('Should throw on empty', () => assert.throws(ajax(), 'No URL'));
  });

  // Async test
  describe('Async', () => {
    let response;

    before(done => {
      ajax('/api/nav.json')
        .then(res => {
          response = res;
          done();
        });
    });

    it('Response should be an object', () => assert.equal(typeof response, 'object'));
    it('Response should contain data', () => assert(response.data));
    it('Response should contain status', () => assert(response.status));
    it('Response should contain config', () => assert(response.config));
    it('Urls must match', () => assert.equal('/api/nav.json', response.config.url));
  });

  // Async Params
  describe('Async Params', () => {
    let response;

    before(done => {
      ajax({
        url:'/api/nav.json',
        params: {
          test: '123'
        }
      })
        .catch(res => {
          response = res;
          done();
        });
    });

    it('Params must match', () => assert.deepEqual({test: '123'}, response.config.params));
    it('Url must match', () => assert.equal('/api/nav.json?test=123', response.config.url));
  });

  // Async error
  describe('Async Error', () => {
    let response;

    before(done => {
      ajax('/api/123.json')
        .catch(res => {
          response = res;
          done();
        });
    });

    it('Response should be an object', () => assert.equal(typeof response, 'object'));
    it('Response should contain error', () => assert(response.error));
    it('Response should contain status', () => assert(response.status));
    it('Response should contain config', () => assert(response.config));
  });

});

export default {};