<template>
  <li class="node-box" :class="nodeBoxCss">
    <span class="node-wrap" @click.stop="nodeClick">
      <span class="level-block" :class="levelCss"></span>
      <i class="node-switch gfa" :class="switchCss" @click.stop="switchClick"></i>
      <a class="node-name">{{ nodeName }}</a>
    </span>
    <ul class="node-children" v-if="!isLeaf" v-show="node.open">
      <tree-node v-for="child in children" :key="getChildDomKey(child)" :node="child" />
    </ul>
  </li>
</template>

<script lang="ts">
import { Component, Vue, Prop, Inject } from 'vue-property-decorator'
import { Settings } from './interfaces'
import TreeStore from './model/tree-store'
import { Events } from './consts'

@Component({
  name: 'tree-node',
})
export default class TreeNode extends Vue {
  @Prop({ type: Object, required: true, default: {} })
  node: any

  @Inject()
  settings!: Settings

  @Inject()
  $treeStore!: TreeStore

  @Inject()
  $treeEmit!: (event: string, ...args: any[]) => Vue

  get children() {
    return this.node[this.settings.childrenKey] || []
  }

  get isLeaf() {
    return !(this.node[this.settings.childrenKey] || []).length
  }

  get nodeName() {
    return this.node[this.settings.nameKey]
  }

  get nodeBoxCss() {
    return [
      this.node[this.settings.openKey] ? 'expanded' : '',
      this.node[this.settings.leafKey] ? 'leaf' : '',
      this.node[this.settings.selectKey] ? 'selected' : '',
    ]
  }

  get levelCss() {
    return [`level-${this.node[this.settings.levelKey]}`]
  }

  get switchCss() {
    const isLeaf = !(this.node[this.settings.childrenKey] || []).length
    return [this.node[this.settings.openKey] ? 'expanded' : '', isLeaf ? 'leaf gfa-bell-o' : 'gfa-angle-right']
  }

  getChildDomKey(node: any) {
    return node[this.settings.idKey]
  }

  nodeClick(event: any) {
    this.$treeStore.selectNode(this.node)
    this.$treeEmit(Events.node_click, this.node)
  }

  switchClick(event: any) {
    if (this.isLeaf) {
      return
    }
    const expanded = this.node[this.settings.openKey]
    this.$set(this.node, this.settings.openKey, !expanded)
    this.$treeEmit(Events.node_switch_click, this.node)
  }
}
</script>

<style lang="less" scoped>
@rowHeight: 24px;
@levelIndentWidth: 20px;
@levelIndentWidth: 20px;

/**---- 节点基础样式 START ----**/
.level-func(@maxLevel, @level: 0) when (@level =< @maxLevel) {
  .node-wrap {
    .level-block {
      &.level-@{level} {
        display: inline-block;
        width: @level * @levelIndentWidth;
      }
    }
  }
  .level-func(@maxLevel, @level + 1);
}
.box-shadow {
  box-shadow: 0 0 2px rgba(51, 51, 51, 0.5);
}
.node-box {
  list-style: none;
  .level-func(10);
  > .node-wrap {
    line-height: @rowHeight;
    height: @rowHeight;
    display: block;
    border: 1px solid transparent;
    border-radius: 2px;
    margin: 0 3px;
    cursor: default;
    &:hover {
      background-color: rgba(33, 150, 243, 0.1);
      .box-shadow;
    }
    > .node-switch {
      width: 20px;
      text-align: center;
      cursor: pointer;
      &.expanded {
        transform: rotate(90deg);
      }
      &.leaf {
        cursor: default;
      }
    }
  }
  &.selected {
    > .node-wrap {
      background-color: rgba(33, 150, 243, 0.3);
      color: #ffeb3b;
      .box-shadow;
    }
  }
}
/**---- 节点基础样式 END ----**/
</style>
