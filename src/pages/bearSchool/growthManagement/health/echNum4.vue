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
          tooltip: {
            trigger: 'axis',
            axisPointer: {
              type: 'cross',
              label: {
                backgroundColor: '#6a7985'
              }
            }
          },
          legend: {
            data: ['男最重', '女最重', '男最轻', '女最轻']
          },
          toolbox: {
            show: true,
            feature: {
              mark: {show: true},
              dataView: {show: true, readOnly: false},
              saveAsImage: {show: true}
            }
          },
          grid: {
            left: '3%',
            right: '4%',
            bottom: '3%',
            containLabel: true
          },
          xAxis: [
            {
              type: 'category',
              boundaryGap: false,
              data: ['1班', '2班', '3班', '4班', '5班']
            }
          ],
          yAxis: [
            {
              type: 'value',
              axisLabel: {formatter: '{value}' + 'KG'}
            }
          ],
          series: [
            {
              name: '男最重',
              type: 'line',
              label: {
                normal: {
                  show: true,
                  position: 'insideRight'
                }
              },
              areaStyle: {normal: {}},
              data: [66, 55, 76, 80, 40]
            },
            {
              name: '女最重',
              type: 'line',
              label: {
                normal: {
                  show: true,
                  position: 'insideRight'
                }
              },
              areaStyle: {normal: {}},
              data: [45, 60, 55, 60, 70]
            },
            {
              name: '男最轻',
              type: 'line',
              label: {
                normal: {
                  show: true,
                  position: 'insideRight'
                }
              },
              areaStyle: {normal: {}},
              data: [46, 89, 34, 56, 80]
            }
            ,
            {
              name: '女最轻',
              type: 'line',
              label: {
                normal: {
                  show: true,
                  position: 'insideRight'
                }
              },
              areaStyle: {normal: {}},
              data: [44, 55, 40, 56, 60]
            }
          ]
        })
      }
    }
  }
</script>
