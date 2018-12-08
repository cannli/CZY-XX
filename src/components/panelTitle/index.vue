<template>
  <div class="panel-title">
    <span class="title-text" v-if="title" v-text="title"></span>
    <div class="fr">
      <slot></slot>
    </div>
  </div>
</template>
<script type="text/javascript">
  export default{
    props: {
      title: {
        type: String
      }
    }
  }
</script>

<style scoped lang="scss" type="text/scss" rel="stylesheet/scss">
  .panel-title{
    padding: 30px 0 10px 0;
    .title-text{
      font-size: 18px;
      font-weight: 600;
    }
  }

  </style>
