<template >
  <div class="LeftBar">
    <div class="serviceBox">
      <div class="search_box mt-10">
        <div class="search_border">
          <input type="text" class="searchTh" v-model="searchNickName" placeholder="输入微信昵称">
          <!-- <img src="../../../static/img/search_1.png"> -->
        </div>
      </div>
      <!-- <div class="search_box">
        <div class="search_border">
          <input type="text" class="searchTh" v-model="searchServiceName" placeholder="员工姓名">
          <img src="/static/img/search_1.png" alt="">
        </div>
      </div> -->
      <div class="service_list">
        <ul>
          <li class="serviceDetail" :class="{actived: changeActived == index}"  v-for="(item, index) in filteredData" @click="saveInfo(item,index)" :key="index">
              <img class="serviceImg" :src="item.headAddress" alt="">
              <div class="serviceName"  :class="{red: item.onlineFlag == 0}">
                <span>{{item.wxNickname}}</span>
                <span class="code">{{item.noWx}}</span>
              </div>
              <div class="red" v-if="item.onlineFlag == 0">
                离线
              </div>
              <i class="arrowRight"><img src="../../../static/img/next.png" alt=""></i>
          </li>

        </ul>
      </div>
    </div>
  </div>
</template>

<script>
import { mapGetters} from 'vuex'
import { NOW_SELECT_GUIDE } from '@/store/type'
import storage from '@/tools/local_storage'

export default {
  name: 'LeftBar',
  data(){
    return{
        memberNoGuid:'',//导购助手编号
        memberNoMerchant: '',//商户编号
        changeActived: 0,
        searchNickName: '',   //搜索微信昵称
        searchServiceName: '',//员工姓名
        items:[],
        baseUrl: this.$cfg.userInfo.uploadUrl,

    }
  },
  computed: {
      ...mapGetters([
        'allDevices',
        'serviceInfo',
        'userInfo'
      ]),
      //模糊搜索
      filteredData: function() {
        var self = this;
        var filteredData = []
        if(!self.searchNickName){
          return self.allDevices
        }
        return self.allDevices.filter(function(item) {
           return item.wxNickname.toLowerCase().indexOf(self.searchNickName.toLowerCase()) !== -1;
        })
      },

  },

  watch: {
      userInfo(){
          this.initData();
          console.log('user has change', this.userInfo);

      }
  },

  mounted(){
    let urlParams = storage.get('urlParams')
    this.allDevices.forEach( (item, index)=>{
      if (urlParams.wxId == item.noWx) {
        this.changeActived = index;
        this.$store.commit(NOW_SELECT_GUIDE, item)
        this.$store.dispatch('serviceInfo', item);
        this.$cfg.set('nowSelectInfo', item);
      }

      this.$nextTick( ()=>{
        if (urlParams.addFriends) {
          this.$showPopOperating('AddFriends', {
            closeFun: () => {
              this.$hidePopOperating()
            }
          })

          urlParams.addFriends = false
          //跳转加好友之后设置 false
          storage.put('urlParams', urlParams)
        }
      })

    })

  },
  methods:{
    //切换账号
    saveInfo(items,index){
      // this.$store.commit(NOW_SELECT_GUIDE, [])
      // this.$store.dispatch('serviceInfo', [])
      // this.$cfg.set('nowSelectInfo', []);

      let params = this.$route.params;

      // 将导购信息写入 vuex
      this.$store.commit(NOW_SELECT_GUIDE, items)

      // console.log(items)
      this.changeActived = index;
      this.$store.dispatch('serviceInfo', items);
      this.$cfg.set('nowSelectInfo', items);

      this.$router.replace({
        path: `/im-web/app/${items.noWx}/`
      });
    },

  },


}
</script>

<style lang="less" scoped="">
  .LeftBar{
    width:240px;
    height:100%;
    display: flex;
    box-sizing: border-box;
    background-color: #2e3238;

    .serviceBox{
      width: 100%;
      min-width: 180px!important;
      background-color: #2e3238;
      height: 100%;
      border-right: 2px solid #00000059;}
    .search_box{
      width: 100%;
      height: 45px;
      display: flex;
      align-items: center;
      .search_border{
        width: 96%;
        border-radius: 3px;
      //  border:1px solid #d1d1d1;
        height: 30px;
        display: flex;
        align-items: center;
        margin: 0 auto;
        background-color: #151617;
        .searchTh{
          width: 86%;
          height: 21px;
          border: none;
          margin-left: 3%;
          border-radius: 20px;
          font-size: 14px;
          background-color:transparent;
          color: #fff;
          }
        img{
          width: 20px;
          height: 20px;
          cursor: pointer;
        }
      }
    }
      .select_box{
        width: 100%;
        height: 30px;
        display: flex;
        align-items: center;
        padding: 10px;
        box-sizing: border-box;
        color: #fff;
        label{align-items: center;}
        .select_input{width: 63%;margin-left: 2%;border-radius: 2px;}
      }
      .service_list{
        width: 100%;
        height: 90%;      
        overflow-y: auto;
        margin-top: 20px;
        >img{width: 14.5%;height: auto;}
        .serviceDetail{
          width:100%%;
          height: 60px;
          display: flex;
          align-items: center;
          padding: 0 10px;
          box-sizing: border-box;
          position: relative;
          &:hover{background-color: #797878;cursor: pointer;}
        }
        .actived{background-color: #797878;cursor: pointer;}
        .serviceImg{
          width: 40px;
          height: 40px;
          border-radius: 3px;
        }
        .serviceName{
          height: 40px;
          color: #fff;
          font-size: 14px;
          width: 54%;
          white-space: nowrap;
          text-overflow: ellipsis;
          overflow: hidden;
          padding: 0 10px;
          display: flex;
          justify-content: space-between;
          flex-direction: column;
          box-sizing: border-box;
          span{
            display: inline-block;
            width: 100%;
            overflow: hidden;
            text-overflow: ellipsis;
            white-space: nowrap;
          }
          .code{font-size: 12px;}
        }
        .red{
          color: red;
        }
        .arrowRight{
          width: 16px;
          height: 16px;
          display: inline-block;
          position: absolute;
          right: 10px;

        }

      }




  }
</style>
