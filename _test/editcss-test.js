import assert from 'assert';
import Mc from 'mock-browser';
import editcss from './../_src/helpers/editcss';

let mock = new Mc.mocks.MockBrowser();

describe('EditCSS Helper test', () => {
  let document = mock.getDocument(),
      div = document.createElement('div');

  describe('Init', () => {
    it('Should be a function', () => assert.equal(typeof editcss, 'function'));
  });

});