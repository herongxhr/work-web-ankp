<template src="./main.component.html.vue"></template>
<script>
  import {mapActions, mapGetters} from 'vuex'
  import {MainService} from '@/views/main/main.service'
  import echarts from 'echarts';
  import headTitleSvg from './svg/head-title.svg'
  import arrowHeadSvg from './svg/arrow-head.svg'
  // import hedao from "../../assets/images/main/hedao.png"
  // import bahe from "../../assets/images/main/bahe.png"
  // import nanjianghe from "../../assets/images/main/nanjianghe.png"
  // import changanhe from "../../assets/images/main/changanhe.png"
  import {GLOBAL_DEFAULT_CONFIG} from '@/@core/data/global.config'
  import {
    Popover
  } from 'element-ui';

  export default {
    name: 'Main',
    components: {
      headTitleSvg,
      arrowHeadSvg,
      Popover
    },
    props: ['paths'],
    data() {
      return {
        // menuList: [
        //   { name: '首页', icon: 'menu-sy', url: '' },
        //   { name: '河湖管理平台', icon: 'menu-hhglpt', url: 'http://112.46.124.180:18095/akhzz' },
        //   { name: '大数据可视化', icon: 'menu-dsjksh', url: 'http://112.46.124.180:18095/big' },
        //   { name: '时空信息云平台', icon: 'menu-skxxypt', url: 'http://112.46.124.180:18095/skypt' },
        //   { name: '数管平台', icon: 'menu-sgpt', url: 'http://112.46.124.180:18095/akhzzgl' },
        //   { name: '应用支撑平台', icon: 'menu-yyzcpt', url: 'http://112.46.124.180:18094/UUMS' }
        // ],
        // menuList: [
        //     { name: '首页', icon: 'menu-sy', url: '' },
        //     { name: '智慧水利支撑平台', icon: 'menu-hhglpt', url: 'http://121.36.255.176:18095/akhzz' },
        //     { name: '协同创新智能应用', icon: 'menu-dsjksh', url: 'http://121.36.255.176:18095/big' },
        //     { name: '标准体系展示', icon: 'menu-skxxypt', url: 'http://121.36.255.176:18095/skypt' },
        //     { name: '数管平台', icon: 'menu-sgpt', url: 'http://121.36.255.176:18095/akhzzgl' },
        //     { name: '应用支撑平台', icon: 'menu-yyzcpt', url: 'http://121.36.255.176:18094/UUMS' }
        // ],
        hhjkList: [
          {name: '水资源总量', url: 'https://slj.ankang.gov.cn/UploadFiles/akjyhfj27/file/20221018/20221018150815_4901.pdf'},
          {name: '比往年增加', url: 'https://slj.ankang.gov.cn/UploadFiles/akjyhfj27/file/20221018/20221018150815_4901.pdf'},
          {name: '水环境质量指数', url: 'https://hbj.ankang.gov.cn/Content-2479500.html'},
          {name: '全省排名', url: 'http://sthjt.shaanxi.gov.cn/newstype/hbyw/hjzl/water/whdm/20221121/82998.html'},
        ],
        value1: '',
        dateOptions: [
          {value: '1', label: '本月'},
          {value: '2', label: '本年'},
        ],
        selectDate: '1',
        cwqiZs: '3.4559',
        userName: '',
        dmszList: [],
        scrollTop: 0,
        xhcount: '',
        xhdis: '',
        sjzs: '',
        wcl: '',
        slzs: '',
        slwc: '',
        messageList: [],
        // 蓄水量
        pondage: '',
        // 降雨量
        jyl: '',
        // 水资源总量
        zyzl: '',
        pianfeng: '',
        szyzj: '',
        // 水环境质量指数
        hjzs: '',
        rank: 0,
        riverDynamics: {},
        yinghusz: '',
        adCode: '610902000',
        adName: '',
        sfhhAdCode: '610902000',
        xfhhList: [],
        xfhhCur: {},
        curImg: "610900000001_1.jpg",
        timmer: null,
        hhxfIndex: 0,
        // imgBaseUrl: 'http://121.36.255.176:18095/akhzz/rvpic/'
        imgBaseUrl: GLOBAL_DEFAULT_CONFIG.web_base_url[0] + '/akhzz/rvpic/'
      }
    },
    computed: {
      ...mapGetters([
        'globalConfig',
        'themeConfig'
      ])
    },
    created() {
      this.service = new MainService()
      // this.getCityList()
      this.setJdkhOption()
      window.addEventListener("scroll", this.scroolHandle, true);
      this.getRiverProtection()
      this.getMessageList()
      this.getQuota()
    },
    methods: {
      ...mapActions('p8app/user', [
        'logout'
      ]),
      getCityList() {
        this.service.getUserInfo().then(res => {
          this.userName = res.loginName
          this.adCode = res.adcd
          this.adName = res.oragname
          this.getXFHH()
          this.getallResW()
          this.getRiverLake()
        })
      },
      setJdkhOption() {
        let xData = ["汉江汉滨段", "子午河", "月河", "任河", "恒河"];
        let yData = [80, 70, 60, 50, 40];
        const max = [100, 100, 100, 100, 100, 100, 100, 100, 100, 100, 100, 100, 100, 100, 100];
        const option = {
          // backgroundColor: "#061326",
          grid: {
            top: "10%",
            left: "2%",
            bottom: "5%",
            right: "5%",
            containLabel: true,
          },
          tooltip: {
            show: true,
          },
          // animation: false,
          xAxis: [{
            type: "category",
            data: xData,
            axisTick: {
              alignWithLabel: true,
            },
            nameTextStyle: {
              color: "#82b0ec",
            },
            axisLine: {
              show: true,
              lineStyle: {
                color: "#D5D5D5",
              },
            },
            axisLabel: {
              interval: 0,
              textStyle: {
                color: "#333",
              },
              margin: 15,
            },
          },],
          yAxis: [{
            type: "value",
            axisLabel: {
              textStyle: {
                color: "#333",
              },
            },
            splitLine: {
              show: false,
              lineStyle: {
                color: "#D5D5D5",
              },
            },
            axisLine: {
              show: true,
              lineStyle: {
                color: "#D5D5D5",
              },
            },
          },
            {
              type: 'value',
              gridIndex: 0,
              min: 50,
              max: 100,
              splitNumber: 12,
              splitLine: {
                show: false,
              },
              axisLine: {
                show: false,
              },
              axisTick: {
                show: false,
              },
              axisLabel: {
                show: false,
              },
            },
          ],
          series: [{
            name: "",
            type: "pictorialBar",
            symbolSize: [20, 10],
            symbolOffset: [0, -6],
            symbolPosition: "end",
            z: 12,
            // "barWidth": "0",
            label: {
              normal: {
                show: false,
                position: "top",
                // "formatter": "{c}%"
                fontSize: 25,
                fontWeight: "bold",
                color: "#fff",
              },
            },
            color: "#A0D6FF",
            data: yData,
            zlevel: 11,
          },
            {
              name: "",
              type: "pictorialBar",
              symbolSize: [20, 10],
              symbolOffset: [0, 7],
              // "barWidth": "20",
              z: 12,
              color: "#1592F0",
              data: yData,
              zlevel: 11,
            },
            {
              type: "bar",
              //silent: true,
              barWidth: "20",
              barGap: "10%", // Make series be overlap
              barCateGoryGap: "10%",
              itemStyle: {
                normal: {
                  color: new echarts.graphic.LinearGradient(0, 0, 0, 0.7, [{
                    offset: 0,
                    color: "#1592F0",
                  },
                    {
                      offset: 1,
                      color: "#A4D8FF",
                    },
                  ]),
                  opacity: 0.8,
                },
              },
              data: yData,
              zlevel: 11,
            },
            {
              name: '背景',
              type: 'bar',
              barWidth: '20',
              xAxisIndex: 0,
              yAxisIndex: 0,
              barGap: '-100%',
              data: max,
              itemStyle: {
                normal: {
                  color: 'rgba(23, 105, 198, 0.1)',
                },
              },
              zlevel: 9,
            },
            {
              name: "",
              type: "pictorialBar",
              symbolSize: [20, 10],
              symbolOffset: [0, -6],
              symbolPosition: "end",
              z: 12,
              // "barWidth": "0",
              label: {
                normal: {
                  show: false,
                  position: "top",
                  // "formatter": "{c}%"
                  fontSize: 25,
                  fontWeight: "bold",
                  color: "#fff",
                },
              },
              color: "#A0D6FF",
              data: max,
              zlevel: 9,
            },
          ],
        };
        this.$nextTick(() => {
          const myChart1 = this.$echarts.init(document.getElementById('jdkh'));
          myChart1.clear();
          myChart1.setOption(option);
          window.onresize = function () {
            myChart1.resize();
          };
        })
      },
      goHtml(url) {
        if (url) {
          window.open(url)
          // window.location.href = url
        }
      },
      scroolHandle() {
        let that = this;
        let dom = document.getElementById('first-wapper');
        let scrollTop = dom.scrollTop
        that.scrollTop = scrollTop
        // if (that.scrollTop >= 550)
      },
      outSys() {
        this.service.outSys().then(res => {
        })
      },
      logOff() {
        // this.outSys()
        // this.service.outSys().then(res => {
        //   this.logout()
        // })

        this.logout()
      },
      // 幸福河湖
      getXFHH() {
        this.service.getXFHH({}).then(res => {
          if (res.list) {
            this.xfhhList = res.list;
            this.xfhhCur = this.xfhhList[this.hhxfIndex]
            this.sfhhAdCode = this.xfhhCur.ad_CD
            this.getRyBasicDm()
            // let _this = this
            // clearInterval(this.timer);
            // this.timmer = setInterval(() => {
            //   _this.xfhhCur = this.xfhhList[_this.hhxfIndex]
            //   _this.sfhhAdCode = _this.xfhhCur.ad_CD
            //   _this.curImg = this.xfhhCur.img
            //   this.getRyBasicDm()
            //   if(_this.hhxfIndex>=3) {
            //     _this.hhxfIndex = 0
            //   } else {
            //     _this.hhxfIndex++
            //   }
            // }, 5000)
            // let temp = this.xfhhList.filter(item => {
            //   return item.AD_CD == this.adCode
            // })
            // if(temp.length>0) {
            //   this.xfhhCur = temp[0]
            // } else {
            //   this.xfhhCur = this.xfhhList[0]
            // }
            // this.curImg = this.xfhhCur.img
          }
        })
      },
      // 河湖保护
      getRiverProtection() {
        const params = {
          AD_CD: this.adCode,
          datetype: '2', //  本月、本年、往年
        }
        this.service.getmiscellaneousdata(params).then(res => {
          if (res) {
            this.xhcount = res.XHCOUNT;
            this.xhdis = res.XHDIS;
            this.sjzs = res.SJZS;
            this.wcl = res.WCL;
            this.slzs = res.SLZS;
            this.slwc = res.SLWC
          }
        })
      },
      // 河流面信息(小钢桥、羊尾、界牌沟)
      getRyBasicDm() {
        const params = {AD_CD: this.sfhhAdCode}
        this.service.getRyBasicDm(params).then(res => {
          this.dmszList = res;
        })
      },
      getMessageList() {
        this.service.getMessageList({}).then(res => {
          if (res) {
            this.messageList = res.hhjbList
          }
        })
      },
      getallResW() {
        const params = {
          AD_CD: this.adCode.substr(0, 6)
        }
        this.service.getallResW(params).then(res => {
          if (res) {
            this.pondage = res.resW;
            this.jyl = res.avgYL
            this.zyzl = res.szyZL
            this.hjzs = res.shjzlZS
            this.rank = res.rank
            this.pianfeng = res.avgYL_add
            this.szyzj = res.szyZL_add
          }
        })
      },

      // 河湖动态
      getRiverLake() {
        const params = {
          // AD_CD: this.adCode.substr(0,6)
        }
        this.service.statisticHLSZ(params).then(res => {
          if (res) {
            this.riverDynamics = res;
          }
        })
      },

      getQuota() {
        this.service.getQuota({}).then(res => {
          if (res) {
            this.yinghusz = res.Yinghusz
          }
        })
      },

      hhjbClickHandle(item) {
        window.open(item.REPORTURL)
      },

      carouselChange(newIndex, oldIndex) {
        this.xfhhCur = this.xfhhList[newIndex]
        this.sfhhAdCode = this.xfhhCur.ad_CD
        this.getRyBasicDm()
      },

      helpHandle() {
        window.open('pdf/长沙市智慧水利综合监管平台-用户手册v1.0.pdf')
      },

      //div标签全屏方法
      launchIntoFullscreen(element) {
        element = element.target
        if (element.requestFullscreen) {
          element.requestFullscreen();
        } else if (element.mozRequestFullScreen) {
          element.mozRequestFullScreen();
        } else if (element.webkitRequestFullscreen) {
          element.webkitRequestFullscreen();
        } else if (element.msRequestFullscreen) {
          element.msRequestFullscreen();
        }
      },

      //退出div标签全屏方法
      exitFullscreen() {
        if (document.exitFullscreen) {
          document.exitFullscreen();
        } else if (document.mozCancelFullScreen) {
          document.mozCancelFullScreen();
        } else if (document.webkitExitFullscreen) {
          document.webkitExitFullscreen();
        }
      },

    },
    destroyed() {
      clearInterval(this.timer);
    }
  }
</script>
<style scoped lang="scss" src="./main.component.scss.vue">
</style>
