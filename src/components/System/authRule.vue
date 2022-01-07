<template>
  <div class="public-box">
    <div class="public-title">
      <div class="left-tit">已授权规则</div>
      <a-space>
        <a-button type="primary" @click="handleAdd">添加授权</a-button>
      </a-space>
    </div>
    <div class="public-con">
      <div class="table-box">
        <a-table
          :loading="tableLoading"
          :columns="columns"
          :data-source="data"
          rowKey="id"
          :pagination="false"
        >
          <span slot="type">
            角色
          </span>
          <span slot="code" slot-scope="text">
            {{ text.replace(":*", "") }}
          </span>
          <span slot="action" slot-scope="text, record">
            <a-button type="link" @click="handleCancelAuth(record)">
              取消授权
            </a-button>
          </span>
        </a-table>
      </div>
    </div>
    <!-- 添加授权弹窗 -->
    <a-modal
      :visible="visible"
      width="680px"
      centered
      title="添加授权"
      wrapClassName="add-auth-rule"
      okText="确定"
      :confirmLoading="loading"
      @ok="handleOk"
      @cancel="handleCancel"
    >
      <a-form-model
        ref="ruleForm"
        :model="form"
        :rules="rules"
        :label-col="labelCol"
        :wrapper-col="wrapperCol"
      >
        <a-form-model-item label="被授权主体类型" prop="type">
          <a-radio-group v-model="form.type">
            <a-radio value="role">
              角色
            </a-radio>
          </a-radio-group>
        </a-form-model-item>
        <a-form-model-item label="被授权角色" prop="roleCodes">
          <a-select
            v-model="form.roleCodes"
            mode="multiple"
            style="width: 100%"
            placeholder="选择角色"
          >
            <a-select-option
              v-for="item in roleList"
              :key="item.id"
              :value="item.code"
            >
              <div>{{ item.code }}</div>
              <div>{{ item.description }}</div>
            </a-select-option>
          </a-select>
        </a-form-model-item>
        <!-- <a-form-model-item label="授权作用">
          <a-radio-group v-model="form.type">
            <a-radio :value="1">
              允许
            </a-radio>
            <a-radio :value="0">
              拒绝
            </a-radio>
          </a-radio-group>
        </a-form-model-item> -->
        <a-form-model-item label="权限" prop="permissionCode">
          <a-select
            v-model="form.permissionCode"
            show-search
            placeholder="请选择权限"
            option-filter-prop="children"
            style="width: 100%"
            :filter-option="filterOption"
          >
            <!-- <a-select-option value='all'>
              <span>所有资源</span>
            </a-select-option> -->
            <a-select-option
              v-for="item in adminList"
              :key="item.id"
              :value="item.code"
            >
              <span>{{ item.code }}</span>
              <span>({{ item.description }})</span>
            </a-select-option>
          </a-select>
        </a-form-model-item>
      </a-form-model>
    </a-modal>
  </div>
</template>

<script>
export default {
  props: {
    // 角色code
    code: {
      type: String,
      default: ""
    }
  },
  data() {
    const validateRoleCodes = (rule, value, callback) => {
      if (value.length === 0) {
        callback(new Error("请选择被授权角色"));
      } else {
        callback();
      }
    };
    return {
      columns: [
        {
          title: "被授权主体类型",
          dataIndex: "type",
          scopedSlots: { customRender: "type" }
        },
        {
          title: "权限",
          dataIndex: "code",
          scopedSlots: { customRender: "code" }
        },
        {
          title: "权限描述",
          dataIndex: "desacription"
        },
        {
          title: "操作",
          dataIndex: "action",
          scopedSlots: { customRender: "action" }
        }
      ],
      data: [],
      tableLoading: false,
      // 添加授权
      visible: false,
      loading: false,
      roleList: [],
      adminList: [],
      labelCol: { span: 6 },
      wrapperCol: { span: 15 },
      form: {
        type: "role",
        roleCodes: [],
        permissionCode: undefined
      },
      rules: {
        type: [
          {
            required: true,
            message: "请选择授权主体类型",
            tigger: ["change"]
          }
        ],
        roleCodes: [
          {
            validator: validateRoleCodes,
            tigger: ["change"]
          }
        ],
        permissionCode: [
          {
            required: true,
            message: "请选择权限",
            tigger: ["change"]
          }
        ]
      }
    };
  },
  watch: {
    code: {
      handler(newVal) {
        if (newVal) {
          this.getAuthRuleList();
        }
      },
      immediate: true
    },
    visible: {
      handler(newVal) {
        if (newVal) {
          this.getRoleList();
          this.getAdminList();
          this.form.roleCodes = [this.code];
        }
      }
    }
  },
  methods: {
    // 查询已授权规则列表
    getAuthRuleList() {
      this.tableLoading = true;
      this.$store
        .dispatch("system/getRuleList", {
          code: this.code
        })
        .then(res => {
          this.data = [...res.data.list];
        })
        .finally(() => {
          this.tableLoading = false;
        });
    },
    // 添加授权弹窗---start
    // 添加授权
    handleAdd() {
      this.visible = true;
    },
    // 获取角色列表
    getRoleList() {
      this.$store
        .dispatch("system/getRoleList", {
          currentPage: 1,
          pageSize: 100
        })
        .then(res => {
          this.roleList = [...res.data.list];
        });
    },
    // 获取权限列表
    getAdminList() {
      this.$store
        .dispatch("system/getAdminList", {
          currentPage: 1,
          pageSize: 100,
          isAll: false
        })
        .then(res => {
          this.adminList = [...res.data.list];
        });
    },
    // 权限下拉选择的搜索
    filterOption(input, option) {
      return (
        option.componentOptions.children[0].children[0].text.indexOf(input) >= 0
      );
    },
    // 关闭弹窗
    handleCancel() {
      this.visible = false;
    },
    // 重置表单数据
    resetForm() {
      this.$refs.ruleForm.clearValidate();
      this.form = {
        type: "role",
        roleCodes: [],
        permissionCode: undefined
      };
    },
    // 弹窗提交
    handleOk() {
      this.loading = true;
      this.$refs.ruleForm.validate(valid => {
        if (valid) {
          this.$store
            .dispatch("system/addRule", this.form)
            .then(res => {
              this.$message.success("授权成功");
              this.getAuthRuleList();
              this.visible = false;
            })
            .finally(() => {
              this.loading = false;
            });
        }
      });
    },
    // 添加授权弹窗---end
    // 取消授权
    handleCancelAuth(record) {
      this.$confirm({
        title: "确认要取消授权吗？",
        onOk: () => {
          this.$store
            .dispatch("system/cancelRule", {
              permissionCode: record.code,
              roleCode: this.code
            })
            .then(res => {
              this.$message.success("取消授权成功");
              this.getAuthRuleList();
            });
        }
      });
    }
  }
};
</script>

<style lang="less" scoped>
.public-box {
  box-shadow: 0 6px 12px 0 #fbfcfd;
  border-radius: 8px;
  border: 1px solid #eee;
  margin-bottom: 24px;
  .public-title {
    height: 65px;
    padding: 0 32px;
    border-bottom: 1px solid #f0f0f0;
    display: flex;
    align-items: center;
    justify-content: space-between;
    .left-tit {
      font-size: 16px;
      font-weight: 500;
    }
  }
  .public-con {
    padding: 24px 32px;
    display: flex;
    flex-wrap: wrap;
    .table-box {
      width: 100%;
    }
  }
}
</style>
