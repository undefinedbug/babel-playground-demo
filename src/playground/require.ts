const cache: any = {}

export default function (path) {debugger
  return cache[path]
}

export const register = (path, module) => {debugger
  cache[path] = module
}