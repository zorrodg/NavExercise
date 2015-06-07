'use strict';

import assert from 'assert';
import editcss from './../_src/helpers/editcss';

describe('EditCSS Helper', () => {

  describe('Init', () => {
    it('Should be a function', () => assert.equal(typeof editcss, 'function'));
    it('Should be an object', () => assert(editcss('body') instanceof Object));
    it('"body" Should have length', () => assert(editcss('body').SELECTORS.length > 0));
    it('"#no-data" Should be empty', () => assert.equal(editcss('#no-data').SELECTORS.length, 0));
    it('Should have "addClass" method', () => assert(editcss('body').addClass));
    it('Should have "removeClass" method', () => assert(editcss('body').removeClass));
  });

  describe('Add Class Method', () => {
    let a, b, c, $el;

    before(() => {
      a = document.createElement('span');
      b = document.createElement('div');
      c = document.createElement('a');
      a.className = 'test-elm test-class';
      b.className = 'test-elm';
      c.className = 'test-elm other-class';
      document.body.appendChild(a);
      document.body.appendChild(b);
      document.body.appendChild(c);
      $el = editcss('.test-elm');

      $el.addClass('test-class', 'other-class');
    });

    it('$el should exist', () => assert($el.SELECTORS.length > 0));
    it('$el a should have "test-class" and "other-class"', () => {
      assert.equal($el.SELECTORS[0].className, 'test-elm test-class other-class');
    });

    it('$el b should have "test-class" and "other-class"', () => {
      assert.equal($el.SELECTORS[1].className, 'test-elm test-class other-class');
    });

    it('$el c should have "test-class" and "other-class"', () => {
      assert.equal($el.SELECTORS[2].className, 'test-elm other-class test-class');
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
      b.className = 'test-elm other-class';
      c.className = 'test-elm test-class';
      document.body.appendChild(a);
      document.body.appendChild(b);
      document.body.appendChild(c);
      $el = editcss('.test-elm');

      $el.removeClass('other-class');
    })

    it('$el should exist', () => assert($el.SELECTORS.length > 0));
    it('$el a should have "test-class" only', () => {
      assert.equal($el.SELECTORS[0].className, 'test-elm test-class');
    });

    it('$el b should have "test-class" only', () => {
      assert.equal($el.SELECTORS[0].className, 'test-elm test-class');
    });
    it('$el c should have "test-class" only', () => {
      assert.equal($el.SELECTORS[0].className, 'test-elm test-class');
    });

    after(() => {
      document.body.removeChild(a);
      document.body.removeChild(b);
      document.body.removeChild(c);
    });

  });

  describe('Has Class Method', () => {
    let a, b, c, $el;

    before(() => {
      a = document.createElement('span');
      b = document.createElement('div');
      c = document.createElement('a');
      a.className = 'test-elm test-class other-class';
      b.className = 'test-elm other-class';
      c.className = 'test-elm test-class';
      document.body.appendChild(a);
      document.body.appendChild(b);
      document.body.appendChild(c);
      $el = editcss('.test-elm');
    })

    it('$el should exist', () => assert($el.SELECTORS.length > 0));
    it('$el should have "test-class"', () => {
      assert.equal($el.hasClass('test-elm'), true);
    });

    it('$el should not have "test-other-class"', () => {
      assert.equal($el.hasClass('test-other-class'), false);
    });


    after(() => {
      document.body.removeChild(a);
      document.body.removeChild(b);
      document.body.removeChild(c);
    });

  });

  describe('Toggle Class Method', () => {
    let a, b, c, $el;

    before(() => {
      a = document.createElement('span');
      b = document.createElement('div');
      c = document.createElement('a');
      a.className = 'test-elm test-class other-class';
      b.className = 'test-elm other-class';
      c.className = 'test-elm test-class';
      document.body.appendChild(a);
      document.body.appendChild(b);
      document.body.appendChild(c);
      $el = editcss('.test-elm');

      $el.toggleClass('test-class', 'other-class');
    })

    it('$el should exist', () => assert($el.SELECTORS.length > 0));
    it('$el a should have no classes', () => {
      assert.equal($el.SELECTORS[0].className, 'test-elm');
    });

    it('$el b should have "test-class"', () => {
      assert.equal($el.SELECTORS[1].className, 'test-elm test-class');
    });

    it('$el c should have "other-class"', () => {
      assert.equal($el.SELECTORS[2].className, 'test-elm other-class');
    });


    after(() => {
      document.body.removeChild(a);
      document.body.removeChild(b);
      document.body.removeChild(c);
    });

  });

  describe('Width Method', () => {
    let a, $el;

    before(() => {
      a = document.createElement('span');
      a.className = 'test-elm';
      document.body.appendChild(a);
      $el = editcss('.test-elm');

      $el.width(300);
    })

    it('$el should exist', () => assert($el.SELECTORS.length > 0));
    it('$el a width should be 300', () => {
      assert.equal($el.SELECTORS[0].style.width, '300px');
    });

    it('$el .width() method should return 300', () => {
      assert.equal($el.width(), 300);
    });

    after(() => {
      document.body.removeChild(a);
    });

  });

  describe('Height Method', () => {
    let a, $el;

    before(() => {
      a = document.createElement('span');
      a.className = 'test-elm';
      document.body.appendChild(a);
      $el = editcss('.test-elm');

      $el.height(300);
    })

    it('$el should exist', () => assert($el.SELECTORS.length > 0));
    it('$el a height should be 300', () => {
      assert.equal($el.SELECTORS[0].style.height, '300px');
    });

    it('$el .height() method should return 300', () => {
      assert.equal($el.height(), 300);
    });

    after(() => {
      document.body.removeChild(a);
    });

  });

});

export default {};