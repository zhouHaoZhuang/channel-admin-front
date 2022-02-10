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
        <a-input style="width: 120px" placeholder="搜索关键词" />
        <a-select default-value="jack" style="width: 150px;margin-left: 10px;">
          <a-select-option value="jack">
            模板模块
          </a-select-option>
          <a-select-option value="lucy">
            证书
          </a-select-option>
          <a-select-option value="disabled">
            云虚拟主机
          </a-select-option>
        </a-select>
        <a-select default-value="jack" style="width: 120px; margin: 0 10px;">
          <a-select-option value="jack">
            模板类型
          </a-select-option>
          <a-select-option value="lucy">
            短信验证码
          </a-select-option>
          <a-select-option value="disabled">
            短信通知
          </a-select-option>
        </a-select>
        <a-button type="primary">
          查询
        </a-button>
      </div>
      <div>
        <a-table :columns="columns" :data-source="data" bordered>
          <template slot="name" slot-scope="text">
            <a>{{ text }}</a>
          </template>
          <template slot="age" slot-scope="text,record">
            <a-checkbox v-model="data[record.key].agech">
              {{ text }}
            </a-checkbox>
          </template>
          <template slot="tel" slot-scope="text,record">
            <a-checkbox v-model="data[record.key].tel">
              短信通知
            </a-checkbox>
          </template>
          <template slot="phone">
            <a-checkbox @change="onChange">
              邮件通知
            </a-checkbox>
          </template>
          <template slot="address">
            <a-checkbox @change="onChange">
              站内信通知
            </a-checkbox>
          </template>
          <!-- <template slot="wx">
            <a-checkbox @change="onChange">
              微信通知
            </a-checkbox>
          </template> -->
          <template slot="manage">
            <a-button v-permission="'view'" type="link" class="">
              短信模板
            </a-button>
            <a-divider type="vertical" />
            <a-button v-permission="'view'" type="link" class="">
              邮件模板
            </a-button>
            <a-divider type="vertical" />
            <a-button v-permission="'view'" type="link" class="">
              站内信模板
            </a-button>
          </template>
        </a-table>
      </div>
    </div>
  </div>
</template>

<script>
// const renderContent = (value, row, index) => {
//   const obj = {
//     children: value,
//     attrs: {}
//   };
//   if (index === 4) {
//     // obj.attrs.colSpan = 0;
//   }
//   return obj;
// };

const data = [
  {
    key: "0",
    name: "会员",
    tel: true,
    phone: 18889898888,
    age: "后台登陆验证码",
    agech: false,
    address: "London No. 1 Lake Park",
  },
  {
    key: "1",
    name: "Joe Black",
    age: "修改邮箱验证码",
    agech: false,
    tel: false,
    phone: 18900010002,
    address: "Sidney No. 1 Lake Park"
  },
  {
    key: "2",
    name: "Jim Red",
    age: '找回密码验证码',
    agech: false,
    tel: true,
    phone: 18900010002,
    address: "London No. 2 Lake Park"
  },
  {
    key: "3",
    name: "Jake White",
    age: '修改邮箱验证码',
    agech: true,
    tel: false,
    phone: 18900010002,
    address: "Dublin No. 2 Lake Park"
  }
];
const plainOptions = ["Apple", "Pear", "Orange"];
const defaultCheckedList = ["Apple", "Orange"];
export default {
  data() {
    const columns = [
      {
        title: "场景",
        dataIndex: "name",
        colSpan: 2,
        customRender: (text, record, index) => {
          if (index == 0) {
            return {
              children: (
                <div>
                  <a-checkbox
                    indeterminate={this.indeterminate}
                    checked={this.checkAll}
                    onchange={this.onCheckAllChange}
                  >
                    <a href="javascript:;">{text}{record.age}</a>
                  </a-checkbox>
                </div>
              ),
              attrs: {
                rowSpan: 4
              }
            };
          }
          return {
            children: <a href="javascript:;">{text}</a>,
            attrs: {
              rowSpan: 0
            }
          };
        }
      },
      {
        // title: "Age",
        dataIndex: "age",
        colSpan: 0,
        // customRender: renderContent,
        scopedSlots: { customRender: "age" }
      },
      {
        title: "短信开关",
        dataIndex: "tel",
        // customRender: renderContent,
        scopedSlots: { customRender: "tel" }
      },
      {
        title: "邮件开关",
        // colSpan: 1,
        dataIndex: "phone",
        scopedSlots: { customRender: "phone" }
      },
      {
        title: "站内信开关",
        dataIndex: "address",
        scopedSlots: { customRender: "address" }
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
      data,
      columns,
      cutover: "1",
      checkedList: defaultCheckedList,
      indeterminate: true,
      checkAll: false,
      plainOptions,
      topList: [
        {
          title: "短信、邮件、站内信、微信",
          key: "1"
        }
        // {
        //   title:'短信、邮件、站内信、微信',
        //   key:'1',
        // }
      ]
    };
  },
  methods: {
    onChange(checkedList) {
      this.indeterminate =
        !!checkedList.length && checkedList.length < plainOptions.length;
      this.checkAll = checkedList.length === plainOptions.length;
    },
    onCheckAllChange(e) {
      Object.assign(this, {
        checkedList: e.target.checked ? plainOptions : [],
        indeterminate: false,
        checkAll: e.target.checked
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
.search{
  margin-bottom: 20px;
}
.cutover {
  color: #06f;
  border: #06f solid 1px;
  border-bottom: 1px solid #fff;
}
</style>
