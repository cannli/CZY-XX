/**
 * @file: index.
 * @intro: 数据请求统一封装.
 * @author: zzmhot.
 * @email: zzmhot@163.com.
 * @Date: 2017/5/8 14:52.
 * @Copyright(©) 2017 by zzmhot.
 *
 */
//导入模块
import axios from 'axios'
import {port_code} from 'common/port_uri'
import router from 'src/router'
import {Message} from 'element-ui'
import store from 'store'

import {server_base_url} from 'common/config'

const qs = require('qs')

export default function fetch(options) {
  return new Promise((resolve, reject) => {
    //创建一个axios实例
    const instance = axios.create({
      //设置默认根地址
      baseURL: '/',
      //设置请求超时设置
      timeout: 2000,
      //设置请求时的header
      headers: {
        'X-Requested-With': 'XMLHttpRequest',
        'Content-Type': 'application/json',
        //'Content-Type': 'application/x-www-form-urlencoded',
        'userType': '2',
        'Accept': 'application/json,text/plain,*/*'
      }
    })
    instance.interceptors.request.use(options => {
      let is_login = store.state.user_info
      if (Boolean(is_login.login)) {
        options.headers['Authorization'] = is_login.user.token// 让每个请求携带token--['token']为自定义key, 本项目不用 token
      }
      //options.data = qs.stringify(options.data);

      //options.params = options.params;
      options.data = options.data;
      return options;
    }, error => {
      Promise.reject(error);
    })
    //请求处理
    instance(options).then(({data: {code, msg, data, total}}) => {
      // 请求成功时,根据业务判断状态
      if (code == 200) {
        resolve({code, msg, data, total})
        return false
      } else if (code == 520) {
        store.commit('user_infoFn', null)
        router.replace({
          name: "login"
        })
        return false
      }
      Message.warning(msg)
      reject({code, msg, data})
    }).catch((error) => {
      //请求失败时,根据业务判断状态
      if (error.response) {
        let resError = error.response
        let resCode = resError.status
        let resMsg = error.message
        Message.error('操作失败！错误原因 ' + resMsg)
        reject({code: resCode, msg: resMsg})
      }
    })
  })
}
