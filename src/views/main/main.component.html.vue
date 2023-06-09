<template>
  <div id="first-wapper" class="first-wapper">
    <div class="top-bg">
      <div class="user-wapper">
        <span class="sys-title">长沙市智慧水利综合监管平台</span>
        <span class="user-item">
          <i class="el-icon-user"></i>欢迎您~{{userName}}<span v-if="adName">({{adName}})</span>！
          <i class="el-icon-switch-button" @click="logOff"></i>
          <!--<span class="help-icon" @click="helpHandle"></span><span @click="helpHandle" style="cursor: pointer">操作手册</span>-->
        </span>
      </div>
      <div class="user-title">
        <head-title-svg class="head-title"></head-title-svg>
      </div>
    </div>
    <div class="menu-bg" :class="{'menu-fixed': scrollTop > 550}">
      <div class="menu-item" @click="goHtml('')">
        <div class="menu-icon menu-sy"></div>
        <div class="menu-txt">首页</div>
      </div>
      <div class="menu-item" @click="goHtml('http://172.16.204.24:18080/skypt')">
        <div class="menu-icon menu-skxxypt"></div>
        <div class="menu-txt">水利全景</div>
      </div>
      <el-popover placement="bottom" width="600" trigger="hover">
        <div class="menu-bg2">
          <div class="menu-item" @click="goHtml('http://121.36.255.176:18095/xx')">
            <div class="menu-icon menu-yyzcpt"></div>
            <div class="menu-txt">水资源</div>
          </div>
          <div class="menu-item" @click="goHtml('http://121.36.255.176:18095/xx')">
            <div class="menu-icon menu-sgpt"></div>
            <div class="menu-txt">水生态水环境</div>
          </div>
          <div class="menu-item" @click="goHtml('http://121.36.255.176:18095/xx')">
            <div class="menu-icon menu-skxxypt"></div>
            <div class="menu-txt">水工程</div>
          </div>
          <div class="menu-item" @click="goHtml('http://121.36.255.176:18095/xx')">
            <div class="menu-icon menu-dsjksh"></div>
            <div class="menu-txt">水监督</div>
          </div>
          <div class="menu-item" @click="goHtml('http://121.36.255.176:18095/xx')">
            <div class="menu-icon menu-hhglpt"></div>
            <div class="menu-txt">水旱灾害</div>
          </div>
          <div class="menu-item" @click="goHtml('http://121.36.255.176:18095/xx')">
            <div class="menu-icon menu-sgpt"></div>
            <div class="menu-txt">水行政</div>
          </div>
          <div class="menu-item" @click="goHtml('http://121.36.255.176:18095/xx')">
            <div class="menu-icon menu-sy"></div>
            <div class="menu-txt">综合运维</div>
          </div>
        </div>
        <div class="menu-item" slot="reference" @click="goHtml('http://121.36.255.176:18095/xx')">
          <div class="menu-icon menu-hhglpt"></div>
          <div class="menu-txt">智能应用</div>
        </div>
      </el-popover>
      <div class="menu-item" @click="goHtml('http://121.36.255.176:18095/big')">
        <div class="menu-icon menu-dsjksh"></div>
        <div class="menu-txt">综合决策</div>
      </div>
      <el-popover placement="bottom" width="600" trigger="hover">
        <div class="menu-bg2">
          <div class="menu-item" @click="goHtml('http://121.36.255.176:18095/xx')">
            <div class="menu-icon menu-yyzcpt"></div>
            <div class="menu-txt">数据共享服务</div>
          </div>
          <div class="menu-item" @click="goHtml('http://121.36.255.176:18095/xx')">
            <div class="menu-icon menu-sgpt"></div>
            <div class="menu-txt">智能支撑</div>
          </div>
          <div class="menu-item" @click="goHtml('http://121.36.255.176:18095/xx')">
            <div class="menu-icon menu-dsjksh"></div>
            <div class="menu-txt">视频中心</div>
          </div>
          <div class="menu-item" @click="goHtml('http://172.16.204.24:18095')">
            <div class="menu-icon menu-hhglpt"></div>
            <div class="menu-txt">应用支撑</div>
          </div>
        </div>
        <div class="menu-item" slot="reference" @click="goHtml('http://121.36.255.176:18095/skypt')">
          <div class="menu-icon menu-skxxypt"></div>
          <div class="menu-txt">水利支撑</div>
        </div>
      </el-popover>
    </div>
    <div class="main-conten">
      <div class="mid-conten">
        <div class="box" @dblclick="launchIntoFullscreen($event)">水资源大屏</div>
        <div class="box" @dblclick="launchIntoFullscreen($event)">防汛决策大屏</div>
        <div class="box" @dblclick="launchIntoFullscreen($event)">河湖与水生态大屏</div>
        <div class="box" @dblclick="launchIntoFullscreen($event)">水工程综合决策</div>
      </div>
      <div class="bottom-bar"></div>
    </div>
  </div>
</template>
