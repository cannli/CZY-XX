<template>
  <div :class="className" :style="{height:height,width:width}" style=" background: #fff;
     box-shadow: 4px 4px 40px rgba(0, 0, 0, .05);
      border-color: rgba(0, 0, 0, .05);"></div>
</template>

<script>
  import echarts from 'echarts'

  require('echarts/theme/macarons') // echarts theme
  import {debounce} from '../../utils'

  let posList = [
    'left', 'right', 'top', 'bottom',
    'inside',
    'insideTop', 'insideLeft', 'insideRight', 'insideBottom',
    'insideTopLeft', 'insideTopRight', 'insideBottomLeft', 'insideBottomRight'
  ];
  let app = {}
  app.configParameters = {
    rotate: {
      min: -90,
      max: 90
    },
    align: {
      options: {
        left: 'left',
        center: 'center',
        right: 'right'
      }
    },
    verticalAlign: {
      options: {
        top: 'top',
        middle: 'middle',
        bottom: 'bottom'
      }
    },
    position: {
      options: echarts.util.reduce(posList, function (map, pos) {
        map[pos] = pos;
        return map;
      }, {})
    },
    distance: {
      min: 0,
      max: 100
    }
  };

  app.config = {
    rotate: 90,
    align: 'left',
    verticalAlign: 'middle',
    position: 'insideBottom',
    distance: 15,
    onChange: function () {
      var labelOption = {
        normal: {
          rotate: app.config.rotate,
          align: app.config.align,
          verticalAlign: app.config.verticalAlign,
          position: app.config.position,
          distance: app.config.distance
        }
      };
      myChart.setOption({
        series: [{
          label: labelOption
        }, {
          label: labelOption
        }, {
          label: labelOption
        }, {
          label: labelOption
        }]
      });
    }
  };


  let labelOption = {
    normal: {
      show: true,
      position: app.config.position,
      distance: app.config.distance,
      align: app.config.align,
      verticalAlign: app.config.verticalAlign,
      rotate: app.config.rotate,
      formatter: '{c}  {name|{a}}',
      fontSize: 16,
      rich: {
        name: {
          textBorderColor: '#fff'
        }
      }
    }
  };

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
      unit: {
        type: String,
        default: ''
      },
      valMin: {
        type: String,
        default: ''
      },
      legendData: {  //表示同一类的维度，
        type: Array,
        default: function () {
          return []
        }
      },
      xAxisData: { // x轴上的刻度
        type: Array,
        default: function () {
          return []
        }
      },
      seriesData: { // 总数据
        type: Array,
        default: function () {
          return []
        }
      },
      color: {
        type: Array,
        default: function () {
          return []
        }
      }
    },
    data() {
      return {
        chart: null
      }
    },
    watch: {
      seriesData: {
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
          if (seriesData[x].type === 'line') {
            seriesArr.push({
              name: legendData[x],
              type: seriesData[x].type,
              label: {
                normal: {
                  show: true,
                }
              },
              data: seriesData[x].data
            })
          } else {
            seriesArr.push({
              name: legendData[x],
              barWidth: 20,
              type: seriesData[x].type,
              data: seriesData[x].data
            })
          }

        }
        this.chart.setOption({
          color: this.color,
          tooltip: {
            trigger: 'axis',
            axisPointer: {
              type: 'shadow'
            }
          },
          legend: {
            x: '2%',
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
          calculable: true,
          xAxis: [
            {
              type: 'category',
              axisTick: {show: false},
              data: this.xAxisData
            }
          ],
          yAxis: [
            {
              type: 'value',
              min: this.valMin,
              axisLabel: {formatter: '{value}' + this.unit}
            }
          ],
          series: seriesArr
        })
      }
    }
  }
</script>
