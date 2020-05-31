// import { parse } from '@vue/component-compiler-utils'
const compiler = require('vue-template-compiler')

export default function (code) {
  const script = compiler.parseComponent(code)
  return script
}