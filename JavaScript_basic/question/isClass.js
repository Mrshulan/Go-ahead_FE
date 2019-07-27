

// ES6
class A{}


// ES5
"use strict";

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var A = function A() {
    _classCallCheck(this, A);
};



/* 
  注意命名 (大小字母)
  利用toString 处理原生的class
  babel编译之后一般
  处理function a ( ) { return class {} && class {} }
  处理export default class {}
*/
function isClass(fn) {
  return typeof fn === 'function' && /^(?:class\s+|function\s+(?:_class|_default|[A-Z]+))/.test(fn);
}

/* 
  利用class 没有arguments 的特性 区别
*/
function isNativeClass (thing) {
  return typeof thing === 'function' && thing.hasOwnProperty('prototype') && !thing.hasOwnProperty('arguments')
}