class Dictionary {
  constructor() {
    this.items = {}
  }

  set(key, value) {
    this.items[key] = value
  }

  get(key) {
    return this.items[key]
  }

  remove(key) {
    delete this.items[key]
  }

  // 键数组(静态属性)
  get keys() {
    return Object.keys(this.items)
  }
  // 值数组
  get values() {
    // return Object.values(this.items)
    return Object.keys(this.items).reduce((r, c) => {
      r.push(this.items[c])
      return r
    }, [])
  }
}


class Graph {
  constructor() {
    this.vertices = []
    this.adjList = new Dictionary()
  }

  // 添加顶点
  addVertex(v) {
    this.vertices.push(v)
    this.adjList.set(v, [])
  }
  // 添加线 无向图双向
  addEdge(v,w) {
    this.adjList.get(v).push(w)
    this.adjList.get(w).push(v)
  }
  // 打印邻接表
  toString() {
    return this.vertices.reduce((r, v) => {
      return this.adjList.get(v).reduce((r, w) => {
        return r + w + ' '
      }, `${r} \n ${v} => `)
    }, '')
  }

  // breath first search 广度优先算法(队列)
  bfs(v, callback) {
    const adjList = this.adjList
    const visited = []
    const pending = [v || this.vertices[0]]

    const readVertices = vertices => {
      vertices.forEach(key => {
        // 访问标记
        visited.push(key)
        // 先入先出 探索
        pending.shift()
        adjList.get(key).forEach(v => {
          // 既没有排队又没有访问的 那就去排队吧
          if(!pending.includes(v) && !visited.includes(v)) {
            pending.push(v)
          }
        })
        // bfs依次遍历执行回调
        if(callback) callback(key)

        if(pending.length) readVertices(pending)
      })
    }

    // 默认root节点开始
    readVertices(pending)
  }

  // depth first search 深度优先遍历(栈) 不需要源顶点是因为递归总会探索到的
  dfs(callback) {
    const visited = []
    const adjList = this.adjList

    const readVertices = vertices => {
      vertices.forEach(key => {
        if(visited.includes(key)) return false
        // 谁来谁先
        visited.push(key)
        if(callback) callback(key)
        // 递归的入口
        if(visited.length !== this.vertices.length) {
          readVertices(adjList.get(key))
        }
      })
    }

    readVertices(adjList.keys)
  }

  // 返回对象{dist predecessors}
  bfsPro(v, callback) {
    const visited = []
    const distances = []
    const predecessors = []
    const adjList = this.adjList
    const pending = [v || this.vertices[0]]

    const readVertices = vertices => {
      vertices.forEach(key => {
        visited.push(key)
        pending.shift()
        // 初始化距离和前节点
        distances[key] = distances[key] || 0
        predecessors[key] = predecessors[key] || null

        adjList.get(key).forEach(v => {
          if(!pending.includes(v) && !visited.includes(v)){
            pending.push(v)
            // 关联临节点距离 在前节点的距离上 +1
            distances[v] = distances[key] + 1
            predecessors[v] = key
          }
        })
        if(callback) callback(key)
        if(pending.length) readVertices(pending)
      })
    }

    readVertices(pending)

    return { distances, predecessors }
  }
  // 路径
  distances(fromVertex) {
    const vertices = this.vertices
    const { distances, predecessors } = this.bfsPro(fromVertex)

    vertices.forEach(toVertex => {
      if(!!distances[toVertex]) {
        let preVertex = predecessors[toVertex]
        // 中间路径
        let slug = ''

        while(fromVertex !== preVertex) {
          slug = `${preVertex} - ${slug}`
          preVertex = predecessors[preVertex]
        }

        slug = `${fromVertex} - ${slug}${toVertex}`
        console.log(slug)
      }
    })
  }

  // 构建"森林"(有树根的一个集合) 发现时间和完成探索时间 前节点记录
  dfsPro(callback) {
    let foundTimer = 0
    const found = []
    const foundTimes = []
    const visitedTimes = []
    const predecessors = []
    const adjList = this.adjList

    const readVertices = (vertices, predecessor) => {
      vertices.forEach(key => {
        foundTimer++
        // 每个都被发现 但是还没有标记探索完成时间
        if(adjList.get(key).every(v => found.includes(v) && !visitedTimes.includes(v))) {
          visitedTimes[key] = foundTimer
        }

        // 发现里边有他了
        if(found.includes(key)) return false

        found.push(key)
        foundTimes[key] = foundTimer

        if(callback) callback(key)

        predecessors[key] = predecessors[key] || predecessor || null
        
        if(found.length !== this.vertices.length) {
          // 传入该节点关联的顶点，传个key以防万一没有前节点
          readVertices(adjList.get(key), key)
        }
      })
    }

    readVertices(adjList.keys)

    return { foundTimes, visitedTimes, predecessors }
  }
}

const graph = new Graph()

;['A', 'B', 'C', 'D', 'E', 'F', 'G', 'H', 'I'].forEach(v => graph.addVertex(v))

graph.addEdge('A', 'B')
graph.addEdge('A', 'C')
graph.addEdge('A', 'D')

graph.addEdge('C', 'D')
graph.addEdge('C', 'G')

graph.addEdge('D', 'G')
graph.addEdge('D', 'H')

graph.addEdge('B', 'E')
graph.addEdge('B', 'F')

graph.addEdge('E', 'I')

// console.log(graph.toString())
// graph.bfs(graph.vertices[0], value => {console.log("Visited vertex: " + value)})
// console.log(graph.bfsPro(graph.vertices[0]))
// graph.distances(graph.vertices[1])
// graph.dfs(value => {console.log("Visited vertex: " + value)})
// console.log(graph.dfsPro())
