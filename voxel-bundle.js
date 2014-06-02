"format register";

System.register("github:jspm/nodelibs@0.0.2/events", [], true, function(require, exports, __moduleName) {
  var global = System.global;
  var __define = global.define;
  global.define = undefined;
  var module = { exports: exports };
  var process = System.get("@@nodeProcess")["default"];
    var __filename = "jspm_packages/github/jspm/nodelibs@0.0.2/events.js";
    var __dirname = "jspm_packages/github/jspm/nodelibs@0.0.2";
  "format cjs";process.EventEmitter||(process.EventEmitter=function(){});var EventEmitter=exports.EventEmitter=process.EventEmitter,isArray="function"==typeof Array.isArray?Array.isArray:function(e){return"[object Array]"===Object.prototype.toString.call(e)},defaultMaxListeners=10;EventEmitter.prototype.setMaxListeners=function(e){this._events||(this._events={}),this._events.maxListeners=e},EventEmitter.prototype.emit=function(e){if("error"===e&&(!this._events||!this._events.error||isArray(this._events.error)&&!this._events.error.length))throw arguments[1]instanceof Error?arguments[1]:new Error("Uncaught, unspecified 'error' event.");if(!this._events)return!1;var t=this._events[e];if(!t)return!1;if("function"==typeof t){switch(arguments.length){case 1:t.call(this);break;case 2:t.call(this,arguments[1]);break;case 3:t.call(this,arguments[1],arguments[2]);break;default:var n=Array.prototype.slice.call(arguments,1);t.apply(this,n)}return!0}if(isArray(t)){for(var n=Array.prototype.slice.call(arguments,1),r=t.slice(),o=0,i=r.length;i>o;o++)r[o].apply(this,n);return!0}return!1},EventEmitter.prototype.addListener=function(e,t){if("function"!=typeof t)throw new Error("addListener only takes instances of Function");if(this._events||(this._events={}),this.emit("newListener",e,t),this._events[e])if(isArray(this._events[e])){if(!this._events[e].warned){var n;n=void 0!==this._events.maxListeners?this._events.maxListeners:defaultMaxListeners,n&&n>0&&this._events[e].length>n&&(this._events[e].warned=!0,console.error("(node) warning: possible EventEmitter memory leak detected. %d listeners added. Use emitter.setMaxListeners() to increase limit.",this._events[e].length),console.trace())}this._events[e].push(t)}else this._events[e]=[this._events[e],t];else this._events[e]=t;return this},EventEmitter.prototype.on=EventEmitter.prototype.addListener,EventEmitter.prototype.once=function(e,t){var n=this;return n.on(e,function r(){n.removeListener(e,r),t.apply(this,arguments)}),this},EventEmitter.prototype.removeListener=function(e,t){if("function"!=typeof t)throw new Error("removeListener only takes instances of Function");if(!this._events||!this._events[e])return this;var n=this._events[e];if(isArray(n)){var r=n.indexOf(t);if(0>r)return this;n.splice(r,1),0==n.length&&delete this._events[e]}else this._events[e]===t&&delete this._events[e];return this},EventEmitter.prototype.removeAllListeners=function(e){return e&&this._events&&this._events[e]&&(this._events[e]=null),this},EventEmitter.prototype.listeners=function(e){return this._events||(this._events={}),this._events[e]||(this._events[e]=[]),isArray(this._events[e])||(this._events[e]=[this._events[e]]),this._events[e]};
  //# sourceMappingURL=events.js.map
  global.define = __define;
  return module.exports;
});

System.register("github:jspm/nodelibs@0.0.2/support/isBuffer", [], true, function(require, exports, __moduleName) {
  var global = System.global;
  var __define = global.define;
  global.define = undefined;
  var module = { exports: exports };
  var process = System.get("@@nodeProcess")["default"];
    var __filename = "jspm_packages/github/jspm/nodelibs@0.0.2/support/isBuffer.js";
    var __dirname = "jspm_packages/github/jspm/nodelibs@0.0.2/support";
  "format cjs";module.exports=function(e){return e&&"object"==typeof e&&"function"==typeof e.copy&&"function"==typeof e.fill&&"function"==typeof e.readUInt8};
  //# sourceMappingURL=isBuffer.js.map
  global.define = __define;
  return module.exports;
});

System.register("npm:inherits@2.0.1/inherits_browser", [], true, function(require, exports, __moduleName) {
  var global = System.global;
  var __define = global.define;
  global.define = undefined;
  var module = { exports: exports };
  var process = System.get("@@nodeProcess")["default"];
    var __filename = "jspm_packages/npm/inherits@2.0.1/inherits_browser.js";
    var __dirname = "jspm_packages/npm/inherits@2.0.1";
  "format cjs";module.exports="function"==typeof Object.create?function(e,t){e.super_=t,e.prototype=Object.create(t.prototype,{constructor:{value:e,enumerable:!1,writable:!0,configurable:!0}})}:function(e,t){e.super_=t;var n=function(){};n.prototype=t.prototype,e.prototype=new n,e.prototype.constructor=e};
  //# sourceMappingURL=inherits_browser.js.map
  global.define = __define;
  return module.exports;
});

System.register("npm:domready@0.2.13/ready", [], true, function(require, exports, __moduleName) {
  var global = System.global;
  var __define = global.define;
  global.define = undefined;
  var module = { exports: exports };
  var process = System.get("@@nodeProcess")["default"];
    var __filename = "jspm_packages/npm/domready@0.2.13/ready.js";
    var __dirname = "jspm_packages/npm/domready@0.2.13";
  "format cjs";!function(e,t){"undefined"!=typeof module?module.exports=t():"function"==typeof define&&"object"==typeof define.amd?define(t):this[e]=t()}("domready",function(e){function t(e){for(p=1;e=r.shift();)e()}var n,r=[],o=!1,i=document,a=i.documentElement,s=a.doScroll,u="DOMContentLoaded",c="addEventListener",l="onreadystatechange",f="readyState",h=s?/^loaded|^c/:/^loaded|c/,p=h.test(i[f]);return i[c]&&i[c](u,n=function(){i.removeEventListener(u,n,o),t()},o),s&&i.attachEvent(l,n=function(){/^c/.test(i[f])&&(i.detachEvent(l,n),t())}),e=s?function(t){self!=top?p?t():r.push(t):function(){try{a.doScroll("left")}catch(n){return setTimeout(function(){e(t)},50)}t()}()}:function(e){p?e():r.push(e)}});
  //# sourceMappingURL=ready.js.map
  global.define = __define;
  return module.exports;
});

System.register("npm:vkey@0.0.2/index", [], true, function(require, exports, __moduleName) {
  var global = System.global;
  var __define = global.define;
  global.define = undefined;
  var module = { exports: exports };
  var process = System.get("@@nodeProcess")["default"];
    var __filename = "jspm_packages/npm/vkey@0.0.2/index.js";
    var __dirname = "jspm_packages/npm/vkey@0.0.2";
  "format cjs";var ua="undefined"!=typeof window?window.navigator.userAgent:"",isOSX=/OS X/.test(ua),isOpera=/Opera/.test(ua),maybeFirefox=!/like Gecko/.test(ua)&&!isOpera,i,output=module.exports={0:isOSX?"<menu>":"<UNK>",1:"<mouse 1>",2:"<mouse 2>",3:"<break>",4:"<mouse 3>",5:"<mouse 4>",6:"<mouse 5>",8:"<backspace>",9:"<tab>",12:"<clear>",13:"<enter>",16:"<shift>",17:"<control>",18:"<alt>",19:"<pause>",20:"<caps-lock>",21:"<ime-hangul>",23:"<ime-junja>",24:"<ime-final>",25:"<ime-kanji>",27:"<escape>",28:"<ime-convert>",29:"<ime-nonconvert>",30:"<ime-accept>",31:"<ime-mode-change>",27:"<escape>",32:"<space>",33:"<page-up>",34:"<page-down>",35:"<end>",36:"<home>",37:"<left>",38:"<up>",39:"<right>",40:"<down>",41:"<select>",42:"<print>",43:"<execute>",44:"<snapshot>",45:"<insert>",46:"<delete>",47:"<help>",91:"<meta>",92:"<meta>",93:isOSX?"<meta>":"<menu>",95:"<sleep>",106:"<num-*>",107:"<num-+>",108:"<num-enter>",109:"<num-->",110:"<num-.>",111:"<num-/>",144:"<num-lock>",145:"<scroll-lock>",160:"<shift-left>",161:"<shift-right>",162:"<control-left>",163:"<control-right>",164:"<alt-left>",165:"<alt-right>",166:"<browser-back>",167:"<browser-forward>",168:"<browser-refresh>",169:"<browser-stop>",170:"<browser-search>",171:"<browser-favorites>",172:"<browser-home>",173:isOSX&&maybeFirefox?"-":"<volume-mute>",174:"<volume-down>",175:"<volume-up>",176:"<next-track>",177:"<prev-track>",178:"<stop>",179:"<play-pause>",180:"<launch-mail>",181:"<launch-media-select>",182:"<launch-app 1>",183:"<launch-app 2>",186:";",187:"=",188:",",189:"-",190:".",191:"/",192:"`",219:"[",220:"\\",221:"]",222:"'",223:"<meta>",224:"<meta>",226:"<alt-gr>",229:"<ime-process>",231:isOpera?"`":"<unicode>",246:"<attention>",247:"<crsel>",248:"<exsel>",249:"<erase-eof>",250:"<play>",251:"<zoom>",252:"<no-name>",253:"<pa-1>",254:"<clear>"};for(i=58;65>i;++i)output[i]=String.fromCharCode(i);for(i=48;58>i;++i)output[i]=i-48+"";for(i=65;91>i;++i)output[i]=String.fromCharCode(i);for(i=96;107>i;++i)output[i]="<num-"+(i-96)+">";for(i=112;136>i;++i)output[i]="F"+(i-111);
  //# sourceMappingURL=index.js.map
  global.define = __define;
  return module.exports;
});

System.register("npm:invert-hash@0.0.0/invert", [], true, function(require, exports, __moduleName) {
  var global = System.global;
  var __define = global.define;
  global.define = undefined;
  var module = { exports: exports };
  var process = System.get("@@nodeProcess")["default"];
    var __filename = "jspm_packages/npm/invert-hash@0.0.0/invert.js";
    var __dirname = "jspm_packages/npm/invert-hash@0.0.0";
  "format cjs";"use strict";function invert(e){var t={};for(var n in e)e.hasOwnProperty(n)&&(t[e[n]]=n);return t}module.exports=invert;
  //# sourceMappingURL=invert.js.map
  global.define = __define;
  return module.exports;
});

System.register("npm:uniq@0.0.2/uniq", [], true, function(require, exports, __moduleName) {
  var global = System.global;
  var __define = global.define;
  global.define = undefined;
  var module = { exports: exports };
  var process = System.get("@@nodeProcess")["default"];
    var __filename = "jspm_packages/npm/uniq@0.0.2/uniq.js";
    var __dirname = "jspm_packages/npm/uniq@0.0.2";
  "format cjs";"use strict";function unique_pred(t,e){for(var n=1,o=t.length,r=t[0],i=t[0],a=1;o>a;++a)if(i=r,r=t[a],e(r,i)){if(a===n){n++;continue}t[n++]=r}return t.length=n,t}function unique_eq(t){for(var e=1,n=t.length,o=t[0],r=t[0],i=1;n>i;++i,r=o)if(r=o,o=t[i],o!==r){if(i===e){e++;continue}t[e++]=o}return t.length=e,t}function unique(t,e,n){return 0===t.length?[]:e?(n||t.sort(e),unique_pred(t,e)):(n||t.sort(),unique_eq(t))}module.exports=unique;
  //# sourceMappingURL=uniq.js.map
  global.define = __define;
  return module.exports;
});

System.register("npm:lower-bound@0.0.1/lb", [], true, function(require, exports, __moduleName) {
  var global = System.global;
  var __define = global.define;
  global.define = undefined;
  var module = { exports: exports };
  var process = System.get("@@nodeProcess")["default"];
    var __filename = "jspm_packages/npm/lower-bound@0.0.1/lb.js";
    var __dirname = "jspm_packages/npm/lower-bound@0.0.1";
  "format cjs";"use strict";function lowerBound_cmp(e,t,n,r,o){for(r=0|r,o=0|o;o>r;){var i=r+o>>>1,a=n(t,e[i]);0>a?o=i-1:a>0?r=i+1:o=i}return n(e[r],t)<=0?r:r-1}function lowerBound_def(e,t,n,r){for(n=0|n,r=0|r;r>n;){var o=n+r>>>1;t<e[o]?r=o-1:t>e[o]?n=o+1:r=o}return e[n]<=t?n:n-1}function lowerBound(e,t,n,r,o){return r||(r=0),"number"!=typeof o&&(o=e.length-1),n?lowerBound_cmp(e,t,n,r,o):lowerBound_def(e,t,r,o)}module.exports=lowerBound;
  //# sourceMappingURL=lb.js.map
  global.define = __define;
  return module.exports;
});

System.register("npm:iota-array@0.0.1/iota", [], true, function(require, exports, __moduleName) {
  var global = System.global;
  var __define = global.define;
  global.define = undefined;
  var module = { exports: exports };
  var process = System.get("@@nodeProcess")["default"];
    var __filename = "jspm_packages/npm/iota-array@0.0.1/iota.js";
    var __dirname = "jspm_packages/npm/iota-array@0.0.1";
  "format cjs";"use strict";function iota(e){for(var t=new Array(e),n=0;e>n;++n)t[n]=n;return t}module.exports=iota;
  //# sourceMappingURL=iota.js.map
  global.define = __define;
  return module.exports;
});

System.register("npm:game-shell@0.1.4/lib/raf-polyfill", [], true, function(require, exports, __moduleName) {
  var global = System.global;
  var __define = global.define;
  global.define = undefined;
  var module = { exports: exports };
  var process = System.get("@@nodeProcess")["default"];
    var __filename = "jspm_packages/npm/game-shell@0.1.4/lib/raf-polyfill.js";
    var __dirname = "jspm_packages/npm/game-shell@0.1.4/lib";
  "format cjs";for(var lastTime=0,vendors=["ms","moz","webkit","o"],x=0;x<vendors.length&&!window.requestAnimationFrame;++x)window.requestAnimationFrame=window[vendors[x]+"RequestAnimationFrame"],window.cancelAnimationFrame=window[vendors[x]+"CancelAnimationFrame"]||window[vendors[x]+"CancelRequestAnimationFrame"];window.requestAnimationFrame||(window.requestAnimationFrame=function(t){var e=(new Date).getTime(),n=Math.max(0,16-(e-lastTime)),o=window.setTimeout(function(){t(e+n)},n);return lastTime=e+n,o}),window.cancelAnimationFrame||(window.cancelAnimationFrame=function(t){clearTimeout(t)});
  //# sourceMappingURL=raf-polyfill.js.map
  global.define = __define;
  return module.exports;
});

System.register("npm:game-shell@0.1.4/lib/mousewheel-polyfill", [], true, function(require, exports, __moduleName) {
  var global = System.global;
  var __define = global.define;
  global.define = undefined;
  var module = { exports: exports };
  var process = System.get("@@nodeProcess")["default"];
    var __filename = "jspm_packages/npm/game-shell@0.1.4/lib/mousewheel-polyfill.js";
    var __dirname = "jspm_packages/npm/game-shell@0.1.4/lib";
  "format cjs";function _addWheelListener(t,e,n,o){t[_addEventListener](prefix+e,"wheel"==support?n:function(t){!t&&(t=window.event);var e={originalEvent:t,target:t.target||t.srcElement,type:"wheel",deltaMode:"MozMousePixelScroll"==t.type?0:1,deltaX:0,delatZ:0,preventDefault:function(){t.preventDefault?t.preventDefault():t.returnValue=!1}};return"mousewheel"==support?(e.deltaY=-1/40*t.wheelDelta,t.wheelDeltaX&&(e.deltaX=-1/40*t.wheelDeltaX)):e.deltaY=t.detail,n(e)},o||!1)}var prefix="",_addEventListener,onwheel,support;window.addEventListener?_addEventListener="addEventListener":(_addEventListener="attachEvent",prefix="on"),support="onwheel"in document.createElement("div")?"wheel":void 0!==document.onmousewheel?"mousewheel":"DOMMouseScroll",module.exports=function(t,e,n){_addWheelListener(t,support,e,n),"DOMMouseScroll"==support&&_addWheelListener(t,"MozMousePixelScroll",e,n)};
  //# sourceMappingURL=mousewheel-polyfill.js.map
  global.define = __define;
  return module.exports;
});

System.register("npm:game-shell@0.1.4/lib/hrtime-polyfill", [], true, function(require, exports, __moduleName) {
  var global = System.global;
  var __define = global.define;
  global.define = undefined;
  var module = { exports: exports };
  var process = System.get("@@nodeProcess")["default"];
    var __filename = "jspm_packages/npm/game-shell@0.1.4/lib/hrtime-polyfill.js";
    var __dirname = "jspm_packages/npm/game-shell@0.1.4/lib";
  "format cjs";module.exports=window.performance.now?function(){return window.performance.now()}:window.performance.webktiNow?function(){return window.performance.webkitNow()}:Date.now?Date.now:function(){return(new Date).getTime()};
  //# sourceMappingURL=hrtime-polyfill.js.map
  global.define = __define;
  return module.exports;
});

System.register("npm:webglew@0.0.0/webglew", [], true, function(require, exports, __moduleName) {
  var global = System.global;
  var __define = global.define;
  global.define = undefined;
  var module = { exports: exports };
  var process = System.get("@@nodeProcess")["default"];
    var __filename = "jspm_packages/npm/webglew@0.0.0/webglew.js";
    var __dirname = "jspm_packages/npm/webglew@0.0.0";
  "format cjs";"use strict";function baseName(t){for(var e=0;e<VENDOR_PREFIX.length;++e){var n=VENDOR_PREFIX[e];if(0===t.indexOf(n))return t.slice(n.length)}return t}function initWebGLEW(t){if(t._webglew_struct)return t._webglew_struct;for(var e={},n=t.getSupportedExtensions(),o=0;o<n.length;++o){var i=t.getExtension(n[o]);i&&(e[n[o]]=i,e[baseName(n[o])]=i)}return t._webglew_struct=e,e}var VENDOR_PREFIX=["WEBKIT_","MOZ_"];module.exports=initWebGLEW;
  //# sourceMappingURL=webglew.js.map
  global.define = __define;
  return module.exports;
});

System.register("npm:iota-array@1.0.0/iota", [], true, function(require, exports, __moduleName) {
  var global = System.global;
  var __define = global.define;
  global.define = undefined;
  var module = { exports: exports };
  var process = System.get("@@nodeProcess")["default"];
    var __filename = "jspm_packages/npm/iota-array@1.0.0/iota.js";
    var __dirname = "jspm_packages/npm/iota-array@1.0.0";
  "format cjs";"use strict";function iota(t){for(var e=new Array(t),n=0;t>n;++n)e[n]=n;return e}module.exports=iota;
  //# sourceMappingURL=iota.js.map
  global.define = __define;
  return module.exports;
});

System.register("npm:esprima@1.2.2/esprima", [], true, function(require, exports, __moduleName) {
  var global = System.global;
  var __define = global.define;
  global.define = undefined;
  var module = { exports: exports };
  var process = System.get("@@nodeProcess")["default"];
    var __filename = "jspm_packages/npm/esprima@1.2.2/esprima.js";
    var __dirname = "jspm_packages/npm/esprima@1.2.2";
  "format cjs";!function(e,t){"use strict";"function"==typeof define&&define.amd?define(["exports"],t):t("undefined"!=typeof exports?exports:e.esprima={})}(this,function(e){"use strict";function t(e,t){if(!e)throw new Error("ASSERT: "+t)}function r(e){return e>=48&&57>=e}function n(e){return"0123456789abcdefABCDEF".indexOf(e)>=0}function i(e){return"01234567".indexOf(e)>=0}function o(e){return 32===e||9===e||11===e||12===e||160===e||e>=5760&&[5760,6158,8192,8193,8194,8195,8196,8197,8198,8199,8200,8201,8202,8239,8287,12288,65279].indexOf(e)>=0}function a(e){return 10===e||13===e||8232===e||8233===e}function s(e){return 36===e||95===e||e>=65&&90>=e||e>=97&&122>=e||92===e||e>=128&&ir.NonAsciiIdentifierStart.test(String.fromCharCode(e))}function u(e){return 36===e||95===e||e>=65&&90>=e||e>=97&&122>=e||e>=48&&57>=e||92===e||e>=128&&ir.NonAsciiIdentifierPart.test(String.fromCharCode(e))}function c(e){switch(e){case"class":case"enum":case"export":case"extends":case"import":case"super":return!0;default:return!1}}function l(e){switch(e){case"implements":case"interface":case"package":case"private":case"protected":case"public":case"static":case"yield":case"let":return!0;default:return!1}}function f(e){return"eval"===e||"arguments"===e}function h(e){if(sr&&l(e))return!0;switch(e.length){case 2:return"if"===e||"in"===e||"do"===e;case 3:return"var"===e||"for"===e||"new"===e||"try"===e||"let"===e;case 4:return"this"===e||"else"===e||"case"===e||"void"===e||"with"===e||"enum"===e;case 5:return"while"===e||"break"===e||"catch"===e||"throw"===e||"const"===e||"yield"===e||"class"===e||"super"===e;case 6:return"return"===e||"typeof"===e||"delete"===e||"switch"===e||"export"===e||"import"===e;case 7:return"default"===e||"finally"===e||"extends"===e;case 8:return"function"===e||"continue"===e||"debugger"===e;case 10:return"instanceof"===e;default:return!1}}function p(e,r,n,i,o){var a;t("number"==typeof n,"Comment must have valid position"),dr.lastCommentStart>=n||(dr.lastCommentStart=n,a={type:e,value:r},mr.range&&(a.range=[n,i]),mr.loc&&(a.loc=o),mr.comments.push(a),mr.attachComment&&(mr.leadingComments.push(a),mr.trailingComments.push(a)))}function d(e){var t,r,n,i;for(t=ur-e,r={start:{line:cr,column:ur-lr-e}};fr>ur;)if(n=ar.charCodeAt(ur),++ur,a(n))return mr.comments&&(i=ar.slice(t+e,ur-1),r.end={line:cr,column:ur-lr-1},p("Line",i,t,ur-1,r)),13===n&&10===ar.charCodeAt(ur)&&++ur,++cr,void(lr=ur);mr.comments&&(i=ar.slice(t+e,ur),r.end={line:cr,column:ur-lr},p("Line",i,t,ur,r))}function m(){var e,t,r,n;for(mr.comments&&(e=ur-2,t={start:{line:cr,column:ur-lr-2}});fr>ur;)if(r=ar.charCodeAt(ur),a(r))13===r&&10===ar.charCodeAt(ur+1)&&++ur,++cr,++ur,lr=ur,ur>=fr&&D({},nr.UnexpectedToken,"ILLEGAL");else if(42===r){if(47===ar.charCodeAt(ur+1))return++ur,++ur,void(mr.comments&&(n=ar.slice(e+2,ur-2),t.end={line:cr,column:ur-lr},p("Block",n,e,ur,t)));++ur}else++ur;D({},nr.UnexpectedToken,"ILLEGAL")}function g(){var e,t;for(t=0===ur;fr>ur;)if(e=ar.charCodeAt(ur),o(e))++ur;else if(a(e))++ur,13===e&&10===ar.charCodeAt(ur)&&++ur,++cr,lr=ur,t=!0;else if(47===e)if(e=ar.charCodeAt(ur+1),47===e)++ur,++ur,d(2),t=!0;else{if(42!==e)break;++ur,++ur,m()}else if(t&&45===e){if(45!==ar.charCodeAt(ur+1)||62!==ar.charCodeAt(ur+2))break;ur+=3,d(3)}else{if(60!==e)break;if("!--"!==ar.slice(ur+1,ur+4))break;++ur,++ur,++ur,++ur,d(4)}}function v(e){var t,r,i,o=0;for(r="u"===e?4:2,t=0;r>t;++t){if(!(fr>ur&&n(ar[ur])))return"";i=ar[ur++],o=16*o+"0123456789abcdef".indexOf(i.toLowerCase())}return String.fromCharCode(o)}function b(){var e,t;for(e=ar.charCodeAt(ur++),t=String.fromCharCode(e),92===e&&(117!==ar.charCodeAt(ur)&&D({},nr.UnexpectedToken,"ILLEGAL"),++ur,e=v("u"),e&&"\\"!==e&&s(e.charCodeAt(0))||D({},nr.UnexpectedToken,"ILLEGAL"),t=e);fr>ur&&(e=ar.charCodeAt(ur),u(e));)++ur,t+=String.fromCharCode(e),92===e&&(t=t.substr(0,t.length-1),117!==ar.charCodeAt(ur)&&D({},nr.UnexpectedToken,"ILLEGAL"),++ur,e=v("u"),e&&"\\"!==e&&u(e.charCodeAt(0))||D({},nr.UnexpectedToken,"ILLEGAL"),t+=e);return t}function y(){var e,t;for(e=ur++;fr>ur;){if(t=ar.charCodeAt(ur),92===t)return ur=e,b();if(!u(t))break;++ur}return ar.slice(e,ur)}function w(){var e,t,r;return e=ur,t=92===ar.charCodeAt(ur)?b():y(),r=1===t.length?$t.Identifier:h(t)?$t.Keyword:"null"===t?$t.NullLiteral:"true"===t||"false"===t?$t.BooleanLiteral:$t.Identifier,{type:r,value:t,lineNumber:cr,lineStart:lr,start:e,end:ur}}function E(){var e,t,r,n,i=ur,o=ar.charCodeAt(ur),a=ar[ur];switch(o){case 46:case 40:case 41:case 59:case 44:case 123:case 125:case 91:case 93:case 58:case 63:case 126:return++ur,mr.tokenize&&(40===o?mr.openParenToken=mr.tokens.length:123===o&&(mr.openCurlyToken=mr.tokens.length)),{type:$t.Punctuator,value:String.fromCharCode(o),lineNumber:cr,lineStart:lr,start:i,end:ur};default:if(e=ar.charCodeAt(ur+1),61===e)switch(o){case 43:case 45:case 47:case 60:case 62:case 94:case 124:case 37:case 38:case 42:return ur+=2,{type:$t.Punctuator,value:String.fromCharCode(o)+String.fromCharCode(e),lineNumber:cr,lineStart:lr,start:i,end:ur};case 33:case 61:return ur+=2,61===ar.charCodeAt(ur)&&++ur,{type:$t.Punctuator,value:ar.slice(i,ur),lineNumber:cr,lineStart:lr,start:i,end:ur}}}return n=ar.substr(ur,4),">>>="===n?(ur+=4,{type:$t.Punctuator,value:n,lineNumber:cr,lineStart:lr,start:i,end:ur}):(r=n.substr(0,3),">>>"===r||"<<="===r||">>="===r?(ur+=3,{type:$t.Punctuator,value:r,lineNumber:cr,lineStart:lr,start:i,end:ur}):(t=r.substr(0,2),a===t[1]&&"+-<>&|".indexOf(a)>=0||"=>"===t?(ur+=2,{type:$t.Punctuator,value:t,lineNumber:cr,lineStart:lr,start:i,end:ur}):"<>=!+-*%&|^/".indexOf(a)>=0?(++ur,{type:$t.Punctuator,value:a,lineNumber:cr,lineStart:lr,start:i,end:ur}):void D({},nr.UnexpectedToken,"ILLEGAL")))}function x(e){for(var t="";fr>ur&&n(ar[ur]);)t+=ar[ur++];return 0===t.length&&D({},nr.UnexpectedToken,"ILLEGAL"),s(ar.charCodeAt(ur))&&D({},nr.UnexpectedToken,"ILLEGAL"),{type:$t.NumericLiteral,value:parseInt("0x"+t,16),lineNumber:cr,lineStart:lr,start:e,end:ur}}function _(e){for(var t="0"+ar[ur++];fr>ur&&i(ar[ur]);)t+=ar[ur++];return(s(ar.charCodeAt(ur))||r(ar.charCodeAt(ur)))&&D({},nr.UnexpectedToken,"ILLEGAL"),{type:$t.NumericLiteral,value:parseInt(t,8),octal:!0,lineNumber:cr,lineStart:lr,start:e,end:ur}}function S(){var e,n,o;if(o=ar[ur],t(r(o.charCodeAt(0))||"."===o,"Numeric literal must start with a decimal digit or a decimal point"),n=ur,e="","."!==o){if(e=ar[ur++],o=ar[ur],"0"===e){if("x"===o||"X"===o)return++ur,x(n);if(i(o))return _(n);o&&r(o.charCodeAt(0))&&D({},nr.UnexpectedToken,"ILLEGAL")}for(;r(ar.charCodeAt(ur));)e+=ar[ur++];o=ar[ur]}if("."===o){for(e+=ar[ur++];r(ar.charCodeAt(ur));)e+=ar[ur++];o=ar[ur]}if("e"===o||"E"===o)if(e+=ar[ur++],o=ar[ur],("+"===o||"-"===o)&&(e+=ar[ur++]),r(ar.charCodeAt(ur)))for(;r(ar.charCodeAt(ur));)e+=ar[ur++];else D({},nr.UnexpectedToken,"ILLEGAL");return s(ar.charCodeAt(ur))&&D({},nr.UnexpectedToken,"ILLEGAL"),{type:$t.NumericLiteral,value:parseFloat(e),lineNumber:cr,lineStart:lr,start:n,end:ur}}function A(){var e,r,n,o,s,u,c,l,f="",h=!1;for(c=cr,l=lr,e=ar[ur],t("'"===e||'"'===e,"String literal must starts with a quote"),r=ur,++ur;fr>ur;){if(n=ar[ur++],n===e){e="";break}if("\\"===n)if(n=ar[ur++],n&&a(n.charCodeAt(0)))++cr,"\r"===n&&"\n"===ar[ur]&&++ur,lr=ur;else switch(n){case"u":case"x":u=ur,s=v(n),s?f+=s:(ur=u,f+=n);break;case"n":f+="\n";break;case"r":f+="\r";break;case"t":f+="	";break;case"b":f+="\b";break;case"f":f+="\f";break;case"v":f+="";break;default:i(n)?(o="01234567".indexOf(n),0!==o&&(h=!0),fr>ur&&i(ar[ur])&&(h=!0,o=8*o+"01234567".indexOf(ar[ur++]),"0123".indexOf(n)>=0&&fr>ur&&i(ar[ur])&&(o=8*o+"01234567".indexOf(ar[ur++]))),f+=String.fromCharCode(o)):f+=n}else{if(a(n.charCodeAt(0)))break;f+=n}}return""!==e&&D({},nr.UnexpectedToken,"ILLEGAL"),{type:$t.StringLiteral,value:f,octal:h,startLineNumber:c,startLineStart:l,lineNumber:cr,lineStart:lr,start:r,end:ur}}function B(e,t){var r;try{r=new RegExp(e,t)}catch(n){D({},nr.InvalidRegExp)}return r}function q(){var e,r,n,i,o;for(e=ar[ur],t("/"===e,"Regular expression literal must start with a slash"),r=ar[ur++],n=!1,i=!1;fr>ur;)if(e=ar[ur++],r+=e,"\\"===e)e=ar[ur++],a(e.charCodeAt(0))&&D({},nr.UnterminatedRegExp),r+=e;else if(a(e.charCodeAt(0)))D({},nr.UnterminatedRegExp);else if(n)"]"===e&&(n=!1);else{if("/"===e){i=!0;break}"["===e&&(n=!0)}return i||D({},nr.UnterminatedRegExp),o=r.substr(1,r.length-2),{value:o,literal:r}}function I(){var e,t,r,n;for(t="",r="";fr>ur&&(e=ar[ur],u(e.charCodeAt(0)));)if(++ur,"\\"===e&&fr>ur)if(e=ar[ur],"u"===e){if(++ur,n=ur,e=v("u"))for(r+=e,t+="\\u";ur>n;++n)t+=ar[n];else ur=n,r+="u",t+="\\u";F({},nr.UnexpectedToken,"ILLEGAL")}else t+="\\",F({},nr.UnexpectedToken,"ILLEGAL");else r+=e,t+=e;return{value:r,literal:t}}function T(){var e,t,r,n;return pr=null,g(),e=ur,t=q(),r=I(),n=B(t.value,r.value),mr.tokenize?{type:$t.RegularExpression,value:n,lineNumber:cr,lineStart:lr,start:e,end:ur}:{literal:t.literal+r.literal,value:n,start:e,end:ur}}function k(){var e,t,r,n;return g(),e=ur,t={start:{line:cr,column:ur-lr}},r=T(),t.end={line:cr,column:ur-lr},mr.tokenize||(mr.tokens.length>0&&(n=mr.tokens[mr.tokens.length-1],n.range[0]===e&&"Punctuator"===n.type&&("/"===n.value||"/="===n.value)&&mr.tokens.pop()),mr.tokens.push({type:"RegularExpression",value:r.literal,range:[e,ur],loc:t})),r}function O(e){return e.type===$t.Identifier||e.type===$t.Keyword||e.type===$t.BooleanLiteral||e.type===$t.NullLiteral}function L(){var e,t;if(e=mr.tokens[mr.tokens.length-1],!e)return k();if("Punctuator"===e.type){if("]"===e.value)return E();if(")"===e.value)return t=mr.tokens[mr.openParenToken-1],!t||"Keyword"!==t.type||"if"!==t.value&&"while"!==t.value&&"for"!==t.value&&"with"!==t.value?E():k();if("}"===e.value){if(mr.tokens[mr.openCurlyToken-3]&&"Keyword"===mr.tokens[mr.openCurlyToken-3].type){if(t=mr.tokens[mr.openCurlyToken-4],!t)return E()}else{if(!mr.tokens[mr.openCurlyToken-4]||"Keyword"!==mr.tokens[mr.openCurlyToken-4].type)return E();if(t=mr.tokens[mr.openCurlyToken-5],!t)return k()}return er.indexOf(t.value)>=0?E():k()}return k()}return"Keyword"===e.type?k():E()}function C(){var e;return g(),ur>=fr?{type:$t.EOF,lineNumber:cr,lineStart:lr,start:ur,end:ur}:(e=ar.charCodeAt(ur),s(e)?w():40===e||41===e||59===e?E():39===e||34===e?A():46===e?r(ar.charCodeAt(ur+1))?S():E():r(e)?S():mr.tokenize&&47===e?L():E())}function j(){var e,t,r;return g(),e={start:{line:cr,column:ur-lr}},t=C(),e.end={line:cr,column:ur-lr},t.type!==$t.EOF&&(r=ar.slice(t.start,t.end),mr.tokens.push({type:Qt[t.type],value:r,range:[t.start,t.end],loc:e})),t}function R(){var e;return e=pr,ur=e.end,cr=e.lineNumber,lr=e.lineStart,pr="undefined"!=typeof mr.tokens?j():C(),ur=e.end,cr=e.lineNumber,lr=e.lineStart,e}function M(){var e,t,r;e=ur,t=cr,r=lr,pr="undefined"!=typeof mr.tokens?j():C(),ur=e,cr=t,lr=r}function N(e,t){this.line=e,this.column=t}function U(e,t,r,n){this.start=new N(e,t),this.end=new N(r,n)}function P(){var e,t,r,n;return e=ur,t=cr,r=lr,g(),n=cr!==t,ur=e,cr=t,lr=r,n}function D(e,r){var n,i=Array.prototype.slice.call(arguments,2),o=r.replace(/%(\d)/g,function(e,r){return t(r<i.length,"Message reference must be in range"),i[r]});throw"number"==typeof e.lineNumber?(n=new Error("Line "+e.lineNumber+": "+o),n.index=e.start,n.lineNumber=e.lineNumber,n.column=e.start-lr+1):(n=new Error("Line "+cr+": "+o),n.index=ur,n.lineNumber=cr,n.column=ur-lr+1),n.description=o,n}function F(){try{D.apply(null,arguments)}catch(e){if(!mr.errors)throw e;mr.errors.push(e)}}function z(e){if(e.type===$t.EOF&&D(e,nr.UnexpectedEOS),e.type===$t.NumericLiteral&&D(e,nr.UnexpectedNumber),e.type===$t.StringLiteral&&D(e,nr.UnexpectedString),e.type===$t.Identifier&&D(e,nr.UnexpectedIdentifier),e.type===$t.Keyword){if(c(e.value))D(e,nr.UnexpectedReserved);else if(sr&&l(e.value))return void F(e,nr.StrictReservedWord);D(e,nr.UnexpectedToken,e.value)}D(e,nr.UnexpectedToken,e.value)}function W(e){var t=R();(t.type!==$t.Punctuator||t.value!==e)&&z(t)}function V(e){var t=R();(t.type!==$t.Keyword||t.value!==e)&&z(t)}function G(e){return pr.type===$t.Punctuator&&pr.value===e}function H(e){return pr.type===$t.Keyword&&pr.value===e}function X(){var e;return pr.type!==$t.Punctuator?!1:(e=pr.value,"="===e||"*="===e||"/="===e||"%="===e||"+="===e||"-="===e||"<<="===e||">>="===e||">>>="===e||"&="===e||"^="===e||"|="===e)}function Y(){var e;return 59===ar.charCodeAt(ur)||G(";")?void R():(e=cr,g(),void(cr===e&&(pr.type===$t.EOF||G("}")||z(pr))))}function K(e){return e.type===tr.Identifier||e.type===tr.MemberExpression}function J(){var e,t=[];for(e=pr,W("[");!G("]");)G(",")?(R(),t.push(null)):(t.push(mt()),G("]")||W(","));return R(),hr.markEnd(hr.createArrayExpression(t),e)}function Z(e,t){var r,n,i;return r=sr,i=pr,n=zt(),t&&sr&&f(e[0].name)&&F(t,nr.StrictParamName),sr=r,hr.markEnd(hr.createFunctionExpression(null,e,[],n),i)}function $(){var e,t;return t=pr,e=R(),e.type===$t.StringLiteral||e.type===$t.NumericLiteral?(sr&&e.octal&&F(e,nr.StrictOctalLiteral),hr.markEnd(hr.createLiteral(e),t)):hr.markEnd(hr.createIdentifier(e.value),t)}function Q(){var e,t,r,n,i,o;return e=pr,o=pr,e.type===$t.Identifier?(r=$(),"get"!==e.value||G(":")?"set"!==e.value||G(":")?(W(":"),n=mt(),hr.markEnd(hr.createProperty("init",r,n),o)):(t=$(),W("("),e=pr,e.type!==$t.Identifier?(W(")"),F(e,nr.UnexpectedToken,e.value),n=Z([])):(i=[yt()],W(")"),n=Z(i,e)),hr.markEnd(hr.createProperty("set",t,n),o)):(t=$(),W("("),W(")"),n=Z([]),hr.markEnd(hr.createProperty("get",t,n),o))):e.type!==$t.EOF&&e.type!==$t.Punctuator?(t=$(),W(":"),n=mt(),hr.markEnd(hr.createProperty("init",t,n),o)):void z(e)}function et(){var e,t,r,n,i,o=[],a={},s=String;for(i=pr,W("{");!G("}");)e=Q(),t=e.key.type===tr.Identifier?e.key.name:s(e.key.value),n="init"===e.kind?rr.Data:"get"===e.kind?rr.Get:rr.Set,r="$"+t,Object.prototype.hasOwnProperty.call(a,r)?(a[r]===rr.Data?sr&&n===rr.Data?F({},nr.StrictDuplicateProperty):n!==rr.Data&&F({},nr.AccessorDataProperty):n===rr.Data?F({},nr.AccessorDataProperty):a[r]&n&&F({},nr.AccessorGetSet),a[r]|=n):a[r]=n,o.push(e),G("}")||W(",");return W("}"),hr.markEnd(hr.createObjectExpression(o),i)}function tt(){var e;return W("("),e=gt(),W(")"),e}function rt(){var e,t,r,n;if(G("("))return tt();if(G("["))return J();if(G("{"))return et();if(e=pr.type,n=pr,e===$t.Identifier)r=hr.createIdentifier(R().value);else if(e===$t.StringLiteral||e===$t.NumericLiteral)sr&&pr.octal&&F(pr,nr.StrictOctalLiteral),r=hr.createLiteral(R());else if(e===$t.Keyword){if(H("function"))return Gt();H("this")?(R(),r=hr.createThisExpression()):z(R())}else e===$t.BooleanLiteral?(t=R(),t.value="true"===t.value,r=hr.createLiteral(t)):e===$t.NullLiteral?(t=R(),t.value=null,r=hr.createLiteral(t)):G("/")||G("/=")?(r=hr.createLiteral("undefined"!=typeof mr.tokens?k():T()),M()):z(R());return hr.markEnd(r,n)}function nt(){var e=[];if(W("("),!G(")"))for(;fr>ur&&(e.push(mt()),!G(")"));)W(",");return W(")"),e}function it(){var e,t;return t=pr,e=R(),O(e)||z(e),hr.markEnd(hr.createIdentifier(e.value),t)}function ot(){return W("."),it()}function at(){var e;return W("["),e=gt(),W("]"),e}function st(){var e,t,r;return r=pr,V("new"),e=ct(),t=G("(")?nt():[],hr.markEnd(hr.createNewExpression(e,t),r)}function ut(){var e,t,r,n,i;for(i=pr,e=dr.allowIn,dr.allowIn=!0,t=H("new")?st():rt(),dr.allowIn=e;;){if(G("."))n=ot(),t=hr.createMemberExpression(".",t,n);else if(G("("))r=nt(),t=hr.createCallExpression(t,r);else{if(!G("["))break;n=at(),t=hr.createMemberExpression("[",t,n)}hr.markEnd(t,i)}return t}function ct(){var e,t,r,n;for(n=pr,e=dr.allowIn,t=H("new")?st():rt(),dr.allowIn=e;G(".")||G("[");)G("[")?(r=at(),t=hr.createMemberExpression("[",t,r)):(r=ot(),t=hr.createMemberExpression(".",t,r)),hr.markEnd(t,n);return t}function lt(){var e,t,r=pr;return e=ut(),pr.type===$t.Punctuator&&(!G("++")&&!G("--")||P()||(sr&&e.type===tr.Identifier&&f(e.name)&&F({},nr.StrictLHSPostfix),K(e)||F({},nr.InvalidLHSInAssignment),t=R(),e=hr.markEnd(hr.createPostfixExpression(t.value,e),r))),e}function ft(){var e,t,r;return pr.type!==$t.Punctuator&&pr.type!==$t.Keyword?t=lt():G("++")||G("--")?(r=pr,e=R(),t=ft(),sr&&t.type===tr.Identifier&&f(t.name)&&F({},nr.StrictLHSPrefix),K(t)||F({},nr.InvalidLHSInAssignment),t=hr.createUnaryExpression(e.value,t),t=hr.markEnd(t,r)):G("+")||G("-")||G("~")||G("!")?(r=pr,e=R(),t=ft(),t=hr.createUnaryExpression(e.value,t),t=hr.markEnd(t,r)):H("delete")||H("void")||H("typeof")?(r=pr,e=R(),t=ft(),t=hr.createUnaryExpression(e.value,t),t=hr.markEnd(t,r),sr&&"delete"===t.operator&&t.argument.type===tr.Identifier&&F({},nr.StrictDelete)):t=lt(),t}function ht(e,t){var r=0;if(e.type!==$t.Punctuator&&e.type!==$t.Keyword)return 0;switch(e.value){case"||":r=1;break;case"&&":r=2;break;case"|":r=3;break;case"^":r=4;break;case"&":r=5;break;case"==":case"!=":case"===":case"!==":r=6;break;case"<":case">":case"<=":case">=":case"instanceof":r=7;break;case"in":r=t?7:0;break;case"<<":case">>":case">>>":r=8;break;case"+":case"-":r=9;break;case"*":case"/":case"%":r=11}return r}function pt(){var e,t,r,n,i,o,a,s,u,c;if(e=pr,u=ft(),n=pr,i=ht(n,dr.allowIn),0===i)return u;for(n.prec=i,R(),t=[e,pr],a=ft(),o=[u,n,a];(i=ht(pr,dr.allowIn))>0;){for(;o.length>2&&i<=o[o.length-2].prec;)a=o.pop(),s=o.pop().value,u=o.pop(),r=hr.createBinaryExpression(s,u,a),t.pop(),e=t[t.length-1],hr.markEnd(r,e),o.push(r);n=R(),n.prec=i,o.push(n),t.push(pr),r=ft(),o.push(r)}for(c=o.length-1,r=o[c],t.pop();c>1;)r=hr.createBinaryExpression(o[c-1].value,o[c-2],r),c-=2,e=t.pop(),hr.markEnd(r,e);return r}function dt(){var e,t,r,n,i;return i=pr,e=pt(),G("?")&&(R(),t=dr.allowIn,dr.allowIn=!0,r=mt(),dr.allowIn=t,W(":"),n=mt(),e=hr.createConditionalExpression(e,r,n),hr.markEnd(e,i)),e}function mt(){var e,t,r,n,i;return e=pr,i=pr,n=t=dt(),X()&&(K(t)||F({},nr.InvalidLHSInAssignment),sr&&t.type===tr.Identifier&&f(t.name)&&F(e,nr.StrictLHSAssignment),e=R(),r=mt(),n=hr.markEnd(hr.createAssignmentExpression(e.value,t,r),i)),n}function gt(){var e,t=pr;if(e=mt(),G(",")){for(e=hr.createSequenceExpression([e]);fr>ur&&G(",");)R(),e.expressions.push(mt());hr.markEnd(e,t)}return e}function vt(){for(var e,t=[];fr>ur&&!G("}")&&(e=Ht(),"undefined"!=typeof e);)t.push(e);return t}function bt(){var e,t;return t=pr,W("{"),e=vt(),W("}"),hr.markEnd(hr.createBlockStatement(e),t)}function yt(){var e,t;return t=pr,e=R(),e.type!==$t.Identifier&&z(e),hr.markEnd(hr.createIdentifier(e.value),t)}function wt(e){var t,r,n=null;return r=pr,t=yt(),sr&&f(t.name)&&F({},nr.StrictVarName),"const"===e?(W("="),n=mt()):G("=")&&(R(),n=mt()),hr.markEnd(hr.createVariableDeclarator(t,n),r)}function Et(e){var t=[];do{if(t.push(wt(e)),!G(","))break;R()}while(fr>ur);return t}function xt(){var e;return V("var"),e=Et(),Y(),hr.createVariableDeclaration(e,"var")}function _t(e){var t,r;return r=pr,V(e),t=Et(e),Y(),hr.markEnd(hr.createVariableDeclaration(t,e),r)}function St(){return W(";"),hr.createEmptyStatement()}function At(){var e=gt();return Y(),hr.createExpressionStatement(e)}function Bt(){var e,t,r;return V("if"),W("("),e=gt(),W(")"),t=Ft(),H("else")?(R(),r=Ft()):r=null,hr.createIfStatement(e,t,r)}function qt(){var e,t,r;return V("do"),r=dr.inIteration,dr.inIteration=!0,e=Ft(),dr.inIteration=r,V("while"),W("("),t=gt(),W(")"),G(";")&&R(),hr.createDoWhileStatement(e,t)}function It(){var e,t,r;return V("while"),W("("),e=gt(),W(")"),r=dr.inIteration,dr.inIteration=!0,t=Ft(),dr.inIteration=r,hr.createWhileStatement(e,t)}function Tt(){var e,t,r;return r=pr,e=R(),t=Et(),hr.markEnd(hr.createVariableDeclaration(t,e.value),r)}function kt(){var e,t,r,n,i,o,a;return e=t=r=null,V("for"),W("("),G(";")?R():(H("var")||H("let")?(dr.allowIn=!1,e=Tt(),dr.allowIn=!0,1===e.declarations.length&&H("in")&&(R(),n=e,i=gt(),e=null)):(dr.allowIn=!1,e=gt(),dr.allowIn=!0,H("in")&&(K(e)||F({},nr.InvalidLHSInForIn),R(),n=e,i=gt(),e=null)),"undefined"==typeof n&&W(";")),"undefined"==typeof n&&(G(";")||(t=gt()),W(";"),G(")")||(r=gt())),W(")"),a=dr.inIteration,dr.inIteration=!0,o=Ft(),dr.inIteration=a,"undefined"==typeof n?hr.createForStatement(e,t,r,o):hr.createForInStatement(n,i,o)}function Ot(){var e,t=null;return V("continue"),59===ar.charCodeAt(ur)?(R(),dr.inIteration||D({},nr.IllegalContinue),hr.createContinueStatement(null)):P()?(dr.inIteration||D({},nr.IllegalContinue),hr.createContinueStatement(null)):(pr.type===$t.Identifier&&(t=yt(),e="$"+t.name,Object.prototype.hasOwnProperty.call(dr.labelSet,e)||D({},nr.UnknownLabel,t.name)),Y(),null!==t||dr.inIteration||D({},nr.IllegalContinue),hr.createContinueStatement(t))}function Lt(){var e,t=null;return V("break"),59===ar.charCodeAt(ur)?(R(),dr.inIteration||dr.inSwitch||D({},nr.IllegalBreak),hr.createBreakStatement(null)):P()?(dr.inIteration||dr.inSwitch||D({},nr.IllegalBreak),hr.createBreakStatement(null)):(pr.type===$t.Identifier&&(t=yt(),e="$"+t.name,Object.prototype.hasOwnProperty.call(dr.labelSet,e)||D({},nr.UnknownLabel,t.name)),Y(),null!==t||dr.inIteration||dr.inSwitch||D({},nr.IllegalBreak),hr.createBreakStatement(t))}function Ct(){var e=null;return V("return"),dr.inFunctionBody||F({},nr.IllegalReturn),32===ar.charCodeAt(ur)&&s(ar.charCodeAt(ur+1))?(e=gt(),Y(),hr.createReturnStatement(e)):P()?hr.createReturnStatement(null):(G(";")||G("}")||pr.type===$t.EOF||(e=gt()),Y(),hr.createReturnStatement(e))}function jt(){var e,t;return sr&&(g(),F({},nr.StrictModeWith)),V("with"),W("("),e=gt(),W(")"),t=Ft(),hr.createWithStatement(e,t)}function Rt(){var e,t,r,n=[];for(r=pr,H("default")?(R(),e=null):(V("case"),e=gt()),W(":");fr>ur&&!(G("}")||H("default")||H("case"));)t=Ft(),n.push(t);return hr.markEnd(hr.createSwitchCase(e,n),r)}function Mt(){var e,t,r,n,i;if(V("switch"),W("("),e=gt(),W(")"),W("{"),t=[],G("}"))return R(),hr.createSwitchStatement(e,t);for(n=dr.inSwitch,dr.inSwitch=!0,i=!1;fr>ur&&!G("}");)r=Rt(),null===r.test&&(i&&D({},nr.MultipleDefaultsInSwitch),i=!0),t.push(r);return dr.inSwitch=n,W("}"),hr.createSwitchStatement(e,t)}function Nt(){var e;return V("throw"),P()&&D({},nr.NewlineAfterThrow),e=gt(),Y(),hr.createThrowStatement(e)}function Ut(){var e,t,r;return r=pr,V("catch"),W("("),G(")")&&z(pr),e=yt(),sr&&f(e.name)&&F({},nr.StrictCatchVariable),W(")"),t=bt(),hr.markEnd(hr.createCatchClause(e,t),r)}function Pt(){var e,t=[],r=null;return V("try"),e=bt(),H("catch")&&t.push(Ut()),H("finally")&&(R(),r=bt()),0!==t.length||r||D({},nr.NoCatchOrFinally),hr.createTryStatement(e,[],t,r)}function Dt(){return V("debugger"),Y(),hr.createDebuggerStatement()}function Ft(){var e,t,r,n,i=pr.type;if(i===$t.EOF&&z(pr),i===$t.Punctuator&&"{"===pr.value)return bt();if(n=pr,i===$t.Punctuator)switch(pr.value){case";":return hr.markEnd(St(),n);case"(":return hr.markEnd(At(),n)}if(i===$t.Keyword)switch(pr.value){case"break":return hr.markEnd(Lt(),n);case"continue":return hr.markEnd(Ot(),n);case"debugger":return hr.markEnd(Dt(),n);case"do":return hr.markEnd(qt(),n);case"for":return hr.markEnd(kt(),n);case"function":return hr.markEnd(Vt(),n);case"if":return hr.markEnd(Bt(),n);case"return":return hr.markEnd(Ct(),n);case"switch":return hr.markEnd(Mt(),n);case"throw":return hr.markEnd(Nt(),n);case"try":return hr.markEnd(Pt(),n);case"var":return hr.markEnd(xt(),n);case"while":return hr.markEnd(It(),n);case"with":return hr.markEnd(jt(),n)}return e=gt(),e.type===tr.Identifier&&G(":")?(R(),r="$"+e.name,Object.prototype.hasOwnProperty.call(dr.labelSet,r)&&D({},nr.Redeclaration,"Label",e.name),dr.labelSet[r]=!0,t=Ft(),delete dr.labelSet[r],hr.markEnd(hr.createLabeledStatement(e,t),n)):(Y(),hr.markEnd(hr.createExpressionStatement(e),n))}function zt(){var e,t,r,n,i,o,a,s,u,c=[];for(u=pr,W("{");fr>ur&&pr.type===$t.StringLiteral&&(t=pr,e=Ht(),c.push(e),e.expression.type===tr.Literal);)r=ar.slice(t.start+1,t.end-1),"use strict"===r?(sr=!0,n&&F(n,nr.StrictOctalLiteral)):!n&&t.octal&&(n=t);for(i=dr.labelSet,o=dr.inIteration,a=dr.inSwitch,s=dr.inFunctionBody,dr.labelSet={},dr.inIteration=!1,dr.inSwitch=!1,dr.inFunctionBody=!0;fr>ur&&!G("}")&&(e=Ht(),"undefined"!=typeof e);)c.push(e);return W("}"),dr.labelSet=i,dr.inIteration=o,dr.inSwitch=a,dr.inFunctionBody=s,hr.markEnd(hr.createBlockStatement(c),u)}function Wt(e){var t,r,n,i,o,a,s=[];if(W("("),!G(")"))for(i={};fr>ur&&(r=pr,t=yt(),o="$"+r.value,sr?(f(r.value)&&(n=r,a=nr.StrictParamName),Object.prototype.hasOwnProperty.call(i,o)&&(n=r,a=nr.StrictParamDupe)):e||(f(r.value)?(e=r,a=nr.StrictParamName):l(r.value)?(e=r,a=nr.StrictReservedWord):Object.prototype.hasOwnProperty.call(i,o)&&(e=r,a=nr.StrictParamDupe)),s.push(t),i[o]=!0,!G(")"));)W(",");return W(")"),{params:s,stricted:n,firstRestricted:e,message:a}}function Vt(){var e,t,r,n,i,o,a,s,u,c=[];return u=pr,V("function"),r=pr,e=yt(),sr?f(r.value)&&F(r,nr.StrictFunctionName):f(r.value)?(o=r,a=nr.StrictFunctionName):l(r.value)&&(o=r,a=nr.StrictReservedWord),i=Wt(o),c=i.params,n=i.stricted,o=i.firstRestricted,i.message&&(a=i.message),s=sr,t=zt(),sr&&o&&D(o,a),sr&&n&&F(n,a),sr=s,hr.markEnd(hr.createFunctionDeclaration(e,c,[],t),u)}function Gt(){var e,t,r,n,i,o,a,s,u=null,c=[];return s=pr,V("function"),G("(")||(e=pr,u=yt(),sr?f(e.value)&&F(e,nr.StrictFunctionName):f(e.value)?(r=e,n=nr.StrictFunctionName):l(e.value)&&(r=e,n=nr.StrictReservedWord)),i=Wt(r),c=i.params,t=i.stricted,r=i.firstRestricted,i.message&&(n=i.message),a=sr,o=zt(),sr&&r&&D(r,n),sr&&t&&F(t,n),sr=a,hr.markEnd(hr.createFunctionExpression(u,c,[],o),s)}function Ht(){if(pr.type===$t.Keyword)switch(pr.value){case"const":case"let":return _t(pr.value);case"function":return Vt();default:return Ft()}return pr.type!==$t.EOF?Ft():void 0}function Xt(){for(var e,t,r,n,i=[];fr>ur&&(t=pr,t.type===$t.StringLiteral)&&(e=Ht(),i.push(e),e.expression.type===tr.Literal);)r=ar.slice(t.start+1,t.end-1),"use strict"===r?(sr=!0,n&&F(n,nr.StrictOctalLiteral)):!n&&t.octal&&(n=t);for(;fr>ur&&(e=Ht(),"undefined"!=typeof e);)i.push(e);return i}function Yt(){var e,t;return g(),M(),t=pr,sr=!1,e=Xt(),hr.markEnd(hr.createProgram(e),t)}function Kt(){var e,t,r,n=[];for(e=0;e<mr.tokens.length;++e)t=mr.tokens[e],r={type:t.type,value:t.value},mr.range&&(r.range=t.range),mr.loc&&(r.loc=t.loc),n.push(r);mr.tokens=n}function Jt(e,t){var r,n,i;r=String,"string"==typeof e||e instanceof String||(e=r(e)),hr=or,ar=e,ur=0,cr=ar.length>0?1:0,lr=0,fr=ar.length,pr=null,dr={allowIn:!0,labelSet:{},inFunctionBody:!1,inIteration:!1,inSwitch:!1,lastCommentStart:-1},mr={},t=t||{},t.tokens=!0,mr.tokens=[],mr.tokenize=!0,mr.openParenToken=-1,mr.openCurlyToken=-1,mr.range="boolean"==typeof t.range&&t.range,mr.loc="boolean"==typeof t.loc&&t.loc,"boolean"==typeof t.comment&&t.comment&&(mr.comments=[]),"boolean"==typeof t.tolerant&&t.tolerant&&(mr.errors=[]);try{if(M(),pr.type===$t.EOF)return mr.tokens;for(n=R();pr.type!==$t.EOF;)try{n=R()}catch(o){if(n=pr,mr.errors){mr.errors.push(o);break}throw o}Kt(),i=mr.tokens,"undefined"!=typeof mr.comments&&(i.comments=mr.comments),"undefined"!=typeof mr.errors&&(i.errors=mr.errors)}catch(a){throw a}finally{mr={}}return i}function Zt(e,t){var r,n;n=String,"string"==typeof e||e instanceof String||(e=n(e)),hr=or,ar=e,ur=0,cr=ar.length>0?1:0,lr=0,fr=ar.length,pr=null,dr={allowIn:!0,labelSet:{},inFunctionBody:!1,inIteration:!1,inSwitch:!1,lastCommentStart:-1},mr={},"undefined"!=typeof t&&(mr.range="boolean"==typeof t.range&&t.range,mr.loc="boolean"==typeof t.loc&&t.loc,mr.attachComment="boolean"==typeof t.attachComment&&t.attachComment,mr.loc&&null!==t.source&&void 0!==t.source&&(mr.source=n(t.source)),"boolean"==typeof t.tokens&&t.tokens&&(mr.tokens=[]),"boolean"==typeof t.comment&&t.comment&&(mr.comments=[]),"boolean"==typeof t.tolerant&&t.tolerant&&(mr.errors=[]),mr.attachComment&&(mr.range=!0,mr.comments=[],mr.bottomRightStack=[],mr.trailingComments=[],mr.leadingComments=[]));try{r=Yt(),"undefined"!=typeof mr.comments&&(r.comments=mr.comments),"undefined"!=typeof mr.tokens&&(Kt(),r.tokens=mr.tokens),"undefined"!=typeof mr.errors&&(r.errors=mr.errors)}catch(i){throw i}finally{mr={}}return r}var $t,Qt,er,tr,rr,nr,ir,or,ar,sr,ur,cr,lr,fr,hr,pr,dr,mr;$t={BooleanLiteral:1,EOF:2,Identifier:3,Keyword:4,NullLiteral:5,NumericLiteral:6,Punctuator:7,StringLiteral:8,RegularExpression:9},Qt={},Qt[$t.BooleanLiteral]="Boolean",Qt[$t.EOF]="<end>",Qt[$t.Identifier]="Identifier",Qt[$t.Keyword]="Keyword",Qt[$t.NullLiteral]="Null",Qt[$t.NumericLiteral]="Numeric",Qt[$t.Punctuator]="Punctuator",Qt[$t.StringLiteral]="String",Qt[$t.RegularExpression]="RegularExpression",er=["(","{","[","in","typeof","instanceof","new","return","case","delete","throw","void","=","+=","-=","*=","/=","%=","<<=",">>=",">>>=","&=","|=","^=",",","+","-","*","/","%","++","--","<<",">>",">>>","&","|","^","!","~","&&","||","?",":","===","==",">=","<=","<",">","!=","!=="],tr={AssignmentExpression:"AssignmentExpression",ArrayExpression:"ArrayExpression",BlockStatement:"BlockStatement",BinaryExpression:"BinaryExpression",BreakStatement:"BreakStatement",CallExpression:"CallExpression",CatchClause:"CatchClause",ConditionalExpression:"ConditionalExpression",ContinueStatement:"ContinueStatement",DoWhileStatement:"DoWhileStatement",DebuggerStatement:"DebuggerStatement",EmptyStatement:"EmptyStatement",ExpressionStatement:"ExpressionStatement",ForStatement:"ForStatement",ForInStatement:"ForInStatement",FunctionDeclaration:"FunctionDeclaration",FunctionExpression:"FunctionExpression",Identifier:"Identifier",IfStatement:"IfStatement",Literal:"Literal",LabeledStatement:"LabeledStatement",LogicalExpression:"LogicalExpression",MemberExpression:"MemberExpression",NewExpression:"NewExpression",ObjectExpression:"ObjectExpression",Program:"Program",Property:"Property",ReturnStatement:"ReturnStatement",SequenceExpression:"SequenceExpression",SwitchStatement:"SwitchStatement",SwitchCase:"SwitchCase",ThisExpression:"ThisExpression",ThrowStatement:"ThrowStatement",TryStatement:"TryStatement",UnaryExpression:"UnaryExpression",UpdateExpression:"UpdateExpression",VariableDeclaration:"VariableDeclaration",VariableDeclarator:"VariableDeclarator",WhileStatement:"WhileStatement",WithStatement:"WithStatement"},rr={Data:1,Get:2,Set:4},nr={UnexpectedToken:"Unexpected token %0",UnexpectedNumber:"Unexpected number",UnexpectedString:"Unexpected string",UnexpectedIdentifier:"Unexpected identifier",UnexpectedReserved:"Unexpected reserved word",UnexpectedEOS:"Unexpected end of input",NewlineAfterThrow:"Illegal newline after throw",InvalidRegExp:"Invalid regular expression",UnterminatedRegExp:"Invalid regular expression: missing /",InvalidLHSInAssignment:"Invalid left-hand side in assignment",InvalidLHSInForIn:"Invalid left-hand side in for-in",MultipleDefaultsInSwitch:"More than one default clause in switch statement",NoCatchOrFinally:"Missing catch or finally after try",UnknownLabel:"Undefined label '%0'",Redeclaration:"%0 '%1' has already been declared",IllegalContinue:"Illegal continue statement",IllegalBreak:"Illegal break statement",IllegalReturn:"Illegal return statement",StrictModeWith:"Strict mode code may not include a with statement",StrictCatchVariable:"Catch variable may not be eval or arguments in strict mode",StrictVarName:"Variable name may not be eval or arguments in strict mode",StrictParamName:"Parameter name eval or arguments is not allowed in strict mode",StrictParamDupe:"Strict mode function may not have duplicate parameter names",StrictFunctionName:"Function name may not be eval or arguments in strict mode",StrictOctalLiteral:"Octal literals are not allowed in strict mode.",StrictDelete:"Delete of an unqualified identifier in strict mode.",StrictDuplicateProperty:"Duplicate data property in object literal not allowed in strict mode",AccessorDataProperty:"Object literal may not have data and accessor property with the same name",AccessorGetSet:"Object literal may not have multiple get/set accessors with the same name",StrictLHSAssignment:"Assignment to eval or arguments is not allowed in strict mode",StrictLHSPostfix:"Postfix increment/decrement may not have eval or arguments operand in strict mode",StrictLHSPrefix:"Prefix increment/decrement may not have eval or arguments operand in strict mode",StrictReservedWord:"Use of future reserved word in strict mode"},ir={NonAsciiIdentifierStart:new RegExp("[\xaa\xb5\xba\xc0-\xd6\xd8-\xf6\xf8-\u02c1\u02c6-\u02d1\u02e0-\u02e4\u02ec\u02ee\u0370-\u0374\u0376\u0377\u037a-\u037d\u0386\u0388-\u038a\u038c\u038e-\u03a1\u03a3-\u03f5\u03f7-\u0481\u048a-\u0527\u0531-\u0556\u0559\u0561-\u0587\u05d0-\u05ea\u05f0-\u05f2\u0620-\u064a\u066e\u066f\u0671-\u06d3\u06d5\u06e5\u06e6\u06ee\u06ef\u06fa-\u06fc\u06ff\u0710\u0712-\u072f\u074d-\u07a5\u07b1\u07ca-\u07ea\u07f4\u07f5\u07fa\u0800-\u0815\u081a\u0824\u0828\u0840-\u0858\u08a0\u08a2-\u08ac\u0904-\u0939\u093d\u0950\u0958-\u0961\u0971-\u0977\u0979-\u097f\u0985-\u098c\u098f\u0990\u0993-\u09a8\u09aa-\u09b0\u09b2\u09b6-\u09b9\u09bd\u09ce\u09dc\u09dd\u09df-\u09e1\u09f0\u09f1\u0a05-\u0a0a\u0a0f\u0a10\u0a13-\u0a28\u0a2a-\u0a30\u0a32\u0a33\u0a35\u0a36\u0a38\u0a39\u0a59-\u0a5c\u0a5e\u0a72-\u0a74\u0a85-\u0a8d\u0a8f-\u0a91\u0a93-\u0aa8\u0aaa-\u0ab0\u0ab2\u0ab3\u0ab5-\u0ab9\u0abd\u0ad0\u0ae0\u0ae1\u0b05-\u0b0c\u0b0f\u0b10\u0b13-\u0b28\u0b2a-\u0b30\u0b32\u0b33\u0b35-\u0b39\u0b3d\u0b5c\u0b5d\u0b5f-\u0b61\u0b71\u0b83\u0b85-\u0b8a\u0b8e-\u0b90\u0b92-\u0b95\u0b99\u0b9a\u0b9c\u0b9e\u0b9f\u0ba3\u0ba4\u0ba8-\u0baa\u0bae-\u0bb9\u0bd0\u0c05-\u0c0c\u0c0e-\u0c10\u0c12-\u0c28\u0c2a-\u0c33\u0c35-\u0c39\u0c3d\u0c58\u0c59\u0c60\u0c61\u0c85-\u0c8c\u0c8e-\u0c90\u0c92-\u0ca8\u0caa-\u0cb3\u0cb5-\u0cb9\u0cbd\u0cde\u0ce0\u0ce1\u0cf1\u0cf2\u0d05-\u0d0c\u0d0e-\u0d10\u0d12-\u0d3a\u0d3d\u0d4e\u0d60\u0d61\u0d7a-\u0d7f\u0d85-\u0d96\u0d9a-\u0db1\u0db3-\u0dbb\u0dbd\u0dc0-\u0dc6\u0e01-\u0e30\u0e32\u0e33\u0e40-\u0e46\u0e81\u0e82\u0e84\u0e87\u0e88\u0e8a\u0e8d\u0e94-\u0e97\u0e99-\u0e9f\u0ea1-\u0ea3\u0ea5\u0ea7\u0eaa\u0eab\u0ead-\u0eb0\u0eb2\u0eb3\u0ebd\u0ec0-\u0ec4\u0ec6\u0edc-\u0edf\u0f00\u0f40-\u0f47\u0f49-\u0f6c\u0f88-\u0f8c\u1000-\u102a\u103f\u1050-\u1055\u105a-\u105d\u1061\u1065\u1066\u106e-\u1070\u1075-\u1081\u108e\u10a0-\u10c5\u10c7\u10cd\u10d0-\u10fa\u10fc-\u1248\u124a-\u124d\u1250-\u1256\u1258\u125a-\u125d\u1260-\u1288\u128a-\u128d\u1290-\u12b0\u12b2-\u12b5\u12b8-\u12be\u12c0\u12c2-\u12c5\u12c8-\u12d6\u12d8-\u1310\u1312-\u1315\u1318-\u135a\u1380-\u138f\u13a0-\u13f4\u1401-\u166c\u166f-\u167f\u1681-\u169a\u16a0-\u16ea\u16ee-\u16f0\u1700-\u170c\u170e-\u1711\u1720-\u1731\u1740-\u1751\u1760-\u176c\u176e-\u1770\u1780-\u17b3\u17d7\u17dc\u1820-\u1877\u1880-\u18a8\u18aa\u18b0-\u18f5\u1900-\u191c\u1950-\u196d\u1970-\u1974\u1980-\u19ab\u19c1-\u19c7\u1a00-\u1a16\u1a20-\u1a54\u1aa7\u1b05-\u1b33\u1b45-\u1b4b\u1b83-\u1ba0\u1bae\u1baf\u1bba-\u1be5\u1c00-\u1c23\u1c4d-\u1c4f\u1c5a-\u1c7d\u1ce9-\u1cec\u1cee-\u1cf1\u1cf5\u1cf6\u1d00-\u1dbf\u1e00-\u1f15\u1f18-\u1f1d\u1f20-\u1f45\u1f48-\u1f4d\u1f50-\u1f57\u1f59\u1f5b\u1f5d\u1f5f-\u1f7d\u1f80-\u1fb4\u1fb6-\u1fbc\u1fbe\u1fc2-\u1fc4\u1fc6-\u1fcc\u1fd0-\u1fd3\u1fd6-\u1fdb\u1fe0-\u1fec\u1ff2-\u1ff4\u1ff6-\u1ffc\u2071\u207f\u2090-\u209c\u2102\u2107\u210a-\u2113\u2115\u2119-\u211d\u2124\u2126\u2128\u212a-\u212d\u212f-\u2139\u213c-\u213f\u2145-\u2149\u214e\u2160-\u2188\u2c00-\u2c2e\u2c30-\u2c5e\u2c60-\u2ce4\u2ceb-\u2cee\u2cf2\u2cf3\u2d00-\u2d25\u2d27\u2d2d\u2d30-\u2d67\u2d6f\u2d80-\u2d96\u2da0-\u2da6\u2da8-\u2dae\u2db0-\u2db6\u2db8-\u2dbe\u2dc0-\u2dc6\u2dc8-\u2dce\u2dd0-\u2dd6\u2dd8-\u2dde\u2e2f\u3005-\u3007\u3021-\u3029\u3031-\u3035\u3038-\u303c\u3041-\u3096\u309d-\u309f\u30a1-\u30fa\u30fc-\u30ff\u3105-\u312d\u3131-\u318e\u31a0-\u31ba\u31f0-\u31ff\u3400-\u4db5\u4e00-\u9fcc\ua000-\ua48c\ua4d0-\ua4fd\ua500-\ua60c\ua610-\ua61f\ua62a\ua62b\ua640-\ua66e\ua67f-\ua697\ua6a0-\ua6ef\ua717-\ua71f\ua722-\ua788\ua78b-\ua78e\ua790-\ua793\ua7a0-\ua7aa\ua7f8-\ua801\ua803-\ua805\ua807-\ua80a\ua80c-\ua822\ua840-\ua873\ua882-\ua8b3\ua8f2-\ua8f7\ua8fb\ua90a-\ua925\ua930-\ua946\ua960-\ua97c\ua984-\ua9b2\ua9cf\uaa00-\uaa28\uaa40-\uaa42\uaa44-\uaa4b\uaa60-\uaa76\uaa7a\uaa80-\uaaaf\uaab1\uaab5\uaab6\uaab9-\uaabd\uaac0\uaac2\uaadb-\uaadd\uaae0-\uaaea\uaaf2-\uaaf4\uab01-\uab06\uab09-\uab0e\uab11-\uab16\uab20-\uab26\uab28-\uab2e\uabc0-\uabe2\uac00-\ud7a3\ud7b0-\ud7c6\ud7cb-\ud7fb\uf900-\ufa6d\ufa70-\ufad9\ufb00-\ufb06\ufb13-\ufb17\ufb1d\ufb1f-\ufb28\ufb2a-\ufb36\ufb38-\ufb3c\ufb3e\ufb40\ufb41\ufb43\ufb44\ufb46-\ufbb1\ufbd3-\ufd3d\ufd50-\ufd8f\ufd92-\ufdc7\ufdf0-\ufdfb\ufe70-\ufe74\ufe76-\ufefc\uff21-\uff3a\uff41-\uff5a\uff66-\uffbe\uffc2-\uffc7\uffca-\uffcf\uffd2-\uffd7\uffda-\uffdc]"),NonAsciiIdentifierPart:new RegExp("[\xaa\xb5\xba\xc0-\xd6\xd8-\xf6\xf8-\u02c1\u02c6-\u02d1\u02e0-\u02e4\u02ec\u02ee\u0300-\u0374\u0376\u0377\u037a-\u037d\u0386\u0388-\u038a\u038c\u038e-\u03a1\u03a3-\u03f5\u03f7-\u0481\u0483-\u0487\u048a-\u0527\u0531-\u0556\u0559\u0561-\u0587\u0591-\u05bd\u05bf\u05c1\u05c2\u05c4\u05c5\u05c7\u05d0-\u05ea\u05f0-\u05f2\u0610-\u061a\u0620-\u0669\u066e-\u06d3\u06d5-\u06dc\u06df-\u06e8\u06ea-\u06fc\u06ff\u0710-\u074a\u074d-\u07b1\u07c0-\u07f5\u07fa\u0800-\u082d\u0840-\u085b\u08a0\u08a2-\u08ac\u08e4-\u08fe\u0900-\u0963\u0966-\u096f\u0971-\u0977\u0979-\u097f\u0981-\u0983\u0985-\u098c\u098f\u0990\u0993-\u09a8\u09aa-\u09b0\u09b2\u09b6-\u09b9\u09bc-\u09c4\u09c7\u09c8\u09cb-\u09ce\u09d7\u09dc\u09dd\u09df-\u09e3\u09e6-\u09f1\u0a01-\u0a03\u0a05-\u0a0a\u0a0f\u0a10\u0a13-\u0a28\u0a2a-\u0a30\u0a32\u0a33\u0a35\u0a36\u0a38\u0a39\u0a3c\u0a3e-\u0a42\u0a47\u0a48\u0a4b-\u0a4d\u0a51\u0a59-\u0a5c\u0a5e\u0a66-\u0a75\u0a81-\u0a83\u0a85-\u0a8d\u0a8f-\u0a91\u0a93-\u0aa8\u0aaa-\u0ab0\u0ab2\u0ab3\u0ab5-\u0ab9\u0abc-\u0ac5\u0ac7-\u0ac9\u0acb-\u0acd\u0ad0\u0ae0-\u0ae3\u0ae6-\u0aef\u0b01-\u0b03\u0b05-\u0b0c\u0b0f\u0b10\u0b13-\u0b28\u0b2a-\u0b30\u0b32\u0b33\u0b35-\u0b39\u0b3c-\u0b44\u0b47\u0b48\u0b4b-\u0b4d\u0b56\u0b57\u0b5c\u0b5d\u0b5f-\u0b63\u0b66-\u0b6f\u0b71\u0b82\u0b83\u0b85-\u0b8a\u0b8e-\u0b90\u0b92-\u0b95\u0b99\u0b9a\u0b9c\u0b9e\u0b9f\u0ba3\u0ba4\u0ba8-\u0baa\u0bae-\u0bb9\u0bbe-\u0bc2\u0bc6-\u0bc8\u0bca-\u0bcd\u0bd0\u0bd7\u0be6-\u0bef\u0c01-\u0c03\u0c05-\u0c0c\u0c0e-\u0c10\u0c12-\u0c28\u0c2a-\u0c33\u0c35-\u0c39\u0c3d-\u0c44\u0c46-\u0c48\u0c4a-\u0c4d\u0c55\u0c56\u0c58\u0c59\u0c60-\u0c63\u0c66-\u0c6f\u0c82\u0c83\u0c85-\u0c8c\u0c8e-\u0c90\u0c92-\u0ca8\u0caa-\u0cb3\u0cb5-\u0cb9\u0cbc-\u0cc4\u0cc6-\u0cc8\u0cca-\u0ccd\u0cd5\u0cd6\u0cde\u0ce0-\u0ce3\u0ce6-\u0cef\u0cf1\u0cf2\u0d02\u0d03\u0d05-\u0d0c\u0d0e-\u0d10\u0d12-\u0d3a\u0d3d-\u0d44\u0d46-\u0d48\u0d4a-\u0d4e\u0d57\u0d60-\u0d63\u0d66-\u0d6f\u0d7a-\u0d7f\u0d82\u0d83\u0d85-\u0d96\u0d9a-\u0db1\u0db3-\u0dbb\u0dbd\u0dc0-\u0dc6\u0dca\u0dcf-\u0dd4\u0dd6\u0dd8-\u0ddf\u0df2\u0df3\u0e01-\u0e3a\u0e40-\u0e4e\u0e50-\u0e59\u0e81\u0e82\u0e84\u0e87\u0e88\u0e8a\u0e8d\u0e94-\u0e97\u0e99-\u0e9f\u0ea1-\u0ea3\u0ea5\u0ea7\u0eaa\u0eab\u0ead-\u0eb9\u0ebb-\u0ebd\u0ec0-\u0ec4\u0ec6\u0ec8-\u0ecd\u0ed0-\u0ed9\u0edc-\u0edf\u0f00\u0f18\u0f19\u0f20-\u0f29\u0f35\u0f37\u0f39\u0f3e-\u0f47\u0f49-\u0f6c\u0f71-\u0f84\u0f86-\u0f97\u0f99-\u0fbc\u0fc6\u1000-\u1049\u1050-\u109d\u10a0-\u10c5\u10c7\u10cd\u10d0-\u10fa\u10fc-\u1248\u124a-\u124d\u1250-\u1256\u1258\u125a-\u125d\u1260-\u1288\u128a-\u128d\u1290-\u12b0\u12b2-\u12b5\u12b8-\u12be\u12c0\u12c2-\u12c5\u12c8-\u12d6\u12d8-\u1310\u1312-\u1315\u1318-\u135a\u135d-\u135f\u1380-\u138f\u13a0-\u13f4\u1401-\u166c\u166f-\u167f\u1681-\u169a\u16a0-\u16ea\u16ee-\u16f0\u1700-\u170c\u170e-\u1714\u1720-\u1734\u1740-\u1753\u1760-\u176c\u176e-\u1770\u1772\u1773\u1780-\u17d3\u17d7\u17dc\u17dd\u17e0-\u17e9\u180b-\u180d\u1810-\u1819\u1820-\u1877\u1880-\u18aa\u18b0-\u18f5\u1900-\u191c\u1920-\u192b\u1930-\u193b\u1946-\u196d\u1970-\u1974\u1980-\u19ab\u19b0-\u19c9\u19d0-\u19d9\u1a00-\u1a1b\u1a20-\u1a5e\u1a60-\u1a7c\u1a7f-\u1a89\u1a90-\u1a99\u1aa7\u1b00-\u1b4b\u1b50-\u1b59\u1b6b-\u1b73\u1b80-\u1bf3\u1c00-\u1c37\u1c40-\u1c49\u1c4d-\u1c7d\u1cd0-\u1cd2\u1cd4-\u1cf6\u1d00-\u1de6\u1dfc-\u1f15\u1f18-\u1f1d\u1f20-\u1f45\u1f48-\u1f4d\u1f50-\u1f57\u1f59\u1f5b\u1f5d\u1f5f-\u1f7d\u1f80-\u1fb4\u1fb6-\u1fbc\u1fbe\u1fc2-\u1fc4\u1fc6-\u1fcc\u1fd0-\u1fd3\u1fd6-\u1fdb\u1fe0-\u1fec\u1ff2-\u1ff4\u1ff6-\u1ffc\u200c\u200d\u203f\u2040\u2054\u2071\u207f\u2090-\u209c\u20d0-\u20dc\u20e1\u20e5-\u20f0\u2102\u2107\u210a-\u2113\u2115\u2119-\u211d\u2124\u2126\u2128\u212a-\u212d\u212f-\u2139\u213c-\u213f\u2145-\u2149\u214e\u2160-\u2188\u2c00-\u2c2e\u2c30-\u2c5e\u2c60-\u2ce4\u2ceb-\u2cf3\u2d00-\u2d25\u2d27\u2d2d\u2d30-\u2d67\u2d6f\u2d7f-\u2d96\u2da0-\u2da6\u2da8-\u2dae\u2db0-\u2db6\u2db8-\u2dbe\u2dc0-\u2dc6\u2dc8-\u2dce\u2dd0-\u2dd6\u2dd8-\u2dde\u2de0-\u2dff\u2e2f\u3005-\u3007\u3021-\u302f\u3031-\u3035\u3038-\u303c\u3041-\u3096\u3099\u309a\u309d-\u309f\u30a1-\u30fa\u30fc-\u30ff\u3105-\u312d\u3131-\u318e\u31a0-\u31ba\u31f0-\u31ff\u3400-\u4db5\u4e00-\u9fcc\ua000-\ua48c\ua4d0-\ua4fd\ua500-\ua60c\ua610-\ua62b\ua640-\ua66f\ua674-\ua67d\ua67f-\ua697\ua69f-\ua6f1\ua717-\ua71f\ua722-\ua788\ua78b-\ua78e\ua790-\ua793\ua7a0-\ua7aa\ua7f8-\ua827\ua840-\ua873\ua880-\ua8c4\ua8d0-\ua8d9\ua8e0-\ua8f7\ua8fb\ua900-\ua92d\ua930-\ua953\ua960-\ua97c\ua980-\ua9c0\ua9cf-\ua9d9\uaa00-\uaa36\uaa40-\uaa4d\uaa50-\uaa59\uaa60-\uaa76\uaa7a\uaa7b\uaa80-\uaac2\uaadb-\uaadd\uaae0-\uaaef\uaaf2-\uaaf6\uab01-\uab06\uab09-\uab0e\uab11-\uab16\uab20-\uab26\uab28-\uab2e\uabc0-\uabea\uabec\uabed\uabf0-\uabf9\uac00-\ud7a3\ud7b0-\ud7c6\ud7cb-\ud7fb\uf900-\ufa6d\ufa70-\ufad9\ufb00-\ufb06\ufb13-\ufb17\ufb1d-\ufb28\ufb2a-\ufb36\ufb38-\ufb3c\ufb3e\ufb40\ufb41\ufb43\ufb44\ufb46-\ufbb1\ufbd3-\ufd3d\ufd50-\ufd8f\ufd92-\ufdc7\ufdf0-\ufdfb\ufe00-\ufe0f\ufe20-\ufe26\ufe33\ufe34\ufe4d-\ufe4f\ufe70-\ufe74\ufe76-\ufefc\uff10-\uff19\uff21-\uff3a\uff3f\uff41-\uff5a\uff66-\uffbe\uffc2-\uffc7\uffca-\uffcf\uffd2-\uffd7\uffda-\uffdc]")},or={name:"SyntaxTree",processComment:function(e){var t,r;
  if(!(e.type===tr.Program&&e.body.length>0)){for(mr.trailingComments.length>0?mr.trailingComments[0].range[0]>=e.range[1]?(r=mr.trailingComments,mr.trailingComments=[]):mr.trailingComments.length=0:mr.bottomRightStack.length>0&&mr.bottomRightStack[mr.bottomRightStack.length-1].trailingComments&&mr.bottomRightStack[mr.bottomRightStack.length-1].trailingComments[0].range[0]>=e.range[1]&&(r=mr.bottomRightStack[mr.bottomRightStack.length-1].trailingComments,delete mr.bottomRightStack[mr.bottomRightStack.length-1].trailingComments);mr.bottomRightStack.length>0&&mr.bottomRightStack[mr.bottomRightStack.length-1].range[0]>=e.range[0];)t=mr.bottomRightStack.pop();t?t.leadingComments&&t.leadingComments[t.leadingComments.length-1].range[1]<=e.range[0]&&(e.leadingComments=t.leadingComments,delete t.leadingComments):mr.leadingComments.length>0&&mr.leadingComments[mr.leadingComments.length-1].range[1]<=e.range[0]&&(e.leadingComments=mr.leadingComments,mr.leadingComments=[]),r&&(e.trailingComments=r),mr.bottomRightStack.push(e)}},markEnd:function(e,t){return mr.range&&(e.range=[t.start,ur]),mr.loc&&(e.loc=new U(void 0===t.startLineNumber?t.lineNumber:t.startLineNumber,t.start-(void 0===t.startLineStart?t.lineStart:t.startLineStart),cr,ur-lr),this.postProcess(e)),mr.attachComment&&this.processComment(e),e},postProcess:function(e){return mr.source&&(e.loc.source=mr.source),e},createArrayExpression:function(e){return{type:tr.ArrayExpression,elements:e}},createAssignmentExpression:function(e,t,r){return{type:tr.AssignmentExpression,operator:e,left:t,right:r}},createBinaryExpression:function(e,t,r){var n="||"===e||"&&"===e?tr.LogicalExpression:tr.BinaryExpression;return{type:n,operator:e,left:t,right:r}},createBlockStatement:function(e){return{type:tr.BlockStatement,body:e}},createBreakStatement:function(e){return{type:tr.BreakStatement,label:e}},createCallExpression:function(e,t){return{type:tr.CallExpression,callee:e,arguments:t}},createCatchClause:function(e,t){return{type:tr.CatchClause,param:e,body:t}},createConditionalExpression:function(e,t,r){return{type:tr.ConditionalExpression,test:e,consequent:t,alternate:r}},createContinueStatement:function(e){return{type:tr.ContinueStatement,label:e}},createDebuggerStatement:function(){return{type:tr.DebuggerStatement}},createDoWhileStatement:function(e,t){return{type:tr.DoWhileStatement,body:e,test:t}},createEmptyStatement:function(){return{type:tr.EmptyStatement}},createExpressionStatement:function(e){return{type:tr.ExpressionStatement,expression:e}},createForStatement:function(e,t,r,n){return{type:tr.ForStatement,init:e,test:t,update:r,body:n}},createForInStatement:function(e,t,r){return{type:tr.ForInStatement,left:e,right:t,body:r,each:!1}},createFunctionDeclaration:function(e,t,r,n){return{type:tr.FunctionDeclaration,id:e,params:t,defaults:r,body:n,rest:null,generator:!1,expression:!1}},createFunctionExpression:function(e,t,r,n){return{type:tr.FunctionExpression,id:e,params:t,defaults:r,body:n,rest:null,generator:!1,expression:!1}},createIdentifier:function(e){return{type:tr.Identifier,name:e}},createIfStatement:function(e,t,r){return{type:tr.IfStatement,test:e,consequent:t,alternate:r}},createLabeledStatement:function(e,t){return{type:tr.LabeledStatement,label:e,body:t}},createLiteral:function(e){return{type:tr.Literal,value:e.value,raw:ar.slice(e.start,e.end)}},createMemberExpression:function(e,t,r){return{type:tr.MemberExpression,computed:"["===e,object:t,property:r}},createNewExpression:function(e,t){return{type:tr.NewExpression,callee:e,arguments:t}},createObjectExpression:function(e){return{type:tr.ObjectExpression,properties:e}},createPostfixExpression:function(e,t){return{type:tr.UpdateExpression,operator:e,argument:t,prefix:!1}},createProgram:function(e){return{type:tr.Program,body:e}},createProperty:function(e,t,r){return{type:tr.Property,key:t,value:r,kind:e}},createReturnStatement:function(e){return{type:tr.ReturnStatement,argument:e}},createSequenceExpression:function(e){return{type:tr.SequenceExpression,expressions:e}},createSwitchCase:function(e,t){return{type:tr.SwitchCase,test:e,consequent:t}},createSwitchStatement:function(e,t){return{type:tr.SwitchStatement,discriminant:e,cases:t}},createThisExpression:function(){return{type:tr.ThisExpression}},createThrowStatement:function(e){return{type:tr.ThrowStatement,argument:e}},createTryStatement:function(e,t,r,n){return{type:tr.TryStatement,block:e,guardedHandlers:t,handlers:r,finalizer:n}},createUnaryExpression:function(e,t){return"++"===e||"--"===e?{type:tr.UpdateExpression,operator:e,argument:t,prefix:!0}:{type:tr.UnaryExpression,operator:e,argument:t,prefix:!0}},createVariableDeclaration:function(e,t){return{type:tr.VariableDeclaration,declarations:e,kind:t}},createVariableDeclarator:function(e,t){return{type:tr.VariableDeclarator,id:e,init:t}},createWhileStatement:function(e,t){return{type:tr.WhileStatement,test:e,body:t}},createWithStatement:function(e,t){return{type:tr.WithStatement,object:e,body:t}}},e.version="1.2.2",e.tokenize=Jt,e.parse=Zt,e.Syntax=function(){var e,t={};"function"==typeof Object.create&&(t=Object.create(null));for(e in tr)tr.hasOwnProperty(e)&&(t[e]=tr[e]);return"function"==typeof Object.freeze&&Object.freeze(t),t}()});
  //# sourceMappingURL=esprima.js.map
  global.define = __define;
  return module.exports;
});

System.register("npm:bit-twiddle@0.0.2/twiddle", [], true, function(require, exports, __moduleName) {
  var global = System.global;
  var __define = global.define;
  global.define = undefined;
  var module = { exports: exports };
  var process = System.get("@@nodeProcess")["default"];
    var __filename = "jspm_packages/npm/bit-twiddle@0.0.2/twiddle.js";
    var __dirname = "jspm_packages/npm/bit-twiddle@0.0.2";
  "format cjs";"use strict";"use restrict";function countTrailingZeros(e){var t=32;return e&=-e,e&&t--,65535&e&&(t-=16),16711935&e&&(t-=8),252645135&e&&(t-=4),858993459&e&&(t-=2),1431655765&e&&(t-=1),t}var INT_BITS=32;exports.INT_BITS=INT_BITS,exports.INT_MAX=2147483647,exports.INT_MIN=-1<<INT_BITS-1,exports.sign=function(e){return(e>0)-(0>e)},exports.abs=function(e){var t=e>>INT_BITS-1;return(e^t)-t},exports.min=function(e,t){return t^(e^t)&-(t>e)},exports.max=function(e,t){return e^(e^t)&-(t>e)},exports.isPow2=function(e){return!(e&e-1||!e)},exports.log2=function(e){var t,n;return t=(e>65535)<<4,e>>>=t,n=(e>255)<<3,e>>>=n,t|=n,n=(e>15)<<2,e>>>=n,t|=n,n=(e>3)<<1,e>>>=n,t|=n,t|e>>1},exports.log10=function(e){return e>=1e9?9:e>=1e8?8:e>=1e7?7:e>=1e6?6:e>=1e5?5:e>=1e4?4:e>=1e3?3:e>=100?2:e>=10?1:0},exports.popCount=function(e){return e-=e>>>1&1431655765,e=(858993459&e)+(e>>>2&858993459),16843009*(e+(e>>>4)&252645135)>>>24},exports.countTrailingZeros=countTrailingZeros,exports.nextPow2=function(e){return e+=0===e,--e,e|=e>>>1,e|=e>>>2,e|=e>>>4,e|=e>>>8,e|=e>>>16,e+1},exports.prevPow2=function(e){return e|=e>>>1,e|=e>>>2,e|=e>>>4,e|=e>>>8,e|=e>>>16,e-(e>>>1)},exports.parity=function(e){return e^=e>>>16,e^=e>>>8,e^=e>>>4,e&=15,27030>>>e&1};var REVERSE_TABLE=new Array(256);!function(e){for(var t=0;256>t;++t){var n=t,r=t,o=7;for(n>>>=1;n;n>>>=1)r<<=1,r|=1&n,--o;e[t]=r<<o&255}}(REVERSE_TABLE),exports.reverse=function(e){return REVERSE_TABLE[255&e]<<24|REVERSE_TABLE[e>>>8&255]<<16|REVERSE_TABLE[e>>>16&255]<<8|REVERSE_TABLE[e>>>24&255]},exports.interleave2=function(e,t){return e&=65535,e=16711935&(e|e<<8),e=252645135&(e|e<<4),e=858993459&(e|e<<2),e=1431655765&(e|e<<1),t&=65535,t=16711935&(t|t<<8),t=252645135&(t|t<<4),t=858993459&(t|t<<2),t=1431655765&(t|t<<1),e|t<<1},exports.deinterleave2=function(e,t){return e=e>>>t&1431655765,e=858993459&(e|e>>>1),e=252645135&(e|e>>>2),e=16711935&(e|e>>>4),e=65535&(e|e>>>16),e<<16>>16},exports.interleave3=function(e,t,n){return e&=1023,e=4278190335&(e|e<<16),e=251719695&(e|e<<8),e=3272356035&(e|e<<4),e=1227133513&(e|e<<2),t&=1023,t=4278190335&(t|t<<16),t=251719695&(t|t<<8),t=3272356035&(t|t<<4),t=1227133513&(t|t<<2),e|=t<<1,n&=1023,n=4278190335&(n|n<<16),n=251719695&(n|n<<8),n=3272356035&(n|n<<4),n=1227133513&(n|n<<2),e|n<<2},exports.deinterleave3=function(e,t){return e=e>>>t&1227133513,e=3272356035&(e|e>>>2),e=251719695&(e|e>>>4),e=4278190335&(e|e>>>8),e=1023&(e|e>>>16),e<<22>>22},exports.nextCombination=function(e){var t=e|e-1;return t+1|(~t&-~t)-1>>>countTrailingZeros(e)+1};
  //# sourceMappingURL=twiddle.js.map
  global.define = __define;
  return module.exports;
});

System.register("npm:dup@0.0.0/dup", [], true, function(require, exports, __moduleName) {
  var global = System.global;
  var __define = global.define;
  global.define = undefined;
  var module = { exports: exports };
  var process = System.get("@@nodeProcess")["default"];
    var __filename = "jspm_packages/npm/dup@0.0.0/dup.js";
    var __dirname = "jspm_packages/npm/dup@0.0.0";
  "format cjs";"use strict";function dupe_array(e,t,n){var r=0|e[n];if(0>=r)return[];var o,i=new Array(r);if(n===e.length-1)for(o=0;r>o;++o)i[o]=t;else for(o=0;r>o;++o)i[o]=dupe_array(e,t,n+1);return i}function dupe_number(e,t){var n,r;for(n=new Array(e),r=0;e>r;++r)n[r]=t;return n}function dupe(e,t){switch("undefined"==typeof t&&(t=0),typeof e){case"number":if(e>0)return dupe_number(0|e,t);break;case"object":if("number"==typeof e.length)return dupe_array(e,t,0)}return[]}module.exports=dupe;
  //# sourceMappingURL=dup.js.map
  global.define = __define;
  return module.exports;
});

System.register("npm:bit-twiddle@1.0.2/twiddle", [], true, function(require, exports, __moduleName) {
  var global = System.global;
  var __define = global.define;
  global.define = undefined;
  var module = { exports: exports };
  var process = System.get("@@nodeProcess")["default"];
    var __filename = "jspm_packages/npm/bit-twiddle@1.0.2/twiddle.js";
    var __dirname = "jspm_packages/npm/bit-twiddle@1.0.2";
  "format cjs";"use strict";"use restrict";function countTrailingZeros(e){var t=32;return e&=-e,e&&t--,65535&e&&(t-=16),16711935&e&&(t-=8),252645135&e&&(t-=4),858993459&e&&(t-=2),1431655765&e&&(t-=1),t}var INT_BITS=32;exports.INT_BITS=INT_BITS,exports.INT_MAX=2147483647,exports.INT_MIN=-1<<INT_BITS-1,exports.sign=function(e){return(e>0)-(0>e)},exports.abs=function(e){var t=e>>INT_BITS-1;return(e^t)-t},exports.min=function(e,t){return t^(e^t)&-(t>e)},exports.max=function(e,t){return e^(e^t)&-(t>e)},exports.isPow2=function(e){return!(e&e-1||!e)},exports.log2=function(e){var t,n;return t=(e>65535)<<4,e>>>=t,n=(e>255)<<3,e>>>=n,t|=n,n=(e>15)<<2,e>>>=n,t|=n,n=(e>3)<<1,e>>>=n,t|=n,t|e>>1},exports.log10=function(e){return e>=1e9?9:e>=1e8?8:e>=1e7?7:e>=1e6?6:e>=1e5?5:e>=1e4?4:e>=1e3?3:e>=100?2:e>=10?1:0},exports.popCount=function(e){return e-=e>>>1&1431655765,e=(858993459&e)+(e>>>2&858993459),16843009*(e+(e>>>4)&252645135)>>>24},exports.countTrailingZeros=countTrailingZeros,exports.nextPow2=function(e){return e+=0===e,--e,e|=e>>>1,e|=e>>>2,e|=e>>>4,e|=e>>>8,e|=e>>>16,e+1},exports.prevPow2=function(e){return e|=e>>>1,e|=e>>>2,e|=e>>>4,e|=e>>>8,e|=e>>>16,e-(e>>>1)},exports.parity=function(e){return e^=e>>>16,e^=e>>>8,e^=e>>>4,e&=15,27030>>>e&1};var REVERSE_TABLE=new Array(256);!function(e){for(var t=0;256>t;++t){var n=t,r=t,o=7;for(n>>>=1;n;n>>>=1)r<<=1,r|=1&n,--o;e[t]=r<<o&255}}(REVERSE_TABLE),exports.reverse=function(e){return REVERSE_TABLE[255&e]<<24|REVERSE_TABLE[e>>>8&255]<<16|REVERSE_TABLE[e>>>16&255]<<8|REVERSE_TABLE[e>>>24&255]},exports.interleave2=function(e,t){return e&=65535,e=16711935&(e|e<<8),e=252645135&(e|e<<4),e=858993459&(e|e<<2),e=1431655765&(e|e<<1),t&=65535,t=16711935&(t|t<<8),t=252645135&(t|t<<4),t=858993459&(t|t<<2),t=1431655765&(t|t<<1),e|t<<1},exports.deinterleave2=function(e,t){return e=e>>>t&1431655765,e=858993459&(e|e>>>1),e=252645135&(e|e>>>2),e=16711935&(e|e>>>4),e=65535&(e|e>>>16),e<<16>>16},exports.interleave3=function(e,t,n){return e&=1023,e=4278190335&(e|e<<16),e=251719695&(e|e<<8),e=3272356035&(e|e<<4),e=1227133513&(e|e<<2),t&=1023,t=4278190335&(t|t<<16),t=251719695&(t|t<<8),t=3272356035&(t|t<<4),t=1227133513&(t|t<<2),e|=t<<1,n&=1023,n=4278190335&(n|n<<16),n=251719695&(n|n<<8),n=3272356035&(n|n<<4),n=1227133513&(n|n<<2),e|n<<2},exports.deinterleave3=function(e,t){return e=e>>>t&1227133513,e=3272356035&(e|e>>>2),e=251719695&(e|e>>>4),e=4278190335&(e|e>>>8),e=1023&(e|e>>>16),e<<22>>22},exports.nextCombination=function(e){var t=e|e-1;return t+1|(~t&-~t)-1>>>countTrailingZeros(e)+1};
  //# sourceMappingURL=twiddle.js.map
  global.define = __define;
  return module.exports;
});

System.register("npm:dup@1.0.0/dup", [], true, function(require, exports, __moduleName) {
  var global = System.global;
  var __define = global.define;
  global.define = undefined;
  var module = { exports: exports };
  var process = System.get("@@nodeProcess")["default"];
    var __filename = "jspm_packages/npm/dup@1.0.0/dup.js";
    var __dirname = "jspm_packages/npm/dup@1.0.0";
  "format cjs";"use strict";function dupe_array(e,t,r){var n=0|e[r];if(0>=n)return[];var i,o=new Array(n);if(r===e.length-1)for(i=0;n>i;++i)o[i]=t;else for(i=0;n>i;++i)o[i]=dupe_array(e,t,r+1);return o}function dupe_number(e,t){var r,n;for(r=new Array(e),n=0;e>n;++n)r[n]=t;return r}function dupe(e,t){switch("undefined"==typeof t&&(t=0),typeof e){case"number":if(e>0)return dupe_number(0|e,t);break;case"object":if("number"==typeof e.length)return dupe_array(e,t,0)}return[]}module.exports=dupe;
  //# sourceMappingURL=dup.js.map
  global.define = __define;
  return module.exports;
});

System.register("npm:gl-vao@0.0.3/lib/do-bind", [], true, function(require, exports, __moduleName) {
  var global = System.global;
  var __define = global.define;
  global.define = undefined;
  var module = { exports: exports };
  var process = System.get("@@nodeProcess")["default"];
    var __filename = "jspm_packages/npm/gl-vao@0.0.3/lib/do-bind.js";
    var __dirname = "jspm_packages/npm/gl-vao@0.0.3/lib";
  "format cjs";"use strict";function doBind(e,t,n){t?t.bind():e.bindBuffer(e.ELEMENT_ARRAY_BUFFER,null);var r=0|e.getParameter(e.MAX_VERTEX_ATTRIBS);if(n){if(n.length>r)throw new Error("Too many vertex attributes");for(var o=0;o<n.length;++o){var i=n[o];if(i.buffer){var a=i.buffer,s=i.size||4,u=i.type||e.FLOAT,c=!!i.normalized,l=i.stride||0,f=i.offset||0;a.bind(),e.vertexAttribPointer(o,s,u,c,l,f),e.enableVertexAttribArray(o)}else{if("number"==typeof i)e.vertexAttrib1f(o,i);else if(1===i.length)e.vertexAttrib1f(o,i[0]);else if(2===i.length)e.vertexAttrib2f(o,i[0],i[1]);else if(3===i.length)e.vertexAttrib3f(o,i[0],i[1],i[2]);else{if(4!==i.length)throw new Error("Invalid vertex attribute");e.vertexAttrib4f(o,i[0],i[1],i[2],i[3])}e.disableVertexAttribArray(o)}}for(;r>o;++o)e.disableVertexAttribArray(o)}else{e.bindBuffer(e.ARRAY_BUFFER,null);for(var o=0;r>o;++o)e.disableVertexAttribArray(o)}}module.exports=doBind;
  //# sourceMappingURL=do-bind.js.map
  global.define = __define;
  return module.exports;
});

System.register("npm:gl-matrix@2.0.0/dist/gl-matrix", [], true, function(require, exports, __moduleName) {
  var global = System.global;
  var __define = global.define;
  global.define = undefined;
  var module = { exports: exports };
  var process = System.get("@@nodeProcess")["default"];
    var __filename = "jspm_packages/npm/gl-matrix@2.0.0/dist/gl-matrix.js";
    var __dirname = "jspm_packages/npm/gl-matrix@2.0.0/dist";
  "format cjs";!function(){"use strict";var t={};"undefined"==typeof exports?"function"==typeof define&&"object"==typeof define.amd&&define.amd?(t.exports={},define(function(){return t.exports})):t.exports=window:t.exports=exports,function(t){var n={};if(!r)var r=1e-6;n.create=function(){return new Float32Array(2)},n.clone=function(t){var n=new Float32Array(2);return n[0]=t[0],n[1]=t[1],n},n.fromValues=function(t,n){var r=new Float32Array(2);return r[0]=t,r[1]=n,r},n.copy=function(t,n){return t[0]=n[0],t[1]=n[1],t},n.set=function(t,n,r){return t[0]=n,t[1]=r,t},n.add=function(t,n,r){return t[0]=n[0]+r[0],t[1]=n[1]+r[1],t},n.sub=n.subtract=function(t,n,r){return t[0]=n[0]-r[0],t[1]=n[1]-r[1],t},n.mul=n.multiply=function(t,n,r){return t[0]=n[0]*r[0],t[1]=n[1]*r[1],t},n.div=n.divide=function(t,n,r){return t[0]=n[0]/r[0],t[1]=n[1]/r[1],t},n.min=function(t,n,r){return t[0]=Math.min(n[0],r[0]),t[1]=Math.min(n[1],r[1]),t},n.max=function(t,n,r){return t[0]=Math.max(n[0],r[0]),t[1]=Math.max(n[1],r[1]),t},n.scale=function(t,n,r){return t[0]=n[0]*r,t[1]=n[1]*r,t},n.dist=n.distance=function(t,n){var r=n[0]-t[0],e=n[1]-t[1];return Math.sqrt(r*r+e*e)},n.sqrDist=n.squaredDistance=function(t,n){var r=n[0]-t[0],e=n[1]-t[1];return r*r+e*e},n.len=n.length=function(t){var n=t[0],r=t[1];return Math.sqrt(n*n+r*r)},n.sqrLen=n.squaredLength=function(t){var n=t[0],r=t[1];return n*n+r*r},n.negate=function(t,n){return t[0]=-n[0],t[1]=-n[1],t},n.normalize=function(t,n){var r=n[0],e=n[1],a=r*r+e*e;return a>0&&(a=1/Math.sqrt(a),t[0]=n[0]*a,t[1]=n[1]*a),t},n.dot=function(t,n){return t[0]*n[0]+t[1]*n[1]},n.cross=function(t,n,r){var e=n[0]*r[1]-n[1]*r[0];return t[0]=t[1]=0,t[2]=e,t},n.lerp=function(t,n,r,e){var a=n[0],u=n[1];return t[0]=a+e*(r[0]-a),t[1]=u+e*(r[1]-u),t},n.transformMat2=function(t,n,r){var e=n[0],a=n[1];return t[0]=e*r[0]+a*r[1],t[1]=e*r[2]+a*r[3],t},n.forEach=function(){var t=new Float32Array(2);return function(n,r,e,a,u,i){var o,c;for(r||(r=2),e||(e=0),c=a?Math.min(a*r+e,n.length):n.length,o=e;c>o;o+=r)t[0]=n[o],t[1]=n[o+1],u(t,t,i),n[o]=t[0],n[o+1]=t[1];return n}}(),n.str=function(t){return"vec2("+t[0]+", "+t[1]+")"},"undefined"!=typeof t&&(t.vec2=n);var e={};if(!r)var r=1e-6;e.create=function(){return new Float32Array(3)},e.clone=function(t){var n=new Float32Array(3);return n[0]=t[0],n[1]=t[1],n[2]=t[2],n},e.fromValues=function(t,n,r){var e=new Float32Array(3);return e[0]=t,e[1]=n,e[2]=r,e},e.copy=function(t,n){return t[0]=n[0],t[1]=n[1],t[2]=n[2],t},e.set=function(t,n,r,e){return t[0]=n,t[1]=r,t[2]=e,t},e.add=function(t,n,r){return t[0]=n[0]+r[0],t[1]=n[1]+r[1],t[2]=n[2]+r[2],t},e.sub=e.subtract=function(t,n,r){return t[0]=n[0]-r[0],t[1]=n[1]-r[1],t[2]=n[2]-r[2],t},e.mul=e.multiply=function(t,n,r){return t[0]=n[0]*r[0],t[1]=n[1]*r[1],t[2]=n[2]*r[2],t},e.div=e.divide=function(t,n,r){return t[0]=n[0]/r[0],t[1]=n[1]/r[1],t[2]=n[2]/r[2],t},e.min=function(t,n,r){return t[0]=Math.min(n[0],r[0]),t[1]=Math.min(n[1],r[1]),t[2]=Math.min(n[2],r[2]),t},e.max=function(t,n,r){return t[0]=Math.max(n[0],r[0]),t[1]=Math.max(n[1],r[1]),t[2]=Math.max(n[2],r[2]),t},e.scale=function(t,n,r){return t[0]=n[0]*r,t[1]=n[1]*r,t[2]=n[2]*r,t},e.dist=e.distance=function(t,n){var r=n[0]-t[0],e=n[1]-t[1],a=n[2]-t[2];return Math.sqrt(r*r+e*e+a*a)},e.sqrDist=e.squaredDistance=function(t,n){var r=n[0]-t[0],e=n[1]-t[1],a=n[2]-t[2];return r*r+e*e+a*a},e.len=e.length=function(t){var n=t[0],r=t[1],e=t[2];return Math.sqrt(n*n+r*r+e*e)},e.sqrLen=e.squaredLength=function(t){var n=t[0],r=t[1],e=t[2];return n*n+r*r+e*e},e.negate=function(t,n){return t[0]=-n[0],t[1]=-n[1],t[2]=-n[2],t},e.normalize=function(t,n){var r=n[0],e=n[1],a=n[2],u=r*r+e*e+a*a;return u>0&&(u=1/Math.sqrt(u),t[0]=n[0]*u,t[1]=n[1]*u,t[2]=n[2]*u),t},e.dot=function(t,n){return t[0]*n[0]+t[1]*n[1]+t[2]*n[2]},e.cross=function(t,n,r){var e=n[0],a=n[1],u=n[2],i=r[0],o=r[1],c=r[2];return t[0]=a*c-u*o,t[1]=u*i-e*c,t[2]=e*o-a*i,t},e.lerp=function(t,n,r,e){var a=n[0],u=n[1],i=n[2];return t[0]=a+e*(r[0]-a),t[1]=u+e*(r[1]-u),t[2]=i+e*(r[2]-i),t},e.transformMat4=function(t,n,r){var e=n[0],a=n[1],u=n[2];return t[0]=r[0]*e+r[4]*a+r[8]*u+r[12],t[1]=r[1]*e+r[5]*a+r[9]*u+r[13],t[2]=r[2]*e+r[6]*a+r[10]*u+r[14],t},e.transformQuat=function(t,n,r){var e=n[0],a=n[1],u=n[2],i=r[0],o=r[1],c=r[2],f=r[3],s=f*e+o*u-c*a,l=f*a+c*e-i*u,h=f*u+i*a-o*e,d=-i*e-o*a-c*u;return t[0]=s*f+d*-i+l*-c-h*-o,t[1]=l*f+d*-o+h*-i-s*-c,t[2]=h*f+d*-c+s*-o-l*-i,t},e.forEach=function(){var t=new Float32Array(3);return function(n,r,e,a,u,i){var o,c;for(r||(r=3),e||(e=0),c=a?Math.min(a*r+e,n.length):n.length,o=e;c>o;o+=r)t[0]=n[o],t[1]=n[o+1],t[2]=n[o+2],u(t,t,i),n[o]=t[0],n[o+1]=t[1],n[o+2]=t[2];return n}}(),e.str=function(t){return"vec3("+t[0]+", "+t[1]+", "+t[2]+")"},"undefined"!=typeof t&&(t.vec3=e);var a={};if(!r)var r=1e-6;a.create=function(){return new Float32Array(4)},a.clone=function(t){var n=new Float32Array(4);return n[0]=t[0],n[1]=t[1],n[2]=t[2],n[3]=t[3],n},a.fromValues=function(t,n,r,e){var a=new Float32Array(4);return a[0]=t,a[1]=n,a[2]=r,a[3]=e,a},a.copy=function(t,n){return t[0]=n[0],t[1]=n[1],t[2]=n[2],t[3]=n[3],t},a.set=function(t,n,r,e,a){return t[0]=n,t[1]=r,t[2]=e,t[3]=a,t},a.add=function(t,n,r){return t[0]=n[0]+r[0],t[1]=n[1]+r[1],t[2]=n[2]+r[2],t[3]=n[3]+r[3],t},a.sub=a.subtract=function(t,n,r){return t[0]=n[0]-r[0],t[1]=n[1]-r[1],t[2]=n[2]-r[2],t[3]=n[3]-r[3],t},a.mul=a.multiply=function(t,n,r){return t[0]=n[0]*r[0],t[1]=n[1]*r[1],t[2]=n[2]*r[2],t[3]=n[3]*r[3],t},a.div=a.divide=function(t,n,r){return t[0]=n[0]/r[0],t[1]=n[1]/r[1],t[2]=n[2]/r[2],t[3]=n[3]/r[3],t},a.min=function(t,n,r){return t[0]=Math.min(n[0],r[0]),t[1]=Math.min(n[1],r[1]),t[2]=Math.min(n[2],r[2]),t[3]=Math.min(n[3],r[3]),t},a.max=function(t,n,r){return t[0]=Math.max(n[0],r[0]),t[1]=Math.max(n[1],r[1]),t[2]=Math.max(n[2],r[2]),t[3]=Math.max(n[3],r[3]),t},a.scale=function(t,n,r){return t[0]=n[0]*r,t[1]=n[1]*r,t[2]=n[2]*r,t[3]=n[3]*r,t},a.dist=a.distance=function(t,n){var r=n[0]-t[0],e=n[1]-t[1],a=n[2]-t[2],u=n[3]-t[3];return Math.sqrt(r*r+e*e+a*a+u*u)},a.sqrDist=a.squaredDistance=function(t,n){var r=n[0]-t[0],e=n[1]-t[1],a=n[2]-t[2],u=n[3]-t[3];return r*r+e*e+a*a+u*u},a.len=a.length=function(t){var n=t[0],r=t[1],e=t[2],a=t[3];return Math.sqrt(n*n+r*r+e*e+a*a)},a.sqrLen=a.squaredLength=function(t){var n=t[0],r=t[1],e=t[2],a=t[3];return n*n+r*r+e*e+a*a},a.negate=function(t,n){return t[0]=-n[0],t[1]=-n[1],t[2]=-n[2],t[3]=-n[3],t},a.normalize=function(t,n){var r=n[0],e=n[1],a=n[2],u=n[3],i=r*r+e*e+a*a+u*u;return i>0&&(i=1/Math.sqrt(i),t[0]=n[0]*i,t[1]=n[1]*i,t[2]=n[2]*i,t[3]=n[3]*i),t},a.dot=function(t,n){return t[0]*n[0]+t[1]*n[1]+t[2]*n[2]+t[3]*n[3]},a.lerp=function(t,n,r,e){var a=n[0],u=n[1],i=n[2],o=n[3];return t[0]=a+e*(r[0]-a),t[1]=u+e*(r[1]-u),t[2]=i+e*(r[2]-i),t[3]=o+e*(r[3]-o),t},a.transformMat4=function(t,n,r){var e=n[0],a=n[1],u=n[2],i=n[3];return t[0]=r[0]*e+r[4]*a+r[8]*u+r[12]*i,t[1]=r[1]*e+r[5]*a+r[9]*u+r[13]*i,t[2]=r[2]*e+r[6]*a+r[10]*u+r[14]*i,t[3]=r[3]*e+r[7]*a+r[11]*u+r[15]*i,t},a.transformQuat=function(t,n,r){var e=n[0],a=n[1],u=n[2],i=r[0],o=r[1],c=r[2],f=r[3],s=f*e+o*u-c*a,l=f*a+c*e-i*u,h=f*u+i*a-o*e,d=-i*e-o*a-c*u;return t[0]=s*f+d*-i+l*-c-h*-o,t[1]=l*f+d*-o+h*-i-s*-c,t[2]=h*f+d*-c+s*-o-l*-i,t},a.forEach=function(){var t=new Float32Array(4);return function(n,r,e,a,u,i){var o,c;for(r||(r=4),e||(e=0),c=a?Math.min(a*r+e,n.length):n.length,o=e;c>o;o+=r)t[0]=n[o],t[1]=n[o+1],t[2]=n[o+2],t[3]=n[o+3],u(t,t,i),n[o]=t[0],n[o+1]=t[1],n[o+2]=t[2],n[o+3]=t[3];return n}}(),a.str=function(t){return"vec4("+t[0]+", "+t[1]+", "+t[2]+", "+t[3]+")"},"undefined"!=typeof t&&(t.vec4=a);var u={},i=new Float32Array([1,0,0,1]);if(!r)var r=1e-6;u.create=function(){return new Float32Array(i)},u.clone=function(t){var n=new Float32Array(4);return n[0]=t[0],n[1]=t[1],n[2]=t[2],n[3]=t[3],n},u.copy=function(t,n){return t[0]=n[0],t[1]=n[1],t[2]=n[2],t[3]=n[3],t},u.identity=function(t){return t[0]=1,t[1]=0,t[2]=0,t[3]=1,t},u.transpose=function(t,n){if(t===n){var r=n[1];t[1]=n[2],t[2]=r}else t[0]=n[0],t[1]=n[2],t[2]=n[1],t[3]=n[3];return t},u.invert=function(t,n){var r=n[0],e=n[1],a=n[2],u=n[3],i=r*u-a*e;return i?(i=1/i,t[0]=u*i,t[1]=-e*i,t[2]=-a*i,t[3]=r*i,t):null},u.adjoint=function(t,n){var r=n[0];return t[0]=n[3],t[1]=-n[1],t[2]=-n[2],t[3]=r,t},u.determinant=function(t){return t[0]*t[3]-t[2]*t[1]},u.mul=u.multiply=function(t,n,r){var e=n[0],a=n[1],u=n[2],i=n[3],o=r[0],c=r[1],f=r[2],s=r[3];return t[0]=e*o+a*f,t[1]=e*c+a*s,t[2]=u*o+i*f,t[3]=u*c+i*s,t},u.rotate=function(t,n,r){var e=n[0],a=n[1],u=n[2],i=n[3],o=Math.sin(r),c=Math.cos(r);return t[0]=e*c+a*o,t[1]=e*-o+a*c,t[2]=u*c+i*o,t[3]=u*-o+i*c,t},u.scale=function(t,n,r){var e=n[0],a=n[1],u=n[2],i=n[3],o=r[0],c=r[1];return t[0]=e*o,t[1]=a*c,t[2]=u*o,t[3]=i*c,t},u.str=function(t){return"mat2("+t[0]+", "+t[1]+", "+t[2]+", "+t[3]+")"},"undefined"!=typeof t&&(t.mat2=u);var o={},c=new Float32Array([1,0,0,0,1,0,0,0,1]);if(!r)var r=1e-6;o.create=function(){return new Float32Array(c)},o.clone=function(t){var n=new Float32Array(9);return n[0]=t[0],n[1]=t[1],n[2]=t[2],n[3]=t[3],n[4]=t[4],n[5]=t[5],n[6]=t[6],n[7]=t[7],n[8]=t[8],n},o.copy=function(t,n){return t[0]=n[0],t[1]=n[1],t[2]=n[2],t[3]=n[3],t[4]=n[4],t[5]=n[5],t[6]=n[6],t[7]=n[7],t[8]=n[8],t},o.identity=function(t){return t[0]=1,t[1]=0,t[2]=0,t[3]=0,t[4]=1,t[5]=0,t[6]=0,t[7]=0,t[8]=1,t},o.transpose=function(t,n){if(t===n){var r=n[1],e=n[2],a=n[5];t[1]=n[3],t[2]=n[6],t[3]=r,t[5]=n[7],t[6]=e,t[7]=a}else t[0]=n[0],t[1]=n[3],t[2]=n[6],t[3]=n[1],t[4]=n[4],t[5]=n[7],t[6]=n[2],t[7]=n[5],t[8]=n[8];return t},o.invert=function(t,n){var r=n[0],e=n[1],a=n[2],u=n[3],i=n[4],o=n[5],c=n[6],f=n[7],s=n[8],l=s*i-o*f,h=-s*u+o*c,d=f*u-i*c,p=r*l+e*h+a*d;return p?(p=1/p,t[0]=l*p,t[1]=(-s*e+a*f)*p,t[2]=(o*e-a*i)*p,t[3]=h*p,t[4]=(s*r-a*c)*p,t[5]=(-o*r+a*u)*p,t[6]=d*p,t[7]=(-f*r+e*c)*p,t[8]=(i*r-e*u)*p,t):null},o.adjoint=function(t,n){var r=n[0],e=n[1],a=n[2],u=n[3],i=n[4],o=n[5],c=n[6],f=n[7],s=n[8];return t[0]=i*s-o*f,t[1]=a*f-e*s,t[2]=e*o-a*i,t[3]=o*c-u*s,t[4]=r*s-a*c,t[5]=a*u-r*o,t[6]=u*f-i*c,t[7]=e*c-r*f,t[8]=r*i-e*u,t},o.determinant=function(t){var n=t[0],r=t[1],e=t[2],a=t[3],u=t[4],i=t[5],o=t[6],c=t[7],f=t[8];return n*(f*u-i*c)+r*(-f*a+i*o)+e*(c*a-u*o)},o.mul=o.multiply=function(t,n,r){var e=n[0],a=n[1],u=n[2],i=n[3],o=n[4],c=n[5],f=n[6],s=n[7],l=n[8],h=r[0],d=r[1],p=r[2],m=r[3],v=r[4],y=r[5],b=r[6],M=r[7],g=r[8];return t[0]=h*e+d*i+p*f,t[1]=h*a+d*o+p*s,t[2]=h*u+d*c+p*l,t[3]=m*e+v*i+y*f,t[4]=m*a+v*o+y*s,t[5]=m*u+v*c+y*l,t[6]=b*e+M*i+g*f,t[7]=b*a+M*o+g*s,t[8]=b*u+M*c+g*l,t},o.str=function(t){return"mat3("+t[0]+", "+t[1]+", "+t[2]+", "+t[3]+", "+t[4]+", "+t[5]+", "+t[6]+", "+t[7]+", "+t[8]+")"},"undefined"!=typeof t&&(t.mat3=o);var f={},s=new Float32Array([1,0,0,0,0,1,0,0,0,0,1,0,0,0,0,1]);if(!r)var r=1e-6;f.create=function(){return new Float32Array(s)},f.clone=function(t){var n=new Float32Array(16);return n[0]=t[0],n[1]=t[1],n[2]=t[2],n[3]=t[3],n[4]=t[4],n[5]=t[5],n[6]=t[6],n[7]=t[7],n[8]=t[8],n[9]=t[9],n[10]=t[10],n[11]=t[11],n[12]=t[12],n[13]=t[13],n[14]=t[14],n[15]=t[15],n},f.copy=function(t,n){return t[0]=n[0],t[1]=n[1],t[2]=n[2],t[3]=n[3],t[4]=n[4],t[5]=n[5],t[6]=n[6],t[7]=n[7],t[8]=n[8],t[9]=n[9],t[10]=n[10],t[11]=n[11],t[12]=n[12],t[13]=n[13],t[14]=n[14],t[15]=n[15],t},f.identity=function(t){return t[0]=1,t[1]=0,t[2]=0,t[3]=0,t[4]=0,t[5]=1,t[6]=0,t[7]=0,t[8]=0,t[9]=0,t[10]=1,t[11]=0,t[12]=0,t[13]=0,t[14]=0,t[15]=1,t},f.transpose=function(t,n){if(t===n){var r=n[1],e=n[2],a=n[3],u=n[6],i=n[7],o=n[11];t[1]=n[4],t[2]=n[8],t[3]=n[12],t[4]=r,t[6]=n[9],t[7]=n[13],t[8]=e,t[9]=u,t[11]=n[14],t[12]=a,t[13]=i,t[14]=o}else t[0]=n[0],t[1]=n[4],t[2]=n[8],t[3]=n[12],t[4]=n[1],t[5]=n[5],t[6]=n[9],t[7]=n[13],t[8]=n[2],t[9]=n[6],t[10]=n[10],t[11]=n[14],t[12]=n[3],t[13]=n[7],t[14]=n[11],t[15]=n[15];return t},f.invert=function(t,n){var r=n[0],e=n[1],a=n[2],u=n[3],i=n[4],o=n[5],c=n[6],f=n[7],s=n[8],l=n[9],h=n[10],d=n[11],p=n[12],m=n[13],v=n[14],y=n[15],b=r*o-e*i,M=r*c-a*i,g=r*f-u*i,A=e*c-a*o,x=e*f-u*o,q=a*f-u*c,E=s*m-l*p,w=s*v-h*p,F=s*y-d*p,B=l*v-h*m,D=l*y-d*m,L=h*y-d*v,S=b*L-M*D+g*B+A*F-x*w+q*E;return S?(S=1/S,t[0]=(o*L-c*D+f*B)*S,t[1]=(a*D-e*L-u*B)*S,t[2]=(m*q-v*x+y*A)*S,t[3]=(h*x-l*q-d*A)*S,t[4]=(c*F-i*L-f*w)*S,t[5]=(r*L-a*F+u*w)*S,t[6]=(v*g-p*q-y*M)*S,t[7]=(s*q-h*g+d*M)*S,t[8]=(i*D-o*F+f*E)*S,t[9]=(e*F-r*D-u*E)*S,t[10]=(p*x-m*g+y*b)*S,t[11]=(l*g-s*x-d*b)*S,t[12]=(o*w-i*B-c*E)*S,t[13]=(r*B-e*w+a*E)*S,t[14]=(m*M-p*A-v*b)*S,t[15]=(s*A-l*M+h*b)*S,t):null},f.adjoint=function(t,n){var r=n[0],e=n[1],a=n[2],u=n[3],i=n[4],o=n[5],c=n[6],f=n[7],s=n[8],l=n[9],h=n[10],d=n[11],p=n[12],m=n[13],v=n[14],y=n[15];return t[0]=o*(h*y-d*v)-l*(c*y-f*v)+m*(c*d-f*h),t[1]=-(e*(h*y-d*v)-l*(a*y-u*v)+m*(a*d-u*h)),t[2]=e*(c*y-f*v)-o*(a*y-u*v)+m*(a*f-u*c),t[3]=-(e*(c*d-f*h)-o*(a*d-u*h)+l*(a*f-u*c)),t[4]=-(i*(h*y-d*v)-s*(c*y-f*v)+p*(c*d-f*h)),t[5]=r*(h*y-d*v)-s*(a*y-u*v)+p*(a*d-u*h),t[6]=-(r*(c*y-f*v)-i*(a*y-u*v)+p*(a*f-u*c)),t[7]=r*(c*d-f*h)-i*(a*d-u*h)+s*(a*f-u*c),t[8]=i*(l*y-d*m)-s*(o*y-f*m)+p*(o*d-f*l),t[9]=-(r*(l*y-d*m)-s*(e*y-u*m)+p*(e*d-u*l)),t[10]=r*(o*y-f*m)-i*(e*y-u*m)+p*(e*f-u*o),t[11]=-(r*(o*d-f*l)-i*(e*d-u*l)+s*(e*f-u*o)),t[12]=-(i*(l*v-h*m)-s*(o*v-c*m)+p*(o*h-c*l)),t[13]=r*(l*v-h*m)-s*(e*v-a*m)+p*(e*h-a*l),t[14]=-(r*(o*v-c*m)-i*(e*v-a*m)+p*(e*c-a*o)),t[15]=r*(o*h-c*l)-i*(e*h-a*l)+s*(e*c-a*o),t},f.determinant=function(t){var n=t[0],r=t[1],e=t[2],a=t[3],u=t[4],i=t[5],o=t[6],c=t[7],f=t[8],s=t[9],l=t[10],h=t[11],d=t[12],p=t[13],m=t[14],v=t[15],y=n*i-r*u,b=n*o-e*u,M=n*c-a*u,g=r*o-e*i,A=r*c-a*i,x=e*c-a*o,q=f*p-s*d,E=f*m-l*d,w=f*v-h*d,F=s*m-l*p,B=s*v-h*p,D=l*v-h*m;return y*D-b*B+M*F+g*w-A*E+x*q},f.mul=f.multiply=function(t,n,r){var e=n[0],a=n[1],u=n[2],i=n[3],o=n[4],c=n[5],f=n[6],s=n[7],l=n[8],h=n[9],d=n[10],p=n[11],m=n[12],v=n[13],y=n[14],b=n[15],M=r[0],g=r[1],A=r[2],x=r[3];return t[0]=M*e+g*o+A*l+x*m,t[1]=M*a+g*c+A*h+x*v,t[2]=M*u+g*f+A*d+x*y,t[3]=M*i+g*s+A*p+x*b,M=r[4],g=r[5],A=r[6],x=r[7],t[4]=M*e+g*o+A*l+x*m,t[5]=M*a+g*c+A*h+x*v,t[6]=M*u+g*f+A*d+x*y,t[7]=M*i+g*s+A*p+x*b,M=r[8],g=r[9],A=r[10],x=r[11],t[8]=M*e+g*o+A*l+x*m,t[9]=M*a+g*c+A*h+x*v,t[10]=M*u+g*f+A*d+x*y,t[11]=M*i+g*s+A*p+x*b,M=r[12],g=r[13],A=r[14],x=r[15],t[12]=M*e+g*o+A*l+x*m,t[13]=M*a+g*c+A*h+x*v,t[14]=M*u+g*f+A*d+x*y,t[15]=M*i+g*s+A*p+x*b,t},f.translate=function(t,n,r){var e,a,u,i,o,c,f,s,l,h,d,p,m=r[0],v=r[1],y=r[2];return n===t?(t[12]=n[0]*m+n[4]*v+n[8]*y+n[12],t[13]=n[1]*m+n[5]*v+n[9]*y+n[13],t[14]=n[2]*m+n[6]*v+n[10]*y+n[14],t[15]=n[3]*m+n[7]*v+n[11]*y+n[15]):(e=n[0],a=n[1],u=n[2],i=n[3],o=n[4],c=n[5],f=n[6],s=n[7],l=n[8],h=n[9],d=n[10],p=n[11],t[0]=e,t[1]=a,t[2]=u,t[3]=i,t[4]=o,t[5]=c,t[6]=f,t[7]=s,t[8]=l,t[9]=h,t[10]=d,t[11]=p,t[12]=e*m+o*v+l*y+n[12],t[13]=a*m+c*v+h*y+n[13],t[14]=u*m+f*v+d*y+n[14],t[15]=i*m+s*v+p*y+n[15]),t},f.scale=function(t,n,r){var e=r[0],a=r[1],u=r[2];return t[0]=n[0]*e,t[1]=n[1]*e,t[2]=n[2]*e,t[3]=n[3]*e,t[4]=n[4]*a,t[5]=n[5]*a,t[6]=n[6]*a,t[7]=n[7]*a,t[8]=n[8]*u,t[9]=n[9]*u,t[10]=n[10]*u,t[11]=n[11]*u,t[12]=n[12],t[13]=n[13],t[14]=n[14],t[15]=n[15],t},f.rotate=function(t,n,e,a){var u,i,o,c,f,s,l,h,d,p,m,v,y,b,M,g,A,x,q,E,w,F,B,D,L=a[0],S=a[1],R=a[2],T=Math.sqrt(L*L+S*S+R*R);return Math.abs(T)<r?null:(T=1/T,L*=T,S*=T,R*=T,u=Math.sin(e),i=Math.cos(e),o=1-i,c=n[0],f=n[1],s=n[2],l=n[3],h=n[4],d=n[5],p=n[6],m=n[7],v=n[8],y=n[9],b=n[10],M=n[11],g=L*L*o+i,A=S*L*o+R*u,x=R*L*o-S*u,q=L*S*o-R*u,E=S*S*o+i,w=R*S*o+L*u,F=L*R*o+S*u,B=S*R*o-L*u,D=R*R*o+i,t[0]=c*g+h*A+v*x,t[1]=f*g+d*A+y*x,t[2]=s*g+p*A+b*x,t[3]=l*g+m*A+M*x,t[4]=c*q+h*E+v*w,t[5]=f*q+d*E+y*w,t[6]=s*q+p*E+b*w,t[7]=l*q+m*E+M*w,t[8]=c*F+h*B+v*D,t[9]=f*F+d*B+y*D,t[10]=s*F+p*B+b*D,t[11]=l*F+m*B+M*D,n!==t&&(t[12]=n[12],t[13]=n[13],t[14]=n[14],t[15]=n[15]),t)},f.rotateX=function(t,n,r){var e=Math.sin(r),a=Math.cos(r),u=n[4],i=n[5],o=n[6],c=n[7],f=n[8],s=n[9],l=n[10],h=n[11];return n!==t&&(t[0]=n[0],t[1]=n[1],t[2]=n[2],t[3]=n[3],t[12]=n[12],t[13]=n[13],t[14]=n[14],t[15]=n[15]),t[4]=u*a+f*e,t[5]=i*a+s*e,t[6]=o*a+l*e,t[7]=c*a+h*e,t[8]=f*a-u*e,t[9]=s*a-i*e,t[10]=l*a-o*e,t[11]=h*a-c*e,t},f.rotateY=function(t,n,r){var e=Math.sin(r),a=Math.cos(r),u=n[0],i=n[1],o=n[2],c=n[3],f=n[8],s=n[9],l=n[10],h=n[11];return n!==t&&(t[4]=n[4],t[5]=n[5],t[6]=n[6],t[7]=n[7],t[12]=n[12],t[13]=n[13],t[14]=n[14],t[15]=n[15]),t[0]=u*a-f*e,t[1]=i*a-s*e,t[2]=o*a-l*e,t[3]=c*a-h*e,t[8]=u*e+f*a,t[9]=i*e+s*a,t[10]=o*e+l*a,t[11]=c*e+h*a,t},f.rotateZ=function(t,n,r){var e=Math.sin(r),a=Math.cos(r),u=n[0],i=n[1],o=n[2],c=n[3],f=n[4],s=n[5],l=n[6],h=n[7];return n!==t&&(t[8]=n[8],t[9]=n[9],t[10]=n[10],t[11]=n[11],t[12]=n[12],t[13]=n[13],t[14]=n[14],t[15]=n[15]),t[0]=u*a+f*e,t[1]=i*a+s*e,t[2]=o*a+l*e,t[3]=c*a+h*e,t[4]=f*a-u*e,t[5]=s*a-i*e,t[6]=l*a-o*e,t[7]=h*a-c*e,t},f.fromRotationTranslation=function(t,n,r){var e=n[0],a=n[1],u=n[2],i=n[3],o=e+e,c=a+a,f=u+u,s=e*o,l=e*c,h=e*f,d=a*c,p=a*f,m=u*f,v=i*o,y=i*c,b=i*f;return t[0]=1-(d+m),t[1]=l+b,t[2]=h-y,t[3]=0,t[4]=l-b,t[5]=1-(s+m),t[6]=p+v,t[7]=0,t[8]=h+y,t[9]=p-v,t[10]=1-(s+d),t[11]=0,t[12]=r[0],t[13]=r[1],t[14]=r[2],t[15]=1,t},f.frustum=function(t,n,r,e,a,u,i){var o=1/(r-n),c=1/(a-e),f=1/(u-i);return t[0]=2*u*o,t[1]=0,t[2]=0,t[3]=0,t[4]=0,t[5]=2*u*c,t[6]=0,t[7]=0,t[8]=(r+n)*o,t[9]=(a+e)*c,t[10]=(i+u)*f,t[11]=-1,t[12]=0,t[13]=0,t[14]=i*u*2*f,t[15]=0,t},f.perspective=function(t,n,r,e,a){var u=1/Math.tan(n/2),i=1/(e-a);return t[0]=u/r,t[1]=0,t[2]=0,t[3]=0,t[4]=0,t[5]=u,t[6]=0,t[7]=0,t[8]=0,t[9]=0,t[10]=(a+e)*i,t[11]=-1,t[12]=0,t[13]=0,t[14]=2*a*e*i,t[15]=0,t},f.ortho=function(t,n,r,e,a,u,i){var o=1/(n-r),c=1/(e-a),f=1/(u-i);return t[0]=-2*o,t[1]=0,t[2]=0,t[3]=0,t[4]=0,t[5]=-2*c,t[6]=0,t[7]=0,t[8]=0,t[9]=0,t[10]=2*f,t[11]=0,t[12]=(n+r)*o,t[13]=(a+e)*c,t[14]=(i+u)*f,t[15]=1,t},f.lookAt=function(t,n,e,a){var u,i,o,c,s,l,h,d,p,m,v=n[0],y=n[1],b=n[2],M=a[0],g=a[1],A=a[2],x=e[0],q=e[1],E=e[2];return Math.abs(v-x)<r&&Math.abs(y-q)<r&&Math.abs(b-E)<r?f.identity(t):(h=v-x,d=y-q,p=b-E,m=1/Math.sqrt(h*h+d*d+p*p),h*=m,d*=m,p*=m,u=g*p-A*d,i=A*h-M*p,o=M*d-g*h,m=Math.sqrt(u*u+i*i+o*o),m?(m=1/m,u*=m,i*=m,o*=m):(u=0,i=0,o=0),c=d*o-p*i,s=p*u-h*o,l=h*i-d*u,m=Math.sqrt(c*c+s*s+l*l),m?(m=1/m,c*=m,s*=m,l*=m):(c=0,s=0,l=0),t[0]=u,t[1]=c,t[2]=h,t[3]=0,t[4]=i,t[5]=s,t[6]=d,t[7]=0,t[8]=o,t[9]=l,t[10]=p,t[11]=0,t[12]=-(u*v+i*y+o*b),t[13]=-(c*v+s*y+l*b),t[14]=-(h*v+d*y+p*b),t[15]=1,t)},f.str=function(t){return"mat4("+t[0]+", "+t[1]+", "+t[2]+", "+t[3]+", "+t[4]+", "+t[5]+", "+t[6]+", "+t[7]+", "+t[8]+", "+t[9]+", "+t[10]+", "+t[11]+", "+t[12]+", "+t[13]+", "+t[14]+", "+t[15]+")"},"undefined"!=typeof t&&(t.mat4=f);var l={},h=new Float32Array([0,0,0,1]);if(!r)var r=1e-6;l.create=function(){return new Float32Array(h)},l.clone=a.clone,l.fromValues=a.fromValues,l.copy=a.copy,l.set=a.set,l.identity=function(t){return t[0]=0,t[1]=0,t[2]=0,t[3]=1,t},l.setAxisAngle=function(t,n,r){r=.5*r;var e=Math.sin(r);return t[0]=e*n[0],t[1]=e*n[1],t[2]=e*n[2],t[3]=Math.cos(r),t},l.add=a.add,l.mul=l.multiply=function(t,n,r){var e=n[0],a=n[1],u=n[2],i=n[3],o=r[0],c=r[1],f=r[2],s=r[3];return t[0]=e*s+i*o+a*f-u*c,t[1]=a*s+i*c+u*o-e*f,t[2]=u*s+i*f+e*c-a*o,t[3]=i*s-e*o-a*c-u*f,t},l.scale=a.scale,l.rotateX=function(t,n,r){r*=.5;var e=n[0],a=n[1],u=n[2],i=n[3],o=Math.sin(r),c=Math.cos(r);return t[0]=e*c+i*o,t[1]=a*c+u*o,t[2]=u*c-a*o,t[3]=i*c-e*o,t},l.rotateY=function(t,n,r){r*=.5;var e=n[0],a=n[1],u=n[2],i=n[3],o=Math.sin(r),c=Math.cos(r);return t[0]=e*c-u*o,t[1]=a*c+i*o,t[2]=u*c+e*o,t[3]=i*c-a*o,t},l.rotateZ=function(t,n,r){r*=.5;var e=n[0],a=n[1],u=n[2],i=n[3],o=Math.sin(r),c=Math.cos(r);return t[0]=e*c+a*o,t[1]=a*c-e*o,t[2]=u*c+i*o,t[3]=i*c-u*o,t},l.calculateW=function(t,n){var r=n[0],e=n[1],a=n[2];return t[0]=r,t[1]=e,t[2]=a,t[3]=-Math.sqrt(Math.abs(1-r*r-e*e-a*a)),t},l.dot=a.dot,l.lerp=a.lerp,l.slerp=function(t,n,r,e){var a,u,i,o,c=n[0],f=n[1],s=n[2],l=n[3],h=r[0],d=r[1],p=r[2],m=n[3],v=c*h+f*d+s*p+l*m;return Math.abs(v)>=1?(t!==n&&(t[0]=c,t[1]=f,t[2]=s,t[3]=l),t):(a=Math.acos(v),u=Math.sqrt(1-v*v),Math.abs(u)<.001?(t[0]=.5*c+.5*h,t[1]=.5*f+.5*d,t[2]=.5*s+.5*p,t[3]=.5*l+.5*m,t):(i=Math.sin((1-e)*a)/u,o=Math.sin(e*a)/u,t[0]=c*i+h*o,t[1]=f*i+d*o,t[2]=s*i+p*o,t[3]=l*i+m*o,t))},l.invert=function(t,n){var r=n[0],e=n[1],a=n[2],u=n[3],i=r*r+e*e+a*a+u*u,o=i?1/i:0;return t[0]=-r*o,t[1]=-e*o,t[2]=-a*o,t[3]=u*o,t},l.conjugate=function(t,n){return t[0]=-n[0],t[1]=-n[1],t[2]=-n[2],t[3]=n[3],t},l.len=l.length=a.length,l.sqrLen=l.squaredLength=a.squaredLength,l.normalize=a.normalize,l.str=function(t){return"quat("+t[0]+", "+t[1]+", "+t[2]+", "+t[3]+")"},"undefined"!=typeof t&&(t.quat=l)}(t.exports)}();
  //# sourceMappingURL=gl-matrix.js.map
  global.define = __define;
  return module.exports;
});

System.register("npm:uniq@1.0.1/uniq", [], true, function(require, exports, __moduleName) {
  var global = System.global;
  var __define = global.define;
  global.define = undefined;
  var module = { exports: exports };
  var process = System.get("@@nodeProcess")["default"];
    var __filename = "jspm_packages/npm/uniq@1.0.1/uniq.js";
    var __dirname = "jspm_packages/npm/uniq@1.0.1";
  "format cjs";"use strict";function unique_pred(e,t){for(var r=1,n=e.length,i=e[0],o=e[0],a=1;n>a;++a)if(o=i,i=e[a],t(i,o)){if(a===r){r++;continue}e[r++]=i}return e.length=r,e}function unique_eq(e){for(var t=1,r=e.length,n=e[0],i=e[0],o=1;r>o;++o,i=n)if(i=n,n=e[o],n!==i){if(o===t){t++;continue}e[t++]=n}return e.length=t,e}function unique(e,t,r){return 0===e.length?e:t?(r||e.sort(t),unique_pred(e,t)):(r||e.sort(),unique_eq(e))}module.exports=unique;
  //# sourceMappingURL=uniq.js.map
  global.define = __define;
  return module.exports;
});

System.register("github:jspm/nodelibs@0.0.2/fs", [], true, function(require, exports, __moduleName) {
  var global = System.global;
  var __define = global.define;
  global.define = undefined;
  var module = { exports: exports };
  var process = System.get("@@nodeProcess")["default"];
    var __filename = "jspm_packages/github/jspm/nodelibs@0.0.2/fs.js";
    var __dirname = "jspm_packages/github/jspm/nodelibs@0.0.2";
  "format cjs";exports.readFileSync=function(e){var t,n=new XMLHttpRequest;return n.open("GET",e,!1),n.onreadystatechange=function(){if(4==n.readyState){var r=n.status;if(r>399&&600>r||400==r)throw"File read error on "+e;t=n.responseText}},n.send(null),t};
  //# sourceMappingURL=fs.js.map
  global.define = __define;
  return module.exports;
});

System.register("npm:base64-js@0.0.4/lib/b64", [], true, function(require, exports, __moduleName) {
  var global = System.global;
  var __define = global.define;
  global.define = undefined;
  var module = { exports: exports };
  var process = System.get("@@nodeProcess")["default"];
    var __filename = "jspm_packages/npm/base64-js@0.0.4/lib/b64.js";
    var __dirname = "jspm_packages/npm/base64-js@0.0.4/lib";
  "format cjs";!function(){"use strict";function e(e){var t,r,o,i,a,l;if(e.length%4>0)throw"Invalid string. Length must be a multiple of 4";for(a=e.indexOf("="),a=a>0?e.length-a:0,l=[],o=a>0?e.length-4:e.length,t=0,r=0;o>t;t+=4,r+=3)i=n.indexOf(e[t])<<18|n.indexOf(e[t+1])<<12|n.indexOf(e[t+2])<<6|n.indexOf(e[t+3]),l.push((16711680&i)>>16),l.push((65280&i)>>8),l.push(255&i);return 2===a?(i=n.indexOf(e[t])<<2|n.indexOf(e[t+1])>>4,l.push(255&i)):1===a&&(i=n.indexOf(e[t])<<10|n.indexOf(e[t+1])<<4|n.indexOf(e[t+2])>>2,l.push(i>>8&255),l.push(255&i)),l}function t(e){function t(e){return n[e>>18&63]+n[e>>12&63]+n[e>>6&63]+n[63&e]}var r,o,i,a=e.length%3,l="";for(r=0,i=e.length-a;i>r;r+=3)o=(e[r]<<16)+(e[r+1]<<8)+e[r+2],l+=t(o);switch(a){case 1:o=e[e.length-1],l+=n[o>>2],l+=n[o<<4&63],l+="==";break;case 2:o=(e[e.length-2]<<8)+e[e.length-1],l+=n[o>>10],l+=n[o>>4&63],l+=n[o<<2&63],l+="="}return l}var n="ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/";module.exports.toByteArray=e,module.exports.fromByteArray=t}();
  //# sourceMappingURL=b64.js.map
  global.define = __define;
  return module.exports;
});

System.register("npm:ieee754@1.1.3/index", [], true, function(require, exports, __moduleName) {
  var global = System.global;
  var __define = global.define;
  global.define = undefined;
  var module = { exports: exports };
  var process = System.get("@@nodeProcess")["default"];
    var __filename = "jspm_packages/npm/ieee754@1.1.3/index.js";
    var __dirname = "jspm_packages/npm/ieee754@1.1.3";
  "format cjs";exports.read=function(e,t,n,r,o){var i,a,l=8*o-r-1,s=(1<<l)-1,u=s>>1,c=-7,f=n?o-1:0,p=n?-1:1,m=e[t+f];for(f+=p,i=m&(1<<-c)-1,m>>=-c,c+=l;c>0;i=256*i+e[t+f],f+=p,c-=8);for(a=i&(1<<-c)-1,i>>=-c,c+=r;c>0;a=256*a+e[t+f],f+=p,c-=8);if(0===i)i=1-u;else{if(i===s)return a?0/0:1/0*(m?-1:1);a+=Math.pow(2,r),i-=u}return(m?-1:1)*a*Math.pow(2,i-r)},exports.write=function(e,t,n,r,o,i){var a,l,s,u=8*i-o-1,c=(1<<u)-1,f=c>>1,p=23===o?Math.pow(2,-24)-Math.pow(2,-77):0,m=r?0:i-1,d=r?1:-1,h=0>t||0===t&&0>1/t?1:0;for(t=Math.abs(t),isNaN(t)||1/0===t?(l=isNaN(t)?1:0,a=c):(a=Math.floor(Math.log(t)/Math.LN2),t*(s=Math.pow(2,-a))<1&&(a--,s*=2),t+=a+f>=1?p/s:p*Math.pow(2,1-f),t*s>=2&&(a++,s/=2),a+f>=c?(l=0,a=c):a+f>=1?(l=(t*s-1)*Math.pow(2,o),a+=f):(l=t*Math.pow(2,f-1)*Math.pow(2,o),a=0));o>=8;e[n+m]=255&l,m+=d,l/=256,o-=8);for(a=a<<o|l,u+=o;u>0;e[n+m]=255&a,m+=d,a/=256,u-=8);e[n+m-d]|=128*h};
  //# sourceMappingURL=index.js.map
  global.define = __define;
  return module.exports;
});

System.register("npm:glsl-tokenizer@0.0.8/lib/literals", [], true, function(require, exports, __moduleName) {
  var global = System.global;
  var __define = global.define;
  global.define = undefined;
  var module = { exports: exports };
  var process = System.get("@@nodeProcess")["default"];
    var __filename = "jspm_packages/npm/glsl-tokenizer@0.0.8/lib/literals.js";
    var __dirname = "jspm_packages/npm/glsl-tokenizer@0.0.8/lib";
  "format cjs";module.exports=["precision","highp","mediump","lowp","attribute","const","uniform","varying","break","continue","do","for","while","if","else","in","out","inout","float","int","void","bool","true","false","discard","return","mat2","mat3","mat4","vec2","vec3","vec4","ivec2","ivec3","ivec4","bvec2","bvec3","bvec4","sampler1D","sampler2D","sampler3D","samplerCube","sampler1DShadow","sampler2DShadow","struct","asm","class","union","enum","typedef","template","this","packed","goto","switch","default","inline","noinline","volatile","public","static","extern","external","interface","long","short","double","half","fixed","unsigned","input","output","hvec2","hvec3","hvec4","dvec2","dvec3","dvec4","fvec2","fvec3","fvec4","sampler2DRect","sampler3DRect","sampler2DRectShadow","sizeof","cast","namespace","using"];
  //# sourceMappingURL=literals.js.map
  global.define = __define;
  return module.exports;
});

System.register("npm:glsl-tokenizer@0.0.8/lib/operators", [], true, function(require, exports, __moduleName) {
  var global = System.global;
  var __define = global.define;
  global.define = undefined;
  var module = { exports: exports };
  var process = System.get("@@nodeProcess")["default"];
    var __filename = "jspm_packages/npm/glsl-tokenizer@0.0.8/lib/operators.js";
    var __dirname = "jspm_packages/npm/glsl-tokenizer@0.0.8/lib";
  "format cjs";module.exports=["<<=",">>=","++","--","<<",">>","<=",">=","==","!=","&&","||","+=","-=","*=","/=","%=","&=","^=","|=","(",")","[","]",".","!","~","*","/","%","+","-","<",">","&","^","|","?",":","=",",",";","{","}"];
  //# sourceMappingURL=operators.js.map
  global.define = __define;
  return module.exports;
});

System.register("npm:glsl-tokenizer@0.0.8/lib/builtins", [], true, function(require, exports, __moduleName) {
  var global = System.global;
  var __define = global.define;
  global.define = undefined;
  var module = { exports: exports };
  var process = System.get("@@nodeProcess")["default"];
    var __filename = "jspm_packages/npm/glsl-tokenizer@0.0.8/lib/builtins.js";
    var __dirname = "jspm_packages/npm/glsl-tokenizer@0.0.8/lib";
  "format cjs";module.exports=["gl_Position","gl_PointSize","gl_ClipVertex","gl_FragCoord","gl_FrontFacing","gl_FragColor","gl_FragData","gl_FragDepth","gl_Color","gl_SecondaryColor","gl_Normal","gl_Vertex","gl_MultiTexCoord0","gl_MultiTexCoord1","gl_MultiTexCoord2","gl_MultiTexCoord3","gl_MultiTexCoord4","gl_MultiTexCoord5","gl_MultiTexCoord6","gl_MultiTexCoord7","gl_FogCoord","gl_MaxLights","gl_MaxClipPlanes","gl_MaxTextureUnits","gl_MaxTextureCoords","gl_MaxVertexAttribs","gl_MaxVertexUniformComponents","gl_MaxVaryingFloats","gl_MaxVertexTextureImageUnits","gl_MaxCombinedTextureImageUnits","gl_MaxTextureImageUnits","gl_MaxFragmentUniformComponents","gl_MaxDrawBuffers","gl_ModelViewMatrix","gl_ProjectionMatrix","gl_ModelViewProjectionMatrix","gl_TextureMatrix","gl_NormalMatrix","gl_ModelViewMatrixInverse","gl_ProjectionMatrixInverse","gl_ModelViewProjectionMatrixInverse","gl_TextureMatrixInverse","gl_ModelViewMatrixTranspose","gl_ProjectionMatrixTranspose","gl_ModelViewProjectionMatrixTranspose","gl_TextureMatrixTranspose","gl_ModelViewMatrixInverseTranspose","gl_ProjectionMatrixInverseTranspose","gl_ModelViewProjectionMatrixInverseTranspose","gl_TextureMatrixInverseTranspose","gl_NormalScale","gl_DepthRangeParameters","gl_DepthRange","gl_ClipPlane","gl_PointParameters","gl_Point","gl_MaterialParameters","gl_FrontMaterial","gl_BackMaterial","gl_LightSourceParameters","gl_LightSource","gl_LightModelParameters","gl_LightModel","gl_LightModelProducts","gl_FrontLightModelProduct","gl_BackLightModelProduct","gl_LightProducts","gl_FrontLightProduct","gl_BackLightProduct","gl_FogParameters","gl_Fog","gl_TextureEnvColor","gl_EyePlaneS","gl_EyePlaneT","gl_EyePlaneR","gl_EyePlaneQ","gl_ObjectPlaneS","gl_ObjectPlaneT","gl_ObjectPlaneR","gl_ObjectPlaneQ","gl_FrontColor","gl_BackColor","gl_FrontSecondaryColor","gl_BackSecondaryColor","gl_TexCoord","gl_FogFragCoord","gl_Color","gl_SecondaryColor","gl_TexCoord","gl_FogFragCoord","gl_PointCoord","radians","degrees","sin","cos","tan","asin","acos","atan","pow","exp","log","exp2","log2","sqrt","inversesqrt","abs","sign","floor","ceil","fract","mod","min","max","clamp","mix","step","smoothstep","length","distance","dot","cross","normalize","faceforward","reflect","refract","matrixCompMult","lessThan","lessThanEqual","greaterThan","greaterThanEqual","equal","notEqual","any","all","not","texture2D","texture2DProj","texture2DLod","texture2DProjLod","textureCube","textureCubeLod"];
  //# sourceMappingURL=builtins.js.map
  global.define = __define;
  return module.exports;
});

System.register("npm:glsl-parser@0.0.5/lib/expr", [], true, function(require, exports, __moduleName) {
  var global = System.global;
  var __define = global.define;
  global.define = undefined;
  var module = { exports: exports };
  var process = System.get("@@nodeProcess")["default"];
    var __filename = "jspm_packages/npm/glsl-parser@0.0.5/lib/expr.js";
    var __dirname = "jspm_packages/npm/glsl-parser@0.0.5/lib";
  "format cjs";function itself(){return this}function symbol(e,t){var n=symbol_table[e];return t=t||0,n?t>n.lbp&&(n.lbp=t):(n=Object.create(original_symbol),n.id=e,n.lbp=t,symbol_table[e]=n),n}function expression(e){var t,n=token;for(advance(),t=n.nud();e<token.lbp;)n=token,advance(),t=n.led(t);return t}function infix(e,t,n){var r=symbol(e,t);r.led=n||function(e){return this.children=[e,expression(t)],this.type="binary",this}}function infixr(e,t,n){var r=symbol(e,t);return r.led=n||function(e){return this.children=[e,expression(t-1)],this.type="binary",this},r}function prefix(e,t){var n=symbol(e);return n.nud=t||function(){return this.children=[expression(70)],this.type="unary",this},n}function suffix(e){var t=symbol(e,150);t.led=function(e){return this.children=[e],this.type="suffix",this}}function assignment(e){return infixr(e,10,function(e){return this.children=[e,expression(9)],this.assignment=!0,this.type="assign",this})}function advance(e){var t,n,r,o;if(e&&token.data!==e)return state.unexpected("expected `"+e+"`, got `"+token.data+"`");if(idx>=tokens.length)return void(token=symbol_table["(end)"]);if(t=tokens[idx++],n=t.data,r=t.type,"ident"===r)o=state.scope.find(n)||state.create_node(),r=o.type;else if("builtin"===r)o=symbol_table["(builtin)"];else if("keyword"===r)o=symbol_table["(keyword)"];else if("operator"===r){if(o=symbol_table[n],!o)return state.unexpected("unknown operator `"+n+"`")}else{if("float"!==r&&"integer"!==r)return state.unexpected("unexpected token.");r="literal",o=symbol_table["(literal)"]}return o&&(o.nud||(o.nud=itself),o.children||(o.children=[])),o=Object.create(o),o.token=t,o.type=r,o.data||(o.data=n),token=o}function fail(e){return function(){return state.unexpected(e)}}var state,token,tokens,idx,original_symbol={nud:function(){return this.children&&this.children.length?this:fail("unexpected")()},led:fail("missing operator")},symbol_table={};symbol("(ident)").nud=itself,symbol("(keyword)").nud=itself,symbol("(builtin)").nud=itself,symbol("(literal)").nud=itself,symbol("(end)"),symbol(":"),symbol(";"),symbol(","),symbol(")"),symbol("]"),symbol("}"),infixr("&&",30),infixr("||",30),infix("|",43),infix("^",44),infix("&",45),infix("==",46),infix("!=",46),infix("<",47),infix("<=",47),infix(">",47),infix(">=",47),infix(">>",48),infix("<<",48),infix("+",50),infix("-",50),infix("*",60),infix("/",60),infix("%",60),infix("?",20,function(e){return this.children=[e,expression(0),(advance(":"),expression(0))],this.type="ternary",this}),infix(".",80,function(e){return token.type="literal",state.fake(token),this.children=[e,token],advance(),this}),infix("[",80,function(e){return this.children=[e,expression(0)],this.type="binary",advance("]"),this}),infix("(",80,function(e){if(this.children=[e],this.type="call",")"!==token.data)for(;;){if(this.children.push(expression(0)),","!==token.data)break;advance(",")}return advance(")"),this}),prefix("-"),prefix("+"),prefix("!"),prefix("~"),prefix("defined"),prefix("(",function(){return this.type="group",this.children=[expression(0)],advance(")"),this}),prefix("++"),prefix("--"),suffix("++"),suffix("--"),assignment("="),assignment("+="),assignment("-="),assignment("*="),assignment("/="),assignment("%="),assignment("&="),assignment("|="),assignment("^="),assignment(">>="),assignment("<<="),module.exports=function(e,t){function n(e){state.unshift(e,!1);for(var t=0,r=e.children.length;r>t;++t)n(e.children[t]);state.shift()}state=e,tokens=t,idx=0;var r;if(tokens.length){if(advance(),r=expression(0),r.parent=state[0],n(r),idx<tokens.length)throw new Error("did not use all tokens");r.parent.children=[r]}};
  //# sourceMappingURL=expr.js.map
  global.define = __define;
  return module.exports;
});

System.register("npm:glsl-parser@0.0.5/lib/scope", [], true, function(require, exports, __moduleName) {
  var global = System.global;
  var __define = global.define;
  global.define = undefined;
  var module = { exports: exports };
  var process = System.get("@@nodeProcess")["default"];
    var __filename = "jspm_packages/npm/glsl-parser@0.0.5/lib/scope.js";
    var __dirname = "jspm_packages/npm/glsl-parser@0.0.5/lib";
  "format cjs";function scope(e){return this.constructor!==scope?new scope(e):(this.state=e,this.scopes=[],void(this.current=null))}module.exports=scope;var cons=scope,proto=cons.prototype;proto.enter=function(e){this.scopes.push(this.current=this.state[0].scope=e||{})},proto.exit=function(){this.scopes.pop(),this.current=this.scopes[this.scopes.length-1]},proto.define=function(e){this.current[e]=this.state[0]},proto.find=function(e){for(var t=this.scopes.length-1;t>-1;--t)if(this.scopes[t].hasOwnProperty(e))return this.scopes[t][e];return null};
  //# sourceMappingURL=scope.js.map
  global.define = __define;
  return module.exports;
});

System.register("npm:cwise-compiler@0.0.0/lib/compile", ["uniq"], true, function(require, exports, __moduleName) {
  var global = System.global;
  var __define = global.define;
  global.define = undefined;
  var module = { exports: exports };
  var process = System.get("@@nodeProcess")["default"];
    var __filename = "jspm_packages/npm/cwise-compiler@0.0.0/lib/compile.js";
    var __dirname = "jspm_packages/npm/cwise-compiler@0.0.0/lib";
  "format cjs";"use strict";function innerFill(e,t,n){var r,o,i=e.length,a=t.arrayArgs.length,s=t.indexArgs.length>0,u=[],c=[],l=0,f=0;for(r=0;i>r;++r)c.push(["i",r,"=0"].join(""));for(o=0;a>o;++o)for(r=0;i>r;++r)f=l,l=e[r],c.push(0===r?["d",o,"s",r,"=t",o,"[",l,"]"].join(""):["d",o,"s",r,"=(t",o,"[",l,"]-s",f,"*t",o,"[",f,"])"].join(""));for(u.push("var "+c.join(",")),r=i-1;r>=0;--r)l=e[r],u.push(["for(i",r,"=0;i",r,"<s",l,";++i",r,"){"].join(""));for(u.push(n),r=0;i>r;++r){for(f=l,l=e[r],o=0;a>o;++o)u.push(["p",o,"+=d",o,"s",r].join(""));s&&(r>0&&u.push(["index[",f,"]-=s",f].join("")),u.push(["++index[",l,"]"].join(""))),u.push("}")}return u.join("\n")}function outerFill(e,t,n,r){for(var o=t.length,i=n.arrayArgs.length,a=n.blockSize,s=n.indexArgs.length>0,u=[],c=0;i>c;++c)u.push(["var offset",c,"=p",c].join(""));for(var c=e;o>c;++c)u.push(["for(var j"+c+"=SS[",t[c],"]|0;j",c,">0;){"].join("")),u.push(["if(j",c,"<",a,"){"].join("")),u.push(["s",t[c],"=j",c].join("")),u.push(["j",c,"=0"].join("")),u.push(["}else{s",t[c],"=",a].join("")),u.push(["j",c,"-=",a,"}"].join("")),s&&u.push(["index[",t[c],"]=j",c].join(""));for(var c=0;i>c;++c){for(var l=["offset"+c],f=e;o>f;++f)l.push(["j",f,"*t",c,"[",t[f],"]"].join(""));u.push(["p",c,"=(",l.join("+"),")"].join(""))}u.push(innerFill(t,n,r));for(var c=e;o>c;++c)u.push("}");return u.join("\n")}function countMatches(e){for(var t=0,n=e[0].length;n>t;){for(var r=1;r<e.length;++r)if(e[r][t]!==e[0][t])return t;++t}return t}function processBlock(e,t,n){for(var r=e.body,o=[],i=[],a=0;a<e.args.length;++a){var s=e.args[a];if(!(s.count<=0)){var u=new RegExp(s.name,"g");switch(t.argTypes[a]){case"array":var c=t.arrayArgs.indexOf(a);1===s.count?"generic"===n[c]?s.lvalue?(o.push(["var l",c,"=a",c,".get(p",c,")"].join("")),r=r.replace(u,"l"+c),i.push(["a",c,".set(p",c,",l",c,")"].join(""))):r=r.replace(u,["a",c,".get(p",c,")"].join("")):r=r.replace(u,["a",c,"[p",c,"]"].join("")):"generic"===n[c]?(o.push(["var l",c,"=a",c,".get(p",c,")"].join("")),r=r.replace(u,"l"+c),s.lvalue&&i.push(["a",c,".set(p",c,",l",c,")"].join(""))):(o.push(["var l",c,"=a",c,"[p",c,"]"].join("")),r=r.replace(u,"l"+c),s.lvalue&&i.push(["a",c,"[p",c,"]=l",c].join("")));break;case"scalar":r=r.replace(u,"Y"+t.scalarArgs.indexOf(a));break;case"index":r=r.replace(u,"index");break;case"shape":r=r.replace(u,"shape")}}}return[o.join("\n"),r,i.join("\n")].join("\n").trim()}function typeSummary(e){for(var t=new Array(e.length),n=!0,r=0;r<e.length;++r){var o=e[r],i=o.match(/\d+/);i=i?i[0]:"",t[r]=0===o.charAt(0)?"u"+o.charAt(1)+i:o.charAt(0)+i,r>0&&(n=n&&t[r]===t[r-1])}return n?t[0]:t.join("")}function generateCWiseOp(e,t){for(var n=0|t[1].length,r=new Array(e.arrayArgs.length),o=new Array(e.arrayArgs.length),i=["SS"],a=["'use strict'"],s=[],u=0;n>u;++u)s.push(["s",u,"=SS[",u,"]"].join(""));for(var c=0;c<e.arrayArgs.length;++c)i.push("a"+c),i.push("t"+c),i.push("p"+c),o[c]=t[2*c],r[c]=t[2*c+1];for(var c=0;c<e.scalarArgs.length;++c)i.push("Y"+c);if(e.shapeArgs.length>0&&s.push("shape=SS.slice(0)"),e.indexArgs.length>0){for(var l=new Array(n),c=0;n>c;++c)l[c]="0";s.push(["index=[",l.join(","),"]"].join(""))}var f=uniq([].concat(e.pre.thisVars).concat(e.body.thisVars).concat(e.post.thisVars));s=s.concat(f),a.push("var "+s.join(","));for(var c=0;c<e.arrayArgs.length;++c)a.push("p"+c+"|=0");e.pre.body.length>3&&a.push(processBlock(e.pre,e,o));var h=processBlock(e.body,e,o),p=countMatches(r);a.push(n>p?outerFill(p,r[0],e,h):innerFill(r[0],e,h)),e.post.body.length>3&&a.push(processBlock(e.post,e,o)),e.debug&&console.log("Generated cwise routine for ",t,":\n\n",a.join("\n"));var d=[e.funcName||"unnamed","_cwise_loop_",r[0].join("s"),"m",p,typeSummary(o)].join(""),m=new Function(["function ",d,"(",i.join(","),"){",a.join("\n"),"} return ",d].join(""));return m()}var uniq=require("uniq");module.exports=generateCWiseOp;
  //# sourceMappingURL=compile.js.map
  global.define = __define;
  return module.exports;
});

System.register("npm:ndarray-scratch@0.0.1/scratch", ["ndarray","typedarray-pool"], true, function(require, exports, __moduleName) {
  var global = System.global;
  var __define = global.define;
  global.define = undefined;
  var module = { exports: exports };
  var process = System.get("@@nodeProcess")["default"];
    var __filename = "jspm_packages/npm/ndarray-scratch@0.0.1/scratch.js";
    var __dirname = "jspm_packages/npm/ndarray-scratch@0.0.1";
  "format cjs";"use strict";function malloc(e,t){t||(t="double");for(var r=1,n=new Array(e.length),i=e.length-1;i>=0;--i)n[i]=r,r*=e[i];return ndarray(pool.malloc(r,t),e,n,0)}function free(e){pool.free(e.data)}var ndarray=require("ndarray"),pool=require("typedarray-pool");exports.malloc=malloc,exports.free=free;
  //# sourceMappingURL=scratch.js.map
  global.define = __define;
  return module.exports;
});

System.register("npm:gl-buffer@0.1.2/buffer", ["typedarray-pool","ndarray-ops","ndarray"], true, function(require, exports, __moduleName) {
  var global = System.global;
  var __define = global.define;
  global.define = undefined;
  var module = { exports: exports };
  var process = System.get("@@nodeProcess")["default"];
    var __filename = "jspm_packages/npm/gl-buffer@0.1.2/buffer.js";
    var __dirname = "jspm_packages/npm/gl-buffer@0.1.2";
  "format cjs";"use strict";function GLBuffer(e,r,t,a,i){this.gl=e,this.type=r,this.handle=t,this.length=a,this.usage=i}function updateTypeArray(e,r,t,a,i,s){if(0>=s&&i.length>t)return e.bufferData(r,i,a),i.length;if(i.length+s>t)throw new Error("gl-buffer: If resizing buffer, offset must be 0");return e.bufferSubData(r,s,i),t}function makeScratchTypeArray(e,r){for(var t=pool.malloc(e.length,r),a=e.length,i=0;a>i;++i)t[i]=e[i];return t}function createBuffer(e,r,t,a){void 0===t&&(t=r,r=e.ARRAY_BUFFER),a||(a=e.DYNAMIC_DRAW);var i=0,s=e.createBuffer();if(e.bindBuffer(r,s),"number"==typeof t)e.bufferData(r,t,a),i=t;else if(t instanceof Array)r===e.ELEMENT_ARRAY_BUFFER?e.bufferData(r,new Uint16Array(t),a):e.bufferData(r,new Float32Array(t),a),i=t.length;else if(t.length)e.bufferData(r,t,a),i=t.length;else{if(!t.shape)throw new Error("gl-buffer: Invalid format for buffer data");var f=t.dtype;if(("float64"===f||"array"===f||"generic"===f)&&(f="float32"),r===e.ELEMENT_ARRAY_BUFFER&&(f="uint16"),1!==t.shape.length)throw new Error("gl-buffer: Array shape must be 1D");var i=t.shape[0];if(f===t.type&&1===t.stride[0])e.bufferData(r,t.data.subarray(t.offset,t.offset+i),a);else{var n=pool.malloc(t.shape[0],f),l=ndarray(n);ops.assign(l,t),e.bufferData(r,n,a),pool.free(n)}}if(r!==e.ARRAY_BUFFER&&r!==e.ELEMENT_ARRAY_BUFFER)throw new Error("gl-buffer: Invalid type for webgl buffer");if(a!==e.DYNAMIC_DRAW&&a!==e.STATIC_DRAW&&a!==e.STREAM_DRAW)throw new Error("gl-buffer: Invalid usage for buffer");return new GLBuffer(e,r,s,i,a)}var pool=require("typedarray-pool"),ops=require("ndarray-ops"),ndarray=require("ndarray");GLBuffer.prototype.bind=function(){this.gl.bindBuffer(this.type,this.handle)},GLBuffer.prototype.dispose=function(){this.gl.deleteBuffer(this.handle)},GLBuffer.prototype.update=function(e,r){if(r||(r=0),this.bind(),"number"==typeof e){if(r>0)throw new Error("gl-buffer: Cannot specify offset when resizing buffer");this.gl.bufferData(this.type,e,this.usage),this.length=e}else if(e.shape){var t=e.dtype;if(("float64"===t||"array"===t||"generic"===t)&&(t="float32"),this.type===this.gl.ELEMENT_ARRAY_BUFFER&&(t="uint16"),1!==e.shape.length)throw new Error("gl-buffer: Array length must be 1");if(t===e.dtype&&1===e.stride[0])this.length=0===e.offset&&e.data.length===e.shape[0]?updateTypeArray(this.gl,this.type,this.length,this.usage,e.data,r):updateTypeArray(this.gl,this.type,this.length,this.usage,e.data.subarray(e.offset,e.shape[0]),r);else{var a=pool.malloc(e.shape[0],t),i=ndarray(a);ops.assign(i,e),this.length=updateTypeArray(this.gl,this.type,this.length,this.usage,a,r),pool.free(a)}}else if(Array.isArray(e))if(this.type===this.gl.ELEMENT_ARRAY_BUFFER){var s=makeScratchTypeArray(e,"uint16");this.length=updateTypeArray(this.gl,this.type,this.length,this.usage,s.subarray(0,e.length),r),pool.freeUint16(s)}else{var s=makeScratchTypeArray(e,"float32");this.length=updateTypeArray(this.gl,this.type,this.length,this.usage,s.subarray(0,e.length),r),pool.freeFloat32(s)}else this.length=updateTypeArray(this.gl,this.type,this.length,this.usage,e,r)},GLBuffer.prototype.draw=function(e,r,t){t=t||0;var a=this.gl;if(this.type===a.ARRAY_BUFFER)a.drawArrays(e,t,r);else{if(this.type!==a.ELEMENT_ARRAY_BUFFER)throw new Error("Invalid type for WebGL buffer");this.bind(),a.drawElements(e,r,a.UNSIGNED_SHORT,t)}},module.exports=createBuffer;
  //# sourceMappingURL=buffer.js.map
  global.define = __define;
  return module.exports;
});

System.register("npm:gl-vao@0.0.3/lib/vao-emulated", ["./do-bind"], true, function(require, exports, __moduleName) {
  var global = System.global;
  var __define = global.define;
  global.define = undefined;
  var module = { exports: exports };
  var process = System.get("@@nodeProcess")["default"];
    var __filename = "jspm_packages/npm/gl-vao@0.0.3/lib/vao-emulated.js";
    var __dirname = "jspm_packages/npm/gl-vao@0.0.3/lib";
  "format cjs";"use strict";function VAOEmulated(e){this.gl=e,this.elements=null,this.attributes=null}function createVAOEmulated(e){return new VAOEmulated(e)}var bindAttribs=require("./do-bind");VAOEmulated.prototype.bind=function(){bindAttribs(this.gl,this.elements,this.attributes)},VAOEmulated.prototype.update=function(e,t){this.elements=e,this.attributes=t},VAOEmulated.prototype.dispose=function(){},VAOEmulated.prototype.unbind=function(){},module.exports=createVAOEmulated;
  //# sourceMappingURL=vao-emulated.js.map
  global.define = __define;
  return module.exports;
});

System.register("npm:ndarray-fill@0.1.0/index", ["cwise"], true, function(require, exports, __moduleName) {
  var global = System.global;
  var __define = global.define;
  global.define = undefined;
  var module = { exports: exports };
  var process = System.get("@@nodeProcess")["default"];
    var __filename = "jspm_packages/npm/ndarray-fill@0.1.0/index.js";
    var __dirname = "jspm_packages/npm/ndarray-fill@0.1.0";
  "format cjs";"use strict";var fill=require("cwise")({args:["index","array","scalar"],body:function(t,e,n){e=n.apply(void 0,t)}});module.exports=function(t,e){return fill(t,e),t};
  //# sourceMappingURL=index.js.map
  global.define = __define;
  return module.exports;
});

System.register("npm:cwise-compiler@0.1.0/lib/compile", ["uniq"], true, function(require, exports, __moduleName) {
  var global = System.global;
  var __define = global.define;
  global.define = undefined;
  var module = { exports: exports };
  var process = System.get("@@nodeProcess")["default"];
    var __filename = "jspm_packages/npm/cwise-compiler@0.1.0/lib/compile.js";
    var __dirname = "jspm_packages/npm/cwise-compiler@0.1.0/lib";
  "format cjs";"use strict";function innerFill(t,e,n){var o,r,i=t.length,a=e.arrayArgs.length,u=e.indexArgs.length>0,c=[],s=[],l=0,f=0;for(o=0;i>o;++o)s.push(["i",o,"=0"].join(""));for(r=0;a>r;++r)for(o=0;i>o;++o)f=l,l=t[o],s.push(0===o?["d",r,"s",o,"=t",r,"[",l,"]"].join(""):["d",r,"s",o,"=(t",r,"[",l,"]-s",f,"*t",r,"[",f,"])"].join(""));for(c.push("var "+s.join(",")),o=i-1;o>=0;--o)l=t[o],c.push(["for(i",o,"=0;i",o,"<s",l,";++i",o,"){"].join(""));for(c.push(n),o=0;i>o;++o){for(f=l,l=t[o],r=0;a>r;++r)c.push(["p",r,"+=d",r,"s",o].join(""));u&&(o>0&&c.push(["index[",f,"]-=s",f].join("")),c.push(["++index[",l,"]"].join(""))),c.push("}")}return c.join("\n")}function outerFill(t,e,n,o){for(var r=e.length,i=n.arrayArgs.length,a=n.blockSize,u=n.indexArgs.length>0,c=[],s=0;i>s;++s)c.push(["var offset",s,"=p",s].join(""));for(var s=t;r>s;++s)c.push(["for(var j"+s+"=SS[",e[s],"]|0;j",s,">0;){"].join("")),c.push(["if(j",s,"<",a,"){"].join("")),c.push(["s",e[s],"=j",s].join("")),c.push(["j",s,"=0"].join("")),c.push(["}else{s",e[s],"=",a].join("")),c.push(["j",s,"-=",a,"}"].join("")),u&&c.push(["index[",e[s],"]=j",s].join(""));for(var s=0;i>s;++s){for(var l=["offset"+s],f=t;r>f;++f)l.push(["j",f,"*t",s,"[",e[f],"]"].join(""));c.push(["p",s,"=(",l.join("+"),")"].join(""))}c.push(innerFill(e,n,o));for(var s=t;r>s;++s)c.push("}");return c.join("\n")}function countMatches(t){for(var e=0,n=t[0].length;n>e;){for(var o=1;o<t.length;++o)if(t[o][e]!==t[0][e])return e;++e}return e}function processBlock(t,e,n){for(var o=t.body,r=[],i=[],a=0;a<t.args.length;++a){var u=t.args[a];if(!(u.count<=0)){var c=new RegExp(u.name,"g"),s="",l=e.arrayArgs.indexOf(a);switch(e.argTypes[a]){case"offset":var f=e.offsetArgIndex.indexOf(a),h=e.offsetArgs[f];l=h.array,s="+q"+f;case"array":s="p"+l+s;var d="l"+a,p="a"+l;1===u.count?"generic"===n[l]?u.lvalue?(r.push(["var ",d,"=",p,".get(",s,")"].join("")),o=o.replace(c,d),i.push([p,".set(",s,",",d,")"].join(""))):o=o.replace(c,[p,".get(",s,")"].join("")):o=o.replace(c,[p,"[",s,"]"].join("")):"generic"===n[l]?(r.push(["var ",d,"=",p,".get(",s,")"].join("")),o=o.replace(c,d),u.lvalue&&i.push([p,".set(",s,",",d,")"].join(""))):(r.push(["var ",d,"=",p,"[",s,"]"].join("")),o=o.replace(c,d),u.lvalue&&i.push([p,"[",s,"]=",d].join("")));break;case"scalar":o=o.replace(c,"Y"+e.scalarArgs.indexOf(a));break;case"index":o=o.replace(c,"index");break;case"shape":o=o.replace(c,"shape")}}}return[r.join("\n"),o,i.join("\n")].join("\n").trim()}function typeSummary(t){for(var e=new Array(t.length),n=!0,o=0;o<t.length;++o){var r=t[o],i=r.match(/\d+/);i=i?i[0]:"",e[o]=0===r.charAt(0)?"u"+r.charAt(1)+i:r.charAt(0)+i,o>0&&(n=n&&e[o]===e[o-1])}return n?e[0]:e.join("")}function generateCWiseOp(t,e){for(var n=0|e[1].length,o=new Array(t.arrayArgs.length),r=new Array(t.arrayArgs.length),i=["SS"],a=["'use strict'"],u=[],c=0;n>c;++c)u.push(["s",c,"=SS[",c,"]"].join(""));for(var s=0;s<t.arrayArgs.length;++s)i.push("a"+s),i.push("t"+s),i.push("p"+s),r[s]=e[2*s],o[s]=e[2*s+1];for(var s=0;s<t.scalarArgs.length;++s)i.push("Y"+s);if(t.shapeArgs.length>0&&u.push("shape=SS.slice(0)"),t.indexArgs.length>0){for(var l=new Array(n),s=0;n>s;++s)l[s]="0";u.push(["index=[",l.join(","),"]"].join(""))}for(var s=0;s<t.offsetArgs.length;++s){for(var f=t.offsetArgs[s],h=[],c=0;c<f.offset.length;++c)0!==f.offset[c]&&h.push(1===f.offset[c]?["t",f.array,"[",c,"]"].join(""):[f.offset[c],"*t",f.array,"[",c,"]"].join(""));u.push(0===h.length?"q"+s+"=0":["q",s,"=(",h.join("+"),")|0"].join(""))}var d=uniq([].concat(t.pre.thisVars).concat(t.body.thisVars).concat(t.post.thisVars));u=u.concat(d),a.push("var "+u.join(","));for(var s=0;s<t.arrayArgs.length;++s)a.push("p"+s+"|=0");t.pre.body.length>3&&a.push(processBlock(t.pre,t,r));var p=processBlock(t.body,t,r),v=countMatches(o);a.push(n>v?outerFill(v,o[0],t,p):innerFill(o[0],t,p)),t.post.body.length>3&&a.push(processBlock(t.post,t,r)),t.debug&&console.log("Generated cwise routine for ",e,":\n\n",a.join("\n"));var m=[t.funcName||"unnamed","_cwise_loop_",o[0].join("s"),"m",v,typeSummary(r)].join(""),b=new Function(["function ",m,"(",i.join(","),"){",a.join("\n"),"} return ",m].join(""));return b()}var uniq=require("uniq");module.exports=generateCWiseOp;
  //# sourceMappingURL=compile.js.map
  global.define = __define;
  return module.exports;
});

System.register("github:jspm/nodelibs@0.0.2/stream/stream", ["../events","npm:inherits@^2.0.1"], true, function(require, exports, __moduleName) {
  var global = System.global;
  var __define = global.define;
  global.define = undefined;
  var module = { exports: exports };
  var process = System.get("@@nodeProcess")["default"];
    var __filename = "jspm_packages/github/jspm/nodelibs@0.0.2/stream/stream.js";
    var __dirname = "jspm_packages/github/jspm/nodelibs@0.0.2/stream";
  "format cjs";function Stream(){EE.call(this)}var EE=require("../events").EventEmitter,inherits=require("npm:inherits@^2.0.1");inherits(Stream,EE),module.exports=Stream,Stream.Stream=Stream,Stream.prototype.pipe=function(e,t){function n(t){e.writable&&!1===e.write(t)&&u.pause&&u.pause()}function r(){u.readable&&u.resume&&u.resume()}function o(){c||(c=!0,e.end())}function i(){c||(c=!0,"function"==typeof e.destroy&&e.destroy())}function a(e){if(s(),0===EE.listenerCount(this,"error"))throw e}function s(){u.removeListener("data",n),e.removeListener("drain",r),u.removeListener("end",o),u.removeListener("close",i),u.removeListener("error",a),e.removeListener("error",a),u.removeListener("end",s),u.removeListener("close",s),e.removeListener("close",s)}var u=this;u.on("data",n),e.on("drain",r),e._isStdio||t&&t.end===!1||(u.on("end",o),u.on("close",i));var c=!1;return u.on("error",a),e.on("error",a),u.on("end",s),u.on("close",s),e.on("close",s),e.emit("pipe",u),e};
  //# sourceMappingURL=stream.js.map
  global.define = __define;
  return module.exports;
});

System.register("github:jspm/nodelibs@0.0.2/stream/writable", ["npm:inherits@^2.0.1","./stream","@@nodeProcess","../buffer"], true, function(require, exports, __moduleName) {
  var global = System.global;
  var __define = global.define;
  global.define = undefined;
  var module = { exports: exports };
  var process = System.get("@@nodeProcess")["default"];
    var __filename = "jspm_packages/github/jspm/nodelibs@0.0.2/stream/writable.js";
    var __dirname = "jspm_packages/github/jspm/nodelibs@0.0.2/stream";
  "format cjs";function WriteReq(e,t,n){this.chunk=e,this.encoding=t,this.callback=n}function WritableState(e,t){e=e||{};var n=e.highWaterMark;this.highWaterMark=n||0===n?n:16384,this.objectMode=!!e.objectMode,this.highWaterMark=~~this.highWaterMark,this.needDrain=!1,this.ending=!1,this.ended=!1,this.finished=!1;var r=e.decodeStrings===!1;this.decodeStrings=!r,this.defaultEncoding=e.defaultEncoding||"utf8",this.length=0,this.writing=!1,this.sync=!0,this.bufferProcessing=!1,this.onwrite=function(e){onwrite(t,e)},this.writecb=null,this.writelen=0,this.buffer=[]}function Writable(e){return this instanceof Writable||this instanceof Stream.Duplex?(this._writableState=new WritableState(e,this),this.writable=!0,void Stream.call(this)):new Writable(e)}function writeAfterEnd(e,t,n){var r=new Error("write after end");e.emit("error",r),setImmediate(function(){n(r)})}function validChunk(e,t,n,r){var i=!0;if(!Buffer.isBuffer(n)&&"string"!=typeof n&&null!==n&&void 0!==n&&!t.objectMode){var o=new TypeError("Invalid non-string/buffer chunk");e.emit("error",o),setImmediate(function(){r(o)}),i=!1}return i}function decodeChunk(e,t,n){return e.objectMode||e.decodeStrings===!1||"string"!=typeof t||(t=new Buffer(t,n)),t}function writeOrBuffer(e,t,n,r,i){n=decodeChunk(t,n,r);var o=t.objectMode?1:n.length;t.length+=o;var a=t.length<t.highWaterMark;return t.needDrain=!a,t.writing?t.buffer.push(new WriteReq(n,r,i)):doWrite(e,t,o,n,r,i),a}function doWrite(e,t,n,r,i,o){t.writelen=n,t.writecb=o,t.writing=!0,t.sync=!0,e._write(r,i,t.onwrite),t.sync=!1}function onwriteError(e,t,n,r,i){n?setImmediate(function(){i(r)}):i(r),e.emit("error",r)}function onwriteStateUpdate(e){e.writing=!1,e.writecb=null,e.length-=e.writelen,e.writelen=0}function onwrite(e,t){var n=e._writableState,r=n.sync,i=n.writecb;if(onwriteStateUpdate(n),t)onwriteError(e,n,r,t,i);else{var o=needFinish(e,n);o||n.bufferProcessing||!n.buffer.length||clearBuffer(e,n),r?setImmediate(function(){afterWrite(e,n,o,i)}):afterWrite(e,n,o,i)}}function afterWrite(e,t,n,r){n||onwriteDrain(e,t),r(),n&&finishMaybe(e,t)}function onwriteDrain(e,t){0===t.length&&t.needDrain&&(t.needDrain=!1,e.emit("drain"))}function clearBuffer(e,t){t.bufferProcessing=!0;for(var n=0;n<t.buffer.length;n++){var r=t.buffer[n],i=r.chunk,o=r.encoding,a=r.callback,s=t.objectMode?1:i.length;if(doWrite(e,t,s,i,o,a),t.writing){n++;break}}t.bufferProcessing=!1,n<t.buffer.length?t.buffer=t.buffer.slice(n):t.buffer.length=0}function needFinish(e,t){return t.ending&&0===t.length&&!t.finished&&!t.writing}function finishMaybe(e,t){var n=needFinish(e,t);return n&&(t.finished=!0,e.emit("finish")),n}function endWritable(e,t,n){t.ending=!0,finishMaybe(e,t),n&&(t.finished?setImmediate(n):e.once("finish",n)),t.ended=!0}module.exports=Writable,Writable.WritableState=WritableState;var isUint8Array="undefined"!=typeof Uint8Array?function(e){return e instanceof Uint8Array}:function(e){return e&&e.constructor&&"Uint8Array"===e.constructor.name},isArrayBuffer="undefined"!=typeof ArrayBuffer?function(e){return e instanceof ArrayBuffer}:function(e){return e&&e.constructor&&"ArrayBuffer"===e.constructor.name},inherits=require("npm:inherits@^2.0.1"),Stream=require("./stream"),setImmediate=require("@@nodeProcess").nextTick,Buffer=require("../buffer").Buffer;inherits(Writable,Stream),Writable.prototype.pipe=function(){this.emit("error",new Error("Cannot pipe. Not readable."))},Writable.prototype.write=function(e,t,n){var r=this._writableState,i=!1;return"function"==typeof t&&(n=t,t=null),!Buffer.isBuffer(e)&&isUint8Array(e)&&(e=new Buffer(e)),isArrayBuffer(e)&&"undefined"!=typeof Uint8Array&&(e=new Buffer(new Uint8Array(e))),Buffer.isBuffer(e)?t="buffer":t||(t=r.defaultEncoding),"function"!=typeof n&&(n=function(){}),r.ended?writeAfterEnd(this,r,n):validChunk(this,r,e,n)&&(i=writeOrBuffer(this,r,e,t,n)),i},Writable.prototype._write=function(e,t,n){n(new Error("not implemented"))},Writable.prototype.end=function(e,t,n){var r=this._writableState;"function"==typeof e?(n=e,e=null,t=null):"function"==typeof t&&(n=t,t=null),"undefined"!=typeof e&&null!==e&&this.write(e,t),r.ending||r.finished||endWritable(this,r,n)};
  //# sourceMappingURL=writable.js.map
  global.define = __define;
  return module.exports;
});

System.register("github:jspm/nodelibs@0.0.2/stream/duplex", ["npm:inherits@^2.0.1","@@nodeProcess","./readable","./writable"], true, function(require, exports, __moduleName) {
  var global = System.global;
  var __define = global.define;
  global.define = undefined;
  var module = { exports: exports };
  var process = System.get("@@nodeProcess")["default"];
    var __filename = "jspm_packages/github/jspm/nodelibs@0.0.2/stream/duplex.js";
    var __dirname = "jspm_packages/github/jspm/nodelibs@0.0.2/stream";
  "format cjs";function Duplex(e){return this instanceof Duplex?(Readable.call(this,e),Writable.call(this,e),e&&e.readable===!1&&(this.readable=!1),e&&e.writable===!1&&(this.writable=!1),this.allowHalfOpen=!0,e&&e.allowHalfOpen===!1&&(this.allowHalfOpen=!1),void this.once("end",onend)):new Duplex(e)}function onend(){if(!this.allowHalfOpen&&!this._writableState.ended){var e=this;setImmediate(function(){e.end()})}}module.exports=Duplex;var inherits=require("npm:inherits@^2.0.1"),setImmediate=require("@@nodeProcess").nextTick,Readable=require("./readable"),Writable=require("./writable");inherits(Duplex,Readable),Duplex.prototype.write=Writable.prototype.write,Duplex.prototype.end=Writable.prototype.end,Duplex.prototype._write=Writable.prototype._write;
  //# sourceMappingURL=duplex.js.map
  global.define = __define;
  return module.exports;
});

System.register("github:jspm/nodelibs@0.0.2/stream/transform", ["./duplex","npm:inherits@^2.0.1"], true, function(require, exports, __moduleName) {
  var global = System.global;
  var __define = global.define;
  global.define = undefined;
  var module = { exports: exports };
  var process = System.get("@@nodeProcess")["default"];
    var __filename = "jspm_packages/github/jspm/nodelibs@0.0.2/stream/transform.js";
    var __dirname = "jspm_packages/github/jspm/nodelibs@0.0.2/stream";
  "format cjs";function TransformState(e,t){this.afterTransform=function(e,n){return afterTransform(t,e,n)},this.needTransform=!1,this.transforming=!1,this.writecb=null,this.writechunk=null}function afterTransform(e,t,n){var r=e._transformState;r.transforming=!1;var i=r.writecb;if(!i)return e.emit("error",new Error("no writecb in Transform class"));r.writechunk=null,r.writecb=null,null!==n&&void 0!==n&&e.push(n),i&&i(t);var o=e._readableState;o.reading=!1,(o.needReadable||o.length<o.highWaterMark)&&e._read(o.highWaterMark)}function Transform(e){if(!(this instanceof Transform))return new Transform(e);Duplex.call(this,e);var t=(this._transformState=new TransformState(e,this),this);this._readableState.needReadable=!0,this._readableState.sync=!1,this.once("finish",function(){"function"==typeof this._flush?this._flush(function(e){done(t,e)}):done(t)})}function done(e,t){if(t)return e.emit("error",t);var n=e._writableState,r=(e._readableState,e._transformState);if(n.length)throw new Error("calling transform done when ws.length != 0");if(r.transforming)throw new Error("calling transform done when still transforming");return e.push(null)}module.exports=Transform;var Duplex=require("./duplex"),inherits=require("npm:inherits@^2.0.1");inherits(Transform,Duplex),Transform.prototype.push=function(e,t){return this._transformState.needTransform=!1,Duplex.prototype.push.call(this,e,t)},Transform.prototype._transform=function(){throw new Error("not implemented")},Transform.prototype._write=function(e,t,n){var r=this._transformState;if(r.writecb=n,r.writechunk=e,r.writeencoding=t,!r.transforming){var i=this._readableState;(r.needTransform||i.needReadable||i.length<i.highWaterMark)&&this._read(i.highWaterMark)}},Transform.prototype._read=function(){var e=this._transformState;e.writechunk&&e.writecb&&!e.transforming?(e.transforming=!0,this._transform(e.writechunk,e.writeencoding,e.afterTransform)):e.needTransform=!0};
  //# sourceMappingURL=transform.js.map
  global.define = __define;
  return module.exports;
});

System.register("github:jspm/nodelibs@0.0.2/stream/passthrough", ["./transform","npm:inherits@^2.0.1"], true, function(require, exports, __moduleName) {
  var global = System.global;
  var __define = global.define;
  global.define = undefined;
  var module = { exports: exports };
  var process = System.get("@@nodeProcess")["default"];
    var __filename = "jspm_packages/github/jspm/nodelibs@0.0.2/stream/passthrough.js";
    var __dirname = "jspm_packages/github/jspm/nodelibs@0.0.2/stream";
  "format cjs";function PassThrough(e){return this instanceof PassThrough?void Transform.call(this,e):new PassThrough(e)}module.exports=PassThrough;var Transform=require("./transform"),inherits=require("npm:inherits@^2.0.1");inherits(PassThrough,Transform),PassThrough.prototype._transform=function(e,t,n){n(null,e)};
  //# sourceMappingURL=passthrough.js.map
  global.define = __define;
  return module.exports;
});

System.register("npm:through@1.1.2/index", ["github:jspm/nodelibs@0.0.2/stream"], true, function(require, exports, __moduleName) {
  var global = System.global;
  var __define = global.define;
  global.define = undefined;
  var module = { exports: exports };
  var process = System.get("@@nodeProcess")["default"];
    var __filename = "jspm_packages/npm/through@1.1.2/index.js";
    var __dirname = "jspm_packages/npm/through@1.1.2";
  "format cjs";function through(e,t){function n(){for(;s.length&&!a.paused;){var e=s.shift();if(null===e)return a.emit("end");a.emit("data",e)}}function r(){a.writable=!1,t.call(a),a.readable||a.destroy()}e=e||function(e){this.emit("data",e)},t=t||function(){this.emit("end")};var o=!1,i=!1,a=new Stream,s=[];return a.buffer=s,a.readable=a.writable=!0,a.paused=!1,a.write=function(t){return e.call(this,t),!a.paused},a.queue=function(e){s.push(e),n()},a.on("end",function(){a.readable=!1,a.writable||process.nextTick(function(){a.destroy()})}),a.end=function(e){o||(o=!0,arguments.length&&a.write(e),r())},a.destroy=function(){i||(i=!0,o=!0,s.length=0,a.writable=a.readable=!1,a.emit("close"))},a.pause=function(){a.paused||(a.paused=!0,a.emit("pause"))},a.resume=function(){a.paused&&(a.paused=!1),n(),a.paused||a.emit("drain")},a}var Stream=require("github:jspm/nodelibs@0.0.2/stream");exports=module.exports=through,through.through=through;
  //# sourceMappingURL=index.js.map
  global.define = __define;
  return module.exports;
});

System.register("npm:inherits@2.0.1", ["npm:inherits@2.0.1/inherits_browser"], true, function(require, exports, __moduleName) {
  var global = System.global;
  var __define = global.define;
  global.define = undefined;
  var module = { exports: exports };
  var process = System.get("@@nodeProcess")["default"];
    var __filename = "jspm_packages/npm/inherits@2.0.1.js";
    var __dirname = "jspm_packages/npm";
  module.exports = require("npm:inherits@2.0.1/inherits_browser");
  
  global.define = __define;
  return module.exports;
});

System.register("npm:domready@0.2.13", ["npm:domready@0.2.13/ready"], true, function(require, exports, __moduleName) {
  var global = System.global;
  var __define = global.define;
  global.define = undefined;
  var module = { exports: exports };
  var process = System.get("@@nodeProcess")["default"];
    var __filename = "jspm_packages/npm/domready@0.2.13.js";
    var __dirname = "jspm_packages/npm";
  module.exports = require("npm:domready@0.2.13/ready");
  
  global.define = __define;
  return module.exports;
});

System.register("npm:vkey@0.0.2", ["npm:vkey@0.0.2/index"], true, function(require, exports, __moduleName) {
  var global = System.global;
  var __define = global.define;
  global.define = undefined;
  var module = { exports: exports };
  var process = System.get("@@nodeProcess")["default"];
    var __filename = "jspm_packages/npm/vkey@0.0.2.js";
    var __dirname = "jspm_packages/npm";
  module.exports = require("npm:vkey@0.0.2/index");
  
  global.define = __define;
  return module.exports;
});

System.register("npm:invert-hash@0.0.0", ["npm:invert-hash@0.0.0/invert"], true, function(require, exports, __moduleName) {
  var global = System.global;
  var __define = global.define;
  global.define = undefined;
  var module = { exports: exports };
  var process = System.get("@@nodeProcess")["default"];
    var __filename = "jspm_packages/npm/invert-hash@0.0.0.js";
    var __dirname = "jspm_packages/npm";
  module.exports = require("npm:invert-hash@0.0.0/invert");
  
  global.define = __define;
  return module.exports;
});

System.register("npm:uniq@0.0.2", ["npm:uniq@0.0.2/uniq"], true, function(require, exports, __moduleName) {
  var global = System.global;
  var __define = global.define;
  global.define = undefined;
  var module = { exports: exports };
  var process = System.get("@@nodeProcess")["default"];
    var __filename = "jspm_packages/npm/uniq@0.0.2.js";
    var __dirname = "jspm_packages/npm";
  module.exports = require("npm:uniq@0.0.2/uniq");
  
  global.define = __define;
  return module.exports;
});

System.register("npm:lower-bound@0.0.1", ["npm:lower-bound@0.0.1/lb"], true, function(require, exports, __moduleName) {
  var global = System.global;
  var __define = global.define;
  global.define = undefined;
  var module = { exports: exports };
  var process = System.get("@@nodeProcess")["default"];
    var __filename = "jspm_packages/npm/lower-bound@0.0.1.js";
    var __dirname = "jspm_packages/npm";
  module.exports = require("npm:lower-bound@0.0.1/lb");
  
  global.define = __define;
  return module.exports;
});

System.register("npm:iota-array@0.0.1", ["npm:iota-array@0.0.1/iota"], true, function(require, exports, __moduleName) {
  var global = System.global;
  var __define = global.define;
  global.define = undefined;
  var module = { exports: exports };
  var process = System.get("@@nodeProcess")["default"];
    var __filename = "jspm_packages/npm/iota-array@0.0.1.js";
    var __dirname = "jspm_packages/npm";
  module.exports = require("npm:iota-array@0.0.1/iota");
  
  global.define = __define;
  return module.exports;
});

System.register("npm:webglew@0.0.0", ["npm:webglew@0.0.0/webglew"], true, function(require, exports, __moduleName) {
  var global = System.global;
  var __define = global.define;
  global.define = undefined;
  var module = { exports: exports };
  var process = System.get("@@nodeProcess")["default"];
    var __filename = "jspm_packages/npm/webglew@0.0.0.js";
    var __dirname = "jspm_packages/npm";
  module.exports = require("npm:webglew@0.0.0/webglew");
  
  global.define = __define;
  return module.exports;
});

System.register("npm:iota-array@1.0.0", ["npm:iota-array@1.0.0/iota"], true, function(require, exports, __moduleName) {
  var global = System.global;
  var __define = global.define;
  global.define = undefined;
  var module = { exports: exports };
  var process = System.get("@@nodeProcess")["default"];
    var __filename = "jspm_packages/npm/iota-array@1.0.0.js";
    var __dirname = "jspm_packages/npm";
  module.exports = require("npm:iota-array@1.0.0/iota");
  
  global.define = __define;
  return module.exports;
});

System.register("npm:esprima@1.2.2", ["npm:esprima@1.2.2/esprima"], true, function(require, exports, __moduleName) {
  var global = System.global;
  var __define = global.define;
  global.define = undefined;
  var module = { exports: exports };
  var process = System.get("@@nodeProcess")["default"];
    var __filename = "jspm_packages/npm/esprima@1.2.2.js";
    var __dirname = "jspm_packages/npm";
  module.exports = require("npm:esprima@1.2.2/esprima");
  
  global.define = __define;
  return module.exports;
});

System.register("npm:bit-twiddle@0.0.2", ["npm:bit-twiddle@0.0.2/twiddle"], true, function(require, exports, __moduleName) {
  var global = System.global;
  var __define = global.define;
  global.define = undefined;
  var module = { exports: exports };
  var process = System.get("@@nodeProcess")["default"];
    var __filename = "jspm_packages/npm/bit-twiddle@0.0.2.js";
    var __dirname = "jspm_packages/npm";
  module.exports = require("npm:bit-twiddle@0.0.2/twiddle");
  
  global.define = __define;
  return module.exports;
});

System.register("npm:dup@0.0.0", ["npm:dup@0.0.0/dup"], true, function(require, exports, __moduleName) {
  var global = System.global;
  var __define = global.define;
  global.define = undefined;
  var module = { exports: exports };
  var process = System.get("@@nodeProcess")["default"];
    var __filename = "jspm_packages/npm/dup@0.0.0.js";
    var __dirname = "jspm_packages/npm";
  module.exports = require("npm:dup@0.0.0/dup");
  
  global.define = __define;
  return module.exports;
});

System.register("npm:bit-twiddle@1.0.2", ["npm:bit-twiddle@1.0.2/twiddle"], true, function(require, exports, __moduleName) {
  var global = System.global;
  var __define = global.define;
  global.define = undefined;
  var module = { exports: exports };
  var process = System.get("@@nodeProcess")["default"];
    var __filename = "jspm_packages/npm/bit-twiddle@1.0.2.js";
    var __dirname = "jspm_packages/npm";
  module.exports = require("npm:bit-twiddle@1.0.2/twiddle");
  
  global.define = __define;
  return module.exports;
});

System.register("npm:dup@1.0.0", ["npm:dup@1.0.0/dup"], true, function(require, exports, __moduleName) {
  var global = System.global;
  var __define = global.define;
  global.define = undefined;
  var module = { exports: exports };
  var process = System.get("@@nodeProcess")["default"];
    var __filename = "jspm_packages/npm/dup@1.0.0.js";
    var __dirname = "jspm_packages/npm";
  module.exports = require("npm:dup@1.0.0/dup");
  
  global.define = __define;
  return module.exports;
});

System.register("npm:gl-vao@0.0.3/lib/vao-native", ["./do-bind"], true, function(require, exports, __moduleName) {
  var global = System.global;
  var __define = global.define;
  global.define = undefined;
  var module = { exports: exports };
  var process = System.get("@@nodeProcess")["default"];
    var __filename = "jspm_packages/npm/gl-vao@0.0.3/lib/vao-native.js";
    var __dirname = "jspm_packages/npm/gl-vao@0.0.3/lib";
  "format cjs";"use strict";function VAONative(e,t,n){this.gl=e,this.ext=t,this.handle=n}function createVAONative(e,t){return new VAONative(e,t,t.createVertexArrayOES())}var bindAttribs=require("./do-bind");VAONative.prototype.bind=function(){this.ext.bindVertexArrayOES(this.handle)},VAONative.prototype.unbind=function(){this.ext.bindVertexArrayOES(null)},VAONative.prototype.dispose=function(){this.ext.deleteVertexArrayOES(this.handle)},VAONative.prototype.update=function(e,t){this.bind(),bindAttribs(this.gl,e,t),this.unbind()},module.exports=createVAONative;
  //# sourceMappingURL=vao-native.js.map
  global.define = __define;
  return module.exports;
});

System.register("npm:gl-matrix@2.0.0", ["npm:gl-matrix@2.0.0/dist/gl-matrix"], true, function(require, exports, __moduleName) {
  var global = System.global;
  var __define = global.define;
  global.define = undefined;
  var module = { exports: exports };
  var process = System.get("@@nodeProcess")["default"];
    var __filename = "jspm_packages/npm/gl-matrix@2.0.0.js";
    var __dirname = "jspm_packages/npm";
  module.exports = require("npm:gl-matrix@2.0.0/dist/gl-matrix");
  
  global.define = __define;
  return module.exports;
});

System.register("npm:uniq@1.0.1", ["npm:uniq@1.0.1/uniq"], true, function(require, exports, __moduleName) {
  var global = System.global;
  var __define = global.define;
  global.define = undefined;
  var module = { exports: exports };
  var process = System.get("@@nodeProcess")["default"];
    var __filename = "jspm_packages/npm/uniq@1.0.1.js";
    var __dirname = "jspm_packages/npm";
  module.exports = require("npm:uniq@1.0.1/uniq");
  
  global.define = __define;
  return module.exports;
});

System.register("npm:base64-js@0.0.4", ["npm:base64-js@0.0.4/lib/b64"], true, function(require, exports, __moduleName) {
  var global = System.global;
  var __define = global.define;
  global.define = undefined;
  var module = { exports: exports };
  var process = System.get("@@nodeProcess")["default"];
    var __filename = "jspm_packages/npm/base64-js@0.0.4.js";
    var __dirname = "jspm_packages/npm";
  module.exports = require("npm:base64-js@0.0.4/lib/b64");
  
  global.define = __define;
  return module.exports;
});

System.register("npm:ieee754@1.1.3", ["npm:ieee754@1.1.3/index"], true, function(require, exports, __moduleName) {
  var global = System.global;
  var __define = global.define;
  global.define = undefined;
  var module = { exports: exports };
  var process = System.get("@@nodeProcess")["default"];
    var __filename = "jspm_packages/npm/ieee754@1.1.3.js";
    var __dirname = "jspm_packages/npm";
  module.exports = require("npm:ieee754@1.1.3/index");
  
  global.define = __define;
  return module.exports;
});

System.register("npm:cwise-compiler@0.0.0/lib/thunk", ["./compile"], true, function(require, exports, __moduleName) {
  var global = System.global;
  var __define = global.define;
  global.define = undefined;
  var module = { exports: exports };
  var process = System.get("@@nodeProcess")["default"];
    var __filename = "jspm_packages/npm/cwise-compiler@0.0.0/lib/thunk.js";
    var __dirname = "jspm_packages/npm/cwise-compiler@0.0.0/lib";
  "format cjs";"use strict";function createThunk(e){var t=["'use strict'","var CACHED={}"],n=[],r=e.funcName+"_cwise_thunk";t.push(["return function ",r,"(",e.shimArgs.join(","),"){"].join(""));for(var o=[],i=[],a=[["array",e.arrayArgs[0],".shape"].join("")],s=0;s<e.arrayArgs.length;++s){var u=e.arrayArgs[s];n.push(["t",u,"=array",u,".dtype,","r",u,"=array",u,".order"].join("")),o.push("t"+u),o.push("r"+u),i.push("t"+u),i.push("r"+u+".join()"),a.push("array"+u+".data"),a.push("array"+u+".stride"),a.push("array"+u+".offset|0")}for(var s=0;s<e.scalarArgs.length;++s)a.push("scalar"+e.scalarArgs[s]);n.push(["type=[",i.join(","),"].join()"].join("")),n.push("proc=CACHED[type]"),t.push("var "+n.join(",")),t.push(["if(!proc){","CACHED[type]=proc=compile([",o.join(","),"])}","return proc(",a.join(","),")}"].join("")),e.debug&&console.log("Generated thunk:",t.join("\n"));var c=new Function("compile",t.join("\n"));return c(compile.bind(void 0,e))}var compile=require("./compile");module.exports=createThunk;
  //# sourceMappingURL=thunk.js.map
  global.define = __define;
  return module.exports;
});

System.register("npm:ndarray-scratch@0.0.1", ["npm:ndarray-scratch@0.0.1/scratch"], true, function(require, exports, __moduleName) {
  var global = System.global;
  var __define = global.define;
  global.define = undefined;
  var module = { exports: exports };
  var process = System.get("@@nodeProcess")["default"];
    var __filename = "jspm_packages/npm/ndarray-scratch@0.0.1.js";
    var __dirname = "jspm_packages/npm";
  module.exports = require("npm:ndarray-scratch@0.0.1/scratch");
  
  global.define = __define;
  return module.exports;
});

System.register("npm:gl-buffer@0.1.2", ["npm:gl-buffer@0.1.2/buffer"], true, function(require, exports, __moduleName) {
  var global = System.global;
  var __define = global.define;
  global.define = undefined;
  var module = { exports: exports };
  var process = System.get("@@nodeProcess")["default"];
    var __filename = "jspm_packages/npm/gl-buffer@0.1.2.js";
    var __dirname = "jspm_packages/npm";
  module.exports = require("npm:gl-buffer@0.1.2/buffer");
  
  global.define = __define;
  return module.exports;
});

System.register("npm:ndarray-fill@0.1.0", ["npm:ndarray-fill@0.1.0/index"], true, function(require, exports, __moduleName) {
  var global = System.global;
  var __define = global.define;
  global.define = undefined;
  var module = { exports: exports };
  var process = System.get("@@nodeProcess")["default"];
    var __filename = "jspm_packages/npm/ndarray-fill@0.1.0.js";
    var __dirname = "jspm_packages/npm";
  module.exports = require("npm:ndarray-fill@0.1.0/index");
  
  global.define = __define;
  return module.exports;
});

System.register("npm:cwise-compiler@0.1.0/lib/thunk", ["./compile"], true, function(require, exports, __moduleName) {
  var global = System.global;
  var __define = global.define;
  global.define = undefined;
  var module = { exports: exports };
  var process = System.get("@@nodeProcess")["default"];
    var __filename = "jspm_packages/npm/cwise-compiler@0.1.0/lib/thunk.js";
    var __dirname = "jspm_packages/npm/cwise-compiler@0.1.0/lib";
  "format cjs";"use strict";function createThunk(e){var t=["'use strict'","var CACHED={}"],n=[],o=e.funcName+"_cwise_thunk";t.push(["return function ",o,"(",e.shimArgs.join(","),"){"].join(""));for(var r=[],i=[],a=[["array",e.arrayArgs[0],".shape"].join("")],u=0;u<e.arrayArgs.length;++u){var c=e.arrayArgs[u];n.push(["t",c,"=array",c,".dtype,","r",c,"=array",c,".order"].join("")),r.push("t"+c),r.push("r"+c),i.push("t"+c),i.push("r"+c+".join()"),a.push("array"+c+".data"),a.push("array"+c+".stride"),a.push("array"+c+".offset|0")}for(var u=0;u<e.scalarArgs.length;++u)a.push("scalar"+e.scalarArgs[u]);n.push(["type=[",i.join(","),"].join()"].join("")),n.push("proc=CACHED[type]"),t.push("var "+n.join(",")),t.push(["if(!proc){","CACHED[type]=proc=compile([",r.join(","),"])}","return proc(",a.join(","),")}"].join("")),e.debug&&console.log("Generated thunk:",t.join("\n"));var s=new Function("compile",t.join("\n"));return s(compile.bind(void 0,e))}var compile=require("./compile");module.exports=createThunk;
  //# sourceMappingURL=thunk.js.map
  global.define = __define;
  return module.exports;
});

System.register("npm:through@1.1.2", ["npm:through@1.1.2/index"], true, function(require, exports, __moduleName) {
  var global = System.global;
  var __define = global.define;
  global.define = undefined;
  var module = { exports: exports };
  var process = System.get("@@nodeProcess")["default"];
    var __filename = "jspm_packages/npm/through@1.1.2.js";
    var __dirname = "jspm_packages/npm";
  module.exports = require("npm:through@1.1.2/index");
  
  global.define = __define;
  return module.exports;
});

System.register("github:jspm/nodelibs@0.0.2/util", ["./support/isBuffer","npm:inherits@^2.0.1"], true, function(require, exports, __moduleName) {
  var global = System.global;
  var __define = global.define;
  global.define = undefined;
  var module = { exports: exports };
  var process = System.get("@@nodeProcess")["default"];
    var __filename = "jspm_packages/github/jspm/nodelibs@0.0.2/util.js";
    var __dirname = "jspm_packages/github/jspm/nodelibs@0.0.2";
  "format cjs";function inspect(e,t){var r={seen:[],stylize:stylizeNoColor};return arguments.length>=3&&(r.depth=arguments[2]),arguments.length>=4&&(r.colors=arguments[3]),isBoolean(t)?r.showHidden=t:t&&exports._extend(r,t),isUndefined(r.showHidden)&&(r.showHidden=!1),isUndefined(r.depth)&&(r.depth=2),isUndefined(r.colors)&&(r.colors=!1),isUndefined(r.customInspect)&&(r.customInspect=!0),r.colors&&(r.stylize=stylizeWithColor),formatValue(r,e,r.depth)}function stylizeWithColor(e,t){var r=inspect.styles[t];return r?"["+inspect.colors[r][0]+"m"+e+"["+inspect.colors[r][1]+"m":e}function stylizeNoColor(e){return e}function arrayToHash(e){var t={};return e.forEach(function(e){t[e]=!0}),t}function formatValue(e,t,r){if(e.customInspect&&t&&isFunction(t.inspect)&&t.inspect!==exports.inspect&&(!t.constructor||t.constructor.prototype!==t)){var n=t.inspect(r,e);return isString(n)||(n=formatValue(e,n,r)),n}var i=formatPrimitive(e,t);if(i)return i;var o=Object.keys(t),a=arrayToHash(o);if(e.showHidden&&(o=Object.getOwnPropertyNames(t)),isError(t)&&(o.indexOf("message")>=0||o.indexOf("description")>=0))return formatError(t);if(0===o.length){if(isFunction(t)){var s=t.name?": "+t.name:"";return e.stylize("[Function"+s+"]","special")}if(isRegExp(t))return e.stylize(RegExp.prototype.toString.call(t),"regexp");if(isDate(t))return e.stylize(Date.prototype.toString.call(t),"date");if(isError(t))return formatError(t)}var u="",c=!1,l=["{","}"];if(isArray(t)&&(c=!0,l=["[","]"]),isFunction(t)){var f=t.name?": "+t.name:"";u=" [Function"+f+"]"}if(isRegExp(t)&&(u=" "+RegExp.prototype.toString.call(t)),isDate(t)&&(u=" "+Date.prototype.toUTCString.call(t)),isError(t)&&(u=" "+formatError(t)),0===o.length&&(!c||0==t.length))return l[0]+u+l[1];if(0>r)return isRegExp(t)?e.stylize(RegExp.prototype.toString.call(t),"regexp"):e.stylize("[Object]","special");e.seen.push(t);var h;return h=c?formatArray(e,t,r,a,o):o.map(function(n){return formatProperty(e,t,r,a,n,c)}),e.seen.pop(),reduceToSingleString(h,u,l)}function formatPrimitive(e,t){if(isUndefined(t))return e.stylize("undefined","undefined");if(isString(t)){var r="'"+JSON.stringify(t).replace(/^"|"$/g,"").replace(/'/g,"\\'").replace(/\\"/g,'"')+"'";return e.stylize(r,"string")}return isNumber(t)?e.stylize(""+t,"number"):isBoolean(t)?e.stylize(""+t,"boolean"):isNull(t)?e.stylize("null","null"):void 0}function formatError(e){return"["+Error.prototype.toString.call(e)+"]"}function formatArray(e,t,r,n,i){for(var o=[],a=0,s=t.length;s>a;++a)o.push(hasOwnProperty(t,String(a))?formatProperty(e,t,r,n,String(a),!0):"");return i.forEach(function(i){i.match(/^\d+$/)||o.push(formatProperty(e,t,r,n,i,!0))}),o}function formatProperty(e,t,r,n,i,o){var a,s,u;if(u=Object.getOwnPropertyDescriptor(t,i)||{value:t[i]},u.get?s=u.set?e.stylize("[Getter/Setter]","special"):e.stylize("[Getter]","special"):u.set&&(s=e.stylize("[Setter]","special")),hasOwnProperty(n,i)||(a="["+i+"]"),s||(e.seen.indexOf(u.value)<0?(s=isNull(r)?formatValue(e,u.value,null):formatValue(e,u.value,r-1),s.indexOf("\n")>-1&&(s=o?s.split("\n").map(function(e){return"  "+e}).join("\n").substr(2):"\n"+s.split("\n").map(function(e){return"   "+e}).join("\n"))):s=e.stylize("[Circular]","special")),isUndefined(a)){if(o&&i.match(/^\d+$/))return s;a=JSON.stringify(""+i),a.match(/^"([a-zA-Z_][a-zA-Z_0-9]*)"$/)?(a=a.substr(1,a.length-2),a=e.stylize(a,"name")):(a=a.replace(/'/g,"\\'").replace(/\\"/g,'"').replace(/(^"|"$)/g,"'"),a=e.stylize(a,"string"))}return a+": "+s}function reduceToSingleString(e,t,r){var n=0,i=e.reduce(function(e,t){return n++,t.indexOf("\n")>=0&&n++,e+t.replace(/\u001b\[\d\d?m/g,"").length+1},0);return i>60?r[0]+(""===t?"":t+"\n ")+" "+e.join(",\n  ")+" "+r[1]:r[0]+t+" "+e.join(", ")+" "+r[1]}function isArray(e){return Array.isArray(e)}function isBoolean(e){return"boolean"==typeof e}function isNull(e){return null===e}function isNullOrUndefined(e){return null==e}function isNumber(e){return"number"==typeof e}function isString(e){return"string"==typeof e}function isSymbol(e){return"symbol"==typeof e}function isUndefined(e){return void 0===e}function isRegExp(e){return isObject(e)&&"[object RegExp]"===objectToString(e)}function isObject(e){return"object"==typeof e&&null!==e}function isDate(e){return isObject(e)&&"[object Date]"===objectToString(e)}function isError(e){return isObject(e)&&("[object Error]"===objectToString(e)||e instanceof Error)}function isFunction(e){return"function"==typeof e}function isPrimitive(e){return null===e||"boolean"==typeof e||"number"==typeof e||"string"==typeof e||"symbol"==typeof e||"undefined"==typeof e}function objectToString(e){return Object.prototype.toString.call(e)}function pad(e){return 10>e?"0"+e.toString(10):e.toString(10)}function timestamp(){var e=new Date,t=[pad(e.getHours()),pad(e.getMinutes()),pad(e.getSeconds())].join(":");return[e.getDate(),months[e.getMonth()],t].join(" ")}function hasOwnProperty(e,t){return Object.prototype.hasOwnProperty.call(e,t)}var formatRegExp=/%[sdj%]/g;exports.format=function(e){if(!isString(e)){for(var t=[],r=0;r<arguments.length;r++)t.push(inspect(arguments[r]));return t.join(" ")}for(var r=1,n=arguments,i=n.length,o=String(e).replace(formatRegExp,function(e){if("%%"===e)return"%";if(r>=i)return e;switch(e){case"%s":return String(n[r++]);case"%d":return Number(n[r++]);case"%j":try{return JSON.stringify(n[r++])}catch(t){return"[Circular]"}default:return e}}),a=n[r];i>r;a=n[++r])o+=isNull(a)||!isObject(a)?" "+a:" "+inspect(a);return o},exports.deprecate=function(e,t){function r(){if(!n){if(process.throwDeprecation)throw new Error(t);process.traceDeprecation?console.trace(t):console.error(t),n=!0}return e.apply(this,arguments)}if(isUndefined(global.process))return function(){return exports.deprecate(e,t).apply(this,arguments)};if(process.noDeprecation===!0)return e;var n=!1;return r};var debugs={},debugEnviron;exports.debuglog=function(e){if(isUndefined(debugEnviron)&&(debugEnviron=process.env.NODE_DEBUG||""),e=e.toUpperCase(),!debugs[e])if(new RegExp("\\b"+e+"\\b","i").test(debugEnviron)){var t=process.pid;debugs[e]=function(){var r=exports.format.apply(exports,arguments);console.error("%s %d: %s",e,t,r)}}else debugs[e]=function(){};return debugs[e]},exports.inspect=inspect,inspect.colors={bold:[1,22],italic:[3,23],underline:[4,24],inverse:[7,27],white:[37,39],grey:[90,39],black:[30,39],blue:[34,39],cyan:[36,39],green:[32,39],magenta:[35,39],red:[31,39],yellow:[33,39]},inspect.styles={special:"cyan",number:"yellow","boolean":"yellow",undefined:"grey","null":"bold",string:"green",date:"magenta",regexp:"red"},exports.isArray=isArray,exports.isBoolean=isBoolean,exports.isNull=isNull,exports.isNullOrUndefined=isNullOrUndefined,exports.isNumber=isNumber,exports.isString=isString,exports.isSymbol=isSymbol,exports.isUndefined=isUndefined,exports.isRegExp=isRegExp,exports.isObject=isObject,exports.isDate=isDate,exports.isError=isError,exports.isFunction=isFunction,exports.isPrimitive=isPrimitive,exports.isBuffer=require("./support/isBuffer");var months=["Jan","Feb","Mar","Apr","May","Jun","Jul","Aug","Sep","Oct","Nov","Dec"];exports.log=function(){console.log("%s - %s",timestamp(),exports.format.apply(exports,arguments))},exports.inherits=require("npm:inherits@^2.0.1"),exports._extend=function(e,t){if(!t||!isObject(t))return e;for(var r=Object.keys(t),n=r.length;n--;)e[r[n]]=t[r[n]];return e};
  //# sourceMappingURL=util.js.map
  global.define = __define;
  return module.exports;
});

System.register("npm:ndarray@1.0.15/ndarray", ["iota-array"], true, function(require, exports, __moduleName) {
  var global = System.global;
  var __define = global.define;
  global.define = undefined;
  var module = { exports: exports };
  var process = System.get("@@nodeProcess")["default"];
    var __filename = "jspm_packages/npm/ndarray@1.0.15/ndarray.js";
    var __dirname = "jspm_packages/npm/ndarray@1.0.15";
  "format cjs";function compare1st(t,e){return t[0]-e[0]}function order(){var t,e=this.stride,n=new Array(e.length);for(t=0;t<n.length;++t)n[t]=[Math.abs(e[t]),t];n.sort(compare1st);var o=new Array(n.length);for(t=0;t<o.length;++t)o[t]=n[t][1];return o}function compileConstructor(t,e){var n=["View",e,"d",t].join("");0>e&&(n="View_Nil"+t);var o="generic"===t;if(-1===e){var i="function "+n+"(a){this.data=a;};var proto="+n+".prototype;proto.dtype='"+t+"';proto.index=function(){return -1};proto.size=0;proto.dimension=-1;proto.shape=proto.stride=proto.order=[];proto.lo=proto.hi=proto.transpose=proto.step=function(){return new "+n+"(this.data);};proto.get=proto.set=function(){};proto.pick=function(){return null};return function construct_"+n+"(a){return new "+n+"(a);}",u=new Function(i);return u()}if(0===e){var i="function "+n+"(a,d) {this.data = a;this.offset = d};var proto="+n+".prototype;proto.dtype='"+t+"';proto.index=function(){return this.offset};proto.dimension=0;proto.size=1;proto.shape=proto.stride=proto.order=[];proto.lo=proto.hi=proto.transpose=proto.step=function "+n+"_copy() {return new "+n+"(this.data,this.offset)};proto.pick=function "+n+"_pick(){return TrivialArray(this.data);};proto.valueOf=proto.get=function "+n+"_get(){return "+(o?"this.data.get(this.offset)":"this.data[this.offset]")+"};proto.set=function "+n+"_set(v){return "+(o?"this.data.set(this.offset,v)":"this.data[this.offset]=v")+"};return function construct_"+n+"(a,b,c,d){return new "+n+"(a,d)}",u=new Function("TrivialArray",i);return u(CACHED_CONSTRUCTORS[t][0])}var i=["'use strict'"],r=iota(e),c=r.map(function(t){return"i"+t}),a="this.offset+"+r.map(function(t){return"this._stride"+t+"*i"+t}).join("+");i.push("function "+n+"(a,"+r.map(function(t){return"b"+t}).join(",")+","+r.map(function(t){return"c"+t}).join(",")+",d){this.data=a");for(var s=0;e>s;++s)i.push("this._shape"+s+"=b"+s+"|0");for(var s=0;e>s;++s)i.push("this._stride"+s+"=c"+s+"|0");i.push("this.offset=d|0}","var proto="+n+".prototype","proto.dtype='"+t+"'","proto.dimension="+e);var f="VStride"+e+"d"+t,l="VShape"+e+"d"+t,h={stride:f,shape:l};for(var d in h){var p=h[d];i.push("function "+p+"(v) {this._v=v} var aproto="+p+".prototype","aproto.length="+e);for(var v=[],s=0;e>s;++s)v.push(["this._v._",d,s].join(""));i.push("aproto.toJSON=function "+p+"_toJSON(){return ["+v.join(",")+"]}","aproto.valueOf=aproto.toString=function "+p+"_toString(){return ["+v.join(",")+"].join()}");for(var s=0;e>s;++s)i.push("Object.defineProperty(aproto,"+s+",{get:function(){return this._v._"+d+s+"},set:function(v){return this._v._"+d+s+"=v|0},enumerable:true})");for(var s=0;s<arrayMethods.length;++s)arrayMethods[s]in Array.prototype&&i.push("aproto."+arrayMethods[s]+"=Array.prototype."+arrayMethods[s]);i.push(["Object.defineProperty(proto,'",d,"',{get:function ",p,"_get(){return new ",p,"(this)},set: function ",p,"_set(v){"].join(""));for(var s=0;e>s;++s)i.push("this._"+d+s+"=v["+s+"]|0");i.push("return v}})")}i.push("Object.defineProperty(proto,'size',{get:function "+n+"_size(){return "+r.map(function(t){return"this._shape"+t}).join("*"),"}})"),1===e?i.push("proto.order=[0]"):(i.push("Object.defineProperty(proto,'order',{get:"),4>e?(i.push("function "+n+"_order(){"),2===e?i.push("return (Math.abs(this._stride0)>Math.abs(this._stride1))?[1,0]:[0,1]}})"):3===e&&i.push("var s0=Math.abs(this._stride0),s1=Math.abs(this._stride1),s2=Math.abs(this._stride2);if(s0>s1){if(s1>s2){return [2,1,0];}else if(s0>s2){return [1,2,0];}else{return [1,0,2];}}else if(s0>s2){return [2,0,1];}else if(s2>s1){return [0,1,2];}else{return [0,2,1];}}})")):i.push("ORDER})")),i.push("proto.set=function "+n+"_set("+c.join(",")+",v){"),i.push(o?"return this.data.set("+a+",v)}":"return this.data["+a+"]=v}"),i.push("proto.get=function "+n+"_get("+c.join(",")+"){"),i.push(o?"return this.data.get("+a+")}":"return this.data["+a+"]}"),i.push("proto.index=function "+n+"_index(",c.join(),"){return "+a+"}"),i.push("proto.hi=function "+n+"_hi("+c.join(",")+"){return new "+n+"(this.data,"+r.map(function(t){return["(typeof i",t,"!=='number'||i",t,"<0)?this._shape",t,":i",t,"|0"].join("")}).join(",")+","+r.map(function(t){return"this._stride"+t}).join(",")+",this.offset)}");var m=r.map(function(t){return"a"+t+"=this._shape"+t}),E=r.map(function(t){return"c"+t+"=this._stride"+t});i.push("proto.lo=function "+n+"_lo("+c.join(",")+"){var b=this.offset,d=0,"+m.join(",")+","+E.join(","));for(var s=0;e>s;++s)i.push("if(typeof i"+s+"==='number'&&i"+s+">=0){d=i"+s+"|0;b+=c"+s+"*d;a"+s+"-=d}");i.push("return new "+n+"(this.data,"+r.map(function(t){return"a"+t}).join(",")+","+r.map(function(t){return"c"+t}).join(",")+",b)}"),i.push("proto.step=function "+n+"_step("+c.join(",")+"){var "+r.map(function(t){return"a"+t+"=this._shape"+t}).join(",")+","+r.map(function(t){return"b"+t+"=this._stride"+t}).join(",")+",c=this.offset,d=0,ceil=Math.ceil");for(var s=0;e>s;++s)i.push("if(typeof i"+s+"==='number'){d=i"+s+"|0;if(d<0){c+=b"+s+"*(a"+s+"-1);a"+s+"=ceil(-a"+s+"/d)}else{a"+s+"=ceil(a"+s+"/d)}b"+s+"*=d}");i.push("return new "+n+"(this.data,"+r.map(function(t){return"a"+t}).join(",")+","+r.map(function(t){return"b"+t}).join(",")+",c)}");for(var x=new Array(e),b=new Array(e),s=0;e>s;++s)x[s]="a[i"+s+"]",b[s]="b[i"+s+"]";i.push("proto.transpose=function "+n+"_transpose("+c+"){"+c.map(function(t,e){return t+"=("+t+"===undefined?"+e+":"+t+"|0)"}).join(";"),"var a=this.shape,b=this.stride;return new "+n+"(this.data,"+x.join(",")+","+b.join(",")+",this.offset)}"),i.push("proto.pick=function "+n+"_pick("+c+"){var a=[],b=[],c=this.offset");for(var s=0;e>s;++s)i.push("if(typeof i"+s+"==='number'&&i"+s+">=0){c=(c+this._stride"+s+"*i"+s+")|0}else{a.push(this._shape"+s+");b.push(this._stride"+s+")}");i.push("var ctor=CTOR_LIST[a.length+1];return ctor(this.data,a,b,c)}"),i.push("return function construct_"+n+"(data,shape,stride,offset){return new "+n+"(data,"+r.map(function(t){return"shape["+t+"]"}).join(",")+","+r.map(function(t){return"stride["+t+"]"}).join(",")+",offset)}");var u=new Function("CTOR_LIST","ORDER",i.join("\n"));return u(CACHED_CONSTRUCTORS[t],order)}function arrayDType(t){if(hasBuffer&&Buffer.isBuffer(t))return"buffer";if(hasTypedArrays)switch(Object.prototype.toString.call(t)){case"[object Float64Array]":return"float64";case"[object Float32Array]":return"float32";case"[object Int8Array]":return"int8";case"[object Int16Array]":return"int16";case"[object Int32Array]":return"int32";case"[object Uint8Array]":return"uint8";case"[object Uint16Array]":return"uint16";case"[object Uint32Array]":return"uint32";case"[object Uint8ClampedArray]":return"uint8_clamped"}return Array.isArray(t)?"array":"generic"}function wrappedNDArrayCtor(t,e,n,o){if(void 0===t){var i=CACHED_CONSTRUCTORS.array[0];return i([])}"number"==typeof t&&(t=[t]),void 0===e&&(e=[t.length]);var u=e.length;if(void 0===n){n=new Array(u);for(var r=u-1,c=1;r>=0;--r)n[r]=c,c*=e[r]}if(void 0===o){o=0;for(var r=0;u>r;++r)n[r]<0&&(o-=(e[r]-1)*n[r])}for(var a=arrayDType(t),s=CACHED_CONSTRUCTORS[a];s.length<=u+1;)s.push(compileConstructor(a,s.length-1));var i=s[u+1];return i(t,e,n,o)}var iota=require("iota-array"),arrayMethods=["concat","join","slice","toString","indexOf","lastIndexOf","forEach","every","some","filter","map","reduce","reduceRight"],hasTypedArrays="undefined"!=typeof Float64Array,hasBuffer="undefined"!=typeof Buffer,CACHED_CONSTRUCTORS={float32:[],float64:[],int8:[],int16:[],int32:[],uint8:[],uint16:[],uint32:[],array:[],uint8_clamped:[],buffer:[],generic:[]};module.exports=wrappedNDArrayCtor;
  //# sourceMappingURL=ndarray.js.map
  global.define = __define;
  return module.exports;
});

System.register("npm:cwise-parser@0.0.1/index", ["esprima","uniq"], true, function(require, exports, __moduleName) {
  var global = System.global;
  var __define = global.define;
  global.define = undefined;
  var module = { exports: exports };
  var process = System.get("@@nodeProcess")["default"];
    var __filename = "jspm_packages/npm/cwise-parser@0.0.1/index.js";
    var __dirname = "jspm_packages/npm/cwise-parser@0.0.1";
  "format cjs";"use strict";function CompiledArgument(e,t,n){this.name=e,this.lvalue=t,this.rvalue=n,this.count=0}function CompiledRoutine(e,t,n,r){this.body=e,this.args=t,this.thisVars=n,this.localVars=r}function isGlobal(e){if("eval"===e)throw new Error("cwise-parser: eval() not allowed");return"undefined"!=typeof window?e in window:"undefined"!=typeof GLOBAL?e in GLOBAL:"undefined"!=typeof self?e in self:!1}function getArgNames(e){for(var t=e.body[0].expression.callee.params,n=new Array(t.length),r=0;r<t.length;++r)n[r]=t[r].name;return n}function preprocess(e){function t(e){var t=c+e.replace(/\_/g,"__");return m.push(t),t}function n(e){var t="this_"+e.replace(/\_/g,"__");return v.push(t),t}function r(e,t){for(var n=e.range[0],r=e.range[1],o=n+1;r>o;++o)p[o]="";p[n]=t}function o(e){return"'"+e.replace(/\_/g,"\\_").replace(/\'/g,"'")+"'"}function i(e){return p.slice(e.range[0],e.range[1]).join("")}function a(e){return"AssignmentExpression"===e.parent.type&&e.parent.left===e?"="===e.parent.operator?g:g|b:"UpdateExpression"===e.parent.type?g|b:b}for(var s=["(",e,")()"].join(""),u=esprima.parse(s,{range:!0}),c="_inline_"+PREFIX_COUNTER++ +"_",l=getArgNames(u),f=new Array(l.length),h=0;h<l.length;++h)f[h]=new CompiledArgument([c,"arg",h,"_"].join(""),!1,!1);for(var p=new Array(s.length),h=0,d=s.length;d>h;++h)p[h]=s.charAt(h);var m=[],v=[],g=1,b=2;!function x(e,i){if(e.parent=i,"MemberExpression"===e.type)e.computed?(x(e.object,e),x(e.property,e)):"ThisExpression"===e.object.type?r(e,n(e.property.name)):x(e.object,e);else{if("ThisExpression"===e.type)throw new Error("cwise-parser: Computed this is not allowed");if("Identifier"===e.type){var s=e.name,u=l.indexOf(s);if(u>=0){var c=f[u],h=a(e);h&g&&(c.lvalue=!0),h&b&&(c.rvalue=!0),++c.count,r(e,c.name)}else isGlobal(s)||r(e,t(s))}else if("Literal"===e.type)"string"==typeof e.value&&r(e,o(e.value));else{if("WithStatement"===e.type)throw new Error("cwise-parser: with() statements not allowed");for(var p=Object.keys(e),d=0,m=p.length;m>d;++d)if("parent"!==p[d]){var v=e[p[d]];if(v)if(v instanceof Array)for(var y=0;y<v.length;++y)v[y]&&"string"==typeof v[y].type&&x(v[y],e);else"string"==typeof v.type&&x(v,e)}}}}(u.body[0].expression.callee.body,void 0),uniq(m),uniq(v);var y=new CompiledRoutine(i(u.body[0].expression.callee.body),f,v,m);return y}var esprima=require("esprima"),uniq=require("uniq"),PREFIX_COUNTER=0;module.exports=preprocess;
  //# sourceMappingURL=index.js.map
  global.define = __define;
  return module.exports;
});

System.register("npm:ndarray-fft@0.1.0/lib/fft-matrix", ["bit-twiddle"], true, function(require, exports, __moduleName) {
  var global = System.global;
  var __define = global.define;
  global.define = undefined;
  var module = { exports: exports };
  var process = System.get("@@nodeProcess")["default"];
    var __filename = "jspm_packages/npm/ndarray-fft@0.1.0/lib/fft-matrix.js";
    var __dirname = "jspm_packages/npm/ndarray-fft@0.1.0/lib";
  "format cjs";function fft(e,t,n,r,o,i,a){e|=0,t|=0,n|=0,o|=0,i|=0,bits.isPow2(n)?fftRadix2(e,t,n,r,o,i):fftBluestein(e,t,n,r,o,i,a)}function scratchMemory(e){return bits.isPow2(e)?0:2*e+4*bits.nextPow2(2*e+1)}function fftRadix2(e,t,n,r,o,i){e|=0,t|=0,n|=0,o|=0,i|=0;var a,s,u,c,l,f,h,p,d,v,g,b,y,E,x,w,A,q,_,B,S,T,k,I;for(a=n,m=bits.log2(a),A=0;t>A;++A){for(f=a>>1,c=0,s=0;a-1>s;s++){for(c>s&&(b=r[o+s],r[o+s]=r[o+c],r[o+c]=b,b=r[i+s],r[i+s]=r[i+c],r[i+c]=b),l=f;c>=l;)c-=l,l>>=1;c+=l}for(v=-1,g=0,d=1,h=0;m>h;h++){for(p=d,d<<=1,x=1,w=0,c=0;p>c;c++){for(s=c;a>s;s+=d)u=s+p,q=r[o+u],_=r[i+u],B=r[o+s],S=r[i+s],T=x*(q+_),k=q*(w-x),I=_*(x+w),y=T-I,E=T+k,r[o+u]=B-y,r[i+u]=S-E,r[o+s]+=y,r[i+s]+=E;T=v*(x+w),k=x*(g-v),I=w*(v+g),x=T-I,w=T+k}g=Math.sqrt((1-v)/2),0>e&&(g=-g),v=Math.sqrt((1+v)/2)}if(0>e){var M=1/a;for(s=0;a>s;s++)r[o+s]*=M,r[i+s]*=M}o+=n,i+=n}}function fftBluestein(e,t,n,r,o,i,a){e|=0,t|=0,n|=0,o|=0,i|=0,a|=0;var s,u,c,l,f,h,p,d,m,v=bits.nextPow2(2*n+1),g=a,b=g+n,y=b+n,E=y+v,x=E+v,w=x+v,A=-e*Math.PI/n;for(m=0;n>m;++m)u=A*(m*m%(2*n)),l=Math.cos(u),f=Math.sin(u),r[x+(v-m)]=r[x+m]=r[g+m]=l,r[w+(v-m)]=r[w+m]=r[b+m]=f;for(m=n;v-n>=m;++m)r[x+m]=0;for(m=n;v-n>=m;++m)r[w+m]=0;for(fftRadix2(1,1,v,r,x,w),A=0>e?1/n:1,s=0;t>s;++s){for(m=0;n>m;++m)u=r[o+m],c=r[i+m],l=r[g+m],f=-r[b+m],h=l*(u+c),p=u*(f-l),d=c*(l+f),r[y+m]=h-d,r[E+m]=h+p;for(m=n;v>m;++m)r[y+m]=0;for(m=n;v>m;++m)r[E+m]=0;for(fftRadix2(1,1,v,r,y,E),m=0;v>m;++m)u=r[y+m],c=r[E+m],l=r[x+m],f=r[w+m],h=l*(u+c),p=u*(f-l),d=c*(l+f),r[y+m]=h-d,r[E+m]=h+p;for(fftRadix2(-1,1,v,r,y,E),m=0;n>m;++m)u=r[y+m],c=r[E+m],l=r[g+m],f=-r[b+m],h=l*(u+c),p=u*(f-l),d=c*(l+f),r[o+m]=A*(h-d),r[i+m]=A*(h+p);o+=n,i+=n}}var bits=require("bit-twiddle");module.exports=fft,module.exports.scratchMemory=scratchMemory;
  //# sourceMappingURL=fft-matrix.js.map
  global.define = __define;
  return module.exports;
});

System.register("npm:typedarray-pool@0.1.2/pool", ["bit-twiddle","dup"], true, function(require, exports, __moduleName) {
  var global = System.global;
  var __define = global.define;
  global.define = undefined;
  var module = { exports: exports };
  var process = System.get("@@nodeProcess")["default"];
    var __filename = "jspm_packages/npm/typedarray-pool@0.1.2/pool.js";
    var __dirname = "jspm_packages/npm/typedarray-pool@0.1.2";
  "format cjs";"use strict";var bits=require("bit-twiddle"),dup=require("dup");global.__TYPEDARRAY_POOL||(global.__TYPEDARRAY_POOL={UINT8:dup([32,0]),UINT16:dup([32,0]),UINT32:dup([32,0]),INT8:dup([32,0]),INT16:dup([32,0]),INT32:dup([32,0]),FLOAT:dup([32,0]),DOUBLE:dup([32,0]),DATA:dup([32,0])});var POOL=global.__TYPEDARRAY_POOL,UINT8=POOL.UINT8,UINT16=POOL.UINT16,UINT32=POOL.UINT32,INT8=POOL.INT8,INT16=POOL.INT16,INT32=POOL.INT32,FLOAT=POOL.FLOAT,DOUBLE=POOL.DOUBLE,DATA=POOL.DATA;exports.free=function(t){if(t instanceof ArrayBuffer){var e=0|t.byteLength,n=bits.log2(e);DATA[n].push(t)}else{var e=0|t.length,n=bits.log2(e);t instanceof Uint8Array?UINT8[n].push(t):t instanceof Uint16Array?UINT16[n].push(t):t instanceof Uint32Array?UINT32[n].push(t):t instanceof Int8Array?INT8[n].push(t):t instanceof Int16Array?INT16[n].push(t):t instanceof Int32Array?INT32[n].push(t):t instanceof Float32Array?FLOAT[n].push(t):t instanceof Float64Array&&DOUBLE[n].push(t)}},exports.freeUint8=function(t){UINT8[bits.log2(t.length)].push(t)},exports.freeUint16=function(t){UINT16[bits.log2(t.length)].push(t)},exports.freeUint32=function(t){UINT32[bits.log2(t.length)].push(t)},exports.freeInt8=function(t){INT8[bits.log2(t.length)].push(t)},exports.freeInt16=function(t){INT16[bits.log2(t.length)].push(t)},exports.freeInt32=function(t){INT32[bits.log2(t.length)].push(t)},exports.freeFloat32=exports.freeFloat=function(t){FLOAT[bits.log2(t.length)].push(t)},exports.freeFloat64=exports.freeDouble=function(t){DOUBLE[bits.log2(t.length)].push(t)},exports.freeArrayBuffer=function(t){DATA[bits.log2(t.length)].push(t)},exports.malloc=function(t,e){t=bits.nextPow2(t);var n=bits.log2(t);if(void 0===e){var o=DATA[n];if(o.length>0){var i=o[o.length-1];return o.pop(),i}return new ArrayBuffer(t)}switch(e){case"uint8":var u=UINT8[n];return u.length>0?u.pop():new Uint8Array(t);case"uint16":var r=UINT16[n];return r.length>0?r.pop():new Uint16Array(t);case"uint32":var c=UINT32[n];return c.length>0?c.pop():new Uint32Array(t);case"int8":var a=INT8[n];return a.length>0?a.pop():new Int8Array(t);case"int16":var s=INT16[n];return s.length>0?s.pop():new Int16Array(t);case"int32":var f=INT32[n];return f.length>0?f.pop():new Int32Array(t);case"float":case"float32":var l=FLOAT[n];return l.length>0?l.pop():new Float32Array(t);case"double":case"float64":var h=DOUBLE[n];return h.length>0?h.pop():new Float64Array(t);default:return null}return null},exports.mallocUint8=function(t){t=bits.nextPow2(t);var e=bits.log2(t),n=UINT8[e];return n.length>0?n.pop():new Uint8Array(t)},exports.mallocUint16=function(t){t=bits.nextPow2(t);var e=bits.log2(t),n=UINT16[e];return n.length>0?n.pop():new Uint16Array(t)},exports.mallocUint32=function(t){t=bits.nextPow2(t);var e=bits.log2(t),n=UINT32[e];return n.length>0?n.pop():new Uint32Array(t)},exports.mallocInt8=function(t){t=bits.nextPow2(t);var e=bits.log2(t),n=INT8[e];return n.length>0?n.pop():new Int8Array(t)},exports.mallocInt16=function(t){t=bits.nextPow2(t);var e=bits.log2(t),n=INT16[e];return n.length>0?n.pop():new Int16Array(t)},exports.mallocInt32=function(t){t=bits.nextPow2(t);var e=bits.log2(t),n=INT32[e];return n.length>0?n.pop():new Int32Array(t)},exports.mallocFloat32=exports.mallocFloat=function(t){t=bits.nextPow2(t);var e=bits.log2(t),n=FLOAT[e];return n.length>0?n.pop():new Float32Array(t)},exports.mallocFloat64=exports.mallocDouble=function(t){t=bits.nextPow2(t);var e=bits.log2(t),n=DOUBLE[e];return n.length>0?n.pop():new Float64Array(t)},exports.mallocArrayBuffer=function(t){t=bits.nextPow2(t);var e=bits.log2(t),n=DATA[e];return n.length>0?n.pop():new ArrayBuffer(t)},exports.clearCache=function(){for(var t=0;32>t;++t)UINT8[t].length=0,UINT16[t].length=0,UINT32[t].length=0,INT8[t].length=0,INT16[t].length=0,INT32[t].length=0,FLOAT[t].length=0,DOUBLE[t].length=0,DATA[t].length=0};
  //# sourceMappingURL=pool.js.map
  global.define = __define;
  return module.exports;
});

System.register("npm:typedarray-pool@1.0.2/pool", ["bit-twiddle","dup"], true, function(require, exports, __moduleName) {
  var global = System.global;
  var __define = global.define;
  global.define = undefined;
  var module = { exports: exports };
  var process = System.get("@@nodeProcess")["default"];
    var __filename = "jspm_packages/npm/typedarray-pool@1.0.2/pool.js";
    var __dirname = "jspm_packages/npm/typedarray-pool@1.0.2";
  "format cjs";var bits=require("bit-twiddle"),dup=require("dup");global.__TYPEDARRAY_POOL||(global.__TYPEDARRAY_POOL={UINT8:dup([32,0]),UINT16:dup([32,0]),UINT32:dup([32,0]),INT8:dup([32,0]),INT16:dup([32,0]),INT32:dup([32,0]),FLOAT:dup([32,0]),DOUBLE:dup([32,0]),DATA:dup([32,0]),UINT8C:dup([32,0]),BUFFER:dup([32,0])});var hasUint8C="undefined"!=typeof Uint8ClampedArray,POOL=global.__TYPEDARRAY_POOL;POOL.UINT8C||(POOL.UINT8C=dup([32,0])),POOL.BUFFER||(POOL.BUFFER=dup([32,0]));var UINT8=POOL.UINT8,UINT16=POOL.UINT16,UINT32=POOL.UINT32,INT8=POOL.INT8,INT16=POOL.INT16,INT32=POOL.INT32,FLOAT=POOL.FLOAT,DOUBLE=POOL.DOUBLE,DATA=POOL.DATA,UINT8C=POOL.UINT8C,BUFFER=POOL.BUFFER;exports.free=function(e){var t=0|e.length,n=bits.log2(t);if(Buffer.isBuffer(e))BUFFER[n].push(e);else switch(Object.prototype.toString.call(e)){case"[object Uint8Array]":UINT8[n].push(e);break;case"[object Uint16Array]":UINT16[n].push(e);break;case"[object Uint32Array]":UINT32[n].push(e);break;case"[object Int8Array]":INT8[n].push(e);break;case"[object Int16Array]":INT16[n].push(e);break;case"[object Int32Array]":INT32[n].push(e);break;case"[object Uint8ClampedArray]":UINT8C[n].push(e);break;case"[object Float32Array]":FLOAT[n].push(e);break;case"[object Float64Array]":DOUBLE[n].push(e);break;case"[object ArrayBuffer]":DATA[n].push(e);break;default:throw new Error("typedarray-pool: Unspecified array type")}},exports.freeUint8=function(e){UINT8[bits.log2(e.length)].push(e)},exports.freeUint16=function(e){UINT16[bits.log2(e.length)].push(e)},exports.freeUint32=function(e){UINT32[bits.log2(e.length)].push(e)},exports.freeInt8=function(e){INT8[bits.log2(e.length)].push(e)},exports.freeInt16=function(e){INT16[bits.log2(e.length)].push(e)},exports.freeInt32=function(e){INT32[bits.log2(e.length)].push(e)},exports.freeFloat32=exports.freeFloat=function(e){FLOAT[bits.log2(e.length)].push(e)},exports.freeFloat64=exports.freeDouble=function(e){DOUBLE[bits.log2(e.length)].push(e)},exports.freeArrayBuffer=function(e){DATA[bits.log2(e.length)].push(e)},exports.freeUint8Clamped=hasUint8C?function(e){UINT8C[bits.log2(e.length)].push(e)}:exports.freeUint8,exports.freeBuffer=function(e){BUFFER[bits.log2(e.length)].push(e)},exports.malloc=function(e,t){e=bits.nextPow2(e);var n=bits.log2(e);if(void 0===t||"arraybuffer"===t){var r=DATA[n];if(r.length>0){var o=r[r.length-1];return r.pop(),o}return new ArrayBuffer(e)}switch(t){case"uint8":var i=UINT8[n];return i.length>0?i.pop():new Uint8Array(e);case"uint16":var a=UINT16[n];return a.length>0?a.pop():new Uint16Array(e);case"uint32":var u=UINT32[n];return u.length>0?u.pop():new Uint32Array(e);case"int8":var s=INT8[n];return s.length>0?s.pop():new Int8Array(e);case"int16":var c=INT16[n];return c.length>0?c.pop():new Int16Array(e);case"int32":var l=INT32[n];return l.length>0?l.pop():new Int32Array(e);case"float":case"float32":var f=FLOAT[n];return f.length>0?f.pop():new Float32Array(e);case"double":case"float64":var h=DOUBLE[n];return h.length>0?h.pop():new Float64Array(e);case"uint8_clamped":if(hasUint8C){var p=UINT8C[n];return p.length>0?p.pop():new Uint8ClampedArray(e)}var i=UINT8[n];return i.length>0?i.pop():new Uint8Array(e);case"buffer":var d=BUFFER[n];return d.length>0?d.pop():new Buffer(e);default:return null}return null},exports.mallocUint8=function(e){e=bits.nextPow2(e);var t=bits.log2(e),n=UINT8[t];return n.length>0?n.pop():new Uint8Array(e)},exports.mallocUint16=function(e){e=bits.nextPow2(e);var t=bits.log2(e),n=UINT16[t];return n.length>0?n.pop():new Uint16Array(e)},exports.mallocUint32=function(e){e=bits.nextPow2(e);var t=bits.log2(e),n=UINT32[t];return n.length>0?n.pop():new Uint32Array(e)},exports.mallocInt8=function(e){e=bits.nextPow2(e);var t=bits.log2(e),n=INT8[t];return n.length>0?n.pop():new Int8Array(e)},exports.mallocInt16=function(e){e=bits.nextPow2(e);var t=bits.log2(e),n=INT16[t];return n.length>0?n.pop():new Int16Array(e)},exports.mallocInt32=function(e){e=bits.nextPow2(e);var t=bits.log2(e),n=INT32[t];return n.length>0?n.pop():new Int32Array(e)},exports.mallocFloat32=exports.mallocFloat=function(e){e=bits.nextPow2(e);var t=bits.log2(e),n=FLOAT[t];return n.length>0?n.pop():new Float32Array(e)},exports.mallocFloat64=exports.mallocDouble=function(e){e=bits.nextPow2(e);var t=bits.log2(e),n=DOUBLE[t];return n.length>0?n.pop():new Float64Array(e)},exports.mallocArrayBuffer=function(e){e=bits.nextPow2(e);var t=bits.log2(e),n=DATA[t];return n.length>0?n.pop():new ArrayBuffer(e)},exports.mallocUint8Clamped=hasUint8C?function(e){e=bits.nextPow2(e);var t=bits.log2(e),n=UINT8C[t];return n.length>0?n.pop():new Uint8ClampedArray(e)}:exports.mallocUint8,exports.mallocBuffer=function(e){e=bits.nextPow2(e);var t=bits.log2(e),n=BUFFER[t];return n.length>0?n.pop():new Buffer(e)},exports.clearCache=function(){for(var e=0;32>e;++e)UINT8[e].length=0,UINT16[e].length=0,UINT32[e].length=0,INT8[e].length=0,INT16[e].length=0,INT32[e].length=0,FLOAT[e].length=0,DOUBLE[e].length=0,DATA[e].length=0,UINT8C[e].length=0,BUFFER[e].length=0};
  //# sourceMappingURL=pool.js.map
  global.define = __define;
  return module.exports;
});

System.register("npm:gl-vao@0.0.3/vao", ["webglew","./lib/vao-native","./lib/vao-emulated"], true, function(require, exports, __moduleName) {
  var global = System.global;
  var __define = global.define;
  global.define = undefined;
  var module = { exports: exports };
  var process = System.get("@@nodeProcess")["default"];
    var __filename = "jspm_packages/npm/gl-vao@0.0.3/vao.js";
    var __dirname = "jspm_packages/npm/gl-vao@0.0.3";
  "format cjs";"use strict";function createVAO(e,t,n){var r,o=webglew(e).OES_vertex_array_object;return r=o?createVAONative(e,o):createVAOEmulated(e),r.update(t,n),r}var webglew=require("webglew"),createVAONative=require("./lib/vao-native"),createVAOEmulated=require("./lib/vao-emulated");module.exports=createVAO;
  //# sourceMappingURL=vao.js.map
  global.define = __define;
  return module.exports;
});

System.register("npm:greedy-mesher@1.0.2/greedy", ["typedarray-pool","uniq","iota-array"], true, function(require, exports, __moduleName) {
  var global = System.global;
  var __define = global.define;
  global.define = undefined;
  var module = { exports: exports };
  var process = System.get("@@nodeProcess")["default"];
    var __filename = "jspm_packages/npm/greedy-mesher@1.0.2/greedy.js";
    var __dirname = "jspm_packages/npm/greedy-mesher@1.0.2";
  "format cjs";"use strict";function generateMesher(e,t,n,r,o,a,i){var s,u,c=[],l=e.length,f=new Array(2*l+1+o);for(s=0;l>s;++s)f[s]="i"+s;for(s=0;l>s;++s)f[s+l]="j"+s;f[2*l]="oval";var h=new Array(o);for(s=0;o>s;++s)h[s]="opt"+s,f[2*l+1+s]="opt"+s;c.push("var data=array.data,offset=array.offset,shape=array.shape,stride=array.stride");for(var s=0;l>s;++s)c.push(["var stride",s,"=stride[",e[s],"]|0,shape",s,"=shape[",e[s],"]|0"].join("")),c.push(s>0?["var astep",s,"=(stride",s,"-stride",s-1,"*shape",s-1,")|0"].join(""):["var astep",s,"=stride",s,"|0"].join("")),c.push(s>0?["var vstep",s,"=(vstep",s-1,"*shape",s-1,")|0"].join(""):["var vstep",s,"=1"].join("")),c.push(["var i",s,"=0,j",s,"=0,k",s,"=0,ustep",s,"=vstep",s,"|0,bstep",s,"=astep",s,"|0"].join(""));for(c.push("var a_ptr=offset>>>0,b_ptr=0,u_ptr=0,v_ptr=0,i=0,d=0,val=0,oval=0"),c.push("var count="+iota(l).map(function(e){return"shape"+e}).join("*")),c.push("var visited=mallocUint8(count)"),c.push("for(;i<count;++i){visited[i]=0}"),s=l-1;s>=0;--s)c.push(["for(i",s,"=0;i",s,"<shape",s,";++i",s,"){"].join(""));for(c.push("if(!visited[v_ptr]){"),c.push(i?"val=data.get(a_ptr)":"val=data[a_ptr]"),c.push(t?"if(!skip(val)){":"if(val!==0){"),c.push("oval = val"),s=0;l>s;++s){for(c.push("u_ptr=v_ptr+vstep"+s),c.push("b_ptr=a_ptr+stride"+s),c.push(["j",s,"_loop: for(j",s,"=1+i",s,";j",s,"<shape",s,";++j",s,"){"].join("")),u=s-1;u>=0;--u)c.push(["for(k",u,"=i",u,";k",u,"<j",u,";++k",u,"){"].join(""));for(c.push("if(visited[u_ptr]) { break j"+s+"_loop; }"),c.push(i?"val=data.get(b_ptr)":"val=data[b_ptr]"),c.push(t&&n?"if(skip(val) || !merge(oval,val)){ break j"+s+"_loop; }":t?"if(skip(val) || val !== oval){ break j"+s+"_loop; }":n?"if(val === 0 || !merge(oval,val)){ break j"+s+"_loop; }":"if(val === 0 || val !== oval){ break j"+s+"_loop; }"),c.push("++u_ptr"),c.push("b_ptr+=stride0"),c.push("}"),u=1;s>=u;++u)c.push("u_ptr+=ustep"+u),c.push("b_ptr+=bstep"+u),c.push("}");l-1>s&&(c.push("d=j"+s+"-i"+s),c.push(["ustep",s+1,"=(vstep",s+1,"-vstep",s,"*d)|0"].join("")),c.push(["bstep",s+1,"=(stride",s+1,"-stride",s,"*d)|0"].join("")))}for(c.push("u_ptr=v_ptr"),s=l-1;s>=0;--s)c.push(["for(k",s,"=i",s,";k",s,"<j",s,";++k",s,"){"].join(""));for(c.push("visited[u_ptr++]=1"),c.push("}"),s=1;l>s;++s)c.push("u_ptr+=ustep"+s),c.push("}");c.push("append("+f.join(",")+")"),c.push("}"),c.push("}"),c.push("++v_ptr");for(var s=0;l>s;++s)c.push("a_ptr+=astep"+s),c.push("}");c.push("freeUint8(visited)"),a.debug&&(console.log("GENERATING MESHER:"),console.log(c.join("\n")));var p=["append","mallocUint8","freeUint8"];n&&p.unshift("merge"),t&&p.unshift("skip");var d=["array"].concat(h),m=["greedyMesher",l,"d_ord",e.join("s"),t?"skip":"",n?"merge":""].join(""),v=["'use strict';function ",m,"(",d.join(","),"){",c.join("\n"),"};return ",m].join("");p.push(v);var g=Function.apply(void 0,p);return t&&n?g(t,n,r,pool.mallocUint8,pool.freeUint8):t?g(t,r,pool.mallocUint8,pool.freeUint8):n?g(n,r,pool.mallocUint8,pool.freeUint8):g(r,pool.mallocUint8,pool.freeUint8)}function compileMesher(e){if(e=e||{},!e.order)throw new Error("greedy-mesher: Missing order field");if(!e.append)throw new Error("greedy-mesher: Missing append field");return generateMesher(e.order,e.skip,e.merge,e.append,0|e.extraArgs,e,!!e.useGetter)}var pool=require("typedarray-pool"),uniq=require("uniq"),iota=require("iota-array");module.exports=compileMesher;
  //# sourceMappingURL=greedy.js.map
  global.define = __define;
  return module.exports;
});

System.register("github:jspm/nodelibs@0.0.2/buffer", ["npm:base64-js@^0.0.4","npm:ieee754@^1.1.1"], true, function(require, exports, __moduleName) {
  var global = System.global;
  var __define = global.define;
  global.define = undefined;
  var module = { exports: exports };
  var process = System.get("@@nodeProcess")["default"];
    var __filename = "jspm_packages/github/jspm/nodelibs@0.0.2/buffer.js";
    var __dirname = "jspm_packages/github/jspm/nodelibs@0.0.2";
  "format cjs";function Buffer(e,t,n){if(!(this instanceof Buffer))return new Buffer(e,t,n);var r=typeof e;if("base64"===t&&"string"===r)for(e=stringtrim(e);e.length%4!==0;)e+="=";var o;if("number"===r)o=coerce(e);else if("string"===r)o=Buffer.byteLength(e,t);else{if("object"!==r)throw new Error("First argument needs to be a number, array or string.");o=coerce(e.length)}var i;Buffer._useTypedArrays?i=augment(new Uint8Array(o)):(i=this,i.length=o,i._isBuffer=!0);var a;if(Buffer._useTypedArrays&&"function"==typeof Uint8Array&&e instanceof Uint8Array)i._set(e);else if(isArrayish(e))for(a=0;o>a;a++)i[a]=Buffer.isBuffer(e)?e.readUInt8(a):e[a];else if("string"===r)i.write(e,0,t);else if("number"===r&&!Buffer._useTypedArrays&&!n)for(a=0;o>a;a++)i[a]=0;return i}function _hexWrite(e,t,n,r){n=Number(n)||0;var o=e.length-n;r?(r=Number(r),r>o&&(r=o)):r=o;var i=t.length;assert(i%2===0,"Invalid hex string"),r>i/2&&(r=i/2);for(var a=0;r>a;a++){var s=parseInt(t.substr(2*a,2),16);assert(!isNaN(s),"Invalid hex string"),e[n+a]=s}return Buffer._charsWritten=2*a,a}function _utf8Write(e,t,n,r){var o=Buffer._charsWritten=blitBuffer(utf8ToBytes(t),e,n,r);return o}function _asciiWrite(e,t,n,r){var o=Buffer._charsWritten=blitBuffer(asciiToBytes(t),e,n,r);return o}function _binaryWrite(e,t,n,r){return _asciiWrite(e,t,n,r)}function _base64Write(e,t,n,r){var o=Buffer._charsWritten=blitBuffer(base64ToBytes(t),e,n,r);return o}function _base64Slice(e,t,n){return base64.fromByteArray(0===t&&n===e.length?e:e.slice(t,n))}function _utf8Slice(e,t,n){var r="",o="";n=Math.min(e.length,n);for(var i=t;n>i;i++)e[i]<=127?(r+=decodeUtf8Char(o)+String.fromCharCode(e[i]),o=""):o+="%"+e[i].toString(16);return r+decodeUtf8Char(o)}function _asciiSlice(e,t,n){var r="";n=Math.min(e.length,n);for(var o=t;n>o;o++)r+=String.fromCharCode(e[o]);return r}function _binarySlice(e,t,n){return _asciiSlice(e,t,n)}function _hexSlice(e,t,n){var r=e.length;(!t||0>t)&&(t=0),(!n||0>n||n>r)&&(n=r);for(var o="",i=t;n>i;i++)o+=toHex(e[i]);return o}function _readUInt16(e,t,n,r){r||(assert("boolean"==typeof n,"missing or invalid endian"),assert(void 0!==t&&null!==t,"missing offset"),assert(t+1<e.length,"Trying to read beyond buffer length"));var o=e.length;if(!(t>=o)){var i;return n?(i=e[t],o>t+1&&(i|=e[t+1]<<8)):(i=e[t]<<8,o>t+1&&(i|=e[t+1])),i}}function _readUInt32(e,t,n,r){r||(assert("boolean"==typeof n,"missing or invalid endian"),assert(void 0!==t&&null!==t,"missing offset"),assert(t+3<e.length,"Trying to read beyond buffer length"));var o=e.length;if(!(t>=o)){var i;return n?(o>t+2&&(i=e[t+2]<<16),o>t+1&&(i|=e[t+1]<<8),i|=e[t],o>t+3&&(i+=e[t+3]<<24>>>0)):(o>t+1&&(i=e[t+1]<<16),o>t+2&&(i|=e[t+2]<<8),o>t+3&&(i|=e[t+3]),i+=e[t]<<24>>>0),i}}function _readInt16(e,t,n,r){r||(assert("boolean"==typeof n,"missing or invalid endian"),assert(void 0!==t&&null!==t,"missing offset"),assert(t+1<e.length,"Trying to read beyond buffer length"));var o=e.length;if(!(t>=o)){var i=_readUInt16(e,t,n,!0),a=32768&i;return a?-1*(65535-i+1):i}}function _readInt32(e,t,n,r){r||(assert("boolean"==typeof n,"missing or invalid endian"),assert(void 0!==t&&null!==t,"missing offset"),assert(t+3<e.length,"Trying to read beyond buffer length"));var o=e.length;if(!(t>=o)){var i=_readUInt32(e,t,n,!0),a=2147483648&i;return a?-1*(4294967295-i+1):i}}function _readFloat(e,t,n,r){return r||(assert("boolean"==typeof n,"missing or invalid endian"),assert(t+3<e.length,"Trying to read beyond buffer length")),ieee754.read(e,t,n,23,4)}function _readDouble(e,t,n,r){return r||(assert("boolean"==typeof n,"missing or invalid endian"),assert(t+7<e.length,"Trying to read beyond buffer length")),ieee754.read(e,t,n,52,8)}function _writeUInt16(e,t,n,r,o){o||(assert(void 0!==t&&null!==t,"missing value"),assert("boolean"==typeof r,"missing or invalid endian"),assert(void 0!==n&&null!==n,"missing offset"),assert(n+1<e.length,"trying to write beyond buffer length"),verifuint(t,65535));var i=e.length;if(!(n>=i))for(var a=0,s=Math.min(i-n,2);s>a;a++)e[n+a]=(t&255<<8*(r?a:1-a))>>>8*(r?a:1-a)}function _writeUInt32(e,t,n,r,o){o||(assert(void 0!==t&&null!==t,"missing value"),assert("boolean"==typeof r,"missing or invalid endian"),assert(void 0!==n&&null!==n,"missing offset"),assert(n+3<e.length,"trying to write beyond buffer length"),verifuint(t,4294967295));var i=e.length;if(!(n>=i))for(var a=0,s=Math.min(i-n,4);s>a;a++)e[n+a]=t>>>8*(r?a:3-a)&255}function _writeInt16(e,t,n,r,o){o||(assert(void 0!==t&&null!==t,"missing value"),assert("boolean"==typeof r,"missing or invalid endian"),assert(void 0!==n&&null!==n,"missing offset"),assert(n+1<e.length,"Trying to write beyond buffer length"),verifsint(t,32767,-32768));var i=e.length;n>=i||(t>=0?_writeUInt16(e,t,n,r,o):_writeUInt16(e,65535+t+1,n,r,o))}function _writeInt32(e,t,n,r,o){o||(assert(void 0!==t&&null!==t,"missing value"),assert("boolean"==typeof r,"missing or invalid endian"),assert(void 0!==n&&null!==n,"missing offset"),assert(n+3<e.length,"Trying to write beyond buffer length"),verifsint(t,2147483647,-2147483648));var i=e.length;n>=i||(t>=0?_writeUInt32(e,t,n,r,o):_writeUInt32(e,4294967295+t+1,n,r,o))}function _writeFloat(e,t,n,r,o){o||(assert(void 0!==t&&null!==t,"missing value"),assert("boolean"==typeof r,"missing or invalid endian"),assert(void 0!==n&&null!==n,"missing offset"),assert(n+3<e.length,"Trying to write beyond buffer length"),verifIEEE754(t,3.4028234663852886e38,-3.4028234663852886e38));var i=e.length;n>=i||ieee754.write(e,t,n,r,23,4)}function _writeDouble(e,t,n,r,o){o||(assert(void 0!==t&&null!==t,"missing value"),assert("boolean"==typeof r,"missing or invalid endian"),assert(void 0!==n&&null!==n,"missing offset"),assert(n+7<e.length,"Trying to write beyond buffer length"),verifIEEE754(t,1.7976931348623157e308,-1.7976931348623157e308));var i=e.length;n>=i||ieee754.write(e,t,n,r,52,8)}function stringtrim(e){return e.trim?e.trim():e.replace(/^\s+|\s+$/g,"")}function augment(e){return e._isBuffer=!0,e._get=e.get,e._set=e.set,e.get=BP.get,e.set=BP.set,e.write=BP.write,e.toString=BP.toString,e.toLocaleString=BP.toString,e.toJSON=BP.toJSON,e.copy=BP.copy,e.slice=BP.slice,e.readUInt8=BP.readUInt8,e.readUInt16LE=BP.readUInt16LE,e.readUInt16BE=BP.readUInt16BE,e.readUInt32LE=BP.readUInt32LE,e.readUInt32BE=BP.readUInt32BE,e.readInt8=BP.readInt8,e.readInt16LE=BP.readInt16LE,e.readInt16BE=BP.readInt16BE,e.readInt32LE=BP.readInt32LE,e.readInt32BE=BP.readInt32BE,e.readFloatLE=BP.readFloatLE,e.readFloatBE=BP.readFloatBE,e.readDoubleLE=BP.readDoubleLE,e.readDoubleBE=BP.readDoubleBE,e.writeUInt8=BP.writeUInt8,e.writeUInt16LE=BP.writeUInt16LE,e.writeUInt16BE=BP.writeUInt16BE,e.writeUInt32LE=BP.writeUInt32LE,e.writeUInt32BE=BP.writeUInt32BE,e.writeInt8=BP.writeInt8,e.writeInt16LE=BP.writeInt16LE,e.writeInt16BE=BP.writeInt16BE,e.writeInt32LE=BP.writeInt32LE,e.writeInt32BE=BP.writeInt32BE,e.writeFloatLE=BP.writeFloatLE,e.writeFloatBE=BP.writeFloatBE,e.writeDoubleLE=BP.writeDoubleLE,e.writeDoubleBE=BP.writeDoubleBE,e.fill=BP.fill,e.inspect=BP.inspect,e.toArrayBuffer=BP.toArrayBuffer,e}function clamp(e,t,n){return"number"!=typeof e?n:(e=~~e,e>=t?t:e>=0?e:(e+=t,e>=0?e:0))}function coerce(e){return e=~~Math.ceil(+e),0>e?0:e}function isArray(e){return(Array.isArray||function(e){return"[object Array]"===Object.prototype.toString.call(e)})(e)}function isArrayish(e){return isArray(e)||Buffer.isBuffer(e)||e&&"object"==typeof e&&"number"==typeof e.length}function toHex(e){return 16>e?"0"+e.toString(16):e.toString(16)}function utf8ToBytes(e){for(var t=[],n=0;n<e.length;n++){var r=e.charCodeAt(n);if(127>=r)t.push(e.charCodeAt(n));else{var o=n;r>=55296&&57343>=r&&n++;for(var i=encodeURIComponent(e.slice(o,n+1)).substr(1).split("%"),a=0;a<i.length;a++)t.push(parseInt(i[a],16))}}return t}function asciiToBytes(e){for(var t=[],n=0;n<e.length;n++)t.push(255&e.charCodeAt(n));return t}function base64ToBytes(e){return base64.toByteArray(e)}function blitBuffer(e,t,n,r){for(var o=0;r>o&&!(o+n>=t.length||o>=e.length);o++)t[o+n]=e[o];return o}function decodeUtf8Char(e){try{return decodeURIComponent(e)}catch(t){return String.fromCharCode(65533)}}function verifuint(e,t){assert("number"==typeof e,"cannot write a non-number as a number"),assert(e>=0,"specified a negative value for writing an unsigned value"),assert(t>=e,"value is larger than maximum value for type"),assert(Math.floor(e)===e,"value has a fractional component")}function verifsint(e,t,n){assert("number"==typeof e,"cannot write a non-number as a number"),assert(t>=e,"value larger than maximum allowed value"),assert(e>=n,"value smaller than minimum allowed value"),assert(Math.floor(e)===e,"value has a fractional component")}function verifIEEE754(e,t,n){assert("number"==typeof e,"cannot write a non-number as a number"),assert(t>=e,"value larger than maximum allowed value"),assert(e>=n,"value smaller than minimum allowed value")}function assert(e,t){if(!e)throw new Error(t||"Failed assertion")}var base64=require("npm:base64-js@^0.0.4"),ieee754=require("npm:ieee754@^1.1.1");exports.Buffer=Buffer,exports.SlowBuffer=Buffer,exports.INSPECT_MAX_BYTES=50,Buffer.poolSize=8192,Buffer._useTypedArrays=function(){if("undefined"==typeof Uint8Array||"undefined"==typeof ArrayBuffer)return!1;try{var e=new Uint8Array(0);return e.foo=function(){return 42},42===e.foo()&&"function"==typeof e.subarray}catch(t){return!1}}(),Buffer.isEncoding=function(e){switch(String(e).toLowerCase()){case"hex":case"utf8":case"utf-8":case"ascii":case"binary":case"base64":case"raw":case"ucs2":case"ucs-2":case"utf16le":case"utf-16le":return!0;default:return!1}},Buffer.isBuffer=function(e){return!(null===e||void 0===e||!e._isBuffer)},Buffer.byteLength=function(e,t){var n;switch(e+="",t||"utf8"){case"hex":n=e.length/2;break;case"utf8":case"utf-8":n=utf8ToBytes(e).length;break;case"ascii":case"binary":case"raw":n=e.length;break;case"base64":n=base64ToBytes(e).length;break;case"ucs2":case"ucs-2":case"utf16le":case"utf-16le":n=2*e.length;break;default:throw new Error("Unknown encoding")}return n},Buffer.concat=function(e,t){if(assert(isArray(e),"Usage: Buffer.concat(list, [totalLength])\nlist should be an Array."),0===e.length)return new Buffer(0);if(1===e.length)return e[0];var n;if("number"!=typeof t)for(t=0,n=0;n<e.length;n++)t+=e[n].length;var r=new Buffer(t),o=0;for(n=0;n<e.length;n++){var i=e[n];i.copy(r,o),o+=i.length}return r},Buffer.prototype.write=function(e,t,n,r){if(isFinite(t))isFinite(n)||(r=n,n=void 0);else{var o=r;r=t,t=n,n=o}t=Number(t)||0;var i=this.length-t;switch(n?(n=Number(n),n>i&&(n=i)):n=i,r=String(r||"utf8").toLowerCase()){case"hex":return _hexWrite(this,e,t,n);case"utf8":case"utf-8":case"ucs2":case"ucs-2":case"utf16le":case"utf-16le":return _utf8Write(this,e,t,n);case"ascii":return _asciiWrite(this,e,t,n);case"binary":return _binaryWrite(this,e,t,n);case"base64":return _base64Write(this,e,t,n);default:throw new Error("Unknown encoding")}},Buffer.prototype.toString=function(e,t,n){var r=this;if(e=String(e||"utf8").toLowerCase(),t=Number(t)||0,n=void 0!==n?Number(n):n=r.length,n===t)return"";switch(e){case"hex":return _hexSlice(r,t,n);case"utf8":case"utf-8":case"ucs2":case"ucs-2":case"utf16le":case"utf-16le":return _utf8Slice(r,t,n);case"ascii":return _asciiSlice(r,t,n);case"binary":return _binarySlice(r,t,n);case"base64":return _base64Slice(r,t,n);default:throw new Error("Unknown encoding")}},Buffer.prototype.toJSON=function(){return{type:"Buffer",data:Array.prototype.slice.call(this._arr||this,0)}},Buffer.prototype.copy=function(e,t,n,r){var o=this;if(n||(n=0),r||0===r||(r=this.length),t||(t=0),r!==n&&0!==e.length&&0!==o.length){assert(r>=n,"sourceEnd < sourceStart"),assert(t>=0&&t<e.length,"targetStart out of bounds"),assert(n>=0&&n<o.length,"sourceStart out of bounds"),assert(r>=0&&r<=o.length,"sourceEnd out of bounds"),r>this.length&&(r=this.length),e.length-t<r-n&&(r=e.length-t+n);for(var i=0;r-n>i;i++)e[i+t]=this[i+n]}},Buffer.prototype.slice=function(e,t){var n=this.length;if(e=clamp(e,n,0),t=clamp(t,n,n),Buffer._useTypedArrays)return augment(this.subarray(e,t));for(var r=t-e,o=new Buffer(r,void 0,!0),i=0;r>i;i++)o[i]=this[i+e];return o},Buffer.prototype.get=function(e){return console.log(".get() is deprecated. Access using array indexes instead."),this.readUInt8(e)},Buffer.prototype.set=function(e,t){return console.log(".set() is deprecated. Access using array indexes instead."),this.writeUInt8(e,t)},Buffer.prototype.readUInt8=function(e,t){return t||(assert(void 0!==e&&null!==e,"missing offset"),assert(e<this.length,"Trying to read beyond buffer length")),e>=this.length?void 0:this[e]},Buffer.prototype.readUInt16LE=function(e,t){return _readUInt16(this,e,!0,t)},Buffer.prototype.readUInt16BE=function(e,t){return _readUInt16(this,e,!1,t)},Buffer.prototype.readUInt32LE=function(e,t){return _readUInt32(this,e,!0,t)},Buffer.prototype.readUInt32BE=function(e,t){return _readUInt32(this,e,!1,t)},Buffer.prototype.readInt8=function(e,t){if(t||(assert(void 0!==e&&null!==e,"missing offset"),assert(e<this.length,"Trying to read beyond buffer length")),!(e>=this.length)){var n=128&this[e];return n?-1*(255-this[e]+1):this[e]}},Buffer.prototype.readInt16LE=function(e,t){return _readInt16(this,e,!0,t)},Buffer.prototype.readInt16BE=function(e,t){return _readInt16(this,e,!1,t)},Buffer.prototype.readInt32LE=function(e,t){return _readInt32(this,e,!0,t)},Buffer.prototype.readInt32BE=function(e,t){return _readInt32(this,e,!1,t)},Buffer.prototype.readFloatLE=function(e,t){return _readFloat(this,e,!0,t)},Buffer.prototype.readFloatBE=function(e,t){return _readFloat(this,e,!1,t)},Buffer.prototype.readDoubleLE=function(e,t){return _readDouble(this,e,!0,t)},Buffer.prototype.readDoubleBE=function(e,t){return _readDouble(this,e,!1,t)},Buffer.prototype.writeUInt8=function(e,t,n){n||(assert(void 0!==e&&null!==e,"missing value"),assert(void 0!==t&&null!==t,"missing offset"),assert(t<this.length,"trying to write beyond buffer length"),verifuint(e,255)),t>=this.length||(this[t]=e)},Buffer.prototype.writeUInt16LE=function(e,t,n){_writeUInt16(this,e,t,!0,n)},Buffer.prototype.writeUInt16BE=function(e,t,n){_writeUInt16(this,e,t,!1,n)},Buffer.prototype.writeUInt32LE=function(e,t,n){_writeUInt32(this,e,t,!0,n)},Buffer.prototype.writeUInt32BE=function(e,t,n){_writeUInt32(this,e,t,!1,n)},Buffer.prototype.writeInt8=function(e,t,n){n||(assert(void 0!==e&&null!==e,"missing value"),assert(void 0!==t&&null!==t,"missing offset"),assert(t<this.length,"Trying to write beyond buffer length"),verifsint(e,127,-128)),t>=this.length||(e>=0?this.writeUInt8(e,t,n):this.writeUInt8(255+e+1,t,n))},Buffer.prototype.writeInt16LE=function(e,t,n){_writeInt16(this,e,t,!0,n)},Buffer.prototype.writeInt16BE=function(e,t,n){_writeInt16(this,e,t,!1,n)},Buffer.prototype.writeInt32LE=function(e,t,n){_writeInt32(this,e,t,!0,n)},Buffer.prototype.writeInt32BE=function(e,t,n){_writeInt32(this,e,t,!1,n)},Buffer.prototype.writeFloatLE=function(e,t,n){_writeFloat(this,e,t,!0,n)},Buffer.prototype.writeFloatBE=function(e,t,n){_writeFloat(this,e,t,!1,n)},Buffer.prototype.writeDoubleLE=function(e,t,n){_writeDouble(this,e,t,!0,n)},Buffer.prototype.writeDoubleBE=function(e,t,n){_writeDouble(this,e,t,!1,n)},Buffer.prototype.fill=function(e,t,n){if(e||(e=0),t||(t=0),n||(n=this.length),"string"==typeof e&&(e=e.charCodeAt(0)),assert("number"==typeof e&&!isNaN(e),"value is not a number"),assert(n>=t,"end < start"),n!==t&&0!==this.length){assert(t>=0&&t<this.length,"start out of bounds"),assert(n>=0&&n<=this.length,"end out of bounds");for(var r=t;n>r;r++)this[r]=e}},Buffer.prototype.inspect=function(){for(var e=[],t=this.length,n=0;t>n;n++)if(e[n]=toHex(this[n]),n===exports.INSPECT_MAX_BYTES){e[n+1]="...";break}return"<Buffer "+e.join(" ")+">"},Buffer.prototype.toArrayBuffer=function(){if("function"==typeof Uint8Array){if(Buffer._useTypedArrays)return new Buffer(this).buffer;for(var e=new Uint8Array(this.length),t=0,n=e.length;n>t;t+=1)e[t]=this[t];return e.buffer}throw new Error("Buffer.toArrayBuffer not supported in this browser")};var BP=Buffer.prototype;
  //# sourceMappingURL=buffer.js.map
  global.define = __define;
  return module.exports;
});

System.register("npm:cwise-compiler@0.0.0/compiler", ["./lib/thunk"], true, function(require, exports, __moduleName) {
  var global = System.global;
  var __define = global.define;
  global.define = undefined;
  var module = { exports: exports };
  var process = System.get("@@nodeProcess")["default"];
    var __filename = "jspm_packages/npm/cwise-compiler@0.0.0/compiler.js";
    var __dirname = "jspm_packages/npm/cwise-compiler@0.0.0";
  "format cjs";"use strict";function Procedure(){this.argTypes=[],this.shimArgs=[],this.arrayArgs=[],this.scalarArgs=[],this.indexArgs=[],this.shapeArgs=[],this.funcName="",this.pre=null,this.body=null,this.post=null,this.debug=!1}function compileCwise(e){var t=new Procedure;t.pre=e.pre,t.body=e.body,t.post=e.post;var n=e.args.slice(0);t.argTypes=n;for(var r=0;r<n.length;++r)switch(n[r]){case"array":if(t.arrayArgs.push(r),t.shimArgs.push("array"+r),r<t.pre.args.length&&t.pre.args[r].count>0)throw new Error("cwise: pre() block may not reference array args");if(r<t.post.args.length&&t.post.args[r].count>0)throw new Error("cwise: post() block may not reference array args");break;case"scalar":t.scalarArgs.push(r),t.shimArgs.push("scalar"+r);break;case"index":if(t.indexArgs.push(r),r<t.pre.args.length&&t.pre.args[r].count>0)throw new Error("cwise: pre() block may not reference array index");if(r<t.body.args.length&&t.body.args[r].lvalue)throw new Error("cwise: body() block may not write to array index");if(r<t.post.args.length&&t.post.args[r].count>0)throw new Error("cwise: post() block may not reference array index");break;case"shape":if(t.shapeArgs.push(r),r<t.pre.args.length&&t.pre.args[r].lvalue)throw new Error("cwise: pre() block may not write to array shape");if(r<t.body.args.length&&t.body.args[r].lvalue)throw new Error("cwise: body() block may not write to array shape");if(r<t.post.args.length&&t.post.args[r].lvalue)throw new Error("cwise: post() block may not write to array shape");break;default:throw new Error("cwise: Unknown argument type "+n[r])}if(t.arrayArgs.length<=0)throw new Error("cwise: No array arguments specified");if(t.pre.args.length>n.length)throw new Error("cwise: Too many arguments in pre() block");if(t.body.args.length>n.length)throw new Error("cwise: Too many arguments in body() block");if(t.post.args.length>n.length)throw new Error("cwise: Too many arguments in post() block");return t.debug=!!e.printCode||!!e.debug,t.funcName=e.funcName||"cwise",t.blockSize=e.blockSize||64,createThunk(t)}var createThunk=require("./lib/thunk");module.exports=compileCwise;
  //# sourceMappingURL=compiler.js.map
  global.define = __define;
  return module.exports;
});

System.register("npm:cwise-compiler@0.1.0/compiler", ["./lib/thunk"], true, function(require, exports, __moduleName) {
  var global = System.global;
  var __define = global.define;
  global.define = undefined;
  var module = { exports: exports };
  var process = System.get("@@nodeProcess")["default"];
    var __filename = "jspm_packages/npm/cwise-compiler@0.1.0/compiler.js";
    var __dirname = "jspm_packages/npm/cwise-compiler@0.1.0";
  "format cjs";"use strict";function Procedure(){this.argTypes=[],this.shimArgs=[],this.arrayArgs=[],this.scalarArgs=[],this.offsetArgs=[],this.offsetArgIndex=[],this.indexArgs=[],this.shapeArgs=[],this.funcName="",this.pre=null,this.body=null,this.post=null,this.debug=!1}function compileCwise(e){var t=new Procedure;t.pre=e.pre,t.body=e.body,t.post=e.post;var n=e.args.slice(0);t.argTypes=n.slice(0);for(var o=0;o<n.length;++o){var r=n[o];if("array"===r){if(t.arrayArgs.push(o),t.shimArgs.push("array"+o),o<t.pre.args.length&&t.pre.args[o].count>0)throw new Error("cwise: pre() block may not reference array args");if(o<t.post.args.length&&t.post.args[o].count>0)throw new Error("cwise: post() block may not reference array args")}else if("scalar"===r)t.scalarArgs.push(o),t.shimArgs.push("scalar"+o);else if("index"===r){if(t.indexArgs.push(o),o<t.pre.args.length&&t.pre.args[o].count>0)throw new Error("cwise: pre() block may not reference array index");if(o<t.body.args.length&&t.body.args[o].lvalue)throw new Error("cwise: body() block may not write to array index");if(o<t.post.args.length&&t.post.args[o].count>0)throw new Error("cwise: post() block may not reference array index")}else if("shape"===r){if(t.shapeArgs.push(o),o<t.pre.args.length&&t.pre.args[o].lvalue)throw new Error("cwise: pre() block may not write to array shape");if(o<t.body.args.length&&t.body.args[o].lvalue)throw new Error("cwise: body() block may not write to array shape");if(o<t.post.args.length&&t.post.args[o].lvalue)throw new Error("cwise: post() block may not write to array shape")}else{if("object"!=typeof r||!r.offset)throw new Error("cwise: Unknown argument type "+n[o]);t.argTypes[o]="offset",t.offsetArgs.push({array:r.array,offset:r.offset}),t.offsetArgIndex.push(o)}}if(t.arrayArgs.length<=0)throw new Error("cwise: No array arguments specified");if(t.pre.args.length>n.length)throw new Error("cwise: Too many arguments in pre() block");if(t.body.args.length>n.length)throw new Error("cwise: Too many arguments in body() block");if(t.post.args.length>n.length)throw new Error("cwise: Too many arguments in post() block");return t.debug=!!e.printCode||!!e.debug,t.funcName=e.funcName||"cwise",t.blockSize=e.blockSize||64,createThunk(t)}var createThunk=require("./lib/thunk");module.exports=compileCwise;
  //# sourceMappingURL=compiler.js.map
  global.define = __define;
  return module.exports;
});

System.register("npm:glsl-parser@0.0.5/lib/index", ["through","./expr","./scope"], true, function(require, exports, __moduleName) {
  var global = System.global;
  var __define = global.define;
  global.define = undefined;
  var module = { exports: exports };
  var process = System.get("@@nodeProcess")["default"];
    var __filename = "jspm_packages/npm/glsl-parser@0.0.5/lib/index.js";
    var __dirname = "jspm_packages/npm/glsl-parser@0.0.5/lib";
  "format cjs";function parser(){function e(e){if("whitespace"===e.type||"line-comment"===e.type||"block-comment"===e.type)return void ut.push(e);for(at.push(e),V=V||at[0],V&&ut.length&&(V.preceding=V.preceding||[],V.preceding=V.preceding.concat(ut),ut=[]);n();)switch(it[0].mode){case STMT:u();break;case STMTLIST:a();break;case DECL:s();break;case DECLLIST:c();break;case EXPR:p();break;case STRUCT:I(!0,!0);break;case PRECISION:C();break;case IDENT:h();break;case KEYWORD:f();break;case KEYWORD_OR_IDENT:l();break;case FUNCTION:N();break;case FUNCTIONARGS:P();break;case FORLOOP:O();break;case WHILELOOP:F();break;case DOWHILELOOP:R();break;case RETURN:D();break;case IF:j();break;case QUANTIFIER:L()}}function t(t){return arguments.length&&e(t),it.length>1?void E("unexpected EOF"):void rt.emit("end")}function n(){return st||!it.length?st:(V=at[0])&&!rt.paused}function r(e){it.unshift(e),it.shift()}function o(e,t){e.parent=it[0];var n=[].unshift.call(this,e);if(t=void 0===t?!0:t,DEBUG){for(var r="",o=0,i=this.length-1;i>o;++o)r+=" |";console.log(r,"\\"+e.type,e.token.data)}return t&&z!==e&&z.children.push(e),z=e,n}function i(){var e=[].shift.call(this),t=ot[this.length],n=!1;if(DEBUG){for(var r="",o=0,i=this.length;i>o;++o)r+=" |";console.log(r,"/"+e.type)}return ot.length?"function"==typeof ot[0]?n=ot[0](e):void 0!==t&&(n=t.test?t.test(e.type):t===e.type):n=!0,n&&rt.emit("data",e),z=e.parent,e}function a(){function e(){if(V.data===it[0].expecting)return it.scope.exit(),it.shift();switch(V.type){case"preprocessor":return it.fake(m()),void at.shift();default:return void it.unshift(X())}}return A(function(){return it.scope.enter(),Advance},e)()}function u(){if(it[0].brace)return"}"!==V.data?E("expected `}`, got "+V.data):(it[0].brace=!1,at.shift(),it.shift());switch(V.type){case"eof":return it.shift();case"keyword":switch(V.data){case"for":return it.unshift(J());case"if":return it.unshift(Z());case"while":return it.unshift($());case"do":return it.unshift(tt());case"break":return it.fake(mknode(BREAK,V)),at.shift();case"continue":return it.fake(mknode(CONTINUE,V)),at.shift();case"discard":return it.fake(mknode(DISCARD,V)),at.shift();case"return":return it.unshift(et());case"precision":return it.unshift(H())}return it.unshift(v(DECL_STATEMENT));case"ident":var e;if(e=it.scope.find(V.data))return it.unshift("struct"===e.parent.type?v(DECL_STATEMENT):b(";"));case"operator":if("{"===V.data){it[0].brace=!0;var t=W();return t.expecting="}",at.shift(),it.unshift(t)}if(";"===V.data)return at.shift(),it.shift();default:return it.unshift(b(";"))}}function s(){function e(){return"invariant"===V.data?c.flags&DECL_ALLOW_INVARIANT?(it.unshift(y()),Advance):E("`invariant` is not allowed here"):(it.fake(mknode(PLACEHOLDER,{data:"",position:V.position})),Advance)}function t(){return is_storage(V)?c.flags&DECL_ALLOW_STORAGE?(it.unshift(y()),Advance):E("storage is not allowed here"):(it.fake(mknode(PLACEHOLDER,{data:"",position:V.position})),Advance)}function n(){return is_parameter(V)?c.flags&DECL_NO_INOUT?E("parameter is not allowed here"):(it.unshift(y()),Advance):(it.fake(mknode(PLACEHOLDER,{data:"",position:V.position})),Advance)}function r(){return is_precision(V)?(it.unshift(y()),Advance):(it.fake(mknode(PLACEHOLDER,{data:"",position:V.position})),Advance)}function o(){if("struct"===V.data)return c.flags&DECL_ALLOW_STRUCT?(it.unshift(g()),Advance):E("cannot nest structs");if("keyword"===V.type)return it.unshift(y()),Advance;var e=it.scope.find(V.data);return e?(it.fake(Object.create(e)),at.shift(),Advance):E("expected user defined type, struct or keyword, got "+V.data)}function i(){return","!==V.data||c.flags&DECL_ALLOW_COMMA?"["===V.data?void it.unshift(nt()):")"===V.data?it.shift():";"===V.data?c.stage+3:"ident"!==V.type?E("expected identifier, got "+V.data):(c.collected_name=at.shift(),Advance):it.shift()}function a(){return"("===V.data?(at.unshift(c.collected_name),delete c.collected_name,it.unshift(K()),c.stage+2):Advance}function u(){return at.unshift(c.collected_name),delete c.collected_name,it.unshift(G()),Advance}function s(){return it.shift()}var c=it[0];return A(e,t,n,r,o,i,a,u,s)()}function c(){if("ident"===V.type){var e=V.data;return it.unshift(Y()),void it.scope.define(e)}if("operator"===V.type){if(","===V.data)return it[1].flags&DECL_ALLOW_COMMA?at.shift():it.shift();if("="===V.data)return it[1].flags&DECL_ALLOW_ASSIGN?(at.shift(),void it.unshift(b(",",";"))):E("`=` is not allowed here.");if("["===V.data)return void it.unshift(nt())}return it.shift()}function l(){return"keyword"===V.type?(it[0].type="keyword",void(it[0].mode=KEYWORD)):"ident"===V.type?(it[0].type="ident",void(it[0].mode=IDENT)):E("expected keyword or user-defined name, got "+V.data)}function f(){return"keyword"!==V.type?E("expected keyword, got "+V.data):(it.shift(),at.shift())}function h(){return"ident"!==V.type?E("expected user-defined name, got "+V.data):(it[0].data=V.data,it.shift(),at.shift())}function p(){function e(e){return full_parse_expr(it,e),it.shift()}var t=it[0].expecting;if(it[0].tokens=it[0].tokens||[],void 0===it[0].parenlevel&&(it[0].parenlevel=0,it[0].bracelevel=0),it[0].parenlevel<1&&t.indexOf(V.data)>-1)return e(it[0].tokens);switch("("===V.data?++it[0].parenlevel:")"===V.data&&--it[0].parenlevel,V.data){case"{":++it[0].bracelevel;break;case"}":--it[0].bracelevel;break;case"(":++it[0].parenlevel;break;case")":--it[0].parenlevel}return it[0].parenlevel<0?E("unexpected `)`"):it[0].bracelevel<0?E("unexpected `}`"):void it[0].tokens.push(at.shift())}function d(e){return function(){return mknode(e,V)}}function m(){return mknode(token_map[V.type],V,z)}function v(e){var t=mknode(DECL,V,z);return t.flags=e,t}function g(e,t){var n=mknode(STRUCT,V,z);return n.allow_assign=void 0===e?!0:e,n.allow_comma=void 0===t?!0:t,n}function b(){var e=mknode(EXPR,V,z);return e.expecting=[].slice.call(arguments),e}function y(e){var t=V;return e&&(t={type:"(implied)",data:"(default)",position:t.position}),mknode(KEYWORD,t,z)}function E(e){st=!0,rt.emit("error",new Error((e||"unexpected "+it)+" at line "+it[0].token.line))}function x(e,t){return w(e,V.type)&&w(t,V.data)}function w(e,t){switch(typeof e){case"string":return t!==e&&E("expected `"+e+"`, got "+t+"\n"+V.data),!st;case"object":return e&&-1===e.indexOf(t)&&E("expected one of `"+e.join("`, `")+"`, got "+t),!st}return!0}function A(){var e,t,n=[].slice.call(arguments);return function(){var r=it[0];return r.stage||(r.stage=0),(e=n[r.stage])?(t=e(),t===Advance?++r.stage:void(void 0!==t&&(r.stage=t))):E("parser in undefined state!")}}function q(e,t){return t=t||"operator",function(){if(x(t,e)){var n=at.shift(),r=it[0].children,o=r[r.length-1];return o&&o.token&&n.preceding&&(o.token.succeeding=o.token.succeeding||[],o.token.succeeding=o.token.succeeding.concat(n.preceding)),Advance}}}function _(e){return function(){return it.unshift(b(e)),Advance}}function B(e){return e?function(){var e=V.data;return x("ident")&&(it.unshift(Y()),it.scope.define(e),Advance)}:function(){if(x("ident")){var e=Object.create(it.scope.find(V.data));return e.token=V,at.shift(),Advance}}}function S(){return function(){var e=W();return e.expecting="}",it.unshift(e),Advance}}function k(e){return function(){var t=it[0].stage;return"{"!==V.data?(it.unshift(X()),t+e):(at.shift(),Advance)}}function T(){return function(){return it.shift(),it.shift()}}function M(){I=A(q("struct","keyword"),function(){return"{"===V.data?(it.fake(mknode(IDENT,{data:"",position:V.position,type:"ident"})),Advance):B(!0)()},function(){return it.scope.enter(),Advance},q("{"),function(){return"}"===V.data?(it.scope.exit(),at.shift(),it.shift()):";"===V.data?void at.shift():void it.unshift(v(DECL_STRUCT))}),C=A(function(){return at.shift(),Advance},function(){return x("keyword",["lowp","mediump","highp"])&&(it.unshift(y()),Advance)},function(){return it.unshift(y()),Advance},function(){return it.shift()}),L=A(q("["),_("]"),q("]"),function(){return it.shift()}),O=A(q("for","keyword"),q("("),function(){var e;if("ident"===V.type){if((e=it.scope.find(V.data))||(e=it.create_node()),"struct"===e.parent.type)return it.unshift(v(DECL_STATEMENT)),Advance}else if("builtin"===V.type||"keyword"===V.type)return it.unshift(v(DECL_STATEMENT)),Advance;return _(";")()},q(";"),_(";"),q(";"),_(")"),q(")"),k(3),S(),q("}"),T()),j=A(q("if","keyword"),q("("),_(")"),q(")"),k(3),S(),q("}"),function(){return"else"===V.data?(at.shift(),it.unshift(X()),Advance):T()()},T()),D=A(q("return","keyword"),function(){return";"===V.data?Advance:(it.unshift(b(";")),Advance)},function(){at.shift(),T()()}),F=A(q("while","keyword"),q("("),_(")"),q(")"),k(3),S(),q("}"),T()),R=A(q("do","keyword"),k(3),S(),q("}"),q("while","keyword"),q("("),_(")"),q(")"),T()),N=A(function(){for(var e=1,t=it.length;t>e;++e)if(it[e].mode===FUNCTION)return E("function definition is not allowed within another function");return Advance},function(){if(x("ident")){var e=V.data,t=it.scope.find(e);return it.unshift(Y()),it.scope.define(e),it.scope.enter(t?t.scope:null),Advance}},q("("),function(){return it.unshift(Q()),Advance},q(")"),function(){return";"===V.data?(it.scope.exit(),it.shift(),it.shift()):Advance},q("{"),S(),q("}"),function(){return it.scope.exit(),Advance},function(){return it.shift(),it.shift(),it.shift()}),P=A(function(){return"void"===V.data?(it.fake(y()),at.shift(),Advance):")"===V.data?void it.shift():"struct"===V.data?(it.unshift(g(NO_ASSIGN_ALLOWED,NO_COMMA_ALLOWED)),Advance):(it.unshift(v(DECL_FUNCTION)),Advance)},function(){return","===V.data?(at.shift(),0):")"===V.data?void it.shift():void E("expected one of `,` or `)`, got "+V.data)})}var I,C,L,O,j,D,F,R,N,P,U,V,z,W=d(STMTLIST),X=d(STMT),G=d(DECLLIST),H=d(PRECISION),Y=d(IDENT),K=(d(KEYWORD_OR_IDENT),d(FUNCTION)),Q=d(FUNCTIONARGS),J=d(FORLOOP),Z=d(IF),$=d(WHILELOOP),et=d(RETURN),tt=d(DOWHILELOOP),nt=d(QUANTIFIER),rt=through(e,t),ot=arguments.length?[].slice.call(arguments):[],it=[],at=[],ut=[],st=!1;return it.shift=i,it.unshift=o,it.fake=r,it.unexpected=E,it.scope=new Scope(it),it.create_node=function(){var e=mknode(IDENT,V);return e.parent=rt.program,e},M(),z=W(),z.expecting="(eof)",z.mode=STMTLIST,z.token={type:"(program)",data:"(program)"},U=z,rt.program=U,rt.scope=function(e){return 1===arguments.length&&(it.scope=e),it.scope},it.unshift(z),rt}function mknode(e,t){return{mode:e,token:t,children:[],type:stmt_type[e],id:(4294967295*Math.random()).toString(16)}}function is_storage(e){return"const"===e.data||"attribute"===e.data||"uniform"===e.data||"varying"===e.data}function is_parameter(e){return"in"===e.data||"inout"===e.data||"out"===e.data}function is_precision(e){return"highp"===e.data||"mediump"===e.data||"lowp"===e.data}module.exports=parser;var through=require("through"),full_parse_expr=require("./expr"),Scope=require("./scope"),Advance=new Object,DEBUG=!1,_=0,IDENT=_++,STMT=_++,STMTLIST=_++,STRUCT=_++,FUNCTION=_++,FUNCTIONARGS=_++,DECL=_++,DECLLIST=_++,FORLOOP=_++,WHILELOOP=_++,IF=_++,EXPR=_++,PRECISION=_++,COMMENT=_++,PREPROCESSOR=_++,KEYWORD=_++,KEYWORD_OR_IDENT=_++,RETURN=_++,BREAK=_++,CONTINUE=_++,DISCARD=_++,DOWHILELOOP=_++,PLACEHOLDER=_++,QUANTIFIER=_++,DECL_ALLOW_ASSIGN=1,DECL_ALLOW_COMMA=2,DECL_REQUIRE_NAME=4,DECL_ALLOW_INVARIANT=8,DECL_ALLOW_STORAGE=16,DECL_NO_INOUT=32,DECL_ALLOW_STRUCT=64,DECL_STATEMENT=255,DECL_FUNCTION=DECL_STATEMENT&~(DECL_ALLOW_ASSIGN|DECL_ALLOW_COMMA|DECL_NO_INOUT|DECL_ALLOW_INVARIANT|DECL_REQUIRE_NAME),DECL_STRUCT=DECL_STATEMENT&~(DECL_ALLOW_ASSIGN|DECL_ALLOW_INVARIANT|DECL_ALLOW_STORAGE|DECL_ALLOW_STRUCT),QUALIFIERS=["const","attribute","uniform","varying"],NO_ASSIGN_ALLOWED=!1,NO_COMMA_ALLOWED=!1,token_map={"block-comment":COMMENT,"line-comment":COMMENT,preprocessor:PREPROCESSOR},stmt_type=_=["ident","stmt","stmtlist","struct","function","functionargs","decl","decllist","forloop","whileloop","if","expr","precision","comment","preprocessor","keyword","keyword_or_ident","return","break","continue","discard","do-while","placeholder","quantifier"];
  //# sourceMappingURL=index.js.map
  global.define = __define;
  return module.exports;
});

System.register("npm:game-shell@0.1.4/shell", ["github:jspm/nodelibs@0.0.2/events","github:jspm/nodelibs@0.0.2/util","domready","vkey","invert-hash","uniq","lower-bound","iota-array","./lib/raf-polyfill","./lib/mousewheel-polyfill","./lib/hrtime-polyfill"], true, function(require, exports, __moduleName) {
  var global = System.global;
  var __define = global.define;
  global.define = undefined;
  var module = { exports: exports };
  var process = System.get("@@nodeProcess")["default"];
    var __filename = "jspm_packages/npm/game-shell@0.1.4/shell.js";
    var __dirname = "jspm_packages/npm/game-shell@0.1.4";
  "format cjs";"use strict";function virtualKeyCode(t){var e=lowerBound(keyNames,t);return 0>e||e>=keyNames.length?-1:e}function physicalKeyCode(t){return virtualKeyCode(filtered_vkey[t])}function GameShell(){EventEmitter.call(this),this._curKeyState=new Array(keyNames.length),this._pressCount=new Array(keyNames.length),this._releaseCount=new Array(keyNames.length),this._tickInterval=null,this._rafHandle=null,this._tickRate=0,this._lastTick=hrtime(),this._frameTime=0,this._paused=!0,this._width=0,this._height=0,this._wantFullscreen=!1,this._wantPointerLock=!1,this._fullscreenActive=!1,this._pointerLockActive=!1,this._render=render.bind(void 0,this);for(var t=0;t<keyNames.length;++t)this._curKeyState[t]=!1,this._pressCount[t]=this._releaseCount[t]=0;this.element=null,this.bindings={},this.frameSkip=100,this.tickCount=0,this.frameCount=0,this.startTime=hrtime(),this.tickTime=this._tickRate,this.frameTime=10,this.stickyFullscreen=!1,this.stuckyPointLock=!1,this.scroll=[0,0,0],this.mouseX=0,this.mouseY=0,this.prevMouseX=0,this.prevMouseY=0}function lookupKey(t,e,n){if(n in e){for(var o=e[n],r=0,i=o.length;i>r;++r)if(t[virtualKeyCode(o[r])])return!0;return!1}var a=virtualKeyCode(n);return a>=0?t[a]:!1}function lookupCount(t,e,n){if(n in e){for(var o=e[n],r=0,i=0,a=o.length;a>i;++i)r+=t[virtualKeyCode(o[i])];return r}var u=virtualKeyCode(n);return u>=0?t[u]:0}function tryFullscreen(t){var e=t.element;if(t._wantFullscreen&&!t._fullscreenActive){var n=e.requestFullscreen||e.requestFullScreen||e.webkitRequestFullscreen||e.webkitRequestFullScreen||e.mozRequestFullscreen||e.mozRequestFullScreen||function(){};n.call(e)}if(t._wantPointerLock&&!t._pointerLockActive){var o=e.requestPointerLock||e.webkitRequestPointerLock||e.mozRequestPointerLock||e.msRequestPointerLock||e.oRequestPointerLock||function(){};o.call(e)}}function handleFullscreen(t){t._fullscreenActive=document.fullscreen||document.mozFullScreen||document.webkitIsFullScreen||!1,!t.stickyFullscreen&&t._fullscreenActive&&(t._wantFullscreen=!1)}function handlePointerLockChange(t){t._pointerLockActive=t.element===(document.pointerLockElement||document.mozPointerLockElement||document.webkitPointerLockElement||null),!t.stickyPointerLock&&t._pointerLockActive&&(t._wantPointerLock=!1)}function setKeyState(t,e,n){var o=t._curKeyState[e];o!==n&&(n?t._pressCount[e]++:t._releaseCount[e]++,t._curKeyState[e]=n)}function tick(t){for(var e,n,o,r=hrtime()+t.frameSkip,i=t._pressCount,a=t._releaseCount,u=t._tickRate,c=keyNames.length;!t._paused&&hrtime()>=t._lastTick+u;){if(hrtime()>r)return void(t._lastTick=hrtime()+u);for(n=hrtime(),t.emit("tick"),o=hrtime(),t.tickTime=o-n,++t.tickCount,t._lastTick+=u,e=0;c>e;++e)i[e]=a[e]=0;t._pointerLockActive?(t.prevMouseX=t.mouseX=t.width>>1,t.prevMouseY=t.mouseY=t.height>>1):(t.prevMouseX=t.mouseX,t.prevMouseY=t.mouseY),t.scroll[0]=t.scroll[1]=t.scroll[2]=0}}function render(t){if(!t._paused){tick(t);var e;e=t._paused?t._frameTime:min(1,(hrtime()-t._lastTick)/t._tickRate),++t.frameCount;var n=hrtime();t.emit("render",e);var o=hrtime();t.frameTime=o-n,requestAnimationFrame(t._render)}}function handleKeyUp(t,e){var n=physicalKeyCode(e.keyCode||e.char||e.which||e.charCode);n>=0&&setKeyState(t,n,!1)}function handleKeyDown(t,e){var n=physicalKeyCode(e.keyCode||e.char||e.which||e.charCode);n>=0&&setKeyState(t,n,!0)}function setMouseButtons(t,e){for(var n=0;32>n;++n)setKeyState(t,mouseCodes[n],!!(e&1<<n))}function handleMouseMove(t,e){if(t._pointerLockActive){var n=e.movementX||e.mozMovementX||e.webkitMovementX||0,o=e.movementY||e.mozMovementY||e.webkitMovementY||0;t.mouseX+=n,t.mouseY+=o}else t.mouseX=e.clientX-t.element.offsetLeft,t.mouseY=e.clientY-t.element.offsetTop;return!1}function handleMouseDown(t,e){return setKeyState(t,mouseCodes[e.button],!0),!1}function handleMouseUp(t,e){return setKeyState(t,mouseCodes[e.button],!1),!1}function handleMouseEnter(t,e){return t._pointerLockActive?(t.prevMouseX=t.mouseX=t.width>>1,t.prevMouseY=t.mouseY=t.height>>1):(t.prevMouseX=t.mouseX=e.clientX-t.element.offsetLeft,t.prevMouseY=t.mouseY=e.clientY-t.element.offsetTop),!1}function handleMouseLeave(t){return setMouseButtons(t,0),!1}function handleMouseWheel(t,e){var n=1;switch(e.deltaMode){case 0:n=1;break;case 1:n=12;break;case 2:n=t.height}return t.scroll[0]+=e.deltaX*n,t.scroll[1]+=e.deltaY*n,t.scroll[2]+=e.deltaZ*n||0,!1}function handleContexMenu(){return!1}function handleBlur(t){var e,n=keyNames.length,o=t._curKeyState,r=t._releaseCount;for(e=0;n>e;++e)o[e]&&++r[e],o[e]=!1;return!1}function handleResizeElement(t){var e=0|t.element.clientWidth,n=0|t.element.clientHeight;(e!==t._width||n!==t._height)&&(t._width=e,t._height=n,t.emit("resize",e,n))}function makeDefaultContainer(){var t=document.createElement("div");return t.style.position="absolute",t.style.left="0px",t.style.right="0px",t.style.top="0px",t.style.bottom="0px",t.style.height="100%",t.style.overflow="hidden",document.body.appendChild(t),t}function createShell(t){t=t||{};var e=!!t.fullscreen,n=e;void 0!==typeof t.pointerLock&&(n=!!t.pointerLock);var o=new GameShell;return o._tickRate=t.tickRate||30,o.frameSkip=t.frameSkip||5*(o._tickRate+5),o.stickyFullscreen=!!t.stickyFullscreen||!!t.sticky,o.stickyPointerLock=!!t.stickPointerLock||!t.sticky,t.bindings&&(o.bindings=bindings),setTimeout(function(){domready(function(){var r=t.element;if("string"==typeof r){var i=document.querySelector(r);i||(i=document.getElementById(r)),i||(i=document.getElementByClass(r)[0]),i||(i=makeDefaultContainer()),o.element=i}else o.element="object"==typeof r&&r?r:"function"==typeof r?r():makeDefaultContainer();o.element.style&&(o.element.style["-webkit-touch-callout"]="none",o.element.style["-webkit-user-select"]="none",o.element.style["-khtml-user-select"]="none",o.element.style["-moz-user-select"]="none",o.element.style["-ms-user-select"]="none",o.element.style["user-select"]="none"),o._width=o.element.clientWidth,o._height=o.element.clientHeight;var a=handleResizeElement.bind(void 0,o);if("undefined"!=typeof MutationObserver){var u=new MutationObserver(a);u.observe(o.element,{attributes:!0,subtree:!0})}else o.element.addEventListener("DOMSubtreeModified",a,!1);window.addEventListener("resize",a,!1),window.addEventListener("keydown",handleKeyDown.bind(void 0,o),!0),window.addEventListener("keyup",handleKeyUp.bind(void 0,o),!0),o.element.oncontextmenu=handleContexMenu.bind(void 0,o),o.element.onmousedown=handleMouseDown.bind(void 0,o),o.element.onmouseup=handleMouseUp.bind(void 0,o),o.element.onmousemove=handleMouseMove.bind(void 0,o),o.element.onmouseenter=handleMouseEnter.bind(void 0,o);var c=handleMouseLeave.bind(void 0,o);o.element.onmouseleave=c,o.element.onmouseout=c,window.addEventListener("mouseleave",c,!0),window.addEventListener("mouseout",c,!0);var s=handleBlur.bind(void 0,o);o.element.onblur=s,window.addEventListener("blur",s,!0),addMouseWheel(o.element,handleMouseWheel.bind(void 0,o),!1),document.body.style.overflow="hidden",document.body.style.height="100%";var l=handleFullscreen.bind(void 0,o);document.addEventListener("fullscreenchange",l,!1),document.addEventListener("mozfullscreenchange",l,!1),document.addEventListener("webkitfullscreenchange",l,!1),o.element.addEventListener("click",tryFullscreen.bind(void 0,o),!0);var f=handlePointerLockChange.bind(void 0,o);document.addEventListener("pointerlockchange",f,!1),document.addEventListener("mozpointerlockchange",f,!1),document.addEventListener("webkitpointerlockchange",f,!1),document.addEventListener("pointerlocklost",f,!1),document.addEventListener("webkitpointerlocklost",f,!1),document.addEventListener("mozpointerlocklost",f,!1),o.fullscreen=e,o.pointerLock=n,o.bind("mouse-left","mouse-1"),o.bind("mouse-right","mouse-3"),o.bind("mouse-middle","mouse-2"),o._lastTick=hrtime(),o.startTime=hrtime(),o.paused=!1,o.emit("init")})},0),o}var EventEmitter=require("github:jspm/nodelibs@0.0.2/events").EventEmitter,util=require("github:jspm/nodelibs@0.0.2/util"),domready=require("domready"),vkey=require("vkey"),invert=require("invert-hash"),uniq=require("uniq"),lowerBound=require("lower-bound"),iota=require("iota-array"),min=Math.min;require("./lib/raf-polyfill");var addMouseWheel=require("./lib/mousewheel-polyfill"),hrtime=require("./lib/hrtime-polyfill"),filtered_vkey=function(){var t,e,n=new Array(256);for(t=0;256>t;++t)n[t]="UNK";for(t in vkey)e=vkey[t],"<"===e.charAt(0)&&">"===e.charAt(e.length-1)&&(e=e.substring(1,e.length-1)),e=e.replace(/\s/g,"-"),n[parseInt(t)]=e;return n}(),keyNames=uniq(Object.keys(invert(filtered_vkey)));util.inherits(GameShell,EventEmitter);var proto=GameShell.prototype;proto.keyNames=keyNames,proto.bind=function(t){var e;e=t in this.bindings?this.bindings[t]:[];for(var n,o=1,r=arguments.length;r>o;++o)if(n=arguments[o],virtualKeyCode(n)>=0)e.push(n);else if(n in this.bindings)for(var i=this.bindings[n],a=0;a<i.length;++a)e.push(i[a]);e=uniq(e),e.length>0&&(this.bindings[t]=e)},proto.unbind=function(t){t in this.bindings&&delete this.bindings[t]},proto.down=function(t){return lookupKey(this._curKeyState,this.bindings,t)},proto.wasDown=function(t){return this.down(t)||!!this.press(t)},proto.up=function(t){return!this.down(t)},proto.wasUp=function(t){return this.up(t)||!!this.release(t)},proto.press=function(t){return lookupCount(this._pressCount,this.bindings,t)},proto.release=function(t){return lookupCount(this._releaseCount,this.bindings,t)},Object.defineProperty(proto,"paused",{get:function(){return this._paused},set:function(t){var e=!!t;e!==this._paused&&(this._paused?(this._paused=!1,this._lastTick=hrtime()-Math.floor(this._frameTime*this._tickRate),this._tickInterval=setInterval(tick,this._tickRate,this),this._rafHandle=requestAnimationFrame(this._render)):(this._paused=!0,this._frameTime=min(1,(hrtime()-this._lastTick)/this._tickRate),clearInterval(this._tickInterval),cancelAnimationFrame(this._rafHandle)))}});var cancelFullscreen=document.exitFullscreen||document.cancelFullscreen||document.cancelFullScreen||document.webkitCancelFullscreen||document.webkitCancelFullScreen||document.mozCancelFullscreen||document.mozCancelFullScreen||function(){};Object.defineProperty(proto,"fullscreen",{get:function(){return this._fullscreenActive},set:function(t){var e=!!t;return e?(this._wantFullscreen=!0,tryFullscreen(this)):(this._wantFullscreen=!1,cancelFullscreen.call(document)),this._fullscreenActive}});var exitPointerLock=document.exitPointerLock||document.webkitExitPointerLock||document.mozExitPointerLock||function(){};Object.defineProperty(proto,"pointerLock",{get:function(){return this._pointerLockActive},set:function(t){var e=!!t;return e?(this._wantPointerLock=!0,tryFullscreen(this)):(this._wantPointerLock=!1,exitPointerLock.call(document)),this._pointerLockActive}}),Object.defineProperty(proto,"width",{get:function(){return this.element.clientWidth}}),Object.defineProperty(proto,"height",{get:function(){return this.element.clientHeight}});var mouseCodes=iota(32).map(function(t){return virtualKeyCode("mouse-"+(t+1))});module.exports=createShell;
  //# sourceMappingURL=shell.js.map
  global.define = __define;
  return module.exports;
});

System.register("npm:ndarray@1.0.15", ["npm:ndarray@1.0.15/ndarray"], true, function(require, exports, __moduleName) {
  var global = System.global;
  var __define = global.define;
  global.define = undefined;
  var module = { exports: exports };
  var process = System.get("@@nodeProcess")["default"];
    var __filename = "jspm_packages/npm/ndarray@1.0.15.js";
    var __dirname = "jspm_packages/npm";
  module.exports = require("npm:ndarray@1.0.15/ndarray");
  
  global.define = __define;
  return module.exports;
});

System.register("npm:cwise-parser@0.0.1", ["npm:cwise-parser@0.0.1/index"], true, function(require, exports, __moduleName) {
  var global = System.global;
  var __define = global.define;
  global.define = undefined;
  var module = { exports: exports };
  var process = System.get("@@nodeProcess")["default"];
    var __filename = "jspm_packages/npm/cwise-parser@0.0.1.js";
    var __dirname = "jspm_packages/npm";
  module.exports = require("npm:cwise-parser@0.0.1/index");
  
  global.define = __define;
  return module.exports;
});

System.register("npm:typedarray-pool@0.1.2", ["npm:typedarray-pool@0.1.2/pool"], true, function(require, exports, __moduleName) {
  var global = System.global;
  var __define = global.define;
  global.define = undefined;
  var module = { exports: exports };
  var process = System.get("@@nodeProcess")["default"];
    var __filename = "jspm_packages/npm/typedarray-pool@0.1.2.js";
    var __dirname = "jspm_packages/npm";
  module.exports = require("npm:typedarray-pool@0.1.2/pool");
  
  global.define = __define;
  return module.exports;
});

System.register("npm:typedarray-pool@1.0.2", ["npm:typedarray-pool@1.0.2/pool"], true, function(require, exports, __moduleName) {
  var global = System.global;
  var __define = global.define;
  global.define = undefined;
  var module = { exports: exports };
  var process = System.get("@@nodeProcess")["default"];
    var __filename = "jspm_packages/npm/typedarray-pool@1.0.2.js";
    var __dirname = "jspm_packages/npm";
  module.exports = require("npm:typedarray-pool@1.0.2/pool");
  
  global.define = __define;
  return module.exports;
});

System.register("npm:gl-vao@0.0.3", ["npm:gl-vao@0.0.3/vao"], true, function(require, exports, __moduleName) {
  var global = System.global;
  var __define = global.define;
  global.define = undefined;
  var module = { exports: exports };
  var process = System.get("@@nodeProcess")["default"];
    var __filename = "jspm_packages/npm/gl-vao@0.0.3.js";
    var __dirname = "jspm_packages/npm";
  module.exports = require("npm:gl-vao@0.0.3/vao");
  
  global.define = __define;
  return module.exports;
});

System.register("npm:greedy-mesher@1.0.2", ["npm:greedy-mesher@1.0.2/greedy"], true, function(require, exports, __moduleName) {
  var global = System.global;
  var __define = global.define;
  global.define = undefined;
  var module = { exports: exports };
  var process = System.get("@@nodeProcess")["default"];
    var __filename = "jspm_packages/npm/greedy-mesher@1.0.2.js";
    var __dirname = "jspm_packages/npm";
  module.exports = require("npm:greedy-mesher@1.0.2/greedy");
  
  global.define = __define;
  return module.exports;
});

System.register("github:jspm/nodelibs@0.0.2/string_decoder", ["./buffer"], true, function(require, exports, __moduleName) {
  var global = System.global;
  var __define = global.define;
  global.define = undefined;
  var module = { exports: exports };
  var process = System.get("@@nodeProcess")["default"];
    var __filename = "jspm_packages/github/jspm/nodelibs@0.0.2/string_decoder.js";
    var __dirname = "jspm_packages/github/jspm/nodelibs@0.0.2";
  "format cjs";function assertEncoding(e){if(e&&!Buffer.isEncoding(e))throw new Error("Unknown encoding: "+e)}function passThroughWrite(e){return e.toString(this.encoding)}function utf16DetectIncompleteChar(e){var t=this.charReceived=e.length%2;return this.charLength=t?2:0,t}function base64DetectIncompleteChar(e){var t=this.charReceived=e.length%3;return this.charLength=t?3:0,t}var Buffer=require("./buffer").Buffer,StringDecoder=exports.StringDecoder=function(e){switch(this.encoding=(e||"utf8").toLowerCase().replace(/[-_]/,""),assertEncoding(e),this.encoding){case"utf8":this.surrogateSize=3;break;case"ucs2":case"utf16le":this.surrogateSize=2,this.detectIncompleteChar=utf16DetectIncompleteChar;break;case"base64":this.surrogateSize=3,this.detectIncompleteChar=base64DetectIncompleteChar;break;default:return void(this.write=passThroughWrite)}this.charBuffer=new Buffer(6),this.charReceived=0,this.charLength=0};StringDecoder.prototype.write=function(e){for(var t="",n=0;this.charLength;){var r=e.length>=this.charLength-this.charReceived?this.charLength-this.charReceived:e.length;if(e.copy(this.charBuffer,this.charReceived,n,r),this.charReceived+=r-n,n=r,this.charReceived<this.charLength)return"";t=this.charBuffer.slice(0,this.charLength).toString(this.encoding);var i=t.charCodeAt(t.length-1);if(!(i>=55296&&56319>=i)){if(this.charReceived=this.charLength=0,r==e.length)return t;e=e.slice(r,e.length);break}this.charLength+=this.surrogateSize,t=""}var o=this.detectIncompleteChar(e),a=e.length;this.charLength&&(e.copy(this.charBuffer,0,e.length-o,a),this.charReceived=o,a-=o),t+=e.toString(this.encoding,0,a);var a=t.length-1,i=t.charCodeAt(a);if(i>=55296&&56319>=i){var s=this.surrogateSize;return this.charLength+=s,this.charReceived+=s,this.charBuffer.copy(this.charBuffer,s,0,s),this.charBuffer.write(t.charAt(t.length-1),this.encoding),t.substring(0,a)}return t},StringDecoder.prototype.detectIncompleteChar=function(e){for(var t=e.length>=3?3:e.length;t>0;t--){var n=e[e.length-t];if(1==t&&n>>5==6){this.charLength=2;break}if(2>=t&&n>>4==14){this.charLength=3;break}if(3>=t&&n>>3==30){this.charLength=4;break}}return t},StringDecoder.prototype.end=function(e){var t="";if(e&&e.length&&(t=this.write(e)),this.charReceived){var n=this.charReceived,r=this.charBuffer,i=this.encoding;t+=r.slice(0,n).toString(i)}return t};
  //# sourceMappingURL=string_decoder.js.map
  global.define = __define;
  return module.exports;
});

System.register("npm:cwise-compiler@0.0.0", ["npm:cwise-compiler@0.0.0/compiler"], true, function(require, exports, __moduleName) {
  var global = System.global;
  var __define = global.define;
  global.define = undefined;
  var module = { exports: exports };
  var process = System.get("@@nodeProcess")["default"];
    var __filename = "jspm_packages/npm/cwise-compiler@0.0.0.js";
    var __dirname = "jspm_packages/npm";
  module.exports = require("npm:cwise-compiler@0.0.0/compiler");
  
  global.define = __define;
  return module.exports;
});

System.register("npm:cwise-compiler@0.1.0", ["npm:cwise-compiler@0.1.0/compiler"], true, function(require, exports, __moduleName) {
  var global = System.global;
  var __define = global.define;
  global.define = undefined;
  var module = { exports: exports };
  var process = System.get("@@nodeProcess")["default"];
    var __filename = "jspm_packages/npm/cwise-compiler@0.1.0.js";
    var __dirname = "jspm_packages/npm";
  module.exports = require("npm:cwise-compiler@0.1.0/compiler");
  
  global.define = __define;
  return module.exports;
});

System.register("npm:glsl-parser@0.0.5/index", ["./lib/index"], true, function(require, exports, __moduleName) {
  var global = System.global;
  var __define = global.define;
  global.define = undefined;
  var module = { exports: exports };
  var process = System.get("@@nodeProcess")["default"];
    var __filename = "jspm_packages/npm/glsl-parser@0.0.5/index.js";
    var __dirname = "jspm_packages/npm/glsl-parser@0.0.5";
  "format cjs";module.exports=require("./lib/index");
  //# sourceMappingURL=index.js.map
  global.define = __define;
  return module.exports;
});

System.register("npm:game-shell@0.1.4", ["npm:game-shell@0.1.4/shell"], true, function(require, exports, __moduleName) {
  var global = System.global;
  var __define = global.define;
  global.define = undefined;
  var module = { exports: exports };
  var process = System.get("@@nodeProcess")["default"];
    var __filename = "jspm_packages/npm/game-shell@0.1.4.js";
    var __dirname = "jspm_packages/npm";
  module.exports = require("npm:game-shell@0.1.4/shell");
  
  global.define = __define;
  return module.exports;
});

System.register("npm:cwise@0.3.4/cwise", ["cwise-parser","cwise-compiler"], true, function(require, exports, __moduleName) {
  var global = System.global;
  var __define = global.define;
  global.define = undefined;
  var module = { exports: exports };
  var process = System.get("@@nodeProcess")["default"];
    var __filename = "jspm_packages/npm/cwise@0.3.4/cwise.js";
    var __dirname = "jspm_packages/npm/cwise@0.3.4";
  "format cjs";"use strict";function createCWise(e){for(var t in e)REQUIRED_FIELDS.indexOf(t)<0&&OPTIONAL_FIELDS.indexOf(t)<0&&console.warn("cwise: Unknown argument '"+t+"' passed to expression compiler");for(var n=0;n<REQUIRED_FIELDS.length;++n)if(!e[REQUIRED_FIELDS[n]])throw new Error("cwise: Missing argument: "+REQUIRED_FIELDS[n]);return compile({args:e.args,pre:parse(e.pre||function(){}),body:parse(e.body),post:parse(e.post||function(){}),debug:!!e.printCode,funcName:e.funcName||e.body.name||"cwise",blockSize:e.blockSize||64})}var parse=require("cwise-parser"),compile=require("cwise-compiler"),REQUIRED_FIELDS=["args","body"],OPTIONAL_FIELDS=["pre","post","printCode","funcName","blockSize"];module.exports=createCWise;
  //# sourceMappingURL=cwise.js.map
  global.define = __define;
  return module.exports;
});

System.register("npm:gl-texture2d@0.1.12/texture", ["ndarray","ndarray-ops","typedarray-pool","webglew"], true, function(require, exports, __moduleName) {
  var global = System.global;
  var __define = global.define;
  global.define = undefined;
  var module = { exports: exports };
  var process = System.get("@@nodeProcess")["default"];
    var __filename = "jspm_packages/npm/gl-texture2d@0.1.12/texture.js";
    var __dirname = "jspm_packages/npm/gl-texture2d@0.1.12";
  "format cjs";"use strict";function lazyInitLinearTypes(e){linearTypes=[e.LINEAR,e.NEAREST_MIPMAP_LINEAR,e.LINEAR_MIPMAP_NEAREST,e.LINEAR_MIPMAP_NEAREST],filterTypes=[e.NEAREST,e.LINEAR,e.NEAREST_MIPMAP_NEAREST,e.NEAREST_MIPMAP_LINEAR,e.LINEAR_MIPMAP_NEAREST,e.LINEAR_MIPMAP_LINEAR],wrapTypes=[e.REPEAT,e.CLAMP_TO_EDGE,e.MIRRORED_REPEAT]}function Texture2D(e,t,n,o,r,i){this.gl=e,this.handle=t,this.shape=[o,n],this.format=r,this.type=i,this._mipLevels=[0],this._magFilter=e.NEAREST,this._minFilter=e.NEAREST,this._wrapS=e.CLAMP_TO_EDGE,this._wrapT=e.CLAMP_TO_EDGE,this._anisoSamples=1}function texSubImageArray(e,t,n,o,r,i,a,u){var c=u.dtype||ndarray.dtype(u),s=u.shape,l=isPacked(u),f=0,h=0;if("float32"===c?f=e.FLOAT:"float64"===c?(f=e.FLOAT,l=!1,c="float32"):"uint8"===c?f=e.UNSIGNED_BYTE:(f=e.UNSIGNED_BYTE,l=!1),2===s.length)h=e.LUMINANCE;else{if(3!==s.length)throw new Error("Invalid shape for texture");if(1===s[2])h=e.ALPHA;else if(2===s[2])h=e.LUMINANCE_ALPHA;else if(3===s[2])h=e.RGB;else{if(4!==s[2])throw new Error("Invalid shape for pixel coords");h=e.RGBA}}if(h!==e.LUMINANCE&&h!==e.ALPHA||r!==e.LUMINANCE&&r!==e.ALPHA||(h=r),h!==r)throw new Error("Incompatible texture format for setPixels");var d=u.size;"number"!=typeof d&&(d=ndarray.size(u));var p=a.indexOf(o)<0;if(p&&a.push(o),f===i&&l)0===u.offset&&u.data.length===d?p?e.texImage2D(e.TEXTURE_2D,o,r,s[1],s[0],0,r,i,u.data):e.texSubImage2D(e.TEXTURE_2D,o,t,n,s[1],s[0],r,i,u.data):p?e.texImage2D(e.TEXTURE_2D,o,r,s[1],s[0],0,r,i,u.data.subarray(u.offset,u.offset+d)):e.texSubImage2D(e.TEXTURE_2D,o,t,n,s[1],s[0],r,i,u.data.subarray(u.offset,u.offset+d));else{var v;v=i===e.FLOAT?pool.mallocFloat32(d):pool.mallocUint8(d);var m=ndarray(v,s);f===e.FLOAT&&i===e.UNSIGNED_BYTE?convertFloatToUint8(m,u):ops.assign(m,u),p?e.texImage2D(e.TEXTURE_2D,o,r,s[1],s[0],0,r,i,v.subarray(0,d)):e.texSubImage2D(e.TEXTURE_2D,o,t,n,s[1],s[0],r,i,v.subarray(0,d)),i===e.FLOAT?pool.freeFloat32(v):pool.freeUint8(v)}}function initTexture(e){var t=e.createTexture();return e.bindTexture(e.TEXTURE_2D,t),e.texParameteri(e.TEXTURE_2D,e.TEXTURE_MIN_FILTER,e.NEAREST),e.texParameteri(e.TEXTURE_2D,e.TEXTURE_MAG_FILTER,e.NEAREST),e.texParameteri(e.TEXTURE_2D,e.TEXTURE_WRAP_S,e.CLAMP_TO_EDGE),e.texParameteri(e.TEXTURE_2D,e.TEXTURE_WRAP_T,e.CLAMP_TO_EDGE),t}function createTextureShape(e,t,n,o,r){var i=initTexture(e);return e.texImage2D(e.TEXTURE_2D,0,o,t,n,0,o,r,null),new Texture2D(e,i,t,n,o,r)}function createTextureDOM(e,t,n,o){var r=initTexture(e);return e.texImage2D(e.TEXTURE_2D,0,n,n,o,t),new Texture2D(e,r,0|t.width,0|t.height,n,o)}function isPacked(e){for(var t=e.shape,n=e.stride,o=1,r=t.length-1;r>=0;--r){if(n[r]!==o)return!1;o*=t[r]}return!0}function createTextureArray(e,t){var n=t.dtype||ndarray.dtype(t),o=t.shape,r=isPacked(t),i=0;"float32"===n?i=e.FLOAT:"float64"===n?(i=e.FLOAT,r=!1,n="float32"):"uint8"===n?i=e.UNSIGNED_BYTE:(i=e.UNSIGNED_BYTE,r=!1);var a=0;if(2===o.length)a=e.LUMINANCE;else{if(3!==o.length)throw new Error("Invalid shape for texture");if(1===o[2])a=e.ALPHA;else if(2===o[2])a=e.LUMINANCE_ALPHA;else if(3===o[2])a=e.RGB;else{if(4!==o[2])throw new Error("Invalid shape for pixel coords");a=e.RGBA}}i===e.FLOAT&&webglew(e).texture_float&&(i=e.UNSIGNED_BYTE,r=!1);var u,c;if(r){var s=t.size;"number"!=typeof s&&(s=ndarray.size(t)),u=t.data.subarray(t.offset,t.offset+s)}else{for(var l=1,f=new Array(o.length),h=o.length-1;h>=0;--h)f[h]=l,l*=o[h];c=pool.malloc(l,n);var d=ndarray(c,t.shape,f,0);"float32"!==n&&"float64"!==n||i!==e.UNSIGNED_BYTE?ops.assign(d,t):convertFloatToUint8(d,t),u=c.subarray(0,l)}var p=initTexture(e);return e.texImage2D(e.TEXTURE_2D,0,a,o[1],o[0],0,a,i,u),r||pool.free(c),new Texture2D(e,p,o[1],o[0],a,i)}function createTexture2D(e){if(arguments.length<=1)throw new Error("Missing arguments for texture2d constructor");if(linearTypes||lazyInitLinearTypes(e),"number"==typeof arguments[1])return createTextureShape(e,arguments[1],arguments[2],arguments[3]||e.RGBA,arguments[4]||e.UNSIGNED_BYTE);if("object"==typeof arguments[1]){var t=arguments[1];if(t instanceof HTMLCanvasElement||t instanceof HTMLImageElement||t instanceof HTMLVideoElement||t instanceof ImageData)return createTextureDOM(e,t,arguments[2]||e.RGBA,arguments[3]||e.UNSIGNED_BYTE);if(t.shape&&t.data&&t.stride)return createTextureArray(e,t)}throw new Error("Invalid arguments for texture2d constructor")}var ndarray=require("ndarray"),ops=require("ndarray-ops"),pool=require("typedarray-pool"),webglew=require("webglew"),linearTypes=null,filterTypes=null,wrapTypes=null,convertFloatToUint8=function(e,t){ops.muls(e,t,255)};Object.defineProperty(Texture2D.prototype,"minFilter",{get:function(){return this._minFilter},set:function(e){this.bind();var t=this.gl;if(this.type===t.FLOAT&&linearTypes.indexOf(e)>=0&&(webglew(t).OES_texture_float_linear||(e=t.NEAREST)),filterTypes.indexOf(e)<0)throw new Error("gl-texture2d: Unknown filter mode "+e);return t.texParameteri(t.TEXTURE_2D,t.TEXTURE_MIN_FILTER,e),this._minFilter=e}});var proto=Texture2D.prototype;Object.defineProperty(proto,"magFilter",{get:function(){return this._magFilter},set:function(e){this.bind();var t=this.gl;if(this.type===t.FLOAT&&linearTypes.indexOf(e)>=0&&(webglew(t).OES_texture_float_linear||(e=t.NEAREST)),filterTypes.indexOf(e)<0)throw new Error("gl-texture2d: Unknown filter mode "+e);return t.texParameteri(t.TEXTURE_2D,t.TEXTURE_MAG_FILTER,e),this._magFilter=e}}),Object.defineProperty(proto,"wrapS",{get:function(){return this._wrapS},set:function(e){if(this.bind(),wrapTypes.indexOf(e)<0)throw new Error("gl-texture2d: Unknown wrap mode "+e);return this.gl.texParameteri(this.gl.TEXTURE_2D,this.gl.TEXTURE_WRAP_S,e),this._wrapS=e}}),Object.defineProperty(proto,"wrapT",{get:function(){return this._wrapT},set:function(e){if(this.bind(),wrapTypes.indexOf(e)<0)throw new Error("gl-texture2d: Unknown wrap mode "+e);return this.gl.texParameteri(this.gl.TEXTURE_2D,this.gl.TEXTURE_WRAP_T,e),this._wrapT=e}}),Object.defineProperty(proto,"mipSamples",{get:function(){return this._anisoSamples},set:function(e){var t=this._anisoSamples;if(this._anisoSamples=0|e,t!==this._anisoSamples){var n=webglew(this.gl).EXT_texture_filter_anisotropic;n&&this.gl.texParameterf(this.gl.TEXTURE_2D,n.TEXTURE_MAX_ANISOTROPY_EXT,this._anisoSamples)}return this._anisoSamples}}),proto.bind=function(e){var t=this.gl;return void 0!==e&&t.activeTexture(t.TEXTURE0+(0|e)),t.bindTexture(t.TEXTURE_2D,this.handle),void 0!==e?e:t.getParameter(t.ACTIVE_TEXTURE)-t.TEXTURE0},proto.dispose=function(){this.gl.deleteTexture(this.handle)},proto.generateMipmap=function(){this.bind(),this.gl.generateMipmap(this.gl.TEXTURE_2D);for(var e=Math.min(this.shape[0],this.shape[1]),t=0;e>0;++t,e>>>=1)this._mipLevels.indexOf(t)<0&&this._mipLevels.push(t)},proto.setPixels=function(e,t,n,o){var r=this.gl;if(this.bind(),t=t||0,n=n||0,o=o||0,e instanceof HTMLCanvasElement||e instanceof ImageData||e instanceof HTMLImageElement||e instanceof HTMLVideoElement){var i=this._mipLevels.indexOf(o)<0;i?(r.texImage2D(r.TEXTURE_2D,0,this.format,this.format,this.type,e),this._mipLevels.push(o)):r.texSubImage2D(r.TEXTURE_2D,o,t,n,this.format,this.type,e)}else{if(!(e.shape&&e.stride&&e.data))throw new Error("Unsupported data type");if(e.shape.length<2||t+e.shape[1]>this.shape[1]>>>o||n+e.shape[0]>this.shape[0]>>>o||0>t||0>n)throw new Error("Texture dimensions are out of bounds");texSubImageArray(r,t,n,o,this.format,this.type,this._mipLevels,e)}},module.exports=createTexture2D;
  //# sourceMappingURL=texture.js.map
  global.define = __define;
  return module.exports;
});

System.register("github:jspm/nodelibs@0.0.2/stream/readable", ["../string_decoder","../events","./stream","../buffer","@@nodeProcess","npm:inherits@^2.0.1","../string_decoder"], true, function(require, exports, __moduleName) {
  var global = System.global;
  var __define = global.define;
  global.define = undefined;
  var module = { exports: exports };
  var process = System.get("@@nodeProcess")["default"];
    var __filename = "jspm_packages/github/jspm/nodelibs@0.0.2/stream/readable.js";
    var __dirname = "jspm_packages/github/jspm/nodelibs@0.0.2/stream";
  "format cjs";function ReadableState(e){e=e||{};var t=e.highWaterMark;this.highWaterMark=t||0===t?t:16384,this.highWaterMark=~~this.highWaterMark,this.buffer=[],this.length=0,this.pipes=null,this.pipesCount=0,this.flowing=!1,this.ended=!1,this.endEmitted=!1,this.reading=!1,this.calledRead=!1,this.sync=!0,this.needReadable=!1,this.emittedReadable=!1,this.readableListening=!1,this.objectMode=!!e.objectMode,this.defaultEncoding=e.defaultEncoding||"utf8",this.ranOut=!1,this.awaitDrain=0,this.readingMore=!1,this.decoder=null,this.encoding=null,e.encoding&&(StringDecoder||(StringDecoder=require("../string_decoder").StringDecoder),this.decoder=new StringDecoder(e.encoding),this.encoding=e.encoding)}function Readable(e){return this instanceof Readable?(this._readableState=new ReadableState(e,this),this.readable=!0,void Stream.call(this)):new Readable(e)}function readableAddChunk(e,t,n,r,o){var i=chunkInvalid(t,n);if(i)e.emit("error",i);else if(null===n||void 0===n)t.reading=!1,t.ended||onEofChunk(e,t);else if(t.objectMode||n&&n.length>0)if(t.ended&&!o){var a=new Error("stream.push() after EOF");e.emit("error",a)}else if(t.endEmitted&&o){var a=new Error("stream.unshift() after end event");e.emit("error",a)}else!t.decoder||o||r||(n=t.decoder.write(n)),t.length+=t.objectMode?1:n.length,o?t.buffer.unshift(n):(t.reading=!1,t.buffer.push(n)),t.needReadable&&emitReadable(e),maybeReadMore(e,t);else o||(t.reading=!1);return needMoreData(t)}function needMoreData(e){return!e.ended&&(e.needReadable||e.length<e.highWaterMark||0===e.length)}function roundUpToNextPowerOf2(e){if(e>=MAX_HWM)e=MAX_HWM;else{e--;for(var t=1;32>t;t<<=1)e|=e>>t;e++}return e}function howMuchToRead(e,t){return 0===t.length&&t.ended?0:t.objectMode?0===e?0:1:isNaN(e)||null===e?t.flowing&&t.buffer.length?t.buffer[0].length:t.length:0>=e?0:(e>t.highWaterMark&&(t.highWaterMark=roundUpToNextPowerOf2(e)),e>t.length?t.ended?t.length:(t.needReadable=!0,0):e)}function chunkInvalid(e,t){var n=null;return Buffer.isBuffer(t)||"string"==typeof t||null===t||void 0===t||e.objectMode||n||(n=new TypeError("Invalid non-string/buffer chunk")),n}function onEofChunk(e,t){if(t.decoder&&!t.ended){var n=t.decoder.end();n&&n.length&&(t.buffer.push(n),t.length+=t.objectMode?1:n.length)}t.ended=!0,t.length>0?emitReadable(e):endReadable(e)}function emitReadable(e){var t=e._readableState;t.needReadable=!1,t.emittedReadable||(t.emittedReadable=!0,t.sync?setImmediate(function(){emitReadable_(e)}):emitReadable_(e))}function emitReadable_(e){e.emit("readable")}function maybeReadMore(e,t){t.readingMore||(t.readingMore=!0,setImmediate(function(){maybeReadMore_(e,t)}))}function maybeReadMore_(e,t){for(var n=t.length;!t.reading&&!t.flowing&&!t.ended&&t.length<t.highWaterMark&&(e.read(0),n!==t.length);)n=t.length;t.readingMore=!1}function pipeOnDrain(e){return function(){var t=e._readableState;t.awaitDrain--,0===t.awaitDrain&&flow(e)}}function flow(e){function t(e){var t=e.write(n);!1===t&&r.awaitDrain++}var n,r=e._readableState;for(r.awaitDrain=0;r.pipesCount&&null!==(n=e.read());)if(1===r.pipesCount?t(r.pipes,0,null):forEach(r.pipes,t),e.emit("data",n),r.awaitDrain>0)return;return 0===r.pipesCount?(r.flowing=!1,void(EE.listenerCount(e,"data")>0&&emitDataEvents(e))):void(r.ranOut=!0)}function pipeOnReadable(){this._readableState.ranOut&&(this._readableState.ranOut=!1,flow(this))}function emitDataEvents(e,t){var n=e._readableState;if(n.flowing)throw new Error("Cannot switch to old mode now.");var r=t||!1,o=!1;e.readable=!0,e.pipe=Stream.prototype.pipe,e.on=e.addListener=Stream.prototype.on,e.on("readable",function(){o=!0;for(var t;!r&&null!==(t=e.read());)e.emit("data",t);null===t&&(o=!1,e._readableState.needReadable=!0)}),e.pause=function(){r=!0,this.emit("pause")},e.resume=function(){r=!1,o?setImmediate(function(){e.emit("readable")}):this.read(0),this.emit("resume")},e.emit("readable")}function fromList(e,t){var n,r=t.buffer,o=t.length,i=!!t.decoder,a=!!t.objectMode;if(0===r.length)return null;if(0===o)n=null;else if(a)n=r.shift();else if(!e||e>=o)n=i?r.join(""):Buffer.concat(r,o),r.length=0;else if(e<r[0].length){var s=r[0];n=s.slice(0,e),r[0]=s.slice(e)}else if(e===r[0].length)n=r.shift();else{n=i?"":new Buffer(e);for(var u=0,c=0,l=r.length;l>c&&e>u;c++){var s=r[0],f=Math.min(e-u,s.length);i?n+=s.slice(0,f):s.copy(n,u,0,f),f<s.length?r[0]=s.slice(f):r.shift(),u+=f}}return n}function endReadable(e){var t=e._readableState;if(t.length>0)throw new Error("endReadable called on non-empty stream");!t.endEmitted&&t.calledRead&&(t.ended=!0,setImmediate(function(){t.endEmitted||0!==t.length||(t.endEmitted=!0,e.readable=!1,e.emit("end"))}))}function forEach(e,t){for(var n=0,r=e.length;r>n;n++)t(e[n],n)}function indexOf(e,t){for(var n=0,r=e.length;r>n;n++)if(e[n]===t)return n;return-1}module.exports=Readable,Readable.ReadableState=ReadableState;var EE=require("../events").EventEmitter,Stream=require("./stream"),Buffer=require("../buffer").Buffer,setImmediate=require("@@nodeProcess").nextTick,StringDecoder,inherits=require("npm:inherits@^2.0.1");inherits(Readable,Stream),Readable.prototype.push=function(e,t){var n=this._readableState;return"string"!=typeof e||n.objectMode||(t=t||n.defaultEncoding,t!==n.encoding&&(e=new Buffer(e,t),t="")),readableAddChunk(this,n,e,t,!1)},Readable.prototype.unshift=function(e){var t=this._readableState;return readableAddChunk(this,t,e,"",!0)},Readable.prototype.setEncoding=function(e){StringDecoder||(StringDecoder=require("../string_decoder").StringDecoder),this._readableState.decoder=new StringDecoder(e),this._readableState.encoding=e};var MAX_HWM=8388608;Readable.prototype.read=function(e){var t=this._readableState;t.calledRead=!0;var n=e;if(("number"!=typeof e||e>0)&&(t.emittedReadable=!1),0===e&&t.needReadable&&(t.length>=t.highWaterMark||t.ended))return emitReadable(this),null;if(e=howMuchToRead(e,t),0===e&&t.ended)return 0===t.length&&endReadable(this),null;var r=t.needReadable;t.length-e<=t.highWaterMark&&(r=!0),(t.ended||t.reading)&&(r=!1),r&&(t.reading=!0,t.sync=!0,0===t.length&&(t.needReadable=!0),this._read(t.highWaterMark),t.sync=!1),r&&!t.reading&&(e=howMuchToRead(n,t));var o;return o=e>0?fromList(e,t):null,null===o&&(t.needReadable=!0,e=0),t.length-=e,0!==t.length||t.ended||(t.needReadable=!0),t.ended&&!t.endEmitted&&0===t.length&&endReadable(this),o},Readable.prototype._read=function(){this.emit("error",new Error("not implemented"))},Readable.prototype.pipe=function(e,t){function n(e){e===c&&o()}function r(){e.end()}function o(){e.removeListener("close",a),e.removeListener("finish",s),e.removeListener("drain",p),e.removeListener("error",i),e.removeListener("unpipe",n),c.removeListener("end",r),c.removeListener("end",o),(!e._writableState||e._writableState.needDrain)&&p()}function i(t){u(),0===d&&0===EE.listenerCount(e,"error")&&e.emit("error",t)}function a(){e.removeListener("finish",s),u()}function s(){e.removeListener("close",a),u()}function u(){c.unpipe(e)}var c=this,l=this._readableState;switch(l.pipesCount){case 0:l.pipes=e;break;case 1:l.pipes=[l.pipes,e];break;default:l.pipes.push(e)}l.pipesCount+=1;var f=(!t||t.end!==!1)&&e!==process.stdout&&e!==process.stderr,h=f?r:o;l.endEmitted?setImmediate(h):c.once("end",h),e.on("unpipe",n);var p=pipeOnDrain(c);e.on("drain",p);var d=EE.listenerCount(e,"error");return e.once("error",i),e.once("close",a),e.once("finish",s),e.emit("pipe",c),l.flowing||(this.on("readable",pipeOnReadable),l.flowing=!0,setImmediate(function(){flow(c)})),e},Readable.prototype.unpipe=function(e){var t=this._readableState;if(0===t.pipesCount)return this;if(1===t.pipesCount)return e&&e!==t.pipes?this:(e||(e=t.pipes),t.pipes=null,t.pipesCount=0,this.removeListener("readable",pipeOnReadable),t.flowing=!1,e&&e.emit("unpipe",this),this);if(!e){var n=t.pipes,r=t.pipesCount;t.pipes=null,t.pipesCount=0,this.removeListener("readable",pipeOnReadable),t.flowing=!1;for(var o=0;r>o;o++)n[o].emit("unpipe",this);return this}var o=indexOf(t.pipes,e);return-1===o?this:(t.pipes.splice(o,1),t.pipesCount-=1,1===t.pipesCount&&(t.pipes=t.pipes[0]),e.emit("unpipe",this),this)},Readable.prototype.on=function(e,t){var n=Stream.prototype.on.call(this,e,t);if("data"!==e||this._readableState.flowing||emitDataEvents(this),"readable"===e&&this.readable){var r=this._readableState;r.readableListening||(r.readableListening=!0,r.emittedReadable=!1,r.needReadable=!0,r.reading?r.length&&emitReadable(this,r):this.read(0))}return n},Readable.prototype.addListener=Readable.prototype.on,Readable.prototype.resume=function(){emitDataEvents(this),this.read(0),this.emit("resume")},Readable.prototype.pause=function(){emitDataEvents(this,!0),this.emit("pause")},Readable.prototype.wrap=function(e){var t=this._readableState,n=!1,r=this;e.on("end",function(){if(t.decoder&&!t.ended){var e=t.decoder.end();e&&e.length&&r.push(e)}r.push(null)}),e.on("data",function(o){if(t.decoder&&(o=t.decoder.write(o)),o&&(t.objectMode||o.length)){var i=r.push(o);i||(n=!0,e.pause())}});for(var o in e)"function"==typeof e[o]&&"undefined"==typeof this[o]&&(this[o]=function(t){return function(){return e[t].apply(e,arguments)}}(o));var i=["error","close","destroy","pause","resume"];return forEach(i,function(t){e.on(t,function(e){return r.emit.apply(r,t,e)})}),r._read=function(){n&&(n=!1,e.resume())},r},Readable._fromList=fromList;
  //# sourceMappingURL=readable.js.map
  global.define = __define;
  return module.exports;
});

System.register("npm:ndarray-ops@1.1.1/ndarray-ops", ["cwise-compiler"], true, function(require, exports, __moduleName) {
  var global = System.global;
  var __define = global.define;
  global.define = undefined;
  var module = { exports: exports };
  var process = System.get("@@nodeProcess")["default"];
    var __filename = "jspm_packages/npm/ndarray-ops@1.1.1/ndarray-ops.js";
    var __dirname = "jspm_packages/npm/ndarray-ops@1.1.1";
  "format cjs";"use strict";function fixup(t){if(!t)return EmptyProc;for(var e=0;e<t.args.length;++e){var n=t.args[e];t.args[e]=0===e?{name:n,lvalue:!0,rvalue:!!t.rvalue,count:t.count||1}:{name:n,lvalue:!1,rvalue:!0,count:1}}return t.thisVars||(t.thisVars=[]),t.localVars||(t.localVars=[]),t}function pcompile(t){return compile({args:t.args,pre:fixup(t.pre),body:fixup(t.body),post:fixup(t.proc),funcName:t.funcName})}function makeOp(t){for(var e=[],n=0;n<t.args.length;++n)e.push("a"+n);var o=new Function("P",["return function ",t.funcName,"_ndarrayops(",e.join(","),") {P(",e.join(","),");return a0}"].join(""));return o(pcompile(t))}var compile=require("cwise-compiler"),EmptyProc={body:"",args:[],thisVars:[],localVars:[]},assign_ops={add:"+",sub:"-",mul:"*",div:"/",mod:"%",band:"&",bor:"|",bxor:"^",lshift:"<<",rshift:">>",rrshift:">>>"};!function(){for(var t in assign_ops){var e=assign_ops[t];exports[t]=makeOp({args:["array","array","array"],body:{args:["a","b","c"],body:"a=b"+e+"c"},funcName:t}),exports[t+"eq"]=makeOp({args:["array","array"],body:{args:["a","b"],body:"a"+e+"=b"},rvalue:!0,funcName:t+"eq"}),exports[t+"s"]=makeOp({args:["array","array","scalar"],body:{args:["a","b","s"],body:"a=b"+e+"s"},funcName:t+"s"}),exports[t+"seq"]=makeOp({args:["array","scalar"],body:{args:["a","s"],body:"a"+e+"=s"},rvalue:!0,funcName:t+"seq"})}}();var unary_ops={not:"!",bnot:"~",neg:"-",recip:"1.0/"};!function(){for(var t in unary_ops){var e=unary_ops[t];exports[t]=makeOp({args:["array","array"],body:{args:["a","b"],body:"a="+e+"b"},funcName:t}),exports[t+"eq"]=makeOp({args:["array"],body:{args:["a"],body:"a="+e+"a"},rvalue:!0,count:2,funcName:t+"eq"})}}();var binary_ops={and:"&&",or:"||",eq:"===",neq:"!==",lt:"<",gt:">",leq:"<=",geq:">="};!function(){for(var t in binary_ops){var e=binary_ops[t];exports[t]=makeOp({args:["array","array","array"],body:{args:["a","b","c"],body:"a=b"+e+"c"},funcName:t}),exports[t+"s"]=makeOp({args:["array","array","scalar"],body:{args:["a","b","s"],body:"a=b"+e+"s"},funcName:t+"s"}),exports[t+"eq"]=makeOp({args:["array","array"],body:{args:["a","b"],body:"a=a"+e+"b"},rvalue:!0,count:2,funcName:t+"eq"}),exports[t+"seq"]=makeOp({args:["array","scalar"],body:{args:["a","s"],body:"a=a"+e+"s"},rvalue:!0,count:2,funcName:t+"seq"})}}();var math_unary=["abs","acos","asin","atan","ceil","cos","exp","floor","log","round","sin","sqrt","tan"];!function(){for(var t=0;t<math_unary.length;++t){var e=math_unary[t];exports[e]=makeOp({args:["array","array"],pre:{args:[],body:"this_f=Math."+e,thisVars:["this_f"]},body:{args:["a","b"],body:"a=this_f(b)",thisVars:["this_f"]},funcName:e}),exports[e+"eq"]=makeOp({args:["array"],pre:{args:[],body:"this_f=Math."+e,thisVars:["this_f"]},body:{args:["a"],body:"a=this_f(a)",thisVars:["this_f"]},rvalue:!0,count:2,funcName:e+"eq"})}}();var math_comm=["max","min","atan2","pow"];!function(){for(var t=0;t<math_comm.length;++t){var e=math_comm[t];exports[e]=makeOp({args:["array","array","array"],pre:{args:[],body:"this_f=Math."+e,thisVars:["this_f"]},body:{args:["a","b","c"],body:"a=this_f(b,c)",thisVars:["this_f"]},funcName:e}),exports[e+"s"]=makeOp({args:["array","array","scalar"],pre:{args:[],body:"this_f=Math."+e,thisVars:["this_f"]},body:{args:["a","b","c"],body:"a=this_f(b,c)",thisVars:["this_f"]},funcName:e+"s"}),exports[e+"eq"]=makeOp({args:["array","array"],pre:{args:[],body:"this_f=Math."+e,thisVars:["this_f"]},body:{args:["a","b"],body:"a=this_f(a,b)",thisVars:["this_f"]},rvalue:!0,count:2,funcName:e+"eq"}),exports[e+"seq"]=makeOp({args:["array","scalar"],pre:{args:[],body:"this_f=Math."+e,thisVars:["this_f"]},body:{args:["a","b"],body:"a=this_f(a,b)",thisVars:["this_f"]},rvalue:!0,count:2,funcName:e+"seq"})}}();var math_noncomm=["atan2","pow"];!function(){for(var t=0;t<math_noncomm.length;++t){var e=math_noncomm[t];exports[e+"op"]=makeOp({args:["array","array","array"],pre:{args:[],body:"this_f=Math."+e,thisVars:["this_f"]},body:{args:["a","b","c"],body:"a=this_f(c,b)",thisVars:["this_f"]},funcName:e+"op"}),exports[e+"ops"]=makeOp({args:["array","array","scalar"],pre:{args:[],body:"this_f=Math."+e,thisVars:["this_f"]},body:{args:["a","b","c"],body:"a=this_f(c,b)",thisVars:["this_f"]},funcName:e+"ops"}),exports[e+"opeq"]=makeOp({args:["array","array"],pre:{args:[],body:"this_f=Math."+e,thisVars:["this_f"]},body:{args:["a","b"],body:"a=this_f(b,a)",thisVars:["this_f"]},rvalue:!0,count:2,funcName:e+"opeq"}),exports[e+"opseq"]=makeOp({args:["array","scalar"],pre:{args:[],body:"this_f=Math."+e,thisVars:["this_f"]},body:{args:["a","b"],body:"a=this_f(b,a)",thisVars:["this_f"]},rvalue:!0,count:2,funcName:e+"opseq"})}}(),exports.any=compile({args:["array"],pre:EmptyProc,body:{args:[{name:"a",lvalue:!1,rvalue:!0,count:1}],body:"if(a){return true}",localVars:[],thisVars:[]},post:{args:[],localVars:[],thisVars:[],body:"return false"},funcName:"any"}),exports.all=compile({args:["array"],pre:EmptyProc,body:{args:[{name:"x",lvalue:!1,rvalue:!0,count:1}],body:"if(!x){return false}",localVars:[],thisVars:[]},post:{args:[],localVars:[],thisVars:[],body:"return true"},funcName:"all"}),exports.sum=compile({args:["array"],pre:{args:[],localVars:[],thisVars:["this_s"],body:"this_s=0"},body:{args:[{name:"a",lvalue:!1,rvalue:!0,count:1}],body:"this_s+=a",localVars:[],thisVars:["this_s"]},post:{args:[],localVars:[],thisVars:["this_s"],body:"return this_s"},funcName:"sum"}),exports.prod=compile({args:["array"],pre:{args:[],localVars:[],thisVars:["this_s"],body:"this_s=1"},body:{args:[{name:"a",lvalue:!1,rvalue:!0,count:1}],body:"this_s*=a",localVars:[],thisVars:["this_s"]},post:{args:[],localVars:[],thisVars:["this_s"],body:"return this_s"},funcName:"prod"}),exports.norm2squared=compile({args:["array"],pre:{args:[],localVars:[],thisVars:["this_s"],body:"this_s=0"},body:{args:[{name:"a",lvalue:!1,rvalue:!0,count:2}],body:"this_s+=a*a",localVars:[],thisVars:["this_s"]},post:{args:[],localVars:[],thisVars:["this_s"],body:"return this_s"},funcName:"norm2squared"}),exports.norm2=compile({args:["array"],pre:{args:[],localVars:[],thisVars:["this_s"],body:"this_s=0"},body:{args:[{name:"a",lvalue:!1,rvalue:!0,count:2}],body:"this_s+=a*a",localVars:[],thisVars:["this_s"]},post:{args:[],localVars:[],thisVars:["this_s"],body:"return Math.sqrt(this_s)"},funcName:"norm2"}),exports.norminf=compile({args:["array"],pre:{args:[],localVars:[],thisVars:["this_s"],body:"this_s=0"},body:{args:[{name:"a",lvalue:!1,rvalue:!0,count:4}],body:"if(-a>this_s){this_s=-a}else if(a>this_s){this_s=a}",localVars:[],thisVars:["this_s"]},post:{args:[],localVars:[],thisVars:["this_s"],body:"return this_s"},funcName:"norminf"}),exports.norm1=compile({args:["array"],pre:{args:[],localVars:[],thisVars:["this_s"],body:"this_s=0"},body:{args:[{name:"a",lvalue:!1,rvalue:!0,count:3}],body:"this_s+=a<0?-a:a",localVars:[],thisVars:["this_s"]},post:{args:[],localVars:[],thisVars:["this_s"],body:"return this_s"},funcName:"norm1"}),exports.sup=compile({args:["array"],pre:{body:"this_h=-Infinity",args:[],thisVars:["this_h"],localVars:[]},body:{body:"if(_inline_1_arg0_>this_h)this_h=_inline_1_arg0_",args:[{name:"_inline_1_arg0_",lvalue:!1,rvalue:!0,count:2}],thisVars:["this_h"],localVars:[]},post:{body:"return this_h",args:[],thisVars:["this_h"],localVars:[]}}),exports.inf=compile({args:["array"],pre:{body:"this_h=Infinity",args:[],thisVars:["this_h"],localVars:[]},body:{body:"if(_inline_1_arg0_<this_h)this_h=_inline_1_arg0_",args:[{name:"_inline_1_arg0_",lvalue:!1,rvalue:!0,count:2}],thisVars:["this_h"],localVars:[]},post:{body:"return this_h",args:[],thisVars:["this_h"],localVars:[]}}),exports.argmin=compile({args:["index","array","shape"],pre:{body:"{this_v=Infinity;this_i=_inline_0_arg2_.slice(0)}",args:[{name:"_inline_0_arg0_",lvalue:!1,rvalue:!1,count:0},{name:"_inline_0_arg1_",lvalue:!1,rvalue:!1,count:0},{name:"_inline_0_arg2_",lvalue:!1,rvalue:!0,count:1}],thisVars:["this_i","this_v"],localVars:[]},body:{body:"{if(_inline_1_arg1_<this_v){this_v=_inline_1_arg1_;for(var _inline_1_k=0;_inline_1_k<_inline_1_arg0_.length;++_inline_1_k){this_i[_inline_1_k]=_inline_1_arg0_[_inline_1_k]}}}",args:[{name:"_inline_1_arg0_",lvalue:!1,rvalue:!0,count:2},{name:"_inline_1_arg1_",lvalue:!1,rvalue:!0,count:2}],thisVars:["this_i","this_v"],localVars:["_inline_1_k"]},post:{body:"{return this_i}",args:[],thisVars:["this_i"],localVars:[]}}),exports.argmax=compile({args:["index","array","shape"],pre:{body:"{this_v=-Infinity;this_i=_inline_0_arg2_.slice(0)}",args:[{name:"_inline_0_arg0_",lvalue:!1,rvalue:!1,count:0},{name:"_inline_0_arg1_",lvalue:!1,rvalue:!1,count:0},{name:"_inline_0_arg2_",lvalue:!1,rvalue:!0,count:1}],thisVars:["this_i","this_v"],localVars:[]},body:{body:"{if(_inline_1_arg1_>this_v){this_v=_inline_1_arg1_;for(var _inline_1_k=0;_inline_1_k<_inline_1_arg0_.length;++_inline_1_k){this_i[_inline_1_k]=_inline_1_arg0_[_inline_1_k]}}}",args:[{name:"_inline_1_arg0_",lvalue:!1,rvalue:!0,count:2},{name:"_inline_1_arg1_",lvalue:!1,rvalue:!0,count:2}],thisVars:["this_i","this_v"],localVars:["_inline_1_k"]},post:{body:"{return this_i}",args:[],thisVars:["this_i"],localVars:[]}}),exports.random=makeOp({args:["array"],pre:{args:[],body:"this_f=Math.random",thisVars:["this_f"]},body:{args:["a"],body:"a=this_f()",thisVars:["this_f"]},funcName:"random"}),exports.assign=makeOp({args:["array","array"],body:{args:["a","b"],body:"a=b"},funcName:"assign"}),exports.assigns=makeOp({args:["array","scalar"],body:{args:["a","b"],body:"a=b"},funcName:"assigns"});
  //# sourceMappingURL=ndarray-ops.js.map
  global.define = __define;
  return module.exports;
});

System.register("npm:ao-mesher@0.2.10/mesh", ["ndarray","cwise-compiler","greedy-mesher","typedarray-pool"], true, function(require, exports, __moduleName) {
  var global = System.global;
  var __define = global.define;
  global.define = undefined;
  var module = { exports: exports };
  var process = System.get("@@nodeProcess")["default"];
    var __filename = "jspm_packages/npm/ao-mesher@0.2.10/mesh.js";
    var __dirname = "jspm_packages/npm/ao-mesher@0.2.10";
  "format cjs";"use strict";function voxelTexture(t,e,n){return n?n.get(255&t,e):255&t}function vertexAO(t,e,n){return t&&e?1:3-(t+e+n)}function facetAO(t,e,n,o,i,u,c,r){var a=t&OPAQUE_BIT?1:0,s=e&OPAQUE_BIT?1:0,f=n&OPAQUE_BIT?1:0,l=o&OPAQUE_BIT?1:0,h=i&OPAQUE_BIT?1:0,d=u&OPAQUE_BIT?1:0,p=c&OPAQUE_BIT?1:0,v=r&OPAQUE_BIT?1:0;return(vertexAO(l,s,a)<<AO_SHIFT)+(vertexAO(s,h,f)<<AO_SHIFT+AO_BITS)+(vertexAO(h,p,v)<<AO_SHIFT+2*AO_BITS)+(vertexAO(p,l,d)<<AO_SHIFT+3*AO_BITS)}function generateSurfaceVoxel(t,e,n,o,i,u,c,r,a,s,f,l,h,d,p,v,m,E){var x=!(i&OPAQUE_BIT),B=!(d&OPAQUE_BIT);return d&&(!i||x&&!B)?d|FLIP_BIT|facetAO(t,e,n,o,u,c,r,a):i&&(!d||B&&!x)?i|facetAO(s,f,l,h,p,v,m,E):void 0}function MeshBuilder(){this.buffer=pool.mallocUint8(1024),this.ptr=0,this.z=0,this.u=0,this.v=0,this.d=0}function computeMesh(t,e){var n=t.shape.slice(0),o=n[0]-2|0,i=n[1]-2|0,u=n[2]-2|0,c=o*i*u,r=pool.mallocInt32(c),a=pool.mallocInt32(c),s=pool.mallocInt32(c),f=[o,i,u],l=ndarray(r,f),h=ndarray(a,f),d=ndarray(s,f);surfaceStencil(l,h,d,t),meshBuilder.ptr=0,meshBuilder.voxelSideTextureIDs=e;for(var p=[l,h,d],v=0;3>v;++v){var m=(v+1)%3,E=(v+2)%3,x=p[v].transpose(v,m,E),B=x.pick(0),b=0|f[v];meshBuilder.d=v,meshBuilder.u=E,meshBuilder.v=m;for(var q=0;b>q;++q)meshBuilder.z=q,meshSlice(B),B.offset+=x.stride[0]}if(pool.freeInt32(r),pool.freeInt32(a),pool.freeInt32(s),0===meshBuilder.ptr)return null;var y=meshBuilder.buffer,A=meshBuilder.ptr;return meshBuilder.buffer=pool.mallocUint8(1024),meshBuilder.ptr=0,y.subarray(0,A)}var ndarray=require("ndarray"),compileCWise=require("cwise-compiler"),compileMesher=require("greedy-mesher"),pool=require("typedarray-pool"),OPAQUE_BIT=32768,VOXEL_MASK=65535,AO_SHIFT=16,AO_BITS=2,AO_MASK=(1<<AO_BITS)-1,FLIP_BIT=1<<AO_SHIFT+4*AO_BITS,TEXTURE_SHIFT=4,TEXTURE_MASK=(1<<TEXTURE_SHIFT)-1,VERTEX_SIZE=8,surfaceStencil=function(){function t(t,e,n,o){return{name:t,lvalue:e,rvalue:n,count:o}}for(var e={args:[],thisVars:[],localVars:[],body:""},n=["scalar","array","array","array","array"],o=[t("_func",!1,!0,3),t("_o0",!0,!1,1),t("_o1",!0,!1,1),t("_o2",!0,!1,1)],i=[],u=0;3>u;++u){for(var c=(u+1)%3,r=(u+2)%3,a=[],s=0;2>s;++s)for(var f=0;2>=f;++f)for(var l=0;2>=l;++l){var h=[l,f,s];a.push(["_a",h[r],h[c],h[u]].join(""))}i.push(["_o",u,"=_func(",a.join(","),")"].join(""))}for(var d=i.join("\n"),l=-1;1>=l;++l)for(var f=-1;1>=f;++f)for(var s=-1;1>=s;++s)if(1!==l||1!==f||1!==s){(-1!==l||-1!==f||-1!==s)&&n.push({offset:[l+1,f+1,s+1],array:3});var p=["_a",l+1,f+1,s+1].join("");o.push(t(p,!1,!0,d.split(p).length-1))}return compileCWise({args:n,pre:e,body:{args:o,body:d,thisVars:[],localVars:[]},post:e,funcName:"calcAO"}).bind(void 0,generateSurfaceVoxel)}(),AO_TABLE=new Uint8Array([0,153,204,255]);MeshBuilder.prototype.append=function(t,e,n,o,i){var u=this.buffer,c=this.ptr>>>0,r=0|this.z,a=0|this.u,s=0|this.v,f=0|this.d;if(c+6*VERTEX_SIZE>u.length){var l=pool.mallocUint8(2*u.length);l.set(u),pool.freeUint8(u),u=l,this.buffer=u}var h=!!(i&FLIP_BIT),d=f+(h?3:0),p=AO_TABLE[i>>>AO_SHIFT&AO_MASK],v=AO_TABLE[i>>>AO_SHIFT+AO_BITS&AO_MASK],m=AO_TABLE[i>>>AO_SHIFT+2*AO_BITS&AO_MASK],E=AO_TABLE[i>>>AO_SHIFT+3*AO_BITS&AO_MASK],x=voxelTexture(i&VOXEL_MASK,d,this.voxelSideTextureIDs),B=128,b=128,q=128,y=h?127:129;0===f?B=y:1===f?b=y:2===f&&(q=y);var A=v+E>p+m;p+m===v+E&&(A=Math.max(p,m)<Math.max(v,E)),A?h?(u[c+a]=t,u[c+s]=e,u[c+f]=r,u[c+3]=p,u[c+4]=B,u[c+5]=b,u[c+6]=q,u[c+7]=x,c+=8,u[c+a]=n,u[c+s]=e,u[c+f]=r,u[c+3]=v,u[c+4]=B,u[c+5]=b,u[c+6]=q,u[c+7]=x,c+=8,u[c+a]=t,u[c+s]=o,u[c+f]=r,u[c+3]=E,u[c+4]=B,u[c+5]=b,u[c+6]=q,u[c+7]=x,c+=8,u[c+a]=n,u[c+s]=o,u[c+f]=r,u[c+3]=m,u[c+4]=B,u[c+5]=b,u[c+6]=q,u[c+7]=x,c+=8,u[c+a]=t,u[c+s]=o,u[c+f]=r,u[c+3]=E,u[c+4]=B,u[c+5]=b,u[c+6]=q,u[c+7]=x,c+=8,u[c+a]=n,u[c+s]=e,u[c+f]=r,u[c+3]=v,u[c+4]=B,u[c+5]=b,u[c+6]=q,u[c+7]=x,c+=8):(u[c+a]=t,u[c+s]=e,u[c+f]=r,u[c+3]=p,u[c+4]=B,u[c+5]=b,u[c+6]=q,u[c+7]=x,c+=8,u[c+a]=t,u[c+s]=o,u[c+f]=r,u[c+3]=E,u[c+4]=B,u[c+5]=b,u[c+6]=q,u[c+7]=x,c+=8,u[c+a]=n,u[c+s]=e,u[c+f]=r,u[c+3]=v,u[c+4]=B,u[c+5]=b,u[c+6]=q,u[c+7]=x,c+=8,u[c+a]=n,u[c+s]=o,u[c+f]=r,u[c+3]=m,u[c+4]=B,u[c+5]=b,u[c+6]=q,u[c+7]=x,c+=8,u[c+a]=n,u[c+s]=e,u[c+f]=r,u[c+3]=v,u[c+4]=B,u[c+5]=b,u[c+6]=q,u[c+7]=x,c+=8,u[c+a]=t,u[c+s]=o,u[c+f]=r,u[c+3]=E,u[c+4]=B,u[c+5]=b,u[c+6]=q,u[c+7]=x,c+=8):h?(u[c+a]=t,u[c+s]=o,u[c+f]=r,u[c+3]=E,u[c+4]=B,u[c+5]=b,u[c+6]=q,u[c+7]=x,c+=8,u[c+a]=t,u[c+s]=e,u[c+f]=r,u[c+3]=p,u[c+4]=B,u[c+5]=b,u[c+6]=q,u[c+7]=x,c+=8,u[c+a]=n,u[c+s]=o,u[c+f]=r,u[c+3]=m,u[c+4]=B,u[c+5]=b,u[c+6]=q,u[c+7]=x,c+=8,u[c+a]=n,u[c+s]=e,u[c+f]=r,u[c+3]=v,u[c+4]=B,u[c+5]=b,u[c+6]=q,u[c+7]=x,c+=8,u[c+a]=n,u[c+s]=o,u[c+f]=r,u[c+3]=m,u[c+4]=B,u[c+5]=b,u[c+6]=q,u[c+7]=x,c+=8,u[c+a]=t,u[c+s]=e,u[c+f]=r,u[c+3]=p,u[c+4]=B,u[c+5]=b,u[c+6]=q,u[c+7]=x,c+=8):(u[c+a]=t,u[c+s]=e,u[c+f]=r,u[c+3]=p,u[c+4]=B,u[c+5]=b,u[c+6]=q,u[c+7]=x,c+=8,u[c+a]=t,u[c+s]=o,u[c+f]=r,u[c+3]=E,u[c+4]=B,u[c+5]=b,u[c+6]=q,u[c+7]=x,c+=8,u[c+a]=n,u[c+s]=o,u[c+f]=r,u[c+3]=m,u[c+4]=B,u[c+5]=b,u[c+6]=q,u[c+7]=x,c+=8,u[c+a]=n,u[c+s]=o,u[c+f]=r,u[c+3]=m,u[c+4]=B,u[c+5]=b,u[c+6]=q,u[c+7]=x,c+=8,u[c+a]=n,u[c+s]=e,u[c+f]=r,u[c+3]=v,u[c+4]=B,u[c+5]=b,u[c+6]=q,u[c+7]=x,c+=8,u[c+a]=t,u[c+s]=e,u[c+f]=r,u[c+3]=p,u[c+4]=B,u[c+5]=b,u[c+6]=q,u[c+7]=x,c+=8),this.ptr=c};var meshBuilder=new MeshBuilder,meshSlice=compileMesher({order:[1,0],append:MeshBuilder.prototype.append.bind(meshBuilder)});module.exports=computeMesh;
  //# sourceMappingURL=mesh.js.map
  global.define = __define;
  return module.exports;
});

System.register("npm:glsl-parser@0.0.5", ["npm:glsl-parser@0.0.5/index"], true, function(require, exports, __moduleName) {
  var global = System.global;
  var __define = global.define;
  global.define = undefined;
  var module = { exports: exports };
  var process = System.get("@@nodeProcess")["default"];
    var __filename = "jspm_packages/npm/glsl-parser@0.0.5.js";
    var __dirname = "jspm_packages/npm";
  module.exports = require("npm:glsl-parser@0.0.5/index");
  
  global.define = __define;
  return module.exports;
});

System.register("npm:gl-now@0.0.4/index", ["game-shell","webglew"], true, function(require, exports, __moduleName) {
  var global = System.global;
  var __define = global.define;
  global.define = undefined;
  var module = { exports: exports };
  var process = System.get("@@nodeProcess")["default"];
    var __filename = "jspm_packages/npm/gl-now@0.0.4/index.js";
    var __dirname = "jspm_packages/npm/gl-now@0.0.4";
  "format cjs";"use strict";function createGLShell(t){t=t||{};var e=t.extensions||[],n=makeGameShell(t);return n.on("init",function(){var o=document.createElement("canvas"),i=o.getContext("webgl")||o.getContext("experimental-webgl");if(!i)return void n.emit("gl-error",new Error("Unable to initialize WebGL"));for(var u=webglew(i),c=0;c<e.length;++c)if(!(e[c]in u))return void n.emit("gl-error",new Error("Missing extension: "+e[c]));o.style.position="absolute",o.style.left="0px",o.style.top="0px",n.element.appendChild(o),o.width=n.width,o.height=n.height,n.canvas=o,n.gl=i,n.clearFlags=void 0===t.clearFlags?i.COLOR_BUFFER_BIT|i.DEPTH_BUFFER_BIT:t.clearFlags,n.clearColor=t.clearColor||[.2,.4,.8,1],n.clearDepth=t.clearDepth||1,n.clearStencil=t.clearStencil||0,n.on("resize",function(t,e){o.width=t,o.height=e}),n.on("render",function(t){i.bindFramebuffer(i.FRAMEBUFFER,null),i.viewport(0,0,n.width,n.height),n.clearFlags&i.STENCIL_BUFFER_BIT&&i.clearStencil(n.clearStencil),n.clearFlags&i.COLOR_BUFFER_BIT&&i.clearColor(n.clearColor[0],n.clearColor[1],n.clearColor[2],n.clearColor[3]),n.clearFlags&i.DEPTH_BUFFER_BIT&&i.clearDepth(n.clearDepth),n.clearFlags&&i.clear(i.COLOR_BUFFER_BIT|i.DEPTH_BUFFER_BIT|i.STENCIL_BUFFER_BIT),n.emit("gl-render",t)}),n.emit("gl-init")}),n}var makeGameShell=require("game-shell"),webglew=require("webglew");module.exports=createGLShell;
  //# sourceMappingURL=index.js.map
  global.define = __define;
  return module.exports;
});

System.register("npm:cwise@0.3.4", ["npm:cwise@0.3.4/cwise"], true, function(require, exports, __moduleName) {
  var global = System.global;
  var __define = global.define;
  global.define = undefined;
  var module = { exports: exports };
  var process = System.get("@@nodeProcess")["default"];
    var __filename = "jspm_packages/npm/cwise@0.3.4.js";
    var __dirname = "jspm_packages/npm";
  module.exports = require("npm:cwise@0.3.4/cwise");
  
  global.define = __define;
  return module.exports;
});

System.register("npm:gl-texture2d@0.1.12", ["npm:gl-texture2d@0.1.12/texture"], true, function(require, exports, __moduleName) {
  var global = System.global;
  var __define = global.define;
  global.define = undefined;
  var module = { exports: exports };
  var process = System.get("@@nodeProcess")["default"];
    var __filename = "jspm_packages/npm/gl-texture2d@0.1.12.js";
    var __dirname = "jspm_packages/npm";
  module.exports = require("npm:gl-texture2d@0.1.12/texture");
  
  global.define = __define;
  return module.exports;
});

System.register("github:jspm/nodelibs@0.0.2/stream/index", ["./stream","./readable","./writable","./duplex","./transform","./passthrough"], true, function(require, exports, __moduleName) {
  var global = System.global;
  var __define = global.define;
  global.define = undefined;
  var module = { exports: exports };
  var process = System.get("@@nodeProcess")["default"];
    var __filename = "jspm_packages/github/jspm/nodelibs@0.0.2/stream/index.js";
    var __dirname = "jspm_packages/github/jspm/nodelibs@0.0.2/stream";
  "format cjs";var Stream=require("./stream");module.exports=Stream,Stream.Readable=require("./readable"),Stream.Writable=require("./writable"),Stream.Duplex=require("./duplex"),Stream.Transform=require("./transform"),Stream.PassThrough=require("./passthrough");
  //# sourceMappingURL=index.js.map
  global.define = __define;
  return module.exports;
});

System.register("npm:ndarray-ops@1.1.1", ["npm:ndarray-ops@1.1.1/ndarray-ops"], true, function(require, exports, __moduleName) {
  var global = System.global;
  var __define = global.define;
  global.define = undefined;
  var module = { exports: exports };
  var process = System.get("@@nodeProcess")["default"];
    var __filename = "jspm_packages/npm/ndarray-ops@1.1.1.js";
    var __dirname = "jspm_packages/npm";
  module.exports = require("npm:ndarray-ops@1.1.1/ndarray-ops");
  
  global.define = __define;
  return module.exports;
});

System.register("npm:ao-mesher@0.2.10", ["npm:ao-mesher@0.2.10/mesh"], true, function(require, exports, __moduleName) {
  var global = System.global;
  var __define = global.define;
  global.define = undefined;
  var module = { exports: exports };
  var process = System.get("@@nodeProcess")["default"];
    var __filename = "jspm_packages/npm/ao-mesher@0.2.10.js";
    var __dirname = "jspm_packages/npm";
  module.exports = require("npm:ao-mesher@0.2.10/mesh");
  
  global.define = __define;
  return module.exports;
});

System.register("npm:gl-now@0.0.4", ["npm:gl-now@0.0.4/index"], true, function(require, exports, __moduleName) {
  var global = System.global;
  var __define = global.define;
  global.define = undefined;
  var module = { exports: exports };
  var process = System.get("@@nodeProcess")["default"];
    var __filename = "jspm_packages/npm/gl-now@0.0.4.js";
    var __dirname = "jspm_packages/npm";
  module.exports = require("npm:gl-now@0.0.4/index");
  
  global.define = __define;
  return module.exports;
});

System.register("npm:ndarray-fft@0.1.0/fft", ["ndarray-ops","cwise","ndarray","./lib/fft-matrix","typedarray-pool"], true, function(require, exports, __moduleName) {
  var global = System.global;
  var __define = global.define;
  global.define = undefined;
  var module = { exports: exports };
  var process = System.get("@@nodeProcess")["default"];
    var __filename = "jspm_packages/npm/ndarray-fft@0.1.0/fft.js";
    var __dirname = "jspm_packages/npm/ndarray-fft@0.1.0";
  "format cjs";"use strict";function ndfft(e,t,n){var r,o,i=t.shape,a=i.length,s=1,u=new Array(a),c=0;for(r=a-1;r>=0;--r)if(u[r]=s,s*=i[r],c=Math.max(c,fftm.scratchMemory(i[r])),t.shape[r]!==n.shape[r])throw new Error("Shape mismatch, real and imaginary arrays must have same size");var l,f=4*s+c;l="array"===t.dtype||"float64"===t.dtype||"custom"===t.dtype?pool.mallocDouble(f):pool.mallocFloat(f);var h,p,d,m,v=ndarray(l,i.slice(0),u,0),g=ndarray(l,i.slice(0),u.slice(0),s),b=ndarray(l,i.slice(0),u.slice(0),2*s),y=ndarray(l,i.slice(0),u.slice(0),3*s),x=4*s;for(ops.assign(v,t),ops.assign(g,n),r=a-1;r>=0&&(fftm(e,s/i[r],i[r],l,v.offset,g.offset,x),0!==r);--r){for(p=1,d=b.stride,m=y.stride,o=r-1;a>o;++o)m[o]=d[o]=p,p*=i[o];for(o=r-2;o>=0;--o)m[o]=d[o]=p,p*=i[o];ops.assign(b,v),ops.assign(y,g),h=v,v=b,b=h,h=g,g=y,y=h}ops.assign(t,v),ops.assign(n,g),pool.free(l)}var ops=require("ndarray-ops"),cwise=require("cwise"),ndarray=require("ndarray"),fftm=require("./lib/fft-matrix"),pool=require("typedarray-pool");module.exports=ndfft;
  //# sourceMappingURL=fft.js.map
  global.define = __define;
  return module.exports;
});

System.register("github:jspm/nodelibs@0.0.2/stream", ["./stream/index"], true, function(require, exports, __moduleName) {
  var global = System.global;
  var __define = global.define;
  global.define = undefined;
  var module = { exports: exports };
  var process = System.get("@@nodeProcess")["default"];
    var __filename = "jspm_packages/github/jspm/nodelibs@0.0.2/stream.js";
    var __dirname = "jspm_packages/github/jspm/nodelibs@0.0.2";
  "format cjs";module.exports=require("./stream/index");
  //# sourceMappingURL=stream.js.map
  global.define = __define;
  return module.exports;
});

System.register("npm:ndarray-fft@0.1.0", ["npm:ndarray-fft@0.1.0/fft"], true, function(require, exports, __moduleName) {
  var global = System.global;
  var __define = global.define;
  global.define = undefined;
  var module = { exports: exports };
  var process = System.get("@@nodeProcess")["default"];
    var __filename = "jspm_packages/npm/ndarray-fft@0.1.0.js";
    var __dirname = "jspm_packages/npm";
  module.exports = require("npm:ndarray-fft@0.1.0/fft");
  
  global.define = __define;
  return module.exports;
});

System.register("npm:through@2.3.4/index", ["github:jspm/nodelibs@0.0.2/stream"], true, function(require, exports, __moduleName) {
  var global = System.global;
  var __define = global.define;
  global.define = undefined;
  var module = { exports: exports };
  var process = System.get("@@nodeProcess")["default"];
    var __filename = "jspm_packages/npm/through@2.3.4/index.js";
    var __dirname = "jspm_packages/npm/through@2.3.4";
  "format cjs";function through(e,t,n){function r(){for(;s.length&&!c.paused;){var e=s.shift();if(null===e)return c.emit("end");c.emit("data",e)}}function o(){c.writable=!1,t.call(c),!c.readable&&c.autoDestroy&&c.destroy()}e=e||function(e){this.queue(e)},t=t||function(){this.queue(null)};var i=!1,a=!1,s=[],u=!1,c=new Stream;return c.readable=c.writable=!0,c.paused=!1,c.autoDestroy=!(n&&n.autoDestroy===!1),c.write=function(t){return e.call(this,t),!c.paused},c.queue=c.push=function(e){return u?c:(null==e&&(u=!0),s.push(e),r(),c)},c.on("end",function(){c.readable=!1,!c.writable&&c.autoDestroy&&process.nextTick(function(){c.destroy()})}),c.end=function(e){return i?void 0:(i=!0,arguments.length&&c.write(e),o(),c)},c.destroy=function(){return a?void 0:(a=!0,i=!0,s.length=0,c.writable=c.readable=!1,c.emit("close"),c)},c.pause=function(){return c.paused?void 0:(c.paused=!0,c)},c.resume=function(){return c.paused&&(c.paused=!1,c.emit("resume")),r(),c.paused||c.emit("drain"),c},c}var Stream=require("github:jspm/nodelibs@0.0.2/stream");exports=module.exports=through,through.through=through;
  //# sourceMappingURL=index.js.map
  global.define = __define;
  return module.exports;
});

System.register("npm:ndarray-downsample2x@0.1.1/downsample", ["ndarray-fft","ndarray-scratch","ndarray-ops","cwise"], true, function(require, exports, __moduleName) {
  var global = System.global;
  var __define = global.define;
  global.define = undefined;
  var module = { exports: exports };
  var process = System.get("@@nodeProcess")["default"];
    var __filename = "jspm_packages/npm/ndarray-downsample2x@0.1.1/downsample.js";
    var __dirname = "jspm_packages/npm/ndarray-downsample2x@0.1.1";
  "format cjs";"use strict";function downsample2x(e,t,n,o){"undefined"==typeof n&&(n=-1/0),"undefined"==typeof o&&(o=1/0);var r=t.shape,i=e.shape;if(1===e.size){var a=ops.sum(t)/t.size;return n>a&&(a=n),a>o&&(a=o),void e.set(0,0,a)}var u=r.length,c=pool.malloc(r),s=pool.malloc(r);ops.assign(c,t),ops.assigns(s,0),fft(1,c,s);for(var l=c.lo,f=c.hi,h=pool.malloc(i),d=pool.malloc(i),p=new Array(u),v=new Array(u),m=new Array(u),b=0;1<<u>b;++b){for(var y=0;u>y;++y)if(b&1<<y){if(p[y]=i[y]-(i[y]>>1),0===p[y])continue;v[y]=i[y]-p[y],m[y]=r[y]-p[y]}else p[y]=i[y]>>>1,v[y]=0,m[y]=0;ops.assign(f.apply(l.apply(h,v),p),f.apply(l.apply(c,m),p)),ops.assign(f.apply(l.apply(d,v),p),f.apply(l.apply(s,m),p))}fft(-1,h,d),clampScale(e,h,1/(1<<u),n,o),pool.free(c),pool.free(s),pool.free(h),pool.free(d)}var fft=require("ndarray-fft"),pool=require("ndarray-scratch"),ops=require("ndarray-ops"),cwise=require("cwise"),clampScale=cwise({args:["array","array","scalar","scalar","scalar"],body:function(e,t,n,o,r){var i=t*n;o>i&&(i=o),i>r&&(i=r),e=i}});module.exports=downsample2x;
  //# sourceMappingURL=downsample.js.map
  global.define = __define;
  return module.exports;
});

System.register("npm:through@2.3.4", ["npm:through@2.3.4/index"], true, function(require, exports, __moduleName) {
  var global = System.global;
  var __define = global.define;
  global.define = undefined;
  var module = { exports: exports };
  var process = System.get("@@nodeProcess")["default"];
    var __filename = "jspm_packages/npm/through@2.3.4.js";
    var __dirname = "jspm_packages/npm";
  module.exports = require("npm:through@2.3.4/index");
  
  global.define = __define;
  return module.exports;
});

System.register("npm:ndarray-downsample2x@0.1.1", ["npm:ndarray-downsample2x@0.1.1/downsample"], true, function(require, exports, __moduleName) {
  var global = System.global;
  var __define = global.define;
  global.define = undefined;
  var module = { exports: exports };
  var process = System.get("@@nodeProcess")["default"];
    var __filename = "jspm_packages/npm/ndarray-downsample2x@0.1.1.js";
    var __dirname = "jspm_packages/npm";
  module.exports = require("npm:ndarray-downsample2x@0.1.1/downsample");
  
  global.define = __define;
  return module.exports;
});

System.register("npm:glsl-tokenizer@0.0.8/index", ["through","./lib/literals","./lib/operators","./lib/builtins"], true, function(require, exports, __moduleName) {
  var global = System.global;
  var __define = global.define;
  global.define = undefined;
  var module = { exports: exports };
  var process = System.get("@@nodeProcess")["default"];
    var __filename = "jspm_packages/npm/glsl-tokenizer@0.0.8/index.js";
    var __dirname = "jspm_packages/npm/glsl-tokenizer@0.0.8";
  "format cjs";function tokenize(){function e(e){e.length&&b.queue({type:map[E],data:e,position:A,line:q})}function t(e){for(y=0,w+=e.toString(),m=w.length;p=w[y],m>y;)switch(E){case BLOCK_COMMENT:y=u();break;case LINE_COMMENT:y=a();break;case PREPROCESSOR:y=i();break;case OPERATOR:y=c();break;case INTEGER:y=f();break;case HEX:y=l();break;case FLOAT:y=h();break;case TOKEN:y=d();break;case WHITESPACE:y=r();break;case NORMAL:y=o()}g+=y,w=w.slice(y)}function n(){x.length&&e(x.join("")),E=EOF,e("(eof)"),b.queue(null)}function o(){return x=x.length?[]:x,"/"===v&&"*"===p?(A=g+y-1,E=BLOCK_COMMENT,v=p,y+1):"/"===v&&"/"===p?(A=g+y-1,E=LINE_COMMENT,v=p,y+1):"#"===p?(E=PREPROCESSOR,A=g+y,y):/\s/.test(p)?(E=WHITESPACE,A=g+y,y):(_=/\d/.test(p),B=/[^\w_]/.test(p),A=g+y,E=_?INTEGER:B?OPERATOR:TOKEN,y)}function r(){return"\n"===p&&++q,/[^\s]/g.test(p)?(e(x.join("")),E=NORMAL,y):(x.push(p),v=p,y+1)}function i(){return"\n"===p&&++q,"\n"===p&&"\\"!==v?(e(x.join("")),E=NORMAL,y):(x.push(p),v=p,y+1)}function a(){return i()}function u(){return"/"===p&&"*"===v?(x.push(p),e(x.join("")),E=NORMAL,y+1):("\n"===p&&++q,x.push(p),v=p,y+1)}function c(){if("."===v&&/\d/.test(p))return E=FLOAT,y;if("/"===v&&"*"===p)return E=BLOCK_COMMENT,y;if("/"===v&&"/"===p)return E=LINE_COMMENT,y;if("."===p&&x.length){for(;s(x););return E=FLOAT,y}if(";"===p){if(x.length)for(;s(x););return e(p),E=NORMAL,y+1}var t=2===x.length&&"="!==p;if(/[\w_\d\s]/.test(p)||t){for(;s(x););return E=NORMAL,y}return x.push(p),v=p,y+1}function s(t){for(var n,o=0;;){n=operators.indexOf(t.slice(0,t.length+o).join(""));{if(-1!==n)return e(operators[n]),A+=operators[n].length,x=x.slice(operators[n].length),x.length;o-=1}}}function l(){return/[^a-fA-F0-9]/.test(p)?(e(x.join("")),E=NORMAL,y):(x.push(p),v=p,y+1)}function f(){return"."===p?(x.push(p),E=FLOAT,v=p,y+1):/[eE]/.test(p)?(x.push(p),E=FLOAT,v=p,y+1):"x"===p&&1===x.length&&"0"===x[0]?(E=HEX,x.push(p),v=p,y+1):/[^\d]/.test(p)?(e(x.join("")),E=NORMAL,y):(x.push(p),v=p,y+1)}function h(){return"f"===p&&(x.push(p),v=p,y+=1),/[eE]/.test(p)?(x.push(p),v=p,y+1):/[^\d]/.test(p)?(e(x.join("")),E=NORMAL,y):(x.push(p),v=p,y+1)}function d(){if(/[^\d\w_]/.test(p)){var t=x.join("");return E=literals.indexOf(t)>-1?KEYWORD:builtins.indexOf(t)>-1?BUILTIN:IDENT,e(x.join("")),E=NORMAL,y}return x.push(p),v=p,y+1}var p,v,m,b=through(t,n),y=0,g=0,E=NORMAL,x=[],q=1,A=0,_=!1,B=!1,w="";return b}module.exports=tokenize;var through=require("through"),literals=require("./lib/literals"),operators=require("./lib/operators"),builtins=require("./lib/builtins"),NORMAL=999,TOKEN=9999,BLOCK_COMMENT=0,LINE_COMMENT=1,PREPROCESSOR=2,OPERATOR=3,INTEGER=4,FLOAT=5,IDENT=6,BUILTIN=7,KEYWORD=8,WHITESPACE=9,EOF=10,HEX=11,map=["block-comment","line-comment","preprocessor","operator","integer","float","ident","builtin","keyword","whitespace","eof","integer"];
  //# sourceMappingURL=index.js.map
  global.define = __define;
  return module.exports;
});

System.register("npm:tile-mip-map@0.2.1/mipmap", ["ndarray","ndarray-ops","ndarray-downsample2x"], true, function(require, exports, __moduleName) {
  var global = System.global;
  var __define = global.define;
  global.define = undefined;
  var module = { exports: exports };
  var process = System.get("@@nodeProcess")["default"];
    var __filename = "jspm_packages/npm/tile-mip-map@0.2.1/mipmap.js";
    var __dirname = "jspm_packages/npm/tile-mip-map@0.2.1";
  "format cjs";"use strict";function makeTileMipMap(t,e){e=e||1;for(var n=[],o=t.shape,i=o[0],u=o[1],r=o[2],c=o[3],a=o[4],s=t.data.constructor,f=r*e,l=c*e;f>0&&l>0;){var h=i*u*f*l*a,d=[i,u,f,l,a],p=[a*u*f*l,a*l,a*u*l,a,1],v=ndarray(new s(h),d,p,0);if(0===n.length)for(var m=0;i>m;++m)for(var b=0;u>b;++b)for(var E=0;a>E;++E)for(var x=v.pick(m,b,void 0,void 0,E),B=t.pick(m,b,void 0,void 0,E),q=0;e>q;++q)for(var y=0;e>y;++y)ops.assign(x.lo(r*q,c*y).hi(r,c),B);else for(var A=n[n.length-1],m=0;i>m;++m)for(var b=0;u>b;++b)for(var E=0;a>E;++E){var x=v.pick(m,b,void 0,void 0,E),B=A.pick(m,b,void 0,void 0,E);downsample(x,B,0,255)}n.push(v),f>>>=1,l>>>=1}return n}var ndarray=require("ndarray"),ops=require("ndarray-ops"),downsample=require("ndarray-downsample2x");module.exports=makeTileMipMap;
  //# sourceMappingURL=mipmap.js.map
  global.define = __define;
  return module.exports;
});

System.register("npm:glsl-tokenizer@0.0.8", ["npm:glsl-tokenizer@0.0.8/index"], true, function(require, exports, __moduleName) {
  var global = System.global;
  var __define = global.define;
  global.define = undefined;
  var module = { exports: exports };
  var process = System.get("@@nodeProcess")["default"];
    var __filename = "jspm_packages/npm/glsl-tokenizer@0.0.8.js";
    var __dirname = "jspm_packages/npm";
  module.exports = require("npm:glsl-tokenizer@0.0.8/index");
  
  global.define = __define;
  return module.exports;
});

System.register("npm:tile-mip-map@0.2.1", ["npm:tile-mip-map@0.2.1/mipmap"], true, function(require, exports, __moduleName) {
  var global = System.global;
  var __define = global.define;
  global.define = undefined;
  var module = { exports: exports };
  var process = System.get("@@nodeProcess")["default"];
    var __filename = "jspm_packages/npm/tile-mip-map@0.2.1.js";
    var __dirname = "jspm_packages/npm";
  module.exports = require("npm:tile-mip-map@0.2.1/mipmap");
  
  global.define = __define;
  return module.exports;
});

System.register("npm:glsl-exports@0.0.0/index", ["glsl-tokenizer","glsl-parser","through"], true, function(require, exports, __moduleName) {
  var global = System.global;
  var __define = global.define;
  global.define = undefined;
  var module = { exports: exports };
  var process = System.get("@@nodeProcess")["default"];
    var __filename = "jspm_packages/npm/glsl-exports@0.0.0/index.js";
    var __dirname = "jspm_packages/npm/glsl-exports@0.0.0";
  "format cjs";"use strict";function parseDeclaration(t){for(var e,n,o=[],n=0;n<t.children.length;++n){var i=t.children[n];if("placeholder"!==i.type)if("keyword"===i.type){if("uniform"===i.token.data||"attribute"===i.token.data)continue;e=i.token.data}else if("decllist"===i.type)for(var u=0;u<i.children.length;++u){var r=i.children[u];"ident"===r.type&&o.push(r.token.data)}}return{type:e,vars:o}}function glslGlobals(t){var e={},n={},o=through();return o.pipe(glslTokenizer()).pipe(glslParser()).on("data",function(t){if("decl"===t.type&&"keyword"===t.token.type)if("uniform"===t.token.data)for(var o=parseDeclaration(t),i=0;i<o.vars.length;++i)e[o.vars[i]]=o.type;else if("attribute"===t.token.data)for(var o=parseDeclaration(t),i=0;i<o.vars.length;++i)n[o.vars[i]]=o.type}),o.write(t),{uniforms:e,attributes:n}}var glslTokenizer=require("glsl-tokenizer"),glslParser=require("glsl-parser"),through=require("through");module.exports=glslGlobals;
  //# sourceMappingURL=index.js.map
  global.define = __define;
  return module.exports;
});

System.register("npm:gl-tile-map@0.3.0/tilemap", ["ndarray","tile-mip-map","gl-texture2d"], true, function(require, exports, __moduleName) {
  var global = System.global;
  var __define = global.define;
  global.define = undefined;
  var module = { exports: exports };
  var process = System.get("@@nodeProcess")["default"];
    var __filename = "jspm_packages/npm/gl-tile-map@0.3.0/tilemap.js";
    var __dirname = "jspm_packages/npm/gl-tile-map@0.3.0";
  "format cjs";"use strict";function reshapeTileMap(e){var r=e.shape;return ndarray(e.data,[r[0]*r[2],r[1]*r[3],r[4]])}function createTileMap(e,r,t){var a=tileMipMap(r,t),i=createTexture(e,reshapeTileMap(a[0]));i.generateMipmap();for(var s=1;s<a.length;++s)i.setPixels(reshapeTileMap(a[s]),0,0,s);return i.magFilter=e.LINEAR,i.minFilter=e.LINEAR_MIPMAP_LINEAR,i.mipSamples=4,i}var ndarray=require("ndarray"),tileMipMap=require("tile-mip-map"),createTexture=require("gl-texture2d");module.exports=createTileMap;
  //# sourceMappingURL=tilemap.js.map
  global.define = __define;
  return module.exports;
});

System.register("npm:glsl-exports@0.0.0", ["npm:glsl-exports@0.0.0/index"], true, function(require, exports, __moduleName) {
  var global = System.global;
  var __define = global.define;
  global.define = undefined;
  var module = { exports: exports };
  var process = System.get("@@nodeProcess")["default"];
    var __filename = "jspm_packages/npm/glsl-exports@0.0.0.js";
    var __dirname = "jspm_packages/npm";
  module.exports = require("npm:glsl-exports@0.0.0/index");
  
  global.define = __define;
  return module.exports;
});

System.register("npm:gl-tile-map@0.3.0", ["npm:gl-tile-map@0.3.0/tilemap"], true, function(require, exports, __moduleName) {
  var global = System.global;
  var __define = global.define;
  global.define = undefined;
  var module = { exports: exports };
  var process = System.get("@@nodeProcess")["default"];
    var __filename = "jspm_packages/npm/gl-tile-map@0.3.0.js";
    var __dirname = "jspm_packages/npm";
  module.exports = require("npm:gl-tile-map@0.3.0/tilemap");
  
  global.define = __define;
  return module.exports;
});

System.register("npm:gl-shader@0.0.6/index", ["glsl-exports","uniq"], true, function(require, exports, __moduleName) {
  var global = System.global;
  var __define = global.define;
  global.define = undefined;
  var module = { exports: exports };
  var process = System.get("@@nodeProcess")["default"];
    var __filename = "jspm_packages/npm/gl-shader@0.0.6/index.js";
    var __dirname = "jspm_packages/npm/gl-shader@0.0.6";
  "format cjs";"use strict";function Shader(t,e,n,o){this.gl=t,this.program=e,this.uniforms=n,this.attributes=o}function kvPairs(t){return Object.keys(t).map(function(e){return[e,t[e]]})}function makeVectorUniform(t,e,n,o,u,i,c){i>1&&(u+="v");var r=new Function("gl","prog","v","gl.uniform"+i+u+"(gl.getUniformLocation(prog,'"+c+"'), v)"),a=new Function("gl","prog","return gl.getUniform(prog, gl.getUniformLocation(prog,'"+c+"'))");Object.defineProperty(o,c,{set:r.bind(void 0,t,e),get:a.bind(void 0,t,e),enumerable:!0})}function makeMatrixUniform(t,e,n,o,u,i){var c=new Function("gl","prog","v","gl.uniformMatrix"+u+"fv(gl.getUniformLocation(prog,'"+i+"'), false, v)"),r=new Function("gl","prog","return gl.getUniform(prog, gl.getUniformLocation(prog,'"+i+"'))");Object.defineProperty(o,i,{set:c.bind(void 0,t,e),get:r.bind(void 0,t,e),enumerable:!0})}function makeVectorAttrib(t,e,n,o,u,i){var c={};c.pointer=function(e,o,i,c){t.vertexAttribPointer(n,u,e||t.FLOAT,o?t.TRUE:t.FALSE,i||0,c||0)},c.enable=function(){t.enableVertexAttribArray(n)},c.disable=function(){t.disableVertexAttribArray(n)},Object.defineProperty(c,"location",{get:function(){return n},set:function(o){return o!==n&&(n=o,t.bindAttribLocation(e,o,i),t.linkProgram(e)),o}});for(var r=["gl","v"],a=[],s=0;u>s;++s)r.push("x"+s),a.push("x"+s);r.push(["if(x0.length === undefined) {","return gl.vertexAttrib"+u+"f(v,"+a.join(",")+")","} else {","return gl.vertexAttrib"+u+"fv(v,x0)","}"].join("\n"));var f=Function.apply(void 0,r);c.set=function(e,o,u,i){return f(t,n,e,o,u,i)},Object.defineProperty(o,i,{set:function(e){return c.isArray=!1,f(t,n,e),e},get:function(){return c},enumerable:!0})}function makeShader(t,e,n){var o=t.createShader(t.VERTEX_SHADER);if(t.shaderSource(o,e),t.compileShader(o),!t.getShaderParameter(o,t.COMPILE_STATUS))throw new Error("Error compiling vertex shader: "+t.getShaderInfoLog(o));var u=t.createShader(t.FRAGMENT_SHADER);if(t.shaderSource(u,n),t.compileShader(u),!t.getShaderParameter(u,t.COMPILE_STATUS))throw new Error("Error compiling fragment shader: "+t.getShaderInfoLog(u));var i=t.createProgram();if(t.attachShader(i,u),t.attachShader(i,o),t.linkProgram(i),!t.getProgramParameter(i,t.LINK_STATUS))throw new Error("Error linking shader program: "+t.getProgramInfoLog(i));for(var c=glslExports(n),r=glslExports(e),a=uniq(kvPairs(c.uniforms).concat(kvPairs(r.uniforms)),function(t,e){return t[0]<e[0]?-1:t[0]===e[0]?0:1}),s={},f=0;f<a.length;++f){var l=a[f],h=l[0],d=l[1],p=t.getUniformLocation(i,h);if(p)switch(d){case"bool":case"int":case"sampler2D":case"samplerCube":makeVectorUniform(t,i,p,s,"i",1,h);break;case"float":makeVectorUniform(t,i,p,s,"f",1,h);break;default:if(d.indexOf("vec")>=0){var v=d.charCodeAt(d.length-1)-48;if(2>v||v>4)throw new Error("Invalid data type");switch(d.charAt(0)){case"b":case"i":makeVectorUniform(t,i,p,s,"i",v,h);break;case"v":makeVectorUniform(t,i,p,s,"f",v,h);break;default:throw new Error("Unrecognized data type")}}else{if("m"!==d.charAt(0))throw new Error("Invalid data type");var v=d.charCodeAt(d.length-1)-48;if(2>v||v>4)throw new Error("Invalid data type");makeMatrixUniform(t,i,p,s,v,h)}}else Object.defineProperty(s,h,{get:function(){},set:function(){}})}for(var m=kvPairs(r.attributes),E={},f=0;f<m.length;++f){var l=m[f],h=l[0],d=l[1],p=t.getAttribLocation(i,h);switch(d){case"bool":case"int":case"float":makeVectorAttrib(t,i,p,E,1,h);break;default:if(!(d.indexOf("vec")>=0))throw new Error("Invalid data type");var v=d.charCodeAt(d.length-1)-48;if(2>v||v>4)throw new Error("Invalid data type");makeVectorAttrib(t,i,p,E,v,h)}}return new Shader(t,i,s,E)}var glslExports=require("glsl-exports"),uniq=require("uniq");Shader.prototype.bind=function(){this.gl.useProgram(this.program)},module.exports=makeShader;
  //# sourceMappingURL=index.js.map
  global.define = __define;
  return module.exports;
});

System.register("npm:gl-shader@0.0.6", ["npm:gl-shader@0.0.6/index"], true, function(require, exports, __moduleName) {
  var global = System.global;
  var __define = global.define;
  global.define = undefined;
  var module = { exports: exports };
  var process = System.get("@@nodeProcess")["default"];
    var __filename = "jspm_packages/npm/gl-shader@0.0.6.js";
    var __dirname = "jspm_packages/npm";
  module.exports = require("npm:gl-shader@0.0.6/index");
  
  global.define = __define;
  return module.exports;
});

System.register("npm:ao-shader@0.2.3/aoshader", ["github:jspm/nodelibs@0.0.2/fs","gl-shader"], true, function(require, exports, __moduleName) {
  var global = System.global;
  var __define = global.define;
  global.define = undefined;
  var module = { exports: exports };
  var process = System.get("@@nodeProcess")["default"];
    var __filename = "jspm_packages/npm/ao-shader@0.2.3/aoshader.js";
    var __dirname = "jspm_packages/npm/ao-shader@0.2.3";
  "format cjs";var fs=require("github:jspm/nodelibs@0.0.2/fs"),createShader=require("gl-shader");module.exports=function(t){return createShader(t,fs.readFileSync(__dirname+"/lib/ao.vsh"),fs.readFileSync(__dirname+"/lib/ao.fsh"))};
  //# sourceMappingURL=aoshader.js.map
  global.define = __define;
  return module.exports;
});

System.register("npm:ao-shader@0.2.3", ["npm:ao-shader@0.2.3/aoshader"], true, function(require, exports, __moduleName) {
  var global = System.global;
  var __define = global.define;
  global.define = undefined;
  var module = { exports: exports };
  var process = System.get("@@nodeProcess")["default"];
    var __filename = "jspm_packages/npm/ao-shader@0.2.3.js";
    var __dirname = "jspm_packages/npm";
  module.exports = require("npm:ao-shader@0.2.3/aoshader");
  
  global.define = __define;
  return module.exports;
});

System.register("npm:voxel-demo@0.0.1/shader", ["gl-now","gl-tile-map","gl-buffer","gl-vao","gl-matrix","ndarray","ndarray-fill","ndarray-ops","ao-mesher","ao-shader"], true, function(require, exports, __moduleName) {
  var global = System.global;
  var __define = global.define;
  global.define = undefined;
  var module = { exports: exports };
  var process = System.get("@@nodeProcess")["default"];
    var __filename = "jspm_packages/npm/voxel-demo@0.0.1/shader.js";
    var __dirname = "jspm_packages/npm/voxel-demo@0.0.1";
  "format cjs";"use strict";var shell=require("gl-now")(),createTileMap=require("gl-tile-map"),createBuffer=require("gl-buffer"),createVAO=require("gl-vao"),glm=require("gl-matrix"),ndarray=require("ndarray"),fill=require("ndarray-fill"),ops=require("ndarray-ops"),createAOMesh=require("ao-mesher"),createAOShader=require("ao-shader"),mat4=glm.mat4,shader,texture,vao,vertexCount;shell.on("gl-init",function(){var e=shell.gl;shader=createAOShader(e);var r=ndarray(new Uint16Array(32768),[32,32,32]);r.set(16,16,16,32768),fill(r,function(e,r,a){var t=Math.abs(e-16),i=Math.abs(r-16),n=Math.abs(a-16);return 30>t*t+i*i+n*n?32768:0});var a=createAOMesh(r);vertexCount=Math.floor(a.length/8);var t=createBuffer(e,a);vao=createVAO(e,void 0,[{buffer:t,type:e.UNSIGNED_BYTE,size:4,offset:0,stride:8,normalized:!1},{buffer:t,type:e.UNSIGNED_BYTE,size:4,offset:4,stride:8,normalized:!1}]);var i=ndarray(new Uint8Array(262144),[16,16,16,16,4]);fill(i,function(e,r,a,t,i){return 3===i?255:e*i+r*r*i+((a>>2)+(t>>2))&1?255:0}),texture=createTileMap(e,i,!0)}),shell.on("gl-render",function(e){var r=shell.gl;r.enable(r.CULL_FACE),r.enable(r.DEPTH_TEST),shader.bind(),shader.attributes.attrib0.location=0,shader.attributes.attrib1.location=1;var a=new Float32Array(16);shader.uniforms.projection=mat4.perspective(a,Math.PI/4,shell.width/shell.height,1,1e3);var e=1e-4*Date.now();shader.uniforms.view=mat4.lookAt(a,[30*Math.cos(e)+16,20,30*Math.sin(e)+16],[16,16,16],[0,1,0]),shader.uniforms.tileSize=16,texture&&(shader.uniforms.tileMap=texture.bind()),shader.uniforms.model=mat4.identity(a),vao.bind(),r.drawArrays(r.TRIANGLES,0,vertexCount),vao.unbind()});
  //# sourceMappingURL=shader.js.map
  global.define = __define;
  return module.exports;
});

System.register("npm:voxel-demo@0.0.1", ["npm:voxel-demo@0.0.1/shader"], true, function(require, exports, __moduleName) {
  var global = System.global;
  var __define = global.define;
  global.define = undefined;
  var module = { exports: exports };
  var process = System.get("@@nodeProcess")["default"];
    var __filename = "jspm_packages/npm/voxel-demo@0.0.1.js";
    var __dirname = "jspm_packages/npm";
  module.exports = require("npm:voxel-demo@0.0.1/shader");
  
  global.define = __define;
  return module.exports;
});
