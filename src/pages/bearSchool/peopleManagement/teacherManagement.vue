<template>
  <div class="content-bj">
    <el-button class="block-but" @click="resetForm" v-if="boxShow !== 1">返回</el-button>
    <navTitle v-if="boxShow === 1" :navArr="['成长管理','老师管理']"></navTitle>
    <navTitle v-if="boxShow === 2" :navArr="['成长管理','老师管理','添加老师']"></navTitle>
    <navTitle v-if="boxShow === 3" :navArr="['成长管理','老师管理','编辑老师']"></navTitle>

    <div>
      <div v-if="boxShow === 1">
        <el-row type="flex" align="middle">
         <div class="condition-container">
            <el-input v-model="input" placeholder="输入编号/姓名" size="small" style="width: 200px;"></el-input>
            <el-button type="primary" icon="el-icon-search" @click="_searchTeacher" size="small">搜索</el-button>
            <el-button class="item" type="primary" @click="boxShow=2" size="small">添加老师</el-button>
          </div>

        </el-row>
        <el-table :data="tableData" style="width: 100%" class="backg-bor-style" size="medium">
          <el-table-column prop="id" label="用户编号"></el-table-column>
          <el-table-column prop="teacherName" label="老师姓名"></el-table-column>
          <el-table-column prop="sex"      :formatter="formatSex" label="性别"></el-table-column>
          <el-table-column prop="courseName" label="教学科目"></el-table-column>
          <el-table-column prop="gradeName" label="任教年级"></el-table-column>
          <el-table-column prop="className" label="任教班级"></el-table-column>
          <el-table-column prop="workDate" label="入职日期"></el-table-column>
          <el-table-column
            fixed="right"
            label="操作"
            width="130">
            <template slot-scope="scope">
              <el-button @click="editFn(scope.row.id)" type="text" size="mini">编辑</el-button>
              <el-button @click="_deleteTeacher(scope.row.id)" type="text" size="mini" style="color: #f00;">删除</el-button>
            </template>
          </el-table-column>
        </el-table>

      <bottom-tool-bar>
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
      </div>

      <div v-if="boxShow===2||boxShow===3">
        <addStudent @resetForm="resetForm" :teacherId="teacherId"></addStudent>
      </div>
    </div>
  </div>
</template>

<script>
import navTitle from "components/navTitle";
import bottomToolBar from 'components/bottomToolBar'
import addStudent from "./teacher/edit.vue";


export default {
  components: {
    navTitle,
    bottomToolBar,
    addStudent
  },
  props: {},
  data() {
    return {
      // 添加显示
      boxShow: 1,
      teacherId:null,
      //搜索
      input: "",
      tableData: [],
      pageSize: 10,
      pageNum: 1,
      total:0,
      value1: null,

      //
      dialogVisible: false,
      radio: "1"
    };
  },
  watch: {},
  computed: {},
  created() {
    this._getTeacherList();
  },
  methods: {

    formatSex: function(row, column) {
      return row.sex == 1 ? "男" : "女";
    },
    _deleteTeacher(teacherId){
      let params = {
        teacherId:teacherId
      };
      this.$fetch.dataApi
        .deleteTeacher(params)
        .then(({ data, msg, total }) => {
          this._getTeacherList();
        })
        .catch(() => {
          console.log(msg);
        });

    },
    //获取教师列表
    _searchTeacher(){
      this._getTeacherList();
    },
    _getTeacherList() {
      let params = {
        search:this.input,
        pageSize: this.pageSize,
        pageNum: this.pageNum
      };
      this.$fetch.dataApi
        .getTeacherList(params)
        .then(({ data, msg, total }) => {
          this.tableData = data;
          this.total = total;

          // this.$success.message(msg);
        })
        .catch(() => {
          console.log(msg);
        });
    },
    // 点击编辑按钮
    editFn(obj) {
      this.teacherId = obj;
      this.boxShow = 3;
    },
    resetForm() {
      this.boxShow = 1;
      this._getTeacherList();
    },
    dialogFn() {
      this.dialogVisible = false;
    },
    dialogTrueFn() {
      this.dialogVisible = true;
    },
    //分页
    handleSizeChange(val){
      this.pageSize=val
      this._getClassList()
    },
    handleCurrentChange(val){
      this.currentPage=val
      this._getClassList()
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
    /*line-height: 32px;*/
    /*text-align: right;*/
    /*vertical-align: middle;*/
    /*float: right;*/
    /*font-size: 14px;*/
    /*color: #5a5e66;*/
    /*padding: 0 12px 0 0;*/
    position: absolute;
    right: 20px;
  }
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
