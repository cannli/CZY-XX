<template>
  <div :class="className" :style="{height:height,width:width}" style=" background: #fff;
     box-shadow: 4px 4px 40px rgba(0, 0, 0, .05);
      border-color: rgba(0, 0, 0, .05);"></div>
</template>

<script>
  import echarts from 'echarts'

  require('echarts/theme/macarons') // echarts theme
  import {debounce} from '../../../../utils'

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
      curPieObj: {
        type: Object
      }
    },
    data() {
      return {
        chart: null
      }
    },
    watch: {
      curPieObj: {
        handler() {
          this.initChart();
        },
        deep: true
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
          toolbox: {
            show: true,
            feature: {
              mark: {show: true},
              dataView: {show: true, readOnly: false},
              saveAsImage: {show: true}
            }
          },
          tooltip : {
            trigger: 'item',
            formatter: "{a} <br/>{b} : {c} ({d}%)"
          },
          legend: {
            orient: 'vertical',
            // x: 'left',
            // x: '5%',
            top:'5%',
            type: 'scroll',
            data: this.curPieObj.dataArr
          },
          series: [
            {
              name: '本次风险比例',
              type: 'pie',
              radius : '50%',
              center: ['20%', '50%'],
              data: this.curPieObj.curPie
            },
            {
              name: '上次风险比例',
              type: 'pie',
              radius : '50%',
              center: ['70%', '50%'],
              data: this.curPieObj.lastPie
            }
          ]
        })
      }
    }
  }
</script>
