export function tranListToTreeData(list, rootValue) {
  const arr = []
  list.forEach((item) => {
    if (item.pid === rootValue) {
      const children = tranListToTreeData(list, item.id)
      if (children.length) {
        item.children = children
      }
      arr.push(item)
    }
  })
  return arr
}
