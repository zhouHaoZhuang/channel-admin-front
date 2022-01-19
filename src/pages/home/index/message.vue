<template>
  <div class="message-container">
    <div class="tabs">
      <a-tabs default-active-key="" @change="callback">
        <a-tab-pane key="" tab="全部消息"> </a-tab-pane>
        <a-tab-pane key="0" tab="未读消息"> </a-tab-pane>
        <a-tab-pane key="1" tab="已读消息"> </a-tab-pane>
      </a-tabs>
    </div>
    <div class="btns">
      <a-space>
        <a-button type="primary" @click="addMessage">
          发送消息
        </a-button>
        <a-button :disabled="selectedRowKeys.length === 0" @click="haveRread">
          标记为已读
        </a-button>
        <a-button @click="readAll">全部标记为已读</a-button>
        <a-button :disabled="selectedRowKeys.length === 0" @click="delmessage">
          删除
        </a-button>
      </a-space>
    </div>
    <div class="table-con">
      <a-table
        :columns="columns"
        :data-source="data"
        :loading="loading"
        rowKey="id"
        :pagination="paginationProps"
        :row-selection="{
          selectedRowKeys: selectedRowKeys,
          onChange: onSelectChange,
          getCheckboxProps: (record) => ({
            props: { disabled: record.id === 1 },
          }),
        }"
        :customRow="customRowSet"
        :rowClassName="tableRowClass"
      >
        <div slot-scope="text" slot="sendTime">
          {{ text | formatDate }}
        </div>
        <span slot="action" slot-scope="text, record">
          <a-button type="link" @click="selectMessage(record.id)">
            查看
          </a-button>
          <a-button type="link" @click="handleDel(record.id)">
            删除
          </a-button>
        </span>
      </a-table>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      loading: false,
      listQuery: {
        id: undefined,
        search: '',
        currentPage: 1,
        pageSize: 10,
        total: 0,
        'qp-status-eq': '',
      },
      columns: [
        {
          title: '标题',
          dataIndex: 'title',
          key: 'title',
        },
        {
          title: '内容',
          dataIndex: 'content',
          key: 'content',
        },
        {
          title: '发送时间',
          dataIndex: 'sendTime',
          scopedSlots: {
            customRender: 'sendTime',
          },
        },
        {
          title: '操作',
          key: 'action',
          scopedSlots: { customRender: 'action' },
        },
      ],
      data: [],
      paginationProps: {
        showQuickJumper: true,
        showSizeChanger: true,
        total: 1,
        showTotal: (total, range) =>
          `共 ${total} 条记录 第 ${this.listQuery.currentPage} / ${Math.ceil(
            total / this.listQuery.pageSize
          )} 页`,
        onChange: this.quickJump,
        onShowSizeChange: this.onShowSizeChange,
      },
      selectedRowKeys: [],
    };
  },
  activated() {
    this.getList();
  },
  methods: {
    // 标记已读
    haveRread() {
      this.$store
        .dispatch('message/changeList', { id: this.selectedRowKeys.toString() })
        .then((val) => {
          console.log(val);
          this.getList();
        });
    },
    addMessage() {
      this.$router.push('/dashboard/index/addDetail');
    },
    // 批量删除
    delmessage() {
      this.$confirm({
        title: '确认要删除吗？',
        onOk: () => {
          this.$store
            .dispatch('message/delList', {
              id: this.selectedRowKeys.toString(),
            })
            .then((val) => {
              console.log(val);
              this.getList();
            });
        },
      });
    },
    // tabs切换回调
    callback(key) {
      // console.log(key);
      this.listQuery['qp-status-eq'] = key;
      this.getList();
    },
    // 全部标记为已读
    readAll() {
      this.$store.dispatch('message/readAll').then(() => {
        this.getList();
      });
    },
    selectMessage(id) {
      this.$router.push({
        path: '/dashboard/index/detail',
        query: { id },
      });
    },
    // 获取列表
    getList() {
      this.loading = true;
      this.$store
        .dispatch('message/getList', this.listQuery)
        .then((res) => {
          console.log(res);
          this.data = res.data.list;
          this.paginationProps.total = res.data.totalCount * 1;
        })
        .finally(() => {
          this.loading = false;
        });
    },
    // 表格选择
    onSelectChange(selectedRowKeys) {
      console.log('selectedRowKeys changed: ', selectedRowKeys);
      this.selectedRowKeys = selectedRowKeys;
    },
    // 设置表格的每一行样式是否禁用
    tableRowClass(record, index) {
      if (record.id === 1) {
        // 禁用第一行
        return 'table-row row-disable';
      }
      return 'table-row';
    },
    // 设置表格的每一行点击事件
    customRowSet(record) {
      return {
        on: {
          // 事件
          click: (event) => {
            if (event.target.innerText == '删除') {
              return;
            }
            console.log('表格行点击', event);
            // if (record.id !== 1) {
            this.$router.push({
              path: '/dashboard/index/detail',
              query: { id: record.id },
            });
            // }
          },
        },
      };
    },
    // 表格行删除单个
    handleDel(id) {
      this.$confirm({
        title: '确认要删除吗？',
        onOk: () => {
          this.$store
            .dispatch('message/delList', {
              id,
            })
            .then((val) => {
              console.log(val);
              this.getList();
            });
        },
      });
    },
  },
};
</script>

<style lang="less" scoped>
.message-container {
  background: #fff;
  margin: 0 24px;
  padding-top: 5px;
  .btns {
    padding-left: 15px;
    margin-bottom: 20px;
  }
  .table-con {
    padding: 0 15px;
  }
}
</style>
<style lang="less">
.message-container {
  .ant-tabs-bar {
    padding-left: 15px;
  }
  .ant-tabs-nav .ant-tabs-tab {
    margin: 0;
  }
  .table-row {
    cursor: pointer;
  }
  .row-disable {
    color: #ccc !important;
  }
}
</style>
