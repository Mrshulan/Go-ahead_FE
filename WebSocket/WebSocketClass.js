/* 
传统的HTTP半双工
客户端(浏览器)和服务器端进行通信，只能由客户端发起ajax请求，才能进行通信，服务器端无法主动向客户端推送信息。
当出现类似体育赛事、聊天室、实时位置之类的场景时，客户端要获取服务器端的变化，就只能通过轮询(定时请求)来了解服务器端有没有新的信息变化。

轮询效率低，非常浪费资源(需要不断发送请求，不停链接服务器)

WebSocket的出现，让服务器端可以主动向客户端发送信息，使得浏览器具备了实时双向通信的能力,这就是WebSocket解决的问题

WebSocket的优势(因为和H5一并提出 所有有兼容性问题, socket.io基于engine.io很好的解决的这个问题(优雅降级实现轮询))
1. 支持双向通信，实时性更强(全双工)
2. 更好的二进制支持 Blob/Arraybuffer
3. 较少的控制开销(连接创建后，ws客户端、服务端进行数据交换时，协议控制的数据包头部较少， 而HTTP协议每次通信都需要携带完整的头部)
4. 没有同源限制，客户端可以与任意服务器通信
5. 与 HTTP 协议有着良好的兼容性，默认端口也是80和443，并且握手阶段基于 HTTP 协议，因此握手时不容易屏蔽，能通过各种 HTTP 代理服务器 
*/

class WebSocketClass {
  /**
   * @description: 初始化实例属性，保存参数
   * @param {String} url ws的接口
   * @param {Function} msgCallback 服务器信息的回调传数据给函数
   * @param {String} name 可选值 用于区分ws
   */
  constructor(url, msgCallback, name = 'default') {
      this.url = url;
      this.msgCallback = msgCallback;
      this.name = name;
      this.ws = null;  // websocket对象
      this.status = null; // websocket是否关闭
  }

  /**
   * @description: 初始化 连接websocket或重连webSocket时调用
   * @param {*} 可选值 要传的数据
   */
  connect(data) {
    // 创建WebSocket实例
    this.ws = new WebSocket(this.url)

    // 当Browser和WebSocketServer连接成功后，会触发onopen消息
    this.ws.onopen = e => {
      // 连接ws成功回调
      this.status = 'open'
      console.log(`${this.name}连接成功`, e)
      // 心跳检测
      this.heartCheck()
      if(data !== undefined) {
        // 有要传的数据,就发给服务端
        return this.ws.send(data)
      }

    }
    // 当Browser接收到WebSocketServer发送过来的数据时，就会触发onmessage消息
    this.ws.onmessage = e => {
      // 信息过滤 开局send ping 如果服务器端返回pong,修改pingPong的状态
      if(e.data === 'pong') {
        this.pingPong = 'pong'
      }

      // 判断 ArrayBuffer 对象
      if(event.data instanceof ArrayBuffer){
        // do something
      }      
      // 判断 Blob 对象
      if(event.data instanceof Blob){
        // do something
      }
     
      // 把数据传给回调函数，并执行回调
      return this.msgCallback(e.data)
    }

    // ws关闭回调
    // 当Browser接收到WebSocketServer端发送的关闭连接请求时，就会触发onclose消息。
    this.ws.onclose = e => {
      this.closeHandle(e) // 判断是否正常关闭
    }
    // ws出错回调
    // 如果连接失败，发送、接收数据失败或者处理数据出现错误，browser会触发onerror消息。
    this.oneerror = e => {
      this.closeHandle(e) // 判断是否正常关闭
    }
  }

  // 心跳检测
  // 客户端就像心跳一样每隔固定的时间发送一次ping，来告诉服务器，我还活着，
  // 而服务器也会返回pong，来告诉客户端，服务器还活着。
  heartCheck() {
    // ws的心跳机制状态值
    this.pingPong = 'ping' // Engine.io协议 Frame帧 2- ping
    this.pingInterval = setInterval(() => {
      if(this.ws.readyState === 1) {
        // 检查ws  1: 表示连接成功，可以通信了才可发送 对应 0- open
        this.ws.send('ping') // 客户端发送ping
      }
    }, 10000)

    this.pongInterval = setInterval(() => {
      if(this.pingPong === 'ping') {
        this.closeHandle('pingPong没有改变为pong') // 没有返回pong 重启webSocket
      } else {
        // 重置为ping 若下一次 ping 发送失败 或者pong返回失败(pingPong不会改成pong)，将重启
        console.log('返回pong')
        this.pingPong = 'ping'
      }
    }, 35000)
  }
  // 发送信息给服务器
  sendHandle(data) {
    console.log(`${this.name}发送给服务器:`, data)
    // 开局送个'ping'
    return this.ws.send(data)
  }
  // 处理正常关闭和非正常关闭
  closeHandle(e = 'err') {
    // 因为webSocket并不稳定(就不是正常的close状态)，规定只能手动关闭(调closeMyself方法)，否则就重连
    if(this.status !== 'close') {
      console.log(`${this.name}断开, 重连websocket`, e)

      if(this.pingInterval !== undefined && this.pongInterval !== undefined) {
        // 清除定时器
        clearInterval(this.pingInterval)
        clearInterval(this.pongInterval)
      }
      // 重连
      this.connect()
    } else {
      console.log(`${this.name}websocket手动关闭`)
    }
  }

  // 手动关闭Websocket 
  closeMyself() {
    console.log(`关闭${this.name}`)
    this.status = 'close'
    return this.ws.onclose()
  }
}

function someFn(data) {
  console.log('接收服务器消息的回调：', data)
}
// ws://example.com/socket wss://example.com/socket
const wsValue = new WebSocketClass('ws://example.com/socket', someFn, 'wsName')

wsValue.connect('立即与服务器通信'); // 连接服务器

setTimeout(() => {
    wsValue.sendHandle('传消息给服务器')
}, 1000)

setTimeout(() => {
    wsValue.closeMyself(); // 正常手动关闭手动ws
}, 10000)
