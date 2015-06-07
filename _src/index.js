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

  assignNavEvents();
}

/**
 * Bind DOM Events
 */
function assignNavEvents() {
  let $mainNav = c('.nav'),
      $navItems = e('.has-children > a'),
      cNavItems = c('.has-children'),
      $hamburger = e('.hamburger'),
      $maskBackdrop = c('.mask-backdrop'),
      $mainContainer = c('.main'),
      resizeInProgress = false;

  $hamburger.off().on('click', e => {
    $mainNav.toggleClass('open');
    $maskBackdrop.toggleClass('show')
                 .height(document.querySelector('body').offsetHeight);
  }, true);

  $navItems.off().on('click', e => {
    let target = e.target.nodeName === 'LI' ? c(e.target) : c(e.target.parentNode);
    e.preventDefault();
    $maskBackdrop.addClass('show')
                 .height(document.querySelector('body').offsetHeight);

    closeAll(null, target);

  }, true);

  // Close nav items if resize
  e(window).on('resize', e => {
    if (!resizeInProgress) {
      resizeInProgress = true;

      window.setTimeout(() => {
        closeAll(true);
        resizeInProgress = false;
      }, 500);
    }
  })
  // Close nav when click outside of screens
  .on('click', e => {
    let target = e.target.nodeName;
    if (target !== 'A' && target !== 'LI') {
      closeAll(true);
    }
  });

  function closeAll(mainNav, current) {
    if ($mainNav.hasClass('open') && mainNav) {
      $mainNav.removeClass('open');
    }

    if (current) {
      let navs = [].slice.call(cNavItems.SELECTORS, 0),
          currentNode = current.SELECTORS[0];

      for(let nav of navs) {
        if (nav.isEqualNode(currentNode)) {
          current.toggleClass('open');
        } else {
          c(nav).removeClass('open');  
        }
        
      }
    } else {
      cNavItems.removeClass('open');
      $maskBackdrop.removeClass('show');
    }
  }
}


