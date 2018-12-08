<template>
  <div class="content-bj">
    <navTitle :navArr="['成长管理','建议解析']"></navTitle>

    <el-table class="backg-bor-style"
              :data="tableData"
              style="width: 100%"
    size="mudium">
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
        prop="score"
        label="综合评分">
        <template slot-scope="scope">
          <span>{{scope.row.score<90?'良':'优'}}</span>
        </template>
      </el-table-column>
      <el-table-column
        fixed="right"
        label="操作"
        width="130">
        <template slot-scope="scope">
          <el-button v-if="scope.row.fileUploaded==1" @click="_reportList(scope.row.id)" type="text" size="mini">下载</el-button>
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
</template>

<script>
import navTitle from "components/navTitle";
import bottomToolBar from 'components/bottomToolBar'
export default {
  components: { navTitle,bottomToolBar },
  props: {},
  data() {
    return {
      tableData: [],
      pageSize: 10,
      pageNum: 1,
      total:0
    };
  },
  watch: {},
  computed: {},
  created() {
    this._scoreList();
  },
  methods: {
    //获取建议分析列表
    _scoreList() {
      let params = {
        pageSize: this.pageSize,
        pageNum: this.pageNum,
        statusType:2
      };
      this.$fetch.dataApi
        .scoreList(params)
        .then(({ data, msg, total }) => {
          this.tableData = data;
          this.total = total;
          // this.$message.success(msg);
        })
        .catch(() => {
          console.log("请求失败");
          console.log(msg);
        });
    },
    //下载建议分析
    _reportList(fileName) {

      this.$fetch.dataApi
        .downloadSuggestFile(fileName,1)
        .then(({ data, msg, total }) => {
        })
        .catch(() => {
          console.log("请求失败");
          console.log(msg);
        });
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
</style>

