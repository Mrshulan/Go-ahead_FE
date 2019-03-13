
// 原型链继承
function Parent () {
  this.names = ['shulan', 'shuita']
}
Parent.prototype.getName = function () {
  console.log(this.names)
}
// 中继
function Child () {}
Child.prototype = new Parent()

var child1 = new Child()
child1.names.push('keji')
console.log(child1.getName())
var child2 = new Child()
console.log(child2.getName())
// 1.引用类型的属性被所有实例共享
// 2.创建Child的实例，不能向Parent传参 */



// 经典继承 借助构造函数
function Parent(name) {
  this.name = name
}
function Child(name) {
  Parent.call(this, name)
}
var Child1 = new Child('shulan')
console.log(child1.name)
var child2 = new Child('shuita')
console.log(child2.name)
// 解决原型链继承的缺点(call > new) 新增 方法都在构造函数中定义，每次创建实例都会创建一遍方法 */

// 组合继承 原型链和经典继承的合并
function Parent(name) {
  this.name = name
  this.hobbies = ['chifan', 'shuijiao', 'dadoudou']
}
Parent.prototype.getName = function () {
  console.log(this.name)
}
function Child (name, age) {
  Parent.call(this, name)
  this.age = age
}
Child.prototype = new Parent()

var child1 = new Child("shulan", 18);
child1.hobbies.push("coding");
console.log(child1.name, child1.age, child1.hobbies);

var child2 = new Child("shuita", 16);
child2.hobbies.push("play");
console.log(child2.name, child2.age, child2.hobbies);
// 融合原型链继承和构造函数的优点，是 JavaScript 中最常用的继承模式



// 原型式继承
function createObj(o) {
  function F(){}
  F.prototype = o
  return new F()
}
var person = {
  name: 'shulan',
  friends: ['shuita', 'keji']
}
var person1 = createObj(person)
var person2 = createObj(person)
person1.name = 'person1'
person1.friends.push("mcgee");
console.log(person2.friends)
// 引用类型的属性值始终都会共享相应的值


// 寄生式继承
function  createObj(o) {
  var person = Object.create(o)
  person.sayname = function () {
    console.log('hello')
  }
  return person
}
// 跟借用构造函数模式一样，每次创建对象都会创建一遍方法


// 寄生组合式
function Parent(name) {
  this.name = name
  this.habbies = ['cifan', 'shuijiao', 'dadoudou']
}
Parent.prototype.getName = function () {
  console.log(this.name)
}

function Child(name, age) {
  Parent.call(this, name)
  this.age = age
}

// var F = function () {}
// F.prototype = Parent.prototype
// Child.prototype = new F()
// Child.prototype.constructor = Child
// var child1 = new Child("shulan", 20)
// console.log(child1)

// 封装
// 原型式
function object(o) {
  function F() {}
  F.prototype = o
  return new F()
}
// 寄生式
function inherits (child, parent) {
  var inner = object(parent.prototype)
  inner.constructor = child
  child.prototype = inner
}

inherits(Child, Parent)
console.dir(new Child ())
// 它只调用了一次 Parent 构造函数，并且因此避免了在 Parent.prototype上面创建不必要的、多余的属性。
// 与此同时，原型链还能保持不变；因此，还能够正常使用 instanceof 和 isPrototypeOf



// ES6 class
class Parent {
  constructor (name) {
    this.name = name
  }
  dosomething() {
    console.log("爸爸balabala干了些啥" + this.name)
  }
  getName () {
      console.log("parent name: " + this.name);
  }
}
class Child extends Parent {
  constructor(name, parentName) {
    // super作为对象时，在普通方法中，指向父类的原型 所以在父类实例上面的方法属性无法通过super调用
    super(parentName); // super()在这里相当于Parent.prototype.constructor.call(this, parentName) 得到一些return什么什么的,
    this.name = name;
  }
  getName() {
    console.log("child name: " + this.name);
  }
}
const child = new Child("son",);
child.getName();
child.dosomething();
console.dir(child)

const parent = new Parent("childrenName","parentName")
parent.getName();
console.dir(parent)

// ES5的继承，实质是先创造子类的实例对象this，然后再将父类的方法添加到this上面（Parent.apply(this)）。
// ES6的继承机制完全不同，实质是先将父类实例对象的属性和方法，加到this上面（所以必须先调用super方法），然后再用子类的构造函数修改this。 */

