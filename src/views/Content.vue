<template>
  <global-resize>
    <div class="content">
      <span>内容部分一</span>
    </div>
  </global-resize>
</template>

<script>
import GlobalResize from '@/@share/components/global/resized/global-resize'
export default {
  name: 'Content',
  components: { GlobalResize },
  mounted () {
  },
  methods: {

  }
}
</script>
<style scoped lang="scss">
  .content {
    display: flex;
    justify-content: flex-end;
    height: 210px;
    width: 1920px;
    background-color: brown;
  }
</style>
