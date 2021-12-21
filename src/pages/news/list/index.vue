<template>
  <div class="news-list-container">
    <div>
      <div>
        <a-row :gutter="8">
          <a-col :span="2">
            <a-button type="primary">
              <a-icon type="plus" />添加新闻
            </a-button>
          </a-col>
          <a-col :span="2">
            <a-select default-value="jack"
                      style="width: 120px">
              <a-select-option value="jack">
                标题
              </a-select-option>
              <a-select-option value="context">
                内容
              </a-select-option>
            </a-select>
          </a-col>
          <a-col :span="2">
            <a-input placeholder="搜索关键词" />
          </a-col>
          <a-col :span="6">
            <a-date-picker v-model="startValue"
                           :disabled-date="disabledStartDate"
                           show-time
                           format="YYYY-MM-DD HH:mm:ss"
                           placeholder="开始日期"
                           @openChange="handleStartOpenChange" />
            <a-date-picker v-model="endValue"
                           :disabled-date="disabledEndDate"
                           show-time
                           format="YYYY-MM-DD HH:mm:ss"
                           placeholder="结束日期"
                           :open="endOpen"
                           @openChange="handleEndOpenChange" />

          </a-col>

          <a-col :span="2">
            <a-select default-value="jack"
                      style="width: 120px">
              <a-select-option value="jack">
                分类
              </a-select-option>
            </a-select>
          </a-col>
          <a-button type="primary">
            查询
          </a-button>
        </a-row>
      </div>
      <div class="news-list-table">
        <a-table :columns="columns"
                 :data-source="data">
          <a slot="name"
             slot-scope="text">{{ text }}</a>
          <div slot="actions"
               slot-scope="text">
            <a-button type="link"
                      @click="change(text)">
              修改
            </a-button>
            <a-divider type="vertical" />
            <a-button type="link">
              删除
            </a-button>
          </div>
        </a-table>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  data () {
    return {
      startValue: null,
      endValue: null,
      endOpen: false,
      data: [],
      columns: [
        {
          title: 'ID',
          dataIndex: 'id',
          scopedSlots: { customRender: 'id' },
        },
        {
          title: '标题',
          dataIndex: 'title',
        },
        {
          title: '分类',
          dataIndex: 'type',
        },
        {
          title: '添加时间',
          dataIndex: 'addTime',
        },
        {
          title: '置顶状态',
          dataIndex: 'topState',
        },
        {
          title: '跳转状态',
          dataIndex: 'jumpState',
        },
        {
          title: '操作',
          dataIndex: 'actions',
          scopedSlots: { customRender: 'actions' },
        },
      ],
    }
  },
  watch: {
    startValue (val) {
      console.log('startValue', val);
    },
    endValue (val) {
      console.log('endValue', val);
    },
  },
  methods: {
    change (text) {
      console.log(text)
    },
    disabledStartDate (startValue) {
      const endValue = this.endValue;
      if (!startValue || !endValue) {
        return false;
      }
      return startValue.valueOf() > endValue.valueOf();
    },
    disabledEndDate (endValue) {
      const startValue = this.startValue;
      if (!endValue || !startValue) {
        return false;
      }
      return startValue.valueOf() >= endValue.valueOf();
    },
    handleStartOpenChange (open) {
      if (!open) {
        this.endOpen = true;
      }
    },
    handleEndOpenChange (open) {
      this.endOpen = open;
    },
  },

}
</script>

<style lang="less" scoped>
.news-list-container {
  background-color: #fff;
  margin: 10px;
  padding: 10px;
}
.news-list-table {
  margin-top: 10px;
}
</style>