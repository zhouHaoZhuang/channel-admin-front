<template>
  <div class="channel-list-container">
    <div class="container">
      <a-form-model
        ref="ruleForm"
        :model="form"
        :rules="rules"
        :label-col="labelCol"
        :wrapper-col="wrapperCol"
      >
        <a-form-model-item label="线路">
          <a-select
            v-model="form.cutomerName"
            placeholder="please select your zone"
          >
            <a-select-option value="shanghai">
              中国大连
            </a-select-option>
            <a-select-option value="beijing">
              中国沈阳
            </a-select-option>
            <a-select-option value="beijing">
              中国广州
            </a-select-option>
          </a-select>
        </a-form-model-item>
        <a-form-model-item label="CPU">
          <a-select
            v-model="form.cutomerName"
            placeholder="please select your zone"
          >
            <a-select-option value="shanghai">
              1
            </a-select-option>
            <a-select-option value="beijing">
              2
            </a-select-option>
            <a-select-option value="beijing">
              4
            </a-select-option>
            <a-select-option value="beijing">
              8
            </a-select-option>
            <a-select-option value="beijing">
              16
            </a-select-option>
          </a-select>
        </a-form-model-item>
        <a-form-model-item label="内存">
          <a-select
            v-model="form.cutomerName"
            placeholder="please select your zone"
          >
            <a-select-option value="shanghai">
              1
            </a-select-option>
            <a-select-option value="beijing">
              2
            </a-select-option>
            <a-select-option value="beijing">
              4
            </a-select-option>
            <a-select-option value="beijing">
              8
            </a-select-option>
          </a-select>
        </a-form-model-item>
        <a-form-model-item label="磁盘">
          <div class="disk-size">
            <span>
              <a-input v-model="form.shortName" />
            </span>
            <div class="add-reduce">
              <a-button size="small">
                <a-icon type="caret-up" />
              </a-button>
              <a-button size="small"> <a-icon type="caret-down" /> </a-button>
            </div>
          </div>
        </a-form-model-item>
        <a-form-model-item label=" ">
          <a href="">添加一块硬盘 还可以添加4块</a>
        </a-form-model-item>
        <a-form-model-item label="公网带宽">
          <div class="disk-size">
            <span>
              <a-input v-model="form.shortName" />
            </span>
            <div class="add-reduce">
              <a-button size="small">
                <a-icon type="caret-up" />
              </a-button>
              <a-button size="small"> <a-icon type="caret-down" /> </a-button>
            </div>
          </div>
        </a-form-model-item>
        <a-form-model-item label="防御峰值">
          <a-select
            v-model="form.cutomerName"
            placeholder="please select your zone"
          >
            <a-select-option value="shanghai">
              20G
            </a-select-option>
            <a-select-option value="beijing">
              30G
            </a-select-option>
            <a-select-option value="beijing">
              50G
            </a-select-option>
            <a-select-option value="beijing">
              100G
            </a-select-option>
            <a-select-option value="beijing">
              200G
            </a-select-option>
          </a-select>
        </a-form-model-item>
        <a-form-model-item label="公共镜像">
          <div class="disk-size">
            <span class="system-type">
              <a-select v-model="form.cutomerName" placeholder="请选择系统类别">
                <a-select-option value="shanghai">
                  Windows Server
                </a-select-option>
                <a-select-option value="beijing">
                  CentOS
                </a-select-option>
                <a-select-option value="beijing">
                  Ubuntu
                </a-select-option>
                <a-select-option value="beijing">
                  Debian
                </a-select-option>
                <a-select-option value="beijing">
                  FreeBSD
                </a-select-option>
              </a-select>
            </span>
            <div class="add-reduce system-type">
              <a-select v-model="form.cutomerName" placeholder="请选择系统版本">
                <a-select-option value="shanghai">
                  Windows Server
                </a-select-option>
                <a-select-option value="beijing">
                  CentOS
                </a-select-option>
              </a-select>
            </div>
          </div>
        </a-form-model-item>
        <a-form-model-item label="登陆方式">
          <a-radio-group v-model="form.resource">
            <a-radio value="1">
              设置密码
            </a-radio>
            <a-radio value="2">
              随机密码
            </a-radio>
          </a-radio-group>
        </a-form-model-item>
        <a-form-model-item label="登陆名">
          <span>请选择公共镜像</span>
        </a-form-model-item>
        <a-form-model-item label="登陆密码">
          <a-input v-model="form.shortName" />
        </a-form-model-item>
        <a-form-model-item label="确认密码">
          <a-input v-model="form.contract" />
        </a-form-model-item>
        <a-form-model-item label="购买时长">
          <a-select
            v-model="form.addressProject"
            placeholder="please select your zone"
          >
            <a-select-option value="shanghai">
              1个月
            </a-select-option>
            <a-select-option value="beijing">
              2个月
            </a-select-option>
            <a-select-option value="beijing">
              3个月
            </a-select-option>
            <a-select-option value="beijing">
              4个月
            </a-select-option>
            <a-select-option value="beijing">
              5个月
            </a-select-option>
          </a-select>
        </a-form-model-item>
        <a-form-model-item label="购买数量">
          <div class="disk-size">
            <span>
              <a-input v-model="form.shortName" />
            </span>
            <div class="add-reduce">
              <a-button size="small">
                <a-icon type="caret-up" />
              </a-button>
              <a-button size="small"> <a-icon type="caret-down" /> </a-button>
            </div>
          </div>
        </a-form-model-item>
        <a-form-model-item label="价格">
          <span>48.70元</span>
        </a-form-model-item>
        <a-form-model-item label="所属会员ID/手机号码">
          <a-input v-model="form.number" />
        </a-form-model-item>
        <div class="divider">
          <a-divider />
        </div>
        <div>后台操作保护</div>
        <a-form-model-item label="管理员密码">
          <a-input-password v-model="form.description" />
        </a-form-model-item>
        <a-form-model-item :wrapper-col="{ span: 18, offset: 8 }">
          <a-button type="primary" @click="onSubmit" :loading="loading">
            确定
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
      wrapperCol: { span: 8 },
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
.channel-list-container {
  background: #fff;
  padding: 24px;
  display: flex;
  justify-content: center;
  .container {
    width: 100%;
    .disk-size {
      width: 500px;
      display: flex;
    }
    .add-reduce {
      margin-left: 5px;
      height: 37px;
      display: flex;
      padding-top: 2px;
      flex-direction: column;
      justify-content: space-between;
      .ant-btn-sm {
        height: 17px;
        padding: 0 9px;
        font-size: 14px;
        border-radius: 4px;
      }
      .ant-btn {
        line-height: 1;
        border: 0;
        background-color: #eeeeee;
      }
    }
  }
  .divider {
    .ant-divider {
      background: #ebebeb !important;
    }
  }
  .system-type{
    display: inline-block;
    width: 200px;

  }
}
</style>
