function snakeToCamel(string: string): string {
  let splitStringArr = string.split('_')

  return splitStringArr.reduce((acc, curr, i) => {
    curr = i !== 0 ? curr[0].toUpperCase() + curr.slice(1) : curr
    return acc + curr
  }, '')
}

export default snakeToCamel
