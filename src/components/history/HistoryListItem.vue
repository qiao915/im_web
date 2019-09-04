<template>
  <section class="list-item">
    <img class="user-img" />
    <div class="right-c" >
      <div class="basic-line">
        <div class="user-name"></div>
        <div class="message-date"></div>
      </div>
      <div class="message-content">
        <div class="text-content"></div>
        <div class="picture-content"></div>
        <div class="official-account-content" ></div>
        <div class="card-content" ></div>
      </div>
    </div>
  </section>
</template>

<script>
export default {
  props: {
    item: {
      type: Object,
      default: () => {
        return {}
      }
    }
  }
}
</script>

