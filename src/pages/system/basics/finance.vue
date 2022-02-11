<template>
  <div class="member-container">
    <div class="content">
      <a-collapse default-active-key="1" :bordered="false" class="aa">
        <a-collapse-panel key="1" header="发票">
          <a-form-model
            ref="ruleForm"
            :model="form"
            :rules="rules"
            :label-col="labelCol"
            :wrapper-col="wrapperCol"
          >
            <a-form-model-item label="开启申请" prop = 'linkName'>
              <a-radio-group v-model="form.status">
                <a-radio :value="0">
                  开启
                </a-radio>
                <a-radio :value="1">
                  关闭
                </a-radio>
              </a-radio-group>
            </a-form-model-item>
            <a-form-model-item label="是否支持电子发票">
              <a-radio-group v-model="form.status">
                <a-radio :value="0">
                  是
                </a-radio>
                <a-radio :value="1">
                  否
                </a-radio>
              </a-radio-group>
            </a-form-model-item>
            <a-form-model-item label="是否支持纸质发票">
              <a-radio-group v-model="form.status">
                <a-radio :value="0">
                  是
                </a-radio>
                <a-radio :value="1">
                  否
                </a-radio>
              </a-radio-group>
            </a-form-model-item>
            <a-form-model-item label="发票申请时间限制" prop = 'linkName'>
              <a-input suffix="月" />
            </a-form-model-item>
            <a-form-model-item label="发票手续费" prop = 'linkName'>
              <a-input suffix="%" />
            </a-form-model-item>
            <a-form-model-item label="发票邮费" prop = 'linkName'>
              <a-input suffix="元" />
            </a-form-model-item>
            <a-form-model-item label="发票满指定金额免邮费" prop = 'linkName'>
              <a-input suffix="元" />
            </a-form-model-item>
            <a-form-model-item label="开票需实名" prop = 'linkName'>
              <a-radio-group v-model="form.status">
                <a-radio :value="0">
                  是
                </a-radio>
                <a-radio :value="1">
                  否
                </a-radio>
              </a-radio-group>
            </a-form-model-item>
          </a-form-model>
        </a-collapse-panel>
        <a-collapse-panel key="2" header="退款">
          <a-form-model
            ref="ruleForm"
            :model="form"
            :rules="rules"
            :label-col="labelCol"
            :wrapper-col="wrapperCol"
          >
            <a-form-model-item label="开启退款" prop = 'linkName'>
              <a-radio-group v-model="form.status">
                <a-radio :value="0">
                  开启
                </a-radio>
                <a-radio :value="1">
                  关闭
                </a-radio>
              </a-radio-group>
            </a-form-model-item>
            <a-form-model-item label="云服务器退款限制" prop = 'linkName'>
              <a-input suffix="天内的服务器" />
            </a-form-model-item>
            <a-form-model-item label="退款次数限制" prop="linkName">
              <a-row type="flex" justify="start">
                <a-col>
                  <div class="gutter-box">云服务器:</div>
                </a-col>
                <a-col>
                  <a-input
                    style="width: 100px"
                    class="gutter-box"
                    v-model="form.linkName"
                  />
                </a-col>
                <a-col>
                  <div class="gutter-box">次，虚拟主机:</div>
                </a-col>
                <a-col>
                  <a-input
                    style="width: 100px"
                    class="gutter-box"
                    v-model="form.linkName"
                  />
                </a-col>
                <a-col>
                  <div class="gutter-box">次,托管:</div>
                </a-col>
                <a-col>
                  <a-input
                    style="width: 100px"
                    class="gutter-box"
                    v-model="form.linkName"
                  />
                </a-col>
                <a-col>
                  <div class="gutter-box">次</div>
                </a-col>
              </a-row>
              <a-row type="flex" justify="start">
                <a-col>
                  <div class="gutter-box">负载均衡:</div>
                </a-col>
                <a-col>
                  <a-input
                    style="width: 100px"
                    class="gutter-box"
                    v-model="form.linkName"
                  />
                </a-col>
                <a-col>
                  <div class="gutter-box">次，裸金属:</div>
                </a-col>
                <a-col>
                  <a-input
                    style="width: 100px"
                    class="gutter-box"
                    v-model="form.linkName"
                  />
                </a-col>
                <a-col>
                  <div class="gutter-box">次,云数据库:</div>
                </a-col>
                <a-col>
                  <a-input
                    style="width: 100px"
                    class="gutter-box"
                    v-model="form.linkName"
                  />
                </a-col>
                <a-col>
                  <div>次</div>
                </a-col>
              </a-row>
            </a-form-model-item>
          </a-form-model>
        </a-collapse-panel>
      </a-collapse>
      <div class="backstage">
        <!-- 后台操作保护 -->
        <!-- <a-form-model-item label="管理员密码" prop="linkName">
            <a-input v-model="form.linkName" />
          </a-form-model-item> -->
        <a-form-model-item :wrapper-col="{ span: 18, offset: 6 }">
          <a-button
            v-permission="'save'"
            type="primary"
            @click="onSubmit"
            :loading="loading"
          >
            保存设置
          </a-button>
        </a-form-model-item>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      imgList: [
        // "http://yd-idc.oss-cn-beijing.aliyuncs.com/266a3b29-36c1-42ea-acaf-0d8ba0482ac2.jpg"
      ],
      labelCol: { span: 6 },
      wrapperCol: { span: 10 },
      form: {
        linkTypeName: "",
        linkTypeCode: "",
        linkName: "",
        linkUrl: "",
        linkDescribe: "",
        bottomShow: 0,
        status: 0,
        linkSort: "",
        channelCode: "",
        linkLogo: "",
        linkTypeSort: 0
      },
      rules: {
        linkName: [
          {
            required: true,
            message: "必填，限制用户注册时的密码长度。",
            trigger: "blur"
          }
        ],
        linkUrl: [
          {
            required: true,
            message:
              "必填，限制同一IP在规定时间内的注册次数，防止恶意注册，注册次数为0时代表不做限制，可输入1-13位的数字。",
            trigger: "blur"
          }
        ],
        linkDescribe: [
          {
            required: true,
            message:
              "必填，新用户注册成功时，该项的值将会直接增加到用户的余额内，为0时代表不赠送金额，注册成功送现金金额为0~1000000。",
            trigger: "blur"
          }
        ]
      },
      loading: false,
      data: []
    };
  },
  methods: {
    onSubmit() {
      console.log(this.form);
      this.$refs.ruleForm.validate(valid => {
        console.log(valid);
        if (valid) {
          this.$store.dispatch("invoiceRefund/modifyBillConfig", this.form).then(res => {
            // console.log(res, "--------");
            this.$message.success("发票退款信息保存成功");
            this.getBillConfig();
          });
           this.$store.dispatch("invoiceRefund/modifyRefundConfig", this.form).then(res => {
            // console.log(res, "--------");
            this.$message.success("发票退款信息保存成功");
            this.getBillConfig();
          });
        }
      });
    },
    // 获取发票信息
    getBillConfig() {
      this.$store.dispatch("invoiceRefund/getBillConfig").then(res => {
        // console.log(res, "--------");
        this.form = { ...this.form, ...res.data };
      });
    },
    // 获取退款信息
    getRefundConfig() {
      this.$store.dispatch("invoiceRefund/getRefundConfig").then(res => {
        // console.log(res, "--------");
        this.form = { ...this.form, ...res.data };
      });
    }
  }
};
</script>

<style lang="less" scoped>
.content {
  padding-top: 12px;
  .backstage {
    background: #fff;
    padding-top: 15px;
  }
  .ant-collapse {
    background-color: white;
  }
  .gutter-box {
    margin-right: 10px;
  }
}
</style>
