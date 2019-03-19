// https://juejin.im/post/5b3b93115188251afa62ad46
// 最基本的拼接字符串 (效率低一些)
// 数据和结构强耦合
const arr = [
  {
    name: 'shulan',
    url: 'http://mrshulan.com'
  },
  {
    name: 'shuita',
    url: 'http://baidu.com'
  },
  {
    name: 'keji',
    url: 'http://qq.com'
  }
]


let html = ''
html = '<ul>'

for(var i = 0;i < arr.length;i++) {
  html += `<li><a href="${arr[i].url}">${arr[i].name}</a></li>`
}

html += '</ul>'


/* 在模板引擎中，选用<% xxx %>标识JavaScript语句，主要用于流程控制，无输出；
<%= xxx %>标识JavaScript变量，用于将数据输出到模板；
其余部分都为HTML代码。（与EJS类似）。
当然，你也可以用<@ xxx @>, <=@ @>、<* xxx *>, <*= xxx *>等。 */


// 模本引擎的大致思路
// 模板获取
// 模板中HTML结构与JavaScript语句、变量分离
// Function + apply(call)动态生成JavaScript代码
// 模板缓存

// 创建数组arr，再拼接字符串arr.push('
// 模板中遇到 \ 反引号，需要转义
// 遇到 ' 单引号，需要将其转义
// 遇到换行回车，替换为空字符串遇到<%时，替换为');
// 遇到>%时，替换为arr.push('
// (要优先)遇到<%= xxx %>，结合第3、4步，替换为'); arr.push(xxx); arr.push('
// 最后拼接字符串'); return p.join('');

let tpl = ''

const tmpl = (arr, data) => {
  // 如果是模板字符串，会包含非单词部分（<, >, %,  等）；如果是id，则需要通过getElementById获取
  if(!/[\s\W]/g.test(str)) {
    tpl = document.getElementById(str).innerHTML
  } else {
    tpl = str
  }

  let result = `let p = []; p.push(')`;

  result += `${
    tpl.replace(/[\r\n\t]/g, '')
    .replace(/\\/g, '\\\\')
    .replace(/'/g, '\\')
    .replace(/<%=\s*([^%>]+?)\s*%>/g, "'); p.push($1); p.push('")
    .replace(/<%/g, "');")
    .replace(/%>/g, "p.push(')")}`

  result += "); return p.join('');";
}

/* 
明白<% -> ');     %> -> p.push(') <%=\s*([^%>]+?)\s*%>要优先
" let p = [];
p.push('<ul>');
if (obj.show) {
    p.push('');
    for (var i = 0; i < obj.users.length; i++) {
        p.push('<li><a href="');
        p.push(obj.users[i].url);
        p.push('">');
        p.push(obj.users[i].name);
        p.push('</a></li>');
    }
    p.push('');
} else {
    p.push('<p>不展示列表</p>');
}
p.push('</ul>');
return p.join(''); "
*/




let tpl = ''
let match = ''

const idReg = /[\s\W]/g
const tplReg = /[<%=?\s*([^%>])\s*%>]/g
const keyReg = /(for|if|else|switch|case|break|{|})/g

const add = (str, result, isJs) => {
  str = str.replace(/[\r\n\t]/g, '')
  .replace(/\\/g, '\\\\')
  .replace(/'/g, "\\'")

  // result += `result.push(${str});` 
  // 每一步都是push
  // 所以javascript语句直接push 还有变量作为字符串push进去了 所有要单独拎出来
  // **** 增加三元表达式的判断，三种情况：JavaScript语句、JavaScript变量、HTML结构。
  result += isJs ? str.match(keyReg) ? `${str}` : `result.push(${str});` : `result.push('${str}');` 
  return result
}

const tmpl = (str, data) => {
  let cursor = 0
  let result = `let result = []`

  if(!idReg.test(str)) {
    tpl = document.getElementById(str).innerHTML
  } else {
    tpl = str
  }

  while(match = tplReg.exec(tpl)) {
    result = add(tpl.slice(cursor, match.index), result) // HTML结构部分
    result = add(match[1], result, true) // 第一个子集项 即是要赋值的变量
    cursor = match.index + match[0].length // 改变一下HTML结果开始匹配项目 起始+一次匹配文本长度
  }

  result = add(tpl.slice(cursor), result) // 匹配剩余的HTML结构
  result += `return result.join("")`

  // const test = new Function('arg1', 'arg2', ... , 'console.log(arg1 + arg2)')
  // test(1 + 2) // 3
  // 字符串会进行一次 toString 这也是要为什么replace换行
  const fn = new Funcition(result)
  return fn.apply(data)
}

console.log(templ('template'))


/* 
new Function()这种方式只能解析字符串这既是它的缺点也是它的优点。
转化化为可以执行的js代码 缺点双重解析损失性能 
第一次解析常规的ECMAScript代码, 第二次解析字符串


使用Function构造器生成的函数，并不会在创建它们的上下文中创建闭包；
它们一般在全局作用域中被创建。当运行这些函数的时候，
它们只能访问自己的本地变量和全局变量，
不能访问Function构造器被调用生成的上下文的作用域。
这和使用带有函数表达式代码的 eval 不同。
 */

/* 
*  1.两种方法都是使用了数组，拼接完成之后join
*  2. 第一种方法纯使用replace, 匹配成功之后替换
*  3. 第二种方法使用exec函数，利用其动态改变index索引直接捕获到HTML结构，javascript语句变量
*  4. 两种方式都可以直接用字符串拼接，在chrome中对比 数据还是快的多， 2倍
*/


/* 
假如！假如面试的时候面试官问你，请大致描述一下JavaScript模板引擎的原理
那么以下的总结可能会给予你一些帮助。
噢.. 模板引擎实现的原理大致是将模板中的HTML结构和JavaScript语句、变量分离，
将HTML结构以字符串的形式push到数组中，将JavaScript语句独立抽取出来，将JavaScript变量以其自身push到数组中，
通过replace函数的替换或者exec函数的遍历，构建出带有数据的HTML代码，
最后通过Function构造函数 + apply(call)函数生成可执行的JavaScript代码。
如果回答出来了，面试官心里顿时发现千里马：
欸，好像很叼也？接着试探一下：
为什么要用数组？可以用字符串吗？两者有什么区别？
简单的一下replace和exec函数的使用？
exec 和match函数有什么不同？
/<%=?\s*([^%>]+?)\s*%>/g 这段正则是什么意思？
简单说明apply、call、bind函数的区别？
Function构造函数的使用，有什么弊端？
函数声明和函数表达式的区别？
....这一段总结还可以扯出好多知识点... 翻滚吧，千里马！
*/
