<template>
  <div>
    <div class="purchase-list-container">
      <div>
        <a-tabs default-active-key="1"
                @change="callback">
          <a-tab-pane key="1"
                      tab="正常">
            <div>
              <div class="public-header-wrap">
                <a-form-model layout="inline"
                              :model="listQuery">
                  <a-form-model-item>
                    <a-button type="primary"
                              @click="businessOpening">
                      +业务开通
                    </a-button>
                  </a-form-model-item>
                  <!-- 下拉框 -->
                  <a-form-model-item>
                    <a-select style="width:120px"
                              allowClear
                              v-model="listQuery.key"
                              placeholder="请选择">
                      <a-select-option v-for="item in searchColumns"
                                       :key="item.dataIndex"
                                       :value="item.dataIndex">
                        {{ item.title }}
                      </a-select-option>
                    </a-select>
                  </a-form-model-item>
                  <!-- 搜索 -->
                  <a-form-model-item>
                    <a-input v-model="listQuery.search"
                             placeholder="搜索关键词" />
                  </a-form-model-item>
                  <!-- 按钮 -->
                  <a-form-model-item>
                    <a-button type="primary"
                              @click="search">
                      查询
                    </a-button>
                  </a-form-model-item>
                  <div class="public-header-filter">
                    <a-form-model-item>
                      <a-button>
                        <a-icon type="setting" />自定义列表
                      </a-button>
                      <a-button @click="isfilter = !isfilter">
                        <a-icon :type="isfilter ? 'up' : 'down'" />
                        <!-- <a-icon type="up" /> -->
                        高级筛选
                      </a-button>
                      <a-button>
                        <a-icon type="export" />
                        导出
                      </a-button>
                    </a-form-model-item>
                  </div>
                </a-form-model>
                <div v-show="isfilter"
                     class="member-filterall">
                  <div class="member-filter">
                    <div>
                      <div>
                        <span class="filter-type">线路</span>
                        <a-select style="width: 120px"
                                  @change="handleChange"
                                  placeholder="请选择">
                          <a-select-option value="jack">
                            不限线路
                          </a-select-option>
                          <a-select-option value="lucy">
                            自生产
                          </a-select-option>
                          <a-select-option value="disabled">
                            小鸟云资源池
                          </a-select-option>
                          <a-select-option value="Yiminghe">
                            云引擎大陆版资源池
                          </a-select-option>
                          <a-select-option value="delete">
                            云引擎国际版资源池
                          </a-select-option>
                        </a-select>
                      </div>
                      <div>
                        <span class="filter-type">业务状态</span>
                        <a-select placeholder="请选择"
                                  style="width: 120px"
                                  @change="handleChange">
                          <a-select-option value="jack">
                            不限
                          </a-select-option>
                          <a-select-option value="lucy">
                            已回收
                          </a-select-option>
                          <a-select-option value="disabled">
                            开通中
                          </a-select-option>
                          <a-select-option value="Yiminghe">
                            正常
                          </a-select-option>
                          <a-select-option value="delete">
                            过户中
                          </a-select-option>
                          <a-select-option value="delete">
                            已过期
                          </a-select-option>
                          <a-select-option value="delete">
                            已退款
                          </a-select-option>
                        </a-select>
                      </div>
                      <div>
                        <span class="filter-type">配置</span>
                        <a-select placeholder="请选择"
                                  style="width: 120px"
                                  @change="handleChange">
                          <a-select-option value="jack">
                            CPU不限
                          </a-select-option>
                          <a-select-option value="lucy">
                            1核
                          </a-select-option>
                          <a-select-option value="disabled">
                            2核
                          </a-select-option>
                          <a-select-option value="Yiminghe">
                            4核
                          </a-select-option>
                          <a-select-option value="delete">
                            8核
                          </a-select-option>
                          <a-select-option value="delete">
                            16核
                          </a-select-option>
                        </a-select>
                        <a-select placeholder="请选择"
                                  style="width: 120px"
                                  @change="handleChange">
                          <a-select-option value="jack">
                            内存不限
                          </a-select-option>
                          <a-select-option value="lucy">
                            1G
                          </a-select-option>
                          <a-select-option value="disabled">
                            2G
                          </a-select-option>
                          <a-select-option value="Yiminghe">
                            4G
                          </a-select-option>
                          <a-select-option value="delete">
                            8G
                          </a-select-option>
                          <a-select-option value="delete">
                            16G
                          </a-select-option>
                          <a-select-option value="delete">
                            32G
                          </a-select-option>
                          <a-select-option value="delete">
                            64G
                          </a-select-option>
                        </a-select>
                      </div>
                    </div>
                    <div>
                      <div class="registerDate">
                        <span class="filter-type">购买时间段 </span><span class="date-picker">
                          <a-date-picker placeholder="起始日期"></a-date-picker>
                        </span>
                        <span class="left5"> 至 </span>
                        <span class="date-picker left5">
                          <a-date-picker placeholder="结束日期"></a-date-picker>
                        </span>
                      </div>
                      <div>
                        <span class="filter-type">运行状态</span>
                        <a-select placeholder="请选择"
                                  style="width: 120px"
                                  @change="handleChange">
                          <a-select-option value="jack">
                            不限
                          </a-select-option>
                          <a-select-option value="lucy">
                            已锁定
                          </a-select-option>
                          <a-select-option value="lucy">
                            已关机
                          </a-select-option>
                          <a-select-option value="lucy">
                            已挂起
                          </a-select-option>
                          <a-select-option value="lucy">
                            运行中
                          </a-select-option>
                        </a-select>
                      </div>
                      <div>
                        <span class="filter-type">带宽</span>
                        <span class="div-input100">
                          <a-input />
                        </span>
                        <span>M</span>
                      </div>
                    </div>
                    <div>
                      <div>
                        <div class="registerDate">
                          <span class="filter-type">到期时间段 </span><span class="date-picker">
                            <a-date-picker placeholder="起始日期"></a-date-picker>
                          </span>
                          <span class="left5"> 至 </span>
                          <span class="date-picker left5">
                            <a-date-picker placeholder="结束日期"></a-date-picker>
                          </span>
                        </div>
                      </div>
                    </div>
                  </div>
                  <div class="enter">
                    <a-button @click="isfilter = false">清除 </a-button>
                    <a-button type="primary"
                              @click="isfilter = false">
                      确定
                    </a-button>
                  </div>
                </div>
              </div>
              <!-- 表格 -->
              <a-table :loading="tableLoading"
                       :columns="columns"
                       :data-source="data"
                       rowKey="id"
                       :pagination="paginationProps"
                       :scroll="{ x: 2100 }">
                <a slot="action"
                   slot-scope="text"
                   @click="infoChannel(text)">管理</a>
              </a-table>
            </div>
          </a-tab-pane>
          <a-tab-pane key="2"
                      tab="即将到期"
                      force-render>
            <div>
              <div class="public-header-wrap">
                <a-form-model layout="inline"
                              :model="listQuery">
                  <a-form-model-item>
                    <a-button type="primary"
                              @click="search">
                      +业务开通
                    </a-button>
                  </a-form-model-item>
                  <!-- 下拉框 -->
                  <a-form-model-item>
                    <a-select style="width:120px"
                              allowClear
                              v-model="listQuery.key"
                              placeholder="请选择">
                      <a-select-option v-for="item in searchColumns"
                                       :key="item.dataIndex"
                                       :value="item.dataIndex">
                        {{ item.title }}
                      </a-select-option>
                    </a-select>
                  </a-form-model-item>
                  <!-- 搜索 -->
                  <a-form-model-item>
                    <a-input v-model="listQuery.search"
                             placeholder="搜索关键词" />
                  </a-form-model-item>
                  <!-- 按钮 -->
                  <a-form-model-item>
                    <a-button type="primary"
                              @click="search">
                      查询
                    </a-button>
                  </a-form-model-item>
                  <div class="public-header-filter">
                    <a-form-model-item>
                      <a-button>
                        <a-icon type="setting" />自定义列表
                      </a-button>
                      <a-button @click="isfilter = !isfilter">
                        <a-icon :type="isfilter ? 'up' : 'down'" />
                        <!-- <a-icon type="up" /> -->
                        高级筛选
                      </a-button>
                      <a-button>
                        <a-icon type="export" />
                        导出
                      </a-button>
                    </a-form-model-item>
                  </div>
                </a-form-model>
                <div v-show="isfilter"
                     class="member-filterall">
                  <div class="member-filter">
                    <div>
                      <div>
                        <span class="filter-type">线路</span>
                        <a-select style="width: 120px"
                                  @change="handleChange"
                                  placeholder="请选择">
                          <a-select-option value="jack">
                            不限线路
                          </a-select-option>
                          <a-select-option value="lucy">
                            自生产
                          </a-select-option>
                          <a-select-option value="disabled">
                            小鸟云资源池
                          </a-select-option>
                          <a-select-option value="Yiminghe">
                            云引擎大陆版资源池
                          </a-select-option>
                          <a-select-option value="delete">
                            云引擎国际版资源池
                          </a-select-option>
                        </a-select>
                      </div>
                      <div>
                        <span class="filter-type">业务状态</span>
                        <a-select placeholder="请选择"
                                  style="width: 120px"
                                  @change="handleChange">
                          <a-select-option value="jack">
                            不限
                          </a-select-option>
                          <a-select-option value="lucy">
                            已回收
                          </a-select-option>
                          <a-select-option value="disabled">
                            开通中
                          </a-select-option>
                          <a-select-option value="Yiminghe">
                            正常
                          </a-select-option>
                          <a-select-option value="delete">
                            过户中
                          </a-select-option>
                          <a-select-option value="delete">
                            已过期
                          </a-select-option>
                          <a-select-option value="delete">
                            已退款
                          </a-select-option>
                        </a-select>
                      </div>
                      <div>
                        <span class="filter-type">配置</span>
                        <a-select placeholder="请选择"
                                  style="width: 120px"
                                  @change="handleChange">
                          <a-select-option value="jack">
                            CPU不限
                          </a-select-option>
                          <a-select-option value="lucy">
                            1核
                          </a-select-option>
                          <a-select-option value="disabled">
                            2核
                          </a-select-option>
                          <a-select-option value="Yiminghe">
                            4核
                          </a-select-option>
                          <a-select-option value="delete">
                            8核
                          </a-select-option>
                          <a-select-option value="delete">
                            16核
                          </a-select-option>
                        </a-select>
                        <a-select placeholder="请选择"
                                  style="width: 120px"
                                  @change="handleChange">
                          <a-select-option value="jack">
                            内存不限
                          </a-select-option>
                          <a-select-option value="lucy">
                            1G
                          </a-select-option>
                          <a-select-option value="disabled">
                            2G
                          </a-select-option>
                          <a-select-option value="Yiminghe">
                            4G
                          </a-select-option>
                          <a-select-option value="delete">
                            8G
                          </a-select-option>
                          <a-select-option value="delete">
                            16G
                          </a-select-option>
                          <a-select-option value="delete">
                            32G
                          </a-select-option>
                          <a-select-option value="delete">
                            64G
                          </a-select-option>
                        </a-select>
                      </div>
                    </div>
                    <div>
                      <div class="registerDate">
                        <span class="filter-type">购买时间段 </span><span class="date-picker">
                          <a-date-picker placeholder="起始日期"></a-date-picker>
                        </span>
                        <span class="left5"> 至 </span>
                        <span class="date-picker left5">
                          <a-date-picker placeholder="结束日期"></a-date-picker>
                        </span>
                      </div>
                      <div>
                        <span class="filter-type">运行状态</span>
                        <a-select placeholder="请选择"
                                  style="width: 120px"
                                  @change="handleChange">
                          <a-select-option value="jack">
                            不限
                          </a-select-option>
                          <a-select-option value="lucy">
                            已锁定
                          </a-select-option>
                          <a-select-option value="lucy">
                            已关机
                          </a-select-option>
                          <a-select-option value="lucy">
                            已挂起
                          </a-select-option>
                          <a-select-option value="lucy">
                            运行中
                          </a-select-option>
                        </a-select>
                      </div>
                      <div>
                        <span class="filter-type">带宽</span>
                        <span class="div-input100">
                          <a-input />
                        </span>
                        <span>M</span>
                      </div>
                    </div>
                    <div>
                      <div>
                        <div class="registerDate">
                          <span class="filter-type">到期时间段 </span><span class="date-picker">
                            <a-date-picker placeholder="起始日期"></a-date-picker>
                          </span>
                          <span class="left5"> 至 </span>
                          <span class="date-picker left5">
                            <a-date-picker placeholder="结束日期"></a-date-picker>
                          </span>
                        </div>
                      </div>
                    </div>
                  </div>
                  <div class="enter">
                    <a-button @click="isfilter = false">清除 </a-button>
                    <a-button type="primary"
                              @click="isfilter = false">
                      确定
                    </a-button>
                  </div>
                </div>
              </div>
              <!-- 表格 -->
              <a-table :loading="tableLoading"
                       :columns="columns"
                       :data-source="data"
                       rowKey="id"
                       :pagination="paginationProps"
                       :scroll="{ x: 2100 }">
                <a slot="action"
                   slot-scope="text"
                   @click="infoChannel(text)">管理</a>
              </a-table>
            </div>
          </a-tab-pane>
          <a-tab-pane key="3"
                      tab="已到期">
            <div>
              <div class="public-header-wrap">
                <a-form-model layout="inline"
                              :model="listQuery">
                  <a-form-model-item>
                    <a-button type="primary"
                              @click="search">
                      +业务开通
                    </a-button>
                  </a-form-model-item>
                  <!-- 下拉框 -->
                  <a-form-model-item>
                    <a-select style="width:120px"
                              allowClear
                              v-model="listQuery.key"
                              placeholder="请选择">
                      <a-select-option v-for="item in searchColumns"
                                       :key="item.dataIndex"
                                       :value="item.dataIndex">
                        {{ item.title }}
                      </a-select-option>
                    </a-select>
                  </a-form-model-item>
                  <!-- 搜索 -->
                  <a-form-model-item>
                    <a-input v-model="listQuery.search"
                             placeholder="搜索关键词" />
                  </a-form-model-item>
                  <!-- 按钮 -->
                  <a-form-model-item>
                    <a-button type="primary"
                              @click="search">
                      查询
                    </a-button>
                  </a-form-model-item>
                  <div class="public-header-filter">
                    <a-form-model-item>
                      <a-button>
                        <a-icon type="setting" />自定义列表
                      </a-button>
                      <a-button @click="isfilter = !isfilter">
                        <a-icon :type="isfilter ? 'up' : 'down'" />
                        <!-- <a-icon type="up" /> -->
                        高级筛选
                      </a-button>
                      <a-button>
                        <a-icon type="export" />
                        导出
                      </a-button>
                    </a-form-model-item>
                  </div>
                </a-form-model>
                <div v-show="isfilter"
                     class="member-filterall">
                  <div class="member-filter">
                    <div>
                      <div>
                        <span class="filter-type">线路</span>
                        <a-select style="width: 120px"
                                  @change="handleChange"
                                  placeholder="请选择">
                          <a-select-option value="jack">
                            不限线路
                          </a-select-option>
                          <a-select-option value="lucy">
                            自生产
                          </a-select-option>
                          <a-select-option value="disabled">
                            小鸟云资源池
                          </a-select-option>
                          <a-select-option value="Yiminghe">
                            云引擎大陆版资源池
                          </a-select-option>
                          <a-select-option value="delete">
                            云引擎国际版资源池
                          </a-select-option>
                        </a-select>
                      </div>
                      <div>
                        <span class="filter-type">业务状态</span>
                        <a-select placeholder="请选择"
                                  style="width: 120px"
                                  @change="handleChange">
                          <a-select-option value="jack">
                            不限
                          </a-select-option>
                          <a-select-option value="lucy">
                            已回收
                          </a-select-option>
                          <a-select-option value="disabled">
                            开通中
                          </a-select-option>
                          <a-select-option value="Yiminghe">
                            正常
                          </a-select-option>
                          <a-select-option value="delete">
                            过户中
                          </a-select-option>
                          <a-select-option value="delete">
                            已过期
                          </a-select-option>
                          <a-select-option value="delete">
                            已退款
                          </a-select-option>
                        </a-select>
                      </div>
                      <div>
                        <span class="filter-type">配置</span>
                        <a-select placeholder="请选择"
                                  style="width: 120px"
                                  @change="handleChange">
                          <a-select-option value="jack">
                            CPU不限
                          </a-select-option>
                          <a-select-option value="lucy">
                            1核
                          </a-select-option>
                          <a-select-option value="disabled">
                            2核
                          </a-select-option>
                          <a-select-option value="Yiminghe">
                            4核
                          </a-select-option>
                          <a-select-option value="delete">
                            8核
                          </a-select-option>
                          <a-select-option value="delete">
                            16核
                          </a-select-option>
                        </a-select>
                        <a-select placeholder="请选择"
                                  style="width: 120px"
                                  @change="handleChange">
                          <a-select-option value="jack">
                            内存不限
                          </a-select-option>
                          <a-select-option value="lucy">
                            1G
                          </a-select-option>
                          <a-select-option value="disabled">
                            2G
                          </a-select-option>
                          <a-select-option value="Yiminghe">
                            4G
                          </a-select-option>
                          <a-select-option value="delete">
                            8G
                          </a-select-option>
                          <a-select-option value="delete">
                            16G
                          </a-select-option>
                          <a-select-option value="delete">
                            32G
                          </a-select-option>
                          <a-select-option value="delete">
                            64G
                          </a-select-option>
                        </a-select>
                      </div>
                    </div>
                    <div>
                      <div class="registerDate">
                        <span class="filter-type">购买时间段 </span><span class="date-picker">
                          <a-date-picker placeholder="起始日期"></a-date-picker>
                        </span>
                        <span class="left5"> 至 </span>
                        <span class="date-picker left5">
                          <a-date-picker placeholder="结束日期"></a-date-picker>
                        </span>
                      </div>
                      <div>
                        <span class="filter-type">运行状态</span>
                        <a-select placeholder="请选择"
                                  style="width: 120px"
                                  @change="handleChange">
                          <a-select-option value="jack">
                            不限
                          </a-select-option>
                          <a-select-option value="lucy">
                            已锁定
                          </a-select-option>
                          <a-select-option value="lucy">
                            已关机
                          </a-select-option>
                          <a-select-option value="lucy">
                            已挂起
                          </a-select-option>
                          <a-select-option value="lucy">
                            运行中
                          </a-select-option>
                        </a-select>
                      </div>
                      <div>
                        <span class="filter-type">带宽</span>
                        <span class="div-input100">
                          <a-input />
                        </span>
                        <span>M</span>
                      </div>
                    </div>
                    <div>
                      <div>
                        <div class="registerDate">
                          <span class="filter-type">到期时间段 </span><span class="date-picker">
                            <a-date-picker placeholder="起始日期"></a-date-picker>
                          </span>
                          <span class="left5"> 至 </span>
                          <span class="date-picker left5">
                            <a-date-picker placeholder="结束日期"></a-date-picker>
                          </span>
                        </div>
                      </div>
                    </div>
                  </div>
                  <div class="enter">
                    <a-button @click="isfilter = false">清除 </a-button>
                    <a-button type="primary"
                              @click="isfilter = false">
                      确定
                    </a-button>
                  </div>
                </div>
              </div>
              <!-- 表格 -->
              <a-table :loading="tableLoading"
                       :columns="columns"
                       :data-source="data"
                       rowKey="id"
                       :pagination="paginationProps"
                       :scroll="{ x: 2100 }">
                <a slot="action"
                   slot-scope="text"
                   @click="infoChannel(text)">管理</a>
              </a-table>
            </div>
          </a-tab-pane>
          <a-tab-pane key="4"
                      tab="已删除">
            <div>
              <div class="public-header-wrap">
                <a-form-model layout="inline"
                              :model="listQuery">
                  <!-- 下拉框 -->
                  <a-form-model-item>
                    <a-select style="width:120px"
                              allowClear
                              v-model="listQuery.key"
                              placeholder="请选择">
                      <a-select-option v-for="item in searchColumns"
                                       :key="item.dataIndex"
                                       :value="item.dataIndex">
                        {{ item.title }}
                      </a-select-option>
                    </a-select>
                  </a-form-model-item>
                  <!-- 搜索 -->
                  <a-form-model-item>
                    <a-input v-model="listQuery.search"
                             placeholder="搜索关键词" />
                  </a-form-model-item>
                  <a-form-model-item>
                    <span class="date-picker">
                      <a-date-picker placeholder="起始日期"></a-date-picker>
                    </span>
                    <span class="date-picker left5">
                      <a-date-picker placeholder="结束日期"></a-date-picker>
                    </span>
                  </a-form-model-item>
                  <!-- 按钮 -->
                  <a-form-model-item>
                    <a-button type="primary"
                              @click="search">
                      查询
                    </a-button>
                  </a-form-model-item>
                  <span class="public-header-export">
                    <a-form-model-item>
                      <a-button>
                        <a-icon type="export" />
                        导出
                      </a-button>
                    </a-form-model-item>
                  </span>
                </a-form-model>
              </div>
              <!-- 表格 -->
              <a-table :loading="tableLoading"
                       :columns="columns"
                       :data-source="data"
                       rowKey="id"
                       :pagination="paginationProps"
                       :scroll="{ x: 2100 }">
                <span slot="runningStatus"
                      slot-scope="text">{{text+1}}</span>
                <a slot="action"
                   slot-scope="text"
                   @click="infoChannel(text)">管理</a>
              </a-table>
            </div>
          </a-tab-pane>
        </a-tabs>
      </div>
    </div>
  </div>
</template>

<script>
import { regionMapData } from '@/utils/enum'
export default {
  data () {
    return {
      regionMapData,
      isfilter: false,
      listQuery: {
        key: "outIp",
        search: "",
        pageNo: 1,
        pageSize: 10,
        total: 0
      },
      selectkey: {
        corporationName: "",
        corporationPhone: "",
        currentPage: "1",
        endTimeSort: "asc",
        orderNo: "",
        outIp: "",
        pageSize: "10",
        saleTimeSort: "asc",
        sort: "asc"
      },
      searchColumns: [
        {
          title: "服务器IP",
          dataIndex: "outIp"
        },
        {
          title: "会员ID",
          dataIndex: "corporationName"
        },
        {
          title: "会员手机",
          dataIndex: "corporationPhone"
        },
        {
          title: "订单ID",
          dataIndex: "orderNo"
        }
      ],
      columns: [
        {
          title: "业务ID",
          width: 180,
          dataIndex: "id"
        },
        {
          title: "IP",
          width: 130,
          dataIndex: "outIp"
        },
        { title: "弹性IP", dataIndex: "intranetIp", key: "intranetIp" },
        {
          title: "共享类型", dataIndex: "shareType", key: "shareType",
          customRender: (text, record, index) => {
            return "通用";
          }
        },
        {
          title: "机房", dataIndex: "regionId", customRender: (text, record, index) => {
            return this.regionMapData[text]
          }
        },
        { title: "CPU", dataIndex: "cup", key: "cpu" },
        { title: "内存", dataIndex: "memory", key: "memory" },
        {
          title: "磁盘",
          dataIndex: "systemSize"
        },
        {
          title: "带宽",
          dataIndex: "internetMaxBandwidthOut"
        },
        {
          title: "会员ID",
          dataIndex: "corporationCode",
          key: "corporationCode"
        },
        {
          title: "购买时间",
          dataIndex: "purchaseTimeStr",
          sorter: true,
          width: 150,
          sortDirections: ["ascend", "descend"]
        },
        {
          title: "到期时间",
          dataIndex: "endTimeStr",
          key: "endTimeStr",
          width: 180,
          sorter: true,
          sortDirections: ["ascend", "descend"]
        },
        { title: "业务状态", dataIndex: "1", key: "" },
        {
          title: "运行状态",
          dataIndex: "runningStatus",
          customRender: (text, record, index) => {
            if (record.runningStatus == 0) {
              return (<span class="runningStatus blackhole">黑洞中</span>)
            } else if (record.runningStatus == 1) {
              return (<span class="runningStatus running">运行中</span>)
            } else if (record.runningStatus == 2) {
              return (<span class="runningStatus shutdown">已关机</span>)
            } else if (record.runningStatus == 3) {
              return (<span class="runningStatus expired">已过期</span>)
            }
          }
        },
        { title: "操作状态", dataIndex: "3", key: "" },
        {
          title: "操作",
          dataIndex: "id",
          key: "action",
          fixed: "right",
          width: 100,
          scopedSlots: { customRender: "action" }
        }
      ],
      data: [],
      paginationProps: {
        showQuickJumper: true,
        showSizeChanger: true,
        pageSizeOptions: ["5", "10", "20", "30"],
        pageSize: 5,
        current: 1, //当前页
        total: 1,
        showTotal: (total, range) =>
          `共 ${total} 条记录 第 ${this.paginationProps.current} / ${Math.ceil(
            total / this.paginationProps.pageSize
          )} 页`,
        onChange: this.quickJump,
        onShowSizeChange: this.onShowSizeChange
      },
      tableLoading: false
    };
  },
  activated () {
    this.getList();
  },
  methods: {
    callback (key) {
      console.log(key);
    },
    businessOpening () {
      this.$router.push({
        path: "/business/cloudservers/businessOpening"
      });
    },
    // 查询
    search () {
      // this.getList();
      console.log(this.listQuery, "-----");
      console.log(this.selectkey, "-----");
      this.listQuery.search = this.listQuery.search.trim();
      if (this.listQuery.key == "outIp") {
        this.selectkey.outIp = this.listQuery.search;
        this.getList();
      } else if (this.listQuery.key == "corporationName") {
        this.selectkey.corporationName = this.listQuery.search;
        this.getList();
      } else if (this.listQuery.key == "corporationPhone") {
        this.selectkey.corporationPhone = this.listQuery.search;
        this.getList();
      } else if (this.listQuery.key == "orderNo") {
        this.selectkey.orderNo = this.listQuery.search;
        this.getList();
      }
    },
    // 查询表格数据
    getList () {
      this.tableLoading = true;
      this.$store
        .dispatch("business/getList", this.selectkey)
        .then(res => {
          console.log(res);
          this.data = res.data.list;
          this.paginationProps.total = res.data.totalCount * 1;
        })
        .finally(() => {
          this.tableLoading = false;
          this.selectkey = {
            corporationName: "",
            corporationPhone: "",
            currentPage: "1",
            endTimeSort: "asc",
            orderNo: "",
            outIp: "",
            pageSize: "10",
            saleTimeSort: "asc",
            sort: "asc"
          }
        });
    },
    // 表格分页快速跳转n页
    quickJump (current) {
      this.paginationProps.current = current;
      this.getList();
    },
    // 表格分页切换每页条数
    onShowSizeChange (current, pageSize) {
      this.paginationProps.current = current;
      this.paginationProps.pageSize = pageSize;
      this.getList();
    },
    //
    infoChannel (id) {
      this.$router.push({
        path: "/business/cloudservers/info",
        query: { id }
      });
    },
    handleChange (value) {
      console.log(value);
    }
  }
};
</script>

<style lang="less" scoped>
.purchase-list-container {
  background: #fff;
  padding: 20px;
  margin: 0 24px;
  .public-header-wrap {
    padding-bottom: 10px;
    .public-header-filter {
      // text-align: right;
      display: inline-block;
      float: right;
      button {
        margin-left: 10px;
      }
    }
    .public-header-export {
      margin-left: 290px;
    }
  }
}
.left5 {
  margin-left: 5px;
}
.member-filterall {
  border: 1px solid #e0e0e0;
  width: 100%;
  // margin-left: 25px;
  background-color: #fafafa;
  .member-filter {
    display: flex;
    width: 100%;
    border: 1px solid #e0e0e0;
    background-color: #fafafa;
    margin-top: -1px;
    margin-left: -1px;
    padding: 20px;
    .div-input100 {
      display: inline-block;
      width: 100px;
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
.runningStatus {
  display: inline-block;
  padding: 0 4px;
  line-height: 18px;
  text-align: center;
  color: #fff;
  font-size: 12px;
  border-radius: 2px;
}
.blackhole {
  background: #a5a5a5;
}
.running {
  background: #16b841;
}
</style>
