//var aesjs = require('aes-js');
import Aes from "aes-js";
import CryptoJS from 'crypto-js';

/**
 * 对对象进行比较
 */

// 深度比较
let equal_deep = function equal_deep(obj1, obj2) {
    // 类型不同
    if (typeof obj1 !== typeof obj2) {
        return false;
    }
    // 类型相同
    if (typeof obj1 === "object") {
        if (obj1 === null) {
            return obj1 === obj2;
        } else if (Array.isArray(obj1)) {
            // 数组
            // 长度不同
            if (obj1.length !== obj2.length) {
                return false;
            }
            // 长度相同
            for (let index in obj1) {
                if (!equal_deep(obj1[index], obj2[index])) {
                    return false;
                }
            }
            return true;
        } else {
            // 对象
            for (let key in obj1) {
                if (!equal_deep(obj1[key], obj2[key])) {
                    return false;
                }
            }
            return true;
        }
    } else if (typeof obj1 === "function") {
        return obj1.toString() === obj2.toString();
    }
    // 基本类型
    return obj1 === obj2;
};

// 深克隆
let clone_deep = function clone_deep(obj) {
    if (typeof obj === "object") {
        if (obj === null) {
            return null;
        } else if (Array.isArray(obj)) {
            // 数组
            return obj.map((item) => {
                return clone_deep(item);
            });
        } else {
            // 对象
            let new_obj = {};
            for (let key in obj) {
                new_obj[key] = clone_deep(obj[key]);
            }
            return new_obj;
        }
    }
    return obj;
};

// 深度冻结(冻结自身)
let freeze_deep = function freeze_deep(obj) {
    if (typeof obj !== "object" || obj === null) {
        return;
    }
    Object.freeze(obj);
    if (Array.isArray(obj)) {
        for (let item of obj) {
            freeze_deep(item);
        }
    } else {
        for (let key in obj) {
            freeze_deep(obj[key]);
        }
    }
};

function isStringEmpty(data) {

    if (data == null)
        return true;
    var strRep = new String(data);
    return strRep.replace(/(^s*)|(s*$)/g, "").length == 0;
}

/**
 * 加密（需要先加载lib/aes/aes.min.js文件）
 * @param word
 * @returns {*}
 */
function encrypt(word){
    var key = CryptoJS.enc.Utf8.parse("abcdefgabcdefg12");
    var srcs = CryptoJS.enc.Utf8.parse(word);
    var encrypted = CryptoJS.AES.encrypt(srcs, key, {mode:CryptoJS.mode.ECB,padding: CryptoJS.pad.Pkcs7});
    return encrypted.toString();
}

/**
 * 解密
 * @param word
 * @returns {*}
 */
function decrypt(word){
    var key = CryptoJS.enc.Utf8.parse("abcdefgabcdefg12");
    var decrypt = CryptoJS.AES.decrypt(word, key, {mode:CryptoJS.mode.ECB,padding: CryptoJS.pad.Pkcs7});
    return CryptoJS.enc.Utf8.stringify(decrypt).toString();
}

export { equal_deep, clone_deep, freeze_deep, isStringEmpty,encrypt,decrypt};