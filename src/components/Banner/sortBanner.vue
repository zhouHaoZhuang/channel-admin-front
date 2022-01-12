<template>
  <a-modal
    :visible="value"
    width="680px"
    centered
    title="排序"
    wrapClassName="public-sort-container"
    okText="确定"
    :confirmLoading="loading"
    @ok="handleOk"
    @cancel="handleCancel"
  >
    <a-form-model
      ref="ruleForm"
      :label-col="labelCol"
      :wrapper-col="wrapperCol"
    >
      <a-form-model-item label="排序">
        <a-spin :spinning="tableLoading">
          <div class="sort-list">
            <div
              v-for="(item, index) in data"
              :key="item.id"
              :class="selectId === item.id ? 'item active' : 'item'"
              @click="handleSelect(item.id)"
            >
              {{ index + 1 }}、
              {{ item.title }}
            </div>
          </div>
        </a-spin>
      </a-form-model-item>
      <a-form-model-item label="操作">
        <a-space>
          <a-button type="primary" @click="handleMoveFirst">移至第一</a-button>
          <a-button type="primary" @click="handleMoveUp">上移</a-button>
          <a-button type="primary" @click="handleMoveDown">下移</a-button>
          <a-button type="primary" @click="handleMoveLast">移至最后</a-button>
        </a-space>
      </a-form-model-item>
    </a-form-model>
  </a-modal>
</template>

<script>
export default {
  // 双向绑定
  model: {
    event: "changeVisible",
    prop: "value"
  },
  props: {
    // 组件传递的值
    value: {
      type: Boolean,
      default: false
    }
  },
  watch: {
    value: {
      handler(newVal) {
        if (newVal) {
          this.getList();
        }
      }
    }
  },
  data() {
    return {
      labelCol: { span: 6 },
      wrapperCol: { span: 15 },
      loading: false,
      listQuery: {
        currentPage: 1,
        pageSize: 999,
        sorter: "asc-sort"
      },
      data: [],
      tableLoading: false,
      selectId: ""
    };
  },
  methods: {
    // 关闭弹窗
    handleCancel() {
      this.$emit("changeVisible", false);
    },
    // 弹窗提交
    handleOk() {
      this.loading = true;
      const data = this.data.map((ele, index) => {
        return {
          id: ele.id,
          sort: index
        };
      });
      this.$store
        .dispatch("banner/bannerSort", data)
        .then(res => {
          this.$message.success("排序成功");
          this.$emit("success");
          this.$emit("changeVisible", false);
        })
        .finally(() => {
          this.loading = false;
        });
    },
    //查询轮播图数据
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
    // 列表选中单个
    handleSelect(id) {
      this.selectId = id;
    },
    tempData() {
      return this.data.find(ele => ele.id === this.selectId);
    },
    tempIndex() {
      return this.data.findIndex(ele => ele.id === this.selectId);
    },
    // 移至第一
    handleMoveFirst() {
      const index = this.tempIndex();
      const tempData = this.tempData();
      this.data.splice(index, 1);
      this.data.unshift(tempData);
    },
    // 上移
    handleMoveUp() {
      const index = this.tempIndex();
      const tempData = this.tempData();
      const preIndex = index - 1;
      if (preIndex >= 0) {
        this.data.splice(index, 1);
        this.data.splice(preIndex, 0, tempData);
      }
    },
    // 下移
    handleMoveDown() {
      const index = this.tempIndex();
      const tempData = this.tempData();
      const nextIndex = index + 1;
      if (nextIndex < this.data.length) {
        this.data.splice(index, 1);
        this.data.splice(nextIndex, 0, tempData);
      }
    },
    // 移至最后
    handleMoveLast() {
      const index = this.tempIndex();
      const tempData = this.tempData();
      this.data.splice(index, 1);
      this.data.push(tempData);
    }
  }
};
</script>
<style lang="less" scoped>
.sort-list {
  height: 250px;
  padding: 5px 3px;
  padding-left: 10px;
  border: 1px solid #ddd;
  border-radius: 2px;
  overflow-y: auto;
  .item {
    line-height: 25px;
    cursor: pointer;
    padding-left: 6px;
  }
  .active {
    background: rgb(153, 200, 255);
    color: #fff;
  }
}
</style>
