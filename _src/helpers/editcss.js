/**
 * Basic CSS class editor
 * @author Andrés Zorro <zorrodg@gmail.com>
 */
'use strict';

import * as u from './utils';

class EditCSS {
  constructor(selector) {
    this.SELECTORS = selector;
  }

  /**
   * Adds a new class to the element className string
   * @param {...spread} classNames classes to add
   */
  addClass(...classNames) {
    for (let i = 0, len = this.SELECTORS.length; i < len; i++) {
      let item = this.SELECTORS[i],
          classes = item.className.split(' ');
      classes = classes.concat(classNames);
      item.className = u.unique(classes).join(' ').trim();
    }

    return this;
  }

  /**
   * Removes a new class to the element className string
   * @param {...spread} classNames classes to remove
   */
  removeClass(...classNames) {
    for (let i = 0, len = this.SELECTORS.length; i < len; i++) {
      let item = this.SELECTORS[i],
          classes = item.className.split(' ');
      classes = classes.filter(it => classNames.indexOf(it) < 0);
      item.className = u.unique(classes).join(' ').trim();
    }

    return this;
  }

  /**
   * Check whether given elm has class
   * @param  {string}  className Name of the class
   * @return {Boolean}           true if found
   */
  hasClass(className) {
    for (let i = 0, len = this.SELECTORS.length; i < len; i++) {
      let item = this.SELECTORS[i],
          classes = item.className.split(' ');
      if (u.contains(classes, className)) {
        return true;
      }
    }

    return false;
  }

  /**
   * Turns class on/off
   * @param  {...spread} classNames classes to toggle
   */
  toggleClass(...classNames) {

    for (let i = 0, len = this.SELECTORS.length; i < len; i++) {
      let item = this.SELECTORS[i],
          classes = item ? item.className.split(' ') : [];

      for (let currentClass of classNames) {
        if (u.contains(classes, currentClass)) {
          classes = classes.filter(it => it !== currentClass);
        } else {
          classes.push(currentClass);
        }
      }

      item.className = u.unique(classes).join(' ').trim();
    }

    return this;
  }

  /**
   * Get/Set selector width
   * @param  {number} px target width (Leave empty to return current width)
   */
  width(px) {
    if (!px) {
      return Number.parseInt(this.SELECTORS[0].style.width.replace('px', ''));
    }
    for (let i = 0, len = this.SELECTORS.length; i < len; i++) {
      let item = this.SELECTORS[i];
      item.style.width = Number.parseInt(px) + 'px';
    }

    return this;
  }

  /**
   * Get/Set selector height
   * @param  {number} px target height (Leave empty to return current height)
   */
  height(px) {
    if (!px) {
      return Number.parseInt(this.SELECTORS[0].style.height.replace('px', ''));
    }
    for (let i = 0, len = this.SELECTORS.length; i < len; i++) {
      let item = this.SELECTORS[i];
      item.style.height = Number.parseInt(px) + 'px';
    }

    return this;
  }
}

export default function(selector) {
  if (selector instanceof HTMLElement) {
    return new EditCSS([selector]);
  }

  selector = selector instanceof NodeList ? selector : document.querySelectorAll(selector);

  if (!selector || !(selector instanceof NodeList)) {
    return;
  }

  return new EditCSS([].slice.call(selector, 0));
}