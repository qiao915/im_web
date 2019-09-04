let params = function(obj){
  let result = []
  Object.keys(obj).forEach(field=>{
    if(obj[field]){
      result.push(field+'='+obj[field])
    }
  })
  return result.join('&')
}
export default params
