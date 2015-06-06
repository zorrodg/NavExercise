/**
 * HUGE test
 * @author Andrés Zorro <zorrodg@gmail.com>
 */
'use strict';

import qs from './helpers/editcss';
import ajax from './helpers/ajax';

document.addEventListener("DOMContentLoaded", init);

function init() {
  ajax('api/nav.json')
      .then(res => res.data)
      .then(data => {
        console.log('data', data);
      });
}
