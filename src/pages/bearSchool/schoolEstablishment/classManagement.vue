<template>
  <div>
    <navTitle :navArr="['学校设置','班级管理']"></navTitle>


    <div class="content-bj">
      <el-row type="flex" align="middle" style="margin-bottom: 20px;">
        <el-input v-model="input" placeholder="年级/班级" size="small"
                  style="width: 200px; margin-right: 20px;"></el-input>
        <el-button type="primary" icon="el-icon-search" size="small" @click="_getClassList()">搜索</el-button>

        <el-button type="primary" size="small" @click="_getGradeList(null,null,null)">添加班级</el-button>
        <!--<el-button type="primary" icon="el-icon-search" size="small" @click="_addClassItem()">添加班级</el-button>-->
        <el-dialog
          :title="title"
          :visible.sync="dialogFormVisible"
          width="30%"
          center>
          <el-form :model="gradeform" :label-width="formLabelWidth">
            <el-form-item v-show="gradeSelect" label="选择年级" placeholder="输入年级">
              <el-select v-show="gradeSelect" v-model="gradeform.gradeId" placeholder="请选择年级" size="100px">
                <el-option
                  v-for="(itemGrade,index) in gradeList"
                  :key="index"
                  :label="itemGrade.gradeName"
                  :value="itemGrade.id">
                </el-option>
              </el-select>
            </el-form-item>
            <el-form-item label="班级">
              <el-input v-model="gradeform.className" auto-complete="off"></el-input>
            </el-form-item>
          </el-form>
          <div slot="footer" class="dialog-footer">
            <el-button @click="dialogFormVisible = false">取 消</el-button>
            <el-button type="primary" @click="_addClassItem()">确 定</el-button>
          </div>
        </el-dialog>

      </el-row>
      <el-table :data="tableData" style="width: 100%" class="backg-bor-style" size="medium">
        <el-table-column prop="gradeName" label="年级"></el-table-column>
        <el-table-column prop="className" label="班级"></el-table-column>

        <el-table-column
          fixed="right"
          label="操作"
          width="130">
          <template slot-scope="scope">
            <el-button @click="_getGradeList (scope.row.id,scope.row.gradeId,scope.row.className)" type="text"
                       size="mini">修改
            </el-button>
            <el-button @click="_deleteClassItem(scope.row.id)" type="text" size="mini" style="color: #f00;">删除
            </el-button>
          </template>
        </el-table-column>
      </el-table>

      <bottom-tool-bar v-if="tableData.length>0">
        <!--分页-->
        <div slot="page" class="pagination-sty">
          <el-pagination
            @size-change="handleSizeChange"
            @current-change="handleCurrentChange"
            :current-page="currentPage"
            :page-sizes="[10, 20, 30, 40]"
            :page-size="pageSize"
            layout="total, sizes, prev, pager, next, jumper"
            :total="total">
          </el-pagination>
        </div>
      </bottom-tool-bar>

    </div>


  </div>
</template>

<script>
  import navTitle from 'components/navTitle'
  import bottomToolBar from 'components/bottomToolBar'


  export default {
    components: {navTitle, bottomToolBar},
    props: {},
    data() {
      return {
        input: '',
        tableData: [],
        total: 0,
        pageSize: 10,
        currentPage: 1,
        gradeList: [],
        load_data: true,
        gradeSelect: true,
        title: "添加班级",
        gradeform: {
          gradeId: '',
          className: '',
          id: null
        },
        dialogFormVisible: false,
        formLabelWidth: '120px'
      }
    },
    watch: {},
    computed: {},
    created() {
    },
    mounted() {
      this.$nextTick(() => {
        this._getClassList()
      })
    },
    methods: {


      _getGradeList(id, gradeId, className) {
        this.dialogFormVisible = true;
        this.gradeform.id = id;
        this.gradeform.gradeId = gradeId;
        this.gradeform.className = className;
        if (id) {
          this.title = "修改班级";
          this.gradeSelect = false;
        } else {
          this.title = "添加班级";
          this.gradeSelect = true;
          this.$fetch.dataApi.getGradeList({})
            .then(({data, msg}) => {
              this.gradeList = data;
              this.load_data = false;
            }).catch(() => {
            this.load_data = false;
            console.log('请求失败');
          })


        }


      },
      _addClassItem() {

        this.$fetch.dataApi.addClassItem(this.gradeform)
          .then(({data, msg}) => {

            this._getClassList();
            this.dialogFormVisible = false;
          }).catch(() => {
          this.load_data = false;
          console.log('请求失败');
        })
      },
      _getClassList() {
        let params = {
          pageSize: this.pageSize,
          pageNum: this.currentPage,
          search: this.input
        };
        this.$fetch.dataApi.getClassList(params).then(({data, msg, total}) => {

          this.tableData = data;
          this.total = total;

          this.load_data = false;
        }).catch(() => {
          this.load_data = false;
        })
      },
      handleSizeChange(val) {
        this.pageSize = val
        this._getClassList()
      },
      handleCurrentChange(val) {
        this.currentPage = val
        this._getClassList()
      },


      _deleteClassItem(id) {

        let params = {
          id: id
        };

        this.$confirm('删除该班级, 是否继续?', '提示', {
          confirmButtonText: '确定', cancelButtonText: '取消', type: 'warning'
        }).then(() => {

          this.$fetch.dataApi.deleteClassItem(params).then(({data, msg, total}) => {

            this._getClassList()

            this.load_data = false;
          }).catch(() => {
            this.load_data = false;
          })

        }).catch(() => {

        });


      },
    },
  }
</script>


