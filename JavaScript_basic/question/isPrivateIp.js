/*
10.0.0.0 - 10.255.255.255
172.16.0.0-172.16.255.255
192.168.0.0-192.168.255.255
127.0.0.0/8
# 0/8的意思代表子网掩码255.255.255.0，也就是最后8位可以有动态范围

例:
输入：
0.0.0.0
输出：
false
*/


function isPrivateIp (ip) {
  let ipVal = ip.split('.')

  if(ipVal.length !== 4) return false;

  ipVal[0] = Number(ipVal[0])
  ipVal[1] = Number(ipVal[1])
  ipVal[2] = Number(ipVal[2])
  ipVal[3] = Number(ipVal[3])

  if(ipVal[0] === 10) {
    if(ipVal[1] >= 0 && ipVal[1] < 255) {
      if(ipVal[2] >= 0 && ipVal[2] <= 255) {
        if(ipVal[3] >= 0 && ipVal[3] <= 255) {
          return true;
        }
      }
    }
  }

  if (ipVal[0] == 172) {
    if (ipVal[1] >= 16 && ipVal[1] <= 31) {
      if (ipVal[2] >= 0 && ipVal[2] <= 255) {
        if (ipVal[3] >= 0 && ipVal[3] <= 255) {
          return true;
        }
      }
    }
  }

  if (ipVal[0] == 192) {
    if (ipVal[1] == 168) {
      if (ipVal[2] >= 0 && ipVal[2] <= 255) {
        if (ipVal[3] >= 0 && ipVal[3] <= 255) {
          return true;
        }
      }
    }
  }


  if (ipVal[0] == 127) {
    if (ipVal[1] == 0) {
      if (ipVal[2] == 0) {
        if (ipVal[3] >= 0 && ipVal[3] <= 255) {
          return true;
        }
      }
    }
  }
  return false;
}

console.log(isPrivateIp("0.0.0.0"))
console.log(isPrivateIp("127.0.0.1"))