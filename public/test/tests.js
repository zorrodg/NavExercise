(function e(t,n,r){function s(o,u){if(!n[o]){if(!t[o]){var a=typeof require=="function"&&require;if(!u&&a)return a(o,!0);if(i)return i(o,!0);var f=new Error("Cannot find module '"+o+"'");throw f.code="MODULE_NOT_FOUND",f}var l=n[o]={exports:{}};t[o][0].call(l.exports,function(e){var n=t[o][1][e];return s(n?n:e)},l,l.exports,e,t,n,r)}return n[o].exports}var i=typeof require=="function"&&require;for(var o=0;o<r.length;o++)s(r[o]);return s})({1:[function(require,module,exports){
'use strict';

Object.defineProperty(exports, '__esModule', {
  value: true
});

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

/**
 * Creates an AJAX call and returns a promise
 * Only GET method and JSON calls supported for now
 * @author Andrés Zorro <zorrodg@gmail.com>
 */
'use strict';

exports['default'] = function () {
  var opts = arguments[0] === undefined ? {} : arguments[0];

  return new Promise(function (resolve, reject) {
    var req = undefined;

    if (typeof opts === 'string') {
      opts = {
        url: opts
      };
    }

    // No AJAX without URL
    if (!opts || !opts.url) {
      throw new Error('No URL');
    }

    // Extend default options
    opts = _extends({
      method: 'GET',
      params: {},
      headers: {
        'Content-Type': 'application/json'
      },
      qs: []
    }, opts);

    // Set Query String
    var _iteratorNormalCompletion = true;
    var _didIteratorError = false;
    var _iteratorError = undefined;

    try {
      for (var _iterator = Object.keys(opts.params)[Symbol.iterator](), _step; !(_iteratorNormalCompletion = (_step = _iterator.next()).done); _iteratorNormalCompletion = true) {
        var p = _step.value;

        opts.qs.push(p + '=' + opts.params[p]);
      }
    } catch (err) {
      _didIteratorError = true;
      _iteratorError = err;
    } finally {
      try {
        if (!_iteratorNormalCompletion && _iterator['return']) {
          _iterator['return']();
        }
      } finally {
        if (_didIteratorError) {
          throw _iteratorError;
        }
      }
    }

    // Set URL
    opts.url = opts.url + (opts.qs.length ? '?' + opts.qs.join('&') : '');
    delete opts.qs;

    // Create Request
    if (window.XMLHttpRequest) {
      req = new XMLHttpRequest();

      req.open(opts.method, opts.url, true);

      var _iteratorNormalCompletion2 = true;
      var _didIteratorError2 = false;
      var _iteratorError2 = undefined;

      try {
        for (var _iterator2 = Object.keys(opts.headers)[Symbol.iterator](), _step2; !(_iteratorNormalCompletion2 = (_step2 = _iterator2.next()).done); _iteratorNormalCompletion2 = true) {
          var i = _step2.value;

          req.setRequestHeader(i, opts.headers[i]);
        }
      } catch (err) {
        _didIteratorError2 = true;
        _iteratorError2 = err;
      } finally {
        try {
          if (!_iteratorNormalCompletion2 && _iterator2['return']) {
            _iterator2['return']();
          }
        } finally {
          if (_didIteratorError2) {
            throw _iteratorError2;
          }
        }
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
              config: _extends({}, opts)
            });
          } else {
            reject({
              error: req.responseText,
              status: req.status,
              config: _extends({}, opts)
            });
          }
        } catch (e) {
          // Error response
          reject({
            error: e,
            status: req.status,
            config: _extends({}, opts)
          });
        }
      }
    }
  });
};

module.exports = exports['default'];

},{}],2:[function(require,module,exports){
/**
 * Basic CSS class editor
 * @author Andrés Zorro <zorrodg@gmail.com>
 */
'use strict';

Object.defineProperty(exports, '__esModule', {
  value: true
});

var _createClass = (function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ('value' in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; })();

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) newObj[key] = obj[key]; } } newObj['default'] = obj; return newObj; } }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError('Cannot call a class as a function'); } }

var _utils = require('./utils');

var u = _interopRequireWildcard(_utils);

var EditCSS = (function () {
  function EditCSS(selector) {
    _classCallCheck(this, EditCSS);

    this.$ = selector;
  }

  _createClass(EditCSS, [{
    key: 'addClass',

    /**
     * Adds a new class to the element className string
     * @param {...spread} classNames classes to add
     */
    value: function addClass() {
      for (var _len = arguments.length, classNames = Array(_len), _key = 0; _key < _len; _key++) {
        classNames[_key] = arguments[_key];
      }

      for (var i = 0, len = this.$.length; i < len; i++) {
        var item = this.$[i],
            classes = item.className.split(' ');
        classes = classes.concat(classNames);
        item.className = u.unique(classes).join(' ').trim();
      }
    }
  }, {
    key: 'removeClass',

    /**
     * Removes a new class to the element className string
     * @param {...spread} classNames classes to remove
     */
    value: function removeClass() {
      for (var _len2 = arguments.length, classNames = Array(_len2), _key2 = 0; _key2 < _len2; _key2++) {
        classNames[_key2] = arguments[_key2];
      }

      for (var i = 0, len = this.$.length; i < len; i++) {
        var item = this.$[i],
            classes = item.className.split(' ');
        classes = classes.filter(function (it) {
          return classNames.indexOf(it) < 0;
        });
        item.className = u.unique(classes).join(' ').trim();
      }
    }
  }, {
    key: 'hasClass',

    /**
     * Check whether given elm has class
     * @param  {string}  className Name of the class
     * @return {Boolean}           true if found
     */
    value: function hasClass(className) {
      for (var i = 0, len = this.$.length; i < len; i++) {
        var item = this.$[i],
            classes = item.className.split(' ');
        if (u.contains(classes, className)) {
          return true;
        }
      }

      return false;
    }
  }]);

  return EditCSS;
})();

exports['default'] = function (selector) {
  selector = document.querySelectorAll(selector);

  if (!selector) {
    return;
  }

  return new EditCSS(selector);
};

module.exports = exports['default'];

},{"./utils":4}],3:[function(require,module,exports){
/**
 * Basic Event Listener support
 * @author Andrés Zorro <zorrodg@gmail.com>
 */
'use strict';

Object.defineProperty(exports, '__esModule', {
  value: true
});

var _createClass = (function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ('value' in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; })();

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) newObj[key] = obj[key]; } } newObj['default'] = obj; return newObj; } }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError('Cannot call a class as a function'); } }

var _utils = require('./utils');

var u = _interopRequireWildcard(_utils);

var EventRegister = (function () {
  function EventRegister(selector) {
    _classCallCheck(this, EventRegister);

    this.events = {};
    this.$ = selector;
  }

  _createClass(EventRegister, [{
    key: 'on',

    /**
     * Adds an event listener
     * @param  {string}   evt      Event name
     * @param  {Function} callback callback to execute
     * @param  {boolean} capture   event capture
     */
    value: function on(evt, callback) {
      var capture = arguments[2] === undefined ? false : arguments[2];

      if (!u.contains(Object.keys(this.events), evt)) {
        this.events[evt] = callback;
      }

      for (var i = 0, len = this.$.length; i < len; i++) {
        var item = this.$[i];
        item.addEventListener(evt, this.events[evt], capture);
      }
    }
  }, {
    key: 'off',

    /**
     * Removes an event listener
     * @param  {string}   evt      Event name
     */
    value: function off(evt) {
      if (u.contains(Object.keys(this.events), evt)) {
        for (var i = 0, len = this.$.length; i < len; i++) {
          var item = this.$[i];
          item.removeEventListener(evt, this.events[evt]);
        }

        delete this.events[evt];
      }
    }
  }, {
    key: 'trigger',

    /**
     * Triggers an event listener
     * @param  {string}   evt      Event name
     */
    value: function trigger(evt) {

      if (u.contains(Object.keys(this.events), evt)) {
        for (var i = 0, len = this.$.length; i < len; i++) {
          var item = this.$[i],
              evtDispatcher = new Event(evt);

          item.dispatchEvent(evtDispatcher);
        }
      }
    }
  }]);

  return EventRegister;
})();

exports['default'] = function (selector) {
  selector = document.querySelectorAll(selector);

  if (!selector) {
    return;
  }

  return new EventRegister(selector);
};

module.exports = exports['default'];

},{"./utils":4}],4:[function(require,module,exports){
'use strict';

Object.defineProperty(exports, '__esModule', {
  value: true
});
exports.contains = contains;
exports.unique = unique;
/**
 * Check if array contains item
 * @param  {Array}  arr  target
 * @param  {String} item
 * @return {Boolean}     true if found
 */

function contains() {
  var arr = arguments[0] === undefined ? [] : arguments[0];
  var item = arguments[1] === undefined ? '' : arguments[1];
  var _iteratorNormalCompletion = true;
  var _didIteratorError = false;
  var _iteratorError = undefined;

  try {
    for (var _iterator = arr[Symbol.iterator](), _step; !(_iteratorNormalCompletion = (_step = _iterator.next()).done); _iteratorNormalCompletion = true) {
      var i = _step.value;

      if (i === item) {
        return true;
      }
    }
  } catch (err) {
    _didIteratorError = true;
    _iteratorError = err;
  } finally {
    try {
      if (!_iteratorNormalCompletion && _iterator['return']) {
        _iterator['return']();
      }
    } finally {
      if (_didIteratorError) {
        throw _iteratorError;
      }
    }
  }

  return false;
}

/**
 * Filters unique values
 * @param  {Array}  arr target
 * @return {Array}      filtered result
 */

function unique() {
  var arr = arguments[0] === undefined ? [] : arguments[0];

  var result = [];

  var _iteratorNormalCompletion2 = true;
  var _didIteratorError2 = false;
  var _iteratorError2 = undefined;

  try {
    for (var _iterator2 = arr[Symbol.iterator](), _step2; !(_iteratorNormalCompletion2 = (_step2 = _iterator2.next()).done); _iteratorNormalCompletion2 = true) {
      var i = _step2.value;

      if (!contains(result, i)) {
        result.push(i);
      }
    }
  } catch (err) {
    _didIteratorError2 = true;
    _iteratorError2 = err;
  } finally {
    try {
      if (!_iteratorNormalCompletion2 && _iterator2['return']) {
        _iterator2['return']();
      }
    } finally {
      if (_didIteratorError2) {
        throw _iteratorError2;
      }
    }
  }

  return result;
}

},{}],5:[function(require,module,exports){
'use strict';

Object.defineProperty(exports, '__esModule', {
  value: true
});

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }

var _assert = require('assert');

var _assert2 = _interopRequireDefault(_assert);

var _srcHelpersAjax = require('./../_src/helpers/ajax');

var _srcHelpersAjax2 = _interopRequireDefault(_srcHelpersAjax);

describe('Ajax Helper', function () {
  var call = undefined;

  // Creation Tests
  describe('Creation', function () {
    it('Should be a function', function () {
      return _assert2['default'].equal(typeof _srcHelpersAjax2['default'], 'function');
    });

    call = (0, _srcHelpersAjax2['default'])('/api/nav.json');
    it('Should work with string', function () {
      return (0, _assert2['default'])(call instanceof Promise);
    });

    call = (0, _srcHelpersAjax2['default'])({ url: '/api/nav.json' });
    it('Should work with object', function () {
      return (0, _assert2['default'])(call instanceof Promise);
    });

    it('Should throw on another type', function () {
      return _assert2['default'].throws((0, _srcHelpersAjax2['default'])([]), 'No URL');
    });
    it('Should throw on empty', function () {
      return _assert2['default'].throws((0, _srcHelpersAjax2['default'])(), 'No URL');
    });
  });

  // Async test
  describe('Async', function () {
    var response = undefined;

    before(function (done) {
      (0, _srcHelpersAjax2['default'])('/api/nav.json').then(function (res) {
        response = res;
        done();
      });
    });

    it('Response should be an object', function () {
      return _assert2['default'].equal(typeof response, 'object');
    });
    it('Response should contain data', function () {
      return (0, _assert2['default'])(response.data);
    });
    it('Response should contain status', function () {
      return (0, _assert2['default'])(response.status);
    });
    it('Response should contain config', function () {
      return (0, _assert2['default'])(response.config);
    });
    it('Urls must match', function () {
      return _assert2['default'].equal('/api/nav.json', response.config.url);
    });
  });

  // Async Params
  describe('Async Params', function () {
    var response = undefined;

    before(function (done) {
      (0, _srcHelpersAjax2['default'])({
        url: '/api/nav.json',
        params: {
          test: '123'
        }
      })['catch'](function (res) {
        response = res;
        done();
      });
    });

    it('Params must match', function () {
      return _assert2['default'].deepEqual({ test: '123' }, response.config.params);
    });
    it('Url must match', function () {
      return _assert2['default'].equal('/api/nav.json?test=123', response.config.url);
    });
  });

  // Async error
  describe('Async Error', function () {
    var response = undefined;

    before(function (done) {
      (0, _srcHelpersAjax2['default'])('/api/123.json')['catch'](function (res) {
        response = res;
        done();
      });
    });

    it('Response should be an object', function () {
      return _assert2['default'].equal(typeof response, 'object');
    });
    it('Response should contain error', function () {
      return (0, _assert2['default'])(response.error);
    });
    it('Response should contain status', function () {
      return (0, _assert2['default'])(response.status);
    });
    it('Response should contain config', function () {
      return (0, _assert2['default'])(response.config);
    });
  });
});

exports['default'] = {};
module.exports = exports['default'];

},{"./../_src/helpers/ajax":1,"assert":9}],6:[function(require,module,exports){
'use strict';

Object.defineProperty(exports, '__esModule', {
  value: true
});

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }

var _assert = require('assert');

var _assert2 = _interopRequireDefault(_assert);

var _srcHelpersEditcss = require('./../_src/helpers/editcss');

var _srcHelpersEditcss2 = _interopRequireDefault(_srcHelpersEditcss);

describe('EditCSS Helper', function () {

  describe('Init', function () {
    it('Should be a function', function () {
      return _assert2['default'].equal(typeof _srcHelpersEditcss2['default'], 'function');
    });
    it('Should be an object', function () {
      return (0, _assert2['default'])((0, _srcHelpersEditcss2['default'])('body') instanceof Object);
    });
    it('"body" Should have length', function () {
      return (0, _assert2['default'])((0, _srcHelpersEditcss2['default'])('body').$.length > 0);
    });
    it('"#no-data" Should be empty', function () {
      return _assert2['default'].equal((0, _srcHelpersEditcss2['default'])('#no-data').$.length, 0);
    });
    it('Should have "addClass" method', function () {
      return (0, _assert2['default'])((0, _srcHelpersEditcss2['default'])('body').addClass);
    });
    it('Should have "removeClass" method', function () {
      return (0, _assert2['default'])((0, _srcHelpersEditcss2['default'])('body').removeClass);
    });
  });

  describe('Add Class Method', function () {
    var a = undefined,
        b = undefined,
        c = undefined,
        $el = undefined;

    before(function () {
      a = document.createElement('span');
      b = document.createElement('div');
      c = document.createElement('a');
      a.className = 'test-elm';
      b.className = 'test-elm';
      c.className = 'test-elm';
      document.body.appendChild(a);
      document.body.appendChild(b);
      document.body.appendChild(c);
      $el = (0, _srcHelpersEditcss2['default'])('.test-elm');

      $el.addClass('test-class', 'other-class');
    });

    it('$el should exist', function () {
      return (0, _assert2['default'])($el.$.length > 0);
    });
    it('$el a should have "test-class" and "other-class"', function () {
      _assert2['default'].equal($el.$[0].className, 'test-elm test-class other-class');
    });

    it('$el b should have "test-class" and "other-class"', function () {
      _assert2['default'].equal($el.$[1].className, 'test-elm test-class other-class');
    });

    it('$el c should have "test-class" and "other-class"', function () {
      _assert2['default'].equal($el.$[2].className, 'test-elm test-class other-class');
    });

    after(function () {
      document.body.removeChild(a);
      document.body.removeChild(b);
      document.body.removeChild(c);
    });
  });

  describe('Remove Class Method', function () {
    var a = undefined,
        b = undefined,
        c = undefined,
        $el = undefined;

    before(function () {
      a = document.createElement('span');
      b = document.createElement('div');
      c = document.createElement('a');
      a.className = 'test-elm test-class other-class';
      b.className = 'test-elm test-class other-class';
      c.className = 'test-elm test-class other-class';
      document.body.appendChild(a);
      document.body.appendChild(b);
      document.body.appendChild(c);
      $el = (0, _srcHelpersEditcss2['default'])('.test-elm');

      $el.removeClass('other-class');
    });

    it('$el should exist', function () {
      return (0, _assert2['default'])($el.$.length > 0);
    });
    it('$el a should have "test-class" only', function () {
      _assert2['default'].equal($el.$[0].className, 'test-elm test-class');
    });

    it('$el b should have "test-class" only', function () {
      _assert2['default'].equal($el.$[0].className, 'test-elm test-class');
    });
    it('$el c should have "test-class" only', function () {
      _assert2['default'].equal($el.$[0].className, 'test-elm test-class');
    });

    after(function () {
      document.body.removeChild(a);
      document.body.removeChild(b);
      document.body.removeChild(c);
    });
  });

  describe('Has Class Method', function () {
    var a = undefined,
        b = undefined,
        c = undefined,
        $el = undefined;

    before(function () {
      a = document.createElement('span');
      b = document.createElement('div');
      c = document.createElement('a');
      a.className = 'test-elm test-class other-class';
      b.className = 'test-elm test-class other-class';
      c.className = 'test-elm test-class other-class';
      document.body.appendChild(a);
      document.body.appendChild(b);
      document.body.appendChild(c);
      $el = (0, _srcHelpersEditcss2['default'])('.test-elm');
    });

    it('$el should exist', function () {
      return (0, _assert2['default'])($el.$.length > 0);
    });
    it('$el should have "test-class"', function () {
      _assert2['default'].equal($el.hasClass('test-elm'), true);
    });

    it('$el should not have "test-other-class"', function () {
      _assert2['default'].equal($el.hasClass('test-other-class'), false);
    });

    after(function () {
      document.body.removeChild(a);
      document.body.removeChild(b);
      document.body.removeChild(c);
    });
  });
});

exports['default'] = {};
module.exports = exports['default'];

},{"./../_src/helpers/editcss":2,"assert":9}],7:[function(require,module,exports){
'use strict';

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }

var _assert = require('assert');

var _assert2 = _interopRequireDefault(_assert);

var _srcHelpersEvents = require('./../_src/helpers/events');

var _srcHelpersEvents2 = _interopRequireDefault(_srcHelpersEvents);

describe('Events helper', function () {
  describe('Init', function () {
    it('Should be a function', function () {
      return _assert2['default'].equal(typeof _srcHelpersEvents2['default'], 'function');
    });
    it('Should be an object', function () {
      return (0, _assert2['default'])((0, _srcHelpersEvents2['default'])('body') instanceof Object);
    });
    it('"body" Should have length', function () {
      return (0, _assert2['default'])((0, _srcHelpersEvents2['default'])('body').$.length > 0);
    });
    it('"#no-data" Should be empty', function () {
      return _assert2['default'].equal((0, _srcHelpersEvents2['default'])('#no-data').$.length, 0);
    });
    it('Should have "on" method', function () {
      return (0, _assert2['default'])((0, _srcHelpersEvents2['default'])('body').on);
    });
    it('Should have "off" method', function () {
      return (0, _assert2['default'])((0, _srcHelpersEvents2['default'])('body').off);
    });
    it('Should have "trigger" method', function () {
      return (0, _assert2['default'])((0, _srcHelpersEvents2['default'])('body').trigger);
    });
  });

  // On Event
  describe('On Event', function () {
    var a = undefined,
        b = undefined,
        c = undefined,
        $el = undefined,
        clickEvent = undefined,
        result = undefined;

    before(function (done) {
      result = false;
      a = document.createElement('span');
      b = document.createElement('div');
      c = document.createElement('a');
      a.className = 'test-elm';
      b.className = 'test-elm';
      c.className = 'test-elm';
      document.body.appendChild(a);
      document.body.appendChild(b);
      document.body.appendChild(c);
      $el = (0, _srcHelpersEvents2['default'])('.test-elm');

      $el.on('click', function (e) {
        result = e;
        done();
      });

      clickEvent = new Event('click');

      document.querySelector('.test-elm').dispatchEvent(clickEvent);
    });

    it('$el should exist', function () {
      return (0, _assert2['default'])($el.$.length > 0);
    });
    it('$el a should trigger the event', function () {
      return (0, _assert2['default'])(result);
    });
    it('event target className should match', function () {
      _assert2['default'].equal(result.target.className, 'test-elm');
    });

    after(function () {
      document.body.removeChild(a);
      document.body.removeChild(b);
      document.body.removeChild(c);
    });
  });

  // Off Event
  describe('Off Event', function () {
    var a = undefined,
        b = undefined,
        c = undefined,
        $el = undefined,
        clickEvent = undefined,
        result = undefined;

    before(function (done) {
      result = false;
      a = document.createElement('span');
      b = document.createElement('div');
      c = document.createElement('a');
      a.className = 'test-elm';
      b.className = 'test-elm';
      c.className = 'test-elm';
      document.body.appendChild(a);
      document.body.appendChild(b);
      document.body.appendChild(c);
      $el = (0, _srcHelpersEvents2['default'])('.test-elm');

      $el.on('click', function (e) {
        result = e;
        done();
      });

      $el.off('click');

      clickEvent = new Event('click');

      document.querySelector('.test-elm').dispatchEvent(clickEvent);

      setTimeout(done, 1000);
    });

    it('$el should exist', function () {
      return (0, _assert2['default'])($el.$.length > 0);
    });
    it('$el should not trigger the event', function () {
      return (0, _assert2['default'])(!result);
    });

    after(function () {
      document.body.removeChild(a);
      document.body.removeChild(b);
      document.body.removeChild(c);
    });
  });

  // Trigger Event
  describe('Trigger Event', function () {
    var a = undefined,
        b = undefined,
        c = undefined,
        $el = undefined,
        result = undefined;

    before(function (done) {
      result = false;
      a = document.createElement('span');
      b = document.createElement('div');
      c = document.createElement('a');
      a.className = 'test-elm';
      b.className = 'test-elm';
      c.className = 'test-elm';
      document.body.appendChild(a);
      document.body.appendChild(b);
      document.body.appendChild(c);
      $el = (0, _srcHelpersEvents2['default'])('.test-elm');

      $el.on('mouseover', function (e) {
        result = e;
        done();
      });

      $el.trigger('mouseover');
    });

    it('$el should exist', function () {
      return (0, _assert2['default'])($el.$.length > 0);
    });
    it('$el should trigger the event', function () {
      return (0, _assert2['default'])(result);
    });

    after(function () {
      document.body.removeChild(a);
      document.body.removeChild(b);
      document.body.removeChild(c);
    });
  });
});

},{"./../_src/helpers/events":3,"assert":9}],8:[function(require,module,exports){
'use strict';

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) newObj[key] = obj[key]; } } newObj['default'] = obj; return newObj; } }

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }

var _assert = require('assert');

var _assert2 = _interopRequireDefault(_assert);

var _srcHelpersUtils = require('./../_src/helpers/utils');

var u = _interopRequireWildcard(_srcHelpersUtils);

describe('Utils helper', function () {
  var arr = [1, 2, 4, 2, 5, 3, 3];

  describe('Contains', function () {
    it('Should contain 3', function () {
      return (0, _assert2['default'])(u.contains(arr, 3));
    });
    it('Should contain 5', function () {
      return (0, _assert2['default'])(u.contains(arr, 5));
    });
    it('Should not contain "3"', function () {
      return _assert2['default'].equal(u.contains(arr, '3'), false);
    });
    it('Should not contain 40', function () {
      return _assert2['default'].equal(u.contains(arr, 40), false);
    });
  });

  describe('Unique', function () {
    arr = u.unique(arr);

    it('Should contain unique values', function () {
      return _assert2['default'].deepEqual(arr, [1, 2, 4, 5, 3]);
    });
  });
});

},{"./../_src/helpers/utils":4,"assert":9}],9:[function(require,module,exports){
// http://wiki.commonjs.org/wiki/Unit_Testing/1.0
//
// THIS IS NOT TESTED NOR LIKELY TO WORK OUTSIDE V8!
//
// Originally from narwhal.js (http://narwhaljs.org)
// Copyright (c) 2009 Thomas Robinson <280north.com>
//
// Permission is hereby granted, free of charge, to any person obtaining a copy
// of this software and associated documentation files (the 'Software'), to
// deal in the Software without restriction, including without limitation the
// rights to use, copy, modify, merge, publish, distribute, sublicense, and/or
// sell copies of the Software, and to permit persons to whom the Software is
// furnished to do so, subject to the following conditions:
//
// The above copyright notice and this permission notice shall be included in
// all copies or substantial portions of the Software.
//
// THE SOFTWARE IS PROVIDED 'AS IS', WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
// IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
// FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
// AUTHORS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER LIABILITY, WHETHER IN AN
// ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM, OUT OF OR IN CONNECTION
// WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE SOFTWARE.

// when used in node, this will actually load the util module we depend on
// versus loading the builtin util module as happens otherwise
// this is a bug in node module loading as far as I am concerned
var util = require('util/');

var pSlice = Array.prototype.slice;
var hasOwn = Object.prototype.hasOwnProperty;

// 1. The assert module provides functions that throw
// AssertionError's when particular conditions are not met. The
// assert module must conform to the following interface.

var assert = module.exports = ok;

// 2. The AssertionError is defined in assert.
// new assert.AssertionError({ message: message,
//                             actual: actual,
//                             expected: expected })

assert.AssertionError = function AssertionError(options) {
  this.name = 'AssertionError';
  this.actual = options.actual;
  this.expected = options.expected;
  this.operator = options.operator;
  if (options.message) {
    this.message = options.message;
    this.generatedMessage = false;
  } else {
    this.message = getMessage(this);
    this.generatedMessage = true;
  }
  var stackStartFunction = options.stackStartFunction || fail;

  if (Error.captureStackTrace) {
    Error.captureStackTrace(this, stackStartFunction);
  }
  else {
    // non v8 browsers so we can have a stacktrace
    var err = new Error();
    if (err.stack) {
      var out = err.stack;

      // try to strip useless frames
      var fn_name = stackStartFunction.name;
      var idx = out.indexOf('\n' + fn_name);
      if (idx >= 0) {
        // once we have located the function frame
        // we need to strip out everything before it (and its line)
        var next_line = out.indexOf('\n', idx + 1);
        out = out.substring(next_line + 1);
      }

      this.stack = out;
    }
  }
};

// assert.AssertionError instanceof Error
util.inherits(assert.AssertionError, Error);

function replacer(key, value) {
  if (util.isUndefined(value)) {
    return '' + value;
  }
  if (util.isNumber(value) && !isFinite(value)) {
    return value.toString();
  }
  if (util.isFunction(value) || util.isRegExp(value)) {
    return value.toString();
  }
  return value;
}

function truncate(s, n) {
  if (util.isString(s)) {
    return s.length < n ? s : s.slice(0, n);
  } else {
    return s;
  }
}

function getMessage(self) {
  return truncate(JSON.stringify(self.actual, replacer), 128) + ' ' +
         self.operator + ' ' +
         truncate(JSON.stringify(self.expected, replacer), 128);
}

// At present only the three keys mentioned above are used and
// understood by the spec. Implementations or sub modules can pass
// other keys to the AssertionError's constructor - they will be
// ignored.

// 3. All of the following functions must throw an AssertionError
// when a corresponding condition is not met, with a message that
// may be undefined if not provided.  All assertion methods provide
// both the actual and expected values to the assertion error for
// display purposes.

function fail(actual, expected, message, operator, stackStartFunction) {
  throw new assert.AssertionError({
    message: message,
    actual: actual,
    expected: expected,
    operator: operator,
    stackStartFunction: stackStartFunction
  });
}

// EXTENSION! allows for well behaved errors defined elsewhere.
assert.fail = fail;

// 4. Pure assertion tests whether a value is truthy, as determined
// by !!guard.
// assert.ok(guard, message_opt);
// This statement is equivalent to assert.equal(true, !!guard,
// message_opt);. To test strictly for the value true, use
// assert.strictEqual(true, guard, message_opt);.

function ok(value, message) {
  if (!value) fail(value, true, message, '==', assert.ok);
}
assert.ok = ok;

// 5. The equality assertion tests shallow, coercive equality with
// ==.
// assert.equal(actual, expected, message_opt);

assert.equal = function equal(actual, expected, message) {
  if (actual != expected) fail(actual, expected, message, '==', assert.equal);
};

// 6. The non-equality assertion tests for whether two objects are not equal
// with != assert.notEqual(actual, expected, message_opt);

assert.notEqual = function notEqual(actual, expected, message) {
  if (actual == expected) {
    fail(actual, expected, message, '!=', assert.notEqual);
  }
};

// 7. The equivalence assertion tests a deep equality relation.
// assert.deepEqual(actual, expected, message_opt);

assert.deepEqual = function deepEqual(actual, expected, message) {
  if (!_deepEqual(actual, expected)) {
    fail(actual, expected, message, 'deepEqual', assert.deepEqual);
  }
};

function _deepEqual(actual, expected) {
  // 7.1. All identical values are equivalent, as determined by ===.
  if (actual === expected) {
    return true;

  } else if (util.isBuffer(actual) && util.isBuffer(expected)) {
    if (actual.length != expected.length) return false;

    for (var i = 0; i < actual.length; i++) {
      if (actual[i] !== expected[i]) return false;
    }

    return true;

  // 7.2. If the expected value is a Date object, the actual value is
  // equivalent if it is also a Date object that refers to the same time.
  } else if (util.isDate(actual) && util.isDate(expected)) {
    return actual.getTime() === expected.getTime();

  // 7.3 If the expected value is a RegExp object, the actual value is
  // equivalent if it is also a RegExp object with the same source and
  // properties (`global`, `multiline`, `lastIndex`, `ignoreCase`).
  } else if (util.isRegExp(actual) && util.isRegExp(expected)) {
    return actual.source === expected.source &&
           actual.global === expected.global &&
           actual.multiline === expected.multiline &&
           actual.lastIndex === expected.lastIndex &&
           actual.ignoreCase === expected.ignoreCase;

  // 7.4. Other pairs that do not both pass typeof value == 'object',
  // equivalence is determined by ==.
  } else if (!util.isObject(actual) && !util.isObject(expected)) {
    return actual == expected;

  // 7.5 For all other Object pairs, including Array objects, equivalence is
  // determined by having the same number of owned properties (as verified
  // with Object.prototype.hasOwnProperty.call), the same set of keys
  // (although not necessarily the same order), equivalent values for every
  // corresponding key, and an identical 'prototype' property. Note: this
  // accounts for both named and indexed properties on Arrays.
  } else {
    return objEquiv(actual, expected);
  }
}

function isArguments(object) {
  return Object.prototype.toString.call(object) == '[object Arguments]';
}

function objEquiv(a, b) {
  if (util.isNullOrUndefined(a) || util.isNullOrUndefined(b))
    return false;
  // an identical 'prototype' property.
  if (a.prototype !== b.prototype) return false;
  // if one is a primitive, the other must be same
  if (util.isPrimitive(a) || util.isPrimitive(b)) {
    return a === b;
  }
  var aIsArgs = isArguments(a),
      bIsArgs = isArguments(b);
  if ((aIsArgs && !bIsArgs) || (!aIsArgs && bIsArgs))
    return false;
  if (aIsArgs) {
    a = pSlice.call(a);
    b = pSlice.call(b);
    return _deepEqual(a, b);
  }
  var ka = objectKeys(a),
      kb = objectKeys(b),
      key, i;
  // having the same number of owned properties (keys incorporates
  // hasOwnProperty)
  if (ka.length != kb.length)
    return false;
  //the same set of keys (although not necessarily the same order),
  ka.sort();
  kb.sort();
  //~~~cheap key test
  for (i = ka.length - 1; i >= 0; i--) {
    if (ka[i] != kb[i])
      return false;
  }
  //equivalent values for every corresponding key, and
  //~~~possibly expensive deep test
  for (i = ka.length - 1; i >= 0; i--) {
    key = ka[i];
    if (!_deepEqual(a[key], b[key])) return false;
  }
  return true;
}

// 8. The non-equivalence assertion tests for any deep inequality.
// assert.notDeepEqual(actual, expected, message_opt);

assert.notDeepEqual = function notDeepEqual(actual, expected, message) {
  if (_deepEqual(actual, expected)) {
    fail(actual, expected, message, 'notDeepEqual', assert.notDeepEqual);
  }
};

// 9. The strict equality assertion tests strict equality, as determined by ===.
// assert.strictEqual(actual, expected, message_opt);

assert.strictEqual = function strictEqual(actual, expected, message) {
  if (actual !== expected) {
    fail(actual, expected, message, '===', assert.strictEqual);
  }
};

// 10. The strict non-equality assertion tests for strict inequality, as
// determined by !==.  assert.notStrictEqual(actual, expected, message_opt);

assert.notStrictEqual = function notStrictEqual(actual, expected, message) {
  if (actual === expected) {
    fail(actual, expected, message, '!==', assert.notStrictEqual);
  }
};

function expectedException(actual, expected) {
  if (!actual || !expected) {
    return false;
  }

  if (Object.prototype.toString.call(expected) == '[object RegExp]') {
    return expected.test(actual);
  } else if (actual instanceof expected) {
    return true;
  } else if (expected.call({}, actual) === true) {
    return true;
  }

  return false;
}

function _throws(shouldThrow, block, expected, message) {
  var actual;

  if (util.isString(expected)) {
    message = expected;
    expected = null;
  }

  try {
    block();
  } catch (e) {
    actual = e;
  }

  message = (expected && expected.name ? ' (' + expected.name + ').' : '.') +
            (message ? ' ' + message : '.');

  if (shouldThrow && !actual) {
    fail(actual, expected, 'Missing expected exception' + message);
  }

  if (!shouldThrow && expectedException(actual, expected)) {
    fail(actual, expected, 'Got unwanted exception' + message);
  }

  if ((shouldThrow && actual && expected &&
      !expectedException(actual, expected)) || (!shouldThrow && actual)) {
    throw actual;
  }
}

// 11. Expected to throw an error:
// assert.throws(block, Error_opt, message_opt);

assert.throws = function(block, /*optional*/error, /*optional*/message) {
  _throws.apply(this, [true].concat(pSlice.call(arguments)));
};

// EXTENSION! This is annoying to write outside this module.
assert.doesNotThrow = function(block, /*optional*/message) {
  _throws.apply(this, [false].concat(pSlice.call(arguments)));
};

assert.ifError = function(err) { if (err) {throw err;}};

var objectKeys = Object.keys || function (obj) {
  var keys = [];
  for (var key in obj) {
    if (hasOwn.call(obj, key)) keys.push(key);
  }
  return keys;
};

},{"util/":13}],10:[function(require,module,exports){
if (typeof Object.create === 'function') {
  // implementation from standard node.js 'util' module
  module.exports = function inherits(ctor, superCtor) {
    ctor.super_ = superCtor
    ctor.prototype = Object.create(superCtor.prototype, {
      constructor: {
        value: ctor,
        enumerable: false,
        writable: true,
        configurable: true
      }
    });
  };
} else {
  // old school shim for old browsers
  module.exports = function inherits(ctor, superCtor) {
    ctor.super_ = superCtor
    var TempCtor = function () {}
    TempCtor.prototype = superCtor.prototype
    ctor.prototype = new TempCtor()
    ctor.prototype.constructor = ctor
  }
}

},{}],11:[function(require,module,exports){
// shim for using process in browser

var process = module.exports = {};
var queue = [];
var draining = false;
var currentQueue;
var queueIndex = -1;

function cleanUpNextTick() {
    draining = false;
    if (currentQueue.length) {
        queue = currentQueue.concat(queue);
    } else {
        queueIndex = -1;
    }
    if (queue.length) {
        drainQueue();
    }
}

function drainQueue() {
    if (draining) {
        return;
    }
    var timeout = setTimeout(cleanUpNextTick);
    draining = true;

    var len = queue.length;
    while(len) {
        currentQueue = queue;
        queue = [];
        while (++queueIndex < len) {
            currentQueue[queueIndex].run();
        }
        queueIndex = -1;
        len = queue.length;
    }
    currentQueue = null;
    draining = false;
    clearTimeout(timeout);
}

process.nextTick = function (fun) {
    var args = new Array(arguments.length - 1);
    if (arguments.length > 1) {
        for (var i = 1; i < arguments.length; i++) {
            args[i - 1] = arguments[i];
        }
    }
    queue.push(new Item(fun, args));
    if (queue.length === 1 && !draining) {
        setTimeout(drainQueue, 0);
    }
};

// v8 likes predictible objects
function Item(fun, array) {
    this.fun = fun;
    this.array = array;
}
Item.prototype.run = function () {
    this.fun.apply(null, this.array);
};
process.title = 'browser';
process.browser = true;
process.env = {};
process.argv = [];
process.version = ''; // empty string to avoid regexp issues
process.versions = {};

function noop() {}

process.on = noop;
process.addListener = noop;
process.once = noop;
process.off = noop;
process.removeListener = noop;
process.removeAllListeners = noop;
process.emit = noop;

process.binding = function (name) {
    throw new Error('process.binding is not supported');
};

// TODO(shtylman)
process.cwd = function () { return '/' };
process.chdir = function (dir) {
    throw new Error('process.chdir is not supported');
};
process.umask = function() { return 0; };

},{}],12:[function(require,module,exports){
module.exports = function isBuffer(arg) {
  return arg && typeof arg === 'object'
    && typeof arg.copy === 'function'
    && typeof arg.fill === 'function'
    && typeof arg.readUInt8 === 'function';
}
},{}],13:[function(require,module,exports){
(function (process,global){
// Copyright Joyent, Inc. and other Node contributors.
//
// Permission is hereby granted, free of charge, to any person obtaining a
// copy of this software and associated documentation files (the
// "Software"), to deal in the Software without restriction, including
// without limitation the rights to use, copy, modify, merge, publish,
// distribute, sublicense, and/or sell copies of the Software, and to permit
// persons to whom the Software is furnished to do so, subject to the
// following conditions:
//
// The above copyright notice and this permission notice shall be included
// in all copies or substantial portions of the Software.
//
// THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS
// OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF
// MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN
// NO EVENT SHALL THE AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM,
// DAMAGES OR OTHER LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR
// OTHERWISE, ARISING FROM, OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE
// USE OR OTHER DEALINGS IN THE SOFTWARE.

var formatRegExp = /%[sdj%]/g;
exports.format = function(f) {
  if (!isString(f)) {
    var objects = [];
    for (var i = 0; i < arguments.length; i++) {
      objects.push(inspect(arguments[i]));
    }
    return objects.join(' ');
  }

  var i = 1;
  var args = arguments;
  var len = args.length;
  var str = String(f).replace(formatRegExp, function(x) {
    if (x === '%%') return '%';
    if (i >= len) return x;
    switch (x) {
      case '%s': return String(args[i++]);
      case '%d': return Number(args[i++]);
      case '%j':
        try {
          return JSON.stringify(args[i++]);
        } catch (_) {
          return '[Circular]';
        }
      default:
        return x;
    }
  });
  for (var x = args[i]; i < len; x = args[++i]) {
    if (isNull(x) || !isObject(x)) {
      str += ' ' + x;
    } else {
      str += ' ' + inspect(x);
    }
  }
  return str;
};


// Mark that a method should not be used.
// Returns a modified function which warns once by default.
// If --no-deprecation is set, then it is a no-op.
exports.deprecate = function(fn, msg) {
  // Allow for deprecating things in the process of starting up.
  if (isUndefined(global.process)) {
    return function() {
      return exports.deprecate(fn, msg).apply(this, arguments);
    };
  }

  if (process.noDeprecation === true) {
    return fn;
  }

  var warned = false;
  function deprecated() {
    if (!warned) {
      if (process.throwDeprecation) {
        throw new Error(msg);
      } else if (process.traceDeprecation) {
        console.trace(msg);
      } else {
        console.error(msg);
      }
      warned = true;
    }
    return fn.apply(this, arguments);
  }

  return deprecated;
};


var debugs = {};
var debugEnviron;
exports.debuglog = function(set) {
  if (isUndefined(debugEnviron))
    debugEnviron = process.env.NODE_DEBUG || '';
  set = set.toUpperCase();
  if (!debugs[set]) {
    if (new RegExp('\\b' + set + '\\b', 'i').test(debugEnviron)) {
      var pid = process.pid;
      debugs[set] = function() {
        var msg = exports.format.apply(exports, arguments);
        console.error('%s %d: %s', set, pid, msg);
      };
    } else {
      debugs[set] = function() {};
    }
  }
  return debugs[set];
};


/**
 * Echos the value of a value. Trys to print the value out
 * in the best way possible given the different types.
 *
 * @param {Object} obj The object to print out.
 * @param {Object} opts Optional options object that alters the output.
 */
/* legacy: obj, showHidden, depth, colors*/
function inspect(obj, opts) {
  // default options
  var ctx = {
    seen: [],
    stylize: stylizeNoColor
  };
  // legacy...
  if (arguments.length >= 3) ctx.depth = arguments[2];
  if (arguments.length >= 4) ctx.colors = arguments[3];
  if (isBoolean(opts)) {
    // legacy...
    ctx.showHidden = opts;
  } else if (opts) {
    // got an "options" object
    exports._extend(ctx, opts);
  }
  // set default options
  if (isUndefined(ctx.showHidden)) ctx.showHidden = false;
  if (isUndefined(ctx.depth)) ctx.depth = 2;
  if (isUndefined(ctx.colors)) ctx.colors = false;
  if (isUndefined(ctx.customInspect)) ctx.customInspect = true;
  if (ctx.colors) ctx.stylize = stylizeWithColor;
  return formatValue(ctx, obj, ctx.depth);
}
exports.inspect = inspect;


// http://en.wikipedia.org/wiki/ANSI_escape_code#graphics
inspect.colors = {
  'bold' : [1, 22],
  'italic' : [3, 23],
  'underline' : [4, 24],
  'inverse' : [7, 27],
  'white' : [37, 39],
  'grey' : [90, 39],
  'black' : [30, 39],
  'blue' : [34, 39],
  'cyan' : [36, 39],
  'green' : [32, 39],
  'magenta' : [35, 39],
  'red' : [31, 39],
  'yellow' : [33, 39]
};

// Don't use 'blue' not visible on cmd.exe
inspect.styles = {
  'special': 'cyan',
  'number': 'yellow',
  'boolean': 'yellow',
  'undefined': 'grey',
  'null': 'bold',
  'string': 'green',
  'date': 'magenta',
  // "name": intentionally not styling
  'regexp': 'red'
};


function stylizeWithColor(str, styleType) {
  var style = inspect.styles[styleType];

  if (style) {
    return '\u001b[' + inspect.colors[style][0] + 'm' + str +
           '\u001b[' + inspect.colors[style][1] + 'm';
  } else {
    return str;
  }
}


function stylizeNoColor(str, styleType) {
  return str;
}


function arrayToHash(array) {
  var hash = {};

  array.forEach(function(val, idx) {
    hash[val] = true;
  });

  return hash;
}


function formatValue(ctx, value, recurseTimes) {
  // Provide a hook for user-specified inspect functions.
  // Check that value is an object with an inspect function on it
  if (ctx.customInspect &&
      value &&
      isFunction(value.inspect) &&
      // Filter out the util module, it's inspect function is special
      value.inspect !== exports.inspect &&
      // Also filter out any prototype objects using the circular check.
      !(value.constructor && value.constructor.prototype === value)) {
    var ret = value.inspect(recurseTimes, ctx);
    if (!isString(ret)) {
      ret = formatValue(ctx, ret, recurseTimes);
    }
    return ret;
  }

  // Primitive types cannot have properties
  var primitive = formatPrimitive(ctx, value);
  if (primitive) {
    return primitive;
  }

  // Look up the keys of the object.
  var keys = Object.keys(value);
  var visibleKeys = arrayToHash(keys);

  if (ctx.showHidden) {
    keys = Object.getOwnPropertyNames(value);
  }

  // IE doesn't make error fields non-enumerable
  // http://msdn.microsoft.com/en-us/library/ie/dww52sbt(v=vs.94).aspx
  if (isError(value)
      && (keys.indexOf('message') >= 0 || keys.indexOf('description') >= 0)) {
    return formatError(value);
  }

  // Some type of object without properties can be shortcutted.
  if (keys.length === 0) {
    if (isFunction(value)) {
      var name = value.name ? ': ' + value.name : '';
      return ctx.stylize('[Function' + name + ']', 'special');
    }
    if (isRegExp(value)) {
      return ctx.stylize(RegExp.prototype.toString.call(value), 'regexp');
    }
    if (isDate(value)) {
      return ctx.stylize(Date.prototype.toString.call(value), 'date');
    }
    if (isError(value)) {
      return formatError(value);
    }
  }

  var base = '', array = false, braces = ['{', '}'];

  // Make Array say that they are Array
  if (isArray(value)) {
    array = true;
    braces = ['[', ']'];
  }

  // Make functions say that they are functions
  if (isFunction(value)) {
    var n = value.name ? ': ' + value.name : '';
    base = ' [Function' + n + ']';
  }

  // Make RegExps say that they are RegExps
  if (isRegExp(value)) {
    base = ' ' + RegExp.prototype.toString.call(value);
  }

  // Make dates with properties first say the date
  if (isDate(value)) {
    base = ' ' + Date.prototype.toUTCString.call(value);
  }

  // Make error with message first say the error
  if (isError(value)) {
    base = ' ' + formatError(value);
  }

  if (keys.length === 0 && (!array || value.length == 0)) {
    return braces[0] + base + braces[1];
  }

  if (recurseTimes < 0) {
    if (isRegExp(value)) {
      return ctx.stylize(RegExp.prototype.toString.call(value), 'regexp');
    } else {
      return ctx.stylize('[Object]', 'special');
    }
  }

  ctx.seen.push(value);

  var output;
  if (array) {
    output = formatArray(ctx, value, recurseTimes, visibleKeys, keys);
  } else {
    output = keys.map(function(key) {
      return formatProperty(ctx, value, recurseTimes, visibleKeys, key, array);
    });
  }

  ctx.seen.pop();

  return reduceToSingleString(output, base, braces);
}


function formatPrimitive(ctx, value) {
  if (isUndefined(value))
    return ctx.stylize('undefined', 'undefined');
  if (isString(value)) {
    var simple = '\'' + JSON.stringify(value).replace(/^"|"$/g, '')
                                             .replace(/'/g, "\\'")
                                             .replace(/\\"/g, '"') + '\'';
    return ctx.stylize(simple, 'string');
  }
  if (isNumber(value))
    return ctx.stylize('' + value, 'number');
  if (isBoolean(value))
    return ctx.stylize('' + value, 'boolean');
  // For some reason typeof null is "object", so special case here.
  if (isNull(value))
    return ctx.stylize('null', 'null');
}


function formatError(value) {
  return '[' + Error.prototype.toString.call(value) + ']';
}


function formatArray(ctx, value, recurseTimes, visibleKeys, keys) {
  var output = [];
  for (var i = 0, l = value.length; i < l; ++i) {
    if (hasOwnProperty(value, String(i))) {
      output.push(formatProperty(ctx, value, recurseTimes, visibleKeys,
          String(i), true));
    } else {
      output.push('');
    }
  }
  keys.forEach(function(key) {
    if (!key.match(/^\d+$/)) {
      output.push(formatProperty(ctx, value, recurseTimes, visibleKeys,
          key, true));
    }
  });
  return output;
}


function formatProperty(ctx, value, recurseTimes, visibleKeys, key, array) {
  var name, str, desc;
  desc = Object.getOwnPropertyDescriptor(value, key) || { value: value[key] };
  if (desc.get) {
    if (desc.set) {
      str = ctx.stylize('[Getter/Setter]', 'special');
    } else {
      str = ctx.stylize('[Getter]', 'special');
    }
  } else {
    if (desc.set) {
      str = ctx.stylize('[Setter]', 'special');
    }
  }
  if (!hasOwnProperty(visibleKeys, key)) {
    name = '[' + key + ']';
  }
  if (!str) {
    if (ctx.seen.indexOf(desc.value) < 0) {
      if (isNull(recurseTimes)) {
        str = formatValue(ctx, desc.value, null);
      } else {
        str = formatValue(ctx, desc.value, recurseTimes - 1);
      }
      if (str.indexOf('\n') > -1) {
        if (array) {
          str = str.split('\n').map(function(line) {
            return '  ' + line;
          }).join('\n').substr(2);
        } else {
          str = '\n' + str.split('\n').map(function(line) {
            return '   ' + line;
          }).join('\n');
        }
      }
    } else {
      str = ctx.stylize('[Circular]', 'special');
    }
  }
  if (isUndefined(name)) {
    if (array && key.match(/^\d+$/)) {
      return str;
    }
    name = JSON.stringify('' + key);
    if (name.match(/^"([a-zA-Z_][a-zA-Z_0-9]*)"$/)) {
      name = name.substr(1, name.length - 2);
      name = ctx.stylize(name, 'name');
    } else {
      name = name.replace(/'/g, "\\'")
                 .replace(/\\"/g, '"')
                 .replace(/(^"|"$)/g, "'");
      name = ctx.stylize(name, 'string');
    }
  }

  return name + ': ' + str;
}


function reduceToSingleString(output, base, braces) {
  var numLinesEst = 0;
  var length = output.reduce(function(prev, cur) {
    numLinesEst++;
    if (cur.indexOf('\n') >= 0) numLinesEst++;
    return prev + cur.replace(/\u001b\[\d\d?m/g, '').length + 1;
  }, 0);

  if (length > 60) {
    return braces[0] +
           (base === '' ? '' : base + '\n ') +
           ' ' +
           output.join(',\n  ') +
           ' ' +
           braces[1];
  }

  return braces[0] + base + ' ' + output.join(', ') + ' ' + braces[1];
}


// NOTE: These type checking functions intentionally don't use `instanceof`
// because it is fragile and can be easily faked with `Object.create()`.
function isArray(ar) {
  return Array.isArray(ar);
}
exports.isArray = isArray;

function isBoolean(arg) {
  return typeof arg === 'boolean';
}
exports.isBoolean = isBoolean;

function isNull(arg) {
  return arg === null;
}
exports.isNull = isNull;

function isNullOrUndefined(arg) {
  return arg == null;
}
exports.isNullOrUndefined = isNullOrUndefined;

function isNumber(arg) {
  return typeof arg === 'number';
}
exports.isNumber = isNumber;

function isString(arg) {
  return typeof arg === 'string';
}
exports.isString = isString;

function isSymbol(arg) {
  return typeof arg === 'symbol';
}
exports.isSymbol = isSymbol;

function isUndefined(arg) {
  return arg === void 0;
}
exports.isUndefined = isUndefined;

function isRegExp(re) {
  return isObject(re) && objectToString(re) === '[object RegExp]';
}
exports.isRegExp = isRegExp;

function isObject(arg) {
  return typeof arg === 'object' && arg !== null;
}
exports.isObject = isObject;

function isDate(d) {
  return isObject(d) && objectToString(d) === '[object Date]';
}
exports.isDate = isDate;

function isError(e) {
  return isObject(e) &&
      (objectToString(e) === '[object Error]' || e instanceof Error);
}
exports.isError = isError;

function isFunction(arg) {
  return typeof arg === 'function';
}
exports.isFunction = isFunction;

function isPrimitive(arg) {
  return arg === null ||
         typeof arg === 'boolean' ||
         typeof arg === 'number' ||
         typeof arg === 'string' ||
         typeof arg === 'symbol' ||  // ES6 symbol
         typeof arg === 'undefined';
}
exports.isPrimitive = isPrimitive;

exports.isBuffer = require('./support/isBuffer');

function objectToString(o) {
  return Object.prototype.toString.call(o);
}


function pad(n) {
  return n < 10 ? '0' + n.toString(10) : n.toString(10);
}


var months = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep',
              'Oct', 'Nov', 'Dec'];

// 26 Feb 16:19:34
function timestamp() {
  var d = new Date();
  var time = [pad(d.getHours()),
              pad(d.getMinutes()),
              pad(d.getSeconds())].join(':');
  return [d.getDate(), months[d.getMonth()], time].join(' ');
}


// log is just a thin wrapper to console.log that prepends a timestamp
exports.log = function() {
  console.log('%s - %s', timestamp(), exports.format.apply(exports, arguments));
};


/**
 * Inherit the prototype methods from one constructor into another.
 *
 * The Function.prototype.inherits from lang.js rewritten as a standalone
 * function (not on Function.prototype). NOTE: If this file is to be loaded
 * during bootstrapping this function needs to be rewritten using some native
 * functions as prototype setup using normal JavaScript does not work as
 * expected during bootstrapping (see mirror.js in r114903).
 *
 * @param {function} ctor Constructor function which needs to inherit the
 *     prototype.
 * @param {function} superCtor Constructor function to inherit prototype from.
 */
exports.inherits = require('inherits');

exports._extend = function(origin, add) {
  // Don't do anything if add isn't an object
  if (!add || !isObject(add)) return origin;

  var keys = Object.keys(add);
  var i = keys.length;
  while (i--) {
    origin[keys[i]] = add[keys[i]];
  }
  return origin;
};

function hasOwnProperty(obj, prop) {
  return Object.prototype.hasOwnProperty.call(obj, prop);
}

}).call(this,require('_process'),typeof global !== "undefined" ? global : typeof self !== "undefined" ? self : typeof window !== "undefined" ? window : {})

},{"./support/isBuffer":12,"_process":11,"inherits":10}],14:[function(require,module,exports){
// Tests
'use strict';

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }

var _ajaxTest = require('./ajax-test');

var _ajaxTest2 = _interopRequireDefault(_ajaxTest);

var _editcssTest = require('./editcss-test');

var _editcssTest2 = _interopRequireDefault(_editcssTest);

var _utilsTest = require('./utils-test');

var _utilsTest2 = _interopRequireDefault(_utilsTest);

var _eventsTest = require('./events-test');

var _eventsTest2 = _interopRequireDefault(_eventsTest);

},{"./ajax-test":5,"./editcss-test":6,"./events-test":7,"./utils-test":8}]},{},[14])
//# sourceMappingURL=data:application/json;charset:utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIm5vZGVfbW9kdWxlcy9icm93c2VyaWZ5L25vZGVfbW9kdWxlcy9icm93c2VyLXBhY2svX3ByZWx1ZGUuanMiLCIvVXNlcnMvem9ycm9kZy93b3Jrc3BhY2UvaHVnZXRlc3QvX3NyYy9oZWxwZXJzL2FqYXguanMiLCIvVXNlcnMvem9ycm9kZy93b3Jrc3BhY2UvaHVnZXRlc3QvX3NyYy9oZWxwZXJzL2VkaXRjc3MuanMiLCIvVXNlcnMvem9ycm9kZy93b3Jrc3BhY2UvaHVnZXRlc3QvX3NyYy9oZWxwZXJzL2V2ZW50cy5qcyIsIi9Vc2Vycy96b3Jyb2RnL3dvcmtzcGFjZS9odWdldGVzdC9fc3JjL2hlbHBlcnMvdXRpbHMuanMiLCIvVXNlcnMvem9ycm9kZy93b3Jrc3BhY2UvaHVnZXRlc3QvX3Rlc3QvYWpheC10ZXN0LmpzIiwiL1VzZXJzL3pvcnJvZGcvd29ya3NwYWNlL2h1Z2V0ZXN0L190ZXN0L2VkaXRjc3MtdGVzdC5qcyIsIi9Vc2Vycy96b3Jyb2RnL3dvcmtzcGFjZS9odWdldGVzdC9fdGVzdC9ldmVudHMtdGVzdC5qcyIsIi9Vc2Vycy96b3Jyb2RnL3dvcmtzcGFjZS9odWdldGVzdC9fdGVzdC91dGlscy10ZXN0LmpzIiwibm9kZV9tb2R1bGVzL2Jyb3dzZXJpZnkvbm9kZV9tb2R1bGVzL2Fzc2VydC9hc3NlcnQuanMiLCJub2RlX21vZHVsZXMvYnJvd3NlcmlmeS9ub2RlX21vZHVsZXMvaW5oZXJpdHMvaW5oZXJpdHNfYnJvd3Nlci5qcyIsIm5vZGVfbW9kdWxlcy9icm93c2VyaWZ5L25vZGVfbW9kdWxlcy9wcm9jZXNzL2Jyb3dzZXIuanMiLCJub2RlX21vZHVsZXMvYnJvd3NlcmlmeS9ub2RlX21vZHVsZXMvdXRpbC9zdXBwb3J0L2lzQnVmZmVyQnJvd3Nlci5qcyIsIm5vZGVfbW9kdWxlcy9icm93c2VyaWZ5L25vZGVfbW9kdWxlcy91dGlsL3V0aWwuanMiLCIvVXNlcnMvem9ycm9kZy93b3Jrc3BhY2UvaHVnZXRlc3QvX3Rlc3QvaW5kZXgu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SyxDQUFDLENBQUMsQ0FBQyxRQUFRLENBQUMsR0FBRyxFQUFFLEVBQUUsQ0FBQyxFQUFFLEtBQUssQ0FBQztLQUFBLENBQUMsQ0FBQztHQUM3RSxDQUFDLENBQUM7O0FBRUgsVUFBUSxDQUFDLFFBQVEsRUFBRSxZQUFNO0FBQ3ZCLE9BQUcsR0FBRyxDQUFDLENBQUMsTUFBTSxDQUFDLEdBQUcsQ0FBQyxDQUFDOztBQUVwQixNQUFFLENBQUMsOEJBQThCLEVBQUU7YUFBTSxvQkFBTyxTQUFTLENBQUMsR0FBRyxFQUFFLENBQUMsQ0FBQyxFQUFDLENBQUMsRUFBQyxDQUFDLEVBQUMsQ0FBQyxFQUFDLENBQUMsQ0FBQyxDQUFDO0tBQUEsQ0FBQyxDQUFBO0dBQzdFLENBQUMsQ0FBQztDQUVKLENBQUMsQ0FBQzs7O0FDckJIO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUN2V0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQ3ZCQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUMxRkE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOzs7QUNMQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOzs7Ozs7Ozs7d0JDemtCcUIsYUFBYTs7OzsyQkFDVixnQkFBZ0I7Ozs7eUJBQ2xCLGNBQWM7Ozs7MEJBQ2IsZUFBZSIsImZpbGUiOiJnZW5lcmF0ZWQuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlc0NvbnRlbnQiOlsiKGZ1bmN0aW9uIGUodCxuLHIpe2Z1bmN0aW9uIHMobyx1KXtpZighbltvXSl7aWYoIXRbb10pe3ZhciBhPXR5cGVvZiByZXF1aXJlPT1cImZ1bmN0aW9uXCImJnJlcXVpcmU7aWYoIXUmJmEpcmV0dXJuIGEobywhMCk7aWYoaSlyZXR1cm4gaShvLCEwKTt2YXIgZj1uZXcgRXJyb3IoXCJDYW5ub3QgZmluZCBtb2R1bGUgJ1wiK28rXCInXCIpO3Rocm93IGYuY29kZT1cIk1PRFVMRV9OT1RfRk9VTkRcIixmfXZhciBsPW5bb109e2V4cG9ydHM6e319O3Rbb11bMF0uY2FsbChsLmV4cG9ydHMsZnVuY3Rpb24oZSl7dmFyIG49dFtvXVsxXVtlXTtyZXR1cm4gcyhuP246ZSl9LGwsbC5leHBvcnRzLGUsdCxuLHIpfXJldHVybiBuW29dLmV4cG9ydHN9dmFyIGk9dHlwZW9mIHJlcXVpcmU9PVwiZnVuY3Rpb25cIiYmcmVxdWlyZTtmb3IodmFyIG89MDtvPHIubGVuZ3RoO28rKylzKHJbb10pO3JldHVybiBzfSkiLCIvKipcbiAqIENyZWF0ZXMgYW4gQUpBWCBjYWxsIGFuZCByZXR1cm5zIGEgcHJvbWlzZVxuICogT25seSBHRVQgbWV0aG9kIGFuZCBKU09OIGNhbGxzIHN1cHBvcnRlZCBmb3Igbm93XG4gKiBAYXV0aG9yIEFuZHLDqXMgWm9ycm8gPHpvcnJvZGdAZ21haWwuY29tPlxuICovXG4ndXNlIHN0cmljdCc7XG5cbmV4cG9ydCBkZWZhdWx0IGZ1bmN0aW9uKG9wdHMgPSB7fSkge1xuICByZXR1cm4gbmV3IFByb21pc2UoZnVuY3Rpb24gKHJlc29sdmUsIHJlamVjdCkge1xuICAgIGxldCByZXE7XG5cbiAgICBpZiAodHlwZW9mIG9wdHMgPT09ICdzdHJpbmcnKSB7XG4gICAgICBvcHRzID0ge1xuICAgICAgICB1cmw6IG9wdHNcbiAgICAgIH07XG4gICAgfVxuXG4gICAgLy8gTm8gQUpBWCB3aXRob3V0IFVSTFxuICAgIGlmICghb3B0cyB8fCAhb3B0cy51cmwpIHtcbiAgICAgIHRocm93IG5ldyBFcnJvcignTm8gVVJMJyk7XG4gICAgfVxuXG4gICAgLy8gRXh0ZW5kIGRlZmF1bHQgb3B0aW9uc1xuICAgIG9wdHMgPSBPYmplY3QuYXNzaWduKHtcbiAgICAgIG1ldGhvZDogJ0dFVCcsXG4gICAgICBwYXJhbXM6IHt9LFxuICAgICAgaGVhZGVyczoge1xuICAgICAgICAnQ29udGVudC1UeXBlJyA6ICdhcHBsaWNhdGlvbi9qc29uJ1xuICAgICAgfSxcbiAgICAgIHFzOiBbXVxuICAgIH0sIG9wdHMpO1xuXG4gICAgLy8gU2V0IFF1ZXJ5IFN0cmluZ1xuICAgIGZvciAobGV0IHAgb2YgT2JqZWN0LmtleXMob3B0cy5wYXJhbXMpKSB7XG4gICAgICBvcHRzLnFzLnB1c2gocCArICc9JyArIG9wdHMucGFyYW1zW3BdKTtcbiAgICB9XG5cbiAgICAvLyBTZXQgVVJMXG4gICAgb3B0cy51cmwgPSBvcHRzLnVybCArIChvcHRzLnFzLmxlbmd0aCA/ICc/JyArIG9wdHMucXMuam9pbignJicpIDogJycpO1xuICAgIGRlbGV0ZSBvcHRzLnFzO1xuXG4gICAgLy8gQ3JlYXRlIFJlcXVlc3RcbiAgICBpZiAod2luZG93LlhNTEh0dHBSZXF1ZXN0KSB7XG4gICAgICByZXEgPSBuZXcgWE1MSHR0cFJlcXVlc3QoKTtcblxuICAgICAgcmVxLm9wZW4ob3B0cy5tZXRob2QsIG9wdHMudXJsLCB0cnVlKTtcblxuICAgICAgZm9yIChsZXQgaSBvZiBPYmplY3Qua2V5cyhvcHRzLmhlYWRlcnMpKSB7XG4gICAgICAgIHJlcS5zZXRSZXF1ZXN0SGVhZGVyKGksIG9wdHMuaGVhZGVyc1tpXSk7XG4gICAgICB9XG5cbiAgICAgIC8vIEFKQVggYXN5bmMgcmVzcG9uc2VcbiAgICAgIHJlcS5vbnJlYWR5c3RhdGVjaGFuZ2UgPSByZXNwb25zZUZuO1xuXG4gICAgICAvLyBTZWQgcXVlcnlcbiAgICAgIHJlcS5zZW5kKG51bGwpO1xuICAgIH0gZWxzZSB7XG4gICAgICB0aHJvdyBuZXcgRXJyb3IoJ05vIFhNTEh0dHBSZXF1ZXN0Jyk7XG4gICAgfVxuXG4gICAgLyoqXG4gICAgICogRXhlY3V0ZXMgb24gQUpBWCByZXNwb25zZVxuICAgICAqL1xuICAgIGZ1bmN0aW9uIHJlc3BvbnNlRm4oKSB7XG4gICAgICBpZiAocmVxLnJlYWR5U3RhdGUgPT09IDQpIHtcbiAgICAgICAgdHJ5IHtcbiAgICAgICAgICAvLyBTdWNjZXNzIHJlc3BvbnNlXG4gICAgICAgICAgaWYgKHJlcS5zdGF0dXMgPj0gMjAwICYmIHJlcS5zdGF0dXMgPCA0MDApIHtcbiAgICAgICAgICAgIHJlc29sdmUoe1xuICAgICAgICAgICAgICBkYXRhOiBKU09OLnBhcnNlKHJlcS5yZXNwb25zZVRleHQpLFxuICAgICAgICAgICAgICBzdGF0dXM6IHJlcS5zdGF0dXMsXG4gICAgICAgICAgICAgIGNvbmZpZzogT2JqZWN0LmFzc2lnbih7fSwgb3B0cylcbiAgICAgICAgICAgIH0pO1xuICAgICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICByZWplY3Qoe1xuICAgICAgICAgICAgICBlcnJvcjogcmVxLnJlc3BvbnNlVGV4dCxcbiAgICAgICAgICAgICAgc3RhdHVzOiByZXEuc3RhdHVzLFxuICAgICAgICAgICAgICBjb25maWc6IE9iamVjdC5hc3NpZ24oe30sIG9wdHMpXG4gICAgICAgICAgICB9KTtcbiAgICAgICAgICB9XG4gICAgICAgIH0gY2F0Y2ggKGUpIHtcbiAgICAgICAgICAvLyBFcnJvciByZXNwb25zZVxuICAgICAgICAgIHJlamVjdCh7XG4gICAgICAgICAgICBlcnJvcjogZSxcbiAgICAgICAgICAgIHN0YXR1czogcmVxLnN0YXR1cyxcbiAgICAgICAgICAgIGNvbmZpZzogT2JqZWN0LmFzc2lnbih7fSwgb3B0cylcbiAgICAgICAgICB9KTtcbiAgICAgICAgfSAgXG4gICAgICB9XG4gICAgfVxuICB9KTtcbn1cbiIsIi8qKlxuICogQmFzaWMgQ1NTIGNsYXNzIGVkaXRvclxuICogQGF1dGhvciBBbmRyw6lzIFpvcnJvIDx6b3Jyb2RnQGdtYWlsLmNvbT5cbiAqL1xuJ3VzZSBzdHJpY3QnO1xuXG5pbXBvcnQgKiBhcyB1IGZyb20gJy4vdXRpbHMnO1xuXG5jbGFzcyBFZGl0Q1NTIHtcbiAgY29uc3RydWN0b3Ioc2VsZWN0b3IpIHtcbiAgICB0aGlzLiQgPSBzZWxlY3RvcjtcbiAgfVxuXG4gIC8qKlxuICAgKiBBZGRzIGEgbmV3IGNsYXNzIHRvIHRoZSBlbGVtZW50IGNsYXNzTmFtZSBzdHJpbmdcbiAgICogQHBhcmFtIHsuLi5zcHJlYWR9IGNsYXNzTmFtZXMgY2xhc3NlcyB0byBhZGRcbiAgICovXG4gIGFkZENsYXNzKC4uLmNsYXNzTmFtZXMpIHtcbiAgICBmb3IgKGxldCBpID0gMCwgbGVuID0gdGhpcy4kLmxlbmd0aDsgaSA8IGxlbjsgaSsrKSB7XG4gICAgICBsZXQgaXRlbSA9IHRoaXMuJFtpXSxcbiAgICAgICAgICBjbGFzc2VzID0gaXRlbS5jbGFzc05hbWUuc3BsaXQoJyAnKTtcbiAgICAgIGNsYXNzZXMgPSBjbGFzc2VzLmNvbmNhdChjbGFzc05hbWVzKTtcbiAgICAgIGl0ZW0uY2xhc3NOYW1lID0gdS51bmlxdWUoY2xhc3Nlcykuam9pbignICcpLnRyaW0oKTtcbiAgICB9XG4gIH1cblxuICAvKipcbiAgICogUmVtb3ZlcyBhIG5ldyBjbGFzcyB0byB0aGUgZWxlbWVudCBjbGFzc05hbWUgc3RyaW5nXG4gICAqIEBwYXJhbSB7Li4uc3ByZWFkfSBjbGFzc05hbWVzIGNsYXNzZXMgdG8gcmVtb3ZlXG4gICAqL1xuICByZW1vdmVDbGFzcyguLi5jbGFzc05hbWVzKSB7XG4gICAgZm9yIChsZXQgaSA9IDAsIGxlbiA9IHRoaXMuJC5sZW5ndGg7IGkgPCBsZW47IGkrKykge1xuICAgICAgbGV0IGl0ZW0gPSB0aGlzLiRbaV0sXG4gICAgICAgICAgY2xhc3NlcyA9IGl0ZW0uY2xhc3NOYW1lLnNwbGl0KCcgJyk7XG4gICAgICBjbGFzc2VzID0gY2xhc3Nlcy5maWx0ZXIoaXQgPT4gY2xhc3NOYW1lcy5pbmRleE9mKGl0KSA8IDApO1xuICAgICAgaXRlbS5jbGFzc05hbWUgPSB1LnVuaXF1ZShjbGFzc2VzKS5qb2luKCcgJykudHJpbSgpO1xuICAgIH1cbiAgfVxuXG4gIC8qKlxuICAgKiBDaGVjayB3aGV0aGVyIGdpdmVuIGVsbSBoYXMgY2xhc3NcbiAgICogQHBhcmFtICB7c3RyaW5nfSAgY2xhc3NOYW1lIE5hbWUgb2YgdGhlIGNsYXNzXG4gICAqIEByZXR1cm4ge0Jvb2xlYW59ICAgICAgICAgICB0cnVlIGlmIGZvdW5kXG4gICAqL1xuICBoYXNDbGFzcyhjbGFzc05hbWUpIHtcbiAgICBmb3IgKGxldCBpID0gMCwgbGVuID0gdGhpcy4kLmxlbmd0aDsgaSA8IGxlbjsgaSsrKSB7XG4gICAgICBsZXQgaXRlbSA9IHRoaXMuJFtpXSxcbiAgICAgICAgICBjbGFzc2VzID0gaXRlbS5jbGFzc05hbWUuc3BsaXQoJyAnKTtcbiAgICAgIGlmICh1LmNvbnRhaW5zKGNsYXNzZXMsIGNsYXNzTmFtZSkpIHtcbiAgICAgICAgcmV0dXJuIHRydWU7XG4gICAgICB9XG4gICAgfVxuXG4gICAgcmV0dXJuIGZhbHNlO1xuICB9XG59XG5cbmV4cG9ydCBkZWZhdWx0IGZ1bmN0aW9uKHNlbGVjdG9yKSB7XG4gIHNlbGVjdG9yID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvckFsbChzZWxlY3Rvcik7XG5cbiAgaWYgKCFzZWxlY3Rvcikge1xuICAgIHJldHVybjtcbiAgfVxuXG4gIHJldHVybiBuZXcgRWRpdENTUyhzZWxlY3Rvcik7XG5cbn0iLCIvKipcbiAqIEJhc2ljIEV2ZW50IExpc3RlbmVyIHN1cHBvcnRcbiAqIEBhdXRob3IgQW5kcsOpcyBab3JybyA8em9ycm9kZ0BnbWFpbC5jb20+XG4gKi9cbid1c2Ugc3RyaWN0JztcblxuaW1wb3J0ICogYXMgdSBmcm9tICcuL3V0aWxzJztcblxuY2xhc3MgRXZlbnRSZWdpc3RlciB7XG5cbiAgY29uc3RydWN0b3IgKHNlbGVjdG9yKSB7XG4gICAgdGhpcy5ldmVudHMgPSB7fTtcbiAgICB0aGlzLiQgPSBzZWxlY3RvcjtcbiAgfVxuXG4gIC8qKlxuICAgKiBBZGRzIGFuIGV2ZW50IGxpc3RlbmVyXG4gICAqIEBwYXJhbSAge3N0cmluZ30gICBldnQgICAgICBFdmVudCBuYW1lXG4gICAqIEBwYXJhbSAge0Z1bmN0aW9ufSBjYWxsYmFjayBjYWxsYmFjayB0byBleGVjdXRlXG4gICAqIEBwYXJhbSAge2Jvb2xlYW59IGNhcHR1cmUgICBldmVudCBjYXB0dXJlXG4gICAqL1xuICBvbihldnQsIGNhbGxiYWNrLCBjYXB0dXJlID0gZmFsc2UpIHtcbiAgICBpZiAoIXUuY29udGFpbnMoT2JqZWN0LmtleXModGhpcy5ldmVudHMpLCBldnQpKSB7XG4gICAgICB0aGlzLmV2ZW50c1tldnRdID0gY2FsbGJhY2s7XG4gICAgfVxuXG4gICAgZm9yIChsZXQgaSA9IDAsIGxlbiA9IHRoaXMuJC5sZW5ndGg7IGkgPCBsZW47IGkrKykge1xuICAgICAgbGV0IGl0ZW0gPSB0aGlzLiRbaV07XG4gICAgICBpdGVtLmFkZEV2ZW50TGlzdGVuZXIoZXZ0LCB0aGlzLmV2ZW50c1tldnRdLCBjYXB0dXJlKTtcbiAgICB9XG4gIH1cblxuICAvKipcbiAgICogUmVtb3ZlcyBhbiBldmVudCBsaXN0ZW5lclxuICAgKiBAcGFyYW0gIHtzdHJpbmd9ICAgZXZ0ICAgICAgRXZlbnQgbmFtZVxuICAgKi9cbiAgb2ZmKGV2dCkge1xuICAgIGlmICh1LmNvbnRhaW5zKE9iamVjdC5rZXlzKHRoaXMuZXZlbnRzKSwgZXZ0KSkge1xuICAgICAgZm9yIChsZXQgaSA9IDAsIGxlbiA9IHRoaXMuJC5sZW5ndGg7IGkgPCBsZW47IGkrKykge1xuICAgICAgICBsZXQgaXRlbSA9IHRoaXMuJFtpXTtcbiAgICAgICAgaXRlbS5yZW1vdmVFdmVudExpc3RlbmVyKGV2dCwgdGhpcy5ldmVudHNbZXZ0XSk7XG4gICAgICB9XG5cbiAgICAgIGRlbGV0ZSB0aGlzLmV2ZW50c1tldnRdO1xuICAgIH1cbiAgfVxuXG4gIC8qKlxuICAgKiBUcmlnZ2VycyBhbiBldmVudCBsaXN0ZW5lclxuICAgKiBAcGFyYW0gIHtzdHJpbmd9ICAgZXZ0ICAgICAgRXZlbnQgbmFtZVxuICAgKi9cbiAgdHJpZ2dlcihldnQpIHtcblxuICAgIGlmICh1LmNvbnRhaW5zKE9iamVjdC5rZXlzKHRoaXMuZXZlbnRzKSwgZXZ0KSkge1xuICAgICAgZm9yIChsZXQgaSA9IDAsIGxlbiA9IHRoaXMuJC5sZW5ndGg7IGkgPCBsZW47IGkrKykge1xuICAgICAgICBsZXQgaXRlbSA9IHRoaXMuJFtpXSxcbiAgICAgICAgICAgIGV2dERpc3BhdGNoZXIgPSBuZXcgRXZlbnQoZXZ0KTtcblxuICAgICAgICBpdGVtLmRpc3BhdGNoRXZlbnQoZXZ0RGlzcGF0Y2hlcik7XG4gICAgICB9XG4gICAgfVxuICB9XG59XG5cbmV4cG9ydCBkZWZhdWx0IGZ1bmN0aW9uIChzZWxlY3Rvcikge1xuICBzZWxlY3RvciA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3JBbGwoc2VsZWN0b3IpO1xuXG4gIGlmICghc2VsZWN0b3IpIHtcbiAgICByZXR1cm47XG4gIH1cblxuICByZXR1cm4gbmV3IEV2ZW50UmVnaXN0ZXIoc2VsZWN0b3IpO1xufVxuIiwiJ3VzZSBzdHJpY3QnO1xuXG4vKipcbiAqIENoZWNrIGlmIGFycmF5IGNvbnRhaW5zIGl0ZW1cbiAqIEBwYXJhbSAge0FycmF5fSAgYXJyICB0YXJnZXRcbiAqIEBwYXJhbSAge1N0cmluZ30gaXRlbVxuICogQHJldHVybiB7Qm9vbGVhbn0gICAgIHRydWUgaWYgZm91bmRcbiAqL1xuZXhwb3J0IGZ1bmN0aW9uIGNvbnRhaW5zKGFyciA9IFtdLCBpdGVtID0gJycpIHtcbiAgZm9yIChsZXQgaSBvZiBhcnIpIHtcbiAgICBpZiAoaSA9PT0gaXRlbSkge1xuICAgICAgcmV0dXJuIHRydWU7XG4gICAgfVxuICB9XG5cbiAgcmV0dXJuIGZhbHNlO1xufVxuXG4vKipcbiAqIEZpbHRlcnMgdW5pcXVlIHZhbHVlc1xuICogQHBhcmFtICB7QXJyYXl9ICBhcnIgdGFyZ2V0XG4gKiBAcmV0dXJuIHtBcnJheX0gICAgICBmaWx0ZXJlZCByZXN1bHRcbiAqL1xuZXhwb3J0IGZ1bmN0aW9uIHVuaXF1ZShhcnIgPSBbXSkge1xuICB2YXIgcmVzdWx0ID0gW107XG5cbiAgZm9yIChsZXQgaSBvZiBhcnIpIHtcbiAgICBpZiAoIWNvbnRhaW5zKHJlc3VsdCwgaSkpIHtcbiAgICAgIHJlc3VsdC5wdXNoKGkpO1xuICAgIH1cbiAgfVxuXG4gIHJldHVybiByZXN1bHQ7XG59IiwiJ3VzZSBzdHJpY3QnO1xuXG5pbXBvcnQgYXNzZXJ0IGZyb20gJ2Fzc2VydCc7XG5pbXBvcnQgYWpheCBmcm9tICcuLy4uL19zcmMvaGVscGVycy9hamF4JztcblxuZGVzY3JpYmUoJ0FqYXggSGVscGVyJywgKCkgPT4ge1xuICBsZXQgY2FsbDtcblxuICAvLyBDcmVhdGlvbiBUZXN0c1xuICBkZXNjcmliZSgnQ3JlYXRpb24nLCAoKSA9PiB7XG4gICAgaXQoJ1Nob3VsZCBiZSBhIGZ1bmN0aW9uJywgKCkgPT4gYXNzZXJ0LmVxdWFsKHR5cGVvZiBhamF4LCAnZnVuY3Rpb24nKSk7XG5cbiAgICBjYWxsID0gYWpheCgnL2FwaS9uYXYuanNvbicpO1xuICAgIGl0KCdTaG91bGQgd29yayB3aXRoIHN0cmluZycsICgpID0+IGFzc2VydChjYWxsIGluc3RhbmNlb2YgUHJvbWlzZSkpO1xuXG4gICAgY2FsbCA9IGFqYXgoe3VybDogJy9hcGkvbmF2Lmpzb24nfSk7XG4gICAgaXQoJ1Nob3VsZCB3b3JrIHdpdGggb2JqZWN0JywgKCkgPT4gYXNzZXJ0KGNhbGwgaW5zdGFuY2VvZiBQcm9taXNlKSk7XG5cbiAgICBpdCgnU2hvdWxkIHRocm93IG9uIGFub3RoZXIgdHlwZScsICgpID0+IGFzc2VydC50aHJvd3MoYWpheChbXSksICdObyBVUkwnKSk7XG4gICAgaXQoJ1Nob3VsZCB0aHJvdyBvbiBlbXB0eScsICgpID0+IGFzc2VydC50aHJvd3MoYWpheCgpLCAnTm8gVVJMJykpO1xuICB9KTtcblxuICAvLyBBc3luYyB0ZXN0XG4gIGRlc2NyaWJlKCdBc3luYycsICgpID0+IHtcbiAgICBsZXQgcmVzcG9uc2U7XG5cbiAgICBiZWZvcmUoZG9uZSA9PiB7XG4gICAgICBhamF4KCcvYXBpL25hdi5qc29uJylcbiAgICAgICAgLnRoZW4ocmVzID0+IHtcbiAgICAgICAgICByZXNwb25zZSA9IHJlcztcbiAgICAgICAgICBkb25lKCk7XG4gICAgICAgIH0pO1xuICAgIH0pO1xuXG4gICAgaXQoJ1Jlc3BvbnNlIHNob3VsZCBiZSBhbiBvYmplY3QnLCAoKSA9PiBhc3NlcnQuZXF1YWwodHlwZW9mIHJlc3BvbnNlLCAnb2JqZWN0JykpO1xuICAgIGl0KCdSZXNwb25zZSBzaG91bGQgY29udGFpbiBkYXRhJywgKCkgPT4gYXNzZXJ0KHJlc3BvbnNlLmRhdGEpKTtcbiAgICBpdCgnUmVzcG9uc2Ugc2hvdWxkIGNvbnRhaW4gc3RhdHVzJywgKCkgPT4gYXNzZXJ0KHJlc3BvbnNlLnN0YXR1cykpO1xuICAgIGl0KCdSZXNwb25zZSBzaG91bGQgY29udGFpbiBjb25maWcnLCAoKSA9PiBhc3NlcnQocmVzcG9uc2UuY29uZmlnKSk7XG4gICAgaXQoJ1VybHMgbXVzdCBtYXRjaCcsICgpID0+IGFzc2VydC5lcXVhbCgnL2FwaS9uYXYuanNvbicsIHJlc3BvbnNlLmNvbmZpZy51cmwpKTtcbiAgfSk7XG5cbiAgLy8gQXN5bmMgUGFyYW1zXG4gIGRlc2NyaWJlKCdBc3luYyBQYXJhbXMnLCAoKSA9PiB7XG4gICAgbGV0IHJlc3BvbnNlO1xuXG4gICAgYmVmb3JlKGRvbmUgPT4ge1xuICAgICAgYWpheCh7XG4gICAgICAgIHVybDonL2FwaS9uYXYuanNvbicsXG4gICAgICAgIHBhcmFtczoge1xuICAgICAgICAgIHRlc3Q6ICcxMjMnXG4gICAgICAgIH1cbiAgICAgIH0pXG4gICAgICAgIC5jYXRjaChyZXMgPT4ge1xuICAgICAgICAgIHJlc3BvbnNlID0gcmVzO1xuICAgICAgICAgIGRvbmUoKTtcbiAgICAgICAgfSk7XG4gICAgfSk7XG5cbiAgICBpdCgnUGFyYW1zIG11c3QgbWF0Y2gnLCAoKSA9PiBhc3NlcnQuZGVlcEVxdWFsKHt0ZXN0OiAnMTIzJ30sIHJlc3BvbnNlLmNvbmZpZy5wYXJhbXMpKTtcbiAgICBpdCgnVXJsIG11c3QgbWF0Y2gnLCAoKSA9PiBhc3NlcnQuZXF1YWwoJy9hcGkvbmF2Lmpzb24/dGVzdD0xMjMnLCByZXNwb25zZS5jb25maWcudXJsKSk7XG4gIH0pO1xuXG4gIC8vIEFzeW5jIGVycm9yXG4gIGRlc2NyaWJlKCdBc3luYyBFcnJvcicsICgpID0+IHtcbiAgICBsZXQgcmVzcG9uc2U7XG5cbiAgICBiZWZvcmUoZG9uZSA9PiB7XG4gICAgICBhamF4KCcvYXBpLzEyMy5qc29uJylcbiAgICAgICAgLmNhdGNoKHJlcyA9PiB7XG4gICAgICAgICAgcmVzcG9uc2UgPSByZXM7XG4gICAgICAgICAgZG9uZSgpO1xuICAgICAgICB9KTtcbiAgICB9KTtcblxuICAgIGl0KCdSZXNwb25zZSBzaG91bGQgYmUgYW4gb2JqZWN0JywgKCkgPT4gYXNzZXJ0LmVxdWFsKHR5cGVvZiByZXNwb25zZSwgJ29iamVjdCcpKTtcbiAgICBpdCgnUmVzcG9uc2Ugc2hvdWxkIGNvbnRhaW4gZXJyb3InLCAoKSA9PiBhc3NlcnQocmVzcG9uc2UuZXJyb3IpKTtcbiAgICBpdCgnUmVzcG9uc2Ugc2hvdWxkIGNvbnRhaW4gc3RhdHVzJywgKCkgPT4gYXNzZXJ0KHJlc3BvbnNlLnN0YXR1cykpO1xuICAgIGl0KCdSZXNwb25zZSBzaG91bGQgY29udGFpbiBjb25maWcnLCAoKSA9PiBhc3NlcnQocmVzcG9uc2UuY29uZmlnKSk7XG4gIH0pO1xuXG59KTtcblxuZXhwb3J0IGRlZmF1bHQge307IiwiJ3VzZSBzdHJpY3QnO1xuXG5pbXBvcnQgYXNzZXJ0IGZyb20gJ2Fzc2VydCc7XG5pbXBvcnQgZWRpdGNzcyBmcm9tICcuLy4uL19zcmMvaGVscGVycy9lZGl0Y3NzJztcblxuZGVzY3JpYmUoJ0VkaXRDU1MgSGVscGVyJywgKCkgPT4ge1xuXG4gIGRlc2NyaWJlKCdJbml0JywgKCkgPT4ge1xuICAgIGl0KCdTaG91bGQgYmUgYSBmdW5jdGlvbicsICgpID0+IGFzc2VydC5lcXVhbCh0eXBlb2YgZWRpdGNzcywgJ2Z1bmN0aW9uJykpO1xuICAgIGl0KCdTaG91bGQgYmUgYW4gb2JqZWN0JywgKCkgPT4gYXNzZXJ0KGVkaXRjc3MoJ2JvZHknKSBpbnN0YW5jZW9mIE9iamVjdCkpO1xuICAgIGl0KCdcImJvZHlcIiBTaG91bGQgaGF2ZSBsZW5ndGgnLCAoKSA9PiBhc3NlcnQoZWRpdGNzcygnYm9keScpLiQubGVuZ3RoID4gMCkpO1xuICAgIGl0KCdcIiNuby1kYXRhXCIgU2hvdWxkIGJlIGVtcHR5JywgKCkgPT4gYXNzZXJ0LmVxdWFsKGVkaXRjc3MoJyNuby1kYXRhJykuJC5sZW5ndGgsIDApKTtcbiAgICBpdCgnU2hvdWxkIGhhdmUgXCJhZGRDbGFzc1wiIG1ldGhvZCcsICgpID0+IGFzc2VydChlZGl0Y3NzKCdib2R5JykuYWRkQ2xhc3MpKTtcbiAgICBpdCgnU2hvdWxkIGhhdmUgXCJyZW1vdmVDbGFzc1wiIG1ldGhvZCcsICgpID0+IGFzc2VydChlZGl0Y3NzKCdib2R5JykucmVtb3ZlQ2xhc3MpKTtcbiAgfSk7XG5cbiAgZGVzY3JpYmUoJ0FkZCBDbGFzcyBNZXRob2QnLCAoKSA9PiB7XG4gICAgbGV0IGEsIGIsIGMsICRlbDtcblxuICAgIGJlZm9yZSgoKSA9PiB7XG4gICAgICBhID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgnc3BhbicpO1xuICAgICAgYiA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ2RpdicpO1xuICAgICAgYyA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ2EnKTtcbiAgICAgIGEuY2xhc3NOYW1lID0gJ3Rlc3QtZWxtJztcbiAgICAgIGIuY2xhc3NOYW1lID0gJ3Rlc3QtZWxtJztcbiAgICAgIGMuY2xhc3NOYW1lID0gJ3Rlc3QtZWxtJztcbiAgICAgIGRvY3VtZW50LmJvZHkuYXBwZW5kQ2hpbGQoYSk7XG4gICAgICBkb2N1bWVudC5ib2R5LmFwcGVuZENoaWxkKGIpO1xuICAgICAgZG9jdW1lbnQuYm9keS5hcHBlbmRDaGlsZChjKTtcbiAgICAgICRlbCA9IGVkaXRjc3MoJy50ZXN0LWVsbScpO1xuXG4gICAgICAkZWwuYWRkQ2xhc3MoJ3Rlc3QtY2xhc3MnLCAnb3RoZXItY2xhc3MnKTtcbiAgICB9KTtcblxuICAgIGl0KCckZWwgc2hvdWxkIGV4aXN0JywgKCkgPT4gYXNzZXJ0KCRlbC4kLmxlbmd0aCA+IDApKTtcbiAgICBpdCgnJGVsIGEgc2hvdWxkIGhhdmUgXCJ0ZXN0LWNsYXNzXCIgYW5kIFwib3RoZXItY2xhc3NcIicsICgpID0+IHtcbiAgICAgIGFzc2VydC5lcXVhbCgkZWwuJFswXS5jbGFzc05hbWUsICd0ZXN0LWVsbSB0ZXN0LWNsYXNzIG90aGVyLWNsYXNzJylcbiAgICB9KTtcblxuICAgIGl0KCckZWwgYiBzaG91bGQgaGF2ZSBcInRlc3QtY2xhc3NcIiBhbmQgXCJvdGhlci1jbGFzc1wiJywgKCkgPT4ge1xuICAgICAgYXNzZXJ0LmVxdWFsKCRlbC4kWzFdLmNsYXNzTmFtZSwgJ3Rlc3QtZWxtIHRlc3QtY2xhc3Mgb3RoZXItY2xhc3MnKVxuICAgIH0pO1xuXG4gICAgaXQoJyRlbCBjIHNob3VsZCBoYXZlIFwidGVzdC1jbGFzc1wiIGFuZCBcIm90aGVyLWNsYXNzXCInLCAoKSA9PiB7XG4gICAgICBhc3NlcnQuZXF1YWwoJGVsLiRbMl0uY2xhc3NOYW1lLCAndGVzdC1lbG0gdGVzdC1jbGFzcyBvdGhlci1jbGFzcycpXG4gICAgfSk7XG5cbiAgICBhZnRlcigoKSA9PiB7XG4gICAgICBkb2N1bWVudC5ib2R5LnJlbW92ZUNoaWxkKGEpO1xuICAgICAgZG9jdW1lbnQuYm9keS5yZW1vdmVDaGlsZChiKTtcbiAgICAgIGRvY3VtZW50LmJvZHkucmVtb3ZlQ2hpbGQoYyk7XG4gICAgfSk7XG5cbiAgfSk7XG5cbiAgZGVzY3JpYmUoJ1JlbW92ZSBDbGFzcyBNZXRob2QnLCAoKSA9PiB7XG4gICAgbGV0IGEsIGIsIGMsICRlbDtcblxuICAgIGJlZm9yZSgoKSA9PiB7XG4gICAgICBhID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgnc3BhbicpO1xuICAgICAgYiA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ2RpdicpO1xuICAgICAgYyA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ2EnKTtcbiAgICAgIGEuY2xhc3NOYW1lID0gJ3Rlc3QtZWxtIHRlc3QtY2xhc3Mgb3RoZXItY2xhc3MnO1xuICAgICAgYi5jbGFzc05hbWUgPSAndGVzdC1lbG0gdGVzdC1jbGFzcyBvdGhlci1jbGFzcyc7XG4gICAgICBjLmNsYXNzTmFtZSA9ICd0ZXN0LWVsbSB0ZXN0LWNsYXNzIG90aGVyLWNsYXNzJztcbiAgICAgIGRvY3VtZW50LmJvZHkuYXBwZW5kQ2hpbGQoYSk7XG4gICAgICBkb2N1bWVudC5ib2R5LmFwcGVuZENoaWxkKGIpO1xuICAgICAgZG9jdW1lbnQuYm9keS5hcHBlbmRDaGlsZChjKTtcbiAgICAgICRlbCA9IGVkaXRjc3MoJy50ZXN0LWVsbScpO1xuXG4gICAgICAkZWwucmVtb3ZlQ2xhc3MoJ290aGVyLWNsYXNzJyk7XG4gICAgfSlcblxuICAgIGl0KCckZWwgc2hvdWxkIGV4aXN0JywgKCkgPT4gYXNzZXJ0KCRlbC4kLmxlbmd0aCA+IDApKTtcbiAgICBpdCgnJGVsIGEgc2hvdWxkIGhhdmUgXCJ0ZXN0LWNsYXNzXCIgb25seScsICgpID0+IHtcbiAgICAgIGFzc2VydC5lcXVhbCgkZWwuJFswXS5jbGFzc05hbWUsICd0ZXN0LWVsbSB0ZXN0LWNsYXNzJylcbiAgICB9KTtcblxuICAgIGl0KCckZWwgYiBzaG91bGQgaGF2ZSBcInRlc3QtY2xhc3NcIiBvbmx5JywgKCkgPT4ge1xuICAgICAgYXNzZXJ0LmVxdWFsKCRlbC4kWzBdLmNsYXNzTmFtZSwgJ3Rlc3QtZWxtIHRlc3QtY2xhc3MnKVxuICAgIH0pO1xuICAgIGl0KCckZWwgYyBzaG91bGQgaGF2ZSBcInRlc3QtY2xhc3NcIiBvbmx5JywgKCkgPT4ge1xuICAgICAgYXNzZXJ0LmVxdWFsKCRlbC4kWzBdLmNsYXNzTmFtZSwgJ3Rlc3QtZWxtIHRlc3QtY2xhc3MnKVxuICAgIH0pO1xuXG4gICAgYWZ0ZXIoKCkgPT4ge1xuICAgICAgZG9jdW1lbnQuYm9keS5yZW1vdmVDaGlsZChhKTtcbiAgICAgIGRvY3VtZW50LmJvZHkucmVtb3ZlQ2hpbGQoYik7XG4gICAgICBkb2N1bWVudC5ib2R5LnJlbW92ZUNoaWxkKGMpO1xuICAgIH0pO1xuXG4gIH0pO1xuXG4gIGRlc2NyaWJlKCdIYXMgQ2xhc3MgTWV0aG9kJywgKCkgPT4ge1xuICAgIGxldCBhLCBiLCBjLCAkZWw7XG5cbiAgICBiZWZvcmUoKCkgPT4ge1xuICAgICAgYSA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ3NwYW4nKTtcbiAgICAgIGIgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCdkaXYnKTtcbiAgICAgIGMgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCdhJyk7XG4gICAgICBhLmNsYXNzTmFtZSA9ICd0ZXN0LWVsbSB0ZXN0LWNsYXNzIG90aGVyLWNsYXNzJztcbiAgICAgIGIuY2xhc3NOYW1lID0gJ3Rlc3QtZWxtIHRlc3QtY2xhc3Mgb3RoZXItY2xhc3MnO1xuICAgICAgYy5jbGFzc05hbWUgPSAndGVzdC1lbG0gdGVzdC1jbGFzcyBvdGhlci1jbGFzcyc7XG4gICAgICBkb2N1bWVudC5ib2R5LmFwcGVuZENoaWxkKGEpO1xuICAgICAgZG9jdW1lbnQuYm9keS5hcHBlbmRDaGlsZChiKTtcbiAgICAgIGRvY3VtZW50LmJvZHkuYXBwZW5kQ2hpbGQoYyk7XG4gICAgICAkZWwgPSBlZGl0Y3NzKCcudGVzdC1lbG0nKTtcbiAgICB9KVxuXG4gICAgaXQoJyRlbCBzaG91bGQgZXhpc3QnLCAoKSA9PiBhc3NlcnQoJGVsLiQubGVuZ3RoID4gMCkpO1xuICAgIGl0KCckZWwgc2hvdWxkIGhhdmUgXCJ0ZXN0LWNsYXNzXCInLCAoKSA9PiB7XG4gICAgICBhc3NlcnQuZXF1YWwoJGVsLmhhc0NsYXNzKCd0ZXN0LWVsbScpLCB0cnVlKVxuICAgIH0pO1xuXG4gICAgaXQoJyRlbCBzaG91bGQgbm90IGhhdmUgXCJ0ZXN0LW90aGVyLWNsYXNzXCInLCAoKSA9PiB7XG4gICAgICBhc3NlcnQuZXF1YWwoJGVsLmhhc0NsYXNzKCd0ZXN0LW90aGVyLWNsYXNzJyksIGZhbHNlKVxuICAgIH0pO1xuXG5cbiAgICBhZnRlcigoKSA9PiB7XG4gICAgICBkb2N1bWVudC5ib2R5LnJlbW92ZUNoaWxkKGEpO1xuICAgICAgZG9jdW1lbnQuYm9keS5yZW1vdmVDaGlsZChiKTtcbiAgICAgIGRvY3VtZW50LmJvZHkucmVtb3ZlQ2hpbGQoYyk7XG4gICAgfSk7XG5cbiAgfSk7XG5cbn0pO1xuXG5leHBvcnQgZGVmYXVsdCB7fTsiLCIndXNlIHN0cmljdCc7XG5cbmltcG9ydCBhc3NlcnQgZnJvbSAnYXNzZXJ0JztcbmltcG9ydCBldiBmcm9tICcuLy4uL19zcmMvaGVscGVycy9ldmVudHMnO1xuXG5kZXNjcmliZSgnRXZlbnRzIGhlbHBlcicsICgpID0+IHtcbiAgZGVzY3JpYmUoJ0luaXQnLCAoKSA9PiB7XG4gICAgaXQoJ1Nob3VsZCBiZSBhIGZ1bmN0aW9uJywgKCkgPT4gYXNzZXJ0LmVxdWFsKHR5cGVvZiBldiwgJ2Z1bmN0aW9uJykpO1xuICAgIGl0KCdTaG91bGQgYmUgYW4gb2JqZWN0JywgKCkgPT4gYXNzZXJ0KGV2KCdib2R5JykgaW5zdGFuY2VvZiBPYmplY3QpKTtcbiAgICBpdCgnXCJib2R5XCIgU2hvdWxkIGhhdmUgbGVuZ3RoJywgKCkgPT4gYXNzZXJ0KGV2KCdib2R5JykuJC5sZW5ndGggPiAwKSk7XG4gICAgaXQoJ1wiI25vLWRhdGFcIiBTaG91bGQgYmUgZW1wdHknLCAoKSA9PiBhc3NlcnQuZXF1YWwoZXYoJyNuby1kYXRhJykuJC5sZW5ndGgsIDApKTtcbiAgICBpdCgnU2hvdWxkIGhhdmUgXCJvblwiIG1ldGhvZCcsICgpID0+IGFzc2VydChldignYm9keScpLm9uKSk7XG4gICAgaXQoJ1Nob3VsZCBoYXZlIFwib2ZmXCIgbWV0aG9kJywgKCkgPT4gYXNzZXJ0KGV2KCdib2R5Jykub2ZmKSk7XG4gICAgaXQoJ1Nob3VsZCBoYXZlIFwidHJpZ2dlclwiIG1ldGhvZCcsICgpID0+IGFzc2VydChldignYm9keScpLnRyaWdnZXIpKTtcbiAgfSk7XG5cbiAgLy8gT24gRXZlbnRcbiAgZGVzY3JpYmUoJ09uIEV2ZW50JywgKCkgPT4ge1xuICAgIGxldCBhLCBiLCBjLCAkZWwsIGNsaWNrRXZlbnQsIHJlc3VsdDtcblxuICAgIGJlZm9yZShkb25lID0+IHtcbiAgICAgIHJlc3VsdCA9IGZhbHNlO1xuICAgICAgYSA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ3NwYW4nKTtcbiAgICAgIGIgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCdkaXYnKTtcbiAgICAgIGMgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCdhJyk7XG4gICAgICBhLmNsYXNzTmFtZSA9ICd0ZXN0LWVsbSc7XG4gICAgICBiLmNsYXNzTmFtZSA9ICd0ZXN0LWVsbSc7XG4gICAgICBjLmNsYXNzTmFtZSA9ICd0ZXN0LWVsbSc7XG4gICAgICBkb2N1bWVudC5ib2R5LmFwcGVuZENoaWxkKGEpO1xuICAgICAgZG9jdW1lbnQuYm9keS5hcHBlbmRDaGlsZChiKTtcbiAgICAgIGRvY3VtZW50LmJvZHkuYXBwZW5kQ2hpbGQoYyk7XG4gICAgICAkZWwgPSBldignLnRlc3QtZWxtJyk7XG5cbiAgICAgICRlbC5vbignY2xpY2snLCBlID0+IHtcbiAgICAgICAgcmVzdWx0ID0gZTtcbiAgICAgICAgZG9uZSgpO1xuICAgICAgfSk7XG5cbiAgICAgIGNsaWNrRXZlbnQgPSBuZXcgRXZlbnQoJ2NsaWNrJyk7XG5cbiAgICAgIGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoJy50ZXN0LWVsbScpLmRpc3BhdGNoRXZlbnQoY2xpY2tFdmVudCk7XG4gICAgfSk7XG5cbiAgICBpdCgnJGVsIHNob3VsZCBleGlzdCcsICgpID0+IGFzc2VydCgkZWwuJC5sZW5ndGggPiAwKSk7XG4gICAgaXQoJyRlbCBhIHNob3VsZCB0cmlnZ2VyIHRoZSBldmVudCcsICgpID0+IGFzc2VydChyZXN1bHQpKTtcbiAgICBpdCgnZXZlbnQgdGFyZ2V0IGNsYXNzTmFtZSBzaG91bGQgbWF0Y2gnLCAoKSA9PiB7XG4gICAgICBhc3NlcnQuZXF1YWwocmVzdWx0LnRhcmdldC5jbGFzc05hbWUsICd0ZXN0LWVsbScpO1xuICAgIH0pO1xuXG4gICAgYWZ0ZXIoKCkgPT4ge1xuICAgICAgZG9jdW1lbnQuYm9keS5yZW1vdmVDaGlsZChhKTtcbiAgICAgIGRvY3VtZW50LmJvZHkucmVtb3ZlQ2hpbGQoYik7XG4gICAgICBkb2N1bWVudC5ib2R5LnJlbW92ZUNoaWxkKGMpO1xuICAgIH0pO1xuICB9KTtcblxuICAvLyBPZmYgRXZlbnRcbiAgZGVzY3JpYmUoJ09mZiBFdmVudCcsICgpID0+IHtcbiAgICBsZXQgYSwgYiwgYywgJGVsLCBjbGlja0V2ZW50LCByZXN1bHQ7XG5cbiAgICBiZWZvcmUoZG9uZSA9PiB7XG4gICAgICByZXN1bHQgPSBmYWxzZTtcbiAgICAgIGEgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCdzcGFuJyk7XG4gICAgICBiID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgnZGl2Jyk7XG4gICAgICBjID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgnYScpO1xuICAgICAgYS5jbGFzc05hbWUgPSAndGVzdC1lbG0nO1xuICAgICAgYi5jbGFzc05hbWUgPSAndGVzdC1lbG0nO1xuICAgICAgYy5jbGFzc05hbWUgPSAndGVzdC1lbG0nO1xuICAgICAgZG9jdW1lbnQuYm9keS5hcHBlbmRDaGlsZChhKTtcbiAgICAgIGRvY3VtZW50LmJvZHkuYXBwZW5kQ2hpbGQoYik7XG4gICAgICBkb2N1bWVudC5ib2R5LmFwcGVuZENoaWxkKGMpO1xuICAgICAgJGVsID0gZXYoJy50ZXN0LWVsbScpO1xuXG4gICAgICAkZWwub24oJ2NsaWNrJywgZSA9PiB7XG4gICAgICAgIHJlc3VsdCA9IGU7XG4gICAgICAgIGRvbmUoKTtcbiAgICAgIH0pO1xuXG4gICAgICAkZWwub2ZmKCdjbGljaycpO1xuXG4gICAgICBjbGlja0V2ZW50ID0gbmV3IEV2ZW50KCdjbGljaycpO1xuXG4gICAgICBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKCcudGVzdC1lbG0nKS5kaXNwYXRjaEV2ZW50KGNsaWNrRXZlbnQpO1xuXG4gICAgICBzZXRUaW1lb3V0KGRvbmUsIDEwMDApO1xuICAgIH0pO1xuXG4gICAgaXQoJyRlbCBzaG91bGQgZXhpc3QnLCAoKSA9PiBhc3NlcnQoJGVsLiQubGVuZ3RoID4gMCkpO1xuICAgIGl0KCckZWwgc2hvdWxkIG5vdCB0cmlnZ2VyIHRoZSBldmVudCcsICgpID0+IGFzc2VydCghcmVzdWx0KSk7XG5cbiAgICBhZnRlcigoKSA9PiB7XG4gICAgICBkb2N1bWVudC5ib2R5LnJlbW92ZUNoaWxkKGEpO1xuICAgICAgZG9jdW1lbnQuYm9keS5yZW1vdmVDaGlsZChiKTtcbiAgICAgIGRvY3VtZW50LmJvZHkucmVtb3ZlQ2hpbGQoYyk7XG4gICAgfSk7XG4gIH0pO1xuXG4gIC8vIFRyaWdnZXIgRXZlbnRcbiAgZGVzY3JpYmUoJ1RyaWdnZXIgRXZlbnQnLCAoKSA9PiB7XG4gICAgbGV0IGEsIGIsIGMsICRlbCwgcmVzdWx0O1xuXG4gICAgYmVmb3JlKGRvbmUgPT4ge1xuICAgICAgcmVzdWx0ID0gZmFsc2U7XG4gICAgICBhID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgnc3BhbicpO1xuICAgICAgYiA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ2RpdicpO1xuICAgICAgYyA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ2EnKTtcbiAgICAgIGEuY2xhc3NOYW1lID0gJ3Rlc3QtZWxtJztcbiAgICAgIGIuY2xhc3NOYW1lID0gJ3Rlc3QtZWxtJztcbiAgICAgIGMuY2xhc3NOYW1lID0gJ3Rlc3QtZWxtJztcbiAgICAgIGRvY3VtZW50LmJvZHkuYXBwZW5kQ2hpbGQoYSk7XG4gICAgICBkb2N1bWVudC5ib2R5LmFwcGVuZENoaWxkKGIpO1xuICAgICAgZG9jdW1lbnQuYm9keS5hcHBlbmRDaGlsZChjKTtcbiAgICAgICRlbCA9IGV2KCcudGVzdC1lbG0nKTtcblxuICAgICAgJGVsLm9uKCdtb3VzZW92ZXInLCBlID0+IHtcbiAgICAgICAgcmVzdWx0ID0gZTtcbiAgICAgICAgZG9uZSgpO1xuICAgICAgfSk7XG5cbiAgICAgICRlbC50cmlnZ2VyKCdtb3VzZW92ZXInKTtcbiAgICB9KTtcblxuICAgIGl0KCckZWwgc2hvdWxkIGV4aXN0JywgKCkgPT4gYXNzZXJ0KCRlbC4kLmxlbmd0aCA+IDApKTtcbiAgICBpdCgnJGVsIHNob3VsZCB0cmlnZ2VyIHRoZSBldmVudCcsICgpID0+IGFzc2VydChyZXN1bHQpKTtcblxuICAgIGFmdGVyKCgpID0+IHtcbiAgICAgIGRvY3VtZW50LmJvZHkucmVtb3ZlQ2hpbGQoYSk7XG4gICAgICBkb2N1bWVudC5ib2R5LnJlbW92ZUNoaWxkKGIpO1xuICAgICAgZG9jdW1lbnQuYm9keS5yZW1vdmVDaGlsZChjKTtcbiAgICB9KTtcbiAgfSk7XG59KTsiLCIndXNlIHN0cmljdCc7XG5cbmltcG9ydCBhc3NlcnQgZnJvbSAnYXNzZXJ0JztcbmltcG9ydCAqIGFzIHUgZnJvbSAnLi8uLi9fc3JjL2hlbHBlcnMvdXRpbHMnO1xuXG5kZXNjcmliZSgnVXRpbHMgaGVscGVyJywgKCkgPT4ge1xuICBsZXQgYXJyID0gWzEsMiw0LDIsNSwzLDNdO1xuXG4gIGRlc2NyaWJlKCdDb250YWlucycsICgpID0+IHtcbiAgICBpdCgnU2hvdWxkIGNvbnRhaW4gMycsICgpID0+IGFzc2VydCh1LmNvbnRhaW5zKGFyciwgMykpKTtcbiAgICBpdCgnU2hvdWxkIGNvbnRhaW4gNScsICgpID0+IGFzc2VydCh1LmNvbnRhaW5zKGFyciwgNSkpKTtcbiAgICBpdCgnU2hvdWxkIG5vdCBjb250YWluIFwiM1wiJywgKCkgPT4gYXNzZXJ0LmVxdWFsKHUuY29udGFpbnMoYXJyLCAnMycpLCBmYWxzZSkpO1xuICAgIGl0KCdTaG91bGQgbm90IGNvbnRhaW4gNDAnLCAoKSA9PiBhc3NlcnQuZXF1YWwodS5jb250YWlucyhhcnIsIDQwKSwgZmFsc2UpKTtcbiAgfSk7XG5cbiAgZGVzY3JpYmUoJ1VuaXF1ZScsICgpID0+IHtcbiAgICBhcnIgPSB1LnVuaXF1ZShhcnIpO1xuXG4gICAgaXQoJ1Nob3VsZCBjb250YWluIHVuaXF1ZSB2YWx1ZXMnLCAoKSA9PiBhc3NlcnQuZGVlcEVxdWFsKGFyciwgWzEsMiw0LDUsM10pKVxuICB9KTtcblxufSk7XG4iLCIvLyBodHRwOi8vd2lraS5jb21tb25qcy5vcmcvd2lraS9Vbml0X1Rlc3RpbmcvMS4wXG4vL1xuLy8gVEhJUyBJUyBOT1QgVEVTVEVEIE5PUiBMSUtFTFkgVE8gV09SSyBPVVRTSURFIFY4IVxuLy9cbi8vIE9yaWdpbmFsbHkgZnJvbSBuYXJ3aGFsLmpzIChodHRwOi8vbmFyd2hhbGpzLm9yZylcbi8vIENvcHlyaWdodCAoYykgMjAwOSBUaG9tYXMgUm9iaW5zb24gPDI4MG5vcnRoLmNvbT5cbi8vXG4vLyBQZXJtaXNzaW9uIGlzIGhlcmVieSBncmFudGVkLCBmcmVlIG9mIGNoYXJnZSwgdG8gYW55IHBlcnNvbiBvYnRhaW5pbmcgYSBjb3B5XG4vLyBvZiB0aGlzIHNvZnR3YXJlIGFuZCBhc3NvY2lhdGVkIGRvY3VtZW50YXRpb24gZmlsZXMgKHRoZSAnU29mdHdhcmUnKSwgdG9cbi8vIGRlYWwgaW4gdGhlIFNvZnR3YXJlIHdpdGhvdXQgcmVzdHJpY3Rpb24sIGluY2x1ZGluZyB3aXRob3V0IGxpbWl0YXRpb24gdGhlXG4vLyByaWdodHMgdG8gdXNlLCBjb3B5LCBtb2RpZnksIG1lcmdlLCBwdWJsaXNoLCBkaXN0cmlidXRlLCBzdWJsaWNlbnNlLCBhbmQvb3Jcbi8vIHNlbGwgY29waWVzIG9mIHRoZSBTb2Z0d2FyZSwgYW5kIHRvIHBlcm1pdCBwZXJzb25zIHRvIHdob20gdGhlIFNvZnR3YXJlIGlzXG4vLyBmdXJuaXNoZWQgdG8gZG8gc28sIHN1YmplY3QgdG8gdGhlIGZvbGxvd2luZyBjb25kaXRpb25zOlxuLy9cbi8vIFRoZSBhYm92ZSBjb3B5cmlnaHQgbm90aWNlIGFuZCB0aGlzIHBlcm1pc3Npb24gbm90aWNlIHNoYWxsIGJlIGluY2x1ZGVkIGluXG4vLyBhbGwgY29waWVzIG9yIHN1YnN0YW50aWFsIHBvcnRpb25zIG9mIHRoZSBTb2Z0d2FyZS5cbi8vXG4vLyBUSEUgU09GVFdBUkUgSVMgUFJPVklERUQgJ0FTIElTJywgV0lUSE9VVCBXQVJSQU5UWSBPRiBBTlkgS0lORCwgRVhQUkVTUyBPUlxuLy8gSU1QTElFRCwgSU5DTFVESU5HIEJVVCBOT1QgTElNSVRFRCBUTyBUSEUgV0FSUkFOVElFUyBPRiBNRVJDSEFOVEFCSUxJVFksXG4vLyBGSVRORVNTIEZPUiBBIFBBUlRJQ1VMQVIgUFVSUE9TRSBBTkQgTk9OSU5GUklOR0VNRU5ULiBJTiBOTyBFVkVOVCBTSEFMTCBUSEVcbi8vIEFVVEhPUlMgQkUgTElBQkxFIEZPUiBBTlkgQ0xBSU0sIERBTUFHRVMgT1IgT1RIRVIgTElBQklMSVRZLCBXSEVUSEVSIElOIEFOXG4vLyBBQ1RJT04gT0YgQ09OVFJBQ1QsIFRPUlQgT1IgT1RIRVJXSVNFLCBBUklTSU5HIEZST00sIE9VVCBPRiBPUiBJTiBDT05ORUNUSU9OXG4vLyBXSVRIIFRIRSBTT0ZUV0FSRSBPUiBUSEUgVVNFIE9SIE9USEVSIERFQUxJTkdTIElOIFRIRSBTT0ZUV0FSRS5cblxuLy8gd2hlbiB1c2VkIGluIG5vZGUsIHRoaXMgd2lsbCBhY3R1YWxseSBsb2FkIHRoZSB1dGlsIG1vZHVsZSB3ZSBkZXBlbmQgb25cbi8vIHZlcnN1cyBsb2FkaW5nIHRoZSBidWlsdGluIHV0aWwgbW9kdWxlIGFzIGhhcHBlbnMgb3RoZXJ3aXNlXG4vLyB0aGlzIGlzIGEgYnVnIGluIG5vZGUgbW9kdWxlIGxvYWRpbmcgYXMgZmFyIGFzIEkgYW0gY29uY2VybmVkXG52YXIgdXRpbCA9IHJlcXVpcmUoJ3V0aWwvJyk7XG5cbnZhciBwU2xpY2UgPSBBcnJheS5wcm90b3R5cGUuc2xpY2U7XG52YXIgaGFzT3duID0gT2JqZWN0LnByb3RvdHlwZS5oYXNPd25Qcm9wZXJ0eTtcblxuLy8gMS4gVGhlIGFzc2VydCBtb2R1bGUgcHJvdmlkZXMgZnVuY3Rpb25zIHRoYXQgdGhyb3dcbi8vIEFzc2VydGlvbkVycm9yJ3Mgd2hlbiBwYXJ0aWN1bGFyIGNvbmRpdGlvbnMgYXJlIG5vdCBtZXQuIFRoZVxuLy8gYXNzZXJ0IG1vZHVsZSBtdXN0IGNvbmZvcm0gdG8gdGhlIGZvbGxvd2luZyBpbnRlcmZhY2UuXG5cbnZhciBhc3NlcnQgPSBtb2R1bGUuZXhwb3J0cyA9IG9rO1xuXG4vLyAyLiBUaGUgQXNzZXJ0aW9uRXJyb3IgaXMgZGVmaW5lZCBpbiBhc3NlcnQuXG4vLyBuZXcgYXNzZXJ0LkFzc2VydGlvbkVycm9yKHsgbWVzc2FnZTogbWVzc2FnZSxcbi8vICAgICAgICAgICAgICAgICAgICAgICAgICAgICBhY3R1YWw6IGFjdHVhbCxcbi8vICAgICAgICAgICAgICAgICAgICAgICAgICAgICBleHBlY3RlZDogZXhwZWN0ZWQgfSlcblxuYXNzZXJ0LkFzc2VydGlvbkVycm9yID0gZnVuY3Rpb24gQXNzZXJ0aW9uRXJyb3Iob3B0aW9ucykge1xuICB0aGlzLm5hbWUgPSAnQXNzZXJ0aW9uRXJyb3InO1xuICB0aGlzLmFjdHVhbCA9IG9wdGlvbnMuYWN0dWFsO1xuICB0aGlzLmV4cGVjdGVkID0gb3B0aW9ucy5leHBlY3RlZDtcbiAgdGhpcy5vcGVyYXRvciA9IG9wdGlvbnMub3BlcmF0b3I7XG4gIGlmIChvcHRpb25zLm1lc3NhZ2UpIHtcbiAgICB0aGlzLm1lc3NhZ2UgPSBvcHRpb25zLm1lc3NhZ2U7XG4gICAgdGhpcy5nZW5lcmF0ZWRNZXNzYWdlID0gZmFsc2U7XG4gIH0gZWxzZSB7XG4gICAgdGhpcy5tZXNzYWdlID0gZ2V0TWVzc2FnZSh0aGlzKTtcbiAgICB0aGlzLmdlbmVyYXRlZE1lc3NhZ2UgPSB0cnVlO1xuICB9XG4gIHZhciBzdGFja1N0YXJ0RnVuY3Rpb24gPSBvcHRpb25zLnN0YWNrU3RhcnRGdW5jdGlvbiB8fCBmYWlsO1xuXG4gIGlmIChFcnJvci5jYXB0dXJlU3RhY2tUcmFjZSkge1xuICAgIEVycm9yLmNhcHR1cmVTdGFja1RyYWNlKHRoaXMsIHN0YWNrU3RhcnRGdW5jdGlvbik7XG4gIH1cbiAgZWxzZSB7XG4gICAgLy8gbm9uIHY4IGJyb3dzZXJzIHNvIHdlIGNhbiBoYXZlIGEgc3RhY2t0cmFjZVxuICAgIHZhciBlcnIgPSBuZXcgRXJyb3IoKTtcbiAgICBpZiAoZXJyLnN0YWNrKSB7XG4gICAgICB2YXIgb3V0ID0gZXJyLnN0YWNrO1xuXG4gICAgICAvLyB0cnkgdG8gc3RyaXAgdXNlbGVzcyBmcmFtZXNcbiAgICAgIHZhciBmbl9uYW1lID0gc3RhY2tTdGFydEZ1bmN0aW9uLm5hbWU7XG4gICAgICB2YXIgaWR4ID0gb3V0LmluZGV4T2YoJ1xcbicgKyBmbl9uYW1lKTtcbiAgICAgIGlmIChpZHggPj0gMCkge1xuICAgICAgICAvLyBvbmNlIHdlIGhhdmUgbG9jYXRlZCB0aGUgZnVuY3Rpb24gZnJhbWVcbiAgICAgICAgLy8gd2UgbmVlZCB0byBzdHJpcCBvdXQgZXZlcnl0aGluZyBiZWZvcmUgaXQgKGFuZCBpdHMgbGluZSlcbiAgICAgICAgdmFyIG5leHRfbGluZSA9IG91dC5pbmRleE9mKCdcXG4nLCBpZHggKyAxKTtcbiAgICAgICAgb3V0ID0gb3V0LnN1YnN0cmluZyhuZXh0X2xpbmUgKyAxKTtcbiAgICAgIH1cblxuICAgICAgdGhpcy5zdGFjayA9IG91dDtcbiAgICB9XG4gIH1cbn07XG5cbi8vIGFzc2VydC5Bc3NlcnRpb25FcnJvciBpbnN0YW5jZW9mIEVycm9yXG51dGlsLmluaGVyaXRzKGFzc2VydC5Bc3NlcnRpb25FcnJvciwgRXJyb3IpO1xuXG5mdW5jdGlvbiByZXBsYWNlcihrZXksIHZhbHVlKSB7XG4gIGlmICh1dGlsLmlzVW5kZWZpbmVkKHZhbHVlKSkge1xuICAgIHJldHVybiAnJyArIHZhbHVlO1xuICB9XG4gIGlmICh1dGlsLmlzTnVtYmVyKHZhbHVlKSAmJiAhaXNGaW5pdGUodmFsdWUpKSB7XG4gICAgcmV0dXJuIHZhbHVlLnRvU3RyaW5nKCk7XG4gIH1cbiAgaWYgKHV0aWwuaXNGdW5jdGlvbih2YWx1ZSkgfHwgdXRpbC5pc1JlZ0V4cCh2YWx1ZSkpIHtcbiAgICByZXR1cm4gdmFsdWUudG9TdHJpbmcoKTtcbiAgfVxuICByZXR1cm4gdmFsdWU7XG59XG5cbmZ1bmN0aW9uIHRydW5jYXRlKHMsIG4pIHtcbiAgaWYgKHV0aWwuaXNTdHJpbmcocykpIHtcbiAgICByZXR1cm4gcy5sZW5ndGggPCBuID8gcyA6IHMuc2xpY2UoMCwgbik7XG4gIH0gZWxzZSB7XG4gICAgcmV0dXJuIHM7XG4gIH1cbn1cblxuZnVuY3Rpb24gZ2V0TWVzc2FnZShzZWxmKSB7XG4gIHJldHVybiB0cnVuY2F0ZShKU09OLnN0cmluZ2lmeShzZWxmLmFjdHVhbCwgcmVwbGFjZXIpLCAxMjgpICsgJyAnICtcbiAgICAgICAgIHNlbGYub3BlcmF0b3IgKyAnICcgK1xuICAgICAgICAgdHJ1bmNhdGUoSlNPTi5zdHJpbmdpZnkoc2VsZi5leHBlY3RlZCwgcmVwbGFjZXIpLCAxMjgpO1xufVxuXG4vLyBBdCBwcmVzZW50IG9ubHkgdGhlIHRocmVlIGtleXMgbWVudGlvbmVkIGFib3ZlIGFyZSB1c2VkIGFuZFxuLy8gdW5kZXJzdG9vZCBieSB0aGUgc3BlYy4gSW1wbGVtZW50YXRpb25zIG9yIHN1YiBtb2R1bGVzIGNhbiBwYXNzXG4vLyBvdGhlciBrZXlzIHRvIHRoZSBBc3NlcnRpb25FcnJvcidzIGNvbnN0cnVjdG9yIC0gdGhleSB3aWxsIGJlXG4vLyBpZ25vcmVkLlxuXG4vLyAzLiBBbGwgb2YgdGhlIGZvbGxvd2luZyBmdW5jdGlvbnMgbXVzdCB0aHJvdyBhbiBBc3NlcnRpb25FcnJvclxuLy8gd2hlbiBhIGNvcnJlc3BvbmRpbmcgY29uZGl0aW9uIGlzIG5vdCBtZXQsIHdpdGggYSBtZXNzYWdlIHRoYXRcbi8vIG1heSBiZSB1bmRlZmluZWQgaWYgbm90IHByb3ZpZGVkLiAgQWxsIGFzc2VydGlvbiBtZXRob2RzIHByb3ZpZGVcbi8vIGJvdGggdGhlIGFjdHVhbCBhbmQgZXhwZWN0ZWQgdmFsdWVzIHRvIHRoZSBhc3NlcnRpb24gZXJyb3IgZm9yXG4vLyBkaXNwbGF5IHB1cnBvc2VzLlxuXG5mdW5jdGlvbiBmYWlsKGFjdHVhbCwgZXhwZWN0ZWQsIG1lc3NhZ2UsIG9wZXJhdG9yLCBzdGFja1N0YXJ0RnVuY3Rpb24pIHtcbiAgdGhyb3cgbmV3IGFzc2VydC5Bc3NlcnRpb25FcnJvcih7XG4gICAgbWVzc2FnZTogbWVzc2FnZSxcbiAgICBhY3R1YWw6IGFjdHVhbCxcbiAgICBleHBlY3RlZDogZXhwZWN0ZWQsXG4gICAgb3BlcmF0b3I6IG9wZXJhdG9yLFxuICAgIHN0YWNrU3RhcnRGdW5jdGlvbjogc3RhY2tTdGFydEZ1bmN0aW9uXG4gIH0pO1xufVxuXG4vLyBFWFRFTlNJT04hIGFsbG93cyBmb3Igd2VsbCBiZWhhdmVkIGVycm9ycyBkZWZpbmVkIGVsc2V3aGVyZS5cbmFzc2VydC5mYWlsID0gZmFpbDtcblxuLy8gNC4gUHVyZSBhc3NlcnRpb24gdGVzdHMgd2hldGhlciBhIHZhbHVlIGlzIHRydXRoeSwgYXMgZGV0ZXJtaW5lZFxuLy8gYnkgISFndWFyZC5cbi8vIGFzc2VydC5vayhndWFyZCwgbWVzc2FnZV9vcHQpO1xuLy8gVGhpcyBzdGF0ZW1lbnQgaXMgZXF1aXZhbGVudCB0byBhc3NlcnQuZXF1YWwodHJ1ZSwgISFndWFyZCxcbi8vIG1lc3NhZ2Vfb3B0KTsuIFRvIHRlc3Qgc3RyaWN0bHkgZm9yIHRoZSB2YWx1ZSB0cnVlLCB1c2Vcbi8vIGFzc2VydC5zdHJpY3RFcXVhbCh0cnVlLCBndWFyZCwgbWVzc2FnZV9vcHQpOy5cblxuZnVuY3Rpb24gb2sodmFsdWUsIG1lc3NhZ2UpIHtcbiAgaWYgKCF2YWx1ZSkgZmFpbCh2YWx1ZSwgdHJ1ZSwgbWVzc2FnZSwgJz09JywgYXNzZXJ0Lm9rKTtcbn1cbmFzc2VydC5vayA9IG9rO1xuXG4vLyA1LiBUaGUgZXF1YWxpdHkgYXNzZXJ0aW9uIHRlc3RzIHNoYWxsb3csIGNvZXJjaXZlIGVxdWFsaXR5IHdpdGhcbi8vID09LlxuLy8gYXNzZXJ0LmVxdWFsKGFjdHVhbCwgZXhwZWN0ZWQsIG1lc3NhZ2Vfb3B0KTtcblxuYXNzZXJ0LmVxdWFsID0gZnVuY3Rpb24gZXF1YWwoYWN0dWFsLCBleHBlY3RlZCwgbWVzc2FnZSkge1xuICBpZiAoYWN0dWFsICE9IGV4cGVjdGVkKSBmYWlsKGFjdHVhbCwgZXhwZWN0ZWQsIG1lc3NhZ2UsICc9PScsIGFzc2VydC5lcXVhbCk7XG59O1xuXG4vLyA2LiBUaGUgbm9uLWVxdWFsaXR5IGFzc2VydGlvbiB0ZXN0cyBmb3Igd2hldGhlciB0d28gb2JqZWN0cyBhcmUgbm90IGVxdWFsXG4vLyB3aXRoICE9IGFzc2VydC5ub3RFcXVhbChhY3R1YWwsIGV4cGVjdGVkLCBtZXNzYWdlX29wdCk7XG5cbmFzc2VydC5ub3RFcXVhbCA9IGZ1bmN0aW9uIG5vdEVxdWFsKGFjdHVhbCwgZXhwZWN0ZWQsIG1lc3NhZ2UpIHtcbiAgaWYgKGFjdHVhbCA9PSBleHBlY3RlZCkge1xuICAgIGZhaWwoYWN0dWFsLCBleHBlY3RlZCwgbWVzc2FnZSwgJyE9JywgYXNzZXJ0Lm5vdEVxdWFsKTtcbiAgfVxufTtcblxuLy8gNy4gVGhlIGVxdWl2YWxlbmNlIGFzc2VydGlvbiB0ZXN0cyBhIGRlZXAgZXF1YWxpdHkgcmVsYXRpb24uXG4vLyBhc3NlcnQuZGVlcEVxdWFsKGFjdHVhbCwgZXhwZWN0ZWQsIG1lc3NhZ2Vfb3B0KTtcblxuYXNzZXJ0LmRlZXBFcXVhbCA9IGZ1bmN0aW9uIGRlZXBFcXVhbChhY3R1YWwsIGV4cGVjdGVkLCBtZXNzYWdlKSB7XG4gIGlmICghX2RlZXBFcXVhbChhY3R1YWwsIGV4cGVjdGVkKSkge1xuICAgIGZhaWwoYWN0dWFsLCBleHBlY3RlZCwgbWVzc2FnZSwgJ2RlZXBFcXVhbCcsIGFzc2VydC5kZWVwRXF1YWwpO1xuICB9XG59O1xuXG5mdW5jdGlvbiBfZGVlcEVxdWFsKGFjdHVhbCwgZXhwZWN0ZWQpIHtcbiAgLy8gNy4xLiBBbGwgaWRlbnRpY2FsIHZhbHVlcyBhcmUgZXF1aXZhbGVudCwgYXMgZGV0ZXJtaW5lZCBieSA9PT0uXG4gIGlmIChhY3R1YWwgPT09IGV4cGVjdGVkKSB7XG4gICAgcmV0dXJuIHRydWU7XG5cbiAgfSBlbHNlIGlmICh1dGlsLmlzQnVmZmVyKGFjdHVhbCkgJiYgdXRpbC5pc0J1ZmZlcihleHBlY3RlZCkpIHtcbiAgICBpZiAoYWN0dWFsLmxlbmd0aCAhPSBleHBlY3RlZC5sZW5ndGgpIHJldHVybiBmYWxzZTtcblxuICAgIGZvciAodmFyIGkgPSAwOyBpIDwgYWN0dWFsLmxlbmd0aDsgaSsrKSB7XG4gICAgICBpZiAoYWN0dWFsW2ldICE9PSBleHBlY3RlZFtpXSkgcmV0dXJuIGZhbHNlO1xuICAgIH1cblxuICAgIHJldHVybiB0cnVlO1xuXG4gIC8vIDcuMi4gSWYgdGhlIGV4cGVjdGVkIHZhbHVlIGlzIGEgRGF0ZSBvYmplY3QsIHRoZSBhY3R1YWwgdmFsdWUgaXNcbiAgLy8gZXF1aXZhbGVudCBpZiBpdCBpcyBhbHNvIGEgRGF0ZSBvYmplY3QgdGhhdCByZWZlcnMgdG8gdGhlIHNhbWUgdGltZS5cbiAgfSBlbHNlIGlmICh1dGlsLmlzRGF0ZShhY3R1YWwpICYmIHV0aWwuaXNEYXRlKGV4cGVjdGVkKSkge1xuICAgIHJldHVybiBhY3R1YWwuZ2V0VGltZSgpID09PSBleHBlY3RlZC5nZXRUaW1lKCk7XG5cbiAgLy8gNy4zIElmIHRoZSBleHBlY3RlZCB2YWx1ZSBpcyBhIFJlZ0V4cCBvYmplY3QsIHRoZSBhY3R1YWwgdmFsdWUgaXNcbiAgLy8gZXF1aXZhbGVudCBpZiBpdCBpcyBhbHNvIGEgUmVnRXhwIG9iamVjdCB3aXRoIHRoZSBzYW1lIHNvdXJjZSBhbmRcbiAgLy8gcHJvcGVydGllcyAoYGdsb2JhbGAsIGBtdWx0aWxpbmVgLCBgbGFzdEluZGV4YCwgYGlnbm9yZUNhc2VgKS5cbiAgfSBlbHNlIGlmICh1dGlsLmlzUmVnRXhwKGFjdHVhbCkgJiYgdXRpbC5pc1JlZ0V4cChleHBlY3RlZCkpIHtcbiAgICByZXR1cm4gYWN0dWFsLnNvdXJjZSA9PT0gZXhwZWN0ZWQuc291cmNlICYmXG4gICAgICAgICAgIGFjdHVhbC5nbG9iYWwgPT09IGV4cGVjdGVkLmdsb2JhbCAmJlxuICAgICAgICAgICBhY3R1YWwubXVsdGlsaW5lID09PSBleHBlY3RlZC5tdWx0aWxpbmUgJiZcbiAgICAgICAgICAgYWN0dWFsLmxhc3RJbmRleCA9PT0gZXhwZWN0ZWQubGFzdEluZGV4ICYmXG4gICAgICAgICAgIGFjdHVhbC5pZ25vcmVDYXNlID09PSBleHBlY3RlZC5pZ25vcmVDYXNlO1xuXG4gIC8vIDcuNC4gT3RoZXIgcGFpcnMgdGhhdCBkbyBub3QgYm90aCBwYXNzIHR5cGVvZiB2YWx1ZSA9PSAnb2JqZWN0JyxcbiAgLy8gZXF1aXZhbGVuY2UgaXMgZGV0ZXJtaW5lZCBieSA9PS5cbiAgfSBlbHNlIGlmICghdXRpbC5pc09iamVjdChhY3R1YWwpICYmICF1dGlsLmlzT2JqZWN0KGV4cGVjdGVkKSkge1xuICAgIHJldHVybiBhY3R1YWwgPT0gZXhwZWN0ZWQ7XG5cbiAgLy8gNy41IEZvciBhbGwgb3RoZXIgT2JqZWN0IHBhaXJzLCBpbmNsdWRpbmcgQXJyYXkgb2JqZWN0cywgZXF1aXZhbGVuY2UgaXNcbiAgLy8gZGV0ZXJtaW5lZCBieSBoYXZpbmcgdGhlIHNhbWUgbnVtYmVyIG9mIG93bmVkIHByb3BlcnRpZXMgKGFzIHZlcmlmaWVkXG4gIC8vIHdpdGggT2JqZWN0LnByb3RvdHlwZS5oYXNPd25Qcm9wZXJ0eS5jYWxsKSwgdGhlIHNhbWUgc2V0IG9mIGtleXNcbiAgLy8gKGFsdGhvdWdoIG5vdCBuZWNlc3NhcmlseSB0aGUgc2FtZSBvcmRlciksIGVxdWl2YWxlbnQgdmFsdWVzIGZvciBldmVyeVxuICAvLyBjb3JyZXNwb25kaW5nIGtleSwgYW5kIGFuIGlkZW50aWNhbCAncHJvdG90eXBlJyBwcm9wZXJ0eS4gTm90ZTogdGhpc1xuICAvLyBhY2NvdW50cyBmb3IgYm90aCBuYW1lZCBhbmQgaW5kZXhlZCBwcm9wZXJ0aWVzIG9uIEFycmF5cy5cbiAgfSBlbHNlIHtcbiAgICByZXR1cm4gb2JqRXF1aXYoYWN0dWFsLCBleHBlY3RlZCk7XG4gIH1cbn1cblxuZnVuY3Rpb24gaXNBcmd1bWVudHMob2JqZWN0KSB7XG4gIHJldHVybiBPYmplY3QucHJvdG90eXBlLnRvU3RyaW5nLmNhbGwob2JqZWN0KSA9PSAnW29iamVjdCBBcmd1bWVudHNdJztcbn1cblxuZnVuY3Rpb24gb2JqRXF1aXYoYSwgYikge1xuICBpZiAodXRpbC5pc051bGxPclVuZGVmaW5lZChhKSB8fCB1dGlsLmlzTnVsbE9yVW5kZWZpbmVkKGIpKVxuICAgIHJldHVybiBmYWxzZTtcbiAgLy8gYW4gaWRlbnRpY2FsICdwcm90b3R5cGUnIHByb3BlcnR5LlxuICBpZiAoYS5wcm90b3R5cGUgIT09IGIucHJvdG90eXBlKSByZXR1cm4gZmFsc2U7XG4gIC8vIGlmIG9uZSBpcyBhIHByaW1pdGl2ZSwgdGhlIG90aGVyIG11c3QgYmUgc2FtZVxuICBpZiAodXRpbC5pc1ByaW1pdGl2ZShhKSB8fCB1dGlsLmlzUHJpbWl0aXZlKGIpKSB7XG4gICAgcmV0dXJuIGEgPT09IGI7XG4gIH1cbiAgdmFyIGFJc0FyZ3MgPSBpc0FyZ3VtZW50cyhhKSxcbiAgICAgIGJJc0FyZ3MgPSBpc0FyZ3VtZW50cyhiKTtcbiAgaWYgKChhSXNBcmdzICYmICFiSXNBcmdzKSB8fCAoIWFJc0FyZ3MgJiYgYklzQXJncykpXG4gICAgcmV0dXJuIGZhbHNlO1xuICBpZiAoYUlzQXJncykge1xuICAgIGEgPSBwU2xpY2UuY2FsbChhKTtcbiAgICBiID0gcFNsaWNlLmNhbGwoYik7XG4gICAgcmV0dXJuIF9kZWVwRXF1YWwoYSwgYik7XG4gIH1cbiAgdmFyIGthID0gb2JqZWN0S2V5cyhhKSxcbiAgICAgIGtiID0gb2JqZWN0S2V5cyhiKSxcbiAgICAgIGtleSwgaTtcbiAgLy8gaGF2aW5nIHRoZSBzYW1lIG51bWJlciBvZiBvd25lZCBwcm9wZXJ0aWVzIChrZXlzIGluY29ycG9yYXRlc1xuICAvLyBoYXNPd25Qcm9wZXJ0eSlcbiAgaWYgKGthLmxlbmd0aCAhPSBrYi5sZW5ndGgpXG4gICAgcmV0dXJuIGZhbHNlO1xuICAvL3RoZSBzYW1lIHNldCBvZiBrZXlzIChhbHRob3VnaCBub3QgbmVjZXNzYXJpbHkgdGhlIHNhbWUgb3JkZXIpLFxuICBrYS5zb3J0KCk7XG4gIGtiLnNvcnQoKTtcbiAgLy9+fn5jaGVhcCBrZXkgdGVzdFxuICBmb3IgKGkgPSBrYS5sZW5ndGggLSAxOyBpID49IDA7IGktLSkge1xuICAgIGlmIChrYVtpXSAhPSBrYltpXSlcbiAgICAgIHJldHVybiBmYWxzZTtcbiAgfVxuICAvL2VxdWl2YWxlbnQgdmFsdWVzIGZvciBldmVyeSBjb3JyZXNwb25kaW5nIGtleSwgYW5kXG4gIC8vfn5+cG9zc2libHkgZXhwZW5zaXZlIGRlZXAgdGVzdFxuICBmb3IgKGkgPSBrYS5sZW5ndGggLSAxOyBpID49IDA7IGktLSkge1xuICAgIGtleSA9IGthW2ldO1xuICAgIGlmICghX2RlZXBFcXVhbChhW2tleV0sIGJba2V5XSkpIHJldHVybiBmYWxzZTtcbiAgfVxuICByZXR1cm4gdHJ1ZTtcbn1cblxuLy8gOC4gVGhlIG5vbi1lcXVpdmFsZW5jZSBhc3NlcnRpb24gdGVzdHMgZm9yIGFueSBkZWVwIGluZXF1YWxpdHkuXG4vLyBhc3NlcnQubm90RGVlcEVxdWFsKGFjdHVhbCwgZXhwZWN0ZWQsIG1lc3NhZ2Vfb3B0KTtcblxuYXNzZXJ0Lm5vdERlZXBFcXVhbCA9IGZ1bmN0aW9uIG5vdERlZXBFcXVhbChhY3R1YWwsIGV4cGVjdGVkLCBtZXNzYWdlKSB7XG4gIGlmIChfZGVlcEVxdWFsKGFjdHVhbCwgZXhwZWN0ZWQpKSB7XG4gICAgZmFpbChhY3R1YWwsIGV4cGVjdGVkLCBtZXNzYWdlLCAnbm90RGVlcEVxdWFsJywgYXNzZXJ0Lm5vdERlZXBFcXVhbCk7XG4gIH1cbn07XG5cbi8vIDkuIFRoZSBzdHJpY3QgZXF1YWxpdHkgYXNzZXJ0aW9uIHRlc3RzIHN0cmljdCBlcXVhbGl0eSwgYXMgZGV0ZXJtaW5lZCBieSA9PT0uXG4vLyBhc3NlcnQuc3RyaWN0RXF1YWwoYWN0dWFsLCBleHBlY3RlZCwgbWVzc2FnZV9vcHQpO1xuXG5hc3NlcnQuc3RyaWN0RXF1YWwgPSBmdW5jdGlvbiBzdHJpY3RFcXVhbChhY3R1YWwsIGV4cGVjdGVkLCBtZXNzYWdlKSB7XG4gIGlmIChhY3R1YWwgIT09IGV4cGVjdGVkKSB7XG4gICAgZmFpbChhY3R1YWwsIGV4cGVjdGVkLCBtZXNzYWdlLCAnPT09JywgYXNzZXJ0LnN0cmljdEVxdWFsKTtcbiAgfVxufTtcblxuLy8gMTAuIFRoZSBzdHJpY3Qgbm9uLWVxdWFsaXR5IGFzc2VydGlvbiB0ZXN0cyBmb3Igc3RyaWN0IGluZXF1YWxpdHksIGFzXG4vLyBkZXRlcm1pbmVkIGJ5ICE9PS4gIGFzc2VydC5ub3RTdHJpY3RFcXVhbChhY3R1YWwsIGV4cGVjdGVkLCBtZXNzYWdlX29wdCk7XG5cbmFzc2VydC5ub3RTdHJpY3RFcXVhbCA9IGZ1bmN0aW9uIG5vdFN0cmljdEVxdWFsKGFjdHVhbCwgZXhwZWN0ZWQsIG1lc3NhZ2UpIHtcbiAgaWYgKGFjdHVhbCA9PT0gZXhwZWN0ZWQpIHtcbiAgICBmYWlsKGFjdHVhbCwgZXhwZWN0ZWQsIG1lc3NhZ2UsICchPT0nLCBhc3NlcnQubm90U3RyaWN0RXF1YWwpO1xuICB9XG59O1xuXG5mdW5jdGlvbiBleHBlY3RlZEV4Y2VwdGlvbihhY3R1YWwsIGV4cGVjdGVkKSB7XG4gIGlmICghYWN0dWFsIHx8ICFleHBlY3RlZCkge1xuICAgIHJldHVybiBmYWxzZTtcbiAgfVxuXG4gIGlmIChPYmplY3QucHJvdG90eXBlLnRvU3RyaW5nLmNhbGwoZXhwZWN0ZWQpID09ICdbb2JqZWN0IFJlZ0V4cF0nKSB7XG4gICAgcmV0dXJuIGV4cGVjdGVkLnRlc3QoYWN0dWFsKTtcbiAgfSBlbHNlIGlmIChhY3R1YWwgaW5zdGFuY2VvZiBleHBlY3RlZCkge1xuICAgIHJldHVybiB0cnVlO1xuICB9IGVsc2UgaWYgKGV4cGVjdGVkLmNhbGwoe30sIGFjdHVhbCkgPT09IHRydWUpIHtcbiAgICByZXR1cm4gdHJ1ZTtcbiAgfVxuXG4gIHJldHVybiBmYWxzZTtcbn1cblxuZnVuY3Rpb24gX3Rocm93cyhzaG91bGRUaHJvdywgYmxvY2ssIGV4cGVjdGVkLCBtZXNzYWdlKSB7XG4gIHZhciBhY3R1YWw7XG5cbiAgaWYgKHV0aWwuaXNTdHJpbmcoZXhwZWN0ZWQpKSB7XG4gICAgbWVzc2FnZSA9IGV4cGVjdGVkO1xuICAgIGV4cGVjdGVkID0gbnVsbDtcbiAgfVxuXG4gIHRyeSB7XG4gICAgYmxvY2soKTtcbiAgfSBjYXRjaCAoZSkge1xuICAgIGFjdHVhbCA9IGU7XG4gIH1cblxuICBtZXNzYWdlID0gKGV4cGVjdGVkICYmIGV4cGVjdGVkLm5hbWUgPyAnICgnICsgZXhwZWN0ZWQubmFtZSArICcpLicgOiAnLicpICtcbiAgICAgICAgICAgIChtZXNzYWdlID8gJyAnICsgbWVzc2FnZSA6ICcuJyk7XG5cbiAgaWYgKHNob3VsZFRocm93ICYmICFhY3R1YWwpIHtcbiAgICBmYWlsKGFjdHVhbCwgZXhwZWN0ZWQsICdNaXNzaW5nIGV4cGVjdGVkIGV4Y2VwdGlvbicgKyBtZXNzYWdlKTtcbiAgfVxuXG4gIGlmICghc2hvdWxkVGhyb3cgJiYgZXhwZWN0ZWRFeGNlcHRpb24oYWN0dWFsLCBleHBlY3RlZCkpIHtcbiAgICBmYWlsKGFjdHVhbCwgZXhwZWN0ZWQsICdHb3QgdW53YW50ZWQgZXhjZXB0aW9uJyArIG1lc3NhZ2UpO1xuICB9XG5cbiAgaWYgKChzaG91bGRUaHJvdyAmJiBhY3R1YWwgJiYgZXhwZWN0ZWQgJiZcbiAgICAgICFleHBlY3RlZEV4Y2VwdGlvbihhY3R1YWwsIGV4cGVjdGVkKSkgfHwgKCFzaG91bGRUaHJvdyAmJiBhY3R1YWwpKSB7XG4gICAgdGhyb3cgYWN0dWFsO1xuICB9XG59XG5cbi8vIDExLiBFeHBlY3RlZCB0byB0aHJvdyBhbiBlcnJvcjpcbi8vIGFzc2VydC50aHJvd3MoYmxvY2ssIEVycm9yX29wdCwgbWVzc2FnZV9vcHQpO1xuXG5hc3NlcnQudGhyb3dzID0gZnVuY3Rpb24oYmxvY2ssIC8qb3B0aW9uYWwqL2Vycm9yLCAvKm9wdGlvbmFsKi9tZXNzYWdlKSB7XG4gIF90aHJvd3MuYXBwbHkodGhpcywgW3RydWVdLmNvbmNhdChwU2xpY2UuY2FsbChhcmd1bWVudHMpKSk7XG59O1xuXG4vLyBFWFRFTlNJT04hIFRoaXMgaXMgYW5ub3lpbmcgdG8gd3JpdGUgb3V0c2lkZSB0aGlzIG1vZHVsZS5cbmFzc2VydC5kb2VzTm90VGhyb3cgPSBmdW5jdGlvbihibG9jaywgLypvcHRpb25hbCovbWVzc2FnZSkge1xuICBfdGhyb3dzLmFwcGx5KHRoaXMsIFtmYWxzZV0uY29uY2F0KHBTbGljZS5jYWxsKGFyZ3VtZW50cykpKTtcbn07XG5cbmFzc2VydC5pZkVycm9yID0gZnVuY3Rpb24oZXJyKSB7IGlmIChlcnIpIHt0aHJvdyBlcnI7fX07XG5cbnZhciBvYmplY3RLZXlzID0gT2JqZWN0LmtleXMgfHwgZnVuY3Rpb24gKG9iaikge1xuICB2YXIga2V5cyA9IFtdO1xuICBmb3IgKHZhciBrZXkgaW4gb2JqKSB7XG4gICAgaWYgKGhhc093bi5jYWxsKG9iaiwga2V5KSkga2V5cy5wdXNoKGtleSk7XG4gIH1cbiAgcmV0dXJuIGtleXM7XG59O1xuIiwiaWYgKHR5cGVvZiBPYmplY3QuY3JlYXRlID09PSAnZnVuY3Rpb24nKSB7XG4gIC8vIGltcGxlbWVudGF0aW9uIGZyb20gc3RhbmRhcmQgbm9kZS5qcyAndXRpbCcgbW9kdWxlXG4gIG1vZHVsZS5leHBvcnRzID0gZnVuY3Rpb24gaW5oZXJpdHMoY3Rvciwgc3VwZXJDdG9yKSB7XG4gICAgY3Rvci5zdXBlcl8gPSBzdXBlckN0b3JcbiAgICBjdG9yLnByb3RvdHlwZSA9IE9iamVjdC5jcmVhdGUoc3VwZXJDdG9yLnByb3RvdHlwZSwge1xuICAgICAgY29uc3RydWN0b3I6IHtcbiAgICAgICAgdmFsdWU6IGN0b3IsXG4gICAgICAgIGVudW1lcmFibGU6IGZhbHNlLFxuICAgICAgICB3cml0YWJsZTogdHJ1ZSxcbiAgICAgICAgY29uZmlndXJhYmxlOiB0cnVlXG4gICAgICB9XG4gICAgfSk7XG4gIH07XG59IGVsc2Uge1xuICAvLyBvbGQgc2Nob29sIHNoaW0gZm9yIG9sZCBicm93c2Vyc1xuICBtb2R1bGUuZXhwb3J0cyA9IGZ1bmN0aW9uIGluaGVyaXRzKGN0b3IsIHN1cGVyQ3Rvcikge1xuICAgIGN0b3Iuc3VwZXJfID0gc3VwZXJDdG9yXG4gICAgdmFyIFRlbXBDdG9yID0gZnVuY3Rpb24gKCkge31cbiAgICBUZW1wQ3Rvci5wcm90b3R5cGUgPSBzdXBlckN0b3IucHJvdG90eXBlXG4gICAgY3Rvci5wcm90b3R5cGUgPSBuZXcgVGVtcEN0b3IoKVxuICAgIGN0b3IucHJvdG90eXBlLmNvbnN0cnVjdG9yID0gY3RvclxuICB9XG59XG4iLCIvLyBzaGltIGZvciB1c2luZyBwcm9jZXNzIGluIGJyb3dzZXJcblxudmFyIHByb2Nlc3MgPSBtb2R1bGUuZXhwb3J0cyA9IHt9O1xudmFyIHF1ZXVlID0gW107XG52YXIgZHJhaW5pbmcgPSBmYWxzZTtcbnZhciBjdXJyZW50UXVldWU7XG52YXIgcXVldWVJbmRleCA9IC0xO1xuXG5mdW5jdGlvbiBjbGVhblVwTmV4dFRpY2soKSB7XG4gICAgZHJhaW5pbmcgPSBmYWxzZTtcbiAgICBpZiAoY3VycmVudFF1ZXVlLmxlbmd0aCkge1xuICAgICAgICBxdWV1ZSA9IGN1cnJlbnRRdWV1ZS5jb25jYXQocXVldWUpO1xuICAgIH0gZWxzZSB7XG4gICAgICAgIHF1ZXVlSW5kZXggPSAtMTtcbiAgICB9XG4gICAgaWYgKHF1ZXVlLmxlbmd0aCkge1xuICAgICAgICBkcmFpblF1ZXVlKCk7XG4gICAgfVxufVxuXG5mdW5jdGlvbiBkcmFpblF1ZXVlKCkge1xuICAgIGlmIChkcmFpbmluZykge1xuICAgICAgICByZXR1cm47XG4gICAgfVxuICAgIHZhciB0aW1lb3V0ID0gc2V0VGltZW91dChjbGVhblVwTmV4dFRpY2spO1xuICAgIGRyYWluaW5nID0gdHJ1ZTtcblxuICAgIHZhciBsZW4gPSBxdWV1ZS5sZW5ndGg7XG4gICAgd2hpbGUobGVuKSB7XG4gICAgICAgIGN1cnJlbnRRdWV1ZSA9IHF1ZXVlO1xuICAgICAgICBxdWV1ZSA9IFtdO1xuICAgICAgICB3aGlsZSAoKytxdWV1ZUluZGV4IDwgbGVuKSB7XG4gICAgICAgICAgICBjdXJyZW50UXVldWVbcXVldWVJbmRleF0ucnVuKCk7XG4gICAgICAgIH1cbiAgICAgICAgcXVldWVJbmRleCA9IC0xO1xuICAgICAgICBsZW4gPSBxdWV1ZS5sZW5ndGg7XG4gICAgfVxuICAgIGN1cnJlbnRRdWV1ZSA9IG51bGw7XG4gICAgZHJhaW5pbmcgPSBmYWxzZTtcbiAgICBjbGVhclRpbWVvdXQodGltZW91dCk7XG59XG5cbnByb2Nlc3MubmV4dFRpY2sgPSBmdW5jdGlvbiAoZnVuKSB7XG4gICAgdmFyIGFyZ3MgPSBuZXcgQXJyYXkoYXJndW1lbnRzLmxlbmd0aCAtIDEpO1xuICAgIGlmIChhcmd1bWVudHMubGVuZ3RoID4gMSkge1xuICAgICAgICBmb3IgKHZhciBpID0gMTsgaSA8IGFyZ3VtZW50cy5sZW5ndGg7IGkrKykge1xuICAgICAgICAgICAgYXJnc1tpIC0gMV0gPSBhcmd1bWVudHNbaV07XG4gICAgICAgIH1cbiAgICB9XG4gICAgcXVldWUucHVzaChuZXcgSXRlbShmdW4sIGFyZ3MpKTtcbiAgICBpZiAocXVldWUubGVuZ3RoID09PSAxICYmICFkcmFpbmluZykge1xuICAgICAgICBzZXRUaW1lb3V0KGRyYWluUXVldWUsIDApO1xuICAgIH1cbn07XG5cbi8vIHY4IGxpa2VzIHByZWRpY3RpYmxlIG9iamVjdHNcbmZ1bmN0aW9uIEl0ZW0oZnVuLCBhcnJheSkge1xuICAgIHRoaXMuZnVuID0gZnVuO1xuICAgIHRoaXMuYXJyYXkgPSBhcnJheTtcbn1cbkl0ZW0ucHJvdG90eXBlLnJ1biA9IGZ1bmN0aW9uICgpIHtcbiAgICB0aGlzLmZ1bi5hcHBseShudWxsLCB0aGlzLmFycmF5KTtcbn07XG5wcm9jZXNzLnRpdGxlID0gJ2Jyb3dzZXInO1xucHJvY2Vzcy5icm93c2VyID0gdHJ1ZTtcbnByb2Nlc3MuZW52ID0ge307XG5wcm9jZXNzLmFyZ3YgPSBbXTtcbnByb2Nlc3MudmVyc2lvbiA9ICcnOyAvLyBlbXB0eSBzdHJpbmcgdG8gYXZvaWQgcmVnZXhwIGlzc3Vlc1xucHJvY2Vzcy52ZXJzaW9ucyA9IHt9O1xuXG5mdW5jdGlvbiBub29wKCkge31cblxucHJvY2Vzcy5vbiA9IG5vb3A7XG5wcm9jZXNzLmFkZExpc3RlbmVyID0gbm9vcDtcbnByb2Nlc3Mub25jZSA9IG5vb3A7XG5wcm9jZXNzLm9mZiA9IG5vb3A7XG5wcm9jZXNzLnJlbW92ZUxpc3RlbmVyID0gbm9vcDtcbnByb2Nlc3MucmVtb3ZlQWxsTGlzdGVuZXJzID0gbm9vcDtcbnByb2Nlc3MuZW1pdCA9IG5vb3A7XG5cbnByb2Nlc3MuYmluZGluZyA9IGZ1bmN0aW9uIChuYW1lKSB7XG4gICAgdGhyb3cgbmV3IEVycm9yKCdwcm9jZXNzLmJpbmRpbmcgaXMgbm90IHN1cHBvcnRlZCcpO1xufTtcblxuLy8gVE9ETyhzaHR5bG1hbilcbnByb2Nlc3MuY3dkID0gZnVuY3Rpb24gKCkgeyByZXR1cm4gJy8nIH07XG5wcm9jZXNzLmNoZGlyID0gZnVuY3Rpb24gKGRpcikge1xuICAgIHRocm93IG5ldyBFcnJvcigncHJvY2Vzcy5jaGRpciBpcyBub3Qgc3VwcG9ydGVkJyk7XG59O1xucHJvY2Vzcy51bWFzayA9IGZ1bmN0aW9uKCkgeyByZXR1cm4gMDsgfTtcbiIsIm1vZHVsZS5leHBvcnRzID0gZnVuY3Rpb24gaXNCdWZmZXIoYXJnKSB7XG4gIHJldHVybiBhcmcgJiYgdHlwZW9mIGFyZyA9PT0gJ29iamVjdCdcbiAgICAmJiB0eXBlb2YgYXJnLmNvcHkgPT09ICdmdW5jdGlvbidcbiAgICAmJiB0eXBlb2YgYXJnLmZpbGwgPT09ICdmdW5jdGlvbidcbiAgICAmJiB0eXBlb2YgYXJnLnJlYWRVSW50OCA9PT0gJ2Z1bmN0aW9uJztcbn0iLCIvLyBDb3B5cmlnaHQgSm95ZW50LCBJbmMuIGFuZCBvdGhlciBOb2RlIGNvbnRyaWJ1dG9ycy5cbi8vXG4vLyBQZXJtaXNzaW9uIGlzIGhlcmVieSBncmFudGVkLCBmcmVlIG9mIGNoYXJnZSwgdG8gYW55IHBlcnNvbiBvYnRhaW5pbmcgYVxuLy8gY29weSBvZiB0aGlzIHNvZnR3YXJlIGFuZCBhc3NvY2lhdGVkIGRvY3VtZW50YXRpb24gZmlsZXMgKHRoZVxuLy8gXCJTb2Z0d2FyZVwiKSwgdG8gZGVhbCBpbiB0aGUgU29mdHdhcmUgd2l0aG91dCByZXN0cmljdGlvbiwgaW5jbHVkaW5nXG4vLyB3aXRob3V0IGxpbWl0YXRpb24gdGhlIHJpZ2h0cyB0byB1c2UsIGNvcHksIG1vZGlmeSwgbWVyZ2UsIHB1Ymxpc2gsXG4vLyBkaXN0cmlidXRlLCBzdWJsaWNlbnNlLCBhbmQvb3Igc2VsbCBjb3BpZXMgb2YgdGhlIFNvZnR3YXJlLCBhbmQgdG8gcGVybWl0XG4vLyBwZXJzb25zIHRvIHdob20gdGhlIFNvZnR3YXJlIGlzIGZ1cm5pc2hlZCB0byBkbyBzbywgc3ViamVjdCB0byB0aGVcbi8vIGZvbGxvd2luZyBjb25kaXRpb25zOlxuLy9cbi8vIFRoZSBhYm92ZSBjb3B5cmlnaHQgbm90aWNlIGFuZCB0aGlzIHBlcm1pc3Npb24gbm90aWNlIHNoYWxsIGJlIGluY2x1ZGVkXG4vLyBpbiBhbGwgY29waWVzIG9yIHN1YnN0YW50aWFsIHBvcnRpb25zIG9mIHRoZSBTb2Z0d2FyZS5cbi8vXG4vLyBUSEUgU09GVFdBUkUgSVMgUFJPVklERUQgXCJBUyBJU1wiLCBXSVRIT1VUIFdBUlJBTlRZIE9GIEFOWSBLSU5ELCBFWFBSRVNTXG4vLyBPUiBJTVBMSUVELCBJTkNMVURJTkcgQlVUIE5PVCBMSU1JVEVEIFRPIFRIRSBXQVJSQU5USUVTIE9GXG4vLyBNRVJDSEFOVEFCSUxJVFksIEZJVE5FU1MgRk9SIEEgUEFSVElDVUxBUiBQVVJQT1NFIEFORCBOT05JTkZSSU5HRU1FTlQuIElOXG4vLyBOTyBFVkVOVCBTSEFMTCBUSEUgQVVUSE9SUyBPUiBDT1BZUklHSFQgSE9MREVSUyBCRSBMSUFCTEUgRk9SIEFOWSBDTEFJTSxcbi8vIERBTUFHRVMgT1IgT1RIRVIgTElBQklMSVRZLCBXSEVUSEVSIElOIEFOIEFDVElPTiBPRiBDT05UUkFDVCwgVE9SVCBPUlxuLy8gT1RIRVJXSVNFLCBBUklTSU5HIEZST00sIE9VVCBPRiBPUiBJTiBDT05ORUNUSU9OIFdJVEggVEhFIFNPRlRXQVJFIE9SIFRIRVxuLy8gVVNFIE9SIE9USEVSIERFQUxJTkdTIElOIFRIRSBTT0ZUV0FSRS5cblxudmFyIGZvcm1hdFJlZ0V4cCA9IC8lW3NkaiVdL2c7XG5leHBvcnRzLmZvcm1hdCA9IGZ1bmN0aW9uKGYpIHtcbiAgaWYgKCFpc1N0cmluZyhmKSkge1xuICAgIHZhciBvYmplY3RzID0gW107XG4gICAgZm9yICh2YXIgaSA9IDA7IGkgPCBhcmd1bWVudHMubGVuZ3RoOyBpKyspIHtcbiAgICAgIG9iamVjdHMucHVzaChpbnNwZWN0KGFyZ3VtZW50c1tpXSkpO1xuICAgIH1cbiAgICByZXR1cm4gb2JqZWN0cy5qb2luKCcgJyk7XG4gIH1cblxuICB2YXIgaSA9IDE7XG4gIHZhciBhcmdzID0gYXJndW1lbnRzO1xuICB2YXIgbGVuID0gYXJncy5sZW5ndGg7XG4gIHZhciBzdHIgPSBTdHJpbmcoZikucmVwbGFjZShmb3JtYXRSZWdFeHAsIGZ1bmN0aW9uKHgpIHtcbiAgICBpZiAoeCA9PT0gJyUlJykgcmV0dXJuICclJztcbiAgICBpZiAoaSA+PSBsZW4pIHJldHVybiB4O1xuICAgIHN3aXRjaCAoeCkge1xuICAgICAgY2FzZSAnJXMnOiByZXR1cm4gU3RyaW5nKGFyZ3NbaSsrXSk7XG4gICAgICBjYXNlICclZCc6IHJldHVybiBOdW1iZXIoYXJnc1tpKytdKTtcbiAgICAgIGNhc2UgJyVqJzpcbiAgICAgICAgdHJ5IHtcbiAgICAgICAgICByZXR1cm4gSlNPTi5zdHJpbmdpZnkoYXJnc1tpKytdKTtcbiAgICAgICAgfSBjYXRjaCAoXykge1xuICAgICAgICAgIHJldHVybiAnW0NpcmN1bGFyXSc7XG4gICAgICAgIH1cbiAgICAgIGRlZmF1bHQ6XG4gICAgICAgIHJldHVybiB4O1xuICAgIH1cbiAgfSk7XG4gIGZvciAodmFyIHggPSBhcmdzW2ldOyBpIDwgbGVuOyB4ID0gYXJnc1srK2ldKSB7XG4gICAgaWYgKGlzTnVsbCh4KSB8fCAhaXNPYmplY3QoeCkpIHtcbiAgICAgIHN0ciArPSAnICcgKyB4O1xuICAgIH0gZWxzZSB7XG4gICAgICBzdHIgKz0gJyAnICsgaW5zcGVjdCh4KTtcbiAgICB9XG4gIH1cbiAgcmV0dXJuIHN0cjtcbn07XG5cblxuLy8gTWFyayB0aGF0IGEgbWV0aG9kIHNob3VsZCBub3QgYmUgdXNlZC5cbi8vIFJldHVybnMgYSBtb2RpZmllZCBmdW5jdGlvbiB3aGljaCB3YXJucyBvbmNlIGJ5IGRlZmF1bHQuXG4vLyBJZiAtLW5vLWRlcHJlY2F0aW9uIGlzIHNldCwgdGhlbiBpdCBpcyBhIG5vLW9wLlxuZXhwb3J0cy5kZXByZWNhdGUgPSBmdW5jdGlvbihmbiwgbXNnKSB7XG4gIC8vIEFsbG93IGZvciBkZXByZWNhdGluZyB0aGluZ3MgaW4gdGhlIHByb2Nlc3Mgb2Ygc3RhcnRpbmcgdXAuXG4gIGlmIChpc1VuZGVmaW5lZChnbG9iYWwucHJvY2VzcykpIHtcbiAgICByZXR1cm4gZnVuY3Rpb24oKSB7XG4gICAgICByZXR1cm4gZXhwb3J0cy5kZXByZWNhdGUoZm4sIG1zZykuYXBwbHkodGhpcywgYXJndW1lbnRzKTtcbiAgICB9O1xuICB9XG5cbiAgaWYgKHByb2Nlc3Mubm9EZXByZWNhdGlvbiA9PT0gdHJ1ZSkge1xuICAgIHJldHVybiBmbjtcbiAgfVxuXG4gIHZhciB3YXJuZWQgPSBmYWxzZTtcbiAgZnVuY3Rpb24gZGVwcmVjYXRlZCgpIHtcbiAgICBpZiAoIXdhcm5lZCkge1xuICAgICAgaWYgKHByb2Nlc3MudGhyb3dEZXByZWNhdGlvbikge1xuICAgICAgICB0aHJvdyBuZXcgRXJyb3IobXNnKTtcbiAgICAgIH0gZWxzZSBpZiAocHJvY2Vzcy50cmFjZURlcHJlY2F0aW9uKSB7XG4gICAgICAgIGNvbnNvbGUudHJhY2UobXNnKTtcbiAgICAgIH0gZWxzZSB7XG4gICAgICAgIGNvbnNvbGUuZXJyb3IobXNnKTtcbiAgICAgIH1cbiAgICAgIHdhcm5lZCA9IHRydWU7XG4gICAgfVxuICAgIHJldHVybiBmbi5hcHBseSh0aGlzLCBhcmd1bWVudHMpO1xuICB9XG5cbiAgcmV0dXJuIGRlcHJlY2F0ZWQ7XG59O1xuXG5cbnZhciBkZWJ1Z3MgPSB7fTtcbnZhciBkZWJ1Z0Vudmlyb247XG5leHBvcnRzLmRlYnVnbG9nID0gZnVuY3Rpb24oc2V0KSB7XG4gIGlmIChpc1VuZGVmaW5lZChkZWJ1Z0Vudmlyb24pKVxuICAgIGRlYnVnRW52aXJvbiA9IHByb2Nlc3MuZW52Lk5PREVfREVCVUcgfHwgJyc7XG4gIHNldCA9IHNldC50b1VwcGVyQ2FzZSgpO1xuICBpZiAoIWRlYnVnc1tzZXRdKSB7XG4gICAgaWYgKG5ldyBSZWdFeHAoJ1xcXFxiJyArIHNldCArICdcXFxcYicsICdpJykudGVzdChkZWJ1Z0Vudmlyb24pKSB7XG4gICAgICB2YXIgcGlkID0gcHJvY2Vzcy5waWQ7XG4gICAgICBkZWJ1Z3Nbc2V0XSA9IGZ1bmN0aW9uKCkge1xuICAgICAgICB2YXIgbXNnID0gZXhwb3J0cy5mb3JtYXQuYXBwbHkoZXhwb3J0cywgYXJndW1lbnRzKTtcbiAgICAgICAgY29uc29sZS5lcnJvcignJXMgJWQ6ICVzJywgc2V0LCBwaWQsIG1zZyk7XG4gICAgICB9O1xuICAgIH0gZWxzZSB7XG4gICAgICBkZWJ1Z3Nbc2V0XSA9IGZ1bmN0aW9uKCkge307XG4gICAgfVxuICB9XG4gIHJldHVybiBkZWJ1Z3Nbc2V0XTtcbn07XG5cblxuLyoqXG4gKiBFY2hvcyB0aGUgdmFsdWUgb2YgYSB2YWx1ZS4gVHJ5cyB0byBwcmludCB0aGUgdmFsdWUgb3V0XG4gKiBpbiB0aGUgYmVzdCB3YXkgcG9zc2libGUgZ2l2ZW4gdGhlIGRpZmZlcmVudCB0eXBlcy5cbiAqXG4gKiBAcGFyYW0ge09iamVjdH0gb2JqIFRoZSBvYmplY3QgdG8gcHJpbnQgb3V0LlxuICogQHBhcmFtIHtPYmplY3R9IG9wdHMgT3B0aW9uYWwgb3B0aW9ucyBvYmplY3QgdGhhdCBhbHRlcnMgdGhlIG91dHB1dC5cbiAqL1xuLyogbGVnYWN5OiBvYmosIHNob3dIaWRkZW4sIGRlcHRoLCBjb2xvcnMqL1xuZnVuY3Rpb24gaW5zcGVjdChvYmosIG9wdHMpIHtcbiAgLy8gZGVmYXVsdCBvcHRpb25zXG4gIHZhciBjdHggPSB7XG4gICAgc2VlbjogW10sXG4gICAgc3R5bGl6ZTogc3R5bGl6ZU5vQ29sb3JcbiAgfTtcbiAgLy8gbGVnYWN5Li4uXG4gIGlmIChhcmd1bWVudHMubGVuZ3RoID49IDMpIGN0eC5kZXB0aCA9IGFyZ3VtZW50c1syXTtcbiAgaWYgKGFyZ3VtZW50cy5sZW5ndGggPj0gNCkgY3R4LmNvbG9ycyA9IGFyZ3VtZW50c1szXTtcbiAgaWYgKGlzQm9vbGVhbihvcHRzKSkge1xuICAgIC8vIGxlZ2FjeS4uLlxuICAgIGN0eC5zaG93SGlkZGVuID0gb3B0cztcbiAgfSBlbHNlIGlmIChvcHRzKSB7XG4gICAgLy8gZ290IGFuIFwib3B0aW9uc1wiIG9iamVjdFxuICAgIGV4cG9ydHMuX2V4dGVuZChjdHgsIG9wdHMpO1xuICB9XG4gIC8vIHNldCBkZWZhdWx0IG9wdGlvbnNcbiAgaWYgKGlzVW5kZWZpbmVkKGN0eC5zaG93SGlkZGVuKSkgY3R4LnNob3dIaWRkZW4gPSBmYWxzZTtcbiAgaWYgKGlzVW5kZWZpbmVkKGN0eC5kZXB0aCkpIGN0eC5kZXB0aCA9IDI7XG4gIGlmIChpc1VuZGVmaW5lZChjdHguY29sb3JzKSkgY3R4LmNvbG9ycyA9IGZhbHNlO1xuICBpZiAoaXNVbmRlZmluZWQoY3R4LmN1c3RvbUluc3BlY3QpKSBjdHguY3VzdG9tSW5zcGVjdCA9IHRydWU7XG4gIGlmIChjdHguY29sb3JzKSBjdHguc3R5bGl6ZSA9IHN0eWxpemVXaXRoQ29sb3I7XG4gIHJldHVybiBmb3JtYXRWYWx1ZShjdHgsIG9iaiwgY3R4LmRlcHRoKTtcbn1cbmV4cG9ydHMuaW5zcGVjdCA9IGluc3BlY3Q7XG5cblxuLy8gaHR0cDovL2VuLndpa2lwZWRpYS5vcmcvd2lraS9BTlNJX2VzY2FwZV9jb2RlI2dyYXBoaWNzXG5pbnNwZWN0LmNvbG9ycyA9IHtcbiAgJ2JvbGQnIDogWzEsIDIyXSxcbiAgJ2l0YWxpYycgOiBbMywgMjNdLFxuICAndW5kZXJsaW5lJyA6IFs0LCAyNF0sXG4gICdpbnZlcnNlJyA6IFs3LCAyN10sXG4gICd3aGl0ZScgOiBbMzcsIDM5XSxcbiAgJ2dyZXknIDogWzkwLCAzOV0sXG4gICdibGFjaycgOiBbMzAsIDM5XSxcbiAgJ2JsdWUnIDogWzM0LCAzOV0sXG4gICdjeWFuJyA6IFszNiwgMzldLFxuICAnZ3JlZW4nIDogWzMyLCAzOV0sXG4gICdtYWdlbnRhJyA6IFszNSwgMzldLFxuICAncmVkJyA6IFszMSwgMzldLFxuICAneWVsbG93JyA6IFszMywgMzldXG59O1xuXG4vLyBEb24ndCB1c2UgJ2JsdWUnIG5vdCB2aXNpYmxlIG9uIGNtZC5leGVcbmluc3BlY3Quc3R5bGVzID0ge1xuICAnc3BlY2lhbCc6ICdjeWFuJyxcbiAgJ251bWJlcic6ICd5ZWxsb3cnLFxuICAnYm9vbGVhbic6ICd5ZWxsb3cnLFxuICAndW5kZWZpbmVkJzogJ2dyZXknLFxuICAnbnVsbCc6ICdib2xkJyxcbiAgJ3N0cmluZyc6ICdncmVlbicsXG4gICdkYXRlJzogJ21hZ2VudGEnLFxuICAvLyBcIm5hbWVcIjogaW50ZW50aW9uYWxseSBub3Qgc3R5bGluZ1xuICAncmVnZXhwJzogJ3JlZCdcbn07XG5cblxuZnVuY3Rpb24gc3R5bGl6ZVdpdGhDb2xvcihzdHIsIHN0eWxlVHlwZSkge1xuICB2YXIgc3R5bGUgPSBpbnNwZWN0LnN0eWxlc1tzdHlsZVR5cGVdO1xuXG4gIGlmIChzdHlsZSkge1xuICAgIHJldHVybiAnXFx1MDAxYlsnICsgaW5zcGVjdC5jb2xvcnNbc3R5bGVdWzBdICsgJ20nICsgc3RyICtcbiAgICAgICAgICAgJ1xcdTAwMWJbJyArIGluc3BlY3QuY29sb3JzW3N0eWxlXVsxXSArICdtJztcbiAgfSBlbHNlIHtcbiAgICByZXR1cm4gc3RyO1xuICB9XG59XG5cblxuZnVuY3Rpb24gc3R5bGl6ZU5vQ29sb3Ioc3RyLCBzdHlsZVR5cGUpIHtcbiAgcmV0dXJuIHN0cjtcbn1cblxuXG5mdW5jdGlvbiBhcnJheVRvSGFzaChhcnJheSkge1xuICB2YXIgaGFzaCA9IHt9O1xuXG4gIGFycmF5LmZvckVhY2goZnVuY3Rpb24odmFsLCBpZHgpIHtcbiAgICBoYXNoW3ZhbF0gPSB0cnVlO1xuICB9KTtcblxuICByZXR1cm4gaGFzaDtcbn1cblxuXG5mdW5jdGlvbiBmb3JtYXRWYWx1ZShjdHgsIHZhbHVlLCByZWN1cnNlVGltZXMpIHtcbiAgLy8gUHJvdmlkZSBhIGhvb2sgZm9yIHVzZXItc3BlY2lmaWVkIGluc3BlY3QgZnVuY3Rpb25zLlxuICAvLyBDaGVjayB0aGF0IHZhbHVlIGlzIGFuIG9iamVjdCB3aXRoIGFuIGluc3BlY3QgZnVuY3Rpb24gb24gaXRcbiAgaWYgKGN0eC5jdXN0b21JbnNwZWN0ICYmXG4gICAgICB2YWx1ZSAmJlxuICAgICAgaXNGdW5jdGlvbih2YWx1ZS5pbnNwZWN0KSAmJlxuICAgICAgLy8gRmlsdGVyIG91dCB0aGUgdXRpbCBtb2R1bGUsIGl0J3MgaW5zcGVjdCBmdW5jdGlvbiBpcyBzcGVjaWFsXG4gICAgICB2YWx1ZS5pbnNwZWN0ICE9PSBleHBvcnRzLmluc3BlY3QgJiZcbiAgICAgIC8vIEFsc28gZmlsdGVyIG91dCBhbnkgcHJvdG90eXBlIG9iamVjdHMgdXNpbmcgdGhlIGNpcmN1bGFyIGNoZWNrLlxuICAgICAgISh2YWx1ZS5jb25zdHJ1Y3RvciAmJiB2YWx1ZS5jb25zdHJ1Y3Rvci5wcm90b3R5cGUgPT09IHZhbHVlKSkge1xuICAgIHZhciByZXQgPSB2YWx1ZS5pbnNwZWN0KHJlY3Vyc2VUaW1lcywgY3R4KTtcbiAgICBpZiAoIWlzU3RyaW5nKHJldCkpIHtcbiAgICAgIHJldCA9IGZvcm1hdFZhbHVlKGN0eCwgcmV0LCByZWN1cnNlVGltZXMpO1xuICAgIH1cbiAgICByZXR1cm4gcmV0O1xuICB9XG5cbiAgLy8gUHJpbWl0aXZlIHR5cGVzIGNhbm5vdCBoYXZlIHByb3BlcnRpZXNcbiAgdmFyIHByaW1pdGl2ZSA9IGZvcm1hdFByaW1pdGl2ZShjdHgsIHZhbHVlKTtcbiAgaWYgKHByaW1pdGl2ZSkge1xuICAgIHJldHVybiBwcmltaXRpdmU7XG4gIH1cblxuICAvLyBMb29rIHVwIHRoZSBrZXlzIG9mIHRoZSBvYmplY3QuXG4gIHZhciBrZXlzID0gT2JqZWN0LmtleXModmFsdWUpO1xuICB2YXIgdmlzaWJsZUtleXMgPSBhcnJheVRvSGFzaChrZXlzKTtcblxuICBpZiAoY3R4LnNob3dIaWRkZW4pIHtcbiAgICBrZXlzID0gT2JqZWN0LmdldE93blByb3BlcnR5TmFtZXModmFsdWUpO1xuICB9XG5cbiAgLy8gSUUgZG9lc24ndCBtYWtlIGVycm9yIGZpZWxkcyBub24tZW51bWVyYWJsZVxuICAvLyBodHRwOi8vbXNkbi5taWNyb3NvZnQuY29tL2VuLXVzL2xpYnJhcnkvaWUvZHd3NTJzYnQodj12cy45NCkuYXNweFxuICBpZiAoaXNFcnJvcih2YWx1ZSlcbiAgICAgICYmIChrZXlzLmluZGV4T2YoJ21lc3NhZ2UnKSA+PSAwIHx8IGtleXMuaW5kZXhPZignZGVzY3JpcHRpb24nKSA+PSAwKSkge1xuICAgIHJldHVybiBmb3JtYXRFcnJvcih2YWx1ZSk7XG4gIH1cblxuICAvLyBTb21lIHR5cGUgb2Ygb2JqZWN0IHdpdGhvdXQgcHJvcGVydGllcyBjYW4gYmUgc2hvcnRjdXR0ZWQuXG4gIGlmIChrZXlzLmxlbmd0aCA9PT0gMCkge1xuICAgIGlmIChpc0Z1bmN0aW9uKHZhbHVlKSkge1xuICAgICAgdmFyIG5hbWUgPSB2YWx1ZS5uYW1lID8gJzogJyArIHZhbHVlLm5hbWUgOiAnJztcbiAgICAgIHJldHVybiBjdHguc3R5bGl6ZSgnW0Z1bmN0aW9uJyArIG5hbWUgKyAnXScsICdzcGVjaWFsJyk7XG4gICAgfVxuICAgIGlmIChpc1JlZ0V4cCh2YWx1ZSkpIHtcbiAgICAgIHJldHVybiBjdHguc3R5bGl6ZShSZWdFeHAucHJvdG90eXBlLnRvU3RyaW5nLmNhbGwodmFsdWUpLCAncmVnZXhwJyk7XG4gICAgfVxuICAgIGlmIChpc0RhdGUodmFsdWUpKSB7XG4gICAgICByZXR1cm4gY3R4LnN0eWxpemUoRGF0ZS5wcm90b3R5cGUudG9TdHJpbmcuY2FsbCh2YWx1ZSksICdkYXRlJyk7XG4gICAgfVxuICAgIGlmIChpc0Vycm9yKHZhbHVlKSkge1xuICAgICAgcmV0dXJuIGZvcm1hdEVycm9yKHZhbHVlKTtcbiAgICB9XG4gIH1cblxuICB2YXIgYmFzZSA9ICcnLCBhcnJheSA9IGZhbHNlLCBicmFjZXMgPSBbJ3snLCAnfSddO1xuXG4gIC8vIE1ha2UgQXJyYXkgc2F5IHRoYXQgdGhleSBhcmUgQXJyYXlcbiAgaWYgKGlzQXJyYXkodmFsdWUpKSB7XG4gICAgYXJyYXkgPSB0cnVlO1xuICAgIGJyYWNlcyA9IFsnWycsICddJ107XG4gIH1cblxuICAvLyBNYWtlIGZ1bmN0aW9ucyBzYXkgdGhhdCB0aGV5IGFyZSBmdW5jdGlvbnNcbiAgaWYgKGlzRnVuY3Rpb24odmFsdWUpKSB7XG4gICAgdmFyIG4gPSB2YWx1ZS5uYW1lID8gJzogJyArIHZhbHVlLm5hbWUgOiAnJztcbiAgICBiYXNlID0gJyBbRnVuY3Rpb24nICsgbiArICddJztcbiAgfVxuXG4gIC8vIE1ha2UgUmVnRXhwcyBzYXkgdGhhdCB0aGV5IGFyZSBSZWdFeHBzXG4gIGlmIChpc1JlZ0V4cCh2YWx1ZSkpIHtcbiAgICBiYXNlID0gJyAnICsgUmVnRXhwLnByb3RvdHlwZS50b1N0cmluZy5jYWxsKHZhbHVlKTtcbiAgfVxuXG4gIC8vIE1ha2UgZGF0ZXMgd2l0aCBwcm9wZXJ0aWVzIGZpcnN0IHNheSB0aGUgZGF0ZVxuICBpZiAoaXNEYXRlKHZhbHVlKSkge1xuICAgIGJhc2UgPSAnICcgKyBEYXRlLnByb3RvdHlwZS50b1VUQ1N0cmluZy5jYWxsKHZhbHVlKTtcbiAgfVxuXG4gIC8vIE1ha2UgZXJyb3Igd2l0aCBtZXNzYWdlIGZpcnN0IHNheSB0aGUgZXJyb3JcbiAgaWYgKGlzRXJyb3IodmFsdWUpKSB7XG4gICAgYmFzZSA9ICcgJyArIGZvcm1hdEVycm9yKHZhbHVlKTtcbiAgfVxuXG4gIGlmIChrZXlzLmxlbmd0aCA9PT0gMCAmJiAoIWFycmF5IHx8IHZhbHVlLmxlbmd0aCA9PSAwKSkge1xuICAgIHJldHVybiBicmFjZXNbMF0gKyBiYXNlICsgYnJhY2VzWzFdO1xuICB9XG5cbiAgaWYgKHJlY3Vyc2VUaW1lcyA8IDApIHtcbiAgICBpZiAoaXNSZWdFeHAodmFsdWUpKSB7XG4gICAgICByZXR1cm4gY3R4LnN0eWxpemUoUmVnRXhwLnByb3RvdHlwZS50b1N0cmluZy5jYWxsKHZhbHVlKSwgJ3JlZ2V4cCcpO1xuICAgIH0gZWxzZSB7XG4gICAgICByZXR1cm4gY3R4LnN0eWxpemUoJ1tPYmplY3RdJywgJ3NwZWNpYWwnKTtcbiAgICB9XG4gIH1cblxuICBjdHguc2Vlbi5wdXNoKHZhbHVlKTtcblxuICB2YXIgb3V0cHV0O1xuICBpZiAoYXJyYXkpIHtcbiAgICBvdXRwdXQgPSBmb3JtYXRBcnJheShjdHgsIHZhbHVlLCByZWN1cnNlVGltZXMsIHZpc2libGVLZXlzLCBrZXlzKTtcbiAgfSBlbHNlIHtcbiAgICBvdXRwdXQgPSBrZXlzLm1hcChmdW5jdGlvbihrZXkpIHtcbiAgICAgIHJldHVybiBmb3JtYXRQcm9wZXJ0eShjdHgsIHZhbHVlLCByZWN1cnNlVGltZXMsIHZpc2libGVLZXlzLCBrZXksIGFycmF5KTtcbiAgICB9KTtcbiAgfVxuXG4gIGN0eC5zZWVuLnBvcCgpO1xuXG4gIHJldHVybiByZWR1Y2VUb1NpbmdsZVN0cmluZyhvdXRwdXQsIGJhc2UsIGJyYWNlcyk7XG59XG5cblxuZnVuY3Rpb24gZm9ybWF0UHJpbWl0aXZlKGN0eCwgdmFsdWUpIHtcbiAgaWYgKGlzVW5kZWZpbmVkKHZhbHVlKSlcbiAgICByZXR1cm4gY3R4LnN0eWxpemUoJ3VuZGVmaW5lZCcsICd1bmRlZmluZWQnKTtcbiAgaWYgKGlzU3RyaW5nKHZhbHVlKSkge1xuICAgIHZhciBzaW1wbGUgPSAnXFwnJyArIEpTT04uc3RyaW5naWZ5KHZhbHVlKS5yZXBsYWNlKC9eXCJ8XCIkL2csICcnKVxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgLnJlcGxhY2UoLycvZywgXCJcXFxcJ1wiKVxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgLnJlcGxhY2UoL1xcXFxcIi9nLCAnXCInKSArICdcXCcnO1xuICAgIHJldHVybiBjdHguc3R5bGl6ZShzaW1wbGUsICdzdHJpbmcnKTtcbiAgfVxuICBpZiAoaXNOdW1iZXIodmFsdWUpKVxuICAgIHJldHVybiBjdHguc3R5bGl6ZSgnJyArIHZhbHVlLCAnbnVtYmVyJyk7XG4gIGlmIChpc0Jvb2xlYW4odmFsdWUpKVxuICAgIHJldHVybiBjdHguc3R5bGl6ZSgnJyArIHZhbHVlLCAnYm9vbGVhbicpO1xuICAvLyBGb3Igc29tZSByZWFzb24gdHlwZW9mIG51bGwgaXMgXCJvYmplY3RcIiwgc28gc3BlY2lhbCBjYXNlIGhlcmUuXG4gIGlmIChpc051bGwodmFsdWUpKVxuICAgIHJldHVybiBjdHguc3R5bGl6ZSgnbnVsbCcsICdudWxsJyk7XG59XG5cblxuZnVuY3Rpb24gZm9ybWF0RXJyb3IodmFsdWUpIHtcbiAgcmV0dXJuICdbJyArIEVycm9yLnByb3RvdHlwZS50b1N0cmluZy5jYWxsKHZhbHVlKSArICddJztcbn1cblxuXG5mdW5jdGlvbiBmb3JtYXRBcnJheShjdHgsIHZhbHVlLCByZWN1cnNlVGltZXMsIHZpc2libGVLZXlzLCBrZXlzKSB7XG4gIHZhciBvdXRwdXQgPSBbXTtcbiAgZm9yICh2YXIgaSA9IDAsIGwgPSB2YWx1ZS5sZW5ndGg7IGkgPCBsOyArK2kpIHtcbiAgICBpZiAoaGFzT3duUHJvcGVydHkodmFsdWUsIFN0cmluZyhpKSkpIHtcbiAgICAgIG91dHB1dC5wdXNoKGZvcm1hdFByb3BlcnR5KGN0eCwgdmFsdWUsIHJlY3Vyc2VUaW1lcywgdmlzaWJsZUtleXMsXG4gICAgICAgICAgU3RyaW5nKGkpLCB0cnVlKSk7XG4gICAgfSBlbHNlIHtcbiAgICAgIG91dHB1dC5wdXNoKCcnKTtcbiAgICB9XG4gIH1cbiAga2V5cy5mb3JFYWNoKGZ1bmN0aW9uKGtleSkge1xuICAgIGlmICgha2V5Lm1hdGNoKC9eXFxkKyQvKSkge1xuICAgICAgb3V0cHV0LnB1c2goZm9ybWF0UHJvcGVydHkoY3R4LCB2YWx1ZSwgcmVjdXJzZVRpbWVzLCB2aXNpYmxlS2V5cyxcbiAgICAgICAgICBrZXksIHRydWUpKTtcbiAgICB9XG4gIH0pO1xuICByZXR1cm4gb3V0cHV0O1xufVxuXG5cbmZ1bmN0aW9uIGZvcm1hdFByb3BlcnR5KGN0eCwgdmFsdWUsIHJlY3Vyc2VUaW1lcywgdmlzaWJsZUtleXMsIGtleSwgYXJyYXkpIHtcbiAgdmFyIG5hbWUsIHN0ciwgZGVzYztcbiAgZGVzYyA9IE9iamVjdC5nZXRPd25Qcm9wZXJ0eURlc2NyaXB0b3IodmFsdWUsIGtleSkgfHwgeyB2YWx1ZTogdmFsdWVba2V5XSB9O1xuICBpZiAoZGVzYy5nZXQpIHtcbiAgICBpZiAoZGVzYy5zZXQpIHtcbiAgICAgIHN0ciA9IGN0eC5zdHlsaXplKCdbR2V0dGVyL1NldHRlcl0nLCAnc3BlY2lhbCcpO1xuICAgIH0gZWxzZSB7XG4gICAgICBzdHIgPSBjdHguc3R5bGl6ZSgnW0dldHRlcl0nLCAnc3BlY2lhbCcpO1xuICAgIH1cbiAgfSBlbHNlIHtcbiAgICBpZiAoZGVzYy5zZXQpIHtcbiAgICAgIHN0ciA9IGN0eC5zdHlsaXplKCdbU2V0dGVyXScsICdzcGVjaWFsJyk7XG4gICAgfVxuICB9XG4gIGlmICghaGFzT3duUHJvcGVydHkodmlzaWJsZUtleXMsIGtleSkpIHtcbiAgICBuYW1lID0gJ1snICsga2V5ICsgJ10nO1xuICB9XG4gIGlmICghc3RyKSB7XG4gICAgaWYgKGN0eC5zZWVuLmluZGV4T2YoZGVzYy52YWx1ZSkgPCAwKSB7XG4gICAgICBpZiAoaXNOdWxsKHJlY3Vyc2VUaW1lcykpIHtcbiAgICAgICAgc3RyID0gZm9ybWF0VmFsdWUoY3R4LCBkZXNjLnZhbHVlLCBudWxsKTtcbiAgICAgIH0gZWxzZSB7XG4gICAgICAgIHN0ciA9IGZvcm1hdFZhbHVlKGN0eCwgZGVzYy52YWx1ZSwgcmVjdXJzZVRpbWVzIC0gMSk7XG4gICAgICB9XG4gICAgICBpZiAoc3RyLmluZGV4T2YoJ1xcbicpID4gLTEpIHtcbiAgICAgICAgaWYgKGFycmF5KSB7XG4gICAgICAgICAgc3RyID0gc3RyLnNwbGl0KCdcXG4nKS5tYXAoZnVuY3Rpb24obGluZSkge1xuICAgICAgICAgICAgcmV0dXJuICcgICcgKyBsaW5lO1xuICAgICAgICAgIH0pLmpvaW4oJ1xcbicpLnN1YnN0cigyKTtcbiAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICBzdHIgPSAnXFxuJyArIHN0ci5zcGxpdCgnXFxuJykubWFwKGZ1bmN0aW9uKGxpbmUpIHtcbiAgICAgICAgICAgIHJldHVybiAnICAgJyArIGxpbmU7XG4gICAgICAgICAgfSkuam9pbignXFxuJyk7XG4gICAgICAgIH1cbiAgICAgIH1cbiAgICB9IGVsc2Uge1xuICAgICAgc3RyID0gY3R4LnN0eWxpemUoJ1tDaXJjdWxhcl0nLCAnc3BlY2lhbCcpO1xuICAgIH1cbiAgfVxuICBpZiAoaXNVbmRlZmluZWQobmFtZSkpIHtcbiAgICBpZiAoYXJyYXkgJiYga2V5Lm1hdGNoKC9eXFxkKyQvKSkge1xuICAgICAgcmV0dXJuIHN0cjtcbiAgICB9XG4gICAgbmFtZSA9IEpTT04uc3RyaW5naWZ5KCcnICsga2V5KTtcbiAgICBpZiAobmFtZS5tYXRjaCgvXlwiKFthLXpBLVpfXVthLXpBLVpfMC05XSopXCIkLykpIHtcbiAgICAgIG5hbWUgPSBuYW1lLnN1YnN0cigxLCBuYW1lLmxlbmd0aCAtIDIpO1xuICAgICAgbmFtZSA9IGN0eC5zdHlsaXplKG5hbWUsICduYW1lJyk7XG4gICAgfSBlbHNlIHtcbiAgICAgIG5hbWUgPSBuYW1lLnJlcGxhY2UoLycvZywgXCJcXFxcJ1wiKVxuICAgICAgICAgICAgICAgICAucmVwbGFjZSgvXFxcXFwiL2csICdcIicpXG4gICAgICAgICAgICAgICAgIC5yZXBsYWNlKC8oXlwifFwiJCkvZywgXCInXCIpO1xuICAgICAgbmFtZSA9IGN0eC5zdHlsaXplKG5hbWUsICdzdHJpbmcnKTtcbiAgICB9XG4gIH1cblxuICByZXR1cm4gbmFtZSArICc6ICcgKyBzdHI7XG59XG5cblxuZnVuY3Rpb24gcmVkdWNlVG9TaW5nbGVTdHJpbmcob3V0cHV0LCBiYXNlLCBicmFjZXMpIHtcbiAgdmFyIG51bUxpbmVzRXN0ID0gMDtcbiAgdmFyIGxlbmd0aCA9IG91dHB1dC5yZWR1Y2UoZnVuY3Rpb24ocHJldiwgY3VyKSB7XG4gICAgbnVtTGluZXNFc3QrKztcbiAgICBpZiAoY3VyLmluZGV4T2YoJ1xcbicpID49IDApIG51bUxpbmVzRXN0Kys7XG4gICAgcmV0dXJuIHByZXYgKyBjdXIucmVwbGFjZSgvXFx1MDAxYlxcW1xcZFxcZD9tL2csICcnKS5sZW5ndGggKyAxO1xuICB9LCAwKTtcblxuICBpZiAobGVuZ3RoID4gNjApIHtcbiAgICByZXR1cm4gYnJhY2VzWzBdICtcbiAgICAgICAgICAgKGJhc2UgPT09ICcnID8gJycgOiBiYXNlICsgJ1xcbiAnKSArXG4gICAgICAgICAgICcgJyArXG4gICAgICAgICAgIG91dHB1dC5qb2luKCcsXFxuICAnKSArXG4gICAgICAgICAgICcgJyArXG4gICAgICAgICAgIGJyYWNlc1sxXTtcbiAgfVxuXG4gIHJldHVybiBicmFjZXNbMF0gKyBiYXNlICsgJyAnICsgb3V0cHV0LmpvaW4oJywgJykgKyAnICcgKyBicmFjZXNbMV07XG59XG5cblxuLy8gTk9URTogVGhlc2UgdHlwZSBjaGVja2luZyBmdW5jdGlvbnMgaW50ZW50aW9uYWxseSBkb24ndCB1c2UgYGluc3RhbmNlb2ZgXG4vLyBiZWNhdXNlIGl0IGlzIGZyYWdpbGUgYW5kIGNhbiBiZSBlYXNpbHkgZmFrZWQgd2l0aCBgT2JqZWN0LmNyZWF0ZSgpYC5cbmZ1bmN0aW9uIGlzQXJyYXkoYXIpIHtcbiAgcmV0dXJuIEFycmF5LmlzQXJyYXkoYXIpO1xufVxuZXhwb3J0cy5pc0FycmF5ID0gaXNBcnJheTtcblxuZnVuY3Rpb24gaXNCb29sZWFuKGFyZykge1xuICByZXR1cm4gdHlwZW9mIGFyZyA9PT0gJ2Jvb2xlYW4nO1xufVxuZXhwb3J0cy5pc0Jvb2xlYW4gPSBpc0Jvb2xlYW47XG5cbmZ1bmN0aW9uIGlzTnVsbChhcmcpIHtcbiAgcmV0dXJuIGFyZyA9PT0gbnVsbDtcbn1cbmV4cG9ydHMuaXNOdWxsID0gaXNOdWxsO1xuXG5mdW5jdGlvbiBpc051bGxPclVuZGVmaW5lZChhcmcpIHtcbiAgcmV0dXJuIGFyZyA9PSBudWxsO1xufVxuZXhwb3J0cy5pc051bGxPclVuZGVmaW5lZCA9IGlzTnVsbE9yVW5kZWZpbmVkO1xuXG5mdW5jdGlvbiBpc051bWJlcihhcmcpIHtcbiAgcmV0dXJuIHR5cGVvZiBhcmcgPT09ICdudW1iZXInO1xufVxuZXhwb3J0cy5pc051bWJlciA9IGlzTnVtYmVyO1xuXG5mdW5jdGlvbiBpc1N0cmluZyhhcmcpIHtcbiAgcmV0dXJuIHR5cGVvZiBhcmcgPT09ICdzdHJpbmcnO1xufVxuZXhwb3J0cy5pc1N0cmluZyA9IGlzU3RyaW5nO1xuXG5mdW5jdGlvbiBpc1N5bWJvbChhcmcpIHtcbiAgcmV0dXJuIHR5cGVvZiBhcmcgPT09ICdzeW1ib2wnO1xufVxuZXhwb3J0cy5pc1N5bWJvbCA9IGlzU3ltYm9sO1xuXG5mdW5jdGlvbiBpc1VuZGVmaW5lZChhcmcpIHtcbiAgcmV0dXJuIGFyZyA9PT0gdm9pZCAwO1xufVxuZXhwb3J0cy5pc1VuZGVmaW5lZCA9IGlzVW5kZWZpbmVkO1xuXG5mdW5jdGlvbiBpc1JlZ0V4cChyZSkge1xuICByZXR1cm4gaXNPYmplY3QocmUpICYmIG9iamVjdFRvU3RyaW5nKHJlKSA9PT0gJ1tvYmplY3QgUmVnRXhwXSc7XG59XG5leHBvcnRzLmlzUmVnRXhwID0gaXNSZWdFeHA7XG5cbmZ1bmN0aW9uIGlzT2JqZWN0KGFyZykge1xuICByZXR1cm4gdHlwZW9mIGFyZyA9PT0gJ29iamVjdCcgJiYgYXJnICE9PSBudWxsO1xufVxuZXhwb3J0cy5pc09iamVjdCA9IGlzT2JqZWN0O1xuXG5mdW5jdGlvbiBpc0RhdGUoZCkge1xuICByZXR1cm4gaXNPYmplY3QoZCkgJiYgb2JqZWN0VG9TdHJpbmcoZCkgPT09ICdbb2JqZWN0IERhdGVdJztcbn1cbmV4cG9ydHMuaXNEYXRlID0gaXNEYXRlO1xuXG5mdW5jdGlvbiBpc0Vycm9yKGUpIHtcbiAgcmV0dXJuIGlzT2JqZWN0KGUpICYmXG4gICAgICAob2JqZWN0VG9TdHJpbmcoZSkgPT09ICdbb2JqZWN0IEVycm9yXScgfHwgZSBpbnN0YW5jZW9mIEVycm9yKTtcbn1cbmV4cG9ydHMuaXNFcnJvciA9IGlzRXJyb3I7XG5cbmZ1bmN0aW9uIGlzRnVuY3Rpb24oYXJnKSB7XG4gIHJldHVybiB0eXBlb2YgYXJnID09PSAnZnVuY3Rpb24nO1xufVxuZXhwb3J0cy5pc0Z1bmN0aW9uID0gaXNGdW5jdGlvbjtcblxuZnVuY3Rpb24gaXNQcmltaXRpdmUoYXJnKSB7XG4gIHJldHVybiBhcmcgPT09IG51bGwgfHxcbiAgICAgICAgIHR5cGVvZiBhcmcgPT09ICdib29sZWFuJyB8fFxuICAgICAgICAgdHlwZW9mIGFyZyA9PT0gJ251bWJlcicgfHxcbiAgICAgICAgIHR5cGVvZiBhcmcgPT09ICdzdHJpbmcnIHx8XG4gICAgICAgICB0eXBlb2YgYXJnID09PSAnc3ltYm9sJyB8fCAgLy8gRVM2IHN5bWJvbFxuICAgICAgICAgdHlwZW9mIGFyZyA9PT0gJ3VuZGVmaW5lZCc7XG59XG5leHBvcnRzLmlzUHJpbWl0aXZlID0gaXNQcmltaXRpdmU7XG5cbmV4cG9ydHMuaXNCdWZmZXIgPSByZXF1aXJlKCcuL3N1cHBvcnQvaXNCdWZmZXInKTtcblxuZnVuY3Rpb24gb2JqZWN0VG9TdHJpbmcobykge1xuICByZXR1cm4gT2JqZWN0LnByb3RvdHlwZS50b1N0cmluZy5jYWxsKG8pO1xufVxuXG5cbmZ1bmN0aW9uIHBhZChuKSB7XG4gIHJldHVybiBuIDwgMTAgPyAnMCcgKyBuLnRvU3RyaW5nKDEwKSA6IG4udG9TdHJpbmcoMTApO1xufVxuXG5cbnZhciBtb250aHMgPSBbJ0phbicsICdGZWInLCAnTWFyJywgJ0FwcicsICdNYXknLCAnSnVuJywgJ0p1bCcsICdBdWcnLCAnU2VwJyxcbiAgICAgICAgICAgICAgJ09jdCcsICdOb3YnLCAnRGVjJ107XG5cbi8vIDI2IEZlYiAxNjoxOTozNFxuZnVuY3Rpb24gdGltZXN0YW1wKCkge1xuICB2YXIgZCA9IG5ldyBEYXRlKCk7XG4gIHZhciB0aW1lID0gW3BhZChkLmdldEhvdXJzKCkpLFxuICAgICAgICAgICAgICBwYWQoZC5nZXRNaW51dGVzKCkpLFxuICAgICAgICAgICAgICBwYWQoZC5nZXRTZWNvbmRzKCkpXS5qb2luKCc6Jyk7XG4gIHJldHVybiBbZC5nZXREYXRlKCksIG1vbnRoc1tkLmdldE1vbnRoKCldLCB0aW1lXS5qb2luKCcgJyk7XG59XG5cblxuLy8gbG9nIGlzIGp1c3QgYSB0aGluIHdyYXBwZXIgdG8gY29uc29sZS5sb2cgdGhhdCBwcmVwZW5kcyBhIHRpbWVzdGFtcFxuZXhwb3J0cy5sb2cgPSBmdW5jdGlvbigpIHtcbiAgY29uc29sZS5sb2coJyVzIC0gJXMnLCB0aW1lc3RhbXAoKSwgZXhwb3J0cy5mb3JtYXQuYXBwbHkoZXhwb3J0cywgYXJndW1lbnRzKSk7XG59O1xuXG5cbi8qKlxuICogSW5oZXJpdCB0aGUgcHJvdG90eXBlIG1ldGhvZHMgZnJvbSBvbmUgY29uc3RydWN0b3IgaW50byBhbm90aGVyLlxuICpcbiAqIFRoZSBGdW5jdGlvbi5wcm90b3R5cGUuaW5oZXJpdHMgZnJvbSBsYW5nLmpzIHJld3JpdHRlbiBhcyBhIHN0YW5kYWxvbmVcbiAqIGZ1bmN0aW9uIChub3Qgb24gRnVuY3Rpb24ucHJvdG90eXBlKS4gTk9URTogSWYgdGhpcyBmaWxlIGlzIHRvIGJlIGxvYWRlZFxuICogZHVyaW5nIGJvb3RzdHJhcHBpbmcgdGhpcyBmdW5jdGlvbiBuZWVkcyB0byBiZSByZXdyaXR0ZW4gdXNpbmcgc29tZSBuYXRpdmVcbiAqIGZ1bmN0aW9ucyBhcyBwcm90b3R5cGUgc2V0dXAgdXNpbmcgbm9ybWFsIEphdmFTY3JpcHQgZG9lcyBub3Qgd29yayBhc1xuICogZXhwZWN0ZWQgZHVyaW5nIGJvb3RzdHJhcHBpbmcgKHNlZSBtaXJyb3IuanMgaW4gcjExNDkwMykuXG4gKlxuICogQHBhcmFtIHtmdW5jdGlvbn0gY3RvciBDb25zdHJ1Y3RvciBmdW5jdGlvbiB3aGljaCBuZWVkcyB0byBpbmhlcml0IHRoZVxuICogICAgIHByb3RvdHlwZS5cbiAqIEBwYXJhbSB7ZnVuY3Rpb259IHN1cGVyQ3RvciBDb25zdHJ1Y3RvciBmdW5jdGlvbiB0byBpbmhlcml0IHByb3RvdHlwZSBmcm9tLlxuICovXG5leHBvcnRzLmluaGVyaXRzID0gcmVxdWlyZSgnaW5oZXJpdHMnKTtcblxuZXhwb3J0cy5fZXh0ZW5kID0gZnVuY3Rpb24ob3JpZ2luLCBhZGQpIHtcbiAgLy8gRG9uJ3QgZG8gYW55dGhpbmcgaWYgYWRkIGlzbid0IGFuIG9iamVjdFxuICBpZiAoIWFkZCB8fCAhaXNPYmplY3QoYWRkKSkgcmV0dXJuIG9yaWdpbjtcblxuICB2YXIga2V5cyA9IE9iamVjdC5rZXlzKGFkZCk7XG4gIHZhciBpID0ga2V5cy5sZW5ndGg7XG4gIHdoaWxlIChpLS0pIHtcbiAgICBvcmlnaW5ba2V5c1tpXV0gPSBhZGRba2V5c1tpXV07XG4gIH1cbiAgcmV0dXJuIG9yaWdpbjtcbn07XG5cbmZ1bmN0aW9uIGhhc093blByb3BlcnR5KG9iaiwgcHJvcCkge1xuICByZXR1cm4gT2JqZWN0LnByb3RvdHlwZS5oYXNPd25Qcm9wZXJ0eS5jYWxsKG9iaiwgcHJvcCk7XG59XG4iLCIvLyBUZXN0c1xuaW1wb3J0IGFqYXhUZXN0IGZyb20gJy4vYWpheC10ZXN0JztcbmltcG9ydCBlZGl0Q3NzVGVzdCBmcm9tICcuL2VkaXRjc3MtdGVzdCc7XG5pbXBvcnQgdXRpbHNUZXN0IGZyb20gJy4vdXRpbHMtdGVzdCc7XG5pbXBvcnQgZXZlbnRzVGVzdCBmcm9tICcuL2V2ZW50cy10ZXN0JztcbiJdfQ==
