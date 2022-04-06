<template>
  <div>
    <div class="member-container">
      <div class="public-header-wrap">
        <a-form-model layout="inline" :model="listQuery">
          <a-form-model-item>
            <a-button
              type="primary"
              class="btn-one"
              @click="addCustomer('add')"
            >
              添加客服
            </a-button>
            <a-button type="primary" @click="distribute"> 分配客服 </a-button>
          </a-form-model-item>
          <a-form-model-item>
            <a-input v-model="listQuery.search" placeholder="请输入客服姓名" />
          </a-form-model-item>
          <a-form-model-item>
            <a-button type="primary" @click="searchClick"> 查询 </a-button>
          </a-form-model-item>
        </a-form-model>
      </div>
      <div class="member-contenttable">
        <a-table
          :columns="columns"
          :data-source="data"
          :scroll="{ x: 1300 }"
          rowKey="id"
          :pagination="paginationProps"
        >
          <span slot="name" slot-scope="text">{{ text }}</span>
          <span
            :class="{ status0: text == 0, status1: text == 1, status: true }"
            slot="status"
            slot-scope="text"
            v-if="text"
            >{{ text == 0 ? "冻结" : "正常" }}</span
          >
          <span
            :class="{ status0: text == 1, status1: text == 0, status: true }"
            slot="loginLock"
            slot-scope="text"
            v-if="text"
            >{{ text == 0 ? "正常" : "锁定" }}</span
          >
          <span
            :class="{ status0: text != 1, status1: text == 1, status: true }"
            slot="certificationStatus"
            slot-scope="text"
            >{{ text == 1 ? "已认证" : "未认证" }}</span
          >
          <span slot="action" slot-scope="text" class="action">
            <a-button
              v-permission="'view'"
              type="link"
              class=""
              @click="selectInfo(text.id)"
            >
              查看
            </a-button>
          </span>
        </a-table>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      lucy: "lucy",
      isfilter: false,
      title: "realName",
      data: [],
      selectedRowKeys: [],
      columns: [
        {
          title: "客服ID",
          dataIndex: "corporationCode",
          scopedSlots: { customRender: "corporationCode" },
          width: 190,
        },
        {
          title: "客服姓名",
          dataIndex: "realName",
          width: 120,
        },
        {
          title: "工号",
          dataIndex: "phoneNumbers",
          width: 120,
        },
        {
          title: "联系方式",
          dataIndex: "phoneNumber",
          width: 120,
        },
        {
          title: "QQ",
          dataIndex: "qq",
          width: 120,
        },
        {
          title: "微信号",
          dataIndex: "email",
          width: 180,
        },
        {
          title: "权限",
          dataIndex: "ecsCount",
          width: 100,
          scopedSlots: { customRender: "ecsCount" },
        },

        {
          title: "关联子账号",
          dataIndex: "status",
          scopedSlots: { customRender: "status" },
          width: 110,
        },
        {
          title: "客户",
          dataIndex: "statuss",
          width: 110,
        },
        {
          title: "操作",
          Index: "action",
          fixed: "right",
          scopedSlots: { customRender: "action" },
          width: 200,
        },
      ],
      listQuery: {
        key: "",
        search: "",
        currentPage: 1,
        pageSize: 10,
        total: 0,
        sorter: "",
      },
      paginationProps: {
        showQuickJumper: true,
        showSizeChanger: true,
        pageSizeOptions: ["5", "10", "20", "30"],
        total: 0,
        current: 1, //当前页
        pageSize: 5, //每页显示数量
        showTotal: (total, range) =>
          `共 ${total} 条记录 第 ${this.paginationProps.current} /  ${Math.ceil(
            total / this.paginationProps.pageSize
          )} 页`,
        onChange: this.changepage,
        onShowSizeChange: this.onShowSizeChange,
      },
    };
  },
  created() {
    this.getList();
  },
  methods: {
    changepage(current) {
      this.paginationProps.current = current;
      this.getList();
    },
    onShowSizeChange(current, pageSize) {
      this.paginationProps.pageSize = pageSize;
      this.paginationProps.current = current;
      this.getList();
    },
    onSelectChange(selectedRowKeys) {
      console.log("selectedRowKeys changed: ", selectedRowKeys);
      this.selectedRowKeys = selectedRowKeys;
    },
    addMember() {
      this.$router.push({ path: "/sale/customer/add" });
    },
    getList() {
      this.listQuery.currentPage = this.paginationProps.current;
      this.listQuery.pageSize = this.paginationProps.pageSize;
      this.$store
        .dispatch("member/getList", this.listQuery)
        .then((res) => {
          this.data = res.data.list;
          this.paginationProps.total = res.data.totalCount * 1;
        })
        .finally(() => {});
    },
    distribute(type, record) {
      this.$router.push({
        path: "/sale/customer/distribute",
        query: {
          updateType: type,
          id: type === "edit" ? record.id : undefined,
        },
      });
    },
    addCustomer() {
      this.$router.push({
        path: "/sale/customer/addcustomer",
      
      });
    },
    selectInfo(key) {
      this.$router.push({
        path: "/sale/customer/detail",
        query: {
          id: key,
        },
      });
    },
    clickMore(key) {
      this.isMoreId = key;
    },
    searchClick() {
      this.listQuery.currentPage = 1;
      this.listQuery.key = this.title;
      this.$getListQp("member/getList", this.listQuery).then((res) => {
        this.data = res.data.list;
        this.paginationProps.total = res.data.totalCount * 1;
      });
    },
  },
};
</script>

<style lang="less" scoped>
.member-container {
  background-color: #fff;
  margin-left: 20px;
  padding: 20px;
  .public-header-wrap {
    margin-bottom: 20px;
  }
  .btn-one {
    margin-right: 20px;
  }
  .member-top {
    // display: flex;
    width: 100%;
    padding-bottom: 20px;
    justify-content: space-between;
    .search {
      display: inline-block;
      width: 250px;
      margin: 0 10px;
    }
  }
  .member-filterall {
    border: 1px solid #e0e0e0;
    width: 100%;
    background-color: #fafafa;
    .member-filter {
      display: flex;
      width: 100%;
      border: 1px solid #e0e0e0;
      background-color: #fafafa;
      margin-top: -1px;
      margin-left: -1px;
      padding: 20px;
      .div-input100 {
        display: inline-block;
        width: 100px;
      }
      .left5 {
        margin-left: 5px;
      }
      > div {
        flex: 1;
        > div {
          margin-bottom: 20px;
        }
        > div:last-child {
          margin-bottom: 0;
        }
      }
      .filter-type {
        display: inline-block;
        width: 67px;
        height: 16px;
        color: #a3a3a3;
        font-size: 12px;
        text-align: left;
      }
      .registerDate {
        width: 320px;
        display: flex;
        align-items: center;
        > span {
          // min-width: 100px!important;
        }
        .date-picker {
          width: 120px;
        }
      }
    }
    .enter {
      text-align: right;
      padding: 10px 0;
      padding-right: 30px;
      button {
        margin-right: 10px;
      }
    }
  }
  .member-contenttable {
    .status {
      font-size: 12px;
      color: #ffffff;
      border-radius: 2px;
      padding: 0 4px;
      line-height: 18px;
    }
    .status0 {
      background-color: #ccc;
    }
    .status1 {
      background-color: #16b841;
    }
  }
}
</style>
