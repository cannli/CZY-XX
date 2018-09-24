<template>
  <div :class="className" :style="{height:height,width:width}" style=" background: #fff;
     box-shadow: 4px 4px 40px rgba(0, 0, 0, .05);
      border-color: rgba(0, 0, 0, .05);"></div>
</template>

<script>
  import echarts from 'echarts'

  require('echarts/theme/macarons') // echarts theme
  import {debounce} from '../../../utils'

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
            text: '整校最近体态判定',
            textStyle:{
              fontSize: 13,
              fontWeight: 'bold',
              color: '#333333'
            }
          },
          tooltip: {
            trigger: 'axis',
            axisPointer: {            // 坐标轴指示器，坐标轴触发有效
              type: 'shadow'        // 默认为直线，可选为：'line' | 'shadow'
            }
          },
          legend: {
            data: ['正常', '轻度', '中度', '高度', '前倾', '后倾', '畸形'],
            y: 'bottom',
          },
          grid: {
            left: '3%',
            right: '4%',
            bottom: '10%',
            containLabel: true
          },
          xAxis: {
            type: 'category',
            data: ['头测歪', '驼背', '高低肩', '驱干偏移', '头前倾', '骨盘位置', '腿型']

          },
          yAxis: {
            type: 'value'
          },
          series: [
            {
              name: '正常',
              type: 'bar',
              stack: '总量',
              barWidth: 30,//柱图宽度
              barMinHeight: 50,
              /*   itemStyle: {
                     normal: {
 　　　　　　　　　　　　　　//好，这里就是重头戏了，定义一个list，然后根据所以取得不同的值，这样就实现了，
                         color: function(params) {
                             // build a color map as your need.
                             var colorList = [
                               '#C1232B','#B5C334','#FCCE10','#E87C25','#27727B',
                                '#FE8463','#9BCA63','#FAD860','#F3A43B','#60C0DD',
                                '#D7504B','#C6E579','#F4E001','#F0805A','#26C0C0'
                             ];
                             return colorList[params.dataIndex]
                         },
 　　　　　　　　　　　　
                     }
                 }, */
              itemStyle: {
                normal: {
                  color: '#0f0'
                }
              },
              label: {
                normal: {
                  show: true,
                  position: 'insideRight'
                }
              },
              data: [320, 302, 301, 334, 390, 330, 320]
            },
            {
              name: '轻度',
              type: 'bar',
              stack: '总量',
              barMinHeight: 20,
              label: {
                normal: {
                  show: true,
                  position: 'insideRight'
                }
              },
              data: [120, 132, 101, 134, 90, 230, 210]
            },
            {
              name: '中度',
              type: 'bar',
              stack: '总量',
              barMinHeight: 20,
              label: {
                normal: {
                  show: true,
                  position: 'insideRight'
                }
              },
              data: [220, 182, 191, 234, 290, 330, 310]
            },
            {
              name: '高度',
              type: 'bar',
              stack: '总量',
              barMinHeight: 30,
              label: {
                normal: {
                  show: true,
                  position: 'insideRight'
                }
              },
              data: [150, 212, 201, 154, 190, 330, 410]
            },
            {
              name: '前倾',
              type: 'bar',
              stack: '总量',
              barMinHeight: 20,
              label: {
                normal: {
                  show: true,
                  position: 'insideRight'
                }
              },
              data: [82, 42, 1, 34, 190, 330, 120]
            }
            ,
            {
              name: '后倾',
              type: 'bar',
              stack: '总量',
              barMinHeight: 20,
              label: {
                normal: {
                  show: true,
                  position: 'insideRight'
                }
              },
              data: [150, 212, 201, 154, 190, 330, 410]
            },
            {
              name: '畸形',
              type: 'bar',
              stack: '总量',
              barMinHeight: 20,
              label: {
                normal: {
                  show: true,
                  position: 'insideRight'
                }
              },
              data: [20, 82, 90, 93, 120, 130, 130]
            }
          ]
          // tooltip: {
          //   trigger: 'axis',
          //   axisPointer: { // 坐标轴指示器，坐标轴触发有效
          //     type: 'shadow' // 默认为直线，可选为：'line' | 'shadow'
          //   }
          // },
          // grid: {
          //   top: 10,
          //   left: '2%',
          //   right: '2%',
          //   bottom: '3%',
          //   containLabel: true
          // },
          // xAxis: [{
          //   type: 'category',
          //   data: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'],
          //   axisTick: {
          //     alignWithLabel: true
          //   }
          // }],
          // yAxis: [{
          //   type: 'value',
          //   axisTick: {
          //     show: false
          //   }
          // }],
          // series: [{
          //   name: 'pageA',
          //   type: 'bar',
          //   stack: 'vistors',
          //   barWidth: '60%',
          //   data: [79, 52, 200, 334, 390, 330, 220],
          //   animationDuration
          // }, {
          //   name: 'pageB',
          //   type: 'bar',
          //   stack: 'vistors',
          //   barWidth: '60%',
          //   data: [80, 52, 200, 334, 390, 330, 220],
          //   animationDuration
          // }, {
          //   name: 'pageC',
          //   type: 'bar',
          //   stack: 'vistors',
          //   barWidth: '60%',
          //   data: [30, 52, 200, 334, 390, 330, 220],
          //   animationDuration
          // }]
        })
      }
    }
  }
</script>
