<template>
  <div id="myChart"></div>
</template>
<script>
// 引入基本模板
let echarts = require('echarts/lib/echarts')
// 引入柱状图组件
require('echarts/lib/chart/bar')
// 引入提示框和title组件
require('echarts/lib/component/tooltip')
require('echarts/lib/component/title')
import { GETDISTINGUISH } from '../../../../api/types'
export default {
  name: 'DataCount',
  data() {
    return {
      FlawNums_xvalue: [],
      FlawNums_yvalue: [],
    }
  },
  props: {
    FlawNums: {
      type: Array,
      default: [],
    },
  },
  watch: {
    FlawNums(n, o) {
      this.FlawNums_xvalue = []
      this.FlawNums_yvalue = []
      for (let i = 0; i < n.length; i++) {
        this.FlawNums_xvalue.push(n[i].createTime)
        this.FlawNums_yvalue.push(n[i].flawNums)
      }
      this.drawLine()
    },
  },
  async mounted() {
    this.drawLine()
    // var params = {
    //   checkId: "df7c5bf2-42a9-4dbe-85aa-437b6632e5c2",
    //   message: "ERROR",
    //   pictureId: "d99f10ff-e702-45a0-8af2-dd56277c781d",
    // };
    // const back = await GETDISTINGUISH(params);
    // console.log("返回", back);
  },
  methods: {
    drawLine() {
      // 基于准备好的dom，初始化echarts实例
      let myChart = echarts.init(document.getElementById('myChart'))
      // 绘制图表
      myChart.setOption({
        title: {
          text: '每帧的布匹瑕疵数',
          subtext: '',
          left: 'center',
        },
        tooltip: {
          trigger: 'axis',
        },
        legend: {
          //data:['最高','最低']
          data: ['最高'],
          top: 40,
        },
        toolbox: {
          show: true,

          feature: {
            dataZoom: {
              yAxisIndex: 'none',
            },
            dataView: { readOnly: false },
            magicType: { type: ['line', 'bar'] },
            restore: {},
            saveAsImage: {},
          },
        },
        xAxis: {
          type: 'category',
          boundaryGap: false,
          data: this.FlawNums_xvalue,
          axisLabel: {
            interval: 20,
          },
        },
        yAxis: {
          type: 'value',
          name: '(个)',
          axisLabel: {
            formatter: '{value}',
          },
        },
        series: [
          {
            name: '最高',
            type: 'line',
            data: this.FlawNums_yvalue,
            markPoint: {
              data: [{ type: 'max', name: '最大值' }],
            },
            markLine: {
              data: [{ type: 'average', name: '平均值' }],
            },
          },
          // {
          //     name:'最低',
          //     type:'line',
          //     data:[1, -2, 2, 5, 3, 2, 0],
          //     markPoint: {
          //         data: [
          //             {name: '周最低', value: 2, xAxis: 1, yAxis: 1.5}
          //         ]
          //     },
          //     markLine: {
          //         data: [
          //             {type: 'average', name: '平均值'},
          //             [{
          //                 symbol: 'none',
          //                 x: '90%',
          //                 yAxis: 'max'
          //             }, {
          //                 symbol: 'circle',
          //                 label: {
          //                     normal: {
          //                         position: 'start',
          //                         formatter: '最大值'
          //                     }
          //                 },
          //                 type: 'max',
          //                 name: '最高点'
          //             }]
          //         ]
          //     }
          // }
        ],
      })
    },
  },
}
</script>
<style lang="less">
#myChart {
  width: 100%;
  height: 100%;
  padding-top: 20px;
  padding-left: 10px;
  box-sizing: border-box;
}
</style>
