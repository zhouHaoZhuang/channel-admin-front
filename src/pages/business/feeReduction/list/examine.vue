<template>
  <div>
    <div class="business-container">
      <div class="business-basic">
        <a-tabs type="card">
          <a-tab-pane key="1" tab="订单信息">
            <div class="basicInformation">
              <div class="basicInformation-item">
                <span class="basicInformation-type">订单ID:</span>
                <span class="basicInformation-info">{{ detail.orderNo }}</span>
              </div>
              <div class="basicInformation-item">
                <span class="basicInformation-type">服务器IP:</span>
                <span class="basicInformation-info">{{ detail.outIp }}</span>
              </div>
              <div class="basicInformation-item">
                <span class="basicInformation-type">订单类型:</span>
                <span class="basicInformation-info">
                  {{ tradeTypeEnum[detail.tradeType] }}
                </span>
              </div>
              <div class="basicInformation-item">
                <span class="basicInformation-type">创建时间:</span>
                <span class="basicInformation-info">
                  {{ detail.createTimeStr }}
                </span>
              </div>
              <div class="basicInformation-item">
                <span class="basicInformation-type">状态:</span>
                <span class="basicInformation-info">
                  {{ runningStatusEnum[detail.runningStatus] }}
                </span>
              </div>
              <div class="basicInformation-item">
                <span class="basicInformation-type">到期时间:</span>
                <span class="basicInformation-info">
                  {{ detail.endTimeStr }}
                </span>
              </div>
              <div class="basicInformation-item">
                <span class="basicInformation-type">续费金额:</span>
                <span class="basicInformation-info price">
                  {{ detail.discountAmount }}元
                </span>
              </div>
            </div>
          </a-tab-pane>
        </a-tabs>
      </div>
      <div class="business-basic">
        <a-tabs type="card">
          <a-tab-pane key="1" tab="配置信息">
            <div class="basicInformation">
              <div class="basicInformation-item">
                <span class="basicInformation-type">产品名称:</span>
                <span class="basicInformation-info">
                  {{ detail.instanceName }}
                </span>
              </div>
              <!-- <div class="basicInformation-item">
                <span class="basicInformation-type">付费方式:</span>
                <span class="basicInformation-info">
                  {{ detail.chargeModel }}
                </span>
              </div> -->
              <div class="basicInformation-item">
                <span class="basicInformation-type">原价:</span>
                <span class="basicInformation-info price">
                  {{ detail.originAmount }}元
                </span>
              </div>
              <div class="basicInformation-item">
                <span class="basicInformation-type">订单金额:</span>
                <span class="basicInformation-info price">
                  {{ detail.actualAmount }}元
                </span>
              </div>
              <div class="basicInformation-item item-config">
                <span class="basicInformation-type">配置信息:</span>
                <div class="basicInformation-info">
                  <div class="item">
                    <span class="basicInformation-type">cpu:</span>
                    <span class="basicInformation-info">
                      {{ detail.cpu }}核</span
                    >
                  </div>
                  <div class="item">
                    <span class="basicInformation-type">内存:</span>
                    <span class="basicInformation-info">
                      {{ detail.memory }}G
                    </span>
                  </div>
                  <div class="item">
                    <span class="basicInformation-type">磁盘:</span>
                    <span class="basicInformation-info"> {{ diskNum }}G </span>
                  </div>
                  <div class="item">
                    <span class="basicInformation-type">带宽:</span>
                    <span class="basicInformation-info">
                      {{ detail.internetMaxBandwidthOut }}M
                    </span>
                  </div>
                  <div class="item">
                    <span class="basicInformation-type">操作系统:</span>
                    <span class="basicInformation-info">
                      {{ detail.osName }}
                    </span>
                  </div>
                  <div class="item">
                    <span class="basicInformation-type">所在区:</span>
                    <span class="basicInformation-info">
                      {{ regionDataEnum[detail.regionId] }}
                    </span>
                  </div>
                </div>
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
                <span class="basicInformation-type">会员ID：</span>
                <span class="basicInformation-info">
                  {{ detail.corporationCode }}
                </span>
              </div>
              <div class="basicInformation-item">
                <span class="basicInformation-type">会员姓名:</span>
                <span class="basicInformation-info">
                  {{ detail.realName }}
                </span>
              </div>
              <div class="basicInformation-item">
                <span class="basicInformation-type">手机号码:</span>
                <span class="basicInformation-info">
                  {{ detail.phoneNumber }}
                </span>
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
import { tradeTypeEnum, regionDataEnum, runningStatusEnum } from "@/utils/enum";
export default {
  computed: {
    // 返回磁盘大小
    diskNum() {
      if (this.detail.dataDisk && Array.isArray(this.detail.dataDisk)) {
        let sum = 0;
        this.detail.dataDisk.forEach(item => {
          sum += item.size;
        });
        return sum;
      } else {
        return 0;
      }
    }
  },
  data() {
    return {
      tradeTypeEnum,
      regionDataEnum,
      runningStatusEnum,
      dataOrder: null,
      detail: {},
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
    }
  },
  activated() {
    const orderNo = this.$route.query.orderNo;
    this.$store.dispatch("renew/inquireList", { orderNo }).then(res => {
      this.dataOrder = [res.data];
      this.detail = { ...res.data };
    });
  }
};
</script>

<style lang="less" scoped>
.business-container {
  margin-left: 20px;
  .business-basic {
    background-color: #fff;
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
  .price {
    color: #ff6600;
    font-weight: 500;
  }
  .item-config {
    width: 100%;
    display: flex;
    .item {
      display: flex;
    }
  }
}
</style>
