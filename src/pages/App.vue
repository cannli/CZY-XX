<template>
  <div class="view-page" style="min-width: 1366px;">
    <left-slide></left-slide>
    <main-content>
      <router-view></router-view>
    </main-content>
  </div>
</template>
<script type="text/javascript">
  import {mainContent, leftSlide} from 'components'

  export default{
    name: 'page',
    components: {
      mainContent,
      leftSlide
    }
  }
</script>
