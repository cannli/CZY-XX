<template>
  <div class="content-bj">
    <el-button class="block-but" @click="resetForm" v-if="boxShow === 2">返回</el-button>
    <navTitle v-if="boxShow === 1" :navArr="['人员管理','学生管理']"></navTitle>
    <navTitle v-if="boxShow === 2" :navArr="['人员管理','学生管理','编辑学生']"></navTitle>
    <div>

      <div v-if="boxShow === 1">
        <el-row type="flex" align="middle">
          <div class="condition-container">
            <el-select v-model="searchData.school" placeholder="在校学生" size="small" style="width: 120px;">
              <el-option label="在校学生" value="true"></el-option>
              <el-option label="结业学生" value="false"></el-option>
            </el-select>

            <el-cascader :props="gradeProps" style="width: 200px;" size="small" v-model="searchData.gradeClassOptions" placeholder="年级/班级"
                         :options="gradeClassOptions" change-on-select></el-cascader>


            <el-select v-model="searchData.sex" placeholder="性别" size="small" style="width: 120px;">
              <el-option label="男" value="1"></el-option>
              <el-option label="女" value="2"></el-option>
            </el-select>
            <el-button type="primary" icon="el-icon-search" @click="searchStudentList()" size="small">搜索</el-button>

            <!-- <el-input v-model="tableData.username" placeholder="输入姓名" size="small" style="width: 200px;"></el-input> -->
            <div class="boxFloat">
              <el-button class="item1" type="primary" @click="_editFn(null)" size="small">添加学生</el-button>
              <el-button class="item1" type="primary" @click="_downLoadStudentExcel()"
                         size="small">excel模板下載
              </el-button>
              <el-upload :show-file-list="false" class="item1"
                         :action="projectRootUrl+'/school/saveStudentExcel.do'" :headers="myHeaders"
                         :on-success="_uploadStudentExcel">
                <el-button class="item1" type="primary" size="small">Excel导入</el-button>

              </el-upload>
            </div>
          </div>

        </el-row>
        <el-table :data="tableData" style="width: 100%" class="backg-bor-style" size="medium">
          <el-table-column prop="id" label="用户编号"></el-table-column>
          <el-table-column prop="username" label="学生姓名"></el-table-column>
          <el-table-column prop="sex" :formatter="formatSex" label="性别"></el-table-column>
          <el-table-column prop="gradeName" label="年級"></el-table-column>
          <el-table-column prop="className" label="班級"></el-table-column>
          <el-table-column prop="birth" label="出生日期"></el-table-column>
          <el-table-column prop="status" :formatter="formatStatus" label="状态"></el-table-column>


          <el-table-column prop="birthAddress" label="出生地" show-overflow-tooltip>
            <template slot-scope="scope">
              {{scope.row.birthProvinceName}}{{scope.row.birthCityName ? '-' : ''}}
              {{scope.row.birthCityName}}{{scope.row.birthCountyName ? '-' : ''}}{{scope.row.birthCountyName}}
            </template>
          </el-table-column>
          <el-table-column prop="parentsPhone" label="家长联系方式" show-overflow-tooltip></el-table-column>
          <el-table-column
            label="操作"
            width="130">
            <template slot-scope="scope">
              <el-button @click="_editFn(scope.row.id)" type="text" size="mini">编辑</el-button>
              <!--<el-button v-if="scope.row.flag" @click="_dialogTrueFn(scope.row)" type="text" size="small" style="color: #f00;">归档</el-button>-->
              <!--<el-button v-else @click="" type="text" size="small" style="color: #f00;">撤回</el-button>-->
            </template>
          </el-table-column>
        </el-table>

        <!--弹框-->
        <el-dialog
          center
          title=""
          :visible.sync="dialogVisible"
          width="30%">
          <div class="text1" style="">归档表示学生已不在本校就读！</div>
          <el-radio-group v-model="colObj.status" class="radio-box">
            <el-radio label="2">毕业</el-radio>
            <el-radio label="3">转学</el-radio>
            <el-radio label="4">退学</el-radio>
          </el-radio-group>
          <span slot="footer" class="dialog-footer">
              <el-button @click="dialogVisible = false">取 消</el-button>
              <el-button type="primary" @click="dialogFn">确 定</el-button>
          </span>
        </el-dialog>
      </div>
      <bottom-tool-bar v-if="boxShow===1">
        <!--分页-->
        <div slot="page" class="pagination-sty">
          <el-pagination
            @size-change="handleSizeChange"
            @current-change="handleCurrentChange"
            :current-page="pageNum"
            :page-sizes="[10, 20, 30, 40]"
            :page-size="pageSize"
            layout="total, sizes, prev, pager, next, jumper"
            :total="total">
          </el-pagination>
        </div>
      </bottom-tool-bar>

      <div v-if="boxShow===2">
        <addStudent @resetForm="resetForm" :cityOptionsArr="cityOptionsArr" :gradeClassOptions="gradeClassOptions"
                    :studentId="studentId"></addStudent>
      </div>
    </div>
  </div>
</template>

<script>
  import navTitle from "components/navTitle";
  import addStudent from "./student/addStudent.vue";
  import bottomToolBar from 'components/bottomToolBar';
  import {checkEmail} from 'assets/js/jiaoyan.js'

  export default {
    components: {
      navTitle,
      addStudent,
      bottomToolBar
    },
    props: {},
    data() {
      return {
        // 添加显示
        projectRootUrl: window.projectRootUrl,
        boxShow: 1,
        gradeProps: {
          value: 'id',
          children: 'children'
        },
        //搜索
        input: "",
        pageSize: 10,
        pageNum: 1,
        total: 0,
        cityOptionsArr: [],
        searchData: {
          sex: null,
          gradeClassOptions: [],
          school: null
        },

        tableData: [],
        gradeClassOptions: [],
        classListData: [],
        value1: null,
        colObj: {},
        studentId: null,
        dialogVisible: false,
        radio: "1"
      };
    },
    watch: {},
    computed: {
      myHeaders() {
        let tokens = this.$fetch.dataApi.getHeaderToken();
        return {Authorization: tokens, userType: 2};
      }

    },
    created() {
      this._getStudentList();
      this._getGradeClassList();
      this._getAreaList();
    },

    mounted() {
      this.$nextTick(() => {

      });
    },
    methods: {

      _getAreaList() {
        this.$fetch.dataApi.getAreaList({})
          .then(({data, msg, total}) => {
            this.cityOptionsArr = data;

          })
          .catch(() => {
            console.log("请求失败");
            console.log(msg);
          });
      },

      formatSex: function (row, column) {
        return row.sex == 1 ? "男" : "女";
      },
      formatStatus: function (row, column) {
        if (row.status == 1) {
          return "在校";
        } else if (row.status == 2) {
          return "毕业";
        } else if (row.status == 3) {
          return "转学";
        } else {
          return "退学";
        }
      },

      //获取学生信息列表
      _getStudentList() {

        let params = {
          pageSize: this.pageSize,
          pageNum: this.pageNum
        };
        this.$fetch.dataApi
          .getStudentList(params)
          .then(({data, msg, total}) => {
            this.tableData = data;
            this.total = total;

            // this.$message.success(msg);
          })
          .catch(() => {
            console.log("请求失败");
            console.log(msg);
          });
      },
      //获取学校所拥有的年级列表 学生管理中年级的下拉框

      _getGradeClassList() {
        this.$fetch.dataApi.getGradeClassList({}).then(({data}) => {
          this.gradeClassOptions = data;
        });
      },


      //根据条件搜索学生信息
      searchStudentList() {
        let self = this;
        let gradeClassOptions = self.searchData.gradeClassOptions;
        let gradeId;
        if (gradeClassOptions.length > 0) {
          gradeId = gradeClassOptions[0];
        }
        let gradeClass = null
        if (gradeClassOptions.length > 1) {
          gradeClass = gradeClassOptions[1];
        }
        let params = {
          graduation: self.searchData.school,
          grade: gradeId,
          gradeClass: gradeClass,
          sex: self.searchData.sex,
          pageSize: this.pageSize,
          pageNum: this.pageNum
        };
        this.$fetch.dataApi
          .getStudentList(params)
          .then(({data, msg, total}) => {
            this.tableData = data;
            this.total = total;

            // this.$message.success(msg);
          })
          .catch(() => {
            console.log("请求失败");
            console.log(msg);
          });
      },

      //学生信息归档
      saveToHis() {
        let self = this;
        let params = {
          reasonType: self.colObj.status,
          studentId: self.colObj.id
        };
        this.$fetch.dataApi
          .getStudentList(params)
          .then(({data, msg, total}) => {
            this.tableData = data;
            this.total = total;


            // this.$message.success(msg);
          })
          .catch(() => {
            console.log("请求失败");
            console.log(msg);
          });
        this.dialogVisible = false;
      },
      // 点击编辑按钮
      _editFn(obj) {
        this.studentId = obj;
        this.boxShow = 2;
      },
      _uploadStudentExcel(res, file) {
        if (res.code != 200) {
          //弹出提示框
          return;
        }
        if (res.data.status == 1) {
          this.searchStudentList();
          this._downLoadFile(res.data.fileName, "导入学生信息过程中错误数据.xlsx")
          return;
        }
        this.searchStudentList();

      },
      _downLoadStudentExcel() {
        this.$fetch.dataApi
          .downLoadStudentExcel({}).then(({data, msg, total}) => {
            this._downLoadFile(data, "学生导入模板.xlsx");
          })
          .catch((msg) => {
            console.log("请求失败");
            console.log(msg);
          });

      },

      _downLoadFile(fileName, showName) {
        this.$fetch.dataApi
          .downloadFile(fileName, showName)
          .then(({data, msg, total}) => {})
          .catch(() => {
            console.log("请求失败");
            console.log(msg);
          });

      },

      resetForm() {
        this.boxShow = 1;
        this._getStudentList()
      },
      dialogFn() {
        this.dialogVisible = false;
      },
      dialogTrueFn(obj) {
        this.dialogVisible = true;
        this.colObj = Object.assign({}, obj);
      },
      //分页
      handleSizeChange(val) {
        this.pageSize = val
        this.searchStudentList()
      },
      handleCurrentChange(val) {
        this.pageNum = val

        this.searchStudentList()
      },
    }
  };
</script>

<style scoped lang="scss" type="text/scss" rel="stylesheet/scss">
  .condition-container {
    margin-bottom: 20px;
    width: 100%;
    position: relative;
    .item {
      float: right;
      .item-but {
        display: inline-block;
      }
    }

  }

  .boxFloat {
    float: right;
    display: inline-block;
    .item1 {
      display: inline-block;
    }
  }

  .boxFloat:after {
    height: 0;
    content: '';
    visibility: hidden;
    overflow: hidden;
    clear: both;
  }

  .text1 {
    width: 100%;
    text-align: center;
    color: #ff4242;
    font-size: 14px;
  }

  .radio-box {
    width: 100%;
    text-align: center;
    margin: 40px 0 20px 0;
  }
</style>
