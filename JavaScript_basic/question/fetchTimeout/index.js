class TimeoutError extends Error {
  constructor(message) {
    super(message);
    this.name = "TimeoutError";
  }
}

/**
 * 提供参数校验和wrapper功能
 *
 * @param {*} url
 * @param {*} [options={ method: 'GET' }]
 * @returns {Promise} the request result
 */

function request(url, options = { method: "GET" }) {
  // 整个retryout的次数(作用域只取决于定义时候)
  let retryCount = 0;

  let parseJSON = response => {
    return response.json()
  };

  // 服务器返回 400，500 错误码时并不会 reject，只有网络错误才会导致请求不能完成时，fetch 才会被 reject (比如 404 不是一个网络故障)
  let checkStatus = response => {
    // Response.ok(可以判断)
    if(response.status >= 200 && response.status < 304) {
      return response;
    }

    let error = new Error(response.statusText);
    error.response = response;
    throw error;
  }

  class Request {
    constructor(url, { retry, timeout, ...options }) {
      this.url = url;
      this.retry = retry || 0;
      this.timeout = timeout || 1000;
      this.options = options;
    }

    then(fn) {
      // 一个then 一个 done(注意)
      let done = false;

      setTimeout(() => {
        // 无论是请求重试还是最终超时错误，此次请求得到的结果作废, 开始下一次setTimout记时
        if(retryCount < this.retry && !done) {
          done = true;
          retryCount++;
          this.then(fn)
        } else {
          let error = new TimeoutError(`timeout of${this.timeout}ms execeeded`);
          this.catchError(error);
        }
      }, this.timeout)

      fetch(this.url, this.options)
        .then(checkStatus)
        .then(parseJSON)
        .then(res => {
          if(!done) {
            fn(res)
            done = true
          }
        })
        .then(err => {
          this.catchError(err);
        })

      return this;
    }

    catch(fn) {
      this.catchError = fn;
    }
  }

  // 其实也是拿到的resolve 的控制权 fn
  return new Promise((resolve, reject) => {
    new Request(url, options).then(res => resolve(res)).catch(err => reject(err))
  })
}

request('/api', {
  retry: 2,
  timeout: 1000
})
.then(res => console.log(res));

// 之前的超时 或者重传的请求也会发出去，这就肯定有回应 只是没有resovle传递 如果涉及到cache-control缓存等， 第一次是有作用的