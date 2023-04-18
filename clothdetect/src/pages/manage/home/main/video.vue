<template>
  <div class="video">
    <div class="video_left">
      <!-- <el-button @click="up">上传</el-button> -->
      <el-row :gutter="24">
        <!-- 放自动播放视频 -->
        <el-col :xs="24" :sm="24" :md="24" :lg="24" :xl="24">
          <div class="grid-content one">
            <div class="video_content">
              <video ref="videoDom2" class="one_video" muted loop="true" autoplay>
                <source src type="video/mp4" />
              </video>
              <div class="control">
                <el-select size="mini" v-model="perdeFects" placeholder="请选择">
                  <el-option v-for="item in getAllCheck" :key="item.checkId" :label="item.checkMachine"
                    :value="item.checkId">
                  </el-option>
                </el-select>
                <!-- <el-button  type="primary" @click="photograph">拍照</el-button> -->
              </div>
            </div>
          </div>
        </el-col>
        <el-col :xs="24" :sm="16" :md="16" :lg="16" :xl="16">
          <div class="grid-content two">
            <el-table v-loading="loading" :data="tableData" style="width: 100%" :cell-style="tableRowStyle"
              :header-cell-style="tableHeaderColor">
              <el-table-column label="ID" align="center" width="200px" prop="Id">
              </el-table-column>
              <el-table-column label="瑕疵类型" align="center" prop="flaw">
              </el-table-column>
              <el-table-column label="污渍坐标(左上角,右上角,左下角,右下角)" align="center" prop="coordinate">
              </el-table-column>
            </el-table>
          </div>
        </el-col>
        <el-col :xs="24" :sm="8" :md="8" :lg="8" :xl="8">
          <div class="grid-content three">
            <div class="video_line three_video">
              <div class="table">流水线：</div>
              <div class="num">{{ this.cloth_date[0].line }}</div>
            </div>
            <div class="video_fail three_video">
              <div class="table">不合格布匹：</div>
              <div class="num red_num">{{ this.cloth_date[0].num }}</div>
            </div>
            <div class="video_average three_video">
              <div class="table">平均瑕疵数：</div>
              <div class="num">{{ this.cloth_date[0].max_num }}</div>
            </div>
            <div class="video_change three_video">
              <div class="table">阈值(可更改)：</div>
              <div class="num">{{ this.cloth_date[0].change_maxnum }}</div>
            </div>
          </div>
        </el-col>
      </el-row>
    </div>
    <div class="video_right">
      <el-row :gutter="24">
        <el-col :xs="24" :sm="24" :md="24" :lg="24" :xl="24"> </el-col>
        <!-- 画布显示图片 -->
        <el-col :xs="24" :sm="24" :md="24" :lg="24" :xl="24">
          <div class="grid-content four">
            <canvas ref="canvas" class="one_canvas"></canvas>
            <canvas ref="canvas" class="two_canvas"></canvas>
            <el-button class="uoloadBtn" type="primary" @click="setTimer">开启检测</el-button>
          </div>
        </el-col>
        <!-- 折线图 -->
        <el-col :xs="24" :sm="24" :md="24" :lg="24" :xl="24">
          <div class="grid-content five">
            <EchartTime :FlawNums="this.FlawNums"></EchartTime>
          </div>
        </el-col>
      </el-row>
    </div>
  </div>
</template>

<script>
import axios from 'axios'
import EchartTime from '../charts/EchartTime'
import qs from 'qs'
import { GETALLCHECK } from '../../../../api/types'
export default {
  data() {
    return {
      loading: true,
      video2: require('./video/1.mp4'),
      tableData: [], //深度学习返回的数据
      line_label: '',
      timer: '', //定时器
      videoArr: [], //所有的摄像头,也可以加入音频设备
      modelSel: '', //当前使用的摄像头
      video_img: '', //获取摄像头中的图片
      myInterval: null,
      getAllCheck: [], //所有流水线信息
      perdeFects: '95f3c4ce-1083-463e-b08d-669d0971c6cb',
      //右边第一个框的表格
      cloth_date: [
        {
          line: 'D',
          num: '220',
          max_num: '101',
          change_maxnum: '31',
        },
      ],
      person_date: [
        {
          line: 'A',
          name: '王小虎',
          phone: '661234',
        },
        {
          line: 'B',
          name: '王大虎',
          phone: '258966',
        },
        {
          line: 'C',
          name: '王胖虎',
          phone: '258966',
        },
        {
          line: 'D',
          name: '王肥虎',
          phone: '258966',
        },
      ],
      search: '',
      imgBase64: null,
      checkId: '95f3c4ce-1083-463e-b08d-669d0971c6cb',
      FlawNums: [],
      Distinguish: {
        pictureId: '',
      },
      timeOn: true,
      sendDeep: {
        checkId: '',
        flag: '',
        picUrl: '',
        pictureId: '',
      },
    }
  },
  created() {
    this.changeDevice()
    this.getVideo()
  },

  methods: {
    async getDistinguish() {
      let params = new FormData()
      params.append('pictureId', this.Distinguish.pictureId)
      axios
        .post('http://110.42.174.240:8055/video/GetDistinguish.do', params)
        .then((res) => {
          // console.log(this.Distinguish.pictureId)
          let img = new Image()
          img.src = res.data.data.updateUrl
          let canvas = document.querySelector('.one_canvas')
          let ctx = canvas.getContext('2d')
          let canvas_width = canvas.width
          let canvas_height = canvas.height
          img.onload = function () {
            //监听图像的加载，完成后在执行绘制
            ctx.drawImage(img, 0, 0, canvas_width, canvas_height)
          }
        })
        .catch((res) => {
          console.log('失败', res)
        })
    },
    getVideo() {
      var ws = new WebSocket('ws://110.42.174.240:8055/status')
      ws.onopen = function (evt) {
        console.log('Connection open ...')
        ws.send('Hello WebSockets!')
      }
      ws.onmessage = function (evt) {
        console.log('Received Message: ' + evt.data)
        var obj = JSON.parse(evt.data) //将websocket的string数据转换成对象
        func1(obj)
        // ws.close()
      }
      ws.onclose = function (evt) {
        console.log('Connection closed.')
      }
      let func2 = function func3(val) {
        //在此处即可同时使用websocket的数据和data数据，method函数
        this.Distinguish.pictureId = val.pictureId
        this.getDistinguish()
      }
      let func1 = func2.bind(this)
    },
    // 修改table tr行的背景色
    tableRowStyle({ row, rowIndex }) {
      return 'background-color: #D4E8F5;opacity: 0.9;'
    },
    // 修改table header的背景色
    tableHeaderColor({ row, column, rowIndex, columnIndex }) {
      if (rowIndex === 0) {
        return 'background-color: #D4E8F5;opacity: 0.9;'
      }
    },
    //开启定时器
    async setTimer() {
      if (this.timeOn) {
        this.timer = await setInterval(() => {
          this.upImg()
        }, 2000)
        this.timeOn = false
        document.querySelector('.uoloadBtn').innerHTML = '关闭检测'
      } else {
        await clearInterval(this.timer)
        this.timeOn = true
        document.querySelector('.uoloadBtn').innerHTML = '开启检测'
      }
    },
    //成员信息表格
    handleEdit(index, row) {
      console.log(index, row)
    },
    handleDelete(index, row) {
      console.log(index, row)
    },
    // callCamera() {
    //   navigator.mediaDevices
    //     .getUserMedia({
    //       video: true,
    //     })
    //     .then((success) => {
    //       this.$refs['video'].srcObject = success
    //       this.$refs['video'].play()
    //     })
    //     .catch((error) => {
    //       console.error('摄像头开启失败，请检查摄像头是否可用！')
    //     })
    // },
    // 拍照
    async photograph() {
      let video = document.querySelector('.one_video')
      let canvas2 = document.querySelector('.two_canvas')
      let ctx = canvas2.getContext('2d')
      let canvas_width = canvas2.width
      let canvas_height = canvas2.height
      ctx.drawImage(video, 0, 0, canvas_width, canvas_height)
      //   // 转base64格式、图片格式转换、图片质量压缩---支持两种格式image/jpeg+image/png
      this.imgBase64 = canvas2.toDataURL('image/png', 0.7)
    },

    //点击后上传图片
    getFlawNums() {
      let params = new FormData()
      params.append('checkId', this.checkId)
      axios
        .post('http://110.42.174.240:8055/manager/getFlawNumsByCheckId', params)
        .then((res) => {
          this.FlawNums = res.data.data
        })
        .catch((err) => {
          console.log(err)
        })
    },
    // async sendDeep1() {
    //   let params = new FormData()
    //   params.append('checkId', this.sendDeep.checkId)
    //   params.append('picUrl', this.sendDeep.picUrl)
    //   params.append('flag', this.sendDeep.flag)
    //   params.append('pictureId', this.sendDeep.pictureId)
    //   axios
    //     .post('http://110.42.174.240:8055/video/.do', params)
    //     .then((res) => {
    //       console.log('传深度学习成功', res)
    //     })
    //     .catch((res) => {
    //       // console.log('失败', res)
    //     })
    // },
    async upImg() {
      this.photograph()
      //前端进行每一帧的图片上传
      var data = {
        checkId: 'df7c5bf2-42a9-4dbe-85aa-437b6632e5c2',
        upfile: this.imgBase64,
      }
      axios({
        url: 'http://110.42.174.240:8055/video/pictureByQian.do',
        data: qs.stringify(data),
        method: 'post',
      })
        .then((res) => {
          console.log('传后端成功', res)
        })
        .catch((res) => {
          // console.log('失败', res)
        })
    },

    // closeCamera() {
    //   if (!this.$refs['video'].srcObject) return
    //   let stream = this.$refs['video'].srcObject
    //   let tracks = stream.getTracks()
    //   tracks.forEach((track) => {
    //     track.stop()
    //   })
    //   this.$refs['video'].srcObject = null
    // },
    changeDevice() {
      navigator.mediaDevices
        .enumerateDevices()
        .then((devices) => {
          this.videoArr = []
          devices.forEach((device) => {
            //音频是audioautput  摄像头videoinput
            // if(device.kind == 'videoinput'){
            //     if (device.label=='Integrated Camera (5986:2115)') {
            //         this.line_label='A流水线'
            //     }else if (device.label=='PC Camera (058f:0362)') {
            //          this.line_label='B流水线'
            //     }
            //     console.log("设备",device.label,device.label=='Integrated Camera (5986:2115)');
            //     this.videoArr.push({
            //         'label': this.line_label,
            //         'id': device.deviceId
            //     })
            //     console.log(this.videoArr);
            //     this.modelSel=this.videoArr[0].label
            //     console.log("数组",this.videoArr[0].label);
            // }
          })
        })
        .catch(function (err) {
          console.log(err)
        })
    },
    setCurrentDevice(val) {
      if (val == 'A流水线') {
        val = 'Integrated Camera (5986:2115)'
      } else if (val == 'B流水线') {
        val = 'PC Camera (058f:0362)'
      }
      const videoConstraints = {}
      if (val === '') {
        videoConstraints.facingMode = 'environment'
      } else {
        videoConstraints.deviceId = { exact: val }
      }
      var constraints = {
        video: videoConstraints,
      }
      this.getUserMedia(constraints)
    },
    getUserMedia(constraints, success, error) {
      if (navigator.mediaDevices.getUserMedia) {
        //最新的标准API
        navigator.mediaDevices
          .getUserMedia(constraints)
          .then((success) => {
            // 摄像头开启成功
            this.$refs['video'].srcObject = success
            // 实时拍照效果
            this.$refs['video'].play()
          })
          .catch(error)
      } else if (navigator.webkitGetUserMedia) {
        //webkit核心浏览器
        navigator.webkitGetUserMedia(constraints, success, error)
      } else if (navigator.mozGetUserMedia) {
        //firfox浏览器
        navigator.mozGetUserMedia(constraints, success, error)
      } else if (navigator.getUserMedia) {
        //旧版API
        navigator.getUserMedia(constraints, success, error)
      }
    },
  },
  async mounted() {
    // this.setTimer()
    this.$refs.videoDom2.src = this.video2
    var getAllCheck = await GETALLCHECK()
    this.getAllCheck = getAllCheck.data
    let params = new FormData()
    params.append('checkId', this.checkId)
    //FormData()类型会自动序列化参数
    axios
      .post('http://110.42.174.240:8055/manager/getFlawByCheckId.do', params)
      .then((res) => {
        this.tableData = []
        this.tableData = res.data.data.afterPictureVos
        for (let i = 0; i < this.tableData.length; i++) {
          this.tableData[i].Id = i + 1
          this.tableData[i].confidence =
            parseFloat(this.tableData[i].confidence).toFixed(4) * 100 + '%'
        }
        this.loading = false
      })
      .catch((err) => {
        console.log(err)
      })
    this.getFlawNums()
  },
  components: {
    EchartTime,
  },
}
</script>

<style lang="less">
.video {
  width: 100%;
  height: 100%;
  padding: 20px;
  box-sizing: border-box;
  background-image: url('../../../../assets/imgs/login/login.png');
  background-size: 100% 100%;
  background-repeat: no-repeat;

  .el-col {
    border-radius: 4px;
  }

  .grid-content {
    border-radius: 4px;
    min-height: 36px;
    background: #d4e8f5;
  }

  .video_left {
    width: calc(70% - 20px);
    float: left;
    margin-right: 20px;

    .one {
      height: 65vh;
      width: 100%;
      margin-bottom: 20px;

      .video_content {
        height: 100%;
        position: relative;

        .control {
          position: absolute;
          padding: 5px;
          float: right;
          bottom: 0px;
          right: 0;

          .el-input--mini .el-input__inner {
            height: 40px;
            z-index: 999;
          }
        }

        .one_video {
          height: 100%;
          width: 100% !important;
          object-fit: fill;
        }
      }
    }

    .two {
      height: auto;
      max-height: calc(35vh - 110px);
      overflow-y: scroll;
    }

    .three {
      height: calc(35vh - 110px);
      width: 100%;
      background-color: pink;

      .three_video {
        height: 25%;
        width: 100%;
        background: #d4e8f5;
        opacity: 0.95;

        .table {
          width: 60%;
          height: 100%;
          float: left;
          padding: 10px;
          box-sizing: border-box;
          font-size: 16px;
          font-family: Alibaba PuHuiTi;
          font-weight: 400;
          color: #1d5d8d;
        }

        .num {
          width: 40%;
          height: 100%;
          float: right;
          padding: 10px;
          box-sizing: border-box;
          font-size: 20px;
          font-family: Alibaba PuHuiTi;
          font-weight: 400;
          color: #333333;
        }

        .red_num {
          color: red;
        }
      }
    }
  }

  .video_right {
    float: left;
    width: 30%;

    .four {
      height: 45vh;
      margin-bottom: 20px;
      width: 100%;
      overflow: hidden;
      position: relative;

      .uoloadBtn {
        position: absolute;
        bottom: 10px;
        right: 10px;
      }

      .one_canvas,
      .two_canvas {
        height: 45vh;
        width: 100%;
        overflow: hidden;
      }

      .two_canvas {
        opacity: 0;
      }
    }

    .five {
      height: calc(55vh - 110px);
      margin-bottom: 20px;
    }
  }
}
</style>
