/**
 * 该文件用于返回date形式的时间段
 */

// 获取给定日期的年月日时分秒
function get_date_number(day) {
  var year = day.getFullYear();
  var month = day.getMonth();
  var date = day.getDate();
  var hours = day.getHours();
  var minutes = day.getMinutes();
  var seconds = day.getSeconds();
  var ms = day.getMilliseconds();
  return {
    year: year,
    month: month,
    date: date,
    hours: hours,
    minutes: minutes,
    seconds: seconds,
    ms: ms
  };
}
// 获取给定日期的年月日时分秒(字符串)
function get_date_string(day) {
  var year = day.getFullYear().toString();
  var month = Number(day.getMonth() + 1)
    .toString()
    .padStart(2, "0");
  var date = day
    .getDate()
    .toString()
    .padStart(2, "0");
  var hours = day
    .getHours()
    .toString()
    .padStart(2, "0");
  var minutes = day
    .getMinutes()
    .toString()
    .padStart(2, "0");
  var seconds = day
    .getSeconds()
    .toString()
    .padStart(2, "0");
  var ms = day
    .getMilliseconds()
    .toString()
    .padStart(3, "0");
  return {
    year: year,
    month: month,
    date: date,
    hours: hours,
    minutes: minutes,
    seconds: seconds,
    ms: ms
  };
}
// 一天的毫秒数
function get_day_ms() {
  return 1000 * 60 * 60 * 24;
}
// 将时间重置为一天的开始（0：0：0.000）
function set_day_begin(day) {
  var _a = get_date_number(day),
    year = _a.year,
    month = _a.month,
    date = _a.date;
  return new Date(year, month, date, 0, 0, 0, 0);
}
// 将时间重置为一天的结束（ 23：59：59.999）
function set_day_end(day) {
  var _a = get_date_number(day),
    year = _a.year,
    month = _a.month,
    date = _a.date;
  return new Date(year, month, date, 23, 59, 59, 999);
}
// 设置时间返回到几天后（long为负时，表示几天前）
function set_date(long, day) {
  if (day === void 0) {
    day = new Date();
  }
  return new Date(day.getTime() + long * get_day_ms());
}
// 设置对象为日期
function set_obj_to_date(obj) {
  var year = obj.year,
    month = obj.month,
    date = obj.date,
    hours = obj.hours,
    minutes = obj.minutes,
    seconds = obj.seconds,
    ms = obj.ms;
  return new Date(
    year +
      "-" +
      month +
      "-" +
      date +
      " " +
      hours +
      ":" +
      minutes +
      ":" +
      seconds +
      "." +
      ms
  );
}
function period(long) {
  var period_start = set_day_begin(set_date(-long));
  var period_end = set_day_end(new Date());
  return [period_start, period_end];
}

/**
 * @param {Date} date
 */
function to_utc(date, day = false) {
  let arr = date.toISOString().split(/[T\.]/);
  if (day) {
    return arr[0];
  }
  return arr[0] + " " + arr[1];
}

export { to_utc, period };
