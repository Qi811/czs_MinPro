// const formatTime = date => {
//   const year = date.getFullYear()
//   const month = date.getMonth() + 1
//   const day = date.getDate()
//   const hour = date.getHours()
//   const minute = date.getMinutes()
//   const second = date.getSeconds()

//   return [year, month, day].map(formatNumber).join('/') + ' ' + [hour, minute, second].map(formatNumber).join(':')
// }

// const formatNumber = n => {
//   n = n.toString()
//   return n[1] ? n : '0' + n
// }

let getQueryString = function (url, name) {
  console.log("url = " + url)
  console.log("name = " + name)
  var reg = new RegExp('(^|&|/?)' + name + '=([^&|/?]*)(&|/?|$)', 'i')
  var r = url.substr(1).match(reg)
  if (r != null) {
    console.log("r = " + r)
    console.log("r[2] = " + r[2])
    return r[2]
  }
  return null;
}

//导出方法，外部调用
module.exports = {
  getQueryString: getQueryString,
}


//计算时间差
function shijiancha(faultDate, completeTime) {
  var stime = Date.parse(new Date(faultDate));
  var etime = Date.parse(new Date(completeTime));
  var usedTime = etime - stime; //两个时间戳相差的毫秒数
  var days = Math.floor(usedTime / (24 * 3600 * 1000));
  //计算出小时数
  var leave1 = usedTime % (24 * 3600 * 1000); //计算天数后剩余的毫秒数
  var hours = Math.floor(leave1 / (3600 * 1000));
  //计算相差分钟数
  var leave2 = leave1 % (3600 * 1000); //计算小时数后剩余的毫秒数
  var minutes = Math.floor(leave2 / (60 * 1000));
  var dayStr = days == 0 ? "" : days + "天";
  var hoursStr = hours == 0 ? "" : hours + "时";
  var time = dayStr + hoursStr + minutes + "分";
  return time;
  }

function formatTime(date) {
  var year = date.getFullYear()
  var month = date.getMonth() + 1
  var day = date.getDate()

  var hour = date.getHours()
  var minute = date.getMinutes()
  var second = date.getSeconds()


  return [year, month, day].map(formatNumber).join('/') + ' ' + [hour, minute, second].map(formatNumber).join(':')
}

function formatNumber(n) {
  n = n.toString()
  return n[1] ? n : '0' + n
}

/** 
* 时间戳转化为年 月 日 时 分 秒 
* number: 传入时间戳 
* format：返回格式，支持自定义，但参数必须与formateArr里保持一致 
*/
function formatTimeTwo(number, format) {

  var formateArr = ['Y', 'M', 'D', 'h', 'm', 's'];
  var returnArr = [];

  var date = new Date(number * 1000);
  returnArr.push(date.getFullYear());
  returnArr.push(formatNumber(date.getMonth() + 1));
  returnArr.push(formatNumber(date.getDate()));

  returnArr.push(formatNumber(date.getHours()));
  returnArr.push(formatNumber(date.getMinutes()));
  returnArr.push(formatNumber(date.getSeconds()));

  for (var i in returnArr) {
      format = format.replace(formateArr[i], returnArr[i]);
  }
  return format;
}

module.exports = {
  formatTime: formatTime,       //日期转时间戳
  formatTimeTwo: formatTimeTwo,  //时间戳转日期
  shijiancha:shijiancha                  //计算时间差
}
