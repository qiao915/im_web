<template>
    <div class="login">

    </div>
</template>

<script>
// import SHA256 from "../../tools/sha256"
// import md5 from 'js-md5';
import loginService from '@/pages/login-service.js';
import storage from '@/tools/local_storage'

export default {
    data() {
        return {

        }
    },
    created(){
    },
    mounted(){
      //将url参数存储起来
      storage.put('urlParams',this.$route.query)
      let params = this.$route.query.token || storage.get("accessToken")
      this.$cfg.set('token', params)
      this.getUserInfo_token(params)
    },
    methods: {
      //根据token获取用户信息
       getUserInfo_token (par) {
        this.$http({
            type:'post',
            url:'/api/imh5/index/tokenLogin.do',
            params:{
              token:par
            }
          }).then(res=>{
          //  console.log(res)
            var data = res.data
            if(data.result == true){
              this.$message({
                   message: '登录成功',
                   type: 'success',
                   duration: 500,
               });
               loginService.loginSuccess(this, data.returnObject,par);
            }else{
              this.$message({
                   message: res.data.errorMessage,
                   type: 'error',
                   duration: 1000,
               });
              //   this.getUserInfo_token(params.token)
            }
        })
      },

    }
}
</script>

<style lang="less" scoped>

</style>
