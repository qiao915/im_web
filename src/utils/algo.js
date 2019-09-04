/*
 * 查找排序数组中大于当前值的最小值，并返回此值的索引
 * 例：arr = [1, 3], findBiggerIndex(arr, 0) 返回 0, findBiggerIndex(arr, 2) 返回 1, findBiggerIndex(arr, 3) 返回 2
 */
export function findBiggerIndex (sortedArray, target, compare) {
  let a = 0
  let b = sortedArray.length

  if (!b) {
    return 0
  }

  if (!compare) {
    compare = (a, b) => {
      return a - b
    }
  }

  while (a < b) {
    let m = parseInt((a + b) / 2)
    if (compare(sortedArray[m], target) < 0) {
      a = m + 1
    } else {
      b = m - 1
    }
  }

  let i = a
  if (a > 0 && a < b && compare(sortedArray[a], target) < 0) {
    i = a + 1
  }

  return i
}

// 延时执行 function
export const throttle = function (fn, delay) {
  var now, lastExec, timer, context, args //eslint-disable-line

  var execute = function () {
    fn.apply(context, args)
    lastExec = now
  }

  return function () {
    context = this
    args = arguments

    now = Date.now()

    if (timer) {
      clearTimeout(timer)
      timer = null
    }

    if (lastExec) {
      var diff = delay - (now - lastExec)
      if (diff < 0) {
        execute()
      } else {
        timer = setTimeout(() => {
          execute()
        }, diff)
      }
    } else {
      execute()
    }
  }
}
