// import * as Babel from './libs/babel.min.js'
import pTypescript from 'babel-plugin-transform-typescript'
import presetTypescript from 'babel-preset-typescript'
// import decoratorsLegacy from 'babel-plugin-transform-decorators-legacy'
const Babel = window.Babel
// babel-plugin-transform-decorators-legacy
// babel-plugin-transform-typescript

export default function (code) {debugger
  try {
    // Babel.registerPreset ('typescript', presetTypescript)
    // Babel.registerPlugin('transform-typescript', pTypescript)
    // Babel.registerPlugin('transform-decorators-legacy', decoratorsLegacy)

    const config = {
      "babelrc":false,
      "filename":"repl.ts",
      "sourceMap":false,
      "presets":[
        ["env", {
            "targets":{
              "browsers":["defaults","not ie 11","not ie_mob 11"]
            },
            "forceAllTransforms":false,
            "shippedProposals":false,
            "useBuiltIns":false,
            "corejs":"3.6",
            "spec":false,
            "loose":false,
            "bugfixes":true
          }
        ],
        "es2015",
        ["stage-1",{
            "decoratorsLegacy":false,
            "decoratorsBeforeExport":false,
            "pipelineProposal":"minimal"
          }
        ],
        "typescript"
      ],
      "plugins":[],
      "sourceType":"module"
    }
    const result = Babel.transform(code, config) 
    // const result = Babel.transform(code, { 
    //   babelrc: !1,
    //   filename: "repl.ts",
    //   sourceMap: false,
    //   sourceType: "module",
    //   // plugins: ['transform-typescript'],
    //   presets: [
    //     'env', 
    //     ['es2015', { decoratorsLegacy: false, decoratorsBeforeExport: false, pipelineProposal: "minimal" }], 
    //     'stage-2', 
    //     'typescript'
    //   ],
//       "env"
// 1: "es2015"
// 2: "stage-2"
// 3: "typescript"
      // presetsOptions: {
      //   legacy: true
      // }
    // })
    return result
  } catch (e) {
    console.error(e)
    return {
      error: e
    }
  }
}