<template>
  <div class="MaskLayer" v-if="isShowBox">
      <slot name="MaskBox"></slot>
  </div>
</template>

<script>
export default {
  name: 'MaskLayer',
  props:{
    isShowBox:{
      type: Boolean,
      default: false,
    }
  }
}
</script>

<style lang="less" scoped>
.MaskLayer{
  width: 100%;
  height: 100%;
  position: fixed;
  left: 0;
  top: 0;
  background:rgba(0,0,0,0.4);
  filter: alpha(opacity=0);
  z-index: 888;
}
</style>
