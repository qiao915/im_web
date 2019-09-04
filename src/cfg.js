import storage from './tools/local_storage'

// 配置文件
export default {
  userInfo: null,
  // 所有的 service info,原数据，数组
  serviceInfoOrigin: null,
  // 所有的 service info，以noWx 为key的对象
  serviceInfo: null,
  // 当前选中的service info
  nowSelectInfo: null,

  // 当前选择的单聊对象信息
  nowSelectChatInfo: null,

  // 当前选择的群聊信息
  nowSelectGroupChatInfo: null,

  // 当前单聊对象的详细信息(包括性别、昵称、电话、标签等)
  chatMemberDetail: null,
  // 用户token
  token: storage.get('accessToken') || '',

  // 最后访问的界面
  lastUrl: '',

  //登陆认证地址
  authSource: storage.get('auth_source'),

  set (key, val) {
    this[key] = val
  },

  get (key) {
    return this[key]
  }
}
