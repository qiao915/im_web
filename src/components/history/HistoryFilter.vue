<template>
  <div class="filter">
    <div class="search-filter">
      <el-input
        placeholder="请输入内容"
        v-model="filterText"
        @keyup.enter="onTextSearchStart"
      >
        <i slot="prefix" class="el-input__icon el-icon-search"></i>
      </el-input>
    </div>
    <div class="date-filter">
      <div class="date-filter-type">
        <div>全部</div>
        <div class="filter-date-c">
          <div @click="onDatePickerClick" >按日期筛选</div>
          <el-date-picker type="date" ref="picker1" placeholder="选择日期" class="date-picker" @click="onDatePicerClick" ></el-date-picker>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  computed: {
    val () {
      return {
        filterType: this.filterType,
        filterText: this.filterText,
        filterDate: this.filterDate
      }
    }
  },

  data () {
    return {
      filterType: 0,
      filterText: '',
      filterDate: new Date()
    }
  },

  methods: {
    onDatePickerClick () {
      this.$refs.picker1.focus()
    },

    onTextSearchStart () {
      this.filterType = 0
      this.$emit('input', this.val())
    },

    onDatePicerClick () {
      this.filterType = 1
      this.$emit('input', this.val())
    }
  }
}
</script>

<style lang="scss" scoped>
.date-picker {
  width: 0;
  height: 0;
  overflow: hidden
}
</style>

