;
(function (window, undefined) {

  // getElementsByClassName 兼容ie8及其以下
  if(!document.getElementsByClassName) {
    document.getElementsByClassName = function (className) {
      var ele = document.getElementsByTagName('*')
      var eleArray = []
      var classRegexp = new RegExp('\\b' + className + '\\b')

      for(var i = 0,iL = ele.length; i < iL;i++) {
        if(classRegexp.test(ele[i].className)) {
          eleArray.push(ele[i])
        }
      }

      return eleArray
    }
  }

  // querySelectorAll 兼容 ie7(7 测试有点问题) 及其以下
  if(!document.querySelectorAll) {
    document.querySelectorAll = function (str) {
      var head = document.documentElement.firstChild
      var _style = document.createElement('style')
      var elements = [], element = null

      document._Sl = []

      head.appendChild(_style)
      _style.styleSheet.cssText = str + ' {Sl: expression(document._Sl && document._Sl.push(this))};';
      
      // 触发css expression
      window.scrollBy(0,0)
      _style.parentNode.removeChild(_style)

      while(document._Sl.length) {
        element = document._Sl.shift()
        element.style.removeAttribute('Sl')
        elements.push(element)
      }
      document._Sl = null

      return elements
    }
  }

  // trim 兼容ie8 及其以下
  if(!String.prototype.trim) {
    String.prototype.trim  = function () {
      return this.replace(/^\s+ | \s+$/g, '')
    }
  }

  // lazyFunction
  var _addEvent = (function () {
    if(document.addEventListener) {
      return function(type,el,fn) {
        el.addEventListener(type, fn, false)
      }
    } else if(document.attachEvent) {
      return function (type, el, fn) {
        el.attachEvent('on' + type, fn)
      }
    }
  })()

  var _removeEvent = function(type, el, fn) {
    if(el.removeEventListener) {
      _removeEvent = function(type, el, fn) {
        el.removeEventListener(type, fn)
      }
    } else if(el.detachEvent) {
      _removeEvent = function (type, el, fn) {
        el.detachEvent('on' + type, fn)
      }
    }

    _removeEvent(type, el, fn)
  } 

  var _eventModifiers = function(arr, e) {
    Sl.Each(arr, function (v) {
      if(v === 'stop') {
        if(e.stopPropagation) {
          e.stopPropagation()
        } else {
          e.cancelBubble = true
        }
      } else if(v === 'prevent') {
        if(e.preventDefault) {
          e.preventDefault()
        } else {
          e.returnValue = false
        }
      }
    })
  }

  // 存储事件挂载dom.events (发布订阅模式)
  var _addEventCache = function(obj) {
    if(typeof obj.dom.events === 'undefined') {
      // 只是刚刚进来进行一次 所以需要第三种情况
      obj.dom.events = {}
      obj.dom.events[obj.type] = [obj.fn]
    } else if (obj.dom.events[obj.type] instanceof Array) {
      obj.dom.events[obj.type].push(obj.fn)
    } else {
      obj.dom.events[obj.type] = [obj.fn]
    }

    obj.dom.events[obj.type].origin = obj.origin
  }

  // 存储domReady事件
  var domReadyEvents = []
  var Sl = function (str) {
    if(typeof str === 'function') {
      domReadyEvents.push(str)
    } else {
      return new Sl.prototype.init(str)
    }
  }

  // 封装一个静态的方法 实现for 类似Each
  Sl.Each = function (o, fn, context) {
    for(var i = 0,iL = o.length;i < iL;i++) {
      var result = fn.call(context || o[i], o[i], i, o)

      if(result === false) {
        break
      } else if (result === true) {
        continue
      }
    }
  }

  Sl.ajax = function (opt) {
    opt.type = /post/i.test(opt.type) ? 'POST' : 'GET'
    opt.async = opt.async === false ? false : true

    var xhr = new XMLHttpRequest()
    var data = ''

    for(var key in opt.data) {
      data += key + '=' + encodeURIComponent(opt.data[key]) + '&'
    }

    if(opt.type === 'GET') {
      if(!/?&/.test(opt.url)) {
        opt.url += '?'
      } else {
        if(!/(&\s*)$/.test(opt.url)) {
          opt.url += '&'
        }
      }
      // 避免缓存
      opt.url += data + '&_=' + new Date().getTime()

      data = null
    }

    xhr.open(opt.type, opt.url, opt.async)
    xhr.setRequestHeader('Content-Type', 'application/x-www-form-urlencoded;charset=utf8')
    
    xhr.onreadystatechange = function () {
      if(this.readyState === 4) {
        if(200 <= this.status && this.status < 300 || this.status === 304) {
          opt.success && opt.success.call(this, strToJson(this.response))
        } else {
          opt.error && opt.error.call(this, this.status)
        }
      }
    }

    xhr.send(data)

    function strToJson (str) {
      try {
        return JSON.parse(str)
      } catch (e) {
        return str
      }
    }
  }

  /* 
  $.popups({
    width: "300px",
    height: "100px",
    autoClose: true,
    content: "成功"
  }) 
  */
  Sl.popups = function (opt) {
    var opt = opt ? opt : {}
    opt.content = opt.content || "请设置弹窗消息"
    opt.width = opt.width || 120
    opt.height = opt.height || 50
    opt.className = opt.className || "popups-style"
    opt.autoClose = opt.autoClose !== undefined || false
    opt.autoTime = opt.autoTime || 3000
    opt.blankClose = opt.blankClose !== undefined || false

    var popupsHtml = [
      '<div class="popups-main" id="popupsMain">',
      '<div class="popups-mask" id="popupsMask"></div>',
      '<div class="popups-content ' + opt.className + '" id="popupsContent">',
      '' + opt.content + '</div>',
      '</div>'
    ]
    Sl('body').append(popupsHtml.join(''))

    var SlpopupsMain = Sl("#popupsMain")
    var SlpopupsMask = Sl("#popupsMask")
    var SlpopupsContent = Sl("#popupsContent")

    SlpopupsMask.css({
      position: "fixed",
      height: "100%",
      width: "100%",
      left: 0,
      top: 0,
      zIndex: 9998,
    })

    SlpopupsContent.css({
      position: 'fixed',
      width: opt.width,
      height: opt.height,
      right: 0,
      left: 0,
      zIndex: 9999,
      margin: "auto",
    })

    SlpopupsContent.animate({
      top: 0,
      bottom: 0,
    }, {
      duration: 1000,
      timingFn: "Bounce",
      timingType: 1
    })

    if (opt.blankClose) {
      Sl('.popups-mask').on('click.stop.prevent', function () {
        Sl("body").remove(SlpopupsMain)
      })
    }

    if (opt.autoClose && opt.autoTime > 0) {
      setTimeout(function () {
        Sl("body").remove($popupsMain)
      }, opt.autoTime)
    }
  }

  Sl.prototype = {
    constructor: Sl,
    // eq便于恢复
    prevNode: null,

    init: function (select) {
      // 策略模式

      var o = {
        html: function (select) {
          var _div = document.createElement('div')

          _div.innerHTML = select

          return _div.children
        },
        id: function (select) {
          var o = document.getElementById(select.slice(1))

          return o === null ? [] : [o]
        },
        className: function(select) {
          return document.getElementsByClassName(select.slice(1))
        },
        tagName: function(select) {
          return document.getElementsByTagName(select)
        },
        css3: function(select) {
          return document.querySelectorAll(select)
        }
      }

      function f(select) {
        if(/^</.test(select)) {
          return 'html'
        } else if(/[~+>\s]/.test(select)) {
          return 'css3'
        } else if(/^\./.test(select)) {
          return 'className'
        } else if(/^#/.test(select)) {
          return 'id'
        } else if(/[\w]/.test(select)) {
          return 'tagName'
        }
      }

      var arr = null

      if(typeof select === 'object') {
        arr = [select]
      } else if(typeof select === 'string') {
        arr = o[f(select)](select)
      }

      Sl.Each(arr, function (v, i) {
        this[i] = v
      }, this)

      this.length = arr.length
    },
    // get first set all
    on: function (eventType, fn) {
      if(arguments.length === 0) return

      var arr = eventType.split('.')
      var type = arr.shift()

      for(var i = 0,iL = this.length;i < iL;i++) {
        (function (i) {
          var self = this[i]

          if(type === 'mousewheel') {
            var f = function (e) {
              _eventModifiers(arr, e)
              // e.wheelD = 1 向上 =-1 向下 滚轮滑动
              e.wheelD = e.wheelDelta / 150 || e.detail / -3
              fn.call(self, e)
            }

            f.fn = fn
            // 绑定是封装好的函数
            _addEvent(self.onmousewheel === null ? 'mousewheel' : 'DOMMouseScroll',self, f)
          } else {
            var f = function(e) {
              _eventModifiers(arr, e)
              fn.call(self, e)
            }
            f.fn = fn

            _addEvent(type, self, f)
          }

          _addEventCache({
            dom: self,
            type: type,
            fn: f,
            origin: eventType
          })

        }).call(this, i)
      }

      return this
    },
    off: function (type, fn){
      if(arguments === 0) return

      // 对fn传与不传做出不同的处理
      var isFn = typeof fn === 'function'

      for(var i = 0,iL = this.length; i < iL; i++) {
        var domEventsArray = this[i].events[type]
        var self = this[i]

        if(!domEventsArray) return

        for(var j = domEventsArray.length - 1;j >= 0;j--) {
          if(type === 'mousewhell') {
            if(isFn) {
              if(domEventsArray[j].fn === fn) {
                _removeEvent(
                  self.onmousewheel === null ? 'mousewheel' : 'DOMMouseScroll',
                  self,
                  domEventsArray[j]
                )
              }
            } else {
              _removeEvent(
                self.onmousewheel === null ? 'mousewheel' : 'DOMMouseScroll',
                self,
                domEventsArray[j]
              )
            }
          } else {
            if(isFn) {
              if(domEventsArray[j].fn === fn) {
                _removeEvent(type, self, domEventsArray[j])
              }
            } else {
              _removeEvent(type, self, domEventsArray[j])
            }
          }

          domEventsArray.splice(j, 1)
        }
      }

      return this
    },
    one: function (eventType, fn) {
      if(arguments.length === 0) return

      var arr = eventType.split('.')
      var type = arr.shift()

      for(var i = 0,iL = this.length;i < iL;i++) {
        (function (i) {
          var self = this[i]

          if(type === 'mousewheel') {
            var f = function(e) {
              _eventModifiers(arr, e)
              e.wheelD = e.wheelDelta / 150 || e.detail / -3
              fn.call(self, e)
              Sl(self).off(type, fn)
            }

            f.fn = fn

            _addEvent(self.onmousewheel === null ? 'mousewheel' : 'DOMMouseScroll', self, f)
          } else {
            var f = function (e) {
              _eventModifiers(arr, e)
              fn.call(self, e)
              Sl(self).off(type, fn)
            }

            f.fn = fn

            _addEvent(type, self, f)
          }

          _addEventCache({
            dom: self,
            type: type,
            fn: f,
            origin: eventType
          })
        }).call(this, i)
      }

      return this
    },
    each: function(fn) {
      // 改变一下传参方式
      Sl.Each(this, function(v, i, array) {
        var result = fn.call(v, v, i, array)

        if(result != undefined) {
          return result
        }
      })
    },
    val: function (s) {
      if(typeof s === 'undefined') {
        try {
          var val = this[0].value
        } catch (e) {
          throw Error('只有表单控件才支持')
        }

        return val
      } else {
        try {
          this.each(function (v, i) {
            v.value = s
          })
        } catch (e) {
          throw Error('只有表单控件才支持')
        }
      }
    },
    html: function (s) {
      if(typeof s === 'undefined') {
        try {
          var val = this[0].innerHTML
        } catch (e) {
          throw Error('对象的innerHTML不存在')
        }

        return val
      } else {
        try {
          this.each(function (v) {
            v.innerHTML = s
          })
        } catch (e) {
          throw Errow('对象的innerHTML不存在')
        }
      }

      return this
    },
    text: function (s) {
      if(typeof s === 'undefined') {
        try {
          var val = this[0].innetText
        } catch(e) {
          throw Error('对象的innerText不存在')
        }

        return val
      } else {
        try {
          this.each(function (v) {
            v.innerText = s
          })
        } catch (e) {
          throw Error('对象的innerText不存在')
        }
      }

      return this
    },
    eq: function (n) {
      var length = this.length

      n %= length
      if(n < 0) {
        n += length
      }

      // 包装成init[] 如果直接给this存储只是简单的引用
      Sl.prototype.prevNode = new this.init(this)

      return new this.init(this[n])
    },
    end: function() {
      var o = this.prevNode[0]

      Sl.prototype.prevNode = null

      return o
    },
    addClass: function (eName) {
      this.each(function () {
        var newArr = this.className.split(/\s/g).concat(eName.split(/\s/g))
  
        for(var i = 0,iL = newArr.length;i < iL;i++) {
          for(var j = iL - 1;j > i;j--) {
            if(!newArr[j]) {
              newArr.splice(j, 1)
            }
            if(newArr[i] === newArr[j]) {
              newArr.splice(j, 1)
            }
          }
        }

        this.className = newArr.join(' ')
      })

      return this
    },
    removeClass: function (eName) {
      this.each(function() {
        var oldName = this.className.split(/\s/g)
        var newName = eName.split(/\s/g)

        for(var i = 0,iL = newName.length;i < iL;i++) {
          for(var j = oldName.length - 1;j >= 0;j--) {
            if(newName[i] === oldName[j]) {
              oldName.splice(j, 1)
            }
          }
        }  

        this.className = oldName.join(' ')
      })

      return this
    },
    hasClass: function(eName) {
      var reg = new RegExp('\\b' + eName + '\\b')

      return reg.test(this[0].className)
    },
    toggleClass: function (eName) {
      this.each(function () {
        var self = Sl(this)

        if(self.hasClass(eName)) {
          self.removeClass(eName)
        } else {
          self.addClass(eName)
        }
      })

      return this
    },
    appendTo: function (select) {
      if(select instanceof Sl) {
        var o = select
      } else {
        var o = Sl(select)
      }

      var targetNodes = []
      var source = this

      // 克隆子节点和复制事件(利用之前_addEventCache)
      Sl.Each(o, function(v, i) {
        var node = source[0].cloneNode(true)

        targetNodes.push(node)
        v.appendChild(node)
      })
      for(var key in source[0].events) {
        Sl.Each(targetNodes, function (k) {
          Sl.Each(source[0].events[key], function(k2) {
            Sl(k).on(source[0].events[key].origin, k2)
          })
        })
      }

      return this
    },
    append: function (select) {
      if(select instanceof Sl) {
        select.appendTo(this)
      } else {
        var node = Sl(select)[0]

        this.each(function () {
          this.appendChild(node.cloneNode(true))
        })
      }

      return this
    },
    remove: function(select) {
      var type = typeof select

      if(type === 'undefined') {
        this.each(function() {
          this.innerHTML = ''
        })
      } else if(type === 'string') {
        var o = Sl(select)

        this.each(function (k) {
          o.each(function (k2) {
            k2.parentNode === k && k.removeChild(k2)
          })
        })
      } else if(type === 'object') {
        if(select instanceof Sl) {
          this.each(function (k) {
            select.each(function (k2) {
              k2.parentNode === k && k.removeChild(k2)
            })
          })
        } else {
          if(!!select.length && select.length !== undefined) {
            this.each(function(k) {
              for(var i = select.length - 1; i>=0;i--) {
                select[i].parentNode === k && k.removeChild(select[i])
              }
            })
          } else {
            this.each(function (k) {
              select.parentNode === k && k.removeChild(select)
            })
          }
        }
      }
    },
    css: function (attr, val) {
      var type = typeof attr
      var em = ''

      if(type === 'string') {
        if(!!val || typeof val === 'number') {
          if(/width|height|top|right|bottom|left/i.test(attr)) {
            !isNaN(val / 1) && (em = 'px')
          }
          this.each(function() {
            this.style[attr] = val + em
          })
        } else {
          // 不能满足透明背景呈现的背景
          if(document.getComputedStyle) {
            return document.getComputedStyle(this[0])[attr]
          } else {
            return this[0].currentStyle[attr]
          }
        } 

      } else if(type === 'object') {
        for(var key in attr) {
          this.css(key, attr[key])
        }
      }

      return this
    },
    // val 会识别成字符串 所以false true这类的不行 需要 prop弥补
    attr: function (attr, val) {
      var type = typeof(attr)

      if(type === 'string') {
        if(typeof val !== 'undefined') {
          this.each(function () {
            this.setAttribute(attr, val)
          })
        } else {
          return this[0].getAttribute(attr)
        }
      } else if(type === 'object') {
        for(var key in attr) {
          this.attr(key, attr[key])
        }
      }

      return this
    },
    prop: function(attr, val) {
      var type = typeof(attr)

      if(type === 'string') {
        if(typeof val !== 'undefined') {
          this.each(function () {
            this[attr] = val
          })
        } else {
          return this[0][attr]
        }
      } else if(type === 'object') {
        for(var key in attr) {
          this.prop(key, attr[key])
        }
      }

      return this
    },
    removeAttr: function (attr) {
      var type = typeof(attr)
      if(type === 'undefined') return

      var attrArray = attr.split(/s/g)

      this.each(function(o) {
        Sl.Each(attrArray, function (a) {
          o.removeAttribute(a)
        })
      })

      return this
    },
    index: function(str) {
      var type = typeof(str)
      var index = -1

      if(this.length === 0) return index

      if(type === 'object') {
        if(str instanceof Sl) {
          this.each(function (v, i) {
            if(this === str[0]) {
              index = i
              return false
            }
          })
        } else {
          this.each(function (v, i) {
            if(v === str) {
              index = i
              return false
            }
          })
        }
      } else if (type === 'string') {
        // 后者索性前者
        var o = Sl(str)

        that = this[0]
        o.each(function (v,i) {
          if(v === that) {
            index = i
            return false
          }
        })
      } else if (type === 'undefined') {
        Sl.Each(this[0].parentNode.children, function(v, i) {
          if(v === this) {
            index = i
            return false
          }
        }, this[0])
      }

      return index
    },
    /*  
    * attr 属性值（json格式的对象）
    * time 时间相关（json格式的对象）duration delay timingFn timingType
    * callback 回调函数
    */
    animation: function (attr, time, callback) {
      var Tween = {
        Linear: function (t, b, c, d) {
          return c * t / d + b;
        },
        Quad: {
          easeIn: function (t, b, c, d) {
            return c * (t /= d) * t + b;
          },
          easeOut: function (t, b, c, d) {
            return -c * (t /= d) * (t - 2) + b;
          },
          easeInOut: function (t, b, c, d) {
            if ((t /= d / 2) < 1) return c / 2 * t * t + b;
            return -c / 2 * ((--t) * (t - 2) - 1) + b;
          },
        },
        Sine: {
          easeIn: function (t, b, c, d) {
            return -c * Math.cos(t / d * (Math.PI / 2)) + c + b;
          },
          easeOut: function (t, b, c, d) {
            return c * Math.sin(t / d * (Math.PI / 2)) + b;
          },
          easeInOut: function (t, b, c, d) {
            return -c / 2 * (Math.cos(Math.PI * t / d) - 1) + b;
          }
        },
        Bounce: {
          easeIn: function (t, b, c, d) {
            return c - Tween.Bounce.easeOut(d - t, 0, c, d) + b;
          },
          easeOut: function (t, b, c, d) {
            if ((t /= d) < (1 / 2.75)) {
              return c * (7.5625 * t * t) + b;
            } else if (t < (2 / 2.75)) {
              return c * (7.5625 * (t -= (1.5 / 2.75)) * t + .75) + b;
            } else if (t < (2.5 / 2.75)) {
              return c * (7.5625 * (t -= (2.25 / 2.75)) * t + .9375) + b;
            } else {
              return c * (7.5625 * (t -= (2.625 / 2.75)) * t + .984375) + b;
            }
          },
          easeInOut: function (t, b, c, d) {
            if (t < d / 2) {
              return Tween.Bounce.easeIn(t * 2, 0, c, d) * .5 + b;
            } else {
              return Tween.Bounce.easeOut(t * 2 - d, 0, c, d) * .5 + c * .5 + b;
            }
          }
        }
      };
      var goTime = new Date()
      var startValue = {}
      var timingFn = Tween.Linear
      var timingTypes = ['easeIn','easeOut','easeInOut']

      if(time.timingFn && time.timingType) {
        (Tween[timingFn][timingTypes[time.timingType]]) && (timingFn = Tween[time.timingFn][timingTypes[time.timingType]])
      }

      this.each(function (ele, i) {
        for(var key in attr) {
          if(typeof attr[key] === 'object') {
            /*
           *.start : function(key){ ruturn{start : , change : }} 初始化
           *.up : fucntion(startValue,now,duration,key,timingFn){} 更新函数
           */
            startValue[key] = attr[key].up.bind(ele, attr[key].start.call(ele, key))
          } else {
            var start = parseFloat(this.css(key))
            var change = parentFloat(att[key] - start)

            if(change !== 0) {
              startValue[key] = {
                start: start,
                change: change
              }
            }
          }
        }

        cancelAnimationFrame(ele.animaTimer)

        // 存在延迟 且需要更新goTime
        if(time.delay) {
          (function delay() {
            if(new Date().getTime - goTime >= time.delay) {
              goTime = new Date()
              move()
            } else {
              ele.animaTimer = requestAnimationFrame(delay)
            }
          })()
        } else {
          goTime = new Date()
          move()
        }

        function move() {
          var now = new Date().getTime() - goTime

          if(now / time.duration >= 1) {
            now = time.duration
            _setStyle(ele, startValue, now, time.duration)
            callback && callback.call(ele)
          } else {
            _setStyle(ele, startValue, now, time.duration)
            requestAnimationFrame(move)
          }

        }

        // attr就是传进来的 startValue
        function _setStyle(ele, attr, now, duration, timingFn) {
          for(var key in attr) {
            if(typeof attr[key] === 'function') {
              attr[key](now, duration, key, timingFn)
            } else {
              var em = ''

              if(/width|height|top|right|bottom|left/i.test(attr[key])) {
                !isNaN(attr[key] / 1) && (em = 'px')
              }
              ele.style[key] = timinFn(now, attr[key].start, attr[key].change, duration) + em
            }
          }
        }


      })
    }

  }

  Sl.prototype.init.prototype = Sl.prototype

  ;(function (window) {
    var done = false
    var init = function() {
      if(!done) {
        done = true

        Sl.Each(domReadyEvents, function (v) {
          // domReady事件可以继续使用Sl库
          v(Sl)
        })

        domReadyEvents.length = 0
      }
    }
    // 监听dom结构
    Sl(document).one('DOMContentLoaded', init)

    // 兼容IE
    f()
    function f() {
      try {
        document.documentElement.doScroll()
      } catch(e) {
        setTimeout(f)
        return 
      }

      init()
    }

    // 进一步确保
    document.onreadystatechange = function () {
      if(document.readyState === 'complete') {
        document.onreadystatechange = null
        init()
      }
    }
    window.onload = function () {
      window.onload = null
      init()
    }
  })(window)

  window.$ = Sl
})(window)