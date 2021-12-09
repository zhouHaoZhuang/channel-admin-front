<template>
  <div class="hostrecord-container">
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
  </div>
</template>

<script>
export default {
  data() {
    return {
      tableLoading: false,
      data: [],
      columns:[
        {
          title: '宿主机ID',
          dataIndex: 'snapshotid',
        },
        {
          title: '宿主机IP',
          dataIndex: 'snapshotip',
        },
        {
          title: '物理位置',
          dataIndex: 'snapshotlocation',
        },
        {
          title: '异常持续次数',
          dataIndex: 'snapshotabnormal',
        },
        {
          title: '异常记录时间',
          dataIndex: 'snapshotabnormaltime',
        },
        {
          title: '异常恢复时间',
          dataIndex: 'snapshotabnormalrecoverytime',
        },
        {
          title: '备注',
          dataIndex: 'snapshotremark',
        },
        {
          title: '操作',
          dataIndex: 'action',
        }
      ]
    }
  },
};
</script>

<style lang='less' scoped>
 .feeRed-title {
    display: flex;
    width: 775px;
    justify-content: space-between;
    align-items: center;
    height: 50px;
    .left5 {
      margin-left: 5px;
    }
  }
  .hostrecord-container{
    margin-left: 20px;
    padding: 20px;
    background-color: #fff;
  }
  </style>
