var merge = {
    x: 1,
    y: 2,
    foo: function (bar) {
        return bar;
    }
};
var C = /** @class */ (function () {
    function C() {
    }
    return C;
}());
(function (C) {
    C.state = 1;
})(C || (C = {}));
console.log(C.state);
function Lib() { }
(function (Lib) {
    Lib.version = '1.0';
})(Lib || (Lib = {}));
console.log(Lib.version);
var Color;
(function (Color) {
    Color[Color["Red"] = 0] = "Red";
    Color[Color["Yellow"] = 1] = "Yellow";
    Color[Color["Blue"] = 2] = "Blue";
})(Color || (Color = {}));
(function (Color) {
    function mix() { }
    Color.mix = mix;
})(Color || (Color = {}));
console.log(Color);
