export interface Settings {
  idKey: string
  pidKey: string
  nameKey: string
  levelKey: string
  openKey: string
  checkKey: string
  selectKey: string
  childrenKey: string
  leafKey: string
}

export interface NodeModel {
  [key: string]: any
  [key: number]: any
}
