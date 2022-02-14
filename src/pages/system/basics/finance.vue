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
            <a-form-model-item label="开启申请" prop="integral_name">
              <a-radio-group v-model="form.integral_name">
                <a-radio value="1">
                  开启
                </a-radio>
                <a-radio value="0">
                  关闭
                </a-radio>
              </a-radio-group>
            </a-form-model-item>
            <a-form-model-item label="是否支持电子发票">
              <a-radio-group v-model="form.electronic_invoice">
                <a-radio value="1">
                  是
                </a-radio>
                <a-radio value="0">
                  否
                </a-radio>
              </a-radio-group>
            </a-form-model-item>
            <a-form-model-item label="是否支持纸质发票">
              <a-radio-group v-model="form.paper_invoice">
                <a-radio value="1">
                  是
                </a-radio>
                <a-radio value="0">
                  否
                </a-radio>
              </a-radio-group>
            </a-form-model-item>
            <a-form-model-item label="发票申请时间限制" prop="invoice_pay_time_limit">
              <a-input v-model="form.invoice_pay_time_limit" suffix="月" />
            </a-form-model-item>
            <a-form-model-item label="发票手续费" prop="proportion_invoice">
              <a-input v-model="form.proportion_invoice" suffix="%" />
            </a-form-model-item>
            <a-form-model-item label="发票邮费" prop="invoice_postage">
              <a-input v-model="form.invoice_postage" suffix="元" />
            </a-form-model-item>
            <a-form-model-item label="发票满指定金额免邮费" prop="to_money">
              <a-input v-model="form.to_money" suffix="元" />
            </a-form-model-item>
            <a-form-model-item label="开票需实名" prop="invoice_real_name">
              <a-radio-group v-model="form.invoice_real_name">
                <a-radio value="1">
                  是
                </a-radio>
                <a-radio value="0">
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
            <a-form-model-item label="开启退款" prop="refund_switch">
              <a-radio-group v-model="form.refund_switch">
                <a-radio value="1">
                  开启
                </a-radio>
                <a-radio value="0">
                  关闭
                </a-radio>
              </a-radio-group>
            </a-form-model-item>
            <a-form-model-item label="云服务器退款限制" prop="refund_days_server">
              <a-input v-model="form.refund_days_server" suffix="天内的服务器" />
            </a-form-model-item>
            <a-form-model-item label="退款次数限制" required>
              <a-row type="flex" justify="start">
                <a-col>
                  <div class="gutter-box">云服务器:</div>
                </a-col>
                <a-col>
                   <a-form-model-item  prop="refund_times_server">
                  <a-input
                    style="width: 100px"
                    class="gutter-box"
                    v-model="form.refund_times_server"
                  />
                  </a-form-model-item>
                </a-col>
                <a-col>
                  <div class="gutter-box">次</div>
                  <!-- <div class="gutter-box">次，虚拟主机:</div> -->
                </a-col>
                <!-- <a-col>
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
                </a-col> -->
              </a-row>
              <!-- <a-row type="flex" justify="start">
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
              </a-row> -->
            </a-form-model-item>
             <a-form-model-item label="退款需实名认证" prop="refund_real_name">
              <a-radio-group v-model="form.refund_real_name">
                <a-radio value="1">
                  开启
                </a-radio>
                <a-radio value="0">
                  关闭
                </a-radio>
              </a-radio-group>
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
      labelCol: { span: 6 },
      wrapperCol: { span: 10 },
      form: {
        // 发票
        integral_name:'',
        electronic_invoice:'',
        paper_invoice:'',
        invoice_pay_time_limit:'',
        proportion_invoice:'',
        invoice_postage:'',
        to_money:'',
        invoice_real_name:'',
        // 退款
        refund_switch:'',
        refund_days_server:'',
        refund_times_server:'',
        refund_real_name:''
      },
      rules: {
        linkName: [
          {
            required: true,
            message: "必填，限制用户注册时的密码长度。",
            trigger: "blur"
          }
        ],
        integral_name: [
          {
            required: true,
            message: "必填，用于开启发票申请。",
            trigger: "blur"
          }
        ],
        invoice_pay_time_limit:[
          {
            required: true,
            message: "必填，用于限制发票申请时间。",
            trigger: "blur"
          }
        ],
        proportion_invoice:[
          {
            required: true,
            message: "必填，用于设置发票手续费。",
            trigger: "blur"
          }
        ],
        invoice_postage:[
          {
            required: true,
            message: "必填，用于设置发票邮费。",
            trigger: "blur"
          }
        ],
        to_money:[
          {
            required: true,
            message: "必填，用于设置发票满指定金额免邮费。",
            trigger: "blur"
          }
        ],
        invoice_real_name:[
          {
            required: true,
            message: "必填，用于设置开票是否需要实名。",
            trigger: "blur"
          }
        ],
        refund_switch:[
          {
            required: true,
            message: "必填，用于设置是否开启退款。",
            trigger: "blur"
          }
        ],
        refund_days_server:[
          {
            required: true,
            message: "必填，用于限制云服务器退款天数。",
            trigger: "blur"
          }
        ],
        refund_times_server:[
          {
            required: true,
            message: "选项必填。",
            trigger: "blur"
          }
        ],
        refund_real_name:[
           {
            required: true,
            message: "必填，用于设置退款是否需实名认证。",
            trigger: "blur"
          }
        ]

      },
      loading: false,
      data: []
    };
  },
  props: {
    formData: {
      type: Object,
      default() {
        return {};
      }
    }
  },
  created() {
    console.log(this.formData, "this.formData");
    this.form = this.formData;
  },
  methods: {
    onSubmit() {
      this.$refs.ruleForm.validate(valid => {
        if (valid) {
          this.$store
            .dispatch("emailSms/modifyAllConfig", this.form)
            .then(() => {
              this.$message.success("保存成功");
              // this.getEmailConfig();
            })
            .finally(() => {
              this.getData();
            });
        }
      });
    },
    // 修改成功之后获取最新的数据
    getData() {
      this.$store.dispatch("emailSms/getAllConfig").then(res => {
        console.log(res);
        this.form = res.data;
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
