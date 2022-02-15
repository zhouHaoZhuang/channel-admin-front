<template>
  <a-modal
    :visible="value"
    width="680px"
    centered
    :title="modalTitle"
    wrapClassName="type-update-container"
    okText="确定"
    :confirmLoading="loading"
    @ok="handleOk"
    @cancel="handleCancel"
  >
    <a-form-model
      ref="ruleForm"
      :model="form"
      :rules="rules"
      :label-col="labelCol"
      :wrapper-col="wrapperCol"
    >
      <a-form-model-item label="名称" prop="name">
        <a-input
          v-model="form.name"
          placeholder="请输入名称"
          :max-length="100"
        />
      </a-form-model-item>
      <a-form-model-item label="分类介绍" prop="context">
        <a-input
          v-model="form.context"
          placeholder="请输入内容"
          :max-length="100"
        />
      </a-form-model-item>
      <a-form-model-item label="所属分组" prop="context">
        <a-input
          v-model="form.context"
          placeholder="请输入内容"
          :max-length="100"
        />
      </a-form-model-item>
      <a-form-model-item label="工单类型" prop="context">
        <a-input
          v-model="form.context"
          placeholder="请输入内容"
          :max-length="100"
        />
      </a-form-model-item>
      <a-form-model-item label="ICON图标" prop="context">
        <a-input
          v-model="form.context"
          placeholder="请输入内容"
          :max-length="100"
        />
      </a-form-model-item>
      <a-form-model-item label="排序" prop="sort">
        <a-input
          v-model="form.sort"
          placeholder="请输入排序"
          v-number-evolution
          :max-length="6"
        />
      </a-form-model-item>
      <a-form-model-item label="状态" prop="status">
        <a-radio-group v-model="form.status">
          <a-radio :value="1">
            启用
          </a-radio>
          <a-radio :value="0">
            禁用
          </a-radio>
        </a-radio-group>
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
    },
    // id
    id: {
      type: [String, Number, undefined],
      default: undefined
    }
  },
  computed: {
    modalTitle() {
      return !this.id ? "添加工单分类" : "修改工单分类";
    }
  },
  watch: {
    value: {
      handler(newVal) {
        if (!newVal) {
          this.$nextTick(() => {
            this.resetForm();
          });
        }
      }
    },
    id: {
      handler(newVal) {
        if (newVal) {
          this.getDetail();
        }
      },
      immediate: true
    }
  },
  data() {
    return {
      labelCol: { span: 6 },
      wrapperCol: { span: 15 },
      form: {
        context: "",
        sort: 0,
        status: 0
      },
      rules: {
        context: [
          {
            required: true,
            message: "请输入内容",
            trigger: ["blur", "change"]
          }
        ],
        sort: [
          {
            required: true,
            message: "请输入排序",
            trigger: ["blur", "change"]
          }
        ],
        status: [
          {
            required: true,
            message: "请选择状态",
            trigger: "change"
          }
        ]
      },
      loading: false
    };
  },
  methods: {
    // 关闭弹窗
    handleCancel() {
      this.$emit("changeVisible", false);
    },
    // 重置表单数据
    resetForm() {
      this.$refs.ruleForm.clearValidate();
      this.form = {
        context: "",
        sort: 0,
        status: 0
      };
    },
    // 获取单个模板详情
    getDetail() {
      this.$store
        .dispatch("workorder/workOrderTypeDetail", { id: this.id })
        .then(res => {
          this.form = { ...res.data };
        });
    },
    // 弹窗提交
    handleOk() {
      this.$refs.ruleForm.validate(valid => {
        if (valid) {
          this.loading = true;
          const req =
            this.id === undefined
              ? "workorder/addWorkOrderType"
              : "workorder/editWorkOrderType";
          const data = {
            ...this.form,
            id: this.id
          };
          this.$store
            .dispatch(req, data)
            .then(res => {
              this.$message.success(this.modalTitle + "成功");
              this.$emit("success");
              this.$emit("changeVisible", false);
            })
            .finally(() => {
              this.loading = false;
            });
        }
      });
    }
  }
};
</script>
<style lang="less" scoped></style>
