<template>
  <a-modal
    :visible="value"
    width="680px"
    centered
    :title="modalTitle"
    wrapClassName="update-admin-container"
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
      <a-form-model-item label="权限名称" prop="code">
        <a-input
          v-model="form.code"
          :disabled="type === 'edit'"
          placeholder="请输入权限名称，填写一个名词，例如：order"
        />
      </a-form-model-item>
      <a-form-model-item label="权限">
        <a-radio-group v-model="form.type">
          <a-radio
            v-for="(value, key) in systemAdminMapEnum"
            :key="key"
            :value="key"
          >
            {{ value }}
          </a-radio>
        </a-radio-group>
      </a-form-model-item>
      <a-form-model-item v-if="form.type === 'API'" label="API URL">
        <a-input v-model="form.description" placeholder="请输入API URL" />
      </a-form-model-item>
      <a-form-model-item label="权限描述">
        <a-input v-model="form.description" placeholder="请输入权限描述" />
      </a-form-model-item>
    </a-form-model>
  </a-modal>
</template>

<script>
import { systemAdminMapEnum } from "@/utils/enum";
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
    // 单个权限详情
    detail: {
      type: Object,
      default: () => {}
    }
  },
  computed: {
    modalTitle() {
      return this.type === "add" ? "添加权限" : "修改权限";
    }
  },
  watch: {
    detail: {
      handler(newVal) {
        if (JSON.stringify(newVal) !== "{}") {
          this.type = "edit";
          this.form = { ...this.detail };
        } else {
          this.type = "add";
        }
      },
      immediate: true
    },
    value: {
      handler(newVal) {
        if (!newVal) {
          this.$nextTick(() => {
            this.resetForm();
          });
        }
      }
    }
  },
  data() {
    return {
      systemAdminMapEnum,
      type: "add",
      labelCol: { span: 6 },
      wrapperCol: { span: 15 },
      loading: false,
      form: {
        code: "",
        type: "DATA",
        description: ""
      },
      rules: {
        code: [
          {
            required: true,
            message: "请输入权限名称",
            tigger: ["blur", "change"]
          }
        ]
      }
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
        code: "",
        type: "DATA",
        description: ""
      };
    },
    // 弹窗提交
    handleOk() {
      this.$refs.ruleForm.validate(valid => {
        if (valid) {
          this.loading = true;
          const req =
            this.type === "add" ? "system/addAdmin" : "system/editAdmin";
          this.$store
            .dispatch(req, this.form)
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
