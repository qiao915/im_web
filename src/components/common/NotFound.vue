<template>
    <div class="container_con">
        <div class="notFoundBox">
          <img src="/static/img/404.png" alt="">
          <span class="tips">没有找到页面哦！</span>
          <a href="/" class="goBack">返回登录页</a>
        </div>
    </div>
</template>
<script>
    export default {
        name: 'notFound',
        data() {
            return {

            }
        },
        methods: {
        },
        created: function () {

        },
        mounted: function () {
            // document.body.innerHTML = '';
            // document.body.appendChild(this.$el);
        },
    }

</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
.container_con{min-height: 435px!important;}
.container_con .notFoundBox{margin: 0 auto;text-align: center;margin-top: 150px;}
.container_con .notFoundBox .tips{color: #323232;font-size:36px;display: block;margin-top: 55px;}
.container_con .notFoundBox .goBack{width: 170px;height: 40px;line-height: 40px;font-size: 14px;color: #3c4dd1;border:1px solid #3c4dd1;display: block;border-radius: 5px;
  margin: 0 auto;margin-top:50px;}
</style>
