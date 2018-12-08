<template>
  <div>
    <el-upload
      class="avatar-uploader"
      :action="projectRootUrl + '/users/uploadImg.do'"
      :show-file-list="false"
      :headers="headerObj"
      :on-success="handleAvatarSuccess"
      :before-upload="beforeAvatarUpload">
      <img v-if="myImageUrl" :src="myImageUrl" class="avatar">
      <i v-else class="el-icon-plus avatar-uploader-icon"></i>
    </el-upload>
  </div>
</template>

<script>
  export default {
    components: {},
    props: {
      imageUrl: [String],
      typeNum: [Number]
    },
    data() {
      return {
        projectRootUrl: window.projectRootUrl,
        headerObj: {},
        myImageUrl: this.imageUrl,
      }
    },
    created() {
    },
    mounted() {
      this.$nextTick(() => {
        this.headerObj = {Authorization: this.$store.state.user_info.user.token,userType: this.typeNum}
      })
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
    watch: {
      imageUrl(val) {
        if (val) {
          this.myImageUrl = val
        }
      }
    },
    methods: {
      handleAvatarSuccess(res, file) {
        if (res.code != 200) {
          this.$message({
            message: res.msg,
            type: 'warning'
          });
          return
        }
        this.myImageUrl = res.data
        this.$emit('imageUrlFn',res.data)

      },
      beforeAvatarUpload(file) {
        const isJPG = file.type === 'image/jpeg'
        const isPNG = file.type === 'image/png'
        const isLt2M = file.size / 1024 < 1028 * 4

        if (!isJPG && !isPNG) {
          this.$message.error('上传头像图片只能是 JPG,PNG 格式!')
        }
        if (!isLt2M) {
          this.$message.error('上传头像图片大小不能超过 4MB')
        }
        return (isJPG || isPNG) && isLt2M;
      },
    }
  }
</script>

<style scoped lang="scss" type="text/scss" rel="stylesheet/scss">


</style>
