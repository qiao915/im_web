/**
 * Created by l on 2016/3/3.
 */

var dateStringUtils = {};

dateStringUtils.changeMillisecondToStr = function(millisecond){
    var time = parseFloat(millisecond) / 1000;
    if (null != time && "" != time) {
        if (time > 60 && time < 60 * 60) {
            time = parseInt(time / 60.0) + "分" + parseInt((parseFloat(time / 60.0) -
            parseInt(time / 60.0)) * 60) + "秒";

        }
        else if (time >= 60 * 60 && time < 60 * 60 * 24) {
            time = parseInt(time / 3600.0) + "时" + parseInt((parseFloat(time / 3600.0) -
            parseInt(time / 3600.0)) * 60) + "分" +
            parseInt((parseFloat((parseFloat(time / 3600.0) - parseInt(time / 3600.0)) * 60) -
            parseInt((parseFloat(time / 3600.0) - parseInt(time / 3600.0)) * 60)) * 60) + "秒";
        }
        else {
            time = parseInt(time) + "秒";
        }
    }
    return time;
};

// dateStringUtils.parseDate = function(date){
//     var format = "yyyy-MM-dd hh:mm:ss";
//     var result = new Date();
//     if (/(y+)/.test(format))
//         result.setFullYear(date.substring(format.indexOf(RegExp.$1), format
//             .indexOf(RegExp.$1)
//         + RegExp.$1.length));
//     if (/(M+)/.test(format))
//         result.setMonth(parseInt(date.substring(format.indexOf(RegExp.$1),
//             format.indexOf(RegExp.$1) + RegExp.$1.length), 10) - 1);
//     if (/(d+)/.test(format))
//         result.setDate(date.substring(format.indexOf(RegExp.$1), format
//             .indexOf(RegExp.$1)
//         + RegExp.$1.length));
//     if (/(h+)/.test(format))
//         result.setHours(date.substring(format.indexOf(RegExp.$1), format
//             .indexOf(RegExp.$1)
//         + RegExp.$1.length));
//     if (/(m+)/.test(format))
//         result.setMinutes(date.substring(format.indexOf(RegExp.$1), format
//             .indexOf(RegExp.$1)
//         + RegExp.$1.length));
//     if (/(s+)/.test(format))
//         result.setSeconds(date.substring(format.indexOf(RegExp.$1), format
//             .indexOf(RegExp.$1)
//         + RegExp.$1.length));
//     if (/(S+)/.test(format))
//         result.setMilliseconds(date.substring(format.indexOf(RegExp.$1), format
//             .indexOf(RegExp.$1)
//         + RegExp.$1.length));
//     return result;
// };


dateStringUtils.toNowText = function(longTime1, longTime2){
    var last = Math.abs(longTime1 - longTime2);

    var text = "刚刚";

    // 秒
    last = parseInt(last / 1000);
    if (last > 0) {
        text = parseInt(last % 60) + "秒前";
    } else {
        return text;
    }

    // 分钟
    last = parseInt(last / 60);
    if (last > 0) {
        text = parseInt(last % 60) + "分前";
    } else {
        return text;
    }

    // 小时
    last = parseInt(last / 60);
    if (last > 0) {
        text = parseInt(last % 24) + "小时前";
    } else {
        return text;
    }

    // 天
    last = parseInt(last / 24);
    if (last > 0) {
        text = parseInt(last % 365) + "天前";
    } else {
        return text;
    }

    // 年
    last = parseInt(last / 365);
    if (last > 0) {
        text = parseInt(last % 10000000) + "年前";
    }else{
        return text;
    }
}

/*
    获取相对时间

    对比时间，
    comparedTimeStr:"2017-7-28 18:00:57"
    参照时间，可以不传，默认是当前时间
    referenceTimeStr:"2017-7-28 18:02:07"

    返回结果：如果相差48小时以内，那么就返回小时差值，否者，则返回多少天前

*/

dateStringUtils.getRelativeTime = function(comparedTimeStr, referenceTimeStr){

    // 对比时间,需要兼容
    var comparedTime = dateStringUtils.parseDate(comparedTimeStr).getTime();

    // 参照物，默认是当前时间
    var referenceTime = new Date().getTime();

    //如果传入了参考时间
    if(referenceTimeStr){
        referenceTime = dateStringUtils.parseDate(referenceTimeStr).getTime();
    }

    // 求差值
    var difference = Math.abs( comparedTime - referenceTime );

    // 默认返回的字段
    var returnStr = "刚刚";

    // 把时间换算成小时
    var differenceHour = parseInt(difference / 1000 / 60 / 60);

    if(differenceHour <= 0){

        return  "1小时内";

    }


    if(differenceHour <= 48){

        return differenceHour + "小时前";

    }

    var differenceDay = parseInt(differenceHour / 24);

    return differenceDay + "天前";

}



//处理时间，把秒，转换成00:00:00
dateStringUtils.changeMillisecondToStrEn = function (time){
    //判断传进来的值是否为数值
    if( isNaN(time) ){//不是数字
        return "00:00";
    }
    //如果是数字
    var minute = parseInt(time / 60);//分钟
    var second = parseInt(time % 60);//秒

    //hour
    var hour   = parseInt(minute / 60);//小时
        minute = parseInt(minute % 60);

    hour   = hour <= 9 ? "0"+ hour : hour;
    minute = minute <= 9 ? "0"+ minute : minute;
    second = second <= 9 ? "0"+ second : second;

    if(hour > 0){
        return hour + ":" + minute + ":" + second;
    }

    return minute + ":" + second;

};

/*
  计算当前时间和传入时间的之间的差值
  返回：当前时间减去传入时间的毫秒数
*/
dateStringUtils.calculateTimeLocationDifferenceServer = function(time){

  var nowTime = new Date().getTime();//当前时间的毫秒数
  var introductionTime = dateStringUtils.parseDate(time).getTime();

  //判断本地时间比服务器时间快还是慢
  if ( nowTime - introductionTime > 0 ) {
      //如果本地时间比服务器时间快，那么返回负数，
      return introductionTime - nowTime;
  }else{
    //如果本地时间比服务器时间慢，那么返回正数
    return nowTime - introductionTime;
  }

  //方便使用者统一按照加法处理

};

// 解析日期
dateStringUtils.parseDate = function(inputTimestamp) {

  // console.log("服务器时间为：" + inputTimestamp);
  //格式化，为了兼容Safari
  var pt = inputTimestamp.replace(/[/:-\s]/g,",").split(",");

  for (var i = 0; i < pt.length; i++) {
    pt[i] = parseInt(pt[i]);
  }

  return new Date(pt[0], pt[1] - 1, pt[2], pt[3], pt[4], pt[5]);
};

export default dateStringUtils;
