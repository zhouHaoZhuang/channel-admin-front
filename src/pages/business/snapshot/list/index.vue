<template>
  <div class="snapshot-container">
    <div>
      <a-tabs type="card">
        <a-tab-pane key="1" tab="正常">
          <div>
            <div class="feeRed-title">
              <a-select style="width:120px" allowClear placeholder="请选择">
                <a-select-option value="快照名称">
                  快照名称
                </a-select-option>
                <a-select-option value="API快照名称">
                  API快照名称
                </a-select-option>
                <a-select-option value="会员ID">
                  会员ID
                </a-select-option>
                <a-select-option value="云服务器ID">
                  云服务器ID
                </a-select-option>
                <a-select-option value="云服务器IP">
                  云服务器IP
                </a-select-option>
              </a-select>
              <span>
                <a-input placeholder="搜索关键词"></a-input>
              </span>
              <a-select style="width:120px" allowClear placeholder="时间类型">
                <a-select-option value="时间类型">
                  时间类型
                </a-select-option>
                <a-select-option value="创建时间">
                  创建时间
                </a-select-option>
                <a-select-option value="到期时间">
                  到期时间
                </a-select-option>
              </a-select>
              <div>
                <span class="date-picker"
                  ><a-date-picker placeholder="起始日期"></a-date-picker
                ></span>
                <span class="date-picker left5"
                  ><a-date-picker placeholder="结束日期"></a-date-picker
                ></span>
              </div>
              <a-button type="primary">
                查询
              </a-button>
            </div>
            <div>
              <a-table
                :loading="tableLoading"
                :columns="columns"
                :data-source="data"
                rowKey="id"
                :scroll="{ x: 1200 }"
              >
              </a-table>
            </div>
          </div>
        </a-tab-pane>
        <a-tab-pane key="2" tab="即将到期">
          <div>
            <div class="feeRed-title">
              <a-select style="width:120px" allowClear placeholder="请选择">
                <a-select-option value="快照名称">
                  快照名称
                </a-select-option>
                <a-select-option value="API快照名称">
                  API快照名称
                </a-select-option>
                <a-select-option value="会员ID">
                  会员ID
                </a-select-option>
                <a-select-option value="云服务器ID">
                  云服务器ID
                </a-select-option>
                <a-select-option value="云服务器IP">
                  云服务器IP
                </a-select-option>
              </a-select>
              <span>
                <a-input placeholder="搜索关键词"></a-input>
              </span>
              <a-select style="width:120px" allowClear placeholder="时间类型">
                <a-select-option value="时间类型">
                  时间类型
                </a-select-option>
                <a-select-option value="创建时间">
                  创建时间
                </a-select-option>
                <a-select-option value="到期时间">
                  到期时间
                </a-select-option>
              </a-select>
              <div>
                <span class="date-picker"
                  ><a-date-picker placeholder="起始日期"></a-date-picker
                ></span>
                <span class="date-picker left5"
                  ><a-date-picker placeholder="结束日期"></a-date-picker
                ></span>
              </div>
              <a-button type="primary">
                查询
              </a-button>
            </div>
            <div>
              <a-table
                :loading="tableLoading"
                :columns="columns"
                :data-source="data"
                rowKey="id"
                :scroll="{ x: 1200 }"
              >
              </a-table>
            </div>
          </div>
        </a-tab-pane>
        <a-tab-pane key="3" tab="已到期">
          <div>
            <div class="feeRed-title">
              <a-select style="width:120px" allowClear placeholder="请选择">
                <a-select-option value="快照名称">
                  快照名称
                </a-select-option>
                <a-select-option value="API快照名称">
                  API快照名称
                </a-select-option>
                <a-select-option value="会员ID">
                  会员ID
                </a-select-option>
                <a-select-option value="云服务器ID">
                  云服务器ID
                </a-select-option>
                <a-select-option value="云服务器IP">
                  云服务器IP
                </a-select-option>
              </a-select>
              <span>
                <a-input placeholder="搜索关键词"></a-input>
              </span>
              <a-select style="width:120px" allowClear placeholder="时间类型">
                <a-select-option value="时间类型">
                  时间类型
                </a-select-option>
                <a-select-option value="创建时间">
                  创建时间
                </a-select-option>
                <a-select-option value="到期时间">
                  到期时间
                </a-select-option>
              </a-select>
              <div>
                <span class="date-picker"
                  ><a-date-picker placeholder="起始日期"></a-date-picker
                ></span>
                <span class="date-picker left5"
                  ><a-date-picker placeholder="结束日期"></a-date-picker
                ></span>
              </div>
              <a-button type="primary">
                查询
              </a-button>
            </div>
            <div>
              <a-table
                :loading="tableLoading"
                :columns="columns"
                :data-source="data"
                rowKey="id"
                :scroll="{ x: 1200 }"
              >
              </a-table>
            </div>
          </div>
        </a-tab-pane>
        <a-tab-pane key="4" tab="已删除">
          <div>
            <div class="feeRed-title-delete">
              <a-select style="width:120px" allowClear placeholder="请选择">
                <a-select-option value="快照名称">
                  快照名称
                </a-select-option>
                <a-select-option value="API快照名称">
                  API快照名称
                </a-select-option>
                <a-select-option value="会员ID">
                  会员ID
                </a-select-option>
                <a-select-option value="云服务器ID">
                  云服务器ID
                </a-select-option>
                <a-select-option value="云服务器IP">
                  云服务器IP
                </a-select-option>
              </a-select>
              <span>
                <a-input placeholder="搜索关键词"></a-input>
              </span>
              <div>
                <span>
                  创建时间：
                </span>
                <span class="date-picker"
                  ><a-date-picker placeholder="起始日期"></a-date-picker
                ></span>
                <span class="date-picker left5"
                  ><a-date-picker placeholder="结束日期"></a-date-picker
                ></span>
              </div>
              <div>
                <span>
                  到期时间：
                </span>
                <span class="date-picker"
                  ><a-date-picker placeholder="起始日期"></a-date-picker
                ></span>
                <span class="date-picker left5"
                  ><a-date-picker placeholder="结束日期"></a-date-picker
                ></span>
              </div>
              <a-button type="primary">
                查询
              </a-button>
            </div>
            <div>
              <a-table
                :loading="tableLoading"
                :columns="columns"
                :data-source="data"
                rowKey="id"
                :scroll="{ x: 1200 }"
              >
              </a-table>
            </div>
          </div>
        </a-tab-pane>
      </a-tabs>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      data: [],
      tableLoading: false,
      columns: [
        {
          title: "快照ID",
          dataIndex: "id"
        },
        {
          title: "快照名称",
          dataIndex: "name"
        },
        {
          title: "API快照名称",
          dataIndex: "apiName"
        },
        {
          title: "会员ID",
          dataIndex: "memberId"
        },
        {
          title: "云服务器ID",
          dataIndex: "serverId"
        },
        {
          title: "云服务器IP",
          dataIndex: "serverIp"
        },
        {
          title: "创建时间",
          dataIndex: "createTime",
          sorter: true,
          sortOrder: true
        },
        {
          title: "到期时间",
          dataIndex: "expireTime",
          sorter: true,
          sortOrder: true
        },
        {
          title: "操作",
          dataIndex: "action",
          width: "200px",
          scopedSlots: {
            customRender: "action"
          }
        }
      ]
    };
  }
};
</script>

<style lang="less" scoped>
.snapshot-container {
  background-color: #fff;
  margin-left: 20px;
  padding: 20px;
  .feeRed-title {
    display: flex;
    width: 890px;
    justify-content: space-between;
    align-items: center;
    height: 50px;
    .left5 {
      margin-left: 5px;
    }
  }
  .feeRed-title-delete {
    display: flex;
    width: 970px;
    justify-content: space-between;
    align-items: center;
    height: 50px;
    // > div {
    //   width: 250px;
    // }
    .date-picker {
      display: inline-block;
      width: 100px;
    }
    .left5 {
      margin-left: 5px;
    }
  }
}
</style>
