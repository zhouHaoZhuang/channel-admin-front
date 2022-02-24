<template>
  <div class="mouldboard-container">
    <a-form-model
      :model="form"
      :label-col="labelCol"
      :wrapper-col="wrapperCol"
      :rules="rules"
      ref="ruleForm"
    >
      <!-- <a-form-model-item label="模板">
        <span>{{form.templateName}}</span>
      </a-form-model-item> -->
      <a-form-model-item label="场景">
        <span>{{ form.templateName }}</span>
      </a-form-model-item>
      <a-form-model-item label="模板标识码">
        <span>{{ form.code }}</span>
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
      <a-form-model-item label="内容">
        <span>{{ form.content }}</span>
      </a-form-model-item>
    </a-form-model>
  </div>
</template>

<script>
export default {
  data() {
    return {
      labelCol: { span: 5 },
      wrapperCol: { span: 9 },
      form: {
        context: "",
        templateName: "",
        code: ""
      },
      data: [],
      columns: [
        {
          title: "标签",
          dataIndex: "paramDesc",
          key: "label"
        },
        {
          title: "说明",
          dataIndex: "paramCode",
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

  activated() {
    this.getData();
  },
  deactivated() {
    this.resetForm();
  },
  methods: {
    getData() {
      let data = {
        templateCode: this.$route.query.templateCode,
        templateType: this.$route.query.templateType
      };
      this.$store.dispatch("notice/getDisCountDetail", data).then(res => {
        console.log(res, "------------");
        this.form = res.data;
        this.data = res.data.messageParamResDtoList;
      });
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
      this.form = {
        context: "",
        templateName: "",
        code: ""
      };
      this.data = [];
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
