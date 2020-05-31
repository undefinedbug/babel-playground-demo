<template>
  <div class="tree-demo">
    <tree :tree-data="treeData" />
  </div>
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator'
import Tree from '@/packages/tree/src/tree.vue'

@Component({
  components: {
    Tree,
  },
})
export default class TreeeDemo extends Vue {
  treeData: any[] = [
    {
      id: '0',
      pid: '',
      name: 'node-0',
      level: 0,
      open: false,
      selelcted: false,
      children: [
        {
          id: '0-0',
          pid: '0',
          name: 'node-0-0',
          level: 1,
          open: false,
        },
      ],
    },
    {
      id: '1',
      pid: '',
      name: 'node-1',
      level: 0,
      open: false,
      selelcted: false,
      children: [
        {
          id: '1-0',
          pid: '1',
          name: 'node-1-0',
          level: 1,
          open: false,
          children: [
            {
              id: '1-0-0',
              pid: '1-0',
              name: 'node-1-0-0',
              level: 2,
              open: false,
            },
          ],
        },
      ],
    },
  ]

  created() {
    for (let row = 0; row < 3; row++) {
      this.treeData.push({
        id: `row-${row}`,
        pid: '1-0-0',
        name: `node-row-${row}`,
        level: 0,
        children: null,
      })
    }
  }
}
</script>

<style lang="less">
body {
  // background-color: rgb(3, 107, 58);
}
</style>

<style lang="less" scoped>
.tree-demo {
  padding: 10px;
  width: 300px;
  height: calc(100% - 20px);
}
</style>
