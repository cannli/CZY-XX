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
          tooltip: {
            trigger: 'item',
            formatter: "{a} <br/>{b}: {c} ({d}%)"
          },
          legend: {
          //  orient: 'vertical',
            orient : 'vertical',
            x : 'left',
           // x: '5%',
            data:['正常足','扁平足','弓形足']
          },
          series: [
            {
              name:'足弓分析',
              type:'pie',
              radius: ['50%', '70%'],
              avoidLabelOverlap: false,
              label: {
                normal: {
                  show: false,
                  position: 'center'
                },
                emphasis: {
                  show: true,
                  textStyle: {
                    fontSize: '30',
                    fontWeight: 'bold'
                  }
                }
              },
              labelLine: {
                normal: {
                  show: false
                }
              },
              data:[
                {value:335, name:'正常足'},
                {value:310, name:'扁平足'},
                {value:234, name:'弓形足'}
              ]
            }
          ]
        })
      }
    }
  }
</script>
