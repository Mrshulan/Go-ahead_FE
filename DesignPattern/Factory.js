/* 
*  定义：
*  用于创建对象的接口，这个接口由子类决定实例哪一个类。
*  使一个类实例化延迟到了子类，而子类可以重写接口方法以便创建自己的对象类型
*  场景：
*  网页里边插入一些元素，而这些元素类型不固定，可以是图片、链接、文本、
*  工厂模式只要接受我们创建的元素类型，其他工厂函数帮助我们处理
*/


// Text元素工厂
class Text {
  constructor(text) {
    this.text = text
  }
  insert(where) {
    const txt = document.createTextNode(this.text)
    where.appendChild(txt)
  }
}

// a标签元素工厂
class Link {
  constructor(url) {
    this.url = url
  }
  insert(where) {
    const link = document.createElement('a')
    link.href = this.url
    link.appendChild(document.createTextNode(this.url))
    where.appendChild(link)
  }
}

// Img元素工厂
class Image {
  constructor(url) {
    this.url = url
  }
  insert(where) {
    const img = document.createElement('img')
    img.src = this.url
    where.appendChild(img)
  }
}

class DomFactory {
  constuctor(type) {
    // 显示的返回该对象指定流水线生产的产品
    return new (this[type]())
  }

  // 各种流水线 在实例的时候构造
  text() {
    return Text
  }
  link() {
    return Link
  }
  image() {
    return Image
  }
}

const textFactory = new DomFactory('text')
const linkFactory = new DomFactory('link')
textFactory.text = 'Hello,I am Jimmie'
textFactory.insert(document.body)
linkFactory.url = "http://mrshulan.com"
linkFactory.insert(document.body)