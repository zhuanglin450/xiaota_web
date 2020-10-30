export function ValidateIPRole(str) {
  var re = /^(\d+)\.(\d+)\.(\d+)\.(\d+)$/; //正则表达式
  if (re.test(str)) {
    if (
      RegExp.$1 < 256 &&
      RegExp.$2 < 256 &&
      RegExp.$3 < 256 &&
      RegExp.$4 < 256
    )
      return true;
  }
  return false;
}
//端口,1-65534之间
export function ValidatePortRole(str) {
  var re = /^([0-9]|[1-9]\d|[1-9]\d{2}|[1-9]\d{3}|[1-5]\d{4}|6[0-4]\d{3}|65[0-4]\d{2}|655[0-2]\d|6553[0-5])$/; //正则表达式
  return re.test(str);
}

// 只有数字字母汉字下划线是合法名称，且长度不超过20个字符
export function validateName(str) {
  const reg = /^[\u4e00-\ufa5aa-z0-9_]{1,20}$/gi;
  return reg.test(str);
}
