const dotPath = (path: string, arr: any) => {
  return path.split('.').reduce((acc, cur) => {
    return acc[cur]
  }, arr)
}

export default dotPath
