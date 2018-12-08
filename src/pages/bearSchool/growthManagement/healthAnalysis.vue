<template>
  <div>
    <div class="content-bj">
      <navTitle :navArr="['成长管理','健康成长']"></navTitle>
      <el-row class="mar-bot20">
        <el-col :lg="24">
          <div class="col_sty">
            <el-select v-model="params.gradeId" placeholder="请选择年级/班级" size="medium" @change="changeFn">
              <el-option
                v-for="item in gradeArr"
                :key="item.val"
                :label="item.name"
                :value="item.val">
              </el-option>
            </el-select>

            <el-select v-model="params.projectCode"
                       @change="changeFnMu"
                       multiple
                       placeholder="请选择时间段"
                       size="medium" style="width: 300px;">
              <el-option
                v-for="item in tjianCSArr"
                :key="item.val"
                :label="item.name"
                :value="item.val">
              </el-option>
            </el-select>

            <el-button  @click="_doExam" type="primary" size="medium">开始对比</el-button>

            <!-- <el-button type="primary" size="medium" style="float: right;">打印导出</el-button>-->
          </div>
        </el-col>
      </el-row>
      <el-row :gutter="10" class="backg-bor-style mar-bot20">
        <el-col :span="24" class="card">
          <div class="card-box" style="display: inline-block;">
            <span class="card-title">全校综合情况</span>
          </div>
        </el-col>
        <el-col :span="8">
          <el-card class="box-card-huanb2">
            <div slot="header" class="clearfix">
              <span>身高、体重</span>
            </div>
            <div class="text item">
              <el-row class="row"><!--<el-col :span="10">133.6→134.8CM
                  <img src="./img/hongse-icon.png" style="margin-left: 10px;"/>
                </el-col>-->
                <el-col :offset="1" :span="23" class="nowrap"><span>平均身高：{{all.lastHeight}}CM
                  <span class="icon-span">→</span>{{all.height}}CM</span>
                  <img v-if="all.height<all.lastHeight" src="./img/luse-icon.png" style="margin-left: 10px;"/>
                  <img v-if="all.height>all.lastHeight" src="./img/hongse-icon.png" style="margin-left: 10px;"/>
                </el-col>

              </el-row>
              <el-row class="row">
                <el-col :offset="1" :span="13" class="nowrap">&emsp;&emsp;<span title="男生平均身高变化情况">男生平均身高变化情况：</span>
                </el-col>
                <el-col :span="10">{{all.lastManH}}CM<span class="icon-span">→</span>{{all.manH}}CM
                  <img v-if="all.manH<all.lastManH" src="./img/luse-icon.png"  style="margin-left: 3px;"/>
                  <img v-if="all.manH>all.lastManH" src="./img/hongse-icon.png" style="margin-left: 3px;"/>
                </el-col>
              </el-row>
              <el-row class="row" style="border-bottom: 1px #cccccc solid;">
                <el-col :offset="1" :span="13" class="nowrap">
                  <span title="女生平均身高变化情况：">&emsp;&emsp;女生平均身高变化情况：</span>
                </el-col>
                <el-col :span="10">{{all.lastFemaleH}}CM<span class="icon-span">→</span>{{all.femaleH}}CM

                  <img v-if="all.femaleH<all.lastFemaleH" src="./img/luse-icon.png"
                       style="margin-left: 28px;"/>
                  <img v-if="all.femaleH>all.lastFemaleH" src="./img/hongse-icon.png"
                       style="margin-left: 28px;"/>

                </el-col>
              </el-row>

              <el-row class="row">
                <el-col :offset="1" :span="23" class="nowrap"><span>平均体重：{{all.lastWeight}}KG<span
                  class="icon-span">→</span>{{all.weight}}KG</span>
                  <img v-if="all.weight<all.lastWeight" src="./img/luse-icon.png" style="margin-left: 10px;"/>
                  <img v-if="all.weight>all.lastWeight" src="./img/hongse-icon.png" style="margin-left: 10px;"/>
                </el-col>
              </el-row>
              <el-row class="row">
                <el-col :offset="1" :span="13" class="nowrap">
                  <span title="男生平均体重变化情况">&emsp;&emsp;男生平均体重变化情况：</span></el-col>
                <el-col :span="10">{{all.lastManW}}KG<span class="icon-span">→</span>{{all.manW}}KG
                  <img v-if="all.manW>all.lastManW" src="./img/hongse-icon.png" style="margin-left: 3px;"/>
                  <img v-if="all.manW<all.lastManW" src="./img/luse-icon.png" style="margin-left: 3px;"/>
                </el-col>
              </el-row>
              <el-row class="row">
                <el-col :offset="1" :span="13" class="nowrap"><span title="女生平均体重变化情况">&emsp;&emsp;女生平均体重变化情况：</span>
                </el-col>
                <el-col :span="10">{{all.lastFemaleW}}KG<span class="icon-span">→</span>{{all.femaleW}}KG
                  <img v-if="all.femaleW>all.lastFemaleW" src="./img/luse-icon.png"
                       style="margin-left: 28px;"/>
                  <img v-if="all.femaleW<all.lastFemaleW" src="./img/hongse-icon.png"
                       style="margin-left: 28px;"/>
                </el-col>
              </el-row>
              <!-- <span class="span-item"><span class="span1">头晕</span>
                 <img src="../bearSchool/growthManagement/img/icon_shangs.png"/></span>-->
            </div>
          </el-card>
        </el-col>
        <el-col :span="8">
          <el-card class="box-card-huanb2">
            <div slot="header" class="clearfix">
              <span>BMI指数</span>
            </div>
            <div class="text item">
              <el-row class="row">
                <el-col :offset="1" :span="13" class="nowrap">超重（BMI指数超标）人群变化：</el-col>
                <el-col :span="10">{{isNull(lastBmi.overWeight)}}<span class="icon-span">→</span>{{isNull(bmi.overWeight)}}人
                  <img v-if="bmi.overWeight<lastBmi.overWeight" src="./img/luse-icon.png"
                       style="margin-left: 30px;"/>
                  <img v-if="bmi.overWeight>lastBmi.overWeight" src="./img/hongse-icon.png"
                       style="margin-left: 30px;"/>
                </el-col>
              </el-row>
              <el-row class="row">
                <el-col :offset="1" :span="13" class="nowrap" style="text-indent:30px;">男生超重人群变化：</el-col>
                <el-col :span="10">{{isNull(lastBmi.manOverWeight)}}
                  <span class="icon-span">→</span>{{isNull(bmi.manOverWeight)}}人
                  <!--<img src="./img/hongse-icon.png" style="margin-left: 30px;"/>-->
                  <img v-if="bmi.manOverWeight<lastBmi.manOverWeight" src="./img/luse-icon.png"
                       style="margin-left: 30px;"/>
                  <img v-if="bmi.manOverWeight>lastBmi.manOverWeight" src="./img/hongse-icon.png"
                       style="margin-left: 30px;"/>
                </el-col>
              </el-row>
              <el-row class="row">
                <el-col :offset="1" :span="13" class="nowrap" style="text-indent:30px;">女生超重人群变化：</el-col>
                <el-col :span="10">
                  {{isNull(lastBmi.femaleOverWeight)}}<span class="icon-span">→</span>
                  {{isNull(bmi.femaleOverWeight)}}人
                  <!--<img src="./img/luse-icon.png" style="margin-left: 30px;"/>-->
                  <img v-if="bmi.femaleOverWeight<lastBmi.femaleOverWeight"
                        src="./img/luse-icon.png" style="margin-left: 30px;"/>
                  <img v-if="bmi.femaleOverWeight>lastBmi.femaleOverWeight" src="./img/hongse-icon.png"
                       style="margin-left: 30px;"/>
                </el-col>
              </el-row>
              <el-row class="row">
                <el-col :offset="1" :span="13" class="nowrap">偏廋（BMI指数低于标准）人群变化:</el-col>
                <el-col :span="10">{{isNull(lastBmi.lowWeight)}}<span class="icon-span">→</span>
                  {{isNull(bmi.lowWeight)}}人
                  <img v-if="bmi.lowWeight<lastBmi.lowWeight" src="./img/luse-icon.png"
                       style="margin-left: 30px;"/>
                  <img v-if="bmi.lowWeight>lastBmi.lowWeight" src="./img/hongse-icon.png"
                       style="margin-left: 30px;"/>
                  <!--<img src="./img/luse-icon.png" style="margin-left: 30px;"/>-->
                </el-col>
              </el-row>
              <el-row class="row">
                <el-col :offset="1" :span="13" class="nowrap" style="text-indent:30px;">男生偏瘦人群变化:</el-col>
                <el-col :span="10">{{isNull(lastBmi.manLowWeight)}}<span class="icon-span">→</span>
                  {{isNull(bmi.manLowWeight)}}人
                  <img v-if="bmi.manLowWeight<lastBmi.manLowWeight" src="./img/luse-icon.png"
                       style="margin-left: 44px;"/>
                  <img v-if="bmi.manLowWeight>lastBmi.manLowWeight" src="./img/hongse-icon.png"
                       style="margin-left: 44px;"/>
                  <!--<img src="./img/luse-icon.png" style="margin-left: 44px;"/>-->
                </el-col>
              </el-row>
              <el-row class="row">
                <el-col :offset="1" :span="13" class="nowrap" style="text-indent:30px;">女生偏瘦人群变化:</el-col>
                <el-col :span="10">{{isNull(lastBmi.femalLowWeight)}}<span class="icon-span">→</span>
                  {{isNull(bmi.femalLowWeight)}}人
                  <!--<img src="./img/luse-icon.png" style="margin-left: 30px;"/>-->
                  <img v-if="bmi.femalLowWeight<lastBmi.femalLowWeight" src="./img/luse-icon.png"
                       style="margin-left: 30px;"/>
                  <img v-if="bmi.femalLowWeight>lastBmi.femalLowWeight" src="./img/hongse-icon.png"
                       style="margin-left: 30px;"/>
                </el-col>
              </el-row>
              <!-- <span class="span-item"><span class="span1">头晕</span>
                 <img src="../bearSchool/growthManagement/img/icon_shangs.png"/></span>-->
            </div>
          </el-card>
        </el-col>
        <el-col :span="8">
          <el-card class="box-card-huanb2">
            <div slot="header" class="clearfix">
              <span>体态情况</span>
            </div>
            <div class="text item">
              <el-row class=" tip_pro1">
                <el-col :xs="24" :sm="24" :lg="24" style="padding-top: 20px;">

                  <div class="tip_left">
                    <span></span>
                    <!--{"headQq":{},"headCy":{},"humpGd":{},"humpZx":{},"pelvispitchCy":{},"pelvispitchQq":{},"leg":{}};-->
                    <span>头侧歪:&emsp;{{curStatistics.head}}人
                        <img v-if="curStatistics.head<0"
                             src="./img/luse-icon.png" style="margin-left: 5px;"/>
                        <img v-if="curStatistics.head>0"
                             src="./img/hongse-icon.png" style="margin-left: 5px;"/>
                      </span>
                    <span>头前倾:&emsp;{{curStatistics.headfore}}人
                      <!--<img src="./img/luse-icon.png" style="margin-left: 5px;"/>-->
                        <img v-if="curStatistics.headfore<0"
                             src="./img/luse-icon.png" style="margin-left: 5px;"/>
                        <img v-if="curStatistics.headfore>0"
                             src="./img/hongse-icon.png" style="margin-left: 5px;"/>
                      </span>
                    <span>弓腰驼背:&emsp;{{curStatistics.hump}}人
                      <!--<img src="./img/hongse-icon.png" style="margin-left: 5px;"/>-->
                        <img v-if="curStatistics.hump<0"
                             src="./img/luse-icon.png" style="margin-left: 5px;"/>
                        <img v-if="curStatistics.hump>0"
                             src="./img/hongse-icon.png" style="margin-left: 5px;"/>
                      </span>
                    <span>骨盆异位:&emsp;{{curStatistics.pelvispitch}}人
                      <!--<img src="./img/luse-icon.png" style="margin-left: 5px;"/> -->
                      <img
                        v-if="curStatistics.pelvispitch<0"
                        src="./img/luse-icon.png" style="margin-left: 5px;"/>
                        <img
                          v-if="curStatistics.pelvispitch>0"
                          src="./img/hongse-icon.png" style="margin-left: 5px;"/>
                      </span>
                    <span>高低肩:&emsp;{{curStatistics.shoulder}}人
                      <!--<img src="./img/hongse-icon.png" style="margin-left: 5px;"/>-->
                        <img v-if="curStatistics.shoulder<0"
                             src="./img/luse-icon.png" style="margin-left: 5px;"/>
                        <img v-if="curStatistics.shoulder>0"
                             src="./img/hongse-icon.png" style="margin-left: 5px;"/>
                      </span>
                    <span>躯干偏移:&emsp;{{curStatistics.bodyCenter}}人
                      <!--<img src="./img/hongse-icon.png" style="margin-left: 5px;"/>-->
                         <img
                           v-if="curStatistics.bodyCenter<0"
                           src="./img/luse-icon.png" style="margin-left: 5px;"/>
                        <img
                          v-if="curStatistics.bodyCenter>0"
                          src="./img/hongse-icon.png" style="margin-left: 5px;"/>

                      </span>
                    <span>腿型问题:&emsp;{{curStatistics.legxo}}人
                      <!--<img src="./img/luse-icon.png" style="margin-left: 5px;"/>-->
                         <img v-if="curStatistics.legxo<0"
                              src="./img/luse-icon.png" style="margin-left: 5px;"/>
                        <img v-if="curStatistics.legxo>0"
                             src="./img/hongse-icon.png" style="margin-left: 5px;"/>

                      </span>
                    <!--<span>足弓发育异常:23人<img src="./img/luse-icon.png" style="margin-left: 5px;"/></span>-->
                  </div>

                </el-col>
              </el-row>
            </div>
          </el-card>
        </el-col>
      </el-row>


      <el-row :gutter="10" class="backg-bor-style" style="margin-bottom: 20px;">
        <el-col :span="16" class="card">
          <div class="card-box">
            <span class="card-title">身高统计（单位：cm）</span>
          </div>
          <div class="">
            <!--  <echNum3></echNum3>-->
            <barMultiple v-if="dataShengGao.seriesData&&dataShengGao.seriesData.length>0"
                         :seriesData="dataShengGao.seriesData"
                         :xAxisData="dataShengGao.xAxisData"
                         :legendData="dataShengGao.legendData"
                         :color="dataShengGao.color"
                         valMin="0"
                         unit="CM">
            </barMultiple>
            <noData v-else></noData>
          </div>
        </el-col>
        <el-col :span="8" class="card">
          <div class="card-box">
            <span class="card-title"></span>
          </div>
          <el-row class="panel-group-card">
            <el-col :xs="24" :sm="24" :lg="24" class="card-panel-duibi">
              <div class="card-panel-duibi-title">
                <span class="span1">相比上一次身高平均</span>
                <span class="span2">{{avgHwLast.height?isNull((avgHw.height)-(avgHwLast.height),1):'-'}}CM</span>
                <img v-if="(avgHw.height)-(avgHwLast.height)>0" src="./img/hongse-icon.png" class="span3"/>
                <img v-if="(avgHw.height)-(avgHwLast.height)<0" src="./img/luse-icon.png" class="span3"/>


              </div>
            </el-col>

            <el-col :lg="24" class="card-panel-col">
              <div class='card-panel'>
                <div class="card-panel-icon-wrapper icon-people">
                  <img src="./img/sexN.png">
                </div>
                <div class="card-panel-description">

                  <div class="man manDi" :style="{width:( hwCount.manHeight||0)+'px'}">
                    <span>本次男平均身高：{{isNull(avgHw.manHeight,1)}}CM</span>
                  </div>

                  <div class="man manHei" :style="{width: ( hwLastCount.manHeight||0)+'px'}">
                    <span>上次男平均身高：{{isNull(avgHwLast.manHeight,1)}}CM</span>
                  </div>

                  <div class="tip3">
                    <strong class="strong">{{avgHwLast.manHeight?isNull(avgHw.manHeight-avgHwLast.manHeight,1):'-'}}CM</strong>
                    <img v-if="avgHwLast.manHeight-avgHw.manHeight>0" src="./img/luse-icon.png"
                         style="margin-left: 10px;"/>
                    <img v-if="avgHwLast.manHeight-avgHw.manHeight<0" src="./img/hongse-icon.png"
                         style="margin-left: 10px;"/>
                  </div>
                </div>
              </div>
            </el-col>
            <el-col :xs="24" :sm="24" :lg="24" class="card-panel-col">
              <div class="card-panel">
                <div class="card-panel-icon-wrapper icon-message">
                  <img src="./img/sexX.png">
                </div>
                <div class="card-panel-description">

                  <div class="woman womanDi" :style="{width: ( hwLastCount.felmanHeight||0)+'px'}">
                    <span><i>本次女平均身高</i>{{isNull(avgHw.femaleHeight,1)}}CM</span>
                  </div>

                  <div class="woman womanHei" :style="{width: ( hwLastCount.felmanHeight||0)+'px'}">
                    <span><i>上次女平均身高</i>{{isNull(avgHwLast.femaleHeight,1)}}CM</span>
                  </div>

                  <div class="tip3">
                    <strong class="strong">{{avgHwLast.femaleHeight?isNull(avgHw.femaleHeight-avgHwLast.femaleHeight,1):'-'}}CM</strong>

                    <img v-if="avgHwLast.femaleHeight-avgHw.femaleHeight>0" src="./img/luse-icon.png"
                         style="margin-left: 10px;"/>
                    <img v-if="avgHwLast.femaleHeight-avgHw.femaleHeight<0" src="./img/hongse-icon.png"
                         style="margin-left: 10px;"/>
                  </div>
                </div>
              </div>
            </el-col>
          </el-row>
        </el-col>
      </el-row>

      <el-row :gutter="10" class="backg-bor-style" style="margin-bottom: 20px;">
        <el-col :span="16" class="card">
          <div class="card-box">
            <span class="card-title">体重统计（单位：kg）</span>
          </div>
          <div>
            <barMultiple v-if="dataTiZhong.seriesDataTZ&&dataTiZhong.seriesDataTZ.length>0"
                         :seriesData="dataTiZhong.seriesDataTZ"
                         :xAxisData="dataTiZhong.xAxisData"
                         :legendData="dataTiZhong.legendData"
                         :color="dataTiZhong.color"
                         valMin="0"
                         unit="KG">
            </barMultiple>
            <noData v-else></noData>
          </div>
        </el-col>
        <el-col :span="8" class="card">
          <div class="card-box">
            <span class="card-title"></span>
          </div>
          <el-row class="panel-group-card">
            <el-col :xs="24" :sm="24" :lg="24" class="card-panel-duibi">
              <div class="card-panel-duibi-title">
                <span class="span1">相比上一次体重平均</span>
                <span class="span2">{{avgHwLast.weight?isNull((avgHw.weight)-(avgHwLast.weight),1):'-'}}KG</span>
                <!--<img class="span3" src="./img/icon_shangs.png"/>-->
                <img v-if="(avgHwLast.weight)-(avgHw.weight)>0" src="./img/luse-icon.png" class="span3"/>
                <img v-if="(avgHwLast.weight)-(avgHw.weight)<0" src="./img/hongse-icon.png" class="span3"/>
              </div>
            </el-col>

            <el-col :xs="24" :sm="24" :lg="24" class="card-panel-col">
              <div class='card-panel'>
                <div class="card-panel-icon-wrapper icon-people">
                  <img src="./img/sexN.png">
                </div>
                <div class="card-panel-description">

                  <div class="man manDi" :style="{width: (hwCount.manweight||0)*5+'px'}">
                    <span><i>本次男平均体重</i>{{isNull(avgHw.manweight,1)}}KG</span>
                  </div>

                  <div class="man manHei" :style="{width: (hwLastCount.manweight||0)*5+'px'}">
                    <span><i>上次男平均体重</i>{{isNull(avgHwLast.manweight,1)}}KG</span>
                  </div>

                  <div class="tip3">
                    <strong
                      class="strong">{{avgHwLast.manweight?isNull(avgHw.manweight-avgHwLast.manweight,1):'-'}}KG</strong>
                    <!--<img src="./img/hongse-icon.png" />-->
                    <img v-if="avgHwLast.manweight-avgHw.manweight>0" src="./img/luse-icon.png"
                         style="margin-left: 10px;"/>
                    <img v-if="avgHwLast.manweight-avgHw.manweight<0" src="./img/hongse-icon.png"
                         style="margin-left: 10px;"/>
                  </div>
                </div>
              </div>
            </el-col>
            <el-col :xs="24" :sm="24" :lg="24" class="card-panel-col">
              <div class="card-panel">
                <div class="card-panel-icon-wrapper icon-message">
                  <img src="./img/sexX.png">
                </div>
                <div class="card-panel-description">

                  <div class="woman womanDi" :style="{width: (hwCount.felmanweight||0)*5+'px'}">
                    <span><i>本次女平均体重</i>{{isNull(avgHw.femaleweight,1)}}KG</span>
                  </div>

                  <div class="woman womanHei" :style="{width: (hwLastCount.felmanweight||0)*5+'px'}">
                    <span><i>上次女平均体重</i>{{isNull(avgHwLast.femaleweight,1)}}KG</span>
                  </div>

                  <div class="tip3">
                    <strong class="strong">{{avgHwLast.femaleweight?isNull(avgHw.femaleweight-avgHwLast.femaleweight,1):'-'}}KG</strong>
                    <!--<img src="./img/hongse-icon.png" style="margin-left: 10px;"/>-->
                    <img v-if="avgHwLast.femaleweight-avgHw.femaleweight>0" src="./img/luse-icon.png"
                         style="margin-left: 10px;"/>
                    <img v-if="avgHwLast.femaleweight-avgHw.femaleweight<0" src="./img/hongse-icon.png"
                         style="margin-left: 10px;"/>
                  </div>
                </div>
              </div>
            </el-col>
          </el-row>
        </el-col>
      </el-row>

      <el-row class="backg-bor-style" :gutter="10" style="margin-bottom: 20px;">
        <el-col :span="24" class="card">
          <div class="card-box" style="display: inline-block;">
            <span class="card-title">体态统计</span>
          </div>
        </el-col>

        <el-col :span="15">
          <div class="">  <!-- :color="['#009900','#ff9900']"-->
            <echartLine
              v-if="titaiData.seriesData&&titaiData.seriesData.length>0"
              :seriesData="titaiData.seriesData"
              :xAxisData="titaiData.xAxisData"
              :legendData="titaiData.legendData"
              unit="人"
            ></echartLine>
            <noData v-else></noData>
          </div>
        </el-col>
        <el-col :span="6">
          <el-row :gutter="10">
            <el-col :span="12">
              <el-card class="box-card">
                <div slot="header" class="clearfix">
                  <img src="./img/sexN.png">
                  <span>男生</span>
                </div>
                <div class="text item">
                  <span>本次异常：{{ycData.nanYC}}人</span>
                </div>
                <div class="text item">
                  <span>上次异常：{{ycData.LnanYC}}人</span>
                </div>
                <div class="text item">
                  <span>{{(ycData.LnanYC)-(ycData.nanYC)}}人</span>

                  <img v-if="(ycData.LnanYC)-(ycData.nanYC)>0"
                       src="./img/hongse-icon.png" class="imgStyI"/>
                  <img v-if="(ycData.LnanYC)-(ycData.nanYC)<0" src="./img/luse-icon.png"
                       class="imgStyI"/>
                </div>
              </el-card>
            </el-col>
            <el-col :span="12">
              <el-card class="box-card">
                <div slot="header" class="clearfix">
                  <img src="./img/sexX.png">
                  <span>女生</span>
                </div>
                <div class="text item">
                  <span>本次异常：{{ycData.womanYC}}人</span>
                </div>
                <div class="text item">
                  <span>上次异常：{{ycData.LwomanYC}}人</span>
                </div>
                <div class="text item">
                  <span>{{(ycData.LwomanYC)-(ycData.womanYC)}}人</span>
                  <img v-if="(ycData.LwomanYC)-(ycData.womanYC)>0"
                       src="./img/hongse-icon.png" class="imgStyI"/>
                  <img v-if="(ycData.LwomanYC)-(ycData.womanYC)<0"
                       src="./img/luse-icon.png" class="imgStyI"/>
                </div>
              </el-card>
            </el-col>
          </el-row>
        </el-col>

        <el-col :span="3">
          <el-card class="box-card">
            <div slot="header" class="clearfix">
              <img src="./img/sexX.png">
              <img src="./img/sexN.png">
              <span>总体</span>
            </div>
            <div class="text item">
              <span>本次异常：{{(ycData.nanYC)+(ycData.womanYC)}}人</span>
            </div>
            <div class="text item">
              <span>上次异常：{{(ycData.LnanYC)+(ycData.LwomanYC)}}人</span>
            </div>
            <div class="text item">
              <span>{{(ycData.LnanYC+ycData.LwomanYC)-(ycData.LnanYC+ycData.LwomanYC)}}人</span>
              <img
                v-if="(ycData.LnanYC+ycData.LwomanYC)-(ycData.LnanYC+ycData.LwomanYC)>0"
                src="./img/hongse-icon.png" class="imgStyI"/>
              <img
                v-if="(ycData.LnanYC+ycData.LwomanYC)-(ycData.LnanYC+ycData.LwomanYC)<0"
                src="./img/luse-icon.png" class="imgStyI"/>
            </div>
          </el-card>
        </el-col>
      </el-row>

      <el-row :gutter="10" class="backg-bor-style" style="margin-bottom: 20px;">
        <el-col :span="24" class="card">
          <div class="card-box" style="display: inline-block;">
            <span class="card-title">两次总体风险值对比</span>
          </div>
        </el-col>
        <el-col :span="24" class="card">
          <div class="">
            <echartLine
              v-if="fxianObj.lastLineCur&&fxianObj.lastLineCur.length>0"
              :seriesData="fxianObj.lastLineCur"
              :xAxisData="fxianObj.dataArr"
              :legendData="fxianObj.legendData"
            ></echartLine>
            <noData v-else></noData>
          </div>
        </el-col>

        <el-col :span="24" class="card">
          <div class="">
            <echNum6 :curPieObj="curPieObj"></echNum6>
            <!--<noData></noData>-->
          </div>

        </el-col>
      </el-row>

    </div>
  </div>
</template>

<script>
  import navTitle from 'components/navTitle'
  import echNum2 from './health/echNum2.vue'
  import echNum3 from './health/echNum3.vue'
  // import echNum5 from './health/echNum5.vue'
  import echNum6 from './health/echNum6.vue'
  import noData from 'components/noData'
  import barMultiple from 'components/echarts/barMultiple'
  import echartLine from 'components/echarts/line.vue'

  export default {
    components: {
      navTitle, echNum2, echNum3, echNum6, echartLine, barMultiple, noData
    },
    props: {},
    data() {
      return {
        all: {},                       // 当前综合
        lastAll: {},                   // 比较综合
        // BMI 情况
        bmiObj: {},
        hwCount: {height: 0},
        hwLastCount: {height: 0},
        man: {},
        female: {},
        lastMan: {},
        lastFemale: {},
        bmi: {},
        lastBmi: {},

        // line 的 数据体重分析
        legendData: {
          tiZhong: ['男最重', '女最重', '男最轻', '女最轻'],
          zongHe: ['本次风险预测', '上次风险预测'],
        },

        xAxisData: {
          tiZhong: []
          // ['1班', '2班', '3班', '4班', '5班']
        },
        value: "lumbago",
        value1: "headfore",
        dataShengGao: {}, // 身高
        // 体重
        dataTiZhong: {},
        // 获取年级
        gradeArr: [],
        // 获取第几次
        tjianCSArr: [],
        params: {
          projectCode: undefined,
          gradeId: undefined
        },
        avgHw: {},// 本次平均hw
        avgHwLast: {},// 其他平均hw
        flag: false,
        // 获取体态数据
        titaiData: {},
        // 获取体态的异常数量
        ycData: {
          nanYC: 0,
          womanYC: 0,
          LnanYC: 0,
          LwomanYC: 0,
        },
        // 获取选择时间段的name
        timeN: [],
        // 获取风险数据
        fxianObj: {},
        // pie图
        curPieObj: {},
        // 人形体态
        curStatistics: {},
        lastStatistics: {}
      }
    },
    watch: {
      flag(val) {
        if (val) {
          this._compareAvgHw()
          this._compareTtStatic()
          this._compareBMi()
          this._compareHw()
          this._compareTt()
          this._compareDisk()
        }
      }
    },
    computed: {},
    created() {

      this._examGrade()
    },
    methods: {
      // 获取 对比分析中的年级
      _examGrade() {
        let params = {};
        this.$fetch.dataApi
          .examGrade(params)
          .then(({data, msg, total}) => {
            if (data && data.length > 0) {
              this.gradeArr = data
              this.params.gradeId = data[0].val
              this._exam(this.params.gradeId)
            }
          })
      },
      // 获取 对比分析中的时间段
      _exam(id) {
        let params = {
          gradeId: id
        };
        this.$fetch.dataApi.exam(params)
          .then(({data, msg, total}) => {
            if (data && data.length > 0) {
              this.tjianCSArr = data
              if (data.length === 1) {
                this.params.projectCode = [data[0].val]
                this.timeN = [this.arrValToName(data, data[0].val)]
              } else {
                this.params.projectCode = [data[0].val, data[1].val]
                this.timeN = [this.arrValToName(data, data[0].val), this.arrValToName(data, data[1].val)]
              }
            }
            this.flag = true

          })
      },
      // 获取年级的id
      changeFn(val) {
        this.params.gradeId = val
        this._exam(val)
      },
      changeFnMu(val) {
        let valArr = val
        if (val.length > 2) {
          this.params.projectCode = val.slice(0, 2)
          valArr = val.slice(0, 2)
          this.$message({
            message: '最多选择2个时间段做对比',
            type: 'warning'
          });
        }
        let arr = []
        for (let x in valArr) {
          arr.push(this.arrValToName(this.tjianCSArr, valArr[x]))
        }
        this.timeN = arr
        console.log(this.timeN, 6666666666)
      },

      // 全校综合情况身高体重
      _compareAvgHw() {
        let params = {
          projectCode: this.params.projectCode.join(),
          gradeId: this.params.gradeId
        }
        this.$fetch.dataApi.compareAvgHw(params)
          .then(({data, msg, total}) => {
            this.all = {
              // 本次
              height: data.all.avgHeight ? data.all.avgHeight : '-',               // 平均身高
              femaleH: data.female.avgHeight ? data.female.avgHeight : '-',        // 女生平均身高变化情
              manH: data.man.avgHeight ? data.man.avgHeight : '-',                  // 男生平均身高变化
              weight: data.all.avgWeight ? data.all.avgWeight : '-',
              femaleW: data.female.avgWeight ? data.female.avgWeight : '-',        // 女生平均体重变化情
              manW: data.man.avgWeight ? data.man.avgWeight : '-',
              // 比较次
              lastHeight: data.lastAll.avgHeight ? data.lastAll.avgHeight : '-',               // 平均身高
              lastFemaleH: data.lastFemale.avgHeight ? data.lastFemale.avgHeight : '-',        // 女生平均身高变化情
              lastManH: data.lastMan.avgHeight ? data.lastMan.avgHeight : '-',                  // 男生平均身高变化
              lastWeight: data.lastAll.avgWeight ? data.lastAll.avgWeight : '-',
              lastFemaleW: data.lastFemale.avgWeight ? data.lastFemale.avgWeight : '-',        // 女生平均体重变化情
              lastManW: data.lastMan.avgWeight ? data.lastMan.avgWeight : '-',
            }
          })
      },
      isEmptyObject(obj){
        for(var key in obj){
          return false
        };
        return true
      },
      // 获取体态情况
      _compareTtStatic() {
        let params = {
          projectCode: this.params.projectCode.join(),
          gradeId: this.params.gradeId
        }
        this.$fetch.dataApi.compareTtStatic(params)
          .then(({data, msg, total}) => {
            /*
            *
            * <span>头侧歪:{{isNull(shapeData.head,1)}}% </span>
            <span>头前倾:{{isNull(shapeData.headfore,1)}}% </span>
            <span>弓腰驼背:{{isNull(shapeData.hump,1)}}%</span>
            <span>骨盆前/后倾:{{isNull(shapeData.pelvispitch,1)}}% </span>
            <span>高低肩:{{isNull(shapeData.shoulder,1)}}%</span>
            <span>躯干偏移:{{isNull(shapeData.bodyCenter,1)}}%</span>
            <span>腿型异常:{{isNull(shapeData.legxo,1)}}%</span>
            *
            * */
            let defaultVal = {
              head:{abnormal:0},
              headfore:{abnormal:0},
              hump:{abnormal:0},
              pelvispitch:{abnormal:0},
              shoulder:{abnormal:0},
              bodyCenter:{abnormal:0},
              legxo:{abnormal:0}
            }

            let dataCur = this.isEmptyObject(data.cur)?defaultVal: data.cur;


            let dataLast =  this.isEmptyObject(data.last)?defaultVal :data.last
            this.curStatistics = {
              head: dataLast.head.abnormal||0 - dataCur.head.abnormal,
              headfore: dataLast.headfore.abnormal||0 - dataCur.headfore.abnormal,
              hump: dataLast.hump.abnormal||0 - dataCur.hump.abnormal,
              pelvispitch: dataLast.pelvispitch.abnormal||0 - dataCur.pelvispitch.abnormal,
              shoulder: dataLast.shoulder.abnormal||0 - dataCur.shoulder.abnormal,
              bodyCenter: dataLast.bodyCenter.abnormal||0 - dataCur.bodyCenter.abnormal,
              legxo: dataLast.legxo.abnormal||0 - dataCur.legxo.abnormal
            }
            this.lastStatistics = {}
          })
      },
      // 获取BMI
      _compareBMi() {
        let params = {
          projectCode: this.params.projectCode.join(),
          gradeId: this.params.gradeId
        }
        this.$fetch.dataApi.compareBMi(params)
          .then(({data, msg, total}) => {
            this.bmi = data.bmi,
              this.lastBmi = data.lastBmi
          })
      },
      // 获取身高数据
      _compareHw() {
        let params = {
          projectCode: this.params.projectCode.join(),
          gradeId: this.params.gradeId
        }
        this.$fetch.dataApi.compareHw(params)
          .then(({data, msg, total}) => {
            this.avgHw = data.avg.hw            // 本次平均hw
            this.avgHwLast = data.avg.hwLast     // 其他平均hw

            this.dataShengGao = {}
            let xAxisData = []
            let seriesData = []
            let seriesDataTZ = []
            let bar = data.bar
            let hwList = bar.hwList
            let hwLastList = bar.hwLastList

            let wHp = [] // 本次女平均身高
            let mHp = [] // 本次男平均
            let allHp = [] // 本次总平均

            let mHpLast = [] // 其他男平均
            let wHpLast = [] // 其他女平均身高
            let lastAllHp = [] // 其他总平均
            /*************************体重****************************/
            let wWp = [] // 本次女平均体重
            let mWp = [] // 本次男平均体重
            let allWp = [] // 本次总平均体重

            let mWpLast = [] // 其他男平均体重
            let wWpLast = [] // 其他女平均体重
            let lastAllWp = [] // 其他总平均体重


            for (let x in hwList) {
              xAxisData.push(hwList[x].name)
              mHp.push(hwList[x].manHeight ? hwList[x].manHeight.toFixed(2) : 0)
              wHp.push(hwList[x].femaleHeight ? hwList[x].femaleHeight.toFixed(2) : 0)
              allHp.push(hwList[x].height ? hwList[x].height.toFixed(2) : 0)
              // 体重
              wWp.push(hwList[x].femaleweight ? hwList[x].femaleweight.toFixed(2) : 0)
              mWp.push(hwList[x].manweight ? hwList[x].manweight.toFixed(2) : 0)
              allWp.push(hwList[x].weight ? Number(hwList[x].weight).toFixed(2) : 0)
            }

            for (let x in hwLastList) {
              mHpLast.push(hwLastList[x].manHeight ? hwLastList[x].manHeight.toFixed(2) : 0)
              wHpLast.push(hwLastList[x].femaleHeight ? hwLastList[x].femaleHeight.toFixed(2) : 0)
              lastAllHp.push(hwLastList[x].height ? hwLastList[x].height.toFixed(2) : 0)
              // 体重
              wWpLast.push(hwLastList[x].femaleweight ? hwLastList[x].femaleweight.toFixed(2) : 0)
              mWpLast.push(hwLastList[x].manweight ? hwLastList[x].manweight.toFixed(2) : 0)
              lastAllWp.push(hwLastList[x].weight ? Number(hwLastList[x].weight).toFixed(2) : 0)
            }
            seriesData = [
              {type: 'bar', data: mHp},
              {type: 'bar', data: mHpLast},
              {type: 'bar', data: wHp},
              {type: 'bar', data: wHpLast},
              {type: 'line', data: allHp},
              {type: 'line', data: lastAllHp}
            ]
            seriesDataTZ = [
              {type: 'bar', data: mWp},
              {type: 'bar', data: mWpLast},
              {type: 'bar', data: wWp},
              {type: 'bar', data: wWpLast},
              {type: 'line', data: allWp},
              {type: 'line', data: lastAllWp}
            ]
            this.dataShengGao = {
              seriesData,
              xAxisData,
              color: ['#0066ff', '#00ff00', '#cc99ff', '#ffccff', '#01B200', '#666'],
              legendData: ['本次男平均身高', '上次男平均身高', '本次女平均身高', '上次女平均身高', '本次平均身高', '上次平均身高'],
            }
            this.dataTiZhong = {
              seriesDataTZ,
              xAxisData,
              color: ['#0066ff', '#00ff00', '#cc99ff', '#ffccff', '#01B200', '#666'],
              legendData: ['本次男平均体重', '上次男平均体重', '本次女平均体重', '上次女平均体重', '本次平均体重', '上次平均体重'],
            }
            console.log(this.dataTiZhong, '55555555')
          })
      },

      // 获取图表的体态数据
      _compareTt() {
        let params = {
          projectCode: this.params.projectCode.join(),
          gradeId: this.params.gradeId
        }
        this.$fetch.dataApi.compareTt(params)
          .then(({data, msg, total}) => {  //titaiData
            this.titaiData = {}
            let curM = data.cur.man     // 本次  @@
            let curW = data.cur.female  // @@
            let lastM = data.last.lastTtMan
            let lastW = data.last.lastTtFemale
            let curPlus = []                   //  得到男跟女相加的数据（本次）
            let lastPlus = []                  //  得到男跟女相加的数据（下次）
            let legendData = []

            // 本次男加一起
            let nanYC = 0
            let womanYC = 0

            // 其他次
            let LnanYC = 0
            let LwomanYC = 0
            let xAxisData = ['躯干偏移', '头侧歪', '头前倾', '弓腰驼背', '腿型异常', '骨盆前/后倾', '高低肩']
            if (curM && curM.length > 0) {
              for (let x = 0; x < curM.length; x++) {
                legendData.push('本次' + curM[x].name)
                curPlus.push(
                  [
                    Number(curM[x].bodyCenterCount) + Number(curW[x].bodyCenterCount),
                    Number(curM[x].headCount) + Number(curW[x].headCount),
                    Number(curM[x].headForeCount) + Number(curW[x].headForeCount),
                    Number(curM[x].humpCount) + Number(curW[x].humpCount),
                    Number(curM[x].legxoCount) + Number(curW[x].legxoCount),
                    Number(curM[x].pelvispitchCount) + Number(curW[x].pelvispitchCount),
                    Number(curM[x].shoulderCount) + Number(curW[x].shoulderCount),
                  ]
                )

                nanYC += (Number(curM[x].bodyCenterCount) + Number(curM[x].headCount) + Number(curM[x].headForeCount) +
                  Number(curM[x].humpCount) + Number(curM[x].legxoCount) + Number(curM[x].pelvispitchCount) + Number(curM[x].shoulderCount))
                womanYC += (Number(curW[x].bodyCenterCount) + Number(curW[x].headCount) + Number(curW[x].headForeCount) +
                  Number(curW[x].humpCount) + Number(curW[x].legxoCount) + Number(curW[x].pelvispitchCount) + Number(curW[x].shoulderCount))
              }
            }
            if (lastM && lastM.length > 0) {
              for (let x = 0; x < lastM.length; x++) {
                legendData.push('下次' + curM[x].name)
                lastPlus.push(
                  [
                    Number(lastM[x].bodyCenterCount) + Number(lastW[x].bodyCenterCount),
                    Number(lastM[x].headCount) + Number(lastW[x].headCount),
                    Number(lastM[x].headForeCount) + Number(lastW[x].headForeCount),
                    Number(lastM[x].humpCount) + Number(lastW[x].humpCount),
                    Number(lastM[x].legxoCount) + Number(lastW[x].legxoCount),
                    Number(lastM[x].pelvispitchCount) + Number(lastW[x].pelvispitchCount),
                    Number(lastM[x].shoulderCount) + Number(lastW[x].shoulderCount),
                  ]
                )
                LnanYC += (Number(lastM[x].bodyCenterCount) + Number(lastM[x].headCount) + Number(lastM[x].headForeCount) +
                  Number(lastM[x].humpCount) + Number(lastM[x].legxoCount) + Number(lastM[x].pelvispitchCount) + Number(lastM[x].shoulderCount))
                LwomanYC += (Number(lastW[x].bodyCenterCount) + Number(lastW[x].headCount) + Number(lastW[x].headForeCount) +
                  Number(lastW[x].humpCount) + Number(lastW[x].legxoCount) + Number(lastW[x].pelvispitchCount) + Number(lastW[x].shoulderCount))
              }
            }

            let seriesData = [...curPlus, ...lastPlus]
            this.titaiData = {
              seriesData, legendData, xAxisData
            }

            this.ycData = {nanYC, womanYC, LnanYC, LwomanYC}
            console.log(this.titaiData, '33333')
          })
      },
      _doExam(){
        if(!this.params.projectCode){
          return;
        }
        if(!this.params.gradeId){
          return;
        }
        this._compareAvgHw()
        this._compareTtStatic()
        this._compareBMi()
        this._compareHw()
        this._compareTt()
        this._compareDisk()
      },
      //  获取风险数据
      _compareDisk() {
        let params = {
          projectCode: this.params.projectCode.join(),
          gradeId: this.params.gradeId
        }
        this.$fetch.dataApi.compareDisk(params)
          .then(({data, msg, total}) => {
            let legendData = []
            let dataArr = ['颈椎退化', '骨刺', '头痛', '头晕', '手脚麻', '便秘',
              '颈肩痛', '背痛', '腰痛', '腰椎间盘突出', '膝关节痛', '胸闷气短',
              '失眠', '脊柱变形', '慢性劳损', '眼睛干涩', '身体疲倦', '耳鸣']
            let cur = []   // 本次
            let last = []  // 其他次

            if (data.line && data.line.cur && data.line.cur.length > 0) {
              let lineCur = data.line.cur
              for (let i = 0; i < lineCur.length; i++) {
                legendData.push('本次' + lineCur[i].name)
                cur.push(
                  [lineCur[i].lumbago, lineCur[i].dizzy, lineCur[i].headache,
                    lineCur[i].hemp, lineCur[i].cervicalDege, lineCur[i].nsPain,
                    lineCur[i].spur, lineCur[i].constipation, lineCur[i].backache, lineCur[i].ringEar,
                    lineCur[i].deforeSpine, lineCur[i].chronicStrain, lineCur[i].lumbaDisk,
                    lineCur[i].physicalFatigue, lineCur[i].kjPain, lineCur[i].dryEye, lineCur[i].insomnia,
                    lineCur[i].shortBreath]
                )
              }
            }
            if (data.line && data.line.last && data.line.last.length > 0) {
              let lastLineCur = data.line.last
              for (let i = 0; i < lastLineCur.length; i++) {
                legendData.push('上次' + lastLineCur[i].name)
                last.push(
                  [
                    lastLineCur[i].lumbago, lastLineCur[i].dizzy, lastLineCur[i].headache,
                    lastLineCur[i].hemp, lastLineCur[i].cervicalDege, lastLineCur[i].nsPain,
                    lastLineCur[i].spur, lastLineCur[i].constipation, lastLineCur[i].backache,
                    lastLineCur[i].ringEar, lastLineCur[i].deforeSpine, lastLineCur[i].chronicStrain,
                    lastLineCur[i].lumbaDisk, lastLineCur[i].physicalFatigue, lastLineCur[i].kjPain,
                    lastLineCur[i].dryEye, lastLineCur[i].insomnia, lastLineCur[i].shortBreath
                  ]
                )
              }
            }
            let lastLineCur = [...cur, ...last]
            this.fxianObj = {lastLineCur, legendData, dataArr}
            // 饼图
            let curPieA = data.pie.curCount[0]
            let lastPieA = data.pie.lastCount[0]
            let curPie = []

            curPie = [
              {value: curPieA.lumbago, name: '颈椎退化'},
              {value: curPieA.dizzy, name: '骨刺'},
              {value: curPieA.headache, name: '头痛'},
              {value: curPieA.hemp, name: '头晕'},
              {value: curPieA.cervicalDege, name: '手脚麻'},
              {value: curPieA.nsPain, name: '便秘'},

              {value: curPieA.spur, name: '颈肩痛'},
              {value: curPieA.constipation, name: '背痛'},
              {value: curPieA.backache, name: '腰痛'},
              {value: curPieA.ringEar, name: '腰椎间盘突出'},
              {value: curPieA.deforeSpine, name: '膝关节痛'},
              {value: curPieA.chronicStrain, name: '胸闷气短'},

              {value: curPieA.lumbaDisk, name: '失眠'},
              {value: curPieA.physicalFatigue, name: '脊柱变形'},
              {value: curPieA.kjPain, name: '慢性劳损'},
              {value: curPieA.dryEye, name: '眼睛干涩'},
              {value: curPieA.insomnia, name: '身体疲倦'},
              {value: curPieA.shortBreath, name: '耳鸣'},
            ]

            let lastPie = []

            lastPie = [
              {value: lastPieA.lumbago, name: '颈椎退化'},
              {value: lastPieA.dizzy, name: '骨刺'},
              {value: lastPieA.headache, name: '头痛'},
              {value: lastPieA.hemp, name: '头晕'},
              {value: lastPieA.cervicalDege, name: '手脚麻'},
              {value: lastPieA.nsPain, name: '便秘'},

              {value: lastPieA.spur, name: '颈肩痛'},
              {value: lastPieA.constipation, name: '背痛'},
              {value: lastPieA.backache, name: '腰痛'},
              {value: lastPieA.ringEar, name: '腰椎间盘突出'},
              {value: lastPieA.deforeSpine, name: '膝关节痛'},
              {value: lastPieA.chronicStrain, name: '胸闷气短'},

              {value: lastPieA.lumbaDisk, name: '失眠'},
              {value: lastPieA.physicalFatigue, name: '脊柱变形'},
              {value: lastPieA.kjPain, name: '慢性劳损'},
              {value: lastPieA.dryEye, name: '眼睛干涩'},
              {value: lastPieA.insomnia, name: '身体疲倦'},
              {value: lastPieA.shortBreath, name: '耳鸣'},
            ]


            this.curPieObj = {curPie, lastPie, dataArr}
            console.log(this.curPieObj, '444444rrrrrrrrr444')
          })
      }
    },

  }
</script>
<style scoped lang="scss" type="text/scss" rel="stylesheet/scss">
  .icon-span {
    display: inline-block;
    margin: 0 5px;
  }

  .strong {
    color: #ff6200;
    font-weight: bold;
    font-size: 16px;
  }

  .noData {
    height: 300px;
    display: flex;
    justify-content: center;
    align-items: center;
  }

  .tip_pro1 {
    //
    // margin: 20px 0;
    .tip_left {
      box-sizing: border-box;
      padding: 10px;
      width: 100%;
      height: 216px;
      background: url("./img/rentian1.png") no-repeat;
      // background-size: cover;
      background-position: center top;
      background-size: contain;
      text-align: center;
      position: relative;
      span {
        color: #000000;

        padding: 5px;
        font-size: 12px;
        position: absolute;
        left: 50%;
        width: 120px;
        text-align: left;
      }
      span:nth-child(2) {
        top: 1px;
        margin-left: -133px;
      }
      span:nth-child(3) {
        top: 18px;
        margin-left: 10px;
      }
      span:nth-child(4) {
        top: 43px;
        margin-left: -147px;
      }
      span:nth-child(5) {
        top: 85px;
        margin-left: -149px;
      }
      span:nth-child(6) {

        top: 50px;
        margin-left: 31px;
      }
      span:nth-child(7) {
        top: 74px;
        margin-left: 26px;
      }
      span:nth-child(8) {
        bottom: 1px;
        margin-left: 13px;
      }
      span:nth-child(9) {
        bottom: 1px;
        margin-left: -144px;
      }
    }
  }
</style>


