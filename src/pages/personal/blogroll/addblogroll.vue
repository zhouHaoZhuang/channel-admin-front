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
          <a-input v-model="form.linkName" />
        </a-form-model-item>
        <a-form-model-item label="链接URL" prop="linkUrl">
          <a-input v-model="form.linkUrl" />
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
            <Upload :defaultFileList="imgList" @change="imgChange" />
            <span>注：推荐尺寸:1920*660，不超过500kb</span>
          </a-form-model-item>
        </div>
        <a-form-model-item :wrapper-col="{ span: 18, offset: 6 }">
          <a-button type="primary" @click="onSubmit" :loading="loading">
            确定添加
          </a-button>
        </a-form-model-item>
      </a-form-model>
    </div>
  </div>
</template>

<script>
function getBase64(img, callback) {
  const reader = new FileReader();
  reader.addEventListener("load", () => callback(reader.result));
  reader.readAsDataURL(img);
}
import Upload from "@/components/Upload/index";
export default {
  data() {
    return {
      imgList: [
        // "http://yd-idc.oss-cn-beijing.aliyuncs.com/266a3b29-36c1-42ea-acaf-0d8ba0482ac2.jpg"
      ],
      labelCol: { span: 6 },
      wrapperCol: { span: 18 },
      form: {
        linkTypeName: "",
        linkTypeCode: "",
        linkName: "",
        linkUrl: "",
        linkDescribe: "",
        bottomShow: 0,
        status: 0,
        linkSort: 0,
        channelCode: "",
        linkLogo: "",
        linkTypeSort: 0
      },
      rules: {
        linkName: [
          {
            required: true,
            message: "必填，链接名称长度必须在2-50之间。",
            trigger: "blur"
          }
        ],
        linkUrl: [
          {
            required: true,
            message: "必填，链接URL长度必须在2-50之间。",
            trigger: "blur"
          }
        ]
      },
      loading: false,
      data: []
    };
  },
  components: {
    Upload
  },
  created() {
    this.getfriendshipList();
  },
  methods: {
    //查询数据表格
    getfriendshipList() {
      this.$store.dispatch("blogroll/getfriendshipList").then(res => {
        console.log(res);
        this.data = res.data.list;
      });
    },
    //上传图片
    imgChange({ urlList, firstImageUrl }) {
      console.log("上传图片回调", urlList, firstImageUrl);
      this.imgList = urlList;
    },
    // 提交
    onSubmit() {
      this.form.linkLogo = this.imgList.toString();
      this.$refs.ruleForm.validate(valid => {
        if (valid) {
          this.loading = true;
          this.$store
            .dispatch("blogroll/add", this.form)
            .then(res => {
              this.$message.success("新增列表成功");
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
    },
    handleChange(info) {
      if (info.file.status === "uploading") {
        this.loading = true;
        return;
      }
      if (info.file.status === "done") {
        // Get this url from response in real world.
        getBase64(info.file.originFileObj, imageUrl => {
          this.imageUrl = imageUrl;
          this.loading = false;
        });
      }
    },
    beforeUpload(file) {
      const isJpgOrPng =
        file.type === "image/jpeg" || file.type === "image/png";
      if (!isJpgOrPng) {
        this.$message.error("You can only upload JPG file!");
      }
      const isLt2M = file.size / 1024 / 1024 < 2;
      if (!isLt2M) {
        this.$message.error("Image must smaller than 2MB!");
      }
      return isJpgOrPng && isLt2M;
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
    // .addimages {
    //   margin-left: 150px;
    // }
  }
}
</style>
