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
      statistics:{
        type:Object,
        default: function () {
          return {
            indicator:[
              { name: '1班',max:20},
              { name: '2班',max:20},
              { name: '3班',max:20},
              { name: '4班',max:20},
              { name: '5班',max:20},
            ],
            data : [
              {
                value : [6, 7, 8, 9, 5],
                name : '本一次体态统计'
              },
              {
                value : [10, 10, 8, 11, 7],
                name : '上一次体态统计'
              }
            ]

          }
        }
      }
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
          color:['#0f0','#FFef00'],
          tooltip: {},
          legend: {
            orient : 'vertical',
            data: [ '本一次体态统计','上一次体态统计'],
            x: '5%',
          },
          radar: {
            // shape: 'circle',
            name: {
              textStyle: {
                color: '#000',
                // backgroundColor: '#999',
                borderRadius: 3,
                padding: [3, 5]
              }
            },
            indicator: this.statistics.indicator
          },
          series: [{
            name: '',
            type: 'radar',
            // areaStyle: {normal: {}},
            data : this.statistics.data
          }]
        })
      }
    }
  }
</script>
