<template>
  <div class="content-bj">
    <navTitle :navArr="['教务管理','成绩管理']"></navTitle>

    <el-table class="backg-bor-style"
              :data="tableData"
              size="medium"
              style="width: 100%">
      <el-table-column
        prop="createTime"
        label="更新日期">
      </el-table-column>
      <el-table-column
        prop="title"
        label="文件名称">
      </el-table-column>

      <el-table-column
        fixed="right"
        label="操作"
        width="130">
        <template slot-scope="scope">
          <el-button @click="_reportList(scope.row.id )" type="text" size="mini">下载</el-button>
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
  import navTitle from 'components/navTitle'
  import bottomToolBar from 'components/bottomToolBar'

  export default {
    components: {navTitle,bottomToolBar},
    props: {},
    data() {
      return {
        tableData: [],
        pageSize: 10,
			  pageNum: 1,
        total:0
      }
    },
    watch: {},
    computed: {},
    created() {
      this._getScoreList();
    },
    methods: {
      //获取成绩列表
      _getScoreList() {
	  	let params = {
			pageSize:this.pageSize,
			pageNum: this.pageNum,
		};
		this.$fetch.dataApi.getScoreList(params)
			.then(({data, msg, total}) => {
				this.tableData = data;
				this.total = total;

				// this.$message.success(msg);
			}).catch(() => {
				console.log('请求失败');
				console.log(msg);
			});
    },
    //下载成绩列表
    _reportList(fileName){
      let params = {
			fileName:fileName,
			fileType: 2,
		};
		this.$fetch.dataApi.reportList(params)
			.then(({data, msg, total}) => {
				this.tableData = data;
				this.total = total;

				// this.$message.success(msg);
			}).catch(() => {
				console.log('请求失败');
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

    },
  }
</script>

<style scoped lang="scss" type="text/scss" rel="stylesheet/scss">

</style>

