let routers = [

  {
    path: '/im-web/',
    name: 'login',
    component: resolve => require(['@/pages/password-login'], resolve)
  },
  {
    path: '/im-web/login',
    name: 'login',
    component: resolve => require(['@/pages/password-login'], resolve)
  },
  {
    path: '/im-web/im/index',
    name: 'loginByToken',
    component: resolve => require(['@/pages/token-login'], resolve)
  },
  {
    path: '/im-web/index',
    name: 'loginByToken',
    component: resolve => require(['@/pages/token-login'], resolve)
  },
  {
    path: '/im-web/test',
    name: 'test',
    component: resolve => require(['@/pages/Test.vue'], resolve)
  },
  {
    path: '/im-web/app/:wxId/',
    name: 'app',
    component: resolve => require(['@/pages/index'], resolve),
    children: [
      // 在联系人面板点击某人后，展示的个人信息
      {
        path: 'user/info/:code/:memberNo/:memberNoGm',
        name: 'userInfo',
        component: resolve => require(['@/components/RightDetail/userInformation'], resolve)
      },

      // 在联系人面板点击我的客户， 展示客户列表
      {
        path: 'myCustomerList/:code/:memberNo/:memberNoGm',
        name: 'myCustomer',
        component: resolve => require(['@/components/RightContent/myCustomer'], resolve)
      },

      // 在僵尸粉列表面板点击我的客户
      {
        path: 'zombieFans/:code/:memberNo/:memberNoGm',
        name: 'myCustomer',
        component: resolve => require(['@/components/RightContent/ZombieCustomer'], resolve)
      },


      // 和单个人聊天
      {
        path: 'user/chat/:code/:memberNoGm/:memberNo',
        name: 'userChat',
        component: resolve => require(['@/components/RightContent/SingleChat.vue'], resolve)
      },

      //群聊聊天
      {
        path: 'group/chat/:roomCode/:chatRoomName/:memberNoGm',
        name: 'groupChat',
        component: resolve => require(['@/components/RightContent/GroupChat.vue'], resolve)
      },

      //群组聊天
      {
        path: 'flock/chat/:roomCode/:pmCode',
        name: 'flockChat',
        component: resolve => require(['@/components/RightContent/FlockChat.vue'], resolve)
      },

      // 查看聊天记录
      {
        path: 'chat/history/:type(user|group)/code/:code/:memberNoGm',
        name: 'chatHistory',
        component: resolve => require(['@/components/history/ChatHistory.vue'], resolve)
      },

      { // 添加人
        path: 'user/add',
        name: 'addFriend',
        component: resolve => require(['@/components/RightDetail/demo'], resolve)
      },

      // 在群聊面板，点击某个群，
      {
        path: 'group/info/:roomCode/:chatRoomName/:memberNoGm',
        name: 'groupInfo',
        component: resolve => require(['@/components/RightDetail/GroupInformation.vue'], resolve)
      },

      // 在群组面板，点击某个大群，显示群组里面分群
      {
        path: 'flock/info/:pmCode/:code',
        name: 'flockInfo',
        component: resolve => require(['@/components/RightDetail/GroupManagement.vue'], resolve)
      },

      // // 多个群聊集合，发消息多个子群会收到
      // {
      //   path: 'assembly/info/:assemblyId',
      //   name: 'assemblyInfo',
      //   component: resolve => require(['@/components/RightDetail/demo'], resolve)
      // },
      //
      // {
      //   path: 'assembly/chat/:chatId',
      //   name: 'assemblyChat',
      //   component: resolve => require(['@/components/RightDetail/demo'], resolve)
      // },

      // 认领客户
      {
        path: 'customer/claim/:memberNoGm',
        name: 'userChatHistory',
        component: resolve => require(['@/components/RightDetail/getCustomer'], resolve)
      },

      // 认领群
      {
        path: 'group/claim/:memberNoGm/:memberNameGm',
        name: 'userChatHistory',
        component: resolve => require(['@/components/RightDetail/getGroup'], resolve)
      },

      // 查看导购下的客户
      {
        path: 'guide/customer/:memberNo',
        name: 'guideCustomer',
        component: resolve => require(['@/components/RightDetail/guide-customer'], resolve)
      },

      // 朋友圈
      // 朋友圈综合动态
      {
        path: 'dynamic/friends/:noWx',
        name: 'otherDynamic',
        component: resolve => require(['@/components/RightDetail/friendsInformation'], resolve)
      },
      // 我的动态
      {
        path: 'dynamic/mine/:noWx',
        name: 'myDynamic',
        component: resolve => require(['@/components/RightDetail/MyCircleInformation'], resolve)
      },
      //某个客户动态
      {
        path: 'dynamic/customer/:memberNo',
        name: 'myDynamic',
        component: resolve => require(['@/components/RightDetail/MyCircleInformation'], resolve)
      },
      // 最新动态详情
      {
        path: 'dynamic/detail/:friendsCode',
        name: 'NewMessageInformation',
        component: resolve => require(['@/components/RightDetail/NewMessageInformation'], resolve)
      }
    ]
  },
  {
    path: '/NotFound',
    name: 'NotFound',
    component: resolve => require(['@/components/common/NotFound'], resolve)
  },
  {
      path: '*',
      redirect: {name: 'loginByToken'}
  }
]

export default routers
