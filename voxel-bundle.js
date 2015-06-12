"format register";
System.register("npm:events@1.0.2/events", [], true, function(require, exports, module) {
  var global = System.global,
      __define = global.define;
  global.define = undefined;
  function EventEmitter() {
    this._events = this._events || {};
    this._maxListeners = this._maxListeners || undefined;
  }
  module.exports = EventEmitter;
  EventEmitter.EventEmitter = EventEmitter;
  EventEmitter.prototype._events = undefined;
  EventEmitter.prototype._maxListeners = undefined;
  EventEmitter.defaultMaxListeners = 10;
  EventEmitter.prototype.setMaxListeners = function(n) {
    if (!isNumber(n) || n < 0 || isNaN(n))
      throw TypeError('n must be a positive number');
    this._maxListeners = n;
    return this;
  };
  EventEmitter.prototype.emit = function(type) {
    var er,
        handler,
        len,
        args,
        i,
        listeners;
    if (!this._events)
      this._events = {};
    if (type === 'error') {
      if (!this._events.error || (isObject(this._events.error) && !this._events.error.length)) {
        er = arguments[1];
        if (er instanceof Error) {
          throw er;
        }
        throw TypeError('Uncaught, unspecified "error" event.');
      }
    }
    handler = this._events[type];
    if (isUndefined(handler))
      return false;
    if (isFunction(handler)) {
      switch (arguments.length) {
        case 1:
          handler.call(this);
          break;
        case 2:
          handler.call(this, arguments[1]);
          break;
        case 3:
          handler.call(this, arguments[1], arguments[2]);
          break;
        default:
          len = arguments.length;
          args = new Array(len - 1);
          for (i = 1; i < len; i++)
            args[i - 1] = arguments[i];
          handler.apply(this, args);
      }
    } else if (isObject(handler)) {
      len = arguments.length;
      args = new Array(len - 1);
      for (i = 1; i < len; i++)
        args[i - 1] = arguments[i];
      listeners = handler.slice();
      len = listeners.length;
      for (i = 0; i < len; i++)
        listeners[i].apply(this, args);
    }
    return true;
  };
  EventEmitter.prototype.addListener = function(type, listener) {
    var m;
    if (!isFunction(listener))
      throw TypeError('listener must be a function');
    if (!this._events)
      this._events = {};
    if (this._events.newListener)
      this.emit('newListener', type, isFunction(listener.listener) ? listener.listener : listener);
    if (!this._events[type])
      this._events[type] = listener;
    else if (isObject(this._events[type]))
      this._events[type].push(listener);
    else
      this._events[type] = [this._events[type], listener];
    if (isObject(this._events[type]) && !this._events[type].warned) {
      var m;
      if (!isUndefined(this._maxListeners)) {
        m = this._maxListeners;
      } else {
        m = EventEmitter.defaultMaxListeners;
      }
      if (m && m > 0 && this._events[type].length > m) {
        this._events[type].warned = true;
        console.error('(node) warning: possible EventEmitter memory ' + 'leak detected. %d listeners added. ' + 'Use emitter.setMaxListeners() to increase limit.', this._events[type].length);
        if (typeof console.trace === 'function') {
          console.trace();
        }
      }
    }
    return this;
  };
  EventEmitter.prototype.on = EventEmitter.prototype.addListener;
  EventEmitter.prototype.once = function(type, listener) {
    if (!isFunction(listener))
      throw TypeError('listener must be a function');
    var fired = false;
    function g() {
      this.removeListener(type, g);
      if (!fired) {
        fired = true;
        listener.apply(this, arguments);
      }
    }
    g.listener = listener;
    this.on(type, g);
    return this;
  };
  EventEmitter.prototype.removeListener = function(type, listener) {
    var list,
        position,
        length,
        i;
    if (!isFunction(listener))
      throw TypeError('listener must be a function');
    if (!this._events || !this._events[type])
      return this;
    list = this._events[type];
    length = list.length;
    position = -1;
    if (list === listener || (isFunction(list.listener) && list.listener === listener)) {
      delete this._events[type];
      if (this._events.removeListener)
        this.emit('removeListener', type, listener);
    } else if (isObject(list)) {
      for (i = length; i-- > 0; ) {
        if (list[i] === listener || (list[i].listener && list[i].listener === listener)) {
          position = i;
          break;
        }
      }
      if (position < 0)
        return this;
      if (list.length === 1) {
        list.length = 0;
        delete this._events[type];
      } else {
        list.splice(position, 1);
      }
      if (this._events.removeListener)
        this.emit('removeListener', type, listener);
    }
    return this;
  };
  EventEmitter.prototype.removeAllListeners = function(type) {
    var key,
        listeners;
    if (!this._events)
      return this;
    if (!this._events.removeListener) {
      if (arguments.length === 0)
        this._events = {};
      else if (this._events[type])
        delete this._events[type];
      return this;
    }
    if (arguments.length === 0) {
      for (key in this._events) {
        if (key === 'removeListener')
          continue;
        this.removeAllListeners(key);
      }
      this.removeAllListeners('removeListener');
      this._events = {};
      return this;
    }
    listeners = this._events[type];
    if (isFunction(listeners)) {
      this.removeListener(type, listeners);
    } else {
      while (listeners.length)
        this.removeListener(type, listeners[listeners.length - 1]);
    }
    delete this._events[type];
    return this;
  };
  EventEmitter.prototype.listeners = function(type) {
    var ret;
    if (!this._events || !this._events[type])
      ret = [];
    else if (isFunction(this._events[type]))
      ret = [this._events[type]];
    else
      ret = this._events[type].slice();
    return ret;
  };
  EventEmitter.listenerCount = function(emitter, type) {
    var ret;
    if (!emitter._events || !emitter._events[type])
      ret = 0;
    else if (isFunction(emitter._events[type]))
      ret = 1;
    else
      ret = emitter._events[type].length;
    return ret;
  };
  function isFunction(arg) {
    return typeof arg === 'function';
  }
  function isNumber(arg) {
    return typeof arg === 'number';
  }
  function isObject(arg) {
    return typeof arg === 'object' && arg !== null;
  }
  function isUndefined(arg) {
    return arg === void 0;
  }
  global.define = __define;
  return module.exports;
});

System.register("npm:util@0.10.3/support/isBufferBrowser", [], true, function(require, exports, module) {
  var global = System.global,
      __define = global.define;
  global.define = undefined;
  module.exports = function isBuffer(arg) {
    return arg && typeof arg === 'object' && typeof arg.copy === 'function' && typeof arg.fill === 'function' && typeof arg.readUInt8 === 'function';
  };
  global.define = __define;
  return module.exports;
});

System.register("npm:inherits@2.0.1/inherits_browser", [], true, function(require, exports, module) {
  var global = System.global,
      __define = global.define;
  global.define = undefined;
  if (typeof Object.create === 'function') {
    module.exports = function inherits(ctor, superCtor) {
      ctor.super_ = superCtor;
      ctor.prototype = Object.create(superCtor.prototype, {constructor: {
          value: ctor,
          enumerable: false,
          writable: true,
          configurable: true
        }});
    };
  } else {
    module.exports = function inherits(ctor, superCtor) {
      ctor.super_ = superCtor;
      var TempCtor = function() {};
      TempCtor.prototype = superCtor.prototype;
      ctor.prototype = new TempCtor();
      ctor.prototype.constructor = ctor;
    };
  }
  global.define = __define;
  return module.exports;
});

System.register("npm:process@0.10.1/browser", [], true, function(require, exports, module) {
  var global = System.global,
      __define = global.define;
  global.define = undefined;
  var process = module.exports = {};
  var queue = [];
  var draining = false;
  function drainQueue() {
    if (draining) {
      return ;
    }
    draining = true;
    var currentQueue;
    var len = queue.length;
    while (len) {
      currentQueue = queue;
      queue = [];
      var i = -1;
      while (++i < len) {
        currentQueue[i]();
      }
      len = queue.length;
    }
    draining = false;
  }
  process.nextTick = function(fun) {
    queue.push(fun);
    if (!draining) {
      setTimeout(drainQueue, 0);
    }
  };
  process.title = 'browser';
  process.browser = true;
  process.env = {};
  process.argv = [];
  process.version = '';
  process.versions = {};
  function noop() {}
  process.on = noop;
  process.addListener = noop;
  process.once = noop;
  process.off = noop;
  process.removeListener = noop;
  process.removeAllListeners = noop;
  process.emit = noop;
  process.binding = function(name) {
    throw new Error('process.binding is not supported');
  };
  process.cwd = function() {
    return '/';
  };
  process.chdir = function(dir) {
    throw new Error('process.chdir is not supported');
  };
  process.umask = function() {
    return 0;
  };
  global.define = __define;
  return module.exports;
});

System.register("npm:domready@0.2.13/ready", [], true, function(require, exports, module) {
  var global = System.global,
      __define = global.define;
  global.define = undefined;
  "format cjs";
  !function(name, definition) {
    if (typeof module != 'undefined')
      module.exports = definition();
    else if (typeof define == 'function' && typeof define.amd == 'object')
      define(definition);
    else
      this[name] = definition();
  }('domready', function(ready) {
    var fns = [],
        fn,
        f = false,
        doc = document,
        testEl = doc.documentElement,
        hack = testEl.doScroll,
        domContentLoaded = 'DOMContentLoaded',
        addEventListener = 'addEventListener',
        onreadystatechange = 'onreadystatechange',
        readyState = 'readyState',
        loadedRgx = hack ? /^loaded|^c/ : /^loaded|c/,
        loaded = loadedRgx.test(doc[readyState]);
    function flush(f) {
      loaded = 1;
      while (f = fns.shift())
        f();
    }
    doc[addEventListener] && doc[addEventListener](domContentLoaded, fn = function() {
      doc.removeEventListener(domContentLoaded, fn, f);
      flush();
    }, f);
    hack && doc.attachEvent(onreadystatechange, fn = function() {
      if (/^c/.test(doc[readyState])) {
        doc.detachEvent(onreadystatechange, fn);
        flush();
      }
    });
    return (ready = hack ? function(fn) {
      self != top ? loaded ? fn() : fns.push(fn) : function() {
        try {
          testEl.doScroll('left');
        } catch (e) {
          return setTimeout(function() {
            ready(fn);
          }, 50);
        }
        fn();
      }();
    } : function(fn) {
      loaded ? fn() : fns.push(fn);
    });
  });
  global.define = __define;
  return module.exports;
});

System.register("npm:vkey@0.0.3/index", ["github:jspm/nodelibs-process@0.1.1"], true, function(require, exports, module) {
  var global = System.global,
      __define = global.define;
  global.define = undefined;
  (function(process) {
    var ua = typeof window !== 'undefined' ? window.navigator.userAgent : '',
        isOSX = /OS X/.test(ua),
        isOpera = /Opera/.test(ua),
        maybeFirefox = !/like Gecko/.test(ua) && !isOpera;
    var i,
        output = module.exports = {
          0: isOSX ? '<menu>' : '<UNK>',
          1: '<mouse 1>',
          2: '<mouse 2>',
          3: '<break>',
          4: '<mouse 3>',
          5: '<mouse 4>',
          6: '<mouse 5>',
          8: '<backspace>',
          9: '<tab>',
          12: '<clear>',
          13: '<enter>',
          16: '<shift>',
          17: '<control>',
          18: '<alt>',
          19: '<pause>',
          20: '<caps-lock>',
          21: '<ime-hangul>',
          23: '<ime-junja>',
          24: '<ime-final>',
          25: '<ime-kanji>',
          27: '<escape>',
          28: '<ime-convert>',
          29: '<ime-nonconvert>',
          30: '<ime-accept>',
          31: '<ime-mode-change>',
          27: '<escape>',
          32: '<space>',
          33: '<page-up>',
          34: '<page-down>',
          35: '<end>',
          36: '<home>',
          37: '<left>',
          38: '<up>',
          39: '<right>',
          40: '<down>',
          41: '<select>',
          42: '<print>',
          43: '<execute>',
          44: '<snapshot>',
          45: '<insert>',
          46: '<delete>',
          47: '<help>',
          91: '<meta>',
          92: '<meta>',
          93: isOSX ? '<meta>' : '<menu>',
          95: '<sleep>',
          106: '<num-*>',
          107: '<num-+>',
          108: '<num-enter>',
          109: '<num-->',
          110: '<num-.>',
          111: '<num-/>',
          144: '<num-lock>',
          145: '<scroll-lock>',
          160: '<shift-left>',
          161: '<shift-right>',
          162: '<control-left>',
          163: '<control-right>',
          164: '<alt-left>',
          165: '<alt-right>',
          166: '<browser-back>',
          167: '<browser-forward>',
          168: '<browser-refresh>',
          169: '<browser-stop>',
          170: '<browser-search>',
          171: '<browser-favorites>',
          172: '<browser-home>',
          173: isOSX && maybeFirefox ? '-' : '<volume-mute>',
          174: '<volume-down>',
          175: '<volume-up>',
          176: '<next-track>',
          177: '<prev-track>',
          178: '<stop>',
          179: '<play-pause>',
          180: '<launch-mail>',
          181: '<launch-media-select>',
          182: '<launch-app 1>',
          183: '<launch-app 2>',
          186: ';',
          187: '=',
          188: ',',
          189: '-',
          190: '.',
          191: '/',
          192: '`',
          219: '[',
          220: '\\',
          221: ']',
          222: "'",
          223: '<meta>',
          224: '<meta>',
          226: '<alt-gr>',
          229: '<ime-process>',
          231: isOpera ? '`' : '<unicode>',
          246: '<attention>',
          247: '<crsel>',
          248: '<exsel>',
          249: '<erase-eof>',
          250: '<play>',
          251: '<zoom>',
          252: '<no-name>',
          253: '<pa-1>',
          254: '<clear>'
        };
    for (i = 58; i < 65; ++i) {
      output[i] = String.fromCharCode(i);
    }
    for (i = 48; i < 58; ++i) {
      output[i] = (i - 48) + '';
    }
    for (i = 65; i < 91; ++i) {
      output[i] = String.fromCharCode(i);
    }
    for (i = 96; i < 106; ++i) {
      output[i] = '<num-' + (i - 96) + '>';
    }
    for (i = 112; i < 136; ++i) {
      output[i] = 'F' + (i - 111);
    }
  })(require("github:jspm/nodelibs-process@0.1.1"));
  global.define = __define;
  return module.exports;
});

System.register("npm:invert-hash@0.0.0/invert", [], true, function(require, exports, module) {
  var global = System.global,
      __define = global.define;
  global.define = undefined;
  "use strict";
  function invert(hash) {
    var result = {};
    for (var i in hash) {
      if (hash.hasOwnProperty(i)) {
        result[hash[i]] = i;
      }
    }
    return result;
  }
  module.exports = invert;
  global.define = __define;
  return module.exports;
});

System.register("npm:uniq@0.0.2/uniq", [], true, function(require, exports, module) {
  var global = System.global,
      __define = global.define;
  global.define = undefined;
  "use strict";
  function unique_pred(list, compare) {
    var ptr = 1,
        len = list.length,
        a = list[0],
        b = list[0];
    for (var i = 1; i < len; ++i) {
      b = a;
      a = list[i];
      if (compare(a, b)) {
        if (i === ptr) {
          ptr++;
          continue;
        }
        list[ptr++] = a;
      }
    }
    list.length = ptr;
    return list;
  }
  function unique_eq(list) {
    var ptr = 1,
        len = list.length,
        a = list[0],
        b = list[0];
    for (var i = 1; i < len; ++i, b = a) {
      b = a;
      a = list[i];
      if (a !== b) {
        if (i === ptr) {
          ptr++;
          continue;
        }
        list[ptr++] = a;
      }
    }
    list.length = ptr;
    return list;
  }
  function unique(list, compare, sorted) {
    if (list.length === 0) {
      return [];
    }
    if (compare) {
      if (!sorted) {
        list.sort(compare);
      }
      return unique_pred(list, compare);
    }
    if (!sorted) {
      list.sort();
    }
    return unique_eq(list);
  }
  module.exports = unique;
  global.define = __define;
  return module.exports;
});

System.register("npm:lower-bound@0.0.3/lb", [], true, function(require, exports, module) {
  var global = System.global,
      __define = global.define;
  global.define = undefined;
  "use strict";
  function lowerBound_cmp(array, value, compare, lo, hi) {
    lo = lo | 0;
    hi = hi | 0;
    while (lo < hi) {
      var m = (lo + hi) >>> 1,
          v = compare(value, array[m]);
      if (v < 0) {
        hi = m - 1;
      } else if (v > 0) {
        lo = m + 1;
      } else {
        hi = m;
      }
    }
    if (compare(array[lo], value) <= 0) {
      return lo;
    }
    return lo - 1;
  }
  function lowerBound_def(array, value, lo, hi) {
    lo = lo | 0;
    hi = hi | 0;
    while (lo < hi) {
      var m = (lo + hi) >>> 1;
      if (value < array[m]) {
        hi = m - 1;
      } else if (value > array[m]) {
        lo = m + 1;
      } else {
        hi = m;
      }
    }
    if (array[lo] <= value) {
      return lo;
    }
    return lo - 1;
  }
  function lowerBound(array, value, compare, lo, hi) {
    if (!lo) {
      lo = 0;
    }
    if (typeof(hi) !== "number") {
      hi = array.length - 1;
    }
    if (compare) {
      return lowerBound_cmp(array, value, compare, lo, hi);
    }
    return lowerBound_def(array, value, lo, hi);
  }
  module.exports = lowerBound;
  global.define = __define;
  return module.exports;
});

System.register("npm:iota-array@0.0.1/iota", [], true, function(require, exports, module) {
  var global = System.global,
      __define = global.define;
  global.define = undefined;
  "use strict";
  function iota(n) {
    var result = new Array(n);
    for (var i = 0; i < n; ++i) {
      result[i] = i;
    }
    return result;
  }
  module.exports = iota;
  global.define = __define;
  return module.exports;
});

System.register("npm:game-shell@0.1.4/lib/raf-polyfill", [], true, function(require, exports, module) {
  var global = System.global,
      __define = global.define;
  global.define = undefined;
  "format cjs";
  var lastTime = 0;
  var vendors = ['ms', 'moz', 'webkit', 'o'];
  for (var x = 0; x < vendors.length && !window.requestAnimationFrame; ++x) {
    window.requestAnimationFrame = window[vendors[x] + 'RequestAnimationFrame'];
    window.cancelAnimationFrame = window[vendors[x] + 'CancelAnimationFrame'] || window[vendors[x] + 'CancelRequestAnimationFrame'];
  }
  if (!window.requestAnimationFrame)
    window.requestAnimationFrame = function(callback, element) {
      var currTime = new Date().getTime();
      var timeToCall = Math.max(0, 16 - (currTime - lastTime));
      var id = window.setTimeout(function() {
        callback(currTime + timeToCall);
      }, timeToCall);
      lastTime = currTime + timeToCall;
      return id;
    };
  if (!window.cancelAnimationFrame)
    window.cancelAnimationFrame = function(id) {
      clearTimeout(id);
    };
  global.define = __define;
  return module.exports;
});

System.register("npm:game-shell@0.1.4/lib/mousewheel-polyfill", [], true, function(require, exports, module) {
  var global = System.global,
      __define = global.define;
  global.define = undefined;
  var prefix = "",
      _addEventListener,
      onwheel,
      support;
  if (window.addEventListener) {
    _addEventListener = "addEventListener";
  } else {
    _addEventListener = "attachEvent";
    prefix = "on";
  }
  support = "onwheel" in document.createElement("div") ? "wheel" : document.onmousewheel !== undefined ? "mousewheel" : "DOMMouseScroll";
  function _addWheelListener(elem, eventName, callback, useCapture) {
    elem[_addEventListener](prefix + eventName, support == "wheel" ? callback : function(originalEvent) {
      !originalEvent && (originalEvent = window.event);
      var event = {
        originalEvent: originalEvent,
        target: originalEvent.target || originalEvent.srcElement,
        type: "wheel",
        deltaMode: originalEvent.type == "MozMousePixelScroll" ? 0 : 1,
        deltaX: 0,
        delatZ: 0,
        preventDefault: function() {
          originalEvent.preventDefault ? originalEvent.preventDefault() : originalEvent.returnValue = false;
        }
      };
      if (support == "mousewheel") {
        event.deltaY = -1 / 40 * originalEvent.wheelDelta;
        originalEvent.wheelDeltaX && (event.deltaX = -1 / 40 * originalEvent.wheelDeltaX);
      } else {
        event.deltaY = originalEvent.detail;
      }
      return callback(event);
    }, useCapture || false);
  }
  module.exports = function(elem, callback, useCapture) {
    _addWheelListener(elem, support, callback, useCapture);
    if (support == "DOMMouseScroll") {
      _addWheelListener(elem, "MozMousePixelScroll", callback, useCapture);
    }
  };
  global.define = __define;
  return module.exports;
});

System.register("npm:game-shell@0.1.4/lib/hrtime-polyfill", [], true, function(require, exports, module) {
  var global = System.global,
      __define = global.define;
  global.define = undefined;
  if (window.performance.now) {
    module.exports = function() {
      return window.performance.now();
    };
  } else if (window.performance.webktiNow) {
    module.exports = function() {
      return window.performance.webkitNow();
    };
  } else if (Date.now) {
    module.exports = Date.now;
  } else {
    module.exports = function() {
      return (new Date()).getTime();
    };
  }
  global.define = __define;
  return module.exports;
});

System.register("npm:webglew@0.0.0/webglew", [], true, function(require, exports, module) {
  var global = System.global,
      __define = global.define;
  global.define = undefined;
  "use strict";
  var VENDOR_PREFIX = ["WEBKIT_", "MOZ_"];
  function baseName(ext_name) {
    for (var i = 0; i < VENDOR_PREFIX.length; ++i) {
      var prefix = VENDOR_PREFIX[i];
      if (ext_name.indexOf(prefix) === 0) {
        return ext_name.slice(prefix.length);
      }
    }
    return ext_name;
  }
  function initWebGLEW(gl) {
    if (gl._webglew_struct) {
      return gl._webglew_struct;
    }
    var extensions = {};
    var supported = gl.getSupportedExtensions();
    for (var i = 0; i < supported.length; ++i) {
      var ext = gl.getExtension(supported[i]);
      if (!ext) {
        continue;
      }
      extensions[supported[i]] = ext;
      extensions[baseName(supported[i])] = ext;
    }
    gl._webglew_struct = extensions;
    return extensions;
  }
  module.exports = initWebGLEW;
  global.define = __define;
  return module.exports;
});

System.register("npm:iota-array@1.0.0/iota", [], true, function(require, exports, module) {
  var global = System.global,
      __define = global.define;
  global.define = undefined;
  "use strict";
  function iota(n) {
    var result = new Array(n);
    for (var i = 0; i < n; ++i) {
      result[i] = i;
    }
    return result;
  }
  module.exports = iota;
  global.define = __define;
  return module.exports;
});

System.register("npm:base64-js@0.0.8/lib/b64", [], true, function(require, exports, module) {
  var global = System.global,
      __define = global.define;
  global.define = undefined;
  var lookup = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/';
  ;
  (function(exports) {
    'use strict';
    var Arr = (typeof Uint8Array !== 'undefined') ? Uint8Array : Array;
    var PLUS = '+'.charCodeAt(0);
    var SLASH = '/'.charCodeAt(0);
    var NUMBER = '0'.charCodeAt(0);
    var LOWER = 'a'.charCodeAt(0);
    var UPPER = 'A'.charCodeAt(0);
    var PLUS_URL_SAFE = '-'.charCodeAt(0);
    var SLASH_URL_SAFE = '_'.charCodeAt(0);
    function decode(elt) {
      var code = elt.charCodeAt(0);
      if (code === PLUS || code === PLUS_URL_SAFE)
        return 62;
      if (code === SLASH || code === SLASH_URL_SAFE)
        return 63;
      if (code < NUMBER)
        return -1;
      if (code < NUMBER + 10)
        return code - NUMBER + 26 + 26;
      if (code < UPPER + 26)
        return code - UPPER;
      if (code < LOWER + 26)
        return code - LOWER + 26;
    }
    function b64ToByteArray(b64) {
      var i,
          j,
          l,
          tmp,
          placeHolders,
          arr;
      if (b64.length % 4 > 0) {
        throw new Error('Invalid string. Length must be a multiple of 4');
      }
      var len = b64.length;
      placeHolders = '=' === b64.charAt(len - 2) ? 2 : '=' === b64.charAt(len - 1) ? 1 : 0;
      arr = new Arr(b64.length * 3 / 4 - placeHolders);
      l = placeHolders > 0 ? b64.length - 4 : b64.length;
      var L = 0;
      function push(v) {
        arr[L++] = v;
      }
      for (i = 0, j = 0; i < l; i += 4, j += 3) {
        tmp = (decode(b64.charAt(i)) << 18) | (decode(b64.charAt(i + 1)) << 12) | (decode(b64.charAt(i + 2)) << 6) | decode(b64.charAt(i + 3));
        push((tmp & 0xFF0000) >> 16);
        push((tmp & 0xFF00) >> 8);
        push(tmp & 0xFF);
      }
      if (placeHolders === 2) {
        tmp = (decode(b64.charAt(i)) << 2) | (decode(b64.charAt(i + 1)) >> 4);
        push(tmp & 0xFF);
      } else if (placeHolders === 1) {
        tmp = (decode(b64.charAt(i)) << 10) | (decode(b64.charAt(i + 1)) << 4) | (decode(b64.charAt(i + 2)) >> 2);
        push((tmp >> 8) & 0xFF);
        push(tmp & 0xFF);
      }
      return arr;
    }
    function uint8ToBase64(uint8) {
      var i,
          extraBytes = uint8.length % 3,
          output = "",
          temp,
          length;
      function encode(num) {
        return lookup.charAt(num);
      }
      function tripletToBase64(num) {
        return encode(num >> 18 & 0x3F) + encode(num >> 12 & 0x3F) + encode(num >> 6 & 0x3F) + encode(num & 0x3F);
      }
      for (i = 0, length = uint8.length - extraBytes; i < length; i += 3) {
        temp = (uint8[i] << 16) + (uint8[i + 1] << 8) + (uint8[i + 2]);
        output += tripletToBase64(temp);
      }
      switch (extraBytes) {
        case 1:
          temp = uint8[uint8.length - 1];
          output += encode(temp >> 2);
          output += encode((temp << 4) & 0x3F);
          output += '==';
          break;
        case 2:
          temp = (uint8[uint8.length - 2] << 8) + (uint8[uint8.length - 1]);
          output += encode(temp >> 10);
          output += encode((temp >> 4) & 0x3F);
          output += encode((temp << 2) & 0x3F);
          output += '=';
          break;
      }
      return output;
    }
    exports.toByteArray = b64ToByteArray;
    exports.fromByteArray = uint8ToBase64;
  }(typeof exports === 'undefined' ? (this.base64js = {}) : exports));
  global.define = __define;
  return module.exports;
});

System.register("npm:ieee754@1.1.5/index", [], true, function(require, exports, module) {
  var global = System.global,
      __define = global.define;
  global.define = undefined;
  exports.read = function(buffer, offset, isLE, mLen, nBytes) {
    var e,
        m,
        eLen = nBytes * 8 - mLen - 1,
        eMax = (1 << eLen) - 1,
        eBias = eMax >> 1,
        nBits = -7,
        i = isLE ? (nBytes - 1) : 0,
        d = isLE ? -1 : 1,
        s = buffer[offset + i];
    i += d;
    e = s & ((1 << (-nBits)) - 1);
    s >>= (-nBits);
    nBits += eLen;
    for (; nBits > 0; e = e * 256 + buffer[offset + i], i += d, nBits -= 8) {}
    m = e & ((1 << (-nBits)) - 1);
    e >>= (-nBits);
    nBits += mLen;
    for (; nBits > 0; m = m * 256 + buffer[offset + i], i += d, nBits -= 8) {}
    if (e === 0) {
      e = 1 - eBias;
    } else if (e === eMax) {
      return m ? NaN : ((s ? -1 : 1) * Infinity);
    } else {
      m = m + Math.pow(2, mLen);
      e = e - eBias;
    }
    return (s ? -1 : 1) * m * Math.pow(2, e - mLen);
  };
  exports.write = function(buffer, value, offset, isLE, mLen, nBytes) {
    var e,
        m,
        c,
        eLen = nBytes * 8 - mLen - 1,
        eMax = (1 << eLen) - 1,
        eBias = eMax >> 1,
        rt = (mLen === 23 ? Math.pow(2, -24) - Math.pow(2, -77) : 0),
        i = isLE ? 0 : (nBytes - 1),
        d = isLE ? 1 : -1,
        s = value < 0 || (value === 0 && 1 / value < 0) ? 1 : 0;
    value = Math.abs(value);
    if (isNaN(value) || value === Infinity) {
      m = isNaN(value) ? 1 : 0;
      e = eMax;
    } else {
      e = Math.floor(Math.log(value) / Math.LN2);
      if (value * (c = Math.pow(2, -e)) < 1) {
        e--;
        c *= 2;
      }
      if (e + eBias >= 1) {
        value += rt / c;
      } else {
        value += rt * Math.pow(2, 1 - eBias);
      }
      if (value * c >= 2) {
        e++;
        c /= 2;
      }
      if (e + eBias >= eMax) {
        m = 0;
        e = eMax;
      } else if (e + eBias >= 1) {
        m = (value * c - 1) * Math.pow(2, mLen);
        e = e + eBias;
      } else {
        m = value * Math.pow(2, eBias - 1) * Math.pow(2, mLen);
        e = 0;
      }
    }
    for (; mLen >= 8; buffer[offset + i] = m & 0xff, i += d, m /= 256, mLen -= 8) {}
    e = (e << mLen) | m;
    eLen += mLen;
    for (; eLen > 0; buffer[offset + i] = e & 0xff, i += d, e /= 256, eLen -= 8) {}
    buffer[offset + i - d] |= s * 128;
  };
  global.define = __define;
  return module.exports;
});

System.register("npm:is-array@1.0.1/index", [], true, function(require, exports, module) {
  var global = System.global,
      __define = global.define;
  global.define = undefined;
  var isArray = Array.isArray;
  var str = Object.prototype.toString;
  module.exports = isArray || function(val) {
    return !!val && '[object Array]' == str.call(val);
  };
  global.define = __define;
  return module.exports;
});

System.register("npm:cwise-compiler@0.0.0/lib/compile", ["npm:uniq@0.0.2", "github:jspm/nodelibs-process@0.1.1"], true, function(require, exports, module) {
  var global = System.global,
      __define = global.define;
  global.define = undefined;
  (function(process) {
    "use strict";
    var uniq = require("npm:uniq@0.0.2");
    function innerFill(order, proc, body) {
      var dimension = order.length,
          nargs = proc.arrayArgs.length,
          has_index = proc.indexArgs.length > 0,
          code = [],
          vars = [],
          idx = 0,
          pidx = 0,
          i,
          j;
      for (i = 0; i < dimension; ++i) {
        vars.push(["i", i, "=0"].join(""));
      }
      for (j = 0; j < nargs; ++j) {
        for (i = 0; i < dimension; ++i) {
          pidx = idx;
          idx = order[i];
          if (i === 0) {
            vars.push(["d", j, "s", i, "=t", j, "[", idx, "]"].join(""));
          } else {
            vars.push(["d", j, "s", i, "=(t", j, "[", idx, "]-s", pidx, "*t", j, "[", pidx, "])"].join(""));
          }
        }
      }
      code.push("var " + vars.join(","));
      for (i = dimension - 1; i >= 0; --i) {
        idx = order[i];
        code.push(["for(i", i, "=0;i", i, "<s", idx, ";++i", i, "){"].join(""));
      }
      code.push(body);
      for (i = 0; i < dimension; ++i) {
        pidx = idx;
        idx = order[i];
        for (j = 0; j < nargs; ++j) {
          code.push(["p", j, "+=d", j, "s", i].join(""));
        }
        if (has_index) {
          if (i > 0) {
            code.push(["index[", pidx, "]-=s", pidx].join(""));
          }
          code.push(["++index[", idx, "]"].join(""));
        }
        code.push("}");
      }
      return code.join("\n");
    }
    function outerFill(matched, order, proc, body) {
      var dimension = order.length,
          nargs = proc.arrayArgs.length,
          blockSize = proc.blockSize,
          has_index = proc.indexArgs.length > 0,
          code = [];
      for (var i = 0; i < nargs; ++i) {
        code.push(["var offset", i, "=p", i].join(""));
      }
      for (var i = matched; i < dimension; ++i) {
        code.push(["for(var j" + i + "=SS[", order[i], "]|0;j", i, ">0;){"].join(""));
        code.push(["if(j", i, "<", blockSize, "){"].join(""));
        code.push(["s", order[i], "=j", i].join(""));
        code.push(["j", i, "=0"].join(""));
        code.push(["}else{s", order[i], "=", blockSize].join(""));
        code.push(["j", i, "-=", blockSize, "}"].join(""));
        if (has_index) {
          code.push(["index[", order[i], "]=j", i].join(""));
        }
      }
      for (var i = 0; i < nargs; ++i) {
        var indexStr = ["offset" + i];
        for (var j = matched; j < dimension; ++j) {
          indexStr.push(["j", j, "*t", i, "[", order[j], "]"].join(""));
        }
        code.push(["p", i, "=(", indexStr.join("+"), ")"].join(""));
      }
      code.push(innerFill(order, proc, body));
      for (var i = matched; i < dimension; ++i) {
        code.push("}");
      }
      return code.join("\n");
    }
    function countMatches(orders) {
      var matched = 0,
          dimension = orders[0].length;
      while (matched < dimension) {
        for (var j = 1; j < orders.length; ++j) {
          if (orders[j][matched] !== orders[0][matched]) {
            return matched;
          }
        }
        ++matched;
      }
      return matched;
    }
    function processBlock(block, proc, dtypes) {
      var code = block.body;
      var pre = [];
      var post = [];
      for (var i = 0; i < block.args.length; ++i) {
        var carg = block.args[i];
        if (carg.count <= 0) {
          continue;
        }
        var re = new RegExp(carg.name, "g");
        switch (proc.argTypes[i]) {
          case "array":
            var arrNum = proc.arrayArgs.indexOf(i);
            if (carg.count === 1) {
              if (dtypes[arrNum] === "generic") {
                if (carg.lvalue) {
                  pre.push(["var l", arrNum, "=a", arrNum, ".get(p", arrNum, ")"].join(""));
                  code = code.replace(re, "l" + arrNum);
                  post.push(["a", arrNum, ".set(p", arrNum, ",l", arrNum, ")"].join(""));
                } else {
                  code = code.replace(re, ["a", arrNum, ".get(p", arrNum, ")"].join(""));
                }
              } else {
                code = code.replace(re, ["a", arrNum, "[p", arrNum, "]"].join(""));
              }
            } else if (dtypes[arrNum] === "generic") {
              pre.push(["var l", arrNum, "=a", arrNum, ".get(p", arrNum, ")"].join(""));
              code = code.replace(re, "l" + arrNum);
              if (carg.lvalue) {
                post.push(["a", arrNum, ".set(p", arrNum, ",l", arrNum, ")"].join(""));
              }
            } else {
              pre.push(["var l", arrNum, "=a", arrNum, "[p", arrNum, "]"].join(""));
              code = code.replace(re, "l" + arrNum);
              if (carg.lvalue) {
                post.push(["a", arrNum, "[p", arrNum, "]=l", arrNum].join(""));
              }
            }
            break;
          case "scalar":
            code = code.replace(re, "Y" + proc.scalarArgs.indexOf(i));
            break;
          case "index":
            code = code.replace(re, "index");
            break;
          case "shape":
            code = code.replace(re, "shape");
            break;
        }
      }
      return [pre.join("\n"), code, post.join("\n")].join("\n").trim();
    }
    function typeSummary(dtypes) {
      var summary = new Array(dtypes.length);
      var allEqual = true;
      for (var i = 0; i < dtypes.length; ++i) {
        var t = dtypes[i];
        var digits = t.match(/\d+/);
        if (!digits) {
          digits = "";
        } else {
          digits = digits[0];
        }
        if (t.charAt(0) === 0) {
          summary[i] = "u" + t.charAt(1) + digits;
        } else {
          summary[i] = t.charAt(0) + digits;
        }
        if (i > 0) {
          allEqual = allEqual && summary[i] === summary[i - 1];
        }
      }
      if (allEqual) {
        return summary[0];
      }
      return summary.join("");
    }
    function generateCWiseOp(proc, typesig) {
      var dimension = typesig[1].length | 0;
      var orders = new Array(proc.arrayArgs.length);
      var dtypes = new Array(proc.arrayArgs.length);
      var arglist = ["SS"];
      var code = ["'use strict'"];
      var vars = [];
      for (var j = 0; j < dimension; ++j) {
        vars.push(["s", j, "=SS[", j, "]"].join(""));
      }
      for (var i = 0; i < proc.arrayArgs.length; ++i) {
        arglist.push("a" + i);
        arglist.push("t" + i);
        arglist.push("p" + i);
        dtypes[i] = typesig[2 * i];
        orders[i] = typesig[2 * i + 1];
      }
      for (var i = 0; i < proc.scalarArgs.length; ++i) {
        arglist.push("Y" + i);
      }
      if (proc.shapeArgs.length > 0) {
        vars.push("shape=SS.slice(0)");
      }
      if (proc.indexArgs.length > 0) {
        var zeros = new Array(dimension);
        for (var i = 0; i < dimension; ++i) {
          zeros[i] = "0";
        }
        vars.push(["index=[", zeros.join(","), "]"].join(""));
      }
      var thisVars = uniq([].concat(proc.pre.thisVars).concat(proc.body.thisVars).concat(proc.post.thisVars));
      vars = vars.concat(thisVars);
      code.push("var " + vars.join(","));
      for (var i = 0; i < proc.arrayArgs.length; ++i) {
        code.push("p" + i + "|=0");
      }
      if (proc.pre.body.length > 3) {
        code.push(processBlock(proc.pre, proc, dtypes));
      }
      var body = processBlock(proc.body, proc, dtypes);
      var matched = countMatches(orders);
      if (matched < dimension) {
        code.push(outerFill(matched, orders[0], proc, body));
      } else {
        code.push(innerFill(orders[0], proc, body));
      }
      if (proc.post.body.length > 3) {
        code.push(processBlock(proc.post, proc, dtypes));
      }
      if (proc.debug) {
        console.log("Generated cwise routine for ", typesig, ":\n\n", code.join("\n"));
      }
      var loopName = [(proc.funcName || "unnamed"), "_cwise_loop_", orders[0].join("s"), "m", matched, typeSummary(dtypes)].join("");
      var f = new Function(["function ", loopName, "(", arglist.join(","), "){", code.join("\n"), "} return ", loopName].join(""));
      return f();
    }
    module.exports = generateCWiseOp;
  })(require("github:jspm/nodelibs-process@0.1.1"));
  global.define = __define;
  return module.exports;
});

System.register("npm:esprima@1.0.4/esprima", [], true, function(require, exports, module) {
  var global = System.global,
      __define = global.define;
  global.define = undefined;
  "format cjs";
  (function(root, factory) {
    'use strict';
    if (typeof define === 'function' && define.amd) {
      define(["exports"], factory);
    } else if (typeof exports !== 'undefined') {
      factory(exports);
    } else {
      factory((root.esprima = {}));
    }
  }(this, function(exports) {
    'use strict';
    var Token,
        TokenName,
        Syntax,
        PropertyKind,
        Messages,
        Regex,
        source,
        strict,
        index,
        lineNumber,
        lineStart,
        length,
        buffer,
        state,
        extra;
    Token = {
      BooleanLiteral: 1,
      EOF: 2,
      Identifier: 3,
      Keyword: 4,
      NullLiteral: 5,
      NumericLiteral: 6,
      Punctuator: 7,
      StringLiteral: 8
    };
    TokenName = {};
    TokenName[Token.BooleanLiteral] = 'Boolean';
    TokenName[Token.EOF] = '<end>';
    TokenName[Token.Identifier] = 'Identifier';
    TokenName[Token.Keyword] = 'Keyword';
    TokenName[Token.NullLiteral] = 'Null';
    TokenName[Token.NumericLiteral] = 'Numeric';
    TokenName[Token.Punctuator] = 'Punctuator';
    TokenName[Token.StringLiteral] = 'String';
    Syntax = {
      AssignmentExpression: 'AssignmentExpression',
      ArrayExpression: 'ArrayExpression',
      BlockStatement: 'BlockStatement',
      BinaryExpression: 'BinaryExpression',
      BreakStatement: 'BreakStatement',
      CallExpression: 'CallExpression',
      CatchClause: 'CatchClause',
      ConditionalExpression: 'ConditionalExpression',
      ContinueStatement: 'ContinueStatement',
      DoWhileStatement: 'DoWhileStatement',
      DebuggerStatement: 'DebuggerStatement',
      EmptyStatement: 'EmptyStatement',
      ExpressionStatement: 'ExpressionStatement',
      ForStatement: 'ForStatement',
      ForInStatement: 'ForInStatement',
      FunctionDeclaration: 'FunctionDeclaration',
      FunctionExpression: 'FunctionExpression',
      Identifier: 'Identifier',
      IfStatement: 'IfStatement',
      Literal: 'Literal',
      LabeledStatement: 'LabeledStatement',
      LogicalExpression: 'LogicalExpression',
      MemberExpression: 'MemberExpression',
      NewExpression: 'NewExpression',
      ObjectExpression: 'ObjectExpression',
      Program: 'Program',
      Property: 'Property',
      ReturnStatement: 'ReturnStatement',
      SequenceExpression: 'SequenceExpression',
      SwitchStatement: 'SwitchStatement',
      SwitchCase: 'SwitchCase',
      ThisExpression: 'ThisExpression',
      ThrowStatement: 'ThrowStatement',
      TryStatement: 'TryStatement',
      UnaryExpression: 'UnaryExpression',
      UpdateExpression: 'UpdateExpression',
      VariableDeclaration: 'VariableDeclaration',
      VariableDeclarator: 'VariableDeclarator',
      WhileStatement: 'WhileStatement',
      WithStatement: 'WithStatement'
    };
    PropertyKind = {
      Data: 1,
      Get: 2,
      Set: 4
    };
    Messages = {
      UnexpectedToken: 'Unexpected token %0',
      UnexpectedNumber: 'Unexpected number',
      UnexpectedString: 'Unexpected string',
      UnexpectedIdentifier: 'Unexpected identifier',
      UnexpectedReserved: 'Unexpected reserved word',
      UnexpectedEOS: 'Unexpected end of input',
      NewlineAfterThrow: 'Illegal newline after throw',
      InvalidRegExp: 'Invalid regular expression',
      UnterminatedRegExp: 'Invalid regular expression: missing /',
      InvalidLHSInAssignment: 'Invalid left-hand side in assignment',
      InvalidLHSInForIn: 'Invalid left-hand side in for-in',
      MultipleDefaultsInSwitch: 'More than one default clause in switch statement',
      NoCatchOrFinally: 'Missing catch or finally after try',
      UnknownLabel: 'Undefined label \'%0\'',
      Redeclaration: '%0 \'%1\' has already been declared',
      IllegalContinue: 'Illegal continue statement',
      IllegalBreak: 'Illegal break statement',
      IllegalReturn: 'Illegal return statement',
      StrictModeWith: 'Strict mode code may not include a with statement',
      StrictCatchVariable: 'Catch variable may not be eval or arguments in strict mode',
      StrictVarName: 'Variable name may not be eval or arguments in strict mode',
      StrictParamName: 'Parameter name eval or arguments is not allowed in strict mode',
      StrictParamDupe: 'Strict mode function may not have duplicate parameter names',
      StrictFunctionName: 'Function name may not be eval or arguments in strict mode',
      StrictOctalLiteral: 'Octal literals are not allowed in strict mode.',
      StrictDelete: 'Delete of an unqualified identifier in strict mode.',
      StrictDuplicateProperty: 'Duplicate data property in object literal not allowed in strict mode',
      AccessorDataProperty: 'Object literal may not have data and accessor property with the same name',
      AccessorGetSet: 'Object literal may not have multiple get/set accessors with the same name',
      StrictLHSAssignment: 'Assignment to eval or arguments is not allowed in strict mode',
      StrictLHSPostfix: 'Postfix increment/decrement may not have eval or arguments operand in strict mode',
      StrictLHSPrefix: 'Prefix increment/decrement may not have eval or arguments operand in strict mode',
      StrictReservedWord: 'Use of future reserved word in strict mode'
    };
    Regex = {
      NonAsciiIdentifierStart: new RegExp('[\xaa\xb5\xba\xc0-\xd6\xd8-\xf6\xf8-\u02c1\u02c6-\u02d1\u02e0-\u02e4\u02ec\u02ee\u0370-\u0374\u0376\u0377\u037a-\u037d\u0386\u0388-\u038a\u038c\u038e-\u03a1\u03a3-\u03f5\u03f7-\u0481\u048a-\u0527\u0531-\u0556\u0559\u0561-\u0587\u05d0-\u05ea\u05f0-\u05f2\u0620-\u064a\u066e\u066f\u0671-\u06d3\u06d5\u06e5\u06e6\u06ee\u06ef\u06fa-\u06fc\u06ff\u0710\u0712-\u072f\u074d-\u07a5\u07b1\u07ca-\u07ea\u07f4\u07f5\u07fa\u0800-\u0815\u081a\u0824\u0828\u0840-\u0858\u08a0\u08a2-\u08ac\u0904-\u0939\u093d\u0950\u0958-\u0961\u0971-\u0977\u0979-\u097f\u0985-\u098c\u098f\u0990\u0993-\u09a8\u09aa-\u09b0\u09b2\u09b6-\u09b9\u09bd\u09ce\u09dc\u09dd\u09df-\u09e1\u09f0\u09f1\u0a05-\u0a0a\u0a0f\u0a10\u0a13-\u0a28\u0a2a-\u0a30\u0a32\u0a33\u0a35\u0a36\u0a38\u0a39\u0a59-\u0a5c\u0a5e\u0a72-\u0a74\u0a85-\u0a8d\u0a8f-\u0a91\u0a93-\u0aa8\u0aaa-\u0ab0\u0ab2\u0ab3\u0ab5-\u0ab9\u0abd\u0ad0\u0ae0\u0ae1\u0b05-\u0b0c\u0b0f\u0b10\u0b13-\u0b28\u0b2a-\u0b30\u0b32\u0b33\u0b35-\u0b39\u0b3d\u0b5c\u0b5d\u0b5f-\u0b61\u0b71\u0b83\u0b85-\u0b8a\u0b8e-\u0b90\u0b92-\u0b95\u0b99\u0b9a\u0b9c\u0b9e\u0b9f\u0ba3\u0ba4\u0ba8-\u0baa\u0bae-\u0bb9\u0bd0\u0c05-\u0c0c\u0c0e-\u0c10\u0c12-\u0c28\u0c2a-\u0c33\u0c35-\u0c39\u0c3d\u0c58\u0c59\u0c60\u0c61\u0c85-\u0c8c\u0c8e-\u0c90\u0c92-\u0ca8\u0caa-\u0cb3\u0cb5-\u0cb9\u0cbd\u0cde\u0ce0\u0ce1\u0cf1\u0cf2\u0d05-\u0d0c\u0d0e-\u0d10\u0d12-\u0d3a\u0d3d\u0d4e\u0d60\u0d61\u0d7a-\u0d7f\u0d85-\u0d96\u0d9a-\u0db1\u0db3-\u0dbb\u0dbd\u0dc0-\u0dc6\u0e01-\u0e30\u0e32\u0e33\u0e40-\u0e46\u0e81\u0e82\u0e84\u0e87\u0e88\u0e8a\u0e8d\u0e94-\u0e97\u0e99-\u0e9f\u0ea1-\u0ea3\u0ea5\u0ea7\u0eaa\u0eab\u0ead-\u0eb0\u0eb2\u0eb3\u0ebd\u0ec0-\u0ec4\u0ec6\u0edc-\u0edf\u0f00\u0f40-\u0f47\u0f49-\u0f6c\u0f88-\u0f8c\u1000-\u102a\u103f\u1050-\u1055\u105a-\u105d\u1061\u1065\u1066\u106e-\u1070\u1075-\u1081\u108e\u10a0-\u10c5\u10c7\u10cd\u10d0-\u10fa\u10fc-\u1248\u124a-\u124d\u1250-\u1256\u1258\u125a-\u125d\u1260-\u1288\u128a-\u128d\u1290-\u12b0\u12b2-\u12b5\u12b8-\u12be\u12c0\u12c2-\u12c5\u12c8-\u12d6\u12d8-\u1310\u1312-\u1315\u1318-\u135a\u1380-\u138f\u13a0-\u13f4\u1401-\u166c\u166f-\u167f\u1681-\u169a\u16a0-\u16ea\u16ee-\u16f0\u1700-\u170c\u170e-\u1711\u1720-\u1731\u1740-\u1751\u1760-\u176c\u176e-\u1770\u1780-\u17b3\u17d7\u17dc\u1820-\u1877\u1880-\u18a8\u18aa\u18b0-\u18f5\u1900-\u191c\u1950-\u196d\u1970-\u1974\u1980-\u19ab\u19c1-\u19c7\u1a00-\u1a16\u1a20-\u1a54\u1aa7\u1b05-\u1b33\u1b45-\u1b4b\u1b83-\u1ba0\u1bae\u1baf\u1bba-\u1be5\u1c00-\u1c23\u1c4d-\u1c4f\u1c5a-\u1c7d\u1ce9-\u1cec\u1cee-\u1cf1\u1cf5\u1cf6\u1d00-\u1dbf\u1e00-\u1f15\u1f18-\u1f1d\u1f20-\u1f45\u1f48-\u1f4d\u1f50-\u1f57\u1f59\u1f5b\u1f5d\u1f5f-\u1f7d\u1f80-\u1fb4\u1fb6-\u1fbc\u1fbe\u1fc2-\u1fc4\u1fc6-\u1fcc\u1fd0-\u1fd3\u1fd6-\u1fdb\u1fe0-\u1fec\u1ff2-\u1ff4\u1ff6-\u1ffc\u2071\u207f\u2090-\u209c\u2102\u2107\u210a-\u2113\u2115\u2119-\u211d\u2124\u2126\u2128\u212a-\u212d\u212f-\u2139\u213c-\u213f\u2145-\u2149\u214e\u2160-\u2188\u2c00-\u2c2e\u2c30-\u2c5e\u2c60-\u2ce4\u2ceb-\u2cee\u2cf2\u2cf3\u2d00-\u2d25\u2d27\u2d2d\u2d30-\u2d67\u2d6f\u2d80-\u2d96\u2da0-\u2da6\u2da8-\u2dae\u2db0-\u2db6\u2db8-\u2dbe\u2dc0-\u2dc6\u2dc8-\u2dce\u2dd0-\u2dd6\u2dd8-\u2dde\u2e2f\u3005-\u3007\u3021-\u3029\u3031-\u3035\u3038-\u303c\u3041-\u3096\u309d-\u309f\u30a1-\u30fa\u30fc-\u30ff\u3105-\u312d\u3131-\u318e\u31a0-\u31ba\u31f0-\u31ff\u3400-\u4db5\u4e00-\u9fcc\ua000-\ua48c\ua4d0-\ua4fd\ua500-\ua60c\ua610-\ua61f\ua62a\ua62b\ua640-\ua66e\ua67f-\ua697\ua6a0-\ua6ef\ua717-\ua71f\ua722-\ua788\ua78b-\ua78e\ua790-\ua793\ua7a0-\ua7aa\ua7f8-\ua801\ua803-\ua805\ua807-\ua80a\ua80c-\ua822\ua840-\ua873\ua882-\ua8b3\ua8f2-\ua8f7\ua8fb\ua90a-\ua925\ua930-\ua946\ua960-\ua97c\ua984-\ua9b2\ua9cf\uaa00-\uaa28\uaa40-\uaa42\uaa44-\uaa4b\uaa60-\uaa76\uaa7a\uaa80-\uaaaf\uaab1\uaab5\uaab6\uaab9-\uaabd\uaac0\uaac2\uaadb-\uaadd\uaae0-\uaaea\uaaf2-\uaaf4\uab01-\uab06\uab09-\uab0e\uab11-\uab16\uab20-\uab26\uab28-\uab2e\uabc0-\uabe2\uac00-\ud7a3\ud7b0-\ud7c6\ud7cb-\ud7fb\uf900-\ufa6d\ufa70-\ufad9\ufb00-\ufb06\ufb13-\ufb17\ufb1d\ufb1f-\ufb28\ufb2a-\ufb36\ufb38-\ufb3c\ufb3e\ufb40\ufb41\ufb43\ufb44\ufb46-\ufbb1\ufbd3-\ufd3d\ufd50-\ufd8f\ufd92-\ufdc7\ufdf0-\ufdfb\ufe70-\ufe74\ufe76-\ufefc\uff21-\uff3a\uff41-\uff5a\uff66-\uffbe\uffc2-\uffc7\uffca-\uffcf\uffd2-\uffd7\uffda-\uffdc]'),
      NonAsciiIdentifierPart: new RegExp('[\xaa\xb5\xba\xc0-\xd6\xd8-\xf6\xf8-\u02c1\u02c6-\u02d1\u02e0-\u02e4\u02ec\u02ee\u0300-\u0374\u0376\u0377\u037a-\u037d\u0386\u0388-\u038a\u038c\u038e-\u03a1\u03a3-\u03f5\u03f7-\u0481\u0483-\u0487\u048a-\u0527\u0531-\u0556\u0559\u0561-\u0587\u0591-\u05bd\u05bf\u05c1\u05c2\u05c4\u05c5\u05c7\u05d0-\u05ea\u05f0-\u05f2\u0610-\u061a\u0620-\u0669\u066e-\u06d3\u06d5-\u06dc\u06df-\u06e8\u06ea-\u06fc\u06ff\u0710-\u074a\u074d-\u07b1\u07c0-\u07f5\u07fa\u0800-\u082d\u0840-\u085b\u08a0\u08a2-\u08ac\u08e4-\u08fe\u0900-\u0963\u0966-\u096f\u0971-\u0977\u0979-\u097f\u0981-\u0983\u0985-\u098c\u098f\u0990\u0993-\u09a8\u09aa-\u09b0\u09b2\u09b6-\u09b9\u09bc-\u09c4\u09c7\u09c8\u09cb-\u09ce\u09d7\u09dc\u09dd\u09df-\u09e3\u09e6-\u09f1\u0a01-\u0a03\u0a05-\u0a0a\u0a0f\u0a10\u0a13-\u0a28\u0a2a-\u0a30\u0a32\u0a33\u0a35\u0a36\u0a38\u0a39\u0a3c\u0a3e-\u0a42\u0a47\u0a48\u0a4b-\u0a4d\u0a51\u0a59-\u0a5c\u0a5e\u0a66-\u0a75\u0a81-\u0a83\u0a85-\u0a8d\u0a8f-\u0a91\u0a93-\u0aa8\u0aaa-\u0ab0\u0ab2\u0ab3\u0ab5-\u0ab9\u0abc-\u0ac5\u0ac7-\u0ac9\u0acb-\u0acd\u0ad0\u0ae0-\u0ae3\u0ae6-\u0aef\u0b01-\u0b03\u0b05-\u0b0c\u0b0f\u0b10\u0b13-\u0b28\u0b2a-\u0b30\u0b32\u0b33\u0b35-\u0b39\u0b3c-\u0b44\u0b47\u0b48\u0b4b-\u0b4d\u0b56\u0b57\u0b5c\u0b5d\u0b5f-\u0b63\u0b66-\u0b6f\u0b71\u0b82\u0b83\u0b85-\u0b8a\u0b8e-\u0b90\u0b92-\u0b95\u0b99\u0b9a\u0b9c\u0b9e\u0b9f\u0ba3\u0ba4\u0ba8-\u0baa\u0bae-\u0bb9\u0bbe-\u0bc2\u0bc6-\u0bc8\u0bca-\u0bcd\u0bd0\u0bd7\u0be6-\u0bef\u0c01-\u0c03\u0c05-\u0c0c\u0c0e-\u0c10\u0c12-\u0c28\u0c2a-\u0c33\u0c35-\u0c39\u0c3d-\u0c44\u0c46-\u0c48\u0c4a-\u0c4d\u0c55\u0c56\u0c58\u0c59\u0c60-\u0c63\u0c66-\u0c6f\u0c82\u0c83\u0c85-\u0c8c\u0c8e-\u0c90\u0c92-\u0ca8\u0caa-\u0cb3\u0cb5-\u0cb9\u0cbc-\u0cc4\u0cc6-\u0cc8\u0cca-\u0ccd\u0cd5\u0cd6\u0cde\u0ce0-\u0ce3\u0ce6-\u0cef\u0cf1\u0cf2\u0d02\u0d03\u0d05-\u0d0c\u0d0e-\u0d10\u0d12-\u0d3a\u0d3d-\u0d44\u0d46-\u0d48\u0d4a-\u0d4e\u0d57\u0d60-\u0d63\u0d66-\u0d6f\u0d7a-\u0d7f\u0d82\u0d83\u0d85-\u0d96\u0d9a-\u0db1\u0db3-\u0dbb\u0dbd\u0dc0-\u0dc6\u0dca\u0dcf-\u0dd4\u0dd6\u0dd8-\u0ddf\u0df2\u0df3\u0e01-\u0e3a\u0e40-\u0e4e\u0e50-\u0e59\u0e81\u0e82\u0e84\u0e87\u0e88\u0e8a\u0e8d\u0e94-\u0e97\u0e99-\u0e9f\u0ea1-\u0ea3\u0ea5\u0ea7\u0eaa\u0eab\u0ead-\u0eb9\u0ebb-\u0ebd\u0ec0-\u0ec4\u0ec6\u0ec8-\u0ecd\u0ed0-\u0ed9\u0edc-\u0edf\u0f00\u0f18\u0f19\u0f20-\u0f29\u0f35\u0f37\u0f39\u0f3e-\u0f47\u0f49-\u0f6c\u0f71-\u0f84\u0f86-\u0f97\u0f99-\u0fbc\u0fc6\u1000-\u1049\u1050-\u109d\u10a0-\u10c5\u10c7\u10cd\u10d0-\u10fa\u10fc-\u1248\u124a-\u124d\u1250-\u1256\u1258\u125a-\u125d\u1260-\u1288\u128a-\u128d\u1290-\u12b0\u12b2-\u12b5\u12b8-\u12be\u12c0\u12c2-\u12c5\u12c8-\u12d6\u12d8-\u1310\u1312-\u1315\u1318-\u135a\u135d-\u135f\u1380-\u138f\u13a0-\u13f4\u1401-\u166c\u166f-\u167f\u1681-\u169a\u16a0-\u16ea\u16ee-\u16f0\u1700-\u170c\u170e-\u1714\u1720-\u1734\u1740-\u1753\u1760-\u176c\u176e-\u1770\u1772\u1773\u1780-\u17d3\u17d7\u17dc\u17dd\u17e0-\u17e9\u180b-\u180d\u1810-\u1819\u1820-\u1877\u1880-\u18aa\u18b0-\u18f5\u1900-\u191c\u1920-\u192b\u1930-\u193b\u1946-\u196d\u1970-\u1974\u1980-\u19ab\u19b0-\u19c9\u19d0-\u19d9\u1a00-\u1a1b\u1a20-\u1a5e\u1a60-\u1a7c\u1a7f-\u1a89\u1a90-\u1a99\u1aa7\u1b00-\u1b4b\u1b50-\u1b59\u1b6b-\u1b73\u1b80-\u1bf3\u1c00-\u1c37\u1c40-\u1c49\u1c4d-\u1c7d\u1cd0-\u1cd2\u1cd4-\u1cf6\u1d00-\u1de6\u1dfc-\u1f15\u1f18-\u1f1d\u1f20-\u1f45\u1f48-\u1f4d\u1f50-\u1f57\u1f59\u1f5b\u1f5d\u1f5f-\u1f7d\u1f80-\u1fb4\u1fb6-\u1fbc\u1fbe\u1fc2-\u1fc4\u1fc6-\u1fcc\u1fd0-\u1fd3\u1fd6-\u1fdb\u1fe0-\u1fec\u1ff2-\u1ff4\u1ff6-\u1ffc\u200c\u200d\u203f\u2040\u2054\u2071\u207f\u2090-\u209c\u20d0-\u20dc\u20e1\u20e5-\u20f0\u2102\u2107\u210a-\u2113\u2115\u2119-\u211d\u2124\u2126\u2128\u212a-\u212d\u212f-\u2139\u213c-\u213f\u2145-\u2149\u214e\u2160-\u2188\u2c00-\u2c2e\u2c30-\u2c5e\u2c60-\u2ce4\u2ceb-\u2cf3\u2d00-\u2d25\u2d27\u2d2d\u2d30-\u2d67\u2d6f\u2d7f-\u2d96\u2da0-\u2da6\u2da8-\u2dae\u2db0-\u2db6\u2db8-\u2dbe\u2dc0-\u2dc6\u2dc8-\u2dce\u2dd0-\u2dd6\u2dd8-\u2dde\u2de0-\u2dff\u2e2f\u3005-\u3007\u3021-\u302f\u3031-\u3035\u3038-\u303c\u3041-\u3096\u3099\u309a\u309d-\u309f\u30a1-\u30fa\u30fc-\u30ff\u3105-\u312d\u3131-\u318e\u31a0-\u31ba\u31f0-\u31ff\u3400-\u4db5\u4e00-\u9fcc\ua000-\ua48c\ua4d0-\ua4fd\ua500-\ua60c\ua610-\ua62b\ua640-\ua66f\ua674-\ua67d\ua67f-\ua697\ua69f-\ua6f1\ua717-\ua71f\ua722-\ua788\ua78b-\ua78e\ua790-\ua793\ua7a0-\ua7aa\ua7f8-\ua827\ua840-\ua873\ua880-\ua8c4\ua8d0-\ua8d9\ua8e0-\ua8f7\ua8fb\ua900-\ua92d\ua930-\ua953\ua960-\ua97c\ua980-\ua9c0\ua9cf-\ua9d9\uaa00-\uaa36\uaa40-\uaa4d\uaa50-\uaa59\uaa60-\uaa76\uaa7a\uaa7b\uaa80-\uaac2\uaadb-\uaadd\uaae0-\uaaef\uaaf2-\uaaf6\uab01-\uab06\uab09-\uab0e\uab11-\uab16\uab20-\uab26\uab28-\uab2e\uabc0-\uabea\uabec\uabed\uabf0-\uabf9\uac00-\ud7a3\ud7b0-\ud7c6\ud7cb-\ud7fb\uf900-\ufa6d\ufa70-\ufad9\ufb00-\ufb06\ufb13-\ufb17\ufb1d-\ufb28\ufb2a-\ufb36\ufb38-\ufb3c\ufb3e\ufb40\ufb41\ufb43\ufb44\ufb46-\ufbb1\ufbd3-\ufd3d\ufd50-\ufd8f\ufd92-\ufdc7\ufdf0-\ufdfb\ufe00-\ufe0f\ufe20-\ufe26\ufe33\ufe34\ufe4d-\ufe4f\ufe70-\ufe74\ufe76-\ufefc\uff10-\uff19\uff21-\uff3a\uff3f\uff41-\uff5a\uff66-\uffbe\uffc2-\uffc7\uffca-\uffcf\uffd2-\uffd7\uffda-\uffdc]')
    };
    function assert(condition, message) {
      if (!condition) {
        throw new Error('ASSERT: ' + message);
      }
    }
    function sliceSource(from, to) {
      return source.slice(from, to);
    }
    if (typeof'esprima'[0] === 'undefined') {
      sliceSource = function sliceArraySource(from, to) {
        return source.slice(from, to).join('');
      };
    }
    function isDecimalDigit(ch) {
      return '0123456789'.indexOf(ch) >= 0;
    }
    function isHexDigit(ch) {
      return '0123456789abcdefABCDEF'.indexOf(ch) >= 0;
    }
    function isOctalDigit(ch) {
      return '01234567'.indexOf(ch) >= 0;
    }
    function isWhiteSpace(ch) {
      return (ch === ' ') || (ch === '\u0009') || (ch === '\u000B') || (ch === '\u000C') || (ch === '\u00A0') || (ch.charCodeAt(0) >= 0x1680 && '\u1680\u180E\u2000\u2001\u2002\u2003\u2004\u2005\u2006\u2007\u2008\u2009\u200A\u202F\u205F\u3000\uFEFF'.indexOf(ch) >= 0);
    }
    function isLineTerminator(ch) {
      return (ch === '\n' || ch === '\r' || ch === '\u2028' || ch === '\u2029');
    }
    function isIdentifierStart(ch) {
      return (ch === '$') || (ch === '_') || (ch === '\\') || (ch >= 'a' && ch <= 'z') || (ch >= 'A' && ch <= 'Z') || ((ch.charCodeAt(0) >= 0x80) && Regex.NonAsciiIdentifierStart.test(ch));
    }
    function isIdentifierPart(ch) {
      return (ch === '$') || (ch === '_') || (ch === '\\') || (ch >= 'a' && ch <= 'z') || (ch >= 'A' && ch <= 'Z') || ((ch >= '0') && (ch <= '9')) || ((ch.charCodeAt(0) >= 0x80) && Regex.NonAsciiIdentifierPart.test(ch));
    }
    function isFutureReservedWord(id) {
      switch (id) {
        case 'class':
        case 'enum':
        case 'export':
        case 'extends':
        case 'import':
        case 'super':
          return true;
      }
      return false;
    }
    function isStrictModeReservedWord(id) {
      switch (id) {
        case 'implements':
        case 'interface':
        case 'package':
        case 'private':
        case 'protected':
        case 'public':
        case 'static':
        case 'yield':
        case 'let':
          return true;
      }
      return false;
    }
    function isRestrictedWord(id) {
      return id === 'eval' || id === 'arguments';
    }
    function isKeyword(id) {
      var keyword = false;
      switch (id.length) {
        case 2:
          keyword = (id === 'if') || (id === 'in') || (id === 'do');
          break;
        case 3:
          keyword = (id === 'var') || (id === 'for') || (id === 'new') || (id === 'try');
          break;
        case 4:
          keyword = (id === 'this') || (id === 'else') || (id === 'case') || (id === 'void') || (id === 'with');
          break;
        case 5:
          keyword = (id === 'while') || (id === 'break') || (id === 'catch') || (id === 'throw');
          break;
        case 6:
          keyword = (id === 'return') || (id === 'typeof') || (id === 'delete') || (id === 'switch');
          break;
        case 7:
          keyword = (id === 'default') || (id === 'finally');
          break;
        case 8:
          keyword = (id === 'function') || (id === 'continue') || (id === 'debugger');
          break;
        case 10:
          keyword = (id === 'instanceof');
          break;
      }
      if (keyword) {
        return true;
      }
      switch (id) {
        case 'const':
          return true;
        case 'yield':
        case 'let':
          return true;
      }
      if (strict && isStrictModeReservedWord(id)) {
        return true;
      }
      return isFutureReservedWord(id);
    }
    function skipComment() {
      var ch,
          blockComment,
          lineComment;
      blockComment = false;
      lineComment = false;
      while (index < length) {
        ch = source[index];
        if (lineComment) {
          ch = source[index++];
          if (isLineTerminator(ch)) {
            lineComment = false;
            if (ch === '\r' && source[index] === '\n') {
              ++index;
            }
            ++lineNumber;
            lineStart = index;
          }
        } else if (blockComment) {
          if (isLineTerminator(ch)) {
            if (ch === '\r' && source[index + 1] === '\n') {
              ++index;
            }
            ++lineNumber;
            ++index;
            lineStart = index;
            if (index >= length) {
              throwError({}, Messages.UnexpectedToken, 'ILLEGAL');
            }
          } else {
            ch = source[index++];
            if (index >= length) {
              throwError({}, Messages.UnexpectedToken, 'ILLEGAL');
            }
            if (ch === '*') {
              ch = source[index];
              if (ch === '/') {
                ++index;
                blockComment = false;
              }
            }
          }
        } else if (ch === '/') {
          ch = source[index + 1];
          if (ch === '/') {
            index += 2;
            lineComment = true;
          } else if (ch === '*') {
            index += 2;
            blockComment = true;
            if (index >= length) {
              throwError({}, Messages.UnexpectedToken, 'ILLEGAL');
            }
          } else {
            break;
          }
        } else if (isWhiteSpace(ch)) {
          ++index;
        } else if (isLineTerminator(ch)) {
          ++index;
          if (ch === '\r' && source[index] === '\n') {
            ++index;
          }
          ++lineNumber;
          lineStart = index;
        } else {
          break;
        }
      }
    }
    function scanHexEscape(prefix) {
      var i,
          len,
          ch,
          code = 0;
      len = (prefix === 'u') ? 4 : 2;
      for (i = 0; i < len; ++i) {
        if (index < length && isHexDigit(source[index])) {
          ch = source[index++];
          code = code * 16 + '0123456789abcdef'.indexOf(ch.toLowerCase());
        } else {
          return '';
        }
      }
      return String.fromCharCode(code);
    }
    function scanIdentifier() {
      var ch,
          start,
          id,
          restore;
      ch = source[index];
      if (!isIdentifierStart(ch)) {
        return ;
      }
      start = index;
      if (ch === '\\') {
        ++index;
        if (source[index] !== 'u') {
          return ;
        }
        ++index;
        restore = index;
        ch = scanHexEscape('u');
        if (ch) {
          if (ch === '\\' || !isIdentifierStart(ch)) {
            return ;
          }
          id = ch;
        } else {
          index = restore;
          id = 'u';
        }
      } else {
        id = source[index++];
      }
      while (index < length) {
        ch = source[index];
        if (!isIdentifierPart(ch)) {
          break;
        }
        if (ch === '\\') {
          ++index;
          if (source[index] !== 'u') {
            return ;
          }
          ++index;
          restore = index;
          ch = scanHexEscape('u');
          if (ch) {
            if (ch === '\\' || !isIdentifierPart(ch)) {
              return ;
            }
            id += ch;
          } else {
            index = restore;
            id += 'u';
          }
        } else {
          id += source[index++];
        }
      }
      if (id.length === 1) {
        return {
          type: Token.Identifier,
          value: id,
          lineNumber: lineNumber,
          lineStart: lineStart,
          range: [start, index]
        };
      }
      if (isKeyword(id)) {
        return {
          type: Token.Keyword,
          value: id,
          lineNumber: lineNumber,
          lineStart: lineStart,
          range: [start, index]
        };
      }
      if (id === 'null') {
        return {
          type: Token.NullLiteral,
          value: id,
          lineNumber: lineNumber,
          lineStart: lineStart,
          range: [start, index]
        };
      }
      if (id === 'true' || id === 'false') {
        return {
          type: Token.BooleanLiteral,
          value: id,
          lineNumber: lineNumber,
          lineStart: lineStart,
          range: [start, index]
        };
      }
      return {
        type: Token.Identifier,
        value: id,
        lineNumber: lineNumber,
        lineStart: lineStart,
        range: [start, index]
      };
    }
    function scanPunctuator() {
      var start = index,
          ch1 = source[index],
          ch2,
          ch3,
          ch4;
      if (ch1 === ';' || ch1 === '{' || ch1 === '}') {
        ++index;
        return {
          type: Token.Punctuator,
          value: ch1,
          lineNumber: lineNumber,
          lineStart: lineStart,
          range: [start, index]
        };
      }
      if (ch1 === ',' || ch1 === '(' || ch1 === ')') {
        ++index;
        return {
          type: Token.Punctuator,
          value: ch1,
          lineNumber: lineNumber,
          lineStart: lineStart,
          range: [start, index]
        };
      }
      ch2 = source[index + 1];
      if (ch1 === '.' && !isDecimalDigit(ch2)) {
        return {
          type: Token.Punctuator,
          value: source[index++],
          lineNumber: lineNumber,
          lineStart: lineStart,
          range: [start, index]
        };
      }
      ch3 = source[index + 2];
      ch4 = source[index + 3];
      if (ch1 === '>' && ch2 === '>' && ch3 === '>') {
        if (ch4 === '=') {
          index += 4;
          return {
            type: Token.Punctuator,
            value: '>>>=',
            lineNumber: lineNumber,
            lineStart: lineStart,
            range: [start, index]
          };
        }
      }
      if (ch1 === '=' && ch2 === '=' && ch3 === '=') {
        index += 3;
        return {
          type: Token.Punctuator,
          value: '===',
          lineNumber: lineNumber,
          lineStart: lineStart,
          range: [start, index]
        };
      }
      if (ch1 === '!' && ch2 === '=' && ch3 === '=') {
        index += 3;
        return {
          type: Token.Punctuator,
          value: '!==',
          lineNumber: lineNumber,
          lineStart: lineStart,
          range: [start, index]
        };
      }
      if (ch1 === '>' && ch2 === '>' && ch3 === '>') {
        index += 3;
        return {
          type: Token.Punctuator,
          value: '>>>',
          lineNumber: lineNumber,
          lineStart: lineStart,
          range: [start, index]
        };
      }
      if (ch1 === '<' && ch2 === '<' && ch3 === '=') {
        index += 3;
        return {
          type: Token.Punctuator,
          value: '<<=',
          lineNumber: lineNumber,
          lineStart: lineStart,
          range: [start, index]
        };
      }
      if (ch1 === '>' && ch2 === '>' && ch3 === '=') {
        index += 3;
        return {
          type: Token.Punctuator,
          value: '>>=',
          lineNumber: lineNumber,
          lineStart: lineStart,
          range: [start, index]
        };
      }
      if (ch2 === '=') {
        if ('<>=!+-*%&|^/'.indexOf(ch1) >= 0) {
          index += 2;
          return {
            type: Token.Punctuator,
            value: ch1 + ch2,
            lineNumber: lineNumber,
            lineStart: lineStart,
            range: [start, index]
          };
        }
      }
      if (ch1 === ch2 && ('+-<>&|'.indexOf(ch1) >= 0)) {
        if ('+-<>&|'.indexOf(ch2) >= 0) {
          index += 2;
          return {
            type: Token.Punctuator,
            value: ch1 + ch2,
            lineNumber: lineNumber,
            lineStart: lineStart,
            range: [start, index]
          };
        }
      }
      if ('[]<>+-*%&|^!~?:=/'.indexOf(ch1) >= 0) {
        return {
          type: Token.Punctuator,
          value: source[index++],
          lineNumber: lineNumber,
          lineStart: lineStart,
          range: [start, index]
        };
      }
    }
    function scanNumericLiteral() {
      var number,
          start,
          ch;
      ch = source[index];
      assert(isDecimalDigit(ch) || (ch === '.'), 'Numeric literal must start with a decimal digit or a decimal point');
      start = index;
      number = '';
      if (ch !== '.') {
        number = source[index++];
        ch = source[index];
        if (number === '0') {
          if (ch === 'x' || ch === 'X') {
            number += source[index++];
            while (index < length) {
              ch = source[index];
              if (!isHexDigit(ch)) {
                break;
              }
              number += source[index++];
            }
            if (number.length <= 2) {
              throwError({}, Messages.UnexpectedToken, 'ILLEGAL');
            }
            if (index < length) {
              ch = source[index];
              if (isIdentifierStart(ch)) {
                throwError({}, Messages.UnexpectedToken, 'ILLEGAL');
              }
            }
            return {
              type: Token.NumericLiteral,
              value: parseInt(number, 16),
              lineNumber: lineNumber,
              lineStart: lineStart,
              range: [start, index]
            };
          } else if (isOctalDigit(ch)) {
            number += source[index++];
            while (index < length) {
              ch = source[index];
              if (!isOctalDigit(ch)) {
                break;
              }
              number += source[index++];
            }
            if (index < length) {
              ch = source[index];
              if (isIdentifierStart(ch) || isDecimalDigit(ch)) {
                throwError({}, Messages.UnexpectedToken, 'ILLEGAL');
              }
            }
            return {
              type: Token.NumericLiteral,
              value: parseInt(number, 8),
              octal: true,
              lineNumber: lineNumber,
              lineStart: lineStart,
              range: [start, index]
            };
          }
          if (isDecimalDigit(ch)) {
            throwError({}, Messages.UnexpectedToken, 'ILLEGAL');
          }
        }
        while (index < length) {
          ch = source[index];
          if (!isDecimalDigit(ch)) {
            break;
          }
          number += source[index++];
        }
      }
      if (ch === '.') {
        number += source[index++];
        while (index < length) {
          ch = source[index];
          if (!isDecimalDigit(ch)) {
            break;
          }
          number += source[index++];
        }
      }
      if (ch === 'e' || ch === 'E') {
        number += source[index++];
        ch = source[index];
        if (ch === '+' || ch === '-') {
          number += source[index++];
        }
        ch = source[index];
        if (isDecimalDigit(ch)) {
          number += source[index++];
          while (index < length) {
            ch = source[index];
            if (!isDecimalDigit(ch)) {
              break;
            }
            number += source[index++];
          }
        } else {
          ch = 'character ' + ch;
          if (index >= length) {
            ch = '<end>';
          }
          throwError({}, Messages.UnexpectedToken, 'ILLEGAL');
        }
      }
      if (index < length) {
        ch = source[index];
        if (isIdentifierStart(ch)) {
          throwError({}, Messages.UnexpectedToken, 'ILLEGAL');
        }
      }
      return {
        type: Token.NumericLiteral,
        value: parseFloat(number),
        lineNumber: lineNumber,
        lineStart: lineStart,
        range: [start, index]
      };
    }
    function scanStringLiteral() {
      var str = '',
          quote,
          start,
          ch,
          code,
          unescaped,
          restore,
          octal = false;
      quote = source[index];
      assert((quote === '\'' || quote === '"'), 'String literal must starts with a quote');
      start = index;
      ++index;
      while (index < length) {
        ch = source[index++];
        if (ch === quote) {
          quote = '';
          break;
        } else if (ch === '\\') {
          ch = source[index++];
          if (!isLineTerminator(ch)) {
            switch (ch) {
              case 'n':
                str += '\n';
                break;
              case 'r':
                str += '\r';
                break;
              case 't':
                str += '\t';
                break;
              case 'u':
              case 'x':
                restore = index;
                unescaped = scanHexEscape(ch);
                if (unescaped) {
                  str += unescaped;
                } else {
                  index = restore;
                  str += ch;
                }
                break;
              case 'b':
                str += '\b';
                break;
              case 'f':
                str += '\f';
                break;
              case 'v':
                str += '\x0B';
                break;
              default:
                if (isOctalDigit(ch)) {
                  code = '01234567'.indexOf(ch);
                  if (code !== 0) {
                    octal = true;
                  }
                  if (index < length && isOctalDigit(source[index])) {
                    octal = true;
                    code = code * 8 + '01234567'.indexOf(source[index++]);
                    if ('0123'.indexOf(ch) >= 0 && index < length && isOctalDigit(source[index])) {
                      code = code * 8 + '01234567'.indexOf(source[index++]);
                    }
                  }
                  str += String.fromCharCode(code);
                } else {
                  str += ch;
                }
                break;
            }
          } else {
            ++lineNumber;
            if (ch === '\r' && source[index] === '\n') {
              ++index;
            }
          }
        } else if (isLineTerminator(ch)) {
          break;
        } else {
          str += ch;
        }
      }
      if (quote !== '') {
        throwError({}, Messages.UnexpectedToken, 'ILLEGAL');
      }
      return {
        type: Token.StringLiteral,
        value: str,
        octal: octal,
        lineNumber: lineNumber,
        lineStart: lineStart,
        range: [start, index]
      };
    }
    function scanRegExp() {
      var str,
          ch,
          start,
          pattern,
          flags,
          value,
          classMarker = false,
          restore,
          terminated = false;
      buffer = null;
      skipComment();
      start = index;
      ch = source[index];
      assert(ch === '/', 'Regular expression literal must start with a slash');
      str = source[index++];
      while (index < length) {
        ch = source[index++];
        str += ch;
        if (ch === '\\') {
          ch = source[index++];
          if (isLineTerminator(ch)) {
            throwError({}, Messages.UnterminatedRegExp);
          }
          str += ch;
        } else if (classMarker) {
          if (ch === ']') {
            classMarker = false;
          }
        } else {
          if (ch === '/') {
            terminated = true;
            break;
          } else if (ch === '[') {
            classMarker = true;
          } else if (isLineTerminator(ch)) {
            throwError({}, Messages.UnterminatedRegExp);
          }
        }
      }
      if (!terminated) {
        throwError({}, Messages.UnterminatedRegExp);
      }
      pattern = str.substr(1, str.length - 2);
      flags = '';
      while (index < length) {
        ch = source[index];
        if (!isIdentifierPart(ch)) {
          break;
        }
        ++index;
        if (ch === '\\' && index < length) {
          ch = source[index];
          if (ch === 'u') {
            ++index;
            restore = index;
            ch = scanHexEscape('u');
            if (ch) {
              flags += ch;
              str += '\\u';
              for (; restore < index; ++restore) {
                str += source[restore];
              }
            } else {
              index = restore;
              flags += 'u';
              str += '\\u';
            }
          } else {
            str += '\\';
          }
        } else {
          flags += ch;
          str += ch;
        }
      }
      try {
        value = new RegExp(pattern, flags);
      } catch (e) {
        throwError({}, Messages.InvalidRegExp);
      }
      return {
        literal: str,
        value: value,
        range: [start, index]
      };
    }
    function isIdentifierName(token) {
      return token.type === Token.Identifier || token.type === Token.Keyword || token.type === Token.BooleanLiteral || token.type === Token.NullLiteral;
    }
    function advance() {
      var ch,
          token;
      skipComment();
      if (index >= length) {
        return {
          type: Token.EOF,
          lineNumber: lineNumber,
          lineStart: lineStart,
          range: [index, index]
        };
      }
      token = scanPunctuator();
      if (typeof token !== 'undefined') {
        return token;
      }
      ch = source[index];
      if (ch === '\'' || ch === '"') {
        return scanStringLiteral();
      }
      if (ch === '.' || isDecimalDigit(ch)) {
        return scanNumericLiteral();
      }
      token = scanIdentifier();
      if (typeof token !== 'undefined') {
        return token;
      }
      throwError({}, Messages.UnexpectedToken, 'ILLEGAL');
    }
    function lex() {
      var token;
      if (buffer) {
        index = buffer.range[1];
        lineNumber = buffer.lineNumber;
        lineStart = buffer.lineStart;
        token = buffer;
        buffer = null;
        return token;
      }
      buffer = null;
      return advance();
    }
    function lookahead() {
      var pos,
          line,
          start;
      if (buffer !== null) {
        return buffer;
      }
      pos = index;
      line = lineNumber;
      start = lineStart;
      buffer = advance();
      index = pos;
      lineNumber = line;
      lineStart = start;
      return buffer;
    }
    function peekLineTerminator() {
      var pos,
          line,
          start,
          found;
      pos = index;
      line = lineNumber;
      start = lineStart;
      skipComment();
      found = lineNumber !== line;
      index = pos;
      lineNumber = line;
      lineStart = start;
      return found;
    }
    function throwError(token, messageFormat) {
      var error,
          args = Array.prototype.slice.call(arguments, 2),
          msg = messageFormat.replace(/%(\d)/g, function(whole, index) {
            return args[index] || '';
          });
      if (typeof token.lineNumber === 'number') {
        error = new Error('Line ' + token.lineNumber + ': ' + msg);
        error.index = token.range[0];
        error.lineNumber = token.lineNumber;
        error.column = token.range[0] - lineStart + 1;
      } else {
        error = new Error('Line ' + lineNumber + ': ' + msg);
        error.index = index;
        error.lineNumber = lineNumber;
        error.column = index - lineStart + 1;
      }
      throw error;
    }
    function throwErrorTolerant() {
      try {
        throwError.apply(null, arguments);
      } catch (e) {
        if (extra.errors) {
          extra.errors.push(e);
        } else {
          throw e;
        }
      }
    }
    function throwUnexpected(token) {
      if (token.type === Token.EOF) {
        throwError(token, Messages.UnexpectedEOS);
      }
      if (token.type === Token.NumericLiteral) {
        throwError(token, Messages.UnexpectedNumber);
      }
      if (token.type === Token.StringLiteral) {
        throwError(token, Messages.UnexpectedString);
      }
      if (token.type === Token.Identifier) {
        throwError(token, Messages.UnexpectedIdentifier);
      }
      if (token.type === Token.Keyword) {
        if (isFutureReservedWord(token.value)) {
          throwError(token, Messages.UnexpectedReserved);
        } else if (strict && isStrictModeReservedWord(token.value)) {
          throwErrorTolerant(token, Messages.StrictReservedWord);
          return ;
        }
        throwError(token, Messages.UnexpectedToken, token.value);
      }
      throwError(token, Messages.UnexpectedToken, token.value);
    }
    function expect(value) {
      var token = lex();
      if (token.type !== Token.Punctuator || token.value !== value) {
        throwUnexpected(token);
      }
    }
    function expectKeyword(keyword) {
      var token = lex();
      if (token.type !== Token.Keyword || token.value !== keyword) {
        throwUnexpected(token);
      }
    }
    function match(value) {
      var token = lookahead();
      return token.type === Token.Punctuator && token.value === value;
    }
    function matchKeyword(keyword) {
      var token = lookahead();
      return token.type === Token.Keyword && token.value === keyword;
    }
    function matchAssign() {
      var token = lookahead(),
          op = token.value;
      if (token.type !== Token.Punctuator) {
        return false;
      }
      return op === '=' || op === '*=' || op === '/=' || op === '%=' || op === '+=' || op === '-=' || op === '<<=' || op === '>>=' || op === '>>>=' || op === '&=' || op === '^=' || op === '|=';
    }
    function consumeSemicolon() {
      var token,
          line;
      if (source[index] === ';') {
        lex();
        return ;
      }
      line = lineNumber;
      skipComment();
      if (lineNumber !== line) {
        return ;
      }
      if (match(';')) {
        lex();
        return ;
      }
      token = lookahead();
      if (token.type !== Token.EOF && !match('}')) {
        throwUnexpected(token);
      }
    }
    function isLeftHandSide(expr) {
      return expr.type === Syntax.Identifier || expr.type === Syntax.MemberExpression;
    }
    function parseArrayInitialiser() {
      var elements = [];
      expect('[');
      while (!match(']')) {
        if (match(',')) {
          lex();
          elements.push(null);
        } else {
          elements.push(parseAssignmentExpression());
          if (!match(']')) {
            expect(',');
          }
        }
      }
      expect(']');
      return {
        type: Syntax.ArrayExpression,
        elements: elements
      };
    }
    function parsePropertyFunction(param, first) {
      var previousStrict,
          body;
      previousStrict = strict;
      body = parseFunctionSourceElements();
      if (first && strict && isRestrictedWord(param[0].name)) {
        throwErrorTolerant(first, Messages.StrictParamName);
      }
      strict = previousStrict;
      return {
        type: Syntax.FunctionExpression,
        id: null,
        params: param,
        defaults: [],
        body: body,
        rest: null,
        generator: false,
        expression: false
      };
    }
    function parseObjectPropertyKey() {
      var token = lex();
      if (token.type === Token.StringLiteral || token.type === Token.NumericLiteral) {
        if (strict && token.octal) {
          throwErrorTolerant(token, Messages.StrictOctalLiteral);
        }
        return createLiteral(token);
      }
      return {
        type: Syntax.Identifier,
        name: token.value
      };
    }
    function parseObjectProperty() {
      var token,
          key,
          id,
          param;
      token = lookahead();
      if (token.type === Token.Identifier) {
        id = parseObjectPropertyKey();
        if (token.value === 'get' && !match(':')) {
          key = parseObjectPropertyKey();
          expect('(');
          expect(')');
          return {
            type: Syntax.Property,
            key: key,
            value: parsePropertyFunction([]),
            kind: 'get'
          };
        } else if (token.value === 'set' && !match(':')) {
          key = parseObjectPropertyKey();
          expect('(');
          token = lookahead();
          if (token.type !== Token.Identifier) {
            expect(')');
            throwErrorTolerant(token, Messages.UnexpectedToken, token.value);
            return {
              type: Syntax.Property,
              key: key,
              value: parsePropertyFunction([]),
              kind: 'set'
            };
          } else {
            param = [parseVariableIdentifier()];
            expect(')');
            return {
              type: Syntax.Property,
              key: key,
              value: parsePropertyFunction(param, token),
              kind: 'set'
            };
          }
        } else {
          expect(':');
          return {
            type: Syntax.Property,
            key: id,
            value: parseAssignmentExpression(),
            kind: 'init'
          };
        }
      } else if (token.type === Token.EOF || token.type === Token.Punctuator) {
        throwUnexpected(token);
      } else {
        key = parseObjectPropertyKey();
        expect(':');
        return {
          type: Syntax.Property,
          key: key,
          value: parseAssignmentExpression(),
          kind: 'init'
        };
      }
    }
    function parseObjectInitialiser() {
      var properties = [],
          property,
          name,
          kind,
          map = {},
          toString = String;
      expect('{');
      while (!match('}')) {
        property = parseObjectProperty();
        if (property.key.type === Syntax.Identifier) {
          name = property.key.name;
        } else {
          name = toString(property.key.value);
        }
        kind = (property.kind === 'init') ? PropertyKind.Data : (property.kind === 'get') ? PropertyKind.Get : PropertyKind.Set;
        if (Object.prototype.hasOwnProperty.call(map, name)) {
          if (map[name] === PropertyKind.Data) {
            if (strict && kind === PropertyKind.Data) {
              throwErrorTolerant({}, Messages.StrictDuplicateProperty);
            } else if (kind !== PropertyKind.Data) {
              throwErrorTolerant({}, Messages.AccessorDataProperty);
            }
          } else {
            if (kind === PropertyKind.Data) {
              throwErrorTolerant({}, Messages.AccessorDataProperty);
            } else if (map[name] & kind) {
              throwErrorTolerant({}, Messages.AccessorGetSet);
            }
          }
          map[name] |= kind;
        } else {
          map[name] = kind;
        }
        properties.push(property);
        if (!match('}')) {
          expect(',');
        }
      }
      expect('}');
      return {
        type: Syntax.ObjectExpression,
        properties: properties
      };
    }
    function parseGroupExpression() {
      var expr;
      expect('(');
      expr = parseExpression();
      expect(')');
      return expr;
    }
    function parsePrimaryExpression() {
      var token = lookahead(),
          type = token.type;
      if (type === Token.Identifier) {
        return {
          type: Syntax.Identifier,
          name: lex().value
        };
      }
      if (type === Token.StringLiteral || type === Token.NumericLiteral) {
        if (strict && token.octal) {
          throwErrorTolerant(token, Messages.StrictOctalLiteral);
        }
        return createLiteral(lex());
      }
      if (type === Token.Keyword) {
        if (matchKeyword('this')) {
          lex();
          return {type: Syntax.ThisExpression};
        }
        if (matchKeyword('function')) {
          return parseFunctionExpression();
        }
      }
      if (type === Token.BooleanLiteral) {
        lex();
        token.value = (token.value === 'true');
        return createLiteral(token);
      }
      if (type === Token.NullLiteral) {
        lex();
        token.value = null;
        return createLiteral(token);
      }
      if (match('[')) {
        return parseArrayInitialiser();
      }
      if (match('{')) {
        return parseObjectInitialiser();
      }
      if (match('(')) {
        return parseGroupExpression();
      }
      if (match('/') || match('/=')) {
        return createLiteral(scanRegExp());
      }
      return throwUnexpected(lex());
    }
    function parseArguments() {
      var args = [];
      expect('(');
      if (!match(')')) {
        while (index < length) {
          args.push(parseAssignmentExpression());
          if (match(')')) {
            break;
          }
          expect(',');
        }
      }
      expect(')');
      return args;
    }
    function parseNonComputedProperty() {
      var token = lex();
      if (!isIdentifierName(token)) {
        throwUnexpected(token);
      }
      return {
        type: Syntax.Identifier,
        name: token.value
      };
    }
    function parseNonComputedMember() {
      expect('.');
      return parseNonComputedProperty();
    }
    function parseComputedMember() {
      var expr;
      expect('[');
      expr = parseExpression();
      expect(']');
      return expr;
    }
    function parseNewExpression() {
      var expr;
      expectKeyword('new');
      expr = {
        type: Syntax.NewExpression,
        callee: parseLeftHandSideExpression(),
        'arguments': []
      };
      if (match('(')) {
        expr['arguments'] = parseArguments();
      }
      return expr;
    }
    function parseLeftHandSideExpressionAllowCall() {
      var expr;
      expr = matchKeyword('new') ? parseNewExpression() : parsePrimaryExpression();
      while (match('.') || match('[') || match('(')) {
        if (match('(')) {
          expr = {
            type: Syntax.CallExpression,
            callee: expr,
            'arguments': parseArguments()
          };
        } else if (match('[')) {
          expr = {
            type: Syntax.MemberExpression,
            computed: true,
            object: expr,
            property: parseComputedMember()
          };
        } else {
          expr = {
            type: Syntax.MemberExpression,
            computed: false,
            object: expr,
            property: parseNonComputedMember()
          };
        }
      }
      return expr;
    }
    function parseLeftHandSideExpression() {
      var expr;
      expr = matchKeyword('new') ? parseNewExpression() : parsePrimaryExpression();
      while (match('.') || match('[')) {
        if (match('[')) {
          expr = {
            type: Syntax.MemberExpression,
            computed: true,
            object: expr,
            property: parseComputedMember()
          };
        } else {
          expr = {
            type: Syntax.MemberExpression,
            computed: false,
            object: expr,
            property: parseNonComputedMember()
          };
        }
      }
      return expr;
    }
    function parsePostfixExpression() {
      var expr = parseLeftHandSideExpressionAllowCall(),
          token;
      token = lookahead();
      if (token.type !== Token.Punctuator) {
        return expr;
      }
      if ((match('++') || match('--')) && !peekLineTerminator()) {
        if (strict && expr.type === Syntax.Identifier && isRestrictedWord(expr.name)) {
          throwErrorTolerant({}, Messages.StrictLHSPostfix);
        }
        if (!isLeftHandSide(expr)) {
          throwErrorTolerant({}, Messages.InvalidLHSInAssignment);
        }
        expr = {
          type: Syntax.UpdateExpression,
          operator: lex().value,
          argument: expr,
          prefix: false
        };
      }
      return expr;
    }
    function parseUnaryExpression() {
      var token,
          expr;
      token = lookahead();
      if (token.type !== Token.Punctuator && token.type !== Token.Keyword) {
        return parsePostfixExpression();
      }
      if (match('++') || match('--')) {
        token = lex();
        expr = parseUnaryExpression();
        if (strict && expr.type === Syntax.Identifier && isRestrictedWord(expr.name)) {
          throwErrorTolerant({}, Messages.StrictLHSPrefix);
        }
        if (!isLeftHandSide(expr)) {
          throwErrorTolerant({}, Messages.InvalidLHSInAssignment);
        }
        expr = {
          type: Syntax.UpdateExpression,
          operator: token.value,
          argument: expr,
          prefix: true
        };
        return expr;
      }
      if (match('+') || match('-') || match('~') || match('!')) {
        expr = {
          type: Syntax.UnaryExpression,
          operator: lex().value,
          argument: parseUnaryExpression(),
          prefix: true
        };
        return expr;
      }
      if (matchKeyword('delete') || matchKeyword('void') || matchKeyword('typeof')) {
        expr = {
          type: Syntax.UnaryExpression,
          operator: lex().value,
          argument: parseUnaryExpression(),
          prefix: true
        };
        if (strict && expr.operator === 'delete' && expr.argument.type === Syntax.Identifier) {
          throwErrorTolerant({}, Messages.StrictDelete);
        }
        return expr;
      }
      return parsePostfixExpression();
    }
    function parseMultiplicativeExpression() {
      var expr = parseUnaryExpression();
      while (match('*') || match('/') || match('%')) {
        expr = {
          type: Syntax.BinaryExpression,
          operator: lex().value,
          left: expr,
          right: parseUnaryExpression()
        };
      }
      return expr;
    }
    function parseAdditiveExpression() {
      var expr = parseMultiplicativeExpression();
      while (match('+') || match('-')) {
        expr = {
          type: Syntax.BinaryExpression,
          operator: lex().value,
          left: expr,
          right: parseMultiplicativeExpression()
        };
      }
      return expr;
    }
    function parseShiftExpression() {
      var expr = parseAdditiveExpression();
      while (match('<<') || match('>>') || match('>>>')) {
        expr = {
          type: Syntax.BinaryExpression,
          operator: lex().value,
          left: expr,
          right: parseAdditiveExpression()
        };
      }
      return expr;
    }
    function parseRelationalExpression() {
      var expr,
          previousAllowIn;
      previousAllowIn = state.allowIn;
      state.allowIn = true;
      expr = parseShiftExpression();
      while (match('<') || match('>') || match('<=') || match('>=') || (previousAllowIn && matchKeyword('in')) || matchKeyword('instanceof')) {
        expr = {
          type: Syntax.BinaryExpression,
          operator: lex().value,
          left: expr,
          right: parseShiftExpression()
        };
      }
      state.allowIn = previousAllowIn;
      return expr;
    }
    function parseEqualityExpression() {
      var expr = parseRelationalExpression();
      while (match('==') || match('!=') || match('===') || match('!==')) {
        expr = {
          type: Syntax.BinaryExpression,
          operator: lex().value,
          left: expr,
          right: parseRelationalExpression()
        };
      }
      return expr;
    }
    function parseBitwiseANDExpression() {
      var expr = parseEqualityExpression();
      while (match('&')) {
        lex();
        expr = {
          type: Syntax.BinaryExpression,
          operator: '&',
          left: expr,
          right: parseEqualityExpression()
        };
      }
      return expr;
    }
    function parseBitwiseXORExpression() {
      var expr = parseBitwiseANDExpression();
      while (match('^')) {
        lex();
        expr = {
          type: Syntax.BinaryExpression,
          operator: '^',
          left: expr,
          right: parseBitwiseANDExpression()
        };
      }
      return expr;
    }
    function parseBitwiseORExpression() {
      var expr = parseBitwiseXORExpression();
      while (match('|')) {
        lex();
        expr = {
          type: Syntax.BinaryExpression,
          operator: '|',
          left: expr,
          right: parseBitwiseXORExpression()
        };
      }
      return expr;
    }
    function parseLogicalANDExpression() {
      var expr = parseBitwiseORExpression();
      while (match('&&')) {
        lex();
        expr = {
          type: Syntax.LogicalExpression,
          operator: '&&',
          left: expr,
          right: parseBitwiseORExpression()
        };
      }
      return expr;
    }
    function parseLogicalORExpression() {
      var expr = parseLogicalANDExpression();
      while (match('||')) {
        lex();
        expr = {
          type: Syntax.LogicalExpression,
          operator: '||',
          left: expr,
          right: parseLogicalANDExpression()
        };
      }
      return expr;
    }
    function parseConditionalExpression() {
      var expr,
          previousAllowIn,
          consequent;
      expr = parseLogicalORExpression();
      if (match('?')) {
        lex();
        previousAllowIn = state.allowIn;
        state.allowIn = true;
        consequent = parseAssignmentExpression();
        state.allowIn = previousAllowIn;
        expect(':');
        expr = {
          type: Syntax.ConditionalExpression,
          test: expr,
          consequent: consequent,
          alternate: parseAssignmentExpression()
        };
      }
      return expr;
    }
    function parseAssignmentExpression() {
      var token,
          expr;
      token = lookahead();
      expr = parseConditionalExpression();
      if (matchAssign()) {
        if (!isLeftHandSide(expr)) {
          throwErrorTolerant({}, Messages.InvalidLHSInAssignment);
        }
        if (strict && expr.type === Syntax.Identifier && isRestrictedWord(expr.name)) {
          throwErrorTolerant(token, Messages.StrictLHSAssignment);
        }
        expr = {
          type: Syntax.AssignmentExpression,
          operator: lex().value,
          left: expr,
          right: parseAssignmentExpression()
        };
      }
      return expr;
    }
    function parseExpression() {
      var expr = parseAssignmentExpression();
      if (match(',')) {
        expr = {
          type: Syntax.SequenceExpression,
          expressions: [expr]
        };
        while (index < length) {
          if (!match(',')) {
            break;
          }
          lex();
          expr.expressions.push(parseAssignmentExpression());
        }
      }
      return expr;
    }
    function parseStatementList() {
      var list = [],
          statement;
      while (index < length) {
        if (match('}')) {
          break;
        }
        statement = parseSourceElement();
        if (typeof statement === 'undefined') {
          break;
        }
        list.push(statement);
      }
      return list;
    }
    function parseBlock() {
      var block;
      expect('{');
      block = parseStatementList();
      expect('}');
      return {
        type: Syntax.BlockStatement,
        body: block
      };
    }
    function parseVariableIdentifier() {
      var token = lex();
      if (token.type !== Token.Identifier) {
        throwUnexpected(token);
      }
      return {
        type: Syntax.Identifier,
        name: token.value
      };
    }
    function parseVariableDeclaration(kind) {
      var id = parseVariableIdentifier(),
          init = null;
      if (strict && isRestrictedWord(id.name)) {
        throwErrorTolerant({}, Messages.StrictVarName);
      }
      if (kind === 'const') {
        expect('=');
        init = parseAssignmentExpression();
      } else if (match('=')) {
        lex();
        init = parseAssignmentExpression();
      }
      return {
        type: Syntax.VariableDeclarator,
        id: id,
        init: init
      };
    }
    function parseVariableDeclarationList(kind) {
      var list = [];
      do {
        list.push(parseVariableDeclaration(kind));
        if (!match(',')) {
          break;
        }
        lex();
      } while (index < length);
      return list;
    }
    function parseVariableStatement() {
      var declarations;
      expectKeyword('var');
      declarations = parseVariableDeclarationList();
      consumeSemicolon();
      return {
        type: Syntax.VariableDeclaration,
        declarations: declarations,
        kind: 'var'
      };
    }
    function parseConstLetDeclaration(kind) {
      var declarations;
      expectKeyword(kind);
      declarations = parseVariableDeclarationList(kind);
      consumeSemicolon();
      return {
        type: Syntax.VariableDeclaration,
        declarations: declarations,
        kind: kind
      };
    }
    function parseEmptyStatement() {
      expect(';');
      return {type: Syntax.EmptyStatement};
    }
    function parseExpressionStatement() {
      var expr = parseExpression();
      consumeSemicolon();
      return {
        type: Syntax.ExpressionStatement,
        expression: expr
      };
    }
    function parseIfStatement() {
      var test,
          consequent,
          alternate;
      expectKeyword('if');
      expect('(');
      test = parseExpression();
      expect(')');
      consequent = parseStatement();
      if (matchKeyword('else')) {
        lex();
        alternate = parseStatement();
      } else {
        alternate = null;
      }
      return {
        type: Syntax.IfStatement,
        test: test,
        consequent: consequent,
        alternate: alternate
      };
    }
    function parseDoWhileStatement() {
      var body,
          test,
          oldInIteration;
      expectKeyword('do');
      oldInIteration = state.inIteration;
      state.inIteration = true;
      body = parseStatement();
      state.inIteration = oldInIteration;
      expectKeyword('while');
      expect('(');
      test = parseExpression();
      expect(')');
      if (match(';')) {
        lex();
      }
      return {
        type: Syntax.DoWhileStatement,
        body: body,
        test: test
      };
    }
    function parseWhileStatement() {
      var test,
          body,
          oldInIteration;
      expectKeyword('while');
      expect('(');
      test = parseExpression();
      expect(')');
      oldInIteration = state.inIteration;
      state.inIteration = true;
      body = parseStatement();
      state.inIteration = oldInIteration;
      return {
        type: Syntax.WhileStatement,
        test: test,
        body: body
      };
    }
    function parseForVariableDeclaration() {
      var token = lex();
      return {
        type: Syntax.VariableDeclaration,
        declarations: parseVariableDeclarationList(),
        kind: token.value
      };
    }
    function parseForStatement() {
      var init,
          test,
          update,
          left,
          right,
          body,
          oldInIteration;
      init = test = update = null;
      expectKeyword('for');
      expect('(');
      if (match(';')) {
        lex();
      } else {
        if (matchKeyword('var') || matchKeyword('let')) {
          state.allowIn = false;
          init = parseForVariableDeclaration();
          state.allowIn = true;
          if (init.declarations.length === 1 && matchKeyword('in')) {
            lex();
            left = init;
            right = parseExpression();
            init = null;
          }
        } else {
          state.allowIn = false;
          init = parseExpression();
          state.allowIn = true;
          if (matchKeyword('in')) {
            if (!isLeftHandSide(init)) {
              throwErrorTolerant({}, Messages.InvalidLHSInForIn);
            }
            lex();
            left = init;
            right = parseExpression();
            init = null;
          }
        }
        if (typeof left === 'undefined') {
          expect(';');
        }
      }
      if (typeof left === 'undefined') {
        if (!match(';')) {
          test = parseExpression();
        }
        expect(';');
        if (!match(')')) {
          update = parseExpression();
        }
      }
      expect(')');
      oldInIteration = state.inIteration;
      state.inIteration = true;
      body = parseStatement();
      state.inIteration = oldInIteration;
      if (typeof left === 'undefined') {
        return {
          type: Syntax.ForStatement,
          init: init,
          test: test,
          update: update,
          body: body
        };
      }
      return {
        type: Syntax.ForInStatement,
        left: left,
        right: right,
        body: body,
        each: false
      };
    }
    function parseContinueStatement() {
      var token,
          label = null;
      expectKeyword('continue');
      if (source[index] === ';') {
        lex();
        if (!state.inIteration) {
          throwError({}, Messages.IllegalContinue);
        }
        return {
          type: Syntax.ContinueStatement,
          label: null
        };
      }
      if (peekLineTerminator()) {
        if (!state.inIteration) {
          throwError({}, Messages.IllegalContinue);
        }
        return {
          type: Syntax.ContinueStatement,
          label: null
        };
      }
      token = lookahead();
      if (token.type === Token.Identifier) {
        label = parseVariableIdentifier();
        if (!Object.prototype.hasOwnProperty.call(state.labelSet, label.name)) {
          throwError({}, Messages.UnknownLabel, label.name);
        }
      }
      consumeSemicolon();
      if (label === null && !state.inIteration) {
        throwError({}, Messages.IllegalContinue);
      }
      return {
        type: Syntax.ContinueStatement,
        label: label
      };
    }
    function parseBreakStatement() {
      var token,
          label = null;
      expectKeyword('break');
      if (source[index] === ';') {
        lex();
        if (!(state.inIteration || state.inSwitch)) {
          throwError({}, Messages.IllegalBreak);
        }
        return {
          type: Syntax.BreakStatement,
          label: null
        };
      }
      if (peekLineTerminator()) {
        if (!(state.inIteration || state.inSwitch)) {
          throwError({}, Messages.IllegalBreak);
        }
        return {
          type: Syntax.BreakStatement,
          label: null
        };
      }
      token = lookahead();
      if (token.type === Token.Identifier) {
        label = parseVariableIdentifier();
        if (!Object.prototype.hasOwnProperty.call(state.labelSet, label.name)) {
          throwError({}, Messages.UnknownLabel, label.name);
        }
      }
      consumeSemicolon();
      if (label === null && !(state.inIteration || state.inSwitch)) {
        throwError({}, Messages.IllegalBreak);
      }
      return {
        type: Syntax.BreakStatement,
        label: label
      };
    }
    function parseReturnStatement() {
      var token,
          argument = null;
      expectKeyword('return');
      if (!state.inFunctionBody) {
        throwErrorTolerant({}, Messages.IllegalReturn);
      }
      if (source[index] === ' ') {
        if (isIdentifierStart(source[index + 1])) {
          argument = parseExpression();
          consumeSemicolon();
          return {
            type: Syntax.ReturnStatement,
            argument: argument
          };
        }
      }
      if (peekLineTerminator()) {
        return {
          type: Syntax.ReturnStatement,
          argument: null
        };
      }
      if (!match(';')) {
        token = lookahead();
        if (!match('}') && token.type !== Token.EOF) {
          argument = parseExpression();
        }
      }
      consumeSemicolon();
      return {
        type: Syntax.ReturnStatement,
        argument: argument
      };
    }
    function parseWithStatement() {
      var object,
          body;
      if (strict) {
        throwErrorTolerant({}, Messages.StrictModeWith);
      }
      expectKeyword('with');
      expect('(');
      object = parseExpression();
      expect(')');
      body = parseStatement();
      return {
        type: Syntax.WithStatement,
        object: object,
        body: body
      };
    }
    function parseSwitchCase() {
      var test,
          consequent = [],
          statement;
      if (matchKeyword('default')) {
        lex();
        test = null;
      } else {
        expectKeyword('case');
        test = parseExpression();
      }
      expect(':');
      while (index < length) {
        if (match('}') || matchKeyword('default') || matchKeyword('case')) {
          break;
        }
        statement = parseStatement();
        if (typeof statement === 'undefined') {
          break;
        }
        consequent.push(statement);
      }
      return {
        type: Syntax.SwitchCase,
        test: test,
        consequent: consequent
      };
    }
    function parseSwitchStatement() {
      var discriminant,
          cases,
          clause,
          oldInSwitch,
          defaultFound;
      expectKeyword('switch');
      expect('(');
      discriminant = parseExpression();
      expect(')');
      expect('{');
      cases = [];
      if (match('}')) {
        lex();
        return {
          type: Syntax.SwitchStatement,
          discriminant: discriminant,
          cases: cases
        };
      }
      oldInSwitch = state.inSwitch;
      state.inSwitch = true;
      defaultFound = false;
      while (index < length) {
        if (match('}')) {
          break;
        }
        clause = parseSwitchCase();
        if (clause.test === null) {
          if (defaultFound) {
            throwError({}, Messages.MultipleDefaultsInSwitch);
          }
          defaultFound = true;
        }
        cases.push(clause);
      }
      state.inSwitch = oldInSwitch;
      expect('}');
      return {
        type: Syntax.SwitchStatement,
        discriminant: discriminant,
        cases: cases
      };
    }
    function parseThrowStatement() {
      var argument;
      expectKeyword('throw');
      if (peekLineTerminator()) {
        throwError({}, Messages.NewlineAfterThrow);
      }
      argument = parseExpression();
      consumeSemicolon();
      return {
        type: Syntax.ThrowStatement,
        argument: argument
      };
    }
    function parseCatchClause() {
      var param;
      expectKeyword('catch');
      expect('(');
      if (match(')')) {
        throwUnexpected(lookahead());
      }
      param = parseVariableIdentifier();
      if (strict && isRestrictedWord(param.name)) {
        throwErrorTolerant({}, Messages.StrictCatchVariable);
      }
      expect(')');
      return {
        type: Syntax.CatchClause,
        param: param,
        body: parseBlock()
      };
    }
    function parseTryStatement() {
      var block,
          handlers = [],
          finalizer = null;
      expectKeyword('try');
      block = parseBlock();
      if (matchKeyword('catch')) {
        handlers.push(parseCatchClause());
      }
      if (matchKeyword('finally')) {
        lex();
        finalizer = parseBlock();
      }
      if (handlers.length === 0 && !finalizer) {
        throwError({}, Messages.NoCatchOrFinally);
      }
      return {
        type: Syntax.TryStatement,
        block: block,
        guardedHandlers: [],
        handlers: handlers,
        finalizer: finalizer
      };
    }
    function parseDebuggerStatement() {
      expectKeyword('debugger');
      consumeSemicolon();
      return {type: Syntax.DebuggerStatement};
    }
    function parseStatement() {
      var token = lookahead(),
          expr,
          labeledBody;
      if (token.type === Token.EOF) {
        throwUnexpected(token);
      }
      if (token.type === Token.Punctuator) {
        switch (token.value) {
          case ';':
            return parseEmptyStatement();
          case '{':
            return parseBlock();
          case '(':
            return parseExpressionStatement();
          default:
            break;
        }
      }
      if (token.type === Token.Keyword) {
        switch (token.value) {
          case 'break':
            return parseBreakStatement();
          case 'continue':
            return parseContinueStatement();
          case 'debugger':
            return parseDebuggerStatement();
          case 'do':
            return parseDoWhileStatement();
          case 'for':
            return parseForStatement();
          case 'function':
            return parseFunctionDeclaration();
          case 'if':
            return parseIfStatement();
          case 'return':
            return parseReturnStatement();
          case 'switch':
            return parseSwitchStatement();
          case 'throw':
            return parseThrowStatement();
          case 'try':
            return parseTryStatement();
          case 'var':
            return parseVariableStatement();
          case 'while':
            return parseWhileStatement();
          case 'with':
            return parseWithStatement();
          default:
            break;
        }
      }
      expr = parseExpression();
      if ((expr.type === Syntax.Identifier) && match(':')) {
        lex();
        if (Object.prototype.hasOwnProperty.call(state.labelSet, expr.name)) {
          throwError({}, Messages.Redeclaration, 'Label', expr.name);
        }
        state.labelSet[expr.name] = true;
        labeledBody = parseStatement();
        delete state.labelSet[expr.name];
        return {
          type: Syntax.LabeledStatement,
          label: expr,
          body: labeledBody
        };
      }
      consumeSemicolon();
      return {
        type: Syntax.ExpressionStatement,
        expression: expr
      };
    }
    function parseFunctionSourceElements() {
      var sourceElement,
          sourceElements = [],
          token,
          directive,
          firstRestricted,
          oldLabelSet,
          oldInIteration,
          oldInSwitch,
          oldInFunctionBody;
      expect('{');
      while (index < length) {
        token = lookahead();
        if (token.type !== Token.StringLiteral) {
          break;
        }
        sourceElement = parseSourceElement();
        sourceElements.push(sourceElement);
        if (sourceElement.expression.type !== Syntax.Literal) {
          break;
        }
        directive = sliceSource(token.range[0] + 1, token.range[1] - 1);
        if (directive === 'use strict') {
          strict = true;
          if (firstRestricted) {
            throwErrorTolerant(firstRestricted, Messages.StrictOctalLiteral);
          }
        } else {
          if (!firstRestricted && token.octal) {
            firstRestricted = token;
          }
        }
      }
      oldLabelSet = state.labelSet;
      oldInIteration = state.inIteration;
      oldInSwitch = state.inSwitch;
      oldInFunctionBody = state.inFunctionBody;
      state.labelSet = {};
      state.inIteration = false;
      state.inSwitch = false;
      state.inFunctionBody = true;
      while (index < length) {
        if (match('}')) {
          break;
        }
        sourceElement = parseSourceElement();
        if (typeof sourceElement === 'undefined') {
          break;
        }
        sourceElements.push(sourceElement);
      }
      expect('}');
      state.labelSet = oldLabelSet;
      state.inIteration = oldInIteration;
      state.inSwitch = oldInSwitch;
      state.inFunctionBody = oldInFunctionBody;
      return {
        type: Syntax.BlockStatement,
        body: sourceElements
      };
    }
    function parseFunctionDeclaration() {
      var id,
          param,
          params = [],
          body,
          token,
          stricted,
          firstRestricted,
          message,
          previousStrict,
          paramSet;
      expectKeyword('function');
      token = lookahead();
      id = parseVariableIdentifier();
      if (strict) {
        if (isRestrictedWord(token.value)) {
          throwErrorTolerant(token, Messages.StrictFunctionName);
        }
      } else {
        if (isRestrictedWord(token.value)) {
          firstRestricted = token;
          message = Messages.StrictFunctionName;
        } else if (isStrictModeReservedWord(token.value)) {
          firstRestricted = token;
          message = Messages.StrictReservedWord;
        }
      }
      expect('(');
      if (!match(')')) {
        paramSet = {};
        while (index < length) {
          token = lookahead();
          param = parseVariableIdentifier();
          if (strict) {
            if (isRestrictedWord(token.value)) {
              stricted = token;
              message = Messages.StrictParamName;
            }
            if (Object.prototype.hasOwnProperty.call(paramSet, token.value)) {
              stricted = token;
              message = Messages.StrictParamDupe;
            }
          } else if (!firstRestricted) {
            if (isRestrictedWord(token.value)) {
              firstRestricted = token;
              message = Messages.StrictParamName;
            } else if (isStrictModeReservedWord(token.value)) {
              firstRestricted = token;
              message = Messages.StrictReservedWord;
            } else if (Object.prototype.hasOwnProperty.call(paramSet, token.value)) {
              firstRestricted = token;
              message = Messages.StrictParamDupe;
            }
          }
          params.push(param);
          paramSet[param.name] = true;
          if (match(')')) {
            break;
          }
          expect(',');
        }
      }
      expect(')');
      previousStrict = strict;
      body = parseFunctionSourceElements();
      if (strict && firstRestricted) {
        throwError(firstRestricted, message);
      }
      if (strict && stricted) {
        throwErrorTolerant(stricted, message);
      }
      strict = previousStrict;
      return {
        type: Syntax.FunctionDeclaration,
        id: id,
        params: params,
        defaults: [],
        body: body,
        rest: null,
        generator: false,
        expression: false
      };
    }
    function parseFunctionExpression() {
      var token,
          id = null,
          stricted,
          firstRestricted,
          message,
          param,
          params = [],
          body,
          previousStrict,
          paramSet;
      expectKeyword('function');
      if (!match('(')) {
        token = lookahead();
        id = parseVariableIdentifier();
        if (strict) {
          if (isRestrictedWord(token.value)) {
            throwErrorTolerant(token, Messages.StrictFunctionName);
          }
        } else {
          if (isRestrictedWord(token.value)) {
            firstRestricted = token;
            message = Messages.StrictFunctionName;
          } else if (isStrictModeReservedWord(token.value)) {
            firstRestricted = token;
            message = Messages.StrictReservedWord;
          }
        }
      }
      expect('(');
      if (!match(')')) {
        paramSet = {};
        while (index < length) {
          token = lookahead();
          param = parseVariableIdentifier();
          if (strict) {
            if (isRestrictedWord(token.value)) {
              stricted = token;
              message = Messages.StrictParamName;
            }
            if (Object.prototype.hasOwnProperty.call(paramSet, token.value)) {
              stricted = token;
              message = Messages.StrictParamDupe;
            }
          } else if (!firstRestricted) {
            if (isRestrictedWord(token.value)) {
              firstRestricted = token;
              message = Messages.StrictParamName;
            } else if (isStrictModeReservedWord(token.value)) {
              firstRestricted = token;
              message = Messages.StrictReservedWord;
            } else if (Object.prototype.hasOwnProperty.call(paramSet, token.value)) {
              firstRestricted = token;
              message = Messages.StrictParamDupe;
            }
          }
          params.push(param);
          paramSet[param.name] = true;
          if (match(')')) {
            break;
          }
          expect(',');
        }
      }
      expect(')');
      previousStrict = strict;
      body = parseFunctionSourceElements();
      if (strict && firstRestricted) {
        throwError(firstRestricted, message);
      }
      if (strict && stricted) {
        throwErrorTolerant(stricted, message);
      }
      strict = previousStrict;
      return {
        type: Syntax.FunctionExpression,
        id: id,
        params: params,
        defaults: [],
        body: body,
        rest: null,
        generator: false,
        expression: false
      };
    }
    function parseSourceElement() {
      var token = lookahead();
      if (token.type === Token.Keyword) {
        switch (token.value) {
          case 'const':
          case 'let':
            return parseConstLetDeclaration(token.value);
          case 'function':
            return parseFunctionDeclaration();
          default:
            return parseStatement();
        }
      }
      if (token.type !== Token.EOF) {
        return parseStatement();
      }
    }
    function parseSourceElements() {
      var sourceElement,
          sourceElements = [],
          token,
          directive,
          firstRestricted;
      while (index < length) {
        token = lookahead();
        if (token.type !== Token.StringLiteral) {
          break;
        }
        sourceElement = parseSourceElement();
        sourceElements.push(sourceElement);
        if (sourceElement.expression.type !== Syntax.Literal) {
          break;
        }
        directive = sliceSource(token.range[0] + 1, token.range[1] - 1);
        if (directive === 'use strict') {
          strict = true;
          if (firstRestricted) {
            throwErrorTolerant(firstRestricted, Messages.StrictOctalLiteral);
          }
        } else {
          if (!firstRestricted && token.octal) {
            firstRestricted = token;
          }
        }
      }
      while (index < length) {
        sourceElement = parseSourceElement();
        if (typeof sourceElement === 'undefined') {
          break;
        }
        sourceElements.push(sourceElement);
      }
      return sourceElements;
    }
    function parseProgram() {
      var program;
      strict = false;
      program = {
        type: Syntax.Program,
        body: parseSourceElements()
      };
      return program;
    }
    function addComment(type, value, start, end, loc) {
      assert(typeof start === 'number', 'Comment must have valid position');
      if (extra.comments.length > 0) {
        if (extra.comments[extra.comments.length - 1].range[1] > start) {
          return ;
        }
      }
      extra.comments.push({
        type: type,
        value: value,
        range: [start, end],
        loc: loc
      });
    }
    function scanComment() {
      var comment,
          ch,
          loc,
          start,
          blockComment,
          lineComment;
      comment = '';
      blockComment = false;
      lineComment = false;
      while (index < length) {
        ch = source[index];
        if (lineComment) {
          ch = source[index++];
          if (isLineTerminator(ch)) {
            loc.end = {
              line: lineNumber,
              column: index - lineStart - 1
            };
            lineComment = false;
            addComment('Line', comment, start, index - 1, loc);
            if (ch === '\r' && source[index] === '\n') {
              ++index;
            }
            ++lineNumber;
            lineStart = index;
            comment = '';
          } else if (index >= length) {
            lineComment = false;
            comment += ch;
            loc.end = {
              line: lineNumber,
              column: length - lineStart
            };
            addComment('Line', comment, start, length, loc);
          } else {
            comment += ch;
          }
        } else if (blockComment) {
          if (isLineTerminator(ch)) {
            if (ch === '\r' && source[index + 1] === '\n') {
              ++index;
              comment += '\r\n';
            } else {
              comment += ch;
            }
            ++lineNumber;
            ++index;
            lineStart = index;
            if (index >= length) {
              throwError({}, Messages.UnexpectedToken, 'ILLEGAL');
            }
          } else {
            ch = source[index++];
            if (index >= length) {
              throwError({}, Messages.UnexpectedToken, 'ILLEGAL');
            }
            comment += ch;
            if (ch === '*') {
              ch = source[index];
              if (ch === '/') {
                comment = comment.substr(0, comment.length - 1);
                blockComment = false;
                ++index;
                loc.end = {
                  line: lineNumber,
                  column: index - lineStart
                };
                addComment('Block', comment, start, index, loc);
                comment = '';
              }
            }
          }
        } else if (ch === '/') {
          ch = source[index + 1];
          if (ch === '/') {
            loc = {start: {
                line: lineNumber,
                column: index - lineStart
              }};
            start = index;
            index += 2;
            lineComment = true;
            if (index >= length) {
              loc.end = {
                line: lineNumber,
                column: index - lineStart
              };
              lineComment = false;
              addComment('Line', comment, start, index, loc);
            }
          } else if (ch === '*') {
            start = index;
            index += 2;
            blockComment = true;
            loc = {start: {
                line: lineNumber,
                column: index - lineStart - 2
              }};
            if (index >= length) {
              throwError({}, Messages.UnexpectedToken, 'ILLEGAL');
            }
          } else {
            break;
          }
        } else if (isWhiteSpace(ch)) {
          ++index;
        } else if (isLineTerminator(ch)) {
          ++index;
          if (ch === '\r' && source[index] === '\n') {
            ++index;
          }
          ++lineNumber;
          lineStart = index;
        } else {
          break;
        }
      }
    }
    function filterCommentLocation() {
      var i,
          entry,
          comment,
          comments = [];
      for (i = 0; i < extra.comments.length; ++i) {
        entry = extra.comments[i];
        comment = {
          type: entry.type,
          value: entry.value
        };
        if (extra.range) {
          comment.range = entry.range;
        }
        if (extra.loc) {
          comment.loc = entry.loc;
        }
        comments.push(comment);
      }
      extra.comments = comments;
    }
    function collectToken() {
      var start,
          loc,
          token,
          range,
          value;
      skipComment();
      start = index;
      loc = {start: {
          line: lineNumber,
          column: index - lineStart
        }};
      token = extra.advance();
      loc.end = {
        line: lineNumber,
        column: index - lineStart
      };
      if (token.type !== Token.EOF) {
        range = [token.range[0], token.range[1]];
        value = sliceSource(token.range[0], token.range[1]);
        extra.tokens.push({
          type: TokenName[token.type],
          value: value,
          range: range,
          loc: loc
        });
      }
      return token;
    }
    function collectRegex() {
      var pos,
          loc,
          regex,
          token;
      skipComment();
      pos = index;
      loc = {start: {
          line: lineNumber,
          column: index - lineStart
        }};
      regex = extra.scanRegExp();
      loc.end = {
        line: lineNumber,
        column: index - lineStart
      };
      if (extra.tokens.length > 0) {
        token = extra.tokens[extra.tokens.length - 1];
        if (token.range[0] === pos && token.type === 'Punctuator') {
          if (token.value === '/' || token.value === '/=') {
            extra.tokens.pop();
          }
        }
      }
      extra.tokens.push({
        type: 'RegularExpression',
        value: regex.literal,
        range: [pos, index],
        loc: loc
      });
      return regex;
    }
    function filterTokenLocation() {
      var i,
          entry,
          token,
          tokens = [];
      for (i = 0; i < extra.tokens.length; ++i) {
        entry = extra.tokens[i];
        token = {
          type: entry.type,
          value: entry.value
        };
        if (extra.range) {
          token.range = entry.range;
        }
        if (extra.loc) {
          token.loc = entry.loc;
        }
        tokens.push(token);
      }
      extra.tokens = tokens;
    }
    function createLiteral(token) {
      return {
        type: Syntax.Literal,
        value: token.value
      };
    }
    function createRawLiteral(token) {
      return {
        type: Syntax.Literal,
        value: token.value,
        raw: sliceSource(token.range[0], token.range[1])
      };
    }
    function createLocationMarker() {
      var marker = {};
      marker.range = [index, index];
      marker.loc = {
        start: {
          line: lineNumber,
          column: index - lineStart
        },
        end: {
          line: lineNumber,
          column: index - lineStart
        }
      };
      marker.end = function() {
        this.range[1] = index;
        this.loc.end.line = lineNumber;
        this.loc.end.column = index - lineStart;
      };
      marker.applyGroup = function(node) {
        if (extra.range) {
          node.groupRange = [this.range[0], this.range[1]];
        }
        if (extra.loc) {
          node.groupLoc = {
            start: {
              line: this.loc.start.line,
              column: this.loc.start.column
            },
            end: {
              line: this.loc.end.line,
              column: this.loc.end.column
            }
          };
        }
      };
      marker.apply = function(node) {
        if (extra.range) {
          node.range = [this.range[0], this.range[1]];
        }
        if (extra.loc) {
          node.loc = {
            start: {
              line: this.loc.start.line,
              column: this.loc.start.column
            },
            end: {
              line: this.loc.end.line,
              column: this.loc.end.column
            }
          };
        }
      };
      return marker;
    }
    function trackGroupExpression() {
      var marker,
          expr;
      skipComment();
      marker = createLocationMarker();
      expect('(');
      expr = parseExpression();
      expect(')');
      marker.end();
      marker.applyGroup(expr);
      return expr;
    }
    function trackLeftHandSideExpression() {
      var marker,
          expr;
      skipComment();
      marker = createLocationMarker();
      expr = matchKeyword('new') ? parseNewExpression() : parsePrimaryExpression();
      while (match('.') || match('[')) {
        if (match('[')) {
          expr = {
            type: Syntax.MemberExpression,
            computed: true,
            object: expr,
            property: parseComputedMember()
          };
          marker.end();
          marker.apply(expr);
        } else {
          expr = {
            type: Syntax.MemberExpression,
            computed: false,
            object: expr,
            property: parseNonComputedMember()
          };
          marker.end();
          marker.apply(expr);
        }
      }
      return expr;
    }
    function trackLeftHandSideExpressionAllowCall() {
      var marker,
          expr;
      skipComment();
      marker = createLocationMarker();
      expr = matchKeyword('new') ? parseNewExpression() : parsePrimaryExpression();
      while (match('.') || match('[') || match('(')) {
        if (match('(')) {
          expr = {
            type: Syntax.CallExpression,
            callee: expr,
            'arguments': parseArguments()
          };
          marker.end();
          marker.apply(expr);
        } else if (match('[')) {
          expr = {
            type: Syntax.MemberExpression,
            computed: true,
            object: expr,
            property: parseComputedMember()
          };
          marker.end();
          marker.apply(expr);
        } else {
          expr = {
            type: Syntax.MemberExpression,
            computed: false,
            object: expr,
            property: parseNonComputedMember()
          };
          marker.end();
          marker.apply(expr);
        }
      }
      return expr;
    }
    function filterGroup(node) {
      var n,
          i,
          entry;
      n = (Object.prototype.toString.apply(node) === '[object Array]') ? [] : {};
      for (i in node) {
        if (node.hasOwnProperty(i) && i !== 'groupRange' && i !== 'groupLoc') {
          entry = node[i];
          if (entry === null || typeof entry !== 'object' || entry instanceof RegExp) {
            n[i] = entry;
          } else {
            n[i] = filterGroup(entry);
          }
        }
      }
      return n;
    }
    function wrapTrackingFunction(range, loc) {
      return function(parseFunction) {
        function isBinary(node) {
          return node.type === Syntax.LogicalExpression || node.type === Syntax.BinaryExpression;
        }
        function visit(node) {
          var start,
              end;
          if (isBinary(node.left)) {
            visit(node.left);
          }
          if (isBinary(node.right)) {
            visit(node.right);
          }
          if (range) {
            if (node.left.groupRange || node.right.groupRange) {
              start = node.left.groupRange ? node.left.groupRange[0] : node.left.range[0];
              end = node.right.groupRange ? node.right.groupRange[1] : node.right.range[1];
              node.range = [start, end];
            } else if (typeof node.range === 'undefined') {
              start = node.left.range[0];
              end = node.right.range[1];
              node.range = [start, end];
            }
          }
          if (loc) {
            if (node.left.groupLoc || node.right.groupLoc) {
              start = node.left.groupLoc ? node.left.groupLoc.start : node.left.loc.start;
              end = node.right.groupLoc ? node.right.groupLoc.end : node.right.loc.end;
              node.loc = {
                start: start,
                end: end
              };
            } else if (typeof node.loc === 'undefined') {
              node.loc = {
                start: node.left.loc.start,
                end: node.right.loc.end
              };
            }
          }
        }
        return function() {
          var marker,
              node;
          skipComment();
          marker = createLocationMarker();
          node = parseFunction.apply(null, arguments);
          marker.end();
          if (range && typeof node.range === 'undefined') {
            marker.apply(node);
          }
          if (loc && typeof node.loc === 'undefined') {
            marker.apply(node);
          }
          if (isBinary(node)) {
            visit(node);
          }
          return node;
        };
      };
    }
    function patch() {
      var wrapTracking;
      if (extra.comments) {
        extra.skipComment = skipComment;
        skipComment = scanComment;
      }
      if (extra.raw) {
        extra.createLiteral = createLiteral;
        createLiteral = createRawLiteral;
      }
      if (extra.range || extra.loc) {
        extra.parseGroupExpression = parseGroupExpression;
        extra.parseLeftHandSideExpression = parseLeftHandSideExpression;
        extra.parseLeftHandSideExpressionAllowCall = parseLeftHandSideExpressionAllowCall;
        parseGroupExpression = trackGroupExpression;
        parseLeftHandSideExpression = trackLeftHandSideExpression;
        parseLeftHandSideExpressionAllowCall = trackLeftHandSideExpressionAllowCall;
        wrapTracking = wrapTrackingFunction(extra.range, extra.loc);
        extra.parseAdditiveExpression = parseAdditiveExpression;
        extra.parseAssignmentExpression = parseAssignmentExpression;
        extra.parseBitwiseANDExpression = parseBitwiseANDExpression;
        extra.parseBitwiseORExpression = parseBitwiseORExpression;
        extra.parseBitwiseXORExpression = parseBitwiseXORExpression;
        extra.parseBlock = parseBlock;
        extra.parseFunctionSourceElements = parseFunctionSourceElements;
        extra.parseCatchClause = parseCatchClause;
        extra.parseComputedMember = parseComputedMember;
        extra.parseConditionalExpression = parseConditionalExpression;
        extra.parseConstLetDeclaration = parseConstLetDeclaration;
        extra.parseEqualityExpression = parseEqualityExpression;
        extra.parseExpression = parseExpression;
        extra.parseForVariableDeclaration = parseForVariableDeclaration;
        extra.parseFunctionDeclaration = parseFunctionDeclaration;
        extra.parseFunctionExpression = parseFunctionExpression;
        extra.parseLogicalANDExpression = parseLogicalANDExpression;
        extra.parseLogicalORExpression = parseLogicalORExpression;
        extra.parseMultiplicativeExpression = parseMultiplicativeExpression;
        extra.parseNewExpression = parseNewExpression;
        extra.parseNonComputedProperty = parseNonComputedProperty;
        extra.parseObjectProperty = parseObjectProperty;
        extra.parseObjectPropertyKey = parseObjectPropertyKey;
        extra.parsePostfixExpression = parsePostfixExpression;
        extra.parsePrimaryExpression = parsePrimaryExpression;
        extra.parseProgram = parseProgram;
        extra.parsePropertyFunction = parsePropertyFunction;
        extra.parseRelationalExpression = parseRelationalExpression;
        extra.parseStatement = parseStatement;
        extra.parseShiftExpression = parseShiftExpression;
        extra.parseSwitchCase = parseSwitchCase;
        extra.parseUnaryExpression = parseUnaryExpression;
        extra.parseVariableDeclaration = parseVariableDeclaration;
        extra.parseVariableIdentifier = parseVariableIdentifier;
        parseAdditiveExpression = wrapTracking(extra.parseAdditiveExpression);
        parseAssignmentExpression = wrapTracking(extra.parseAssignmentExpression);
        parseBitwiseANDExpression = wrapTracking(extra.parseBitwiseANDExpression);
        parseBitwiseORExpression = wrapTracking(extra.parseBitwiseORExpression);
        parseBitwiseXORExpression = wrapTracking(extra.parseBitwiseXORExpression);
        parseBlock = wrapTracking(extra.parseBlock);
        parseFunctionSourceElements = wrapTracking(extra.parseFunctionSourceElements);
        parseCatchClause = wrapTracking(extra.parseCatchClause);
        parseComputedMember = wrapTracking(extra.parseComputedMember);
        parseConditionalExpression = wrapTracking(extra.parseConditionalExpression);
        parseConstLetDeclaration = wrapTracking(extra.parseConstLetDeclaration);
        parseEqualityExpression = wrapTracking(extra.parseEqualityExpression);
        parseExpression = wrapTracking(extra.parseExpression);
        parseForVariableDeclaration = wrapTracking(extra.parseForVariableDeclaration);
        parseFunctionDeclaration = wrapTracking(extra.parseFunctionDeclaration);
        parseFunctionExpression = wrapTracking(extra.parseFunctionExpression);
        parseLeftHandSideExpression = wrapTracking(parseLeftHandSideExpression);
        parseLogicalANDExpression = wrapTracking(extra.parseLogicalANDExpression);
        parseLogicalORExpression = wrapTracking(extra.parseLogicalORExpression);
        parseMultiplicativeExpression = wrapTracking(extra.parseMultiplicativeExpression);
        parseNewExpression = wrapTracking(extra.parseNewExpression);
        parseNonComputedProperty = wrapTracking(extra.parseNonComputedProperty);
        parseObjectProperty = wrapTracking(extra.parseObjectProperty);
        parseObjectPropertyKey = wrapTracking(extra.parseObjectPropertyKey);
        parsePostfixExpression = wrapTracking(extra.parsePostfixExpression);
        parsePrimaryExpression = wrapTracking(extra.parsePrimaryExpression);
        parseProgram = wrapTracking(extra.parseProgram);
        parsePropertyFunction = wrapTracking(extra.parsePropertyFunction);
        parseRelationalExpression = wrapTracking(extra.parseRelationalExpression);
        parseStatement = wrapTracking(extra.parseStatement);
        parseShiftExpression = wrapTracking(extra.parseShiftExpression);
        parseSwitchCase = wrapTracking(extra.parseSwitchCase);
        parseUnaryExpression = wrapTracking(extra.parseUnaryExpression);
        parseVariableDeclaration = wrapTracking(extra.parseVariableDeclaration);
        parseVariableIdentifier = wrapTracking(extra.parseVariableIdentifier);
      }
      if (typeof extra.tokens !== 'undefined') {
        extra.advance = advance;
        extra.scanRegExp = scanRegExp;
        advance = collectToken;
        scanRegExp = collectRegex;
      }
    }
    function unpatch() {
      if (typeof extra.skipComment === 'function') {
        skipComment = extra.skipComment;
      }
      if (extra.raw) {
        createLiteral = extra.createLiteral;
      }
      if (extra.range || extra.loc) {
        parseAdditiveExpression = extra.parseAdditiveExpression;
        parseAssignmentExpression = extra.parseAssignmentExpression;
        parseBitwiseANDExpression = extra.parseBitwiseANDExpression;
        parseBitwiseORExpression = extra.parseBitwiseORExpression;
        parseBitwiseXORExpression = extra.parseBitwiseXORExpression;
        parseBlock = extra.parseBlock;
        parseFunctionSourceElements = extra.parseFunctionSourceElements;
        parseCatchClause = extra.parseCatchClause;
        parseComputedMember = extra.parseComputedMember;
        parseConditionalExpression = extra.parseConditionalExpression;
        parseConstLetDeclaration = extra.parseConstLetDeclaration;
        parseEqualityExpression = extra.parseEqualityExpression;
        parseExpression = extra.parseExpression;
        parseForVariableDeclaration = extra.parseForVariableDeclaration;
        parseFunctionDeclaration = extra.parseFunctionDeclaration;
        parseFunctionExpression = extra.parseFunctionExpression;
        parseGroupExpression = extra.parseGroupExpression;
        parseLeftHandSideExpression = extra.parseLeftHandSideExpression;
        parseLeftHandSideExpressionAllowCall = extra.parseLeftHandSideExpressionAllowCall;
        parseLogicalANDExpression = extra.parseLogicalANDExpression;
        parseLogicalORExpression = extra.parseLogicalORExpression;
        parseMultiplicativeExpression = extra.parseMultiplicativeExpression;
        parseNewExpression = extra.parseNewExpression;
        parseNonComputedProperty = extra.parseNonComputedProperty;
        parseObjectProperty = extra.parseObjectProperty;
        parseObjectPropertyKey = extra.parseObjectPropertyKey;
        parsePrimaryExpression = extra.parsePrimaryExpression;
        parsePostfixExpression = extra.parsePostfixExpression;
        parseProgram = extra.parseProgram;
        parsePropertyFunction = extra.parsePropertyFunction;
        parseRelationalExpression = extra.parseRelationalExpression;
        parseStatement = extra.parseStatement;
        parseShiftExpression = extra.parseShiftExpression;
        parseSwitchCase = extra.parseSwitchCase;
        parseUnaryExpression = extra.parseUnaryExpression;
        parseVariableDeclaration = extra.parseVariableDeclaration;
        parseVariableIdentifier = extra.parseVariableIdentifier;
      }
      if (typeof extra.scanRegExp === 'function') {
        advance = extra.advance;
        scanRegExp = extra.scanRegExp;
      }
    }
    function stringToArray(str) {
      var length = str.length,
          result = [],
          i;
      for (i = 0; i < length; ++i) {
        result[i] = str.charAt(i);
      }
      return result;
    }
    function parse(code, options) {
      var program,
          toString;
      toString = String;
      if (typeof code !== 'string' && !(code instanceof String)) {
        code = toString(code);
      }
      source = code;
      index = 0;
      lineNumber = (source.length > 0) ? 1 : 0;
      lineStart = 0;
      length = source.length;
      buffer = null;
      state = {
        allowIn: true,
        labelSet: {},
        inFunctionBody: false,
        inIteration: false,
        inSwitch: false
      };
      extra = {};
      if (typeof options !== 'undefined') {
        extra.range = (typeof options.range === 'boolean') && options.range;
        extra.loc = (typeof options.loc === 'boolean') && options.loc;
        extra.raw = (typeof options.raw === 'boolean') && options.raw;
        if (typeof options.tokens === 'boolean' && options.tokens) {
          extra.tokens = [];
        }
        if (typeof options.comment === 'boolean' && options.comment) {
          extra.comments = [];
        }
        if (typeof options.tolerant === 'boolean' && options.tolerant) {
          extra.errors = [];
        }
      }
      if (length > 0) {
        if (typeof source[0] === 'undefined') {
          if (code instanceof String) {
            source = code.valueOf();
          }
          if (typeof source[0] === 'undefined') {
            source = stringToArray(code);
          }
        }
      }
      patch();
      try {
        program = parseProgram();
        if (typeof extra.comments !== 'undefined') {
          filterCommentLocation();
          program.comments = extra.comments;
        }
        if (typeof extra.tokens !== 'undefined') {
          filterTokenLocation();
          program.tokens = extra.tokens;
        }
        if (typeof extra.errors !== 'undefined') {
          program.errors = extra.errors;
        }
        if (extra.range || extra.loc) {
          program.body = filterGroup(program.body);
        }
      } catch (e) {
        throw e;
      } finally {
        unpatch();
        extra = {};
      }
      return program;
    }
    exports.version = '1.0.4';
    exports.parse = parse;
    exports.Syntax = (function() {
      var name,
          types = {};
      if (typeof Object.create === 'function') {
        types = Object.create(null);
      }
      for (name in Syntax) {
        if (Syntax.hasOwnProperty(name)) {
          types[name] = Syntax[name];
        }
      }
      if (typeof Object.freeze === 'function') {
        Object.freeze(types);
      }
      return types;
    }());
  }));
  global.define = __define;
  return module.exports;
});

System.register("npm:bit-twiddle@0.0.2/twiddle", [], true, function(require, exports, module) {
  var global = System.global,
      __define = global.define;
  global.define = undefined;
  "use strict";
  "use restrict";
  var INT_BITS = 32;
  exports.INT_BITS = INT_BITS;
  exports.INT_MAX = 0x7fffffff;
  exports.INT_MIN = -1 << (INT_BITS - 1);
  exports.sign = function(v) {
    return (v > 0) - (v < 0);
  };
  exports.abs = function(v) {
    var mask = v >> (INT_BITS - 1);
    return (v ^ mask) - mask;
  };
  exports.min = function(x, y) {
    return y ^ ((x ^ y) & -(x < y));
  };
  exports.max = function(x, y) {
    return x ^ ((x ^ y) & -(x < y));
  };
  exports.isPow2 = function(v) {
    return !(v & (v - 1)) && (!!v);
  };
  exports.log2 = function(v) {
    var r,
        shift;
    r = (v > 0xFFFF) << 4;
    v >>>= r;
    shift = (v > 0xFF) << 3;
    v >>>= shift;
    r |= shift;
    shift = (v > 0xF) << 2;
    v >>>= shift;
    r |= shift;
    shift = (v > 0x3) << 1;
    v >>>= shift;
    r |= shift;
    return r | (v >> 1);
  };
  exports.log10 = function(v) {
    return (v >= 1000000000) ? 9 : (v >= 100000000) ? 8 : (v >= 10000000) ? 7 : (v >= 1000000) ? 6 : (v >= 100000) ? 5 : (v >= 10000) ? 4 : (v >= 1000) ? 3 : (v >= 100) ? 2 : (v >= 10) ? 1 : 0;
  };
  exports.popCount = function(v) {
    v = v - ((v >>> 1) & 0x55555555);
    v = (v & 0x33333333) + ((v >>> 2) & 0x33333333);
    return ((v + (v >>> 4) & 0xF0F0F0F) * 0x1010101) >>> 24;
  };
  function countTrailingZeros(v) {
    var c = 32;
    v &= -v;
    if (v)
      c--;
    if (v & 0x0000FFFF)
      c -= 16;
    if (v & 0x00FF00FF)
      c -= 8;
    if (v & 0x0F0F0F0F)
      c -= 4;
    if (v & 0x33333333)
      c -= 2;
    if (v & 0x55555555)
      c -= 1;
    return c;
  }
  exports.countTrailingZeros = countTrailingZeros;
  exports.nextPow2 = function(v) {
    v += v === 0;
    --v;
    v |= v >>> 1;
    v |= v >>> 2;
    v |= v >>> 4;
    v |= v >>> 8;
    v |= v >>> 16;
    return v + 1;
  };
  exports.prevPow2 = function(v) {
    v |= v >>> 1;
    v |= v >>> 2;
    v |= v >>> 4;
    v |= v >>> 8;
    v |= v >>> 16;
    return v - (v >>> 1);
  };
  exports.parity = function(v) {
    v ^= v >>> 16;
    v ^= v >>> 8;
    v ^= v >>> 4;
    v &= 0xf;
    return (0x6996 >>> v) & 1;
  };
  var REVERSE_TABLE = new Array(256);
  (function(tab) {
    for (var i = 0; i < 256; ++i) {
      var v = i,
          r = i,
          s = 7;
      for (v >>>= 1; v; v >>>= 1) {
        r <<= 1;
        r |= v & 1;
        --s;
      }
      tab[i] = (r << s) & 0xff;
    }
  })(REVERSE_TABLE);
  exports.reverse = function(v) {
    return (REVERSE_TABLE[v & 0xff] << 24) | (REVERSE_TABLE[(v >>> 8) & 0xff] << 16) | (REVERSE_TABLE[(v >>> 16) & 0xff] << 8) | REVERSE_TABLE[(v >>> 24) & 0xff];
  };
  exports.interleave2 = function(x, y) {
    x &= 0xFFFF;
    x = (x | (x << 8)) & 0x00FF00FF;
    x = (x | (x << 4)) & 0x0F0F0F0F;
    x = (x | (x << 2)) & 0x33333333;
    x = (x | (x << 1)) & 0x55555555;
    y &= 0xFFFF;
    y = (y | (y << 8)) & 0x00FF00FF;
    y = (y | (y << 4)) & 0x0F0F0F0F;
    y = (y | (y << 2)) & 0x33333333;
    y = (y | (y << 1)) & 0x55555555;
    return x | (y << 1);
  };
  exports.deinterleave2 = function(v, n) {
    v = (v >>> n) & 0x55555555;
    v = (v | (v >>> 1)) & 0x33333333;
    v = (v | (v >>> 2)) & 0x0F0F0F0F;
    v = (v | (v >>> 4)) & 0x00FF00FF;
    v = (v | (v >>> 16)) & 0x000FFFF;
    return (v << 16) >> 16;
  };
  exports.interleave3 = function(x, y, z) {
    x &= 0x3FF;
    x = (x | (x << 16)) & 4278190335;
    x = (x | (x << 8)) & 251719695;
    x = (x | (x << 4)) & 3272356035;
    x = (x | (x << 2)) & 1227133513;
    y &= 0x3FF;
    y = (y | (y << 16)) & 4278190335;
    y = (y | (y << 8)) & 251719695;
    y = (y | (y << 4)) & 3272356035;
    y = (y | (y << 2)) & 1227133513;
    x |= (y << 1);
    z &= 0x3FF;
    z = (z | (z << 16)) & 4278190335;
    z = (z | (z << 8)) & 251719695;
    z = (z | (z << 4)) & 3272356035;
    z = (z | (z << 2)) & 1227133513;
    return x | (z << 2);
  };
  exports.deinterleave3 = function(v, n) {
    v = (v >>> n) & 1227133513;
    v = (v | (v >>> 2)) & 3272356035;
    v = (v | (v >>> 4)) & 251719695;
    v = (v | (v >>> 8)) & 4278190335;
    v = (v | (v >>> 16)) & 0x3FF;
    return (v << 22) >> 22;
  };
  exports.nextCombination = function(v) {
    var t = v | (v - 1);
    return (t + 1) | (((~t & -~t) - 1) >>> (countTrailingZeros(v) + 1));
  };
  global.define = __define;
  return module.exports;
});

System.register("npm:dup@0.0.0/dup", [], true, function(require, exports, module) {
  var global = System.global,
      __define = global.define;
  global.define = undefined;
  "use strict";
  function dupe_array(count, value, i) {
    var c = count[i] | 0;
    if (c <= 0) {
      return [];
    }
    var result = new Array(c),
        j;
    if (i === count.length - 1) {
      for (j = 0; j < c; ++j) {
        result[j] = value;
      }
    } else {
      for (j = 0; j < c; ++j) {
        result[j] = dupe_array(count, value, i + 1);
      }
    }
    return result;
  }
  function dupe_number(count, value) {
    var result,
        i;
    result = new Array(count);
    for (i = 0; i < count; ++i) {
      result[i] = value;
    }
    return result;
  }
  function dupe(count, value) {
    if (typeof value === "undefined") {
      value = 0;
    }
    switch (typeof count) {
      case "number":
        if (count > 0) {
          return dupe_number(count | 0, value);
        }
        break;
      case "object":
        if (typeof(count.length) === "number") {
          return dupe_array(count, value, 0);
        }
        break;
    }
    return [];
  }
  module.exports = dupe;
  global.define = __define;
  return module.exports;
});

System.register("npm:ndarray-scratch@0.0.1/scratch", ["npm:ndarray@1.0.18", "npm:typedarray-pool@0.1.2"], true, function(require, exports, module) {
  var global = System.global,
      __define = global.define;
  global.define = undefined;
  "use strict";
  var ndarray = require("npm:ndarray@1.0.18");
  var pool = require("npm:typedarray-pool@0.1.2");
  function malloc(shape, dtype) {
    if (!dtype) {
      dtype = "double";
    }
    var sz = 1;
    var stride = new Array(shape.length);
    for (var i = shape.length - 1; i >= 0; --i) {
      stride[i] = sz;
      sz *= shape[i];
    }
    return ndarray(pool.malloc(sz, dtype), shape, stride, 0);
  }
  exports.malloc = malloc;
  function free(array) {
    pool.free(array.data);
  }
  exports.free = free;
  global.define = __define;
  return module.exports;
});

System.register("npm:bit-twiddle@1.0.2/twiddle", [], true, function(require, exports, module) {
  var global = System.global,
      __define = global.define;
  global.define = undefined;
  "use strict";
  "use restrict";
  var INT_BITS = 32;
  exports.INT_BITS = INT_BITS;
  exports.INT_MAX = 0x7fffffff;
  exports.INT_MIN = -1 << (INT_BITS - 1);
  exports.sign = function(v) {
    return (v > 0) - (v < 0);
  };
  exports.abs = function(v) {
    var mask = v >> (INT_BITS - 1);
    return (v ^ mask) - mask;
  };
  exports.min = function(x, y) {
    return y ^ ((x ^ y) & -(x < y));
  };
  exports.max = function(x, y) {
    return x ^ ((x ^ y) & -(x < y));
  };
  exports.isPow2 = function(v) {
    return !(v & (v - 1)) && (!!v);
  };
  exports.log2 = function(v) {
    var r,
        shift;
    r = (v > 0xFFFF) << 4;
    v >>>= r;
    shift = (v > 0xFF) << 3;
    v >>>= shift;
    r |= shift;
    shift = (v > 0xF) << 2;
    v >>>= shift;
    r |= shift;
    shift = (v > 0x3) << 1;
    v >>>= shift;
    r |= shift;
    return r | (v >> 1);
  };
  exports.log10 = function(v) {
    return (v >= 1000000000) ? 9 : (v >= 100000000) ? 8 : (v >= 10000000) ? 7 : (v >= 1000000) ? 6 : (v >= 100000) ? 5 : (v >= 10000) ? 4 : (v >= 1000) ? 3 : (v >= 100) ? 2 : (v >= 10) ? 1 : 0;
  };
  exports.popCount = function(v) {
    v = v - ((v >>> 1) & 0x55555555);
    v = (v & 0x33333333) + ((v >>> 2) & 0x33333333);
    return ((v + (v >>> 4) & 0xF0F0F0F) * 0x1010101) >>> 24;
  };
  function countTrailingZeros(v) {
    var c = 32;
    v &= -v;
    if (v)
      c--;
    if (v & 0x0000FFFF)
      c -= 16;
    if (v & 0x00FF00FF)
      c -= 8;
    if (v & 0x0F0F0F0F)
      c -= 4;
    if (v & 0x33333333)
      c -= 2;
    if (v & 0x55555555)
      c -= 1;
    return c;
  }
  exports.countTrailingZeros = countTrailingZeros;
  exports.nextPow2 = function(v) {
    v += v === 0;
    --v;
    v |= v >>> 1;
    v |= v >>> 2;
    v |= v >>> 4;
    v |= v >>> 8;
    v |= v >>> 16;
    return v + 1;
  };
  exports.prevPow2 = function(v) {
    v |= v >>> 1;
    v |= v >>> 2;
    v |= v >>> 4;
    v |= v >>> 8;
    v |= v >>> 16;
    return v - (v >>> 1);
  };
  exports.parity = function(v) {
    v ^= v >>> 16;
    v ^= v >>> 8;
    v ^= v >>> 4;
    v &= 0xf;
    return (0x6996 >>> v) & 1;
  };
  var REVERSE_TABLE = new Array(256);
  (function(tab) {
    for (var i = 0; i < 256; ++i) {
      var v = i,
          r = i,
          s = 7;
      for (v >>>= 1; v; v >>>= 1) {
        r <<= 1;
        r |= v & 1;
        --s;
      }
      tab[i] = (r << s) & 0xff;
    }
  })(REVERSE_TABLE);
  exports.reverse = function(v) {
    return (REVERSE_TABLE[v & 0xff] << 24) | (REVERSE_TABLE[(v >>> 8) & 0xff] << 16) | (REVERSE_TABLE[(v >>> 16) & 0xff] << 8) | REVERSE_TABLE[(v >>> 24) & 0xff];
  };
  exports.interleave2 = function(x, y) {
    x &= 0xFFFF;
    x = (x | (x << 8)) & 0x00FF00FF;
    x = (x | (x << 4)) & 0x0F0F0F0F;
    x = (x | (x << 2)) & 0x33333333;
    x = (x | (x << 1)) & 0x55555555;
    y &= 0xFFFF;
    y = (y | (y << 8)) & 0x00FF00FF;
    y = (y | (y << 4)) & 0x0F0F0F0F;
    y = (y | (y << 2)) & 0x33333333;
    y = (y | (y << 1)) & 0x55555555;
    return x | (y << 1);
  };
  exports.deinterleave2 = function(v, n) {
    v = (v >>> n) & 0x55555555;
    v = (v | (v >>> 1)) & 0x33333333;
    v = (v | (v >>> 2)) & 0x0F0F0F0F;
    v = (v | (v >>> 4)) & 0x00FF00FF;
    v = (v | (v >>> 16)) & 0x000FFFF;
    return (v << 16) >> 16;
  };
  exports.interleave3 = function(x, y, z) {
    x &= 0x3FF;
    x = (x | (x << 16)) & 4278190335;
    x = (x | (x << 8)) & 251719695;
    x = (x | (x << 4)) & 3272356035;
    x = (x | (x << 2)) & 1227133513;
    y &= 0x3FF;
    y = (y | (y << 16)) & 4278190335;
    y = (y | (y << 8)) & 251719695;
    y = (y | (y << 4)) & 3272356035;
    y = (y | (y << 2)) & 1227133513;
    x |= (y << 1);
    z &= 0x3FF;
    z = (z | (z << 16)) & 4278190335;
    z = (z | (z << 8)) & 251719695;
    z = (z | (z << 4)) & 3272356035;
    z = (z | (z << 2)) & 1227133513;
    return x | (z << 2);
  };
  exports.deinterleave3 = function(v, n) {
    v = (v >>> n) & 1227133513;
    v = (v | (v >>> 2)) & 3272356035;
    v = (v | (v >>> 4)) & 251719695;
    v = (v | (v >>> 8)) & 4278190335;
    v = (v | (v >>> 16)) & 0x3FF;
    return (v << 22) >> 22;
  };
  exports.nextCombination = function(v) {
    var t = v | (v - 1);
    return (t + 1) | (((~t & -~t) - 1) >>> (countTrailingZeros(v) + 1));
  };
  global.define = __define;
  return module.exports;
});

System.register("npm:dup@1.0.0/dup", [], true, function(require, exports, module) {
  var global = System.global,
      __define = global.define;
  global.define = undefined;
  "use strict";
  function dupe_array(count, value, i) {
    var c = count[i] | 0;
    if (c <= 0) {
      return [];
    }
    var result = new Array(c),
        j;
    if (i === count.length - 1) {
      for (j = 0; j < c; ++j) {
        result[j] = value;
      }
    } else {
      for (j = 0; j < c; ++j) {
        result[j] = dupe_array(count, value, i + 1);
      }
    }
    return result;
  }
  function dupe_number(count, value) {
    var result,
        i;
    result = new Array(count);
    for (i = 0; i < count; ++i) {
      result[i] = value;
    }
    return result;
  }
  function dupe(count, value) {
    if (typeof value === "undefined") {
      value = 0;
    }
    switch (typeof count) {
      case "number":
        if (count > 0) {
          return dupe_number(count | 0, value);
        }
        break;
      case "object":
        if (typeof(count.length) === "number") {
          return dupe_array(count, value, 0);
        }
        break;
    }
    return [];
  }
  module.exports = dupe;
  global.define = __define;
  return module.exports;
});

System.register("npm:gl-buffer@0.1.2/buffer", ["npm:typedarray-pool@0.1.2", "npm:ndarray-ops@1.1.1", "npm:ndarray@1.0.18"], true, function(require, exports, module) {
  var global = System.global,
      __define = global.define;
  global.define = undefined;
  "use strict";
  var pool = require("npm:typedarray-pool@0.1.2");
  var ops = require("npm:ndarray-ops@1.1.1");
  var ndarray = require("npm:ndarray@1.0.18");
  function GLBuffer(gl, type, handle, length, usage) {
    this.gl = gl;
    this.type = type;
    this.handle = handle;
    this.length = length;
    this.usage = usage;
  }
  GLBuffer.prototype.bind = function() {
    this.gl.bindBuffer(this.type, this.handle);
  };
  GLBuffer.prototype.dispose = function() {
    this.gl.deleteBuffer(this.handle);
  };
  function updateTypeArray(gl, type, len, usage, data, offset) {
    if (offset <= 0 && data.length > len) {
      gl.bufferData(type, data, usage);
      return data.length;
    }
    if (data.length + offset > len) {
      throw new Error("gl-buffer: If resizing buffer, offset must be 0");
    }
    gl.bufferSubData(type, offset, data);
    return len;
  }
  function makeScratchTypeArray(array, dtype) {
    var res = pool.malloc(array.length, dtype);
    var n = array.length;
    for (var i = 0; i < n; ++i) {
      res[i] = array[i];
    }
    return res;
  }
  GLBuffer.prototype.update = function(array, offset) {
    if (!offset) {
      offset = 0;
    }
    this.bind();
    if (typeof array === "number") {
      if (offset > 0) {
        throw new Error("gl-buffer: Cannot specify offset when resizing buffer");
      }
      this.gl.bufferData(this.type, array, this.usage);
      this.length = array;
    } else if (array.shape) {
      var dtype = array.dtype;
      if (dtype === "float64" || dtype === "array" || dtype === "generic") {
        dtype = "float32";
      }
      if (this.type === this.gl.ELEMENT_ARRAY_BUFFER) {
        dtype = "uint16";
      }
      if (array.shape.length !== 1) {
        throw new Error("gl-buffer: Array length must be 1");
      }
      if (dtype === array.dtype && array.stride[0] === 1) {
        if (array.offset === 0 && array.data.length === array.shape[0]) {
          this.length = updateTypeArray(this.gl, this.type, this.length, this.usage, array.data, offset);
        } else {
          this.length = updateTypeArray(this.gl, this.type, this.length, this.usage, array.data.subarray(array.offset, array.shape[0]), offset);
        }
      } else {
        var tmp = pool.malloc(array.shape[0], dtype);
        var ndt = ndarray(tmp);
        ops.assign(ndt, array);
        this.length = updateTypeArray(this.gl, this.type, this.length, this.usage, tmp, offset);
        pool.free(tmp);
      }
    } else if (Array.isArray(array)) {
      if (this.type === this.gl.ELEMENT_ARRAY_BUFFER) {
        var t = makeScratchTypeArray(array, "uint16");
        this.length = updateTypeArray(this.gl, this.type, this.length, this.usage, t.subarray(0, array.length), offset);
        pool.freeUint16(t);
      } else {
        var t = makeScratchTypeArray(array, "float32");
        this.length = updateTypeArray(this.gl, this.type, this.length, this.usage, t.subarray(0, array.length), offset);
        pool.freeFloat32(t);
      }
    } else {
      this.length = updateTypeArray(this.gl, this.type, this.length, this.usage, array, offset);
    }
  };
  GLBuffer.prototype.draw = function(mode, count, offset) {
    offset = offset || 0;
    var gl = this.gl;
    if (this.type === gl.ARRAY_BUFFER) {
      gl.drawArrays(mode, offset, count);
    } else if (this.type === gl.ELEMENT_ARRAY_BUFFER) {
      this.bind();
      gl.drawElements(mode, count, gl.UNSIGNED_SHORT, offset);
    } else {
      throw new Error("Invalid type for WebGL buffer");
    }
  };
  function createBuffer(gl, type, data, usage) {
    if (data === undefined) {
      data = type;
      type = gl.ARRAY_BUFFER;
    }
    if (!usage) {
      usage = gl.DYNAMIC_DRAW;
    }
    var len = 0;
    var handle = gl.createBuffer();
    gl.bindBuffer(type, handle);
    if (typeof data === "number") {
      gl.bufferData(type, data, usage);
      len = data;
    } else if (data instanceof Array) {
      if (type === gl.ELEMENT_ARRAY_BUFFER) {
        gl.bufferData(type, new Uint16Array(data), usage);
      } else {
        gl.bufferData(type, new Float32Array(data), usage);
      }
      len = data.length;
    } else if (data.length) {
      gl.bufferData(type, data, usage);
      len = data.length;
    } else if (data.shape) {
      var dtype = data.dtype;
      if (dtype === "float64" || dtype === "array" || dtype === "generic") {
        dtype = "float32";
      }
      if (type === gl.ELEMENT_ARRAY_BUFFER) {
        dtype = "uint16";
      }
      if (data.shape.length !== 1) {
        throw new Error("gl-buffer: Array shape must be 1D");
      }
      var len = data.shape[0];
      if (dtype === data.type && data.stride[0] === 1) {
        gl.bufferData(type, data.data.subarray(data.offset, data.offset + len), usage);
      } else {
        var tmp = pool.malloc(data.shape[0], dtype);
        var ndt = ndarray(tmp);
        ops.assign(ndt, data);
        gl.bufferData(type, tmp, usage);
        pool.free(tmp);
      }
    } else {
      throw new Error("gl-buffer: Invalid format for buffer data");
    }
    if (type !== gl.ARRAY_BUFFER && type !== gl.ELEMENT_ARRAY_BUFFER) {
      throw new Error("gl-buffer: Invalid type for webgl buffer");
    }
    if (usage !== gl.DYNAMIC_DRAW && usage !== gl.STATIC_DRAW && usage !== gl.STREAM_DRAW) {
      throw new Error("gl-buffer: Invalid usage for buffer");
    }
    return new GLBuffer(gl, type, handle, len, usage);
  }
  module.exports = createBuffer;
  global.define = __define;
  return module.exports;
});

System.register("npm:gl-vao@0.0.3/lib/do-bind", [], true, function(require, exports, module) {
  var global = System.global,
      __define = global.define;
  global.define = undefined;
  "use strict";
  function doBind(gl, elements, attributes) {
    if (elements) {
      elements.bind();
    } else {
      gl.bindBuffer(gl.ELEMENT_ARRAY_BUFFER, null);
    }
    var nattribs = gl.getParameter(gl.MAX_VERTEX_ATTRIBS) | 0;
    if (attributes) {
      if (attributes.length > nattribs) {
        throw new Error("Too many vertex attributes");
      }
      for (var i = 0; i < attributes.length; ++i) {
        var attrib = attributes[i];
        if (attrib.buffer) {
          var buffer = attrib.buffer;
          var size = attrib.size || 4;
          var type = attrib.type || gl.FLOAT;
          var normalized = !!attrib.normalized;
          var stride = attrib.stride || 0;
          var offset = attrib.offset || 0;
          buffer.bind();
          gl.vertexAttribPointer(i, size, type, normalized, stride, offset);
          gl.enableVertexAttribArray(i);
        } else {
          if (typeof attrib === "number") {
            gl.vertexAttrib1f(i, attrib);
          } else if (attrib.length === 1) {
            gl.vertexAttrib1f(i, attrib[0]);
          } else if (attrib.length === 2) {
            gl.vertexAttrib2f(i, attrib[0], attrib[1]);
          } else if (attrib.length === 3) {
            gl.vertexAttrib3f(i, attrib[0], attrib[1], attrib[2]);
          } else if (attrib.length === 4) {
            gl.vertexAttrib4f(i, attrib[0], attrib[1], attrib[2], attrib[3]);
          } else {
            throw new Error("Invalid vertex attribute");
          }
          gl.disableVertexAttribArray(i);
        }
      }
      for (; i < nattribs; ++i) {
        gl.disableVertexAttribArray(i);
      }
    } else {
      gl.bindBuffer(gl.ARRAY_BUFFER, null);
      for (var i = 0; i < nattribs; ++i) {
        gl.disableVertexAttribArray(i);
      }
    }
  }
  module.exports = doBind;
  global.define = __define;
  return module.exports;
});

System.register("npm:gl-vao@0.0.3/lib/vao-emulated", ["npm:gl-vao@0.0.3/lib/do-bind"], true, function(require, exports, module) {
  var global = System.global,
      __define = global.define;
  global.define = undefined;
  "use strict";
  var bindAttribs = require("npm:gl-vao@0.0.3/lib/do-bind");
  function VAOEmulated(gl) {
    this.gl = gl;
    this.elements = null;
    this.attributes = null;
  }
  VAOEmulated.prototype.bind = function() {
    bindAttribs(this.gl, this.elements, this.attributes);
  };
  VAOEmulated.prototype.update = function(elements, attributes) {
    this.elements = elements;
    this.attributes = attributes;
  };
  VAOEmulated.prototype.dispose = function() {};
  VAOEmulated.prototype.unbind = function() {};
  function createVAOEmulated(gl) {
    return new VAOEmulated(gl);
  }
  module.exports = createVAOEmulated;
  global.define = __define;
  return module.exports;
});

System.register("npm:gl-matrix@2.0.0/dist/gl-matrix", [], true, function(require, exports, module) {
  var global = System.global,
      __define = global.define;
  global.define = undefined;
  "format cjs";
  (function() {
    "use strict";
    var shim = {};
    if (typeof(exports) === 'undefined') {
      if (typeof define == 'function' && typeof define.amd == 'object' && define.amd) {
        shim.exports = {};
        define(function() {
          return shim.exports;
        });
      } else {
        shim.exports = window;
      }
    } else {
      shim.exports = exports;
    }
    (function(exports) {
      var vec2 = {};
      if (!GLMAT_EPSILON) {
        var GLMAT_EPSILON = 0.000001;
      }
      vec2.create = function() {
        return new Float32Array(2);
      };
      vec2.clone = function(a) {
        var out = new Float32Array(2);
        out[0] = a[0];
        out[1] = a[1];
        return out;
      };
      vec2.fromValues = function(x, y) {
        var out = new Float32Array(2);
        out[0] = x;
        out[1] = y;
        return out;
      };
      vec2.copy = function(out, a) {
        out[0] = a[0];
        out[1] = a[1];
        return out;
      };
      vec2.set = function(out, x, y) {
        out[0] = x;
        out[1] = y;
        return out;
      };
      vec2.add = function(out, a, b) {
        out[0] = a[0] + b[0];
        out[1] = a[1] + b[1];
        return out;
      };
      vec2.sub = vec2.subtract = function(out, a, b) {
        out[0] = a[0] - b[0];
        out[1] = a[1] - b[1];
        return out;
      };
      vec2.mul = vec2.multiply = function(out, a, b) {
        out[0] = a[0] * b[0];
        out[1] = a[1] * b[1];
        return out;
      };
      vec2.div = vec2.divide = function(out, a, b) {
        out[0] = a[0] / b[0];
        out[1] = a[1] / b[1];
        return out;
      };
      vec2.min = function(out, a, b) {
        out[0] = Math.min(a[0], b[0]);
        out[1] = Math.min(a[1], b[1]);
        return out;
      };
      vec2.max = function(out, a, b) {
        out[0] = Math.max(a[0], b[0]);
        out[1] = Math.max(a[1], b[1]);
        return out;
      };
      vec2.scale = function(out, a, b) {
        out[0] = a[0] * b;
        out[1] = a[1] * b;
        return out;
      };
      vec2.dist = vec2.distance = function(a, b) {
        var x = b[0] - a[0],
            y = b[1] - a[1];
        return Math.sqrt(x * x + y * y);
      };
      vec2.sqrDist = vec2.squaredDistance = function(a, b) {
        var x = b[0] - a[0],
            y = b[1] - a[1];
        return x * x + y * y;
      };
      vec2.len = vec2.length = function(a) {
        var x = a[0],
            y = a[1];
        return Math.sqrt(x * x + y * y);
      };
      vec2.sqrLen = vec2.squaredLength = function(a) {
        var x = a[0],
            y = a[1];
        return x * x + y * y;
      };
      vec2.negate = function(out, a) {
        out[0] = -a[0];
        out[1] = -a[1];
        return out;
      };
      vec2.normalize = function(out, a) {
        var x = a[0],
            y = a[1];
        var len = x * x + y * y;
        if (len > 0) {
          len = 1 / Math.sqrt(len);
          out[0] = a[0] * len;
          out[1] = a[1] * len;
        }
        return out;
      };
      vec2.dot = function(a, b) {
        return a[0] * b[0] + a[1] * b[1];
      };
      vec2.cross = function(out, a, b) {
        var z = a[0] * b[1] - a[1] * b[0];
        out[0] = out[1] = 0;
        out[2] = z;
        return out;
      };
      vec2.lerp = function(out, a, b, t) {
        var ax = a[0],
            ay = a[1];
        out[0] = ax + t * (b[0] - ax);
        out[1] = ay + t * (b[1] - ay);
        return out;
      };
      vec2.transformMat2 = function(out, a, m) {
        var x = a[0],
            y = a[1];
        out[0] = x * m[0] + y * m[1];
        out[1] = x * m[2] + y * m[3];
        return out;
      };
      vec2.forEach = (function() {
        var vec = new Float32Array(2);
        return function(a, stride, offset, count, fn, arg) {
          var i,
              l;
          if (!stride) {
            stride = 2;
          }
          if (!offset) {
            offset = 0;
          }
          if (count) {
            l = Math.min((count * stride) + offset, a.length);
          } else {
            l = a.length;
          }
          for (i = offset; i < l; i += stride) {
            vec[0] = a[i];
            vec[1] = a[i + 1];
            fn(vec, vec, arg);
            a[i] = vec[0];
            a[i + 1] = vec[1];
          }
          return a;
        };
      })();
      vec2.str = function(a) {
        return 'vec2(' + a[0] + ', ' + a[1] + ')';
      };
      if (typeof(exports) !== 'undefined') {
        exports.vec2 = vec2;
      }
      ;
      var vec3 = {};
      if (!GLMAT_EPSILON) {
        var GLMAT_EPSILON = 0.000001;
      }
      vec3.create = function() {
        return new Float32Array(3);
      };
      vec3.clone = function(a) {
        var out = new Float32Array(3);
        out[0] = a[0];
        out[1] = a[1];
        out[2] = a[2];
        return out;
      };
      vec3.fromValues = function(x, y, z) {
        var out = new Float32Array(3);
        out[0] = x;
        out[1] = y;
        out[2] = z;
        return out;
      };
      vec3.copy = function(out, a) {
        out[0] = a[0];
        out[1] = a[1];
        out[2] = a[2];
        return out;
      };
      vec3.set = function(out, x, y, z) {
        out[0] = x;
        out[1] = y;
        out[2] = z;
        return out;
      };
      vec3.add = function(out, a, b) {
        out[0] = a[0] + b[0];
        out[1] = a[1] + b[1];
        out[2] = a[2] + b[2];
        return out;
      };
      vec3.sub = vec3.subtract = function(out, a, b) {
        out[0] = a[0] - b[0];
        out[1] = a[1] - b[1];
        out[2] = a[2] - b[2];
        return out;
      };
      vec3.mul = vec3.multiply = function(out, a, b) {
        out[0] = a[0] * b[0];
        out[1] = a[1] * b[1];
        out[2] = a[2] * b[2];
        return out;
      };
      vec3.div = vec3.divide = function(out, a, b) {
        out[0] = a[0] / b[0];
        out[1] = a[1] / b[1];
        out[2] = a[2] / b[2];
        return out;
      };
      vec3.min = function(out, a, b) {
        out[0] = Math.min(a[0], b[0]);
        out[1] = Math.min(a[1], b[1]);
        out[2] = Math.min(a[2], b[2]);
        return out;
      };
      vec3.max = function(out, a, b) {
        out[0] = Math.max(a[0], b[0]);
        out[1] = Math.max(a[1], b[1]);
        out[2] = Math.max(a[2], b[2]);
        return out;
      };
      vec3.scale = function(out, a, b) {
        out[0] = a[0] * b;
        out[1] = a[1] * b;
        out[2] = a[2] * b;
        return out;
      };
      vec3.dist = vec3.distance = function(a, b) {
        var x = b[0] - a[0],
            y = b[1] - a[1],
            z = b[2] - a[2];
        return Math.sqrt(x * x + y * y + z * z);
      };
      vec3.sqrDist = vec3.squaredDistance = function(a, b) {
        var x = b[0] - a[0],
            y = b[1] - a[1],
            z = b[2] - a[2];
        return x * x + y * y + z * z;
      };
      vec3.len = vec3.length = function(a) {
        var x = a[0],
            y = a[1],
            z = a[2];
        return Math.sqrt(x * x + y * y + z * z);
      };
      vec3.sqrLen = vec3.squaredLength = function(a) {
        var x = a[0],
            y = a[1],
            z = a[2];
        return x * x + y * y + z * z;
      };
      vec3.negate = function(out, a) {
        out[0] = -a[0];
        out[1] = -a[1];
        out[2] = -a[2];
        return out;
      };
      vec3.normalize = function(out, a) {
        var x = a[0],
            y = a[1],
            z = a[2];
        var len = x * x + y * y + z * z;
        if (len > 0) {
          len = 1 / Math.sqrt(len);
          out[0] = a[0] * len;
          out[1] = a[1] * len;
          out[2] = a[2] * len;
        }
        return out;
      };
      vec3.dot = function(a, b) {
        return a[0] * b[0] + a[1] * b[1] + a[2] * b[2];
      };
      vec3.cross = function(out, a, b) {
        var ax = a[0],
            ay = a[1],
            az = a[2],
            bx = b[0],
            by = b[1],
            bz = b[2];
        out[0] = ay * bz - az * by;
        out[1] = az * bx - ax * bz;
        out[2] = ax * by - ay * bx;
        return out;
      };
      vec3.lerp = function(out, a, b, t) {
        var ax = a[0],
            ay = a[1],
            az = a[2];
        out[0] = ax + t * (b[0] - ax);
        out[1] = ay + t * (b[1] - ay);
        out[2] = az + t * (b[2] - az);
        return out;
      };
      vec3.transformMat4 = function(out, a, m) {
        var x = a[0],
            y = a[1],
            z = a[2];
        out[0] = m[0] * x + m[4] * y + m[8] * z + m[12];
        out[1] = m[1] * x + m[5] * y + m[9] * z + m[13];
        out[2] = m[2] * x + m[6] * y + m[10] * z + m[14];
        return out;
      };
      vec3.transformQuat = function(out, a, q) {
        var x = a[0],
            y = a[1],
            z = a[2],
            qx = q[0],
            qy = q[1],
            qz = q[2],
            qw = q[3],
            ix = qw * x + qy * z - qz * y,
            iy = qw * y + qz * x - qx * z,
            iz = qw * z + qx * y - qy * x,
            iw = -qx * x - qy * y - qz * z;
        out[0] = ix * qw + iw * -qx + iy * -qz - iz * -qy;
        out[1] = iy * qw + iw * -qy + iz * -qx - ix * -qz;
        out[2] = iz * qw + iw * -qz + ix * -qy - iy * -qx;
        return out;
      };
      vec3.forEach = (function() {
        var vec = new Float32Array(3);
        return function(a, stride, offset, count, fn, arg) {
          var i,
              l;
          if (!stride) {
            stride = 3;
          }
          if (!offset) {
            offset = 0;
          }
          if (count) {
            l = Math.min((count * stride) + offset, a.length);
          } else {
            l = a.length;
          }
          for (i = offset; i < l; i += stride) {
            vec[0] = a[i];
            vec[1] = a[i + 1];
            vec[2] = a[i + 2];
            fn(vec, vec, arg);
            a[i] = vec[0];
            a[i + 1] = vec[1];
            a[i + 2] = vec[2];
          }
          return a;
        };
      })();
      vec3.str = function(a) {
        return 'vec3(' + a[0] + ', ' + a[1] + ', ' + a[2] + ')';
      };
      if (typeof(exports) !== 'undefined') {
        exports.vec3 = vec3;
      }
      ;
      var vec4 = {};
      if (!GLMAT_EPSILON) {
        var GLMAT_EPSILON = 0.000001;
      }
      vec4.create = function() {
        return new Float32Array(4);
      };
      vec4.clone = function(a) {
        var out = new Float32Array(4);
        out[0] = a[0];
        out[1] = a[1];
        out[2] = a[2];
        out[3] = a[3];
        return out;
      };
      vec4.fromValues = function(x, y, z, w) {
        var out = new Float32Array(4);
        out[0] = x;
        out[1] = y;
        out[2] = z;
        out[3] = w;
        return out;
      };
      vec4.copy = function(out, a) {
        out[0] = a[0];
        out[1] = a[1];
        out[2] = a[2];
        out[3] = a[3];
        return out;
      };
      vec4.set = function(out, x, y, z, w) {
        out[0] = x;
        out[1] = y;
        out[2] = z;
        out[3] = w;
        return out;
      };
      vec4.add = function(out, a, b) {
        out[0] = a[0] + b[0];
        out[1] = a[1] + b[1];
        out[2] = a[2] + b[2];
        out[3] = a[3] + b[3];
        return out;
      };
      vec4.sub = vec4.subtract = function(out, a, b) {
        out[0] = a[0] - b[0];
        out[1] = a[1] - b[1];
        out[2] = a[2] - b[2];
        out[3] = a[3] - b[3];
        return out;
      };
      vec4.mul = vec4.multiply = function(out, a, b) {
        out[0] = a[0] * b[0];
        out[1] = a[1] * b[1];
        out[2] = a[2] * b[2];
        out[3] = a[3] * b[3];
        return out;
      };
      vec4.div = vec4.divide = function(out, a, b) {
        out[0] = a[0] / b[0];
        out[1] = a[1] / b[1];
        out[2] = a[2] / b[2];
        out[3] = a[3] / b[3];
        return out;
      };
      vec4.min = function(out, a, b) {
        out[0] = Math.min(a[0], b[0]);
        out[1] = Math.min(a[1], b[1]);
        out[2] = Math.min(a[2], b[2]);
        out[3] = Math.min(a[3], b[3]);
        return out;
      };
      vec4.max = function(out, a, b) {
        out[0] = Math.max(a[0], b[0]);
        out[1] = Math.max(a[1], b[1]);
        out[2] = Math.max(a[2], b[2]);
        out[3] = Math.max(a[3], b[3]);
        return out;
      };
      vec4.scale = function(out, a, b) {
        out[0] = a[0] * b;
        out[1] = a[1] * b;
        out[2] = a[2] * b;
        out[3] = a[3] * b;
        return out;
      };
      vec4.dist = vec4.distance = function(a, b) {
        var x = b[0] - a[0],
            y = b[1] - a[1],
            z = b[2] - a[2],
            w = b[3] - a[3];
        return Math.sqrt(x * x + y * y + z * z + w * w);
      };
      vec4.sqrDist = vec4.squaredDistance = function(a, b) {
        var x = b[0] - a[0],
            y = b[1] - a[1],
            z = b[2] - a[2],
            w = b[3] - a[3];
        return x * x + y * y + z * z + w * w;
      };
      vec4.len = vec4.length = function(a) {
        var x = a[0],
            y = a[1],
            z = a[2],
            w = a[3];
        return Math.sqrt(x * x + y * y + z * z + w * w);
      };
      vec4.sqrLen = vec4.squaredLength = function(a) {
        var x = a[0],
            y = a[1],
            z = a[2],
            w = a[3];
        return x * x + y * y + z * z + w * w;
      };
      vec4.negate = function(out, a) {
        out[0] = -a[0];
        out[1] = -a[1];
        out[2] = -a[2];
        out[3] = -a[3];
        return out;
      };
      vec4.normalize = function(out, a) {
        var x = a[0],
            y = a[1],
            z = a[2],
            w = a[3];
        var len = x * x + y * y + z * z + w * w;
        if (len > 0) {
          len = 1 / Math.sqrt(len);
          out[0] = a[0] * len;
          out[1] = a[1] * len;
          out[2] = a[2] * len;
          out[3] = a[3] * len;
        }
        return out;
      };
      vec4.dot = function(a, b) {
        return a[0] * b[0] + a[1] * b[1] + a[2] * b[2] + a[3] * b[3];
      };
      vec4.lerp = function(out, a, b, t) {
        var ax = a[0],
            ay = a[1],
            az = a[2],
            aw = a[3];
        out[0] = ax + t * (b[0] - ax);
        out[1] = ay + t * (b[1] - ay);
        out[2] = az + t * (b[2] - az);
        out[3] = aw + t * (b[3] - aw);
        return out;
      };
      vec4.transformMat4 = function(out, a, m) {
        var x = a[0],
            y = a[1],
            z = a[2],
            w = a[3];
        out[0] = m[0] * x + m[4] * y + m[8] * z + m[12] * w;
        out[1] = m[1] * x + m[5] * y + m[9] * z + m[13] * w;
        out[2] = m[2] * x + m[6] * y + m[10] * z + m[14] * w;
        out[3] = m[3] * x + m[7] * y + m[11] * z + m[15] * w;
        return out;
      };
      vec4.transformQuat = function(out, a, q) {
        var x = a[0],
            y = a[1],
            z = a[2],
            qx = q[0],
            qy = q[1],
            qz = q[2],
            qw = q[3],
            ix = qw * x + qy * z - qz * y,
            iy = qw * y + qz * x - qx * z,
            iz = qw * z + qx * y - qy * x,
            iw = -qx * x - qy * y - qz * z;
        out[0] = ix * qw + iw * -qx + iy * -qz - iz * -qy;
        out[1] = iy * qw + iw * -qy + iz * -qx - ix * -qz;
        out[2] = iz * qw + iw * -qz + ix * -qy - iy * -qx;
        return out;
      };
      vec4.forEach = (function() {
        var vec = new Float32Array(4);
        return function(a, stride, offset, count, fn, arg) {
          var i,
              l;
          if (!stride) {
            stride = 4;
          }
          if (!offset) {
            offset = 0;
          }
          if (count) {
            l = Math.min((count * stride) + offset, a.length);
          } else {
            l = a.length;
          }
          for (i = offset; i < l; i += stride) {
            vec[0] = a[i];
            vec[1] = a[i + 1];
            vec[2] = a[i + 2];
            vec[3] = a[i + 3];
            fn(vec, vec, arg);
            a[i] = vec[0];
            a[i + 1] = vec[1];
            a[i + 2] = vec[2];
            a[i + 3] = vec[3];
          }
          return a;
        };
      })();
      vec4.str = function(a) {
        return 'vec4(' + a[0] + ', ' + a[1] + ', ' + a[2] + ', ' + a[3] + ')';
      };
      if (typeof(exports) !== 'undefined') {
        exports.vec4 = vec4;
      }
      ;
      var mat2 = {};
      var mat2Identity = new Float32Array([1, 0, 0, 1]);
      if (!GLMAT_EPSILON) {
        var GLMAT_EPSILON = 0.000001;
      }
      mat2.create = function() {
        return new Float32Array(mat2Identity);
      };
      mat2.clone = function(a) {
        var out = new Float32Array(4);
        out[0] = a[0];
        out[1] = a[1];
        out[2] = a[2];
        out[3] = a[3];
        return out;
      };
      mat2.copy = function(out, a) {
        out[0] = a[0];
        out[1] = a[1];
        out[2] = a[2];
        out[3] = a[3];
        return out;
      };
      mat2.identity = function(out) {
        out[0] = 1;
        out[1] = 0;
        out[2] = 0;
        out[3] = 1;
        return out;
      };
      mat2.transpose = function(out, a) {
        if (out === a) {
          var a1 = a[1];
          out[1] = a[2];
          out[2] = a1;
        } else {
          out[0] = a[0];
          out[1] = a[2];
          out[2] = a[1];
          out[3] = a[3];
        }
        return out;
      };
      mat2.invert = function(out, a) {
        var a0 = a[0],
            a1 = a[1],
            a2 = a[2],
            a3 = a[3],
            det = a0 * a3 - a2 * a1;
        if (!det) {
          return null;
        }
        det = 1.0 / det;
        out[0] = a3 * det;
        out[1] = -a1 * det;
        out[2] = -a2 * det;
        out[3] = a0 * det;
        return out;
      };
      mat2.adjoint = function(out, a) {
        var a0 = a[0];
        out[0] = a[3];
        out[1] = -a[1];
        out[2] = -a[2];
        out[3] = a0;
        return out;
      };
      mat2.determinant = function(a) {
        return a[0] * a[3] - a[2] * a[1];
      };
      mat2.mul = mat2.multiply = function(out, a, b) {
        var a0 = a[0],
            a1 = a[1],
            a2 = a[2],
            a3 = a[3];
        var b0 = b[0],
            b1 = b[1],
            b2 = b[2],
            b3 = b[3];
        out[0] = a0 * b0 + a1 * b2;
        out[1] = a0 * b1 + a1 * b3;
        out[2] = a2 * b0 + a3 * b2;
        out[3] = a2 * b1 + a3 * b3;
        return out;
      };
      mat2.rotate = function(out, a, rad) {
        var a0 = a[0],
            a1 = a[1],
            a2 = a[2],
            a3 = a[3],
            s = Math.sin(rad),
            c = Math.cos(rad);
        out[0] = a0 * c + a1 * s;
        out[1] = a0 * -s + a1 * c;
        out[2] = a2 * c + a3 * s;
        out[3] = a2 * -s + a3 * c;
        return out;
      };
      mat2.scale = function(out, a, v) {
        var a0 = a[0],
            a1 = a[1],
            a2 = a[2],
            a3 = a[3],
            v0 = v[0],
            v1 = v[1];
        out[0] = a0 * v0;
        out[1] = a1 * v1;
        out[2] = a2 * v0;
        out[3] = a3 * v1;
        return out;
      };
      mat2.str = function(a) {
        return 'mat2(' + a[0] + ', ' + a[1] + ', ' + a[2] + ', ' + a[3] + ')';
      };
      if (typeof(exports) !== 'undefined') {
        exports.mat2 = mat2;
      }
      ;
      var mat3 = {};
      var mat3Identity = new Float32Array([1, 0, 0, 0, 1, 0, 0, 0, 1]);
      if (!GLMAT_EPSILON) {
        var GLMAT_EPSILON = 0.000001;
      }
      mat3.create = function() {
        return new Float32Array(mat3Identity);
      };
      mat3.clone = function(a) {
        var out = new Float32Array(9);
        out[0] = a[0];
        out[1] = a[1];
        out[2] = a[2];
        out[3] = a[3];
        out[4] = a[4];
        out[5] = a[5];
        out[6] = a[6];
        out[7] = a[7];
        out[8] = a[8];
        return out;
      };
      mat3.copy = function(out, a) {
        out[0] = a[0];
        out[1] = a[1];
        out[2] = a[2];
        out[3] = a[3];
        out[4] = a[4];
        out[5] = a[5];
        out[6] = a[6];
        out[7] = a[7];
        out[8] = a[8];
        return out;
      };
      mat3.identity = function(out) {
        out[0] = 1;
        out[1] = 0;
        out[2] = 0;
        out[3] = 0;
        out[4] = 1;
        out[5] = 0;
        out[6] = 0;
        out[7] = 0;
        out[8] = 1;
        return out;
      };
      mat3.transpose = function(out, a) {
        if (out === a) {
          var a01 = a[1],
              a02 = a[2],
              a12 = a[5];
          out[1] = a[3];
          out[2] = a[6];
          out[3] = a01;
          out[5] = a[7];
          out[6] = a02;
          out[7] = a12;
        } else {
          out[0] = a[0];
          out[1] = a[3];
          out[2] = a[6];
          out[3] = a[1];
          out[4] = a[4];
          out[5] = a[7];
          out[6] = a[2];
          out[7] = a[5];
          out[8] = a[8];
        }
        return out;
      };
      mat3.invert = function(out, a) {
        var a00 = a[0],
            a01 = a[1],
            a02 = a[2],
            a10 = a[3],
            a11 = a[4],
            a12 = a[5],
            a20 = a[6],
            a21 = a[7],
            a22 = a[8],
            b01 = a22 * a11 - a12 * a21,
            b11 = -a22 * a10 + a12 * a20,
            b21 = a21 * a10 - a11 * a20,
            det = a00 * b01 + a01 * b11 + a02 * b21;
        if (!det) {
          return null;
        }
        det = 1.0 / det;
        out[0] = b01 * det;
        out[1] = (-a22 * a01 + a02 * a21) * det;
        out[2] = (a12 * a01 - a02 * a11) * det;
        out[3] = b11 * det;
        out[4] = (a22 * a00 - a02 * a20) * det;
        out[5] = (-a12 * a00 + a02 * a10) * det;
        out[6] = b21 * det;
        out[7] = (-a21 * a00 + a01 * a20) * det;
        out[8] = (a11 * a00 - a01 * a10) * det;
        return out;
      };
      mat3.adjoint = function(out, a) {
        var a00 = a[0],
            a01 = a[1],
            a02 = a[2],
            a10 = a[3],
            a11 = a[4],
            a12 = a[5],
            a20 = a[6],
            a21 = a[7],
            a22 = a[8];
        out[0] = (a11 * a22 - a12 * a21);
        out[1] = (a02 * a21 - a01 * a22);
        out[2] = (a01 * a12 - a02 * a11);
        out[3] = (a12 * a20 - a10 * a22);
        out[4] = (a00 * a22 - a02 * a20);
        out[5] = (a02 * a10 - a00 * a12);
        out[6] = (a10 * a21 - a11 * a20);
        out[7] = (a01 * a20 - a00 * a21);
        out[8] = (a00 * a11 - a01 * a10);
        return out;
      };
      mat3.determinant = function(a) {
        var a00 = a[0],
            a01 = a[1],
            a02 = a[2],
            a10 = a[3],
            a11 = a[4],
            a12 = a[5],
            a20 = a[6],
            a21 = a[7],
            a22 = a[8];
        return a00 * (a22 * a11 - a12 * a21) + a01 * (-a22 * a10 + a12 * a20) + a02 * (a21 * a10 - a11 * a20);
      };
      mat3.mul = mat3.multiply = function(out, a, b) {
        var a00 = a[0],
            a01 = a[1],
            a02 = a[2],
            a10 = a[3],
            a11 = a[4],
            a12 = a[5],
            a20 = a[6],
            a21 = a[7],
            a22 = a[8],
            b00 = b[0],
            b01 = b[1],
            b02 = b[2],
            b10 = b[3],
            b11 = b[4],
            b12 = b[5],
            b20 = b[6],
            b21 = b[7],
            b22 = b[8];
        out[0] = b00 * a00 + b01 * a10 + b02 * a20;
        out[1] = b00 * a01 + b01 * a11 + b02 * a21;
        out[2] = b00 * a02 + b01 * a12 + b02 * a22;
        out[3] = b10 * a00 + b11 * a10 + b12 * a20;
        out[4] = b10 * a01 + b11 * a11 + b12 * a21;
        out[5] = b10 * a02 + b11 * a12 + b12 * a22;
        out[6] = b20 * a00 + b21 * a10 + b22 * a20;
        out[7] = b20 * a01 + b21 * a11 + b22 * a21;
        out[8] = b20 * a02 + b21 * a12 + b22 * a22;
        return out;
      };
      mat3.str = function(a) {
        return 'mat3(' + a[0] + ', ' + a[1] + ', ' + a[2] + ', ' + a[3] + ', ' + a[4] + ', ' + a[5] + ', ' + a[6] + ', ' + a[7] + ', ' + a[8] + ')';
      };
      if (typeof(exports) !== 'undefined') {
        exports.mat3 = mat3;
      }
      ;
      var mat4 = {};
      var mat4Identity = new Float32Array([1, 0, 0, 0, 0, 1, 0, 0, 0, 0, 1, 0, 0, 0, 0, 1]);
      if (!GLMAT_EPSILON) {
        var GLMAT_EPSILON = 0.000001;
      }
      mat4.create = function() {
        return new Float32Array(mat4Identity);
      };
      mat4.clone = function(a) {
        var out = new Float32Array(16);
        out[0] = a[0];
        out[1] = a[1];
        out[2] = a[2];
        out[3] = a[3];
        out[4] = a[4];
        out[5] = a[5];
        out[6] = a[6];
        out[7] = a[7];
        out[8] = a[8];
        out[9] = a[9];
        out[10] = a[10];
        out[11] = a[11];
        out[12] = a[12];
        out[13] = a[13];
        out[14] = a[14];
        out[15] = a[15];
        return out;
      };
      mat4.copy = function(out, a) {
        out[0] = a[0];
        out[1] = a[1];
        out[2] = a[2];
        out[3] = a[3];
        out[4] = a[4];
        out[5] = a[5];
        out[6] = a[6];
        out[7] = a[7];
        out[8] = a[8];
        out[9] = a[9];
        out[10] = a[10];
        out[11] = a[11];
        out[12] = a[12];
        out[13] = a[13];
        out[14] = a[14];
        out[15] = a[15];
        return out;
      };
      mat4.identity = function(out) {
        out[0] = 1;
        out[1] = 0;
        out[2] = 0;
        out[3] = 0;
        out[4] = 0;
        out[5] = 1;
        out[6] = 0;
        out[7] = 0;
        out[8] = 0;
        out[9] = 0;
        out[10] = 1;
        out[11] = 0;
        out[12] = 0;
        out[13] = 0;
        out[14] = 0;
        out[15] = 1;
        return out;
      };
      mat4.transpose = function(out, a) {
        if (out === a) {
          var a01 = a[1],
              a02 = a[2],
              a03 = a[3],
              a12 = a[6],
              a13 = a[7],
              a23 = a[11];
          out[1] = a[4];
          out[2] = a[8];
          out[3] = a[12];
          out[4] = a01;
          out[6] = a[9];
          out[7] = a[13];
          out[8] = a02;
          out[9] = a12;
          out[11] = a[14];
          out[12] = a03;
          out[13] = a13;
          out[14] = a23;
        } else {
          out[0] = a[0];
          out[1] = a[4];
          out[2] = a[8];
          out[3] = a[12];
          out[4] = a[1];
          out[5] = a[5];
          out[6] = a[9];
          out[7] = a[13];
          out[8] = a[2];
          out[9] = a[6];
          out[10] = a[10];
          out[11] = a[14];
          out[12] = a[3];
          out[13] = a[7];
          out[14] = a[11];
          out[15] = a[15];
        }
        return out;
      };
      mat4.invert = function(out, a) {
        var a00 = a[0],
            a01 = a[1],
            a02 = a[2],
            a03 = a[3],
            a10 = a[4],
            a11 = a[5],
            a12 = a[6],
            a13 = a[7],
            a20 = a[8],
            a21 = a[9],
            a22 = a[10],
            a23 = a[11],
            a30 = a[12],
            a31 = a[13],
            a32 = a[14],
            a33 = a[15],
            b00 = a00 * a11 - a01 * a10,
            b01 = a00 * a12 - a02 * a10,
            b02 = a00 * a13 - a03 * a10,
            b03 = a01 * a12 - a02 * a11,
            b04 = a01 * a13 - a03 * a11,
            b05 = a02 * a13 - a03 * a12,
            b06 = a20 * a31 - a21 * a30,
            b07 = a20 * a32 - a22 * a30,
            b08 = a20 * a33 - a23 * a30,
            b09 = a21 * a32 - a22 * a31,
            b10 = a21 * a33 - a23 * a31,
            b11 = a22 * a33 - a23 * a32,
            det = b00 * b11 - b01 * b10 + b02 * b09 + b03 * b08 - b04 * b07 + b05 * b06;
        if (!det) {
          return null;
        }
        det = 1.0 / det;
        out[0] = (a11 * b11 - a12 * b10 + a13 * b09) * det;
        out[1] = (a02 * b10 - a01 * b11 - a03 * b09) * det;
        out[2] = (a31 * b05 - a32 * b04 + a33 * b03) * det;
        out[3] = (a22 * b04 - a21 * b05 - a23 * b03) * det;
        out[4] = (a12 * b08 - a10 * b11 - a13 * b07) * det;
        out[5] = (a00 * b11 - a02 * b08 + a03 * b07) * det;
        out[6] = (a32 * b02 - a30 * b05 - a33 * b01) * det;
        out[7] = (a20 * b05 - a22 * b02 + a23 * b01) * det;
        out[8] = (a10 * b10 - a11 * b08 + a13 * b06) * det;
        out[9] = (a01 * b08 - a00 * b10 - a03 * b06) * det;
        out[10] = (a30 * b04 - a31 * b02 + a33 * b00) * det;
        out[11] = (a21 * b02 - a20 * b04 - a23 * b00) * det;
        out[12] = (a11 * b07 - a10 * b09 - a12 * b06) * det;
        out[13] = (a00 * b09 - a01 * b07 + a02 * b06) * det;
        out[14] = (a31 * b01 - a30 * b03 - a32 * b00) * det;
        out[15] = (a20 * b03 - a21 * b01 + a22 * b00) * det;
        return out;
      };
      mat4.adjoint = function(out, a) {
        var a00 = a[0],
            a01 = a[1],
            a02 = a[2],
            a03 = a[3],
            a10 = a[4],
            a11 = a[5],
            a12 = a[6],
            a13 = a[7],
            a20 = a[8],
            a21 = a[9],
            a22 = a[10],
            a23 = a[11],
            a30 = a[12],
            a31 = a[13],
            a32 = a[14],
            a33 = a[15];
        out[0] = (a11 * (a22 * a33 - a23 * a32) - a21 * (a12 * a33 - a13 * a32) + a31 * (a12 * a23 - a13 * a22));
        out[1] = -(a01 * (a22 * a33 - a23 * a32) - a21 * (a02 * a33 - a03 * a32) + a31 * (a02 * a23 - a03 * a22));
        out[2] = (a01 * (a12 * a33 - a13 * a32) - a11 * (a02 * a33 - a03 * a32) + a31 * (a02 * a13 - a03 * a12));
        out[3] = -(a01 * (a12 * a23 - a13 * a22) - a11 * (a02 * a23 - a03 * a22) + a21 * (a02 * a13 - a03 * a12));
        out[4] = -(a10 * (a22 * a33 - a23 * a32) - a20 * (a12 * a33 - a13 * a32) + a30 * (a12 * a23 - a13 * a22));
        out[5] = (a00 * (a22 * a33 - a23 * a32) - a20 * (a02 * a33 - a03 * a32) + a30 * (a02 * a23 - a03 * a22));
        out[6] = -(a00 * (a12 * a33 - a13 * a32) - a10 * (a02 * a33 - a03 * a32) + a30 * (a02 * a13 - a03 * a12));
        out[7] = (a00 * (a12 * a23 - a13 * a22) - a10 * (a02 * a23 - a03 * a22) + a20 * (a02 * a13 - a03 * a12));
        out[8] = (a10 * (a21 * a33 - a23 * a31) - a20 * (a11 * a33 - a13 * a31) + a30 * (a11 * a23 - a13 * a21));
        out[9] = -(a00 * (a21 * a33 - a23 * a31) - a20 * (a01 * a33 - a03 * a31) + a30 * (a01 * a23 - a03 * a21));
        out[10] = (a00 * (a11 * a33 - a13 * a31) - a10 * (a01 * a33 - a03 * a31) + a30 * (a01 * a13 - a03 * a11));
        out[11] = -(a00 * (a11 * a23 - a13 * a21) - a10 * (a01 * a23 - a03 * a21) + a20 * (a01 * a13 - a03 * a11));
        out[12] = -(a10 * (a21 * a32 - a22 * a31) - a20 * (a11 * a32 - a12 * a31) + a30 * (a11 * a22 - a12 * a21));
        out[13] = (a00 * (a21 * a32 - a22 * a31) - a20 * (a01 * a32 - a02 * a31) + a30 * (a01 * a22 - a02 * a21));
        out[14] = -(a00 * (a11 * a32 - a12 * a31) - a10 * (a01 * a32 - a02 * a31) + a30 * (a01 * a12 - a02 * a11));
        out[15] = (a00 * (a11 * a22 - a12 * a21) - a10 * (a01 * a22 - a02 * a21) + a20 * (a01 * a12 - a02 * a11));
        return out;
      };
      mat4.determinant = function(a) {
        var a00 = a[0],
            a01 = a[1],
            a02 = a[2],
            a03 = a[3],
            a10 = a[4],
            a11 = a[5],
            a12 = a[6],
            a13 = a[7],
            a20 = a[8],
            a21 = a[9],
            a22 = a[10],
            a23 = a[11],
            a30 = a[12],
            a31 = a[13],
            a32 = a[14],
            a33 = a[15],
            b00 = a00 * a11 - a01 * a10,
            b01 = a00 * a12 - a02 * a10,
            b02 = a00 * a13 - a03 * a10,
            b03 = a01 * a12 - a02 * a11,
            b04 = a01 * a13 - a03 * a11,
            b05 = a02 * a13 - a03 * a12,
            b06 = a20 * a31 - a21 * a30,
            b07 = a20 * a32 - a22 * a30,
            b08 = a20 * a33 - a23 * a30,
            b09 = a21 * a32 - a22 * a31,
            b10 = a21 * a33 - a23 * a31,
            b11 = a22 * a33 - a23 * a32;
        return b00 * b11 - b01 * b10 + b02 * b09 + b03 * b08 - b04 * b07 + b05 * b06;
      };
      mat4.mul = mat4.multiply = function(out, a, b) {
        var a00 = a[0],
            a01 = a[1],
            a02 = a[2],
            a03 = a[3],
            a10 = a[4],
            a11 = a[5],
            a12 = a[6],
            a13 = a[7],
            a20 = a[8],
            a21 = a[9],
            a22 = a[10],
            a23 = a[11],
            a30 = a[12],
            a31 = a[13],
            a32 = a[14],
            a33 = a[15];
        var b0 = b[0],
            b1 = b[1],
            b2 = b[2],
            b3 = b[3];
        out[0] = b0 * a00 + b1 * a10 + b2 * a20 + b3 * a30;
        out[1] = b0 * a01 + b1 * a11 + b2 * a21 + b3 * a31;
        out[2] = b0 * a02 + b1 * a12 + b2 * a22 + b3 * a32;
        out[3] = b0 * a03 + b1 * a13 + b2 * a23 + b3 * a33;
        b0 = b[4];
        b1 = b[5];
        b2 = b[6];
        b3 = b[7];
        out[4] = b0 * a00 + b1 * a10 + b2 * a20 + b3 * a30;
        out[5] = b0 * a01 + b1 * a11 + b2 * a21 + b3 * a31;
        out[6] = b0 * a02 + b1 * a12 + b2 * a22 + b3 * a32;
        out[7] = b0 * a03 + b1 * a13 + b2 * a23 + b3 * a33;
        b0 = b[8];
        b1 = b[9];
        b2 = b[10];
        b3 = b[11];
        out[8] = b0 * a00 + b1 * a10 + b2 * a20 + b3 * a30;
        out[9] = b0 * a01 + b1 * a11 + b2 * a21 + b3 * a31;
        out[10] = b0 * a02 + b1 * a12 + b2 * a22 + b3 * a32;
        out[11] = b0 * a03 + b1 * a13 + b2 * a23 + b3 * a33;
        b0 = b[12];
        b1 = b[13];
        b2 = b[14];
        b3 = b[15];
        out[12] = b0 * a00 + b1 * a10 + b2 * a20 + b3 * a30;
        out[13] = b0 * a01 + b1 * a11 + b2 * a21 + b3 * a31;
        out[14] = b0 * a02 + b1 * a12 + b2 * a22 + b3 * a32;
        out[15] = b0 * a03 + b1 * a13 + b2 * a23 + b3 * a33;
        return out;
      };
      mat4.translate = function(out, a, v) {
        var x = v[0],
            y = v[1],
            z = v[2],
            a00,
            a01,
            a02,
            a03,
            a10,
            a11,
            a12,
            a13,
            a20,
            a21,
            a22,
            a23;
        if (a === out) {
          out[12] = a[0] * x + a[4] * y + a[8] * z + a[12];
          out[13] = a[1] * x + a[5] * y + a[9] * z + a[13];
          out[14] = a[2] * x + a[6] * y + a[10] * z + a[14];
          out[15] = a[3] * x + a[7] * y + a[11] * z + a[15];
        } else {
          a00 = a[0];
          a01 = a[1];
          a02 = a[2];
          a03 = a[3];
          a10 = a[4];
          a11 = a[5];
          a12 = a[6];
          a13 = a[7];
          a20 = a[8];
          a21 = a[9];
          a22 = a[10];
          a23 = a[11];
          out[0] = a00;
          out[1] = a01;
          out[2] = a02;
          out[3] = a03;
          out[4] = a10;
          out[5] = a11;
          out[6] = a12;
          out[7] = a13;
          out[8] = a20;
          out[9] = a21;
          out[10] = a22;
          out[11] = a23;
          out[12] = a00 * x + a10 * y + a20 * z + a[12];
          out[13] = a01 * x + a11 * y + a21 * z + a[13];
          out[14] = a02 * x + a12 * y + a22 * z + a[14];
          out[15] = a03 * x + a13 * y + a23 * z + a[15];
        }
        return out;
      };
      mat4.scale = function(out, a, v) {
        var x = v[0],
            y = v[1],
            z = v[2];
        out[0] = a[0] * x;
        out[1] = a[1] * x;
        out[2] = a[2] * x;
        out[3] = a[3] * x;
        out[4] = a[4] * y;
        out[5] = a[5] * y;
        out[6] = a[6] * y;
        out[7] = a[7] * y;
        out[8] = a[8] * z;
        out[9] = a[9] * z;
        out[10] = a[10] * z;
        out[11] = a[11] * z;
        out[12] = a[12];
        out[13] = a[13];
        out[14] = a[14];
        out[15] = a[15];
        return out;
      };
      mat4.rotate = function(out, a, rad, axis) {
        var x = axis[0],
            y = axis[1],
            z = axis[2],
            len = Math.sqrt(x * x + y * y + z * z),
            s,
            c,
            t,
            a00,
            a01,
            a02,
            a03,
            a10,
            a11,
            a12,
            a13,
            a20,
            a21,
            a22,
            a23,
            b00,
            b01,
            b02,
            b10,
            b11,
            b12,
            b20,
            b21,
            b22;
        if (Math.abs(len) < GLMAT_EPSILON) {
          return null;
        }
        len = 1 / len;
        x *= len;
        y *= len;
        z *= len;
        s = Math.sin(rad);
        c = Math.cos(rad);
        t = 1 - c;
        a00 = a[0];
        a01 = a[1];
        a02 = a[2];
        a03 = a[3];
        a10 = a[4];
        a11 = a[5];
        a12 = a[6];
        a13 = a[7];
        a20 = a[8];
        a21 = a[9];
        a22 = a[10];
        a23 = a[11];
        b00 = x * x * t + c;
        b01 = y * x * t + z * s;
        b02 = z * x * t - y * s;
        b10 = x * y * t - z * s;
        b11 = y * y * t + c;
        b12 = z * y * t + x * s;
        b20 = x * z * t + y * s;
        b21 = y * z * t - x * s;
        b22 = z * z * t + c;
        out[0] = a00 * b00 + a10 * b01 + a20 * b02;
        out[1] = a01 * b00 + a11 * b01 + a21 * b02;
        out[2] = a02 * b00 + a12 * b01 + a22 * b02;
        out[3] = a03 * b00 + a13 * b01 + a23 * b02;
        out[4] = a00 * b10 + a10 * b11 + a20 * b12;
        out[5] = a01 * b10 + a11 * b11 + a21 * b12;
        out[6] = a02 * b10 + a12 * b11 + a22 * b12;
        out[7] = a03 * b10 + a13 * b11 + a23 * b12;
        out[8] = a00 * b20 + a10 * b21 + a20 * b22;
        out[9] = a01 * b20 + a11 * b21 + a21 * b22;
        out[10] = a02 * b20 + a12 * b21 + a22 * b22;
        out[11] = a03 * b20 + a13 * b21 + a23 * b22;
        if (a !== out) {
          out[12] = a[12];
          out[13] = a[13];
          out[14] = a[14];
          out[15] = a[15];
        }
        return out;
      };
      mat4.rotateX = function(out, a, rad) {
        var s = Math.sin(rad),
            c = Math.cos(rad),
            a10 = a[4],
            a11 = a[5],
            a12 = a[6],
            a13 = a[7],
            a20 = a[8],
            a21 = a[9],
            a22 = a[10],
            a23 = a[11];
        if (a !== out) {
          out[0] = a[0];
          out[1] = a[1];
          out[2] = a[2];
          out[3] = a[3];
          out[12] = a[12];
          out[13] = a[13];
          out[14] = a[14];
          out[15] = a[15];
        }
        out[4] = a10 * c + a20 * s;
        out[5] = a11 * c + a21 * s;
        out[6] = a12 * c + a22 * s;
        out[7] = a13 * c + a23 * s;
        out[8] = a20 * c - a10 * s;
        out[9] = a21 * c - a11 * s;
        out[10] = a22 * c - a12 * s;
        out[11] = a23 * c - a13 * s;
        return out;
      };
      mat4.rotateY = function(out, a, rad) {
        var s = Math.sin(rad),
            c = Math.cos(rad),
            a00 = a[0],
            a01 = a[1],
            a02 = a[2],
            a03 = a[3],
            a20 = a[8],
            a21 = a[9],
            a22 = a[10],
            a23 = a[11];
        if (a !== out) {
          out[4] = a[4];
          out[5] = a[5];
          out[6] = a[6];
          out[7] = a[7];
          out[12] = a[12];
          out[13] = a[13];
          out[14] = a[14];
          out[15] = a[15];
        }
        out[0] = a00 * c - a20 * s;
        out[1] = a01 * c - a21 * s;
        out[2] = a02 * c - a22 * s;
        out[3] = a03 * c - a23 * s;
        out[8] = a00 * s + a20 * c;
        out[9] = a01 * s + a21 * c;
        out[10] = a02 * s + a22 * c;
        out[11] = a03 * s + a23 * c;
        return out;
      };
      mat4.rotateZ = function(out, a, rad) {
        var s = Math.sin(rad),
            c = Math.cos(rad),
            a00 = a[0],
            a01 = a[1],
            a02 = a[2],
            a03 = a[3],
            a10 = a[4],
            a11 = a[5],
            a12 = a[6],
            a13 = a[7];
        if (a !== out) {
          out[8] = a[8];
          out[9] = a[9];
          out[10] = a[10];
          out[11] = a[11];
          out[12] = a[12];
          out[13] = a[13];
          out[14] = a[14];
          out[15] = a[15];
        }
        out[0] = a00 * c + a10 * s;
        out[1] = a01 * c + a11 * s;
        out[2] = a02 * c + a12 * s;
        out[3] = a03 * c + a13 * s;
        out[4] = a10 * c - a00 * s;
        out[5] = a11 * c - a01 * s;
        out[6] = a12 * c - a02 * s;
        out[7] = a13 * c - a03 * s;
        return out;
      };
      mat4.fromRotationTranslation = function(out, q, v) {
        var x = q[0],
            y = q[1],
            z = q[2],
            w = q[3],
            x2 = x + x,
            y2 = y + y,
            z2 = z + z,
            xx = x * x2,
            xy = x * y2,
            xz = x * z2,
            yy = y * y2,
            yz = y * z2,
            zz = z * z2,
            wx = w * x2,
            wy = w * y2,
            wz = w * z2;
        out[0] = 1 - (yy + zz);
        out[1] = xy + wz;
        out[2] = xz - wy;
        out[3] = 0;
        out[4] = xy - wz;
        out[5] = 1 - (xx + zz);
        out[6] = yz + wx;
        out[7] = 0;
        out[8] = xz + wy;
        out[9] = yz - wx;
        out[10] = 1 - (xx + yy);
        out[11] = 0;
        out[12] = v[0];
        out[13] = v[1];
        out[14] = v[2];
        out[15] = 1;
        return out;
      };
      mat4.frustum = function(out, left, right, bottom, top, near, far) {
        var rl = 1 / (right - left),
            tb = 1 / (top - bottom),
            nf = 1 / (near - far);
        out[0] = (near * 2) * rl;
        out[1] = 0;
        out[2] = 0;
        out[3] = 0;
        out[4] = 0;
        out[5] = (near * 2) * tb;
        out[6] = 0;
        out[7] = 0;
        out[8] = (right + left) * rl;
        out[9] = (top + bottom) * tb;
        out[10] = (far + near) * nf;
        out[11] = -1;
        out[12] = 0;
        out[13] = 0;
        out[14] = (far * near * 2) * nf;
        out[15] = 0;
        return out;
      };
      mat4.perspective = function(out, fovy, aspect, near, far) {
        var f = 1.0 / Math.tan(fovy / 2),
            nf = 1 / (near - far);
        out[0] = f / aspect;
        out[1] = 0;
        out[2] = 0;
        out[3] = 0;
        out[4] = 0;
        out[5] = f;
        out[6] = 0;
        out[7] = 0;
        out[8] = 0;
        out[9] = 0;
        out[10] = (far + near) * nf;
        out[11] = -1;
        out[12] = 0;
        out[13] = 0;
        out[14] = (2 * far * near) * nf;
        out[15] = 0;
        return out;
      };
      mat4.ortho = function(out, left, right, bottom, top, near, far) {
        var lr = 1 / (left - right),
            bt = 1 / (bottom - top),
            nf = 1 / (near - far);
        out[0] = -2 * lr;
        out[1] = 0;
        out[2] = 0;
        out[3] = 0;
        out[4] = 0;
        out[5] = -2 * bt;
        out[6] = 0;
        out[7] = 0;
        out[8] = 0;
        out[9] = 0;
        out[10] = 2 * nf;
        out[11] = 0;
        out[12] = (left + right) * lr;
        out[13] = (top + bottom) * bt;
        out[14] = (far + near) * nf;
        out[15] = 1;
        return out;
      };
      mat4.lookAt = function(out, eye, center, up) {
        var x0,
            x1,
            x2,
            y0,
            y1,
            y2,
            z0,
            z1,
            z2,
            len,
            eyex = eye[0],
            eyey = eye[1],
            eyez = eye[2],
            upx = up[0],
            upy = up[1],
            upz = up[2],
            centerx = center[0],
            centery = center[1],
            centerz = center[2];
        if (Math.abs(eyex - centerx) < GLMAT_EPSILON && Math.abs(eyey - centery) < GLMAT_EPSILON && Math.abs(eyez - centerz) < GLMAT_EPSILON) {
          return mat4.identity(out);
        }
        z0 = eyex - centerx;
        z1 = eyey - centery;
        z2 = eyez - centerz;
        len = 1 / Math.sqrt(z0 * z0 + z1 * z1 + z2 * z2);
        z0 *= len;
        z1 *= len;
        z2 *= len;
        x0 = upy * z2 - upz * z1;
        x1 = upz * z0 - upx * z2;
        x2 = upx * z1 - upy * z0;
        len = Math.sqrt(x0 * x0 + x1 * x1 + x2 * x2);
        if (!len) {
          x0 = 0;
          x1 = 0;
          x2 = 0;
        } else {
          len = 1 / len;
          x0 *= len;
          x1 *= len;
          x2 *= len;
        }
        y0 = z1 * x2 - z2 * x1;
        y1 = z2 * x0 - z0 * x2;
        y2 = z0 * x1 - z1 * x0;
        len = Math.sqrt(y0 * y0 + y1 * y1 + y2 * y2);
        if (!len) {
          y0 = 0;
          y1 = 0;
          y2 = 0;
        } else {
          len = 1 / len;
          y0 *= len;
          y1 *= len;
          y2 *= len;
        }
        out[0] = x0;
        out[1] = y0;
        out[2] = z0;
        out[3] = 0;
        out[4] = x1;
        out[5] = y1;
        out[6] = z1;
        out[7] = 0;
        out[8] = x2;
        out[9] = y2;
        out[10] = z2;
        out[11] = 0;
        out[12] = -(x0 * eyex + x1 * eyey + x2 * eyez);
        out[13] = -(y0 * eyex + y1 * eyey + y2 * eyez);
        out[14] = -(z0 * eyex + z1 * eyey + z2 * eyez);
        out[15] = 1;
        return out;
      };
      mat4.str = function(a) {
        return 'mat4(' + a[0] + ', ' + a[1] + ', ' + a[2] + ', ' + a[3] + ', ' + a[4] + ', ' + a[5] + ', ' + a[6] + ', ' + a[7] + ', ' + a[8] + ', ' + a[9] + ', ' + a[10] + ', ' + a[11] + ', ' + a[12] + ', ' + a[13] + ', ' + a[14] + ', ' + a[15] + ')';
      };
      if (typeof(exports) !== 'undefined') {
        exports.mat4 = mat4;
      }
      ;
      var quat = {};
      var quatIdentity = new Float32Array([0, 0, 0, 1]);
      if (!GLMAT_EPSILON) {
        var GLMAT_EPSILON = 0.000001;
      }
      quat.create = function() {
        return new Float32Array(quatIdentity);
      };
      quat.clone = vec4.clone;
      quat.fromValues = vec4.fromValues;
      quat.copy = vec4.copy;
      quat.set = vec4.set;
      quat.identity = function(out) {
        out[0] = 0;
        out[1] = 0;
        out[2] = 0;
        out[3] = 1;
        return out;
      };
      quat.setAxisAngle = function(out, axis, rad) {
        rad = rad * 0.5;
        var s = Math.sin(rad);
        out[0] = s * axis[0];
        out[1] = s * axis[1];
        out[2] = s * axis[2];
        out[3] = Math.cos(rad);
        return out;
      };
      quat.add = vec4.add;
      quat.mul = quat.multiply = function(out, a, b) {
        var ax = a[0],
            ay = a[1],
            az = a[2],
            aw = a[3],
            bx = b[0],
            by = b[1],
            bz = b[2],
            bw = b[3];
        out[0] = ax * bw + aw * bx + ay * bz - az * by;
        out[1] = ay * bw + aw * by + az * bx - ax * bz;
        out[2] = az * bw + aw * bz + ax * by - ay * bx;
        out[3] = aw * bw - ax * bx - ay * by - az * bz;
        return out;
      };
      quat.scale = vec4.scale;
      quat.rotateX = function(out, a, rad) {
        rad *= 0.5;
        var ax = a[0],
            ay = a[1],
            az = a[2],
            aw = a[3],
            bx = Math.sin(rad),
            bw = Math.cos(rad);
        out[0] = ax * bw + aw * bx;
        out[1] = ay * bw + az * bx;
        out[2] = az * bw - ay * bx;
        out[3] = aw * bw - ax * bx;
        return out;
      };
      quat.rotateY = function(out, a, rad) {
        rad *= 0.5;
        var ax = a[0],
            ay = a[1],
            az = a[2],
            aw = a[3],
            by = Math.sin(rad),
            bw = Math.cos(rad);
        out[0] = ax * bw - az * by;
        out[1] = ay * bw + aw * by;
        out[2] = az * bw + ax * by;
        out[3] = aw * bw - ay * by;
        return out;
      };
      quat.rotateZ = function(out, a, rad) {
        rad *= 0.5;
        var ax = a[0],
            ay = a[1],
            az = a[2],
            aw = a[3],
            bz = Math.sin(rad),
            bw = Math.cos(rad);
        out[0] = ax * bw + ay * bz;
        out[1] = ay * bw - ax * bz;
        out[2] = az * bw + aw * bz;
        out[3] = aw * bw - az * bz;
        return out;
      };
      quat.calculateW = function(out, a) {
        var x = a[0],
            y = a[1],
            z = a[2];
        out[0] = x;
        out[1] = y;
        out[2] = z;
        out[3] = -Math.sqrt(Math.abs(1.0 - x * x - y * y - z * z));
        return out;
      };
      quat.dot = vec4.dot;
      quat.lerp = vec4.lerp;
      quat.slerp = function(out, a, b, t) {
        var ax = a[0],
            ay = a[1],
            az = a[2],
            aw = a[3],
            bx = b[0],
            by = b[1],
            bz = b[2],
            bw = a[3];
        var cosHalfTheta = ax * bx + ay * by + az * bz + aw * bw,
            halfTheta,
            sinHalfTheta,
            ratioA,
            ratioB;
        if (Math.abs(cosHalfTheta) >= 1.0) {
          if (out !== a) {
            out[0] = ax;
            out[1] = ay;
            out[2] = az;
            out[3] = aw;
          }
          return out;
        }
        halfTheta = Math.acos(cosHalfTheta);
        sinHalfTheta = Math.sqrt(1.0 - cosHalfTheta * cosHalfTheta);
        if (Math.abs(sinHalfTheta) < 0.001) {
          out[0] = (ax * 0.5 + bx * 0.5);
          out[1] = (ay * 0.5 + by * 0.5);
          out[2] = (az * 0.5 + bz * 0.5);
          out[3] = (aw * 0.5 + bw * 0.5);
          return out;
        }
        ratioA = Math.sin((1 - t) * halfTheta) / sinHalfTheta;
        ratioB = Math.sin(t * halfTheta) / sinHalfTheta;
        out[0] = (ax * ratioA + bx * ratioB);
        out[1] = (ay * ratioA + by * ratioB);
        out[2] = (az * ratioA + bz * ratioB);
        out[3] = (aw * ratioA + bw * ratioB);
        return out;
      };
      quat.invert = function(out, a) {
        var a0 = a[0],
            a1 = a[1],
            a2 = a[2],
            a3 = a[3],
            dot = a0 * a0 + a1 * a1 + a2 * a2 + a3 * a3,
            invDot = dot ? 1.0 / dot : 0;
        out[0] = -a0 * invDot;
        out[1] = -a1 * invDot;
        out[2] = -a2 * invDot;
        out[3] = a3 * invDot;
        return out;
      };
      quat.conjugate = function(out, a) {
        out[0] = -a[0];
        out[1] = -a[1];
        out[2] = -a[2];
        out[3] = a[3];
        return out;
      };
      quat.len = quat.length = vec4.length;
      quat.sqrLen = quat.squaredLength = vec4.squaredLength;
      quat.normalize = vec4.normalize;
      quat.str = function(a) {
        return 'quat(' + a[0] + ', ' + a[1] + ', ' + a[2] + ', ' + a[3] + ')';
      };
      if (typeof(exports) !== 'undefined') {
        exports.quat = quat;
      }
      ;
    })(shim.exports);
  })();
  global.define = __define;
  return module.exports;
});

System.register("npm:ndarray-fill@0.1.0/index", ["npm:cwise@0.3.4"], true, function(require, exports, module) {
  var global = System.global,
      __define = global.define;
  global.define = undefined;
  "use strict";
  var fill = require("npm:cwise@0.3.4")({
    args: ["index", "array", "scalar"],
    body: function(idx, out, f) {
      out = f.apply(undefined, idx);
    }
  });
  module.exports = function(array, f) {
    fill(array, f);
    return array;
  };
  global.define = __define;
  return module.exports;
});

System.register("npm:cwise-compiler@0.1.0/lib/compile", ["npm:uniq@0.0.2", "github:jspm/nodelibs-process@0.1.1"], true, function(require, exports, module) {
  var global = System.global,
      __define = global.define;
  global.define = undefined;
  (function(process) {
    "use strict";
    var uniq = require("npm:uniq@0.0.2");
    function innerFill(order, proc, body) {
      var dimension = order.length,
          nargs = proc.arrayArgs.length,
          has_index = proc.indexArgs.length > 0,
          code = [],
          vars = [],
          idx = 0,
          pidx = 0,
          i,
          j;
      for (i = 0; i < dimension; ++i) {
        vars.push(["i", i, "=0"].join(""));
      }
      for (j = 0; j < nargs; ++j) {
        for (i = 0; i < dimension; ++i) {
          pidx = idx;
          idx = order[i];
          if (i === 0) {
            vars.push(["d", j, "s", i, "=t", j, "[", idx, "]"].join(""));
          } else {
            vars.push(["d", j, "s", i, "=(t", j, "[", idx, "]-s", pidx, "*t", j, "[", pidx, "])"].join(""));
          }
        }
      }
      code.push("var " + vars.join(","));
      for (i = dimension - 1; i >= 0; --i) {
        idx = order[i];
        code.push(["for(i", i, "=0;i", i, "<s", idx, ";++i", i, "){"].join(""));
      }
      code.push(body);
      for (i = 0; i < dimension; ++i) {
        pidx = idx;
        idx = order[i];
        for (j = 0; j < nargs; ++j) {
          code.push(["p", j, "+=d", j, "s", i].join(""));
        }
        if (has_index) {
          if (i > 0) {
            code.push(["index[", pidx, "]-=s", pidx].join(""));
          }
          code.push(["++index[", idx, "]"].join(""));
        }
        code.push("}");
      }
      return code.join("\n");
    }
    function outerFill(matched, order, proc, body) {
      var dimension = order.length,
          nargs = proc.arrayArgs.length,
          blockSize = proc.blockSize,
          has_index = proc.indexArgs.length > 0,
          code = [];
      for (var i = 0; i < nargs; ++i) {
        code.push(["var offset", i, "=p", i].join(""));
      }
      for (var i = matched; i < dimension; ++i) {
        code.push(["for(var j" + i + "=SS[", order[i], "]|0;j", i, ">0;){"].join(""));
        code.push(["if(j", i, "<", blockSize, "){"].join(""));
        code.push(["s", order[i], "=j", i].join(""));
        code.push(["j", i, "=0"].join(""));
        code.push(["}else{s", order[i], "=", blockSize].join(""));
        code.push(["j", i, "-=", blockSize, "}"].join(""));
        if (has_index) {
          code.push(["index[", order[i], "]=j", i].join(""));
        }
      }
      for (var i = 0; i < nargs; ++i) {
        var indexStr = ["offset" + i];
        for (var j = matched; j < dimension; ++j) {
          indexStr.push(["j", j, "*t", i, "[", order[j], "]"].join(""));
        }
        code.push(["p", i, "=(", indexStr.join("+"), ")"].join(""));
      }
      code.push(innerFill(order, proc, body));
      for (var i = matched; i < dimension; ++i) {
        code.push("}");
      }
      return code.join("\n");
    }
    function countMatches(orders) {
      var matched = 0,
          dimension = orders[0].length;
      while (matched < dimension) {
        for (var j = 1; j < orders.length; ++j) {
          if (orders[j][matched] !== orders[0][matched]) {
            return matched;
          }
        }
        ++matched;
      }
      return matched;
    }
    function processBlock(block, proc, dtypes) {
      var code = block.body;
      var pre = [];
      var post = [];
      for (var i = 0; i < block.args.length; ++i) {
        var carg = block.args[i];
        if (carg.count <= 0) {
          continue;
        }
        var re = new RegExp(carg.name, "g");
        var ptrStr = "";
        var arrNum = proc.arrayArgs.indexOf(i);
        switch (proc.argTypes[i]) {
          case "offset":
            var offArgIndex = proc.offsetArgIndex.indexOf(i);
            var offArg = proc.offsetArgs[offArgIndex];
            arrNum = offArg.array;
            ptrStr = "+q" + offArgIndex;
          case "array":
            ptrStr = "p" + arrNum + ptrStr;
            var localStr = "l" + i;
            var arrStr = "a" + arrNum;
            if (carg.count === 1) {
              if (dtypes[arrNum] === "generic") {
                if (carg.lvalue) {
                  pre.push(["var ", localStr, "=", arrStr, ".get(", ptrStr, ")"].join(""));
                  code = code.replace(re, localStr);
                  post.push([arrStr, ".set(", ptrStr, ",", localStr, ")"].join(""));
                } else {
                  code = code.replace(re, [arrStr, ".get(", ptrStr, ")"].join(""));
                }
              } else {
                code = code.replace(re, [arrStr, "[", ptrStr, "]"].join(""));
              }
            } else if (dtypes[arrNum] === "generic") {
              pre.push(["var ", localStr, "=", arrStr, ".get(", ptrStr, ")"].join(""));
              code = code.replace(re, localStr);
              if (carg.lvalue) {
                post.push([arrStr, ".set(", ptrStr, ",", localStr, ")"].join(""));
              }
            } else {
              pre.push(["var ", localStr, "=", arrStr, "[", ptrStr, "]"].join(""));
              code = code.replace(re, localStr);
              if (carg.lvalue) {
                post.push([arrStr, "[", ptrStr, "]=", localStr].join(""));
              }
            }
            break;
          case "scalar":
            code = code.replace(re, "Y" + proc.scalarArgs.indexOf(i));
            break;
          case "index":
            code = code.replace(re, "index");
            break;
          case "shape":
            code = code.replace(re, "shape");
            break;
        }
      }
      return [pre.join("\n"), code, post.join("\n")].join("\n").trim();
    }
    function typeSummary(dtypes) {
      var summary = new Array(dtypes.length);
      var allEqual = true;
      for (var i = 0; i < dtypes.length; ++i) {
        var t = dtypes[i];
        var digits = t.match(/\d+/);
        if (!digits) {
          digits = "";
        } else {
          digits = digits[0];
        }
        if (t.charAt(0) === 0) {
          summary[i] = "u" + t.charAt(1) + digits;
        } else {
          summary[i] = t.charAt(0) + digits;
        }
        if (i > 0) {
          allEqual = allEqual && summary[i] === summary[i - 1];
        }
      }
      if (allEqual) {
        return summary[0];
      }
      return summary.join("");
    }
    function generateCWiseOp(proc, typesig) {
      var dimension = typesig[1].length | 0;
      var orders = new Array(proc.arrayArgs.length);
      var dtypes = new Array(proc.arrayArgs.length);
      var arglist = ["SS"];
      var code = ["'use strict'"];
      var vars = [];
      for (var j = 0; j < dimension; ++j) {
        vars.push(["s", j, "=SS[", j, "]"].join(""));
      }
      for (var i = 0; i < proc.arrayArgs.length; ++i) {
        arglist.push("a" + i);
        arglist.push("t" + i);
        arglist.push("p" + i);
        dtypes[i] = typesig[2 * i];
        orders[i] = typesig[2 * i + 1];
      }
      for (var i = 0; i < proc.scalarArgs.length; ++i) {
        arglist.push("Y" + i);
      }
      if (proc.shapeArgs.length > 0) {
        vars.push("shape=SS.slice(0)");
      }
      if (proc.indexArgs.length > 0) {
        var zeros = new Array(dimension);
        for (var i = 0; i < dimension; ++i) {
          zeros[i] = "0";
        }
        vars.push(["index=[", zeros.join(","), "]"].join(""));
      }
      for (var i = 0; i < proc.offsetArgs.length; ++i) {
        var off_arg = proc.offsetArgs[i];
        var init_string = [];
        for (var j = 0; j < off_arg.offset.length; ++j) {
          if (off_arg.offset[j] === 0) {
            continue;
          } else if (off_arg.offset[j] === 1) {
            init_string.push(["t", off_arg.array, "[", j, "]"].join(""));
          } else {
            init_string.push([off_arg.offset[j], "*t", off_arg.array, "[", j, "]"].join(""));
          }
        }
        if (init_string.length === 0) {
          vars.push("q" + i + "=0");
        } else {
          vars.push(["q", i, "=(", init_string.join("+"), ")|0"].join(""));
        }
      }
      var thisVars = uniq([].concat(proc.pre.thisVars).concat(proc.body.thisVars).concat(proc.post.thisVars));
      vars = vars.concat(thisVars);
      code.push("var " + vars.join(","));
      for (var i = 0; i < proc.arrayArgs.length; ++i) {
        code.push("p" + i + "|=0");
      }
      if (proc.pre.body.length > 3) {
        code.push(processBlock(proc.pre, proc, dtypes));
      }
      var body = processBlock(proc.body, proc, dtypes);
      var matched = countMatches(orders);
      if (matched < dimension) {
        code.push(outerFill(matched, orders[0], proc, body));
      } else {
        code.push(innerFill(orders[0], proc, body));
      }
      if (proc.post.body.length > 3) {
        code.push(processBlock(proc.post, proc, dtypes));
      }
      if (proc.debug) {
        console.log("Generated cwise routine for ", typesig, ":\n\n", code.join("\n"));
      }
      var loopName = [(proc.funcName || "unnamed"), "_cwise_loop_", orders[0].join("s"), "m", matched, typeSummary(dtypes)].join("");
      var f = new Function(["function ", loopName, "(", arglist.join(","), "){", code.join("\n"), "} return ", loopName].join(""));
      return f();
    }
    module.exports = generateCWiseOp;
  })(require("github:jspm/nodelibs-process@0.1.1"));
  global.define = __define;
  return module.exports;
});

System.register("npm:uniq@1.0.1/uniq", [], true, function(require, exports, module) {
  var global = System.global,
      __define = global.define;
  global.define = undefined;
  "use strict";
  function unique_pred(list, compare) {
    var ptr = 1,
        len = list.length,
        a = list[0],
        b = list[0];
    for (var i = 1; i < len; ++i) {
      b = a;
      a = list[i];
      if (compare(a, b)) {
        if (i === ptr) {
          ptr++;
          continue;
        }
        list[ptr++] = a;
      }
    }
    list.length = ptr;
    return list;
  }
  function unique_eq(list) {
    var ptr = 1,
        len = list.length,
        a = list[0],
        b = list[0];
    for (var i = 1; i < len; ++i, b = a) {
      b = a;
      a = list[i];
      if (a !== b) {
        if (i === ptr) {
          ptr++;
          continue;
        }
        list[ptr++] = a;
      }
    }
    list.length = ptr;
    return list;
  }
  function unique(list, compare, sorted) {
    if (list.length === 0) {
      return list;
    }
    if (compare) {
      if (!sorted) {
        list.sort(compare);
      }
      return unique_pred(list, compare);
    }
    if (!sorted) {
      list.sort();
    }
    return unique_eq(list);
  }
  module.exports = unique;
  global.define = __define;
  return module.exports;
});

System.register("github:jspm/nodelibs-fs@0.1.2/index", [], true, function(require, exports, module) {
  var global = System.global,
      __define = global.define;
  global.define = undefined;
  if (System._nodeRequire) {
    module.exports = System._nodeRequire('fs');
  } else {
    exports.readFileSync = function(address) {
      var output;
      var xhr = new XMLHttpRequest();
      xhr.open('GET', address, false);
      xhr.onreadystatechange = function(e) {
        if (xhr.readyState == 4) {
          var status = xhr.status;
          if ((status > 399 && status < 600) || status == 400) {
            throw 'File read error on ' + address;
          } else
            output = xhr.responseText;
        }
      };
      xhr.send(null);
      return output;
    };
  }
  global.define = __define;
  return module.exports;
});

System.register("npm:isarray@0.0.1/index", [], true, function(require, exports, module) {
  var global = System.global,
      __define = global.define;
  global.define = undefined;
  module.exports = Array.isArray || function(arr) {
    return Object.prototype.toString.call(arr) == '[object Array]';
  };
  global.define = __define;
  return module.exports;
});

System.register("npm:core-util-is@1.0.1/lib/util", ["github:jspm/nodelibs-buffer@0.1.0"], true, function(require, exports, module) {
  var global = System.global,
      __define = global.define;
  global.define = undefined;
  (function(Buffer) {
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
      return isObject(e) && (objectToString(e) === '[object Error]' || e instanceof Error);
    }
    exports.isError = isError;
    function isFunction(arg) {
      return typeof arg === 'function';
    }
    exports.isFunction = isFunction;
    function isPrimitive(arg) {
      return arg === null || typeof arg === 'boolean' || typeof arg === 'number' || typeof arg === 'string' || typeof arg === 'symbol' || typeof arg === 'undefined';
    }
    exports.isPrimitive = isPrimitive;
    function isBuffer(arg) {
      return Buffer.isBuffer(arg);
    }
    exports.isBuffer = isBuffer;
    function objectToString(o) {
      return Object.prototype.toString.call(o);
    }
  })(require("github:jspm/nodelibs-buffer@0.1.0").Buffer);
  global.define = __define;
  return module.exports;
});

System.register("npm:readable-stream@1.1.13/lib/_stream_writable", ["github:jspm/nodelibs-buffer@0.1.0", "npm:core-util-is@1.0.1", "npm:inherits@2.0.1", "npm:stream-browserify@1.0.0/index", "npm:readable-stream@1.1.13/lib/_stream_duplex", "npm:readable-stream@1.1.13/lib/_stream_duplex", "github:jspm/nodelibs-buffer@0.1.0", "github:jspm/nodelibs-process@0.1.1"], true, function(require, exports, module) {
  var global = System.global,
      __define = global.define;
  global.define = undefined;
  (function(Buffer, process) {
    module.exports = Writable;
    var Buffer = require("github:jspm/nodelibs-buffer@0.1.0").Buffer;
    Writable.WritableState = WritableState;
    var util = require("npm:core-util-is@1.0.1");
    util.inherits = require("npm:inherits@2.0.1");
    var Stream = require("npm:stream-browserify@1.0.0/index");
    util.inherits(Writable, Stream);
    function WriteReq(chunk, encoding, cb) {
      this.chunk = chunk;
      this.encoding = encoding;
      this.callback = cb;
    }
    function WritableState(options, stream) {
      var Duplex = require("npm:readable-stream@1.1.13/lib/_stream_duplex");
      options = options || {};
      var hwm = options.highWaterMark;
      var defaultHwm = options.objectMode ? 16 : 16 * 1024;
      this.highWaterMark = (hwm || hwm === 0) ? hwm : defaultHwm;
      this.objectMode = !!options.objectMode;
      if (stream instanceof Duplex)
        this.objectMode = this.objectMode || !!options.writableObjectMode;
      this.highWaterMark = ~~this.highWaterMark;
      this.needDrain = false;
      this.ending = false;
      this.ended = false;
      this.finished = false;
      var noDecode = options.decodeStrings === false;
      this.decodeStrings = !noDecode;
      this.defaultEncoding = options.defaultEncoding || 'utf8';
      this.length = 0;
      this.writing = false;
      this.corked = 0;
      this.sync = true;
      this.bufferProcessing = false;
      this.onwrite = function(er) {
        onwrite(stream, er);
      };
      this.writecb = null;
      this.writelen = 0;
      this.buffer = [];
      this.pendingcb = 0;
      this.prefinished = false;
      this.errorEmitted = false;
    }
    function Writable(options) {
      var Duplex = require("npm:readable-stream@1.1.13/lib/_stream_duplex");
      if (!(this instanceof Writable) && !(this instanceof Duplex))
        return new Writable(options);
      this._writableState = new WritableState(options, this);
      this.writable = true;
      Stream.call(this);
    }
    Writable.prototype.pipe = function() {
      this.emit('error', new Error('Cannot pipe. Not readable.'));
    };
    function writeAfterEnd(stream, state, cb) {
      var er = new Error('write after end');
      stream.emit('error', er);
      process.nextTick(function() {
        cb(er);
      });
    }
    function validChunk(stream, state, chunk, cb) {
      var valid = true;
      if (!util.isBuffer(chunk) && !util.isString(chunk) && !util.isNullOrUndefined(chunk) && !state.objectMode) {
        var er = new TypeError('Invalid non-string/buffer chunk');
        stream.emit('error', er);
        process.nextTick(function() {
          cb(er);
        });
        valid = false;
      }
      return valid;
    }
    Writable.prototype.write = function(chunk, encoding, cb) {
      var state = this._writableState;
      var ret = false;
      if (util.isFunction(encoding)) {
        cb = encoding;
        encoding = null;
      }
      if (util.isBuffer(chunk))
        encoding = 'buffer';
      else if (!encoding)
        encoding = state.defaultEncoding;
      if (!util.isFunction(cb))
        cb = function() {};
      if (state.ended)
        writeAfterEnd(this, state, cb);
      else if (validChunk(this, state, chunk, cb)) {
        state.pendingcb++;
        ret = writeOrBuffer(this, state, chunk, encoding, cb);
      }
      return ret;
    };
    Writable.prototype.cork = function() {
      var state = this._writableState;
      state.corked++;
    };
    Writable.prototype.uncork = function() {
      var state = this._writableState;
      if (state.corked) {
        state.corked--;
        if (!state.writing && !state.corked && !state.finished && !state.bufferProcessing && state.buffer.length)
          clearBuffer(this, state);
      }
    };
    function decodeChunk(state, chunk, encoding) {
      if (!state.objectMode && state.decodeStrings !== false && util.isString(chunk)) {
        chunk = new Buffer(chunk, encoding);
      }
      return chunk;
    }
    function writeOrBuffer(stream, state, chunk, encoding, cb) {
      chunk = decodeChunk(state, chunk, encoding);
      if (util.isBuffer(chunk))
        encoding = 'buffer';
      var len = state.objectMode ? 1 : chunk.length;
      state.length += len;
      var ret = state.length < state.highWaterMark;
      if (!ret)
        state.needDrain = true;
      if (state.writing || state.corked)
        state.buffer.push(new WriteReq(chunk, encoding, cb));
      else
        doWrite(stream, state, false, len, chunk, encoding, cb);
      return ret;
    }
    function doWrite(stream, state, writev, len, chunk, encoding, cb) {
      state.writelen = len;
      state.writecb = cb;
      state.writing = true;
      state.sync = true;
      if (writev)
        stream._writev(chunk, state.onwrite);
      else
        stream._write(chunk, encoding, state.onwrite);
      state.sync = false;
    }
    function onwriteError(stream, state, sync, er, cb) {
      if (sync)
        process.nextTick(function() {
          state.pendingcb--;
          cb(er);
        });
      else {
        state.pendingcb--;
        cb(er);
      }
      stream._writableState.errorEmitted = true;
      stream.emit('error', er);
    }
    function onwriteStateUpdate(state) {
      state.writing = false;
      state.writecb = null;
      state.length -= state.writelen;
      state.writelen = 0;
    }
    function onwrite(stream, er) {
      var state = stream._writableState;
      var sync = state.sync;
      var cb = state.writecb;
      onwriteStateUpdate(state);
      if (er)
        onwriteError(stream, state, sync, er, cb);
      else {
        var finished = needFinish(stream, state);
        if (!finished && !state.corked && !state.bufferProcessing && state.buffer.length) {
          clearBuffer(stream, state);
        }
        if (sync) {
          process.nextTick(function() {
            afterWrite(stream, state, finished, cb);
          });
        } else {
          afterWrite(stream, state, finished, cb);
        }
      }
    }
    function afterWrite(stream, state, finished, cb) {
      if (!finished)
        onwriteDrain(stream, state);
      state.pendingcb--;
      cb();
      finishMaybe(stream, state);
    }
    function onwriteDrain(stream, state) {
      if (state.length === 0 && state.needDrain) {
        state.needDrain = false;
        stream.emit('drain');
      }
    }
    function clearBuffer(stream, state) {
      state.bufferProcessing = true;
      if (stream._writev && state.buffer.length > 1) {
        var cbs = [];
        for (var c = 0; c < state.buffer.length; c++)
          cbs.push(state.buffer[c].callback);
        state.pendingcb++;
        doWrite(stream, state, true, state.length, state.buffer, '', function(err) {
          for (var i = 0; i < cbs.length; i++) {
            state.pendingcb--;
            cbs[i](err);
          }
        });
        state.buffer = [];
      } else {
        for (var c = 0; c < state.buffer.length; c++) {
          var entry = state.buffer[c];
          var chunk = entry.chunk;
          var encoding = entry.encoding;
          var cb = entry.callback;
          var len = state.objectMode ? 1 : chunk.length;
          doWrite(stream, state, false, len, chunk, encoding, cb);
          if (state.writing) {
            c++;
            break;
          }
        }
        if (c < state.buffer.length)
          state.buffer = state.buffer.slice(c);
        else
          state.buffer.length = 0;
      }
      state.bufferProcessing = false;
    }
    Writable.prototype._write = function(chunk, encoding, cb) {
      cb(new Error('not implemented'));
    };
    Writable.prototype._writev = null;
    Writable.prototype.end = function(chunk, encoding, cb) {
      var state = this._writableState;
      if (util.isFunction(chunk)) {
        cb = chunk;
        chunk = null;
        encoding = null;
      } else if (util.isFunction(encoding)) {
        cb = encoding;
        encoding = null;
      }
      if (!util.isNullOrUndefined(chunk))
        this.write(chunk, encoding);
      if (state.corked) {
        state.corked = 1;
        this.uncork();
      }
      if (!state.ending && !state.finished)
        endWritable(this, state, cb);
    };
    function needFinish(stream, state) {
      return (state.ending && state.length === 0 && !state.finished && !state.writing);
    }
    function prefinish(stream, state) {
      if (!state.prefinished) {
        state.prefinished = true;
        stream.emit('prefinish');
      }
    }
    function finishMaybe(stream, state) {
      var need = needFinish(stream, state);
      if (need) {
        if (state.pendingcb === 0) {
          prefinish(stream, state);
          state.finished = true;
          stream.emit('finish');
        } else
          prefinish(stream, state);
      }
      return need;
    }
    function endWritable(stream, state, cb) {
      state.ending = true;
      finishMaybe(stream, state);
      if (cb) {
        if (state.finished)
          process.nextTick(cb);
        else
          stream.once('finish', cb);
      }
      state.ended = true;
    }
  })(require("github:jspm/nodelibs-buffer@0.1.0").Buffer, require("github:jspm/nodelibs-process@0.1.1"));
  global.define = __define;
  return module.exports;
});

System.register("npm:string_decoder@0.10.31/index", ["github:jspm/nodelibs-buffer@0.1.0", "github:jspm/nodelibs-buffer@0.1.0"], true, function(require, exports, module) {
  var global = System.global,
      __define = global.define;
  global.define = undefined;
  (function(Buffer) {
    var Buffer = require("github:jspm/nodelibs-buffer@0.1.0").Buffer;
    var isBufferEncoding = Buffer.isEncoding || function(encoding) {
      switch (encoding && encoding.toLowerCase()) {
        case 'hex':
        case 'utf8':
        case 'utf-8':
        case 'ascii':
        case 'binary':
        case 'base64':
        case 'ucs2':
        case 'ucs-2':
        case 'utf16le':
        case 'utf-16le':
        case 'raw':
          return true;
        default:
          return false;
      }
    };
    function assertEncoding(encoding) {
      if (encoding && !isBufferEncoding(encoding)) {
        throw new Error('Unknown encoding: ' + encoding);
      }
    }
    var StringDecoder = exports.StringDecoder = function(encoding) {
      this.encoding = (encoding || 'utf8').toLowerCase().replace(/[-_]/, '');
      assertEncoding(encoding);
      switch (this.encoding) {
        case 'utf8':
          this.surrogateSize = 3;
          break;
        case 'ucs2':
        case 'utf16le':
          this.surrogateSize = 2;
          this.detectIncompleteChar = utf16DetectIncompleteChar;
          break;
        case 'base64':
          this.surrogateSize = 3;
          this.detectIncompleteChar = base64DetectIncompleteChar;
          break;
        default:
          this.write = passThroughWrite;
          return ;
      }
      this.charBuffer = new Buffer(6);
      this.charReceived = 0;
      this.charLength = 0;
    };
    StringDecoder.prototype.write = function(buffer) {
      var charStr = '';
      while (this.charLength) {
        var available = (buffer.length >= this.charLength - this.charReceived) ? this.charLength - this.charReceived : buffer.length;
        buffer.copy(this.charBuffer, this.charReceived, 0, available);
        this.charReceived += available;
        if (this.charReceived < this.charLength) {
          return '';
        }
        buffer = buffer.slice(available, buffer.length);
        charStr = this.charBuffer.slice(0, this.charLength).toString(this.encoding);
        var charCode = charStr.charCodeAt(charStr.length - 1);
        if (charCode >= 0xD800 && charCode <= 0xDBFF) {
          this.charLength += this.surrogateSize;
          charStr = '';
          continue;
        }
        this.charReceived = this.charLength = 0;
        if (buffer.length === 0) {
          return charStr;
        }
        break;
      }
      this.detectIncompleteChar(buffer);
      var end = buffer.length;
      if (this.charLength) {
        buffer.copy(this.charBuffer, 0, buffer.length - this.charReceived, end);
        end -= this.charReceived;
      }
      charStr += buffer.toString(this.encoding, 0, end);
      var end = charStr.length - 1;
      var charCode = charStr.charCodeAt(end);
      if (charCode >= 0xD800 && charCode <= 0xDBFF) {
        var size = this.surrogateSize;
        this.charLength += size;
        this.charReceived += size;
        this.charBuffer.copy(this.charBuffer, size, 0, size);
        buffer.copy(this.charBuffer, 0, 0, size);
        return charStr.substring(0, end);
      }
      return charStr;
    };
    StringDecoder.prototype.detectIncompleteChar = function(buffer) {
      var i = (buffer.length >= 3) ? 3 : buffer.length;
      for (; i > 0; i--) {
        var c = buffer[buffer.length - i];
        if (i == 1 && c >> 5 == 0x06) {
          this.charLength = 2;
          break;
        }
        if (i <= 2 && c >> 4 == 0x0E) {
          this.charLength = 3;
          break;
        }
        if (i <= 3 && c >> 3 == 0x1E) {
          this.charLength = 4;
          break;
        }
      }
      this.charReceived = i;
    };
    StringDecoder.prototype.end = function(buffer) {
      var res = '';
      if (buffer && buffer.length)
        res = this.write(buffer);
      if (this.charReceived) {
        var cr = this.charReceived;
        var buf = this.charBuffer;
        var enc = this.encoding;
        res += buf.slice(0, cr).toString(enc);
      }
      return res;
    };
    function passThroughWrite(buffer) {
      return buffer.toString(this.encoding);
    }
    function utf16DetectIncompleteChar(buffer) {
      this.charReceived = buffer.length % 2;
      this.charLength = this.charReceived ? 2 : 0;
    }
    function base64DetectIncompleteChar(buffer) {
      this.charReceived = buffer.length % 3;
      this.charLength = this.charReceived ? 3 : 0;
    }
  })(require("github:jspm/nodelibs-buffer@0.1.0").Buffer);
  global.define = __define;
  return module.exports;
});

System.register("npm:readable-stream@1.1.13/lib/_stream_transform", ["npm:readable-stream@1.1.13/lib/_stream_duplex", "npm:core-util-is@1.0.1", "npm:inherits@2.0.1", "github:jspm/nodelibs-process@0.1.1"], true, function(require, exports, module) {
  var global = System.global,
      __define = global.define;
  global.define = undefined;
  (function(process) {
    module.exports = Transform;
    var Duplex = require("npm:readable-stream@1.1.13/lib/_stream_duplex");
    var util = require("npm:core-util-is@1.0.1");
    util.inherits = require("npm:inherits@2.0.1");
    util.inherits(Transform, Duplex);
    function TransformState(options, stream) {
      this.afterTransform = function(er, data) {
        return afterTransform(stream, er, data);
      };
      this.needTransform = false;
      this.transforming = false;
      this.writecb = null;
      this.writechunk = null;
    }
    function afterTransform(stream, er, data) {
      var ts = stream._transformState;
      ts.transforming = false;
      var cb = ts.writecb;
      if (!cb)
        return stream.emit('error', new Error('no writecb in Transform class'));
      ts.writechunk = null;
      ts.writecb = null;
      if (!util.isNullOrUndefined(data))
        stream.push(data);
      if (cb)
        cb(er);
      var rs = stream._readableState;
      rs.reading = false;
      if (rs.needReadable || rs.length < rs.highWaterMark) {
        stream._read(rs.highWaterMark);
      }
    }
    function Transform(options) {
      if (!(this instanceof Transform))
        return new Transform(options);
      Duplex.call(this, options);
      this._transformState = new TransformState(options, this);
      var stream = this;
      this._readableState.needReadable = true;
      this._readableState.sync = false;
      this.once('prefinish', function() {
        if (util.isFunction(this._flush))
          this._flush(function(er) {
            done(stream, er);
          });
        else
          done(stream);
      });
    }
    Transform.prototype.push = function(chunk, encoding) {
      this._transformState.needTransform = false;
      return Duplex.prototype.push.call(this, chunk, encoding);
    };
    Transform.prototype._transform = function(chunk, encoding, cb) {
      throw new Error('not implemented');
    };
    Transform.prototype._write = function(chunk, encoding, cb) {
      var ts = this._transformState;
      ts.writecb = cb;
      ts.writechunk = chunk;
      ts.writeencoding = encoding;
      if (!ts.transforming) {
        var rs = this._readableState;
        if (ts.needTransform || rs.needReadable || rs.length < rs.highWaterMark)
          this._read(rs.highWaterMark);
      }
    };
    Transform.prototype._read = function(n) {
      var ts = this._transformState;
      if (!util.isNull(ts.writechunk) && ts.writecb && !ts.transforming) {
        ts.transforming = true;
        this._transform(ts.writechunk, ts.writeencoding, ts.afterTransform);
      } else {
        ts.needTransform = true;
      }
    };
    function done(stream, er) {
      if (er)
        return stream.emit('error', er);
      var ws = stream._writableState;
      var ts = stream._transformState;
      if (ws.length)
        throw new Error('calling transform done when ws.length != 0');
      if (ts.transforming)
        throw new Error('calling transform done when still transforming');
      return stream.push(null);
    }
  })(require("github:jspm/nodelibs-process@0.1.1"));
  global.define = __define;
  return module.exports;
});

System.register("npm:readable-stream@1.1.13/lib/_stream_passthrough", ["npm:readable-stream@1.1.13/lib/_stream_transform", "npm:core-util-is@1.0.1", "npm:inherits@2.0.1"], true, function(require, exports, module) {
  var global = System.global,
      __define = global.define;
  global.define = undefined;
  module.exports = PassThrough;
  var Transform = require("npm:readable-stream@1.1.13/lib/_stream_transform");
  var util = require("npm:core-util-is@1.0.1");
  util.inherits = require("npm:inherits@2.0.1");
  util.inherits(PassThrough, Transform);
  function PassThrough(options) {
    if (!(this instanceof PassThrough))
      return new PassThrough(options);
    Transform.call(this, options);
  }
  PassThrough.prototype._transform = function(chunk, encoding, cb) {
    cb(null, chunk);
  };
  global.define = __define;
  return module.exports;
});

System.register("npm:readable-stream@1.1.13/writable", ["npm:readable-stream@1.1.13/lib/_stream_writable"], true, function(require, exports, module) {
  var global = System.global,
      __define = global.define;
  global.define = undefined;
  module.exports = require("npm:readable-stream@1.1.13/lib/_stream_writable");
  global.define = __define;
  return module.exports;
});

System.register("npm:readable-stream@1.1.13/duplex", ["npm:readable-stream@1.1.13/lib/_stream_duplex"], true, function(require, exports, module) {
  var global = System.global,
      __define = global.define;
  global.define = undefined;
  module.exports = require("npm:readable-stream@1.1.13/lib/_stream_duplex");
  global.define = __define;
  return module.exports;
});

System.register("npm:readable-stream@1.1.13/transform", ["npm:readable-stream@1.1.13/lib/_stream_transform"], true, function(require, exports, module) {
  var global = System.global,
      __define = global.define;
  global.define = undefined;
  module.exports = require("npm:readable-stream@1.1.13/lib/_stream_transform");
  global.define = __define;
  return module.exports;
});

System.register("npm:readable-stream@1.1.13/passthrough", ["npm:readable-stream@1.1.13/lib/_stream_passthrough"], true, function(require, exports, module) {
  var global = System.global,
      __define = global.define;
  global.define = undefined;
  module.exports = require("npm:readable-stream@1.1.13/lib/_stream_passthrough");
  global.define = __define;
  return module.exports;
});

System.register("npm:glsl-tokenizer@0.0.9/lib/literals", [], true, function(require, exports, module) {
  var global = System.global,
      __define = global.define;
  global.define = undefined;
  module.exports = ['precision', 'highp', 'mediump', 'lowp', 'attribute', 'const', 'uniform', 'varying', 'break', 'continue', 'do', 'for', 'while', 'if', 'else', 'in', 'out', 'inout', 'float', 'int', 'void', 'bool', 'true', 'false', 'discard', 'return', 'mat2', 'mat3', 'mat4', 'vec2', 'vec3', 'vec4', 'ivec2', 'ivec3', 'ivec4', 'bvec2', 'bvec3', 'bvec4', 'sampler1D', 'sampler2D', 'sampler3D', 'samplerCube', 'sampler1DShadow', 'sampler2DShadow', 'struct', 'asm', 'class', 'union', 'enum', 'typedef', 'template', 'this', 'packed', 'goto', 'switch', 'default', 'inline', 'noinline', 'volatile', 'public', 'static', 'extern', 'external', 'interface', 'long', 'short', 'double', 'half', 'fixed', 'unsigned', 'input', 'output', 'hvec2', 'hvec3', 'hvec4', 'dvec2', 'dvec3', 'dvec4', 'fvec2', 'fvec3', 'fvec4', 'sampler2DRect', 'sampler3DRect', 'sampler2DRectShadow', 'sizeof', 'cast', 'namespace', 'using'];
  global.define = __define;
  return module.exports;
});

System.register("npm:glsl-tokenizer@0.0.9/lib/operators", [], true, function(require, exports, module) {
  var global = System.global,
      __define = global.define;
  global.define = undefined;
  module.exports = ['<<=', '>>=', '++', '--', '<<', '>>', '<=', '>=', '==', '!=', '&&', '||', '+=', '-=', '*=', '/=', '%=', '&=', '^=', '|=', '(', ')', '[', ']', '.', '!', '~', '*', '/', '%', '+', '-', '<', '>', '&', '^', '|', '?', ':', '=', ',', ';', '{', '}'];
  global.define = __define;
  return module.exports;
});

System.register("npm:glsl-tokenizer@0.0.9/lib/builtins", [], true, function(require, exports, module) {
  var global = System.global,
      __define = global.define;
  global.define = undefined;
  module.exports = ['gl_Position', 'gl_PointSize', 'gl_ClipVertex', 'gl_FragCoord', 'gl_FrontFacing', 'gl_FragColor', 'gl_FragData', 'gl_FragDepth', 'gl_Color', 'gl_SecondaryColor', 'gl_Normal', 'gl_Vertex', 'gl_MultiTexCoord0', 'gl_MultiTexCoord1', 'gl_MultiTexCoord2', 'gl_MultiTexCoord3', 'gl_MultiTexCoord4', 'gl_MultiTexCoord5', 'gl_MultiTexCoord6', 'gl_MultiTexCoord7', 'gl_FogCoord', 'gl_MaxLights', 'gl_MaxClipPlanes', 'gl_MaxTextureUnits', 'gl_MaxTextureCoords', 'gl_MaxVertexAttribs', 'gl_MaxVertexUniformComponents', 'gl_MaxVaryingFloats', 'gl_MaxVertexTextureImageUnits', 'gl_MaxCombinedTextureImageUnits', 'gl_MaxTextureImageUnits', 'gl_MaxFragmentUniformComponents', 'gl_MaxDrawBuffers', 'gl_ModelViewMatrix', 'gl_ProjectionMatrix', 'gl_ModelViewProjectionMatrix', 'gl_TextureMatrix', 'gl_NormalMatrix', 'gl_ModelViewMatrixInverse', 'gl_ProjectionMatrixInverse', 'gl_ModelViewProjectionMatrixInverse', 'gl_TextureMatrixInverse', 'gl_ModelViewMatrixTranspose', 'gl_ProjectionMatrixTranspose', 'gl_ModelViewProjectionMatrixTranspose', 'gl_TextureMatrixTranspose', 'gl_ModelViewMatrixInverseTranspose', 'gl_ProjectionMatrixInverseTranspose', 'gl_ModelViewProjectionMatrixInverseTranspose', 'gl_TextureMatrixInverseTranspose', 'gl_NormalScale', 'gl_DepthRangeParameters', 'gl_DepthRange', 'gl_ClipPlane', 'gl_PointParameters', 'gl_Point', 'gl_MaterialParameters', 'gl_FrontMaterial', 'gl_BackMaterial', 'gl_LightSourceParameters', 'gl_LightSource', 'gl_LightModelParameters', 'gl_LightModel', 'gl_LightModelProducts', 'gl_FrontLightModelProduct', 'gl_BackLightModelProduct', 'gl_LightProducts', 'gl_FrontLightProduct', 'gl_BackLightProduct', 'gl_FogParameters', 'gl_Fog', 'gl_TextureEnvColor', 'gl_EyePlaneS', 'gl_EyePlaneT', 'gl_EyePlaneR', 'gl_EyePlaneQ', 'gl_ObjectPlaneS', 'gl_ObjectPlaneT', 'gl_ObjectPlaneR', 'gl_ObjectPlaneQ', 'gl_FrontColor', 'gl_BackColor', 'gl_FrontSecondaryColor', 'gl_BackSecondaryColor', 'gl_TexCoord', 'gl_FogFragCoord', 'gl_Color', 'gl_SecondaryColor', 'gl_TexCoord', 'gl_FogFragCoord', 'gl_PointCoord', 'radians', 'degrees', 'sin', 'cos', 'tan', 'asin', 'acos', 'atan', 'pow', 'exp', 'log', 'exp2', 'log2', 'sqrt', 'inversesqrt', 'abs', 'sign', 'floor', 'ceil', 'fract', 'mod', 'min', 'max', 'clamp', 'mix', 'step', 'smoothstep', 'length', 'distance', 'dot', 'cross', 'normalize', 'faceforward', 'reflect', 'refract', 'matrixCompMult', 'lessThan', 'lessThanEqual', 'greaterThan', 'greaterThanEqual', 'equal', 'notEqual', 'any', 'all', 'not', 'texture2D', 'texture2DProj', 'texture2DLod', 'texture2DProjLod', 'textureCube', 'textureCubeLod'];
  global.define = __define;
  return module.exports;
});

System.register("npm:through@1.1.2/index", ["github:jspm/nodelibs-stream@0.1.0", "github:jspm/nodelibs-process@0.1.1"], true, function(require, exports, module) {
  var global = System.global,
      __define = global.define;
  global.define = undefined;
  (function(process) {
    var Stream = require("github:jspm/nodelibs-stream@0.1.0");
    exports = module.exports = through;
    through.through = through;
    function through(write, end) {
      write = write || function(data) {
        this.emit('data', data);
      };
      end = end || function() {
        this.emit('end');
      };
      var ended = false,
          destroyed = false;
      var stream = new Stream(),
          buffer = [];
      stream.buffer = buffer;
      stream.readable = stream.writable = true;
      stream.paused = false;
      stream.write = function(data) {
        write.call(this, data);
        return !stream.paused;
      };
      function drain() {
        while (buffer.length && !stream.paused) {
          var data = buffer.shift();
          if (null === data)
            return stream.emit('end');
          else
            stream.emit('data', data);
        }
      }
      stream.queue = function(data) {
        buffer.push(data);
        drain();
      };
      stream.on('end', function() {
        stream.readable = false;
        if (!stream.writable)
          process.nextTick(function() {
            stream.destroy();
          });
      });
      function _end() {
        stream.writable = false;
        end.call(stream);
        if (!stream.readable)
          stream.destroy();
      }
      stream.end = function(data) {
        if (ended)
          return ;
        ended = true;
        if (arguments.length)
          stream.write(data);
        _end();
      };
      stream.destroy = function() {
        if (destroyed)
          return ;
        destroyed = true;
        ended = true;
        buffer.length = 0;
        stream.writable = stream.readable = false;
        stream.emit('close');
      };
      stream.pause = function() {
        if (stream.paused)
          return ;
        stream.paused = true;
        stream.emit('pause');
      };
      stream.resume = function() {
        if (stream.paused) {
          stream.paused = false;
        }
        drain();
        if (!stream.paused)
          stream.emit('drain');
      };
      return stream;
    }
  })(require("github:jspm/nodelibs-process@0.1.1"));
  global.define = __define;
  return module.exports;
});

System.register("npm:glsl-parser@0.0.9/lib/expr", [], true, function(require, exports, module) {
  var global = System.global,
      __define = global.define;
  global.define = undefined;
  var state,
      token,
      tokens,
      idx;
  var original_symbol = {
    nud: function() {
      return this.children && this.children.length ? this : fail('unexpected')();
    },
    led: fail('missing operator')
  };
  var symbol_table = {};
  function itself() {
    return this;
  }
  symbol('(ident)').nud = itself;
  symbol('(keyword)').nud = itself;
  symbol('(builtin)').nud = itself;
  symbol('(literal)').nud = itself;
  symbol('(end)');
  symbol(':');
  symbol(';');
  symbol(',');
  symbol(')');
  symbol(']');
  symbol('}');
  infixr('&&', 30);
  infixr('||', 30);
  infix('|', 43);
  infix('^', 44);
  infix('&', 45);
  infix('==', 46);
  infix('!=', 46);
  infix('<', 47);
  infix('<=', 47);
  infix('>', 47);
  infix('>=', 47);
  infix('>>', 48);
  infix('<<', 48);
  infix('+', 50);
  infix('-', 50);
  infix('*', 60);
  infix('/', 60);
  infix('%', 60);
  infix('?', 20, function(left) {
    this.children = [left, expression(0), (advance(':'), expression(0))];
    this.type = 'ternary';
    return this;
  });
  infix('.', 80, function(left) {
    token.type = 'literal';
    state.fake(token);
    this.children = [left, token];
    advance();
    return this;
  });
  infix('[', 80, function(left) {
    this.children = [left, expression(0)];
    this.type = 'binary';
    advance(']');
    return this;
  });
  infix('(', 80, function(left) {
    this.children = [left];
    this.type = 'call';
    if (token.data !== ')')
      while (1) {
        this.children.push(expression(0));
        if (token.data !== ',')
          break;
        advance(',');
      }
    advance(')');
    return this;
  });
  prefix('-');
  prefix('+');
  prefix('!');
  prefix('~');
  prefix('defined');
  prefix('(', function() {
    this.type = 'group';
    this.children = [expression(0)];
    advance(')');
    return this;
  });
  prefix('++');
  prefix('--');
  suffix('++');
  suffix('--');
  assignment('=');
  assignment('+=');
  assignment('-=');
  assignment('*=');
  assignment('/=');
  assignment('%=');
  assignment('&=');
  assignment('|=');
  assignment('^=');
  assignment('>>=');
  assignment('<<=');
  module.exports = function(incoming_state, incoming_tokens) {
    state = incoming_state;
    tokens = incoming_tokens;
    idx = 0;
    var result;
    if (!tokens.length)
      return ;
    advance();
    result = expression(0);
    result.parent = state[0];
    emit(result);
    if (idx < tokens.length) {
      throw new Error('did not use all tokens');
    }
    result.parent.children = [result];
    function emit(node) {
      state.unshift(node, false);
      for (var i = 0,
          len = node.children.length; i < len; ++i) {
        emit(node.children[i]);
      }
      state.shift();
    }
  };
  function symbol(id, binding_power) {
    var sym = symbol_table[id];
    binding_power = binding_power || 0;
    if (sym) {
      if (binding_power > sym.lbp) {
        sym.lbp = binding_power;
      }
    } else {
      sym = Object.create(original_symbol);
      sym.id = id;
      sym.lbp = binding_power;
      symbol_table[id] = sym;
    }
    return sym;
  }
  function expression(rbp) {
    var left,
        t = token;
    advance();
    left = t.nud();
    while (rbp < token.lbp) {
      t = token;
      advance();
      left = t.led(left);
    }
    return left;
  }
  function infix(id, bp, led) {
    var sym = symbol(id, bp);
    sym.led = led || function(left) {
      this.children = [left, expression(bp)];
      this.type = 'binary';
      return this;
    };
  }
  function infixr(id, bp, led) {
    var sym = symbol(id, bp);
    sym.led = led || function(left) {
      this.children = [left, expression(bp - 1)];
      this.type = 'binary';
      return this;
    };
    return sym;
  }
  function prefix(id, nud) {
    var sym = symbol(id);
    sym.nud = nud || function() {
      this.children = [expression(70)];
      this.type = 'unary';
      return this;
    };
    return sym;
  }
  function suffix(id) {
    var sym = symbol(id, 150);
    sym.led = function(left) {
      this.children = [left];
      this.type = 'suffix';
      return this;
    };
  }
  function assignment(id) {
    return infixr(id, 10, function(left) {
      this.children = [left, expression(9)];
      this.assignment = true;
      this.type = 'assign';
      return this;
    });
  }
  function advance(id) {
    var next,
        value,
        type,
        output;
    if (id && token.data !== id) {
      return state.unexpected('expected `' + id + '`, got `' + token.data + '`');
    }
    if (idx >= tokens.length) {
      token = symbol_table['(end)'];
      return ;
    }
    next = tokens[idx++];
    value = next.data;
    type = next.type;
    if (type === 'ident') {
      output = state.scope.find(value) || state.create_node();
      type = output.type;
    } else if (type === 'builtin') {
      output = symbol_table['(builtin)'];
    } else if (type === 'keyword') {
      output = symbol_table['(keyword)'];
    } else if (type === 'operator') {
      output = symbol_table[value];
      if (!output) {
        return state.unexpected('unknown operator `' + value + '`');
      }
    } else if (type === 'float' || type === 'integer') {
      type = 'literal';
      output = symbol_table['(literal)'];
    } else {
      return state.unexpected('unexpected token.');
    }
    if (output) {
      if (!output.nud) {
        output.nud = itself;
      }
      if (!output.children) {
        output.children = [];
      }
    }
    output = Object.create(output);
    output.token = next;
    output.type = type;
    if (!output.data)
      output.data = value;
    return token = output;
  }
  function fail(message) {
    return function() {
      return state.unexpected(message);
    };
  }
  global.define = __define;
  return module.exports;
});

System.register("npm:glsl-parser@0.0.9/lib/scope", [], true, function(require, exports, module) {
  var global = System.global,
      __define = global.define;
  global.define = undefined;
  module.exports = scope;
  function scope(state) {
    if (this.constructor !== scope)
      return new scope(state);
    this.state = state;
    this.scopes = [];
    this.current = null;
  }
  var cons = scope,
      proto = cons.prototype;
  proto.enter = function(s) {
    this.scopes.push(this.current = this.state[0].scope = s || {});
  };
  proto.exit = function() {
    this.scopes.pop();
    this.current = this.scopes[this.scopes.length - 1];
  };
  proto.define = function(str) {
    this.current[str] = this.state[0];
  };
  proto.find = function(name, fail) {
    for (var i = this.scopes.length - 1; i > -1; --i) {
      if (this.scopes[i].hasOwnProperty(name)) {
        return this.scopes[i][name];
      }
    }
    return null;
  };
  global.define = __define;
  return module.exports;
});

System.register("npm:events@1.0.2", ["npm:events@1.0.2/events"], true, function(require, exports, module) {
  var global = System.global,
      __define = global.define;
  global.define = undefined;
  module.exports = require("npm:events@1.0.2/events");
  global.define = __define;
  return module.exports;
});

System.register("npm:inherits@2.0.1", ["npm:inherits@2.0.1/inherits_browser"], true, function(require, exports, module) {
  var global = System.global,
      __define = global.define;
  global.define = undefined;
  module.exports = require("npm:inherits@2.0.1/inherits_browser");
  global.define = __define;
  return module.exports;
});

System.register("npm:process@0.10.1", ["npm:process@0.10.1/browser"], true, function(require, exports, module) {
  var global = System.global,
      __define = global.define;
  global.define = undefined;
  module.exports = require("npm:process@0.10.1/browser");
  global.define = __define;
  return module.exports;
});

System.register("npm:domready@0.2.13", ["npm:domready@0.2.13/ready"], true, function(require, exports, module) {
  var global = System.global,
      __define = global.define;
  global.define = undefined;
  module.exports = require("npm:domready@0.2.13/ready");
  global.define = __define;
  return module.exports;
});

System.register("npm:vkey@0.0.3", ["npm:vkey@0.0.3/index"], true, function(require, exports, module) {
  var global = System.global,
      __define = global.define;
  global.define = undefined;
  module.exports = require("npm:vkey@0.0.3/index");
  global.define = __define;
  return module.exports;
});

System.register("npm:invert-hash@0.0.0", ["npm:invert-hash@0.0.0/invert"], true, function(require, exports, module) {
  var global = System.global,
      __define = global.define;
  global.define = undefined;
  module.exports = require("npm:invert-hash@0.0.0/invert");
  global.define = __define;
  return module.exports;
});

System.register("npm:uniq@0.0.2", ["npm:uniq@0.0.2/uniq"], true, function(require, exports, module) {
  var global = System.global,
      __define = global.define;
  global.define = undefined;
  module.exports = require("npm:uniq@0.0.2/uniq");
  global.define = __define;
  return module.exports;
});

System.register("npm:lower-bound@0.0.3", ["npm:lower-bound@0.0.3/lb"], true, function(require, exports, module) {
  var global = System.global,
      __define = global.define;
  global.define = undefined;
  module.exports = require("npm:lower-bound@0.0.3/lb");
  global.define = __define;
  return module.exports;
});

System.register("npm:iota-array@0.0.1", ["npm:iota-array@0.0.1/iota"], true, function(require, exports, module) {
  var global = System.global,
      __define = global.define;
  global.define = undefined;
  module.exports = require("npm:iota-array@0.0.1/iota");
  global.define = __define;
  return module.exports;
});

System.register("npm:webglew@0.0.0", ["npm:webglew@0.0.0/webglew"], true, function(require, exports, module) {
  var global = System.global,
      __define = global.define;
  global.define = undefined;
  module.exports = require("npm:webglew@0.0.0/webglew");
  global.define = __define;
  return module.exports;
});

System.register("npm:iota-array@1.0.0", ["npm:iota-array@1.0.0/iota"], true, function(require, exports, module) {
  var global = System.global,
      __define = global.define;
  global.define = undefined;
  module.exports = require("npm:iota-array@1.0.0/iota");
  global.define = __define;
  return module.exports;
});

System.register("npm:base64-js@0.0.8", ["npm:base64-js@0.0.8/lib/b64"], true, function(require, exports, module) {
  var global = System.global,
      __define = global.define;
  global.define = undefined;
  module.exports = require("npm:base64-js@0.0.8/lib/b64");
  global.define = __define;
  return module.exports;
});

System.register("npm:ieee754@1.1.5", ["npm:ieee754@1.1.5/index"], true, function(require, exports, module) {
  var global = System.global,
      __define = global.define;
  global.define = undefined;
  module.exports = require("npm:ieee754@1.1.5/index");
  global.define = __define;
  return module.exports;
});

System.register("npm:is-array@1.0.1", ["npm:is-array@1.0.1/index"], true, function(require, exports, module) {
  var global = System.global,
      __define = global.define;
  global.define = undefined;
  module.exports = require("npm:is-array@1.0.1/index");
  global.define = __define;
  return module.exports;
});

System.register("npm:cwise-compiler@0.0.0/lib/thunk", ["npm:cwise-compiler@0.0.0/lib/compile"], true, function(require, exports, module) {
  var global = System.global,
      __define = global.define;
  global.define = undefined;
  "use strict";
  var compile = require("npm:cwise-compiler@0.0.0/lib/compile");
  function createThunk(proc) {
    var code = ["'use strict'", "var CACHED={}"];
    var vars = [];
    var thunkName = proc.funcName + "_cwise_thunk";
    code.push(["return function ", thunkName, "(", proc.shimArgs.join(","), "){"].join(""));
    var typesig = [];
    var string_typesig = [];
    var proc_args = [["array", proc.arrayArgs[0], ".shape"].join("")];
    for (var i = 0; i < proc.arrayArgs.length; ++i) {
      var j = proc.arrayArgs[i];
      vars.push(["t", j, "=array", j, ".dtype,", "r", j, "=array", j, ".order"].join(""));
      typesig.push("t" + j);
      typesig.push("r" + j);
      string_typesig.push("t" + j);
      string_typesig.push("r" + j + ".join()");
      proc_args.push("array" + j + ".data");
      proc_args.push("array" + j + ".stride");
      proc_args.push("array" + j + ".offset|0");
    }
    for (var i = 0; i < proc.scalarArgs.length; ++i) {
      proc_args.push("scalar" + proc.scalarArgs[i]);
    }
    vars.push(["type=[", string_typesig.join(","), "].join()"].join(""));
    vars.push("proc=CACHED[type]");
    code.push("var " + vars.join(","));
    code.push(["if(!proc){", "CACHED[type]=proc=compile([", typesig.join(","), "])}", "return proc(", proc_args.join(","), ")}"].join(""));
    if (proc.debug) {
      console.log("Generated thunk:", code.join("\n"));
    }
    var thunk = new Function("compile", code.join("\n"));
    return thunk(compile.bind(undefined, proc));
  }
  module.exports = createThunk;
  global.define = __define;
  return module.exports;
});

System.register("npm:esprima@1.0.4", ["npm:esprima@1.0.4/esprima"], true, function(require, exports, module) {
  var global = System.global,
      __define = global.define;
  global.define = undefined;
  module.exports = require("npm:esprima@1.0.4/esprima");
  global.define = __define;
  return module.exports;
});

System.register("npm:bit-twiddle@0.0.2", ["npm:bit-twiddle@0.0.2/twiddle"], true, function(require, exports, module) {
  var global = System.global,
      __define = global.define;
  global.define = undefined;
  module.exports = require("npm:bit-twiddle@0.0.2/twiddle");
  global.define = __define;
  return module.exports;
});

System.register("npm:dup@0.0.0", ["npm:dup@0.0.0/dup"], true, function(require, exports, module) {
  var global = System.global,
      __define = global.define;
  global.define = undefined;
  module.exports = require("npm:dup@0.0.0/dup");
  global.define = __define;
  return module.exports;
});

System.register("npm:ndarray-scratch@0.0.1", ["npm:ndarray-scratch@0.0.1/scratch"], true, function(require, exports, module) {
  var global = System.global,
      __define = global.define;
  global.define = undefined;
  module.exports = require("npm:ndarray-scratch@0.0.1/scratch");
  global.define = __define;
  return module.exports;
});

System.register("npm:bit-twiddle@1.0.2", ["npm:bit-twiddle@1.0.2/twiddle"], true, function(require, exports, module) {
  var global = System.global,
      __define = global.define;
  global.define = undefined;
  module.exports = require("npm:bit-twiddle@1.0.2/twiddle");
  global.define = __define;
  return module.exports;
});

System.register("npm:dup@1.0.0", ["npm:dup@1.0.0/dup"], true, function(require, exports, module) {
  var global = System.global,
      __define = global.define;
  global.define = undefined;
  module.exports = require("npm:dup@1.0.0/dup");
  global.define = __define;
  return module.exports;
});

System.register("npm:gl-buffer@0.1.2", ["npm:gl-buffer@0.1.2/buffer"], true, function(require, exports, module) {
  var global = System.global,
      __define = global.define;
  global.define = undefined;
  module.exports = require("npm:gl-buffer@0.1.2/buffer");
  global.define = __define;
  return module.exports;
});

System.register("npm:gl-vao@0.0.3/lib/vao-native", ["npm:gl-vao@0.0.3/lib/do-bind"], true, function(require, exports, module) {
  var global = System.global,
      __define = global.define;
  global.define = undefined;
  "use strict";
  var bindAttribs = require("npm:gl-vao@0.0.3/lib/do-bind");
  function VAONative(gl, ext, handle) {
    this.gl = gl;
    this.ext = ext;
    this.handle = handle;
  }
  VAONative.prototype.bind = function() {
    this.ext.bindVertexArrayOES(this.handle);
  };
  VAONative.prototype.unbind = function() {
    this.ext.bindVertexArrayOES(null);
  };
  VAONative.prototype.dispose = function() {
    this.ext.deleteVertexArrayOES(this.handle);
  };
  VAONative.prototype.update = function(elements, attributes) {
    this.bind();
    bindAttribs(this.gl, elements, attributes);
    this.unbind();
  };
  function createVAONative(gl, ext) {
    return new VAONative(gl, ext, ext.createVertexArrayOES());
  }
  module.exports = createVAONative;
  global.define = __define;
  return module.exports;
});

System.register("npm:gl-matrix@2.0.0", ["npm:gl-matrix@2.0.0/dist/gl-matrix"], true, function(require, exports, module) {
  var global = System.global,
      __define = global.define;
  global.define = undefined;
  module.exports = require("npm:gl-matrix@2.0.0/dist/gl-matrix");
  global.define = __define;
  return module.exports;
});

System.register("npm:ndarray-fill@0.1.0", ["npm:ndarray-fill@0.1.0/index"], true, function(require, exports, module) {
  var global = System.global,
      __define = global.define;
  global.define = undefined;
  module.exports = require("npm:ndarray-fill@0.1.0/index");
  global.define = __define;
  return module.exports;
});

System.register("npm:cwise-compiler@0.1.0/lib/thunk", ["npm:cwise-compiler@0.1.0/lib/compile"], true, function(require, exports, module) {
  var global = System.global,
      __define = global.define;
  global.define = undefined;
  "use strict";
  var compile = require("npm:cwise-compiler@0.1.0/lib/compile");
  function createThunk(proc) {
    var code = ["'use strict'", "var CACHED={}"];
    var vars = [];
    var thunkName = proc.funcName + "_cwise_thunk";
    code.push(["return function ", thunkName, "(", proc.shimArgs.join(","), "){"].join(""));
    var typesig = [];
    var string_typesig = [];
    var proc_args = [["array", proc.arrayArgs[0], ".shape"].join("")];
    for (var i = 0; i < proc.arrayArgs.length; ++i) {
      var j = proc.arrayArgs[i];
      vars.push(["t", j, "=array", j, ".dtype,", "r", j, "=array", j, ".order"].join(""));
      typesig.push("t" + j);
      typesig.push("r" + j);
      string_typesig.push("t" + j);
      string_typesig.push("r" + j + ".join()");
      proc_args.push("array" + j + ".data");
      proc_args.push("array" + j + ".stride");
      proc_args.push("array" + j + ".offset|0");
    }
    for (var i = 0; i < proc.scalarArgs.length; ++i) {
      proc_args.push("scalar" + proc.scalarArgs[i]);
    }
    vars.push(["type=[", string_typesig.join(","), "].join()"].join(""));
    vars.push("proc=CACHED[type]");
    code.push("var " + vars.join(","));
    code.push(["if(!proc){", "CACHED[type]=proc=compile([", typesig.join(","), "])}", "return proc(", proc_args.join(","), ")}"].join(""));
    if (proc.debug) {
      console.log("Generated thunk:", code.join("\n"));
    }
    var thunk = new Function("compile", code.join("\n"));
    return thunk(compile.bind(undefined, proc));
  }
  module.exports = createThunk;
  global.define = __define;
  return module.exports;
});

System.register("npm:uniq@1.0.1", ["npm:uniq@1.0.1/uniq"], true, function(require, exports, module) {
  var global = System.global,
      __define = global.define;
  global.define = undefined;
  module.exports = require("npm:uniq@1.0.1/uniq");
  global.define = __define;
  return module.exports;
});

System.register("github:jspm/nodelibs-fs@0.1.2", ["github:jspm/nodelibs-fs@0.1.2/index"], true, function(require, exports, module) {
  var global = System.global,
      __define = global.define;
  global.define = undefined;
  module.exports = require("github:jspm/nodelibs-fs@0.1.2/index");
  global.define = __define;
  return module.exports;
});

System.register("npm:isarray@0.0.1", ["npm:isarray@0.0.1/index"], true, function(require, exports, module) {
  var global = System.global,
      __define = global.define;
  global.define = undefined;
  module.exports = require("npm:isarray@0.0.1/index");
  global.define = __define;
  return module.exports;
});

System.register("npm:core-util-is@1.0.1", ["npm:core-util-is@1.0.1/lib/util"], true, function(require, exports, module) {
  var global = System.global,
      __define = global.define;
  global.define = undefined;
  module.exports = require("npm:core-util-is@1.0.1/lib/util");
  global.define = __define;
  return module.exports;
});

System.register("npm:readable-stream@1.1.13/lib/_stream_duplex", ["npm:core-util-is@1.0.1", "npm:inherits@2.0.1", "npm:readable-stream@1.1.13/lib/_stream_readable", "npm:readable-stream@1.1.13/lib/_stream_writable", "github:jspm/nodelibs-process@0.1.1"], true, function(require, exports, module) {
  var global = System.global,
      __define = global.define;
  global.define = undefined;
  (function(process) {
    module.exports = Duplex;
    var objectKeys = Object.keys || function(obj) {
      var keys = [];
      for (var key in obj)
        keys.push(key);
      return keys;
    };
    var util = require("npm:core-util-is@1.0.1");
    util.inherits = require("npm:inherits@2.0.1");
    var Readable = require("npm:readable-stream@1.1.13/lib/_stream_readable");
    var Writable = require("npm:readable-stream@1.1.13/lib/_stream_writable");
    util.inherits(Duplex, Readable);
    forEach(objectKeys(Writable.prototype), function(method) {
      if (!Duplex.prototype[method])
        Duplex.prototype[method] = Writable.prototype[method];
    });
    function Duplex(options) {
      if (!(this instanceof Duplex))
        return new Duplex(options);
      Readable.call(this, options);
      Writable.call(this, options);
      if (options && options.readable === false)
        this.readable = false;
      if (options && options.writable === false)
        this.writable = false;
      this.allowHalfOpen = true;
      if (options && options.allowHalfOpen === false)
        this.allowHalfOpen = false;
      this.once('end', onend);
    }
    function onend() {
      if (this.allowHalfOpen || this._writableState.ended)
        return ;
      process.nextTick(this.end.bind(this));
    }
    function forEach(xs, f) {
      for (var i = 0,
          l = xs.length; i < l; i++) {
        f(xs[i], i);
      }
    }
  })(require("github:jspm/nodelibs-process@0.1.1"));
  global.define = __define;
  return module.exports;
});

System.register("npm:string_decoder@0.10.31", ["npm:string_decoder@0.10.31/index"], true, function(require, exports, module) {
  var global = System.global,
      __define = global.define;
  global.define = undefined;
  module.exports = require("npm:string_decoder@0.10.31/index");
  global.define = __define;
  return module.exports;
});

System.register("npm:through@1.1.2", ["npm:through@1.1.2/index"], true, function(require, exports, module) {
  var global = System.global,
      __define = global.define;
  global.define = undefined;
  module.exports = require("npm:through@1.1.2/index");
  global.define = __define;
  return module.exports;
});

System.register("github:jspm/nodelibs-events@0.1.1/index", ["npm:events@1.0.2"], true, function(require, exports, module) {
  var global = System.global,
      __define = global.define;
  global.define = undefined;
  module.exports = System._nodeRequire ? System._nodeRequire('events') : require("npm:events@1.0.2");
  global.define = __define;
  return module.exports;
});

System.register("github:jspm/nodelibs-process@0.1.1/index", ["npm:process@0.10.1"], true, function(require, exports, module) {
  var global = System.global,
      __define = global.define;
  global.define = undefined;
  module.exports = System._nodeRequire ? process : require("npm:process@0.10.1");
  global.define = __define;
  return module.exports;
});

System.register("npm:buffer@3.2.2/index", ["npm:base64-js@0.0.8", "npm:ieee754@1.1.5", "npm:is-array@1.0.1"], true, function(require, exports, module) {
  var global = System.global,
      __define = global.define;
  global.define = undefined;
  var base64 = require("npm:base64-js@0.0.8");
  var ieee754 = require("npm:ieee754@1.1.5");
  var isArray = require("npm:is-array@1.0.1");
  exports.Buffer = Buffer;
  exports.SlowBuffer = SlowBuffer;
  exports.INSPECT_MAX_BYTES = 50;
  Buffer.poolSize = 8192;
  var kMaxLength = 0x3fffffff;
  var rootParent = {};
  Buffer.TYPED_ARRAY_SUPPORT = (function() {
    try {
      var buf = new ArrayBuffer(0);
      var arr = new Uint8Array(buf);
      arr.foo = function() {
        return 42;
      };
      return arr.foo() === 42 && typeof arr.subarray === 'function' && new Uint8Array(1).subarray(1, 1).byteLength === 0;
    } catch (e) {
      return false;
    }
  })();
  function Buffer(arg) {
    if (!(this instanceof Buffer)) {
      if (arguments.length > 1)
        return new Buffer(arg, arguments[1]);
      return new Buffer(arg);
    }
    this.length = 0;
    this.parent = undefined;
    if (typeof arg === 'number') {
      return fromNumber(this, arg);
    }
    if (typeof arg === 'string') {
      return fromString(this, arg, arguments.length > 1 ? arguments[1] : 'utf8');
    }
    return fromObject(this, arg);
  }
  function fromNumber(that, length) {
    that = allocate(that, length < 0 ? 0 : checked(length) | 0);
    if (!Buffer.TYPED_ARRAY_SUPPORT) {
      for (var i = 0; i < length; i++) {
        that[i] = 0;
      }
    }
    return that;
  }
  function fromString(that, string, encoding) {
    if (typeof encoding !== 'string' || encoding === '')
      encoding = 'utf8';
    var length = byteLength(string, encoding) | 0;
    that = allocate(that, length);
    that.write(string, encoding);
    return that;
  }
  function fromObject(that, object) {
    if (Buffer.isBuffer(object))
      return fromBuffer(that, object);
    if (isArray(object))
      return fromArray(that, object);
    if (object == null) {
      throw new TypeError('must start with number, buffer, array or string');
    }
    if (typeof ArrayBuffer !== 'undefined' && object.buffer instanceof ArrayBuffer) {
      return fromTypedArray(that, object);
    }
    if (object.length)
      return fromArrayLike(that, object);
    return fromJsonObject(that, object);
  }
  function fromBuffer(that, buffer) {
    var length = checked(buffer.length) | 0;
    that = allocate(that, length);
    buffer.copy(that, 0, 0, length);
    return that;
  }
  function fromArray(that, array) {
    var length = checked(array.length) | 0;
    that = allocate(that, length);
    for (var i = 0; i < length; i += 1) {
      that[i] = array[i] & 255;
    }
    return that;
  }
  function fromTypedArray(that, array) {
    var length = checked(array.length) | 0;
    that = allocate(that, length);
    for (var i = 0; i < length; i += 1) {
      that[i] = array[i] & 255;
    }
    return that;
  }
  function fromArrayLike(that, array) {
    var length = checked(array.length) | 0;
    that = allocate(that, length);
    for (var i = 0; i < length; i += 1) {
      that[i] = array[i] & 255;
    }
    return that;
  }
  function fromJsonObject(that, object) {
    var array;
    var length = 0;
    if (object.type === 'Buffer' && isArray(object.data)) {
      array = object.data;
      length = checked(array.length) | 0;
    }
    that = allocate(that, length);
    for (var i = 0; i < length; i += 1) {
      that[i] = array[i] & 255;
    }
    return that;
  }
  function allocate(that, length) {
    if (Buffer.TYPED_ARRAY_SUPPORT) {
      that = Buffer._augment(new Uint8Array(length));
    } else {
      that.length = length;
      that._isBuffer = true;
    }
    var fromPool = length !== 0 && length <= Buffer.poolSize >>> 1;
    if (fromPool)
      that.parent = rootParent;
    return that;
  }
  function checked(length) {
    if (length >= kMaxLength) {
      throw new RangeError('Attempt to allocate Buffer larger than maximum ' + 'size: 0x' + kMaxLength.toString(16) + ' bytes');
    }
    return length | 0;
  }
  function SlowBuffer(subject, encoding) {
    if (!(this instanceof SlowBuffer))
      return new SlowBuffer(subject, encoding);
    var buf = new Buffer(subject, encoding);
    delete buf.parent;
    return buf;
  }
  Buffer.isBuffer = function isBuffer(b) {
    return !!(b != null && b._isBuffer);
  };
  Buffer.compare = function compare(a, b) {
    if (!Buffer.isBuffer(a) || !Buffer.isBuffer(b)) {
      throw new TypeError('Arguments must be Buffers');
    }
    if (a === b)
      return 0;
    var x = a.length;
    var y = b.length;
    var i = 0;
    var len = Math.min(x, y);
    while (i < len) {
      if (a[i] !== b[i])
        break;
      ++i;
    }
    if (i !== len) {
      x = a[i];
      y = b[i];
    }
    if (x < y)
      return -1;
    if (y < x)
      return 1;
    return 0;
  };
  Buffer.isEncoding = function isEncoding(encoding) {
    switch (String(encoding).toLowerCase()) {
      case 'hex':
      case 'utf8':
      case 'utf-8':
      case 'ascii':
      case 'binary':
      case 'base64':
      case 'raw':
      case 'ucs2':
      case 'ucs-2':
      case 'utf16le':
      case 'utf-16le':
        return true;
      default:
        return false;
    }
  };
  Buffer.concat = function concat(list, length) {
    if (!isArray(list))
      throw new TypeError('list argument must be an Array of Buffers.');
    if (list.length === 0) {
      return new Buffer(0);
    } else if (list.length === 1) {
      return list[0];
    }
    var i;
    if (length === undefined) {
      length = 0;
      for (i = 0; i < list.length; i++) {
        length += list[i].length;
      }
    }
    var buf = new Buffer(length);
    var pos = 0;
    for (i = 0; i < list.length; i++) {
      var item = list[i];
      item.copy(buf, pos);
      pos += item.length;
    }
    return buf;
  };
  function byteLength(string, encoding) {
    if (typeof string !== 'string')
      string = String(string);
    if (string.length === 0)
      return 0;
    switch (encoding || 'utf8') {
      case 'ascii':
      case 'binary':
      case 'raw':
        return string.length;
      case 'ucs2':
      case 'ucs-2':
      case 'utf16le':
      case 'utf-16le':
        return string.length * 2;
      case 'hex':
        return string.length >>> 1;
      case 'utf8':
      case 'utf-8':
        return utf8ToBytes(string).length;
      case 'base64':
        return base64ToBytes(string).length;
      default:
        return string.length;
    }
  }
  Buffer.byteLength = byteLength;
  Buffer.prototype.length = undefined;
  Buffer.prototype.parent = undefined;
  Buffer.prototype.toString = function toString(encoding, start, end) {
    var loweredCase = false;
    start = start | 0;
    end = end === undefined || end === Infinity ? this.length : end | 0;
    if (!encoding)
      encoding = 'utf8';
    if (start < 0)
      start = 0;
    if (end > this.length)
      end = this.length;
    if (end <= start)
      return '';
    while (true) {
      switch (encoding) {
        case 'hex':
          return hexSlice(this, start, end);
        case 'utf8':
        case 'utf-8':
          return utf8Slice(this, start, end);
        case 'ascii':
          return asciiSlice(this, start, end);
        case 'binary':
          return binarySlice(this, start, end);
        case 'base64':
          return base64Slice(this, start, end);
        case 'ucs2':
        case 'ucs-2':
        case 'utf16le':
        case 'utf-16le':
          return utf16leSlice(this, start, end);
        default:
          if (loweredCase)
            throw new TypeError('Unknown encoding: ' + encoding);
          encoding = (encoding + '').toLowerCase();
          loweredCase = true;
      }
    }
  };
  Buffer.prototype.equals = function equals(b) {
    if (!Buffer.isBuffer(b))
      throw new TypeError('Argument must be a Buffer');
    if (this === b)
      return true;
    return Buffer.compare(this, b) === 0;
  };
  Buffer.prototype.inspect = function inspect() {
    var str = '';
    var max = exports.INSPECT_MAX_BYTES;
    if (this.length > 0) {
      str = this.toString('hex', 0, max).match(/.{2}/g).join(' ');
      if (this.length > max)
        str += ' ... ';
    }
    return '<Buffer ' + str + '>';
  };
  Buffer.prototype.compare = function compare(b) {
    if (!Buffer.isBuffer(b))
      throw new TypeError('Argument must be a Buffer');
    if (this === b)
      return 0;
    return Buffer.compare(this, b);
  };
  Buffer.prototype.indexOf = function indexOf(val, byteOffset) {
    if (byteOffset > 0x7fffffff)
      byteOffset = 0x7fffffff;
    else if (byteOffset < -0x80000000)
      byteOffset = -0x80000000;
    byteOffset >>= 0;
    if (this.length === 0)
      return -1;
    if (byteOffset >= this.length)
      return -1;
    if (byteOffset < 0)
      byteOffset = Math.max(this.length + byteOffset, 0);
    if (typeof val === 'string') {
      if (val.length === 0)
        return -1;
      return String.prototype.indexOf.call(this, val, byteOffset);
    }
    if (Buffer.isBuffer(val)) {
      return arrayIndexOf(this, val, byteOffset);
    }
    if (typeof val === 'number') {
      if (Buffer.TYPED_ARRAY_SUPPORT && Uint8Array.prototype.indexOf === 'function') {
        return Uint8Array.prototype.indexOf.call(this, val, byteOffset);
      }
      return arrayIndexOf(this, [val], byteOffset);
    }
    function arrayIndexOf(arr, val, byteOffset) {
      var foundIndex = -1;
      for (var i = 0; byteOffset + i < arr.length; i++) {
        if (arr[byteOffset + i] === val[foundIndex === -1 ? 0 : i - foundIndex]) {
          if (foundIndex === -1)
            foundIndex = i;
          if (i - foundIndex + 1 === val.length)
            return byteOffset + foundIndex;
        } else {
          foundIndex = -1;
        }
      }
      return -1;
    }
    throw new TypeError('val must be string, number or Buffer');
  };
  Buffer.prototype.get = function get(offset) {
    console.log('.get() is deprecated. Access using array indexes instead.');
    return this.readUInt8(offset);
  };
  Buffer.prototype.set = function set(v, offset) {
    console.log('.set() is deprecated. Access using array indexes instead.');
    return this.writeUInt8(v, offset);
  };
  function hexWrite(buf, string, offset, length) {
    offset = Number(offset) || 0;
    var remaining = buf.length - offset;
    if (!length) {
      length = remaining;
    } else {
      length = Number(length);
      if (length > remaining) {
        length = remaining;
      }
    }
    var strLen = string.length;
    if (strLen % 2 !== 0)
      throw new Error('Invalid hex string');
    if (length > strLen / 2) {
      length = strLen / 2;
    }
    for (var i = 0; i < length; i++) {
      var parsed = parseInt(string.substr(i * 2, 2), 16);
      if (isNaN(parsed))
        throw new Error('Invalid hex string');
      buf[offset + i] = parsed;
    }
    return i;
  }
  function utf8Write(buf, string, offset, length) {
    return blitBuffer(utf8ToBytes(string, buf.length - offset), buf, offset, length);
  }
  function asciiWrite(buf, string, offset, length) {
    return blitBuffer(asciiToBytes(string), buf, offset, length);
  }
  function binaryWrite(buf, string, offset, length) {
    return asciiWrite(buf, string, offset, length);
  }
  function base64Write(buf, string, offset, length) {
    return blitBuffer(base64ToBytes(string), buf, offset, length);
  }
  function ucs2Write(buf, string, offset, length) {
    return blitBuffer(utf16leToBytes(string, buf.length - offset), buf, offset, length);
  }
  Buffer.prototype.write = function write(string, offset, length, encoding) {
    if (offset === undefined) {
      encoding = 'utf8';
      length = this.length;
      offset = 0;
    } else if (length === undefined && typeof offset === 'string') {
      encoding = offset;
      length = this.length;
      offset = 0;
    } else if (isFinite(offset)) {
      offset = offset | 0;
      if (isFinite(length)) {
        length = length | 0;
        if (encoding === undefined)
          encoding = 'utf8';
      } else {
        encoding = length;
        length = undefined;
      }
    } else {
      var swap = encoding;
      encoding = offset;
      offset = length | 0;
      length = swap;
    }
    var remaining = this.length - offset;
    if (length === undefined || length > remaining)
      length = remaining;
    if ((string.length > 0 && (length < 0 || offset < 0)) || offset > this.length) {
      throw new RangeError('attempt to write outside buffer bounds');
    }
    if (!encoding)
      encoding = 'utf8';
    var loweredCase = false;
    for (; ; ) {
      switch (encoding) {
        case 'hex':
          return hexWrite(this, string, offset, length);
        case 'utf8':
        case 'utf-8':
          return utf8Write(this, string, offset, length);
        case 'ascii':
          return asciiWrite(this, string, offset, length);
        case 'binary':
          return binaryWrite(this, string, offset, length);
        case 'base64':
          return base64Write(this, string, offset, length);
        case 'ucs2':
        case 'ucs-2':
        case 'utf16le':
        case 'utf-16le':
          return ucs2Write(this, string, offset, length);
        default:
          if (loweredCase)
            throw new TypeError('Unknown encoding: ' + encoding);
          encoding = ('' + encoding).toLowerCase();
          loweredCase = true;
      }
    }
  };
  Buffer.prototype.toJSON = function toJSON() {
    return {
      type: 'Buffer',
      data: Array.prototype.slice.call(this._arr || this, 0)
    };
  };
  function base64Slice(buf, start, end) {
    if (start === 0 && end === buf.length) {
      return base64.fromByteArray(buf);
    } else {
      return base64.fromByteArray(buf.slice(start, end));
    }
  }
  function utf8Slice(buf, start, end) {
    var res = '';
    var tmp = '';
    end = Math.min(buf.length, end);
    for (var i = start; i < end; i++) {
      if (buf[i] <= 0x7F) {
        res += decodeUtf8Char(tmp) + String.fromCharCode(buf[i]);
        tmp = '';
      } else {
        tmp += '%' + buf[i].toString(16);
      }
    }
    return res + decodeUtf8Char(tmp);
  }
  function asciiSlice(buf, start, end) {
    var ret = '';
    end = Math.min(buf.length, end);
    for (var i = start; i < end; i++) {
      ret += String.fromCharCode(buf[i] & 0x7F);
    }
    return ret;
  }
  function binarySlice(buf, start, end) {
    var ret = '';
    end = Math.min(buf.length, end);
    for (var i = start; i < end; i++) {
      ret += String.fromCharCode(buf[i]);
    }
    return ret;
  }
  function hexSlice(buf, start, end) {
    var len = buf.length;
    if (!start || start < 0)
      start = 0;
    if (!end || end < 0 || end > len)
      end = len;
    var out = '';
    for (var i = start; i < end; i++) {
      out += toHex(buf[i]);
    }
    return out;
  }
  function utf16leSlice(buf, start, end) {
    var bytes = buf.slice(start, end);
    var res = '';
    for (var i = 0; i < bytes.length; i += 2) {
      res += String.fromCharCode(bytes[i] + bytes[i + 1] * 256);
    }
    return res;
  }
  Buffer.prototype.slice = function slice(start, end) {
    var len = this.length;
    start = ~~start;
    end = end === undefined ? len : ~~end;
    if (start < 0) {
      start += len;
      if (start < 0)
        start = 0;
    } else if (start > len) {
      start = len;
    }
    if (end < 0) {
      end += len;
      if (end < 0)
        end = 0;
    } else if (end > len) {
      end = len;
    }
    if (end < start)
      end = start;
    var newBuf;
    if (Buffer.TYPED_ARRAY_SUPPORT) {
      newBuf = Buffer._augment(this.subarray(start, end));
    } else {
      var sliceLen = end - start;
      newBuf = new Buffer(sliceLen, undefined);
      for (var i = 0; i < sliceLen; i++) {
        newBuf[i] = this[i + start];
      }
    }
    if (newBuf.length)
      newBuf.parent = this.parent || this;
    return newBuf;
  };
  function checkOffset(offset, ext, length) {
    if ((offset % 1) !== 0 || offset < 0)
      throw new RangeError('offset is not uint');
    if (offset + ext > length)
      throw new RangeError('Trying to access beyond buffer length');
  }
  Buffer.prototype.readUIntLE = function readUIntLE(offset, byteLength, noAssert) {
    offset = offset | 0;
    byteLength = byteLength | 0;
    if (!noAssert)
      checkOffset(offset, byteLength, this.length);
    var val = this[offset];
    var mul = 1;
    var i = 0;
    while (++i < byteLength && (mul *= 0x100)) {
      val += this[offset + i] * mul;
    }
    return val;
  };
  Buffer.prototype.readUIntBE = function readUIntBE(offset, byteLength, noAssert) {
    offset = offset | 0;
    byteLength = byteLength | 0;
    if (!noAssert) {
      checkOffset(offset, byteLength, this.length);
    }
    var val = this[offset + --byteLength];
    var mul = 1;
    while (byteLength > 0 && (mul *= 0x100)) {
      val += this[offset + --byteLength] * mul;
    }
    return val;
  };
  Buffer.prototype.readUInt8 = function readUInt8(offset, noAssert) {
    if (!noAssert)
      checkOffset(offset, 1, this.length);
    return this[offset];
  };
  Buffer.prototype.readUInt16LE = function readUInt16LE(offset, noAssert) {
    if (!noAssert)
      checkOffset(offset, 2, this.length);
    return this[offset] | (this[offset + 1] << 8);
  };
  Buffer.prototype.readUInt16BE = function readUInt16BE(offset, noAssert) {
    if (!noAssert)
      checkOffset(offset, 2, this.length);
    return (this[offset] << 8) | this[offset + 1];
  };
  Buffer.prototype.readUInt32LE = function readUInt32LE(offset, noAssert) {
    if (!noAssert)
      checkOffset(offset, 4, this.length);
    return ((this[offset]) | (this[offset + 1] << 8) | (this[offset + 2] << 16)) + (this[offset + 3] * 0x1000000);
  };
  Buffer.prototype.readUInt32BE = function readUInt32BE(offset, noAssert) {
    if (!noAssert)
      checkOffset(offset, 4, this.length);
    return (this[offset] * 0x1000000) + ((this[offset + 1] << 16) | (this[offset + 2] << 8) | this[offset + 3]);
  };
  Buffer.prototype.readIntLE = function readIntLE(offset, byteLength, noAssert) {
    offset = offset | 0;
    byteLength = byteLength | 0;
    if (!noAssert)
      checkOffset(offset, byteLength, this.length);
    var val = this[offset];
    var mul = 1;
    var i = 0;
    while (++i < byteLength && (mul *= 0x100)) {
      val += this[offset + i] * mul;
    }
    mul *= 0x80;
    if (val >= mul)
      val -= Math.pow(2, 8 * byteLength);
    return val;
  };
  Buffer.prototype.readIntBE = function readIntBE(offset, byteLength, noAssert) {
    offset = offset | 0;
    byteLength = byteLength | 0;
    if (!noAssert)
      checkOffset(offset, byteLength, this.length);
    var i = byteLength;
    var mul = 1;
    var val = this[offset + --i];
    while (i > 0 && (mul *= 0x100)) {
      val += this[offset + --i] * mul;
    }
    mul *= 0x80;
    if (val >= mul)
      val -= Math.pow(2, 8 * byteLength);
    return val;
  };
  Buffer.prototype.readInt8 = function readInt8(offset, noAssert) {
    if (!noAssert)
      checkOffset(offset, 1, this.length);
    if (!(this[offset] & 0x80))
      return (this[offset]);
    return ((0xff - this[offset] + 1) * -1);
  };
  Buffer.prototype.readInt16LE = function readInt16LE(offset, noAssert) {
    if (!noAssert)
      checkOffset(offset, 2, this.length);
    var val = this[offset] | (this[offset + 1] << 8);
    return (val & 0x8000) ? val | 0xFFFF0000 : val;
  };
  Buffer.prototype.readInt16BE = function readInt16BE(offset, noAssert) {
    if (!noAssert)
      checkOffset(offset, 2, this.length);
    var val = this[offset + 1] | (this[offset] << 8);
    return (val & 0x8000) ? val | 0xFFFF0000 : val;
  };
  Buffer.prototype.readInt32LE = function readInt32LE(offset, noAssert) {
    if (!noAssert)
      checkOffset(offset, 4, this.length);
    return (this[offset]) | (this[offset + 1] << 8) | (this[offset + 2] << 16) | (this[offset + 3] << 24);
  };
  Buffer.prototype.readInt32BE = function readInt32BE(offset, noAssert) {
    if (!noAssert)
      checkOffset(offset, 4, this.length);
    return (this[offset] << 24) | (this[offset + 1] << 16) | (this[offset + 2] << 8) | (this[offset + 3]);
  };
  Buffer.prototype.readFloatLE = function readFloatLE(offset, noAssert) {
    if (!noAssert)
      checkOffset(offset, 4, this.length);
    return ieee754.read(this, offset, true, 23, 4);
  };
  Buffer.prototype.readFloatBE = function readFloatBE(offset, noAssert) {
    if (!noAssert)
      checkOffset(offset, 4, this.length);
    return ieee754.read(this, offset, false, 23, 4);
  };
  Buffer.prototype.readDoubleLE = function readDoubleLE(offset, noAssert) {
    if (!noAssert)
      checkOffset(offset, 8, this.length);
    return ieee754.read(this, offset, true, 52, 8);
  };
  Buffer.prototype.readDoubleBE = function readDoubleBE(offset, noAssert) {
    if (!noAssert)
      checkOffset(offset, 8, this.length);
    return ieee754.read(this, offset, false, 52, 8);
  };
  function checkInt(buf, value, offset, ext, max, min) {
    if (!Buffer.isBuffer(buf))
      throw new TypeError('buffer must be a Buffer instance');
    if (value > max || value < min)
      throw new RangeError('value is out of bounds');
    if (offset + ext > buf.length)
      throw new RangeError('index out of range');
  }
  Buffer.prototype.writeUIntLE = function writeUIntLE(value, offset, byteLength, noAssert) {
    value = +value;
    offset = offset | 0;
    byteLength = byteLength | 0;
    if (!noAssert)
      checkInt(this, value, offset, byteLength, Math.pow(2, 8 * byteLength), 0);
    var mul = 1;
    var i = 0;
    this[offset] = value & 0xFF;
    while (++i < byteLength && (mul *= 0x100)) {
      this[offset + i] = (value / mul) & 0xFF;
    }
    return offset + byteLength;
  };
  Buffer.prototype.writeUIntBE = function writeUIntBE(value, offset, byteLength, noAssert) {
    value = +value;
    offset = offset | 0;
    byteLength = byteLength | 0;
    if (!noAssert)
      checkInt(this, value, offset, byteLength, Math.pow(2, 8 * byteLength), 0);
    var i = byteLength - 1;
    var mul = 1;
    this[offset + i] = value & 0xFF;
    while (--i >= 0 && (mul *= 0x100)) {
      this[offset + i] = (value / mul) & 0xFF;
    }
    return offset + byteLength;
  };
  Buffer.prototype.writeUInt8 = function writeUInt8(value, offset, noAssert) {
    value = +value;
    offset = offset | 0;
    if (!noAssert)
      checkInt(this, value, offset, 1, 0xff, 0);
    if (!Buffer.TYPED_ARRAY_SUPPORT)
      value = Math.floor(value);
    this[offset] = value;
    return offset + 1;
  };
  function objectWriteUInt16(buf, value, offset, littleEndian) {
    if (value < 0)
      value = 0xffff + value + 1;
    for (var i = 0,
        j = Math.min(buf.length - offset, 2); i < j; i++) {
      buf[offset + i] = (value & (0xff << (8 * (littleEndian ? i : 1 - i)))) >>> (littleEndian ? i : 1 - i) * 8;
    }
  }
  Buffer.prototype.writeUInt16LE = function writeUInt16LE(value, offset, noAssert) {
    value = +value;
    offset = offset | 0;
    if (!noAssert)
      checkInt(this, value, offset, 2, 0xffff, 0);
    if (Buffer.TYPED_ARRAY_SUPPORT) {
      this[offset] = value;
      this[offset + 1] = (value >>> 8);
    } else {
      objectWriteUInt16(this, value, offset, true);
    }
    return offset + 2;
  };
  Buffer.prototype.writeUInt16BE = function writeUInt16BE(value, offset, noAssert) {
    value = +value;
    offset = offset | 0;
    if (!noAssert)
      checkInt(this, value, offset, 2, 0xffff, 0);
    if (Buffer.TYPED_ARRAY_SUPPORT) {
      this[offset] = (value >>> 8);
      this[offset + 1] = value;
    } else {
      objectWriteUInt16(this, value, offset, false);
    }
    return offset + 2;
  };
  function objectWriteUInt32(buf, value, offset, littleEndian) {
    if (value < 0)
      value = 0xffffffff + value + 1;
    for (var i = 0,
        j = Math.min(buf.length - offset, 4); i < j; i++) {
      buf[offset + i] = (value >>> (littleEndian ? i : 3 - i) * 8) & 0xff;
    }
  }
  Buffer.prototype.writeUInt32LE = function writeUInt32LE(value, offset, noAssert) {
    value = +value;
    offset = offset | 0;
    if (!noAssert)
      checkInt(this, value, offset, 4, 0xffffffff, 0);
    if (Buffer.TYPED_ARRAY_SUPPORT) {
      this[offset + 3] = (value >>> 24);
      this[offset + 2] = (value >>> 16);
      this[offset + 1] = (value >>> 8);
      this[offset] = value;
    } else {
      objectWriteUInt32(this, value, offset, true);
    }
    return offset + 4;
  };
  Buffer.prototype.writeUInt32BE = function writeUInt32BE(value, offset, noAssert) {
    value = +value;
    offset = offset | 0;
    if (!noAssert)
      checkInt(this, value, offset, 4, 0xffffffff, 0);
    if (Buffer.TYPED_ARRAY_SUPPORT) {
      this[offset] = (value >>> 24);
      this[offset + 1] = (value >>> 16);
      this[offset + 2] = (value >>> 8);
      this[offset + 3] = value;
    } else {
      objectWriteUInt32(this, value, offset, false);
    }
    return offset + 4;
  };
  Buffer.prototype.writeIntLE = function writeIntLE(value, offset, byteLength, noAssert) {
    value = +value;
    offset = offset | 0;
    if (!noAssert) {
      var limit = Math.pow(2, 8 * byteLength - 1);
      checkInt(this, value, offset, byteLength, limit - 1, -limit);
    }
    var i = 0;
    var mul = 1;
    var sub = value < 0 ? 1 : 0;
    this[offset] = value & 0xFF;
    while (++i < byteLength && (mul *= 0x100)) {
      this[offset + i] = ((value / mul) >> 0) - sub & 0xFF;
    }
    return offset + byteLength;
  };
  Buffer.prototype.writeIntBE = function writeIntBE(value, offset, byteLength, noAssert) {
    value = +value;
    offset = offset | 0;
    if (!noAssert) {
      var limit = Math.pow(2, 8 * byteLength - 1);
      checkInt(this, value, offset, byteLength, limit - 1, -limit);
    }
    var i = byteLength - 1;
    var mul = 1;
    var sub = value < 0 ? 1 : 0;
    this[offset + i] = value & 0xFF;
    while (--i >= 0 && (mul *= 0x100)) {
      this[offset + i] = ((value / mul) >> 0) - sub & 0xFF;
    }
    return offset + byteLength;
  };
  Buffer.prototype.writeInt8 = function writeInt8(value, offset, noAssert) {
    value = +value;
    offset = offset | 0;
    if (!noAssert)
      checkInt(this, value, offset, 1, 0x7f, -0x80);
    if (!Buffer.TYPED_ARRAY_SUPPORT)
      value = Math.floor(value);
    if (value < 0)
      value = 0xff + value + 1;
    this[offset] = value;
    return offset + 1;
  };
  Buffer.prototype.writeInt16LE = function writeInt16LE(value, offset, noAssert) {
    value = +value;
    offset = offset | 0;
    if (!noAssert)
      checkInt(this, value, offset, 2, 0x7fff, -0x8000);
    if (Buffer.TYPED_ARRAY_SUPPORT) {
      this[offset] = value;
      this[offset + 1] = (value >>> 8);
    } else {
      objectWriteUInt16(this, value, offset, true);
    }
    return offset + 2;
  };
  Buffer.prototype.writeInt16BE = function writeInt16BE(value, offset, noAssert) {
    value = +value;
    offset = offset | 0;
    if (!noAssert)
      checkInt(this, value, offset, 2, 0x7fff, -0x8000);
    if (Buffer.TYPED_ARRAY_SUPPORT) {
      this[offset] = (value >>> 8);
      this[offset + 1] = value;
    } else {
      objectWriteUInt16(this, value, offset, false);
    }
    return offset + 2;
  };
  Buffer.prototype.writeInt32LE = function writeInt32LE(value, offset, noAssert) {
    value = +value;
    offset = offset | 0;
    if (!noAssert)
      checkInt(this, value, offset, 4, 0x7fffffff, -0x80000000);
    if (Buffer.TYPED_ARRAY_SUPPORT) {
      this[offset] = value;
      this[offset + 1] = (value >>> 8);
      this[offset + 2] = (value >>> 16);
      this[offset + 3] = (value >>> 24);
    } else {
      objectWriteUInt32(this, value, offset, true);
    }
    return offset + 4;
  };
  Buffer.prototype.writeInt32BE = function writeInt32BE(value, offset, noAssert) {
    value = +value;
    offset = offset | 0;
    if (!noAssert)
      checkInt(this, value, offset, 4, 0x7fffffff, -0x80000000);
    if (value < 0)
      value = 0xffffffff + value + 1;
    if (Buffer.TYPED_ARRAY_SUPPORT) {
      this[offset] = (value >>> 24);
      this[offset + 1] = (value >>> 16);
      this[offset + 2] = (value >>> 8);
      this[offset + 3] = value;
    } else {
      objectWriteUInt32(this, value, offset, false);
    }
    return offset + 4;
  };
  function checkIEEE754(buf, value, offset, ext, max, min) {
    if (value > max || value < min)
      throw new RangeError('value is out of bounds');
    if (offset + ext > buf.length)
      throw new RangeError('index out of range');
    if (offset < 0)
      throw new RangeError('index out of range');
  }
  function writeFloat(buf, value, offset, littleEndian, noAssert) {
    if (!noAssert) {
      checkIEEE754(buf, value, offset, 4, 3.4028234663852886e+38, -3.4028234663852886e+38);
    }
    ieee754.write(buf, value, offset, littleEndian, 23, 4);
    return offset + 4;
  }
  Buffer.prototype.writeFloatLE = function writeFloatLE(value, offset, noAssert) {
    return writeFloat(this, value, offset, true, noAssert);
  };
  Buffer.prototype.writeFloatBE = function writeFloatBE(value, offset, noAssert) {
    return writeFloat(this, value, offset, false, noAssert);
  };
  function writeDouble(buf, value, offset, littleEndian, noAssert) {
    if (!noAssert) {
      checkIEEE754(buf, value, offset, 8, 1.7976931348623157E+308, -1.7976931348623157E+308);
    }
    ieee754.write(buf, value, offset, littleEndian, 52, 8);
    return offset + 8;
  }
  Buffer.prototype.writeDoubleLE = function writeDoubleLE(value, offset, noAssert) {
    return writeDouble(this, value, offset, true, noAssert);
  };
  Buffer.prototype.writeDoubleBE = function writeDoubleBE(value, offset, noAssert) {
    return writeDouble(this, value, offset, false, noAssert);
  };
  Buffer.prototype.copy = function copy(target, targetStart, start, end) {
    if (!start)
      start = 0;
    if (!end && end !== 0)
      end = this.length;
    if (targetStart >= target.length)
      targetStart = target.length;
    if (!targetStart)
      targetStart = 0;
    if (end > 0 && end < start)
      end = start;
    if (end === start)
      return 0;
    if (target.length === 0 || this.length === 0)
      return 0;
    if (targetStart < 0) {
      throw new RangeError('targetStart out of bounds');
    }
    if (start < 0 || start >= this.length)
      throw new RangeError('sourceStart out of bounds');
    if (end < 0)
      throw new RangeError('sourceEnd out of bounds');
    if (end > this.length)
      end = this.length;
    if (target.length - targetStart < end - start) {
      end = target.length - targetStart + start;
    }
    var len = end - start;
    if (len < 1000 || !Buffer.TYPED_ARRAY_SUPPORT) {
      for (var i = 0; i < len; i++) {
        target[i + targetStart] = this[i + start];
      }
    } else {
      target._set(this.subarray(start, start + len), targetStart);
    }
    return len;
  };
  Buffer.prototype.fill = function fill(value, start, end) {
    if (!value)
      value = 0;
    if (!start)
      start = 0;
    if (!end)
      end = this.length;
    if (end < start)
      throw new RangeError('end < start');
    if (end === start)
      return ;
    if (this.length === 0)
      return ;
    if (start < 0 || start >= this.length)
      throw new RangeError('start out of bounds');
    if (end < 0 || end > this.length)
      throw new RangeError('end out of bounds');
    var i;
    if (typeof value === 'number') {
      for (i = start; i < end; i++) {
        this[i] = value;
      }
    } else {
      var bytes = utf8ToBytes(value.toString());
      var len = bytes.length;
      for (i = start; i < end; i++) {
        this[i] = bytes[i % len];
      }
    }
    return this;
  };
  Buffer.prototype.toArrayBuffer = function toArrayBuffer() {
    if (typeof Uint8Array !== 'undefined') {
      if (Buffer.TYPED_ARRAY_SUPPORT) {
        return (new Buffer(this)).buffer;
      } else {
        var buf = new Uint8Array(this.length);
        for (var i = 0,
            len = buf.length; i < len; i += 1) {
          buf[i] = this[i];
        }
        return buf.buffer;
      }
    } else {
      throw new TypeError('Buffer.toArrayBuffer not supported in this browser');
    }
  };
  var BP = Buffer.prototype;
  Buffer._augment = function _augment(arr) {
    arr.constructor = Buffer;
    arr._isBuffer = true;
    arr._set = arr.set;
    arr.get = BP.get;
    arr.set = BP.set;
    arr.write = BP.write;
    arr.toString = BP.toString;
    arr.toLocaleString = BP.toString;
    arr.toJSON = BP.toJSON;
    arr.equals = BP.equals;
    arr.compare = BP.compare;
    arr.indexOf = BP.indexOf;
    arr.copy = BP.copy;
    arr.slice = BP.slice;
    arr.readUIntLE = BP.readUIntLE;
    arr.readUIntBE = BP.readUIntBE;
    arr.readUInt8 = BP.readUInt8;
    arr.readUInt16LE = BP.readUInt16LE;
    arr.readUInt16BE = BP.readUInt16BE;
    arr.readUInt32LE = BP.readUInt32LE;
    arr.readUInt32BE = BP.readUInt32BE;
    arr.readIntLE = BP.readIntLE;
    arr.readIntBE = BP.readIntBE;
    arr.readInt8 = BP.readInt8;
    arr.readInt16LE = BP.readInt16LE;
    arr.readInt16BE = BP.readInt16BE;
    arr.readInt32LE = BP.readInt32LE;
    arr.readInt32BE = BP.readInt32BE;
    arr.readFloatLE = BP.readFloatLE;
    arr.readFloatBE = BP.readFloatBE;
    arr.readDoubleLE = BP.readDoubleLE;
    arr.readDoubleBE = BP.readDoubleBE;
    arr.writeUInt8 = BP.writeUInt8;
    arr.writeUIntLE = BP.writeUIntLE;
    arr.writeUIntBE = BP.writeUIntBE;
    arr.writeUInt16LE = BP.writeUInt16LE;
    arr.writeUInt16BE = BP.writeUInt16BE;
    arr.writeUInt32LE = BP.writeUInt32LE;
    arr.writeUInt32BE = BP.writeUInt32BE;
    arr.writeIntLE = BP.writeIntLE;
    arr.writeIntBE = BP.writeIntBE;
    arr.writeInt8 = BP.writeInt8;
    arr.writeInt16LE = BP.writeInt16LE;
    arr.writeInt16BE = BP.writeInt16BE;
    arr.writeInt32LE = BP.writeInt32LE;
    arr.writeInt32BE = BP.writeInt32BE;
    arr.writeFloatLE = BP.writeFloatLE;
    arr.writeFloatBE = BP.writeFloatBE;
    arr.writeDoubleLE = BP.writeDoubleLE;
    arr.writeDoubleBE = BP.writeDoubleBE;
    arr.fill = BP.fill;
    arr.inspect = BP.inspect;
    arr.toArrayBuffer = BP.toArrayBuffer;
    return arr;
  };
  var INVALID_BASE64_RE = /[^+\/0-9A-z\-]/g;
  function base64clean(str) {
    str = stringtrim(str).replace(INVALID_BASE64_RE, '');
    if (str.length < 2)
      return '';
    while (str.length % 4 !== 0) {
      str = str + '=';
    }
    return str;
  }
  function stringtrim(str) {
    if (str.trim)
      return str.trim();
    return str.replace(/^\s+|\s+$/g, '');
  }
  function toHex(n) {
    if (n < 16)
      return '0' + n.toString(16);
    return n.toString(16);
  }
  function utf8ToBytes(string, units) {
    units = units || Infinity;
    var codePoint;
    var length = string.length;
    var leadSurrogate = null;
    var bytes = [];
    var i = 0;
    for (; i < length; i++) {
      codePoint = string.charCodeAt(i);
      if (codePoint > 0xD7FF && codePoint < 0xE000) {
        if (leadSurrogate) {
          if (codePoint < 0xDC00) {
            if ((units -= 3) > -1)
              bytes.push(0xEF, 0xBF, 0xBD);
            leadSurrogate = codePoint;
            continue;
          } else {
            codePoint = leadSurrogate - 0xD800 << 10 | codePoint - 0xDC00 | 0x10000;
            leadSurrogate = null;
          }
        } else {
          if (codePoint > 0xDBFF) {
            if ((units -= 3) > -1)
              bytes.push(0xEF, 0xBF, 0xBD);
            continue;
          } else if (i + 1 === length) {
            if ((units -= 3) > -1)
              bytes.push(0xEF, 0xBF, 0xBD);
            continue;
          } else {
            leadSurrogate = codePoint;
            continue;
          }
        }
      } else if (leadSurrogate) {
        if ((units -= 3) > -1)
          bytes.push(0xEF, 0xBF, 0xBD);
        leadSurrogate = null;
      }
      if (codePoint < 0x80) {
        if ((units -= 1) < 0)
          break;
        bytes.push(codePoint);
      } else if (codePoint < 0x800) {
        if ((units -= 2) < 0)
          break;
        bytes.push(codePoint >> 0x6 | 0xC0, codePoint & 0x3F | 0x80);
      } else if (codePoint < 0x10000) {
        if ((units -= 3) < 0)
          break;
        bytes.push(codePoint >> 0xC | 0xE0, codePoint >> 0x6 & 0x3F | 0x80, codePoint & 0x3F | 0x80);
      } else if (codePoint < 0x200000) {
        if ((units -= 4) < 0)
          break;
        bytes.push(codePoint >> 0x12 | 0xF0, codePoint >> 0xC & 0x3F | 0x80, codePoint >> 0x6 & 0x3F | 0x80, codePoint & 0x3F | 0x80);
      } else {
        throw new Error('Invalid code point');
      }
    }
    return bytes;
  }
  function asciiToBytes(str) {
    var byteArray = [];
    for (var i = 0; i < str.length; i++) {
      byteArray.push(str.charCodeAt(i) & 0xFF);
    }
    return byteArray;
  }
  function utf16leToBytes(str, units) {
    var c,
        hi,
        lo;
    var byteArray = [];
    for (var i = 0; i < str.length; i++) {
      if ((units -= 2) < 0)
        break;
      c = str.charCodeAt(i);
      hi = c >> 8;
      lo = c % 256;
      byteArray.push(lo);
      byteArray.push(hi);
    }
    return byteArray;
  }
  function base64ToBytes(str) {
    return base64.toByteArray(base64clean(str));
  }
  function blitBuffer(src, dst, offset, length) {
    for (var i = 0; i < length; i++) {
      if ((i + offset >= dst.length) || (i >= src.length))
        break;
      dst[i + offset] = src[i];
    }
    return i;
  }
  function decodeUtf8Char(str) {
    try {
      return decodeURIComponent(str);
    } catch (err) {
      return String.fromCharCode(0xFFFD);
    }
  }
  global.define = __define;
  return module.exports;
});

System.register("npm:cwise-compiler@0.0.0/compiler", ["npm:cwise-compiler@0.0.0/lib/thunk"], true, function(require, exports, module) {
  var global = System.global,
      __define = global.define;
  global.define = undefined;
  "use strict";
  var createThunk = require("npm:cwise-compiler@0.0.0/lib/thunk");
  function Procedure() {
    this.argTypes = [];
    this.shimArgs = [];
    this.arrayArgs = [];
    this.scalarArgs = [];
    this.indexArgs = [];
    this.shapeArgs = [];
    this.funcName = "";
    this.pre = null;
    this.body = null;
    this.post = null;
    this.debug = false;
  }
  function compileCwise(user_args) {
    var proc = new Procedure();
    proc.pre = user_args.pre;
    proc.body = user_args.body;
    proc.post = user_args.post;
    var proc_args = user_args.args.slice(0);
    proc.argTypes = proc_args;
    for (var i = 0; i < proc_args.length; ++i) {
      switch (proc_args[i]) {
        case "array":
          proc.arrayArgs.push(i);
          proc.shimArgs.push("array" + i);
          if (i < proc.pre.args.length && proc.pre.args[i].count > 0) {
            throw new Error("cwise: pre() block may not reference array args");
          }
          if (i < proc.post.args.length && proc.post.args[i].count > 0) {
            throw new Error("cwise: post() block may not reference array args");
          }
          break;
        case "scalar":
          proc.scalarArgs.push(i);
          proc.shimArgs.push("scalar" + i);
          break;
        case "index":
          proc.indexArgs.push(i);
          if (i < proc.pre.args.length && proc.pre.args[i].count > 0) {
            throw new Error("cwise: pre() block may not reference array index");
          }
          if (i < proc.body.args.length && proc.body.args[i].lvalue) {
            throw new Error("cwise: body() block may not write to array index");
          }
          if (i < proc.post.args.length && proc.post.args[i].count > 0) {
            throw new Error("cwise: post() block may not reference array index");
          }
          break;
        case "shape":
          proc.shapeArgs.push(i);
          if (i < proc.pre.args.length && proc.pre.args[i].lvalue) {
            throw new Error("cwise: pre() block may not write to array shape");
          }
          if (i < proc.body.args.length && proc.body.args[i].lvalue) {
            throw new Error("cwise: body() block may not write to array shape");
          }
          if (i < proc.post.args.length && proc.post.args[i].lvalue) {
            throw new Error("cwise: post() block may not write to array shape");
          }
          break;
        default:
          throw new Error("cwise: Unknown argument type " + proc_args[i]);
      }
    }
    if (proc.arrayArgs.length <= 0) {
      throw new Error("cwise: No array arguments specified");
    }
    if (proc.pre.args.length > proc_args.length) {
      throw new Error("cwise: Too many arguments in pre() block");
    }
    if (proc.body.args.length > proc_args.length) {
      throw new Error("cwise: Too many arguments in body() block");
    }
    if (proc.post.args.length > proc_args.length) {
      throw new Error("cwise: Too many arguments in post() block");
    }
    proc.debug = !!user_args.printCode || !!user_args.debug;
    proc.funcName = user_args.funcName || "cwise";
    proc.blockSize = user_args.blockSize || 64;
    return createThunk(proc);
  }
  module.exports = compileCwise;
  global.define = __define;
  return module.exports;
});

System.register("npm:cwise-parser@0.0.1/index", ["npm:esprima@1.0.4", "npm:uniq@0.0.2"], true, function(require, exports, module) {
  var global = System.global,
      __define = global.define;
  global.define = undefined;
  "use strict";
  var esprima = require("npm:esprima@1.0.4");
  var uniq = require("npm:uniq@0.0.2");
  var PREFIX_COUNTER = 0;
  function CompiledArgument(name, lvalue, rvalue) {
    this.name = name;
    this.lvalue = lvalue;
    this.rvalue = rvalue;
    this.count = 0;
  }
  function CompiledRoutine(body, args, thisVars, localVars) {
    this.body = body;
    this.args = args;
    this.thisVars = thisVars;
    this.localVars = localVars;
  }
  function isGlobal(identifier) {
    if (identifier === "eval") {
      throw new Error("cwise-parser: eval() not allowed");
    }
    if (typeof window !== "undefined") {
      return identifier in window;
    } else if (typeof GLOBAL !== "undefined") {
      return identifier in GLOBAL;
    } else if (typeof self !== "undefined") {
      return identifier in self;
    } else {
      return false;
    }
  }
  function getArgNames(ast) {
    var params = ast.body[0].expression.callee.params;
    var names = new Array(params.length);
    for (var i = 0; i < params.length; ++i) {
      names[i] = params[i].name;
    }
    return names;
  }
  function preprocess(func) {
    var src = ["(", func, ")()"].join("");
    var ast = esprima.parse(src, {range: true});
    var prefix = "_inline_" + (PREFIX_COUNTER++) + "_";
    var argNames = getArgNames(ast);
    var compiledArgs = new Array(argNames.length);
    for (var i = 0; i < argNames.length; ++i) {
      compiledArgs[i] = new CompiledArgument([prefix, "arg", i, "_"].join(""), false, false);
    }
    var exploded = new Array(src.length);
    for (var i = 0,
        n = src.length; i < n; ++i) {
      exploded[i] = src.charAt(i);
    }
    var localVars = [];
    var thisVars = [];
    var computedThis = false;
    function createLocal(id) {
      var nstr = prefix + id.replace(/\_/g, "__");
      localVars.push(nstr);
      return nstr;
    }
    function createThisVar(id) {
      var nstr = "this_" + id.replace(/\_/g, "__");
      thisVars.push(nstr);
      return nstr;
    }
    function rewrite(node, nstr) {
      var lo = node.range[0],
          hi = node.range[1];
      for (var i = lo + 1; i < hi; ++i) {
        exploded[i] = "";
      }
      exploded[lo] = nstr;
    }
    function escapeString(str) {
      return "'" + (str.replace(/\_/g, "\\_").replace(/\'/g, "\'")) + "'";
    }
    function source(node) {
      return exploded.slice(node.range[0], node.range[1]).join("");
    }
    var LVALUE = 1;
    var RVALUE = 2;
    function getUsage(node) {
      if (node.parent.type === "AssignmentExpression") {
        if (node.parent.left === node) {
          if (node.parent.operator === "=") {
            return LVALUE;
          }
          return LVALUE | RVALUE;
        }
      }
      if (node.parent.type === "UpdateExpression") {
        return LVALUE | RVALUE;
      }
      return RVALUE;
    }
    (function visit(node, parent) {
      node.parent = parent;
      if (node.type === "MemberExpression") {
        if (node.computed) {
          visit(node.object, node);
          visit(node.property, node);
        } else if (node.object.type === "ThisExpression") {
          rewrite(node, createThisVar(node.property.name));
        } else {
          visit(node.object, node);
        }
      } else if (node.type === "ThisExpression") {
        throw new Error("cwise-parser: Computed this is not allowed");
      } else if (node.type === "Identifier") {
        var name = node.name;
        var argNo = argNames.indexOf(name);
        if (argNo >= 0) {
          var carg = compiledArgs[argNo];
          var usage = getUsage(node);
          if (usage & LVALUE) {
            carg.lvalue = true;
          }
          if (usage & RVALUE) {
            carg.rvalue = true;
          }
          ++carg.count;
          rewrite(node, carg.name);
        } else if (isGlobal(name)) {} else {
          rewrite(node, createLocal(name));
        }
      } else if (node.type === "Literal") {
        if (typeof node.value === "string") {
          rewrite(node, escapeString(node.value));
        }
      } else if (node.type === "WithStatement") {
        throw new Error("cwise-parser: with() statements not allowed");
      } else {
        var keys = Object.keys(node);
        for (var i = 0,
            n = keys.length; i < n; ++i) {
          if (keys[i] === "parent") {
            continue;
          }
          var value = node[keys[i]];
          if (value) {
            if (value instanceof Array) {
              for (var j = 0; j < value.length; ++j) {
                if (value[j] && typeof value[j].type === "string") {
                  visit(value[j], node);
                }
              }
            } else if (typeof value.type === "string") {
              visit(value, node);
            }
          }
        }
      }
    })(ast.body[0].expression.callee.body, undefined);
    uniq(localVars);
    uniq(thisVars);
    var routine = new CompiledRoutine(source(ast.body[0].expression.callee.body), compiledArgs, thisVars, localVars);
    return routine;
  }
  module.exports = preprocess;
  global.define = __define;
  return module.exports;
});

System.register("npm:ndarray-fft@0.1.0/lib/fft-matrix", ["npm:bit-twiddle@0.0.2"], true, function(require, exports, module) {
  var global = System.global,
      __define = global.define;
  global.define = undefined;
  var bits = require("npm:bit-twiddle@0.0.2");
  function fft(dir, nrows, ncols, buffer, x_ptr, y_ptr, scratch_ptr) {
    dir |= 0;
    nrows |= 0;
    ncols |= 0;
    x_ptr |= 0;
    y_ptr |= 0;
    if (bits.isPow2(ncols)) {
      fftRadix2(dir, nrows, ncols, buffer, x_ptr, y_ptr);
    } else {
      fftBluestein(dir, nrows, ncols, buffer, x_ptr, y_ptr, scratch_ptr);
    }
  }
  module.exports = fft;
  function scratchMemory(n) {
    if (bits.isPow2(n)) {
      return 0;
    }
    return 2 * n + 4 * bits.nextPow2(2 * n + 1);
  }
  module.exports.scratchMemory = scratchMemory;
  function fftRadix2(dir, nrows, ncols, buffer, x_ptr, y_ptr) {
    dir |= 0;
    nrows |= 0;
    ncols |= 0;
    x_ptr |= 0;
    y_ptr |= 0;
    var nn,
        i,
        i1,
        j,
        k,
        i2,
        l,
        l1,
        l2;
    var c1,
        c2,
        t,
        t1,
        t2,
        u1,
        u2,
        z,
        row,
        a,
        b,
        c,
        d,
        k1,
        k2,
        k3;
    nn = ncols;
    m = bits.log2(nn);
    for (row = 0; row < nrows; ++row) {
      i2 = nn >> 1;
      j = 0;
      for (i = 0; i < nn - 1; i++) {
        if (i < j) {
          t = buffer[x_ptr + i];
          buffer[x_ptr + i] = buffer[x_ptr + j];
          buffer[x_ptr + j] = t;
          t = buffer[y_ptr + i];
          buffer[y_ptr + i] = buffer[y_ptr + j];
          buffer[y_ptr + j] = t;
        }
        k = i2;
        while (k <= j) {
          j -= k;
          k >>= 1;
        }
        j += k;
      }
      c1 = -1.0;
      c2 = 0.0;
      l2 = 1;
      for (l = 0; l < m; l++) {
        l1 = l2;
        l2 <<= 1;
        u1 = 1.0;
        u2 = 0.0;
        for (j = 0; j < l1; j++) {
          for (i = j; i < nn; i += l2) {
            i1 = i + l1;
            a = buffer[x_ptr + i1];
            b = buffer[y_ptr + i1];
            c = buffer[x_ptr + i];
            d = buffer[y_ptr + i];
            k1 = u1 * (a + b);
            k2 = a * (u2 - u1);
            k3 = b * (u1 + u2);
            t1 = k1 - k3;
            t2 = k1 + k2;
            buffer[x_ptr + i1] = c - t1;
            buffer[y_ptr + i1] = d - t2;
            buffer[x_ptr + i] += t1;
            buffer[y_ptr + i] += t2;
          }
          k1 = c1 * (u1 + u2);
          k2 = u1 * (c2 - c1);
          k3 = u2 * (c1 + c2);
          u1 = k1 - k3;
          u2 = k1 + k2;
        }
        c2 = Math.sqrt((1.0 - c1) / 2.0);
        if (dir < 0) {
          c2 = -c2;
        }
        c1 = Math.sqrt((1.0 + c1) / 2.0);
      }
      if (dir < 0) {
        var scale_f = 1.0 / nn;
        for (i = 0; i < nn; i++) {
          buffer[x_ptr + i] *= scale_f;
          buffer[y_ptr + i] *= scale_f;
        }
      }
      x_ptr += ncols;
      y_ptr += ncols;
    }
  }
  function fftBluestein(dir, nrows, ncols, buffer, x_ptr, y_ptr, scratch_ptr) {
    dir |= 0;
    nrows |= 0;
    ncols |= 0;
    x_ptr |= 0;
    y_ptr |= 0;
    scratch_ptr |= 0;
    var m = bits.nextPow2(2 * ncols + 1),
        cos_ptr = scratch_ptr,
        sin_ptr = cos_ptr + ncols,
        xs_ptr = sin_ptr + ncols,
        ys_ptr = xs_ptr + m,
        cft_ptr = ys_ptr + m,
        sft_ptr = cft_ptr + m,
        w = -dir * Math.PI / ncols,
        row,
        a,
        b,
        c,
        d,
        k1,
        k2,
        k3,
        i;
    for (i = 0; i < ncols; ++i) {
      a = w * ((i * i) % (ncols * 2));
      c = Math.cos(a);
      d = Math.sin(a);
      buffer[cft_ptr + (m - i)] = buffer[cft_ptr + i] = buffer[cos_ptr + i] = c;
      buffer[sft_ptr + (m - i)] = buffer[sft_ptr + i] = buffer[sin_ptr + i] = d;
    }
    for (i = ncols; i <= m - ncols; ++i) {
      buffer[cft_ptr + i] = 0.0;
    }
    for (i = ncols; i <= m - ncols; ++i) {
      buffer[sft_ptr + i] = 0.0;
    }
    fftRadix2(1, 1, m, buffer, cft_ptr, sft_ptr);
    if (dir < 0) {
      w = 1.0 / ncols;
    } else {
      w = 1.0;
    }
    for (row = 0; row < nrows; ++row) {
      for (i = 0; i < ncols; ++i) {
        a = buffer[x_ptr + i];
        b = buffer[y_ptr + i];
        c = buffer[cos_ptr + i];
        d = -buffer[sin_ptr + i];
        k1 = c * (a + b);
        k2 = a * (d - c);
        k3 = b * (c + d);
        buffer[xs_ptr + i] = k1 - k3;
        buffer[ys_ptr + i] = k1 + k2;
      }
      for (i = ncols; i < m; ++i) {
        buffer[xs_ptr + i] = 0.0;
      }
      for (i = ncols; i < m; ++i) {
        buffer[ys_ptr + i] = 0.0;
      }
      fftRadix2(1, 1, m, buffer, xs_ptr, ys_ptr);
      for (i = 0; i < m; ++i) {
        a = buffer[xs_ptr + i];
        b = buffer[ys_ptr + i];
        c = buffer[cft_ptr + i];
        d = buffer[sft_ptr + i];
        k1 = c * (a + b);
        k2 = a * (d - c);
        k3 = b * (c + d);
        buffer[xs_ptr + i] = k1 - k3;
        buffer[ys_ptr + i] = k1 + k2;
      }
      fftRadix2(-1, 1, m, buffer, xs_ptr, ys_ptr);
      for (i = 0; i < ncols; ++i) {
        a = buffer[xs_ptr + i];
        b = buffer[ys_ptr + i];
        c = buffer[cos_ptr + i];
        d = -buffer[sin_ptr + i];
        k1 = c * (a + b);
        k2 = a * (d - c);
        k3 = b * (c + d);
        buffer[x_ptr + i] = w * (k1 - k3);
        buffer[y_ptr + i] = w * (k1 + k2);
      }
      x_ptr += ncols;
      y_ptr += ncols;
    }
  }
  global.define = __define;
  return module.exports;
});

System.register("npm:typedarray-pool@0.1.2/pool", ["npm:bit-twiddle@0.0.2", "npm:dup@0.0.0"], true, function(require, exports, module) {
  var global = System.global,
      __define = global.define;
  global.define = undefined;
  "use strict";
  var bits = require("npm:bit-twiddle@0.0.2");
  var dup = require("npm:dup@0.0.0");
  if (!global.__TYPEDARRAY_POOL) {
    global.__TYPEDARRAY_POOL = {
      UINT8: dup([32, 0]),
      UINT16: dup([32, 0]),
      UINT32: dup([32, 0]),
      INT8: dup([32, 0]),
      INT16: dup([32, 0]),
      INT32: dup([32, 0]),
      FLOAT: dup([32, 0]),
      DOUBLE: dup([32, 0]),
      DATA: dup([32, 0])
    };
  }
  var POOL = global.__TYPEDARRAY_POOL;
  var UINT8 = POOL.UINT8,
      UINT16 = POOL.UINT16,
      UINT32 = POOL.UINT32,
      INT8 = POOL.INT8,
      INT16 = POOL.INT16,
      INT32 = POOL.INT32,
      FLOAT = POOL.FLOAT,
      DOUBLE = POOL.DOUBLE,
      DATA = POOL.DATA;
  exports.free = function free(array) {
    if (array instanceof ArrayBuffer) {
      var n = array.byteLength | 0,
          log_n = bits.log2(n);
      DATA[log_n].push(array);
    } else {
      var n = array.length | 0,
          log_n = bits.log2(n);
      if (array instanceof Uint8Array) {
        UINT8[log_n].push(array);
      } else if (array instanceof Uint16Array) {
        UINT16[log_n].push(array);
      } else if (array instanceof Uint32Array) {
        UINT32[log_n].push(array);
      } else if (array instanceof Int8Array) {
        INT8[log_n].push(array);
      } else if (array instanceof Int16Array) {
        INT16[log_n].push(array);
      } else if (array instanceof Int32Array) {
        INT32[log_n].push(array);
      } else if (array instanceof Float32Array) {
        FLOAT[log_n].push(array);
      } else if (array instanceof Float64Array) {
        DOUBLE[log_n].push(array);
      }
    }
  };
  exports.freeUint8 = function freeUint8(array) {
    UINT8[bits.log2(array.length)].push(array);
  };
  exports.freeUint16 = function freeUint16(array) {
    UINT16[bits.log2(array.length)].push(array);
  };
  exports.freeUint32 = function freeUint32(array) {
    UINT32[bits.log2(array.length)].push(array);
  };
  exports.freeInt8 = function freeInt8(array) {
    INT8[bits.log2(array.length)].push(array);
  };
  exports.freeInt16 = function freeInt16(array) {
    INT16[bits.log2(array.length)].push(array);
  };
  exports.freeInt32 = function freeInt32(array) {
    INT32[bits.log2(array.length)].push(array);
  };
  exports.freeFloat32 = exports.freeFloat = function freeFloat(array) {
    FLOAT[bits.log2(array.length)].push(array);
  };
  exports.freeFloat64 = exports.freeDouble = function freeDouble(array) {
    DOUBLE[bits.log2(array.length)].push(array);
  };
  exports.freeArrayBuffer = function freeArrayBuffer(array) {
    DATA[bits.log2(array.length)].push(array);
  };
  exports.malloc = function malloc(n, dtype) {
    n = bits.nextPow2(n);
    var log_n = bits.log2(n);
    if (dtype === undefined) {
      var d = DATA[log_n];
      if (d.length > 0) {
        var r = d[d.length - 1];
        d.pop();
        return r;
      }
      return new ArrayBuffer(n);
    } else {
      switch (dtype) {
        case "uint8":
          var u8 = UINT8[log_n];
          if (u8.length > 0) {
            return u8.pop();
          }
          return new Uint8Array(n);
          break;
        case "uint16":
          var u16 = UINT16[log_n];
          if (u16.length > 0) {
            return u16.pop();
          }
          return new Uint16Array(n);
          break;
        case "uint32":
          var u32 = UINT32[log_n];
          if (u32.length > 0) {
            return u32.pop();
          }
          return new Uint32Array(n);
          break;
        case "int8":
          var i8 = INT8[log_n];
          if (i8.length > 0) {
            return i8.pop();
          }
          return new Int8Array(n);
          break;
        case "int16":
          var i16 = INT16[log_n];
          if (i16.length > 0) {
            return i16.pop();
          }
          return new Int16Array(n);
          break;
        case "int32":
          var i32 = INT32[log_n];
          if (i32.length > 0) {
            return i32.pop();
          }
          return new Int32Array(n);
          break;
        case "float":
        case "float32":
          var f = FLOAT[log_n];
          if (f.length > 0) {
            return f.pop();
          }
          return new Float32Array(n);
          break;
        case "double":
        case "float64":
          var dd = DOUBLE[log_n];
          if (dd.length > 0) {
            return dd.pop();
          }
          return new Float64Array(n);
          break;
        default:
          return null;
      }
    }
    return null;
  };
  exports.mallocUint8 = function mallocUint8(n) {
    n = bits.nextPow2(n);
    var log_n = bits.log2(n);
    var cache = UINT8[log_n];
    if (cache.length > 0) {
      return cache.pop();
    }
    return new Uint8Array(n);
  };
  exports.mallocUint16 = function mallocUint16(n) {
    n = bits.nextPow2(n);
    var log_n = bits.log2(n);
    var cache = UINT16[log_n];
    if (cache.length > 0) {
      return cache.pop();
    }
    return new Uint16Array(n);
  };
  exports.mallocUint32 = function mallocUint32(n) {
    n = bits.nextPow2(n);
    var log_n = bits.log2(n);
    var cache = UINT32[log_n];
    if (cache.length > 0) {
      return cache.pop();
    }
    return new Uint32Array(n);
  };
  exports.mallocInt8 = function mallocInt8(n) {
    n = bits.nextPow2(n);
    var log_n = bits.log2(n);
    var cache = INT8[log_n];
    if (cache.length > 0) {
      return cache.pop();
    }
    return new Int8Array(n);
  };
  exports.mallocInt16 = function mallocInt16(n) {
    n = bits.nextPow2(n);
    var log_n = bits.log2(n);
    var cache = INT16[log_n];
    if (cache.length > 0) {
      return cache.pop();
    }
    return new Int16Array(n);
  };
  exports.mallocInt32 = function mallocInt32(n) {
    n = bits.nextPow2(n);
    var log_n = bits.log2(n);
    var cache = INT32[log_n];
    if (cache.length > 0) {
      return cache.pop();
    }
    return new Int32Array(n);
  };
  exports.mallocFloat32 = exports.mallocFloat = function mallocFloat(n) {
    n = bits.nextPow2(n);
    var log_n = bits.log2(n);
    var cache = FLOAT[log_n];
    if (cache.length > 0) {
      return cache.pop();
    }
    return new Float32Array(n);
  };
  exports.mallocFloat64 = exports.mallocDouble = function mallocDouble(n) {
    n = bits.nextPow2(n);
    var log_n = bits.log2(n);
    var cache = DOUBLE[log_n];
    if (cache.length > 0) {
      return cache.pop();
    }
    return new Float64Array(n);
  };
  exports.mallocArrayBuffer = function mallocArrayBuffer(n) {
    n = bits.nextPow2(n);
    var log_n = bits.log2(n);
    var cache = DATA[log_n];
    if (cache.length > 0) {
      return cache.pop();
    }
    return new ArrayBuffer(n);
  };
  exports.clearCache = function clearCache() {
    for (var i = 0; i < 32; ++i) {
      UINT8[i].length = 0;
      UINT16[i].length = 0;
      UINT32[i].length = 0;
      INT8[i].length = 0;
      INT16[i].length = 0;
      INT32[i].length = 0;
      FLOAT[i].length = 0;
      DOUBLE[i].length = 0;
      DATA[i].length = 0;
    }
  };
  global.define = __define;
  return module.exports;
});

System.register("npm:typedarray-pool@1.1.0/pool", ["npm:bit-twiddle@1.0.2", "npm:dup@1.0.0", "github:jspm/nodelibs-buffer@0.1.0"], true, function(require, exports, module) {
  var global = System.global,
      __define = global.define;
  global.define = undefined;
  (function(Buffer) {
    'use strict';
    var bits = require("npm:bit-twiddle@1.0.2");
    var dup = require("npm:dup@1.0.0");
    if (!global.__TYPEDARRAY_POOL) {
      global.__TYPEDARRAY_POOL = {
        UINT8: dup([32, 0]),
        UINT16: dup([32, 0]),
        UINT32: dup([32, 0]),
        INT8: dup([32, 0]),
        INT16: dup([32, 0]),
        INT32: dup([32, 0]),
        FLOAT: dup([32, 0]),
        DOUBLE: dup([32, 0]),
        DATA: dup([32, 0]),
        UINT8C: dup([32, 0]),
        BUFFER: dup([32, 0])
      };
    }
    var hasUint8C = (typeof Uint8ClampedArray) !== 'undefined';
    var POOL = global.__TYPEDARRAY_POOL;
    if (!POOL.UINT8C) {
      POOL.UINT8C = dup([32, 0]);
    }
    if (!POOL.BUFFER) {
      POOL.BUFFER = dup([32, 0]);
    }
    var DATA = POOL.DATA,
        BUFFER = POOL.BUFFER;
    exports.free = function free(array) {
      if (Buffer.isBuffer(array)) {
        BUFFER[bits.log2(array.length)].push(array);
      } else {
        if (Object.prototype.toString.call(array) !== '[object ArrayBuffer]') {
          array = array.buffer;
        }
        if (!array) {
          return ;
        }
        var n = array.length || array.byteLength;
        var log_n = bits.log2(n) | 0;
        DATA[log_n].push(array);
      }
    };
    function freeArrayBuffer(buffer) {
      if (!buffer) {
        return ;
      }
      var n = buffer.length || buffer.byteLength;
      var log_n = bits.log2(n);
      DATA[log_n].push(buffer);
    }
    function freeTypedArray(array) {
      freeArrayBuffer(array.buffer);
    }
    exports.freeUint8 = exports.freeUint16 = exports.freeUint32 = exports.freeInt8 = exports.freeInt16 = exports.freeInt32 = exports.freeFloat32 = exports.freeFloat = exports.freeFloat64 = exports.freeDouble = exports.freeUint8Clamped = exports.freeDataView = freeTypedArray;
    exports.freeArrayBuffer = freeArrayBuffer;
    exports.freeBuffer = function freeBuffer(array) {
      BUFFER[bits.log2(array.length)].push(array);
    };
    exports.malloc = function malloc(n, dtype) {
      if (dtype === undefined || dtype === 'arraybuffer') {
        return mallocArrayBuffer(n);
      } else {
        switch (dtype) {
          case 'uint8':
            return mallocUint8(n);
          case 'uint16':
            return mallocUint16(n);
          case 'uint32':
            return mallocUint32(n);
          case 'int8':
            return mallocInt8(n);
          case 'int16':
            return mallocInt16(n);
          case 'int32':
            return mallocInt32(n);
          case 'float':
          case 'float32':
            return mallocFloat(n);
          case 'double':
          case 'float64':
            return mallocDouble(n);
          case 'uint8_clamped':
            return mallocUint8Clamped(n);
          case 'buffer':
            return mallocBuffer(n);
          case 'data':
          case 'dataview':
            return mallocDataView(n);
          default:
            return null;
        }
      }
      return null;
    };
    function mallocArrayBuffer(n) {
      var n = bits.nextPow2(n);
      var log_n = bits.log2(n);
      var d = DATA[log_n];
      if (d.length > 0) {
        return d.pop();
      }
      return new ArrayBuffer(n);
    }
    exports.mallocArrayBuffer = mallocArrayBuffer;
    function mallocUint8(n) {
      return new Uint8Array(mallocArrayBuffer(n), 0, n);
    }
    exports.mallocUint8 = mallocUint8;
    function mallocUint16(n) {
      return new Uint16Array(mallocArrayBuffer(2 * n), 0, n);
    }
    exports.mallocUint16 = mallocUint16;
    function mallocUint32(n) {
      return new Uint32Array(mallocArrayBuffer(4 * n), 0, n);
    }
    exports.mallocUint32 = mallocUint32;
    function mallocInt8(n) {
      return new Int8Array(mallocArrayBuffer(n), 0, n);
    }
    exports.mallocInt8 = mallocInt8;
    function mallocInt16(n) {
      return new Int16Array(mallocArrayBuffer(2 * n), 0, n);
    }
    exports.mallocInt16 = mallocInt16;
    function mallocInt32(n) {
      return new Int32Array(mallocArrayBuffer(4 * n), 0, n);
    }
    exports.mallocInt32 = mallocInt32;
    function mallocFloat(n) {
      return new Float32Array(mallocArrayBuffer(4 * n), 0, n);
    }
    exports.mallocFloat32 = exports.mallocFloat = mallocFloat;
    function mallocDouble(n) {
      return new Float64Array(mallocArrayBuffer(8 * n), 0, n);
    }
    exports.mallocFloat64 = exports.mallocDouble = mallocDouble;
    function mallocUint8Clamped(n) {
      if (hasUint8C) {
        return new Uint8ClampedArray(mallocArrayBuffer(n), 0, n);
      } else {
        return mallocUint8(n);
      }
    }
    exports.mallocUint8Clamped = mallocUint8Clamped;
    function mallocDataView(n) {
      return new DataView(mallocArrayBuffer(n), 0, n);
    }
    exports.mallocDataView = mallocDataView;
    function mallocBuffer(n) {
      n = bits.nextPow2(n);
      var log_n = bits.log2(n);
      var cache = BUFFER[log_n];
      if (cache.length > 0) {
        return cache.pop();
      }
      return new Buffer(n);
    }
    exports.mallocBuffer = mallocBuffer;
    exports.clearCache = function clearCache() {
      for (var i = 0; i < 32; ++i) {
        POOL.UINT8[i].length = 0;
        POOL.UINT16[i].length = 0;
        POOL.UINT32[i].length = 0;
        POOL.INT8[i].length = 0;
        POOL.INT16[i].length = 0;
        POOL.INT32[i].length = 0;
        POOL.FLOAT[i].length = 0;
        POOL.DOUBLE[i].length = 0;
        POOL.UINT8C[i].length = 0;
        DATA[i].length = 0;
        BUFFER[i].length = 0;
      }
    };
  })(require("github:jspm/nodelibs-buffer@0.1.0").Buffer);
  global.define = __define;
  return module.exports;
});

System.register("npm:gl-vao@0.0.3/vao", ["npm:webglew@0.0.0", "npm:gl-vao@0.0.3/lib/vao-native", "npm:gl-vao@0.0.3/lib/vao-emulated"], true, function(require, exports, module) {
  var global = System.global,
      __define = global.define;
  global.define = undefined;
  "use strict";
  var webglew = require("npm:webglew@0.0.0");
  var createVAONative = require("npm:gl-vao@0.0.3/lib/vao-native");
  var createVAOEmulated = require("npm:gl-vao@0.0.3/lib/vao-emulated");
  function createVAO(gl, elements, attributes) {
    var ext = webglew(gl).OES_vertex_array_object;
    var vao;
    if (ext) {
      vao = createVAONative(gl, ext);
    } else {
      vao = createVAOEmulated(gl);
    }
    vao.update(elements, attributes);
    return vao;
  }
  module.exports = createVAO;
  global.define = __define;
  return module.exports;
});

System.register("npm:cwise-compiler@0.1.0/compiler", ["npm:cwise-compiler@0.1.0/lib/thunk"], true, function(require, exports, module) {
  var global = System.global,
      __define = global.define;
  global.define = undefined;
  "use strict";
  var createThunk = require("npm:cwise-compiler@0.1.0/lib/thunk");
  function Procedure() {
    this.argTypes = [];
    this.shimArgs = [];
    this.arrayArgs = [];
    this.scalarArgs = [];
    this.offsetArgs = [];
    this.offsetArgIndex = [];
    this.indexArgs = [];
    this.shapeArgs = [];
    this.funcName = "";
    this.pre = null;
    this.body = null;
    this.post = null;
    this.debug = false;
  }
  function compileCwise(user_args) {
    var proc = new Procedure();
    proc.pre = user_args.pre;
    proc.body = user_args.body;
    proc.post = user_args.post;
    var proc_args = user_args.args.slice(0);
    proc.argTypes = proc_args.slice(0);
    for (var i = 0; i < proc_args.length; ++i) {
      var arg_type = proc_args[i];
      if (arg_type === "array") {
        proc.arrayArgs.push(i);
        proc.shimArgs.push("array" + i);
        if (i < proc.pre.args.length && proc.pre.args[i].count > 0) {
          throw new Error("cwise: pre() block may not reference array args");
        }
        if (i < proc.post.args.length && proc.post.args[i].count > 0) {
          throw new Error("cwise: post() block may not reference array args");
        }
      } else if (arg_type === "scalar") {
        proc.scalarArgs.push(i);
        proc.shimArgs.push("scalar" + i);
      } else if (arg_type === "index") {
        proc.indexArgs.push(i);
        if (i < proc.pre.args.length && proc.pre.args[i].count > 0) {
          throw new Error("cwise: pre() block may not reference array index");
        }
        if (i < proc.body.args.length && proc.body.args[i].lvalue) {
          throw new Error("cwise: body() block may not write to array index");
        }
        if (i < proc.post.args.length && proc.post.args[i].count > 0) {
          throw new Error("cwise: post() block may not reference array index");
        }
      } else if (arg_type === "shape") {
        proc.shapeArgs.push(i);
        if (i < proc.pre.args.length && proc.pre.args[i].lvalue) {
          throw new Error("cwise: pre() block may not write to array shape");
        }
        if (i < proc.body.args.length && proc.body.args[i].lvalue) {
          throw new Error("cwise: body() block may not write to array shape");
        }
        if (i < proc.post.args.length && proc.post.args[i].lvalue) {
          throw new Error("cwise: post() block may not write to array shape");
        }
      } else if (typeof arg_type === "object" && arg_type.offset) {
        proc.argTypes[i] = "offset";
        proc.offsetArgs.push({
          array: arg_type.array,
          offset: arg_type.offset
        });
        proc.offsetArgIndex.push(i);
      } else {
        throw new Error("cwise: Unknown argument type " + proc_args[i]);
      }
    }
    if (proc.arrayArgs.length <= 0) {
      throw new Error("cwise: No array arguments specified");
    }
    if (proc.pre.args.length > proc_args.length) {
      throw new Error("cwise: Too many arguments in pre() block");
    }
    if (proc.body.args.length > proc_args.length) {
      throw new Error("cwise: Too many arguments in body() block");
    }
    if (proc.post.args.length > proc_args.length) {
      throw new Error("cwise: Too many arguments in post() block");
    }
    proc.debug = !!user_args.printCode || !!user_args.debug;
    proc.funcName = user_args.funcName || "cwise";
    proc.blockSize = user_args.blockSize || 64;
    return createThunk(proc);
  }
  module.exports = compileCwise;
  global.define = __define;
  return module.exports;
});

System.register("npm:greedy-mesher@1.0.2/greedy", ["npm:typedarray-pool@1.1.0", "npm:uniq@1.0.1", "npm:iota-array@1.0.0"], true, function(require, exports, module) {
  var global = System.global,
      __define = global.define;
  global.define = undefined;
  "use strict";
  var pool = require("npm:typedarray-pool@1.1.0");
  var uniq = require("npm:uniq@1.0.1");
  var iota = require("npm:iota-array@1.0.0");
  function generateMesher(order, skip, merge, append, num_options, options, useGetter) {
    var code = [];
    var d = order.length;
    var i,
        j,
        k;
    var append_args = new Array(2 * d + 1 + num_options);
    for (i = 0; i < d; ++i) {
      append_args[i] = "i" + i;
    }
    for (i = 0; i < d; ++i) {
      append_args[i + d] = "j" + i;
    }
    append_args[2 * d] = "oval";
    var opt_args = new Array(num_options);
    for (i = 0; i < num_options; ++i) {
      opt_args[i] = "opt" + i;
      append_args[2 * d + 1 + i] = "opt" + i;
    }
    code.push("var data=array.data,offset=array.offset,shape=array.shape,stride=array.stride");
    for (var i = 0; i < d; ++i) {
      code.push(["var stride", i, "=stride[", order[i], "]|0,shape", i, "=shape[", order[i], "]|0"].join(""));
      if (i > 0) {
        code.push(["var astep", i, "=(stride", i, "-stride", i - 1, "*shape", i - 1, ")|0"].join(""));
      } else {
        code.push(["var astep", i, "=stride", i, "|0"].join(""));
      }
      if (i > 0) {
        code.push(["var vstep", i, "=(vstep", i - 1, "*shape", i - 1, ")|0"].join(""));
      } else {
        code.push(["var vstep", i, "=1"].join(""));
      }
      code.push(["var i", i, "=0,j", i, "=0,k", i, "=0,ustep", i, "=vstep", i, "|0,bstep", i, "=astep", i, "|0"].join(""));
    }
    code.push("var a_ptr=offset>>>0,b_ptr=0,u_ptr=0,v_ptr=0,i=0,d=0,val=0,oval=0");
    code.push("var count=" + iota(d).map(function(i) {
      return "shape" + i;
    }).join("*"));
    code.push("var visited=mallocUint8(count)");
    code.push("for(;i<count;++i){visited[i]=0}");
    for (i = d - 1; i >= 0; --i) {
      code.push(["for(i", i, "=0;i", i, "<shape", i, ";++i", i, "){"].join(""));
    }
    code.push("if(!visited[v_ptr]){");
    if (useGetter) {
      code.push("val=data.get(a_ptr)");
    } else {
      code.push("val=data[a_ptr]");
    }
    if (skip) {
      code.push("if(!skip(val)){");
    } else {
      code.push("if(val!==0){");
    }
    code.push("oval = val");
    for (i = 0; i < d; ++i) {
      code.push("u_ptr=v_ptr+vstep" + i);
      code.push("b_ptr=a_ptr+stride" + i);
      code.push(["j", i, "_loop: for(j", i, "=1+i", i, ";j", i, "<shape", i, ";++j", i, "){"].join(""));
      for (j = i - 1; j >= 0; --j) {
        code.push(["for(k", j, "=i", j, ";k", j, "<j", j, ";++k", j, "){"].join(""));
      }
      code.push("if(visited[u_ptr]) { break j" + i + "_loop; }");
      if (useGetter) {
        code.push("val=data.get(b_ptr)");
      } else {
        code.push("val=data[b_ptr]");
      }
      if (skip && merge) {
        code.push("if(skip(val) || !merge(oval,val)){ break j" + i + "_loop; }");
      } else if (skip) {
        code.push("if(skip(val) || val !== oval){ break j" + i + "_loop; }");
      } else if (merge) {
        code.push("if(val === 0 || !merge(oval,val)){ break j" + i + "_loop; }");
      } else {
        code.push("if(val === 0 || val !== oval){ break j" + i + "_loop; }");
      }
      code.push("++u_ptr");
      code.push("b_ptr+=stride0");
      code.push("}");
      for (j = 1; j <= i; ++j) {
        code.push("u_ptr+=ustep" + j);
        code.push("b_ptr+=bstep" + j);
        code.push("}");
      }
      if (i < d - 1) {
        code.push("d=j" + i + "-i" + i);
        code.push(["ustep", i + 1, "=(vstep", i + 1, "-vstep", i, "*d)|0"].join(""));
        code.push(["bstep", i + 1, "=(stride", i + 1, "-stride", i, "*d)|0"].join(""));
      }
    }
    code.push("u_ptr=v_ptr");
    for (i = d - 1; i >= 0; --i) {
      code.push(["for(k", i, "=i", i, ";k", i, "<j", i, ";++k", i, "){"].join(""));
    }
    code.push("visited[u_ptr++]=1");
    code.push("}");
    for (i = 1; i < d; ++i) {
      code.push("u_ptr+=ustep" + i);
      code.push("}");
    }
    code.push("append(" + append_args.join(",") + ")");
    code.push("}");
    code.push("}");
    code.push("++v_ptr");
    for (var i = 0; i < d; ++i) {
      code.push("a_ptr+=astep" + i);
      code.push("}");
    }
    code.push("freeUint8(visited)");
    if (options.debug) {
      console.log("GENERATING MESHER:");
      console.log(code.join("\n"));
    }
    var args = ["append", "mallocUint8", "freeUint8"];
    if (merge) {
      args.unshift("merge");
    }
    if (skip) {
      args.unshift("skip");
    }
    var local_args = ["array"].concat(opt_args);
    var funcName = ["greedyMesher", d, "d_ord", order.join("s"), (skip ? "skip" : ""), (merge ? "merge" : "")].join("");
    var gen_body = ["'use strict';function ", funcName, "(", local_args.join(","), "){", code.join("\n"), "};return ", funcName].join("");
    args.push(gen_body);
    var proc = Function.apply(undefined, args);
    if (skip && merge) {
      return proc(skip, merge, append, pool.mallocUint8, pool.freeUint8);
    } else if (skip) {
      return proc(skip, append, pool.mallocUint8, pool.freeUint8);
    } else if (merge) {
      return proc(merge, append, pool.mallocUint8, pool.freeUint8);
    } else {
      return proc(append, pool.mallocUint8, pool.freeUint8);
    }
  }
  function compileMesher(options) {
    options = options || {};
    if (!options.order) {
      throw new Error("greedy-mesher: Missing order field");
    }
    if (!options.append) {
      throw new Error("greedy-mesher: Missing append field");
    }
    return generateMesher(options.order, options.skip, options.merge, options.append, options.extraArgs | 0, options, !!options.useGetter);
  }
  module.exports = compileMesher;
  global.define = __define;
  return module.exports;
});

System.register("npm:readable-stream@1.1.13/lib/_stream_readable", ["npm:isarray@0.0.1", "github:jspm/nodelibs-buffer@0.1.0", "github:jspm/nodelibs-events@0.1.1", "npm:stream-browserify@1.0.0/index", "npm:core-util-is@1.0.1", "npm:inherits@2.0.1", "@empty", "npm:readable-stream@1.1.13/lib/_stream_duplex", "npm:string_decoder@0.10.31", "npm:readable-stream@1.1.13/lib/_stream_duplex", "npm:string_decoder@0.10.31", "github:jspm/nodelibs-buffer@0.1.0", "github:jspm/nodelibs-process@0.1.1"], true, function(require, exports, module) {
  var global = System.global,
      __define = global.define;
  global.define = undefined;
  (function(Buffer, process) {
    module.exports = Readable;
    var isArray = require("npm:isarray@0.0.1");
    var Buffer = require("github:jspm/nodelibs-buffer@0.1.0").Buffer;
    Readable.ReadableState = ReadableState;
    var EE = require("github:jspm/nodelibs-events@0.1.1").EventEmitter;
    if (!EE.listenerCount)
      EE.listenerCount = function(emitter, type) {
        return emitter.listeners(type).length;
      };
    var Stream = require("npm:stream-browserify@1.0.0/index");
    var util = require("npm:core-util-is@1.0.1");
    util.inherits = require("npm:inherits@2.0.1");
    var StringDecoder;
    var debug = require("@empty");
    if (debug && debug.debuglog) {
      debug = debug.debuglog('stream');
    } else {
      debug = function() {};
    }
    util.inherits(Readable, Stream);
    function ReadableState(options, stream) {
      var Duplex = require("npm:readable-stream@1.1.13/lib/_stream_duplex");
      options = options || {};
      var hwm = options.highWaterMark;
      var defaultHwm = options.objectMode ? 16 : 16 * 1024;
      this.highWaterMark = (hwm || hwm === 0) ? hwm : defaultHwm;
      this.highWaterMark = ~~this.highWaterMark;
      this.buffer = [];
      this.length = 0;
      this.pipes = null;
      this.pipesCount = 0;
      this.flowing = null;
      this.ended = false;
      this.endEmitted = false;
      this.reading = false;
      this.sync = true;
      this.needReadable = false;
      this.emittedReadable = false;
      this.readableListening = false;
      this.objectMode = !!options.objectMode;
      if (stream instanceof Duplex)
        this.objectMode = this.objectMode || !!options.readableObjectMode;
      this.defaultEncoding = options.defaultEncoding || 'utf8';
      this.ranOut = false;
      this.awaitDrain = 0;
      this.readingMore = false;
      this.decoder = null;
      this.encoding = null;
      if (options.encoding) {
        if (!StringDecoder)
          StringDecoder = require("npm:string_decoder@0.10.31").StringDecoder;
        this.decoder = new StringDecoder(options.encoding);
        this.encoding = options.encoding;
      }
    }
    function Readable(options) {
      var Duplex = require("npm:readable-stream@1.1.13/lib/_stream_duplex");
      if (!(this instanceof Readable))
        return new Readable(options);
      this._readableState = new ReadableState(options, this);
      this.readable = true;
      Stream.call(this);
    }
    Readable.prototype.push = function(chunk, encoding) {
      var state = this._readableState;
      if (util.isString(chunk) && !state.objectMode) {
        encoding = encoding || state.defaultEncoding;
        if (encoding !== state.encoding) {
          chunk = new Buffer(chunk, encoding);
          encoding = '';
        }
      }
      return readableAddChunk(this, state, chunk, encoding, false);
    };
    Readable.prototype.unshift = function(chunk) {
      var state = this._readableState;
      return readableAddChunk(this, state, chunk, '', true);
    };
    function readableAddChunk(stream, state, chunk, encoding, addToFront) {
      var er = chunkInvalid(state, chunk);
      if (er) {
        stream.emit('error', er);
      } else if (util.isNullOrUndefined(chunk)) {
        state.reading = false;
        if (!state.ended)
          onEofChunk(stream, state);
      } else if (state.objectMode || chunk && chunk.length > 0) {
        if (state.ended && !addToFront) {
          var e = new Error('stream.push() after EOF');
          stream.emit('error', e);
        } else if (state.endEmitted && addToFront) {
          var e = new Error('stream.unshift() after end event');
          stream.emit('error', e);
        } else {
          if (state.decoder && !addToFront && !encoding)
            chunk = state.decoder.write(chunk);
          if (!addToFront)
            state.reading = false;
          if (state.flowing && state.length === 0 && !state.sync) {
            stream.emit('data', chunk);
            stream.read(0);
          } else {
            state.length += state.objectMode ? 1 : chunk.length;
            if (addToFront)
              state.buffer.unshift(chunk);
            else
              state.buffer.push(chunk);
            if (state.needReadable)
              emitReadable(stream);
          }
          maybeReadMore(stream, state);
        }
      } else if (!addToFront) {
        state.reading = false;
      }
      return needMoreData(state);
    }
    function needMoreData(state) {
      return !state.ended && (state.needReadable || state.length < state.highWaterMark || state.length === 0);
    }
    Readable.prototype.setEncoding = function(enc) {
      if (!StringDecoder)
        StringDecoder = require("npm:string_decoder@0.10.31").StringDecoder;
      this._readableState.decoder = new StringDecoder(enc);
      this._readableState.encoding = enc;
      return this;
    };
    var MAX_HWM = 0x800000;
    function roundUpToNextPowerOf2(n) {
      if (n >= MAX_HWM) {
        n = MAX_HWM;
      } else {
        n--;
        for (var p = 1; p < 32; p <<= 1)
          n |= n >> p;
        n++;
      }
      return n;
    }
    function howMuchToRead(n, state) {
      if (state.length === 0 && state.ended)
        return 0;
      if (state.objectMode)
        return n === 0 ? 0 : 1;
      if (isNaN(n) || util.isNull(n)) {
        if (state.flowing && state.buffer.length)
          return state.buffer[0].length;
        else
          return state.length;
      }
      if (n <= 0)
        return 0;
      if (n > state.highWaterMark)
        state.highWaterMark = roundUpToNextPowerOf2(n);
      if (n > state.length) {
        if (!state.ended) {
          state.needReadable = true;
          return 0;
        } else
          return state.length;
      }
      return n;
    }
    Readable.prototype.read = function(n) {
      debug('read', n);
      var state = this._readableState;
      var nOrig = n;
      if (!util.isNumber(n) || n > 0)
        state.emittedReadable = false;
      if (n === 0 && state.needReadable && (state.length >= state.highWaterMark || state.ended)) {
        debug('read: emitReadable', state.length, state.ended);
        if (state.length === 0 && state.ended)
          endReadable(this);
        else
          emitReadable(this);
        return null;
      }
      n = howMuchToRead(n, state);
      if (n === 0 && state.ended) {
        if (state.length === 0)
          endReadable(this);
        return null;
      }
      var doRead = state.needReadable;
      debug('need readable', doRead);
      if (state.length === 0 || state.length - n < state.highWaterMark) {
        doRead = true;
        debug('length less than watermark', doRead);
      }
      if (state.ended || state.reading) {
        doRead = false;
        debug('reading or ended', doRead);
      }
      if (doRead) {
        debug('do read');
        state.reading = true;
        state.sync = true;
        if (state.length === 0)
          state.needReadable = true;
        this._read(state.highWaterMark);
        state.sync = false;
      }
      if (doRead && !state.reading)
        n = howMuchToRead(nOrig, state);
      var ret;
      if (n > 0)
        ret = fromList(n, state);
      else
        ret = null;
      if (util.isNull(ret)) {
        state.needReadable = true;
        n = 0;
      }
      state.length -= n;
      if (state.length === 0 && !state.ended)
        state.needReadable = true;
      if (nOrig !== n && state.ended && state.length === 0)
        endReadable(this);
      if (!util.isNull(ret))
        this.emit('data', ret);
      return ret;
    };
    function chunkInvalid(state, chunk) {
      var er = null;
      if (!util.isBuffer(chunk) && !util.isString(chunk) && !util.isNullOrUndefined(chunk) && !state.objectMode) {
        er = new TypeError('Invalid non-string/buffer chunk');
      }
      return er;
    }
    function onEofChunk(stream, state) {
      if (state.decoder && !state.ended) {
        var chunk = state.decoder.end();
        if (chunk && chunk.length) {
          state.buffer.push(chunk);
          state.length += state.objectMode ? 1 : chunk.length;
        }
      }
      state.ended = true;
      emitReadable(stream);
    }
    function emitReadable(stream) {
      var state = stream._readableState;
      state.needReadable = false;
      if (!state.emittedReadable) {
        debug('emitReadable', state.flowing);
        state.emittedReadable = true;
        if (state.sync)
          process.nextTick(function() {
            emitReadable_(stream);
          });
        else
          emitReadable_(stream);
      }
    }
    function emitReadable_(stream) {
      debug('emit readable');
      stream.emit('readable');
      flow(stream);
    }
    function maybeReadMore(stream, state) {
      if (!state.readingMore) {
        state.readingMore = true;
        process.nextTick(function() {
          maybeReadMore_(stream, state);
        });
      }
    }
    function maybeReadMore_(stream, state) {
      var len = state.length;
      while (!state.reading && !state.flowing && !state.ended && state.length < state.highWaterMark) {
        debug('maybeReadMore read 0');
        stream.read(0);
        if (len === state.length)
          break;
        else
          len = state.length;
      }
      state.readingMore = false;
    }
    Readable.prototype._read = function(n) {
      this.emit('error', new Error('not implemented'));
    };
    Readable.prototype.pipe = function(dest, pipeOpts) {
      var src = this;
      var state = this._readableState;
      switch (state.pipesCount) {
        case 0:
          state.pipes = dest;
          break;
        case 1:
          state.pipes = [state.pipes, dest];
          break;
        default:
          state.pipes.push(dest);
          break;
      }
      state.pipesCount += 1;
      debug('pipe count=%d opts=%j', state.pipesCount, pipeOpts);
      var doEnd = (!pipeOpts || pipeOpts.end !== false) && dest !== process.stdout && dest !== process.stderr;
      var endFn = doEnd ? onend : cleanup;
      if (state.endEmitted)
        process.nextTick(endFn);
      else
        src.once('end', endFn);
      dest.on('unpipe', onunpipe);
      function onunpipe(readable) {
        debug('onunpipe');
        if (readable === src) {
          cleanup();
        }
      }
      function onend() {
        debug('onend');
        dest.end();
      }
      var ondrain = pipeOnDrain(src);
      dest.on('drain', ondrain);
      function cleanup() {
        debug('cleanup');
        dest.removeListener('close', onclose);
        dest.removeListener('finish', onfinish);
        dest.removeListener('drain', ondrain);
        dest.removeListener('error', onerror);
        dest.removeListener('unpipe', onunpipe);
        src.removeListener('end', onend);
        src.removeListener('end', cleanup);
        src.removeListener('data', ondata);
        if (state.awaitDrain && (!dest._writableState || dest._writableState.needDrain))
          ondrain();
      }
      src.on('data', ondata);
      function ondata(chunk) {
        debug('ondata');
        var ret = dest.write(chunk);
        if (false === ret) {
          debug('false write response, pause', src._readableState.awaitDrain);
          src._readableState.awaitDrain++;
          src.pause();
        }
      }
      function onerror(er) {
        debug('onerror', er);
        unpipe();
        dest.removeListener('error', onerror);
        if (EE.listenerCount(dest, 'error') === 0)
          dest.emit('error', er);
      }
      if (!dest._events || !dest._events.error)
        dest.on('error', onerror);
      else if (isArray(dest._events.error))
        dest._events.error.unshift(onerror);
      else
        dest._events.error = [onerror, dest._events.error];
      function onclose() {
        dest.removeListener('finish', onfinish);
        unpipe();
      }
      dest.once('close', onclose);
      function onfinish() {
        debug('onfinish');
        dest.removeListener('close', onclose);
        unpipe();
      }
      dest.once('finish', onfinish);
      function unpipe() {
        debug('unpipe');
        src.unpipe(dest);
      }
      dest.emit('pipe', src);
      if (!state.flowing) {
        debug('pipe resume');
        src.resume();
      }
      return dest;
    };
    function pipeOnDrain(src) {
      return function() {
        var state = src._readableState;
        debug('pipeOnDrain', state.awaitDrain);
        if (state.awaitDrain)
          state.awaitDrain--;
        if (state.awaitDrain === 0 && EE.listenerCount(src, 'data')) {
          state.flowing = true;
          flow(src);
        }
      };
    }
    Readable.prototype.unpipe = function(dest) {
      var state = this._readableState;
      if (state.pipesCount === 0)
        return this;
      if (state.pipesCount === 1) {
        if (dest && dest !== state.pipes)
          return this;
        if (!dest)
          dest = state.pipes;
        state.pipes = null;
        state.pipesCount = 0;
        state.flowing = false;
        if (dest)
          dest.emit('unpipe', this);
        return this;
      }
      if (!dest) {
        var dests = state.pipes;
        var len = state.pipesCount;
        state.pipes = null;
        state.pipesCount = 0;
        state.flowing = false;
        for (var i = 0; i < len; i++)
          dests[i].emit('unpipe', this);
        return this;
      }
      var i = indexOf(state.pipes, dest);
      if (i === -1)
        return this;
      state.pipes.splice(i, 1);
      state.pipesCount -= 1;
      if (state.pipesCount === 1)
        state.pipes = state.pipes[0];
      dest.emit('unpipe', this);
      return this;
    };
    Readable.prototype.on = function(ev, fn) {
      var res = Stream.prototype.on.call(this, ev, fn);
      if (ev === 'data' && false !== this._readableState.flowing) {
        this.resume();
      }
      if (ev === 'readable' && this.readable) {
        var state = this._readableState;
        if (!state.readableListening) {
          state.readableListening = true;
          state.emittedReadable = false;
          state.needReadable = true;
          if (!state.reading) {
            var self = this;
            process.nextTick(function() {
              debug('readable nexttick read 0');
              self.read(0);
            });
          } else if (state.length) {
            emitReadable(this, state);
          }
        }
      }
      return res;
    };
    Readable.prototype.addListener = Readable.prototype.on;
    Readable.prototype.resume = function() {
      var state = this._readableState;
      if (!state.flowing) {
        debug('resume');
        state.flowing = true;
        if (!state.reading) {
          debug('resume read 0');
          this.read(0);
        }
        resume(this, state);
      }
      return this;
    };
    function resume(stream, state) {
      if (!state.resumeScheduled) {
        state.resumeScheduled = true;
        process.nextTick(function() {
          resume_(stream, state);
        });
      }
    }
    function resume_(stream, state) {
      state.resumeScheduled = false;
      stream.emit('resume');
      flow(stream);
      if (state.flowing && !state.reading)
        stream.read(0);
    }
    Readable.prototype.pause = function() {
      debug('call pause flowing=%j', this._readableState.flowing);
      if (false !== this._readableState.flowing) {
        debug('pause');
        this._readableState.flowing = false;
        this.emit('pause');
      }
      return this;
    };
    function flow(stream) {
      var state = stream._readableState;
      debug('flow', state.flowing);
      if (state.flowing) {
        do {
          var chunk = stream.read();
        } while (null !== chunk && state.flowing);
      }
    }
    Readable.prototype.wrap = function(stream) {
      var state = this._readableState;
      var paused = false;
      var self = this;
      stream.on('end', function() {
        debug('wrapped end');
        if (state.decoder && !state.ended) {
          var chunk = state.decoder.end();
          if (chunk && chunk.length)
            self.push(chunk);
        }
        self.push(null);
      });
      stream.on('data', function(chunk) {
        debug('wrapped data');
        if (state.decoder)
          chunk = state.decoder.write(chunk);
        if (!chunk || !state.objectMode && !chunk.length)
          return ;
        var ret = self.push(chunk);
        if (!ret) {
          paused = true;
          stream.pause();
        }
      });
      for (var i in stream) {
        if (util.isFunction(stream[i]) && util.isUndefined(this[i])) {
          this[i] = function(method) {
            return function() {
              return stream[method].apply(stream, arguments);
            };
          }(i);
        }
      }
      var events = ['error', 'close', 'destroy', 'pause', 'resume'];
      forEach(events, function(ev) {
        stream.on(ev, self.emit.bind(self, ev));
      });
      self._read = function(n) {
        debug('wrapped _read', n);
        if (paused) {
          paused = false;
          stream.resume();
        }
      };
      return self;
    };
    Readable._fromList = fromList;
    function fromList(n, state) {
      var list = state.buffer;
      var length = state.length;
      var stringMode = !!state.decoder;
      var objectMode = !!state.objectMode;
      var ret;
      if (list.length === 0)
        return null;
      if (length === 0)
        ret = null;
      else if (objectMode)
        ret = list.shift();
      else if (!n || n >= length) {
        if (stringMode)
          ret = list.join('');
        else
          ret = Buffer.concat(list, length);
        list.length = 0;
      } else {
        if (n < list[0].length) {
          var buf = list[0];
          ret = buf.slice(0, n);
          list[0] = buf.slice(n);
        } else if (n === list[0].length) {
          ret = list.shift();
        } else {
          if (stringMode)
            ret = '';
          else
            ret = new Buffer(n);
          var c = 0;
          for (var i = 0,
              l = list.length; i < l && c < n; i++) {
            var buf = list[0];
            var cpy = Math.min(n - c, buf.length);
            if (stringMode)
              ret += buf.slice(0, cpy);
            else
              buf.copy(ret, c, 0, cpy);
            if (cpy < buf.length)
              list[0] = buf.slice(cpy);
            else
              list.shift();
            c += cpy;
          }
        }
      }
      return ret;
    }
    function endReadable(stream) {
      var state = stream._readableState;
      if (state.length > 0)
        throw new Error('endReadable called on non-empty stream');
      if (!state.endEmitted) {
        state.ended = true;
        process.nextTick(function() {
          if (!state.endEmitted && state.length === 0) {
            state.endEmitted = true;
            stream.readable = false;
            stream.emit('end');
          }
        });
      }
    }
    function forEach(xs, f) {
      for (var i = 0,
          l = xs.length; i < l; i++) {
        f(xs[i], i);
      }
    }
    function indexOf(xs, x) {
      for (var i = 0,
          l = xs.length; i < l; i++) {
        if (xs[i] === x)
          return i;
      }
      return -1;
    }
  })(require("github:jspm/nodelibs-buffer@0.1.0").Buffer, require("github:jspm/nodelibs-process@0.1.1"));
  global.define = __define;
  return module.exports;
});

System.register("npm:glsl-parser@0.0.9/lib/index", ["npm:through@1.1.2", "npm:glsl-parser@0.0.9/lib/expr", "npm:glsl-parser@0.0.9/lib/scope"], true, function(require, exports, module) {
  var global = System.global,
      __define = global.define;
  global.define = undefined;
  module.exports = parser;
  var through = require("npm:through@1.1.2"),
      full_parse_expr = require("npm:glsl-parser@0.0.9/lib/expr"),
      Scope = require("npm:glsl-parser@0.0.9/lib/scope");
  var Advance = new Object;
  var DEBUG = false;
  var _ = 0,
      IDENT = _++,
      STMT = _++,
      STMTLIST = _++,
      STRUCT = _++,
      FUNCTION = _++,
      FUNCTIONARGS = _++,
      DECL = _++,
      DECLLIST = _++,
      FORLOOP = _++,
      WHILELOOP = _++,
      IF = _++,
      EXPR = _++,
      PRECISION = _++,
      COMMENT = _++,
      PREPROCESSOR = _++,
      KEYWORD = _++,
      KEYWORD_OR_IDENT = _++,
      RETURN = _++,
      BREAK = _++,
      CONTINUE = _++,
      DISCARD = _++,
      DOWHILELOOP = _++,
      PLACEHOLDER = _++,
      QUANTIFIER = _++;
  var DECL_ALLOW_ASSIGN = 0x1,
      DECL_ALLOW_COMMA = 0x2,
      DECL_REQUIRE_NAME = 0x4,
      DECL_ALLOW_INVARIANT = 0x8,
      DECL_ALLOW_STORAGE = 0x10,
      DECL_NO_INOUT = 0x20,
      DECL_ALLOW_STRUCT = 0x40,
      DECL_STATEMENT = 0xFF,
      DECL_FUNCTION = DECL_STATEMENT & ~(DECL_ALLOW_ASSIGN | DECL_ALLOW_COMMA | DECL_NO_INOUT | DECL_ALLOW_INVARIANT | DECL_REQUIRE_NAME),
      DECL_STRUCT = DECL_STATEMENT & ~(DECL_ALLOW_ASSIGN | DECL_ALLOW_INVARIANT | DECL_ALLOW_STORAGE | DECL_ALLOW_STRUCT);
  var QUALIFIERS = ['const', 'attribute', 'uniform', 'varying'];
  var NO_ASSIGN_ALLOWED = false,
      NO_COMMA_ALLOWED = false;
  var token_map = {
    'block-comment': COMMENT,
    'line-comment': COMMENT,
    'preprocessor': PREPROCESSOR
  };
  var stmt_type = _ = ['ident', 'stmt', 'stmtlist', 'struct', 'function', 'functionargs', 'decl', 'decllist', 'forloop', 'whileloop', 'if', 'expr', 'precision', 'comment', 'preprocessor', 'keyword', 'keyword_or_ident', 'return', 'break', 'continue', 'discard', 'do-while', 'placeholder', 'quantifier'];
  function parser() {
    var stmtlist = n(STMTLIST),
        stmt = n(STMT),
        decllist = n(DECLLIST),
        precision = n(PRECISION),
        ident = n(IDENT),
        keyword_or_ident = n(KEYWORD_OR_IDENT),
        fn = n(FUNCTION),
        fnargs = n(FUNCTIONARGS),
        forstmt = n(FORLOOP),
        ifstmt = n(IF),
        whilestmt = n(WHILELOOP),
        returnstmt = n(RETURN),
        dowhilestmt = n(DOWHILELOOP),
        quantifier = n(QUANTIFIER);
    var parse_struct,
        parse_precision,
        parse_quantifier,
        parse_forloop,
        parse_if,
        parse_return,
        parse_whileloop,
        parse_dowhileloop,
        parse_function,
        parse_function_args;
    var stream = through(write, end),
        check = arguments.length ? [].slice.call(arguments) : [],
        depth = 0,
        state = [],
        tokens = [],
        whitespace = [],
        errored = false,
        program,
        token,
        node;
    state.shift = special_shift;
    state.unshift = special_unshift;
    state.fake = special_fake;
    state.unexpected = unexpected;
    state.scope = new Scope(state);
    state.create_node = function() {
      var n = mknode(IDENT, token);
      n.parent = stream.program;
      return n;
    };
    setup_stative_parsers();
    node = stmtlist();
    node.expecting = '(eof)';
    node.mode = STMTLIST;
    node.token = {
      type: '(program)',
      data: '(program)'
    };
    program = node;
    stream.program = program;
    stream.scope = function(scope) {
      if (arguments.length === 1) {
        state.scope = scope;
      }
      return state.scope;
    };
    state.unshift(node);
    return stream;
    function write(input) {
      if (input.type === 'whitespace' || input.type === 'line-comment' || input.type === 'block-comment') {
        whitespace.push(input);
        return ;
      }
      tokens.push(input);
      token = token || tokens[0];
      if (token && whitespace.length) {
        token.preceding = token.preceding || [];
        token.preceding = token.preceding.concat(whitespace);
        whitespace = [];
      }
      while (take())
        switch (state[0].mode) {
          case STMT:
            parse_stmt();
            break;
          case STMTLIST:
            parse_stmtlist();
            break;
          case DECL:
            parse_decl();
            break;
          case DECLLIST:
            parse_decllist();
            break;
          case EXPR:
            parse_expr();
            break;
          case STRUCT:
            parse_struct(true, true);
            break;
          case PRECISION:
            parse_precision();
            break;
          case IDENT:
            parse_ident();
            break;
          case KEYWORD:
            parse_keyword();
            break;
          case KEYWORD_OR_IDENT:
            parse_keyword_or_ident();
            break;
          case FUNCTION:
            parse_function();
            break;
          case FUNCTIONARGS:
            parse_function_args();
            break;
          case FORLOOP:
            parse_forloop();
            break;
          case WHILELOOP:
            parse_whileloop();
            break;
          case DOWHILELOOP:
            parse_dowhileloop();
            break;
          case RETURN:
            parse_return();
            break;
          case IF:
            parse_if();
            break;
          case QUANTIFIER:
            parse_quantifier();
            break;
        }
    }
    function end(tokens) {
      if (arguments.length) {
        write(tokens);
      }
      if (state.length > 1) {
        unexpected('unexpected EOF');
        return ;
      }
      stream.emit('end');
    }
    function take() {
      if (errored || !state.length)
        return false;
      return (token = tokens[0]) && !stream.paused;
    }
    function special_fake(x) {
      state.unshift(x);
      state.shift();
    }
    function special_unshift(_node, add_child) {
      _node.parent = state[0];
      var ret = [].unshift.call(this, _node);
      add_child = add_child === undefined ? true : add_child;
      if (DEBUG) {
        var pad = '';
        for (var i = 0,
            len = this.length - 1; i < len; ++i) {
          pad += ' |';
        }
        console.log(pad, '\\' + _node.type, _node.token.data);
      }
      if (add_child && node !== _node)
        node.children.push(_node);
      node = _node;
      return ret;
    }
    function special_shift() {
      var _node = [].shift.call(this),
          okay = check[this.length],
          emit = false;
      if (DEBUG) {
        var pad = '';
        for (var i = 0,
            len = this.length; i < len; ++i) {
          pad += ' |';
        }
        console.log(pad, '/' + _node.type);
      }
      if (check.length) {
        if (typeof check[0] === 'function') {
          emit = check[0](_node);
        } else if (okay !== undefined) {
          emit = okay.test ? okay.test(_node.type) : okay === _node.type;
        }
      } else {
        emit = true;
      }
      if (emit)
        stream.emit('data', _node);
      node = _node.parent;
      return _node;
    }
    function parse_stmtlist() {
      return stative(function() {
        state.scope.enter();
        return Advance;
      }, normal_mode)();
      function normal_mode() {
        if (token.data === state[0].expecting) {
          return state.scope.exit(), state.shift();
        }
        switch (token.type) {
          case 'preprocessor':
            state.fake(adhoc());
            tokens.shift();
            return ;
          default:
            state.unshift(stmt());
            return ;
        }
      }
    }
    function parse_stmt() {
      if (state[0].brace) {
        if (token.data !== '}') {
          return unexpected('expected `}`, got ' + token.data);
        }
        state[0].brace = false;
        return tokens.shift(), state.shift();
      }
      switch (token.type) {
        case 'eof':
          return state.shift();
        case 'keyword':
          switch (token.data) {
            case 'for':
              return state.unshift(forstmt());
            case 'if':
              return state.unshift(ifstmt());
            case 'while':
              return state.unshift(whilestmt());
            case 'do':
              return state.unshift(dowhilestmt());
            case 'break':
              return state.fake(mknode(BREAK, token)), tokens.shift();
            case 'continue':
              return state.fake(mknode(CONTINUE, token)), tokens.shift();
            case 'discard':
              return state.fake(mknode(DISCARD, token)), tokens.shift();
            case 'return':
              return state.unshift(returnstmt());
            case 'precision':
              return state.unshift(precision());
          }
          return state.unshift(decl(DECL_STATEMENT));
        case 'ident':
          var lookup;
          if (lookup = state.scope.find(token.data)) {
            if (lookup.parent.type === 'struct') {
              return state.unshift(decl(DECL_STATEMENT));
            }
            return state.unshift(expr(';'));
          }
        case 'operator':
          if (token.data === '{') {
            state[0].brace = true;
            var n = stmtlist();
            n.expecting = '}';
            return tokens.shift(), state.unshift(n);
          }
          if (token.data === ';') {
            return tokens.shift(), state.shift();
          }
        default:
          return state.unshift(expr(';'));
      }
    }
    function parse_decl() {
      var stmt = state[0];
      return stative(invariant_or_not, storage_or_not, parameter_or_not, precision_or_not, struct_or_type, maybe_name, maybe_lparen, is_decllist, done)();
      function invariant_or_not() {
        if (token.data === 'invariant') {
          if (stmt.flags & DECL_ALLOW_INVARIANT) {
            state.unshift(keyword());
            return Advance;
          } else {
            return unexpected('`invariant` is not allowed here');
          }
        } else {
          state.fake(mknode(PLACEHOLDER, {
            data: '',
            position: token.position
          }));
          return Advance;
        }
      }
      function storage_or_not() {
        if (is_storage(token)) {
          if (stmt.flags & DECL_ALLOW_STORAGE) {
            state.unshift(keyword());
            return Advance;
          } else {
            return unexpected('storage is not allowed here');
          }
        } else {
          state.fake(mknode(PLACEHOLDER, {
            data: '',
            position: token.position
          }));
          return Advance;
        }
      }
      function parameter_or_not() {
        if (is_parameter(token)) {
          if (!(stmt.flags & DECL_NO_INOUT)) {
            state.unshift(keyword());
            return Advance;
          } else {
            return unexpected('parameter is not allowed here');
          }
        } else {
          state.fake(mknode(PLACEHOLDER, {
            data: '',
            position: token.position
          }));
          return Advance;
        }
      }
      function precision_or_not() {
        if (is_precision(token)) {
          state.unshift(keyword());
          return Advance;
        } else {
          state.fake(mknode(PLACEHOLDER, {
            data: '',
            position: token.position
          }));
          return Advance;
        }
      }
      function struct_or_type() {
        if (token.data === 'struct') {
          if (!(stmt.flags & DECL_ALLOW_STRUCT)) {
            return unexpected('cannot nest structs');
          }
          state.unshift(struct());
          return Advance;
        }
        if (token.type === 'keyword') {
          state.unshift(keyword());
          return Advance;
        }
        var lookup = state.scope.find(token.data);
        if (lookup) {
          state.fake(Object.create(lookup));
          tokens.shift();
          return Advance;
        }
        return unexpected('expected user defined type, struct or keyword, got ' + token.data);
      }
      function maybe_name() {
        if (token.data === ',' && !(stmt.flags & DECL_ALLOW_COMMA)) {
          return state.shift();
        }
        if (token.data === '[') {
          state.unshift(quantifier());
          return ;
        }
        if (token.data === ')')
          return state.shift();
        if (token.data === ';') {
          return stmt.stage + 3;
        }
        if (token.type !== 'ident' && token.type !== 'builtin') {
          return unexpected('expected identifier, got ' + token.data);
        }
        stmt.collected_name = tokens.shift();
        return Advance;
      }
      function maybe_lparen() {
        if (token.data === '(') {
          tokens.unshift(stmt.collected_name);
          delete stmt.collected_name;
          state.unshift(fn());
          return stmt.stage + 2;
        }
        return Advance;
      }
      function is_decllist() {
        tokens.unshift(stmt.collected_name);
        delete stmt.collected_name;
        state.unshift(decllist());
        return Advance;
      }
      function done() {
        return state.shift();
      }
    }
    function parse_decllist() {
      if (token.type === 'ident') {
        var name = token.data;
        state.unshift(ident());
        state.scope.define(name);
        return ;
      }
      if (token.type === 'operator') {
        if (token.data === ',') {
          if (!(state[1].flags & DECL_ALLOW_COMMA)) {
            return state.shift();
          }
          return tokens.shift();
        } else if (token.data === '=') {
          if (!(state[1].flags & DECL_ALLOW_ASSIGN))
            return unexpected('`=` is not allowed here.');
          tokens.shift();
          state.unshift(expr(',', ';'));
          return ;
        } else if (token.data === '[') {
          state.unshift(quantifier());
          return ;
        }
      }
      return state.shift();
    }
    function parse_keyword_or_ident() {
      if (token.type === 'keyword') {
        state[0].type = 'keyword';
        state[0].mode = KEYWORD;
        return ;
      }
      if (token.type === 'ident') {
        state[0].type = 'ident';
        state[0].mode = IDENT;
        return ;
      }
      return unexpected('expected keyword or user-defined name, got ' + token.data);
    }
    function parse_keyword() {
      if (token.type !== 'keyword') {
        return unexpected('expected keyword, got ' + token.data);
      }
      return state.shift(), tokens.shift();
    }
    function parse_ident() {
      if (token.type !== 'ident') {
        return unexpected('expected user-defined name, got ' + token.data);
      }
      state[0].data = token.data;
      return state.shift(), tokens.shift();
    }
    function parse_expr() {
      var expecting = state[0].expecting;
      state[0].tokens = state[0].tokens || [];
      if (state[0].parenlevel === undefined) {
        state[0].parenlevel = 0;
        state[0].bracelevel = 0;
      }
      if (state[0].parenlevel < 1 && expecting.indexOf(token.data) > -1) {
        return parseexpr(state[0].tokens);
      }
      if (token.data === '(') {
        ++state[0].parenlevel;
      } else if (token.data === ')') {
        --state[0].parenlevel;
      }
      switch (token.data) {
        case '{':
          ++state[0].bracelevel;
          break;
        case '}':
          --state[0].bracelevel;
          break;
        case '(':
          ++state[0].parenlevel;
          break;
        case ')':
          --state[0].parenlevel;
          break;
      }
      if (state[0].parenlevel < 0)
        return unexpected('unexpected `)`');
      if (state[0].bracelevel < 0)
        return unexpected('unexpected `}`');
      state[0].tokens.push(tokens.shift());
      return ;
      function parseexpr(tokens) {
        return full_parse_expr(state, tokens), state.shift();
      }
    }
    function n(type) {
      return function() {
        return mknode(type, token);
      };
    }
    function adhoc() {
      return mknode(token_map[token.type], token, node);
    }
    function decl(flags) {
      var _ = mknode(DECL, token, node);
      _.flags = flags;
      return _;
    }
    function struct(allow_assign, allow_comma) {
      var _ = mknode(STRUCT, token, node);
      _.allow_assign = allow_assign === undefined ? true : allow_assign;
      _.allow_comma = allow_comma === undefined ? true : allow_comma;
      return _;
    }
    function expr() {
      var n = mknode(EXPR, token, node);
      n.expecting = [].slice.call(arguments);
      return n;
    }
    function keyword(default_value) {
      var t = token;
      if (default_value) {
        t = {
          'type': '(implied)',
          data: '(default)',
          position: t.position
        };
      }
      return mknode(KEYWORD, t, node);
    }
    function unexpected(str) {
      errored = true;
      stream.emit('error', new Error((str || 'unexpected ' + state) + ' at line ' + state[0].token.line));
    }
    function assert(type, data) {
      return 1, assert_null_string_or_array(type, token.type) && assert_null_string_or_array(data, token.data);
    }
    function assert_null_string_or_array(x, y) {
      switch (typeof x) {
        case 'string':
          if (y !== x) {
            unexpected('expected `' + x + '`, got ' + y + '\n' + token.data);
          }
          return !errored;
        case 'object':
          if (x && x.indexOf(y) === -1) {
            unexpected('expected one of `' + x.join('`, `') + '`, got ' + y);
          }
          return !errored;
      }
      return true;
    }
    function stative() {
      var steps = [].slice.call(arguments),
          step,
          result;
      return function() {
        var current = state[0];
        current.stage || (current.stage = 0);
        step = steps[current.stage];
        if (!step)
          return unexpected('parser in undefined state!');
        result = step();
        if (result === Advance)
          return ++current.stage;
        if (result === undefined)
          return ;
        current.stage = result;
      };
    }
    function advance(op, t) {
      t = t || 'operator';
      return function() {
        if (!assert(t, op))
          return ;
        var last = tokens.shift(),
            children = state[0].children,
            last_node = children[children.length - 1];
        if (last_node && last_node.token && last.preceding) {
          last_node.token.succeeding = last_node.token.succeeding || [];
          last_node.token.succeeding = last_node.token.succeeding.concat(last.preceding);
        }
        return Advance;
      };
    }
    function advance_expr(until) {
      return function() {
        return state.unshift(expr(until)), Advance;
      };
    }
    function advance_ident(declare) {
      return declare ? function() {
        var name = token.data;
        return assert('ident') && (state.unshift(ident()), state.scope.define(name), Advance);
      } : function() {
        if (!assert('ident'))
          return ;
        var s = Object.create(state.scope.find(token.data));
        s.token = token;
        return (tokens.shift(), Advance);
      };
    }
    function advance_stmtlist() {
      return function() {
        var n = stmtlist();
        n.expecting = '}';
        return state.unshift(n), Advance;
      };
    }
    function maybe_stmtlist(skip) {
      return function() {
        var current = state[0].stage;
        if (token.data !== '{') {
          return state.unshift(stmt()), current + skip;
        }
        return tokens.shift(), Advance;
      };
    }
    function popstmt() {
      return function() {
        return state.shift(), state.shift();
      };
    }
    function setup_stative_parsers() {
      parse_struct = stative(advance('struct', 'keyword'), function() {
        if (token.data === '{') {
          state.fake(mknode(IDENT, {
            data: '',
            position: token.position,
            type: 'ident'
          }));
          return Advance;
        }
        return advance_ident(true)();
      }, function() {
        state.scope.enter();
        return Advance;
      }, advance('{'), function() {
        if (token.type === 'preprocessor') {
          state.fake(adhoc());
          tokens.shift();
          return ;
        }
        if (token.data === '}') {
          state.scope.exit();
          tokens.shift();
          return state.shift();
        }
        if (token.data === ';') {
          tokens.shift();
          return ;
        }
        state.unshift(decl(DECL_STRUCT));
      });
      parse_precision = stative(function() {
        return tokens.shift(), Advance;
      }, function() {
        return assert('keyword', ['lowp', 'mediump', 'highp']) && (state.unshift(keyword()), Advance);
      }, function() {
        return (state.unshift(keyword()), Advance);
      }, function() {
        return state.shift();
      });
      parse_quantifier = stative(advance('['), advance_expr(']'), advance(']'), function() {
        return state.shift();
      });
      parse_forloop = stative(advance('for', 'keyword'), advance('('), function() {
        var lookup;
        if (token.type === 'ident') {
          if (!(lookup = state.scope.find(token.data))) {
            lookup = state.create_node();
          }
          if (lookup.parent.type === 'struct') {
            return state.unshift(decl(DECL_STATEMENT)), Advance;
          }
        } else if (token.type === 'builtin' || token.type === 'keyword') {
          return state.unshift(decl(DECL_STATEMENT)), Advance;
        }
        return advance_expr(';')();
      }, advance(';'), advance_expr(';'), advance(';'), advance_expr(')'), advance(')'), maybe_stmtlist(3), advance_stmtlist(), advance('}'), popstmt());
      parse_if = stative(advance('if', 'keyword'), advance('('), advance_expr(')'), advance(')'), maybe_stmtlist(3), advance_stmtlist(), advance('}'), function() {
        if (token.data === 'else') {
          return tokens.shift(), state.unshift(stmt()), Advance;
        }
        return popstmt()();
      }, popstmt());
      parse_return = stative(advance('return', 'keyword'), function() {
        if (token.data === ';')
          return Advance;
        return state.unshift(expr(';')), Advance;
      }, function() {
        tokens.shift(), popstmt()();
      });
      parse_whileloop = stative(advance('while', 'keyword'), advance('('), advance_expr(')'), advance(')'), maybe_stmtlist(3), advance_stmtlist(), advance('}'), popstmt());
      parse_dowhileloop = stative(advance('do', 'keyword'), maybe_stmtlist(3), advance_stmtlist(), advance('}'), advance('while', 'keyword'), advance('('), advance_expr(')'), advance(')'), popstmt());
      parse_function = stative(function() {
        for (var i = 1,
            len = state.length; i < len; ++i)
          if (state[i].mode === FUNCTION) {
            return unexpected('function definition is not allowed within another function');
          }
        return Advance;
      }, function() {
        if (!assert("ident"))
          return ;
        var name = token.data,
            lookup = state.scope.find(name);
        state.unshift(ident());
        state.scope.define(name);
        state.scope.enter(lookup ? lookup.scope : null);
        return Advance;
      }, advance('('), function() {
        return state.unshift(fnargs()), Advance;
      }, advance(')'), function() {
        if (token.data === ';') {
          return state.scope.exit(), state.shift(), state.shift();
        }
        return Advance;
      }, advance('{'), advance_stmtlist(), advance('}'), function() {
        state.scope.exit();
        return Advance;
      }, function() {
        return state.shift(), state.shift(), state.shift();
      });
      parse_function_args = stative(function() {
        if (token.data === 'void') {
          state.fake(keyword());
          tokens.shift();
          return Advance;
        }
        if (token.data === ')') {
          state.shift();
          return ;
        }
        if (token.data === 'struct') {
          state.unshift(struct(NO_ASSIGN_ALLOWED, NO_COMMA_ALLOWED));
          return Advance;
        }
        state.unshift(decl(DECL_FUNCTION));
        return Advance;
      }, function() {
        if (token.data === ',') {
          tokens.shift();
          return 0;
        }
        if (token.data === ')') {
          state.shift();
          return ;
        }
        unexpected('expected one of `,` or `)`, got ' + token.data);
      });
    }
  }
  function mknode(mode, sourcetoken) {
    return {
      mode: mode,
      token: sourcetoken,
      children: [],
      type: stmt_type[mode],
      id: (Math.random() * 0xFFFFFFFF).toString(16)
    };
  }
  function is_storage(token) {
    return token.data === 'const' || token.data === 'attribute' || token.data === 'uniform' || token.data === 'varying';
  }
  function is_parameter(token) {
    return token.data === 'in' || token.data === 'inout' || token.data === 'out';
  }
  function is_precision(token) {
    return token.data === 'highp' || token.data === 'mediump' || token.data === 'lowp';
  }
  global.define = __define;
  return module.exports;
});

System.register("github:jspm/nodelibs-events@0.1.1", ["github:jspm/nodelibs-events@0.1.1/index"], true, function(require, exports, module) {
  var global = System.global,
      __define = global.define;
  global.define = undefined;
  module.exports = require("github:jspm/nodelibs-events@0.1.1/index");
  global.define = __define;
  return module.exports;
});

System.register("github:jspm/nodelibs-process@0.1.1", ["github:jspm/nodelibs-process@0.1.1/index"], true, function(require, exports, module) {
  var global = System.global,
      __define = global.define;
  global.define = undefined;
  module.exports = require("github:jspm/nodelibs-process@0.1.1/index");
  global.define = __define;
  return module.exports;
});

System.register("npm:buffer@3.2.2", ["npm:buffer@3.2.2/index"], true, function(require, exports, module) {
  var global = System.global,
      __define = global.define;
  global.define = undefined;
  module.exports = require("npm:buffer@3.2.2/index");
  global.define = __define;
  return module.exports;
});

System.register("npm:cwise-compiler@0.0.0", ["npm:cwise-compiler@0.0.0/compiler"], true, function(require, exports, module) {
  var global = System.global,
      __define = global.define;
  global.define = undefined;
  module.exports = require("npm:cwise-compiler@0.0.0/compiler");
  global.define = __define;
  return module.exports;
});

System.register("npm:cwise-parser@0.0.1", ["npm:cwise-parser@0.0.1/index"], true, function(require, exports, module) {
  var global = System.global,
      __define = global.define;
  global.define = undefined;
  module.exports = require("npm:cwise-parser@0.0.1/index");
  global.define = __define;
  return module.exports;
});

System.register("npm:typedarray-pool@0.1.2", ["npm:typedarray-pool@0.1.2/pool"], true, function(require, exports, module) {
  var global = System.global,
      __define = global.define;
  global.define = undefined;
  module.exports = require("npm:typedarray-pool@0.1.2/pool");
  global.define = __define;
  return module.exports;
});

System.register("npm:typedarray-pool@1.1.0", ["npm:typedarray-pool@1.1.0/pool"], true, function(require, exports, module) {
  var global = System.global,
      __define = global.define;
  global.define = undefined;
  module.exports = require("npm:typedarray-pool@1.1.0/pool");
  global.define = __define;
  return module.exports;
});

System.register("npm:gl-vao@0.0.3", ["npm:gl-vao@0.0.3/vao"], true, function(require, exports, module) {
  var global = System.global,
      __define = global.define;
  global.define = undefined;
  module.exports = require("npm:gl-vao@0.0.3/vao");
  global.define = __define;
  return module.exports;
});

System.register("npm:cwise-compiler@0.1.0", ["npm:cwise-compiler@0.1.0/compiler"], true, function(require, exports, module) {
  var global = System.global,
      __define = global.define;
  global.define = undefined;
  module.exports = require("npm:cwise-compiler@0.1.0/compiler");
  global.define = __define;
  return module.exports;
});

System.register("npm:greedy-mesher@1.0.2", ["npm:greedy-mesher@1.0.2/greedy"], true, function(require, exports, module) {
  var global = System.global,
      __define = global.define;
  global.define = undefined;
  module.exports = require("npm:greedy-mesher@1.0.2/greedy");
  global.define = __define;
  return module.exports;
});

System.register("npm:readable-stream@1.1.13/readable", ["npm:readable-stream@1.1.13/lib/_stream_readable", "npm:stream-browserify@1.0.0/index", "npm:readable-stream@1.1.13/lib/_stream_writable", "npm:readable-stream@1.1.13/lib/_stream_duplex", "npm:readable-stream@1.1.13/lib/_stream_transform", "npm:readable-stream@1.1.13/lib/_stream_passthrough"], true, function(require, exports, module) {
  var global = System.global,
      __define = global.define;
  global.define = undefined;
  exports = module.exports = require("npm:readable-stream@1.1.13/lib/_stream_readable");
  exports.Stream = require("npm:stream-browserify@1.0.0/index");
  exports.Readable = exports;
  exports.Writable = require("npm:readable-stream@1.1.13/lib/_stream_writable");
  exports.Duplex = require("npm:readable-stream@1.1.13/lib/_stream_duplex");
  exports.Transform = require("npm:readable-stream@1.1.13/lib/_stream_transform");
  exports.PassThrough = require("npm:readable-stream@1.1.13/lib/_stream_passthrough");
  global.define = __define;
  return module.exports;
});

System.register("npm:glsl-parser@0.0.9/index", ["npm:glsl-parser@0.0.9/lib/index"], true, function(require, exports, module) {
  var global = System.global,
      __define = global.define;
  global.define = undefined;
  module.exports = require("npm:glsl-parser@0.0.9/lib/index");
  global.define = __define;
  return module.exports;
});

System.register("npm:util@0.10.3/util", ["npm:util@0.10.3/support/isBufferBrowser", "npm:inherits@2.0.1", "github:jspm/nodelibs-process@0.1.1"], true, function(require, exports, module) {
  var global = System.global,
      __define = global.define;
  global.define = undefined;
  (function(process) {
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
        if (x === '%%')
          return '%';
        if (i >= len)
          return x;
        switch (x) {
          case '%s':
            return String(args[i++]);
          case '%d':
            return Number(args[i++]);
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
    exports.deprecate = function(fn, msg) {
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
    function inspect(obj, opts) {
      var ctx = {
        seen: [],
        stylize: stylizeNoColor
      };
      if (arguments.length >= 3)
        ctx.depth = arguments[2];
      if (arguments.length >= 4)
        ctx.colors = arguments[3];
      if (isBoolean(opts)) {
        ctx.showHidden = opts;
      } else if (opts) {
        exports._extend(ctx, opts);
      }
      if (isUndefined(ctx.showHidden))
        ctx.showHidden = false;
      if (isUndefined(ctx.depth))
        ctx.depth = 2;
      if (isUndefined(ctx.colors))
        ctx.colors = false;
      if (isUndefined(ctx.customInspect))
        ctx.customInspect = true;
      if (ctx.colors)
        ctx.stylize = stylizeWithColor;
      return formatValue(ctx, obj, ctx.depth);
    }
    exports.inspect = inspect;
    inspect.colors = {
      'bold': [1, 22],
      'italic': [3, 23],
      'underline': [4, 24],
      'inverse': [7, 27],
      'white': [37, 39],
      'grey': [90, 39],
      'black': [30, 39],
      'blue': [34, 39],
      'cyan': [36, 39],
      'green': [32, 39],
      'magenta': [35, 39],
      'red': [31, 39],
      'yellow': [33, 39]
    };
    inspect.styles = {
      'special': 'cyan',
      'number': 'yellow',
      'boolean': 'yellow',
      'undefined': 'grey',
      'null': 'bold',
      'string': 'green',
      'date': 'magenta',
      'regexp': 'red'
    };
    function stylizeWithColor(str, styleType) {
      var style = inspect.styles[styleType];
      if (style) {
        return '\u001b[' + inspect.colors[style][0] + 'm' + str + '\u001b[' + inspect.colors[style][1] + 'm';
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
      if (ctx.customInspect && value && isFunction(value.inspect) && value.inspect !== exports.inspect && !(value.constructor && value.constructor.prototype === value)) {
        var ret = value.inspect(recurseTimes, ctx);
        if (!isString(ret)) {
          ret = formatValue(ctx, ret, recurseTimes);
        }
        return ret;
      }
      var primitive = formatPrimitive(ctx, value);
      if (primitive) {
        return primitive;
      }
      var keys = Object.keys(value);
      var visibleKeys = arrayToHash(keys);
      if (ctx.showHidden) {
        keys = Object.getOwnPropertyNames(value);
      }
      if (isError(value) && (keys.indexOf('message') >= 0 || keys.indexOf('description') >= 0)) {
        return formatError(value);
      }
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
      var base = '',
          array = false,
          braces = ['{', '}'];
      if (isArray(value)) {
        array = true;
        braces = ['[', ']'];
      }
      if (isFunction(value)) {
        var n = value.name ? ': ' + value.name : '';
        base = ' [Function' + n + ']';
      }
      if (isRegExp(value)) {
        base = ' ' + RegExp.prototype.toString.call(value);
      }
      if (isDate(value)) {
        base = ' ' + Date.prototype.toUTCString.call(value);
      }
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
        var simple = '\'' + JSON.stringify(value).replace(/^"|"$/g, '').replace(/'/g, "\\'").replace(/\\"/g, '"') + '\'';
        return ctx.stylize(simple, 'string');
      }
      if (isNumber(value))
        return ctx.stylize('' + value, 'number');
      if (isBoolean(value))
        return ctx.stylize('' + value, 'boolean');
      if (isNull(value))
        return ctx.stylize('null', 'null');
    }
    function formatError(value) {
      return '[' + Error.prototype.toString.call(value) + ']';
    }
    function formatArray(ctx, value, recurseTimes, visibleKeys, keys) {
      var output = [];
      for (var i = 0,
          l = value.length; i < l; ++i) {
        if (hasOwnProperty(value, String(i))) {
          output.push(formatProperty(ctx, value, recurseTimes, visibleKeys, String(i), true));
        } else {
          output.push('');
        }
      }
      keys.forEach(function(key) {
        if (!key.match(/^\d+$/)) {
          output.push(formatProperty(ctx, value, recurseTimes, visibleKeys, key, true));
        }
      });
      return output;
    }
    function formatProperty(ctx, value, recurseTimes, visibleKeys, key, array) {
      var name,
          str,
          desc;
      desc = Object.getOwnPropertyDescriptor(value, key) || {value: value[key]};
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
          name = name.replace(/'/g, "\\'").replace(/\\"/g, '"').replace(/(^"|"$)/g, "'");
          name = ctx.stylize(name, 'string');
        }
      }
      return name + ': ' + str;
    }
    function reduceToSingleString(output, base, braces) {
      var numLinesEst = 0;
      var length = output.reduce(function(prev, cur) {
        numLinesEst++;
        if (cur.indexOf('\n') >= 0)
          numLinesEst++;
        return prev + cur.replace(/\u001b\[\d\d?m/g, '').length + 1;
      }, 0);
      if (length > 60) {
        return braces[0] + (base === '' ? '' : base + '\n ') + ' ' + output.join(',\n  ') + ' ' + braces[1];
      }
      return braces[0] + base + ' ' + output.join(', ') + ' ' + braces[1];
    }
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
      return isObject(e) && (objectToString(e) === '[object Error]' || e instanceof Error);
    }
    exports.isError = isError;
    function isFunction(arg) {
      return typeof arg === 'function';
    }
    exports.isFunction = isFunction;
    function isPrimitive(arg) {
      return arg === null || typeof arg === 'boolean' || typeof arg === 'number' || typeof arg === 'string' || typeof arg === 'symbol' || typeof arg === 'undefined';
    }
    exports.isPrimitive = isPrimitive;
    exports.isBuffer = require("npm:util@0.10.3/support/isBufferBrowser");
    function objectToString(o) {
      return Object.prototype.toString.call(o);
    }
    function pad(n) {
      return n < 10 ? '0' + n.toString(10) : n.toString(10);
    }
    var months = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];
    function timestamp() {
      var d = new Date();
      var time = [pad(d.getHours()), pad(d.getMinutes()), pad(d.getSeconds())].join(':');
      return [d.getDate(), months[d.getMonth()], time].join(' ');
    }
    exports.log = function() {
      console.log('%s - %s', timestamp(), exports.format.apply(exports, arguments));
    };
    exports.inherits = require("npm:inherits@2.0.1");
    exports._extend = function(origin, add) {
      if (!add || !isObject(add))
        return origin;
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
  })(require("github:jspm/nodelibs-process@0.1.1"));
  global.define = __define;
  return module.exports;
});

System.register("github:jspm/nodelibs-buffer@0.1.0/index", ["npm:buffer@3.2.2"], true, function(require, exports, module) {
  var global = System.global,
      __define = global.define;
  global.define = undefined;
  module.exports = System._nodeRequire ? System._nodeRequire('buffer') : require("npm:buffer@3.2.2");
  global.define = __define;
  return module.exports;
});

System.register("npm:ndarray-ops@1.1.1/ndarray-ops", ["npm:cwise-compiler@0.0.0"], true, function(require, exports, module) {
  var global = System.global,
      __define = global.define;
  global.define = undefined;
  "use strict";
  var compile = require("npm:cwise-compiler@0.0.0");
  var EmptyProc = {
    body: "",
    args: [],
    thisVars: [],
    localVars: []
  };
  function fixup(x) {
    if (!x) {
      return EmptyProc;
    }
    for (var i = 0; i < x.args.length; ++i) {
      var a = x.args[i];
      if (i === 0) {
        x.args[i] = {
          name: a,
          lvalue: true,
          rvalue: !!x.rvalue,
          count: x.count || 1
        };
      } else {
        x.args[i] = {
          name: a,
          lvalue: false,
          rvalue: true,
          count: 1
        };
      }
    }
    if (!x.thisVars) {
      x.thisVars = [];
    }
    if (!x.localVars) {
      x.localVars = [];
    }
    return x;
  }
  function pcompile(user_args) {
    return compile({
      args: user_args.args,
      pre: fixup(user_args.pre),
      body: fixup(user_args.body),
      post: fixup(user_args.proc),
      funcName: user_args.funcName
    });
  }
  function makeOp(user_args) {
    var args = [];
    for (var i = 0; i < user_args.args.length; ++i) {
      args.push("a" + i);
    }
    var wrapper = new Function("P", ["return function ", user_args.funcName, "_ndarrayops(", args.join(","), ") {P(", args.join(","), ");return a0}"].join(""));
    return wrapper(pcompile(user_args));
  }
  var assign_ops = {
    add: "+",
    sub: "-",
    mul: "*",
    div: "/",
    mod: "%",
    band: "&",
    bor: "|",
    bxor: "^",
    lshift: "<<",
    rshift: ">>",
    rrshift: ">>>"
  };
  ;
  (function() {
    for (var id in assign_ops) {
      var op = assign_ops[id];
      exports[id] = makeOp({
        args: ["array", "array", "array"],
        body: {
          args: ["a", "b", "c"],
          body: "a=b" + op + "c"
        },
        funcName: id
      });
      exports[id + "eq"] = makeOp({
        args: ["array", "array"],
        body: {
          args: ["a", "b"],
          body: "a" + op + "=b"
        },
        rvalue: true,
        funcName: id + "eq"
      });
      exports[id + "s"] = makeOp({
        args: ["array", "array", "scalar"],
        body: {
          args: ["a", "b", "s"],
          body: "a=b" + op + "s"
        },
        funcName: id + "s"
      });
      exports[id + "seq"] = makeOp({
        args: ["array", "scalar"],
        body: {
          args: ["a", "s"],
          body: "a" + op + "=s"
        },
        rvalue: true,
        funcName: id + "seq"
      });
    }
  })();
  var unary_ops = {
    not: "!",
    bnot: "~",
    neg: "-",
    recip: "1.0/"
  };
  ;
  (function() {
    for (var id in unary_ops) {
      var op = unary_ops[id];
      exports[id] = makeOp({
        args: ["array", "array"],
        body: {
          args: ["a", "b"],
          body: "a=" + op + "b"
        },
        funcName: id
      });
      exports[id + "eq"] = makeOp({
        args: ["array"],
        body: {
          args: ["a"],
          body: "a=" + op + "a"
        },
        rvalue: true,
        count: 2,
        funcName: id + "eq"
      });
    }
  })();
  var binary_ops = {
    and: "&&",
    or: "||",
    eq: "===",
    neq: "!==",
    lt: "<",
    gt: ">",
    leq: "<=",
    geq: ">="
  };
  ;
  (function() {
    for (var id in binary_ops) {
      var op = binary_ops[id];
      exports[id] = makeOp({
        args: ["array", "array", "array"],
        body: {
          args: ["a", "b", "c"],
          body: "a=b" + op + "c"
        },
        funcName: id
      });
      exports[id + "s"] = makeOp({
        args: ["array", "array", "scalar"],
        body: {
          args: ["a", "b", "s"],
          body: "a=b" + op + "s"
        },
        funcName: id + "s"
      });
      exports[id + "eq"] = makeOp({
        args: ["array", "array"],
        body: {
          args: ["a", "b"],
          body: "a=a" + op + "b"
        },
        rvalue: true,
        count: 2,
        funcName: id + "eq"
      });
      exports[id + "seq"] = makeOp({
        args: ["array", "scalar"],
        body: {
          args: ["a", "s"],
          body: "a=a" + op + "s"
        },
        rvalue: true,
        count: 2,
        funcName: id + "seq"
      });
    }
  })();
  var math_unary = ["abs", "acos", "asin", "atan", "ceil", "cos", "exp", "floor", "log", "round", "sin", "sqrt", "tan"];
  ;
  (function() {
    for (var i = 0; i < math_unary.length; ++i) {
      var f = math_unary[i];
      exports[f] = makeOp({
        args: ["array", "array"],
        pre: {
          args: [],
          body: "this_f=Math." + f,
          thisVars: ["this_f"]
        },
        body: {
          args: ["a", "b"],
          body: "a=this_f(b)",
          thisVars: ["this_f"]
        },
        funcName: f
      });
      exports[f + "eq"] = makeOp({
        args: ["array"],
        pre: {
          args: [],
          body: "this_f=Math." + f,
          thisVars: ["this_f"]
        },
        body: {
          args: ["a"],
          body: "a=this_f(a)",
          thisVars: ["this_f"]
        },
        rvalue: true,
        count: 2,
        funcName: f + "eq"
      });
    }
  })();
  var math_comm = ["max", "min", "atan2", "pow"];
  ;
  (function() {
    for (var i = 0; i < math_comm.length; ++i) {
      var f = math_comm[i];
      exports[f] = makeOp({
        args: ["array", "array", "array"],
        pre: {
          args: [],
          body: "this_f=Math." + f,
          thisVars: ["this_f"]
        },
        body: {
          args: ["a", "b", "c"],
          body: "a=this_f(b,c)",
          thisVars: ["this_f"]
        },
        funcName: f
      });
      exports[f + "s"] = makeOp({
        args: ["array", "array", "scalar"],
        pre: {
          args: [],
          body: "this_f=Math." + f,
          thisVars: ["this_f"]
        },
        body: {
          args: ["a", "b", "c"],
          body: "a=this_f(b,c)",
          thisVars: ["this_f"]
        },
        funcName: f + "s"
      });
      exports[f + "eq"] = makeOp({
        args: ["array", "array"],
        pre: {
          args: [],
          body: "this_f=Math." + f,
          thisVars: ["this_f"]
        },
        body: {
          args: ["a", "b"],
          body: "a=this_f(a,b)",
          thisVars: ["this_f"]
        },
        rvalue: true,
        count: 2,
        funcName: f + "eq"
      });
      exports[f + "seq"] = makeOp({
        args: ["array", "scalar"],
        pre: {
          args: [],
          body: "this_f=Math." + f,
          thisVars: ["this_f"]
        },
        body: {
          args: ["a", "b"],
          body: "a=this_f(a,b)",
          thisVars: ["this_f"]
        },
        rvalue: true,
        count: 2,
        funcName: f + "seq"
      });
    }
  })();
  var math_noncomm = ["atan2", "pow"];
  ;
  (function() {
    for (var i = 0; i < math_noncomm.length; ++i) {
      var f = math_noncomm[i];
      exports[f + "op"] = makeOp({
        args: ["array", "array", "array"],
        pre: {
          args: [],
          body: "this_f=Math." + f,
          thisVars: ["this_f"]
        },
        body: {
          args: ["a", "b", "c"],
          body: "a=this_f(c,b)",
          thisVars: ["this_f"]
        },
        funcName: f + "op"
      });
      exports[f + "ops"] = makeOp({
        args: ["array", "array", "scalar"],
        pre: {
          args: [],
          body: "this_f=Math." + f,
          thisVars: ["this_f"]
        },
        body: {
          args: ["a", "b", "c"],
          body: "a=this_f(c,b)",
          thisVars: ["this_f"]
        },
        funcName: f + "ops"
      });
      exports[f + "opeq"] = makeOp({
        args: ["array", "array"],
        pre: {
          args: [],
          body: "this_f=Math." + f,
          thisVars: ["this_f"]
        },
        body: {
          args: ["a", "b"],
          body: "a=this_f(b,a)",
          thisVars: ["this_f"]
        },
        rvalue: true,
        count: 2,
        funcName: f + "opeq"
      });
      exports[f + "opseq"] = makeOp({
        args: ["array", "scalar"],
        pre: {
          args: [],
          body: "this_f=Math." + f,
          thisVars: ["this_f"]
        },
        body: {
          args: ["a", "b"],
          body: "a=this_f(b,a)",
          thisVars: ["this_f"]
        },
        rvalue: true,
        count: 2,
        funcName: f + "opseq"
      });
    }
  })();
  exports.any = compile({
    args: ["array"],
    pre: EmptyProc,
    body: {
      args: [{
        name: "a",
        lvalue: false,
        rvalue: true,
        count: 1
      }],
      body: "if(a){return true}",
      localVars: [],
      thisVars: []
    },
    post: {
      args: [],
      localVars: [],
      thisVars: [],
      body: "return false"
    },
    funcName: "any"
  });
  exports.all = compile({
    args: ["array"],
    pre: EmptyProc,
    body: {
      args: [{
        name: "x",
        lvalue: false,
        rvalue: true,
        count: 1
      }],
      body: "if(!x){return false}",
      localVars: [],
      thisVars: []
    },
    post: {
      args: [],
      localVars: [],
      thisVars: [],
      body: "return true"
    },
    funcName: "all"
  });
  exports.sum = compile({
    args: ["array"],
    pre: {
      args: [],
      localVars: [],
      thisVars: ["this_s"],
      body: "this_s=0"
    },
    body: {
      args: [{
        name: "a",
        lvalue: false,
        rvalue: true,
        count: 1
      }],
      body: "this_s+=a",
      localVars: [],
      thisVars: ["this_s"]
    },
    post: {
      args: [],
      localVars: [],
      thisVars: ["this_s"],
      body: "return this_s"
    },
    funcName: "sum"
  });
  exports.prod = compile({
    args: ["array"],
    pre: {
      args: [],
      localVars: [],
      thisVars: ["this_s"],
      body: "this_s=1"
    },
    body: {
      args: [{
        name: "a",
        lvalue: false,
        rvalue: true,
        count: 1
      }],
      body: "this_s*=a",
      localVars: [],
      thisVars: ["this_s"]
    },
    post: {
      args: [],
      localVars: [],
      thisVars: ["this_s"],
      body: "return this_s"
    },
    funcName: "prod"
  });
  exports.norm2squared = compile({
    args: ["array"],
    pre: {
      args: [],
      localVars: [],
      thisVars: ["this_s"],
      body: "this_s=0"
    },
    body: {
      args: [{
        name: "a",
        lvalue: false,
        rvalue: true,
        count: 2
      }],
      body: "this_s+=a*a",
      localVars: [],
      thisVars: ["this_s"]
    },
    post: {
      args: [],
      localVars: [],
      thisVars: ["this_s"],
      body: "return this_s"
    },
    funcName: "norm2squared"
  });
  exports.norm2 = compile({
    args: ["array"],
    pre: {
      args: [],
      localVars: [],
      thisVars: ["this_s"],
      body: "this_s=0"
    },
    body: {
      args: [{
        name: "a",
        lvalue: false,
        rvalue: true,
        count: 2
      }],
      body: "this_s+=a*a",
      localVars: [],
      thisVars: ["this_s"]
    },
    post: {
      args: [],
      localVars: [],
      thisVars: ["this_s"],
      body: "return Math.sqrt(this_s)"
    },
    funcName: "norm2"
  });
  exports.norminf = compile({
    args: ["array"],
    pre: {
      args: [],
      localVars: [],
      thisVars: ["this_s"],
      body: "this_s=0"
    },
    body: {
      args: [{
        name: "a",
        lvalue: false,
        rvalue: true,
        count: 4
      }],
      body: "if(-a>this_s){this_s=-a}else if(a>this_s){this_s=a}",
      localVars: [],
      thisVars: ["this_s"]
    },
    post: {
      args: [],
      localVars: [],
      thisVars: ["this_s"],
      body: "return this_s"
    },
    funcName: "norminf"
  });
  exports.norm1 = compile({
    args: ["array"],
    pre: {
      args: [],
      localVars: [],
      thisVars: ["this_s"],
      body: "this_s=0"
    },
    body: {
      args: [{
        name: "a",
        lvalue: false,
        rvalue: true,
        count: 3
      }],
      body: "this_s+=a<0?-a:a",
      localVars: [],
      thisVars: ["this_s"]
    },
    post: {
      args: [],
      localVars: [],
      thisVars: ["this_s"],
      body: "return this_s"
    },
    funcName: "norm1"
  });
  exports.sup = compile({
    args: ["array"],
    pre: {
      body: "this_h=-Infinity",
      args: [],
      thisVars: ["this_h"],
      localVars: []
    },
    body: {
      body: "if(_inline_1_arg0_>this_h)this_h=_inline_1_arg0_",
      args: [{
        "name": "_inline_1_arg0_",
        "lvalue": false,
        "rvalue": true,
        "count": 2
      }],
      thisVars: ["this_h"],
      localVars: []
    },
    post: {
      body: "return this_h",
      args: [],
      thisVars: ["this_h"],
      localVars: []
    }
  });
  exports.inf = compile({
    args: ["array"],
    pre: {
      body: "this_h=Infinity",
      args: [],
      thisVars: ["this_h"],
      localVars: []
    },
    body: {
      body: "if(_inline_1_arg0_<this_h)this_h=_inline_1_arg0_",
      args: [{
        "name": "_inline_1_arg0_",
        "lvalue": false,
        "rvalue": true,
        "count": 2
      }],
      thisVars: ["this_h"],
      localVars: []
    },
    post: {
      body: "return this_h",
      args: [],
      thisVars: ["this_h"],
      localVars: []
    }
  });
  exports.argmin = compile({
    args: ["index", "array", "shape"],
    pre: {
      body: "{this_v=Infinity;this_i=_inline_0_arg2_.slice(0)}",
      args: [{
        name: "_inline_0_arg0_",
        lvalue: false,
        rvalue: false,
        count: 0
      }, {
        name: "_inline_0_arg1_",
        lvalue: false,
        rvalue: false,
        count: 0
      }, {
        name: "_inline_0_arg2_",
        lvalue: false,
        rvalue: true,
        count: 1
      }],
      thisVars: ["this_i", "this_v"],
      localVars: []
    },
    body: {
      body: "{if(_inline_1_arg1_<this_v){this_v=_inline_1_arg1_;for(var _inline_1_k=0;_inline_1_k<_inline_1_arg0_.length;++_inline_1_k){this_i[_inline_1_k]=_inline_1_arg0_[_inline_1_k]}}}",
      args: [{
        name: "_inline_1_arg0_",
        lvalue: false,
        rvalue: true,
        count: 2
      }, {
        name: "_inline_1_arg1_",
        lvalue: false,
        rvalue: true,
        count: 2
      }],
      thisVars: ["this_i", "this_v"],
      localVars: ["_inline_1_k"]
    },
    post: {
      body: "{return this_i}",
      args: [],
      thisVars: ["this_i"],
      localVars: []
    }
  });
  exports.argmax = compile({
    args: ["index", "array", "shape"],
    pre: {
      body: "{this_v=-Infinity;this_i=_inline_0_arg2_.slice(0)}",
      args: [{
        name: "_inline_0_arg0_",
        lvalue: false,
        rvalue: false,
        count: 0
      }, {
        name: "_inline_0_arg1_",
        lvalue: false,
        rvalue: false,
        count: 0
      }, {
        name: "_inline_0_arg2_",
        lvalue: false,
        rvalue: true,
        count: 1
      }],
      thisVars: ["this_i", "this_v"],
      localVars: []
    },
    body: {
      body: "{if(_inline_1_arg1_>this_v){this_v=_inline_1_arg1_;for(var _inline_1_k=0;_inline_1_k<_inline_1_arg0_.length;++_inline_1_k){this_i[_inline_1_k]=_inline_1_arg0_[_inline_1_k]}}}",
      args: [{
        name: "_inline_1_arg0_",
        lvalue: false,
        rvalue: true,
        count: 2
      }, {
        name: "_inline_1_arg1_",
        lvalue: false,
        rvalue: true,
        count: 2
      }],
      thisVars: ["this_i", "this_v"],
      localVars: ["_inline_1_k"]
    },
    post: {
      body: "{return this_i}",
      args: [],
      thisVars: ["this_i"],
      localVars: []
    }
  });
  exports.random = makeOp({
    args: ["array"],
    pre: {
      args: [],
      body: "this_f=Math.random",
      thisVars: ["this_f"]
    },
    body: {
      args: ["a"],
      body: "a=this_f()",
      thisVars: ["this_f"]
    },
    funcName: "random"
  });
  exports.assign = makeOp({
    args: ["array", "array"],
    body: {
      args: ["a", "b"],
      body: "a=b"
    },
    funcName: "assign"
  });
  exports.assigns = makeOp({
    args: ["array", "scalar"],
    body: {
      args: ["a", "b"],
      body: "a=b"
    },
    funcName: "assigns"
  });
  global.define = __define;
  return module.exports;
});

System.register("npm:cwise@0.3.4/cwise", ["npm:cwise-parser@0.0.1", "npm:cwise-compiler@0.0.0"], true, function(require, exports, module) {
  var global = System.global,
      __define = global.define;
  global.define = undefined;
  "use strict";
  var parse = require("npm:cwise-parser@0.0.1");
  var compile = require("npm:cwise-compiler@0.0.0");
  var REQUIRED_FIELDS = ["args", "body"];
  var OPTIONAL_FIELDS = ["pre", "post", "printCode", "funcName", "blockSize"];
  function createCWise(user_args) {
    for (var id in user_args) {
      if (REQUIRED_FIELDS.indexOf(id) < 0 && OPTIONAL_FIELDS.indexOf(id) < 0) {
        console.warn("cwise: Unknown argument '" + id + "' passed to expression compiler");
      }
    }
    for (var i = 0; i < REQUIRED_FIELDS.length; ++i) {
      if (!user_args[REQUIRED_FIELDS[i]]) {
        throw new Error("cwise: Missing argument: " + REQUIRED_FIELDS[i]);
      }
    }
    return compile({
      args: user_args.args,
      pre: parse(user_args.pre || function() {}),
      body: parse(user_args.body),
      post: parse(user_args.post || function() {}),
      debug: !!user_args.printCode,
      funcName: user_args.funcName || user_args.body.name || "cwise",
      blockSize: user_args.blockSize || 64
    });
  }
  module.exports = createCWise;
  global.define = __define;
  return module.exports;
});

System.register("npm:gl-texture2d@0.1.12/texture", ["npm:ndarray@1.0.18", "npm:ndarray-ops@1.1.1", "npm:typedarray-pool@1.1.0", "npm:webglew@0.0.0"], true, function(require, exports, module) {
  var global = System.global,
      __define = global.define;
  global.define = undefined;
  "use strict";
  var ndarray = require("npm:ndarray@1.0.18");
  var ops = require("npm:ndarray-ops@1.1.1");
  var pool = require("npm:typedarray-pool@1.1.0");
  var webglew = require("npm:webglew@0.0.0");
  var linearTypes = null;
  var filterTypes = null;
  var wrapTypes = null;
  function lazyInitLinearTypes(gl) {
    linearTypes = [gl.LINEAR, gl.NEAREST_MIPMAP_LINEAR, gl.LINEAR_MIPMAP_NEAREST, gl.LINEAR_MIPMAP_NEAREST];
    filterTypes = [gl.NEAREST, gl.LINEAR, gl.NEAREST_MIPMAP_NEAREST, gl.NEAREST_MIPMAP_LINEAR, gl.LINEAR_MIPMAP_NEAREST, gl.LINEAR_MIPMAP_LINEAR];
    wrapTypes = [gl.REPEAT, gl.CLAMP_TO_EDGE, gl.MIRRORED_REPEAT];
  }
  var convertFloatToUint8 = function(out, inp) {
    ops.muls(out, inp, 255.0);
  };
  function Texture2D(gl, handle, width, height, format, type) {
    this.gl = gl;
    this.handle = handle;
    this.shape = [height, width];
    this.format = format;
    this.type = type;
    this._mipLevels = [0];
    this._magFilter = gl.NEAREST;
    this._minFilter = gl.NEAREST;
    this._wrapS = gl.CLAMP_TO_EDGE;
    this._wrapT = gl.CLAMP_TO_EDGE;
    this._anisoSamples = 1;
  }
  Object.defineProperty(Texture2D.prototype, "minFilter", {
    get: function() {
      return this._minFilter;
    },
    set: function(v) {
      this.bind();
      var gl = this.gl;
      if (this.type === gl.FLOAT && linearTypes.indexOf(v) >= 0) {
        if (!webglew(gl).OES_texture_float_linear) {
          v = gl.NEAREST;
        }
      }
      if (filterTypes.indexOf(v) < 0) {
        throw new Error("gl-texture2d: Unknown filter mode " + v);
      }
      gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MIN_FILTER, v);
      return this._minFilter = v;
    }
  });
  var proto = Texture2D.prototype;
  Object.defineProperty(proto, "magFilter", {
    get: function() {
      return this._magFilter;
    },
    set: function(v) {
      this.bind();
      var gl = this.gl;
      if (this.type === gl.FLOAT && linearTypes.indexOf(v) >= 0) {
        if (!webglew(gl).OES_texture_float_linear) {
          v = gl.NEAREST;
        }
      }
      if (filterTypes.indexOf(v) < 0) {
        throw new Error("gl-texture2d: Unknown filter mode " + v);
      }
      gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MAG_FILTER, v);
      return this._magFilter = v;
    }
  });
  Object.defineProperty(proto, "wrapS", {
    get: function() {
      return this._wrapS;
    },
    set: function(v) {
      this.bind();
      if (wrapTypes.indexOf(v) < 0) {
        throw new Error("gl-texture2d: Unknown wrap mode " + v);
      }
      this.gl.texParameteri(this.gl.TEXTURE_2D, this.gl.TEXTURE_WRAP_S, v);
      return this._wrapS = v;
    }
  });
  Object.defineProperty(proto, "wrapT", {
    get: function() {
      return this._wrapT;
    },
    set: function(v) {
      this.bind();
      if (wrapTypes.indexOf(v) < 0) {
        throw new Error("gl-texture2d: Unknown wrap mode " + v);
      }
      this.gl.texParameteri(this.gl.TEXTURE_2D, this.gl.TEXTURE_WRAP_T, v);
      return this._wrapT = v;
    }
  });
  Object.defineProperty(proto, "mipSamples", {
    get: function() {
      return this._anisoSamples;
    },
    set: function(i) {
      var psamples = this._anisoSamples;
      this._anisoSamples = i | 0;
      if (psamples !== this._anisoSamples) {
        var ext = webglew(this.gl).EXT_texture_filter_anisotropic;
        if (ext) {
          this.gl.texParameterf(this.gl.TEXTURE_2D, ext.TEXTURE_MAX_ANISOTROPY_EXT, this._anisoSamples);
        }
      }
      return this._anisoSamples;
    }
  });
  proto.bind = function bindTexture2D(unit) {
    var gl = this.gl;
    if (unit !== undefined) {
      gl.activeTexture(gl.TEXTURE0 + (unit | 0));
    }
    gl.bindTexture(gl.TEXTURE_2D, this.handle);
    if (unit !== undefined) {
      return unit;
    }
    return gl.getParameter(gl.ACTIVE_TEXTURE) - gl.TEXTURE0;
  };
  proto.dispose = function disposeTexture2D() {
    this.gl.deleteTexture(this.handle);
  };
  proto.generateMipmap = function() {
    this.bind();
    this.gl.generateMipmap(this.gl.TEXTURE_2D);
    var l = Math.min(this.shape[0], this.shape[1]);
    for (var i = 0; l > 0; ++i, l >>>= 1) {
      if (this._mipLevels.indexOf(i) < 0) {
        this._mipLevels.push(i);
      }
    }
  };
  proto.setPixels = function(data, x_off, y_off, mip_level) {
    var gl = this.gl;
    this.bind();
    x_off = x_off || 0;
    y_off = y_off || 0;
    mip_level = mip_level || 0;
    if (data instanceof HTMLCanvasElement || data instanceof ImageData || data instanceof HTMLImageElement || data instanceof HTMLVideoElement) {
      var needsMip = this._mipLevels.indexOf(mip_level) < 0;
      if (needsMip) {
        gl.texImage2D(gl.TEXTURE_2D, 0, this.format, this.format, this.type, data);
        this._mipLevels.push(mip_level);
      } else {
        gl.texSubImage2D(gl.TEXTURE_2D, mip_level, x_off, y_off, this.format, this.type, data);
      }
    } else if (data.shape && data.stride && data.data) {
      if (data.shape.length < 2 || x_off + data.shape[1] > this.shape[1] >>> mip_level || y_off + data.shape[0] > this.shape[0] >>> mip_level || x_off < 0 || y_off < 0) {
        throw new Error("Texture dimensions are out of bounds");
      }
      texSubImageArray(gl, x_off, y_off, mip_level, this.format, this.type, this._mipLevels, data);
    } else {
      throw new Error("Unsupported data type");
    }
  };
  function texSubImageArray(gl, x_off, y_off, mip_level, cformat, ctype, mipLevels, array) {
    var dtype = array.dtype || ndarray.dtype(array);
    var shape = array.shape;
    var packed = isPacked(array);
    var type = 0,
        format = 0;
    if (dtype === "float32") {
      type = gl.FLOAT;
    } else if (dtype === "float64") {
      type = gl.FLOAT;
      packed = false;
      dtype = "float32";
    } else if (dtype === "uint8") {
      type = gl.UNSIGNED_BYTE;
    } else {
      type = gl.UNSIGNED_BYTE;
      packed = false;
    }
    if (shape.length === 2) {
      format = gl.LUMINANCE;
    } else if (shape.length === 3) {
      if (shape[2] === 1) {
        format = gl.ALPHA;
      } else if (shape[2] === 2) {
        format = gl.LUMINANCE_ALPHA;
      } else if (shape[2] === 3) {
        format = gl.RGB;
      } else if (shape[2] === 4) {
        format = gl.RGBA;
      } else {
        throw new Error("Invalid shape for pixel coords");
      }
    } else {
      throw new Error("Invalid shape for texture");
    }
    if ((format === gl.LUMINANCE || format === gl.ALPHA) && (cformat === gl.LUMINANCE || cformat === gl.ALPHA)) {
      format = cformat;
    }
    if (format !== cformat) {
      throw new Error("Incompatible texture format for setPixels");
    }
    var size = array.size;
    if (typeof size !== "number") {
      size = ndarray.size(array);
    }
    var needsMip = mipLevels.indexOf(mip_level) < 0;
    if (needsMip) {
      mipLevels.push(mip_level);
    }
    if (type === ctype && packed) {
      if (array.offset === 0 && array.data.length === size) {
        if (needsMip) {
          gl.texImage2D(gl.TEXTURE_2D, mip_level, cformat, shape[1], shape[0], 0, cformat, ctype, array.data);
        } else {
          gl.texSubImage2D(gl.TEXTURE_2D, mip_level, x_off, y_off, shape[1], shape[0], cformat, ctype, array.data);
        }
      } else {
        if (needsMip) {
          gl.texImage2D(gl.TEXTURE_2D, mip_level, cformat, shape[1], shape[0], 0, cformat, ctype, array.data.subarray(array.offset, array.offset + size));
        } else {
          gl.texSubImage2D(gl.TEXTURE_2D, mip_level, x_off, y_off, shape[1], shape[0], cformat, ctype, array.data.subarray(array.offset, array.offset + size));
        }
      }
    } else {
      var pack_buffer;
      if (ctype === gl.FLOAT) {
        pack_buffer = pool.mallocFloat32(size);
      } else {
        pack_buffer = pool.mallocUint8(size);
      }
      var pack_view = ndarray(pack_buffer, shape);
      if (type === gl.FLOAT && ctype === gl.UNSIGNED_BYTE) {
        convertFloatToUint8(pack_view, array);
      } else {
        ops.assign(pack_view, array);
      }
      if (needsMip) {
        gl.texImage2D(gl.TEXTURE_2D, mip_level, cformat, shape[1], shape[0], 0, cformat, ctype, pack_buffer.subarray(0, size));
      } else {
        gl.texSubImage2D(gl.TEXTURE_2D, mip_level, x_off, y_off, shape[1], shape[0], cformat, ctype, pack_buffer.subarray(0, size));
      }
      if (ctype === gl.FLOAT) {
        pool.freeFloat32(pack_buffer);
      } else {
        pool.freeUint8(pack_buffer);
      }
    }
  }
  function initTexture(gl) {
    var tex = gl.createTexture();
    gl.bindTexture(gl.TEXTURE_2D, tex);
    gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MIN_FILTER, gl.NEAREST);
    gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MAG_FILTER, gl.NEAREST);
    gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_WRAP_S, gl.CLAMP_TO_EDGE);
    gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_WRAP_T, gl.CLAMP_TO_EDGE);
    return tex;
  }
  function createTextureShape(gl, width, height, format, type) {
    var tex = initTexture(gl);
    gl.texImage2D(gl.TEXTURE_2D, 0, format, width, height, 0, format, type, null);
    return new Texture2D(gl, tex, width, height, format, type);
  }
  function createTextureDOM(gl, element, format, type) {
    var tex = initTexture(gl);
    gl.texImage2D(gl.TEXTURE_2D, 0, format, format, type, element);
    return new Texture2D(gl, tex, element.width | 0, element.height | 0, format, type);
  }
  function isPacked(array) {
    var shape = array.shape;
    var stride = array.stride;
    var s = 1;
    for (var i = shape.length - 1; i >= 0; --i) {
      if (stride[i] !== s) {
        return false;
      }
      s *= shape[i];
    }
    return true;
  }
  function createTextureArray(gl, array) {
    var dtype = array.dtype || ndarray.dtype(array);
    var shape = array.shape;
    var packed = isPacked(array);
    var type = 0;
    if (dtype === "float32") {
      type = gl.FLOAT;
    } else if (dtype === "float64") {
      type = gl.FLOAT;
      packed = false;
      dtype = "float32";
    } else if (dtype === "uint8") {
      type = gl.UNSIGNED_BYTE;
    } else {
      type = gl.UNSIGNED_BYTE;
      packed = false;
    }
    var format = 0;
    if (shape.length === 2) {
      format = gl.LUMINANCE;
    } else if (shape.length === 3) {
      if (shape[2] === 1) {
        format = gl.ALPHA;
      } else if (shape[2] === 2) {
        format = gl.LUMINANCE_ALPHA;
      } else if (shape[2] === 3) {
        format = gl.RGB;
      } else if (shape[2] === 4) {
        format = gl.RGBA;
      } else {
        throw new Error("Invalid shape for pixel coords");
      }
    } else {
      throw new Error("Invalid shape for texture");
    }
    if (type === gl.FLOAT && !!webglew(gl).texture_float) {
      type = gl.UNSIGNED_BYTE;
      packed = false;
    }
    var buffer,
        buf_store;
    if (!packed) {
      var sz = 1;
      var stride = new Array(shape.length);
      for (var i = shape.length - 1; i >= 0; --i) {
        stride[i] = sz;
        sz *= shape[i];
      }
      buf_store = pool.malloc(sz, dtype);
      var buf_array = ndarray(buf_store, array.shape, stride, 0);
      if ((dtype === "float32" || dtype === "float64") && type === gl.UNSIGNED_BYTE) {
        convertFloatToUint8(buf_array, array);
      } else {
        ops.assign(buf_array, array);
      }
      buffer = buf_store.subarray(0, sz);
    } else {
      var array_size = array.size;
      if (typeof array_size !== "number") {
        array_size = ndarray.size(array);
      }
      buffer = array.data.subarray(array.offset, array.offset + array_size);
    }
    var tex = initTexture(gl);
    gl.texImage2D(gl.TEXTURE_2D, 0, format, shape[1], shape[0], 0, format, type, buffer);
    if (!packed) {
      pool.free(buf_store);
    }
    return new Texture2D(gl, tex, shape[1], shape[0], format, type);
  }
  function createTexture2D(gl) {
    if (arguments.length <= 1) {
      throw new Error("Missing arguments for texture2d constructor");
    }
    if (!linearTypes) {
      lazyInitLinearTypes(gl);
    }
    if (typeof arguments[1] === "number") {
      return createTextureShape(gl, arguments[1], arguments[2], arguments[3] || gl.RGBA, arguments[4] || gl.UNSIGNED_BYTE);
    }
    if (typeof arguments[1] === "object") {
      var obj = arguments[1];
      if (obj instanceof HTMLCanvasElement || obj instanceof HTMLImageElement || obj instanceof HTMLVideoElement || obj instanceof ImageData) {
        return createTextureDOM(gl, obj, arguments[2] || gl.RGBA, arguments[3] || gl.UNSIGNED_BYTE);
      } else if (obj.shape && obj.data && obj.stride) {
        return createTextureArray(gl, obj);
      }
    }
    throw new Error("Invalid arguments for texture2d constructor");
  }
  module.exports = createTexture2D;
  global.define = __define;
  return module.exports;
});

System.register("npm:ao-mesher@0.2.10/mesh", ["npm:ndarray@1.0.18", "npm:cwise-compiler@0.1.0", "npm:greedy-mesher@1.0.2", "npm:typedarray-pool@0.1.2"], true, function(require, exports, module) {
  var global = System.global,
      __define = global.define;
  global.define = undefined;
  "use strict";
  var ndarray = require("npm:ndarray@1.0.18");
  var compileCWise = require("npm:cwise-compiler@0.1.0");
  var compileMesher = require("npm:greedy-mesher@1.0.2");
  var pool = require("npm:typedarray-pool@0.1.2");
  var OPAQUE_BIT = (1 << 15);
  var VOXEL_MASK = (1 << 16) - 1;
  var AO_SHIFT = 16;
  var AO_BITS = 2;
  var AO_MASK = (1 << AO_BITS) - 1;
  var FLIP_BIT = (1 << (AO_SHIFT + 4 * AO_BITS));
  var TEXTURE_SHIFT = 4;
  var TEXTURE_MASK = (1 << TEXTURE_SHIFT) - 1;
  var VERTEX_SIZE = 8;
  function voxelTexture(voxel, side, voxelSideTextureIDs) {
    return voxelSideTextureIDs ? voxelSideTextureIDs.get(voxel & 0xff, side) : voxel & 0xff;
  }
  function vertexAO(s1, s2, c) {
    if (s1 && s2) {
      return 1;
    }
    return 3 - (s1 + s2 + c);
  }
  function facetAO(a00, a01, a02, a10, a12, a20, a21, a22) {
    var s00 = (a00 & OPAQUE_BIT) ? 1 : 0,
        s01 = (a01 & OPAQUE_BIT) ? 1 : 0,
        s02 = (a02 & OPAQUE_BIT) ? 1 : 0,
        s10 = (a10 & OPAQUE_BIT) ? 1 : 0,
        s12 = (a12 & OPAQUE_BIT) ? 1 : 0,
        s20 = (a20 & OPAQUE_BIT) ? 1 : 0,
        s21 = (a21 & OPAQUE_BIT) ? 1 : 0,
        s22 = (a22 & OPAQUE_BIT) ? 1 : 0;
    return (vertexAO(s10, s01, s00) << AO_SHIFT) + (vertexAO(s01, s12, s02) << (AO_SHIFT + AO_BITS)) + (vertexAO(s12, s21, s22) << (AO_SHIFT + 2 * AO_BITS)) + (vertexAO(s21, s10, s20) << (AO_SHIFT + 3 * AO_BITS));
  }
  function generateSurfaceVoxel(v000, v001, v002, v010, v011, v012, v020, v021, v022, v100, v101, v102, v110, v111, v112, v120, v121, v122) {
    var t0 = !(v011 & OPAQUE_BIT),
        t1 = !(v111 & OPAQUE_BIT);
    if (v111 && (!v011 || (t0 && !t1))) {
      return v111 | FLIP_BIT | facetAO(v000, v001, v002, v010, v012, v020, v021, v022);
    } else if (v011 && (!v111 || (t1 && !t0))) {
      return v011 | facetAO(v100, v101, v102, v110, v112, v120, v121, v122);
    }
  }
  var surfaceStencil = (function() {
    function arg(name, lv, rv, count) {
      return {
        name: name,
        lvalue: lv,
        rvalue: rv,
        count: count
      };
    }
    var empty_proc = {
      args: [],
      thisVars: [],
      localVars: [],
      body: ""
    };
    var cwise_args = ["scalar", "array", "array", "array", "array"];
    var cwise_arg_names = [arg("_func", false, true, 3), arg("_o0", true, false, 1), arg("_o1", true, false, 1), arg("_o2", true, false, 1)];
    var cwise_body = [];
    for (var d = 0; d < 3; ++d) {
      var u = (d + 1) % 3;
      var v = (d + 2) % 3;
      var expr = [];
      for (var dz = 0; dz < 2; ++dz)
        for (var dy = 0; dy <= 2; ++dy)
          for (var dx = 0; dx <= 2; ++dx) {
            var x = [dx, dy, dz];
            expr.push(["_a", x[v], x[u], x[d]].join(""));
          }
      cwise_body.push(["_o", d, "=_func(", expr.join(","), ")"].join(""));
    }
    var cwise_body_str = cwise_body.join("\n");
    for (var dx = -1; dx <= 1; ++dx)
      for (var dy = -1; dy <= 1; ++dy)
        for (var dz = -1; dz <= 1; ++dz) {
          if (dx === 1 && dy === 1 && dz === 1) {
            continue;
          }
          if (!(dx === -1 && dy === -1 && dz === -1)) {
            cwise_args.push({
              offset: [dx + 1, dy + 1, dz + 1],
              array: 3
            });
          }
          var carg_name = ["_a", dx + 1, dy + 1, dz + 1].join("");
          cwise_arg_names.push(arg(carg_name, false, true, cwise_body_str.split(carg_name).length - 1));
        }
    return compileCWise({
      args: cwise_args,
      pre: empty_proc,
      body: {
        args: cwise_arg_names,
        body: cwise_body_str,
        thisVars: [],
        localVars: []
      },
      post: empty_proc,
      funcName: "calcAO"
    }).bind(undefined, generateSurfaceVoxel);
  })();
  function MeshBuilder() {
    this.buffer = pool.mallocUint8(1024);
    this.ptr = 0;
    this.z = 0;
    this.u = 0;
    this.v = 0;
    this.d = 0;
  }
  var AO_TABLE = new Uint8Array([0, 153, 204, 255]);
  MeshBuilder.prototype.append = function(lo_x, lo_y, hi_x, hi_y, val) {
    var buffer = this.buffer;
    var ptr = this.ptr >>> 0;
    var z = this.z | 0;
    var u = this.u | 0;
    var v = this.v | 0;
    var d = this.d | 0;
    if (ptr + 6 * VERTEX_SIZE > buffer.length) {
      var tmp = pool.mallocUint8(2 * buffer.length);
      tmp.set(buffer);
      pool.freeUint8(buffer);
      buffer = tmp;
      this.buffer = buffer;
    }
    var flip = !!(val & FLIP_BIT);
    var side = d + (flip ? 3 : 0);
    var a00 = AO_TABLE[((val >>> AO_SHIFT) & AO_MASK)];
    var a10 = AO_TABLE[((val >>> (AO_SHIFT + AO_BITS)) & AO_MASK)];
    var a11 = AO_TABLE[((val >>> (AO_SHIFT + 2 * AO_BITS)) & AO_MASK)];
    var a01 = AO_TABLE[((val >>> (AO_SHIFT + 3 * AO_BITS)) & AO_MASK)];
    var tex_id = voxelTexture(val & VOXEL_MASK, side, this.voxelSideTextureIDs);
    var nx = 128,
        ny = 128,
        nz = 128;
    var sign = flip ? 127 : 129;
    if (d === 0) {
      nx = sign;
    } else if (d === 1) {
      ny = sign;
    } else if (d === 2) {
      nz = sign;
    }
    var flipAO = a00 + a11 < a10 + a01;
    if (a00 + a11 === a10 + a01) {
      flipAO = Math.max(a00, a11) < Math.max(a10, a01);
    }
    if (flipAO) {
      if (!flip) {
        buffer[ptr + u] = lo_x;
        buffer[ptr + v] = lo_y;
        buffer[ptr + d] = z;
        buffer[ptr + 3] = a00;
        buffer[ptr + 4] = nx;
        buffer[ptr + 5] = ny;
        buffer[ptr + 6] = nz;
        buffer[ptr + 7] = tex_id;
        ptr += 8;
        buffer[ptr + u] = lo_x;
        buffer[ptr + v] = hi_y;
        buffer[ptr + d] = z;
        buffer[ptr + 3] = a01;
        buffer[ptr + 4] = nx;
        buffer[ptr + 5] = ny;
        buffer[ptr + 6] = nz;
        buffer[ptr + 7] = tex_id;
        ptr += 8;
        buffer[ptr + u] = hi_x;
        buffer[ptr + v] = lo_y;
        buffer[ptr + d] = z;
        buffer[ptr + 3] = a10;
        buffer[ptr + 4] = nx;
        buffer[ptr + 5] = ny;
        buffer[ptr + 6] = nz;
        buffer[ptr + 7] = tex_id;
        ptr += 8;
        buffer[ptr + u] = hi_x;
        buffer[ptr + v] = hi_y;
        buffer[ptr + d] = z;
        buffer[ptr + 3] = a11;
        buffer[ptr + 4] = nx;
        buffer[ptr + 5] = ny;
        buffer[ptr + 6] = nz;
        buffer[ptr + 7] = tex_id;
        ptr += 8;
        buffer[ptr + u] = hi_x;
        buffer[ptr + v] = lo_y;
        buffer[ptr + d] = z;
        buffer[ptr + 3] = a10;
        buffer[ptr + 4] = nx;
        buffer[ptr + 5] = ny;
        buffer[ptr + 6] = nz;
        buffer[ptr + 7] = tex_id;
        ptr += 8;
        buffer[ptr + u] = lo_x;
        buffer[ptr + v] = hi_y;
        buffer[ptr + d] = z;
        buffer[ptr + 3] = a01;
        buffer[ptr + 4] = nx;
        buffer[ptr + 5] = ny;
        buffer[ptr + 6] = nz;
        buffer[ptr + 7] = tex_id;
        ptr += 8;
      } else {
        buffer[ptr + u] = lo_x;
        buffer[ptr + v] = lo_y;
        buffer[ptr + d] = z;
        buffer[ptr + 3] = a00;
        buffer[ptr + 4] = nx;
        buffer[ptr + 5] = ny;
        buffer[ptr + 6] = nz;
        buffer[ptr + 7] = tex_id;
        ptr += 8;
        buffer[ptr + u] = hi_x;
        buffer[ptr + v] = lo_y;
        buffer[ptr + d] = z;
        buffer[ptr + 3] = a10;
        buffer[ptr + 4] = nx;
        buffer[ptr + 5] = ny;
        buffer[ptr + 6] = nz;
        buffer[ptr + 7] = tex_id;
        ptr += 8;
        buffer[ptr + u] = lo_x;
        buffer[ptr + v] = hi_y;
        buffer[ptr + d] = z;
        buffer[ptr + 3] = a01;
        buffer[ptr + 4] = nx;
        buffer[ptr + 5] = ny;
        buffer[ptr + 6] = nz;
        buffer[ptr + 7] = tex_id;
        ptr += 8;
        buffer[ptr + u] = hi_x;
        buffer[ptr + v] = hi_y;
        buffer[ptr + d] = z;
        buffer[ptr + 3] = a11;
        buffer[ptr + 4] = nx;
        buffer[ptr + 5] = ny;
        buffer[ptr + 6] = nz;
        buffer[ptr + 7] = tex_id;
        ptr += 8;
        buffer[ptr + u] = lo_x;
        buffer[ptr + v] = hi_y;
        buffer[ptr + d] = z;
        buffer[ptr + 3] = a01;
        buffer[ptr + 4] = nx;
        buffer[ptr + 5] = ny;
        buffer[ptr + 6] = nz;
        buffer[ptr + 7] = tex_id;
        ptr += 8;
        buffer[ptr + u] = hi_x;
        buffer[ptr + v] = lo_y;
        buffer[ptr + d] = z;
        buffer[ptr + 3] = a10;
        buffer[ptr + 4] = nx;
        buffer[ptr + 5] = ny;
        buffer[ptr + 6] = nz;
        buffer[ptr + 7] = tex_id;
        ptr += 8;
      }
    } else {
      if (flip) {
        buffer[ptr + u] = lo_x;
        buffer[ptr + v] = hi_y;
        buffer[ptr + d] = z;
        buffer[ptr + 3] = a01;
        buffer[ptr + 4] = nx;
        buffer[ptr + 5] = ny;
        buffer[ptr + 6] = nz;
        buffer[ptr + 7] = tex_id;
        ptr += 8;
        buffer[ptr + u] = lo_x;
        buffer[ptr + v] = lo_y;
        buffer[ptr + d] = z;
        buffer[ptr + 3] = a00;
        buffer[ptr + 4] = nx;
        buffer[ptr + 5] = ny;
        buffer[ptr + 6] = nz;
        buffer[ptr + 7] = tex_id;
        ptr += 8;
        buffer[ptr + u] = hi_x;
        buffer[ptr + v] = hi_y;
        buffer[ptr + d] = z;
        buffer[ptr + 3] = a11;
        buffer[ptr + 4] = nx;
        buffer[ptr + 5] = ny;
        buffer[ptr + 6] = nz;
        buffer[ptr + 7] = tex_id;
        ptr += 8;
        buffer[ptr + u] = hi_x;
        buffer[ptr + v] = lo_y;
        buffer[ptr + d] = z;
        buffer[ptr + 3] = a10;
        buffer[ptr + 4] = nx;
        buffer[ptr + 5] = ny;
        buffer[ptr + 6] = nz;
        buffer[ptr + 7] = tex_id;
        ptr += 8;
        buffer[ptr + u] = hi_x;
        buffer[ptr + v] = hi_y;
        buffer[ptr + d] = z;
        buffer[ptr + 3] = a11;
        buffer[ptr + 4] = nx;
        buffer[ptr + 5] = ny;
        buffer[ptr + 6] = nz;
        buffer[ptr + 7] = tex_id;
        ptr += 8;
        buffer[ptr + u] = lo_x;
        buffer[ptr + v] = lo_y;
        buffer[ptr + d] = z;
        buffer[ptr + 3] = a00;
        buffer[ptr + 4] = nx;
        buffer[ptr + 5] = ny;
        buffer[ptr + 6] = nz;
        buffer[ptr + 7] = tex_id;
        ptr += 8;
      } else {
        buffer[ptr + u] = lo_x;
        buffer[ptr + v] = lo_y;
        buffer[ptr + d] = z;
        buffer[ptr + 3] = a00;
        buffer[ptr + 4] = nx;
        buffer[ptr + 5] = ny;
        buffer[ptr + 6] = nz;
        buffer[ptr + 7] = tex_id;
        ptr += 8;
        buffer[ptr + u] = lo_x;
        buffer[ptr + v] = hi_y;
        buffer[ptr + d] = z;
        buffer[ptr + 3] = a01;
        buffer[ptr + 4] = nx;
        buffer[ptr + 5] = ny;
        buffer[ptr + 6] = nz;
        buffer[ptr + 7] = tex_id;
        ptr += 8;
        buffer[ptr + u] = hi_x;
        buffer[ptr + v] = hi_y;
        buffer[ptr + d] = z;
        buffer[ptr + 3] = a11;
        buffer[ptr + 4] = nx;
        buffer[ptr + 5] = ny;
        buffer[ptr + 6] = nz;
        buffer[ptr + 7] = tex_id;
        ptr += 8;
        buffer[ptr + u] = hi_x;
        buffer[ptr + v] = hi_y;
        buffer[ptr + d] = z;
        buffer[ptr + 3] = a11;
        buffer[ptr + 4] = nx;
        buffer[ptr + 5] = ny;
        buffer[ptr + 6] = nz;
        buffer[ptr + 7] = tex_id;
        ptr += 8;
        buffer[ptr + u] = hi_x;
        buffer[ptr + v] = lo_y;
        buffer[ptr + d] = z;
        buffer[ptr + 3] = a10;
        buffer[ptr + 4] = nx;
        buffer[ptr + 5] = ny;
        buffer[ptr + 6] = nz;
        buffer[ptr + 7] = tex_id;
        ptr += 8;
        buffer[ptr + u] = lo_x;
        buffer[ptr + v] = lo_y;
        buffer[ptr + d] = z;
        buffer[ptr + 3] = a00;
        buffer[ptr + 4] = nx;
        buffer[ptr + 5] = ny;
        buffer[ptr + 6] = nz;
        buffer[ptr + 7] = tex_id;
        ptr += 8;
      }
    }
    this.ptr = ptr;
  };
  var meshBuilder = new MeshBuilder();
  var meshSlice = compileMesher({
    order: [1, 0],
    append: MeshBuilder.prototype.append.bind(meshBuilder)
  });
  function computeMesh(array, voxelSideTextureIDs) {
    var shp = array.shape.slice(0);
    var nx = (shp[0] - 2) | 0;
    var ny = (shp[1] - 2) | 0;
    var nz = (shp[2] - 2) | 0;
    var sz = nx * ny * nz;
    var scratch0 = pool.mallocInt32(sz);
    var scratch1 = pool.mallocInt32(sz);
    var scratch2 = pool.mallocInt32(sz);
    var rshp = [nx, ny, nz];
    var ao0 = ndarray(scratch0, rshp);
    var ao1 = ndarray(scratch1, rshp);
    var ao2 = ndarray(scratch2, rshp);
    surfaceStencil(ao0, ao1, ao2, array);
    meshBuilder.ptr = 0;
    meshBuilder.voxelSideTextureIDs = voxelSideTextureIDs;
    var buffers = [ao0, ao1, ao2];
    for (var d = 0; d < 3; ++d) {
      var u = (d + 1) % 3;
      var v = (d + 2) % 3;
      var st = buffers[d].transpose(d, u, v);
      var slice = st.pick(0);
      var n = rshp[d] | 0;
      meshBuilder.d = d;
      meshBuilder.u = v;
      meshBuilder.v = u;
      for (var i = 0; i < n; ++i) {
        meshBuilder.z = i;
        meshSlice(slice);
        slice.offset += st.stride[0];
      }
    }
    pool.freeInt32(scratch0);
    pool.freeInt32(scratch1);
    pool.freeInt32(scratch2);
    if (meshBuilder.ptr === 0) {
      return null;
    }
    var rbuffer = meshBuilder.buffer;
    var rptr = meshBuilder.ptr;
    meshBuilder.buffer = pool.mallocUint8(1024);
    meshBuilder.ptr = 0;
    return rbuffer.subarray(0, rptr);
  }
  module.exports = computeMesh;
  global.define = __define;
  return module.exports;
});

System.register("npm:stream-browserify@1.0.0/index", ["github:jspm/nodelibs-events@0.1.1", "npm:inherits@2.0.1", "npm:readable-stream@1.1.13/readable", "npm:readable-stream@1.1.13/writable", "npm:readable-stream@1.1.13/duplex", "npm:readable-stream@1.1.13/transform", "npm:readable-stream@1.1.13/passthrough"], true, function(require, exports, module) {
  var global = System.global,
      __define = global.define;
  global.define = undefined;
  module.exports = Stream;
  var EE = require("github:jspm/nodelibs-events@0.1.1").EventEmitter;
  var inherits = require("npm:inherits@2.0.1");
  inherits(Stream, EE);
  Stream.Readable = require("npm:readable-stream@1.1.13/readable");
  Stream.Writable = require("npm:readable-stream@1.1.13/writable");
  Stream.Duplex = require("npm:readable-stream@1.1.13/duplex");
  Stream.Transform = require("npm:readable-stream@1.1.13/transform");
  Stream.PassThrough = require("npm:readable-stream@1.1.13/passthrough");
  Stream.Stream = Stream;
  function Stream() {
    EE.call(this);
  }
  Stream.prototype.pipe = function(dest, options) {
    var source = this;
    function ondata(chunk) {
      if (dest.writable) {
        if (false === dest.write(chunk) && source.pause) {
          source.pause();
        }
      }
    }
    source.on('data', ondata);
    function ondrain() {
      if (source.readable && source.resume) {
        source.resume();
      }
    }
    dest.on('drain', ondrain);
    if (!dest._isStdio && (!options || options.end !== false)) {
      source.on('end', onend);
      source.on('close', onclose);
    }
    var didOnEnd = false;
    function onend() {
      if (didOnEnd)
        return ;
      didOnEnd = true;
      dest.end();
    }
    function onclose() {
      if (didOnEnd)
        return ;
      didOnEnd = true;
      if (typeof dest.destroy === 'function')
        dest.destroy();
    }
    function onerror(er) {
      cleanup();
      if (EE.listenerCount(this, 'error') === 0) {
        throw er;
      }
    }
    source.on('error', onerror);
    dest.on('error', onerror);
    function cleanup() {
      source.removeListener('data', ondata);
      dest.removeListener('drain', ondrain);
      source.removeListener('end', onend);
      source.removeListener('close', onclose);
      source.removeListener('error', onerror);
      dest.removeListener('error', onerror);
      source.removeListener('end', cleanup);
      source.removeListener('close', cleanup);
      dest.removeListener('close', cleanup);
    }
    source.on('end', cleanup);
    source.on('close', cleanup);
    dest.on('close', cleanup);
    dest.emit('pipe', source);
    return dest;
  };
  global.define = __define;
  return module.exports;
});

System.register("npm:glsl-parser@0.0.9", ["npm:glsl-parser@0.0.9/index"], true, function(require, exports, module) {
  var global = System.global,
      __define = global.define;
  global.define = undefined;
  module.exports = require("npm:glsl-parser@0.0.9/index");
  global.define = __define;
  return module.exports;
});

System.register("npm:util@0.10.3", ["npm:util@0.10.3/util"], true, function(require, exports, module) {
  var global = System.global,
      __define = global.define;
  global.define = undefined;
  module.exports = require("npm:util@0.10.3/util");
  global.define = __define;
  return module.exports;
});

System.register("github:jspm/nodelibs-buffer@0.1.0", ["github:jspm/nodelibs-buffer@0.1.0/index"], true, function(require, exports, module) {
  var global = System.global,
      __define = global.define;
  global.define = undefined;
  module.exports = require("github:jspm/nodelibs-buffer@0.1.0/index");
  global.define = __define;
  return module.exports;
});

System.register("npm:ndarray-ops@1.1.1", ["npm:ndarray-ops@1.1.1/ndarray-ops"], true, function(require, exports, module) {
  var global = System.global,
      __define = global.define;
  global.define = undefined;
  module.exports = require("npm:ndarray-ops@1.1.1/ndarray-ops");
  global.define = __define;
  return module.exports;
});

System.register("npm:cwise@0.3.4", ["npm:cwise@0.3.4/cwise"], true, function(require, exports, module) {
  var global = System.global,
      __define = global.define;
  global.define = undefined;
  module.exports = require("npm:cwise@0.3.4/cwise");
  global.define = __define;
  return module.exports;
});

System.register("npm:gl-texture2d@0.1.12", ["npm:gl-texture2d@0.1.12/texture"], true, function(require, exports, module) {
  var global = System.global,
      __define = global.define;
  global.define = undefined;
  module.exports = require("npm:gl-texture2d@0.1.12/texture");
  global.define = __define;
  return module.exports;
});

System.register("npm:ao-mesher@0.2.10", ["npm:ao-mesher@0.2.10/mesh"], true, function(require, exports, module) {
  var global = System.global,
      __define = global.define;
  global.define = undefined;
  module.exports = require("npm:ao-mesher@0.2.10/mesh");
  global.define = __define;
  return module.exports;
});

System.register("npm:stream-browserify@1.0.0", ["npm:stream-browserify@1.0.0/index"], true, function(require, exports, module) {
  var global = System.global,
      __define = global.define;
  global.define = undefined;
  module.exports = require("npm:stream-browserify@1.0.0/index");
  global.define = __define;
  return module.exports;
});

System.register("github:jspm/nodelibs-util@0.1.0/index", ["npm:util@0.10.3"], true, function(require, exports, module) {
  var global = System.global,
      __define = global.define;
  global.define = undefined;
  module.exports = System._nodeRequire ? System._nodeRequire('util') : require("npm:util@0.10.3");
  global.define = __define;
  return module.exports;
});

System.register("npm:is-buffer@1.0.2/index", ["github:jspm/nodelibs-buffer@0.1.0"], true, function(require, exports, module) {
  var global = System.global,
      __define = global.define;
  global.define = undefined;
  (function(Buffer) {
    module.exports = function(obj) {
      return !!(obj != null && obj.constructor && typeof obj.constructor.isBuffer === 'function' && obj.constructor.isBuffer(obj));
    };
  })(require("github:jspm/nodelibs-buffer@0.1.0").Buffer);
  global.define = __define;
  return module.exports;
});

System.register("npm:ndarray-fft@0.1.0/fft", ["npm:ndarray-ops@1.1.1", "npm:cwise@0.3.4", "npm:ndarray@1.0.18", "npm:ndarray-fft@0.1.0/lib/fft-matrix", "npm:typedarray-pool@0.1.2"], true, function(require, exports, module) {
  var global = System.global,
      __define = global.define;
  global.define = undefined;
  "use strict";
  var ops = require("npm:ndarray-ops@1.1.1");
  var cwise = require("npm:cwise@0.3.4");
  var ndarray = require("npm:ndarray@1.0.18");
  var fftm = require("npm:ndarray-fft@0.1.0/lib/fft-matrix");
  var pool = require("npm:typedarray-pool@0.1.2");
  function ndfft(dir, x, y) {
    var shape = x.shape,
        d = shape.length,
        size = 1,
        stride = new Array(d),
        pad = 0,
        i,
        j;
    for (i = d - 1; i >= 0; --i) {
      stride[i] = size;
      size *= shape[i];
      pad = Math.max(pad, fftm.scratchMemory(shape[i]));
      if (x.shape[i] !== y.shape[i]) {
        throw new Error("Shape mismatch, real and imaginary arrays must have same size");
      }
    }
    var buf_size = 4 * size + pad;
    var buffer;
    if (x.dtype === "array" || x.dtype === "float64" || x.dtype === "custom") {
      buffer = pool.mallocDouble(buf_size);
    } else {
      buffer = pool.mallocFloat(buf_size);
    }
    var x1 = ndarray(buffer, shape.slice(0), stride, 0),
        y1 = ndarray(buffer, shape.slice(0), stride.slice(0), size),
        x2 = ndarray(buffer, shape.slice(0), stride.slice(0), 2 * size),
        y2 = ndarray(buffer, shape.slice(0), stride.slice(0), 3 * size),
        tmp,
        n,
        s1,
        s2,
        scratch_ptr = 4 * size;
    ops.assign(x1, x);
    ops.assign(y1, y);
    for (i = d - 1; i >= 0; --i) {
      fftm(dir, size / shape[i], shape[i], buffer, x1.offset, y1.offset, scratch_ptr);
      if (i === 0) {
        break;
      }
      n = 1;
      s1 = x2.stride;
      s2 = y2.stride;
      for (j = i - 1; j < d; ++j) {
        s2[j] = s1[j] = n;
        n *= shape[j];
      }
      for (j = i - 2; j >= 0; --j) {
        s2[j] = s1[j] = n;
        n *= shape[j];
      }
      ops.assign(x2, x1);
      ops.assign(y2, y1);
      tmp = x1;
      x1 = x2;
      x2 = tmp;
      tmp = y1;
      y1 = y2;
      y2 = tmp;
    }
    ops.assign(x, x1);
    ops.assign(y, y1);
    pool.free(buffer);
  }
  module.exports = ndfft;
  global.define = __define;
  return module.exports;
});

System.register("github:jspm/nodelibs-stream@0.1.0/index", ["npm:stream-browserify@1.0.0"], true, function(require, exports, module) {
  var global = System.global,
      __define = global.define;
  global.define = undefined;
  module.exports = System._nodeRequire ? System._nodeRequire('stream') : require("npm:stream-browserify@1.0.0");
  global.define = __define;
  return module.exports;
});

System.register("github:jspm/nodelibs-util@0.1.0", ["github:jspm/nodelibs-util@0.1.0/index"], true, function(require, exports, module) {
  var global = System.global,
      __define = global.define;
  global.define = undefined;
  module.exports = require("github:jspm/nodelibs-util@0.1.0/index");
  global.define = __define;
  return module.exports;
});

System.register("npm:is-buffer@1.0.2", ["npm:is-buffer@1.0.2/index"], true, function(require, exports, module) {
  var global = System.global,
      __define = global.define;
  global.define = undefined;
  module.exports = require("npm:is-buffer@1.0.2/index");
  global.define = __define;
  return module.exports;
});

System.register("npm:ndarray-fft@0.1.0", ["npm:ndarray-fft@0.1.0/fft"], true, function(require, exports, module) {
  var global = System.global,
      __define = global.define;
  global.define = undefined;
  module.exports = require("npm:ndarray-fft@0.1.0/fft");
  global.define = __define;
  return module.exports;
});

System.register("github:jspm/nodelibs-stream@0.1.0", ["github:jspm/nodelibs-stream@0.1.0/index"], true, function(require, exports, module) {
  var global = System.global,
      __define = global.define;
  global.define = undefined;
  module.exports = require("github:jspm/nodelibs-stream@0.1.0/index");
  global.define = __define;
  return module.exports;
});

System.register("npm:game-shell@0.1.4/shell", ["github:jspm/nodelibs-events@0.1.1", "github:jspm/nodelibs-util@0.1.0", "npm:domready@0.2.13", "npm:vkey@0.0.3", "npm:invert-hash@0.0.0", "npm:uniq@0.0.2", "npm:lower-bound@0.0.3", "npm:iota-array@0.0.1", "npm:game-shell@0.1.4/lib/raf-polyfill", "npm:game-shell@0.1.4/lib/mousewheel-polyfill", "npm:game-shell@0.1.4/lib/hrtime-polyfill"], true, function(require, exports, module) {
  var global = System.global,
      __define = global.define;
  global.define = undefined;
  "use strict";
  var EventEmitter = require("github:jspm/nodelibs-events@0.1.1").EventEmitter,
      util = require("github:jspm/nodelibs-util@0.1.0"),
      domready = require("npm:domready@0.2.13"),
      vkey = require("npm:vkey@0.0.3"),
      invert = require("npm:invert-hash@0.0.0"),
      uniq = require("npm:uniq@0.0.2"),
      lowerBound = require("npm:lower-bound@0.0.3"),
      iota = require("npm:iota-array@0.0.1"),
      min = Math.min;
  require("npm:game-shell@0.1.4/lib/raf-polyfill");
  var addMouseWheel = require("npm:game-shell@0.1.4/lib/mousewheel-polyfill");
  var hrtime = require("npm:game-shell@0.1.4/lib/hrtime-polyfill");
  var filtered_vkey = (function() {
    var result = new Array(256),
        i,
        j,
        k;
    for (i = 0; i < 256; ++i) {
      result[i] = "UNK";
    }
    for (i in vkey) {
      k = vkey[i];
      if (k.charAt(0) === '<' && k.charAt(k.length - 1) === '>') {
        k = k.substring(1, k.length - 1);
      }
      k = k.replace(/\s/g, "-");
      result[parseInt(i)] = k;
    }
    return result;
  })();
  var keyNames = uniq(Object.keys(invert(filtered_vkey)));
  function virtualKeyCode(key) {
    var idx = lowerBound(keyNames, key);
    if (idx < 0 || idx >= keyNames.length) {
      return -1;
    }
    return idx;
  }
  function physicalKeyCode(key) {
    return virtualKeyCode(filtered_vkey[key]);
  }
  function GameShell() {
    EventEmitter.call(this);
    this._curKeyState = new Array(keyNames.length);
    this._pressCount = new Array(keyNames.length);
    this._releaseCount = new Array(keyNames.length);
    this._tickInterval = null;
    this._rafHandle = null;
    this._tickRate = 0;
    this._lastTick = hrtime();
    this._frameTime = 0.0;
    this._paused = true;
    this._width = 0;
    this._height = 0;
    this._wantFullscreen = false;
    this._wantPointerLock = false;
    this._fullscreenActive = false;
    this._pointerLockActive = false;
    this._render = render.bind(undefined, this);
    for (var i = 0; i < keyNames.length; ++i) {
      this._curKeyState[i] = false;
      this._pressCount[i] = this._releaseCount[i] = 0;
    }
    this.element = null;
    this.bindings = {};
    this.frameSkip = 100.0;
    this.tickCount = 0;
    this.frameCount = 0;
    this.startTime = hrtime();
    this.tickTime = this._tickRate;
    this.frameTime = 10.0;
    this.stickyFullscreen = false;
    this.stuckyPointLock = false;
    this.scroll = [0, 0, 0];
    this.mouseX = 0;
    this.mouseY = 0;
    this.prevMouseX = 0;
    this.prevMouseY = 0;
  }
  util.inherits(GameShell, EventEmitter);
  var proto = GameShell.prototype;
  proto.keyNames = keyNames;
  proto.bind = function(virtual_key) {
    var arr;
    if (virtual_key in this.bindings) {
      arr = this.bindings[virtual_key];
    } else {
      arr = [];
    }
    var physical_key;
    for (var i = 1,
        n = arguments.length; i < n; ++i) {
      physical_key = arguments[i];
      if (virtualKeyCode(physical_key) >= 0) {
        arr.push(physical_key);
      } else if (physical_key in this.bindings) {
        var keybinds = this.bindings[physical_key];
        for (var j = 0; j < keybinds.length; ++j) {
          arr.push(keybinds[j]);
        }
      }
    }
    arr = uniq(arr);
    if (arr.length > 0) {
      this.bindings[virtual_key] = arr;
    }
  };
  proto.unbind = function(virtual_key) {
    if (virtual_key in this.bindings) {
      delete this.bindings[virtual_key];
    }
  };
  function lookupKey(state, bindings, key) {
    if (key in bindings) {
      var arr = bindings[key];
      for (var i = 0,
          n = arr.length; i < n; ++i) {
        if (state[virtualKeyCode(arr[i])]) {
          return true;
        }
      }
      return false;
    }
    var kc = virtualKeyCode(key);
    if (kc >= 0) {
      return state[kc];
    }
    return false;
  }
  function lookupCount(state, bindings, key) {
    if (key in bindings) {
      var arr = bindings[key],
          r = 0;
      for (var i = 0,
          n = arr.length; i < n; ++i) {
        r += state[virtualKeyCode(arr[i])];
      }
      return r;
    }
    var kc = virtualKeyCode(key);
    if (kc >= 0) {
      return state[kc];
    }
    return 0;
  }
  proto.down = function(key) {
    return lookupKey(this._curKeyState, this.bindings, key);
  };
  proto.wasDown = function(key) {
    return this.down(key) || !!this.press(key);
  };
  proto.up = function(key) {
    return !this.down(key);
  };
  proto.wasUp = function(key) {
    return this.up(key) || !!this.release(key);
  };
  proto.press = function(key) {
    return lookupCount(this._pressCount, this.bindings, key);
  };
  proto.release = function(key) {
    return lookupCount(this._releaseCount, this.bindings, key);
  };
  Object.defineProperty(proto, "paused", {
    get: function() {
      return this._paused;
    },
    set: function(state) {
      var ns = !!state;
      if (ns !== this._paused) {
        if (!this._paused) {
          this._paused = true;
          this._frameTime = min(1.0, (hrtime() - this._lastTick) / this._tickRate);
          clearInterval(this._tickInterval);
          cancelAnimationFrame(this._rafHandle);
        } else {
          this._paused = false;
          this._lastTick = hrtime() - Math.floor(this._frameTime * this._tickRate);
          this._tickInterval = setInterval(tick, this._tickRate, this);
          this._rafHandle = requestAnimationFrame(this._render);
        }
      }
    }
  });
  function tryFullscreen(shell) {
    var elem = shell.element;
    if (shell._wantFullscreen && !shell._fullscreenActive) {
      var fs = elem.requestFullscreen || elem.requestFullScreen || elem.webkitRequestFullscreen || elem.webkitRequestFullScreen || elem.mozRequestFullscreen || elem.mozRequestFullScreen || function() {};
      fs.call(elem);
    }
    if (shell._wantPointerLock && !shell._pointerLockActive) {
      var pl = elem.requestPointerLock || elem.webkitRequestPointerLock || elem.mozRequestPointerLock || elem.msRequestPointerLock || elem.oRequestPointerLock || function() {};
      pl.call(elem);
    }
  }
  var cancelFullscreen = document.exitFullscreen || document.cancelFullscreen || document.cancelFullScreen || document.webkitCancelFullscreen || document.webkitCancelFullScreen || document.mozCancelFullscreen || document.mozCancelFullScreen || function() {};
  Object.defineProperty(proto, "fullscreen", {
    get: function() {
      return this._fullscreenActive;
    },
    set: function(state) {
      var ns = !!state;
      if (!ns) {
        this._wantFullscreen = false;
        cancelFullscreen.call(document);
      } else {
        this._wantFullscreen = true;
        tryFullscreen(this);
      }
      return this._fullscreenActive;
    }
  });
  function handleFullscreen(shell) {
    shell._fullscreenActive = document.fullscreen || document.mozFullScreen || document.webkitIsFullScreen || false;
    if (!shell.stickyFullscreen && shell._fullscreenActive) {
      shell._wantFullscreen = false;
    }
  }
  var exitPointerLock = document.exitPointerLock || document.webkitExitPointerLock || document.mozExitPointerLock || function() {};
  Object.defineProperty(proto, "pointerLock", {
    get: function() {
      return this._pointerLockActive;
    },
    set: function(state) {
      var ns = !!state;
      if (!ns) {
        this._wantPointerLock = false;
        exitPointerLock.call(document);
      } else {
        this._wantPointerLock = true;
        tryFullscreen(this);
      }
      return this._pointerLockActive;
    }
  });
  function handlePointerLockChange(shell, event) {
    shell._pointerLockActive = shell.element === (document.pointerLockElement || document.mozPointerLockElement || document.webkitPointerLockElement || null);
    if (!shell.stickyPointerLock && shell._pointerLockActive) {
      shell._wantPointerLock = false;
    }
  }
  Object.defineProperty(proto, "width", {get: function() {
      return this.element.clientWidth;
    }});
  Object.defineProperty(proto, "height", {get: function() {
      return this.element.clientHeight;
    }});
  function setKeyState(shell, key, state) {
    var ps = shell._curKeyState[key];
    if (ps !== state) {
      if (state) {
        shell._pressCount[key]++;
      } else {
        shell._releaseCount[key]++;
      }
      shell._curKeyState[key] = state;
    }
  }
  function tick(shell) {
    var skip = hrtime() + shell.frameSkip,
        pCount = shell._pressCount,
        rCount = shell._releaseCount,
        i,
        s,
        t,
        tr = shell._tickRate,
        n = keyNames.length;
    while (!shell._paused && hrtime() >= shell._lastTick + tr) {
      if (hrtime() > skip) {
        shell._lastTick = hrtime() + tr;
        return ;
      }
      s = hrtime();
      shell.emit("tick");
      t = hrtime();
      shell.tickTime = t - s;
      ++shell.tickCount;
      shell._lastTick += tr;
      for (i = 0; i < n; ++i) {
        pCount[i] = rCount[i] = 0;
      }
      if (shell._pointerLockActive) {
        shell.prevMouseX = shell.mouseX = shell.width >> 1;
        shell.prevMouseY = shell.mouseY = shell.height >> 1;
      } else {
        shell.prevMouseX = shell.mouseX;
        shell.prevMouseY = shell.mouseY;
      }
      shell.scroll[0] = shell.scroll[1] = shell.scroll[2] = 0;
    }
  }
  function render(shell) {
    if (shell._paused) {
      return ;
    }
    tick(shell);
    var dt;
    if (shell._paused) {
      dt = shell._frameTime;
    } else {
      dt = min(1.0, (hrtime() - shell._lastTick) / shell._tickRate);
    }
    ++shell.frameCount;
    var s = hrtime();
    shell.emit("render", dt);
    var t = hrtime();
    shell.frameTime = t - s;
    requestAnimationFrame(shell._render);
  }
  function handleKeyUp(shell, ev) {
    var kc = physicalKeyCode(ev.keyCode || ev.char || ev.which || ev.charCode);
    if (kc >= 0) {
      setKeyState(shell, kc, false);
    }
  }
  function handleKeyDown(shell, ev) {
    var kc = physicalKeyCode(ev.keyCode || ev.char || ev.which || ev.charCode);
    if (kc >= 0) {
      setKeyState(shell, kc, true);
    }
  }
  var mouseCodes = iota(32).map(function(n) {
    return virtualKeyCode("mouse-" + (n + 1));
  });
  function setMouseButtons(shell, buttons) {
    for (var i = 0; i < 32; ++i) {
      setKeyState(shell, mouseCodes[i], !!(buttons & (1 << i)));
    }
  }
  function handleMouseMove(shell, ev) {
    if (shell._pointerLockActive) {
      var movementX = ev.movementX || ev.mozMovementX || ev.webkitMovementX || 0,
          movementY = ev.movementY || ev.mozMovementY || ev.webkitMovementY || 0;
      shell.mouseX += movementX;
      shell.mouseY += movementY;
    } else {
      shell.mouseX = ev.clientX - shell.element.offsetLeft;
      shell.mouseY = ev.clientY - shell.element.offsetTop;
    }
    return false;
  }
  function handleMouseDown(shell, ev) {
    setKeyState(shell, mouseCodes[ev.button], true);
    return false;
  }
  function handleMouseUp(shell, ev) {
    setKeyState(shell, mouseCodes[ev.button], false);
    return false;
  }
  function handleMouseEnter(shell, ev) {
    if (shell._pointerLockActive) {
      shell.prevMouseX = shell.mouseX = shell.width >> 1;
      shell.prevMouseY = shell.mouseY = shell.height >> 1;
    } else {
      shell.prevMouseX = shell.mouseX = ev.clientX - shell.element.offsetLeft;
      shell.prevMouseY = shell.mouseY = ev.clientY - shell.element.offsetTop;
    }
    return false;
  }
  function handleMouseLeave(shell, ev) {
    setMouseButtons(shell, 0);
    return false;
  }
  function handleMouseWheel(shell, ev) {
    var scale = 1;
    switch (ev.deltaMode) {
      case 0:
        scale = 1;
        break;
      case 1:
        scale = 12;
        break;
      case 2:
        scale = shell.height;
        break;
    }
    shell.scroll[0] += ev.deltaX * scale;
    shell.scroll[1] += ev.deltaY * scale;
    shell.scroll[2] += (ev.deltaZ * scale) || 0.0;
    return false;
  }
  function handleContexMenu(shell, ev) {
    return false;
  }
  function handleBlur(shell, ev) {
    var n = keyNames.length,
        c = shell._curKeyState,
        r = shell._releaseCount,
        i;
    for (i = 0; i < n; ++i) {
      if (c[i]) {
        ++r[i];
      }
      c[i] = false;
    }
    return false;
  }
  function handleResizeElement(shell, ev) {
    var w = shell.element.clientWidth | 0;
    var h = shell.element.clientHeight | 0;
    if ((w !== shell._width) || (h !== shell._height)) {
      shell._width = w;
      shell._height = h;
      shell.emit("resize", w, h);
    }
  }
  function makeDefaultContainer() {
    var container = document.createElement("div");
    container.style.position = "absolute";
    container.style.left = "0px";
    container.style.right = "0px";
    container.style.top = "0px";
    container.style.bottom = "0px";
    container.style.height = "100%";
    container.style.overflow = "hidden";
    document.body.appendChild(container);
    return container;
  }
  function createShell(options) {
    options = options || {};
    var useFullscreen = !!options.fullscreen;
    var usePointerLock = useFullscreen;
    if (typeof options.pointerLock !== undefined) {
      usePointerLock = !!options.pointerLock;
    }
    var shell = new GameShell();
    shell._tickRate = options.tickRate || 30;
    shell.frameSkip = options.frameSkip || (shell._tickRate + 5) * 5;
    shell.stickyFullscreen = !!options.stickyFullscreen || !!options.sticky;
    shell.stickyPointerLock = !!options.stickPointerLock || !options.sticky;
    if (options.bindings) {
      shell.bindings = bindings;
    }
    setTimeout(function() {
      domready(function initGameShell() {
        var element = options.element;
        if (typeof element === "string") {
          var e = document.querySelector(element);
          if (!e) {
            e = document.getElementById(element);
          }
          if (!e) {
            e = document.getElementByClass(element)[0];
          }
          if (!e) {
            e = makeDefaultContainer();
          }
          shell.element = e;
        } else if (typeof element === "object" && !!element) {
          shell.element = element;
        } else if (typeof element === "function") {
          shell.element = element();
        } else {
          shell.element = makeDefaultContainer();
        }
        if (shell.element.style) {
          shell.element.style["-webkit-touch-callout"] = "none";
          shell.element.style["-webkit-user-select"] = "none";
          shell.element.style["-khtml-user-select"] = "none";
          shell.element.style["-moz-user-select"] = "none";
          shell.element.style["-ms-user-select"] = "none";
          shell.element.style["user-select"] = "none";
        }
        shell._width = shell.element.clientWidth;
        shell._height = shell.element.clientHeight;
        var handleResize = handleResizeElement.bind(undefined, shell);
        if (typeof MutationObserver !== "undefined") {
          var observer = new MutationObserver(handleResize);
          observer.observe(shell.element, {
            attributes: true,
            subtree: true
          });
        } else {
          shell.element.addEventListener("DOMSubtreeModified", handleResize, false);
        }
        window.addEventListener("resize", handleResize, false);
        window.addEventListener("keydown", handleKeyDown.bind(undefined, shell), true);
        window.addEventListener("keyup", handleKeyUp.bind(undefined, shell), true);
        shell.element.oncontextmenu = handleContexMenu.bind(undefined, shell);
        shell.element.onmousedown = handleMouseDown.bind(undefined, shell);
        shell.element.onmouseup = handleMouseUp.bind(undefined, shell);
        shell.element.onmousemove = handleMouseMove.bind(undefined, shell);
        shell.element.onmouseenter = handleMouseEnter.bind(undefined, shell);
        var leave = handleMouseLeave.bind(undefined, shell);
        shell.element.onmouseleave = leave;
        shell.element.onmouseout = leave;
        window.addEventListener("mouseleave", leave, true);
        window.addEventListener("mouseout", leave, true);
        var blur = handleBlur.bind(undefined, shell);
        shell.element.onblur = blur;
        window.addEventListener("blur", blur, true);
        addMouseWheel(shell.element, handleMouseWheel.bind(undefined, shell), false);
        document.body.style.overflow = "hidden";
        document.body.style.height = "100%";
        var fullscreenChange = handleFullscreen.bind(undefined, shell);
        document.addEventListener("fullscreenchange", fullscreenChange, false);
        document.addEventListener("mozfullscreenchange", fullscreenChange, false);
        document.addEventListener("webkitfullscreenchange", fullscreenChange, false);
        shell.element.addEventListener("click", tryFullscreen.bind(undefined, shell), true);
        var pointerLockChange = handlePointerLockChange.bind(undefined, shell);
        document.addEventListener("pointerlockchange", pointerLockChange, false);
        document.addEventListener("mozpointerlockchange", pointerLockChange, false);
        document.addEventListener("webkitpointerlockchange", pointerLockChange, false);
        document.addEventListener("pointerlocklost", pointerLockChange, false);
        document.addEventListener("webkitpointerlocklost", pointerLockChange, false);
        document.addEventListener("mozpointerlocklost", pointerLockChange, false);
        shell.fullscreen = useFullscreen;
        shell.pointerLock = usePointerLock;
        shell.bind("mouse-left", "mouse-1");
        shell.bind("mouse-right", "mouse-3");
        shell.bind("mouse-middle", "mouse-2");
        shell._lastTick = hrtime();
        shell.startTime = hrtime();
        shell.paused = false;
        shell.emit("init");
      });
    }, 0);
    return shell;
  }
  module.exports = createShell;
  global.define = __define;
  return module.exports;
});

System.register("npm:ndarray@1.0.18/ndarray", ["npm:iota-array@1.0.0", "npm:is-buffer@1.0.2"], true, function(require, exports, module) {
  var global = System.global,
      __define = global.define;
  global.define = undefined;
  var iota = require("npm:iota-array@1.0.0");
  var isBuffer = require("npm:is-buffer@1.0.2");
  var hasTypedArrays = ((typeof Float64Array) !== "undefined");
  function compare1st(a, b) {
    return a[0] - b[0];
  }
  function order() {
    var stride = this.stride;
    var terms = new Array(stride.length);
    var i;
    for (i = 0; i < terms.length; ++i) {
      terms[i] = [Math.abs(stride[i]), i];
    }
    terms.sort(compare1st);
    var result = new Array(terms.length);
    for (i = 0; i < result.length; ++i) {
      result[i] = terms[i][1];
    }
    return result;
  }
  function compileConstructor(dtype, dimension) {
    var className = ["View", dimension, "d", dtype].join("");
    if (dimension < 0) {
      className = "View_Nil" + dtype;
    }
    var useGetters = (dtype === "generic");
    if (dimension === -1) {
      var code = "function " + className + "(a){this.data=a;};\
var proto=" + className + ".prototype;\
proto.dtype='" + dtype + "';\
proto.index=function(){return -1};\
proto.size=0;\
proto.dimension=-1;\
proto.shape=proto.stride=proto.order=[];\
proto.lo=proto.hi=proto.transpose=proto.step=\
function(){return new " + className + "(this.data);};\
proto.get=proto.set=function(){};\
proto.pick=function(){return null};\
return function construct_" + className + "(a){return new " + className + "(a);}";
      var procedure = new Function(code);
      return procedure();
    } else if (dimension === 0) {
      var code = "function " + className + "(a,d) {\
this.data = a;\
this.offset = d\
};\
var proto=" + className + ".prototype;\
proto.dtype='" + dtype + "';\
proto.index=function(){return this.offset};\
proto.dimension=0;\
proto.size=1;\
proto.shape=\
proto.stride=\
proto.order=[];\
proto.lo=\
proto.hi=\
proto.transpose=\
proto.step=function " + className + "_copy() {\
return new " + className + "(this.data,this.offset)\
};\
proto.pick=function " + className + "_pick(){\
return TrivialArray(this.data);\
};\
proto.valueOf=proto.get=function " + className + "_get(){\
return " + (useGetters ? "this.data.get(this.offset)" : "this.data[this.offset]") + "};\
proto.set=function " + className + "_set(v){\
return " + (useGetters ? "this.data.set(this.offset,v)" : "this.data[this.offset]=v") + "\
};\
return function construct_" + className + "(a,b,c,d){return new " + className + "(a,d)}";
      var procedure = new Function("TrivialArray", code);
      return procedure(CACHED_CONSTRUCTORS[dtype][0]);
    }
    var code = ["'use strict'"];
    var indices = iota(dimension);
    var args = indices.map(function(i) {
      return "i" + i;
    });
    var index_str = "this.offset+" + indices.map(function(i) {
      return "this.stride[" + i + "]*i" + i;
    }).join("+");
    var shapeArg = indices.map(function(i) {
      return "b" + i;
    }).join(",");
    var strideArg = indices.map(function(i) {
      return "c" + i;
    }).join(",");
    code.push("function " + className + "(a," + shapeArg + "," + strideArg + ",d){this.data=a", "this.shape=[" + shapeArg + "]", "this.stride=[" + strideArg + "]", "this.offset=d|0}", "var proto=" + className + ".prototype", "proto.dtype='" + dtype + "'", "proto.dimension=" + dimension);
    code.push("Object.defineProperty(proto,'size',{get:function " + className + "_size(){\
return " + indices.map(function(i) {
      return "this.shape[" + i + "]";
    }).join("*"), "}})");
    if (dimension === 1) {
      code.push("proto.order=[0]");
    } else {
      code.push("Object.defineProperty(proto,'order',{get:");
      if (dimension < 4) {
        code.push("function " + className + "_order(){");
        if (dimension === 2) {
          code.push("return (Math.abs(this.stride[0])>Math.abs(this.stride[1]))?[1,0]:[0,1]}})");
        } else if (dimension === 3) {
          code.push("var s0=Math.abs(this.stride[0]),s1=Math.abs(this.stride[1]),s2=Math.abs(this.stride[2]);\
if(s0>s1){\
if(s1>s2){\
return [2,1,0];\
}else if(s0>s2){\
return [1,2,0];\
}else{\
return [1,0,2];\
}\
}else if(s0>s2){\
return [2,0,1];\
}else if(s2>s1){\
return [0,1,2];\
}else{\
return [0,2,1];\
}}})");
        }
      } else {
        code.push("ORDER})");
      }
    }
    code.push("proto.set=function " + className + "_set(" + args.join(",") + ",v){");
    if (useGetters) {
      code.push("return this.data.set(" + index_str + ",v)}");
    } else {
      code.push("return this.data[" + index_str + "]=v}");
    }
    code.push("proto.get=function " + className + "_get(" + args.join(",") + "){");
    if (useGetters) {
      code.push("return this.data.get(" + index_str + ")}");
    } else {
      code.push("return this.data[" + index_str + "]}");
    }
    code.push("proto.index=function " + className + "_index(", args.join(), "){return " + index_str + "}");
    code.push("proto.hi=function " + className + "_hi(" + args.join(",") + "){return new " + className + "(this.data," + indices.map(function(i) {
      return ["(typeof i", i, "!=='number'||i", i, "<0)?this.shape[", i, "]:i", i, "|0"].join("");
    }).join(",") + "," + indices.map(function(i) {
      return "this.stride[" + i + "]";
    }).join(",") + ",this.offset)}");
    var a_vars = indices.map(function(i) {
      return "a" + i + "=this.shape[" + i + "]";
    });
    var c_vars = indices.map(function(i) {
      return "c" + i + "=this.stride[" + i + "]";
    });
    code.push("proto.lo=function " + className + "_lo(" + args.join(",") + "){var b=this.offset,d=0," + a_vars.join(",") + "," + c_vars.join(","));
    for (var i = 0; i < dimension; ++i) {
      code.push("if(typeof i" + i + "==='number'&&i" + i + ">=0){\
d=i" + i + "|0;\
b+=c" + i + "*d;\
a" + i + "-=d}");
    }
    code.push("return new " + className + "(this.data," + indices.map(function(i) {
      return "a" + i;
    }).join(",") + "," + indices.map(function(i) {
      return "c" + i;
    }).join(",") + ",b)}");
    code.push("proto.step=function " + className + "_step(" + args.join(",") + "){var " + indices.map(function(i) {
      return "a" + i + "=this.shape[" + i + "]";
    }).join(",") + "," + indices.map(function(i) {
      return "b" + i + "=this.stride[" + i + "]";
    }).join(",") + ",c=this.offset,d=0,ceil=Math.ceil");
    for (var i = 0; i < dimension; ++i) {
      code.push("if(typeof i" + i + "==='number'){\
d=i" + i + "|0;\
if(d<0){\
c+=b" + i + "*(a" + i + "-1);\
a" + i + "=ceil(-a" + i + "/d)\
}else{\
a" + i + "=ceil(a" + i + "/d)\
}\
b" + i + "*=d\
}");
    }
    code.push("return new " + className + "(this.data," + indices.map(function(i) {
      return "a" + i;
    }).join(",") + "," + indices.map(function(i) {
      return "b" + i;
    }).join(",") + ",c)}");
    var tShape = new Array(dimension);
    var tStride = new Array(dimension);
    for (var i = 0; i < dimension; ++i) {
      tShape[i] = "a[i" + i + "]";
      tStride[i] = "b[i" + i + "]";
    }
    code.push("proto.transpose=function " + className + "_transpose(" + args + "){" + args.map(function(n, idx) {
      return n + "=(" + n + "===undefined?" + idx + ":" + n + "|0)";
    }).join(";"), "var a=this.shape,b=this.stride;return new " + className + "(this.data," + tShape.join(",") + "," + tStride.join(",") + ",this.offset)}");
    code.push("proto.pick=function " + className + "_pick(" + args + "){var a=[],b=[],c=this.offset");
    for (var i = 0; i < dimension; ++i) {
      code.push("if(typeof i" + i + "==='number'&&i" + i + ">=0){c=(c+this.stride[" + i + "]*i" + i + ")|0}else{a.push(this.shape[" + i + "]);b.push(this.stride[" + i + "])}");
    }
    code.push("var ctor=CTOR_LIST[a.length+1];return ctor(this.data,a,b,c)}");
    code.push("return function construct_" + className + "(data,shape,stride,offset){return new " + className + "(data," + indices.map(function(i) {
      return "shape[" + i + "]";
    }).join(",") + "," + indices.map(function(i) {
      return "stride[" + i + "]";
    }).join(",") + ",offset)}");
    var procedure = new Function("CTOR_LIST", "ORDER", code.join("\n"));
    return procedure(CACHED_CONSTRUCTORS[dtype], order);
  }
  function arrayDType(data) {
    if (isBuffer(data)) {
      return "buffer";
    }
    if (hasTypedArrays) {
      switch (Object.prototype.toString.call(data)) {
        case "[object Float64Array]":
          return "float64";
        case "[object Float32Array]":
          return "float32";
        case "[object Int8Array]":
          return "int8";
        case "[object Int16Array]":
          return "int16";
        case "[object Int32Array]":
          return "int32";
        case "[object Uint8Array]":
          return "uint8";
        case "[object Uint16Array]":
          return "uint16";
        case "[object Uint32Array]":
          return "uint32";
        case "[object Uint8ClampedArray]":
          return "uint8_clamped";
      }
    }
    if (Array.isArray(data)) {
      return "array";
    }
    return "generic";
  }
  var CACHED_CONSTRUCTORS = {
    "float32": [],
    "float64": [],
    "int8": [],
    "int16": [],
    "int32": [],
    "uint8": [],
    "uint16": [],
    "uint32": [],
    "array": [],
    "uint8_clamped": [],
    "buffer": [],
    "generic": []
  };
  ;
  (function() {
    for (var id in CACHED_CONSTRUCTORS) {
      CACHED_CONSTRUCTORS[id].push(compileConstructor(id, -1));
    }
  });
  function wrappedNDArrayCtor(data, shape, stride, offset) {
    if (data === undefined) {
      var ctor = CACHED_CONSTRUCTORS.array[0];
      return ctor([]);
    } else if (typeof data === "number") {
      data = [data];
    }
    if (shape === undefined) {
      shape = [data.length];
    }
    var d = shape.length;
    if (stride === undefined) {
      stride = new Array(d);
      for (var i = d - 1,
          sz = 1; i >= 0; --i) {
        stride[i] = sz;
        sz *= shape[i];
      }
    }
    if (offset === undefined) {
      offset = 0;
      for (var i = 0; i < d; ++i) {
        if (stride[i] < 0) {
          offset -= (shape[i] - 1) * stride[i];
        }
      }
    }
    var dtype = arrayDType(data);
    var ctor_list = CACHED_CONSTRUCTORS[dtype];
    while (ctor_list.length <= d + 1) {
      ctor_list.push(compileConstructor(dtype, ctor_list.length - 1));
    }
    var ctor = ctor_list[d + 1];
    return ctor(data, shape, stride, offset);
  }
  module.exports = wrappedNDArrayCtor;
  global.define = __define;
  return module.exports;
});

System.register("npm:ndarray-downsample2x@0.1.1/downsample", ["npm:ndarray-fft@0.1.0", "npm:ndarray-scratch@0.0.1", "npm:ndarray-ops@1.1.1", "npm:cwise@0.3.4"], true, function(require, exports, module) {
  var global = System.global,
      __define = global.define;
  global.define = undefined;
  "use strict";
  var fft = require("npm:ndarray-fft@0.1.0");
  var pool = require("npm:ndarray-scratch@0.0.1");
  var ops = require("npm:ndarray-ops@1.1.1");
  var cwise = require("npm:cwise@0.3.4");
  var clampScale = cwise({
    args: ["array", "array", "scalar", "scalar", "scalar"],
    body: function clampScale(out, inp, s, l, h) {
      var x = inp * s;
      if (x < l) {
        x = l;
      }
      if (x > h) {
        x = h;
      }
      out = x;
    }
  });
  function downsample2x(out, inp, clamp_lo, clamp_hi) {
    if (typeof clamp_lo === "undefined") {
      clamp_lo = -Infinity;
    }
    if (typeof clamp_hi === "undefined") {
      clamp_hi = Infinity;
    }
    var ishp = inp.shape;
    var oshp = out.shape;
    if (out.size === 1) {
      var v = ops.sum(inp) / inp.size;
      if (v < clamp_lo) {
        v = clamp_lo;
      }
      if (v > clamp_hi) {
        v = clamp_hi;
      }
      out.set(0, 0, v);
      return ;
    }
    var d = ishp.length;
    var x = pool.malloc(ishp),
        y = pool.malloc(ishp);
    ops.assign(x, inp);
    ops.assigns(y, 0.0);
    fft(1, x, y);
    var lo = x.lo,
        hi = x.hi;
    var s = pool.malloc(oshp),
        t = pool.malloc(oshp);
    var nr = new Array(d),
        a = new Array(d),
        b = new Array(d);
    for (var i = 0; i < 1 << d; ++i) {
      for (var j = 0; j < d; ++j) {
        if (i & (1 << j)) {
          nr[j] = oshp[j] - (oshp[j] >> 1);
          if (nr[j] === 0) {
            continue;
          }
          a[j] = oshp[j] - nr[j];
          b[j] = ishp[j] - nr[j];
        } else {
          nr[j] = oshp[j] >>> 1;
          a[j] = 0;
          b[j] = 0;
        }
      }
      ops.assign(hi.apply(lo.apply(s, a), nr), hi.apply(lo.apply(x, b), nr));
      ops.assign(hi.apply(lo.apply(t, a), nr), hi.apply(lo.apply(y, b), nr));
    }
    fft(-1, s, t);
    clampScale(out, s, 1.0 / (1 << d), clamp_lo, clamp_hi);
    pool.free(x);
    pool.free(y);
    pool.free(s);
    pool.free(t);
  }
  module.exports = downsample2x;
  global.define = __define;
  return module.exports;
});

System.register("npm:through@2.3.7/index", ["github:jspm/nodelibs-stream@0.1.0", "github:jspm/nodelibs-process@0.1.1"], true, function(require, exports, module) {
  var global = System.global,
      __define = global.define;
  global.define = undefined;
  (function(process) {
    var Stream = require("github:jspm/nodelibs-stream@0.1.0");
    exports = module.exports = through;
    through.through = through;
    function through(write, end, opts) {
      write = write || function(data) {
        this.queue(data);
      };
      end = end || function() {
        this.queue(null);
      };
      var ended = false,
          destroyed = false,
          buffer = [],
          _ended = false;
      var stream = new Stream();
      stream.readable = stream.writable = true;
      stream.paused = false;
      stream.autoDestroy = !(opts && opts.autoDestroy === false);
      stream.write = function(data) {
        write.call(this, data);
        return !stream.paused;
      };
      function drain() {
        while (buffer.length && !stream.paused) {
          var data = buffer.shift();
          if (null === data)
            return stream.emit('end');
          else
            stream.emit('data', data);
        }
      }
      stream.queue = stream.push = function(data) {
        if (_ended)
          return stream;
        if (data === null)
          _ended = true;
        buffer.push(data);
        drain();
        return stream;
      };
      stream.on('end', function() {
        stream.readable = false;
        if (!stream.writable && stream.autoDestroy)
          process.nextTick(function() {
            stream.destroy();
          });
      });
      function _end() {
        stream.writable = false;
        end.call(stream);
        if (!stream.readable && stream.autoDestroy)
          stream.destroy();
      }
      stream.end = function(data) {
        if (ended)
          return ;
        ended = true;
        if (arguments.length)
          stream.write(data);
        _end();
        return stream;
      };
      stream.destroy = function() {
        if (destroyed)
          return ;
        destroyed = true;
        ended = true;
        buffer.length = 0;
        stream.writable = stream.readable = false;
        stream.emit('close');
        return stream;
      };
      stream.pause = function() {
        if (stream.paused)
          return ;
        stream.paused = true;
        return stream;
      };
      stream.resume = function() {
        if (stream.paused) {
          stream.paused = false;
          stream.emit('resume');
        }
        drain();
        if (!stream.paused)
          stream.emit('drain');
        return stream;
      };
      return stream;
    }
  })(require("github:jspm/nodelibs-process@0.1.1"));
  global.define = __define;
  return module.exports;
});

System.register("npm:game-shell@0.1.4", ["npm:game-shell@0.1.4/shell"], true, function(require, exports, module) {
  var global = System.global,
      __define = global.define;
  global.define = undefined;
  module.exports = require("npm:game-shell@0.1.4/shell");
  global.define = __define;
  return module.exports;
});

System.register("npm:ndarray@1.0.18", ["npm:ndarray@1.0.18/ndarray"], true, function(require, exports, module) {
  var global = System.global,
      __define = global.define;
  global.define = undefined;
  module.exports = require("npm:ndarray@1.0.18/ndarray");
  global.define = __define;
  return module.exports;
});

System.register("npm:ndarray-downsample2x@0.1.1", ["npm:ndarray-downsample2x@0.1.1/downsample"], true, function(require, exports, module) {
  var global = System.global,
      __define = global.define;
  global.define = undefined;
  module.exports = require("npm:ndarray-downsample2x@0.1.1/downsample");
  global.define = __define;
  return module.exports;
});

System.register("npm:through@2.3.7", ["npm:through@2.3.7/index"], true, function(require, exports, module) {
  var global = System.global,
      __define = global.define;
  global.define = undefined;
  module.exports = require("npm:through@2.3.7/index");
  global.define = __define;
  return module.exports;
});

System.register("npm:gl-now@0.0.4/index", ["npm:game-shell@0.1.4", "npm:webglew@0.0.0"], true, function(require, exports, module) {
  var global = System.global,
      __define = global.define;
  global.define = undefined;
  "use strict";
  var makeGameShell = require("npm:game-shell@0.1.4");
  var webglew = require("npm:webglew@0.0.0");
  function createGLShell(options) {
    options = options || {};
    var extensions = options.extensions || [];
    var shell = makeGameShell(options);
    shell.on("init", function initGLNow() {
      var canvas = document.createElement("canvas");
      var gl = canvas.getContext("webgl") || canvas.getContext("experimental-webgl");
      if (!gl) {
        shell.emit("gl-error", new Error("Unable to initialize WebGL"));
        return ;
      }
      var ext = webglew(gl);
      for (var i = 0; i < extensions.length; ++i) {
        if (!(extensions[i] in ext)) {
          shell.emit("gl-error", new Error("Missing extension: " + extensions[i]));
          return ;
        }
      }
      canvas.style.position = "absolute";
      canvas.style.left = "0px";
      canvas.style.top = "0px";
      shell.element.appendChild(canvas);
      canvas.width = shell.width;
      canvas.height = shell.height;
      shell.canvas = canvas;
      shell.gl = gl;
      shell.clearFlags = options.clearFlags === undefined ? (gl.COLOR_BUFFER_BIT | gl.DEPTH_BUFFER_BIT) : options.clearFlags;
      shell.clearColor = options.clearColor || [0.2, 0.4, 0.8, 1.0];
      shell.clearDepth = options.clearDepth || 1.0;
      shell.clearStencil = options.clearStencil || 0;
      shell.on("resize", function(w, h) {
        canvas.width = w;
        canvas.height = h;
      });
      shell.on("render", function renderGLNow(t) {
        gl.bindFramebuffer(gl.FRAMEBUFFER, null);
        gl.viewport(0, 0, shell.width, shell.height);
        if (shell.clearFlags & gl.STENCIL_BUFFER_BIT) {
          gl.clearStencil(shell.clearStencil);
        }
        if (shell.clearFlags & gl.COLOR_BUFFER_BIT) {
          gl.clearColor(shell.clearColor[0], shell.clearColor[1], shell.clearColor[2], shell.clearColor[3]);
        }
        if (shell.clearFlags & gl.DEPTH_BUFFER_BIT) {
          gl.clearDepth(shell.clearDepth);
        }
        if (shell.clearFlags) {
          gl.clear(gl.COLOR_BUFFER_BIT | gl.DEPTH_BUFFER_BIT | gl.STENCIL_BUFFER_BIT);
        }
        shell.emit("gl-render", t);
      });
      shell.emit("gl-init");
    });
    return shell;
  }
  module.exports = createGLShell;
  global.define = __define;
  return module.exports;
});

System.register("npm:tile-mip-map@0.2.1/mipmap", ["npm:ndarray@1.0.18", "npm:ndarray-ops@1.1.1", "npm:ndarray-downsample2x@0.1.1"], true, function(require, exports, module) {
  var global = System.global,
      __define = global.define;
  global.define = undefined;
  "use strict";
  var ndarray = require("npm:ndarray@1.0.18");
  var ops = require("npm:ndarray-ops@1.1.1");
  var downsample = require("npm:ndarray-downsample2x@0.1.1");
  function makeTileMipMap(tilearray, pad) {
    pad = pad || 1;
    var levels = [];
    var s = tilearray.shape;
    var nx = s[0];
    var ny = s[1];
    var hx = s[2];
    var hy = s[3];
    var channels = s[4];
    var ctor = tilearray.data.constructor;
    var tx = hx * pad;
    var ty = hy * pad;
    while (tx > 0 && ty > 0) {
      var sz = nx * ny * tx * ty * channels;
      var shape = [nx, ny, tx, ty, channels];
      var stride = [channels * ny * tx * ty, channels * ty, channels * ny * ty, channels, 1];
      var level = ndarray(new ctor(sz), shape, stride, 0);
      if (levels.length === 0) {
        for (var i = 0; i < nx; ++i) {
          for (var j = 0; j < ny; ++j) {
            for (var k = 0; k < channels; ++k) {
              var t0 = level.pick(i, j, undefined, undefined, k);
              var t1 = tilearray.pick(i, j, undefined, undefined, k);
              for (var x = 0; x < pad; ++x) {
                for (var y = 0; y < pad; ++y) {
                  ops.assign(t0.lo(hx * x, hy * y).hi(hx, hy), t1);
                }
              }
            }
          }
        }
      } else {
        var plevel = levels[levels.length - 1];
        for (var i = 0; i < nx; ++i) {
          for (var j = 0; j < ny; ++j) {
            for (var k = 0; k < channels; ++k) {
              var t0 = level.pick(i, j, undefined, undefined, k);
              var t1 = plevel.pick(i, j, undefined, undefined, k);
              downsample(t0, t1, 0, 255);
            }
          }
        }
      }
      levels.push(level);
      tx >>>= 1;
      ty >>>= 1;
    }
    return levels;
  }
  module.exports = makeTileMipMap;
  global.define = __define;
  return module.exports;
});

System.register("npm:glsl-tokenizer@0.0.9/index", ["npm:through@2.3.7", "npm:glsl-tokenizer@0.0.9/lib/literals", "npm:glsl-tokenizer@0.0.9/lib/operators", "npm:glsl-tokenizer@0.0.9/lib/builtins"], true, function(require, exports, module) {
  var global = System.global,
      __define = global.define;
  global.define = undefined;
  module.exports = tokenize;
  var through = require("npm:through@2.3.7");
  var literals = require("npm:glsl-tokenizer@0.0.9/lib/literals"),
      operators = require("npm:glsl-tokenizer@0.0.9/lib/operators"),
      builtins = require("npm:glsl-tokenizer@0.0.9/lib/builtins");
  var NORMAL = 999,
      TOKEN = 9999,
      BLOCK_COMMENT = 0,
      LINE_COMMENT = 1,
      PREPROCESSOR = 2,
      OPERATOR = 3,
      INTEGER = 4,
      FLOAT = 5,
      IDENT = 6,
      BUILTIN = 7,
      KEYWORD = 8,
      WHITESPACE = 9,
      EOF = 10,
      HEX = 11;
  var map = ['block-comment', 'line-comment', 'preprocessor', 'operator', 'integer', 'float', 'ident', 'builtin', 'keyword', 'whitespace', 'eof', 'integer'];
  function tokenize() {
    var stream = through(write, end);
    var i = 0,
        total = 0,
        mode = NORMAL,
        c,
        last,
        content = [],
        token_idx = 0,
        token_offs = 0,
        line = 1,
        start = 0,
        isnum = false,
        isoperator = false,
        input = '',
        len;
    return stream;
    function token(data) {
      if (data.length) {
        stream.queue({
          type: map[mode],
          data: data,
          position: start,
          line: line
        });
      }
    }
    function write(chunk) {
      i = 0;
      input += chunk.toString();
      len = input.length;
      while (c = input[i], i < len)
        switch (mode) {
          case BLOCK_COMMENT:
            i = block_comment();
            break;
          case LINE_COMMENT:
            i = line_comment();
            break;
          case PREPROCESSOR:
            i = preprocessor();
            break;
          case OPERATOR:
            i = operator();
            break;
          case INTEGER:
            i = integer();
            break;
          case HEX:
            i = hex();
            break;
          case FLOAT:
            i = decimal();
            break;
          case TOKEN:
            i = readtoken();
            break;
          case WHITESPACE:
            i = whitespace();
            break;
          case NORMAL:
            i = normal();
            break;
        }
      total += i;
      input = input.slice(i);
    }
    function end(chunk) {
      if (content.length) {
        token(content.join(''));
      }
      mode = EOF;
      token('(eof)');
      stream.queue(null);
    }
    function normal() {
      content = content.length ? [] : content;
      if (last === '/' && c === '*') {
        start = total + i - 1;
        mode = BLOCK_COMMENT;
        last = c;
        return i + 1;
      }
      if (last === '/' && c === '/') {
        start = total + i - 1;
        mode = LINE_COMMENT;
        last = c;
        return i + 1;
      }
      if (c === '#') {
        mode = PREPROCESSOR;
        start = total + i;
        return i;
      }
      if (/\s/.test(c)) {
        mode = WHITESPACE;
        start = total + i;
        return i;
      }
      isnum = /\d/.test(c);
      isoperator = /[^\w_]/.test(c);
      start = total + i;
      mode = isnum ? INTEGER : isoperator ? OPERATOR : TOKEN;
      return i;
    }
    function whitespace() {
      if (c === '\n')
        ++line;
      if (/[^\s]/g.test(c)) {
        token(content.join(''));
        mode = NORMAL;
        return i;
      }
      content.push(c);
      last = c;
      return i + 1;
    }
    function preprocessor() {
      if (c === '\n')
        ++line;
      if (c === '\n' && last !== '\\') {
        token(content.join(''));
        mode = NORMAL;
        return i;
      }
      content.push(c);
      last = c;
      return i + 1;
    }
    function line_comment() {
      return preprocessor();
    }
    function block_comment() {
      if (c === '/' && last === '*') {
        content.push(c);
        token(content.join(''));
        mode = NORMAL;
        return i + 1;
      }
      if (c === '\n')
        ++line;
      content.push(c);
      last = c;
      return i + 1;
    }
    function operator() {
      if (last === '.' && /\d/.test(c)) {
        mode = FLOAT;
        return i;
      }
      if (last === '/' && c === '*') {
        mode = BLOCK_COMMENT;
        return i;
      }
      if (last === '/' && c === '/') {
        mode = LINE_COMMENT;
        return i;
      }
      if (c === '.' && content.length) {
        while (determine_operator(content))
          ;
        mode = FLOAT;
        return i;
      }
      if (c === ';' || c === ')' || c === '(') {
        if (content.length)
          while (determine_operator(content))
            ;
        token(c);
        mode = NORMAL;
        return i + 1;
      }
      var is_composite_operator = content.length === 2 && c !== '=';
      if (/[\w_\d\s]/.test(c) || is_composite_operator) {
        while (determine_operator(content))
          ;
        mode = NORMAL;
        return i;
      }
      content.push(c);
      last = c;
      return i + 1;
    }
    function determine_operator(buf) {
      var j = 0,
          idx;
      do {
        idx = operators.indexOf(buf.slice(0, buf.length + j).join(''));
        if (idx === -1) {
          j -= 1;
          continue;
        }
        token(operators[idx]);
        start += operators[idx].length;
        content = content.slice(operators[idx].length);
        return content.length;
      } while (1);
    }
    function hex() {
      if (/[^a-fA-F0-9]/.test(c)) {
        token(content.join(''));
        mode = NORMAL;
        return i;
      }
      content.push(c);
      last = c;
      return i + 1;
    }
    function integer() {
      if (c === '.') {
        content.push(c);
        mode = FLOAT;
        last = c;
        return i + 1;
      }
      if (/[eE]/.test(c)) {
        content.push(c);
        mode = FLOAT;
        last = c;
        return i + 1;
      }
      if (c === 'x' && content.length === 1 && content[0] === '0') {
        mode = HEX;
        content.push(c);
        last = c;
        return i + 1;
      }
      if (/[^\d]/.test(c)) {
        token(content.join(''));
        mode = NORMAL;
        return i;
      }
      content.push(c);
      last = c;
      return i + 1;
    }
    function decimal() {
      if (c === 'f') {
        content.push(c);
        last = c;
        i += 1;
      }
      if (/[eE]/.test(c)) {
        content.push(c);
        last = c;
        return i + 1;
      }
      if (/[^\d]/.test(c)) {
        token(content.join(''));
        mode = NORMAL;
        return i;
      }
      content.push(c);
      last = c;
      return i + 1;
    }
    function readtoken() {
      if (/[^\d\w_]/.test(c)) {
        var contentstr = content.join('');
        if (literals.indexOf(contentstr) > -1) {
          mode = KEYWORD;
        } else if (builtins.indexOf(contentstr) > -1) {
          mode = BUILTIN;
        } else {
          mode = IDENT;
        }
        token(content.join(''));
        mode = NORMAL;
        return i;
      }
      content.push(c);
      last = c;
      return i + 1;
    }
  }
  global.define = __define;
  return module.exports;
});

System.register("npm:gl-now@0.0.4", ["npm:gl-now@0.0.4/index"], true, function(require, exports, module) {
  var global = System.global,
      __define = global.define;
  global.define = undefined;
  module.exports = require("npm:gl-now@0.0.4/index");
  global.define = __define;
  return module.exports;
});

System.register("npm:tile-mip-map@0.2.1", ["npm:tile-mip-map@0.2.1/mipmap"], true, function(require, exports, module) {
  var global = System.global,
      __define = global.define;
  global.define = undefined;
  module.exports = require("npm:tile-mip-map@0.2.1/mipmap");
  global.define = __define;
  return module.exports;
});

System.register("npm:glsl-tokenizer@0.0.9", ["npm:glsl-tokenizer@0.0.9/index"], true, function(require, exports, module) {
  var global = System.global,
      __define = global.define;
  global.define = undefined;
  module.exports = require("npm:glsl-tokenizer@0.0.9/index");
  global.define = __define;
  return module.exports;
});

System.register("npm:gl-tile-map@0.3.0/tilemap", ["npm:ndarray@1.0.18", "npm:tile-mip-map@0.2.1", "npm:gl-texture2d@0.1.12"], true, function(require, exports, module) {
  var global = System.global,
      __define = global.define;
  global.define = undefined;
  "use strict";
  var ndarray = require("npm:ndarray@1.0.18");
  var tileMipMap = require("npm:tile-mip-map@0.2.1");
  var createTexture = require("npm:gl-texture2d@0.1.12");
  function reshapeTileMap(tiles) {
    var s = tiles.shape;
    return ndarray(tiles.data, [s[0] * s[2], s[1] * s[3], s[4]]);
  }
  function createTileMap(gl, tiles, pad) {
    var pyramid = tileMipMap(tiles, pad);
    var tex = createTexture(gl, reshapeTileMap(pyramid[0]));
    tex.generateMipmap();
    for (var i = 1; i < pyramid.length; ++i) {
      tex.setPixels(reshapeTileMap(pyramid[i]), 0, 0, i);
    }
    tex.magFilter = gl.LINEAR;
    tex.minFilter = gl.LINEAR_MIPMAP_LINEAR;
    tex.mipSamples = 4;
    return tex;
  }
  module.exports = createTileMap;
  global.define = __define;
  return module.exports;
});

System.register("npm:glsl-exports@0.0.0/index", ["npm:glsl-tokenizer@0.0.9", "npm:glsl-parser@0.0.9", "npm:through@2.3.7"], true, function(require, exports, module) {
  var global = System.global,
      __define = global.define;
  global.define = undefined;
  "use strict";
  var glslTokenizer = require("npm:glsl-tokenizer@0.0.9");
  var glslParser = require("npm:glsl-parser@0.0.9");
  var through = require("npm:through@2.3.7");
  function parseDeclaration(x) {
    var type,
        identifiers = [],
        i;
    for (var i = 0; i < x.children.length; ++i) {
      var c = x.children[i];
      if (c.type === "placeholder") {
        continue;
      } else if (c.type === "keyword") {
        if (c.token.data === "uniform" || c.token.data === "attribute") {
          continue;
        }
        type = c.token.data;
      } else if (c.type === "decllist") {
        for (var j = 0; j < c.children.length; ++j) {
          var d = c.children[j];
          if (d.type === "ident") {
            identifiers.push(d.token.data);
          }
        }
      }
    }
    return {
      type: type,
      vars: identifiers
    };
  }
  function glslGlobals(src) {
    var uniforms = {};
    var attributes = {};
    var strm = through();
    strm.pipe(glslTokenizer()).pipe(glslParser()).on('data', function(x) {
      if (x.type === "decl" && x.token.type === "keyword") {
        if (x.token.data === "uniform") {
          var result = parseDeclaration(x);
          for (var i = 0; i < result.vars.length; ++i) {
            uniforms[result.vars[i]] = result.type;
          }
        } else if (x.token.data === "attribute") {
          var result = parseDeclaration(x);
          for (var i = 0; i < result.vars.length; ++i) {
            attributes[result.vars[i]] = result.type;
          }
        }
      }
    });
    strm.write(src);
    return {
      uniforms: uniforms,
      attributes: attributes
    };
  }
  module.exports = glslGlobals;
  global.define = __define;
  return module.exports;
});

System.register("npm:gl-tile-map@0.3.0", ["npm:gl-tile-map@0.3.0/tilemap"], true, function(require, exports, module) {
  var global = System.global,
      __define = global.define;
  global.define = undefined;
  module.exports = require("npm:gl-tile-map@0.3.0/tilemap");
  global.define = __define;
  return module.exports;
});

System.register("npm:glsl-exports@0.0.0", ["npm:glsl-exports@0.0.0/index"], true, function(require, exports, module) {
  var global = System.global,
      __define = global.define;
  global.define = undefined;
  module.exports = require("npm:glsl-exports@0.0.0/index");
  global.define = __define;
  return module.exports;
});

System.register("npm:gl-shader@0.0.6/index", ["npm:glsl-exports@0.0.0", "npm:uniq@0.0.2"], true, function(require, exports, module) {
  var global = System.global,
      __define = global.define;
  global.define = undefined;
  "use strict";
  var glslExports = require("npm:glsl-exports@0.0.0");
  var uniq = require("npm:uniq@0.0.2");
  function Shader(gl, prog, uniforms, attributes) {
    this.gl = gl;
    this.program = prog;
    this.uniforms = uniforms;
    this.attributes = attributes;
  }
  Shader.prototype.bind = function() {
    this.gl.useProgram(this.program);
  };
  function kvPairs(obj) {
    return Object.keys(obj).map(function(x) {
      return [x, obj[x]];
    });
  }
  function makeVectorUniform(gl, prog, location, obj, type, d, name) {
    if (d > 1) {
      type += "v";
    }
    var setter = new Function("gl", "prog", "v", "gl.uniform" + d + type + "(gl.getUniformLocation(prog,'" + name + "'), v)");
    var getter = new Function("gl", "prog", "return gl.getUniform(prog, gl.getUniformLocation(prog,'" + name + "'))");
    Object.defineProperty(obj, name, {
      set: setter.bind(undefined, gl, prog),
      get: getter.bind(undefined, gl, prog),
      enumerable: true
    });
  }
  function makeMatrixUniform(gl, prog, location, obj, d, name) {
    var setter = new Function("gl", "prog", "v", "gl.uniformMatrix" + d + "fv(gl.getUniformLocation(prog,'" + name + "'), false, v)");
    var getter = new Function("gl", "prog", "return gl.getUniform(prog, gl.getUniformLocation(prog,'" + name + "'))");
    Object.defineProperty(obj, name, {
      set: setter.bind(undefined, gl, prog),
      get: getter.bind(undefined, gl, prog),
      enumerable: true
    });
  }
  function makeVectorAttrib(gl, prog, location, obj, d, name) {
    var out = {};
    out.pointer = function attribPointer(type, normalized, stride, offset) {
      gl.vertexAttribPointer(location, d, type || gl.FLOAT, normalized ? gl.TRUE : gl.FALSE, stride || 0, offset || 0);
    };
    out.enable = function enableAttrib() {
      gl.enableVertexAttribArray(location);
    };
    out.disable = function disableAttrib() {
      gl.disableVertexAttribArray(location);
    };
    Object.defineProperty(out, "location", {
      get: function() {
        return location;
      },
      set: function(v) {
        if (v !== location) {
          location = v;
          gl.bindAttribLocation(prog, v, name);
          gl.linkProgram(prog);
        }
        return v;
      }
    });
    var constFuncArgs = ["gl", "v"];
    var var_names = [];
    for (var i = 0; i < d; ++i) {
      constFuncArgs.push("x" + i);
      var_names.push("x" + i);
    }
    constFuncArgs.push(["if(x0.length === undefined) {", "return gl.vertexAttrib" + d + "f(v," + var_names.join(",") + ")", "} else {", "return gl.vertexAttrib" + d + "fv(v,x0)", "}"].join("\n"));
    var constFunc = Function.apply(undefined, constFuncArgs);
    out.set = function setAttrib(x, y, z, w) {
      return constFunc(gl, location, x, y, z, w);
    };
    Object.defineProperty(obj, name, {
      set: function(x) {
        out.isArray = false;
        constFunc(gl, location, x);
        return x;
      },
      get: function() {
        return out;
      },
      enumerable: true
    });
  }
  function makeShader(gl, vert_source, frag_source) {
    var vert_shader = gl.createShader(gl.VERTEX_SHADER);
    gl.shaderSource(vert_shader, vert_source);
    gl.compileShader(vert_shader);
    if (!gl.getShaderParameter(vert_shader, gl.COMPILE_STATUS)) {
      throw new Error("Error compiling vertex shader: " + gl.getShaderInfoLog(vert_shader));
    }
    var frag_shader = gl.createShader(gl.FRAGMENT_SHADER);
    gl.shaderSource(frag_shader, frag_source);
    gl.compileShader(frag_shader);
    if (!gl.getShaderParameter(frag_shader, gl.COMPILE_STATUS)) {
      throw new Error("Error compiling fragment shader: " + gl.getShaderInfoLog(frag_shader));
    }
    var program = gl.createProgram();
    gl.attachShader(program, frag_shader);
    gl.attachShader(program, vert_shader);
    gl.linkProgram(program);
    if (!gl.getProgramParameter(program, gl.LINK_STATUS)) {
      throw new Error("Error linking shader program: " + gl.getProgramInfoLog(program));
    }
    var frag_exports = glslExports(frag_source);
    var vert_exports = glslExports(vert_source);
    var uniforms = uniq(kvPairs(frag_exports.uniforms).concat(kvPairs(vert_exports.uniforms)), function compare(a, b) {
      return a[0] < b[0] ? -1 : (a[0] === b[0] ? 0 : 1);
    });
    var uniform_fields = {};
    for (var i = 0; i < uniforms.length; ++i) {
      var u = uniforms[i];
      var name = u[0];
      var type = u[1];
      var x = gl.getUniformLocation(program, name);
      if (!x) {
        Object.defineProperty(uniform_fields, name, {
          get: function() {},
          set: function() {}
        });
        continue;
      }
      switch (type) {
        case "bool":
        case "int":
        case "sampler2D":
        case "samplerCube":
          makeVectorUniform(gl, program, x, uniform_fields, "i", 1, name);
          break;
        case "float":
          makeVectorUniform(gl, program, x, uniform_fields, "f", 1, name);
          break;
        default:
          if (type.indexOf("vec") >= 0) {
            var d = type.charCodeAt(type.length - 1) - 48;
            if (d < 2 || d > 4) {
              throw new Error("Invalid data type");
            }
            switch (type.charAt(0)) {
              case "b":
              case "i":
                makeVectorUniform(gl, program, x, uniform_fields, "i", d, name);
                break;
              case "v":
                makeVectorUniform(gl, program, x, uniform_fields, "f", d, name);
                break;
              default:
                throw new Error("Unrecognized data type");
            }
          } else if (type.charAt(0) === "m") {
            var d = type.charCodeAt(type.length - 1) - 48;
            if (d < 2 || d > 4) {
              throw new Error("Invalid data type");
            }
            makeMatrixUniform(gl, program, x, uniform_fields, d, name);
          } else {
            throw new Error("Invalid data type");
          }
          break;
      }
    }
    var attributes = kvPairs(vert_exports.attributes);
    var attribute_fields = {};
    for (var i = 0; i < attributes.length; ++i) {
      var u = attributes[i];
      var name = u[0];
      var type = u[1];
      var x = gl.getAttribLocation(program, name);
      switch (type) {
        case "bool":
        case "int":
        case "float":
          makeVectorAttrib(gl, program, x, attribute_fields, 1, name);
          break;
        default:
          if (type.indexOf("vec") >= 0) {
            var d = type.charCodeAt(type.length - 1) - 48;
            if (d < 2 || d > 4) {
              throw new Error("Invalid data type");
            }
            makeVectorAttrib(gl, program, x, attribute_fields, d, name);
          } else {
            throw new Error("Invalid data type");
          }
          break;
      }
    }
    return new Shader(gl, program, uniform_fields, attribute_fields);
  }
  module.exports = makeShader;
  global.define = __define;
  return module.exports;
});

System.register("npm:gl-shader@0.0.6", ["npm:gl-shader@0.0.6/index"], true, function(require, exports, module) {
  var global = System.global,
      __define = global.define;
  global.define = undefined;
  module.exports = require("npm:gl-shader@0.0.6/index");
  global.define = __define;
  return module.exports;
});

System.register("npm:ao-shader@0.2.3/aoshader", ["github:jspm/nodelibs-fs@0.1.2", "npm:gl-shader@0.0.6"], true, function(require, exports, module) {
  var global = System.global,
      __define = global.define;
  global.define = undefined;
  var __filename = "/jspm_packages/npm/ao-shader@0.2.3/aoshader.js",
      __dirname = "/jspm_packages/npm/ao-shader@0.2.3";
  var fs = require("github:jspm/nodelibs-fs@0.1.2");
  var createShader = require("npm:gl-shader@0.0.6");
  module.exports = function(gl) {
    return createShader(gl, fs.readFileSync(__dirname + "/lib/ao.vsh"), fs.readFileSync(__dirname + "/lib/ao.fsh"));
  };
  global.define = __define;
  return module.exports;
});

System.register("npm:ao-shader@0.2.3", ["npm:ao-shader@0.2.3/aoshader"], true, function(require, exports, module) {
  var global = System.global,
      __define = global.define;
  global.define = undefined;
  module.exports = require("npm:ao-shader@0.2.3/aoshader");
  global.define = __define;
  return module.exports;
});

System.register("npm:voxel-demo@0.0.1/shader", ["npm:gl-now@0.0.4", "npm:gl-tile-map@0.3.0", "npm:gl-buffer@0.1.2", "npm:gl-vao@0.0.3", "npm:gl-matrix@2.0.0", "npm:ndarray@1.0.18", "npm:ndarray-fill@0.1.0", "npm:ndarray-ops@1.1.1", "npm:ao-mesher@0.2.10", "npm:ao-shader@0.2.3"], true, function(require, exports, module) {
  var global = System.global,
      __define = global.define;
  global.define = undefined;
  "use strict";
  var shell = require("npm:gl-now@0.0.4")();
  var createTileMap = require("npm:gl-tile-map@0.3.0");
  var createBuffer = require("npm:gl-buffer@0.1.2");
  var createVAO = require("npm:gl-vao@0.0.3");
  var glm = require("npm:gl-matrix@2.0.0");
  var ndarray = require("npm:ndarray@1.0.18");
  var fill = require("npm:ndarray-fill@0.1.0");
  var ops = require("npm:ndarray-ops@1.1.1");
  var createAOMesh = require("npm:ao-mesher@0.2.10");
  var createAOShader = require("npm:ao-shader@0.2.3");
  var mat4 = glm.mat4;
  var shader;
  var texture;
  var vao,
      vertexCount;
  shell.on("gl-init", function() {
    var gl = shell.gl;
    shader = createAOShader(gl);
    var voxels = ndarray(new Uint16Array(32 * 32 * 32), [32, 32, 32]);
    voxels.set(16, 16, 16, 1 << 15);
    fill(voxels, function(i, j, k) {
      var x = Math.abs(i - 16);
      var y = Math.abs(j - 16);
      var z = Math.abs(k - 16);
      return (x * x + y * y + z * z) < 30 ? 1 << 15 : 0;
    });
    var vert_data = createAOMesh(voxels);
    vertexCount = Math.floor(vert_data.length / 8);
    var vert_buf = createBuffer(gl, vert_data);
    vao = createVAO(gl, undefined, [{
      "buffer": vert_buf,
      "type": gl.UNSIGNED_BYTE,
      "size": 4,
      "offset": 0,
      "stride": 8,
      "normalized": false
    }, {
      "buffer": vert_buf,
      "type": gl.UNSIGNED_BYTE,
      "size": 4,
      "offset": 4,
      "stride": 8,
      "normalized": false
    }]);
    var tiles = ndarray(new Uint8Array(256 * 256 * 4), [16, 16, 16, 16, 4]);
    fill(tiles, function(x, y, i, j, c) {
      if (c === 3) {
        return 255;
      }
      return x * c + y * y * c + ((i >> 2) + (j >> 2)) & 1 ? 255 : 0;
    });
    texture = createTileMap(gl, tiles, true);
  });
  shell.on("gl-render", function(t) {
    var gl = shell.gl;
    gl.enable(gl.CULL_FACE);
    gl.enable(gl.DEPTH_TEST);
    shader.bind();
    shader.attributes.attrib0.location = 0;
    shader.attributes.attrib1.location = 1;
    var A = new Float32Array(16);
    shader.uniforms.projection = mat4.perspective(A, Math.PI / 4.0, shell.width / shell.height, 1.0, 1000.0);
    var t = 0.0001 * Date.now();
    shader.uniforms.view = mat4.lookAt(A, [30 * Math.cos(t) + 16, 20, 30 * Math.sin(t) + 16], [16, 16, 16], [0, 1, 0]);
    shader.uniforms.tileSize = 16.0;
    if (texture) {
      shader.uniforms.tileMap = texture.bind();
    }
    shader.uniforms.model = mat4.identity(A);
    vao.bind();
    gl.drawArrays(gl.TRIANGLES, 0, vertexCount);
    vao.unbind();
  });
  global.define = __define;
  return module.exports;
});

System.register("npm:voxel-demo@0.0.1", ["npm:voxel-demo@0.0.1/shader"], true, function(require, exports, module) {
  var global = System.global,
      __define = global.define;
  global.define = undefined;
  module.exports = require("npm:voxel-demo@0.0.1/shader");
  global.define = __define;
  return module.exports;
});

//# sourceMappingURL=voxel-bundle.js.map