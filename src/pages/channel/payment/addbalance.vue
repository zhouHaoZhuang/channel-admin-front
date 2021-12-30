<template>
  <div class="add-balance-container">
    <a-form-model :model="form" :label-col="labelCol" :wrapper-col="wrapperCol">
      <a-form-model-item
        label="会员ID/会员手机号码："
        :wrapper-col="{ span: 5 }"
      >
        <a-input v-model="form.name" />
        <div class="annotation">
          注：仅支持单个账号
        </div>
      </a-form-model-item>
      <a-form-model-item label="款项类型" :wrapper-col="{ span: 6 }">
        <a-select v-model="form.region" placeholder="请选择">
          <a-select-option value="shanghai">
            虚拟入款
          </a-select-option>
          <a-select-option value="beijing">
            充值
          </a-select-option>
        </a-select>
      </a-form-model-item>
      <a-form-model-item label="入(扣)款金额" :wrapper-col="{ span: 5 }">
        <div class="deposit">
          <a-input v-model="form.name" />
          <span class="yuan">元</span>
        </div>
        <div class="annotation">
          注：入款的金额，正数为入款，负数为扣款
        </div>
      </a-form-model-item>
      <a-form-model-item label="入款备注说明">
        <a-input v-model="form.name" type="textarea" />
        <div class="annotation">
          注：详细填写备注
        </div>
      </a-form-model-item>
      <a-form-model-item label="入款凭证上传">
        <Upload :defaultFile="form.websitieIcon" @change="imgList"></Upload>
      </a-form-model-item>
      <hr />
      后台操作保护
      <a-form-model-item label="管理员密码">
        <a-input v-model="form.password" type="password" />
      </a-form-model-item>
      <a-form-model-item :wrapper-col="{ span: 18, offset: 8 }">
        <a-button type="primary" @click="onSubmit">
          提交
        </a-button>
      </a-form-model-item>
    </a-form-model>
  </div>
</template>

<script>
import Upload from "@/components/Upload/index.vue";
export default {
  components: {
    Upload,
  },
  data() {
    return {
      form: {
        name: "",
        region: "",
        websitieIcon: "",
      },
      labelCol: {
        span: 8,
      },
      wrapperCol: {
        span: 10,
      },
    };
  },
  methods: {
    imgList({ urlList, firstImageUrl }) {
      console.log(urlList, firstImageUrl);
    },
    onSubmit() {
      console.log(this.form);
    },
  },
};
</script>

<style lang="less" scoped>
.add-balance-container {
  margin: 10px;
  padding: 10px;
  background-color: #fff;
}
.deposit {
  display: flex;
  align-items: center;
  .yuan {
    margin-left: 10px;
  }
}
.annotation {
  font-size: 12px;
}
</style>
