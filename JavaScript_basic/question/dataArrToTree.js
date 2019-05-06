// 将输入的数组组装成一颗树状的数据结构 要求程序具有侦测错误输入的能力，假如数据是下面的，
let dataArr =[
  {id:1, name: 'i1'},
  {id:2, name:'i2', parentId: 1},
  {id:4, name:'i4', parentId: 3},
  {id:3, name:'i3', parentId: 2},
  {id:8, name:'i8', parentId: 7}
  ]


function getTreeData(arr) {
  if (!arr || !(arr instanceof Array)) return '错误的数据类型'
  if (!arr.length) return '空数组'

  var len = arr.length
  var rootObj = {id: null, name: null, children: []}
  var nodeObj = {}

  for (var i = 0;i < len; i++) {
    // 识别根节点
    if (!arr[i].parentId) {
      rootObj = {
        id: arr[i].id,
        name: arr[i].name,
        children: [],
      }
    } else {
      // parentId归类关联
      if (nodeObj.hasOwnProperty(arr[i].parentId)) {
        nodeObj[arr[i].parentId].children.push(arr[i])
      } else {
        nodeObj[arr[i].parentId] = {}
        nodeObj[arr[i].parentId].children = []
        nodeObj[arr[i].parentId].children.push(arr[i])
      }
    }
  }

  // 整理根节点过程
  getChildren(rootObj)

  function getChildren(node) {
    // 查看节点对象中以该节点id为键的children数组
    if(nodeObj[node.id] && nodeObj[node.id].children){
      node.children = nodeObj[node.id].children

      delete(nodeObj[node.id])

      var len = node.children.length
      if (len > 0) {
        // 找children
        for (var i = 0; i < len; i++) {
          getChildren(node.children[i])
        }
      }
    } else if(!nodeObj[node.id]){
      console.log(node.id + '没有children')
    }
  }
  // 留下单身狗
  for(var p in nodeObj){
    if(nodeObj.hasOwnProperty){
      console.warn(p + ':没有该父节点')
    }
  }
  
  return rootObj
}

console.log(getTreeData(dataArr))