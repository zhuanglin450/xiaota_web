'use strict'
const merge = require('webpack-merge')
const prodEnv = require('./prod.env')

module.exports = merge(prodEnv, {
  NODE_ENV: '"development"',

   // ����������д���: ��ʾ�ڿ�������������ķ������˽ӿ�  
   //API_ROOT: '"http://47.114.157.108:80"' ����Ҫ��
})
