/**
 * Basic Event Listener support
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
   * @param  {boolean} capture   event capture
   */
  on(evt, callback, capture = false) {
    if (!u.contains(Object.keys(this.events), evt)) {
      this.events[evt] = callback;
    }

    for (let i = 0, len = this.$.length; i < len; i++) {
      let item = this.$[i];
      item.addEventListener(evt, this.events[evt], capture);
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
            evtDispatcher = new Event(evt);

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
