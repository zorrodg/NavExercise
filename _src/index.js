/**
 * HUGE test
 * @author Andrés Zorro <zorrodg@gmail.com>
 */
'use strict';

import qs from './helpers/editcss';
import ajax from './helpers/ajax';
import e from './helpers/events';
import c from './helpers/editcss';

document.addEventListener('DOMContentLoaded', init);

/**
 * Inits navigation
 */
function init() {
  ajax('api/nav.json')
      .then(res => res.data)
      .then(data => renderTemplate(data.items));
}

/**
 * Renders navigation template on data arrival
 * @param  {Array} data Nav data
 */
function renderTemplate(data) {
  let nav = document.querySelector('#nav-content'),
      template = '',
      parentItems = '';

  for (let parent of data) {
    let children = '';

    // If contain children
    if (parent.items.length) {
      children = '<ul class="children">';
      for (let child of parent.items) {

        children += `<li><a href="${child.url}" target="_blank">${child.label}</a></li>`;
      }
      children += '</ul>';
    }

    parentItems +=`<li class="nav-content-item ${children ? 'has-children' : ''}"><a href="${parent.url}" target="_blank">${parent.label}</a> ${children}</li>`
  }

  template = `<ul>${parentItems}</ul>
    <footer>&copy; 2014 Huge. All Rights Reserved.</footer>`;

  nav.innerHTML = template;

  assignNavEvents(nav);
}

/**
 * Using the same cached selector to bind events
 * @param  {HTMLElement} nav Nav element
 */
function assignNavEvents(nav) {

}
