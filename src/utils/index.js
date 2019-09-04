/**
 * 处理时间，转码
 */
/* 时间戳转换相应格式 */
export function parseTime (time, cFormat) {
  if (arguments.length === 0) {
    return null
  }
  const format = cFormat || '{y}-{m}-{d} {h}:{i}:{s}'
  let date
  if (typeof time === 'object') {
    date = time
  } else {
    if (('' + time).length === 10) time = parseInt(time) * 1000
    date = new Date(time)
  }
  const formatObj = {
    y: date.getFullYear(),
    m: date.getMonth() + 1,
    d: date.getDate(),
    h: date.getHours(),
    i: date.getMinutes(),
    s: date.getSeconds(),
    a: date.getDay()
  }
  const timeStr = format.replace(/{(y|m|d|h|i|s|a)+}/g, (result, key) => {
    let value = formatObj[key]
    if (key === 'a') return ['一', '二', '三', '四', '五', '六', '日'][value - 1]
    if (result.length > 0 && value < 10) {
      value = '0' + value
    }
    return value || 0
  })
  return timeStr
}


/* 时间戳转换相应格式(2) */
export function formatTime (time, option) {
  //time = +time * 1000
  const d1 = new Date(time)
  const d = d1.getTime(d1)
  const now = Date.now()
   //console.log(time)
  // console.log(now)
  const diff = (now - d) / 1000
  if (diff < 30) {
    return '刚刚'
  } else if (diff < 3600) { // less 1 hour
    return Math.ceil(diff / 60) + '分钟前'
  } else if (diff < 3600 * 24) {
    return Math.floor(diff / 3600) + '小时前'
  } else if (diff < 3600 * 24 * 2) {
    return '1天前'
  }else{
    return parseTime(time)
  }
  // if (option) {
  //   return parseTime(time, option)
  // } else {
  //   return d.getMonth() + 1 + '月' + d.getDate() + '日' + d.getHours() + '时' + d.getMinutes() + '分'
  //
  // }
}

//转换秒为00:00:00
export function secondToDate (result) {
  var h = Math.floor(result / 3600) < 10 ? '0'+Math.floor(result / 3600) : Math.floor(result / 3600);
  var m = Math.floor((result / 60 % 60)) < 10 ? '0' + Math.floor((result / 60 % 60)) : Math.floor((result / 60 % 60));
  var s = Math.floor((result % 60)) < 10 ? '0' + Math.floor((result % 60)) : Math.floor((result % 60));
  return result = h + ":" + m + ":" + s;
}

//秒数转换为时分秒
export function formatSeconds(value) {
    var theTime = parseInt(value);// 秒
    var middle= 0;// 分
    var hour= 0;// 小时

    if(theTime > 60) {
        middle= parseInt(theTime/60);
        theTime = parseInt(theTime%60);
        if(middle> 60) {
            hour= parseInt(middle/60);
            middle= parseInt(middle%60);
        }
    }
    var result = ""+parseInt(theTime)+"秒";
    if(middle > 0) {
        result = ""+parseInt(middle)+"分"+result;
    }
    if(hour> 0) {
        result = ""+parseInt(hour)+"小时"+result;
    }
    return result;
}


/* 格式化时间 */
export function getQueryObject (url) {
  url = url == null ? window.location.href : url
  const search = url.substring(url.lastIndexOf('?') + 1)
  const obj = {}
  const reg = /([^?&=]+)=([^?&=]*)/g
  search.replace(reg, (rs, $1, $2) => {
    const name = decodeURIComponent($1)
    let val = decodeURIComponent($2)
    val = String(val)
    obj[name] = val
    return rs
  })
  return obj
}

/* 获取字节长度 */
export function getByteLen (val) {
  let len = 0
  for (let i = 0; i < val.length; i++) {
    if (val[i].match(/[^\x00-\xff]/ig) != null) {
      len += 1
    } else { len += 0.5 }
  }
  return Math.floor(len)
}
/* 拷贝数组 */
export function cleanArray (actual) {
  const newArray = []
  for (let i = 0; i < actual.length; i++) {
    if (actual[i]) {
      newArray.push(actual[i])
    }
  }
  return newArray
}
/* 拷贝数组 */
export function param (json) {
  if (!json) return ''
  return cleanArray(Object.keys(json).map(key => {
    if (json[key] === undefined) return ''
    return encodeURIComponent(key) + '=' + encodeURIComponent(json[key])
  })).join('&')
}
/* 编码 */
export function param2Obj (url) {
  const search = url.split('?')[1]
  if (!search) {
    return {}
  }
  return JSON.parse('{"' + decodeURIComponent(search).replace(/"/g, '\\"').replace(/&/g, '","').replace(/=/g, '":"') + '"}')
}
  /* 新建文本 */
export function html2Text (val) {
  const div = document.createElement('div')
  div.innerHTML = val
  return div.textContent || div.innerText
}
/*
合并两个对象,
给出最后一个优先级
*/
export function objectMerge (target, source) {
  if (typeof target !== 'object') {
    target = {}
  }
  if (Array.isArray(source)) {
    return source.slice()
  }
  for (const property in source) {
    if (source.hasOwnProperty(property)) {
      const sourceProperty = source[property]
      if (typeof sourceProperty === 'object') {
        target[property] = objectMerge(target[property], sourceProperty)
        continue
      }
      target[property] = sourceProperty
    }
  }
  return target
}
/* 滚动到指定位置 */
export function scrollTo (element, to, duration) {
  if (duration <= 0) return
  const difference = to - element.scrollTop
  const perTick = difference / duration * 10
  setTimeout(() => {
    element.scrollTop = element.scrollTop + perTick
    if (element.scrollTop === to) return
    scrollTo(element, to, duration - 10)
  }, 10)
}
/* 添加样式 */
export function toggleClass (element, className) {
  if (!element || !className) {
    return
  }
  let classString = element.className
  const nameIndex = classString.indexOf(className)
  if (nameIndex === -1) {
    classString += '' + className
  } else {
    classString = classString.substr(0, nameIndex) + classString.substr(nameIndex + className.length)
  }
  element.className = classString
}

export const pickerOptions = [{
  text: '今天',
  onClick (picker) {
    const end = new Date()
    const start = new Date(new Date().toDateString())
    end.setTime(start.getTime())
    picker.$emit('pick', [start, end])
  }
}, {
  text: '最近一周',
  onClick (picker) {
    const end = new Date(new Date().toDateString())
    const start = new Date()
    start.setTime(end.getTime() - 3600 * 1000 * 24 * 7)
    picker.$emit('pick', [start, end])
  }
}, {
  text: '最近一个月',
  onClick (picker) {
    const end = new Date(new Date().toDateString())
    const start = new Date()
    start.setTime(start.getTime() - 3600 * 1000 * 24 * 30)
    picker.$emit('pick', [start, end])
  }
}, {
  text: '最近三个月',
  onClick (picker) {
    const end = new Date(new Date().toDateString())
    const start = new Date()
    start.setTime(start.getTime() - 3600 * 1000 * 24 * 90)
    picker.$emit('pick', [start, end])
  }
}]

export function getTime (type) {
  if (type === 'start') {
    return new Date().getTime() - 3600 * 1000 * 24 * 90
  } else {
    return new Date(new Date().toDateString())
  }
}

export function debounce (func, wait, immediate) {
  let timeout, args, context, timestamp, result

  const later = function () {
  // 据上一次触发时间间隔
    const last = +new Date() - timestamp

  // 上次被包装函数被调用时间间隔last小于设定时间间隔wait
    if (last < wait && last > 0) {
      timeout = setTimeout(later, wait - last)
    } else {
      timeout = null
      // 如果设定为immediate===true，因为开始边界已经调用过了此处无需调用
      if (!immediate) {
        result = func.apply(context, args)
        if (!timeout) context = args = null
      }
    }
  }
  return function (...args) {
    context = this
    timestamp = +new Date()
    const callNow = immediate && !timeout
    // 如果延时不存在，重新设定延时
    if (!timeout) timeout = setTimeout(later, wait)
    if (callNow) {
      result = func.apply(context, args)
      context = args = null
    }

    return result
  }
}
/* 深度拷贝 */
export function deepClone (source) {
  if (!source && typeof source !== 'object') {
    throw new Error('error arguments', 'shallowClone')
  }
  const targetObj = source.constructor === Array ? [] : {}
  for (const keys in source) {
    if (source.hasOwnProperty(keys)) {
      if (source[keys] && typeof source[keys] === 'object') {
        targetObj[keys] = source[keys].constructor === Array ? [] : {}
        targetObj[keys] = deepClone(source[keys])
      } else {
        targetObj[keys] = source[keys]
      }
    }
  }
  return targetObj
}

/* Tree树形结构列表展示高度自适应 */
export function TreeHeight () {
  let height = document.documentElement.clientHeight
  let treeFormBox = document.getElementsByClassName('treeFormBox')[0]
  let depLeftContent = document.getElementsByClassName('depLeftContent')[0]
  let filterTree = document.getElementsByClassName('filter-tree')[0]
  treeFormBox.style.height = (height - 125) + 'px'
  depLeftContent.style.height = (height - 185) + 'px'
  filterTree.style.height = (height - 200) + 'px'
}
/* Tree树形结构列表展示高度自适应 */
export function TreeHeight2 () {
  let height = document.documentElement.clientHeight
  let treeForm = document.getElementsByClassName('treeForm')[0]
  let treeFormB = treeForm.getElementsByClassName('treeForm-b')[0]
  let filterTree = document.getElementsByClassName('filter-tree')[0]
  treeForm.style.height = (height - 125) + 'px'
  treeFormB.style.height = (height - 185) + 'px'
  filterTree.style.height = (height - 200) + 'px'
}

/* 判断对象obj是否存在s属性 */
export function isSet (s, obj) {
  let n, arr, o
  if (typeof s === 'string') {
    arr = s.split('.')
    o = obj
    for (n = 0; n < arr.length; n += 1) {
      if (o[arr[n]] === undefined || o[arr[n]] === null) {
        return false
      } else {
        o = o[arr[n]]
      }
    }
    return true
  }
  throw new Error('Missing or invalid argument passed to isSet')
}

/* 判断是否为空 */
export function isEmpty (obj) {
  switch (typeof obj) {
    case 'undefined':
      return true
    case 'string':
      return (obj.trim().length === 0)
    case 'object':
      if (Array.isArray(obj)) {
        return (obj.length === 0)
      } else if (obj === undefined) {
        return true
      } else if (obj === null) {
        return true
      } else if (Object.keys(obj).length === 0) {
        return true
      }
      break
    case 'number':
      if (isNaN(obj)) {
        return true
      }
      break
  }
}

// 合并多个数组，去重
export function concatArr (arr1, arr2, arr3) {
  if (arguments.length <= 1) {
    return false
  }
  var concat_ = function (arr1, arr2) {
    var arr = arr1.concat()
    for (var i = 0; i < arr2.length; i++) {
      if (arr.indexOf(arr2[i]) === -1) {
        arr.push(arr2[i])
      }
    }
    return arr
  }
  var result = concat_(arr1, arr2)
  for (var i = 2; i < arguments.length; i++) {
    result = concat_(result, arguments[i])
  }
  return result
}
export function cutOutDate (date) {
    // date = "字符串"+20161010
    let time  = date.substr(date.length-8); //获取最后八位 20101010
    let yue = time.slice(4);
    let yy = time.substr(0, 4); //获取年份 2011
    let mm = yue.substr(0, 2); //获取年份 06
    let dd = time.slice(6);// 获取日期 13
    return yy+'-'+mm +'-'+dd
}
//随机生成uuid唯一标识码
export function uuid() {
    var s = [];
    var hexDigits = "0123456789abcdef";
    for (var i = 0; i < 36; i++) {
        s[i] = hexDigits.substr(Math.floor(Math.random() * 0x10), 1);
    }
    s[14] = "4";  // bits 12-15 of the time_hi_and_version field to 0010
    s[19] = hexDigits.substr((s[19] & 0x3) | 0x8, 1);  // bits 6-7 of the clock_seq_hi_and_reserved to 01
    s[8] = s[13] = s[18] = s[23] = "-";

    var uuid = s.join("");
    return uuid;
}

export function guid () {
  let uid = uuid()
  let gid = uid.replace(/-/g, '')

  return gid
}
