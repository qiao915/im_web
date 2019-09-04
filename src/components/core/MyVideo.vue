<template >
  <div class="myVideo">
    <video :src="videoUrl" :poster="poster" controls="controls" width="300" height="200">
      您的浏览器暂不支持video标签
    </video>
  </div>
</template>

<script>
export default {
  props:{
    videoUrl:{
      type: String,
      default: ''
    },
    poster:{
      type: String,
      default: ''
    },

  },
  data(){
    return{

    }
  },
  methods: {

  }
}
</script>

<style lang="less" scoped>
// .myVideo{
//   width: 100%;
//   margin-top: 10px;
//   margin: 0 auto;
//   text-align: center;
// }
</style>
