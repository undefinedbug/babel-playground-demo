import Vue from 'vue'
import _require,  { register } from './require'
import parse from './parse'
import transform from './transform'
import book from '../views/demo/book.vue'
import * as VuePropertyDecor from 'vue-property-decorator'

const defaultModules = {
  'vue-property-decorator': VuePropertyDecor,
}

const registerModules = (modules) => {
  Object.keys(modules).map(key => {
    if (Object.hasOwnProperty.call(modules, key)) {
      register(key, modules[key])
    }
  })
}

export default function (code, modules = {}) {debugger
  const k = book
  const vueConfig = parse(code)
  if (vueConfig.errors.length) {
    return {
      error: vueConfig.errors
    }
  }
  const result = transform(vueConfig.script.content)
  if (result.error) {
    return result
  }
  registerModules(defaultModules)

  const codeStr = result.code

  const script = new Function('module', 'exports', '__webpack_require__', `return function () {${codeStr}}`)(undefined, {}, _require)

}