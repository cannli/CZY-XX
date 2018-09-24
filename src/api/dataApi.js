/**
 * @file: user.
 * @intro: 用户请求数据配置.
 * @author: zzmhot.
 * @email: zzmhot@163.com.
 * @Date: 2017/5/8 15:18.
 * @Copyright(©) 2017 by zzmhot.
 *
 */

import fetch from 'common/fetch'
import {port_user} from 'common/port_uri'
import store from 'store'



export function getHeaderToken(){
  return store.state.user_info.user.token;
}

//添加班级
export function addClassItem(data){
  return fetch({
    url: window.projectRootUrl + '/school/gradeClass/saveOrUpdateClass.do',
    method: 'post',
    data: data
  })
}


//添加班级
export function deleteClassItem(data){
  return fetch({
    url: window.projectRootUrl + '/school/gradeClass/deleteClass.do',
    method: 'post',
    params: data
  })
}





//获取学生信息列表
export function getStudentList(params){
  return fetch({
    url: window.projectRootUrl + '/school/studentList.do',
    method: 'get',
    params
  })
}

//获取学生详情->学生信息查看
export function studentDetail(params){
  return fetch({
    url: window.projectRootUrl + '/school/studentDetail.do',
    method: 'get',
    params
  })
}

//修改学生信息
export function saveOrUpdateStudent(data){
  return fetch({
    url: window.projectRootUrl + '/school/saveOrUpdateStudent.do',
    method: 'post',
    data: data
  })
}





//获取学校所拥有的年级列表 学生管理中年级的下拉框
export function getGradeList(params){
  return fetch({
    url: window.projectRootUrl + '/school/gradeClass/getGradeList.do',
    method: 'get',
    params
  })
}

//获取班级列表 学生管理中班级的下拉框
export function getClassList(params){
  return fetch({
    url: window.projectRootUrl + '/school/gradeClass/getClassList.do',
    method: 'get',
    params
  })
}

//获取班级列表 学生管理中班级的下拉框
export function getGradeClassList(params){
  return fetch({
    url: window.projectRootUrl + '/school/gradeClass/getGradeClassList.do',
    method: 'get',
    params
  })
}

export function getSchoolCourseList(params){
  return fetch({
    url: window.projectRootUrl + '/school/course/list.do',
    method: 'get',
    params
  })
}






//学生信息归档
export function saveToHis(params){
  return fetch({
    url: window.projectRootUrl + '/school/saveToHis.do',
    method: 'get',
    params
  })
}

//学生信息归档
export function overview(params){
  return fetch({
    url: window.projectRootUrl + '/school/overview.do',
    method: 'get',
    params
  })
}
//获取 教务管理-成绩管理
export function getScoreList(params){
  return fetch({
    url: window.projectRootUrl + '/school/report/getScoreList.do',
    method: 'get',
    params
  });
}

//下载 成长管理（建议分析）和成绩管理（教务管理）
export function reportList(params){
  return fetch({
    url: window.projectRootUrl + '/school/report/reportList.do',
    method: 'get',
    params
  });
}

export function downLoadStudentExcel(params){
  return fetch({
    url: window.projectRootUrl + '/school/downStudentExcelTemplate.do',
    method: 'get',
    params
  });
}

export function downloadFile(fileName,showName){
  window.location.href=window.projectRootUrl + '/school/downloadFile.do?fileName='+fileName+"&showFile="+showName;
}







export function getAreaList(params){
  return fetch({
    url: window.projectRootUrl + '/school/getAreaList.do',
    method: 'get',
    params
  });
}

export function downloadSuggestFile(fileName,fileType){
  window.location.href=window.projectRootUrl + '/school/report/reportList.do?fileName='+fileName+"&fileType="+fileType
}

//成长管理/成长报告和建议解析 列表
export function scoreList(params){
  return fetch({
    url: window.projectRootUrl + '/school/report/scoreList.do',
    method: 'get',
    params
  });
}



//成长管理/成长报告和建议解析 列表
export function baseProjectInfo(params){
  return fetch({
    url: window.projectRootUrl + '/school/report/baseProjectInfo.do',
    method: 'get',
    params
  });
}

//成长管理/成长报告和建议解析 列表
export function applyExam(params){
  return fetch({
    url: window.projectRootUrl + '/admin/applyExam.do',
    method: 'get',
    params
  });
}
// 人员管理中老师管理列表
export function getTeacherList(params){
  return fetch({
    url: window.projectRootUrl + '/school/teacher/getTeacherList.do',
    method: 'get',
    params
  });
}


// 人员管理中老师管理列表
export function deleteTeacher(params){
  return fetch({
    url: window.projectRootUrl + '/school/teacher/deleteTeacher.do',
    method: 'get',
    params
  });
}

//人员管理中老师管理列表中的老师信息的添加或修改
export function saveOrUpdateTeacher(data){
  return fetch({
    url: window.projectRootUrl + '/school/teacher/saveOrUpdateTeacher.do',
    method: 'post',
    data: data
  });
}

//人员管理中老师管理列表中的老师详情
export function getTeacherInfo(params){
  return fetch({
    url: window.projectRootUrl + '/school/teacher/getTeacherInfo.do',
    method: 'get',
    params
  });
}

// 获取学校信息
export function getSchoolDetail(data){
  return fetch({
    url: window.projectRootUrl + '/school/getSchoolDetail.do',
    method: 'get',
    data
  })
}

// 修改学校信息
export function updateSchool(data){
  return fetch({
    url: window.projectRootUrl + '/school/updateSchool.do',
    method: 'post',
    data
  })
}

  // 综合测评
  export function zongheCp(params){
    return fetch({
      url: window.projectRootUrl + '/school/report/overview.do',
      method: 'get',
      params
    })

}

// 综合测评
export function studentBaseInfo(params){
  return fetch({
    url: window.projectRootUrl + '/school/report/studentBaseInfo.do',
    method: 'get',
    params
  })

}

// 综合测评
export function shapeReport(params){
  return fetch({
    url: window.projectRootUrl + '/school/report/shapeReport.do',
    method: 'get',
    params
  })

}


// 综合测评
export function compareHeight(params){
  return fetch({
    url: window.projectRootUrl + '/school/report/compareHeight.do',
    method: 'get',
    params
  })

}
export function studentRiskReport(params){
  return fetch({
    url: window.projectRootUrl + '/school/report/studentRiskReport.do',
    method: 'get',
    params
  })
}

// 获取 对比分析中的年级
export function examGrade(params){
  return fetch({
    url: window.projectRootUrl + '/school/compare/report/examGrade.do',
    method: 'get',
    params
  })
}

// 获取 对比分析中的年级
export function exam(params){
  return fetch({
    url: window.projectRootUrl + '/school/compare/report/examGrade/exam.do',
    method: 'get',
    params
  })
}


/************************对比分析***********************************/

// 全校综合情况身高体重
export function compareAvgHw(params){
  return fetch({
    url: window.projectRootUrl + '/school/compare/report/compareAvgHw.do',
    method: 'get',
    params
  })
}
// BMI指数
export function compareBMi(params){
  return fetch({
    url: window.projectRootUrl + '/school/compare/report/compareBMi.do',
    method: 'get',
    params
  })
}
// 人体图形体态情况
export function compareTtStatic(params){
  return fetch({
    url: window.projectRootUrl + '/school/compare/report/compareTtStatic.do',
    method: 'get',
    params
  })
}

// 身高体重数据
export function compareHw(params){
  return fetch({
    url: window.projectRootUrl + '/school/compare/report/compareHw.do',
    method: 'get',
    params
  })
}

// 体态数据
export function compareTt(params){
  return fetch({
    url: window.projectRootUrl + '/school/compare/report/compareTt.do',
    method: 'get',
    params
  })
}

// 两次总体风险值对比
export function compareDisk(params){
  return fetch({
    url: window.projectRootUrl + '/school/compare/report/compareDisk.do',
    method: 'get',
    params
  })
}


