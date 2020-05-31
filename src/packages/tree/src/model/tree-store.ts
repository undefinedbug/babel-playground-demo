import { Vue } from 'vue-property-decorator'
import { Settings, NodeModel } from '../interfaces'
import { transform2Tree, transform2Array } from './utils'

type NodeMap = {
  [key: string]: NodeModel
}

export default class TreeStore {
  data: NodeModel[] = []

  private _treeData: any[] = []

  private _nodesMap: NodeMap = {}

  settings!: Settings

  private _vm!: Vue

  constructor(vm: Vue) {
    this._vm = vm
  }

  init(data: NodeModel[], settings: Settings) {
    this.data = data
    this.settings = settings
    this.initData()
  }

  initData() {
    this._nodesMap = {}
    const nodes = transform2Array(this.data, this.settings, node => {
      this._nodesMap[node[this.settings.idKey]] = node
    })
    this._treeData = transform2Tree(nodes, this.settings)
  }

  getTreeData() {
    return this._treeData
  }

  getDataChlidren(data: NodeModel) {
    return data[this.settings.childrenKey] as NodeModel[]
  }

  getNodeData(node: string | NodeModel) {
    const id = typeof node === 'string' ? node : node[this.settings.idKey]
    return this._nodesMap[id]
  }

  getNodeId(node: NodeModel) {
    return node[this.settings.idKey]
  }

  updateNode(node: string | NodeModel, key: string, value: any) {
    let srcNode = this.getNodeData(node)
    if (srcNode) {
      this.$set(srcNode, key, value)
    }
  }

  selectNode(node: string | NodeModel) {
    let srcNode = this.getNodeData(node)
    if (srcNode) {
      const srcId = this.getNodeId(srcNode)
      for (const id in this._nodesMap) {
        let nodeData = this._nodesMap[id]
        const val = this.getNodeId(nodeData) == srcId
        if (nodeData[this.settings.selectKey] != val) {
          this.$set(nodeData, this.settings.selectKey, val)
        }
      }
    }
  }

  $set<T>(object: object, key: string | number, value: T) {
    this._vm.$set(object, key, value)
  }
}
