export const createUploadUrl = function (url, base) {
  if (!url) {
    return ''
  }
  url = url.trim()
  if (!url.startsWith('http')) {
    return `${base}${url}`
  }

  return url
}

export const getAssetPath = function (path) {
  if (!path) {
    return path
  }

  return ASSET_PATH + path // eslint-disable-line
}
