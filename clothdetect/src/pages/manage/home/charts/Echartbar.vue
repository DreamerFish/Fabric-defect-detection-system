<template>
  <div id="myChart"></div>
</template>
<script>
let echarts = require('echarts/lib/echarts')
// 引入饼状图组件
require('echarts/lib/chart/pie')
// 引入提示框和title组件
require('echarts/lib/component/tooltip')
require('echarts/lib/component/title')
export default {
  data() {
    return {
      three_xvalue: ['A线', 'B线', 'C线', 'D线', 'E线', 'F线', 'G线'],
      three_yvalue: [12, 23, 34, 45, 56, 67, 78],
      three_time1: ['2022-04-01 00:00:00', '2022-05-31 00:00:00'],
    }
  },
  props: {
    three_data: {
      type: Array,
      default: [],
    },
    three_time: {
      type: Array,
      default: [],
    },
  },
  watch: {
    three_data(n, o) {
      this.three_xvalue = []
      this.three_yvalue = []
      for (let i = 0; i < n.length; i++) {
        this.three_xvalue.push(n[i].checkName)
        this.three_yvalue.push(n[i].alertNums)
      }
      this.draw()
    },
    three_time(n, o) {
      this.three_time1 = this.three_time
    },
  },
  mounted() {
    // 调用绘制图表的方法
    this.draw()
  },
  methods: {
    draw() {
      // 实例化echarts对象
      let myChartDrawer = echarts.init(document.getElementById('myChart'))
      // 绘制条形图
      var option = {
        title: {
          text:
            this.three_time1[0] + ' - ' + this.three_time1[1] + ' 不合格布匹',
          top: -5,
          left: 300,
          // left: 'center',
        },
        xAxis: {
          type: 'category',
          data: this.three_xvalue,
        },
        yAxis: {
          type: 'value',
        },
        series: [
          {
            data: this.three_yvalue,
            itemStyle: {
              normal: {
                color: function (params) {
                  // build a color map as your need.
                  var colorList = [
                    '#0e345c',
                    '#2e5277',
                    '#3f81ae',
                    '#4ea1cf',
                    '#6bbcdd',
                    '#6bbcdd',
                    '#6bbcdd',
                  ]
                  return colorList[params.dataIndex]
                },
              },
            },
            type: 'bar',
          },
        ],
      }
      myChartDrawer.setOption(option)
    },
  },
}
</script>
 
<style lang="less">
#myChart {
  width: 100%;
  height: calc(55vh - 150px);
  clear: both;
  box-sizing: border-box;
  margin: 20px auto;
}
</style>