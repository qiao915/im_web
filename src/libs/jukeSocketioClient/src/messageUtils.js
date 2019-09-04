export function createMessage (code, msgId, bodyObj) {
  appendTimestamp(bodyObj)
  return {
    code,
    msgId,
    body: JSON.stringify(bodyObj)
  }
}

export function appendTimestamp (obj) {
  obj['timestamp'] = (new Date()).getTime()
}
