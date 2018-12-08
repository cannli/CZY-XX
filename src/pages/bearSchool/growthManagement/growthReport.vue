<template>
  <div>
    <div class="content-bj" v-if="page === 'active'">
      <navTitle :navArr="['成长管理','成长报告']"></navTitle>
      <el-row style="margin-bottom: 20px;">
        <el-button style="background-color:#019DE0;border:#019DE0" type="success" @click="dialog = true">预约体检
        </el-button>
      </el-row>
      <el-table class="backg-bor-style"
                :data="tableData"
                style="width: 100%"
                size="medium">
        <el-table-column
          prop="projectCode"
          label="项目编号"
        >
        </el-table-column>
        <el-table-column
          prop="checkTime"
          label="体检日期">
        </el-table-column>
        <el-table-column
          prop="attendNum"
          label="参与人数">
        </el-table-column>
        <el-table-column
          prop="absentCount"
          label="缺席人数">
        </el-table-column>

        <el-table-column
          label="综合评分">
          <template slot-scope="scope">
            <span>{{scope.row.score<90?'良':'优'}}</span>
          </template>
        </el-table-column>

        <el-table-column
          prop="fileUploaded"
          :formatter="formatFileUploaded"
          label="定制报告">
        </el-table-column>
        <el-table-column
          label="操作"
          width="130">
          <template slot-scope="scope">
            <el-button type="text" size="mini" v-if="scope.row.status==-1" style="color: red;">拒绝</el-button>
            <el-button type="text" size="mini" v-if="scope.row.status==0" style="color: grayR">已取消</el-button>
            <el-button type="text" size="mini" v-if="scope.row.status==1||scope.row.status==2">--</el-button>
            <el-button @click="detailsFn(scope.row.projectCode)" v-if="scope.row.status==3||scope.row.status==4"
                       type="text" size="small">查看详情
            </el-button>
          </template>
        </el-table-column>
      </el-table>

      <bottom-tool-bar v-show="tableData.length>0">
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

      <el-dialog
        title="预约时间"
        :visible.sync="dialog"
        width="15%"
        center><!--  value-format="yyyy-MM-dd"-->
        <el-date-picker
          @change="changeFn"
          v-model="yuYueTime"
          type="date"
          value-format="yyyy-MM-dd"
          placeholder="选择日期时间">
        </el-date-picker>
        <span slot="footer" class="dialog-footer">
    <el-button @click="dialog = false,yuYueTime=''">取 消</el-button>
    <el-button type="primary" @click="_applyExam">确 定</el-button>
  </span>
      </el-dialog>

    </div>
    <div v-else>
      <growh :projectCode="projectCode" @closeFn="closeFn"></growh>
    </div>

  </div>
</template>

<script>
  import navTitle from "components/navTitle";
  import growh from "./growth/index";
  import bottomToolBar from 'components/bottomToolBar'

  export default {
    components: {navTitle, growh, bottomToolBar},
    props: {},
    data() {
      return {
        yuYueTime: '',
        dialog: false,
        page: "active",
        projectCode: null,
        tableData: [],
        pageSize: 10,
        pageNum: 1,
        total: 0
      };
    },
    watch: {},
    computed: {},
    created() {
      this._scoreList();
    },
    mounted() {
    },
    methods: {
      formatFileUploaded(row) {
        if (row.status == 1) {
          return "已申请";
        } else if (row.status == 2) {
          return "待体检";
        } else if (row.status == 3) {
          return "仍在审核";
        } else {
          return "已出";
        }

      },
      closeFn() {
        this.page = "active"
      },
      detailsFn(projectCode) {
        this.projectCode = projectCode;
        this.page = "";
      },
      //获取成长报告
      _scoreList() {
        let params = {
          pageSize: this.pageSize,
          pageNum: this.pageNum,
          statusType: 1
        };
        this.$fetch.dataApi
          .scoreList(params)
          .then(({data, msg, total}) => {
            this.tableData = data;
            this.total = total;

          })
          .catch(() => {
            console.log("请求失败");
            console.log(msg);
          });
      },

      //分页
      handleSizeChange(val) {
        this.pageSize = val;
        this._getClassList();
      },
      handleCurrentChange(val) {
        this.currentPage = val;
        this._getClassList();
      },
      changeFn(val) {
        this.val = val;
      },
      _applyExam() {
        let params = {
          checkTime: this.val
        };
        console.info(params.checkTime)
        this.$fetch.dataApi
          .applyExam(params)
          .then(({data, msg, total}) => {
            this._scoreList()
            this.dialog = false

          })
          .catch(() => {
            console.log("请求失败")
            console.log(msg)
          });
      }
    }
  };
</script>

<style scoped lang="scss" type="text/scss" rel="stylesheet/scss">
</style>
