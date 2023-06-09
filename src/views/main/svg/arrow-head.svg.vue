<template>
  <svg xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" width="332" height="23" viewBox="0 0 332 23">
    <defs>
    </defs>
    <g id="arrow">
      <path id="形状_1" data-name="形状 1" class="cls-1" d="M0,0H10.024L21,11.5,10.024,23H0L11,11.5Z"/>
      <path id="形状_1_拷贝" data-name="形状 1 拷贝" class="cls-2" d="M26,0H36.024L47,11.5,36.024,23H26L37,11.5Z"/>
      <path id="形状_1_拷贝_2" data-name="形状 1 拷贝 2" class="cls-3" d="M52,0H62.024L73,11.5,62.024,23H52L63,11.5Z"/>
      <path id="形状_1_拷贝_2-2" data-name="形状 1 拷贝 2" class="cls-4" d="M78,0H88.024L99,11.5,88.024,23H78L89,11.5Z"/>
      <path id="形状_1_拷贝_3" data-name="形状 1 拷贝 3" class="cls-5" d="M104,0h10.024L125,11.5,114.024,23H104l11-11.5Z"/>
      <path id="形状_1_拷贝_3-2" data-name="形状 1 拷贝 3" class="cls-6" d="M130,0h10.024L151,11.5,140.024,23H130l11-11.5Z"/>
      <path id="形状_1_拷贝_3-3" data-name="形状 1 拷贝 3" class="cls-7" d="M156,0h10.024L177,11.5,166.024,23H156l11-11.5Z"/>
      <path id="形状_1_拷贝_3-4" data-name="形状 1 拷贝 3" class="cls-8" d="M181,0h10.024L202,11.5,191.024,23H181l11-11.5Z"/>
      <path id="形状_1_拷贝_4" data-name="形状 1 拷贝 4" class="cls-9" d="M207,0h10.024L228,11.5,217.024,23H207l11-11.5Z"/>
      <path id="形状_1_拷贝_4-2" data-name="形状 1 拷贝 4" class="cls-10" d="M233,0h10.024L254,11.5,243.024,23H233l11-11.5Z"/>
      <path id="形状_1_拷贝_4-3" data-name="形状 1 拷贝 4" class="cls-11" d="M259,0h10.024L280,11.5,269.024,23H259l11-11.5Z"/>
      <path id="形状_1_拷贝_4-4" data-name="形状 1 拷贝 4" class="cls-12" d="M285,0h10.024L306,11.5,295.024,23H285l11-11.5Z"/>
      <path id="形状_1_拷贝_5" data-name="形状 1 拷贝 5" class="cls-13" d="M311,0h10.024L332,11.5,321.024,23H311l11-11.5Z"/>
    </g>
  </svg>
</template>

<script>
import anime from 'animejs/lib/anime.es.js';
export default {
  name: 'arrowHeadSvg',
  mounted () {
    this.init()
  },
  methods: {
    init () {
      anime({
        targets: "#arrow path",
        fill: [
          {value: 'rgba(66, 131, 215, 0.26)'},
          {value: 'rgba(66, 131, 215, 0.3)'},
          {value: 'rgba(66, 131, 215, 0.4)'},
          {value: 'rgba(66, 131, 215, 0.5)'}
        ],
        loop: true,
        delay: anime.stagger(40, {easing: 'easeOutQuad'})
      })
    }
  }
}
</script>

<style scoped>
  .cls-1, .cls-10, .cls-11, .cls-12, .cls-13, .cls-2, .cls-3, .cls-4, .cls-5, .cls-6, .cls-7, .cls-8, .cls-9 {
    fill: rgba(66, 131, 215, 0.5);
    fill-rule: evenodd;
  }
</style>
