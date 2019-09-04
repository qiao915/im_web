<template>
  <div class="history">
    <div class="basic-info">
      <img :src="userImage" class="user-img" />
      <div class="user-name">{{ userName }}</div>
    </div>
    <history-filter></history-filter>
    <history-list></history-list>
  </div>
</template>
<script>
import HistoryFilter from './HistoryFilter.vue'
import HistoryList from './HistoryList.vue'

export default {
  props: {
    // 聊天用户(组)的 code
    code: {
      type: String,
      default: ''
    }
  },

  data () {
    return {
      userImage: '',
      userName: '',

      filterType: '',
      filterText: '',
      filterDate: '',

      messages: ''
    }
  },

  components: {
    HistoryFilter,
    HistoryList
  },

  created () {
  }
}
</script>

<style lang="postcss" scoped>
.history {
  box-sizing: border-box;
  width: 550px;
  padding: 
}
</style>

