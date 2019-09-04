import handler from './session_storage'

export default {
    get(key){
        return handler.get(key)
    },
    put(key, value){
        handler.put(key, value)
    },
    del(key){
        handler.del(key)
    },
    clear(){
        handler.clear()
    },
    has(key){
        return handler.has(key)
    }
}