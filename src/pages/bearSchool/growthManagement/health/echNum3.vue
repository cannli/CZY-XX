<template>
  <div :class="className" :style="{height:height,width:width}" style=" background: #fff;
     box-shadow: 4px 4px 40px rgba(0, 0, 0, .05);
      border-color: rgba(0, 0, 0, .05);"></div>
</template>

<script>
  import echarts from 'echarts'

  require('echarts/theme/macarons') // echarts theme
  import {debounce} from '../../../../utils'

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
          color: ['#003366', '#006699', '#4cabce', '#e5323e','#666666'],
          tooltip: {
            trigger: 'axis',
            axisPointer: {
              type: 'shadow'
            }
          },
          legend: {
            data: ['男最高', '男最低', '女最高', '女最低','平均身高']
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
              data: ['1班', '2班', '3班', '4班', '5班']
            }
          ],
          yAxis: [
            {
              type: 'value',
              axisLabel: {formatter: '{value}' + 'CM'}
            }
          ],
          series: [
            {
              name: '男最高',
              type: 'bar',
              barGap: 0,
              barWidth:20,
              label: labelOption,
              data: [167, 178, 167, 156, 180]
            },
            {
              name: '男最低',
              type: 'bar',
              barMaxWidth:40,
             // label: labelOption,
              data: [156, 145, 160, 165, 177]
            },
            {
              name: '女最高',
              type: 'bar',
              barWidth:20,
              label: labelOption,
              data: [145, 178, 188, 167, 173]
            },
            {
              name: '女最低',
              type: 'bar',
              barMaxWidth:40,
            //  label: labelOption,
              data: [145, 166, 156, 167, 164]
            },

            {
              name:'平均身高',
              type:'line',
             // yAxisIndex: 1,
             // label: labelOption,
              data:[176, 178, 168, 178, 160]
            }
          ]
          /* tooltip : {
             trigger: 'axis'
           },
           legend: {
             data:['男','女'],
             itemGap:2
           },
           toolbox: {
             show: true,
             feature: {
               mark: {show: true},
               dataView: {show: true, readOnly: false},
               saveAsImage: {show: true}
             }
           },
           calculable : true,
           xAxis : [
             {
               type : 'category',
               data : ['1班','2班','3班','4班','5班']

             }
           ],
           yAxis : [
             {
               type : 'value'
             }
           ],
           series : [
             {
               name:'男',
               type:'bar',
               data:[ 180, 150, 180, 168, 178],

              // barGap:'10%',
               barMaxWidth:40,
               itemStyle: {normal: {color:'#009EE0', label:{show:true,textStyle:{color:'#27727B'}}}},
               markPoint : {
                 data : [
                   {type : 'max', name: '最大值'},
                   {type : 'min', name: '最小值'}
                 ]
               },
               markLine : {
                 data : [
                   {type : 'average', name: '平均值'}
                 ],
                 smooth: true,
                 smoothness:0.1,
               }
             },
             {
               name:'女',
               type:'bar',
               barMaxWidth:40,
               data:[ 175.6, 142.2,147,168,146.8 ],
               itemStyle: {
                 normal: {
                   color:'#EB0C93',
                   label:{
                     show:true,
                     textStyle:{
                       color:'#27727B'
                     }
                   }
                 }
               },

               markPoint : {
                 data : [
                   {type : 'max', name: '最大值'},
                   {type : 'min', name: '最小值'}
                 ]
               },
               markLine : {
                 data : [
                   {type : 'average', name : '平均值'}
                 ],
                 smooth: true,
                 smoothness:0.05,
               }
             }
           ]*/
        })
      }
    }
  }
</script>
