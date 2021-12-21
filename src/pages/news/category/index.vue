<template>
  <div class="category-list-container">
    <div>
      <div>
        <a-space>
          <a-button type="primary">
            <a-icon type="plus" />添加类别
          </a-button>
          <a-button>
            <span class="sort-icon">
              <a-icon type="swap" />
            </span>
            排序
          </a-button>
        </a-space>
      </div>
      <div class="category-list-table">
        <a-table :columns="columns"
                 :data-source="data">
          <a slot="name"
             slot-scope="text">{{ text }}</a>
          <div slot="actions"
               slot-scope="text">
            <a-button type="link"
                      @click="look(text)">
              查看
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
      columns: [
        {
          title: 'ID',
          dataIndex: 'id',
          scopedSlots: { customRender: 'id' },
        },
        {
          title: '名称',
          dataIndex: 'name',
        },
        {
          title: '英文',
          dataIndex: 'english',
        },
        {
          title: '新闻数量',
          dataIndex: 'newsNum',
        }, {
          title: '状态',
          dataIndex: 'state',
        }, {
          title: '操作',
          dataIndex: 'id',
          key: 'actions',
          scopedSlots: { customRender: 'actions' },
        },
      ],
      data: []
    }
  },
  methods: {
    look (text) {
      console.log(text)
    }
  },
}
</script>

<style>
.sort-icon {
  transform: rotate(90deg);
  margin-right: 10px;
}
.category-list-container {
  margin: 10px;
  padding: 10px;
  background-color: #fff;
}
.category-list-table {
  margin-top: 10px;
}
</style>