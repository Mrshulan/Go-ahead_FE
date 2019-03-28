// A B C D E F
var graph = [
  [0, 2, 4, 0, 0, 0],
  [0, 0, 1, 4, 2, 0],
  [0, 0, 0, 0, 3, 0],
  [0, 0, 0, 0, 3, 0],
  [0, 0, 0, 3, 0, 2],
  [0, 0, 0, 0, 0, 0]
]

function dijkstra(src) {
  var dist = [], visited = []
  var length = graph.length

  for(var i = 0;i < length;i++) {
    dist[i] = Infinity
    visited[i] = false
  }

  // 自己到自己的距离默认就是0
  dist[src] = 0

  
  for(var i = 0;i < length;i++) {
    // 找出未访问顶点的最短距离 标记为true 第一次默认就是 0 开始
    var u = minDistance(dist, visited)
    // console.log(dist, visited)
    // 标记为访问过
    visited[u] = true
    // 所有其他的顶点遍历来一波
    for(var v = 0;v <= length;v++) {
      // 没有访问的 u->v 距离不为0 自己 目前标记距离不是无穷大 当前距离 加上 u->v 更新距离 小于 v
      if(!visited[v] && graph[u][v] != 0 && dist[u] != Infinity 
        && dist[u] + graph[u][v] < dist[v]) {
          // dist[v] 才是代表真正的结果
          // 如果找到更短的路径 就更新 v
          dist[v] = dist[u] + graph[u][v]
        }

    }
    
  }

  function minDistance(dist, visited) {
    var min = Infinity, minIndex = -1

    for(var v = 0;v < dist.length;v++) {
      // 寻找为false 里边的最短距离的那个
      if(visited[v] == false && dist[v] <= min) {
        min = dist[v]
        minIndex = v
      }
    }

    return minIndex
  } 


  return dist
}

console.log(dijkstra(0))

// [ 0, 2, 3, 6, 4, 6 ]
