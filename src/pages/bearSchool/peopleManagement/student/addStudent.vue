<template>
  <div style="margin-top: 52px;">
    <el-form :model="tableData" :rules="rules" ref="tableData" label-width="120px">
      <el-row v-if="tableData.id!=null" type="flex" class="row-bg" justify="center">
        <el-col :span="12">
          <el-form-item label="用户编号" size="small">
            <span>{{tableData.id}}</span>
          </el-form-item>
        </el-col>
      </el-row>

      <el-row type="flex" class="row-bg" justify="center">
        <el-col :span="12">
          <el-form-item label="学生姓名" prop="username" size="small">
            <el-input v-model="tableData.username"></el-input>
          </el-form-item>
        </el-col>
      </el-row>
      <el-row type="flex" class="row-bg" justify="center">
        <el-col :span="12">
          <el-form-item label="身份证" prop="cartNum" size="small">
            <el-input v-model="tableData.cartNum"></el-input>
          </el-form-item>
        </el-col>
      </el-row>
      <el-row v-if="false" type="flex" class="row-bg" justify="center">
        <el-col :span="12">
          <el-form-item label="出生证" prop="birthNum" size="small">
            <el-input v-model="tableData.birthNum"></el-input>
          </el-form-item>
        </el-col>
      </el-row>

      <el-row type="flex" class="row-bg" justify="center">
        <el-col :span="12">
          <el-form-item label="性别" prop="sex" size="small">
            <el-radio-group v-model="tableData.sex">
              <el-radio :label="1">男</el-radio>
              <el-radio :label="2">女</el-radio>
            </el-radio-group>
          </el-form-item>
        </el-col>
      </el-row>

      <el-row type="flex" class="row-bg" justify="center">
        <el-col :span="12">
          <el-form-item label="出生日期" prop="birth" size="small">
            <el-date-picker type="date" placeholder="请选择出生日期" v-model="tableData.birth" value-format="yyyy-MM-dd"
                            style="width: 100%;"></el-date-picker>
            <!--<el-date-picker
              v-model="tableData.birth"
              type="date"
              placeholder="选择日期"
              format="yyyy 年 MM 月 dd 日"
              value-format="yyyy-MM-dd">
            </el-date-picker>-->
          </el-form-item>

        </el-col>
      </el-row>

      <el-row type="flex" class="row-bg" justify="center">
        <el-col :span="12">
          <el-form-item label="年级/班级" prop="gradeClassOptions" size="small">
            <el-cascader :props="gradeProps" style="width: 100%" size="small" v-model="tableData.gradeClassOptions"
                         :options="gradeClassOptions" change-on-select></el-cascader>
          </el-form-item>
        </el-col>
      </el-row>

      <el-row type="flex" class="row-bg" justify="center">
        <el-col :span="12">
          <el-form-item v-if="false" label="状态" prop="status" size="small">
            <el-select v-model="tableData.status" placeholder="请选择目前在校状态" style="width: 100%;">
              <el-option label="在校" :value="1"></el-option>
              <el-option label="结业" :value="2"></el-option>
              <el-option label="转学" :value="3"></el-option>
              <el-option label="退学" :value="4"></el-option>
            </el-select>
          </el-form-item>
        </el-col>
      </el-row>

      <el-row type="flex" class="row-bg" justify="center">
        <el-col :span="12">
          <el-form-item label="家长联系方式" prop="parentsPhone" size="small">
            <el-input v-model="tableData.parentsPhone"></el-input>
          </el-form-item>
        </el-col>
      </el-row>

      <el-row type="flex" class="row-bg" justify="center">
        <el-col :span="12">
          <el-form-item label="出生地" prop="cityOptions" size="small">
            <el-cascader v-model="tableData.cityOptions" style="width: 100%;"

                         :options="cityOptionsArr"
                         :value="tableData.birthplace"
                         :props="cityProps"
                         @change="changeProvince"
                         change-on-select
            >
            </el-cascader>
          </el-form-item>
        </el-col>
      </el-row>

      <el-row type="flex" class="row-bg" justify="center">
        <el-col :span="12">
          <el-form-item label="详细地址" prop="address" size="small">
            <el-input v-model="tableData.address"></el-input>
          </el-form-item>
        </el-col>
      </el-row>
      <el-form-item style="text-align:center; margin-top: 50px;">
        <el-button @click="resetForm('tableData')" size="small">取消</el-button>
        <el-button type="primary" @click="saveOrUpdateStudent('tableData')" size="small">确认</el-button>
      </el-form-item>
    </el-form>
  </div>
</template>

<script>
  import cityOptions from "common/chinaCity/city_data2017_element";
  import {checkPhone, checkIdentity} from 'assets/js/jiaoyan.js'

  export default {
    // components: {cityOptions},
    props: {
      studentId: {
        type: Number
      },
      gradeClassOptions: {
        type: Array
      },

    },
    data() {
      return {
        cityOptionsArr: [],
        gradeProps: {
          value: 'id',
          children: 'children'
        },
        cityProps: {
          value: 'id',
          children: 'children'
        },
        studentStatusProps: {
          value: 'value'
        },
        tableData: {
          id: null,
          usename: null,
          sex: null,
          gradeId: null,
          schoolClassId: null,
          birth: null,
          birthCityId: null,
          birthCountyId: null,
          birthProvinceId: null,
          parentsPhone: null,
          cityOptions: [],
          gradeClassOptions: [],
          isSchool: true,
          status: 1,
          address: null
        },
        options1: [
          {val: 1, name: "在校学生"},
          {val: 2, name: "结业学生"},
          {val: 3, name: "转学学生"}
        ],

        rules: {
          username: [{required: true, message: "请输入学生姓名", trigger: "blur"}],
          cartNum: [
            {validator: checkIdentity, trigger: 'blur'},
          ],
          sex: [{required: true, message: "性别不能为空~", trigger: "blur"}],
         /* birth: [
            { type: 'date', required: true, message: '请选择日期', trigger: 'change' }
          ],*/
          gradeClassOptions: [
            {required: true, message: "请输入年级与班级", trigger: "change"}
          ],
          parentsPhone: [
            {validator: checkPhone, trigger: 'blur'}
          ],
          cityOptions: [
            {required: true, message: "请选择出生地", trigger: "change"}
          ],
          address: [
            {required: true, message: "请输入详细地址", trigger: "blur"}
          ],
        }
      };
    },
    created() {
    },
    mounted() {
      this.$nextTick(() => {
        this.cityOptionsArr = cityOptions;
        this._studentDetail(this.studentId)
      });
    },
    beforeUpdate() {
    },
    updated() {
    },
    beforeDestroy() {
    },
    destroyed() {
    },
    computed: {},
    watch: {},
    methods: {

      //获取学生信息
      _studentDetail(studentId) {
        if (!studentId) {
          return;
        }
        let params = {
          studentId: studentId
        };
        this.$fetch.dataApi.studentDetail(params).then(({data}) => {
          this.tableData = data;
          this.tableData.cityOptions = [];
          if (data.birthProvinceId) {
            this.tableData.cityOptions.push(data.birthProvinceId)
          }
          if (data.birthCityId) {
            this.tableData.cityOptions.push(data.birthCityId)
          }
          if (data.birthCountyId) {
            this.tableData.cityOptions.push(data.birthCountyId)
          }
          this.tableData.gradeClassOptions = [];
          if (data.grade) {
            this.tableData.gradeClassOptions.push(data.grade)
          }
          if (data.schoolClassId) {
            this.tableData.gradeClassOptions.push(data.schoolClassId)
          }

        });
      },

      //修改学生信息
      saveOrUpdateStudent(formName) {
        let self = this;
        let params = self.tableData;

        let cityOptions = self.tableData.cityOptions;
        if (cityOptions.length > 0) {
          params.birthProvinceId = cityOptions[0]
        }
        if (cityOptions.length > 1) {
          params.birthCityId = cityOptions[1]
        }
        if (cityOptions.length > 2) {
          params.birthCountyId = cityOptions[2]
        }
        let gradeClassOptions = self.tableData.gradeClassOptions;
        if (gradeClassOptions.length > 0) {
          params.grade = gradeClassOptions[0]
        }
        if (gradeClassOptions.length > 1) {
          params.schoolClassId = gradeClassOptions[1]
        }


        this.$refs[formName].validate((valid) => {
          if (valid) {
            this.$confirm('确定保存？, 是否继续?', '提示', {
              confirmButtonText: '确定',
              cancelButtonText: '取消',
              type: 'warning'
            }).then(() => {
              this.$fetch.dataApi.saveOrUpdateStudent(params).then(total => {
                this.$emit("resetForm");
              }).catch(() => {
                console.log('请求失败');
                console.log(msg);
              });
            })
            return true
          } else {
            return false;
          }
        });

      },

      //取消按钮
      resetForm(formName) {
        this.$refs[formName].resetFields();
        this.$emit("resetForm");
      },
      changeProvince() {
      }
    }
  };
</script>

<style scoped>
</style>
