/**
 * Basic CSS class editor
 * @author Andrés Zorro <zorrodg@gmail.com>
 */
'use strict';

import * as u from './utils';

class EditCSS {
  constructor(selector) {
    this.$ = selector;
  }

  /**
   * Adds a new class to the element className string
   * @param {...spread} classNames classes to add
   */
  addClass(...classNames) {
    for (let i = 0, len = this.$.length; i < len; i++) {
      let item = this.$[i],
          classes = item.className.split(' ');
      classes = classes.concat(classNames);
      item.className = u.unique(classes).join(' ').trim();
    }
  }

  /**
   * Removes a new class to the element className string
   * @param {...spread} classNames classes to remove
   */
  removeClass(...classNames) {
    for (let i = 0, len = this.$.length; i < len; i++) {
      let item = this.$[i],
          classes = item.className.split(' ');
      classes = classes.filter(it => classNames.indexOf(it) < 0);
      item.className = u.unique(classes).join(' ').trim();
    }
  }

  /**
   * Check whether given elm has class
   * @param  {string}  className Name of the class
   * @return {Boolean}           true if found
   */
  hasClass(className) {
    for (let i = 0, len = this.$.length; i < len; i++) {
      let item = this.$[i],
          classes = item.className.split(' ');
      if (u.contains(classes, className)) {
        return true;
      }
    }

    return false;
  }
}

export default function(selector) {
  selector = document.querySelectorAll(selector);

  if (!selector) {
    return;
  }

  return new EditCSS(selector);

}