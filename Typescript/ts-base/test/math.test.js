var math = require('../src/math');
test('add: 1 + 2 = 3', function () {
    expect(math.add(1, 2)).toBe(3);
});
test('sub: 1 - 2 = -1', function () {
    expect(math.sub(1, 2)).toBe(-1);
});
