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
import parse from '../../playground/parse'
import transform from '../../playground/transform.js'
import code from '!raw-loader!./code.vue'

@Component
export default class TreeeDemo extends Vue {
  parseResult: any = {
    script: '',
  }

  codeStr = ''

  onClick() {
    debugger
    this.parseResult = parse(code)
    if (!this.parseResult.errors.length) {
      const result = transform(this.parseResult.script.content)
      this.codeStr = result.error || result.code
    }
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
