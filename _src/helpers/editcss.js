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

  addClass(...classNames) {
    let classes, i, len, item;

    for (let i = 0, len = this.$.length; i < len; i++) {
      item = this.$[i];
      classes = item.className.split(' ');
      classes = classes.concat(classNames);
      item.className = u.unique(classes).join(' ').trim();
    }
  }

  removeClass(...classNames) {
    let classes, i, len, item;

    for (let i = 0, len = this.$.length; i < len; i++) {
      item = this.$[i];
      classes = item.className.split(' ');
      classes = classes.filter(it => classNames.indexOf(it) < 0);
      item.className = u.unique(classes).join(' ').trim();
    }
  }
}

export default function(selector) {
  selector = document.querySelectorAll(selector);

  if (!selector) {
    return;
  }

  return new EditCSS(selector);

}