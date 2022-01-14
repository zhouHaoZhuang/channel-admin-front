<template>
  <div class="user-info-container">
    <a-form-model :model="form" :label-col="labelCol" :wrapper-col="wrapperCol">
      <a-form-model-item label="姓名">
        <span>{{ nameOrphone }}</span>
      </a-form-model-item>
      <a-form-model-item label="手机">
        <span>{{ nameOrphone }}</span>
      </a-form-model-item>
      <a-form-model-item label="角色">
        <span>{{ form.name }}</span>
      </a-form-model-item>
      <a-form-model-item label="验证手机号">
        <a-input v-model="phone"></a-input>
      </a-form-model-item>
      <a-form-model-item label="验证码">
        <a-input
          v-model="form.code"
          style="width:250px"
          placeholder="输入验证码"
          v-number-evolution
          :max-length="6"
        >
          <a-icon slot="prefix" type="smile" />
        </a-input>
        <CodeBtn :phone="form.phone" />
      </a-form-model-item>
      <a-form-model-item label="新密码">
        <a-input v-model="form.newPassword" type="password" />
      </a-form-model-item>
      <a-form-model-item label="确认密码">
        <a-input v-model="form.newTwoPassword" type="password" />
      </a-form-model-item>
      <a-form-model-item :wrapper-col="{ span: 8, offset: 6 }">
        <a-button type="primary" @click="onSubmit">
          确定
        </a-button>
      </a-form-model-item>
    </a-form-model>
  </div>
</template>

<script>
import { mapState } from "vuex";
import CodeBtn from "@/components/CodeBtn/index";

export default {
  components: { CodeBtn },
  data() {
    return {
      labelCol: { span: 6 },
			phone: "",
      wrapperCol: { span: 8 },
      form: {
        phone: "",
        newPassword: "",
        newTwoPassword: "",
        code: "",
      },
    };
  },
	created() {
		// this.getRoles()
	},
  methods: {
    onSubmit() {
      console.log("submit!", this.form);
      if (this.form.newTwoPassword === this.form.newPassword) {
        this.$store.dispatch("user/changePassword", this.form).then(() => {
          this.$message.success("修改成功");
        });
      } else {
        this.$message.error("两次密码不一致");
      }
    },
		getRoles() {
			this.$store.dispatch("user/getRoleList",{id:this.userInfo.id}).then((val) => {
				console.log("获取角色", val);
			});
		},
    
  },

  computed: {
    ...mapState({
      userInfo: (state) => state.user.userInfo,
    }),
		nameOrphone() {
      return this.userInfo.username?this.userInfo.username.slice(0, 11):"";
    },
  },
};
</script>

<style lang="less" scoped>
.user-info-container {
  background-color: #fff;
  margin: 0 20px;
  padding: 20px;
}
</style>
