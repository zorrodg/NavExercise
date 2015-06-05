'use strict';

export default function(selector) {
  selector = document.querySelector(selector);

  if (!selector) {
    return;
  }

  return selector;
}