import Vue from "vue";
import App from "./App.vue";
import router from "./router";
import store from "./store";
import ElementUI from "element-ui";
import "element-ui/lib/theme-chalk/index.css";
//引入echart
import echarts from "echarts";
Vue.prototype.echarts = echarts;
//调用摄像头
import VueCropper from "vue-cropper";
Vue.use(VueCropper);
import VideoPlayer from "vue-video-player";
require("video.js/dist/video-js.css");
require("vue-video-player/src/custom-theme.css");
//引入 hls,视频直播(m3u8)必须引入的
//import 'videojs-contrib-hls'
//播放rtmp视频
import "videojs-flash";
//如果你需要自定义播放器的样式，自己新建一个css
//require('./assets/css/video_css/myvideo.css')
Vue.use(VideoPlayer);
Vue.config.productionTip = false;
Vue.use(ElementUI);
new Vue({
  router,
  store,
  render: (h) => h(App),
}).$mount("#app");
