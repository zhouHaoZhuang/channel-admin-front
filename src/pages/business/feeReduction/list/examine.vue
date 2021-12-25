<template>
  <div>
    <div class="business-container" v-if="dataOrder">
      <div class="business-basic">
        <a-tabs type="card">
          <a-tab-pane key="1" tab="订单信息">
            <div class="basicInformation">
              <div class="basicInformation-item">
                <span class="basicInformation-type">订单ID:</span>
                <span class="basicInformation-info"
                  >{{ dataOrder[0].id }}????</span
                >
              </div>
              <div class="basicInformation-item">
                <span class="basicInformation-type">服务器IP:</span>
                <span class="basicInformation-info">{{ dataOrder[0].id }}</span>
              </div>
              <div class="basicInformation-item">
                <span class="basicInformation-type">订单类型:</span
                ><span class="basicInformation-info">{{
                  address(dataOrder[0].regionId) || dataOrder[0].regionId
                }}</span>
              </div>
              <div class="basicInformation-item">
                <span class="basicInformation-type">创建时间:</span
                ><span class="basicInformation-info">
                  {{ dataOrder[0].outIp }}</span
                >
              </div>
              <div class="basicInformation-item">
                <span class="basicInformation-type">状态:</span
                ><span class="basicInformation-info">{{
                  dataOrder[0].innerIp
                }}</span>
              </div>
              <div class="basicInformation-item">
                <span class="basicInformation-type">执行时间:</span
                ><span class="basicInformation-info">{{dataOrder[0].osName}} </span>
              </div>
              <div class="basicInformation-item">
                <span class="basicInformation-type">回退金额:</span
                ><span class="basicInformation-info">
                  {{ dataOrder[0].osName }}</span
                >
              </div>
              <!-- 运行状态 -->
              <!-- <div class="basicInformation-item">
                <span class="basicInformation-type">运行状态：</span
                ><span
                  class="basicInformation-info basicInformation-info-ash"
                  v-if="dataOrder[0].runningStatus == 0"
                  >黑洞中</span
                >
                <span
                  class="basicInformation-info basicInformation-info-run"
                  v-else-if="dataOrder[0].runningStatus == 1"
                  >运行中</span
                >
                <span
                  class="basicInformation-info basicInformation-info-ash"
                  v-else-if="dataOrder[0].runningStatus == 2"
                  >已关机</span
                >
                <span
                  class="basicInformation-info basicInformation-info-ash"
                  v-else-if="dataOrder[0].runningStatus == 3"
                  >已过期</span
                >
              </div> -->
            </div>
          </a-tab-pane>
        </a-tabs>
      </div>
      <div class="business-basic">
        <a-tabs type="card">
          <a-tab-pane key="1" tab="配置信息">
            <div class="basicInformation">
              <div class="basicInformation-item">
                <span class="basicInformation-type">产品名称:</span
                ><span class="basicInformation-info">
                  {{ dataOrder[0].cup }}</span
                >
              </div>
              <div class="basicInformation-item">
                <span class="basicInformation-type">类型:</span
                ><span class="basicInformation-info">
                  {{ dataOrder[0].memory }}</span
                >
              </div>
              <div class="basicInformation-item">
                <span class="basicInformation-type">配置信息:</span>
                <span class="basicInformation-type">cpu:</span>
                <span class="basicInformation-type">内存:</span>
                <span class="basicInformation-type">磁盘:</span>
                <span class="basicInformation-type">带宽:</span>
                <span class="basicInformation-type">防御:</span>
                <span class="basicInformation-type">操作系统:</span>
                <span class="basicInformation-type">所在区:</span>
              </div>
              <div class="basicInformation-item">
                <span class="basicInformation-type">数量:</span
                ><span class="basicInformation-info"></span>
              </div>
              <div class="basicInformation-item">
                <span class="basicInformation-type">付费方式:</span
                ><span class="basicInformation-info">
                  {{ dataOrder[0].systemSize }}</span
                >
              </div>
              <div class="basicInformation-item">
                <span class="basicInformation-type">原价:</span
                ><span class="basicInformation-info"></span>
              </div>
              <div class="basicInformation-item">
                <span class="basicInformation-type">订单金额:</span
                ><span class="basicInformation-info"></span>
              </div>
              <div class="basicInformation-item">
                <span class="basicInformation-type">代金券抵扣:</span
                ><span class="basicInformation-info"></span>
              </div>
              <div class="basicInformation-item">
                <span class="basicInformation-type">现金实付:</span
                ><span class="basicInformation-info"></span>
              </div>
            </div>
          </a-tab-pane>
        </a-tabs>
      </div>
      <div class="business-basic">
        <a-tabs type="card">
          <a-tab-pane key="1" tab="降配信息">
             <div class="basicInformation">
              <div class="basicInformation-item">
                <span class="basicInformation-type">产品名称:</span
                ><span class="basicInformation-info">
                  {{ dataOrder[0].cup }}</span
                >
              </div>
              <div class="basicInformation-item">
                <span class="basicInformation-type">类型:</span
                ><span class="basicInformation-info">
                  {{ dataOrder[0].memory }}</span
                >
              </div>
              <div class="basicInformation-item">
                <span class="basicInformation-type">配置信息:</span>
                <span class="basicInformation-type">cpu:</span>
                <span class="basicInformation-type">内存:</span>
                <span class="basicInformation-type">磁盘:</span>
                <span class="basicInformation-type">带宽:</span>
                <span class="basicInformation-type">防御:</span>
                <span class="basicInformation-type">操作系统:</span>
                <span class="basicInformation-type">所在区:</span>
              </div>
              <div class="basicInformation-item">
                <span class="basicInformation-type">数量:</span
                ><span class="basicInformation-info"></span>
              </div>
              <div class="basicInformation-item">
                <span class="basicInformation-type">使用时长:</span
                ><span class="basicInformation-info">
                  {{ dataOrder[0].systemSize }}</span
                >
              </div>
              <div class="basicInformation-item">
                <span class="basicInformation-type">剩余时长:</span
                ><span class="basicInformation-info"></span>
              </div>
              <div class="basicInformation-item">
                <span class="basicInformation-type">原件:</span
                ><span class="basicInformation-info"></span>
              </div>
              <div class="basicInformation-item">
                <span class="basicInformation-type">代金券抵扣:</span
                ><span class="basicInformation-info"></span>
              </div>
              <div class="basicInformation-item">
                <span class="basicInformation-type">回退:</span
                ><span class="basicInformation-info"></span>
              </div>
              <div class="basicInformation-item">
                <span class="basicInformation-type">实际回退:</span
                ><span class="basicInformation-info"></span>
              </div>
            </div>
          </a-tab-pane>
        </a-tabs>
      </div>
      <div class="business-basic">
        <a-tabs type="card">
          <a-tab-pane key="1" tab="用户信息">
            <div class="basicInformation">
              <div class="basicInformation-item">
                <span class="basicInformation-type">会员ID：</span
                ><span class="basicInformation-info">{{
                  dataOrder[0].corporationCode
                }}</span>
              </div>
              <div class="basicInformation-item">
                <span class="basicInformation-type">会员姓名:</span
                ><span class="basicInformation-info">{{
                  dataOrder[0].corporationName
                }}</span>
              </div>
              <div class="basicInformation-item">
                <span class="basicInformation-type">手机号码:</span
                ><span class="basicInformation-info">{{
                  dataOrder[0].phoneNumber
                }}</span>
              </div>
              <div class="basicInformation-item">
                <span class="basicInformation-type">邮箱:</span
                ><span class="basicInformation-info">{{
                  dataOrder[0].phoneNumber
                }}</span>
              </div>
              <div class="basicInformation-item">
                <span class="basicInformation-type">QQ账号:</span
                ><span class="basicInformation-info">
                  {{ dataOrder[0].qq }}----</span
                >
              </div>
            </div>
          </a-tab-pane>
        </a-tabs>
      </div>
      <!-- <div class="business-basic">
        <a-tabs type="card">
          <a-tab-pane key="1" tab="订单信息">
            <div class="basicInformation">
              <a-table
                :columns="columnsOrder"
                :data-source="dataOrder"
                :scoll="{ x: 1200 }"
                rowKey="id"
              >
                <span slot="discountAmount" slot-scope="text">
                  ￥{{ text }}
                </span>
                <span slot="info" slot-scope="text">
                  {{
                    "cpu:" +
                      text.cup +
                      "核，内存:" +
                      text.memory +
                      "G，硬盘:" +
                      text.systemSize +
                      "G，带宽:" +
                      text.internetMaxBandwidthOut +
                      "M"
                  }}
                </span>

                <span slot="query" slot-scope="text">
                  <a-button type="link" class="" @click="selectInfo(text)">
                    查看
                  </a-button>
                </span>
              </a-table>
            </div>
          </a-tab-pane>
        </a-tabs>
      </div>
      <div class="business-basic">
        <a-tabs type="card">
          <a-tab-pane key="1" tab="操作日志">
            <div class="basicInformation">
              <a-table
                :columns="columnsActive"
                :data-source="dataActive"
                rowKey="id"
                :scoll="{ x: 1200 }"
              >
                <span slot="query" slot-scope="text">
                  <a-button type="link" class="" @click="selectInfo(text)">
                    查看
                  </a-button>
                </span>
              </a-table>
            </div>
          </a-tab-pane>
        </a-tabs>
      </div> -->
    </div>
  </div>
</template>

<script>
import { regionMapData } from "@/utils/enum";
export default {
  data() {
    return {
      dataOrder: null,
      regionMapData,
      columnsOrder: [
        {
          title: "订单编号",
          dataIndex: "orderNo"
        },
        {
          title: "类型",
          dataIndex: "tradeCode"
        },
        {
          title: "时间",
          dataIndex: "purchaseTimeStr"
        },
        {
          title: "订单金额",
          dataIndex: "discountAmount",
          scopedSlots: {
            customRender: "discountAmount"
          }
        },
        {
          title: "配置信息",
          key: "info",
          scopedSlots: {
            customRender: "info"
          }
        },
        {
          title: "查看",
          dataIndex: "id",
          key: "query",
          scopedSlots: {
            customRender: "query"
          }
        }
      ],
      columnsActive: [
        {
          title: "编号",
          dataIndex: "orderId"
        },
        {
          title: "操作",
          dataIndex: "type"
        },
        {
          title: "操作人",
          dataIndex: "time"
        },
        {
          title: "时间",
          dataIndex: "amount"
        },
        {
          title: "查看",
          dataIndex: "id",
          key: "query",
          scopedSlots: {
            customRender: "query"
          }
        }
      ],
      dataActive: []
    };
  },
  methods: {
    selectInfo(text) {
      console.log(text);
    },
    address(text) {
      return this.regionMapData[text];
    }
  },
  created() {
    let id = this.$route.query.id;
    // console.log(id);
    this.$store.dispatch("renew/inquireList", id).then(res => {
      this.dataOrder = [res.data];
      console.log(res);
    });
  }
};
</script>

<style lang="less" scoped>
.business-container {
  margin-left: 20px;
  //   background-color: #fff;
  .business-basic {
    background-color: #ffffff;
    margin-bottom: 20px;
    padding: 20px;
  }
  .basicInformation {
    display: flex;
    flex-wrap: wrap;
    font-size: 12px;
  }
  .basicInformation-item {
    width: 30%;
    line-height: 30px;
  }
  .basicInformation-type {
    display: inline-block;
    width: 100px;
    color: #a3a3a3;
  }
  .basicInformation-info {
    color: #292929;
  }
  .basicInformation-info-ash {
    background-color: #a3a3a3;
    color: #fff;
    padding: 0 5px;
    border-radius: 2px;
  }
  .basicInformation-info-run {
    background-color: #16b841;
    color: #fff;
    padding: 0 5px;
    border-radius: 2px;
  }
}
</style>
