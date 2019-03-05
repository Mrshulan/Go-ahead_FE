/* interface Generator extends Iterator {
  next(value ? value:any): InteratorResult;
  [Symbol.iterator]: iterator;
  throw(exception: any)
}
仅从它的接口来看，它既是一个迭代器，又是一个可迭代对象。
生成器因此又是迭代器的“加强版”，为什么？
因为生成器还提供了一个关键字yield，
yield它返回的序列值会自动包装在一个IteratorResult（迭代器结果）对象中 */

function *gen() {
  yield 'a'
  yield 'b'
  return 'c'
}
/* 
哎，接口定义的生成器不是一个对象吗，怎么是一个函数啊？
实际上，说生成器是对象或是函数都不确切。
但我们知道，调用生成器函数会返回一个迭代器（接口描述的就是这个对象）这个迭代器可以控制返回它的生成器函数封装的逻辑和数据。
从这个意义上说，生成器由生成器函数及其返回的迭代器两部分组成。
再换句话说，生成器是一个笼统的概念，是一个统称。
*/


// 生成器（返回的对象）“既是一个迭代器，又是一个可迭代对象”
const chars = gen()

console.dir(chars)
console.log(typeof chars[Symbol.iterator] === "function") // 是可迭代对象
console.log(typeof chars.next === "function") // 是迭代器
console.log(chars[Symbol.iterator]() === chars) // 迭代器就是自己本身

console.log([...chars]) // ["a", "b"]
// yield 是暂停恢复
// return返回的虽然也是迭代器结果对象，但done属性的值却是true，true表示序列结束，
// 所以'c'不会包含在迭代结果中。
//（如果没有return语句，代码执行到生成器函数末尾，会隐式返回{ value: undefined, done: true}

function *gen(x) {
  const y = x * (yield)
  return y
}
// const it = gen(6)
// it.next() // {value: undefined, done: false}
// it.next(7) // {value: 42, done: true}


/* 
1.yield表达式返回序列中下一个值{value} 但是表达式本身返回的undefined 但是可以next传参
2.return语句返回生成器函数的值（{ done: true }）
3.throw语句完全停止生成器执行（后面会详细解释）
4.到达生成器函数最后，隐式返回{ value: undefined, done: true}

看原型链
这里的return和throw既可以在生成器函数内部调用，
也可以在生成器函数外部通过生成器的迭代器调用，
比如：it.return(0)、it.throw(new Error('Oops'))

生成器的独到之处就在于它的yield关键字。这个yield有两大神奇之处：
一、它是生成器函数暂停和恢复执行的分界点；
二、它是向外和向内传值（包括错误/异常）的媒介。
*/

// 同步处理错误
// 1.“由内而外” 错误传递
// 由于生成器函数内部没有做异常处理，
// 因此错误被抛给了生成器的迭代代码，也就是it.next(42)这行代码。
/* function *main() {
    const x = yield "Hello World";
    yield x.toLowerCase(); // 导致异常！
  }
  
  const it = main();
  it.next().value; // Hello World
  try {
    it.next( 42 );
  } catch (err) {
    console.error(err); // TypeError 42是number
  } */

// 2.“由外而内”（准确地说，应该是“由外而内再而外”）的错误传递
/* 
迭代代码通过it.throw('Oops')抛出异常。
这个异常是抛到生成器函数内的（通过迭代器it）。
抛进去之后，yield表达式发现自己收到一个“烫手的山芋”，看看周围也没有异常处理逻辑“护驾”，
于是眼疾手快，迅速又把这个异常给抛了出来。迭代器it显然是有准备的，
它本意也是想先看看生成器函数内部有没有逻辑负责异常处理
（看注释“ // *main()会处理吗？”），“没有！”，它自己的try/catch早已等候多时了。
*/
/* function *main() {
  var x = yield "Hello World";
  console.log('never gets here'); 
}

const it = main();
it.next().value; // Hello World
try {
  it.throw('Oops'); // `*main()`会处理吗？ 
} catch (err) {   // 没有！
  console.error(err); // Oops
} */