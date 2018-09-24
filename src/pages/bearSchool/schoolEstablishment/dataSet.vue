<template>
  <div>
    <navTitle :navArr="['学校设置','资料设置']"></navTitle>
    <div class="content-bj">
      <el-row>
        <el-col :span="24" class="img-box">
          <imgUpload :imageUrl="imageUrl" :typeNum="2" @imageUrlFn="imageUrlFn"></imgUpload>
          <!-- <div class="bot-tip1" v-show="!botShow">
             <el-button type="danger" size="small">修改密码</el-button>
             <el-button type="primary" size="small">编辑资料</el-button>
           </div>-->

        </el-col>
      </el-row>
      <el-form :model="tableData" :rules="rules" ref="tableData" label-width="100px" class="demo-ruleForm">

        <el-row type="flex" class="row-bg" justify="center">
          <el-col :span="12">
            <el-form-item label="邮箱地址" prop="email" size="small">
              <el-input v-model="tableData.email"></el-input>
            </el-form-item>
          </el-col>
        </el-row>

        <el-row type="flex" class="row-bg" justify="center">
          <el-col :span="12">
            <el-form-item label="学校名称" prop="name" size="small">
              <el-input v-model="tableData.name" disabled></el-input>
            </el-form-item>
          </el-col>
        </el-row>
        <el-row type="flex" class="row-bg" justify="center">
          <el-col :span="12">
            <el-form-item label="学校类型" prop="schoolLevel" size="small">
              <el-select v-model="tableData.schoolLevel" placeholder="请选择目前学校类型" style="width: 100%;">
                <el-option v-for="(item,index) in dataEnum.schoolType" :key="item.val" :label="item.name"
                           :value="item.val"></el-option>
              </el-select>
            </el-form-item>
          </el-col>
        </el-row>

        <!-- <el-row type="flex" class="row-bg" justify="center">
           <el-col :span="12">
             <el-form-item label="学校原始ID" prop="id" size="small">
               <el-input v-model="tableData.id" disabled></el-input>
             </el-form-item>
           </el-col>
         </el-row>-->

        <el-row type="flex" class="row-bg" justify="center">
          <el-col :span="12">
            <el-form-item label="负责人" prop="responsible" size="small">
              <el-input v-model="tableData.responsible"></el-input>
            </el-form-item>
          </el-col>
        </el-row>

        <el-row type="flex" class="row-bg" justify="center">
          <el-col :span="12">
            <el-form-item label="负责人手机" prop="responsiblePhone" size="small">
              <el-input v-model="tableData.responsiblePhone"></el-input>
            </el-form-item>
          </el-col>
        </el-row>

        <el-row type="flex" class="row-bg" justify="center">
          <el-col :span="12">
            <el-form-item label="学校所在地" prop="cityOptions" size="small">
              <el-cascader v-model="tableData.cityOptions" style="width: 100%;"
                           disabled
                           :props="cityProps"
                           :options="cityOptionsArr"
                           :value="tableData.cityOptions"
                           @change="changeProvince"
                           change-on-select
              >
              </el-cascader>

            </el-form-item>
          </el-col>
        </el-row>

        <el-row type="flex" class="row-bg" justify="center">
          <el-col :span="12">
            <el-form-item label="详细地址" prop="address" size="small" disabled>
              <el-input v-model="tableData.address" disabled></el-input>
            </el-form-item>
          </el-col>
        </el-row>

        <el-form-item style="text-align:center; margin-top: 20px;" v-show="botShow">
          <el-button type="primary" @click="submitForm('tableData')" size="small">保&emsp;存</el-button>
        </el-form-item>
      </el-form>

    </div>
  </div>
</template>

<script>
  import cityOptions from "common/chinaCity/city_data2017_element";
  import navTitle from "components/navTitle";
  import imgUpload from 'components/upload/imgUpload'
  import {checkEmail} from 'assets/js/jiaoyan.js'

  export default {
    components: {
      navTitle,
      imgUpload
    },
    data() {

      return {
        imageUrl: '',
        /*验证手机号*/

        botShow: true,
        cityOptionsArr: [], // 城市名字
        cityProps: {
          value: 'id',
          children: 'children'
        },
        tableData: {
          id: '',
          email: '',
          name: '',
          schoolLevel: '',
          responsible: '',
          responsiblePhone: '',
          cityOptions: [],
          address: ''
        },

        rules: {
          email: [
            // {required: true, message: "请输入邮箱地址", trigger: "blur"}
            {validator: checkEmail, trigger: 'blur'}
          ],
          responsible: [
            {required: true, message: "请输入负责人", trigger: "blur"}
          ],
          responsiblePhone: [
            {required: true, message: "请输入负责人手机号码", trigger: "blur"}
          ]
        }
      };
    },
    created() {
      this._getSchoolDetail();
    }
    ,
    mounted() {
      this.$nextTick(() => {
        this.cityOptionsArr = cityOptions;
      });
    }
    ,
    beforeUpdate() {
    }
    ,
    updated() {
    }
    ,
    beforeDestroy() {
    }
    ,
    destroyed() {
    }
    ,
    computed: {}
    ,
    watch: {}
    ,
    methods: {
      imageUrlFn(url) {
        this.imageUrl = url
      },
      //获取学校信息
      _getSchoolDetail() {
        let params = {};
        this.$fetch.dataApi
          .getSchoolDetail(params)
          .then(({data, msg, total}) => {
            this.tableData = data;
            this.tableData.cityOptions = [];
            this.imageUrl = data.logoPath
            this.$store.commit('logoImgFn', data.logoPath)
            this.tableData.cityOptions.push(this.tableData.province)
            this.tableData.cityOptions.push(this.tableData.city)
            this.tableData.cityOptions.push(this.tableData.area)
            // this.tableData.birthplace=this.tableData.cityOptions
          })
          .catch(() => {
            console.log("请求失败");
            console.log(msg);
          });
      },

      //修改学校信息
      submitForm(formName) {
        this.$refs[formName].validate(valid => {
          // this.botShow = false;
          if (!valid) {
            return false;
          }
          this.tableData.logoPath = this.imageUrl
          this.$confirm('确定修改？, 是否继续?', '提示', {
            confirmButtonText: '确定',
            cancelButtonText: '取消',
            type: 'warning'
          }).then(() => {
            this.$fetch.dataApi
              .updateSchool(this.tableData)
              .then(({data, msg}) => {
                this._getSchoolDetail()
                this.$message({
                  message: '修改保存成功',
                  type: 'success'
                });
              })
          })
        })
      }
      ,
      resetForm(formName) {
        this.$refs[formName].resetFields();
      }
      ,
      changeProvince() {
      }
    }
  }
  ;
</script>

<style scoped lang="scss" type="text/scss" rel="stylesheet/scss">
  .img-box {
    width: 100%;
    vertical-align: middle;
    display: table-cell;
    text-align: center;
    position: relative;
    .img-bot {
      margin-left: 70px;
    }
    .bot-tip1 {
      position: absolute;
      right: 20px;
      top: 20px;
    }
    /* .logo-img {
         position: absolute;
         top: 50%;
         left: 50%;
         transform: translate(-50%, -50%);
       }
       .img-bot {
         float: right;
       }*/
  }
</style>
