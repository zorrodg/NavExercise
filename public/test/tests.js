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
 * Basic Event Listener support (Only )
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
     */
    value: function on(evt, callback) {
      if (!u.contains(Object.keys(this.events), evt)) {
        this.events[evt] = callback;
      }

      for (var i = 0, len = this.$.length; i < len; i++) {
        var item = this.$[i];
        item.addEventListener(evt, this.events[evt]);
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
              evtDispatcher = document.createEvent('MouseEvents');

          evtDispatcher.initEvent(evt, true, true);
          console.log(evtDispatcher);
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

describe('Ajax Helper test', function () {
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

describe('EditCSS Helper test', function () {

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

describe('Events', function () {
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

      clickEvent = document.createEvent('MouseEvents');
      clickEvent.initEvent('click', true, true);

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

      clickEvent = document.createEvent('MouseEvents');
      clickEvent.initEvent('click', true, true);

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

describe('Utils Testing', function () {
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
//# sourceMappingURL=data:application/json;charset:utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIm5vZGVfbW9kdWxlcy9icm93c2VyaWZ5L25vZGVfbW9kdWxlcy9icm93c2VyLXBhY2svX3ByZWx1ZGUuanMiLCIvVXNlcnMvem9ycm9kZy93b3Jrc3BhY2UvaHVnZXRlc3QvX3NyYy9oZWxwZXJzL2FqYXguanMiLCIvVXNlcnMvem9ycm9kZy93b3Jrc3BhY2UvaHVnZXRlc3QvX3NyYy9oZWxwZXJzL2VkaXRjc3MuanMiLCIvVXNlcnMvem9ycm9kZy93b3Jrc3BhY2UvaHVnZXRlc3QvX3NyYy9oZWxwZXJzL2V2ZW50cy5qcyIsIi9Vc2Vycy96b3Jyb2RnL3dvcmtzcGFjZS9odWdldGVzdC9fc3JjL2hlbHBlcnMvdXRpbHMuanMiLCIvVXNlcnMvem9ycm9kZy93b3Jrc3BhY2UvaHVnZXRlc3QvX3Rlc3QvYWpheC10ZXN0LmpzIiwiL1VzZXJzL3pvcnJvZGcvd29ya3NwYWNlL2h1Z2V0ZXN0L190ZXN0L2VkaXRjc3MtdGVzdC5qcyIsIi9Vc2Vycy96b3Jyb2RnL3dvcmtzcGFjZS9odWdldGVzdC9fdGVzdC9ldmVudHMtdGVzdC5qcyIsIi9Vc2Vycy96b3Jyb2RnL3dvcmtzcGFjZS9odWdldGVzdC9fdGVzdC91dGlscy10ZXN0LmpzIiwibm9kZV9tb2R1bGVzL2Jyb3dzZXJpZnkvbm9kZV9tb2R1bGVzL2Fzc2VydC9hc3NlcnQuanMiLCJub2RlX21vZHVsZXMvYnJvd3NlcmlmeS9ub2RlX21vZHVsZXMvaW5oZXJpdHMvaW5oZXJpdHNfYnJvd3Nlci5qcyIsIm5vZGVfbW9kdWxlcy9icm93c2VyaWZ5L25vZGVfbW9kdWxlcy9wcm9jZXNzL2Jyb3dzZXIuanMiLCJub2RlX21vZHVsZXMvYnJvd3NlcmlmeS9ub2RlX21vZHVsZXMvdXRpbC9zdXBwb3J0L2lzQnVmZmVyQnJvd3Nlci5qcyIsIm5vZGVfbW9kdWxlcy9icm93c2VyaWZ5L25vZGVfbW9kdWxlcy91dGlsL3V0aWwuanMiLCIvVXNlcnMvem9ycm9kZy93b3Jrc3BhY2UvaHVnZXRlc3QvX3Rlc3QvaW5kZXgu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QTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQ3ZXQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FDdkJBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQzFGQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7OztBQ0xBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7Ozs7Ozs7Ozt3QkN6a0JxQixhQUFhOzs7OzJCQUNWLGdCQUFnQjs7Ozt5QkFDbEIsY0FBYzs7OzswQkFDYixlQUFlIiwiZmlsZSI6ImdlbmVyYXRlZC5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzQ29udGVudCI6WyIoZnVuY3Rpb24gZSh0LG4scil7ZnVuY3Rpb24gcyhvLHUpe2lmKCFuW29dKXtpZighdFtvXSl7dmFyIGE9dHlwZW9mIHJlcXVpcmU9PVwiZnVuY3Rpb25cIiYmcmVxdWlyZTtpZighdSYmYSlyZXR1cm4gYShvLCEwKTtpZihpKXJldHVybiBpKG8sITApO3ZhciBmPW5ldyBFcnJvcihcIkNhbm5vdCBmaW5kIG1vZHVsZSAnXCIrbytcIidcIik7dGhyb3cgZi5jb2RlPVwiTU9EVUxFX05PVF9GT1VORFwiLGZ9dmFyIGw9bltvXT17ZXhwb3J0czp7fX07dFtvXVswXS5jYWxsKGwuZXhwb3J0cyxmdW5jdGlvbihlKXt2YXIgbj10W29dWzFdW2VdO3JldHVybiBzKG4/bjplKX0sbCxsLmV4cG9ydHMsZSx0LG4scil9cmV0dXJuIG5bb10uZXhwb3J0c312YXIgaT10eXBlb2YgcmVxdWlyZT09XCJmdW5jdGlvblwiJiZyZXF1aXJlO2Zvcih2YXIgbz0wO288ci5sZW5ndGg7bysrKXMocltvXSk7cmV0dXJuIHN9KSIsIi8qKlxuICogQ3JlYXRlcyBhbiBBSkFYIGNhbGwgYW5kIHJldHVybnMgYSBwcm9taXNlXG4gKiBPbmx5IEdFVCBtZXRob2QgYW5kIEpTT04gY2FsbHMgc3VwcG9ydGVkIGZvciBub3dcbiAqIEBhdXRob3IgQW5kcsOpcyBab3JybyA8em9ycm9kZ0BnbWFpbC5jb20+XG4gKi9cbid1c2Ugc3RyaWN0JztcblxuZXhwb3J0IGRlZmF1bHQgZnVuY3Rpb24ob3B0cyA9IHt9KSB7XG4gIHJldHVybiBuZXcgUHJvbWlzZShmdW5jdGlvbiAocmVzb2x2ZSwgcmVqZWN0KSB7XG4gICAgbGV0IHJlcTtcblxuICAgIGlmICh0eXBlb2Ygb3B0cyA9PT0gJ3N0cmluZycpIHtcbiAgICAgIG9wdHMgPSB7XG4gICAgICAgIHVybDogb3B0c1xuICAgICAgfVxuICAgIH1cblxuICAgIC8vIE5vIEFKQVggd2l0aG91dCBVUkxcbiAgICBpZiAoIW9wdHMgfHwgIW9wdHMudXJsKSB7XG4gICAgICB0aHJvdyBuZXcgRXJyb3IoJ05vIFVSTCcpO1xuICAgIH1cblxuICAgIC8vIEV4dGVuZCBkZWZhdWx0IG9wdGlvbnNcbiAgICBvcHRzID0gT2JqZWN0LmFzc2lnbih7XG4gICAgICBtZXRob2Q6ICdHRVQnLFxuICAgICAgcGFyYW1zOiB7fSxcbiAgICAgIGhlYWRlcnM6IHtcbiAgICAgICAgJ0NvbnRlbnQtVHlwZScgOiAnYXBwbGljYXRpb24vanNvbidcbiAgICAgIH0sXG4gICAgICBxczogW11cbiAgICB9LCBvcHRzKTtcblxuICAgIC8vIFNldCBRdWVyeSBTdHJpbmdcbiAgICBmb3IgKGxldCBwIG9mIE9iamVjdC5rZXlzKG9wdHMucGFyYW1zKSkge1xuICAgICAgb3B0cy5xcy5wdXNoKHAgKyAnPScgKyBvcHRzLnBhcmFtc1twXSk7XG4gICAgfVxuXG4gICAgLy8gU2V0IFVSTFxuICAgIG9wdHMudXJsID0gb3B0cy51cmwgKyAob3B0cy5xcy5sZW5ndGggPyAnPycgKyBvcHRzLnFzLmpvaW4oJyYnKSA6ICcnKTtcbiAgICBkZWxldGUgb3B0cy5xcztcblxuICAgIC8vIENyZWF0ZSBSZXF1ZXN0XG4gICAgaWYgKHdpbmRvdy5YTUxIdHRwUmVxdWVzdCkge1xuICAgICAgcmVxID0gbmV3IFhNTEh0dHBSZXF1ZXN0KCk7XG5cbiAgICAgIHJlcS5vcGVuKG9wdHMubWV0aG9kLCBvcHRzLnVybCwgdHJ1ZSk7XG5cbiAgICAgIGZvciAobGV0IGkgb2YgT2JqZWN0LmtleXMob3B0cy5oZWFkZXJzKSkge1xuICAgICAgICByZXEuc2V0UmVxdWVzdEhlYWRlcihpLCBvcHRzLmhlYWRlcnNbaV0pO1xuICAgICAgfVxuXG4gICAgICAvLyBBSkFYIGFzeW5jIHJlc3BvbnNlXG4gICAgICByZXEub25yZWFkeXN0YXRlY2hhbmdlID0gcmVzcG9uc2VGbjtcblxuICAgICAgLy8gU2VkIHF1ZXJ5XG4gICAgICByZXEuc2VuZChudWxsKTtcbiAgICB9IGVsc2Uge1xuICAgICAgdGhyb3cgbmV3IEVycm9yKCdObyBYTUxIdHRwUmVxdWVzdCcpO1xuICAgIH1cblxuICAgIC8qKlxuICAgICAqIEV4ZWN1dGVzIG9uIEFKQVggcmVzcG9uc2VcbiAgICAgKi9cbiAgICBmdW5jdGlvbiByZXNwb25zZUZuKCkge1xuICAgICAgaWYgKHJlcS5yZWFkeVN0YXRlID09PSA0KSB7XG4gICAgICAgIHRyeSB7XG4gICAgICAgICAgLy8gU3VjY2VzcyByZXNwb25zZVxuICAgICAgICAgIGlmIChyZXEuc3RhdHVzID49IDIwMCAmJiByZXEuc3RhdHVzIDwgNDAwKSB7XG4gICAgICAgICAgICByZXNvbHZlKHtcbiAgICAgICAgICAgICAgZGF0YTogSlNPTi5wYXJzZShyZXEucmVzcG9uc2VUZXh0KSxcbiAgICAgICAgICAgICAgc3RhdHVzOiByZXEuc3RhdHVzLFxuICAgICAgICAgICAgICBjb25maWc6IE9iamVjdC5hc3NpZ24oe30sIG9wdHMpXG4gICAgICAgICAgICB9KVxuICAgICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICByZWplY3Qoe1xuICAgICAgICAgICAgICBlcnJvcjogcmVxLnJlc3BvbnNlVGV4dCxcbiAgICAgICAgICAgICAgc3RhdHVzOiByZXEuc3RhdHVzLFxuICAgICAgICAgICAgICBjb25maWc6IE9iamVjdC5hc3NpZ24oe30sIG9wdHMpXG4gICAgICAgICAgICB9KTtcbiAgICAgICAgICB9XG4gICAgICAgIH0gY2F0Y2ggKGUpIHtcbiAgICAgICAgICAvLyBFcnJvciByZXNwb25zZVxuICAgICAgICAgIHJlamVjdCh7XG4gICAgICAgICAgICBlcnJvcjogZSxcbiAgICAgICAgICAgIHN0YXR1czogcmVxLnN0YXR1cyxcbiAgICAgICAgICAgIGNvbmZpZzogT2JqZWN0LmFzc2lnbih7fSwgb3B0cylcbiAgICAgICAgICB9KVxuICAgICAgICB9ICBcbiAgICAgIH1cbiAgICB9XG4gIH0pO1xufVxuIiwiLyoqXG4gKiBCYXNpYyBDU1MgY2xhc3MgZWRpdG9yXG4gKiBAYXV0aG9yIEFuZHLDqXMgWm9ycm8gPHpvcnJvZGdAZ21haWwuY29tPlxuICovXG4ndXNlIHN0cmljdCc7XG5cbmltcG9ydCAqIGFzIHUgZnJvbSAnLi91dGlscyc7XG5cbmNsYXNzIEVkaXRDU1Mge1xuICBjb25zdHJ1Y3RvcihzZWxlY3Rvcikge1xuICAgIHRoaXMuJCA9IHNlbGVjdG9yO1xuICB9XG5cbiAgLyoqXG4gICAqIEFkZHMgYSBuZXcgY2xhc3MgdG8gdGhlIGVsZW1lbnQgY2xhc3NOYW1lIHN0cmluZ1xuICAgKiBAcGFyYW0gey4uLnNwcmVhZH0gY2xhc3NOYW1lcyBjbGFzc2VzIHRvIGFkZFxuICAgKi9cbiAgYWRkQ2xhc3MoLi4uY2xhc3NOYW1lcykge1xuICAgIGZvciAobGV0IGkgPSAwLCBsZW4gPSB0aGlzLiQubGVuZ3RoOyBpIDwgbGVuOyBpKyspIHtcbiAgICAgIGxldCBpdGVtID0gdGhpcy4kW2ldLFxuICAgICAgICAgIGNsYXNzZXMgPSBpdGVtLmNsYXNzTmFtZS5zcGxpdCgnICcpO1xuICAgICAgY2xhc3NlcyA9IGNsYXNzZXMuY29uY2F0KGNsYXNzTmFtZXMpO1xuICAgICAgaXRlbS5jbGFzc05hbWUgPSB1LnVuaXF1ZShjbGFzc2VzKS5qb2luKCcgJykudHJpbSgpO1xuICAgIH1cbiAgfVxuXG4gIC8qKlxuICAgKiBSZW1vdmVzIGEgbmV3IGNsYXNzIHRvIHRoZSBlbGVtZW50IGNsYXNzTmFtZSBzdHJpbmdcbiAgICogQHBhcmFtIHsuLi5zcHJlYWR9IGNsYXNzTmFtZXMgY2xhc3NlcyB0byByZW1vdmVcbiAgICovXG4gIHJlbW92ZUNsYXNzKC4uLmNsYXNzTmFtZXMpIHtcbiAgICBmb3IgKGxldCBpID0gMCwgbGVuID0gdGhpcy4kLmxlbmd0aDsgaSA8IGxlbjsgaSsrKSB7XG4gICAgICBsZXQgaXRlbSA9IHRoaXMuJFtpXSxcbiAgICAgICAgICBjbGFzc2VzID0gaXRlbS5jbGFzc05hbWUuc3BsaXQoJyAnKTtcbiAgICAgIGNsYXNzZXMgPSBjbGFzc2VzLmZpbHRlcihpdCA9PiBjbGFzc05hbWVzLmluZGV4T2YoaXQpIDwgMCk7XG4gICAgICBpdGVtLmNsYXNzTmFtZSA9IHUudW5pcXVlKGNsYXNzZXMpLmpvaW4oJyAnKS50cmltKCk7XG4gICAgfVxuICB9XG59XG5cbmV4cG9ydCBkZWZhdWx0IGZ1bmN0aW9uKHNlbGVjdG9yKSB7XG4gIHNlbGVjdG9yID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvckFsbChzZWxlY3Rvcik7XG5cbiAgaWYgKCFzZWxlY3Rvcikge1xuICAgIHJldHVybjtcbiAgfVxuXG4gIHJldHVybiBuZXcgRWRpdENTUyhzZWxlY3Rvcik7XG5cbn0iLCIvKipcbiAqIEJhc2ljIEV2ZW50IExpc3RlbmVyIHN1cHBvcnQgKE9ubHkgKVxuICogQGF1dGhvciBBbmRyw6lzIFpvcnJvIDx6b3Jyb2RnQGdtYWlsLmNvbT5cbiAqL1xuJ3VzZSBzdHJpY3QnO1xuXG5pbXBvcnQgKiBhcyB1IGZyb20gJy4vdXRpbHMnO1xuXG5jbGFzcyBFdmVudFJlZ2lzdGVyIHtcbiAgY29uc3RydWN0b3IgKHNlbGVjdG9yKSB7XG4gICAgdGhpcy5ldmVudHMgPSB7fTtcbiAgICB0aGlzLiQgPSBzZWxlY3RvcjtcbiAgfVxuXG4gIC8qKlxuICAgKiBBZGRzIGFuIGV2ZW50IGxpc3RlbmVyXG4gICAqIEBwYXJhbSAge3N0cmluZ30gICBldnQgICAgICBFdmVudCBuYW1lXG4gICAqIEBwYXJhbSAge0Z1bmN0aW9ufSBjYWxsYmFjayBjYWxsYmFjayB0byBleGVjdXRlXG4gICAqL1xuICBvbihldnQsIGNhbGxiYWNrKSB7XG4gICAgaWYgKCF1LmNvbnRhaW5zKE9iamVjdC5rZXlzKHRoaXMuZXZlbnRzKSwgZXZ0KSkge1xuICAgICAgdGhpcy5ldmVudHNbZXZ0XSA9IGNhbGxiYWNrO1xuICAgIH1cblxuICAgIGZvciAobGV0IGkgPSAwLCBsZW4gPSB0aGlzLiQubGVuZ3RoOyBpIDwgbGVuOyBpKyspIHtcbiAgICAgIGxldCBpdGVtID0gdGhpcy4kW2ldO1xuICAgICAgaXRlbS5hZGRFdmVudExpc3RlbmVyKGV2dCwgdGhpcy5ldmVudHNbZXZ0XSk7XG4gICAgfVxuICB9XG5cbiAgLyoqXG4gICAqIFJlbW92ZXMgYW4gZXZlbnQgbGlzdGVuZXJcbiAgICogQHBhcmFtICB7c3RyaW5nfSAgIGV2dCAgICAgIEV2ZW50IG5hbWVcbiAgICovXG4gIG9mZihldnQpIHtcbiAgICBpZiAodS5jb250YWlucyhPYmplY3Qua2V5cyh0aGlzLmV2ZW50cyksIGV2dCkpIHtcbiAgICAgIGZvciAobGV0IGkgPSAwLCBsZW4gPSB0aGlzLiQubGVuZ3RoOyBpIDwgbGVuOyBpKyspIHtcbiAgICAgICAgbGV0IGl0ZW0gPSB0aGlzLiRbaV07XG4gICAgICAgIGl0ZW0ucmVtb3ZlRXZlbnRMaXN0ZW5lcihldnQsIHRoaXMuZXZlbnRzW2V2dF0pO1xuICAgICAgfVxuXG4gICAgICBkZWxldGUgdGhpcy5ldmVudHNbZXZ0XTtcbiAgICB9XG4gIH1cblxuICAvKipcbiAgICogVHJpZ2dlcnMgYW4gZXZlbnQgbGlzdGVuZXJcbiAgICogQHBhcmFtICB7c3RyaW5nfSAgIGV2dCAgICAgIEV2ZW50IG5hbWVcbiAgICovXG4gIHRyaWdnZXIoZXZ0KSB7XG4gICAgaWYgKHUuY29udGFpbnMoT2JqZWN0LmtleXModGhpcy5ldmVudHMpLCBldnQpKSB7XG4gICAgICBmb3IgKGxldCBpID0gMCwgbGVuID0gdGhpcy4kLmxlbmd0aDsgaSA8IGxlbjsgaSsrKSB7XG4gICAgICAgIGxldCBpdGVtID0gdGhpcy4kW2ldLFxuICAgICAgICAgICAgZXZ0RGlzcGF0Y2hlciA9IGRvY3VtZW50LmNyZWF0ZUV2ZW50KCdNb3VzZUV2ZW50cycpO1xuXG4gICAgICAgIGV2dERpc3BhdGNoZXIuaW5pdEV2ZW50KGV2dCwgdHJ1ZSAsdHJ1ZSk7XG4gICAgICAgIGNvbnNvbGUubG9nKGV2dERpc3BhdGNoZXIpO1xuICAgICAgICBpdGVtLmRpc3BhdGNoRXZlbnQoZXZ0RGlzcGF0Y2hlcik7XG4gICAgICB9XG4gICAgfVxuICB9XG59XG5cbmV4cG9ydCBkZWZhdWx0IGZ1bmN0aW9uIChzZWxlY3Rvcikge1xuICBzZWxlY3RvciA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3JBbGwoc2VsZWN0b3IpO1xuXG4gIGlmICghc2VsZWN0b3IpIHtcbiAgICByZXR1cm47XG4gIH1cblxuICByZXR1cm4gbmV3IEV2ZW50UmVnaXN0ZXIoc2VsZWN0b3IpO1xufVxuIiwiJ3VzZSBzdHJpY3QnO1xuXG4vKipcbiAqIENoZWNrIGlmIGFycmF5IGNvbnRhaW5zIGl0ZW1cbiAqIEBwYXJhbSAge0FycmF5fSAgYXJyICB0YXJnZXRcbiAqIEBwYXJhbSAge1N0cmluZ30gaXRlbVxuICogQHJldHVybiB7Qm9vbGVhbn0gICAgIHRydWUgaWYgZm91bmRcbiAqL1xuZXhwb3J0IGZ1bmN0aW9uIGNvbnRhaW5zKGFyciA9IFtdLCBpdGVtID0gJycpIHtcbiAgZm9yIChsZXQgaSBvZiBhcnIpIHtcbiAgICBpZiAoaSA9PT0gaXRlbSkge1xuICAgICAgcmV0dXJuIHRydWU7XG4gICAgfVxuICB9XG5cbiAgcmV0dXJuIGZhbHNlO1xufVxuXG4vKipcbiAqIEZpbHRlcnMgdW5pcXVlIHZhbHVlc1xuICogQHBhcmFtICB7QXJyYXl9ICBhcnIgdGFyZ2V0XG4gKiBAcmV0dXJuIHtBcnJheX0gICAgICBmaWx0ZXJlZCByZXN1bHRcbiAqL1xuZXhwb3J0IGZ1bmN0aW9uIHVuaXF1ZShhcnIgPSBbXSkge1xuICB2YXIgcmVzdWx0ID0gW107XG5cbiAgZm9yIChsZXQgaSBvZiBhcnIpIHtcbiAgICBpZiAoIWNvbnRhaW5zKHJlc3VsdCwgaSkpIHtcbiAgICAgIHJlc3VsdC5wdXNoKGkpO1xuICAgIH1cbiAgfVxuXG4gIHJldHVybiByZXN1bHQ7XG59IiwiJ3VzZSBzdHJpY3QnO1xuXG5pbXBvcnQgYXNzZXJ0IGZyb20gJ2Fzc2VydCc7XG5pbXBvcnQgYWpheCBmcm9tICcuLy4uL19zcmMvaGVscGVycy9hamF4JztcblxuZGVzY3JpYmUoJ0FqYXggSGVscGVyIHRlc3QnLCAoKSA9PiB7XG4gIGxldCBjYWxsO1xuXG4gIC8vIENyZWF0aW9uIFRlc3RzXG4gIGRlc2NyaWJlKCdDcmVhdGlvbicsICgpID0+IHtcbiAgICBpdCgnU2hvdWxkIGJlIGEgZnVuY3Rpb24nLCAoKSA9PiBhc3NlcnQuZXF1YWwodHlwZW9mIGFqYXgsICdmdW5jdGlvbicpKTtcblxuICAgIGNhbGwgPSBhamF4KCcvYXBpL25hdi5qc29uJyk7XG4gICAgaXQoJ1Nob3VsZCB3b3JrIHdpdGggc3RyaW5nJywgKCkgPT4gYXNzZXJ0KGNhbGwgaW5zdGFuY2VvZiBQcm9taXNlKSk7XG5cbiAgICBjYWxsID0gYWpheCh7dXJsOiAnL2FwaS9uYXYuanNvbid9KTtcbiAgICBpdCgnU2hvdWxkIHdvcmsgd2l0aCBvYmplY3QnLCAoKSA9PiBhc3NlcnQoY2FsbCBpbnN0YW5jZW9mIFByb21pc2UpKTtcblxuICAgIGl0KCdTaG91bGQgdGhyb3cgb24gYW5vdGhlciB0eXBlJywgKCkgPT4gYXNzZXJ0LnRocm93cyhhamF4KFtdKSwgJ05vIFVSTCcpKTtcbiAgICBpdCgnU2hvdWxkIHRocm93IG9uIGVtcHR5JywgKCkgPT4gYXNzZXJ0LnRocm93cyhhamF4KCksICdObyBVUkwnKSk7XG4gIH0pO1xuXG4gIC8vIEFzeW5jIHRlc3RcbiAgZGVzY3JpYmUoJ0FzeW5jJywgKCkgPT4ge1xuICAgIGxldCByZXNwb25zZTtcblxuICAgIGJlZm9yZShkb25lID0+IHtcbiAgICAgIGFqYXgoJy9hcGkvbmF2Lmpzb24nKVxuICAgICAgICAudGhlbihyZXMgPT4ge1xuICAgICAgICAgIHJlc3BvbnNlID0gcmVzO1xuICAgICAgICAgIGRvbmUoKTtcbiAgICAgICAgfSk7XG4gICAgfSk7XG5cbiAgICBpdCgnUmVzcG9uc2Ugc2hvdWxkIGJlIGFuIG9iamVjdCcsICgpID0+IGFzc2VydC5lcXVhbCh0eXBlb2YgcmVzcG9uc2UsICdvYmplY3QnKSk7XG4gICAgaXQoJ1Jlc3BvbnNlIHNob3VsZCBjb250YWluIGRhdGEnLCAoKSA9PiBhc3NlcnQocmVzcG9uc2UuZGF0YSkpO1xuICAgIGl0KCdSZXNwb25zZSBzaG91bGQgY29udGFpbiBzdGF0dXMnLCAoKSA9PiBhc3NlcnQocmVzcG9uc2Uuc3RhdHVzKSk7XG4gICAgaXQoJ1Jlc3BvbnNlIHNob3VsZCBjb250YWluIGNvbmZpZycsICgpID0+IGFzc2VydChyZXNwb25zZS5jb25maWcpKTtcbiAgICBpdCgnVXJscyBtdXN0IG1hdGNoJywgKCkgPT4gYXNzZXJ0LmVxdWFsKCcvYXBpL25hdi5qc29uJywgcmVzcG9uc2UuY29uZmlnLnVybCkpO1xuICB9KTtcblxuICAvLyBBc3luYyBQYXJhbXNcbiAgZGVzY3JpYmUoJ0FzeW5jIFBhcmFtcycsICgpID0+IHtcbiAgICBsZXQgcmVzcG9uc2U7XG5cbiAgICBiZWZvcmUoZG9uZSA9PiB7XG4gICAgICBhamF4KHtcbiAgICAgICAgdXJsOicvYXBpL25hdi5qc29uJyxcbiAgICAgICAgcGFyYW1zOiB7XG4gICAgICAgICAgdGVzdDogJzEyMydcbiAgICAgICAgfVxuICAgICAgfSlcbiAgICAgICAgLmNhdGNoKHJlcyA9PiB7XG4gICAgICAgICAgcmVzcG9uc2UgPSByZXM7XG4gICAgICAgICAgZG9uZSgpO1xuICAgICAgICB9KTtcbiAgICB9KTtcblxuICAgIGl0KCdQYXJhbXMgbXVzdCBtYXRjaCcsICgpID0+IGFzc2VydC5kZWVwRXF1YWwoe3Rlc3Q6ICcxMjMnfSwgcmVzcG9uc2UuY29uZmlnLnBhcmFtcykpO1xuICAgIGl0KCdVcmwgbXVzdCBtYXRjaCcsICgpID0+IGFzc2VydC5lcXVhbCgnL2FwaS9uYXYuanNvbj90ZXN0PTEyMycsIHJlc3BvbnNlLmNvbmZpZy51cmwpKTtcbiAgfSk7XG5cbiAgLy8gQXN5bmMgZXJyb3JcbiAgZGVzY3JpYmUoJ0FzeW5jIEVycm9yJywgKCkgPT4ge1xuICAgIGxldCByZXNwb25zZTtcblxuICAgIGJlZm9yZShkb25lID0+IHtcbiAgICAgIGFqYXgoJy9hcGkvMTIzLmpzb24nKVxuICAgICAgICAuY2F0Y2gocmVzID0+IHtcbiAgICAgICAgICByZXNwb25zZSA9IHJlcztcbiAgICAgICAgICBkb25lKCk7XG4gICAgICAgIH0pO1xuICAgIH0pO1xuXG4gICAgaXQoJ1Jlc3BvbnNlIHNob3VsZCBiZSBhbiBvYmplY3QnLCAoKSA9PiBhc3NlcnQuZXF1YWwodHlwZW9mIHJlc3BvbnNlLCAnb2JqZWN0JykpO1xuICAgIGl0KCdSZXNwb25zZSBzaG91bGQgY29udGFpbiBlcnJvcicsICgpID0+IGFzc2VydChyZXNwb25zZS5lcnJvcikpO1xuICAgIGl0KCdSZXNwb25zZSBzaG91bGQgY29udGFpbiBzdGF0dXMnLCAoKSA9PiBhc3NlcnQocmVzcG9uc2Uuc3RhdHVzKSk7XG4gICAgaXQoJ1Jlc3BvbnNlIHNob3VsZCBjb250YWluIGNvbmZpZycsICgpID0+IGFzc2VydChyZXNwb25zZS5jb25maWcpKTtcbiAgfSk7XG5cbn0pO1xuXG5leHBvcnQgZGVmYXVsdCB7fTsiLCIndXNlIHN0cmljdCc7XG5cbmltcG9ydCBhc3NlcnQgZnJvbSAnYXNzZXJ0JztcbmltcG9ydCBlZGl0Y3NzIGZyb20gJy4vLi4vX3NyYy9oZWxwZXJzL2VkaXRjc3MnO1xuXG5kZXNjcmliZSgnRWRpdENTUyBIZWxwZXIgdGVzdCcsICgpID0+IHtcblxuICBkZXNjcmliZSgnSW5pdCcsICgpID0+IHtcbiAgICBpdCgnU2hvdWxkIGJlIGEgZnVuY3Rpb24nLCAoKSA9PiBhc3NlcnQuZXF1YWwodHlwZW9mIGVkaXRjc3MsICdmdW5jdGlvbicpKTtcbiAgICBpdCgnU2hvdWxkIGJlIGFuIG9iamVjdCcsICgpID0+IGFzc2VydChlZGl0Y3NzKCdib2R5JykgaW5zdGFuY2VvZiBPYmplY3QpKTtcbiAgICBpdCgnXCJib2R5XCIgU2hvdWxkIGhhdmUgbGVuZ3RoJywgKCkgPT4gYXNzZXJ0KGVkaXRjc3MoJ2JvZHknKS4kLmxlbmd0aCA+IDApKTtcbiAgICBpdCgnXCIjbm8tZGF0YVwiIFNob3VsZCBiZSBlbXB0eScsICgpID0+IGFzc2VydC5lcXVhbChlZGl0Y3NzKCcjbm8tZGF0YScpLiQubGVuZ3RoLCAwKSk7XG4gICAgaXQoJ1Nob3VsZCBoYXZlIFwiYWRkQ2xhc3NcIiBtZXRob2QnLCAoKSA9PiBhc3NlcnQoZWRpdGNzcygnYm9keScpLmFkZENsYXNzKSk7XG4gICAgaXQoJ1Nob3VsZCBoYXZlIFwicmVtb3ZlQ2xhc3NcIiBtZXRob2QnLCAoKSA9PiBhc3NlcnQoZWRpdGNzcygnYm9keScpLnJlbW92ZUNsYXNzKSk7XG4gIH0pO1xuXG4gIGRlc2NyaWJlKCdBZGQgQ2xhc3MgTWV0aG9kJywgKCkgPT4ge1xuICAgIGxldCBhLCBiLCBjLCAkZWw7XG5cbiAgICBiZWZvcmUoKCkgPT4ge1xuICAgICAgYSA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ3NwYW4nKTtcbiAgICAgIGIgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCdkaXYnKTtcbiAgICAgIGMgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCdhJyk7XG4gICAgICBhLmNsYXNzTmFtZSA9ICd0ZXN0LWVsbSc7XG4gICAgICBiLmNsYXNzTmFtZSA9ICd0ZXN0LWVsbSc7XG4gICAgICBjLmNsYXNzTmFtZSA9ICd0ZXN0LWVsbSc7XG4gICAgICBkb2N1bWVudC5ib2R5LmFwcGVuZENoaWxkKGEpO1xuICAgICAgZG9jdW1lbnQuYm9keS5hcHBlbmRDaGlsZChiKTtcbiAgICAgIGRvY3VtZW50LmJvZHkuYXBwZW5kQ2hpbGQoYyk7XG4gICAgICAkZWwgPSBlZGl0Y3NzKCcudGVzdC1lbG0nKTtcblxuICAgICAgJGVsLmFkZENsYXNzKCd0ZXN0LWNsYXNzJywgJ290aGVyLWNsYXNzJyk7XG4gICAgfSk7XG5cbiAgICBpdCgnJGVsIHNob3VsZCBleGlzdCcsICgpID0+IGFzc2VydCgkZWwuJC5sZW5ndGggPiAwKSk7XG4gICAgaXQoJyRlbCBhIHNob3VsZCBoYXZlIFwidGVzdC1jbGFzc1wiIGFuZCBcIm90aGVyLWNsYXNzXCInLCAoKSA9PiB7XG4gICAgICBhc3NlcnQuZXF1YWwoJGVsLiRbMF0uY2xhc3NOYW1lLCAndGVzdC1lbG0gdGVzdC1jbGFzcyBvdGhlci1jbGFzcycpXG4gICAgfSk7XG5cbiAgICBpdCgnJGVsIGIgc2hvdWxkIGhhdmUgXCJ0ZXN0LWNsYXNzXCIgYW5kIFwib3RoZXItY2xhc3NcIicsICgpID0+IHtcbiAgICAgIGFzc2VydC5lcXVhbCgkZWwuJFsxXS5jbGFzc05hbWUsICd0ZXN0LWVsbSB0ZXN0LWNsYXNzIG90aGVyLWNsYXNzJylcbiAgICB9KTtcblxuICAgIGl0KCckZWwgYyBzaG91bGQgaGF2ZSBcInRlc3QtY2xhc3NcIiBhbmQgXCJvdGhlci1jbGFzc1wiJywgKCkgPT4ge1xuICAgICAgYXNzZXJ0LmVxdWFsKCRlbC4kWzJdLmNsYXNzTmFtZSwgJ3Rlc3QtZWxtIHRlc3QtY2xhc3Mgb3RoZXItY2xhc3MnKVxuICAgIH0pO1xuXG4gICAgYWZ0ZXIoKCkgPT4ge1xuICAgICAgZG9jdW1lbnQuYm9keS5yZW1vdmVDaGlsZChhKTtcbiAgICAgIGRvY3VtZW50LmJvZHkucmVtb3ZlQ2hpbGQoYik7XG4gICAgICBkb2N1bWVudC5ib2R5LnJlbW92ZUNoaWxkKGMpO1xuICAgIH0pO1xuXG4gIH0pO1xuXG4gIGRlc2NyaWJlKCdSZW1vdmUgQ2xhc3MgTWV0aG9kJywgKCkgPT4ge1xuICAgIGxldCBhLCBiLCBjLCAkZWw7XG5cbiAgICBiZWZvcmUoKCkgPT4ge1xuICAgICAgYSA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ3NwYW4nKTtcbiAgICAgIGIgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCdkaXYnKTtcbiAgICAgIGMgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCdhJyk7XG4gICAgICBhLmNsYXNzTmFtZSA9ICd0ZXN0LWVsbSB0ZXN0LWNsYXNzIG90aGVyLWNsYXNzJztcbiAgICAgIGIuY2xhc3NOYW1lID0gJ3Rlc3QtZWxtIHRlc3QtY2xhc3Mgb3RoZXItY2xhc3MnO1xuICAgICAgYy5jbGFzc05hbWUgPSAndGVzdC1lbG0gdGVzdC1jbGFzcyBvdGhlci1jbGFzcyc7XG4gICAgICBkb2N1bWVudC5ib2R5LmFwcGVuZENoaWxkKGEpO1xuICAgICAgZG9jdW1lbnQuYm9keS5hcHBlbmRDaGlsZChiKTtcbiAgICAgIGRvY3VtZW50LmJvZHkuYXBwZW5kQ2hpbGQoYyk7XG4gICAgICAkZWwgPSBlZGl0Y3NzKCcudGVzdC1lbG0nKTtcblxuICAgICAgJGVsLnJlbW92ZUNsYXNzKCdvdGhlci1jbGFzcycpO1xuICAgIH0pXG5cbiAgICBpdCgnJGVsIHNob3VsZCBleGlzdCcsICgpID0+IGFzc2VydCgkZWwuJC5sZW5ndGggPiAwKSk7XG4gICAgaXQoJyRlbCBhIHNob3VsZCBoYXZlIFwidGVzdC1jbGFzc1wiIG9ubHknLCAoKSA9PiB7XG4gICAgICBhc3NlcnQuZXF1YWwoJGVsLiRbMF0uY2xhc3NOYW1lLCAndGVzdC1lbG0gdGVzdC1jbGFzcycpXG4gICAgfSk7XG5cbiAgICBpdCgnJGVsIGIgc2hvdWxkIGhhdmUgXCJ0ZXN0LWNsYXNzXCIgb25seScsICgpID0+IHtcbiAgICAgIGFzc2VydC5lcXVhbCgkZWwuJFswXS5jbGFzc05hbWUsICd0ZXN0LWVsbSB0ZXN0LWNsYXNzJylcbiAgICB9KTtcbiAgICBpdCgnJGVsIGMgc2hvdWxkIGhhdmUgXCJ0ZXN0LWNsYXNzXCIgb25seScsICgpID0+IHtcbiAgICAgIGFzc2VydC5lcXVhbCgkZWwuJFswXS5jbGFzc05hbWUsICd0ZXN0LWVsbSB0ZXN0LWNsYXNzJylcbiAgICB9KTtcblxuICAgIGFmdGVyKCgpID0+IHtcbiAgICAgIGRvY3VtZW50LmJvZHkucmVtb3ZlQ2hpbGQoYSk7XG4gICAgICBkb2N1bWVudC5ib2R5LnJlbW92ZUNoaWxkKGIpO1xuICAgICAgZG9jdW1lbnQuYm9keS5yZW1vdmVDaGlsZChjKTtcbiAgICB9KTtcblxuICB9KTtcblxufSk7XG5cbmV4cG9ydCBkZWZhdWx0IHt9OyIsIid1c2Ugc3RyaWN0JztcblxuaW1wb3J0IGFzc2VydCBmcm9tICdhc3NlcnQnO1xuaW1wb3J0IGV2IGZyb20gJy4vLi4vX3NyYy9oZWxwZXJzL2V2ZW50cyc7XG5cbmRlc2NyaWJlKCdFdmVudHMnLCAoKSA9PiB7XG4gIGRlc2NyaWJlKCdJbml0JywgKCkgPT4ge1xuICAgIGl0KCdTaG91bGQgYmUgYSBmdW5jdGlvbicsICgpID0+IGFzc2VydC5lcXVhbCh0eXBlb2YgZXYsICdmdW5jdGlvbicpKTtcbiAgICBpdCgnU2hvdWxkIGJlIGFuIG9iamVjdCcsICgpID0+IGFzc2VydChldignYm9keScpIGluc3RhbmNlb2YgT2JqZWN0KSk7XG4gICAgaXQoJ1wiYm9keVwiIFNob3VsZCBoYXZlIGxlbmd0aCcsICgpID0+IGFzc2VydChldignYm9keScpLiQubGVuZ3RoID4gMCkpO1xuICAgIGl0KCdcIiNuby1kYXRhXCIgU2hvdWxkIGJlIGVtcHR5JywgKCkgPT4gYXNzZXJ0LmVxdWFsKGV2KCcjbm8tZGF0YScpLiQubGVuZ3RoLCAwKSk7XG4gICAgaXQoJ1Nob3VsZCBoYXZlIFwib25cIiBtZXRob2QnLCAoKSA9PiBhc3NlcnQoZXYoJ2JvZHknKS5vbikpO1xuICAgIGl0KCdTaG91bGQgaGF2ZSBcIm9mZlwiIG1ldGhvZCcsICgpID0+IGFzc2VydChldignYm9keScpLm9mZikpO1xuICAgIGl0KCdTaG91bGQgaGF2ZSBcInRyaWdnZXJcIiBtZXRob2QnLCAoKSA9PiBhc3NlcnQoZXYoJ2JvZHknKS50cmlnZ2VyKSk7XG4gIH0pO1xuXG4gIC8vIE9uIEV2ZW50XG4gIGRlc2NyaWJlKCdPbiBFdmVudCcsICgpID0+IHtcbiAgICBsZXQgYSwgYiwgYywgJGVsLCBjbGlja0V2ZW50LCByZXN1bHQ7XG5cbiAgICBiZWZvcmUoZG9uZSA9PiB7XG4gICAgICByZXN1bHQgPSBmYWxzZTtcbiAgICAgIGEgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCdzcGFuJyk7XG4gICAgICBiID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgnZGl2Jyk7XG4gICAgICBjID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgnYScpO1xuICAgICAgYS5jbGFzc05hbWUgPSAndGVzdC1lbG0nO1xuICAgICAgYi5jbGFzc05hbWUgPSAndGVzdC1lbG0nO1xuICAgICAgYy5jbGFzc05hbWUgPSAndGVzdC1lbG0nO1xuICAgICAgZG9jdW1lbnQuYm9keS5hcHBlbmRDaGlsZChhKTtcbiAgICAgIGRvY3VtZW50LmJvZHkuYXBwZW5kQ2hpbGQoYik7XG4gICAgICBkb2N1bWVudC5ib2R5LmFwcGVuZENoaWxkKGMpO1xuICAgICAgJGVsID0gZXYoJy50ZXN0LWVsbScpO1xuXG4gICAgICAkZWwub24oJ2NsaWNrJywgZSA9PiB7XG4gICAgICAgIHJlc3VsdCA9IGU7XG4gICAgICAgIGRvbmUoKTtcbiAgICAgIH0pO1xuXG4gICAgICBjbGlja0V2ZW50ID0gZG9jdW1lbnQuY3JlYXRlRXZlbnQoJ01vdXNlRXZlbnRzJyk7XG4gICAgICBjbGlja0V2ZW50LmluaXRFdmVudCgnY2xpY2snLCB0cnVlICx0cnVlKTtcblxuICAgICAgZG9jdW1lbnQucXVlcnlTZWxlY3RvcignLnRlc3QtZWxtJykuZGlzcGF0Y2hFdmVudChjbGlja0V2ZW50KTtcbiAgICB9KTtcblxuICAgIGl0KCckZWwgc2hvdWxkIGV4aXN0JywgKCkgPT4gYXNzZXJ0KCRlbC4kLmxlbmd0aCA+IDApKTtcbiAgICBpdCgnJGVsIGEgc2hvdWxkIHRyaWdnZXIgdGhlIGV2ZW50JywgKCkgPT4gYXNzZXJ0KHJlc3VsdCkpO1xuICAgIGl0KCdldmVudCB0YXJnZXQgY2xhc3NOYW1lIHNob3VsZCBtYXRjaCcsICgpID0+IHtcbiAgICAgIGFzc2VydC5lcXVhbChyZXN1bHQudGFyZ2V0LmNsYXNzTmFtZSwgJ3Rlc3QtZWxtJyk7XG4gICAgfSk7XG5cbiAgICBhZnRlcigoKSA9PiB7XG4gICAgICBkb2N1bWVudC5ib2R5LnJlbW92ZUNoaWxkKGEpO1xuICAgICAgZG9jdW1lbnQuYm9keS5yZW1vdmVDaGlsZChiKTtcbiAgICAgIGRvY3VtZW50LmJvZHkucmVtb3ZlQ2hpbGQoYyk7XG4gICAgfSk7XG4gIH0pO1xuXG4gIC8vIE9mZiBFdmVudFxuICBkZXNjcmliZSgnT2ZmIEV2ZW50JywgKCkgPT4ge1xuICAgIGxldCBhLCBiLCBjLCAkZWwsIGNsaWNrRXZlbnQsIHJlc3VsdDtcblxuICAgIGJlZm9yZShkb25lID0+IHtcbiAgICAgIHJlc3VsdCA9IGZhbHNlO1xuICAgICAgYSA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ3NwYW4nKTtcbiAgICAgIGIgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCdkaXYnKTtcbiAgICAgIGMgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCdhJyk7XG4gICAgICBhLmNsYXNzTmFtZSA9ICd0ZXN0LWVsbSc7XG4gICAgICBiLmNsYXNzTmFtZSA9ICd0ZXN0LWVsbSc7XG4gICAgICBjLmNsYXNzTmFtZSA9ICd0ZXN0LWVsbSc7XG4gICAgICBkb2N1bWVudC5ib2R5LmFwcGVuZENoaWxkKGEpO1xuICAgICAgZG9jdW1lbnQuYm9keS5hcHBlbmRDaGlsZChiKTtcbiAgICAgIGRvY3VtZW50LmJvZHkuYXBwZW5kQ2hpbGQoYyk7XG4gICAgICAkZWwgPSBldignLnRlc3QtZWxtJyk7XG5cbiAgICAgICRlbC5vbignY2xpY2snLCBlID0+IHtcbiAgICAgICAgcmVzdWx0ID0gZTtcbiAgICAgICAgZG9uZSgpO1xuICAgICAgfSk7XG5cbiAgICAgICRlbC5vZmYoJ2NsaWNrJyk7XG5cbiAgICAgIGNsaWNrRXZlbnQgPSBkb2N1bWVudC5jcmVhdGVFdmVudCgnTW91c2VFdmVudHMnKTtcbiAgICAgIGNsaWNrRXZlbnQuaW5pdEV2ZW50KCdjbGljaycsIHRydWUgLHRydWUpO1xuXG4gICAgICBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKCcudGVzdC1lbG0nKS5kaXNwYXRjaEV2ZW50KGNsaWNrRXZlbnQpO1xuXG4gICAgICBzZXRUaW1lb3V0KGRvbmUsIDEwMDApO1xuICAgIH0pO1xuXG4gICAgaXQoJyRlbCBzaG91bGQgZXhpc3QnLCAoKSA9PiBhc3NlcnQoJGVsLiQubGVuZ3RoID4gMCkpO1xuICAgIGl0KCckZWwgc2hvdWxkIG5vdCB0cmlnZ2VyIHRoZSBldmVudCcsICgpID0+IGFzc2VydCghcmVzdWx0KSk7XG5cbiAgICBhZnRlcigoKSA9PiB7XG4gICAgICBkb2N1bWVudC5ib2R5LnJlbW92ZUNoaWxkKGEpO1xuICAgICAgZG9jdW1lbnQuYm9keS5yZW1vdmVDaGlsZChiKTtcbiAgICAgIGRvY3VtZW50LmJvZHkucmVtb3ZlQ2hpbGQoYyk7XG4gICAgfSk7XG4gIH0pO1xuXG4gIC8vIFRyaWdnZXIgRXZlbnRcbiAgZGVzY3JpYmUoJ1RyaWdnZXIgRXZlbnQnLCAoKSA9PiB7XG4gICAgbGV0IGEsIGIsIGMsICRlbCwgcmVzdWx0O1xuXG4gICAgYmVmb3JlKGRvbmUgPT4ge1xuICAgICAgcmVzdWx0ID0gZmFsc2U7XG4gICAgICBhID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgnc3BhbicpO1xuICAgICAgYiA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ2RpdicpO1xuICAgICAgYyA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ2EnKTtcbiAgICAgIGEuY2xhc3NOYW1lID0gJ3Rlc3QtZWxtJztcbiAgICAgIGIuY2xhc3NOYW1lID0gJ3Rlc3QtZWxtJztcbiAgICAgIGMuY2xhc3NOYW1lID0gJ3Rlc3QtZWxtJztcbiAgICAgIGRvY3VtZW50LmJvZHkuYXBwZW5kQ2hpbGQoYSk7XG4gICAgICBkb2N1bWVudC5ib2R5LmFwcGVuZENoaWxkKGIpO1xuICAgICAgZG9jdW1lbnQuYm9keS5hcHBlbmRDaGlsZChjKTtcbiAgICAgICRlbCA9IGV2KCcudGVzdC1lbG0nKTtcblxuICAgICAgJGVsLm9uKCdtb3VzZW92ZXInLCBlID0+IHtcbiAgICAgICAgcmVzdWx0ID0gZTtcbiAgICAgICAgZG9uZSgpO1xuICAgICAgfSk7XG5cbiAgICAgICRlbC50cmlnZ2VyKCdtb3VzZW92ZXInKTtcbiAgICB9KTtcblxuICAgIGl0KCckZWwgc2hvdWxkIGV4aXN0JywgKCkgPT4gYXNzZXJ0KCRlbC4kLmxlbmd0aCA+IDApKTtcbiAgICBpdCgnJGVsIHNob3VsZCB0cmlnZ2VyIHRoZSBldmVudCcsICgpID0+IGFzc2VydChyZXN1bHQpKTtcblxuICAgIGFmdGVyKCgpID0+IHtcbiAgICAgIGRvY3VtZW50LmJvZHkucmVtb3ZlQ2hpbGQoYSk7XG4gICAgICBkb2N1bWVudC5ib2R5LnJlbW92ZUNoaWxkKGIpO1xuICAgICAgZG9jdW1lbnQuYm9keS5yZW1vdmVDaGlsZChjKTtcbiAgICB9KTtcbiAgfSk7XG59KTsiLCIndXNlIHN0cmljdCc7XG5cbmltcG9ydCBhc3NlcnQgZnJvbSAnYXNzZXJ0JztcbmltcG9ydCAqIGFzIHUgZnJvbSAnLi8uLi9fc3JjL2hlbHBlcnMvdXRpbHMnO1xuXG5kZXNjcmliZSgnVXRpbHMgVGVzdGluZycsICgpID0+IHtcbiAgbGV0IGFyciA9IFsxLDIsNCwyLDUsMywzXTtcblxuICBkZXNjcmliZSgnQ29udGFpbnMnLCAoKSA9PiB7XG4gICAgaXQoJ1Nob3VsZCBjb250YWluIDMnLCAoKSA9PiBhc3NlcnQodS5jb250YWlucyhhcnIsIDMpKSk7XG4gICAgaXQoJ1Nob3VsZCBjb250YWluIDUnLCAoKSA9PiBhc3NlcnQodS5jb250YWlucyhhcnIsIDUpKSk7XG4gICAgaXQoJ1Nob3VsZCBub3QgY29udGFpbiBcIjNcIicsICgpID0+IGFzc2VydC5lcXVhbCh1LmNvbnRhaW5zKGFyciwgJzMnKSwgZmFsc2UpKTtcbiAgICBpdCgnU2hvdWxkIG5vdCBjb250YWluIDQwJywgKCkgPT4gYXNzZXJ0LmVxdWFsKHUuY29udGFpbnMoYXJyLCA0MCksIGZhbHNlKSk7XG4gIH0pO1xuXG4gIGRlc2NyaWJlKCdVbmlxdWUnLCAoKSA9PiB7XG4gICAgYXJyID0gdS51bmlxdWUoYXJyKTtcblxuICAgIGl0KCdTaG91bGQgY29udGFpbiB1bmlxdWUgdmFsdWVzJywgKCkgPT4gYXNzZXJ0LmRlZXBFcXVhbChhcnIsIFsxLDIsNCw1LDNdKSlcbiAgfSk7XG5cbn0pO1xuIiwiLy8gaHR0cDovL3dpa2kuY29tbW9uanMub3JnL3dpa2kvVW5pdF9UZXN0aW5nLzEuMFxuLy9cbi8vIFRISVMgSVMgTk9UIFRFU1RFRCBOT1IgTElLRUxZIFRPIFdPUksgT1VUU0lERSBWOCFcbi8vXG4vLyBPcmlnaW5hbGx5IGZyb20gbmFyd2hhbC5qcyAoaHR0cDovL25hcndoYWxqcy5vcmcpXG4vLyBDb3B5cmlnaHQgKGMpIDIwMDkgVGhvbWFzIFJvYmluc29uIDwyODBub3J0aC5jb20+XG4vL1xuLy8gUGVybWlzc2lvbiBpcyBoZXJlYnkgZ3JhbnRlZCwgZnJlZSBvZiBjaGFyZ2UsIHRvIGFueSBwZXJzb24gb2J0YWluaW5nIGEgY29weVxuLy8gb2YgdGhpcyBzb2Z0d2FyZSBhbmQgYXNzb2NpYXRlZCBkb2N1bWVudGF0aW9uIGZpbGVzICh0aGUgJ1NvZnR3YXJlJyksIHRvXG4vLyBkZWFsIGluIHRoZSBTb2Z0d2FyZSB3aXRob3V0IHJlc3RyaWN0aW9uLCBpbmNsdWRpbmcgd2l0aG91dCBsaW1pdGF0aW9uIHRoZVxuLy8gcmlnaHRzIHRvIHVzZSwgY29weSwgbW9kaWZ5LCBtZXJnZSwgcHVibGlzaCwgZGlzdHJpYnV0ZSwgc3VibGljZW5zZSwgYW5kL29yXG4vLyBzZWxsIGNvcGllcyBvZiB0aGUgU29mdHdhcmUsIGFuZCB0byBwZXJtaXQgcGVyc29ucyB0byB3aG9tIHRoZSBTb2Z0d2FyZSBpc1xuLy8gZnVybmlzaGVkIHRvIGRvIHNvLCBzdWJqZWN0IHRvIHRoZSBmb2xsb3dpbmcgY29uZGl0aW9uczpcbi8vXG4vLyBUaGUgYWJvdmUgY29weXJpZ2h0IG5vdGljZSBhbmQgdGhpcyBwZXJtaXNzaW9uIG5vdGljZSBzaGFsbCBiZSBpbmNsdWRlZCBpblxuLy8gYWxsIGNvcGllcyBvciBzdWJzdGFudGlhbCBwb3J0aW9ucyBvZiB0aGUgU29mdHdhcmUuXG4vL1xuLy8gVEhFIFNPRlRXQVJFIElTIFBST1ZJREVEICdBUyBJUycsIFdJVEhPVVQgV0FSUkFOVFkgT0YgQU5ZIEtJTkQsIEVYUFJFU1MgT1Jcbi8vIElNUExJRUQsIElOQ0xVRElORyBCVVQgTk9UIExJTUlURUQgVE8gVEhFIFdBUlJBTlRJRVMgT0YgTUVSQ0hBTlRBQklMSVRZLFxuLy8gRklUTkVTUyBGT1IgQSBQQVJUSUNVTEFSIFBVUlBPU0UgQU5EIE5PTklORlJJTkdFTUVOVC4gSU4gTk8gRVZFTlQgU0hBTEwgVEhFXG4vLyBBVVRIT1JTIEJFIExJQUJMRSBGT1IgQU5ZIENMQUlNLCBEQU1BR0VTIE9SIE9USEVSIExJQUJJTElUWSwgV0hFVEhFUiBJTiBBTlxuLy8gQUNUSU9OIE9GIENPTlRSQUNULCBUT1JUIE9SIE9USEVSV0lTRSwgQVJJU0lORyBGUk9NLCBPVVQgT0YgT1IgSU4gQ09OTkVDVElPTlxuLy8gV0lUSCBUSEUgU09GVFdBUkUgT1IgVEhFIFVTRSBPUiBPVEhFUiBERUFMSU5HUyBJTiBUSEUgU09GVFdBUkUuXG5cbi8vIHdoZW4gdXNlZCBpbiBub2RlLCB0aGlzIHdpbGwgYWN0dWFsbHkgbG9hZCB0aGUgdXRpbCBtb2R1bGUgd2UgZGVwZW5kIG9uXG4vLyB2ZXJzdXMgbG9hZGluZyB0aGUgYnVpbHRpbiB1dGlsIG1vZHVsZSBhcyBoYXBwZW5zIG90aGVyd2lzZVxuLy8gdGhpcyBpcyBhIGJ1ZyBpbiBub2RlIG1vZHVsZSBsb2FkaW5nIGFzIGZhciBhcyBJIGFtIGNvbmNlcm5lZFxudmFyIHV0aWwgPSByZXF1aXJlKCd1dGlsLycpO1xuXG52YXIgcFNsaWNlID0gQXJyYXkucHJvdG90eXBlLnNsaWNlO1xudmFyIGhhc093biA9IE9iamVjdC5wcm90b3R5cGUuaGFzT3duUHJvcGVydHk7XG5cbi8vIDEuIFRoZSBhc3NlcnQgbW9kdWxlIHByb3ZpZGVzIGZ1bmN0aW9ucyB0aGF0IHRocm93XG4vLyBBc3NlcnRpb25FcnJvcidzIHdoZW4gcGFydGljdWxhciBjb25kaXRpb25zIGFyZSBub3QgbWV0LiBUaGVcbi8vIGFzc2VydCBtb2R1bGUgbXVzdCBjb25mb3JtIHRvIHRoZSBmb2xsb3dpbmcgaW50ZXJmYWNlLlxuXG52YXIgYXNzZXJ0ID0gbW9kdWxlLmV4cG9ydHMgPSBvaztcblxuLy8gMi4gVGhlIEFzc2VydGlvbkVycm9yIGlzIGRlZmluZWQgaW4gYXNzZXJ0LlxuLy8gbmV3IGFzc2VydC5Bc3NlcnRpb25FcnJvcih7IG1lc3NhZ2U6IG1lc3NhZ2UsXG4vLyAgICAgICAgICAgICAgICAgICAgICAgICAgICAgYWN0dWFsOiBhY3R1YWwsXG4vLyAgICAgICAgICAgICAgICAgICAgICAgICAgICAgZXhwZWN0ZWQ6IGV4cGVjdGVkIH0pXG5cbmFzc2VydC5Bc3NlcnRpb25FcnJvciA9IGZ1bmN0aW9uIEFzc2VydGlvbkVycm9yKG9wdGlvbnMpIHtcbiAgdGhpcy5uYW1lID0gJ0Fzc2VydGlvbkVycm9yJztcbiAgdGhpcy5hY3R1YWwgPSBvcHRpb25zLmFjdHVhbDtcbiAgdGhpcy5leHBlY3RlZCA9IG9wdGlvbnMuZXhwZWN0ZWQ7XG4gIHRoaXMub3BlcmF0b3IgPSBvcHRpb25zLm9wZXJhdG9yO1xuICBpZiAob3B0aW9ucy5tZXNzYWdlKSB7XG4gICAgdGhpcy5tZXNzYWdlID0gb3B0aW9ucy5tZXNzYWdlO1xuICAgIHRoaXMuZ2VuZXJhdGVkTWVzc2FnZSA9IGZhbHNlO1xuICB9IGVsc2Uge1xuICAgIHRoaXMubWVzc2FnZSA9IGdldE1lc3NhZ2UodGhpcyk7XG4gICAgdGhpcy5nZW5lcmF0ZWRNZXNzYWdlID0gdHJ1ZTtcbiAgfVxuICB2YXIgc3RhY2tTdGFydEZ1bmN0aW9uID0gb3B0aW9ucy5zdGFja1N0YXJ0RnVuY3Rpb24gfHwgZmFpbDtcblxuICBpZiAoRXJyb3IuY2FwdHVyZVN0YWNrVHJhY2UpIHtcbiAgICBFcnJvci5jYXB0dXJlU3RhY2tUcmFjZSh0aGlzLCBzdGFja1N0YXJ0RnVuY3Rpb24pO1xuICB9XG4gIGVsc2Uge1xuICAgIC8vIG5vbiB2OCBicm93c2VycyBzbyB3ZSBjYW4gaGF2ZSBhIHN0YWNrdHJhY2VcbiAgICB2YXIgZXJyID0gbmV3IEVycm9yKCk7XG4gICAgaWYgKGVyci5zdGFjaykge1xuICAgICAgdmFyIG91dCA9IGVyci5zdGFjaztcblxuICAgICAgLy8gdHJ5IHRvIHN0cmlwIHVzZWxlc3MgZnJhbWVzXG4gICAgICB2YXIgZm5fbmFtZSA9IHN0YWNrU3RhcnRGdW5jdGlvbi5uYW1lO1xuICAgICAgdmFyIGlkeCA9IG91dC5pbmRleE9mKCdcXG4nICsgZm5fbmFtZSk7XG4gICAgICBpZiAoaWR4ID49IDApIHtcbiAgICAgICAgLy8gb25jZSB3ZSBoYXZlIGxvY2F0ZWQgdGhlIGZ1bmN0aW9uIGZyYW1lXG4gICAgICAgIC8vIHdlIG5lZWQgdG8gc3RyaXAgb3V0IGV2ZXJ5dGhpbmcgYmVmb3JlIGl0IChhbmQgaXRzIGxpbmUpXG4gICAgICAgIHZhciBuZXh0X2xpbmUgPSBvdXQuaW5kZXhPZignXFxuJywgaWR4ICsgMSk7XG4gICAgICAgIG91dCA9IG91dC5zdWJzdHJpbmcobmV4dF9saW5lICsgMSk7XG4gICAgICB9XG5cbiAgICAgIHRoaXMuc3RhY2sgPSBvdXQ7XG4gICAgfVxuICB9XG59O1xuXG4vLyBhc3NlcnQuQXNzZXJ0aW9uRXJyb3IgaW5zdGFuY2VvZiBFcnJvclxudXRpbC5pbmhlcml0cyhhc3NlcnQuQXNzZXJ0aW9uRXJyb3IsIEVycm9yKTtcblxuZnVuY3Rpb24gcmVwbGFjZXIoa2V5LCB2YWx1ZSkge1xuICBpZiAodXRpbC5pc1VuZGVmaW5lZCh2YWx1ZSkpIHtcbiAgICByZXR1cm4gJycgKyB2YWx1ZTtcbiAgfVxuICBpZiAodXRpbC5pc051bWJlcih2YWx1ZSkgJiYgIWlzRmluaXRlKHZhbHVlKSkge1xuICAgIHJldHVybiB2YWx1ZS50b1N0cmluZygpO1xuICB9XG4gIGlmICh1dGlsLmlzRnVuY3Rpb24odmFsdWUpIHx8IHV0aWwuaXNSZWdFeHAodmFsdWUpKSB7XG4gICAgcmV0dXJuIHZhbHVlLnRvU3RyaW5nKCk7XG4gIH1cbiAgcmV0dXJuIHZhbHVlO1xufVxuXG5mdW5jdGlvbiB0cnVuY2F0ZShzLCBuKSB7XG4gIGlmICh1dGlsLmlzU3RyaW5nKHMpKSB7XG4gICAgcmV0dXJuIHMubGVuZ3RoIDwgbiA/IHMgOiBzLnNsaWNlKDAsIG4pO1xuICB9IGVsc2Uge1xuICAgIHJldHVybiBzO1xuICB9XG59XG5cbmZ1bmN0aW9uIGdldE1lc3NhZ2Uoc2VsZikge1xuICByZXR1cm4gdHJ1bmNhdGUoSlNPTi5zdHJpbmdpZnkoc2VsZi5hY3R1YWwsIHJlcGxhY2VyKSwgMTI4KSArICcgJyArXG4gICAgICAgICBzZWxmLm9wZXJhdG9yICsgJyAnICtcbiAgICAgICAgIHRydW5jYXRlKEpTT04uc3RyaW5naWZ5KHNlbGYuZXhwZWN0ZWQsIHJlcGxhY2VyKSwgMTI4KTtcbn1cblxuLy8gQXQgcHJlc2VudCBvbmx5IHRoZSB0aHJlZSBrZXlzIG1lbnRpb25lZCBhYm92ZSBhcmUgdXNlZCBhbmRcbi8vIHVuZGVyc3Rvb2QgYnkgdGhlIHNwZWMuIEltcGxlbWVudGF0aW9ucyBvciBzdWIgbW9kdWxlcyBjYW4gcGFzc1xuLy8gb3RoZXIga2V5cyB0byB0aGUgQXNzZXJ0aW9uRXJyb3IncyBjb25zdHJ1Y3RvciAtIHRoZXkgd2lsbCBiZVxuLy8gaWdub3JlZC5cblxuLy8gMy4gQWxsIG9mIHRoZSBmb2xsb3dpbmcgZnVuY3Rpb25zIG11c3QgdGhyb3cgYW4gQXNzZXJ0aW9uRXJyb3Jcbi8vIHdoZW4gYSBjb3JyZXNwb25kaW5nIGNvbmRpdGlvbiBpcyBub3QgbWV0LCB3aXRoIGEgbWVzc2FnZSB0aGF0XG4vLyBtYXkgYmUgdW5kZWZpbmVkIGlmIG5vdCBwcm92aWRlZC4gIEFsbCBhc3NlcnRpb24gbWV0aG9kcyBwcm92aWRlXG4vLyBib3RoIHRoZSBhY3R1YWwgYW5kIGV4cGVjdGVkIHZhbHVlcyB0byB0aGUgYXNzZXJ0aW9uIGVycm9yIGZvclxuLy8gZGlzcGxheSBwdXJwb3Nlcy5cblxuZnVuY3Rpb24gZmFpbChhY3R1YWwsIGV4cGVjdGVkLCBtZXNzYWdlLCBvcGVyYXRvciwgc3RhY2tTdGFydEZ1bmN0aW9uKSB7XG4gIHRocm93IG5ldyBhc3NlcnQuQXNzZXJ0aW9uRXJyb3Ioe1xuICAgIG1lc3NhZ2U6IG1lc3NhZ2UsXG4gICAgYWN0dWFsOiBhY3R1YWwsXG4gICAgZXhwZWN0ZWQ6IGV4cGVjdGVkLFxuICAgIG9wZXJhdG9yOiBvcGVyYXRvcixcbiAgICBzdGFja1N0YXJ0RnVuY3Rpb246IHN0YWNrU3RhcnRGdW5jdGlvblxuICB9KTtcbn1cblxuLy8gRVhURU5TSU9OISBhbGxvd3MgZm9yIHdlbGwgYmVoYXZlZCBlcnJvcnMgZGVmaW5lZCBlbHNld2hlcmUuXG5hc3NlcnQuZmFpbCA9IGZhaWw7XG5cbi8vIDQuIFB1cmUgYXNzZXJ0aW9uIHRlc3RzIHdoZXRoZXIgYSB2YWx1ZSBpcyB0cnV0aHksIGFzIGRldGVybWluZWRcbi8vIGJ5ICEhZ3VhcmQuXG4vLyBhc3NlcnQub2soZ3VhcmQsIG1lc3NhZ2Vfb3B0KTtcbi8vIFRoaXMgc3RhdGVtZW50IGlzIGVxdWl2YWxlbnQgdG8gYXNzZXJ0LmVxdWFsKHRydWUsICEhZ3VhcmQsXG4vLyBtZXNzYWdlX29wdCk7LiBUbyB0ZXN0IHN0cmljdGx5IGZvciB0aGUgdmFsdWUgdHJ1ZSwgdXNlXG4vLyBhc3NlcnQuc3RyaWN0RXF1YWwodHJ1ZSwgZ3VhcmQsIG1lc3NhZ2Vfb3B0KTsuXG5cbmZ1bmN0aW9uIG9rKHZhbHVlLCBtZXNzYWdlKSB7XG4gIGlmICghdmFsdWUpIGZhaWwodmFsdWUsIHRydWUsIG1lc3NhZ2UsICc9PScsIGFzc2VydC5vayk7XG59XG5hc3NlcnQub2sgPSBvaztcblxuLy8gNS4gVGhlIGVxdWFsaXR5IGFzc2VydGlvbiB0ZXN0cyBzaGFsbG93LCBjb2VyY2l2ZSBlcXVhbGl0eSB3aXRoXG4vLyA9PS5cbi8vIGFzc2VydC5lcXVhbChhY3R1YWwsIGV4cGVjdGVkLCBtZXNzYWdlX29wdCk7XG5cbmFzc2VydC5lcXVhbCA9IGZ1bmN0aW9uIGVxdWFsKGFjdHVhbCwgZXhwZWN0ZWQsIG1lc3NhZ2UpIHtcbiAgaWYgKGFjdHVhbCAhPSBleHBlY3RlZCkgZmFpbChhY3R1YWwsIGV4cGVjdGVkLCBtZXNzYWdlLCAnPT0nLCBhc3NlcnQuZXF1YWwpO1xufTtcblxuLy8gNi4gVGhlIG5vbi1lcXVhbGl0eSBhc3NlcnRpb24gdGVzdHMgZm9yIHdoZXRoZXIgdHdvIG9iamVjdHMgYXJlIG5vdCBlcXVhbFxuLy8gd2l0aCAhPSBhc3NlcnQubm90RXF1YWwoYWN0dWFsLCBleHBlY3RlZCwgbWVzc2FnZV9vcHQpO1xuXG5hc3NlcnQubm90RXF1YWwgPSBmdW5jdGlvbiBub3RFcXVhbChhY3R1YWwsIGV4cGVjdGVkLCBtZXNzYWdlKSB7XG4gIGlmIChhY3R1YWwgPT0gZXhwZWN0ZWQpIHtcbiAgICBmYWlsKGFjdHVhbCwgZXhwZWN0ZWQsIG1lc3NhZ2UsICchPScsIGFzc2VydC5ub3RFcXVhbCk7XG4gIH1cbn07XG5cbi8vIDcuIFRoZSBlcXVpdmFsZW5jZSBhc3NlcnRpb24gdGVzdHMgYSBkZWVwIGVxdWFsaXR5IHJlbGF0aW9uLlxuLy8gYXNzZXJ0LmRlZXBFcXVhbChhY3R1YWwsIGV4cGVjdGVkLCBtZXNzYWdlX29wdCk7XG5cbmFzc2VydC5kZWVwRXF1YWwgPSBmdW5jdGlvbiBkZWVwRXF1YWwoYWN0dWFsLCBleHBlY3RlZCwgbWVzc2FnZSkge1xuICBpZiAoIV9kZWVwRXF1YWwoYWN0dWFsLCBleHBlY3RlZCkpIHtcbiAgICBmYWlsKGFjdHVhbCwgZXhwZWN0ZWQsIG1lc3NhZ2UsICdkZWVwRXF1YWwnLCBhc3NlcnQuZGVlcEVxdWFsKTtcbiAgfVxufTtcblxuZnVuY3Rpb24gX2RlZXBFcXVhbChhY3R1YWwsIGV4cGVjdGVkKSB7XG4gIC8vIDcuMS4gQWxsIGlkZW50aWNhbCB2YWx1ZXMgYXJlIGVxdWl2YWxlbnQsIGFzIGRldGVybWluZWQgYnkgPT09LlxuICBpZiAoYWN0dWFsID09PSBleHBlY3RlZCkge1xuICAgIHJldHVybiB0cnVlO1xuXG4gIH0gZWxzZSBpZiAodXRpbC5pc0J1ZmZlcihhY3R1YWwpICYmIHV0aWwuaXNCdWZmZXIoZXhwZWN0ZWQpKSB7XG4gICAgaWYgKGFjdHVhbC5sZW5ndGggIT0gZXhwZWN0ZWQubGVuZ3RoKSByZXR1cm4gZmFsc2U7XG5cbiAgICBmb3IgKHZhciBpID0gMDsgaSA8IGFjdHVhbC5sZW5ndGg7IGkrKykge1xuICAgICAgaWYgKGFjdHVhbFtpXSAhPT0gZXhwZWN0ZWRbaV0pIHJldHVybiBmYWxzZTtcbiAgICB9XG5cbiAgICByZXR1cm4gdHJ1ZTtcblxuICAvLyA3LjIuIElmIHRoZSBleHBlY3RlZCB2YWx1ZSBpcyBhIERhdGUgb2JqZWN0LCB0aGUgYWN0dWFsIHZhbHVlIGlzXG4gIC8vIGVxdWl2YWxlbnQgaWYgaXQgaXMgYWxzbyBhIERhdGUgb2JqZWN0IHRoYXQgcmVmZXJzIHRvIHRoZSBzYW1lIHRpbWUuXG4gIH0gZWxzZSBpZiAodXRpbC5pc0RhdGUoYWN0dWFsKSAmJiB1dGlsLmlzRGF0ZShleHBlY3RlZCkpIHtcbiAgICByZXR1cm4gYWN0dWFsLmdldFRpbWUoKSA9PT0gZXhwZWN0ZWQuZ2V0VGltZSgpO1xuXG4gIC8vIDcuMyBJZiB0aGUgZXhwZWN0ZWQgdmFsdWUgaXMgYSBSZWdFeHAgb2JqZWN0LCB0aGUgYWN0dWFsIHZhbHVlIGlzXG4gIC8vIGVxdWl2YWxlbnQgaWYgaXQgaXMgYWxzbyBhIFJlZ0V4cCBvYmplY3Qgd2l0aCB0aGUgc2FtZSBzb3VyY2UgYW5kXG4gIC8vIHByb3BlcnRpZXMgKGBnbG9iYWxgLCBgbXVsdGlsaW5lYCwgYGxhc3RJbmRleGAsIGBpZ25vcmVDYXNlYCkuXG4gIH0gZWxzZSBpZiAodXRpbC5pc1JlZ0V4cChhY3R1YWwpICYmIHV0aWwuaXNSZWdFeHAoZXhwZWN0ZWQpKSB7XG4gICAgcmV0dXJuIGFjdHVhbC5zb3VyY2UgPT09IGV4cGVjdGVkLnNvdXJjZSAmJlxuICAgICAgICAgICBhY3R1YWwuZ2xvYmFsID09PSBleHBlY3RlZC5nbG9iYWwgJiZcbiAgICAgICAgICAgYWN0dWFsLm11bHRpbGluZSA9PT0gZXhwZWN0ZWQubXVsdGlsaW5lICYmXG4gICAgICAgICAgIGFjdHVhbC5sYXN0SW5kZXggPT09IGV4cGVjdGVkLmxhc3RJbmRleCAmJlxuICAgICAgICAgICBhY3R1YWwuaWdub3JlQ2FzZSA9PT0gZXhwZWN0ZWQuaWdub3JlQ2FzZTtcblxuICAvLyA3LjQuIE90aGVyIHBhaXJzIHRoYXQgZG8gbm90IGJvdGggcGFzcyB0eXBlb2YgdmFsdWUgPT0gJ29iamVjdCcsXG4gIC8vIGVxdWl2YWxlbmNlIGlzIGRldGVybWluZWQgYnkgPT0uXG4gIH0gZWxzZSBpZiAoIXV0aWwuaXNPYmplY3QoYWN0dWFsKSAmJiAhdXRpbC5pc09iamVjdChleHBlY3RlZCkpIHtcbiAgICByZXR1cm4gYWN0dWFsID09IGV4cGVjdGVkO1xuXG4gIC8vIDcuNSBGb3IgYWxsIG90aGVyIE9iamVjdCBwYWlycywgaW5jbHVkaW5nIEFycmF5IG9iamVjdHMsIGVxdWl2YWxlbmNlIGlzXG4gIC8vIGRldGVybWluZWQgYnkgaGF2aW5nIHRoZSBzYW1lIG51bWJlciBvZiBvd25lZCBwcm9wZXJ0aWVzIChhcyB2ZXJpZmllZFxuICAvLyB3aXRoIE9iamVjdC5wcm90b3R5cGUuaGFzT3duUHJvcGVydHkuY2FsbCksIHRoZSBzYW1lIHNldCBvZiBrZXlzXG4gIC8vIChhbHRob3VnaCBub3QgbmVjZXNzYXJpbHkgdGhlIHNhbWUgb3JkZXIpLCBlcXVpdmFsZW50IHZhbHVlcyBmb3IgZXZlcnlcbiAgLy8gY29ycmVzcG9uZGluZyBrZXksIGFuZCBhbiBpZGVudGljYWwgJ3Byb3RvdHlwZScgcHJvcGVydHkuIE5vdGU6IHRoaXNcbiAgLy8gYWNjb3VudHMgZm9yIGJvdGggbmFtZWQgYW5kIGluZGV4ZWQgcHJvcGVydGllcyBvbiBBcnJheXMuXG4gIH0gZWxzZSB7XG4gICAgcmV0dXJuIG9iakVxdWl2KGFjdHVhbCwgZXhwZWN0ZWQpO1xuICB9XG59XG5cbmZ1bmN0aW9uIGlzQXJndW1lbnRzKG9iamVjdCkge1xuICByZXR1cm4gT2JqZWN0LnByb3RvdHlwZS50b1N0cmluZy5jYWxsKG9iamVjdCkgPT0gJ1tvYmplY3QgQXJndW1lbnRzXSc7XG59XG5cbmZ1bmN0aW9uIG9iakVxdWl2KGEsIGIpIHtcbiAgaWYgKHV0aWwuaXNOdWxsT3JVbmRlZmluZWQoYSkgfHwgdXRpbC5pc051bGxPclVuZGVmaW5lZChiKSlcbiAgICByZXR1cm4gZmFsc2U7XG4gIC8vIGFuIGlkZW50aWNhbCAncHJvdG90eXBlJyBwcm9wZXJ0eS5cbiAgaWYgKGEucHJvdG90eXBlICE9PSBiLnByb3RvdHlwZSkgcmV0dXJuIGZhbHNlO1xuICAvLyBpZiBvbmUgaXMgYSBwcmltaXRpdmUsIHRoZSBvdGhlciBtdXN0IGJlIHNhbWVcbiAgaWYgKHV0aWwuaXNQcmltaXRpdmUoYSkgfHwgdXRpbC5pc1ByaW1pdGl2ZShiKSkge1xuICAgIHJldHVybiBhID09PSBiO1xuICB9XG4gIHZhciBhSXNBcmdzID0gaXNBcmd1bWVudHMoYSksXG4gICAgICBiSXNBcmdzID0gaXNBcmd1bWVudHMoYik7XG4gIGlmICgoYUlzQXJncyAmJiAhYklzQXJncykgfHwgKCFhSXNBcmdzICYmIGJJc0FyZ3MpKVxuICAgIHJldHVybiBmYWxzZTtcbiAgaWYgKGFJc0FyZ3MpIHtcbiAgICBhID0gcFNsaWNlLmNhbGwoYSk7XG4gICAgYiA9IHBTbGljZS5jYWxsKGIpO1xuICAgIHJldHVybiBfZGVlcEVxdWFsKGEsIGIpO1xuICB9XG4gIHZhciBrYSA9IG9iamVjdEtleXMoYSksXG4gICAgICBrYiA9IG9iamVjdEtleXMoYiksXG4gICAgICBrZXksIGk7XG4gIC8vIGhhdmluZyB0aGUgc2FtZSBudW1iZXIgb2Ygb3duZWQgcHJvcGVydGllcyAoa2V5cyBpbmNvcnBvcmF0ZXNcbiAgLy8gaGFzT3duUHJvcGVydHkpXG4gIGlmIChrYS5sZW5ndGggIT0ga2IubGVuZ3RoKVxuICAgIHJldHVybiBmYWxzZTtcbiAgLy90aGUgc2FtZSBzZXQgb2Yga2V5cyAoYWx0aG91Z2ggbm90IG5lY2Vzc2FyaWx5IHRoZSBzYW1lIG9yZGVyKSxcbiAga2Euc29ydCgpO1xuICBrYi5zb3J0KCk7XG4gIC8vfn5+Y2hlYXAga2V5IHRlc3RcbiAgZm9yIChpID0ga2EubGVuZ3RoIC0gMTsgaSA+PSAwOyBpLS0pIHtcbiAgICBpZiAoa2FbaV0gIT0ga2JbaV0pXG4gICAgICByZXR1cm4gZmFsc2U7XG4gIH1cbiAgLy9lcXVpdmFsZW50IHZhbHVlcyBmb3IgZXZlcnkgY29ycmVzcG9uZGluZyBrZXksIGFuZFxuICAvL35+fnBvc3NpYmx5IGV4cGVuc2l2ZSBkZWVwIHRlc3RcbiAgZm9yIChpID0ga2EubGVuZ3RoIC0gMTsgaSA+PSAwOyBpLS0pIHtcbiAgICBrZXkgPSBrYVtpXTtcbiAgICBpZiAoIV9kZWVwRXF1YWwoYVtrZXldLCBiW2tleV0pKSByZXR1cm4gZmFsc2U7XG4gIH1cbiAgcmV0dXJuIHRydWU7XG59XG5cbi8vIDguIFRoZSBub24tZXF1aXZhbGVuY2UgYXNzZXJ0aW9uIHRlc3RzIGZvciBhbnkgZGVlcCBpbmVxdWFsaXR5LlxuLy8gYXNzZXJ0Lm5vdERlZXBFcXVhbChhY3R1YWwsIGV4cGVjdGVkLCBtZXNzYWdlX29wdCk7XG5cbmFzc2VydC5ub3REZWVwRXF1YWwgPSBmdW5jdGlvbiBub3REZWVwRXF1YWwoYWN0dWFsLCBleHBlY3RlZCwgbWVzc2FnZSkge1xuICBpZiAoX2RlZXBFcXVhbChhY3R1YWwsIGV4cGVjdGVkKSkge1xuICAgIGZhaWwoYWN0dWFsLCBleHBlY3RlZCwgbWVzc2FnZSwgJ25vdERlZXBFcXVhbCcsIGFzc2VydC5ub3REZWVwRXF1YWwpO1xuICB9XG59O1xuXG4vLyA5LiBUaGUgc3RyaWN0IGVxdWFsaXR5IGFzc2VydGlvbiB0ZXN0cyBzdHJpY3QgZXF1YWxpdHksIGFzIGRldGVybWluZWQgYnkgPT09LlxuLy8gYXNzZXJ0LnN0cmljdEVxdWFsKGFjdHVhbCwgZXhwZWN0ZWQsIG1lc3NhZ2Vfb3B0KTtcblxuYXNzZXJ0LnN0cmljdEVxdWFsID0gZnVuY3Rpb24gc3RyaWN0RXF1YWwoYWN0dWFsLCBleHBlY3RlZCwgbWVzc2FnZSkge1xuICBpZiAoYWN0dWFsICE9PSBleHBlY3RlZCkge1xuICAgIGZhaWwoYWN0dWFsLCBleHBlY3RlZCwgbWVzc2FnZSwgJz09PScsIGFzc2VydC5zdHJpY3RFcXVhbCk7XG4gIH1cbn07XG5cbi8vIDEwLiBUaGUgc3RyaWN0IG5vbi1lcXVhbGl0eSBhc3NlcnRpb24gdGVzdHMgZm9yIHN0cmljdCBpbmVxdWFsaXR5LCBhc1xuLy8gZGV0ZXJtaW5lZCBieSAhPT0uICBhc3NlcnQubm90U3RyaWN0RXF1YWwoYWN0dWFsLCBleHBlY3RlZCwgbWVzc2FnZV9vcHQpO1xuXG5hc3NlcnQubm90U3RyaWN0RXF1YWwgPSBmdW5jdGlvbiBub3RTdHJpY3RFcXVhbChhY3R1YWwsIGV4cGVjdGVkLCBtZXNzYWdlKSB7XG4gIGlmIChhY3R1YWwgPT09IGV4cGVjdGVkKSB7XG4gICAgZmFpbChhY3R1YWwsIGV4cGVjdGVkLCBtZXNzYWdlLCAnIT09JywgYXNzZXJ0Lm5vdFN0cmljdEVxdWFsKTtcbiAgfVxufTtcblxuZnVuY3Rpb24gZXhwZWN0ZWRFeGNlcHRpb24oYWN0dWFsLCBleHBlY3RlZCkge1xuICBpZiAoIWFjdHVhbCB8fCAhZXhwZWN0ZWQpIHtcbiAgICByZXR1cm4gZmFsc2U7XG4gIH1cblxuICBpZiAoT2JqZWN0LnByb3RvdHlwZS50b1N0cmluZy5jYWxsKGV4cGVjdGVkKSA9PSAnW29iamVjdCBSZWdFeHBdJykge1xuICAgIHJldHVybiBleHBlY3RlZC50ZXN0KGFjdHVhbCk7XG4gIH0gZWxzZSBpZiAoYWN0dWFsIGluc3RhbmNlb2YgZXhwZWN0ZWQpIHtcbiAgICByZXR1cm4gdHJ1ZTtcbiAgfSBlbHNlIGlmIChleHBlY3RlZC5jYWxsKHt9LCBhY3R1YWwpID09PSB0cnVlKSB7XG4gICAgcmV0dXJuIHRydWU7XG4gIH1cblxuICByZXR1cm4gZmFsc2U7XG59XG5cbmZ1bmN0aW9uIF90aHJvd3Moc2hvdWxkVGhyb3csIGJsb2NrLCBleHBlY3RlZCwgbWVzc2FnZSkge1xuICB2YXIgYWN0dWFsO1xuXG4gIGlmICh1dGlsLmlzU3RyaW5nKGV4cGVjdGVkKSkge1xuICAgIG1lc3NhZ2UgPSBleHBlY3RlZDtcbiAgICBleHBlY3RlZCA9IG51bGw7XG4gIH1cblxuICB0cnkge1xuICAgIGJsb2NrKCk7XG4gIH0gY2F0Y2ggKGUpIHtcbiAgICBhY3R1YWwgPSBlO1xuICB9XG5cbiAgbWVzc2FnZSA9IChleHBlY3RlZCAmJiBleHBlY3RlZC5uYW1lID8gJyAoJyArIGV4cGVjdGVkLm5hbWUgKyAnKS4nIDogJy4nKSArXG4gICAgICAgICAgICAobWVzc2FnZSA/ICcgJyArIG1lc3NhZ2UgOiAnLicpO1xuXG4gIGlmIChzaG91bGRUaHJvdyAmJiAhYWN0dWFsKSB7XG4gICAgZmFpbChhY3R1YWwsIGV4cGVjdGVkLCAnTWlzc2luZyBleHBlY3RlZCBleGNlcHRpb24nICsgbWVzc2FnZSk7XG4gIH1cblxuICBpZiAoIXNob3VsZFRocm93ICYmIGV4cGVjdGVkRXhjZXB0aW9uKGFjdHVhbCwgZXhwZWN0ZWQpKSB7XG4gICAgZmFpbChhY3R1YWwsIGV4cGVjdGVkLCAnR290IHVud2FudGVkIGV4Y2VwdGlvbicgKyBtZXNzYWdlKTtcbiAgfVxuXG4gIGlmICgoc2hvdWxkVGhyb3cgJiYgYWN0dWFsICYmIGV4cGVjdGVkICYmXG4gICAgICAhZXhwZWN0ZWRFeGNlcHRpb24oYWN0dWFsLCBleHBlY3RlZCkpIHx8ICghc2hvdWxkVGhyb3cgJiYgYWN0dWFsKSkge1xuICAgIHRocm93IGFjdHVhbDtcbiAgfVxufVxuXG4vLyAxMS4gRXhwZWN0ZWQgdG8gdGhyb3cgYW4gZXJyb3I6XG4vLyBhc3NlcnQudGhyb3dzKGJsb2NrLCBFcnJvcl9vcHQsIG1lc3NhZ2Vfb3B0KTtcblxuYXNzZXJ0LnRocm93cyA9IGZ1bmN0aW9uKGJsb2NrLCAvKm9wdGlvbmFsKi9lcnJvciwgLypvcHRpb25hbCovbWVzc2FnZSkge1xuICBfdGhyb3dzLmFwcGx5KHRoaXMsIFt0cnVlXS5jb25jYXQocFNsaWNlLmNhbGwoYXJndW1lbnRzKSkpO1xufTtcblxuLy8gRVhURU5TSU9OISBUaGlzIGlzIGFubm95aW5nIHRvIHdyaXRlIG91dHNpZGUgdGhpcyBtb2R1bGUuXG5hc3NlcnQuZG9lc05vdFRocm93ID0gZnVuY3Rpb24oYmxvY2ssIC8qb3B0aW9uYWwqL21lc3NhZ2UpIHtcbiAgX3Rocm93cy5hcHBseSh0aGlzLCBbZmFsc2VdLmNvbmNhdChwU2xpY2UuY2FsbChhcmd1bWVudHMpKSk7XG59O1xuXG5hc3NlcnQuaWZFcnJvciA9IGZ1bmN0aW9uKGVycikgeyBpZiAoZXJyKSB7dGhyb3cgZXJyO319O1xuXG52YXIgb2JqZWN0S2V5cyA9IE9iamVjdC5rZXlzIHx8IGZ1bmN0aW9uIChvYmopIHtcbiAgdmFyIGtleXMgPSBbXTtcbiAgZm9yICh2YXIga2V5IGluIG9iaikge1xuICAgIGlmIChoYXNPd24uY2FsbChvYmosIGtleSkpIGtleXMucHVzaChrZXkpO1xuICB9XG4gIHJldHVybiBrZXlzO1xufTtcbiIsImlmICh0eXBlb2YgT2JqZWN0LmNyZWF0ZSA9PT0gJ2Z1bmN0aW9uJykge1xuICAvLyBpbXBsZW1lbnRhdGlvbiBmcm9tIHN0YW5kYXJkIG5vZGUuanMgJ3V0aWwnIG1vZHVsZVxuICBtb2R1bGUuZXhwb3J0cyA9IGZ1bmN0aW9uIGluaGVyaXRzKGN0b3IsIHN1cGVyQ3Rvcikge1xuICAgIGN0b3Iuc3VwZXJfID0gc3VwZXJDdG9yXG4gICAgY3Rvci5wcm90b3R5cGUgPSBPYmplY3QuY3JlYXRlKHN1cGVyQ3Rvci5wcm90b3R5cGUsIHtcbiAgICAgIGNvbnN0cnVjdG9yOiB7XG4gICAgICAgIHZhbHVlOiBjdG9yLFxuICAgICAgICBlbnVtZXJhYmxlOiBmYWxzZSxcbiAgICAgICAgd3JpdGFibGU6IHRydWUsXG4gICAgICAgIGNvbmZpZ3VyYWJsZTogdHJ1ZVxuICAgICAgfVxuICAgIH0pO1xuICB9O1xufSBlbHNlIHtcbiAgLy8gb2xkIHNjaG9vbCBzaGltIGZvciBvbGQgYnJvd3NlcnNcbiAgbW9kdWxlLmV4cG9ydHMgPSBmdW5jdGlvbiBpbmhlcml0cyhjdG9yLCBzdXBlckN0b3IpIHtcbiAgICBjdG9yLnN1cGVyXyA9IHN1cGVyQ3RvclxuICAgIHZhciBUZW1wQ3RvciA9IGZ1bmN0aW9uICgpIHt9XG4gICAgVGVtcEN0b3IucHJvdG90eXBlID0gc3VwZXJDdG9yLnByb3RvdHlwZVxuICAgIGN0b3IucHJvdG90eXBlID0gbmV3IFRlbXBDdG9yKClcbiAgICBjdG9yLnByb3RvdHlwZS5jb25zdHJ1Y3RvciA9IGN0b3JcbiAgfVxufVxuIiwiLy8gc2hpbSBmb3IgdXNpbmcgcHJvY2VzcyBpbiBicm93c2VyXG5cbnZhciBwcm9jZXNzID0gbW9kdWxlLmV4cG9ydHMgPSB7fTtcbnZhciBxdWV1ZSA9IFtdO1xudmFyIGRyYWluaW5nID0gZmFsc2U7XG52YXIgY3VycmVudFF1ZXVlO1xudmFyIHF1ZXVlSW5kZXggPSAtMTtcblxuZnVuY3Rpb24gY2xlYW5VcE5leHRUaWNrKCkge1xuICAgIGRyYWluaW5nID0gZmFsc2U7XG4gICAgaWYgKGN1cnJlbnRRdWV1ZS5sZW5ndGgpIHtcbiAgICAgICAgcXVldWUgPSBjdXJyZW50UXVldWUuY29uY2F0KHF1ZXVlKTtcbiAgICB9IGVsc2Uge1xuICAgICAgICBxdWV1ZUluZGV4ID0gLTE7XG4gICAgfVxuICAgIGlmIChxdWV1ZS5sZW5ndGgpIHtcbiAgICAgICAgZHJhaW5RdWV1ZSgpO1xuICAgIH1cbn1cblxuZnVuY3Rpb24gZHJhaW5RdWV1ZSgpIHtcbiAgICBpZiAoZHJhaW5pbmcpIHtcbiAgICAgICAgcmV0dXJuO1xuICAgIH1cbiAgICB2YXIgdGltZW91dCA9IHNldFRpbWVvdXQoY2xlYW5VcE5leHRUaWNrKTtcbiAgICBkcmFpbmluZyA9IHRydWU7XG5cbiAgICB2YXIgbGVuID0gcXVldWUubGVuZ3RoO1xuICAgIHdoaWxlKGxlbikge1xuICAgICAgICBjdXJyZW50UXVldWUgPSBxdWV1ZTtcbiAgICAgICAgcXVldWUgPSBbXTtcbiAgICAgICAgd2hpbGUgKCsrcXVldWVJbmRleCA8IGxlbikge1xuICAgICAgICAgICAgY3VycmVudFF1ZXVlW3F1ZXVlSW5kZXhdLnJ1bigpO1xuICAgICAgICB9XG4gICAgICAgIHF1ZXVlSW5kZXggPSAtMTtcbiAgICAgICAgbGVuID0gcXVldWUubGVuZ3RoO1xuICAgIH1cbiAgICBjdXJyZW50UXVldWUgPSBudWxsO1xuICAgIGRyYWluaW5nID0gZmFsc2U7XG4gICAgY2xlYXJUaW1lb3V0KHRpbWVvdXQpO1xufVxuXG5wcm9jZXNzLm5leHRUaWNrID0gZnVuY3Rpb24gKGZ1bikge1xuICAgIHZhciBhcmdzID0gbmV3IEFycmF5KGFyZ3VtZW50cy5sZW5ndGggLSAxKTtcbiAgICBpZiAoYXJndW1lbnRzLmxlbmd0aCA+IDEpIHtcbiAgICAgICAgZm9yICh2YXIgaSA9IDE7IGkgPCBhcmd1bWVudHMubGVuZ3RoOyBpKyspIHtcbiAgICAgICAgICAgIGFyZ3NbaSAtIDFdID0gYXJndW1lbnRzW2ldO1xuICAgICAgICB9XG4gICAgfVxuICAgIHF1ZXVlLnB1c2gobmV3IEl0ZW0oZnVuLCBhcmdzKSk7XG4gICAgaWYgKHF1ZXVlLmxlbmd0aCA9PT0gMSAmJiAhZHJhaW5pbmcpIHtcbiAgICAgICAgc2V0VGltZW91dChkcmFpblF1ZXVlLCAwKTtcbiAgICB9XG59O1xuXG4vLyB2OCBsaWtlcyBwcmVkaWN0aWJsZSBvYmplY3RzXG5mdW5jdGlvbiBJdGVtKGZ1biwgYXJyYXkpIHtcbiAgICB0aGlzLmZ1biA9IGZ1bjtcbiAgICB0aGlzLmFycmF5ID0gYXJyYXk7XG59XG5JdGVtLnByb3RvdHlwZS5ydW4gPSBmdW5jdGlvbiAoKSB7XG4gICAgdGhpcy5mdW4uYXBwbHkobnVsbCwgdGhpcy5hcnJheSk7XG59O1xucHJvY2Vzcy50aXRsZSA9ICdicm93c2VyJztcbnByb2Nlc3MuYnJvd3NlciA9IHRydWU7XG5wcm9jZXNzLmVudiA9IHt9O1xucHJvY2Vzcy5hcmd2ID0gW107XG5wcm9jZXNzLnZlcnNpb24gPSAnJzsgLy8gZW1wdHkgc3RyaW5nIHRvIGF2b2lkIHJlZ2V4cCBpc3N1ZXNcbnByb2Nlc3MudmVyc2lvbnMgPSB7fTtcblxuZnVuY3Rpb24gbm9vcCgpIHt9XG5cbnByb2Nlc3Mub24gPSBub29wO1xucHJvY2Vzcy5hZGRMaXN0ZW5lciA9IG5vb3A7XG5wcm9jZXNzLm9uY2UgPSBub29wO1xucHJvY2Vzcy5vZmYgPSBub29wO1xucHJvY2Vzcy5yZW1vdmVMaXN0ZW5lciA9IG5vb3A7XG5wcm9jZXNzLnJlbW92ZUFsbExpc3RlbmVycyA9IG5vb3A7XG5wcm9jZXNzLmVtaXQgPSBub29wO1xuXG5wcm9jZXNzLmJpbmRpbmcgPSBmdW5jdGlvbiAobmFtZSkge1xuICAgIHRocm93IG5ldyBFcnJvcigncHJvY2Vzcy5iaW5kaW5nIGlzIG5vdCBzdXBwb3J0ZWQnKTtcbn07XG5cbi8vIFRPRE8oc2h0eWxtYW4pXG5wcm9jZXNzLmN3ZCA9IGZ1bmN0aW9uICgpIHsgcmV0dXJuICcvJyB9O1xucHJvY2Vzcy5jaGRpciA9IGZ1bmN0aW9uIChkaXIpIHtcbiAgICB0aHJvdyBuZXcgRXJyb3IoJ3Byb2Nlc3MuY2hkaXIgaXMgbm90IHN1cHBvcnRlZCcpO1xufTtcbnByb2Nlc3MudW1hc2sgPSBmdW5jdGlvbigpIHsgcmV0dXJuIDA7IH07XG4iLCJtb2R1bGUuZXhwb3J0cyA9IGZ1bmN0aW9uIGlzQnVmZmVyKGFyZykge1xuICByZXR1cm4gYXJnICYmIHR5cGVvZiBhcmcgPT09ICdvYmplY3QnXG4gICAgJiYgdHlwZW9mIGFyZy5jb3B5ID09PSAnZnVuY3Rpb24nXG4gICAgJiYgdHlwZW9mIGFyZy5maWxsID09PSAnZnVuY3Rpb24nXG4gICAgJiYgdHlwZW9mIGFyZy5yZWFkVUludDggPT09ICdmdW5jdGlvbic7XG59IiwiLy8gQ29weXJpZ2h0IEpveWVudCwgSW5jLiBhbmQgb3RoZXIgTm9kZSBjb250cmlidXRvcnMuXG4vL1xuLy8gUGVybWlzc2lvbiBpcyBoZXJlYnkgZ3JhbnRlZCwgZnJlZSBvZiBjaGFyZ2UsIHRvIGFueSBwZXJzb24gb2J0YWluaW5nIGFcbi8vIGNvcHkgb2YgdGhpcyBzb2Z0d2FyZSBhbmQgYXNzb2NpYXRlZCBkb2N1bWVudGF0aW9uIGZpbGVzICh0aGVcbi8vIFwiU29mdHdhcmVcIiksIHRvIGRlYWwgaW4gdGhlIFNvZnR3YXJlIHdpdGhvdXQgcmVzdHJpY3Rpb24sIGluY2x1ZGluZ1xuLy8gd2l0aG91dCBsaW1pdGF0aW9uIHRoZSByaWdodHMgdG8gdXNlLCBjb3B5LCBtb2RpZnksIG1lcmdlLCBwdWJsaXNoLFxuLy8gZGlzdHJpYnV0ZSwgc3VibGljZW5zZSwgYW5kL29yIHNlbGwgY29waWVzIG9mIHRoZSBTb2Z0d2FyZSwgYW5kIHRvIHBlcm1pdFxuLy8gcGVyc29ucyB0byB3aG9tIHRoZSBTb2Z0d2FyZSBpcyBmdXJuaXNoZWQgdG8gZG8gc28sIHN1YmplY3QgdG8gdGhlXG4vLyBmb2xsb3dpbmcgY29uZGl0aW9uczpcbi8vXG4vLyBUaGUgYWJvdmUgY29weXJpZ2h0IG5vdGljZSBhbmQgdGhpcyBwZXJtaXNzaW9uIG5vdGljZSBzaGFsbCBiZSBpbmNsdWRlZFxuLy8gaW4gYWxsIGNvcGllcyBvciBzdWJzdGFudGlhbCBwb3J0aW9ucyBvZiB0aGUgU29mdHdhcmUuXG4vL1xuLy8gVEhFIFNPRlRXQVJFIElTIFBST1ZJREVEIFwiQVMgSVNcIiwgV0lUSE9VVCBXQVJSQU5UWSBPRiBBTlkgS0lORCwgRVhQUkVTU1xuLy8gT1IgSU1QTElFRCwgSU5DTFVESU5HIEJVVCBOT1QgTElNSVRFRCBUTyBUSEUgV0FSUkFOVElFUyBPRlxuLy8gTUVSQ0hBTlRBQklMSVRZLCBGSVRORVNTIEZPUiBBIFBBUlRJQ1VMQVIgUFVSUE9TRSBBTkQgTk9OSU5GUklOR0VNRU5ULiBJTlxuLy8gTk8gRVZFTlQgU0hBTEwgVEhFIEFVVEhPUlMgT1IgQ09QWVJJR0hUIEhPTERFUlMgQkUgTElBQkxFIEZPUiBBTlkgQ0xBSU0sXG4vLyBEQU1BR0VTIE9SIE9USEVSIExJQUJJTElUWSwgV0hFVEhFUiBJTiBBTiBBQ1RJT04gT0YgQ09OVFJBQ1QsIFRPUlQgT1Jcbi8vIE9USEVSV0lTRSwgQVJJU0lORyBGUk9NLCBPVVQgT0YgT1IgSU4gQ09OTkVDVElPTiBXSVRIIFRIRSBTT0ZUV0FSRSBPUiBUSEVcbi8vIFVTRSBPUiBPVEhFUiBERUFMSU5HUyBJTiBUSEUgU09GVFdBUkUuXG5cbnZhciBmb3JtYXRSZWdFeHAgPSAvJVtzZGolXS9nO1xuZXhwb3J0cy5mb3JtYXQgPSBmdW5jdGlvbihmKSB7XG4gIGlmICghaXNTdHJpbmcoZikpIHtcbiAgICB2YXIgb2JqZWN0cyA9IFtdO1xuICAgIGZvciAodmFyIGkgPSAwOyBpIDwgYXJndW1lbnRzLmxlbmd0aDsgaSsrKSB7XG4gICAgICBvYmplY3RzLnB1c2goaW5zcGVjdChhcmd1bWVudHNbaV0pKTtcbiAgICB9XG4gICAgcmV0dXJuIG9iamVjdHMuam9pbignICcpO1xuICB9XG5cbiAgdmFyIGkgPSAxO1xuICB2YXIgYXJncyA9IGFyZ3VtZW50cztcbiAgdmFyIGxlbiA9IGFyZ3MubGVuZ3RoO1xuICB2YXIgc3RyID0gU3RyaW5nKGYpLnJlcGxhY2UoZm9ybWF0UmVnRXhwLCBmdW5jdGlvbih4KSB7XG4gICAgaWYgKHggPT09ICclJScpIHJldHVybiAnJSc7XG4gICAgaWYgKGkgPj0gbGVuKSByZXR1cm4geDtcbiAgICBzd2l0Y2ggKHgpIHtcbiAgICAgIGNhc2UgJyVzJzogcmV0dXJuIFN0cmluZyhhcmdzW2krK10pO1xuICAgICAgY2FzZSAnJWQnOiByZXR1cm4gTnVtYmVyKGFyZ3NbaSsrXSk7XG4gICAgICBjYXNlICclaic6XG4gICAgICAgIHRyeSB7XG4gICAgICAgICAgcmV0dXJuIEpTT04uc3RyaW5naWZ5KGFyZ3NbaSsrXSk7XG4gICAgICAgIH0gY2F0Y2ggKF8pIHtcbiAgICAgICAgICByZXR1cm4gJ1tDaXJjdWxhcl0nO1xuICAgICAgICB9XG4gICAgICBkZWZhdWx0OlxuICAgICAgICByZXR1cm4geDtcbiAgICB9XG4gIH0pO1xuICBmb3IgKHZhciB4ID0gYXJnc1tpXTsgaSA8IGxlbjsgeCA9IGFyZ3NbKytpXSkge1xuICAgIGlmIChpc051bGwoeCkgfHwgIWlzT2JqZWN0KHgpKSB7XG4gICAgICBzdHIgKz0gJyAnICsgeDtcbiAgICB9IGVsc2Uge1xuICAgICAgc3RyICs9ICcgJyArIGluc3BlY3QoeCk7XG4gICAgfVxuICB9XG4gIHJldHVybiBzdHI7XG59O1xuXG5cbi8vIE1hcmsgdGhhdCBhIG1ldGhvZCBzaG91bGQgbm90IGJlIHVzZWQuXG4vLyBSZXR1cm5zIGEgbW9kaWZpZWQgZnVuY3Rpb24gd2hpY2ggd2FybnMgb25jZSBieSBkZWZhdWx0LlxuLy8gSWYgLS1uby1kZXByZWNhdGlvbiBpcyBzZXQsIHRoZW4gaXQgaXMgYSBuby1vcC5cbmV4cG9ydHMuZGVwcmVjYXRlID0gZnVuY3Rpb24oZm4sIG1zZykge1xuICAvLyBBbGxvdyBmb3IgZGVwcmVjYXRpbmcgdGhpbmdzIGluIHRoZSBwcm9jZXNzIG9mIHN0YXJ0aW5nIHVwLlxuICBpZiAoaXNVbmRlZmluZWQoZ2xvYmFsLnByb2Nlc3MpKSB7XG4gICAgcmV0dXJuIGZ1bmN0aW9uKCkge1xuICAgICAgcmV0dXJuIGV4cG9ydHMuZGVwcmVjYXRlKGZuLCBtc2cpLmFwcGx5KHRoaXMsIGFyZ3VtZW50cyk7XG4gICAgfTtcbiAgfVxuXG4gIGlmIChwcm9jZXNzLm5vRGVwcmVjYXRpb24gPT09IHRydWUpIHtcbiAgICByZXR1cm4gZm47XG4gIH1cblxuICB2YXIgd2FybmVkID0gZmFsc2U7XG4gIGZ1bmN0aW9uIGRlcHJlY2F0ZWQoKSB7XG4gICAgaWYgKCF3YXJuZWQpIHtcbiAgICAgIGlmIChwcm9jZXNzLnRocm93RGVwcmVjYXRpb24pIHtcbiAgICAgICAgdGhyb3cgbmV3IEVycm9yKG1zZyk7XG4gICAgICB9IGVsc2UgaWYgKHByb2Nlc3MudHJhY2VEZXByZWNhdGlvbikge1xuICAgICAgICBjb25zb2xlLnRyYWNlKG1zZyk7XG4gICAgICB9IGVsc2Uge1xuICAgICAgICBjb25zb2xlLmVycm9yKG1zZyk7XG4gICAgICB9XG4gICAgICB3YXJuZWQgPSB0cnVlO1xuICAgIH1cbiAgICByZXR1cm4gZm4uYXBwbHkodGhpcywgYXJndW1lbnRzKTtcbiAgfVxuXG4gIHJldHVybiBkZXByZWNhdGVkO1xufTtcblxuXG52YXIgZGVidWdzID0ge307XG52YXIgZGVidWdFbnZpcm9uO1xuZXhwb3J0cy5kZWJ1Z2xvZyA9IGZ1bmN0aW9uKHNldCkge1xuICBpZiAoaXNVbmRlZmluZWQoZGVidWdFbnZpcm9uKSlcbiAgICBkZWJ1Z0Vudmlyb24gPSBwcm9jZXNzLmVudi5OT0RFX0RFQlVHIHx8ICcnO1xuICBzZXQgPSBzZXQudG9VcHBlckNhc2UoKTtcbiAgaWYgKCFkZWJ1Z3Nbc2V0XSkge1xuICAgIGlmIChuZXcgUmVnRXhwKCdcXFxcYicgKyBzZXQgKyAnXFxcXGInLCAnaScpLnRlc3QoZGVidWdFbnZpcm9uKSkge1xuICAgICAgdmFyIHBpZCA9IHByb2Nlc3MucGlkO1xuICAgICAgZGVidWdzW3NldF0gPSBmdW5jdGlvbigpIHtcbiAgICAgICAgdmFyIG1zZyA9IGV4cG9ydHMuZm9ybWF0LmFwcGx5KGV4cG9ydHMsIGFyZ3VtZW50cyk7XG4gICAgICAgIGNvbnNvbGUuZXJyb3IoJyVzICVkOiAlcycsIHNldCwgcGlkLCBtc2cpO1xuICAgICAgfTtcbiAgICB9IGVsc2Uge1xuICAgICAgZGVidWdzW3NldF0gPSBmdW5jdGlvbigpIHt9O1xuICAgIH1cbiAgfVxuICByZXR1cm4gZGVidWdzW3NldF07XG59O1xuXG5cbi8qKlxuICogRWNob3MgdGhlIHZhbHVlIG9mIGEgdmFsdWUuIFRyeXMgdG8gcHJpbnQgdGhlIHZhbHVlIG91dFxuICogaW4gdGhlIGJlc3Qgd2F5IHBvc3NpYmxlIGdpdmVuIHRoZSBkaWZmZXJlbnQgdHlwZXMuXG4gKlxuICogQHBhcmFtIHtPYmplY3R9IG9iaiBUaGUgb2JqZWN0IHRvIHByaW50IG91dC5cbiAqIEBwYXJhbSB7T2JqZWN0fSBvcHRzIE9wdGlvbmFsIG9wdGlvbnMgb2JqZWN0IHRoYXQgYWx0ZXJzIHRoZSBvdXRwdXQuXG4gKi9cbi8qIGxlZ2FjeTogb2JqLCBzaG93SGlkZGVuLCBkZXB0aCwgY29sb3JzKi9cbmZ1bmN0aW9uIGluc3BlY3Qob2JqLCBvcHRzKSB7XG4gIC8vIGRlZmF1bHQgb3B0aW9uc1xuICB2YXIgY3R4ID0ge1xuICAgIHNlZW46IFtdLFxuICAgIHN0eWxpemU6IHN0eWxpemVOb0NvbG9yXG4gIH07XG4gIC8vIGxlZ2FjeS4uLlxuICBpZiAoYXJndW1lbnRzLmxlbmd0aCA+PSAzKSBjdHguZGVwdGggPSBhcmd1bWVudHNbMl07XG4gIGlmIChhcmd1bWVudHMubGVuZ3RoID49IDQpIGN0eC5jb2xvcnMgPSBhcmd1bWVudHNbM107XG4gIGlmIChpc0Jvb2xlYW4ob3B0cykpIHtcbiAgICAvLyBsZWdhY3kuLi5cbiAgICBjdHguc2hvd0hpZGRlbiA9IG9wdHM7XG4gIH0gZWxzZSBpZiAob3B0cykge1xuICAgIC8vIGdvdCBhbiBcIm9wdGlvbnNcIiBvYmplY3RcbiAgICBleHBvcnRzLl9leHRlbmQoY3R4LCBvcHRzKTtcbiAgfVxuICAvLyBzZXQgZGVmYXVsdCBvcHRpb25zXG4gIGlmIChpc1VuZGVmaW5lZChjdHguc2hvd0hpZGRlbikpIGN0eC5zaG93SGlkZGVuID0gZmFsc2U7XG4gIGlmIChpc1VuZGVmaW5lZChjdHguZGVwdGgpKSBjdHguZGVwdGggPSAyO1xuICBpZiAoaXNVbmRlZmluZWQoY3R4LmNvbG9ycykpIGN0eC5jb2xvcnMgPSBmYWxzZTtcbiAgaWYgKGlzVW5kZWZpbmVkKGN0eC5jdXN0b21JbnNwZWN0KSkgY3R4LmN1c3RvbUluc3BlY3QgPSB0cnVlO1xuICBpZiAoY3R4LmNvbG9ycykgY3R4LnN0eWxpemUgPSBzdHlsaXplV2l0aENvbG9yO1xuICByZXR1cm4gZm9ybWF0VmFsdWUoY3R4LCBvYmosIGN0eC5kZXB0aCk7XG59XG5leHBvcnRzLmluc3BlY3QgPSBpbnNwZWN0O1xuXG5cbi8vIGh0dHA6Ly9lbi53aWtpcGVkaWEub3JnL3dpa2kvQU5TSV9lc2NhcGVfY29kZSNncmFwaGljc1xuaW5zcGVjdC5jb2xvcnMgPSB7XG4gICdib2xkJyA6IFsxLCAyMl0sXG4gICdpdGFsaWMnIDogWzMsIDIzXSxcbiAgJ3VuZGVybGluZScgOiBbNCwgMjRdLFxuICAnaW52ZXJzZScgOiBbNywgMjddLFxuICAnd2hpdGUnIDogWzM3LCAzOV0sXG4gICdncmV5JyA6IFs5MCwgMzldLFxuICAnYmxhY2snIDogWzMwLCAzOV0sXG4gICdibHVlJyA6IFszNCwgMzldLFxuICAnY3lhbicgOiBbMzYsIDM5XSxcbiAgJ2dyZWVuJyA6IFszMiwgMzldLFxuICAnbWFnZW50YScgOiBbMzUsIDM5XSxcbiAgJ3JlZCcgOiBbMzEsIDM5XSxcbiAgJ3llbGxvdycgOiBbMzMsIDM5XVxufTtcblxuLy8gRG9uJ3QgdXNlICdibHVlJyBub3QgdmlzaWJsZSBvbiBjbWQuZXhlXG5pbnNwZWN0LnN0eWxlcyA9IHtcbiAgJ3NwZWNpYWwnOiAnY3lhbicsXG4gICdudW1iZXInOiAneWVsbG93JyxcbiAgJ2Jvb2xlYW4nOiAneWVsbG93JyxcbiAgJ3VuZGVmaW5lZCc6ICdncmV5JyxcbiAgJ251bGwnOiAnYm9sZCcsXG4gICdzdHJpbmcnOiAnZ3JlZW4nLFxuICAnZGF0ZSc6ICdtYWdlbnRhJyxcbiAgLy8gXCJuYW1lXCI6IGludGVudGlvbmFsbHkgbm90IHN0eWxpbmdcbiAgJ3JlZ2V4cCc6ICdyZWQnXG59O1xuXG5cbmZ1bmN0aW9uIHN0eWxpemVXaXRoQ29sb3Ioc3RyLCBzdHlsZVR5cGUpIHtcbiAgdmFyIHN0eWxlID0gaW5zcGVjdC5zdHlsZXNbc3R5bGVUeXBlXTtcblxuICBpZiAoc3R5bGUpIHtcbiAgICByZXR1cm4gJ1xcdTAwMWJbJyArIGluc3BlY3QuY29sb3JzW3N0eWxlXVswXSArICdtJyArIHN0ciArXG4gICAgICAgICAgICdcXHUwMDFiWycgKyBpbnNwZWN0LmNvbG9yc1tzdHlsZV1bMV0gKyAnbSc7XG4gIH0gZWxzZSB7XG4gICAgcmV0dXJuIHN0cjtcbiAgfVxufVxuXG5cbmZ1bmN0aW9uIHN0eWxpemVOb0NvbG9yKHN0ciwgc3R5bGVUeXBlKSB7XG4gIHJldHVybiBzdHI7XG59XG5cblxuZnVuY3Rpb24gYXJyYXlUb0hhc2goYXJyYXkpIHtcbiAgdmFyIGhhc2ggPSB7fTtcblxuICBhcnJheS5mb3JFYWNoKGZ1bmN0aW9uKHZhbCwgaWR4KSB7XG4gICAgaGFzaFt2YWxdID0gdHJ1ZTtcbiAgfSk7XG5cbiAgcmV0dXJuIGhhc2g7XG59XG5cblxuZnVuY3Rpb24gZm9ybWF0VmFsdWUoY3R4LCB2YWx1ZSwgcmVjdXJzZVRpbWVzKSB7XG4gIC8vIFByb3ZpZGUgYSBob29rIGZvciB1c2VyLXNwZWNpZmllZCBpbnNwZWN0IGZ1bmN0aW9ucy5cbiAgLy8gQ2hlY2sgdGhhdCB2YWx1ZSBpcyBhbiBvYmplY3Qgd2l0aCBhbiBpbnNwZWN0IGZ1bmN0aW9uIG9uIGl0XG4gIGlmIChjdHguY3VzdG9tSW5zcGVjdCAmJlxuICAgICAgdmFsdWUgJiZcbiAgICAgIGlzRnVuY3Rpb24odmFsdWUuaW5zcGVjdCkgJiZcbiAgICAgIC8vIEZpbHRlciBvdXQgdGhlIHV0aWwgbW9kdWxlLCBpdCdzIGluc3BlY3QgZnVuY3Rpb24gaXMgc3BlY2lhbFxuICAgICAgdmFsdWUuaW5zcGVjdCAhPT0gZXhwb3J0cy5pbnNwZWN0ICYmXG4gICAgICAvLyBBbHNvIGZpbHRlciBvdXQgYW55IHByb3RvdHlwZSBvYmplY3RzIHVzaW5nIHRoZSBjaXJjdWxhciBjaGVjay5cbiAgICAgICEodmFsdWUuY29uc3RydWN0b3IgJiYgdmFsdWUuY29uc3RydWN0b3IucHJvdG90eXBlID09PSB2YWx1ZSkpIHtcbiAgICB2YXIgcmV0ID0gdmFsdWUuaW5zcGVjdChyZWN1cnNlVGltZXMsIGN0eCk7XG4gICAgaWYgKCFpc1N0cmluZyhyZXQpKSB7XG4gICAgICByZXQgPSBmb3JtYXRWYWx1ZShjdHgsIHJldCwgcmVjdXJzZVRpbWVzKTtcbiAgICB9XG4gICAgcmV0dXJuIHJldDtcbiAgfVxuXG4gIC8vIFByaW1pdGl2ZSB0eXBlcyBjYW5ub3QgaGF2ZSBwcm9wZXJ0aWVzXG4gIHZhciBwcmltaXRpdmUgPSBmb3JtYXRQcmltaXRpdmUoY3R4LCB2YWx1ZSk7XG4gIGlmIChwcmltaXRpdmUpIHtcbiAgICByZXR1cm4gcHJpbWl0aXZlO1xuICB9XG5cbiAgLy8gTG9vayB1cCB0aGUga2V5cyBvZiB0aGUgb2JqZWN0LlxuICB2YXIga2V5cyA9IE9iamVjdC5rZXlzKHZhbHVlKTtcbiAgdmFyIHZpc2libGVLZXlzID0gYXJyYXlUb0hhc2goa2V5cyk7XG5cbiAgaWYgKGN0eC5zaG93SGlkZGVuKSB7XG4gICAga2V5cyA9IE9iamVjdC5nZXRPd25Qcm9wZXJ0eU5hbWVzKHZhbHVlKTtcbiAgfVxuXG4gIC8vIElFIGRvZXNuJ3QgbWFrZSBlcnJvciBmaWVsZHMgbm9uLWVudW1lcmFibGVcbiAgLy8gaHR0cDovL21zZG4ubWljcm9zb2Z0LmNvbS9lbi11cy9saWJyYXJ5L2llL2R3dzUyc2J0KHY9dnMuOTQpLmFzcHhcbiAgaWYgKGlzRXJyb3IodmFsdWUpXG4gICAgICAmJiAoa2V5cy5pbmRleE9mKCdtZXNzYWdlJykgPj0gMCB8fCBrZXlzLmluZGV4T2YoJ2Rlc2NyaXB0aW9uJykgPj0gMCkpIHtcbiAgICByZXR1cm4gZm9ybWF0RXJyb3IodmFsdWUpO1xuICB9XG5cbiAgLy8gU29tZSB0eXBlIG9mIG9iamVjdCB3aXRob3V0IHByb3BlcnRpZXMgY2FuIGJlIHNob3J0Y3V0dGVkLlxuICBpZiAoa2V5cy5sZW5ndGggPT09IDApIHtcbiAgICBpZiAoaXNGdW5jdGlvbih2YWx1ZSkpIHtcbiAgICAgIHZhciBuYW1lID0gdmFsdWUubmFtZSA/ICc6ICcgKyB2YWx1ZS5uYW1lIDogJyc7XG4gICAgICByZXR1cm4gY3R4LnN0eWxpemUoJ1tGdW5jdGlvbicgKyBuYW1lICsgJ10nLCAnc3BlY2lhbCcpO1xuICAgIH1cbiAgICBpZiAoaXNSZWdFeHAodmFsdWUpKSB7XG4gICAgICByZXR1cm4gY3R4LnN0eWxpemUoUmVnRXhwLnByb3RvdHlwZS50b1N0cmluZy5jYWxsKHZhbHVlKSwgJ3JlZ2V4cCcpO1xuICAgIH1cbiAgICBpZiAoaXNEYXRlKHZhbHVlKSkge1xuICAgICAgcmV0dXJuIGN0eC5zdHlsaXplKERhdGUucHJvdG90eXBlLnRvU3RyaW5nLmNhbGwodmFsdWUpLCAnZGF0ZScpO1xuICAgIH1cbiAgICBpZiAoaXNFcnJvcih2YWx1ZSkpIHtcbiAgICAgIHJldHVybiBmb3JtYXRFcnJvcih2YWx1ZSk7XG4gICAgfVxuICB9XG5cbiAgdmFyIGJhc2UgPSAnJywgYXJyYXkgPSBmYWxzZSwgYnJhY2VzID0gWyd7JywgJ30nXTtcblxuICAvLyBNYWtlIEFycmF5IHNheSB0aGF0IHRoZXkgYXJlIEFycmF5XG4gIGlmIChpc0FycmF5KHZhbHVlKSkge1xuICAgIGFycmF5ID0gdHJ1ZTtcbiAgICBicmFjZXMgPSBbJ1snLCAnXSddO1xuICB9XG5cbiAgLy8gTWFrZSBmdW5jdGlvbnMgc2F5IHRoYXQgdGhleSBhcmUgZnVuY3Rpb25zXG4gIGlmIChpc0Z1bmN0aW9uKHZhbHVlKSkge1xuICAgIHZhciBuID0gdmFsdWUubmFtZSA/ICc6ICcgKyB2YWx1ZS5uYW1lIDogJyc7XG4gICAgYmFzZSA9ICcgW0Z1bmN0aW9uJyArIG4gKyAnXSc7XG4gIH1cblxuICAvLyBNYWtlIFJlZ0V4cHMgc2F5IHRoYXQgdGhleSBhcmUgUmVnRXhwc1xuICBpZiAoaXNSZWdFeHAodmFsdWUpKSB7XG4gICAgYmFzZSA9ICcgJyArIFJlZ0V4cC5wcm90b3R5cGUudG9TdHJpbmcuY2FsbCh2YWx1ZSk7XG4gIH1cblxuICAvLyBNYWtlIGRhdGVzIHdpdGggcHJvcGVydGllcyBmaXJzdCBzYXkgdGhlIGRhdGVcbiAgaWYgKGlzRGF0ZSh2YWx1ZSkpIHtcbiAgICBiYXNlID0gJyAnICsgRGF0ZS5wcm90b3R5cGUudG9VVENTdHJpbmcuY2FsbCh2YWx1ZSk7XG4gIH1cblxuICAvLyBNYWtlIGVycm9yIHdpdGggbWVzc2FnZSBmaXJzdCBzYXkgdGhlIGVycm9yXG4gIGlmIChpc0Vycm9yKHZhbHVlKSkge1xuICAgIGJhc2UgPSAnICcgKyBmb3JtYXRFcnJvcih2YWx1ZSk7XG4gIH1cblxuICBpZiAoa2V5cy5sZW5ndGggPT09IDAgJiYgKCFhcnJheSB8fCB2YWx1ZS5sZW5ndGggPT0gMCkpIHtcbiAgICByZXR1cm4gYnJhY2VzWzBdICsgYmFzZSArIGJyYWNlc1sxXTtcbiAgfVxuXG4gIGlmIChyZWN1cnNlVGltZXMgPCAwKSB7XG4gICAgaWYgKGlzUmVnRXhwKHZhbHVlKSkge1xuICAgICAgcmV0dXJuIGN0eC5zdHlsaXplKFJlZ0V4cC5wcm90b3R5cGUudG9TdHJpbmcuY2FsbCh2YWx1ZSksICdyZWdleHAnKTtcbiAgICB9IGVsc2Uge1xuICAgICAgcmV0dXJuIGN0eC5zdHlsaXplKCdbT2JqZWN0XScsICdzcGVjaWFsJyk7XG4gICAgfVxuICB9XG5cbiAgY3R4LnNlZW4ucHVzaCh2YWx1ZSk7XG5cbiAgdmFyIG91dHB1dDtcbiAgaWYgKGFycmF5KSB7XG4gICAgb3V0cHV0ID0gZm9ybWF0QXJyYXkoY3R4LCB2YWx1ZSwgcmVjdXJzZVRpbWVzLCB2aXNpYmxlS2V5cywga2V5cyk7XG4gIH0gZWxzZSB7XG4gICAgb3V0cHV0ID0ga2V5cy5tYXAoZnVuY3Rpb24oa2V5KSB7XG4gICAgICByZXR1cm4gZm9ybWF0UHJvcGVydHkoY3R4LCB2YWx1ZSwgcmVjdXJzZVRpbWVzLCB2aXNpYmxlS2V5cywga2V5LCBhcnJheSk7XG4gICAgfSk7XG4gIH1cblxuICBjdHguc2Vlbi5wb3AoKTtcblxuICByZXR1cm4gcmVkdWNlVG9TaW5nbGVTdHJpbmcob3V0cHV0LCBiYXNlLCBicmFjZXMpO1xufVxuXG5cbmZ1bmN0aW9uIGZvcm1hdFByaW1pdGl2ZShjdHgsIHZhbHVlKSB7XG4gIGlmIChpc1VuZGVmaW5lZCh2YWx1ZSkpXG4gICAgcmV0dXJuIGN0eC5zdHlsaXplKCd1bmRlZmluZWQnLCAndW5kZWZpbmVkJyk7XG4gIGlmIChpc1N0cmluZyh2YWx1ZSkpIHtcbiAgICB2YXIgc2ltcGxlID0gJ1xcJycgKyBKU09OLnN0cmluZ2lmeSh2YWx1ZSkucmVwbGFjZSgvXlwifFwiJC9nLCAnJylcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIC5yZXBsYWNlKC8nL2csIFwiXFxcXCdcIilcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIC5yZXBsYWNlKC9cXFxcXCIvZywgJ1wiJykgKyAnXFwnJztcbiAgICByZXR1cm4gY3R4LnN0eWxpemUoc2ltcGxlLCAnc3RyaW5nJyk7XG4gIH1cbiAgaWYgKGlzTnVtYmVyKHZhbHVlKSlcbiAgICByZXR1cm4gY3R4LnN0eWxpemUoJycgKyB2YWx1ZSwgJ251bWJlcicpO1xuICBpZiAoaXNCb29sZWFuKHZhbHVlKSlcbiAgICByZXR1cm4gY3R4LnN0eWxpemUoJycgKyB2YWx1ZSwgJ2Jvb2xlYW4nKTtcbiAgLy8gRm9yIHNvbWUgcmVhc29uIHR5cGVvZiBudWxsIGlzIFwib2JqZWN0XCIsIHNvIHNwZWNpYWwgY2FzZSBoZXJlLlxuICBpZiAoaXNOdWxsKHZhbHVlKSlcbiAgICByZXR1cm4gY3R4LnN0eWxpemUoJ251bGwnLCAnbnVsbCcpO1xufVxuXG5cbmZ1bmN0aW9uIGZvcm1hdEVycm9yKHZhbHVlKSB7XG4gIHJldHVybiAnWycgKyBFcnJvci5wcm90b3R5cGUudG9TdHJpbmcuY2FsbCh2YWx1ZSkgKyAnXSc7XG59XG5cblxuZnVuY3Rpb24gZm9ybWF0QXJyYXkoY3R4LCB2YWx1ZSwgcmVjdXJzZVRpbWVzLCB2aXNpYmxlS2V5cywga2V5cykge1xuICB2YXIgb3V0cHV0ID0gW107XG4gIGZvciAodmFyIGkgPSAwLCBsID0gdmFsdWUubGVuZ3RoOyBpIDwgbDsgKytpKSB7XG4gICAgaWYgKGhhc093blByb3BlcnR5KHZhbHVlLCBTdHJpbmcoaSkpKSB7XG4gICAgICBvdXRwdXQucHVzaChmb3JtYXRQcm9wZXJ0eShjdHgsIHZhbHVlLCByZWN1cnNlVGltZXMsIHZpc2libGVLZXlzLFxuICAgICAgICAgIFN0cmluZyhpKSwgdHJ1ZSkpO1xuICAgIH0gZWxzZSB7XG4gICAgICBvdXRwdXQucHVzaCgnJyk7XG4gICAgfVxuICB9XG4gIGtleXMuZm9yRWFjaChmdW5jdGlvbihrZXkpIHtcbiAgICBpZiAoIWtleS5tYXRjaCgvXlxcZCskLykpIHtcbiAgICAgIG91dHB1dC5wdXNoKGZvcm1hdFByb3BlcnR5KGN0eCwgdmFsdWUsIHJlY3Vyc2VUaW1lcywgdmlzaWJsZUtleXMsXG4gICAgICAgICAga2V5LCB0cnVlKSk7XG4gICAgfVxuICB9KTtcbiAgcmV0dXJuIG91dHB1dDtcbn1cblxuXG5mdW5jdGlvbiBmb3JtYXRQcm9wZXJ0eShjdHgsIHZhbHVlLCByZWN1cnNlVGltZXMsIHZpc2libGVLZXlzLCBrZXksIGFycmF5KSB7XG4gIHZhciBuYW1lLCBzdHIsIGRlc2M7XG4gIGRlc2MgPSBPYmplY3QuZ2V0T3duUHJvcGVydHlEZXNjcmlwdG9yKHZhbHVlLCBrZXkpIHx8IHsgdmFsdWU6IHZhbHVlW2tleV0gfTtcbiAgaWYgKGRlc2MuZ2V0KSB7XG4gICAgaWYgKGRlc2Muc2V0KSB7XG4gICAgICBzdHIgPSBjdHguc3R5bGl6ZSgnW0dldHRlci9TZXR0ZXJdJywgJ3NwZWNpYWwnKTtcbiAgICB9IGVsc2Uge1xuICAgICAgc3RyID0gY3R4LnN0eWxpemUoJ1tHZXR0ZXJdJywgJ3NwZWNpYWwnKTtcbiAgICB9XG4gIH0gZWxzZSB7XG4gICAgaWYgKGRlc2Muc2V0KSB7XG4gICAgICBzdHIgPSBjdHguc3R5bGl6ZSgnW1NldHRlcl0nLCAnc3BlY2lhbCcpO1xuICAgIH1cbiAgfVxuICBpZiAoIWhhc093blByb3BlcnR5KHZpc2libGVLZXlzLCBrZXkpKSB7XG4gICAgbmFtZSA9ICdbJyArIGtleSArICddJztcbiAgfVxuICBpZiAoIXN0cikge1xuICAgIGlmIChjdHguc2Vlbi5pbmRleE9mKGRlc2MudmFsdWUpIDwgMCkge1xuICAgICAgaWYgKGlzTnVsbChyZWN1cnNlVGltZXMpKSB7XG4gICAgICAgIHN0ciA9IGZvcm1hdFZhbHVlKGN0eCwgZGVzYy52YWx1ZSwgbnVsbCk7XG4gICAgICB9IGVsc2Uge1xuICAgICAgICBzdHIgPSBmb3JtYXRWYWx1ZShjdHgsIGRlc2MudmFsdWUsIHJlY3Vyc2VUaW1lcyAtIDEpO1xuICAgICAgfVxuICAgICAgaWYgKHN0ci5pbmRleE9mKCdcXG4nKSA+IC0xKSB7XG4gICAgICAgIGlmIChhcnJheSkge1xuICAgICAgICAgIHN0ciA9IHN0ci5zcGxpdCgnXFxuJykubWFwKGZ1bmN0aW9uKGxpbmUpIHtcbiAgICAgICAgICAgIHJldHVybiAnICAnICsgbGluZTtcbiAgICAgICAgICB9KS5qb2luKCdcXG4nKS5zdWJzdHIoMik7XG4gICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgc3RyID0gJ1xcbicgKyBzdHIuc3BsaXQoJ1xcbicpLm1hcChmdW5jdGlvbihsaW5lKSB7XG4gICAgICAgICAgICByZXR1cm4gJyAgICcgKyBsaW5lO1xuICAgICAgICAgIH0pLmpvaW4oJ1xcbicpO1xuICAgICAgICB9XG4gICAgICB9XG4gICAgfSBlbHNlIHtcbiAgICAgIHN0ciA9IGN0eC5zdHlsaXplKCdbQ2lyY3VsYXJdJywgJ3NwZWNpYWwnKTtcbiAgICB9XG4gIH1cbiAgaWYgKGlzVW5kZWZpbmVkKG5hbWUpKSB7XG4gICAgaWYgKGFycmF5ICYmIGtleS5tYXRjaCgvXlxcZCskLykpIHtcbiAgICAgIHJldHVybiBzdHI7XG4gICAgfVxuICAgIG5hbWUgPSBKU09OLnN0cmluZ2lmeSgnJyArIGtleSk7XG4gICAgaWYgKG5hbWUubWF0Y2goL15cIihbYS16QS1aX11bYS16QS1aXzAtOV0qKVwiJC8pKSB7XG4gICAgICBuYW1lID0gbmFtZS5zdWJzdHIoMSwgbmFtZS5sZW5ndGggLSAyKTtcbiAgICAgIG5hbWUgPSBjdHguc3R5bGl6ZShuYW1lLCAnbmFtZScpO1xuICAgIH0gZWxzZSB7XG4gICAgICBuYW1lID0gbmFtZS5yZXBsYWNlKC8nL2csIFwiXFxcXCdcIilcbiAgICAgICAgICAgICAgICAgLnJlcGxhY2UoL1xcXFxcIi9nLCAnXCInKVxuICAgICAgICAgICAgICAgICAucmVwbGFjZSgvKF5cInxcIiQpL2csIFwiJ1wiKTtcbiAgICAgIG5hbWUgPSBjdHguc3R5bGl6ZShuYW1lLCAnc3RyaW5nJyk7XG4gICAgfVxuICB9XG5cbiAgcmV0dXJuIG5hbWUgKyAnOiAnICsgc3RyO1xufVxuXG5cbmZ1bmN0aW9uIHJlZHVjZVRvU2luZ2xlU3RyaW5nKG91dHB1dCwgYmFzZSwgYnJhY2VzKSB7XG4gIHZhciBudW1MaW5lc0VzdCA9IDA7XG4gIHZhciBsZW5ndGggPSBvdXRwdXQucmVkdWNlKGZ1bmN0aW9uKHByZXYsIGN1cikge1xuICAgIG51bUxpbmVzRXN0Kys7XG4gICAgaWYgKGN1ci5pbmRleE9mKCdcXG4nKSA+PSAwKSBudW1MaW5lc0VzdCsrO1xuICAgIHJldHVybiBwcmV2ICsgY3VyLnJlcGxhY2UoL1xcdTAwMWJcXFtcXGRcXGQ/bS9nLCAnJykubGVuZ3RoICsgMTtcbiAgfSwgMCk7XG5cbiAgaWYgKGxlbmd0aCA+IDYwKSB7XG4gICAgcmV0dXJuIGJyYWNlc1swXSArXG4gICAgICAgICAgIChiYXNlID09PSAnJyA/ICcnIDogYmFzZSArICdcXG4gJykgK1xuICAgICAgICAgICAnICcgK1xuICAgICAgICAgICBvdXRwdXQuam9pbignLFxcbiAgJykgK1xuICAgICAgICAgICAnICcgK1xuICAgICAgICAgICBicmFjZXNbMV07XG4gIH1cblxuICByZXR1cm4gYnJhY2VzWzBdICsgYmFzZSArICcgJyArIG91dHB1dC5qb2luKCcsICcpICsgJyAnICsgYnJhY2VzWzFdO1xufVxuXG5cbi8vIE5PVEU6IFRoZXNlIHR5cGUgY2hlY2tpbmcgZnVuY3Rpb25zIGludGVudGlvbmFsbHkgZG9uJ3QgdXNlIGBpbnN0YW5jZW9mYFxuLy8gYmVjYXVzZSBpdCBpcyBmcmFnaWxlIGFuZCBjYW4gYmUgZWFzaWx5IGZha2VkIHdpdGggYE9iamVjdC5jcmVhdGUoKWAuXG5mdW5jdGlvbiBpc0FycmF5KGFyKSB7XG4gIHJldHVybiBBcnJheS5pc0FycmF5KGFyKTtcbn1cbmV4cG9ydHMuaXNBcnJheSA9IGlzQXJyYXk7XG5cbmZ1bmN0aW9uIGlzQm9vbGVhbihhcmcpIHtcbiAgcmV0dXJuIHR5cGVvZiBhcmcgPT09ICdib29sZWFuJztcbn1cbmV4cG9ydHMuaXNCb29sZWFuID0gaXNCb29sZWFuO1xuXG5mdW5jdGlvbiBpc051bGwoYXJnKSB7XG4gIHJldHVybiBhcmcgPT09IG51bGw7XG59XG5leHBvcnRzLmlzTnVsbCA9IGlzTnVsbDtcblxuZnVuY3Rpb24gaXNOdWxsT3JVbmRlZmluZWQoYXJnKSB7XG4gIHJldHVybiBhcmcgPT0gbnVsbDtcbn1cbmV4cG9ydHMuaXNOdWxsT3JVbmRlZmluZWQgPSBpc051bGxPclVuZGVmaW5lZDtcblxuZnVuY3Rpb24gaXNOdW1iZXIoYXJnKSB7XG4gIHJldHVybiB0eXBlb2YgYXJnID09PSAnbnVtYmVyJztcbn1cbmV4cG9ydHMuaXNOdW1iZXIgPSBpc051bWJlcjtcblxuZnVuY3Rpb24gaXNTdHJpbmcoYXJnKSB7XG4gIHJldHVybiB0eXBlb2YgYXJnID09PSAnc3RyaW5nJztcbn1cbmV4cG9ydHMuaXNTdHJpbmcgPSBpc1N0cmluZztcblxuZnVuY3Rpb24gaXNTeW1ib2woYXJnKSB7XG4gIHJldHVybiB0eXBlb2YgYXJnID09PSAnc3ltYm9sJztcbn1cbmV4cG9ydHMuaXNTeW1ib2wgPSBpc1N5bWJvbDtcblxuZnVuY3Rpb24gaXNVbmRlZmluZWQoYXJnKSB7XG4gIHJldHVybiBhcmcgPT09IHZvaWQgMDtcbn1cbmV4cG9ydHMuaXNVbmRlZmluZWQgPSBpc1VuZGVmaW5lZDtcblxuZnVuY3Rpb24gaXNSZWdFeHAocmUpIHtcbiAgcmV0dXJuIGlzT2JqZWN0KHJlKSAmJiBvYmplY3RUb1N0cmluZyhyZSkgPT09ICdbb2JqZWN0IFJlZ0V4cF0nO1xufVxuZXhwb3J0cy5pc1JlZ0V4cCA9IGlzUmVnRXhwO1xuXG5mdW5jdGlvbiBpc09iamVjdChhcmcpIHtcbiAgcmV0dXJuIHR5cGVvZiBhcmcgPT09ICdvYmplY3QnICYmIGFyZyAhPT0gbnVsbDtcbn1cbmV4cG9ydHMuaXNPYmplY3QgPSBpc09iamVjdDtcblxuZnVuY3Rpb24gaXNEYXRlKGQpIHtcbiAgcmV0dXJuIGlzT2JqZWN0KGQpICYmIG9iamVjdFRvU3RyaW5nKGQpID09PSAnW29iamVjdCBEYXRlXSc7XG59XG5leHBvcnRzLmlzRGF0ZSA9IGlzRGF0ZTtcblxuZnVuY3Rpb24gaXNFcnJvcihlKSB7XG4gIHJldHVybiBpc09iamVjdChlKSAmJlxuICAgICAgKG9iamVjdFRvU3RyaW5nKGUpID09PSAnW29iamVjdCBFcnJvcl0nIHx8IGUgaW5zdGFuY2VvZiBFcnJvcik7XG59XG5leHBvcnRzLmlzRXJyb3IgPSBpc0Vycm9yO1xuXG5mdW5jdGlvbiBpc0Z1bmN0aW9uKGFyZykge1xuICByZXR1cm4gdHlwZW9mIGFyZyA9PT0gJ2Z1bmN0aW9uJztcbn1cbmV4cG9ydHMuaXNGdW5jdGlvbiA9IGlzRnVuY3Rpb247XG5cbmZ1bmN0aW9uIGlzUHJpbWl0aXZlKGFyZykge1xuICByZXR1cm4gYXJnID09PSBudWxsIHx8XG4gICAgICAgICB0eXBlb2YgYXJnID09PSAnYm9vbGVhbicgfHxcbiAgICAgICAgIHR5cGVvZiBhcmcgPT09ICdudW1iZXInIHx8XG4gICAgICAgICB0eXBlb2YgYXJnID09PSAnc3RyaW5nJyB8fFxuICAgICAgICAgdHlwZW9mIGFyZyA9PT0gJ3N5bWJvbCcgfHwgIC8vIEVTNiBzeW1ib2xcbiAgICAgICAgIHR5cGVvZiBhcmcgPT09ICd1bmRlZmluZWQnO1xufVxuZXhwb3J0cy5pc1ByaW1pdGl2ZSA9IGlzUHJpbWl0aXZlO1xuXG5leHBvcnRzLmlzQnVmZmVyID0gcmVxdWlyZSgnLi9zdXBwb3J0L2lzQnVmZmVyJyk7XG5cbmZ1bmN0aW9uIG9iamVjdFRvU3RyaW5nKG8pIHtcbiAgcmV0dXJuIE9iamVjdC5wcm90b3R5cGUudG9TdHJpbmcuY2FsbChvKTtcbn1cblxuXG5mdW5jdGlvbiBwYWQobikge1xuICByZXR1cm4gbiA8IDEwID8gJzAnICsgbi50b1N0cmluZygxMCkgOiBuLnRvU3RyaW5nKDEwKTtcbn1cblxuXG52YXIgbW9udGhzID0gWydKYW4nLCAnRmViJywgJ01hcicsICdBcHInLCAnTWF5JywgJ0p1bicsICdKdWwnLCAnQXVnJywgJ1NlcCcsXG4gICAgICAgICAgICAgICdPY3QnLCAnTm92JywgJ0RlYyddO1xuXG4vLyAyNiBGZWIgMTY6MTk6MzRcbmZ1bmN0aW9uIHRpbWVzdGFtcCgpIHtcbiAgdmFyIGQgPSBuZXcgRGF0ZSgpO1xuICB2YXIgdGltZSA9IFtwYWQoZC5nZXRIb3VycygpKSxcbiAgICAgICAgICAgICAgcGFkKGQuZ2V0TWludXRlcygpKSxcbiAgICAgICAgICAgICAgcGFkKGQuZ2V0U2Vjb25kcygpKV0uam9pbignOicpO1xuICByZXR1cm4gW2QuZ2V0RGF0ZSgpLCBtb250aHNbZC5nZXRNb250aCgpXSwgdGltZV0uam9pbignICcpO1xufVxuXG5cbi8vIGxvZyBpcyBqdXN0IGEgdGhpbiB3cmFwcGVyIHRvIGNvbnNvbGUubG9nIHRoYXQgcHJlcGVuZHMgYSB0aW1lc3RhbXBcbmV4cG9ydHMubG9nID0gZnVuY3Rpb24oKSB7XG4gIGNvbnNvbGUubG9nKCclcyAtICVzJywgdGltZXN0YW1wKCksIGV4cG9ydHMuZm9ybWF0LmFwcGx5KGV4cG9ydHMsIGFyZ3VtZW50cykpO1xufTtcblxuXG4vKipcbiAqIEluaGVyaXQgdGhlIHByb3RvdHlwZSBtZXRob2RzIGZyb20gb25lIGNvbnN0cnVjdG9yIGludG8gYW5vdGhlci5cbiAqXG4gKiBUaGUgRnVuY3Rpb24ucHJvdG90eXBlLmluaGVyaXRzIGZyb20gbGFuZy5qcyByZXdyaXR0ZW4gYXMgYSBzdGFuZGFsb25lXG4gKiBmdW5jdGlvbiAobm90IG9uIEZ1bmN0aW9uLnByb3RvdHlwZSkuIE5PVEU6IElmIHRoaXMgZmlsZSBpcyB0byBiZSBsb2FkZWRcbiAqIGR1cmluZyBib290c3RyYXBwaW5nIHRoaXMgZnVuY3Rpb24gbmVlZHMgdG8gYmUgcmV3cml0dGVuIHVzaW5nIHNvbWUgbmF0aXZlXG4gKiBmdW5jdGlvbnMgYXMgcHJvdG90eXBlIHNldHVwIHVzaW5nIG5vcm1hbCBKYXZhU2NyaXB0IGRvZXMgbm90IHdvcmsgYXNcbiAqIGV4cGVjdGVkIGR1cmluZyBib290c3RyYXBwaW5nIChzZWUgbWlycm9yLmpzIGluIHIxMTQ5MDMpLlxuICpcbiAqIEBwYXJhbSB7ZnVuY3Rpb259IGN0b3IgQ29uc3RydWN0b3IgZnVuY3Rpb24gd2hpY2ggbmVlZHMgdG8gaW5oZXJpdCB0aGVcbiAqICAgICBwcm90b3R5cGUuXG4gKiBAcGFyYW0ge2Z1bmN0aW9ufSBzdXBlckN0b3IgQ29uc3RydWN0b3IgZnVuY3Rpb24gdG8gaW5oZXJpdCBwcm90b3R5cGUgZnJvbS5cbiAqL1xuZXhwb3J0cy5pbmhlcml0cyA9IHJlcXVpcmUoJ2luaGVyaXRzJyk7XG5cbmV4cG9ydHMuX2V4dGVuZCA9IGZ1bmN0aW9uKG9yaWdpbiwgYWRkKSB7XG4gIC8vIERvbid0IGRvIGFueXRoaW5nIGlmIGFkZCBpc24ndCBhbiBvYmplY3RcbiAgaWYgKCFhZGQgfHwgIWlzT2JqZWN0KGFkZCkpIHJldHVybiBvcmlnaW47XG5cbiAgdmFyIGtleXMgPSBPYmplY3Qua2V5cyhhZGQpO1xuICB2YXIgaSA9IGtleXMubGVuZ3RoO1xuICB3aGlsZSAoaS0tKSB7XG4gICAgb3JpZ2luW2tleXNbaV1dID0gYWRkW2tleXNbaV1dO1xuICB9XG4gIHJldHVybiBvcmlnaW47XG59O1xuXG5mdW5jdGlvbiBoYXNPd25Qcm9wZXJ0eShvYmosIHByb3ApIHtcbiAgcmV0dXJuIE9iamVjdC5wcm90b3R5cGUuaGFzT3duUHJvcGVydHkuY2FsbChvYmosIHByb3ApO1xufVxuIiwiLy8gVGVzdHNcbmltcG9ydCBhamF4VGVzdCBmcm9tICcuL2FqYXgtdGVzdCc7XG5pbXBvcnQgZWRpdENzc1Rlc3QgZnJvbSAnLi9lZGl0Y3NzLXRlc3QnO1xuaW1wb3J0IHV0aWxzVGVzdCBmcm9tICcuL3V0aWxzLXRlc3QnO1xuaW1wb3J0IGV2ZW50c1Rlc3QgZnJvbSAnLi9ldmVudHMtdGVzdCc7XG4iXX0=
