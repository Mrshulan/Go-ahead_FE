'use strict';

var babel = require("babel-core");
var t = require('babel-types');

/* 
function demo (a) {
  console.log(a || 'a');
}
// 词法
[
  { "type": "Keyword","value": "function" },
  { "type": "Identifier","value": "demo" },
  { "type": "Punctuator","value": "(" },
  { "type": "Identifier","value": "a" },
  { "type": "Punctuator","value": ")" },
  { "type": "Punctuator","value": "{ " },
  { "type": "Identifier","value": "console" },
  { "type": "Punctuator","value": "." },
  { "type": "Identifier","value": "log" },
  { "type": "Punctuator","value": "(" },
  { "type": "Identifier","value": "a" },
  { "type": "Punctuator","value": "||" },
  { "type": "String","value": "'a'" },
  { "type": "Punctuator","value": ")" },
  { "type": "Punctuator","value": "}" }
]
// 语法
{
"type": "Program",
"body": [{
    "type": "FunctionDeclaration",
    "id": { "type": "Identifier", "name": "demo" },
    "params": [{ "type": "Identifier", "name": "a" }],
    "body": {
        "type": "BlockStatement",
        "body": [{
            "type": "ExpressionStatement",
            "expression": {
                "type": "CallExpression",
                "callee": {
                    "type": "MemberExpression",
                    "computed": false,
                    "object": { "type": "Identifier", "name": "console" },
                    "property": { "type": "Identifier", "name": "log" }
                },
                "arguments": [{   
                    "type": "LogicalExpression",
                    "operator": "||",
                    "left": { "type": "Identifier", "name": "a" },
                    "right": { "type": "Literal", "value": "a", "raw": "'a'" }
                }]
            }
        }]
    },
}]}
 */

/* 
  visitor babel 通过实例化 visitor 对象完成，
  既其实我们生成出来的 AST 结构都拥有一个 accept 方法用来接收 visitor 访问者对象的访问，
  而访问者其中也定义了 visit 方法(即开发者定义的函数方法)使其能够对树状结构不同节点做出不同的处理，借此做到在对象结构的一次访问过程中，我们能够遍历整个对象结构。


  遍历结点让我们可以定位并找到我们想要操作的结点，在遍历每一个节点时，存在enter和exit两个时态周期，
  一个是进入结点时，这个时候节点的子节点还没触达，遍历子节点完成的后，会离开该节点并触发exit方法。
  */
// 实质MemberExpression => CallExpression
var codeSource = 'NEJ.define(["./modal"], function(Modal){});';
var codeTarget = 'define(["./modal"], function(Modal){});';

// 暂存区记录切莫误伤队友  type => MemberExpression ExpressionStatement CallExpression
var visitor = {
  MemberExpression: function MemberExpression(path, opt) {
    // 将memberExpression callee [注意不是换成CallExpression, 不然你就会有两个()()]
    if (path.node && path.node.object && path.node.object.name === 'NEJ') {
      path.replaceWith(t.identifier('define'));
    }
  }
};

/*
some codes...
*/
// 断点ast => promgram(type => promgram body[0] expression(arugments) callee) 对比✨
// const codeSourceAst = babel.transform(codeSource);
// const codeTargetAst = babel.transform(codeTarget);

// const result = babel.transform(codeSource, {
//   plugins: [{ 
//     visitor
//   }]
// })
// console.log(result.code);


// 作用域
/* 
{
  path: path,
  block: path.node,
  parentBlock: path.parent,
  parent: parentScope,
  bindings: [...]
} 
*/

// 创建一个新的作用域的时候，需要给出它的路径和父作用域，
// 之后在遍历的过程中它会在该作用域内收集所有的引用，
// 收集完毕后既可以在作用域上调用方法。

// 千万不用再visitor里边直接用 Identifier 易误伤。 在实际开发的时候也要注意这个constd等 Bindings绑定
function square(n) {
  return n * n;
}
var n = 1;

var updateParamNameVistor = {
  Identifier: function Identifier(path) {
    if (path.node.name = this.paramName) {
      path.node.name = 'x';
    }
  }
};

var MyVisitor = {
  FunctionDeclaration: function FunctionDeclaration(path) {
    // 拿到第一参
    var param = path.node.params[0];
    var paramName = param.name;
    param.name = "x";

    path.traverse(updateParamNameVistor, { paramName: paramName });
  }
};

path.traverse(MyVisitor);