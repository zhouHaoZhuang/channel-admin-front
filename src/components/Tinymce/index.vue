<template>
  <div class="tinymce-container">
    <editor v-model="tinymceHtml" :key="tinymceFlag" :init="init" />
  </div>
</template>

<script>
import tinymce from "tinymce/tinymce";
import editor from "@tinymce/tinymce-vue";
// 插件+富文本按钮
import plugins from "./plugins";
import toolbar from "./toolbar";
// 字体
// import "tinymce/icons/default";
// 插件
import "tinymce/plugins/contextmenu";
import "tinymce/plugins/colorpicker";
import "tinymce/plugins/textcolor"; // 文字颜色
import "tinymce/themes/silver";
import "tinymce/plugins/lists"; // 列表插件
import "tinymce/plugins/image"; // 插入上传图片插件
import "tinymce/plugins/code"; // 代码
import "tinymce/plugins/table"; // 插入表格插件
import "tinymce/plugins/wordcount"; // 字数统计插件
import "tinymce/plugins/charmap"; //特殊字符
import "tinymce/plugins/codesample"; //插入代码
import "tinymce/plugins/fullscreen"; //全屏
import "tinymce/plugins/insertdatetime"; //时间插入
import "tinymce/plugins/preview"; //预览
import "tinymce/plugins/print"; //打印
import "tinymce/plugins/save"; //保存
import "tinymce/plugins/searchreplace"; //查询替换
import "tinymce/plugins/tabfocus"; //
import "tinymce/plugins/textpattern"; //
import "tinymce/plugins/toc"; //
import "tinymce/plugins/visualblocks"; //
import "tinymce/plugins/visualchars"; //

export default {
  props: {
    //tinyvalue首先在父组件中定义，用于向本子组件mytinymce发送数据
    //然后在这里声明，用于本子组件接收父组件数据
    tinyvalue: {
      type: String,
      default: ""
    }
  },
  components: {
    editor
  },
  watch: {
    // 监听内容变化，用于辅助父子组件之间的通讯
    tinyvalue(newValue) {
      // console.log("监听数据", newValue);
      // tinyvalue是父组件代理人，父组件值一旦变化，推送给子组件
      this.tinymceHtml = newValue;
    },
    tinymceHtml(newValue) {
      // tinymceHtml是子组件的值，如果改变，直接反馈给父组件
      // tinymceinput是父组件中的用于接收子组件的事件（名称写死，用于后面调用）
      // console.log("富文本修改", newValue);
      this.$emit("tinymceinput", newValue);
    }
  },
  data() {
    return {
      // 子组件的数据变量，默认未父组件传递过来的数据
      tinymceHtml: this.tinyvalue,
      // tinymce默认配置参数，含插件，请注意插件路径，如果错误容易保unexpect token ','之类错误
      init: {
        language_url: "/tinymce/langs/zh_CN.js", //指定中文包
        language: "zh_CN", //中文
        skin_url: "/tinymce/skins/ui/oxide", //编辑器皮肤，
        height: 400, //高度
        plugins: plugins,
        toolbar: toolbar,
        fontsize_formats: "12px 14px 16px 18px 20px 24px", // 字号
        branding: false, // 去水印
        // 增加下面的images_upload_handler对象，能够支持上传图片到服务器
        images_upload_handler: (blobInfo, success, failure) => {
          if (blobInfo.blob().size / 1024 / 1024 > 5) {
            failure("上传失败，图片大小请控制在 5M 以内");
          } else {
            const data = new FormData();
            data.set("file", blobInfo.blob());
            // 上传图片
            this.$store
              .dispatch("user/uploadImg", data)
              .then(res => {
                success(res.data); //上传成功，在成功函数里填入图片路径
              })
              .catch(err => {
                failure("上传出错，服务器开小差了呢");
              });
          }
        }
      },
      tinymceFlag: 1
    };
  },
  activated() {
    this.tinymceFlag++;
  },
  mounted() {
    tinymce.init({});
  }
};
</script>

<style lang="less" scoped></style>
