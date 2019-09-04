// import $t from 'vue-i18n'
export default {
    dataConfig: { //配置图片地址前缀 页面引用 $Enum.dataConfig.configUrl
        "configUrl": "http://juke-test.kuick.cn",
    },
    isVal0: function (rule, value, callback) {
	    if(value<0){
				return callback(new Error('不能小于0'));
        }else if(value==0){
                return callback(new Error('不能等于0'));
        }
        callback()
    },
    AisMaxLength:function (rule, value, callback){
            let reg = /.*\..*/;
            if(reg.test(value)){
                let isLength = value.toString().replace(/\d+\.(\d*)/,"$1")
                if(isLength.length>2){
                    return callback(new Error('最多只能输入2位小数'));
                }else{
                    callback()
                }
            }else{
                callback()
            }
    },
    isDot:function (rule, value, callback){
        let isdot = value.substring(0,1)
        if(value &&  isdot=="." ){
            return callback(new Error('不能以.开头'));
        }else{
                callback()
        }
    },
    validateReg: function (rules, message) {
        return function (rule, value, callback) {
            var reg = new RegExp(rules);
            if (!reg.test(value)) {
                callback(new Error(message));
            } else {
                callback();
            }
        };
    },

};
