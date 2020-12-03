import { Registry, BaseItem } from '@zeainc/zea-engine'

const convertValuesToJSON = (value) => {
  if (value == undefined) {
    return undefined
  } else if (value instanceof BaseItem) {
    return '::' + value.getPath()
  } else if (value.toJSON) {
    const result = value.toJSON()
    result.typeName = Registry.getBlueprintName(value.constructor)
    return result
  } else if (Array.isArray(value)) {
    const arr = []
    for (const element of value) arr.push(convertValuesToJSON(element))
    return arr
  } else if (typeof value === 'object') {
    const dict = {}
    for (const key in value) dict[key] = convertValuesToJSON(value[key])
    return dict
  } else {
    return value
  }
}

const convertValuesFromJSON = (value, scene) => {
  if (value == undefined) {
    return undefined
  } else if (typeof value === 'string' && value.startsWith('::')) {
    return scene.getRoot().resolvePath(value, 1)
  } else if (value.typeName) {
    const newval = Registry.getBlueprint(value.typeName).create()
    newval.fromJSON(value)
    return newval
  } else if (Array.isArray(value)) {
    const arr = []
    for (const element of value) arr.push(convertValuesFromJSON(element, scene))
    return arr
  } else if (typeof value === 'object') {
    const dict = {}
    for (const key in value) dict[key] = convertValuesFromJSON(value[key], scene)
    return dict
  } else {
    return value
  }
}

export { convertValuesToJSON, convertValuesFromJSON }
