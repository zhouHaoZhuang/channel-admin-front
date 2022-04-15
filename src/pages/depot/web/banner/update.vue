<template>
  <div class="add-banner-container">
    <div class="content">
      <a-form-model
        ref="ruleForm"
        :model="form"
        :rules="rules"
        :label-col="labelCol"
        :wrapper-col="wrapperCol"
      >
        <a-form-model-item label="轮播图类型" prop="bannerType">
          <a-select v-model="form.bannerType" placeholder="轮播图类型">
            <a-select-option
              v-for="(value, key) in bannerTypeEnum"
              :key="key"
              :value="key"
            >
              {{ value }}
            </a-select-option>
          </a-select>
        </a-form-model-item>
        <a-form-model-item label="标题" prop="title">
          <a-input v-model="form.title" :maxLength="15" />
        </a-form-model-item>
        <a-form-model-item label="描述">
          <a-input v-model="form.describe" />
        </a-form-model-item>
        <a-form-model-item label="PC版标题和描述">
          <a-radio-group v-model="form.display">
            <a-radio :value="true"> 展示 </a-radio>
            <a-radio :value="false"> 隐藏 </a-radio>
          </a-radio-group>
        </a-form-model-item>
        <a-form-model-item label="PC版按钮名称" prop="pcButtonName">
          <a-input v-model="form.pcButtonName" />
        </a-form-model-item>
        <a-form-model-item label="PC版按钮">
          <a-radio-group v-model="form.buttonStatus">
            <a-radio :value="0"> 展示 </a-radio>
            <a-radio :value="1"> 隐藏 </a-radio>
          </a-radio-group>
        </a-form-model-item>
        <a-form-model-item label="PC版按钮链接" prop="pcButtonLink">
          <!-- <a-input v-model="form.pcButtonLink" /> -->
          <a-select
            v-model="form.pcButtonLink"
            placeholder="PC版按钮链接"
            @change="ssss()"
          >
            <a-select-option value="自定义"> 自定义 </a-select-option>
            <a-select-option
              v-for="(value, key) in bannerLinkEnum"
              :key="key"
              :value="key"
            >
              {{ value }}
            </a-select-option>
          </a-select>
        </a-form-model-item>
        <a-form-model-item
          label=" "
          class="input-skip"
          v-if="form.pcButtonLink === '自定义'"
          prop="pcSkip"
        >
          <a-input
            v-model="form.pcSkip"
            placeholder="请输入链接，例https://www.slayun.com"
          />
        </a-form-model-item>

        <a-form-model-item label="全图链接" prop="pictureLink">
          <!-- <a-input v-model="form.pictureLink" /> -->
          <a-select v-model="form.pictureLink" placeholder="全图链接">
            <a-select-option value="自定义"> 自定义 </a-select-option>
            <a-select-option
              v-for="(value, key) in bannerLinkEnum"
              :key="key"
              :value="key"
            >
              {{ value }}
            </a-select-option>
          </a-select>
        </a-form-model-item>
        <a-form-model-item
          label=" "
          class="input-skip"
          v-if="form.pictureLink === '自定义'"
          prop="imgSkip"
        >
          <a-input
            v-model="form.imgSkip"
            placeholder="请输入链接，例https://www.slayun.com"
          />
        </a-form-model-item>

        <a-form-model-item label="链接打开方式">
          <a-radio-group v-model="form.openLinkType">
            <a-radio value="0"> 新标签 </a-radio>
            <a-radio value="1"> 当前页面 </a-radio>
          </a-radio-group>
        </a-form-model-item>
        <a-form-model-item label="状态">
          <a-radio-group v-model="form.status">
            <a-radio :value="0"> 正常 </a-radio>
            <a-radio :value="1"> 不显示 </a-radio>
          </a-radio-group>
        </a-form-model-item>
        <a-form-model-item label="排序">
          <a-input v-model="form.sort" />
          <span>注：越小越靠前</span>
        </a-form-model-item>
        <!-- 传图片 -->
        <a-form-model-item label="上传PC图片" prop="pcPicture">
          <div class="addimages">
            <Upload :defaultFile="form.pcPicture" @change="pcImgChange" />
            <span>注：推荐尺寸:1920*660</span>
          </div>
        </a-form-model-item>
        <a-form-model-item label="上传手机图片">
          <div class="addimages">
            <Upload :defaultFile="form.phonePicture" @change="mbImgChange" />
            <span>注：推荐尺寸:640*560</span>
          </div>
        </a-form-model-item>

        <a-form-model-item :wrapper-col="{ span: 18, offset: 6 }">
          <a-button
            v-permission="'add'"
            type="primary"
            @click="onSubmit"
            :loading="loading"
          >
            确定添加
          </a-button>
        </a-form-model-item>
      </a-form-model>
    </div>
  </div>
</template>

<script>
import Upload from "@/components/Upload/index";
import { bannerTypeEnum, bannerLinkEnum } from "@/utils/enum";
export default {
  components: {
    Upload,
  },
  watch: {
    $route: {
      handler(newVal) {
        if (newVal.path === "/depot/web/update") {
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
      deep: true,
    },
  },
  data() {
    return {
      bannerTypeEnum,
      bannerLinkEnum,
      labelCol: { span: 6 },
      wrapperCol: { span: 18 },
      type: "add",
      form: {
        bannerType: undefined,
        title: "",
        describe: "",
        display: true,
        buttonStatus: 0,
        pcButtonName: "",
        pcButtonLink: "",
        openLinkType: "0",
        status: 0,
        sort: 0,
        pcPicture: "",
        phonePicture: "",
        pcSkip: "",
        imgSkip: "",
      },
      rules: {
        pcSkip: [
          { pattern: /(http|https):\/\/\S*/, message: "请以http://或https://开头", trigger: "blur" }
        ],
        imgSkip: [
          { pattern: /(http|https):\/\/\S*/, message: "请以http://或https://开头", trigger: "blur" }
        ],
        bannerType: [
          {
            required: true,
            message: "请选择轮播图类型",
            trigger: "change",
          },
        ],
        title: [
          {
            message: "请输入轮播图标题",
            trigger: ["blur", "change"],
          },
        ],
        pcButtonName: [
          {
            message: "请输入PC版按钮名称",
            trigger: ["blur", "change"],
          },
        ],
        pictureLink: [
          {
            message: "请输入全图链接",
            trigger: ["blur", "change"],
          },
        ],
        pcPicture: [
          {
            required: true,
            message: "请上传PC图片",
            trigger: ["blur", "change"],
          },
        ],
      },
      loading: false,
    };
  },
  methods: {
    ssss() {
      console.log(this.form.pcButtonLink);
    },
    // 获取轮播图详情
    getDetail() {
      this.$store
        .dispatch("banner/getDetail", this.$route.query.id)
        .then((res) => {
          let pcLink = res.data.pcButtonLink;
          let imgLink = res.data.pictureLink;
          console.log(pcLink, "传的值", imgLink);
          this.form = {
            ...res.data,
            bannerType: res.data.bannerType.toString(),
          };
          if (
            Object.keys(this.bannerLinkEnum).indexOf(pcLink) === -1 && pcLink
          ) {
            this.$set(this.form, "pcButtonLink", "自定义");
            this.$set(this.form, "pcSkip", pcLink);
          }
          if (
            Object.keys(this.bannerLinkEnum).indexOf(imgLink) === -1 && imgLink
          ) {
            this.$set(this.form, "pictureLink", "自定义");
            this.$set(this.form, "imgSkip", imgLink);
          }
        });
    },
    // 上传pc图片
    pcImgChange({ urlList, firstImageUrl }) {
      this.form.pcPicture = firstImageUrl;
      this.$refs["ruleForm"].clearValidate(["pcPicture"]);
    },
    // 上传手机图片
    mbImgChange({ urlList, firstImageUrl }) {
      this.form.phonePicture = firstImageUrl;
    },
    // 提交
    onSubmit() {
      this.$refs.ruleForm.validate((valid) => {
        if (valid) {
          //数据处理
          if (this.form.pcButtonLink === "自定义") {
            this.form.pcButtonLink = this.form.pcSkip;
          }
          if (this.form.pictureLink === "自定义") {
            this.form.pictureLink = this.form.imgSkip;
          }
          this.loading = true;
          this.$store
            .dispatch(
              this.type === "add" ? "banner/add" : "banner/edit",
              this.form
            )
            .then((res) => {
              this.$message.success(
                `${this.type === "add" ? "添加" : "编辑"}轮播图成功`
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
      this.form = {
        bannerType: undefined,
        title: "",
        describe: "",
        display: true,
        buttonStatus: 0,
        pcButtonName: "",
        pcButtonLink: "",
        openLinkType: "0",
        status: 0,
        sort: 0,
        pcPicture: "",
        phonePicture: "",
        pcSkip: "",
        imgSkip: "",
      };
      this.$nextTick(() => {
        this.$refs.ruleForm.clearValidate();
      });
    },
  },
};
</script>

<style lang="less" scoped>
.add-banner-container {
  background: #fff;
  padding: 24px;
  display: flex;
  justify-content: center;
  .content {
    width: 600px;
  }
}
::v-deep .input-skip div label::after{
  content:""
}
</style>
