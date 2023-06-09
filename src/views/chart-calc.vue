<template>
  <global-resize>
    <div class="content" id="content">内容二</div>
  </global-resize>
</template>

<script>
import GlobalResize from '@/@share/components/global/resized/global-resize'
import * as echarts from 'echarts';
export default {
  name: 'Chart',
  components: { GlobalResize },
  mounted () {
    this.init()
  },
  methods: {
    init () {
      const chartDom = document.getElementById('content');
      const myChart = echarts.init(chartDom);

      const option = {
        xAxis: {
          type: 'category',
          data: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun']
        },
        yAxis: {
          type: 'value'
        },
        series: [
          {
            data: [150, 230, 224, 218, 135, 147, 260],
            type: 'line'
          }
        ]
      };

      myChart.setOption(option);
    }
  }
}
</script>
<style scoped lang="scss">
  .content {
    height: 800px;
    width: 1920px;
    background-color: lightgreen;
  }
</style>
