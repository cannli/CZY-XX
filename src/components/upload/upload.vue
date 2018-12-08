<!--
@desc 上传按钮
@formId {String} form表单Id
@fileId {String} 按钮Id
@putValArr {Array} 上传的参数
    [{name:'name',value:'value'},{name:'name',value:'value'},{name:'name',value:'value'}]
@fileType {Array} 允许上传的文件类型
    ['xlsx','xls']
@action {String} form表单的action
@enctype {String} form表单的enctype
@uploadName {String} 上传按钮文字
@errorTip {String} 当文件不符合是的错误提示
e.g：
<upload action="http://fitdev.oa.com/abs/file/uploadHistoryFile.do" :putValArr="putValArr" :fileType="fileType" @change="fnSubmit"></upload>
ajax
var url = '';
var form = new FormData(document.getElementById("form"));
self.ajaxDateFile(url, form, function(result){});
-->
<template>
<span>
<form :id="formId" :enctype="enctype" style="display: inline-block;" method="post" :action="action">
    <input v-for="col in putValArr" type="text" :id="col.name" :name="col.name" v-model="col.value" style="display:none;"/>
    <label class="mod-btn ext-btn-white">{{uploadName}}
      <input type="file" name="file" :id="fileId" :accept="accept" style="display:none">
    </label>
</form>

</span>
</template>

<script type="text/javascript">
  export default {
    components: {
    },
    data: function () {
      return {
        tipboxShow: false
      }
    },
    props: {
      formId: { // form表单Id
        type: String,
        default: 'form'
      },
      fileId: { // 按钮Id
        type: String,
        default: 'fileUrl'
      },
      accept: { // 选择类型
        type: String,
        default: 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet,application/vnd.ms-excel'
      },
      fileType: Array,  // 不能用默认值
      putValArr: Array, // 需要上传的内容
      action: '',
      enctype: {
        type: String,
        default: 'multipart/form-data'
      },
      uploadName: { // 上传文件按钮的文字
        type: String,
        default: '导入数据'
      },
      errorTip: { // alert 提示内容
        type: String,
        default: '请上传*.xlsx或*.xls的文件类型！！！'
      }

    },
    computed: { // 计算属性的结果会被缓存，除非依赖的响应式属性变化才会重新计算。

    },
    watch: {},
    methods: {},
    mounted: function () {
      this.$nextTick(function () {
        var self = this
        // console.log(self.putValArr)
        document.getElementById(self.fileId).onchange = function () {
          if (this.value == '') {
            return false
          }
          var dotIndex = this.value.lastIndexOf('.')
          var fileType = this.value.substring(dotIndex + 1)
          for (var n in self.fileType) {
            if (self.fileType[n] == fileType) {
              self.$emit('change')
              return false
            }
          }
          self.$alert(self.errorTip, '提示', {confirmButtonText: '确定', type: 'error'})
        }
      })
    }
  }
</script>

<style>
  .butUp{
    border: 1px solid #dcdfe6;
    display: inline-block;
    text-align: center;
    border-radius: 4px;
    font-weight: 500;
    padding: 10px 20px;
    font-size: 14px;
    margin-left: 10px;
    color: #606266;
  }
</style>
