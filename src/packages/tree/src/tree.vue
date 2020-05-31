<template>
  <div class="great-tree">
    <div class="tree-wrap frosted-glass">
      <ul class="tree-root">
        <tree-node v-for="node in nodes" :key="node[settings.idKey]" :node="node" />
      </ul>
    </div>
  </div>
</template>

<script lang="ts">
import { Component, Vue, Prop, Provide } from 'vue-property-decorator'
import TreeNode from './tree-node.vue'
import { Settings, NodeModel } from './interfaces'
import TreeStore from './model/tree-store'

@Component({
  components: {
    TreeNode,
  },
})
export default class GreateTree extends Vue {
  @Prop({ type: Array, default: () => [] })
  treeData!: NodeModel[]

  @Prop({ type: String, default: 'id' })
  idKey!: string

  @Prop({ type: String, default: 'pid' })
  pidKey!: string

  @Prop({ type: String, default: 'name' })
  nameKey!: string

  @Prop({ type: String, default: 'level' })
  levelKey!: string

  @Prop({ type: String, default: 'open' })
  openKey!: string

  @Prop({ type: String, default: 'checked' })
  checkKey!: string

  @Prop({ type: String, default: 'selected' })
  selectKey!: string

  @Prop({ type: String, default: 'children' })
  childrenKey!: string

  @Provide('settings')
  settings: Settings = {
    idKey: this.idKey,
    pidKey: this.pidKey,
    nameKey: this.nameKey,
    levelKey: this.levelKey,
    openKey: this.openKey,
    checkKey: this.checkKey,
    selectKey: this.selectKey,
    childrenKey: this.childrenKey,
    leafKey: 'isLeaf',
  }

  nodes: NodeModel[] = []

  @Provide()
  $treeStore!: TreeStore

  @Provide()
  $treeEmit(event: string, ...args: any[]) {
    return this.$emit.apply(this, [event, ...args])
  }

  beforeCreate() {
    this.$treeStore = new TreeStore(this)
  }

  created() {
    this.$treeStore.init(this.treeData, this.settings)
    this.nodes = this.$treeStore.getTreeData()
  }
}
</script>
<style lang="less">
@assets: '../../../assets';
@import '@{assets}/font-awesome/less/variables.less';
@fa-css-prefix: gfa;
@import '@{assets}/font-awesome/less/font-awesome.less';
</style>

<style lang="less" scoped>
@assets: '../../../assets';
.great-tree {
  height: calc(100% - 10px);
  width: 100%;
  font-size: 1em;
  overflow: auto;
  padding: 5px;
  .tree-wrap {
    height: 100%;
    overflow: auto;
  }
  /deep/ ul {
    margin: 0;
    padding: 0;
  }
  /** ---- 特效 ---- **/
  background: url('@{assets}/glass_wall.svg') no-repeat;
  background-size: cover;
  box-shadow:  0 0 5px #5555559e;
}
</style>
