/**
 * Basic Event Listener support
 * @author Andrés Zorro <zorrodg@gmail.com>
 */
'use strict';

import * as u from './utils';

class EventRegister {

  constructor (selector) {
    this.events = {};
    this.SELECTORS = selector;
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

    for (let i = 0, len = this.SELECTORS.length; i < len; i++) {
      let item = this.SELECTORS[i];
      item.addEventListener(evt, this.events[evt], capture);
    }

    return this;
  }

  /**
   * Removes an event listener
   * @param  {string}   evt      Event name
   */
  off(evt) {
    // Remove all events
    if (!evt) {
      for (let i = 0, len = this.SELECTORS.length; i < len; i++) {
        let item = this.SELECTORS[i];
        for (let evnt of Object.keys(this.events)) {
          item.removeEventListener(evnt, this.events[evnt]);
        }
      }
      this.events = {};
      return this;
    }

    // Remove specific event
    if (u.contains(Object.keys(this.events), evt)) {
      for (let i = 0, len = this.SELECTORS.length; i < len; i++) {
        let item = this.SELECTORS[i];
        item.removeEventListener(evt, this.events[evt]);
      }

      delete this.events[evt];
    }

    return this;
  }

  /**
   * Triggers an event listener
   * @param  {string}   evt      Event name
   */
  trigger(evt) {
    if (u.contains(Object.keys(this.events), evt)) {
      for (let i = 0, len = this.SELECTORS.length; i < len; i++) {
        let item = this.SELECTORS[i],
            evtDispatcher = new Event(evt);

        item.dispatchEvent(evtDispatcher);
      }
    }

    return this;
  }
}

export default function (selector) {
  if (selector instanceof HTMLElement || selector instanceof Window) {
    return new EventRegister([selector]);
  }

  selector = selector instanceof NodeList ? selector : document.querySelectorAll(selector);

  if (!selector || !(selector instanceof NodeList)) {
    return;
  }

  return new EventRegister([].slice.call(selector, 0));
}
