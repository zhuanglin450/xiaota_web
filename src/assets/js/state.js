/**
 * 返回可能的运行状态和对应可用的按钮
 */
const state = {
  create: { code: 0, text: "未开始", buttons: ["开始"] },
  waiting: { code: 1, text: "排队中", buttons: ["取消排队"] },
  running: { code: 2, text: "运行中", buttons: ["暂停", "停止"] },
  suspended: { code: 3, text: "已暂停", buttons: ["继续", "停止"] },
  stoped: { code: 4, text: "已停止", buttons: ["重新开始"] },
  done: { code: 5, text: "已完成", buttons: ["重新开始"] }
};

// 根据code获取对象
state._get = function(code) {
  return Object.entries(state).filter(item => {
    return item[1].code == code;
  })[0];
};

// 获取code:text的状态
state.get_arr = function() {
  let arr = [];
  for (let key in this) {
    if (typeof this[key] !== "function")
      arr.push({
        id: this[key].code,
        name: this[key].text
      });
  }
  return arr;
};

// 获取文本
state.get_text = function(code) {
  return this._get(code)[1].text;
};

// 获取状态
state.get_status = function(code) {
  return this._get(code)[0];
};

// 获取按钮
state.get_buttons = function(code) {
  return this._get(code)[1].buttons;
};

export { state };
