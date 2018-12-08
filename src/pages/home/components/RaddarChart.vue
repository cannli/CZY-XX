<template>
  <div :class="className" :style="{height:height,width:width}" class="backg-bor-style"></div>
</template>

<script>
  import echarts from 'echarts'

  require('echarts/theme/macarons') // echarts theme
  import {debounce} from '../../../utils'

  const animationDuration = 3000

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
        default: '400px'
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
          title: {
            text: '整校最近体检风险预测',
            textStyle:{
              fontSize: 13,
              fontWeight: 'bold',
              color: '#333333'
            }
          },
          tooltip: {
            trigger: 'item',
            axisPointer: {            // 坐标轴指示器，坐标轴触发有效
              type: 'line'        // 默认为直线，可选为：'line' | 'shadow'
            }
          },
          legend: {
            y: 'bottom',
            data: ['身体状况']
          },
          calculable: true,
          polar: [
            {
              indicator: [
                {text: '腰部', max: 100},
                {text: '下肢', max: 100},
                {text: '头颈部', max: 100},
                {text: '躯干', max: 100},
                {text: '肩部', max: 100}

              ],
              radius: 130
            }
          ],
          series: [
            {
              name: '',
              type: 'radar',
              itemStyle: {
                normal: {
                  areaStyle: {
                    color: '#2ec7c9'
                  }
                }
              },

              data: [
                {
                  value: [47, 42, 88, 94, 90],
                  name: '身体状况'
                }
              ]
            }
          ]
        })
      }
    }
  }
</script>
