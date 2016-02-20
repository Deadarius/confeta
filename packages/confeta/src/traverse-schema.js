function traverseSchema (schema, fn, segments = []) {
  for (const key in schema) {
    let deeperSegments = segments.slice(0) // clone segments
    deeperSegments.push(key)
    let descriptor = schema[key]

    const { type } = descriptor

    if (typeof type === 'object' && Object.keys(type).length > 0) {
      traverseSchema(type, fn, deeperSegments)
    } else {
      fn(descriptor, deeperSegments)
    }
  }
}

export default traverseSchema
