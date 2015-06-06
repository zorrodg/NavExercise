'use strict';

import assert from 'assert';
import editcss from './../_src/helpers/editcss';

describe('EditCSS Helper test', () => {

  describe('Init', () => {
    it('Should be a function', () => assert.equal(typeof editcss, 'function'));
    it('Should be an object', () => assert(editcss('body') instanceof Object));
    it('"body" Should have length', () => assert(editcss('body').$.length > 0));
    it('"#no-data" Should be empty', () => assert.equal(editcss('#no-data').$.length, 0));
    it('Should have "addClass" method', () => assert(editcss('body').addClass));
    it('Should have "removeClass" method', () => assert(editcss('body').removeClass));
  });

  describe('Add Class Method', () => {
    let a, b, c, $el;

    before(() => {
      a = document.createElement('span');
      b = document.createElement('div');
      c = document.createElement('a');
      a.className = 'test-elm';
      b.className = 'test-elm';
      c.className = 'test-elm';
      document.body.appendChild(a);
      document.body.appendChild(b);
      document.body.appendChild(c);
      $el = editcss('.test-elm');

      $el.addClass('test-class', 'other-class');
    })

    it('$el should exist', () => assert($el.$.length > 0));
    it('$el a should have "test-class" and "other-class"', () => {
      assert.equal($el.$[0].className, 'test-elm test-class other-class')
    });

    it('$el b should have "test-class" and "other-class"', () => {
      assert.equal($el.$[1].className, 'test-elm test-class other-class')
    });

    it('$el c should have "test-class" and "other-class"', () => {
      assert.equal($el.$[2].className, 'test-elm test-class other-class')
    });

    after(() => {
      document.body.removeChild(a);
      document.body.removeChild(b);
      document.body.removeChild(c);
    });

  });

  describe('Remove Class Method', () => {
    let a, b, c, $el;

    before(() => {
      a = document.createElement('span');
      b = document.createElement('div');
      c = document.createElement('a');
      a.className = 'test-elm test-class other-class';
      b.className = 'test-elm test-class other-class';
      c.className = 'test-elm test-class other-class';
      document.body.appendChild(a);
      document.body.appendChild(b);
      document.body.appendChild(c);
      $el = editcss('.test-elm');

      $el.removeClass('other-class');
    })

    it('$el should exist', () => assert($el.$.length > 0));
    it('$el a should have "test-class" only', () => {
      assert.equal($el.$[0].className, 'test-elm test-class')
    });

    it('$el b should have "test-class" only', () => {
      assert.equal($el.$[0].className, 'test-elm test-class')
    });
    it('$el c should have "test-class" only', () => {
      assert.equal($el.$[0].className, 'test-elm test-class')
    });

    after(() => {
      document.body.removeChild(a);
      document.body.removeChild(b);
      document.body.removeChild(c);
    });

  });

});

export default {};