// 递归的条件 -> 边界条件 递归前进段 递归返回段 边界不满足 前进 边界满足 返回
// 特点：子问题与原始问题同样的事且更为简单
// 不能不限制的调用本身 须有个出口， 化简为非递归的状况处理

/* // 伪调用优化 涉及执行上下文 执行栈
// 尾调用
function f(x){
  return g(x);
}
// 非尾调用
function f(x){
  return g(x) + 1;
}
// 尾递归
ECStack.push(<f> functionContext)
ECStack.pop()
ECStack.push(<g> functionContext)
EcStack.pop()
// 非尾递归
ECStack.push(<f> functionContext)
ECStack.push(<g> functionContext)
ECStack.pop()
EcStack.pop()
 */



// 尾递归优化方法 将内部变量改写成函数的参数，记录起来
function factorial(n, res) {
  if(n === 1) return res
  return factorial(n - 1, n * res)
}
console.log(factorial(4, 1))




