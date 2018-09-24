<template>
  <div class="header-section" style="box-shadow: rgb(241, 241, 241) 0px 5px 10px;">
    <router-link to="/home" class="logo block">
      <img :src="logoImg" style="height: 65px; margin-bottom: 12px;">
      <span style="font-size: 24px;padding-top: 8px;margin-left: 15px; color: rgb(0, 158, 224);">{{schoolDetail.name}}</span>
    </router-link>
    <menu-right></menu-right>
  </div>
</template>
<script type="text/javascript">
  import menuRight from './menuRight'


  export default {
    components: {
      menuRight,

    },
    data() {
      return {
        schoolDetail: {}
      }
    },
    created() {
      this._getSchoolDetail();
    }, // data.logoPath
    computed: {
      logoImg() {
        return this.$store.state.logoImg
      }
    },
    methods: {
      _getSchoolDetail() {
        this.$fetch.dataApi
          .getSchoolDetail({})
          .then(({data, msg, total}) => {
            this.schoolDetail = data;
            if (!data.logoPath || data.logoPath.length<=0) {
              this.$store.commit('logoImgFn','./img/logo.png')
            }
            this.$store.commit('logoImgFn', data.logoPath)
          })
          .catch(() => {
            console.log("请求失败");
            console.log(msg);
          });
      },
      submit_search(value) {
        this.$message.success(value)
      }
    }
  }
</script>
<style>
  img:not([src*='/']) {
    display: inline-block !important;
  }
</style>
