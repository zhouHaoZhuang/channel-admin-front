<template>
  <div class="work-list-container">
    <!-- 表格 -->
    <PublicTable :tabsKey="tabsKey" />
  </div>
</template>

<script>
import PublicTable from "@/components/WorkOrder/PublicTable/index.vue";
export default {
  components: {
    PublicTable
  },
  data() {
    return {
      tabsKey: 0
    };
  },
  methods: {}
};
</script>

<style lang="less" scoped>
.work-list-container {
  margin: 0 20px;
  padding: 10px;
  background-color: #fff;
}
</style>
