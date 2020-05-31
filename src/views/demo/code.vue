<template>
  <div></div>
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator'

export default @Component class Code extends Vue {
  name: string = ''

  async getValue() {
    return 'sssssss'
  }
}
</script>

<style lang="less" scoped>
</style>