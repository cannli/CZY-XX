<template>
  <div :class="className" :style="{height:height,width:width}" style=" background: #fff;
     box-shadow: 4px 4px 40px rgba(0, 0, 0, .05);
      border-color: rgba(0, 0, 0, .05);"></div>
</template>

<script>
  import echarts from 'echarts'

  require('echarts/theme/macarons') // echarts theme
  import {debounce} from '../../utils'

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
      legendData: {  //表示同一类的维度，
        type: Array,
        default: []
      },
      xAxisData: { // x轴上的刻度
        type: Array,
        default: []
      },
      seriesData: { // 总数据
        type: Array,
        default: []
      },
      unit: {       // 刻度的单位
        type: String,
        default: ''
      },
     /* color:{
        type: Array,
        default: []
      }*/
    },
    data() {
      return {
        chart: null
      }
    },
    watch: {
      legendData: {
        handler(cval, oval) {
          this.initChart()
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
        let legendData = this.legendData
        let seriesData = this.seriesData
        if (!seriesData || seriesData.length <= 0) return
        let seriesArr = []
        for (let x in seriesData) {
          let opacity="0.6"
          if(x==0){
            opacity="1"
          }else{
            opacity="0.3"
          }
          seriesArr.push({
            name: legendData[x],
            type: 'line',
            /*label: {
              normal: {
                show: true,
                position: 'insideRight'
              }
            },*/

            /* areaStyle: {normal: {
                 opacity: opacity,
               }},*/
            data: seriesData[x]
          })
        }
        this.chart.setOption({
        //  color:this.color,
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
            x: '2%',
            y: '2%',
            data: this.legendData
          },
          toolbox: {
            show: true,
            feature: {
              mark: {show: true},
              dataView: {show: true, readOnly: false},
              saveAsImage: {show: true}
            }
          },
          grid: { //设置整个画布
            left: '2%',
            right: '2%',
            bottom: '2%',
            containLabel: true
          },
          xAxis: [  // x轴上的刻度
            {
              axisLabel : {//坐标轴刻度标签的相关设置。
                interval:0,
                rotate:"60"
              },
              type: 'category',
              boundaryGap: false,
              data: this.xAxisData
            }
          ],
          yAxis: [
            {
              type: 'value',
              axisLabel: {formatter: '{value}' + this.unit}
            }
          ],
          series: seriesArr

        })

      }
    }
  }
</script>


