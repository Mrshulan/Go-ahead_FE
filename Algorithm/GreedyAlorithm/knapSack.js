// 分数背包
function knapSack(capacity, values, weights) {
  var n = values.length
  var load = 0
  var i = 0, val = 0

  for(;i < n && load < capacity;i++) {
    if(weights[i] < (capacity - load)) {
      val += values[i]
      load += weights[i]
    } else {
      var r = (capacity - load) / weight[i]
      val += r * values[i]
      load += weights[i]
    }
  }

  return val
}