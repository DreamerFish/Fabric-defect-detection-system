<template>
  <div class="mainPage">
    <div class="main_left">
      <el-row :gutter="24">
        <el-col class="one"
                :xs="24"
                :sm="10"
                :md="10"
                :lg="10"
                :xl="10">
          <div class="grid_one grid-content">
            <div class="user">
              <div class="userinfo">
                <img src="../../../../assets/imgs/logo/logo.png" />
                <!-- <p class="name">2021-4-25</p>
            <p class="access">湛江</p> -->
              </div>
              <div class="today_info">
                <div class="title">今日信息</div>
                <div class="detail_info">
                  <el-row :gutter="12">
                    <el-col class="one"
                            :xs="8"
                            :sm="8"
                            :md="8"
                            :lg="8"
                            :xl="8">
                      <div class="info_one info">
                        <p class="view">正在监控</p>
                        <p class="count">流水线数量</p>
                        <p class="num">{{ todayInfo.watchNum }}</p>
                        <p class="per">(线)</p>
                      </div>
                    </el-col>
                    <el-col class="one"
                            :xs="8"
                            :sm="8"
                            :md="8"
                            :lg="8"
                            :xl="8">
                      <div class="info_two info">
                        <p class="view">挂起报警</p>
                        <p class="count">流水线数量</p>
                        <p class="num">{{ todayInfo.isAlert }}</p>
                        <p class="per">(线)</p>
                      </div>
                    </el-col>
                    <el-col class="one"
                            :xs="8"
                            :sm="8"
                            :md="8"
                            :lg="8"
                            :xl="8">
                      <div class="info_three info">
                        <p class="view">发出警报</p>
                        <p class="count">瑕疵布匹数量</p>
                        <p class="num">{{ todayInfo.alertNum }}</p>
                        <p class="per">(匹)</p>
                      </div>
                    </el-col>
                  </el-row>
                </div>
              </div>
            </div>
            <div class="login-info">
              <p>上次登录时间：<span>2022-4-6</span></p>
              <p>上次登录地点：<span>湛江</span></p>
            </div>
          </div>
        </el-col>
        <!-- 扇形图 -->
        <el-col :xs="24"
                :sm="14"
                :md="14"
                :lg="14"
                :xl="14">
          <div class="grid_two grid-content">
            <div class="choose">
              <div class="block">
                <el-date-picker size="mini"
                                v-model="two_value1"
                                type="datetimerange"
                                range-separator="至"
                                start-placeholder="开始日期"
                                end-placeholder="结束日期"
                                value-format="yyyy-MM-dd HH:mm:ss"
                                @change="two_check">
                </el-date-picker>
              </div>
              <div class="select">
                <el-select size="mini"
                           v-model="perdeFects"
                           placeholder="请选择"
                           @change="two_check">
                  <el-option v-for="item in getAllCheck"
                             :key="item.checkId"
                             :label="item.checkMachine"
                             :value="item.checkId">
                  </el-option>
                </el-select>
              </div>
            </div>
            <EchartPei :alertNumVos="this.alertNumVos"></EchartPei>
          </div>
        </el-col>
        <!-- 柱状图 -->
        <el-col :xs="24"
                :sm="24"
                :md="24"
                :lg="24"
                :xl="24">
          <div class="grid_three grid-content">
            <div class="block">
              <el-date-picker v-model="three_value1"
                              type="datetimerange"
                              range-separator="至"
                              start-placeholder="开始日期"
                              end-placeholder="结束日期"
                              value-format="yyyy-MM-dd HH:mm:ss"
                              @change="three_time">
              </el-date-picker>
            </div>
            <Echartbar :three_data="this.three_data"
                       :three_time="this.three_value1"></Echartbar>
          </div>
        </el-col>
      </el-row>
    </div>
    <!-- 
     表格数据显示
    -->
    <div class="main_right">
      <el-row :gutter="24">
        <el-col :xs="24"
                :sm="24"
                :md="24"
                :lg="24"
                :xl="24">
          <div class="grid_four grid-content">
            <span class="demonstration">不同流水线的不同布料的相关数据</span>
            <div class="block">
              <el-date-picker v-model="four_value1"
                              size="mini"
                              type="datetimerange"
                              start-placeholder="开始日期"
                              end-placeholder="结束日期"
                              :default-time="['12:00:00']"
                              @change="tableChange">
              </el-date-picker>
            </div>
            <div class="select">
              <el-select size="mini"
                         v-model="typeFects"
                         placeholder="请选择"
                         @change="tableChange">
                <el-option v-for="item in getAllCheck"
                           :key="item.checkId"
                           :label="item.checkMachine"
                           :value="item.checkId">
                </el-option>
              </el-select>
            </div>
            <el-table :data="table_one"
                      style="width: 100%"
                      :cell-style="tableRowStyle"
                      :header-cell-style="tableHeaderColor">
              <el-table-column prop="cloth"
                               label="布料"
                               align="center">
              </el-table-column>
              <el-table-column prop="max_num"
                               label="阈值"
                               align="center">
              </el-table-column>
              <el-table-column prop="alrma_num"
                               label="不合格布匹"
                               align="center">
              </el-table-column>
            </el-table>
          </div>
        </el-col>
        <el-col :xs="24"
                :sm="24"
                :md="24"
                :lg="24"
                :xl="24">
          <div class="grid_five grid-content">
            <el-table :data="getMemInfo"
                      style="width: 100%"
                      :cell-style="tableRowStyle"
                      :header-cell-style="tableHeaderColor">
              <el-table-column prop="checkName"
                               label="流水线"
                               align="center">
              </el-table-column>
              <el-table-column prop="user"
                               align="center"
                               label="负责人员">
              </el-table-column>
              <el-table-column prop="phone"
                               label="联系方式"
                               align="center">
              </el-table-column>
              <el-table-column align="right">
                <template slot="header"
                          slot-scope="scope">
                  <el-button @click="dialogFormVisible = true">添加</el-button>
                </template>
              </el-table-column>
            </el-table>
          </div>
        </el-col>
      </el-row>
    </div>
    <el-dialog title="添加用户信息"
               :visible.sync="dialogFormVisible">
      <el-form :model="form">
        <el-form-item label="用户名："
                      :label-width="formLabelWidth"
                      class="diainput">
          <el-input v-model="form.user"
                    autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item label="电话号码："
                      :label-width="formLabelWidth"
                      class="diainput">
          <el-input v-model="form.phone"
                    autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item label="流水线："
                      :label-width="formLabelWidth"
                      class="diaoptions">
          <el-select size="medium"
                     v-model="form.checkId"
                     placeholder="请选择">
            <el-option v-for="item in getAllCheck"
                       :key="item.checkId"
                       :label="item.checkMachine"
                       :value="item.checkId">
            </el-option>
          </el-select>
        </el-form-item>
      </el-form>
      <div slot="footer"
           class="dialog-footer">
        <el-button @click="dialogFormVisible = false">取 消</el-button>
        <el-button type="primary"
                   @click="
            dialogFormVisible = false;
            addMen();
          ">确 定</el-button>
      </div>
    </el-dialog>
  </div>
</template>

<script>
import EchartPei from '../charts/EchartPei'
import Echartbar from '../charts/Echartbar'
import axios from 'axios'
import qs from 'qs'

import {
  GETMACHINEINFO,
  GETMEMINFO,
  GETALLCHECK,
  GETWATCHALERT,
} from '../../../../api/types'
export default {
  methods: {
    // 修改table tr行的背景色
    tableRowStyle({ row, rowIndex }) {
      // if (rowIndex%2 ==0) {
      //   return 'background-color: pink'
      // }
      return 'background-color: #D4E8F5;opacity: 0.9;'
    },
    // 修改table header的背景色
    tableHeaderColor({ row, column, rowIndex, columnIndex }) {
      if (rowIndex === 0) {
        return 'background-color: #D4E8F5;opacity: 0.9;'
      }
    },
    //选择流水线
    async two_check() {
      let date = {
        beginTime: this.two_value1[0],
        endTime: this.two_value1[1],
        checkId: this.perdeFects,
      }
      console.log('date', date)
      await axios({
        url: 'http://110.42.174.240:8055/manager/watchAlertMessage.do',
        data: qs.stringify(date),
        method: 'post',
      })
        .then((res) => {
          console.log('上传', res)
          this.alertNumVos = res.data.data.alertNumVos
          console.log(this.alertNumVos)
        })
        .catch((res) => {
          console.log('失败', res)
        })
    },
    async three_time() {
      var date = {
        beginTime: this.three_value1[0],
        endTime: this.three_value1[1],
      }
      var getWatchalert = await GETWATCHALERT(date)
      this.three_data = getWatchalert.data
    },
    addMen() {
      axios({
        url: 'http://110.42.174.240:8055/manager/insertMem.do',
        data: qs.stringify(this.form),
        method: 'post',
      })
        .then((res) => {
          console.log('上传', res)
        })
        .catch((res) => {
          console.log('失败', res)
        })
    },
    handleClose(done) {
      this.$confirm('确认关闭？')
        .then((_) => {
          done()
        })
        .catch((_) => {})
    },
    tableChange() {
      for (let i = 0; i < this.table_one.length; i++) {
        this.table_one[i].max_num = Math.floor(Math.random() * (30 - 1 + 1)) + 0
        this.table_one[i].alrma_num =
          Math.floor(Math.random() * (30 - 1 + 1)) + 0
      }
    },
  },
  data() {
    return {
      alertNumVos: [], //第二板块瑕疵数
      todayInfo: {}, //今日信息
      defectTypes: {}, //瑕疵类型占比
      getMemInfo: [], //所有成员信息
      getAllCheck: [], //所有流水线信息
      perdeFects: 'df7c5bf2-42a9-4dbe-85aa-437b6632e5c2', //板块二瑕疵占比流水线选择
      typeFects: 'df7c5bf2-42a9-4dbe-85aa-437b6632e5c2', //板块三不同流水线的不同布料相关数据
      WatchAlterMessage: [], //板块三不同流水线的瑕疵布匹情况
      dialogFormVisible: false,
      three_value1: ['2022-04-01 00:00:00', '2022-05-31 00:00:00'], //第三个板块是时间选择器
      three_data: [], //第三个板块的显示数据
      two_value1: ['2022-04-01 00:00:00', '2022-05-31 00:00:00'],
      addmen: {},
      form: {
        user: '',
        phone: '',
        checkId: '',
      },
      formLabelWidth: '120px',
      inputWidth: '30rem',
      four_value1: ['2022-04-01 00:00:00', '2022-05-31 00:00:00'], //第四个板块是时间选择器
      //选择流水线
      choose_line: [],
      choose_value: '',
      table_one: [
        {
          cloth: '棉布',
          max_num: Math.floor(Math.random() * (30 - 1 + 1)) + 0,
          alrma_num: Math.floor(Math.random() * (30 - 1 + 1)) + 0,
        },
        {
          cloth: '麻布',
          max_num: Math.floor(Math.random() * (30 - 1 + 1)) + 0,
          alrma_num: Math.floor(Math.random() * (30 - 1 + 1)) + 0,
        },
        {
          cloth: '丝绸',
          max_num: Math.floor(Math.random() * (30 - 1 + 1)) + 0,
          alrma_num: Math.floor(Math.random() * (30 - 1 + 1)) + 0,
        },
        {
          cloth: '皮革',
          max_num: Math.floor(Math.random() * (30 - 1 + 1)) + 0,
          alrma_num: Math.floor(Math.random() * (30 - 1 + 1)) + 0,
        },
        {
          cloth: '化纤',
          max_num: Math.floor(Math.random() * (30 - 1 + 1)) + 0,
          alrma_num: Math.floor(Math.random() * (30 - 1 + 1)) + 0,
          adminer: '王小虎',
        },
        {
          cloth: '混纺',
          max_num: Math.floor(Math.random() * (30 - 1 + 1)) + 0,
          alrma_num: Math.floor(Math.random() * (30 - 1 + 1)) + 0,
        },
        {
          cloth: '莫代尔',
          max_num: Math.floor(Math.random() * (30 - 1 + 1)) + 0,
          alrma_num: Math.floor(Math.random() * (30 - 1 + 1)) + 0,
        },
        {
          cloth: '呢绒',
          max_num: Math.floor(Math.random() * (30 - 1 + 1)) + 0,
          alrma_num: Math.floor(Math.random() * (30 - 1 + 1)) + 0,
        },
      ],
    }
  },
  components: {
    EchartPei,
    Echartbar,
  },
  async mounted() {
    var todayInfo = await GETMACHINEINFO()
    this.todayInfo = todayInfo.data
    var getMemInfo = await GETMEMINFO()
    this.getMemInfo = getMemInfo.data
    var getAllCheck = await GETALLCHECK()
    this.getAllCheck = getAllCheck.data
    this.three_time()
    this.two_check()
    // var WatchAlterMessage = await WATCHALERTMESSAGE(three_value1)
    // this.WatchAlterMessage = WatchAlterMessage.data
  },
}
</script>

<style lang="less">
.info_one p {
  width: 4rem;
}
.diainput {
  width: 20rem;
}
.diainput,
.diaoptions {
  text-align: left;
}
.el-dialog {
  width: 30%;
}
.mainPage {
  height: auto;
  width: 100%;
  float: left;
  margin: 0;
  background-image: url('../../../../assets/imgs/login/login.png');
  background-size: 100% 100%;
  background-repeat: no-repeat;
  .main_left {
    width: 70%;
    height: 100%;
    float: left;
    padding: 1rem;
    box-sizing: border-box;
  }
  .main_right {
    width: 30%;
    height: 100%;
    float: left;
    padding: 1rem;
    box-sizing: border-box;
  }
  .el-col {
    border-radius: 4px;
  }
  .grid-content {
    border-radius: 4px;
    background: #d4e8f5;
    padding: 1rem;
    box-sizing: border-box;
    .el-table {
      background-color: #d4e8f5;
    }
  }
  .grid_one,
  .grid_two {
    height: 45vh;
    margin-bottom: 1rem;
    position: relative;
    .choose {
      margin-bottom: 1rem;
      .block {
        float: left;
        //right: 10px;
        //position: absolute;
        margin-left: 4rem;
        .el-range-editor--mini.el-input__inner {
          width: 16rem;
        }
      }
      .select {
        float: left;
        margin-left: 1.5rem;
      }
    }
    .user {
      display: flex;
      align-items: center;
      height: auto;
      padding-bottom: 1rem;
      margin-bottom: 1rem;
      border-bottom: 3px solid #f3efb9;
      &info {
        text-align: left;
        margin-right: 2rem;
        border: 4px solid #81b4da;
        border-radius: 50%;
        box-sizing: border-box;
        img {
          display: block;
          width: 7.5rem;
          height: 7.5rem;
          border-radius: 50%;
        }
        .name {
          font-size: 0.8rem;
          margin: 0.5rem 0px 0.5rem 1rem;
        }
        .access {
          color: #999999;
          margin-left: 1rem;
        }
      }
      .today_info {
        // height: auto;
        width: calc(100% - 5rem);
        text-align: center;
        .title {
          // height: 2rem;
          // line-height: 2.5rem;
          border-bottom: 1px solid #ccc;
          color: #1d5d8d;
        }
        .detail_info {
          .info {
            float: left;
            margin-right: 1rem;
            p {
              margin-bottom: 1rem;
              width: 4rem;
            }
            .view {
              color: #1d5d8d;
              height: 2rem;
              // margin-top: 1rem;
            }
            .count,
            .per {
              font-size: 12px;
            }
            .num {
              font-size: 2rem;
              font-weight: 400;
            }
          }
        }
      }
    }
    .login-info {
      p {
        text-align: left;
        line-height: 28px;
        font-size: 14px;
        color: #999999;
        span {
          color: #666666;
          margin-left: 0.5rem;
        }
      }
    }
  }
  .grid_three {
    height: calc(55vh - 5.5rem);
    position: relative;
    .block {
      right: 10px;
      position: absolute;
    }
  }
  .grid_four {
    height: 45vh;
    margin-bottom: 1rem;
    width: 100%;
    overflow-y: auto;
    .demonstration {
      display: block;
      margin-bottom: 0.75rem;
    }
    .block {
      width: 100%;
      .el-range-editor--mini.el-input__inner {
        width: 16rem;
        float: left;
        margin-left: 1.5rem;
      }
    }
    .select {
      //float: right;
      .el-input--mini .el-input__inner {
        width: 3.5rem;
        // float: right;
      }
    }
  }
  .grid_five {
    height: calc(55vh - 5.5rem);
    overflow-y: auto;
  }
}
.el-date-editor .el-range-separator {
  width: 7%;
}

// @media screen and(max-width: 500px) and (min-width: 300px) {
//   .mainPage {
//     .main_left {
//       width: 100%;
//       height: auto;
//     }
//     .main_right {
//       width: 100%;
//       height: auto;
//       float: left;
//       padding: 1rem;
//       box-sizing: border-box;
//     }
//   }
// }
</style>
