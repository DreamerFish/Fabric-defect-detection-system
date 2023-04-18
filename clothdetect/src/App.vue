<template>
  <div id="app"
       class="Router">
    <transition :name="transitionName">
      　　<router-view></router-view>
    </transition>
  </div>
</template>
<script>
export default {
  data() {
    return {
      transitionName: 'slide-right',
    }
  },
  watch: {
    $route: {
      handler(to, from) {
        const toIndex = to.meta.index
        const fromIndex = from.meta.index
        this.transitionName = toIndex > fromIndex ? 'slide-right' : 'slide-left'
      },
      immediate: true,
    },
  },
}
</script>
<style lang="less">
@import './assets/css/base.less';
.Router {
  position: relative;
}
.Router > * {
  position: absolute;
  width: 100%;
  text-align: center;
}
.slide-right-enter-active,
.slide-right-leave-active,
.slide-left-enter-active,
.slide-left-leave-active {
  will-change: transform;
  transition: all 500ms;
}

.slide-right-enter {
  opacity: 0;
  transform: translateX(-100%);
}

.slide-right-leave-active {
  opacity: 0;
  transform: translateX(100%);
}

.slide-left-enter {
  opacity: 0;
  transform: translateX(100%);
}

.slide-left-leave-active {
  opacity: 0;
  transform: translateX(-100%);
}
</style>
