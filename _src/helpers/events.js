/**
 * Basic Event Listener support (Only )
 * @author Andrés Zorro <zorrodg@gmail.com>
 */
'use strict';

import * as u from './utils';

class EventRegister {
  constructor (selector) {
    this.events = {};
    this.$ = selector;
  }

  /**
   * Adds an event listener
   * @param  {string}   evt      Event name
   * @param  {Function} callback callback to execute
   */
  on(evt, callback) {
    if (!u.contains(Object.keys(this.events), evt)) {
      this.events[evt] = callback;
    }

    for (let i = 0, len = this.$.length; i < len; i++) {
      let item = this.$[i];
      item.addEventListener(evt, this.events[evt]);
    }
  }

  /**
   * Removes an event listener
   * @param  {string}   evt      Event name
   */
  off(evt) {
    if (u.contains(Object.keys(this.events), evt)) {
      for (let i = 0, len = this.$.length; i < len; i++) {
        let item = this.$[i];
        item.removeEventListener(evt, this.events[evt]);
      }

      delete this.events[evt];
    }
  }

  /**
   * Triggers an event listener
   * @param  {string}   evt      Event name
   */
  trigger(evt) {
    if (u.contains(Object.keys(this.events), evt)) {
      for (let i = 0, len = this.$.length; i < len; i++) {
        let item = this.$[i],
            evtDispatcher = document.createEvent('MouseEvents');

        evtDispatcher.initEvent(evt, true ,true);
        console.log(evtDispatcher);
        item.dispatchEvent(evtDispatcher);
      }
    }
  }
}

export default function (selector) {
  selector = document.querySelectorAll(selector);

  if (!selector) {
    return;
  }

  return new EventRegister(selector);
}
