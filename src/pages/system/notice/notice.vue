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
        <a-table
          :columns="columns"
          :data-source="data"
          bordered
          :pagination="false"
        >
          <template slot="name" slot-scope="text">
            <a>{{ text }}</a>
          </template>
          <template slot="age" slot-scope="text, record">
            <a-checkbox
              v-model="data[record.key].agech"
              @change="itemAll(record.key, $event)"
            >
              {{ text }}
            </a-checkbox>
          </template>
          <template slot="tel" slot-scope="text, record">
            <a-checkbox
              v-model="data[record.key].tel"
              @change="itemCheckbox(record.key)"
            >
              短信通知
            </a-checkbox>
          </template>
          <template slot="phone" slot-scope="text, record">
            <a-checkbox
              v-model="data[record.key].phone"
              @change="itemCheckbox(record.key)"
            >
              邮件通知
            </a-checkbox>
          </template>
          <template slot="address" slot-scope="text, record">
            <a-checkbox
              v-model="data[record.key].address"
              @change="itemCheckbox(record.key)"
            >
              站内信通知
            </a-checkbox>
          </template>
          <!-- <template slot="wx">
            <a-checkbox @change="onChange">
              微信通知
            </a-checkbox>
          </template> -->
          <template slot="manage">
            <a-button v-permission="'view'" type="link" @click="templateJump">
              短信模板
            </a-button>
            <a-divider type="vertical" />
            <a-button v-permission="'view'" type="link" @click="templateJump">
              邮件模板
            </a-button>
            <a-divider type="vertical" />
            <a-button v-permission="'view'" type="link" @click="templateJump">
              站内信模板
            </a-button>
          </template>
        </a-table>
      </div>
      <a-button type="primary" style="margin-top:20px">
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
// 对于二级选框的处理
data.forEach(item => {
  if (
    (item.tel != undefined ? item.tel : true) &&
    (item.phone != undefined ? item.phone : true) &&
    (item.address != undefined ? item.address : true)
  ) {
    item.agech = true;
    return;
  }
  item.agech = false;
});
console.log(data);
// 给一级选框添加nameLength，（表示当前一级目录下的二级目录个数）
var name = data[data.length - 1].name; //初始值需等于数组中的最后一个值的name
data.reduceRight((acc, currentValue, currentIndex) => {
  // console.log(acc, currentValue, currentIndex);
  if (currentIndex == 0) {
    data[0].nameLength = acc + 1;
  }
  if (currentValue.name !== name) {
    name = currentValue.name;
    if (currentIndex + 1 == data.length) {
      currentIndex = currentIndex - 1;
    }
    data[currentIndex + 1].nameLength = acc;
    acc = 0;
  }
  return acc + 1;
}, 0);
export default {
  data() {
    // let a = "";
    // let num = 0;
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
          // a = record.name;
          let checkAll = this.data
            .slice(index, record.nameLength + index)
            .every(item => {
              return item.agech;
            });
          // if (index == 0) {
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
        title: "Age",
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
    // 场景二级分类的事件
    itemAll(index, e) {
      console.log(index, e.target.checked);
      if (this.data[index].tel != undefined) {
        this.data[index].tel = e.target.checked;
      }
      if (this.data[index].phone != undefined) {
        this.data[index].phone = e.target.checked;
      }
      if (this.data[index].address != undefined) {
        this.data[index].address = e.target.checked;
      }
    },
    // 三级选框的事件
    itemCheckbox(index) {
      if (
        (this.data[index].tel != undefined ? this.data[index].tel : true) &&
        (this.data[index].phone != undefined ? this.data[index].phone : true) &&
        (this.data[index].address != undefined
          ? this.data[index].address
          : true)
      ) {
        this.data[index].agech = true;
      } else {
        this.data[index].agech = false;
      }
    },
    // 一级选框的事件
    onCheckAllChange(index, nameLength, e) {
      this.data.slice(index, nameLength + index).forEach(element => {
        if (element.tel != undefined) {
          element.tel = e.target.checked;
        }
        if (element.phone != undefined) {
          element.phone = e.target.checked;
        }
        if (element.address != undefined) {
          element.address = e.target.checked;
        }
        element.agech = e.target.checked;
      });
    },
    // 模板跳转回调函数
    templateJump(index) {
      this.$router.push({
        path: "/system/basics/mouldboard"
        // query: {
        //   index
        // }
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
