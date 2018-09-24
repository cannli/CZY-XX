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
      projectCode:{
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
      },
      // tableData: {
      //   type: Object,
      //   default: {}
      // }
    },
    data() {
      return {
        chart: null,
        tableData: []
      }
    },
    created() {
      this._studentRiskReport();
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

      _studentRiskReport(){
        let params = {
          projectCode: this.projectCode
        };
        this.$fetch.dataApi
          .studentRiskReport(params)
          .then(({data, msg, total}) => {
            this.initChart([data.lumbago,data.dizzy, data.headache,
              data.hemp, data.cervicalDege, data.nsPain,
              data.spur,data.constipation,data.backache,data.ringEar,
              data.deforeSpine,data.chronicStrain,data.lumbaDisk,
              data.physicalFatigue,data.kjPain,data.dryEye,data.insomnia,data.shortBreath])
          })
          .catch(() => {
            console.log("请求失败");
            console.log(msg);
          });

      },

      initChart(data) {
        this.chart = echarts.init(this.$el, 'macarons')

        this.chart.setOption({
          color: ['#3398DB'],
          tooltip: {
            trigger: 'axis',
            axisPointer: {            // 坐标轴指示器，坐标轴触发有效
              type: 'shadow'        // 默认为直线，可选为：'line' | 'shadow'
            }
          },
          grid: {
            left: '3%',
            right: '4%',
            bottom: '3%',
            containLabel: true,
          //   x: 50,
          //   x2: 10,
          //   y2: 50
          },
          xAxis: [
            {
              name:"123",//坐标轴名称。
              nameLocation:'end',//坐标轴名称显示位置。
              type: 'category',
              data: ['颈椎退化', '骨刺', '头痛', '头晕', '手脚麻', '便秘',
                '颈肩痛', '背痛', '腰痛', '腰椎间盘突出', '膝关节痛', '胸闷气短',
                '失眠', '脊柱变形', '慢性劳损', '眼睛干涩', '身体疲倦', '耳鸣'],
              axisLabel : {//坐标轴刻度标签的相关设置。
                interval:0,
                rotate:"45"
              },
              axisTick: {
                alignWithLabel: true
              }
            }
          ],
          yAxis: [
            {
              type: 'value'
            }
          ],
          series: [
            {
              name: '风险预测',
              type: 'bar',
              barWidth: '50%',
              label: {
                normal: {
                  show: true,
                 // position: 'insideRight'
                }
              },
              data: data
            }
          ]
        })
      }
    }
  }
</script>
