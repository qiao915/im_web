<template >
    <MaskLayer :isShowBox="isShowBox">
        <div class="auth-other-con" slot="MaskBox">
            自动登陆中,请稍后...
        </div>
    </MaskLayer>
</template>

<script>
import MaskLayer from "@/components/core/MaskLayer"
import { Base64 } from "js-base64";
import {getQueryObject} from '@/utils/index'
import loginService from '@/pages/login-service.js';
import storage from '@/tools/local_storage'

export default {
    name : 'login-by-token',
    components:{
        MaskLayer
    },
    mounted(){

    },
    data() {
        return {
            isShowBox: true,
        };
    },
    methods: {
        loginByToken(){
            let queryObject = getQueryObject();

            if(!queryObject || !queryObject.token){
                this.redirectAuthUrl();

                return;
            }
            this.$cfg.set('token', queryObject.token)
            this.$http({
                method: 'post',
                url: '/api/imh5/index/tokenLogin.do',
                params: {
                    token: queryObject.token,
                }
            }).then((res)=>{
                var data = res.data;

                if(data.result == true){
                    this.$message({
                        message: '登录成功',
                        type: 'success',
                        duration: 500,
                    });

                    let userInfo = data.returnObject;

                    if(userInfo){
                        userInfo.token = queryObject.token;
                    }

                    loginService.loginSuccess(this, userInfo,queryObject.token);

                }else{
                    // this.$message({
                    //     message: res.data.errorMessage,
                    //     type: 'error',
                    // });
                    this.redirectAuthUrl();
                }
            }).catch((error)=>{
                this.redirectAuthUrl();
            });
        },

        // 授权失败，返回到认证界面
        redirectAuthUrl(){
            let queryObject = getQueryObject();
            let authInfo = {};
            let source = this.$cfg.authSource;

            if(authInfo && authInfo.auth_url){
                window.location.href = authInfo.auth_url;
            }else{
                this.$router.replace('/im-web/login');
            }
        },

        // save login info to locaStorge
        saveLoginInfoToLocaStorge(){
            let queryObject = getQueryObject();
            let authInfo = {};
            let source = queryObject.source || '';

            if(source){
                try {
                    authInfo = JSON.parse(Base64.decode(source));
                } catch (e) {
                    console.error('auth info format has err', e);
                }
            }

            if(authInfo && authInfo.login_url){
                this.$cfg.set('authSource', authInfo);
                storage.put('auth_source', authInfo)
            }
        }

    },

    created(){
        this.saveLoginInfoToLocaStorge();
        this.loginByToken();
    },
}
</script>

<style lang="scss" scoped>
    @charset "utf-8";
    @import "@/assets/bassScss.scss";

    .auth-other-con{
        width: 100%;
        height: 100%;
        position: relative;
        left: 0;
        top: 0;
        @include flexboxCenter;
        font-size: 30px;
        background-color: #fff;
    }
</style>
