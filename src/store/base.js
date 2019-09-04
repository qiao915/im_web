import * as types from './type'

// base store模块，基础状态管理，基本没有业务逻辑关系的状态存放地
const state = {
  // emoji表情
  emojis: [
    {
      file: '100.gif',
      code: '/::)',
      title: '微笑',
      reg: /\/::\)|\[微笑\]/g
    },
    {
      file: '101.gif',
      code: '/::~',
      title: '伤心',
      reg: /\/::~|\[\]/g
    },
    {
      file: '102.gif',
      code: '/::B',
      title: '美女',
      reg: /\/::B|\[美女\]/g
    },
    {
      file: '103.gif',
      code: '/::|',
      title: '发呆',
      reg: /\/::\||\[发呆\]/g
    },
    {
      file: '104.gif',
      code: '/:8-)',
      title: '得意',
      reg: /\/:8-\)|\[得意\]/g
    },
    {
      file: '105.gif',
      code: '/::<',
      title: '哭',
      reg: /\/::<|\[哭\]/g
    },
    {
      file: '106.gif',
      code: '/::$',
      title: '羞',
      reg: /\/::\$|\[羞\]/g
    },
    {
      file: '107.gif',
      code: '/::X',
      title: '哑',
      reg: /\/::X|\[哑\]/g
    },
    {
      file: '108.gif',
      code: '/::Z',
      title: '睡',
      reg: /\/::Z|\[睡\]/g
    },
    {
      file: '109.gif',
      code: '/::\'(',
      title: '大哭',
      reg: /\/::'\(|\[大哭\]/g
    },
    {
      file: '110.gif',
      code: '/::-|',
      title: '囧',
      reg: /\/::-\||\[囧\]/g
    },
    {
      file: '111.gif',
      code: '/::@',
      title: '怒',
      reg: /\/::@|\[发怒\]/g
    },
    {
      file: '112.gif',
      code: '/::P',
      title: '调皮',
      reg: /\/::P|\[调皮\]/g
    },
    {
      file: '113.gif',
      code: '/::D',
      title: '笑',
      reg: /\/::D|\[呲牙\]/g
    },
    {
      file: '114.gif',
      code: '/::O',
      title: '惊讶',
      reg: /\/::O|\[惊讶\]/g
    },
    {
      file: '115.gif',
      code: '/::(',
      title: '难过',
      reg: /\/::\(|\[难过\]/g
    },
    {
      file: '116.gif',
      code: '/::+',
      title: '酷',
      reg: /\/::\+|\[酷\]/g
    },
    {
      file: '117.gif',
      code: '/:--b',
      title: '汗',
      reg: /\/:--b|\[流汗\]/g
    },
    {
      file: '118.gif',
      code: '/::Q',
      title: '抓狂',
      reg: /\/::Q|\[抓狂\]/g
    },
    {
      file: '119.gif',
      code: '/::T',
      title: '吐',
      reg: /\/::T|\[吐\]/g
    },
    {
      file: '120.gif',
      code: '/:,@P',
      title: '笑',
      reg: /\/:,@P|\[笑\]/g
    },
    {
      file: '121.gif',
      code: '/:,@-D',
      title: '快乐',
      reg: /\/:,@-D|\[快乐\]/g
    },
    {
      file: '122.gif',
      code: '/::d',
      title: '奇',
      reg: /\/::d|\[奇\]/g
    },
    {
      file: '123.gif',
      code: '/:,@o',
      title: '傲',
      reg: /\/:,@o|\[傲\]/g
    },
    {
      file: '124.gif',
      code: '/::g',
      title: '饿',
      reg: /\/::g|\[饿\]/g
    },
    {
      file: '125.gif',
      code: '/:|-)',
      title: '累',
      reg: /\/:\|-\)|\[累\]/g
    },
    {
      file: '126.gif',
      code: '/::!',
      title: '吓',
      reg: /\/::!|\[吓\]/g
    },
    {
      file: '127.gif',
      code: '/::L',
      title: '汗',
      reg: /\/::L|\[汗\]/g
    },
    {
      file: '128.gif',
      code: '/::>',
      title: '高兴',
      reg: /\/::>|\[高兴\]/g
    },
    {
      file: '129.gif',
      code: '/::,@',
      title: '闲',
      reg: /\/::,@|\[闲\]/g
    },
    {
      file: '130.gif',
      code: '/:,@f',
      title: '努力',
      reg: /\/:,@f|\[努力\]/g
    },
    {
      file: '131.gif',
      code: '/::-S',
      title: '骂',
      reg: /\/::-S|\[咒骂\]/g
    },
    {
      file: '133.gif',
      code: '/:,@x',
      title: '秘密',
      reg: /\/:,@x|\[秘密\]/g
    },
    {
      file: '134.gif',
      code: '/:,@@',
      title: '乱',
      reg: /\/:,@@|\[混乱\]/g
    },
    {
      file: '135.gif',
      code: '/::8',
      title: '疯',
      reg: /\/::8|\[疯\]/g
    },
    {
      file: '136.gif',
      code: '/:,@!',
      title: '哀',
      reg: /\/:,@!|\[哀\]/g
    },
    {
      file: '137.gif',
      code: '/:!!!',
      title: '鬼',
      reg: /\/:!!!|\[鬼\]/g
    },
    {
      file: '138.gif',
      code: '/:xx',
      title: '打击',
      reg: /\/:xx|\[打击\]/g
    },
    {
      file: '139.gif',
      code: '/:bye',
      title: 'bye',
      reg: /\/:bye|\[bye\]/g
    },
    {
      file: '142.gif',
      code: '/:handclap',
      title: '鼓掌',
      reg: /\/:handclap|\[鼓掌\]/g
    },
    {
      file: '145.gif',
      code: '/:<@',
      title: '什么',
      reg: /\/:<@|\[什么\]/g
    },
    {
      file: '147.gif',
      code: '/::-O',
      title: '累',
      reg: /\/::-O|\[累\]/g
    },
    {
      file: '153.gif',
      code: '/:@x',
      title: '吓',
      reg: /\/:@x|\[吓\]/g
    },
    {
      file: '155.gif',
      code: '/:pd',
      title: '刀',
      reg: /\/:pd|\[刀\]/g
    },
    {
      file: '156.gif',
      code: '/:<W>',
      title: '水果',
      reg: /\/:<W>|\[水果\]/g
    },
    {
      file: '157.gif',
      code: '/:beer',
      title: '酒',
      reg: /\/:beer|\[酒\]/g
    },
    {
      file: '158.gif',
      code: '/:basketb',
      title: '篮球',
      reg: /\/:basketb|\[篮球\]/g
    },
    {
      file: '159.gif',
      code: '/:oo',
      title: '乒乓',
      reg: /\/:oo|\[乒乓\]/g
    },
    {
      file: '195.gif',
      code: '/:circle',
      title: '跳舞',
      reg: /\/:circle|\[跳舞\]/g
    },
    {
      file: '160.gif',
      code: '/:coffee',
      title: '咖啡',
      reg: /\/:coffee|\[咖啡\]/g
    }
  ],

  // 弹出层
  popOperating: {
    name: '',
    propsData: null,
    closeFun: null,
    completeFun: null
  },

  // 右侧聊天区域
  rightView: null
}

const actions = {
  emojis: ({
    commit
  }) => {
    commit(types.HIDE_LOADING)
  },

  showPopOperating ({ commit, status }, { name, propsData, prospData, closeFun, completeFun }) {
    commit(types.SET_POP_OPERATING, {
      name,
      propsData,
      closeFun,
      completeFun
    })
  },

  showRightView ({ commit, status }, { name, propsData, prospData, closeFun, completeFun }) {
    commit(types.SET_RIGHT_VIEW, {
      name,
      propsData,
      closeFun,
      completeFun
    })
  }
}

const mutations = {}

mutations[types.EMOJIS] = (state, data) => {
  state.emojis = data
}

mutations[types.SET_POP_OPERATING] = (state, data) => {
  state.popOperating = data
}

mutations[types.SET_RIGHT_VIEW] = (state, data) => {
  state.rightView = data
}

const getters = {
  emojis (state) {
    return state.emojis
  },
  popOperating (state) {
    return state.popOperating
  },
  rightView (state) {
    return state.rightView
  }
}

export default {
  name: 'base',
  state,
  actions,
  mutations,
  getters
}
