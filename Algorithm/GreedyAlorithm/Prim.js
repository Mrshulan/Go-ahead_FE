// A B C D E F
var graph = [
  [0, 2, 4, 0, 0, 0],
  [2, 0, 2, 4, 2, 0],
  [4, 2, 0, 0, 3, 0],
  [0, 0, 0, 0, 3, 0],
  [0, 2, 3, 3, 0, 2],
  [0, 0, 0, 2, 2, 0]
]

function prim() {
  var parent = []
  var key = []
  var visited = []
  var length = graph.length
  var i

  for(i = 0;i < length;i++) {
    key[i] = Infinity
    visited[i] = false
  }

  key[0] = 0
  parent[0] = -1

  for(i = 0;i < length - 1;i++) {
    // 在未处理顶点集合中选出key值最小的
    var u = minKey(key, visited)
    visited[u] = true
    // 所有其他的顶点遍历来一波
    for(var v = 0;v < length;v++) {
       // 没有访问的 u->v 距离不为0 u-v距离 小于 key[v] 才能生成最小生成树
      if(graph[u][v] != 0 && !visited[v] &&
        graph[u][v] < key[v]) {
          // parent记录到它(v)的节点(u)
          parent[v] = u
          // key[v] 最小值(选择生成树的最小权值边)更新
          key[v] = graph[u][v]
        }
    }
  }

  function minKey(key, visited) {
    var min = Infinity, minIndex = -1

    for(var v = 0;v < key.length;v++) {
      // 寻找为false 里边的最短距离的那个
      if(visited[v] == false && key[v] <= min) {
        min = key[v]
        minIndex = v
      }
    }

    return minIndex
  } 
  // console.log(parent, key)
  // parent [ -1, 0, 1, 5, 1, 4 ] key [ 0, 2, 2, 2, 2, 2 ]
  // 0-0 0-1(A-B) 1-2(B-C) 5-3(F-D) 1-4(B-E) 4-5(E-F)
  return parent
}


console.log(prim())