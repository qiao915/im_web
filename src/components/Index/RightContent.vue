<template>
  <div class="rightContent">
    <router-view></router-view>
  </div>
</template>

<script>

export default {
  name: 'RightContent',
  components: { },
  computed: { }
}
</script>

<style lang="less" scoped>
  .rightContent{
    flex:1;
    background-color: #ededed;
    height: 100%;
    border-right: 1px solid #cac5c5;
    display: inline-block;
    overflow: hidden;
  }
</style>
