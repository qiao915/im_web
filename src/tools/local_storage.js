import LocalStorage from './localstorage'

let instance = new LocalStorage('jys')

export default {
    get(key){
        let [error, result] =  instance.get(key)
        if(!error)return result
        else return null
    },
    put(key, value){
        instance.put(key, value)
    },
    del(key){
        instance.del(key)
    },
    has(key){
        let [error, result] = instance.has(key)
        if(!error)return result
        else return false
    },
    clear(){
        LocalStorage.clear() 
    }
}