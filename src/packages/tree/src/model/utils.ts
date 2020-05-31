import { Settings, NodeModel } from '../interfaces'

export const transform2Array = (
  data: NodeModel | NodeModel[],
  settings: Settings,
  callback?: (node: NodeModel) => void
): NodeModel[] => {
  console.time('transform2Array')
  let arr: any[] = []
  const nodes = Array.isArray(data) ? data : [data]
  nodes.forEach(node => {
    arr.push(node)
    if (callback) {
      callback(node)
    }
    iterateChildren(node, settings, child => {
      arr.push(child)
      if (callback) {
        callback(child)
      }
    })
  })
  console.timeEnd('transform2Array')
  return arr
}

export const transform2Tree = (
  nodes: NodeModel[],
  settings: Settings,
  callback?: (node: NodeModel) => void
): NodeModel[] => {
  console.time('transform2Tree')
  const { idKey, pidKey, childrenKey, levelKey } = settings
  let nodesMap: any = {}
  let childrenMap: any = {}

  nodes.forEach(node => {
    nodesMap[node[idKey]] = node

    const pid = node[pidKey]
    let pNodeChildren = (childrenMap[pid] = childrenMap[pid] || [])

    pNodeChildren.push(node)
  })

  let level0Nodes: any[] = []

  nodes.forEach(node => {
    node[childrenKey] = unique(childrenMap[node[idKey]])
    if (!nodesMap[node[pidKey]]) {
      level0Nodes.push(node)
    }
    if (callback) {
      callback(node)
    }
  })

  level0Nodes.forEach(node => {
    node[levelKey] = 0
    iterateChildren(node, settings, child => {
      const pNode = nodesMap[child[settings.pidKey]]
      child[levelKey] = pNode[levelKey] + 1
    })
  })

  console.timeEnd('transform2Tree')
  return level0Nodes
}

export const iterateChildren = (data: NodeModel, settings: Settings, iterator: (data: NodeModel) => void) => {
  const children: NodeModel[] = data[settings.childrenKey] || []
  children.forEach(child => {
    iterator(child)
    iterateChildren(child, settings, iterator)
  })
}

export const unique = (arr?: any[]) => {
  if (!Array.isArray(arr)) {
    return arr
  }
  const set = new Set(arr)
  return [...set]
}
