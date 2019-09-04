<template>
  <textarea ref="text" v-model="inputText" @keypress="onKeyPress" @click="onClick" @paste="onPaste" @input="onInput" />
</template>

<script>
export default {
  props: {
    value: {
      type: String,
      default: ''
    }
  },

  data () {
    return {
      enterEvent: null,
      inputText: this.value,
      preventUpdate: false
    }
  },

  watch: {
    inputText (newVal) {
      this.$emit('input', newVal)
    },

    value (newVal) {
      this.inputText = newVal
    }
  },

  methods: {
    onKeyPress (e) {
      if ((e.keyCode === 13 || e.keyCode === 10) && e.ctrlKey) {
        let pos = e.target.selectionStart
        let leftStr = this.inputText.substr(0, pos)
        let rightStr = this.inputText.substr(pos, this.inputText.length - leftStr.length)

        this.inputText = `${leftStr}\n${rightStr}`
        // this.$emit('input', this.inputText)
        this.$nextTick(() => {
          e.target.selectionEnd = leftStr.length + 1
        })
      } else if (e.keyCode === 13 && !e.ctrlKey) {
        e.preventDefault()
        this.$emit('enter')
      }
    },

    onClick (e) {
      this.$emit('click', e)
    },

    focus () {
      this.$refs.text.focus()
    },

    onPaste (e) {
      this.$emit('paste', e)
    },

    onInput (e) {
      this.$emit('input', e)
    }

  }
}
</script>
