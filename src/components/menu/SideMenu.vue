<template>
  <a-layout-sider
    :theme="sideTheme"
    :class="['side-menu', 'beauty-scroll', isMobile ? null : 'shadow']"
    width="256px"
    :collapsible="collapsible"
    v-model="collapsed"
    :trigger="null"
  >
    <div :class="['logo', theme]">
      <router-link :to="firstPath">
        <img  :src="logoUrl" />
        <!-- <h1>{{ systemName }}</h1> -->
      </router-link>
    </div>
    <!-- logo -->
    <!-- <div class="box-wrap"></div> -->
    <i-menu
      :theme="theme"
      :collapsed="collapsed"
      :options="menuData"
      @select="onSelect"
      class="menu"
    />
  </a-layout-sider>
</template>

<script>
import IMenu from "./menu";
import { mapState } from "vuex";
export default {
  name: "SideMenu",
  components: { IMenu },
  data() {
    return {
      logoUrl: ""
    };
  },
  props: {
    collapsible: {
      type: Boolean,
      required: false,
      default: false
    },
    collapsed: {
      type: Boolean,
      required: false,
      default: false
    },
    menuData: {
      type: Array,
      required: true
    },
    theme: {
      type: String,
      required: false,
      default: "dark"
    }
  },
  computed: {
    sideTheme() {
      return this.theme == "light" ? this.theme : "dark";
    },
    ...mapState("setting", ["isMobile", "systemName", "firstPath"])
  },
  created() {
    this.getInfo();
  },
  methods: {
    onSelect(obj) {
      this.$emit("menuSelect", obj);
    },
    // 获取logo
    getInfo() {
      this.$store.dispatch("globalBasic/getInfo").then(res => {
        this.logoUrl = res.data.adminCenterLogo;
        console.log(this.logoUrl);
      });
    }
  }
};
</script>

<style lang="less" scoped>
@import "index";
.logo {
  width: 100%;
  a {
    display: block;
    width: 100%;
  }
}
</style>
