<template>
    <div class="content-bj">
      <navTitle :navArr="['概况','学校概况']"></navTitle>
      <el-row class="backg-bor-style">
        <el-col :span="24">
          <div class="gong-gao">
            <span>公告通告：2018年9月10日，到，9月10日，成长云联合，全国高等学校联办青少年体能大赛，全国学校踊跃报名中。</span>
            <a class="a-sty">参看报名方式</a>
          </div>
        </el-col>
      </el-row>
      <panelTitle :title="title1" style="text-align: center;"></panelTitle>
      <div class="care2">
        <el-row class="panel-group" :gutter="40">
          <el-col :xs="12" :sm="12" :lg="6" class="card-panel-col">
            <div class='card-panel'>
              <div class="card-panel-icon-wrapper icon-people">
                <img src="./img/tip-a.png">
              </div>
              <div class="card-panel-description">
                <div class="card-panel-text">学生总数</div>
                <countto class="card-panel-num" :startVal="0" :endVal="data.totalNum" :duration="3000"></countto>
              </div>
            </div>
          </el-col>
          <el-col :xs="12" :sm="12" :lg="6" class="card-panel-col">
            <div class="card-panel">
              <div class="card-panel-icon-wrapper icon-message">
                <img src="./img/tip-b.png">
              </div>
              <div class="card-panel-description">
                <div class="card-panel-text">男生总数</div>
                <countto class="card-panel-num" :startVal="0" :endVal="data.maleNum" :duration="3000"></countto>
              </div>
            </div>
          </el-col>
          <el-col :xs="12" :sm="12" :lg="6" class="card-panel-col">
            <div class="card-panel">
              <div class="card-panel-icon-wrapper icon-money">
                <img src="./img/tip-c.png">
              </div>
              <div class="card-panel-description">
                <div class="card-panel-text">女生总数</div>
                <countto class="card-panel-num" :startVal="0" :endVal="data.femaleNum" :duration="3200"></countto>
              </div>
            </div>
          </el-col>
          <el-col :xs="12" :sm="12" :lg="6" class="card-panel-col">
            <div class="card-panel">
              <div class="card-panel-icon-wrapper icon-shoppingCard">
                <img src="./img/tip-d.png">
              </div>
              <div class="card-panel-description">
                <div class="card-panel-text">老师总数</div>
                <countto class="card-panel-num" :startVal="0" :endVal="data.teacherNum" :duration="3600"></countto>
              </div>
            </div>
          </el-col>
        </el-row>
      </div>

      <el-row :gutter="32">
        <el-col :lg="12">
          <el-card class="box-card-huanb1">
            <div slot="header" class="clearfix">
              <span>成长云记录</span>
            </div>
            <div class="text item">
              <el-row class="row">
                <el-col :offset="2" :span="8">最近一次体检时间：</el-col>
                <el-col :span="14">{{recordOverview.checkTime}}</el-col>
              </el-row>
              <el-row class="row">
                <el-col :offset="2" :span="8">总检测次数：</el-col>
                <el-col :span="14">{{recordOverview.allCount}}次</el-col>
              </el-row>
              <el-row class="row">
                <el-col :offset="2" :span="8">专家定制报告：</el-col>
                <el-col :span="14">{{recordOverview.reportCount}}次</el-col>
              </el-row>
              <el-row class="row">
                <el-col :offset="2" :span="8">趋势分析：</el-col>
                <el-col :span="14">优</el-col>
              </el-row>
             <!-- <el-row class="row">
                <el-col :offset="2" :span="8">&nbsp;</el-col>
                <el-col :span="14">&nbsp;</el-col>
              </el-row>-->
              <!-- <span class="span-item"><span class="span1">头晕</span>
                 <img src="../bearSchool/growthManagement/img/icon_shangs.png"/></span>-->
            </div>
          </el-card>
        </el-col>
        <el-col :lg="12">
          <el-card class="box-card-huanb1">
            <div slot="header" class="clearfix">
              <span>最近一次成长评估</span>
            </div>
            <div class="text item">
              <el-row class="row">
                <el-col :offset="2" :span="8">平均身高：</el-col>
                <el-col :span="14">{{lastExam.height}} CM</el-col>
              </el-row>

              <el-row class="row">
                <el-col :offset="2" :span="8">平均体重：</el-col>
                <el-col :span="14">{{lastExam.weight}} KG</el-col>
              </el-row>

              <!--<el-row class="row">-->
                <!--<el-col :offset="2" :span="8">微胖：</el-col>-->
                <!--<el-col :span="14">{{lastExam.wp}}%-->
                  <!--<img v-if="lastExam.wpWard=='up'" src="./img/hongse-icon.png" style="margin-left: 30px;"/>-->
                  <!--<img v-if="lastExam.wpWard=='down'" src="./img/luse-icon.png" style="margin-left: 30px;"/>-->
                <!--</el-col>-->
              <!--</el-row>-->

              <el-row class="row">
                <el-col :offset="2" :span="8">高低肩：</el-col>
                <el-col :span="14">{{lastExam.gdjCount}}%
                  <img v-if="lastExam.serCountWard=='up'" src="./img/hongse-icon.png" style="margin-left: 34px;"/>
                  <img v-if="lastExam.serCountWard=='down'" src="./img/luse-icon.png" style="margin-left: 34px;"/>
                </el-col>
              </el-row>

              <el-row class="row">
                <el-col :offset="2" :span="8">弓腰驼背：</el-col>
                <el-col :span="14">{{lastExam.gyCount}}%
                  <img v-if="lastExam.secounWard=='up'" src="./img/hongse-icon.png" style="margin-left: 34px;"/>
                  <img v-if="lastExam.secounWard=='down'" src="./img/luse-icon.png" style="margin-left: 34px;"/>

                </el-col>
              </el-row>
              <!--<span class="span-item"><span class="span1">头晕</span><img
                src="../bearSchool/growthManagement/img/icon_shangs.png"/></span>-->
            </div>
          </el-card>
        </el-col>
      </el-row>

    </div>
</template>
<script type="text/javascript">
  import countto from 'vue-count-to'
  import {panelTitle} from 'components'
  import navTitle from 'components/navTitle'


  export default {

    data() {
      return {
        title: '学校情况',
        title1: '学校情况',
        data: {},

        recordOverview:{},
        lastExam:{}
      }
    },
    components: {
      countto,
      panelTitle, navTitle
    },
    computed: {

    },
    created() {
      this._overview();

    },
    methods: {



      _overview() {
        this.$fetch.dataApi.overview({})
          .then(({data, msg, total}) => {
            this.data = data;
            this.recordOverview=data.recordOverview;
            this.lastExam=data.lastExam
          })
          .catch(() => {
            console.log(msg);
          });
      },
    },
    mounted() {
    }
  }
</script>

<style scoped lang="scss" type="text/scss" rel="stylesheet/scss">

  .box-card-huanb1 {
    width: 100%;
    text-align: left;
    .clearfix {
      padding: 0 0;
      span {
        font-size: 14px;
        font-weight: bold;
      }
    }
    .clearfix:before, .clearfix:after {
      display: table;
      content: "";
    }
    .clearfix:after {
      clear: both
    }
    .text {
      font-size: 14px;
      padding: 0 0;
    }

    .item {
      margin-bottom: 18px;
      .row {
        padding: 10px 0;
      }

      img {
        vertical-align: middle;
        display: inline-block;
        margin-top: -4px;
        width: 12px;
        height: 20px;
      }
    }
  }

  .gong-gao {
    /*background: #cccccc;*/
    padding: 10px 10px;
    border-radius: 2px;
    color: #f00;
    font-size: 12px;
    .a-sty {
      position: absolute;
      right: 30px;
      cursor: pointer;
      text-decoration: underline;
    }
  }

  .tips {
    background: #cccccc;
    padding: 25px 20px;
    .tipA-img img {
      padding: 0 20px;
      width: 66px;
      height: 66px;
    }
  }

  .p1, .p2 {
    text-align: center;
    font-size: 14px;
    // line-height: 20px;
  }

  .p1 {
    color: #424f63;
  }

  .p2 {
    color: #000;
    font-weight: 600;
  }

  .echarts {
    height: 450px;
    width: 100%;
  }

  .panel-group {
    margin-top: 18px;
    .card-panel-col {
      margin-bottom: 32px;
    }
    .card-panel {
      height: 108px;
      cursor: pointer;
      font-size: 12px;
      position: relative;
      overflow: hidden;
      color: #666;
      background: #fff;
      box-shadow: 4px 4px 40px rgba(0, 0, 0, .05);
      border-color: rgba(0, 0, 0, .05);
      &:hover {
        .card-panel-icon-wrapper {
          color: #fff;
        }
        .icon-people {
          background: #40c9c6;
        }
        .icon-message {
          background: #36a3f7;
        }
        .icon-money {
          background: #f4516c;
        }
        .icon-shoppingCard {
          background: #34bfa3
        }
      }
      .icon-people {
        color: #40c9c6;
      }
      .icon-message {
        color: #36a3f7;
      }
      .icon-money {
        color: #f4516c;
      }
      .icon-shoppingCard {
        color: #34bfa3
      }
      .card-panel-icon-wrapper {
        float: left;
        margin: 14px 0 0 14px;
        padding: 16px;
        transition: all 0.38s ease-out;
        border-radius: 6px;
      }
      .card-panel-icon {
        float: left;
        font-size: 48px;
      }
      .card-panel-description {
        float: right;
        font-weight: bold;
        margin: 26px;
        margin-left: 0px;
        .card-panel-text {
          line-height: 18px;
          color: rgba(0, 0, 0, 0.45);
          font-size: 16px;
          margin-bottom: 12px;
        }
        .card-panel-num {
          font-size: 20px;
        }
      }
    }
  }

  .chart-wrapper {
    background: #fff;
    padding: 16px 16px 0;
    margin-bottom: 32px;
  }
</style>
