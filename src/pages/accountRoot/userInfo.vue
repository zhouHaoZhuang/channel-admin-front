<template>
  <div class="user-info-container">
    <a-form-model :model="form" :label-col="labelCol" :wrapper-col="wrapperCol">
      <a-form-model-item label="工号">
        <span>{{ userInfo.userPoolId }}</span>
      </a-form-model-item>
      <a-form-model-item label="姓名">
        <span>{{ this.nameOrphone() }}</span>
      </a-form-model-item>
      <a-form-model-item label="角色权限">
        <span>{{ userInfo.name }}</span>
      </a-form-model-item>
      <a-form-model-item label="手机">
        <span>{{ this.nameOrphone() }}</span>
      </a-form-model-item>
    </a-form-model>
  </div>
</template>

<script>
import { mapState } from "vuex";
export default {
  data() {
    return {
      labelCol: { span: 4 },
      wrapperCol: { span: 14 },
      form: {
        name: "",
      },
    };
  },
  created() {
    console.log("userInfo", this.userInfo);
  },
  methods: {
    nameOrphone() {
      return this.userInfo.username.slice(0, 11);
    },
  },
  computed: {
    ...mapState({
      userInfo: (state) => state.user.userInfo,
    }),
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
