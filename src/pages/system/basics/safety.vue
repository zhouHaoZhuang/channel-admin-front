<template>
  <div class="member-container">
    <div class="content">
      <a-collapse default-active-key="1" :bordered="false" class="aa">
        <a-collapse-panel key="1" header="网站开关">
          <a-form-model
            ref="ruleForm"
            :model="form"
            :rules="rules"
            :label-col="labelCol"
            :wrapper-col="wrapperCol"
          >
            <a-form-model-item label="关闭网站">
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
      </a-collapse>
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
  components: {},
  methods: {
    imgChange({ urlList, firstImageUrl }) {
      console.log("上传图片回调", urlList, firstImageUrl);
      this.imgList = urlList;
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
