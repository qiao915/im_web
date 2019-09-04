export function pathCreator (pathBase, ...params) {
  const base = 'https://kuick.cn'
  let url = new URL(`${base}${pathBase}`)

  params.forEach((item) => {
    url.searchParams(item[0], item[1])
  })

  const ret = `${url.pathname}${url.search}`
  return ret
}
