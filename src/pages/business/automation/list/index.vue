<template>
  <div class="automation-container">
    <div>
      <div class="public-header-wrap">
        <a-form-model layout="inline">
          <a-form-model-item>
            <a-button type="primary" @click="search">
              +业务开通
            </a-button>
          </a-form-model-item>
          <!-- 下拉框 -->
          <a-form-model-item>
            <a-select style="width:120px" allowClear placeholder="请选择">
              <a-select-option value="任务ID">
                任务ID
              </a-select-option>
              <a-select-option value="用户ID">
                用户ID
              </a-select-option>
              <a-select-option value="服务器ID">
                服务器ID
              </a-select-option>
              <a-select-option value="服务器IP">
                服务器IP
              </a-select-option>
              <a-select-option value="宿主机ID">
                宿主机ID
              </a-select-option>
              <a-select-option value="宿主机IP">
                宿主机IP
              </a-select-option>
            </a-select>
          </a-form-model-item>
          <!-- 搜索 -->
          <a-form-model-item>
            <a-input v-model="listQuery.search" placeholder="搜索关键词" />
          </a-form-model-item>
          <!-- 按钮 -->
          <a-form-model-item>
            <a-button type="primary" @click="search">
              查询
            </a-button>
          </a-form-model-item>
          <div class="public-header-filter">
            <a-form-model-item>
              <a-button @click="isfilter = !isfilter">
                <a-icon :type="isfilter ? 'up' : 'down'" />
                <!-- <a-icon type="up" /> -->
                高级筛选
              </a-button>
            </a-form-model-item>
          </div>
        </a-form-model>
        <div v-show="isfilter" class="member-filterall">
          <div class="member-filter">
            <div>
              <div>
                <span class="filter-type">操作类型</span>
                <a-select
                  style="width: 120px"
                  @change="handleChange"
                  placeholder="请选择"
                >
                  <a-select-option value="jack">
                    重建
                  </a-select-option>
                  <a-select-option value="lucy">
                    迁移
                  </a-select-option>
                </a-select>
              </div>
              <div class="registerDate">
                <span class="filter-type">时间 </span
                ><span class="date-picker-create"
                  ><a-date-picker placeholder="创建时间开始"></a-date-picker
                ></span>
                <span class="left5"> 至 </span>
                <span class="date-picker-create left5"
                  ><a-date-picker placeholder="创建时间结束"></a-date-picker
                ></span>
              </div>
            </div>
            <div>
              <div>
                <span class="filter-type">执行状态</span>
                <a-select
                  placeholder="请选择"
                  style="width: 120px"
                  @change="handleChange"
                >
                  <a-select-option value="jack">
                    执行成功
                  </a-select-option>
                  <a-select-option value="lucy">
                    接口不通
                  </a-select-option>
                  <a-select-option value="lucy">
                    接口错误
                  </a-select-option>
                  <a-select-option value="lucy">
                    接口繁忙
                  </a-select-option>
                  <a-select-option value="lucy">
                    执行超时
                  </a-select-option>
                  <a-select-option value="lucy">
                    执行失败
                  </a-select-option>
                </a-select>
              </div>
            </div>
            <div>
              <div>
                <span class="filter-type">任务状态</span>
                <a-select
                  placeholder="任务状态"
                  style="width: 120px"
                  @change="handleChange"
                >
                  <a-select-option value="jack">
                    未完成
                  </a-select-option>
                  <a-select-option value="lucy">
                    已完成
                  </a-select-option>
                </a-select>
              </div>
            </div>
          </div>
          <div class="enter">
            <a-button @click="isfilter = false">清除 </a-button>
            <a-button type="primary" @click="isfilter = false">
              确定
            </a-button>
          </div>
        </div>
      </div>
      <div>
        <a-table
          :loading="tableLoading"
          :columns="columns"
          :data-source="data"
          rowKey="id"
          :scroll="{ x: 1300 }"
        >
        </a-table>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      isfilter: false,
      listQuery: {},
      tableLoading:false,
      data:[],
      columns:[
        {
          title:'任务ID',
          dataIndex:'taskId',
        },
        {
          title:'操作员',
          dataIndex:'taskUser',
        },
        {
          title:'服务器ID',
          dataIndex:'serverId',
        },
        {
          title:'服务器IP',
          dataIndex:'serverIP',
        },
        {
          title:'宿主机IP',
          dataIndex:'hostIP',
        },
        {
          title:'操作类型',
          dataIndex:'actionType',
        },
        {
          title:'创建时间',
          dataIndex:'createTime',
        },
        {
          title:'发送时间',
          dataIndex:'sendTime',
        },
        {
          title:'执行状态',
          dataIndex:'actionStatus',
        },
        {
          title:'返回时间',
          dataIndex:'backTime',
        },
        {
          title:'执行耗时',
          dataIndex:'runTime',
        },
        {
          title:'任务状态',
          dataIndex:'taskStatus',
        },
        {
          title:'操作',
          dataIndex:'action',
          fixed:'right',
        }
      ]
    };
  },
  methods: {
    handleChange(value) {
      console.log(value);
    },
    handleClick() {
      this.isfilter = !this.isfilter;
    },
    search() {
      console.log("search");
    }
  }
};
</script>

<style lang="less" scoped>
.public-header-wrap {
  padding-bottom: 10px;
  .public-header-filter {
    margin-left: 550px;
    display: inline-block;
    button {
      margin-left: 10px;
    }
  }
}
.automation-container {
  margin-left: 20px;
  background-color: #fff;
  padding: 20px;
}
.member-filterall {
  border: 1px solid #e0e0e0;
  width: 1220px;
  // margin-left: 25px;
  background-color: #fafafa;
  .member-filter {
    display: flex;
    width: 1220px;
    border: 1px solid #e0e0e0;
    background-color: #fafafa;
    margin-top: -1px;
    margin-left: -1px;
    padding: 20px;
    .div-input100 {
      display: inline-block;
      width: 100px;
    }
    .date-picker-create {
      width: 170px;
    }
    .left5 {
      margin-left: 5px;
    }
    > div {
      flex: 1;
      > div {
        margin-bottom: 20px;
      }
      > div:last-child {
        margin-bottom: 0;
      }
    }
    .filter-type {
      display: inline-block;
      width: 67px;
      height: 16px;
      color: #a3a3a3;
      font-size: 12px;
      text-align: left;
    }
    .registerDate {
      width: 320px;
      display: flex;
      align-items: center;
      .date-picker {
        width: 120px;
      }
    }
  }
  .enter {
    text-align: right;
    padding: 10px 0;
    padding-right: 30px;
    button {
      margin-right: 10px;
    }
  }
}
</style>
