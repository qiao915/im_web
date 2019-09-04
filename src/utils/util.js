var MM_EMOTICON_WEB = '_web'
var RES_IMG_PLACEHOLDER = ASSET_PATH + 'static/js/emoji/img/spacer.gif'
var c = '(\\s|\\n|<br>|^)(http(s)?://.)?(www\\.)?[-a-zA-Z0-9@:%._\\+~#=]{2,256}\\.[a-z]{2,6}\\b([-a-zA-Z0-9@:%_\\+.~#?(&|&amp;)//=]*)'

var f = {
  isLog: !1,
  log: function () {
    this.isLog && void 0
  },
  now: function () {
    return +new Date()
  },
  getCookie: function (e) {
    for (var t = e + '=',
      a = document.cookie.split(';'), n = 0; n < a.length; n++) {
      for (var i = a[n];
        i.charAt(0) === ' ';) i = i.substring(1)
      if (i.indexOf(t) !== -1) return i.substring(t.length, i.length)
    }
    return ''
  },
  setCookie: function (e, t, a) {
    var n = new Date()
    n.setTime(n.getTime() + 24 * a * 60 * 60 * 1e3)
    var i = 'expires=' + n.toUTCString()
    document.cookie = e + '=' + t + '; ' + i
  },
  clearCookie: function () {
    for (var e = document.cookie.split(';'), t = 0; t < e.length; t++) {
      var a = e[t]
      var n = a.indexOf('=')
      var i = n > -1 ? a.substr(0, n) : a

      document.cookie = i + '=;expires=Thu, 01 Jan 1970 00:00:00 GMT'
    }
  },
  getLocalStorage: function () {
    return window.localStorage || {
      getItem: function (e) { },
      setItem: function (e, t) { },
      removeItem: function (e) { },
      key: function (e) {
        return ''
      }
    }
  },
  isString: function (e) {
    return typeof e === 'string'
  },
  htmlEncode: function (e) {
    return this.isString(e) ? e.replace(/&/g, '&amp;').replace(/"/g, '&quot;').replace(/'/g, '&#39;').replace(/</g, '&lt;').replace(/>/g, '&gt;') : ''
  },
  htmlDecode: function (e) {
    return e && e.length !== 0 ? e.replace(/&lt;/g, '<').replace(/&gt;/g, '>').replace(/&#39;/g, "'").replace(/&quot;/g, '"').replace(/&amp;/g, '&') : ''
  },
  hrefEncode: function (e) {
    var t = this
    var a = e.match(/&lt;a href=(?:'|").*?(?:'|").*?&gt;.*?&lt;\/a&gt;/g)

    if (a) {
      for (var n, i, o = 0, r = a.length; o < r; ++o) {
        n = /&lt;a href=(?:'|")(.*?)(?:'|").*?&gt;.*?&lt;\/a&gt;/.exec(a[o])
        n && n[1] && (i = n[1], t.isUrl(i) && (e = e.replace(n[0], this.htmlDecode(n[0])).replace(n[1], f.genCheckURL(n[1]))))
      }
      return e
    }
    return e.replace(new RegExp(c, 'ig'),
            function () {
              return '<a target="_blank" href="' + f.genCheckURL(arguments[0].replace(/^(\s|\n)/, '')) + '">' + arguments[0] + '</a>'
            })
  },
  clearHtmlStr: function (e) {
    return e ? e.replace(/<[^>]*>/g, '') : e
  },
  clearLinkTag: function (e) {
    return e
  },
  isUrl: function (e) {
    return new RegExp(c, 'i').test(e)
  },
  formatNum: function (e, t) {
    var a = (isNaN(e) ? 0 : e).toString()
    var n = t - a.length
    return n > 0 ? [new Array(n + 1).join('0'), a].join('') : a
  },
  getServerTime: function (e) {
    return (new Date()).getTime()
  },
  browser: (function () {
    var e = navigator.userAgent.toLowerCase()
    var t = e

    if (t.match(/trident/) != null) {
      e = {
        browser: 'msie',
        version: t.match(/msie ([\d.]+)/) != null ? t.match(/msie ([\d.]+)/)[1] : t.match(/rv:([\d.]+)/)[1]
      }
    } else {
      var a = /(msie) ([\w.]+)/.exec(t) || /(chrome)[ /]([\w.]+)/.exec(t) || /(webkit)[ /]([\w.]+)/.exec(t) || /(opera)(?:.*version|)[ /]([\w.]+)/.exec(t) || t.indexOf('compatible') < 0 && /(mozilla)(?:.*? rv:([\w.]+)|)/.exec(t) || []
      e = {
        browser: a[1] || '',
        version: a[2] || '0'
      }
    }

    var n = {}

    e.browser && (n[e.browser] = !0, n.version = e.version)
    n.chrome ? n.webkit = !0 : n.webkit && (n.safari = !0)

    return n
  }()),
  queryParser: function () {
    for (var e = {},
      t = location.search.substring(1), a = t.split('&'), n = 0, i = a.length; n < i; n++) {
      var o = a[n].split('=')
      var r = decodeURIComponent(o[0])
      e[r] = decodeURIComponent(o[1] || '')
    }
    return e
  },
  getSize: function (e) {
    e = +e

    if (e) {
      var t = 10
      var a = 10
      var n = 20
      var i = 1 << a
      var o = 1 << n

      if (e >> n > 0) {
        var r = Math.round(e * t / o) / t
        return '' + r + 'MB'
      }
      if (e >> a - 1 > 0) {
        var c = Math.round(e * t / i) / t
        return '' + c + 'KB'
      }
      return '' + e + 'B'
    }
  },
  encodeEmoji: function (e) {
    e = e || ''
    e = e.replace(/<span class="(emoji emoji[a-zA-Z0-9]+)"><\/span>/g, '###__EMOJI__$1__###')
    return e
  },
  decodeEmoji: function (e) {
    e = e || ''
    e = e.replace(/###__EMOJI__(emoji emoji[a-zA-Z0-9]+)__###/g, '<span class="$1"></span>')
    return e
  },
  removeHtmlStrTag: function (e) {
    e = e || ''
    e = this.encodeEmoji(e)
    e = this.htmlDecode(e)
    e = this.clearHtmlStr(e)
    e = this.decodeEmoji(e)
    return e
  },
  findIndex: function (e, t) {
    for (var a = 0; a < e.length; a++) if (e[a] === t) return a
    return -1
  },
  genEmoticonHTML: function (e, t) {
    return '<img class="' + e + '" text="' + t + (t.indexOf(MM_EMOTICON_WEB) > -1 ? '' : MM_EMOTICON_WEB) + '" src="' + RES_IMG_PLACEHOLDER + '" />'
  },
  isWindows: /windows/gi.test(navigator.userAgent),
  isMacOS: /macintosh/gi.test(navigator.userAgent),
  isIPad: /ipad/gi.test(navigator.userAgent)
}

export default f
