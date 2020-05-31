vue<template>
  <div class="storybook">
    <p>Storybook</p>
    <button @click="onClick">parse</button>
    <pre><code>{{codeStr}}</code></pre>
    <div id="book"></div>
  </div>
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator'
import compiler from '../../playground/compiler'
import code from '!raw-loader!./code.vue'

@Component
export default class TreeeDemo extends Vue {
  parseResult: any = {
    script: '',
  }

  codeStr = ''

  onClick() {
    debugger
    this.parseResult = compiler(code)
  }
}
</script>

<style lang="less" scoped>
.tree-demo {
  padding: 10px;
  width: 300px;
  height: calc(100% - 20px);
}
</style>
