<template>
  <div class="basic-container">
    <div class="content">
      <a-collapse default-active-key="1" :bordered="false">
        <a-collapse-panel key="1" header="This is panel header 1">
          <p>{{ text }}</p>
        </a-collapse-panel>
        <a-collapse-panel
          key="2"
          header="This is panel header 2"
          :disabled="false"
        >
          <p>{{ text }}</p>
        </a-collapse-panel>
        <a-collapse-panel key="3" header="This is panel header 3">
          <p>{{ text }}</p>
        </a-collapse-panel>
      </a-collapse>
    </div>
  </div>
</template>

<script>
export default {};
</script>

<style lang="less" scoped>
.content{
    padding-top: 10px;
}
</style>
