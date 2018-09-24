<template>
  <div style="margin-top: 52px;">
    <el-form :model="tableData" :rules="rules" ref="tableData" label-width="120px" class="demo-ruleForm">

      <el-row type="flex" class="row-bg" justify="center">
        <el-col :span="12">
          <el-form-item label="老师姓名" prop="teacherName" size="small">
            <el-input v-model="tableData.teacherName"></el-input>
          </el-form-item>
        </el-col>
      </el-row>

      <el-row type="flex" class="row-bg" justify="center">
        <el-col :span="12">
          <el-form-item label="性别" prop="sex" size="small" required>
            <el-radio-group v-model="tableData.sex">
              <el-radio :label="1">男</el-radio>
              <el-radio :label="2">女</el-radio>
            </el-radio-group>
          </el-form-item>
        </el-col>
      </el-row>
      <el-row type="flex" class="row-bg" justify="center">
        <el-col :span="12">
          <el-form-item label="任教科目" prop="courseId" size="small" required>
            <el-select v-model="tableData.courseId" placeholder="请选择任教科目" style="width: 100%;">
              <el-option v-for="(item,index) in Subject" :key="index" :label="item.courseName"
                         :value="item.id"></el-option>
            </el-select>
          </el-form-item>
        </el-col>
      </el-row>
      <el-row type="flex" class="row-bg" justify="center">
        <el-col :span="12">
          <el-form-item label="任教年级/班级" prop="gradeClassOptions" size="small" style="width: 100%;">
            <el-cascader :props="gradeProps" style="width: 100%;" v-model="tableData.gradeClassOptions"
                         :options="gradeClassOptions" change-on-select></el-cascader>
          </el-form-item>
        </el-col>
      </el-row>


      <el-row type="flex" class="row-bg" justify="center">
        <el-col :span="12">
          <el-form-item label="入职日期" prop="workDate" size="small" required>
            <el-date-picker type="date"
                            placeholder="请选择出生日期"
                            v-model="tableData.workDate"
                            value-format="yyyy-MM-dd"
                            style="width: 100%;"></el-date-picker>
          </el-form-item>
        </el-col>
      </el-row>
      <el-form-item style="text-align:center; margin-top: 50px;">
        <el-button @click="resetForm()" size="small">取消</el-button>
        <el-button :disabled="disabled" type="primary" @click="saveOrUpdateTeacher('tableData')" size="small">确认</el-button>
      </el-form-item>
    </el-form>
  </div>
</template>

<script>
  import cityOptions from "common/chinaCity/city_data2017_element";

  export default {
    // components: {cityOptions},
    props: {
      teacherId: Number,
      required: true
    },
    data() {
      return {
        cityOptionsArr: [],
        gradeProps: {
          value: 'id',
          children: 'children'
        },
        teacherInfo: {},
        gradeClassOptions: [], //任教年级/班级
        disabled: false,
        Subject: [], //任教科目
        tableData: {
          teacherName: null,
          sex: 1,
          gradeId: null,
          classId: null,
          courseId: null,
          gradeClassOptions: [],
          workDate: null
        },
        rules: {
          teacherName: [
            {required: true, message: "请输入教师姓名", trigger: "blur"}
          ],
          sex: [{required: true, message: "请选择用户性别", trigger: "blur"}],

          courseId: [
            {required: true, message: "请选择任教科目", trigger: "change"}
          ],
          gradeClassOptions: [
            {required: true, message: "请选择任教年级/班级", trigger: "change"}
          ],
          workDate: [
            {required: true, message: "请选择入职时间", trigger: "blur"}
          ]
        }
      };
    },
    created() {
    },
    mounted() {
      this.$nextTick(() => {
        this._getTeacherInfo();
        this._getGradeClassList();
        this._getSchoolCourseList();
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
      //获取教师信息
      _getTeacherInfo() {
        let isexit = false;
        if (this.teacherId) {
          isexit = true;
        }
        if (!isexit) {
          return;
        }
        let params = {
          teacherId: this.teacherId
        };
        this.$fetch.dataApi.getTeacherInfo(params).then(({data}) => {
          this.tableData = data;
          this.tableData.gradeClassOptions = [];
          this.tableData.gradeClassOptions.push(data.gradeId)
          this.tableData.gradeClassOptions.push(data.classId)
        });
      },

      _getGradeClassList() {
        this.$fetch.dataApi.getGradeClassList({}).then(({data}) => {
          this.gradeClassOptions = data;
        });
      },

      _getSchoolCourseList() {
        this.$fetch.dataApi.getSchoolCourseList({}).then(({data}) => {
          this.Subject = data;
        });
      },


      //保存/修改
      saveOrUpdateTeacher(formName) {
        let self = this;
        let gradeClassOptions = self.tableData.gradeClassOptions;
        let params = self.tableData;
        if (gradeClassOptions.length > 0) {
          params.gradeId = gradeClassOptions[0];
        }
        if (gradeClassOptions.length > 1) {
          params.classId = gradeClassOptions[1];
        }

        // this.$refs[formName].validate(valid => {
        //   if (valid) {
        //     alert("submit!");
        //   } else {
        //     return false;
        //   }
        // });
        this.$refs[formName].validate((valid) => {
          if (valid) {
            this.$fetch.dataApi
              .saveOrUpdateTeacher(params)
              .then(total => {

                this.$emit("resetForm");
                // this.$success.message(msg);
              })
              .catch((msg) => {
                this.disabled = false;
                console.log("请求失败");
                console.log(msg);
              });
          }
        });

      },
      resetForm(formName) {

        this.$emit("resetForm");
      },
      changeProvince() {
      }
    }
  };
</script>

<style scoped>
</style>
