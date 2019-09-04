<template>
  <div class="listTitleBox" @click="hasClick">
    <div class="">
        <slot name="groupName"></slot>
        <slot name="groupNameNumber"></slot>
    </div>
    <div class="groupNumber">
      <slot name="groupNumber"></slot>
    </div>
  </div>
</template>

<script>
export default {
  name: 'ListTitle',

  methods:{
    hasClick(){
      this.$emit('hasClick')
    }
  }
}
</script>

<style lang="less" scoped>
.listTitleBox{
  width: 100%;
  height: 60px;
  line-height: 60px;
  background-color: #292d32;
  padding: 0 10px 0 20px;
  box-sizing: border-box;
  font-size: 14px;
  color: #fff;
  display: flex;
  justify-content: space-between;
  cursor: pointer;
  &:hover{
    background-color: #3a3f45;
  }
  // border-bottom: 1px solid #000;
  .groupNumber{
    font-size: 12px;
  }
}
</style>
