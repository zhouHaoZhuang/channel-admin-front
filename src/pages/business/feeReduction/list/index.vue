<template>
  <div class="feeRed-content">
    <div class="feeRed-title">
      <a-select style="width:120px" allowClear placeholder="请选择">
        <a-select-option value="用户ID">
          用户ID
        </a-select-option>
        <a-select-option value="云服务器ID">
          云服务器ID
        </a-select-option>
        <a-select-option value="GUID">
          GUID
        </a-select-option>
      </a-select>
      <span>
        <a-input placeholder="搜索关键词"></a-input>
      </span>
      <a-select style="width:120px" allowClear placeholder="状态">
        <a-select-option value="待降配">
          待降配
        </a-select-option>
        <a-select-option value="已完成">
          已完成
        </a-select-option>
      </a-select>
      <div>
        <span class="date-picker"
          ><a-date-picker placeholder="开始日期"></a-date-picker
        ></span>
        <span class="date-picker left5"
          ><a-date-picker placeholder="结束日期"></a-date-picker
        ></span>
      </div>
      <a-button type="primary">
        查询
      </a-button>
    </div>
    <div class="feeRed-table">
      <a-table
        :loading="tableLoading"
        :columns="columns"
        :data-source="data"
        rowKey="id"
        :scroll="{ x:1200 }"
      >
        <a
          slot="action"
          slot-scope="text, record"
          @click="addChannel(record.ecsBaseInfoResDto.ecsProductStockId)"
          >管理</a
        >
      </a-table>
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
          title: "ID",
          dataIndex: "Id"
        },
        {
          title: "guid",
          dataIndex: "guid"
        },
        {
          title: "用户ID",
          dataIndex: "userid"
        },
        {
          title: "服务器",
          dataIndex: "server"
        },
        {
          title: "创建时间",
          dataIndex: "createTime",
          sorter: true,
          sortOrder: true
        },
        {
          title: "执行时间",
          dataIndex: "implementTime",
          sorter: true,
          sortOrder: true
        },
        {
          title: "状态",
          dataIndex: "state"
        },
        {
          title: "操作",
          dataIndex: "action",
          fixed: "right"
        }
      ]
    };
  }
};
</script>

<style lang="less" scoped>
.feeRed-content {
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
}
</style>
