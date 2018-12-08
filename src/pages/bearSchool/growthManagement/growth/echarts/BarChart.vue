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
      projectCode: {
        type: String
      },
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
    watch: {},
    created() {
      this._shapeReport()
    },
    mounted() {
      this.initChart({})
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
      //获取成长报告
      _shapeReport() {
        let params = {
          projectCode: this.projectCode
        };
        this.$fetch.dataApi
          .shapeReport(params)
          .then(({data, msg, total}) => {
            this.initChart(data)
          })
      },

      initChart(data) {
        this.chart = echarts.init(this.$el, 'macarons')
        this.chart.setOption({
          tooltip: {
            trigger: 'axis',
            axisPointer: {            // 坐标轴指示器，坐标轴触发有效
              type: 'shadow'        // 默认为直线，可选为：'line' | 'shadow'
            }
          },
          legend: {
            data: ['正常男', '正常女', '异常男', '异常女'],
            x: '2%',
          },
          grid: {
            left: '1%',
            right: '3%',
            bottom: '5%',
            containLabel: true
          },
          toolbox: {
            show: true,
            feature: {
              mark: {show: true},
              dataView: {show: true, readOnly: false},
              saveAsImage: {show: true}
            }
          },
          xAxis: {
            type: 'value'
          },
          yAxis: {
            type: 'category',
            data: ['腿型', '骨盆位置', '头部（前倾）', '躯干（偏移）', '高低肩', '弓腰（驼背）', '头部（侧歪）']
          },
          series: [
            {
              name: '正常男',
              type: 'bar',
              stack: '总量',
              barMinHeight: 20,

              itemStyle: { //['#339933','#669999','#99ff99','#cccccc']
                normal: {
                  color: '#6BCA66'
                }
              },
              label: {
                normal: {
                  show: true,
                  // position: 'insideRight'
                }
              },
              data: [data.legxo.man, data.pelvispitch.man, data.headfore.man, data.bodyCenter.man, data.shoulder.man,
                data.hump.man, data.head.man]
            },
            {
              name: '正常女',
              type: 'bar',
              stack: '总量',
              barMinHeight: 20,
              itemStyle: {
                normal: {
                  color: '#008A00'
                }
              },
              label: {
                normal: {
                  show: true,
                }
              },
              data: [data.legxo.felMan, data.pelvispitch.felMan, data.headfore.felMan, data.bodyCenter.felMan, data.shoulder.felMan,
                data.hump.felMan, data.head.felMan]
            },
            {
              name: '异常男',
              type: 'bar',
              stack: '总量',
              barMinHeight: 20,
              itemStyle: {
                normal: {
                  color: '#A6AAA8'
                }
              },
              label: {
                normal: {
                  show: true,
                  // position: 'insideRight'
                }
              },

              data: [data.legxo.ycMan, data.pelvispitch.ycMan, data.headfore.ycMan, data.bodyCenter.ycMan, data.shoulder.ycMan,
                data.hump.ycMan, data.head.ycMan]
            },
            {
              name: '异常女',
              type: 'bar',
              stack: '总量',
              barMinHeight: 20,
              itemStyle: { //['#339933','#669999','#99ff99','#cccccc']
                normal: {
                  color: '#6C6F6F'
                }
              },
              label: {
                normal: {
                  show: true,
                  // position: 'insideRight'
                }
              },
              data: [data.legxo.ycFelMan, data.pelvispitch.ycFelMan, data.headfore.ycFelMan, data.bodyCenter.ycFelMan, data.shoulder.ycFelMan,
                data.hump.ycFelMan, data.head.ycFelMan]
            }
          ]
        })
      }
    }
  }
</script>
