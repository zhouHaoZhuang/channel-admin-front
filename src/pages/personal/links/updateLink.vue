<template>
  <div class="add-blogroll-container">
    <div class="content">
      <a-form-model
        ref="ruleForm"
        :model="form"
        :rules="rules"
        :label-col="labelCol"
        :wrapper-col="wrapperCol"
      >
        <a-form-model-item label="分类">
          <a-select v-model="form.linkTypeName" placeholder="公有云商">
            <a-select-option
              v-for="item in data"
              :key="item.linkTypeCode"
              :value="item.linkTypeCode"
            >
              {{ item.linkTypeName }}
            </a-select-option>
          </a-select>
        </a-form-model-item>
        <a-form-model-item label="链接名称" prop="linkName">
          <a-input v-model="form.linkName" :maxLength="50" />
        </a-form-model-item>
        <a-form-model-item label="链接URL" prop="linkUrl">
          <a-input v-model="form.linkUrl" :maxLength="50" />
        </a-form-model-item>
        <a-form-model-item label="介绍" type="linkDescribe">
          <a-input v-model="form.linkDescribe" />
        </a-form-model-item>
        <a-form-model-item label="站点底部展示">
          <a-radio-group v-model="form.bottomShow">
            <a-radio :value="0">
              全站显示
            </a-radio>
            <a-radio :value="1">
              只显示首页
            </a-radio>
            <a-radio :value="2">
              不显示
            </a-radio>
          </a-radio-group>
        </a-form-model-item>
        <a-form-model-item label="状态">
          <a-radio-group v-model="form.status">
            <a-radio :value="0">
              正常
            </a-radio>
            <a-radio :value="1">
              不显示
            </a-radio>
          </a-radio-group>
        </a-form-model-item>
        <a-form-model-item label="排序">
          <a-input v-model.number="form.linkSort" />
          <span>注：越小越靠前</span>
        </a-form-model-item>
        <!-- 传图片 -->
        <div class="addimages">
          <a-form-model-item label="LOGO">
            <Upload :defaultFile="form.linkLogo" @change="imgChange" />
            <span>注：推荐尺寸:1920*660，不超过500kb</span>
          </a-form-model-item>
        </div>
        <a-form-model-item :wrapper-col="{ span: 18, offset: 6 }">
          <a-button type="primary" @click="onSubmit" :loading="loading">
            确定
          </a-button>
        </a-form-model-item>
      </a-form-model>
    </div>
  </div>
</template>

<script>
import Upload from "@/components/Upload/index";
export default {
  components: {
    Upload
  },
  watch: {
    $route: {
      handler(newVal) {
        if (newVal.path === "/personal/account/updateLink") {
          this.getCategoryList();
          this.resetForm();
          if (newVal.query.id) {
            this.type = "edit";
            this.getDetail();
          } else {
            this.type = "add";
          }
        }
      },
      immediate: true,
      deep: true
    }
  },
  data() {
    return {
      type: "add",
      labelCol: { span: 6 },
      wrapperCol: { span: 18 },
      form: {
        linkTypeName: "",
        linkTypeCode: "",
        linkName: "",
        linkUrl: "",
        linkDescribe: "",
        bottomShow: 2,
        status: 1,
        linkSort: 0,
        channelCode: "",
        linkLogo: "",
        linkTypeSort: 0
      },
      rules: {
        linkName: [
          {
            required: true,
            message: "请输入链接名称，链接名称长度必须在2-50之间。",
            trigger: ["blur", "change"]
          }
        ],
        linkUrl: [
          {
            required: true,
            message: "请输入链接URL，链接URL长度必须在2-50之间。",
            trigger: ["blur", "change"]
          }
        ]
      },
      loading: false,
      data: []
    };
  },
  methods: {
    // 获取友情链接详情
    getDetail() {
      this.$store
        .dispatch("links/getLinkDetail", this.$route.query.id)
        .then(res => {
          this.form = {
            ...res.data
          };
        });
    },
    // 查询友情分类数据
    getCategoryList() {
      this.$store
        .dispatch("links/getCategoryList", {
          currentPage: 1,
          pageSize: 999
        })
        .then(res => {
          this.data = [...res.data.list];
        });
    },
    //上传图片
    imgChange({ urlList, firstImageUrl }) {
      this.form.linkLogo = firstImageUrl;
    },
    // 提交
    onSubmit() {
      this.$refs.ruleForm.validate(valid => {
        if (valid) {
          this.loading = true;
          this.$store
            .dispatch(
              this.type === "add" ? "links/addLink" : "links/editLink",
              this.form
            )
            .then(res => {
              this.$message.success(
                `${this.type === "add" ? "添加" : "编辑"}友情链接成功`
              );
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
      this.$nextTick(() => {
        this.$refs.ruleForm.clearValidate();
      });
      this.form = {
        linkTypeName: "",
        linkTypeCode: "",
        linkName: "",
        linkUrl: "",
        linkDescribe: "",
        bottomShow: 2,
        status: 1,
        linkSort: 0,
        channelCode: "",
        linkLogo: "",
        linkTypeSort: 0
      };
    }
  }
};
</script>

<style lang="less" scoped>
.add-blogroll-container {
  background: #fff;
  padding: 24px;
  display: flex;
  justify-content: center;
  .content {
    width: 600px;
  }
}
</style>
