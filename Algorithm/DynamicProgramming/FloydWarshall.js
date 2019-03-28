// A B C D E F
// 自己和不直接相连的初始化 Infinity
const graph = [
  [Infinity, 2, 4, Infinity, Infinity, Infinity],
  [Infinity, Infinity, 2, 4, 2, Infinity],
  [Infinity, Infinity, Infinity, Infinity, 3, Infinity],
  [Infinity, Infinity, Infinity, Infinity, Infinity, 2],
  [Infinity, Infinity, Infinity, 3, Infinity, 2],
  [Infinity, Infinity, Infinity, Infinity, Infinity, Infinity]
];

function floyWarshall() {
  const dist = []
  const { length } = graph

  for (let i = 0; i < length; i++) {
    dist[i] = [];
    for (let j = 0; j < length; j++) {
      if (i === j) {
        dist[i][j] = 0;
      } else if (!isFinite(graph[i][j])) {
        dist[i][j] = Infinity;
      } else {
        dist[i][j] = graph[i][j];
      }
    }
  }

  // 就是i k k j 三层循环 通过 k 作为中转
  for (let k = 0; k < length; k++) {
    for (let i = 0; i < length; i++) {
      for (let j = 0; j < length; j++) {
        if (dist[i][k] + dist[k][j] < dist[i][j]) {
          dist[i][j] = dist[i][k] + dist[k][j];
        }
      }
    }
  }
  return dist
}

console.log(floyWarshall())
/* 
[ [ 0, 2, 4, 6, 4, 6 ],
  [ Infinity, 0, 2, 4, 2, 4 ],
  [ Infinity, Infinity, 0, 6, 3, 5 ],
  [ Infinity, Infinity, Infinity, 0, Infinity, 2 ],
  [ Infinity, Infinity, Infinity, 3, 0, 2 ],
  [ Infinity, Infinity, Infinity, Infinity, Infinity, 0 ] ] */