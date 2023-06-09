<template>
  <div ref="viewRef">
    <div ref="scaleRef" class="scale">
      <slot></slot>
    </div>
  </div>
</template>

<script>
import resizeMixin from '@/@share/mixins/resizeMixin'

export default {
  name: 'global-resize',
  mixins: [resizeMixin],
  mounted () {
    this.calcRate();
  }
}
</script>
<style scoped lang="scss">
  .scale {
    transform-origin: left top;
  }
</style>
