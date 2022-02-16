<template>
  <div class="mouldboard-container">
    <a-form-model
      :model="form"
      :label-col="labelCol"
      :wrapper-col="wrapperCol"
      :rules="rules"
      ref="ruleForm"
    >
      <a-form-model-item label="模板">
        <span>会员</span>
      </a-form-model-item>
      <a-form-model-item label="场景">
        <span>找回密码成功提醒</span>
      </a-form-model-item>
      <a-form-model-item label="模板标识码">
        <span>getPasswordSuccess</span>
      </a-form-model-item>
      <a-form-model-item label="可用标签">
        <a-table
          :columns="columns"
          :data-source="data"
          bordered
          :pagination="false"
          rowKey="id"
        >
        </a-table>
      </a-form-model-item>
      <a-form-model-item label="内容" prop="context">
        <Tinymce @tinymceinput="tinymceinput" :tinyvalue="form.context" />
      </a-form-model-item>
      <a-form-model-item :wrapper-col="{ span: 9, offset: 5 }">
        <a-button type="primary" @click="onSubmit">
          确定
        </a-button>
      </a-form-model-item>
    </a-form-model>
  </div>
</template>

<script>
import Tinymce from "@/components/Tinymce/index.vue";

export default {
  data() {
    return {
      labelCol: { span: 5 },
      wrapperCol: { span: 9 },
      form: {
        context: ""
      },
      data: [
        {
          id: 1,
          label: "网站名称",
          type: "{firmName}"
        },
        {
          id: 2,
          label: "网站地址",
          type: "{firmUrl}"
        },
        {
          id: 3,
          label: "服务热线",
          type: "{firmPhone}"
        }
      ],
      columns: [
        {
          title: "标签",
          dataIndex: "label",
          key: "label"
        },
        {
          title: "说明",
          dataIndex: "type",
          key: "type"
        }
      ],
      rules: {
        context: [
          {
            required: true,
            trigger: ["change", "blur"],
            message: "必填，请输入模板内容"
          }
        ]
      }
    };
  },
  components: {
    Tinymce
  },
  activated() {
    this.resetForm();
  },
  methods: {
    //上传富文本
    tinymceinput(value) {
      this.form.context = value;
    },
    onSubmit() {
      this.$refs.ruleForm.validate(valid => {
        if (valid) {
          console.log(this.form.context);
          this.$message.success("提交成功");
          this.resetForm();
          this.$router.back();
        }
      });
    },
    resetForm() {
      this.form.context = "";
    }
  }
};
</script>

<style lang="less" scoped>
.mouldboard-container {
  margin: 0 20px;
  padding: 20px;
  background-color: #fff;
}
</style>
