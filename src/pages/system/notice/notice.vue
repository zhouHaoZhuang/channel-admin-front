<template>
  <div class="notice-container">
    <div class="top-title">
      <span
        :class="{ cutover: item.key == cutover, topTitle: true }"
        v-for="item in topList"
        :key="item.key"
      >
        {{ item.title }}
      </span>
    </div>
    <div>
      <div class="search">
        <a-input
          style="width: 150px"
          placeholder="搜索关键词"
          v-model="listQuery.search"
          allow-clear
        />
        <a-select
          default-value=""
          style="width: 120px; margin: 0 10px;"
          v-model="listQuery['qp-templateStatus-eq']"
        >
          <a-select-option value="">
            模板类型
          </a-select-option>
          <a-select-option :value="0">
            验证码
          </a-select-option>
          <a-select-option :value="1">
            通知
          </a-select-option>
        </a-select>
        <a-button type="primary" @click="getList()">
          查询
        </a-button>
      </div>
      <div>
        <a-table
          :columns="columns"
          :data-source="data"
          bordered
          :pagination="false"
        >
          <template slot="name" slot-scope="text">
            <a>{{ text }}</a>
          </template>
          <template slot="templateName" slot-scope="text, record">
            <a-checkbox
              v-model="data[record.key].templateNameBool"
              @change="itemAll(record.key, $event)"
            >
              {{ text }}
            </a-checkbox>
          </template>
          <template slot="smsStatusBool" slot-scope="text, record">
            <a-checkbox
              v-if="data[record.key].smsStatusBool != 2"
              v-model="data[record.key].smsStatusBool"
              @change="itemCheckbox(record.key)"
            >
              短信通知
            </a-checkbox>
            <div v-else>
              -----
            </div>
          </template>
          <template slot="emailStatusBool" slot-scope="text, record">
            <a-checkbox
              v-if="data[record.key].emailStatusBool != 2"
              v-model="data[record.key].emailStatusBool"
              @change="itemCheckbox(record.key)"
            >
              邮件通知
            </a-checkbox>
            <div v-else>
              -----
            </div>
          </template>
          <template slot="onsiteStatusBool" slot-scope="text, record">
            <a-checkbox
              v-if="data[record.key].onsiteStatusBool != 2"
              v-model="data[record.key].onsiteStatusBool"
              @change="itemCheckbox(record.key)"
            >
              站内信通知
            </a-checkbox>
            <div v-else>
              -----
            </div>
          </template>
          <!-- <template slot="wx">
            <a-checkbox @change="onChange">
              微信通知
            </a-checkbox>
          </template> -->
          <template slot="manage" slot-scope="text, record">
            <a-button
              v-permission="'view'"
              type="link"
              @click="templateJump(record.templateCode, record.code)"
            >
              短信模板
            </a-button>
            <a-divider type="vertical" />
            <a-button
              v-permission="'view'"
              type="link"
              @click="templateJump(record.templateCode, record.code)"
            >
              邮件模板
            </a-button>
            <a-divider type="vertical" />
            <a-button
              v-permission="'view'"
              type="link"
              @click="templateJump(record.templateCode, record.code)"
            >
              站内信模板
            </a-button>
          </template>
        </a-table>
      </div>
      <a-button type="primary" style="margin-top:20px" @click="enterChanges">
        确认修改
      </a-button>
    </div>
  </div>
</template>

<script>
// 数据结构
let data = [
  {
    key: "0",
    name: "会员",
    tel: true,
    phone: false,
    age: "后台登陆验证码",
    // agech: false, //当前选项的全选
    address: false
  },
  {
    key: "1",
    name: "会员",
    age: "会员验证码",
    // agech: false,    //当前选项的全选
    tel: false,
    phone: true,
    address: false
  },
  {
    key: "2",
    name: "你好",
    age: "找回密码验证码",
    tel: true,
    phone: false,
    address: false
  },
  {
    key: "3",
    name: "你好",
    age: "修改邮箱验证码",
    tel: true,
    phone: true,
    address: true
  },
  {
    key: "4",
    name: "你好",
    age: "修改邮箱验证码",
    tel: true,
    phone: true,
    address: true
  },
  {
    key: "5",
    name: "你好",
    age: "修改邮箱验证码",
    tel: true,
    phone: false,
    address: true
  },
  {
    key: "6",
    name: "客服",
    age: "客服验证码",
    tel: true,
    phone: true,
    address: true
  },
  {
    key: "7",
    name: "客服",
    age: "修改客服验证码",
    tel: false,
    phone: false,
    address: true
  }
];
export default {
  data() {
    const columns = [
      {
        title: "场景",
        dataIndex: "name",
        colSpan: 2,
        customRender: (text, record, index) => {
          if (!record.nameLength) {
            return {
              children: <span>{text}</span>,
              attrs: {
                rowSpan: 0
              }
            };
          }
          let checkAll = this.data
            .slice(index, record.nameLength + index)
            .every(item => {
              return item.templateNameBool;
            });
          return {
            children: (
              <div>
                <a-checkbox
                  checked={checkAll}
                  onchange={$event => {
                    this.onCheckAllChange(index, record.nameLength, $event);
                  }}
                >
                  <span>{text}</span>
                </a-checkbox>
              </div>
            ),
            attrs: {
              rowSpan: record.nameLength
            }
          };
        }
      },
      {
        title: "场景",
        dataIndex: "templateName",
        colSpan: 0,
        // customRender: renderContent,
        scopedSlots: { customRender: "templateName" }
      },
      {
        title: "短信开关",
        dataIndex: "smsStatusBool",
        // customRender: renderContent,
        scopedSlots: { customRender: "smsStatusBool" }
      },
      {
        title: "邮件开关",
        dataIndex: "emailStatusBool",
        scopedSlots: { customRender: "emailStatusBool" }
      },
      {
        title: "站内信开关",
        dataIndex: "onsiteStatusBool",
        scopedSlots: { customRender: "onsiteStatusBool" }
      },
      // {
      //   title: "微信通知开关",
      //   dataIndex: "wx",
      //   scopedSlots: { customRender: "wx" }
      // },
      {
        title: "模板管理",
        dataIndex: "manage",
        scopedSlots: { customRender: "manage" }
      }
    ];
    return {
      data: [],
      columns,
      cutover: "1",
      topList: [
        {
          title: "短信、邮件、站内信",
          key: "1"
        }
        // {
        //   title:'短信、邮件、站内信、微信',
        //   key:'1',
        // }
      ],
      listQuery: {
        key: "qp-templateName-like",
        search: "",
        currentPage: 1,
        pageSize: 999,
        total: 0,
        startTime: "",
        endTime: "",
        newTypeCode: "",
        "qp-templateStatus-eq": ""
      }
    };
  },
  activated() {
    this.getList();
  },
  methods: {
    // 场景二级分类的事件
    itemAll(index, e) {
      console.log(index, e.target.checked);
      this.data[index].emailStatusBool = e.target.checked;
      this.data[index].onsiteStatusBool = e.target.checked;
      this.data[index].smsStatusBool = e.target.checked;
    },
    // 三级选框的事件
    itemCheckbox(index) {
      if (
        this.data[index].emailStatusBool &&
        this.data[index].onsiteStatusBool &&
        this.data[index].smsStatusBool
      ) {
        this.data[index].templateNameBool = true;
      } else {
        this.data[index].templateNameBool = false;
      }
    },
    // 一级选框的事件
    onCheckAllChange(index, nameLength, e) {
      this.data.slice(index, nameLength + index).forEach(element => {
        element.emailStatusBool = e.target.checked;
        element.onsiteStatusBool = e.target.checked;
        element.smsStatusBool = e.target.checked;
        element.templateNameBool = e.target.checked;
      });
    },
    // 获取列表数据
    getList() {
      this.$getList("notice/getList", this.listQuery).then(res => {
        // console.log(res);
        res.data.list = res.data.channelConfiguration;
        let arr = [];
        // 给数据增加第一级处理
        for (const key in res.data.list) {
          console.log(key);
          res.data.list[key].forEach((item, index) => {
            item.name = key;
            if (index == 0) {
              item.nameLength = res.data.list[key].length;
            }
            arr.push(item);
          });
        }
        console.log(res.data.list, arr, "-----------");
        res.data.list = arr;
        // 数据第二级，三级处理
        res.data.list.forEach((item, index) => {
          item.key = index;
          item.emailStatusBool =
            item.emailStatus == 2
              ? item.emailStatus
              : Boolean(item.emailStatus * 1);
          item.onsiteStatusBool =
            item.onsiteStatus == 2
              ? item.onsiteStatus
              : Boolean(item.onsiteStatus * 1);
          item.smsStatusBool =
            item.smsStatus == 2 ? item.smsStatus : Boolean(item.smsStatus * 1);
          if (
            item.emailStatusBool &&
            item.onsiteStatusBool &&
            item.smsStatusBool
          ) {
            item.templateNameBool = true;
            return;
          }
          item.templateNameBool = false;
        });
        this.data = res.data.list;
      });
    },
    // 确认修改
    enterChanges() {
      this.data.forEach(item => {
        item.emailStatus = Number(item.emailStatusBool);
        item.onsiteStatus = Number(item.onsiteStatusBool);
        item.smsStatus = Number(item.smsStatusBool);
      });
      // console.log(this.data, "处理后");
      this.$store.dispatch("notice/editDisCount", this.data).then(res => {
        this.$message.success("修改成功");
      });
    },
    // 模板跳转回调函数
    templateJump(templateCode, code) {
      console.log(templateCode, code);
      this.$router.push({
        path: "/system/basics/mouldboard",
        query: {
          templateCode,
          code
        }
      });
    }
  }
};
</script>

<style lang="less" scoped>
.notice-container {
  margin-left: 20px;
  background-color: #fff;
  padding: 20px;
  .top-title {
    margin-bottom: 20px;
    border-bottom: 1px solid #e0e0e0;
    padding-bottom: 8px;
  }
}
.topTitle {
  font-size: 16px;
  color: #333;
  padding: 10px 20px;
}
.search {
  margin-bottom: 20px;
}
.cutover {
  color: #06f;
  border: #06f solid 1px;
  border-bottom: 1px solid #fff;
}
</style>
