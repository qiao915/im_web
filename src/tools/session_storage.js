export default {
    get(key){
        return JSON.parse(window.sessionStorage.getItem(key))
    },
    put(key, value){
        window.sessionStorage.setItem(key, JSON.stringify(value))
    },
    del(key){
        window.sessionStorage.removeItem(key)
    },
    has(key){
        return JSON.parse(window.sessionStorage.getItem(key)) !== null
    },
    clear(){
        window.sessionStorage.clear()
    }
}