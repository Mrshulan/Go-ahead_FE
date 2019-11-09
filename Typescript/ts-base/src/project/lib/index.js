"use strict";
exports.__esModule = true;
var jquery_1 = require("jquery");
jquery_1["default"]('.app').css('color', 'red');
globalLib({ x: 1 });
globalLib.doSomething();
var module_lib_1 = require("./module-lib");
module_lib_1["default"]({ y: 2 });
module_lib_1["default"].doSomething();
var umd_lib_1 = require("./umd-lib");
umd_lib_1["default"].doSomething();
// 模块插件
var moment_1 = require("moment");
moment_1["default"].myFunction();
globalLib.doAnyting = function () { };
