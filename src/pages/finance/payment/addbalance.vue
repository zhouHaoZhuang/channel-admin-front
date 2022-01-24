<template>
  <div class="add-balance-container">
    <a-form-model :model="form" :label-col="labelCol" :wrapper-col="wrapperCol">
      <a-form-model-item
        label="会员ID/会员手机号码："
        :wrapper-col="{ span: 5 }"
      >
        <!-- <a-input v-model="form.applyUserCode" /> -->
        <a-select
          show-search
          option-filter-prop="children"
          style="width: 300px"
          :filter-option="filterOption"
          @change="handleChange"
        >
          <a-select-option
            v-for="(item, index) in vipList"
            :value="item"
            :key="index"
          >
            {{ item }}
          </a-select-option>
        </a-select>
        <div class="annotation">
          注：仅支持单个账号
        </div>
      </a-form-model-item>
      <a-form-model-item label="款项类型" :wrapper-col="{ span: 6 }">
        <a-select v-model="form.accountType" placeholder="请选择">
          <a-select-option
            v-for="(item, val) in paymentTypeMapData"
            :value="val"
            :key="val"
          >
            {{ item }}
          </a-select-option>
        </a-select>
      </a-form-model-item>
      <a-form-model-item label="入(扣)款金额" :wrapper-col="{ span: 5 }">
        <div class="deposit">
          <a-input v-model="form.amount" />
          <span class="yuan">元</span>
        </div>
        <div class="annotation">
          注：入款的金额，正数为入款，负数为扣款
        </div>
      </a-form-model-item>
      <a-form-model-item label="入款备注说明">
        <a-input v-model="form.memo" type="textarea" />
        <div class="annotation">
          注：详细填写备注
        </div>
      </a-form-model-item>
      <a-form-model-item label="入款凭证上传">
        <Upload :defaultFile="form.voucher" @change="imgList"></Upload>
      </a-form-model-item>
      <hr />
      后台操作保护
      <a-form-model-item label="管理员密码">
        <a-input v-model="password" type="password" />
      </a-form-model-item>
      <a-form-model-item :wrapper-col="{ span: 18, offset: 8 }">
        <a-button
          v-permission="'modify-balance'"
          type="primary"
          @click="onSubmit"
        >
          提交
        </a-button>
      </a-form-model-item>
    </a-form-model>
  </div>
</template>

<script>
import Upload from "@/components/Upload/index.vue";
import { paymentTypeMapData } from "@/utils/enum";
export default {
  components: {
    Upload
  },
  data() {
    return {
      form: {
        applyUserCode: "",
        accountType: "",
        amount: "",
        memo: "",
        voucher: "",
        status: 0
      },
      password: "",
      paymentTypeMapData,
      labelCol: {
        span: 8
      },
      wrapperCol: {
        span: 10
      },
      vipList: []
    };
  },
  activated() {
    this.getVipList();
  },
  methods: {
    getVipList() {
      this.$store.dispatch("manualDeposit/getVipList").then(res => {
        console.log(res);
        this.vipList = res.data;
      });
    },
    imgList({ urlList, firstImageUrl }) {
      // console.log(urlList, firstImageUrl);
      this.form.voucher = urlList.toString();
    },
    onSubmit() {
      this.$store
        .dispatch("manualDeposit/addList", this.form)
        .then(res => {
          this.$message.success("操作成功");
        })
        .catch(() => {
          this.$message.error("操作失败，请检查表单数据");
        });
    },
    handleChange(value) {
      this.form.applyUserCode = value;
    },
    filterOption(input, option) {
      return (
        option.componentOptions.children[0].text
          .toLowerCase()
          .indexOf(input.toLowerCase()) >= 0
      );
    }
  }
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
