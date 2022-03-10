<template>
  <div class="system-role-detail-container">
    <div class="role-info">
      <div class="public-title">角色关联资源</div>
      <div class="item">
        <div class="label">
          角色名称：
        </div>
        <div class="value">
          商品运行
        </div>
      </div>
      <div class="item">
        <div class="label">
          角色描述：
        </div>
        <div class="value">
          商品运行xxxxxx
        </div>
      </div>
    </div>
    <div class="tree-wrap">
      <div class="public-title">关联资源</div>
      <div class="info-box">
        <a-icon class="icon" type="info-circle" theme="filled" />
        如果取消关联父级节点，对应的子级节点都会取消关联！
      </div>
      <a-tree
        v-model="checkedKeys"
        :replace-fields="replaceFields"
        checkable
        :show-line="true"
        :defaultExpandAll="true"
        :tree-data="treeData"
        @check="onCheck"
      />
    </div>
    <div class="btn-wrap">
      <a-space>
        <a-button type="primary" :loading="loading" @click="handleSave">
          保存
        </a-button>
        <a-button @click="handleCancel">
          取消
        </a-button>
      </a-space>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      treeData: [
        {
          title: "0-0",
          key: "0-0",
          children: [
            {
              title: "0-0-0",
              key: "0-0-0",
              children: [
                { title: "0-0-0-0", key: "0-0-0-0" },
                { title: "0-0-0-1", key: "0-0-0-1" },
                { title: "0-0-0-2", key: "0-0-0-2" }
              ]
            },
            {
              title: "0-0-1",
              key: "0-0-1",
              children: [
                { title: "0-0-1-0", key: "0-0-1-0" },
                { title: "0-0-1-1", key: "0-0-1-1" },
                { title: "0-0-1-2", key: "0-0-1-2" }
              ]
            },
            {
              title: "0-0-2",
              key: "0-0-2"
            }
          ]
        },
        {
          title: "0-1",
          key: "0-1",
          children: [
            { title: "0-1-0-0", key: "0-1-0-0" },
            { title: "0-1-0-1", key: "0-1-0-1" },
            { title: "0-1-0-2", key: "0-1-0-2" }
          ]
        },
        {
          title: "0-2",
          key: "0-2"
        }
      ],
      // 自定义渲染节点的字段
      replaceFields: { children: "children", title: "title", key: "key" },
      // 多选选择的数据
      checkedKeys: [],
      // 权限菜单数据
      permMap: [],
      loading: false
    };
  },
  computed: {
    code() {
      return this.$route.query.code;
    }
  },
  watch: {
    $route: {
      handler(newVal) {
        if (newVal.path === "/organization/admin/relation") {
          // this.getPermMap();
        }
      },
      immediate: true,
      deep: true
    }
  },
  methods: {
    // 获取权限菜单
    getPermMap() {
      this.$store
        .dispatch("system/getRoleDetail", { code: this.code })
        .then(res => {
          this.permMap = [...res.data];
        });
    },
    // 多选框选择
    onCheck(checkedKeys) {
      console.log("checkedKeys", checkedKeys);
      this.checkedKeys = [...checkedKeys];
    },
    // 取消
    handleCancel() {
      this.$router.back();
    },
    // 保存
    handleSave() {
      this.loading = true;
      this.$store
        .dispatch("system/addRole", this.permMap)
        .then(res => {
          this.$message.success("角色关联资源成功");
          this.$router.back();
        })
        .finally(() => {
          this.loading = false;
        });
    }
  }
};
</script>

<style lang="less" scoped>
.system-role-detail-container {
  min-height: 1200px;
  background: #fff;
  padding: 24px 24px 4px;
  color: #000;
  .public-title {
    font-size: 16px;
    font-weight: 700;
    margin-bottom: 15px;
    border-bottom: 1px solid #ccc;
    padding-bottom: 5px;
  }
  .role-info {
    margin-bottom: 15px;
    .item {
      display: flex;
      margin-bottom: 8px;
      .label {
        width: 100px;
        text-align: right;
        margin-right: 5px;
      }
    }
  }
  .tree-wrap {
    .info-box {
      display: flex;
      align-items: center;
      background: rgba(31, 148, 255, 0.2);
      border: 1px solid #1f94ff;
      color: #51575a;
      border-radius: 5px;
      padding: 5px 8px;
      margin-bottom: 10px;
      .icon {
        color: #1f94ff;
        margin-right: 10px;
      }
    }
  }
  .btn-wrap {
    margin-top: 30px;
    display: flex;
    justify-content: center;
  }
}
</style>
