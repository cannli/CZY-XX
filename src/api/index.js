
//导入模块
// import * as api_file from './file'
import * as api_user from './user'
import * as dataApi from './dataApi'


const apiObj = {
   api_user,
   dataApi
}

const install = function (Vue) {
  if (install.installed) return
  install.installed = true

  //定义属性到Vue原型中
  Object.defineProperties(Vue.prototype, {
    $fetch: {
      get() {
        return apiObj
      }
    }
  })
}

export default {
  install
}
