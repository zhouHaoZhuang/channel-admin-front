<template>
  <div class="add-message">
    <a-form-model
      ref="ruleForm"
      :model="form"
      :rules="rules"
      :label-col="labelCol"
      :wrapper-col="wrapperCol"
    >
      <a-form-model-item label="发送对象" prop="resource">
        <a-radio-group v-model="form.sendObject">
          <a-radio value="all">
            全体成员
          </a-radio>
          <a-radio value="some">
            指定会员
          </a-radio>
        </a-radio-group>
      </a-form-model-item>
      <a-form-model-item
        label="会员ID"
        prop="receiverAccount"
        v-if="form.sendObject == 'some'"
      >
        <a-select
          mode="multiple"
          v-model="form.receiverAccount"
          style="width: 200px"
          @change="handleChange"
        >
          <a-select-option v-for="item in data" :key="item.corporationCode">
            {{ item.corporationName }}
          </a-select-option>
        </a-select>
      </a-form-model-item>
      <a-form-model-item label="发送类型" prop="resource">
        <a-radio-group v-model="form.messageType">
          <a-radio value="1">
            站内信
          </a-radio>
          <!-- <a-radio value="2">
            邮件
          </a-radio>
          <a-radio value="3">
            短信
          </a-radio> -->
        </a-radio-group>
      </a-form-model-item>
      <a-form-model-item label="发送标题" prop="title">
        <a-input v-model="form.title" />
      </a-form-model-item>
      <a-form-model-item label="内容">
        <Tinymce @tinymceinput="tinymceinput" :tinyvalue="form.content" />
      </a-form-model-item>
      <!-- <a-form-model-item label="每页发送" prop="name">
        <a-input-number v-model="form.name" />条
      </a-form-model-item> -->
      <a-form-model-item :wrapper-col="{ span: 8, offset: 8 }">
        <a-button
          v-permission="'send-message'"
          type="primary"
          @click="onSubmit"
        >
          确认发送
        </a-button>
      </a-form-model-item>
    </a-form-model>
  </div>
</template>

<script>
import Tinymce from "@/components/Tinymce/index.vue";
import moment from "moment";

export default {
  data() {
    return {
      moment,
      labelCol: { span: 8 },
      wrapperCol: { span: 8 },
      other: "",
      form: {
        messageType: "1",
        title: "",
        content: "",
        sendObject: "all",
        receiverCode: []
      },
      rules: {
        receiverAccount: [
          {
            required: true,
            message: "会员ID不能为空",
            trigger: "blur"
          }
        ],
        title: [
          {
            required: true,
            message: "标题为必填项",
            trigger: "blur"
          }
        ]
      },
      data: null,
      listQuery: {
        key: "",
        search: "",
        currentPage: 1,
        pageSize: 999,
        total: 0,
        sorter: ""
      }
    };
  },
  components: {
    Tinymce
  },

  activated() {
    this.getVipList();
    this.resetForm();
    console.log(this.form);
  },
  methods: {
    tinymceinput(value) {
      // console.log("富文本输入", value);
      this.form.content = value;
    },
    getVipList() {
      this.$store
        .dispatch("member/getList", this.listQuery)
        .then(res => {
          console.log(res);
          this.data = res.data.list;
        })
        .finally(() => {});
    },
    // 多选会员
    handleChange(value) {
      console.log(`Selected: ${value}`);
      this.form.receiverCode = value.toString();
    },
    onSubmit() {
      if (this.form.sendObject == "all") {
        this.form.receiverCode = "";
        this.data.forEach(element => {
          this.form.receiverCode += element.corporationCode + ",";
        });
      }
      console.log(this.form);
      this.$confirm({
        title: "确定要发送吗?",
        onOk: () => {
          this.$refs.ruleForm.validate(valid => {
            if (valid) {
              console.log(this.form);
              this.$store
                .dispatch("message/addMessage", this.form)
                .then(res => {
                  console.log(res);
                  this.$message.success("新增消息成功");
                  this.resetForm();
                  this.$router.back();
                });
            } else {
              console.log("error submit!!");
              return false;
            }
          });
        }
      });
    },
    resetForm() {
      this.$refs.ruleForm.resetFields();
      this.form = {
        messageType: "1",
        title: "",
        content: "",
        sendObject: "all",
        receiverCode: []
      };
    }
  }
};
</script>

<style>
.add-message {
  background-color: #fff;
  margin: 0 20px;
  padding: 10px;
}
</style>
