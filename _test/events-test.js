'use strict';

import assert from 'assert';
import ev from './../_src/helpers/events';

describe('Events', () => {
  describe('Init', () => {
    it('Should be a function', () => assert.equal(typeof ev, 'function'));
    it('Should be an object', () => assert(ev('body') instanceof Object));
    it('"body" Should have length', () => assert(ev('body').$.length > 0));
    it('"#no-data" Should be empty', () => assert.equal(ev('#no-data').$.length, 0));
    it('Should have "on" method', () => assert(ev('body').on));
    it('Should have "off" method', () => assert(ev('body').off));
    it('Should have "trigger" method', () => assert(ev('body').trigger));
  });

  // On Event
  describe('On Event', () => {
    let a, b, c, $el, clickEvent, result;

    before(done => {
      result = false;
      a = document.createElement('span');
      b = document.createElement('div');
      c = document.createElement('a');
      a.className = 'test-elm';
      b.className = 'test-elm';
      c.className = 'test-elm';
      document.body.appendChild(a);
      document.body.appendChild(b);
      document.body.appendChild(c);
      $el = ev('.test-elm');

      $el.on('click', e => {
        result = e;
        done();
      });

      clickEvent = document.createEvent('MouseEvents');
      clickEvent.initEvent('click', true ,true);

      document.querySelector('.test-elm').dispatchEvent(clickEvent);
    });

    it('$el should exist', () => assert($el.$.length > 0));
    it('$el a should trigger the event', () => assert(result));
    it('event target className should match', () => {
      assert.equal(result.target.className, 'test-elm');
    });

    after(() => {
      document.body.removeChild(a);
      document.body.removeChild(b);
      document.body.removeChild(c);
    });
  });

  // Off Event
  describe('Off Event', () => {
    let a, b, c, $el, clickEvent, result;

    before(done => {
      result = false;
      a = document.createElement('span');
      b = document.createElement('div');
      c = document.createElement('a');
      a.className = 'test-elm';
      b.className = 'test-elm';
      c.className = 'test-elm';
      document.body.appendChild(a);
      document.body.appendChild(b);
      document.body.appendChild(c);
      $el = ev('.test-elm');

      $el.on('click', e => {
        result = e;
        done();
      });

      $el.off('click');

      clickEvent = document.createEvent('MouseEvents');
      clickEvent.initEvent('click', true ,true);

      document.querySelector('.test-elm').dispatchEvent(clickEvent);

      setTimeout(done, 1000);
    });

    it('$el should exist', () => assert($el.$.length > 0));
    it('$el should not trigger the event', () => assert(!result));

    after(() => {
      document.body.removeChild(a);
      document.body.removeChild(b);
      document.body.removeChild(c);
    });
  });

  // Trigger Event
  describe('Trigger Event', () => {
    let a, b, c, $el, result;

    before(done => {
      result = false;
      a = document.createElement('span');
      b = document.createElement('div');
      c = document.createElement('a');
      a.className = 'test-elm';
      b.className = 'test-elm';
      c.className = 'test-elm';
      document.body.appendChild(a);
      document.body.appendChild(b);
      document.body.appendChild(c);
      $el = ev('.test-elm');

      $el.on('mouseover', e => {
        result = e;
        done();
      });

      $el.trigger('mouseover');
    });

    it('$el should exist', () => assert($el.$.length > 0));
    it('$el should trigger the event', () => assert(result));

    after(() => {
      document.body.removeChild(a);
      document.body.removeChild(b);
      document.body.removeChild(c);
    });
  });
});