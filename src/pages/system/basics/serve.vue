<template>
  <div class="member-container">
    <div class="content">
      <a-collapse default-active-key="1" :bordered="false" class="aa">
        <a-collapse-panel key="1" header="工单基本设置">
          <a-form-model
            ref="ruleForm"
            :model="form"
            :rules="rules"
            :label-col="labelCol"
            :wrapper-col="wrapperCol"
          >
            <a-form-model-item label="自动锁定超过" prop="auto_lock">
              <a-input v-model="form.auto_lock" suffix="天的工单" />
            </a-form-model-item>
            <a-form-model-item label="允许撤回" prop="rev_reply">
              <a-input v-model="form.rev_reply" suffix="分钟内自己的回复" />
            </a-form-model-item>
            <!-- <a-form-model-item label="远程客服工号范围" prop = 'linkName'>
              <a-row type="flex" justify="start">
                <a-col>
                  <a-input
                    style="width: 100px"
                    class="gutter-box"
                    v-model="form.linkName"
                  />
                </a-col>
                <a-col>
                  <div class="gutter-box">至</div>
                </a-col>
                <a-col>
                  <a-input
                    style="width: 100px"
                    class="gutter-box"
                    v-model="form.linkName"
                  />
                </a-col>
              </a-row>
            </a-form-model-item> -->
          </a-form-model>
        </a-collapse-panel>
        <a-collapse-panel key="2" header="工单提醒设置">
          <a-form-model
            ref="ruleForm"
            :model="form"
            :rules="rules"
            :label-col="labelCol"
            :wrapper-col="wrapperCol"
          >
            <a-form-model-item label="提醒时间设定" prop="notice_time">
              <a-input v-model="form.notice_time" suffix="分钟后未处理则提醒" />
            </a-form-model-item>
          </a-form-model>
        </a-collapse-panel>
        <!-- <a-collapse-panel key="3" header="增值服务">
          <a-form-model
            ref="ruleForm"
            :model="form"
            :rules="rules"
            :label-col="labelCol"
            :wrapper-col="wrapperCol"
          >
            <a-form-model-item label="增值服务开关">
              <a-radio-group v-model="form.status">
                <a-radio :value="0">
                  开启
                </a-radio>
                <a-radio :value="1">
                  关闭
                </a-radio>
              </a-radio-group>
            </a-form-model-item>
            <a-form-model-item label="关联产品">
              <a-checkbox-group v-model="form.type">
                <a-checkbox value="1" name="type">
                  云服务器
                </a-checkbox>
                <a-checkbox value="2" name="type">
                  裸金属服务器
                </a-checkbox>
              </a-checkbox-group>
            </a-form-model-item>
            <a-form-model-item label="是否赠送免费次数" prop = 'linkName'>
              <a-row type="flex" justify="start">
                <a-col>
                  <a-input
                    style="width: 100px"
                    class="gutter-box"
                    v-model="form.linkName"
                  />
                </a-col>
                <a-col>
                  <a-select
                    style="width: 100px"
                    class="gutter-box"
                    v-model="form.linkName"
                    default-value="shanghai"
                  >
                    <a-select-option value="shanghai">
                      服务等级
                    </a-select-option>
                  </a-select>
                </a-col>
              </a-row>
            </a-form-model-item>
          </a-form-model>
        </a-collapse-panel> -->
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
        auto_lock: [
          {
            required: true,
            message: "必填，用于设置自动锁定超出时间。",
            trigger: "blur"
          }
        ],
        rev_reply: [
          {
            required: true,
            message: "必填，用于设置允许撤回时间。",
            trigger: "blur"
          }
        ],
        notice_time: [
          {
            required: true,
            message: "必填，用于设置工单提醒时间。",
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
