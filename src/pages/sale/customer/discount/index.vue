<template>
  <div class="member-discount-container">
    <div class="public-header-wrap">
      <a-form-model layout="inline" :model="listQuery">
        <a-form-model-item>
          <a-button
            v-permission="'add'"
            type="primary"
            icon="plus"
            @click="jumpUpdate('add')"
          >
            新增会员折扣
          </a-button>
        </a-form-model-item>
        <a-form-model-item>
          <a-select
            style="width:120px"
            allowClear
            v-model="listQuery.key"
            placeholder="请选择"
          >
            <a-select-option
              v-for="item in columns.slice(0, columns.length - 3)"
              :key="item.dataIndex"
              :value="item.dataIndex"
            >
              {{ item.title }}
            </a-select-option>
          </a-select>
        </a-form-model-item>
        <a-form-model-item>
          <a-input
            v-model="listQuery.search"
            allowClear
            placeholder="搜索关键词"
          />
        </a-form-model-item>
        <a-form-model-item>
          <a-button type="primary" @click="search">
            查询
          </a-button>
        </a-form-model-item>
      </a-form-model>
    </div>
    <div class="public-table-wrap">
      <a-table
        :loading="tableLoading"
        :columns="columns"
        :data-source="data"
        rowKey="id"
        :pagination="paginationProps"
      >
        <span slot="discountType" slot-scope="text">
          {{ memberDiscountType[text] }}
        </span>
        <span slot="action" slot-scope="text, record">
          <a-button
            v-permission="'modify'"
            type="link"
            @click="jumpUpdate('edit', record)"
          >
            编辑
          </a-button>
          <a-divider type="vertical" />
          <a-button v-permission="'del'" type="link" @click="handleDel(record)">
            删除
          </a-button>
        </span>
      </a-table>
    </div>
  </div>
</template>

<script>
import { memberDiscountType } from "@/utils/enum";
export default {
  data() {
    return {
      memberDiscountType,
      listQuery: {
        key: undefined,
        search: "",
        currentPage: 1,
        pageSize: 10,
        total: 0
      },
      columns: [
        {
          title: "会员ID",
          dataIndex: "corporationCode",
          width: 260
        },
        {
          title: "企业名称",
          dataIndex: "corporationName"
        },
        {
          title: "产品",
          dataIndex: "productName"
        },
        {
          title: "折扣方式",
          dataIndex: "discountType",
          scopedSlots: { customRender: "discountType" }
        },
        {
          title: "折扣",
          dataIndex: "discountPrice"
        },
        {
          title: "操作",
          dataIndex: "action",
          fixed: "right",
          scopedSlots: { customRender: "action" }
        }
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
        onShowSizeChange: this.onShowSizeChange
      },
      tableLoading: false
    };
  },
  created() {
    this.getList();
  },
  activated() {
    this.getList();
  },
  methods: {
    // 查询
    search() {
      this.listQuery.currentPage = 1;
      this.getList();
    },
    // 查询表格数据
    getList() {
      this.tableLoading = true;
      this.$getList("member/getDisCountList", this.listQuery)
        .then(res => {
          this.data = [...res.data.list];
          this.paginationProps.total = res.data.totalCount * 1;
        })
        .finally(() => {
          this.tableLoading = false;
        });
    },
    // 表格分页快速跳转n页
    quickJump(currentPage) {
      this.listQuery.currentPage = currentPage;
      this.getList();
    },
    // 表格分页切换每页条数
    onShowSizeChange(current, pageSize) {
      this.listQuery.currentPage = current;
      this.listQuery.pageSize = pageSize;
      this.getList();
    },
    // 删除
    handleDel(record) {
      this.$confirm({
        title: "确认要删除吗？",
        onOk: () => {
          this.$store
            .dispatch("member/delDisCount", { id: record.id })
            .then(res => {
              this.$message.success("删除成功");
              this.getList();
            });
        }
      });
    },
    // 跳转新增/编辑会员折扣
    jumpUpdate(type, record) {
      this.$router.push({
        path: "/sale/customer/update",
        query: {
          updateType: type,
          id: type === "edit" ? record.id : undefined
        }
      });
    }
  }
};
</script>

<style lang="less" scoped>
.member-discount-container {
  background: #fff;
  padding: 20px;
  margin: 0 24px;
  .public-table-wrap {
    .status {
      display: flex;
      align-items: center;
      .dot {
        width: 8px;
        height: 8px;
        border-radius: 50%;
        background: green;
        margin-right: 5px;
      }
      .dot-err {
        background: red;
      }
    }
  }
}
</style>
