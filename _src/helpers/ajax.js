/**
 * Creates an AJAX call and returns a promise
 * Only GET method and JSON calls supported for now
 * @author Andrés Zorro <zorrodg@gmail.com>
 */
'use strict';

export default function(opts = {}) {
  return new Promise(function (resolve, reject) {
    let req;

    if (typeof opts === 'string') {
      opts = {
        url: opts
      }
    }

    // No AJAX without URL
    if (!opts || !opts.url) {
      throw new Error('No URL');
    }

    // Extend default options
    opts = Object.assign({
      method: 'GET',
      params: {},
      headers: {
        'Content-Type' : 'application/json'
      },
      qs: []
    }, opts);

    // Set Query String
    for (let p of Object.keys(opts.params)) {
      opts.qs.push(p + '=' + opts.params[p]);
    }

    // Set URL
    opts.url = opts.url + (opts.qs.length ? '?' + opts.qs.join('&') : '');
    delete opts.qs;

    // Create Request
    if (window.XMLHttpRequest) {
      req = new XMLHttpRequest();

      req.open(opts.method, opts.url, true);

      for (let i of Object.keys(opts.headers)) {
        req.setRequestHeader(i, opts.headers[i]);
      }

      // AJAX async response
      req.onreadystatechange = responseFn;

      // Sed query
      req.send(null);
    } else {
      throw new Error('No XMLHttpRequest');
    }

    /**
     * Executes on AJAX response
     */
    function responseFn() {
      if (req.readyState === 4) {
        try {
          // Success response
          if (req.status >= 200 && req.status < 400) {
            resolve({
              data: JSON.parse(req.responseText),
              status: req.status,
              config: Object.assign({}, opts)
            })
          } else {
            reject({
              error: req.responseText,
              status: req.status,
              config: Object.assign({}, opts)
            });
          }
        } catch (e) {
          // Error response
          reject({
            error: e,
            status: req.status,
            config: Object.assign({}, opts)
          })
        }  
      }
    }
  });
}
