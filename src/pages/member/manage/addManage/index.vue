<template>
  <div class="channel-list-add">
    <div class="container">
      <a-form-model
        ref="ruleForm"
        :model="form"
        :rules="rules"
        :label-col="labelCol"
        :wrapper-col="wrapperCol"
      >
        <a-form-model-item label="所属会员组" prop="cutomerName">
          <a-select
            v-model="form.cutomerName"
            placeholder="please select your zone"
          >
            <a-select-option value="shanghai">
              原CPS分销组
            </a-select-option>
            <a-select-option value="beijing">
              普通会员
            </a-select-option>
          </a-select>
        </a-form-model-item>
        <a-form-model-item label="手机号码" prop="shortName">
          <a-input v-model="form.shortName" />
        </a-form-model-item>
        <a-form-model-item label="邮箱" prop="shortName">
          <a-input v-model="form.shortName" />
        </a-form-model-item>
        <a-form-model-item label="姓名" prop="shortName">
          <a-input v-model="form.shortName" />
        </a-form-model-item>
        <a-form-model-item label="密码" prop="shortName">
          <a-input v-model="form.shortName" />
        </a-form-model-item>
        <a-form-model-item label="安全提问1">
          <a-select
            v-model="form.addressProject"
            placeholder="please select your zone"
          >
            <a-select-option value="shanghai">
              你的学号是？
            </a-select-option>
            <a-select-option value="beijing">
              你父亲的名字是？
            </a-select-option>
            <a-select-option value="beijing">
              你母亲的名字是？
            </a-select-option>
            <a-select-option value="beijing">
              你的出生年月是？
            </a-select-option>
          </a-select>
        </a-form-model-item>
        <a-form-model-item label="安全回答1">
          <a-input v-model="form.contract" />
        </a-form-model-item>
        <a-form-model-item label="安全提问2">
          <a-select
            v-model="form.addressProject"
            placeholder="please select your zone"
          >
            <a-select-option value="shanghai">
              你的学号是？
            </a-select-option>
            <a-select-option value="beijing">
              你父亲的名字是？
            </a-select-option>
            <a-select-option value="beijing">
              你母亲的名字是？
            </a-select-option>
            <a-select-option value="beijing">
              你的出生年月是？
            </a-select-option>
          </a-select>
        </a-form-model-item>
        <a-form-model-item label="安全回答2">
          <a-input v-model="form.contract" />
        </a-form-model-item>
        <a-form-model-item label="安全提问3">
          <a-select
            v-model="form.addressProject"
            placeholder="please select your zone"
          >
            <a-select-option value="shanghai">
              你的学号是？
            </a-select-option>
            <a-select-option value="beijing">
              你父亲的名字是？
            </a-select-option>
            <a-select-option value="beijing">
              你母亲的名字是？
            </a-select-option>
            <a-select-option value="beijing">
              你的出生年月是？
            </a-select-option>
          </a-select>
        </a-form-model-item>
        <a-form-model-item label="安全回答3">
          <a-input v-model="form.contract" />
        </a-form-model-item>
        <a-form-model-item label="QQ号码">
          <a-input v-model="form.number" />
        </a-form-model-item>
        <div class="divider">
          <a-divider />
        </div>
        <div>后台操作保护</div>
        <a-form-model-item label="密码">
          <a-input-password v-model="form.description" />
        </a-form-model-item>
        <a-form-model-item :wrapper-col="{ span: 18, offset: 8 }">
          <a-button  type="primary" @click="onSubmit" :loading="loading">
            提交
          </a-button>
        </a-form-model-item>
      </a-form-model>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      labelCol: { span: 8 },
      wrapperCol: { span: 10 },
      form: {
        cutomerName: "",
        shortName: "",
        addressProject: "",
        contract: "",
        number: "",
        description: ""
      },
      rules: {
        cutomerName: [
          {
            required: true,
            message: "请输入渠道商全称",
            trigger: "blur"
          }
        ],
        shortName: [
          {
            required: true,
            message: "请输入简称",
            trigger: "blur"
          }
        ]
      },
      loading: false
    };
  },
  activated() {
    this.resetForm();
  },
  methods: {
    // 提交
    onSubmit() {
      this.$refs.ruleForm.validate(valid => {
        if (valid) {
          this.loading = true;
          this.$store
            .dispatch("channel/add", this.form)
            .then(res => {
              this.$message.success("新增渠道成功");
              this.resetForm();
              this.$router.back();
            })
            .finally(() => {
              this.loading = false;
            });
        }
      });
    },
    // 重置表单数据
    resetForm() {
      this.$refs.ruleForm.clearValidate();
      this.form = {
        cutomerName: "",
        shortName: "",
        addressProject: "",
        contract: "",
        number: "",
        description: ""
      };
    }
  }
};
</script>

<style lang="less" scoped>
.channel-list-add {
  background: #fff;
  padding: 24px;
  display: flex;
  justify-content: center;
  .container {
    width: 100%;
  }
  .divider{
    .ant-divider{
      background: #ebebeb!important;
    }
  }
}
</style>
