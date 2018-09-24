<template>
  <div>
    <div class="navBox">
      <span  v-for="col in navArr" class="router_link">{{col}}<i class="nav-i">&nbsp;/&nbsp;</i></span>
    </div>
  </div>
</template>

<script>
  export default {
    components: {},
    props: {
      navArr: Array
    },
    data() {
      return {}
    },
    watch: {},
    computed: {},
    created() {
    },
    methods: {},
  }
</script>

<style scoped lang="scss" type="text/scss" rel="stylesheet/scss">
  .navBox {
    width: 100%;
    font-size: 16px;
    background: #fff;
    padding: 14px 0 14px 20px;
    margin-bottom: 20px;
    border-bottom: solid #666666 1px;
    span:last-child {
      cursor: pointer;
      color: #000000;
      i{
        display: none;
      }
    }
    .router_link {
      color: #008000;
    }
  }
</style>
