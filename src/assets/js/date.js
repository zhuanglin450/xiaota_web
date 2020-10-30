export function currentTime() {
  let date = new Date(); //创建时间对象
  let year = date.getFullYear(); //获取年
  let month = date.getMonth() + 1; //获取月
  let day = date.getDate(); //获取当日
  return year + "-" + month + "-" + day + " 23:59:59"; //组合时间
}
export function threeDay(day) {
  let today = new Date();
  let targetday_milliseconds = today.getTime() + 1000 * 60 * 60 * 24 * day;
  today.setTime(targetday_milliseconds); //注意，这行是关键代码
  let tYear = today.getFullYear();
  let tMonth = today.getMonth() + 1;
  let tDate = today.getDate();
  return tYear + "-" + tMonth + "-" + tDate + " 00:00:00";
}
export function currentMonth() {
  let date = new Date(); //创建时间对象
  let year = date.getFullYear(); //获取年
  let month = date.getMonth() + 1; //获取月
  return year + "-" + month; //组合时间
}
//将yyyy-MM-dd HH:mm:ss格式的本地时间转换为UTC时间。
export function localToUTCFormat(val) {
  if (typeof val !== "string") {
    return val;
  }
  // let locYear,locMonth,locDay,locHour,locMinute,locSecond;
  let utcYear, utcMonth, utcDay, utcHour, utcMinute, utcSecond;
  let result, date;

  try {
    date = new Date(val);
  } catch (e) {}
  if (date != undefined) {
    utcYear = date.getUTCFullYear().toString();
    utcMonth = (date.getUTCMonth() + 1).toString();
    utcDay = date.getUTCDate().toString();
    utcHour = date.getUTCHours().toString();
    utcMinute = date.getUTCMinutes().toString();
    utcSecond = date.getUTCSeconds().toString();
    let padLeftString = "0";
    utcYear = utcYear.padStart(4, padLeftString);
    utcMonth = utcMonth.padStart(2, padLeftString);
    utcDay = utcDay.padStart(2, padLeftString);
    utcHour = utcHour.padStart(2, padLeftString);
    utcMinute = utcMinute.padStart(2, padLeftString);
    utcSecond = utcSecond.padStart(2, padLeftString);
  }
  result =
    utcYear +
    "-" +
    utcMonth +
    "-" +
    utcDay +
    " " +
    utcHour +
    ":" +
    utcMinute +
    ":" +
    utcSecond;
  return result;
}
//将utc时间转化成yyyy-MM-dd HH:mm:ss格式的本地时间
export function UTCToLocalFormat(value) {
  if (!value) {
    return "-";
  }
  function formatFunc(str) {
    return str > 9 ? str : "0" + str;
  }
  if (value.indexOf("T") != -1) {
    var date2 = new Date(value);
    var year = date2.getFullYear();
    var mon = formatFunc(date2.getMonth() + 1);
    var day = formatFunc(date2.getDate());
    var hour = formatFunc(date2.getHours());
    var min = formatFunc(date2.getMinutes());
    var sec = formatFunc(date2.getSeconds());
    var dateStr =
      year + "-" + mon + "-" + day + " " + hour + ":" + min + ":" + sec;
    return dateStr;
  } else {
    value = value.replace(" ", "T") + "Z";
    var date2 = new Date(value);
    var year = date2.getFullYear();
    var mon = formatFunc(date2.getMonth() + 1);
    var day = formatFunc(date2.getDate());
    var hour = formatFunc(date2.getHours());
    var min = formatFunc(date2.getMinutes());
    var sec = formatFunc(date2.getSeconds());
    var dateStr =
      year + "-" + mon + "-" + day + " " + hour + ":" + min + ":" + sec;
    return dateStr;
  }
}
export function BtoGB(value, base = 1024 * 1024 * 1024) {
  return parseFloat(value / base).toFixed(2) + "G";
}

export function MBtoGB(value, base = 1024) {
  return parseFloat(value / base).toFixed(2) + "G";
}
