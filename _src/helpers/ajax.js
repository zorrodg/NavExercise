'use strict';

export default function(opts) {
  let promise,
      req;

  // Extend default options
  opts = Object.assign({
    method: 'GET',
    params: {},
    headers: {
      'Content-Type' : 'application/json'
    },
    qs: []
  }, opts);

  // No AJAX without URL
  if (!opts.url) {
    throw 'No URL';
  }

  // Set Query String
  for (let p of Object.keys(opts.params)) {
    opts.qs += p + '=' + opts.params[p];
  }

  // Set URL
  opts.url = opts.url + (opts.qs.length ? + '?' + opts.qs.join('&') : '');

  // Create Request
  if (window.XMLHttpRequest) {
    req = new XMLHttpRequest();

    req.open(opts.method, opts.url);

    for (let i of Object.keys(opts.headers)) {
      req.setRequestHeader(i, opts.headers[i]);
    }

    req.onreadystatechange = responseFn;

    req.send();
  }

  /**
   * Executes on AJAX response
   */
  function responseFn() {
    if (req.readyState === 4) {
      // Success response
      
      // Error response
    }
  }

}
