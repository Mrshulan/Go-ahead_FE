// 此题暂时没有好的想法
{/* 
  <div>
    <span><a></a ></span>
    <span><a></a ><a></a ></span>
  </div> 
  res = {  
    tag: 'DIV',
    children: [
      {
        tag: 'SPAN', 
        children: [
          {
            tag: 'A', 
            children: [] 
          }
        ] 
      },   
      {  
        tag: 'SPAN',
        hildren: [
          { tag: 'A',
            children: []
          },
          { tag: 'A',
          children: []
          }
        ]
      }
    ]
  }
*/}

var str = '<div><span><a></a></span><span><a></a><a></a></span></div>'

function domTree (str) {
  var htmlReg = /<\/?(\w+)>/g
  var dom = str.match(htmlReg)
  
  tree = tree || {}

  dom.forEach(item => {
    tree.tag = item
    if(!item.includes('/')) {
      tree.children = [].concat(createDom())
    } else {
      tree.children = []
    }
  })

  function createDom (domArr) {
    var dom = {}
    dom.tag
  }

  return tree
} 
console.log(domTree(str))


