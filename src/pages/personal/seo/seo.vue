<template>
  <div class="seo-container">
    <div class="btn-head">
      <a-select
        default-value="CODE"
        style="width: 120px"
        @change="handleChange"
      >
        <a-select-option value="CODE">
          CODE
        </a-select-option>
        <a-select-option value="名称">
          名称
        </a-select-option>
      </a-select>
      <div class="sechkey">
        <a-input
          :disabled="!isTime"
          placeholder="搜索关键词"
          v-model="listQuery.search"
        />
      </div>
      <a-button type="primary" @click="secectClick" class="btn">
        查询
      </a-button>
    </div>
    <div class="table-content">
      <a-table :columns="columns" :data-source="data">
        <a slot="name" slot-scope="text">{{ text }}</a>
        <span slot="action" slot-scope="">
          <a-button type="link" @click="updatePrice()">
            编辑
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
      listQuery: {
        key: undefined,
        search: "",
        currentPage: 1,
        pageSize: 10,
        total: 0
      },
      columns: [
        {
          title: "ID",
          dataIndex: "name",
          scopedSlots: { customRender: "name" }
        },
        {
          title: "CODE",
          dataIndex: "age"
        },
        {
          title: "名称",
          dataIndex: "address"
        },
        {
          title: "标题",
          dataIndex: ""
        },
        {
          title: "关键字",
          dataIndex: ""
        },
        {
          title: "描述",
          dataIndex: ""
        },
        {
          title: "更新时间",
          dataIndex: ""
        },
        {
          title: "操作",
          key: "action",
          fixed: "right",
          scopedSlots: { customRender: "action" }
        },
      ],
      data: [
        {
          key: "1",
          name: "John Brown",
          age: 32,
          address: "New York No. 1 Lake Park"
        },
        {
          key: "2",
          name: "Jim Green",
          age: 42,
          address: "London No. 1 Lake Park"
        },
        {
          key: "3",
          name: "Joe Black",
          age: 32,
          address: "Sidney No. 1 Lake Park"
        },
        {
          key: "4",
          name: "Disabled User",
          age: 99,
          address: "Sidney No. 1 Lake Park"
        }
      ],
      isTime: true
    };
  },
  methods: {
    handleChange(value) {
      console.log(`selected ${value}`);
    },
    secectClick() {
      this.listQuery.key = this.title;
      if (this.title == "createTime") {
        let startTime = this.startValue._d
          .toLocaleString("chinese", { hour12: false })
          .replaceAll("/", "-");
        let endTime = this.endValue._d
          .toLocaleString("chinese", { hour12: false })
          .replaceAll("/", "-");
        // console.log(this.title, this.search, startTime, endTime);
        this.$store
          .dispatch("financialOrder/selectList", {
            startTime,
            endTime
          })
          .then(val => {
            // console.log(val, "时间请求结果");
            this.paginationProps.total = val.data.totalCount * 1;
            this.paginationProps.current = val.data.currentPage * 1;
            this.dataAll = val.data.list;
            this.data = this.dataAll.slice(0, this.paginationProps.pageSize);
          });
      } else {
        // this.$getListQp(this.title, this.search, this.startValue, this.endValue);
        let tempSearch = this.listQuery.search;
        if (this.title == "tradeType") {
          if (this.listQuery.search == "销售") {
            this.listQuery.search = 5;
          }
          if (this.listQuery.search == "采购") {
            this.listQuery.search = 1;
          }
        }
        if (this.title == "payStatus") {
          if (this.listQuery.search == "支付") {
            this.listQuery.search = 1;
          }
          if (this.listQuery.search == "未支付") {
            this.listQuery.search = 0;
          }
        }
        this.$getListQp("financialOrder/getList", this.listQuery).then(val => {
          // console.log(val, "时间请求结果");
          this.paginationProps.total = val.data.totalCount * 1;
          this.paginationProps.current = val.data.currentPage * 1;
          this.dataAll = val.data.list;
          this.data = this.dataAll.slice(0, this.paginationProps.pageSize);
          this.listQuery.search = tempSearch;
        });
      }
    },
    changeKey(val) {
      // console.log(val);
      this.title = val;
      if (this.title !== "createTime") {
        this.isTime = true;
      } else {
        this.isTime = false;
      }
    },
    //编辑
    updatePrice(){
      this.$router.push("/personal/account/amend-seo")
    }
  }
};
</script>

<style lang="less" scoped>
.seo-container {
  margin: 0 20px;
  padding: 10px;
  background-color: #fff;
  .btn-head {
    display: flex;
    margin-top: 15px;
    margin-left: 15px;
    margin-bottom: 25px;
    .sechkey {
      width: 200px;
      margin-left: 12px;
    }
    .btn {
      margin-left: 12px;
    }
  }
}
</style>
