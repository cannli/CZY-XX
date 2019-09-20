
//导入样式
// import 'normalize.css'
import 'font-awesome/scss/font-awesome.scss'
//import 'element-ui/lib/theme-default/index.css'
import 'element-ui/lib/theme-chalk/index.css'
//导入Vue框架
import Vue from 'vue'
//导入element组件
import ElementUI from 'element-ui'
//导入组件
import router from './router'
//导入状态管理器
import store from 'store'
//导入请求框架
import api from './api'
//导入自定义插件
import Plugins from 'plugins'
//导入主视图文件
import App from './App'
//导入mock数据
//import './mock'
// js
import ku from "./assets/js/ku.js"
import common from "./assets/js/common.js"
import './ui.js'
//导入地区插件
import VueAreaLinkage from 'vue-area-linkage'
import 'vue-area-linkage/dist/index.css';

window.projectRootUrl =  'http://www.egrowth.cn/api' 
// 'http://health.junlz.com/bghealth/api'
//  window.projectRootUrl = 'http://39.107.74.125/bghealth/api'
// window.projectRootUrl = 'http://localhost'
//使用地区插件
Vue.use(VueAreaLinkage)
//使用element-ui
Vue.use(ElementUI)
//富文本
//import VueQuillEditor from 'vue-quill-editor'

// require styles
//import 'quill/dist/quill.core.css'
//import 'quill/dist/quill.snow.css'
//import 'quill/dist/quill.bubble.css'

//Vue.use(VueQuillEditor, /* { default global options } */)

//使用自定义插件
Vue.use(Plugins)

//使用api
Vue.use(api)

Vue.use(ku)
Vue.use(common)
//发布后是否显示提示
Vue.config.productionTip = false

//是否开启工具调试
Vue.config.devtools = process.env.NODE_ENV === 'development'

new Vue({
  router,
  store,
  ...App
}).$mount('mainbody')
