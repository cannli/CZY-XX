<template>
  <div class="left-side" style="z-index:100;" v-if="true">
    <div class="left-side-inner">
     <!-- <router-link to="/home" class="logo block">
        <img src="./images/logo.png" alt="AdminX">
        <span>天玺教育后台管理系统</span>
      </router-link>-->
      <el-menu
        :defaultOpeneds="defaultOpeneds"
        class="menu-box"
        theme="dark"
        router
        :default-active="$route.path">
        <div
          v-for="(item, index) in nav_menu_data"
          :key="index">
          <el-menu-item
            class="menu-list"
            v-if="typeof item.child === 'undefined'" :index="item.path">
            <i class="icon fa" :class="item.icon"></i>
            <span v-text="item.title" class="text"></span>
          </el-menu-item>
          <el-submenu
            :index="item.path"
            v-else>
            <template slot="title">
              <i class="icon fa" :class="item.icon"></i>
              <span v-text="item.title" class="text"></span>
            </template>
            <el-menu-item
              class="menu-list"
              v-for="(sub_item, sub_index) in item.child"
              :index="sub_item.path"
              :key="sub_index">
              <!--<i class="icon fa" :class="sub_item.icon"></i>-->
              <span class="text">&nbsp;&nbsp;&nbsp;&nbsp;{{sub_item.title}}</span>
            </el-menu-item>
          </el-submenu>
        </div>
      </el-menu>
    </div>
  </div>
</template>
<script type="text/javascript">
  import {cookieStorage} from 'common/storage'

  export default {
    name: 'slide',
    data() {
      return {
        defaultOpeneds: ['/home', '/growthManagement', '/teachingManagement', '/peopleManagement','/schoolEstablishment'],
        nav_menu_data: [
          {
            title: "学校概况",
            path: "/home",
            icon: "fa-home"  //growthManagement
          },
          {
            title: "成长管理",
            path: "/growthManagement",
            icon: "el-icon-setting",
            child: [
              {
                title: "成长报告",
                path: "/growthManagement/growthReport"
              },
              {
                title: "对比分析",
                path: "/growthManagement/healthAnalysis"
              },
              {
                title: "专家分析",
                path: "/growthManagement/suggest"
              }
            ]
          },
          {
            title: "教务管理",
            path: "/teachingManagement",
            icon: "fa-table",
            child: [
              {
                title: "成绩管理",
                path: "/teachingManagement/index"
              }
            ]
          },
          {
            title: "人员管理",
            path: "/peopleManagement",
            icon: "el-icon-menu",
            child: [
              {
                title: "学生管理",
                path: "/peopleManagement/studentManagement"
              },
              {
                title: "老师管理",
                path: "/peopleManagement/teacherManagement"
              }
            ]
          },
          {
            title: "学校设置",
            path: "/schoolEstablishment",
            icon: "el-icon-document",
            child: [
              {
                title: "资料设置",
                path: "/schoolEstablishment/dataSet"
              },
              {
                title: "班级管理",
                path: "/schoolEstablishment/classManagement"
              }
            ]
          }
        ]
      }
    },
    mounted() {
     // this.getLeftFn()
      console.log(cookieStorage.get('user_info').user.apiAuth, 'cookieStorage.get(user_info)')
    },
    methods: {
      getLeftFn() {
        this.$fetch.api_leftmenu.getMenuFn().then(({data, msg}) => {
          console.log(data, 'getMenuFn3333')
        this.load_data = false
      })
      .
        catch(() => {
          this.load_data = false
      })
      },
    }
  }
</script>
