var domUtils = {}
/**
 * 获取节点属性
 */
domUtils.getAttributes = function (elem) {
  var attr = {}
  var attrs = elem.attributes

  for (var i = 0; i < attrs.length; i++) {
    var n = attrs[i]

    var key = n.nodeName || n.name
    var val = n.nodeValue // relay on $.fn.attr, it makes some filtering and checks

    if (val !== undefined && val !== false) {
      attr[key] = val
    }
  }

  return attr
}

// 根据标签名获取标签中内容
domUtils.getTagContent = function (str, tagName) {
  var reg = new RegExp('<(' + tagName + ')[^>]*>([^<]+)<\\/\\1\\s*>', 'g')

  var result = null
  var contents = []
  while (reg.exec(str)) {
    // 获得单独li下的内容,可以对这个字串做其他处理,然后再放入数组
    var content = RegExp.$2
    contents.push(content)
  }
  if (contents.length > 0) {
    result = contents[0]
  }

  return result
}

// 根据标签名获取标签中内容
domUtils.getAttrContent = function (str, tagName, attrName) {
  var reg = new RegExp('<' + tagName + '[^<>]*?\\s' + attrName + "=['\"]?(.*?)['\"]?[\\s|$>]", 'g')

  var result = null
  var contents = []

  if (reg.exec(str)) {
    var content = RegExp.$1
    contents.push(content)
  }
  if (contents.length > 0) {
    result = contents[0]
  }

  return result
}

/*
 * 两个节点是否存在包含关系？domA是否是包含domB？或者说，domB是否是domA的子节点
 * domA可以是一个dom对象，也可以是一个数组
 * domB,是一个单个dom对象，也就是要比较的对象
 */
domUtils.isContains = function (domA, domB, debug = false) {
  if (!domB) {
    return false
  }

  if (!domA) {
    return false
  }

  // 目标数组
  // 无论domA传进来的是数组还是单个dom，都整合到数组里，统一处理
  var domArr = [].concat(domA)

  domArr = domArr.filter((dom) => {
    return !!dom
  })

  if (debug) {
    console.log('点及其他地方隐藏！')
    console.log(domA)
    console.log(domB)
  }

  // 判断两者是否相等
  for (let item of domArr) {
    if (item === domB) {
      return true
    }
  }

  // 判断是否是根元素
  for (let item of domArr) {
    if (item.nodeType && item.nodeType === 9) {
      return true
    }
  }

  // 如果支持contains
  // contains 方法支持情况：chrome+ firefox9+ ie5+, opera9.64+(估计从9.0+),safari5.1.7+
  if (document.contains) {
    for (let item of domArr) {
      if (item.contains(domB)) {
        return true
      }
    }
    return false
  } else
    // firefox只支持compareDocumentPosition，且compareDocumentPosition返回的是一个2进制的数值，其中16是包含关系
    if (document.compareDocumentPosition) {
      for (let item of domArr) {
        if (item.compareDocumentPosition(domB) === 16) {
          return true
        }
      }
      return false
    }

  // 如果前两者都不支持，那么就手动遍历
  for (let item of domArr) {
    if (sameDom(item, domArr)) {
      return true
    }
  }
  return false

  function sameDom (domA, domB) {
    // body...
    while (domB !== undefined && domB != null && domB.tagName.toUpperCase() !== 'BODY' && domB.tagName.toUpperCase() !== 'HTML') {
      if (domA === domB) {
        return true
      }
      domB = domB.parentNode
    }
  }
}

// 添加监听事件
domUtils.addEvent = function (dom, type, fn) {
  if (dom.attachEvent) {
    dom['e' + type + fn] = fn
    dom[type + fn] = function () {
      dom['e' + type + fn](window.event)
    }
    dom.attachEvent('on' + type, dom[type + fn])
  } else {
    dom.addEventListener(type, fn, false)
  }
}

// 移除监听事件
domUtils.removeEvent = function (dom, type, fn) {
  if (dom.detachEvent) {
    dom.detachEvent('on' + type, dom[type + fn])
    dom[type + fn] = null
  } else {
    dom.removeEventListener(type, fn, false)
  }
}

// 获取dom在页面中的绝对位置,
domUtils.getElementAbsPosition = function (targetEle) {
  var left = targetEle.offsetLeft
  var top = targetEle.offsetTop
  var thisParent = null

  while (targetEle.offsetParent != null) {
    thisParent = targetEle.offsetParent

    left += thisParent.offsetLeft // Add parent top position
    top += thisParent.offsetTop // Add parent top position

    targetEle = thisParent
  }
  return {
    left: left,
    top: top
  }
}

/*
    获取子父dom的绝对位置
*/
domUtils.getElementAbsPositionRelativelyParent = function (targetEle, parentNode) {
  var left = targetEle.offsetLeft
  var top = targetEle.offsetTop
  var thisParent = null

  while (targetEle.offsetParent !== parentNode) {
    thisParent = targetEle.offsetParent

    left += thisParent.offsetLeft // Add parent top position
    top += thisParent.offsetTop // Add parent top position

    targetEle = thisParent
  }
  return {
    left: left,
    top: top
  }
}

// 获取图片的原始大小
domUtils.getImgOriginSize = function (url, next) {
  var image = new Image()
  image.src = url

  image.onload = function () {
    next(null, {
      width: image.width,
      height: image.height
    })
  }

  image.onload = function (err) {
    next(err)
  }
}
export default domUtils
