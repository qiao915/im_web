// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import router from './router'
import ElementUI from 'element-ui'
import 'element-ui/lib/theme-chalk/index.css'
import './assets/common.css' // 修改element-ui框架样式
import Validator from 'vue-validator'
import axios from 'axios'
import Loading from './components/Loading'
import stores from './store/'
import filters from './filters'
import Cookies from 'js-cookie'
import qrcode from 'qrcode'
import VueClipboard from 'vue-clipboard2'
import params from './tools/params'
import $ from 'jquery'
import jQuery from 'jquery'
import Utils from './method'
import Eumn from './Eumn/Enum.js'
import cfg from './cfg.js'


import '..//static/css/common/reset.css'
import '..//static/css/common/common.css'
import '..//static/css/common/base.css'

import md5 from 'js-md5'
// 无限滚动
import vueiInfinite from 'vue-infinite-scroll'

Vue.use(vueiInfinite)

Vue.prototype.Enum = Vue.prototype.$Enum = Eumn // 在模板中使用定义枚举
Vue.prototype.Utils = Vue.prototype.$Utils = Utils // 在模板中使用
Vue.prototype.cfg = Vue.prototype.$cfg = cfg

window.$ = window.jQuery = $

// 路由过滤
router.beforeEach((to, from, next) => {
  // 404
  if (to.name == null) {
    router.replace({
      name: 'NotFound'
    })
  }

  // 不需要登陆的白名单name
  let whutelist = ['login', 'loginByToken', 'test']

  // 需要登陆
  if (whutelist.indexOf(to.name) === -1) {
    // is logined
    if (cfg.userInfo && cfg.token) {
      return next()
    }

    // auto login
    if (cfg.token) {
      router.replace({
        name: 'loginByToken',
        query: {
          token: cfg.token
        }
      })

      cfg.lastUrl = to.fullPath

      return
    }

    if (cfg.authSource && cfg.authSource.login_url) {
      window.location.href = cfg.authSource.login_url
    } else {
      // login
      router.replace({
        name: 'login'
      })
    }
  }
  next()
})

// 加载过滤器
Object.keys(filters).forEach(key => Vue.filter(key, filters[key]))

Vue.use(ElementUI) // ui框架
Vue.use(Loading)
Vue.use(qrcode) // 生成二维码
Vue.use(VueClipboard) // 复制到粘贴板
Vue.use(Validator) // 验证器
// 设置语言
let locale = (function () {
  if (Cookies.get('locale')) return Cookies.get('locale')

  if (/en/i.test(navigator.language)) {
    return 'en'
  } else if (/tw/i.test(navigator.language)) {
    return 'tw'
  } else {
    return 'zh'
  }
})()

const clearInnerHeader = function (headers) {
  let keys = Object.keys(headers).filter((key) => {
    return key.startsWith('inner-')
  })

  keys.forEach((key) => {
    delete headers[key]
  })
}

Vue.prototype.locale = locale

let axiosInstance = axios.create({
  baseURL: '/',
  headers: {
    'locale': locale,
    'Content-Type': 'application/x-www-form-urlencoded'
  }
})

let get = axiosInstance.get
axiosInstance.get = function (url, data = {}, config = {}) {
  if (typeof data === 'string') {
    return get(url + '?' + data, config)
  } else {
    let query = params(data)
    if (query) {
      return get(url + '?' + query, config)
    } else {
      return get(url, config)
    }
  }
}

// axios的一些配置，比如发送请求显示loading，请求回来loading消失之类的
axiosInstance.interceptors.request.use(function (config) { // 配置发送请求的信息

  // console.log(cfg)
  let token = cfg.token
  if (token) {
    config.headers['access-token'] = token
  }

  let url = '/api/im/chat/uploadFileFromWeb.do'
  if(config.url == url){
    //  上传接口不走签名加密
  }else{
    let paramObj  = {};
    let noWxGm,memberNoGm;
    // 外层加上两个参数
    if(cfg.nowSelectInfo){
      noWxGm = cfg.nowSelectInfo.noWx
      paramObj.noWxGm = noWxGm
    }
    if(cfg.userInfo){
      memberNoGm = cfg.userInfo.memberNoGuid
      paramObj.memberNoGm = memberNoGm
      paramObj.merchantNo = cfg.userInfo.memberNoMerchant
    }

    Object.assign(paramObj, config.params || {}, config.data || {} );
    //console.log(paramObj)
    let paramJson = JSON.stringify(paramObj);

    //信息加密
    let timestamp  = new Date().getTime() //时间撮
    let salt = "013cXuH9vf584W0x"   //盐值
    let signature = md5(md5(paramJson) + timestamp + salt);//签名

     config.data = {}
     config.params = {}
    if(config.method=='post'){
            config.data = {
              ...config.data,
              token: token,
              signature: signature,
              timestamp: timestamp,
              paramJson: paramJson,
              noWxGm:noWxGm,
              memberNoGm:memberNoGm,

            }
        //  在请求之前将data进行序列化，序列化的函数使用jQuery ajax 的param()方法
        //  或使用qs.stringify()方法
        config.data = $.param(config.data);

      }else if(config.method=='get'){
        config.params = {
          ...config.params,
          token: token,
          signature: signature,
          timestamp: timestamp,
          paramJson: paramJson,
          noWxGm:noWxGm,
          memberNoGm:memberNoGm,

        }
      }
  }


  //clearInnerHeader(config)
  return config
}, function (error) {
  return Promise.reject(error)
})

axiosInstance.interceptors.response.use(function (response) { // 配置请求回来的信息
  // stores.dispatch('hideLoading')
  return response
}, function (error) {
  stores.dispatch('hideLoading')

  if (error.response && error.response.data.code === 401) {
    Vue.prototype.delUserInfo()
    Utils.Logback()
    // 禁止多浏览器同时登录
    // router.push({path:'/Login'})
    // 未登录路由重定向
    stores.dispatch('no_login', true)

  }

  return Promise.reject(error)
})

/*axios.defaults.baseURL = (process.env.NODE_ENV !=='production' ? config.dev.httpUrl:config.build.httpUrl);
axios.defaults.headers.post['Content-Type'] = 'application/x-www-form-urlencoded'; */
// axios.defaults.baseURL='http://localhost:8082/';
Vue.prototype.$http = axiosInstance // 其他页面在使用axios的时候直接  this.$http就可以了

Vue.prototype.$showPopOperating = function (name, {
  propsData,
  closeFun = () => {},
  completeFun = () => {}
}) {
  this.$store.dispatch('showPopOperating', {
    name, // 组件名称
    propsData, // 传组件数据
    closeFun,
    completeFun
  })
}

//置空
Vue.prototype.$hidePopOperating = function () {
  this.$store.dispatch('showPopOperating', {
    name: '',
    propsData: null,
    closeFun: () => {},
    completeFun: () => {}
  })
}

Vue.prototype.localStorage = localStorage

Vue.prototype.stores = stores

Vue.config.productionTip = false
/* eslint-disable no-new */
let app = new Vue({
  el: '#app',
  router,
  store: stores,
  render: h => h(App)
})
;(function ($) {
  var defaults = {
    text: '正在加载···',
    success: function () {
    },
    limitTop: 30
  };
  var PullUp = function (elem, options) {
    this.flag = true;
    this.init(elem, options);
  };
  PullUp.prototype = {
    init(elem, options) {
      this.scroll(elem, options);
    },
    scroll(elem, options) { // 滚动事件监听
      var self = this;
      !options.prohibitBackTop ? elem.scrollTop(0) : '';
      elem.off('scroll');
      elem.on('scroll', () => {
        var dH = elem[0].scrollHeight; // 滚动区域的高度
        var sT = elem.scrollTop(); // 滚动高度
        var wH = document.documentElement.clientHeight; // 是土矿口的高度
        if (dH - sT - wH <= options.limitTop && self.flag && elem.scrollTop() != 0) {
          self.flag = false;
          options.success(self);
        }
      });
    }
  };
  $.fn.MHPullUp = function (options) {
    new PullUp(this, $.extend({}, defaults, options));
  }
})(jQuery);




window.app = app
