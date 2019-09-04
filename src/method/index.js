import { Message  } from 'element-ui'
import router from '../router'
import VueI18n from 'vue-i18n'
let util = {
    //
    getCookie: function (cookieName) {
        let cookieValue="";
		if (document.cookie && document.cookie != '') {
			var cookies = document.cookie.split(';');
			for (let i = 0; i < cookies.length; i++) {
				 let cookie = cookies[i];
				 if (cookie.substring(0, cookieName.length + 2).trim() == cookieName.trim() + "=") {
					   cookieValue = cookie.substring(cookieName.length + 2, cookie.length);
					   break;
				 }
			 }
		}
		return cookieValue;
    },
    Logback:function(){ 
        let locale = util.getCookie('locale')
        let message = ""
        if(locale=="zh"){
            message="账户过期,请重新登录!"
        }else if(locale=="en"){
            message="Account expired, please login again!"
        }else if(locale=="tw"){
            message="賬戶過期,請重新登錄!"
        }else{
            message="账户过期,请重新登录!"
        }
        Message({
            message: message,
            type: 'error',
            duration : "1000",
            onClose : function(){
               router.push({path:'/Login'})
            }

        });
    }
}
export default util;
