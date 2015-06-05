import assert from 'assert';
import editcss from './../_src/helpers/editcss';

describe('EditCSS Helper test', () => {

  describe('Init', () => {
    it('Should be a function', () => assert.equal(typeof editcss, 'function'))
  });

});