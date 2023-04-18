
<template>
  <div>
    <div class="pie">
      <!-- 为 ECharts 准备一个具备大小（宽高）的 DOM -->
      <div id="main1"
           style="float: left; width: 100%; height: 300px"></div>
    </div>
  </div>
</template>

<script>
// 引入基本模板
let echarts = require('echarts/lib/echarts')
// 引入饼状图组件
require('echarts/lib/chart/pie')
// 引入提示框和title组件
require('echarts/lib/component/tooltip')
require('echarts/lib/component/title')

export default {
  data() {
    return {
      two_xvalue: [],
      two_yvalue: [],
      two_value: [],
    }
  },
  props: {
    alertNumVos: {
      type: Array,
      default: [],
    },
  },
  watch: {
    alertNumVos(n, o) {
      this.two_xvalue = []
      this.two_yvalue = []
      this.two_value = n
      for (let i = 0; i < n.length; i++) {
        this.two_xvalue.push(n[i].alertName)
        this.two_yvalue.push(n[i].alertNums)
        this.two_value[i].name = n[i].alertName
        this.two_value[i].value = n[i].alertNums
      }
      console.log(this.two_xvalue)
      this.initData()
    },
  },
  mounted() {
    this.initData()
  },
  methods: {
    //初始化数据
    initData() {
      // 基于准备好的dom，初始化echarts实例
      var myChart = echarts.init(document.getElementById('main1'))

      // 绘制图表
      myChart.setOption({
        title: {
          text: '不同流水线的瑕疵类型占比', //主标题
          //subtext: '纯属虚构',//副标题
          x: 'center', //x轴方向对齐方式
        },
        tooltip: {
          trigger: 'item',
          formatter: '{a} <br/>{b} : {c} ({d}%)',
        },
        legend: {
          orient: 'vertical',

          x: '80%',
          y: 'center',
          data: this.two_xvalue,
        },
        series: [
          {
            name: '访问来源',
            type: 'pie',
            radius: '55%',
            center: ['40%', '60%'],
            data: this.two_value,
            itemStyle: {
              emphasis: {
                shadowBlur: 10,
                shadowOffsetX: 0,
                shadowColor: 'rgba(0, 0, 0, 0.5)',
              },
              normal: {
                label: {
                  show: true,
                  formatter: '{b}:{c} ({d}%)',
                },
                labelLine: { show: true },
              },
            },
          },
        ],
      })
    },
  },
}
</script>
<style lang="less">
.pie {
  height: 100%;
  width: 100%;
  padding-top: 20px;
}
</style>