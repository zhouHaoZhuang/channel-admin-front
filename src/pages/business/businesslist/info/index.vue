<template>
  <div>
    <div class="business-container"
         v-if="dataOrder">
      <div class="business-basic">
        <a-tabs type="card">
          <a-tab-pane key="1"
                      tab="基础信息">
            <div class="basicInformation">
              <div class="basicInformation-item">
                <span class="basicInformation-type">GUID：</span>
                <span class="basicInformation-info">{{ data.id }}????</span>
              </div>
              <div class="basicInformation-item">
                <span class="basicInformation-type">业务ID：</span>
                <span class="basicInformation-info">{{ data.id }}</span>
              </div>
              <div class="basicInformation-item">
                <span class="basicInformation-type">线路：</span>
                <span class="basicInformation-info">{{regionDataEnum[data.regionId]}}</span>
              </div>
              <div class="basicInformation-item">
                <span class="basicInformation-type">服务器IP：</span><span class="basicInformation-info">
                  {{ data.outIp }}</span>
              </div>
              <div class="basicInformation-item">
                <span class="basicInformation-type">内网IP：</span><span class="basicInformation-info">{{
                  data.innerIp
                }}</span>
              </div>
              <div class="basicInformation-item">
                <span class="basicInformation-type"></span><span class="basicInformation-info"> </span>
              </div>
              <div class="basicInformation-item">
                <span class="basicInformation-type">操作系统：</span><span class="basicInformation-info">
                  {{ data.osName }}</span>
              </div>
              <div class="basicInformation-item">
                <span class="basicInformation-type">登录名：</span><span class="basicInformation-info">administrator---</span>
              </div>
              <div class="basicInformation-item">
                <span class="basicInformation-type">远程端口：</span><span class="basicInformation-info">3389----</span>
              </div>
              <!-- <div class="basicInformation-item">
                <span class="basicInformation-type">业务状态：</span><span class="basicInformation-info">正常----</span>
              </div> -->
              <div class="basicInformation-item">
                <span class="basicInformation-type" >运行状态：</span>
                  <span :class="{'basicInformation-info':true,'basicInformation-info-run':data.runningStatus==1,'basicInformation-info-ash':data.runningStatus!=1}"> {{runningStatusEnum[data.runningStatus]}}</span>
              </div>
              <!-- <div class="basicInformation-item">
                <span class="basicInformation-type">操作状态：</span><span class="basicInformation-info">正常----</span>
              </div>
              <div class="basicInformation-item">
                <span class="basicInformation-type">API锁定：</span><span class="basicInformation-info">未锁定----</span>
              </div>
              <div class="basicInformation-item">
                <span class="basicInformation-type">快照状态：</span><span class="basicInformation-info">正常----</span>
              </div>
              <div class="basicInformation-item">
                <span class="basicInformation-type">同步时间：</span><span class="basicInformation-info">无----</span>
              </div>
              <div class="basicInformation-item">
                <span class="basicInformation-type">备注：</span><span class="basicInformation-info">备注----</span><a href="">修改备注</a>
              </div> -->
            </div>
          </a-tab-pane>
        </a-tabs>
      </div>
      <div class="business-basic">
        <a-tabs type="card">
          <a-tab-pane key="1"
                      tab="配置信息">
            <div class="basicInformation">
              <div class="basicInformation-item">
                <span class="basicInformation-type">CPU：</span><span class="basicInformation-info">
                  {{ data.cpu }}核</span>
              </div>
              <div class="basicInformation-item">
                <span class="basicInformation-type">内存：</span><span class="basicInformation-info">
                  {{ data.memory }}G</span>
              </div>
              <div class="basicInformation-item">
                <span class="basicInformation-type">带宽：</span><span class="basicInformation-info">
                  {{ data.internetMaxBandwidthOut }}Mbps</span>
              </div>
              <div class="basicInformation-item">
                <span class="basicInformation-type">防御：</span><span class="basicInformation-info"> 20G</span>
              </div>
              <div class="basicInformation-item">
                <span class="basicInformation-type">数据磁盘：</span><span class="basicInformation-info">
                  {{ data.systemSize }}G</span>
              </div>
              <div class="basicInformation-item">
                <span class="basicInformation-type">下行带宽：</span><span class="basicInformation-info"> 0M----</span>
              </div>
            </div>
          </a-tab-pane>
        </a-tabs>
      </div>
      <div class="business-basic">
        <a-tabs type="card">
          <a-tab-pane key="1"
                      tab="付费信息">
            <div class="basicInformation">
              <div class="basicInformation-item">
                <span class="basicInformation-type">购买时间：</span><span class="basicInformation-info">{{
                  data.purchaseTimeStr
                }}</span>
              </div>
              <div class="basicInformation-item">
                <span class="basicInformation-type">购买时长：</span><span class="basicInformation-info">{{
                  data.purchaseDuration
                }}</span>
              </div>
              <div class="basicInformation-item">
                <span class="basicInformation-type">到期时间：</span><span class="basicInformation-info">{{
                  data.endTimeStr
                }}</span>
              </div>
              <div class="basicInformation-item">
                <span class="basicInformation-type">续费方式：</span><span class="basicInformation-info">
                  {{ data.tradeCode }}</span>
                <a href="">[设置]</a>
              </div>
              <div class="basicInformation-item">
                <span class="basicInformation-type"></span><span class="basicInformation-info"></span>
              </div>
              <div class="basicInformation-item">
                <span class="basicInformation-type"></span><span class="basicInformation-info"></span>
              </div>
              <div class="basicInformation-item">
                <span class="basicInformation-type">备注：</span><span class="basicInformation-info"> 备注----</span>
              </div>
            </div>
          </a-tab-pane>
        </a-tabs>
      </div>
      <div class="business-basic">
        <a-tabs type="card">
          <a-tab-pane key="1"
                      tab="会员信息">
            <div class="basicInformation">
              <div class="basicInformation-item">
                <span class="basicInformation-type">所属会员ID：</span><span class="basicInformation-info">{{
                  data.corporationCode
                }}</span>
              </div>
              <div class="basicInformation-item">
                <span class="basicInformation-type">会员姓名：</span><span class="basicInformation-info">{{
                  data.corporationName
                }}</span>
              </div>
              <div class="basicInformation-item">
                <span class="basicInformation-type">联系电话：</span><span class="basicInformation-info">{{
                  data.phoneNumber
                }}</span>
              </div>
              <div class="basicInformation-item">
                <span class="basicInformation-type">联系QQ：</span><span class="basicInformation-info">
                  {{ data.qq }}----</span>
              </div>
            </div>
          </a-tab-pane>
        </a-tabs>
      </div>
      <div class="business-basic">
        <a-tabs type="card">
          <a-tab-pane key="1"
                      tab="订单信息">
            <div class="basicInformation">
              <a-table :columns="columnsOrder"
                       :data-source="dataOrder"
                       :scoll="{ x: 1200 }"
                       rowKey="id">
                <span slot="discountAmount"
                      slot-scope="text">
                  ￥{{text}}
                </span>
                <span slot="info"
                      slot-scope="text">
                  {{'cpu:' + text.cpu + '核，内存:' + text.memory + 'G，硬盘:' + text.dataDisk[0].size + 'G，带宽:' + text.internetMaxBandwidthOut + 'M'}}
                </span>
                <div slot-scope="text" slot="createTime" v-if="text">
                  {{ text | formatDate }}
                </div>
                <span slot="query"
                      slot-scope="text">
                  <a-button type="link"
                            class=""
                            @click="selectInfo(text)">
                    查看
                  </a-button>
                </span>
              </a-table>
            </div>
          </a-tab-pane>
        </a-tabs>
      </div>
      <!--操作日志 <div class="business-basic">
        <a-tabs type="card">
          <a-tab-pane key="1"
                      tab="操作日志">
            <div class="basicInformation">
              <a-table :columns="columnsActive"
                       :data-source="dataActive"
                       rowKey="id"
                       :scoll="{ x: 1200 }">
                <span slot="query"
                      slot-scope="text">
                  <a-button type="link"
                            class=""
                            @click="selectInfoLog(text)">
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
import { regionDataEnum, runningStatusEnum } from '@/utils/enum';
export default {
  data () {
    return {
      dataOrder: null,
      regionDataEnum,
      runningStatusEnum,
      columnsOrder: [
        {
          title: "订单编号",
          dataIndex: "orderNo",
        },
        {
          title: "类型",
          dataIndex: "tradeType",
        },
        {
          title: "时间",
          dataIndex: "createTime",
          scopedSlots: {
            customRender: "createTime"
          }
        },
        {
          title: "订单金额",
          dataIndex: "actualAmount",
          scopedSlots: {
            customRender: "discountAmount",
          },
        },
        {
          title: "配置信息",
          key: "info",
          dataIndex: "productConfig",
          scopedSlots: {
            customRender: "info",
          },
        },
        {
          title: "查看",
          dataIndex: "id",
          key: "query",
          scopedSlots: {
            customRender: "query",
          },
        },
      ],
      columnsActive: [
        {
          title: "编号",
          dataIndex: "orderId",
        },
        {
          title: "操作",
          dataIndex: "type",
        },
        {
          title: "操作人",
          dataIndex: "time",
        },
        {
          title: "时间",
          dataIndex: "amount",
        },
        {
          title: "查看",
          dataIndex: "id",
          key: "query",
          scopedSlots: {
            customRender: "query",
          },
        },
      ],
      dataActive: [],
      data:[]
    };
  },
  methods: {
    selectInfo (id) {
      // console.log(id);
      this.$router.push({
        path: '/finance/index/orderInfo',
        query: {
          id,
        },
      });
    },
    selectInfoLog (id) {
      // console.log(id);
    },
  },
  created () {
    let id = this.$route.query.id;
    // console.log(id);
    this.$store.dispatch("business/getOne", id).then((res) => {
      this.dataOrder = res.data.orderLineLogResDto;
      this.data = res.data;
      console.log(res);
    });
  },
  activated() {
    let id = this.$route.query.id;
    // console.log(id);
    this.$store.dispatch("business/getOne", id).then((res) => {
      this.dataOrder = [res.data];
      console.log(res);
    });
  },
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
