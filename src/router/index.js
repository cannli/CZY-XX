/**
 * Created by zzmhot on 2017/3/23.
 *
 * 路由Map
 *
 * @author: zzmhot
 * @github: https://github.com/zzmhot
 * @email: zzmhot@163.com
 * @Date: 2017/3/23 18:30
 * @Copyright(©) 2017 by zzmhot.
 *
 */

import Vue from 'vue';
import VueRouter from 'vue-router';
import store from 'store';
// import 'nprogress/nprogress.css';

//import components
//view page warp component
const viewPageComponent = resolve => require(['pages/App'], resolve)
//home
const homeComponent = resolve => require(['pages/home/index'], resolve)
//404
const noPageComponent = resolve => require(['pages/error/404'], resolve)
//login
const loginComponent = resolve => require(['pages/user/login'], resolve)



//成长报告
const growthReport = resolve => require(['pages/bearSchool/growthManagement/growthReport'], resolve)
// 健康分析
const healthAnalysis = resolve => require(['pages/bearSchool/growthManagement/healthAnalysis'], resolve)
// 建议解析
const suggest = resolve => require(['pages/bearSchool/growthManagement/suggest'], resolve)
// 学生管理
const studentManagement = resolve => require(['pages/bearSchool/peopleManagement/studentManagement'], resolve)

// laoshi管理 teacherManagement.vue
const teacherManagement = resolve => require(['pages/bearSchool/peopleManagement/teacherManagement'], resolve)

//资料设置 classManagement  schoolEstablishment/dataSet
const dataSet = resolve => require(['pages/bearSchool/schoolEstablishment/dataSet'], resolve)
// 班级管理
const classManagement = resolve => require(['pages/bearSchool/schoolEstablishment/classManagement'], resolve)
// 教务管理 teachingManagement
const teachingManagement = resolve => require(['pages/bearSchool/teachingManagement/index'], resolve)
Vue.use(VueRouter);

//使用AMD方式加载
// component: resolve => require(['pages/home'], resolve),
const routes = [
  {
    path: '/404',
    name: 'notPage',
    component: noPageComponent
  },
  {
    path: '*',
    redirect: '/404'
  },
  {
    path: '/user/login',
    name: 'login',
    component: loginComponent
  },
  {
    path: '/',
    redirect: '/home',
    component: viewPageComponent,
    children: [
      {
        path: '/home',
        name: 'home',
        component: homeComponent,
        meta: {
          title: '学校概况',
          auth: true
        }
      },
      {
        path: '/growthManagement/growthReport',
        name: 'growthReport',
        component: growthReport,
        meta: {
          title: '成长报告',
          auth: true
        }
      },
      {
        path: '/growthManagement/healthAnalysis',
        name: 'healthAnalysis',
        component: healthAnalysis,
        meta: {
          title: '对比分析',
          auth: true
        }
      },
      {
        path: '/growthManagement/suggest',
        name: 'suggest',
        component: suggest,
        meta: {
          title: '专家分析',
          auth: true
        }
      }
      ,
      {
        path: '/teachingManagement/index',
        name: 'teachingManagement',
        component: teachingManagement,
        meta: {
          title: '教务管理',
          auth: true
        }
      },
      {
        path: '/peopleManagement/studentManagement',
        name: 'studentManagement',
        component: studentManagement,
        meta: {
          title: '学生管理',
          auth: true
        }
      },
      {
        path: '/peopleManagement/teacherManagement',
        name: 'teacherManagement',
        component: teacherManagement,
        meta: {
          title: '老师管理',
          auth: true
        }
      },
      {
        path: '/schoolEstablishment/dataSet',
        name: 'dataSet',
        component: dataSet,
        meta: {
          title: '资料设置',
          auth: true
        }
      },
      {
        path: '/schoolEstablishment/classManagement',
        name: 'classManagement',
        component: classManagement,
        meta: {
          title: '班级设置',
          auth: true
        }
      },


    ]
  }
];

const router = new VueRouter({
  routes,
  mode: 'hash', //default: hash ,history
  scrollBehavior(to, from, savedPosition) {
    if (savedPosition) {
      return savedPosition;
    } else {
      return {x: 0, y: 0};
    }
  }
});

//全局路由配置
//路由开始之前的操作
router.beforeEach((to, from, next) => {
  // NProgress.done().start();
  let toName = to.name;
  // let fromName = from.name
  let is_login = store.state.user_info.login;

  if (!is_login && toName !== 'login') {
    next({
      name: 'login'
    });
  } else {
    if (is_login && toName === 'login') {
      next({
        path: '/'
      });
    } else {
      next();
    }
  }
});

//路由完成之后的操作
/*
router.afterEach(route => {
  NProgress.done();
});
*/

export default router;
