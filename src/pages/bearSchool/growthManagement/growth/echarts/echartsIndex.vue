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
        default: '400px'
      },
      dataObj: {
        type:Object,
        default: function () {
          return {}
        }
      },
    },
    data() {
      return {
        chart: null
      }
    },
    watch: {
      dataObj: {
        handler (cval, oval) {
        //  console.log(cval, oval,'55555')
          this.initChart()
         // alert(4444)
        },
        deep: true
      }
    },
    mounted() {
      let self = this
      this.$nextTick(()=> {
        self.initChart()
        self.__resizeHanlder = debounce(() => {
          if (self.chart) {
            self.chart.resize()
          }
        }, 100)
        window.addEventListener('resize', self.__resizeHanlder)
      })
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
          color: this.dataObj.color,
          tooltip: {
            trigger: 'axis',
            axisPointer: {            // 坐标轴指示器，坐标轴触发有效
              type: 'shadow'        // 默认为直线，可选为：'line' | 'shadow'
            }
          },
          legend: {
            data: this.dataObj.title, //['一年级', '二年级', '三年级', '四年级', '五年级'],
            x: '5%',
          },
          toolbox: {
            show: true,
            feature: {
              mark: {show: true},
              dataView: {show: true, readOnly: false},
              //  magicType: {show: true, type: ['line', 'bar', 'stack', 'tiled']},
            //  restore: {show: true},
              saveAsImage: {show: true}
            }
          },
          calculable: true,
          xAxis: [
            {
              type: 'category',
              data: this.dataObj.titleArr
            }
          ],
          yAxis: [
            {
              type: 'value',
              axisLabel: {formatter: '{value}' + this.dataObj.unit}
            }
          ],
          series: this.dataObj.series
        })
      }
    }
  }
</script>
