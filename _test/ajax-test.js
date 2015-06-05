import assert from 'assert';
import Mc from 'mock-browser';
import ajax from './../_src/helpers/ajax';

let mock = new Mc.mocks.MockBrowser();

describe('Ajax Helper test', () => {
  let document = mock.getDocument(),
      div = document.createElement('div');

  describe('Init', () => {
    it('Should be a function', () => assert.equal(typeof ajax, 'function'));
  });

});