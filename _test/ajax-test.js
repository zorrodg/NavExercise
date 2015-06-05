import assert from 'assert';
import ajax from './../_src/helpers/ajax';

describe('Ajax Helper test', () => {

  describe('Init', () => {
    it('Should be a function', () => assert.equal(typeof ajax, 'function'))
  });

});