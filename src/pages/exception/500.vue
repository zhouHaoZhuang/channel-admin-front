<template>
  <exception-page
    class="exception-container"
    :home-route="firstPath"
    type="500"
  />
</template>

<script>
import ExceptionPage from "@/components/exception/ExceptionPage";
import { mapState } from "vuex";
export default {
  name: "Exp500",
  components: { ExceptionPage },
  computed: {
    ...mapState("setting", ["firstPath"])
  }
};
</script>

<style scoped lang="less">
.exception-container {
  width: 100vw;
  height: 100vh;
}
</style>
