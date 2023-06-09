<template>
  <div class="transform">
    <div class="top">头部
      <el-button type="primary" @click="recOpen">打开麦克风</el-button>
      <el-button type="primary" @click="recClose">关闭麦克风</el-button>

      <el-button type="primary" @click="recStart">开始录音</el-button>
      <el-button type="primary" @click="recStop">停止录音</el-button>
    </div>
    <div class="main">
      <Content></Content>
      <Chart></Chart>
    </div>
  </div>
</template>

<script>
import Content from '@/views/Content'
import Chart from '@/views/chart-calc'
import Recorder from 'recorder-core/recorder.wav.min'
import 'recorder-core/src/extensions/asr.aliyun.short'
import { createToken, getDpChGeneralCTB} from '@/@share/api/aliyun'

export default {
  name: 'Transform',
  components: { Chart, Content },
  created () {
    this.init()
  },
  methods: {
    init () {
      // this.recOpen()
    },

    recOpen () {
      const rec = this.rec = Recorder({
        type: "wav",
        sampleRate: 16000,
        bitRate: 16,
        onProcess: (buffers, powerLevel, bufferDuration, bufferSampleRate, newBufferIdx) => {
          if (this.asr) {
            this.asr.input(buffers, bufferSampleRate, newBufferIdx);
          }
        }
      })

      // 打开麦克风
      rec.open(res => {

      }, (msg, isUserNotAllow) => {

      })
    },

    // 关闭麦克风
    recClose () {
      const rec = this.rec;
      this.rec = null;
      if (rec) {
        rec.close();
      }
    },

    // 开始录音
    async recStart () {
      if (this.rec && Recorder.IsOpen()) {
        // this.rec.start();
        // console.log("录制中：" + this.rec.set.bitRate + "kbps")
        const accessKeyId = 'LTAI5tH6jrA69ka8QatVVw8W'
        const accessKeySecret = 'J66jZgv0ZrsajFlSa6qAzZf5qc4HXl'
        const token = await createToken(accessKeyId, accessKeySecret)
        const asr = this.asr = Recorder.ASR_Aliyun_Short({
          tokenApi: 'http://127.0.0.1:9527/token',
          apiArgs: {
            action: "token",
            lang: "普通话"
          },
          apiRequest: function (url, args, success, fail) {
            console.log(url)
            success({token: token.Id, appkey: "kS9voEbVpihpLfnL"})
          },
          asrProcess: function (text, nextDuration, abortMsg) {
            // 识别错误立即终止
            if (abortMsg) {
              return false;
            }
            console.log(text)
            return true
          }
        })
        asr.start(res => {
          this.rec.start()
          this.rec.s_isStart = true;
        }, errMsg => {
          console.log("语音识别开始失败")
        })
      }
    },

    // 停止录音
    recStop () {
      const asr2 = this.asr; this.asr = null;
      if (asr2) {
        // rec.stop((blob, duration) => {
        //   console.log("停止录制：" + blob)
        //   // rec.close();
        //   // rec = null
        // }, res => {
        // })

        // 停止录音
        asr2.stop((text, abortMsg) => {
          console.log(text)
          const accessKeyId = 'LTAI5tH6jrA69ka8QatVVw8W'
          const accessKeySecret = 'J66jZgv0ZrsajFlSa6qAzZf5qc4HXl'
          getDpChGeneralCTB(accessKeyId, accessKeySecret, text)
        }, errMsg => {
          console.log("语音识别结束失败")
        });
      }

      const rec2 = this.rec;
      if (rec2.s_isStart) {
        rec2.s_isStart = false;
        rec2.stop(function (blob, duration) {
          console.log(duration)
          // Runtime.LogAudio(blob, duration, rec2);
        }, function (errMsg) {
          // Runtime.Log("录音失败:" + errMsg, 1);
        });
      }
    }
  }
}
</script>
<style scoped lang="scss">
  @import '~@/assets/styles/page';
  .transform {
    height: 100vh;
    width: 100vw;
    background-color: black;
  }
  .top {
    height: 70px;
    background-color: red;
  }
  .main {
    height: calc(100vh - 70px);
    background-color: burlywood;
    overflow-y: auto;
    overflow-x: hidden;
    @include p8-scrollbars(#f7f9fc, #f7f9fc, 8px);
    .content1 {
      height: 800px;
      background-color: brown;
    }
    .content2 {
      height: 210px;
      background-color: lightgreen;
    }
  }
</style>
