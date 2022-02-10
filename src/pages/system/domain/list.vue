<template>
  <div class="domain-container">
    <div class="btn-head">
      <a-button
        v-permission="'add'"
        type="primary"
        icon="plus"
        class="btn"
        @click="handleAddDomain"
      >
        新增域名
      </a-button>
    </div>
    <div class="table-content">
      <a-table
        :loading="tableLoading"
        :columns="columns"
        :data-source="data"
        rowKey="id"
        :pagination="paginationProps"
      >
        <div class="status" slot="status">
          正常
          <a-button class="txt-btn" type="link" @click="handleCourse">
            如何设置解析
          </a-button>
          <a-button class="txt-btn" type="link" @click="handleVerifyDomain">
            请验证域名
          </a-button>
        </div>
        <div slot="action" slot-scope="text, record">
          <a-button
            v-permission="'del'"
            type="link"
            @click="handleDelDomain(record)"
          >
            删除
          </a-button>
        </div>
      </a-table>
    </div>
    <!-- 添加域名弹窗 -->
    <AddDomain v-model="addDomainVisible" @success="getList" />
    <!-- 验证域名弹窗 -->
    <VerifyDomain
      v-model="verifyDomainVisible"
      :detail="modalDetail"
      @success="verifyCallBack"
    />
    <!-- 验证域名结果弹窗 -->
    <VerifyResult
      v-model="verifyDomainResultVisible"
      :detail="modalDetail"
      :type="verifyResultType"
    />
    <!-- 如何设置解析弹窗 -->
    <CourseModal v-model="courseVisible" />
  </div>
</template>

<script>
import AddDomain from "@/components/System/domain/addDomain.vue";
import VerifyDomain from "@/components/System/domain/verifyDomain.vue";
import VerifyResult from "@/components/System/domain/verifyResult.vue";
import CourseModal from "@/components/System/domain/courseModal.vue";
export default {
  components: {
    AddDomain,
    VerifyDomain,
    VerifyResult,
    CourseModal
  },
  data() {
    return {
      listQuery: {
        currentPage: 1,
        pageSize: 10,
        total: 0
      },
      tableLoading: false,
      columns: [
        {
          title: "域名",
          dataIndex: "id"
        },
        {
          title: "CNAME状态",
          dataIndex: "bannerType",
          scopedSlots: { customRender: "bannerType" }
        },
        {
          title: "解析类型",
          dataIndex: "title"
        },
        {
          title: "解析记录值",
          dataIndex: "describe"
        },
        {
          title: "CDN状态",
          dataIndex: "status",
          scopedSlots: { customRender: "status" }
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
      // 新增域名弹窗
      addDomainVisible: false,
      // 域名验证弹窗
      verifyDomainVisible: false,
      // 域名验证结果弹窗
      verifyDomainResultVisible: false,
      verifyResultType: "success",
      modalDetail: {},
      // 如何设置解析弹窗
      courseVisible: false
    };
  },
  activated() {
    this.getList();
  },
  methods: {
    //查询列表
    getList() {
      this.tableLoading = true;
      this.$store
        .dispatch("banner/getList", this.listQuery)
        .then(res => {
          this.data = [...res.data.list];
        })
        .finally(() => {
          this.tableLoading = false;
        });
    },
    //表格分页跳转
    quickJump(currentPage) {
      this.listQuery.currentPage = currentPage;
      this.getList();
    },
    //表格分页切换每页条数
    onShowSizeChange(current, pageSize) {
      this.listQuery.currentPage = current;
      this.listQuery.pageSize = pageSize;
      this.getList();
    },
    // 新增域名
    handleAddDomain() {
      this.addDomainVisible = true;
    },
    // 验证域名
    handleVerifyDomain(record) {
      this.modalDetail = { ...record };
      this.verifyDomainVisible = true;
    },
    // 验证域名回调
    verifyCallBack(type) {
      this.verifyResultType = type;
      this.verifyDomainResultVisible = true;
    },
    // 如何设置域名
    handleCourse() {
      this.courseVisible = true;
    },
    //删除
    handleDelDomain(record) {
      this.$confirm({
        title: "确定要删除吗?",
        onOk: () => {
          this.$store.dispatch("banner/delPrice", record.id).then(res => {
            this.$message.success("操作成功");
            this.getList();
          });
        }
      });
    }
  }
};
</script>

<style lang="less" scoped>
.domain-container {
  margin: 0 20px;
  padding: 10px;
  background-color: #fff;
  .btn-head {
    display: flex;
    margin-top: 15px;
    margin-left: 15px;
    margin-bottom: 25px;
    .btn {
      margin-right: 12px;
    }
  }
  .table-content {
    .txt-btn {
      padding-top: 0;
      padding-bottom: 0;
    }
  }
}
</style>
