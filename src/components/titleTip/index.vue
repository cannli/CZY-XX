<template>
  <!--标题-->
  <div>
    <div class="titleTip">
      <span class="title">{{titleStr}}</span>
    </div>
  </div>

</template>

<script>
  export default {
    components: {},
    props: {
      titleStr: String
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
  .titleTip{
    padding: 40px 0;

    .title{
      font-weight: 700;
      font-size: 16px;
    }
  }
</style>
