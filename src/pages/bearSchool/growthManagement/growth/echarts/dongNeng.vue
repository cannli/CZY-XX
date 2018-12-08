<template>
  <div :class="className" :style="{height:height,width:width}" style=" background: #fff;
     box-shadow: 4px 4px 40px rgba(0, 0, 0, .05);
      border-color: rgba(0, 0, 0, .05);"></div>
</template>

<script>
  import echarts from 'echarts'

  require('echarts/theme/macarons') // echarts theme
  import {debounce} from '../../../../../utils'

  const animationDuration = 6000

  export default {
    props: {
      className: {
        type: String,
        default: 'chart'
      },
      width: {
        type: String,
        default: '100%'
      },
      height: {
        type: String,
        default: '300px'
      },
      // tableData:{
      //   type:Object,
      //   default:{}
      // }
    },
    data() {
      return {
        chart: null
      }
    },

    mounted() {
      this.initChart()
      this.__resizeHanlder = debounce(() => {
        if (this.chart) {
          this.chart.resize()
        }
      }, 100)
      window.addEventListener('resize', this.__resizeHanlder)
    },
    beforeDestroy() {
      if (!this.chart) {
        return
      }
      window.removeEventListener('resize', this.__resizeHanlder)
      this.chart.dispose()
      this.chart = null
    },
    methods: {
      initChart() {
        this.chart = echarts.init(this.$el, 'macarons')

        this.chart.setOption({
          tooltip : {
            trigger: 'axis'
          },
          legend: {
            data:['访问']
          },

          calculable : true,
          xAxis : [
            {
              type : 'category',
              boundaryGap : false,
              data : ['超强', '偏强', '正常', '偏弱', '弱']
            }
          ],
          yAxis : [
            {
              type : 'value'
            }
          ],
          series : [
            {
              name:'动能分析',
              type:'line',

              itemStyle: {normal: {areaStyle: {type: 'default'}}},
              data: [21, 54, 260, 830, 710]
            }
          ]
        })
      }
    }
  }
</script>
