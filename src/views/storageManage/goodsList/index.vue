<template>
  <div>
    <div class="common-container">
      <breadcrumb id="breadcrumb-container" class="breadcrumb-container" />
      <el-row :gutter="24" class="row_content">
        <!-- <el-col :span="5">
          <div class="input_group">
            <p>校区</p>
            <el-select
              placeholder="请选择校区"
              class="text_input"
              size="medium"
              clearable
            >
              <el-option
                :label="item.value"
                :value="item.id"
                v-for="item in []"
                :key="item.id"
              ></el-option>
            </el-select>
          </div>
        </el-col> -->
        <el-col :span="5">
          <div class="input_group">
            <p>名称</p>
            <el-input
              v-model="formData.name"
              class="text_input"
              size="medium"
              placeholder="请输入名称"
            ></el-input>
          </div>
        </el-col>
        <el-col :span="5">
          <div class="input_group">
            <p>物品编码</p>
            <el-input
              v-model="formData.code"
              class="text_input"
              size="medium"
              placeholder="请输入物品编码"
            ></el-input>
          </div>
        </el-col>
        <!-- <el-col :span="5">
          <div class="input_group">
            <p>品牌</p>
            <el-select
              placeholder="请选择品牌"
              class="text_input"
              size="medium"
              clearable
            >
              <el-option
                :label="item.value"
                :value="item.id"
                v-for="item in []"
                :key="item.id"
              ></el-option>
            </el-select>
          </div>
        </el-col> -->
        <el-col :span="14">
          <div class="input_group search_group">
            <el-button @click="searchList" size="medium" type="primary "
              >搜索</el-button
            >
          </div>
        </el-col>
      </el-row>
    </div>
    <div class="common-container">
      <el-row :gutter="24" class="row_content">
        <el-col :span="24">
          <div class="input_group">
            <el-button size="medium" @click="popShow2 = true" type="primary "
              >查看配置列表</el-button
            >
          </div>
          <div class="input_group">
            <el-table
              :header-cell-style="{ background: '#F3F4F7', color: '#333333' }"
              :data="resList"
              border
              style="width: 100%"
            >
              <el-table-column align="center" label="校区">
                <template slot-scope="{ $index }">
                  <span v-text="$index + 1"></span>
                </template>
              </el-table-column>
              <el-table-column align="center" prop="toolCode" label="物品编码">
              </el-table-column>
              <el-table-column align="center" prop="toolName" label="名称">
              </el-table-column>
              <el-table-column align="center" prop="toolModel" label="型号">
              </el-table-column>
              <el-table-column align="center" prop="toolBrand" label="品牌">
              </el-table-column>
              <el-table-column
                width="100"
                align="center"
                prop="toolQuantity"
                label="数量"
              >
              </el-table-column>
              <el-table-column width="120" align="center" label="操作">
                <template slot-scope="{ row }">
                  <el-button @click="editItem(row)" size="mini" type="warning"
                    >出库</el-button
                  >
                </template>
              </el-table-column>
            </el-table>
          </div>
        </el-col>
      </el-row>
      <pagination
        style="text-align: right"
        v-show="total > 0"
        :total="total"
        :page="formData.pageNo"
        :limit="formData.pageSize"
        @pagination="resetTable"
      />
    </div>
    <!-- 添加修改 -->
    <el-dialog
      custom-class="dialog_min_width"
      :title="'出库'"
      :lock-scroll="false"
      :visible.sync="popShow"
      :close-on-click-modal="false"
      width="50%"
      center
    >
      <div class="pop_content">
        <div class="pop_item">
          <p>物品编码：</p>
          <span>{{ detailData.toolCode }}</span>
        </div>
        <div class="pop_item">
          <p>名称：</p>
          <span>{{ detailData.toolName }}</span>
        </div>
        <div class="pop_item">
          <p>型号：</p>
          <span>{{ detailData.toolModel }}</span>
        </div>
        <div class="pop_item">
          <p>品牌：</p>
          <span>{{ detailData.toolBrand }}</span>
        </div>
        <div class="pop_item">
          <p>数量：</p>
          <span>{{ detailData.toolQuantity }}</span>
        </div>
        <div class="pop_item">
          <p>出库数量</p>
          <el-input
            v-model="changeParams.quantity"
            oninput="value=value.replace(/[^\d]/g,'')"
            class="pop_input"
            size="medium"
            placeholder="请输入出库数量"
          ></el-input>
        </div>
        <div class="pop_item pop_item2">
          <p>备注</p>
          <el-input
            v-model="changeParams.mark"
            type="textarea"
            class="pop_input"
            size="medium"
            :rows="3"
            placeholder="请输入内容"
          >
          </el-input>
        </div>
      </div>

      <span slot="footer" class="dialog-footer">
        <el-button
          @click="editSubmit"
          size="medium"
          type="primary"
          v-text="'确定'"
        ></el-button>
        <el-button
          size="medium"
          @click="popShow = false"
          v-text="'取消'"
        ></el-button>
      </span>
    </el-dialog>
    <!-- 物品配置列表 -->
    <el-dialog
      custom-class="dialog_min_width"
      :title="'物品配置列表'"
      :lock-scroll="false"
      :visible.sync="popShow2"
      :close-on-click-modal="false"
      width="70%"
      center
    >
      <el-row :gutter="24" class="row_content">
        <el-col :span="24">
          <el-row :gutter="24">
            <el-col :span="6">
              <div class="input_group">
                <p>名称</p>
                <el-input
                  v-model="fromDetail.name"
                  class="text_input"
                  size="medium"
                  placeholder="请输入名称"
                ></el-input></div
            ></el-col>
            <el-col :span="6">
              <div class="input_group">
                <p>物品编码</p>
                <el-input
                  v-model="fromDetail.code"
                  class="text_input"
                  size="medium"
                  placeholder="请输入物品编码"
                ></el-input></div
            ></el-col>
            <!-- <el-col :span="6">
              <div class="input_group">
                <p>品牌</p>
                <el-input
                  class="text_input"
                  size="medium"
                  placeholder="请输入品牌"
                ></el-input></div
            ></el-col> -->
            <el-col :span="12">
              <div class="input_group search_group">
                <el-button
                  @click="searchDetailList"
                  size="medium"
                  type="primary "
                  >搜索</el-button
                >
              </div></el-col
            >
          </el-row>
          <div class="input_group">
            <el-table
              :header-cell-style="{ background: '#F3F4F7', color: '#333333' }"
              :data="detailList"
              border
              style="width: 100%"
            >
              <el-table-column align="center" prop="name" label="名称">
              </el-table-column>
              <el-table-column align="center" prop="code" label="编码">
              </el-table-column>
              <el-table-column align="center" prop="brand" label="品牌">
              </el-table-column>
              <el-table-column align="center" prop="model" label="型号">
              </el-table-column>
              <el-table-column width="100" align="center" label="操作">
                <template slot-scope="{ row }">
                  <el-button @click="addPop(row)" size="mini" type="success"
                    >入库</el-button
                  >
                </template>
              </el-table-column>
            </el-table>
          </div></el-col
        >
      </el-row>
      <pagination
        style="text-align: right"
        v-show="detailTotal > 0"
        :total="detailTotal"
        :page="fromDetail.pageNo"
        :limit="fromDetail.pageSize"
        @pagination="resetTable2"
      />
      <span slot="footer" class="dialog-footer">
        <el-button
          size="medium"
          @click="popShow2 = false"
          v-text="'返回'"
        ></el-button>
      </span>
    </el-dialog>
    <!-- 入库 -->
    <el-dialog
      custom-class="dialog_min_width"
      :title="'入库'"
      :lock-scroll="false"
      :visible.sync="addShow"
      :close-on-click-modal="false"
      width="25%"
      center
    >
      <div class="pop_content">
        <div class="pop_item">
          <p style="width: inherit">数量</p>
          <el-input
            v-model="changeParams.quantity"
            class="pop_input"
            size="medium"
            placeholder="请输入数量"
          ></el-input>
        </div>
      </div>

      <span slot="footer" class="dialog-footer">
        <el-button
          @click="enterSubmit"
          size="medium"
          type="primary"
          v-text="'确定'"
        ></el-button>
        <el-button
          size="medium"
          @click="addShow = false"
          v-text="'取消'"
        ></el-button>
      </span>
    </el-dialog>
  </div>
</template>
<script>
import Breadcrumb from "@/components/Breadcrumb";
import Pagination from "@/components/Pagination";
import {
  _toolStockList,
  _toolList,
  _toolsStockLogManage,
} from "@/services/system";
export default {
  name: "GoodsList",
  data() {
    return {
      popShow: false,
      popShow2: false,
      addShow: false,
      isAdd: true,
      formData: {
        pageNo: 1,
        pageSize: 10,
        name: "",
        code: "",
      },
      total: 0,
      resList: [],
      fromDetail: {
        pageNo: 1,
        pageSize: 10,
        name: "",
        code: "",
      },
      detailTotal: 0,
      detailList: [],
      changeParams: {
        id: "",
        quantity: "",
        type: "",
        mark: "",
      },
      detailData: {
        campusName: "",
        id: "",
        toolBrand: "",
        toolCode: "",
        toolModel: "",
        toolName: "",
        toolQuantity: "",
      },
    };
  },
  components: {
    Breadcrumb,
    Pagination,
  },
  mounted() {
    this.getList();
    this.getDetailList();
  },
  methods: {
    getList() {
      _toolStockList(this.formData).then((res) => {
        if (res.code == 1) {
          this.resList = res.data.list;
          this.total = Number(res.data.total);
        } else {
          this.$message.error(res.msg);
        }
      });
    },
    getDetailList() {
      _toolList(this.fromDetail).then((res) => {
        if (res.code == 1) {
          this.detailList = res.data.list;
          this.detailTotal = Number(res.data.total);
        } else {
          this.$message.error(res.msg);
        }
      });
    },
    resetTable() {
      this.formData.pageNo = current.page;
      this.formData.pageSize = current.limit;
      this.getList();
    },
    resetTable2() {
      this.fromDetail.pageNo = current.page;
      this.fromDetail.pageSize = current.limit;
      this.getDetailList();
    },
    searchDetailList() {
      this.fromDetail.pageNo = 1;
      this.getDetailList();
    },
    searchList() {
      this.formData.pageNo = 1;
      this.getList();
    },
    addPop(item) {
      this.changeParams.id = item.id;
      this.changeParams.quantity = "";
      this.changeParams.type = 2;
      this.addShow = true;
    },
    editItem(item) {
      this.changeParams.id = item.id;
      this.changeParams.quantity = "";
      this.changeParams.type = 1;
      this.changeParams.mark = "";
      this.detailData = item;
      this.popShow = true;
    },
    enterSubmit() {
      if (!this.changeParams.quantity)
        return this.$message.warning("请输入数量");
      _toolsStockLogManage(this.changeParams).then((res) => {
        if (res.code == 1) {
          this.getList();
          this.addShow = false;
        } else {
          this.$message.error(res.msg);
        }
      });
    },
    editSubmit() {
      if (!this.changeParams.quantity)
        return this.$message.warning("请输入数量");
      if (this.changeParams.quantity > this.detailData.toolQuantity)
        return this.$message.warning("出库数量超额");
      if (!this.changeParams.mark) return this.$message.warning("请输入备注");
      _toolsStockLogManage(this.changeParams).then((res) => {
        if (res.code == 1) {
          this.getList();
          this.popShow = false;
        } else {
          this.$message.error(res.msg);
        }
      });
    },
  },
};
</script>
<style lang="less" scoped>
.row_content {
  .input_group {
    padding: 10px 10px;
    display: flex;
    align-items: center;
    > p {
      width: 80px;
      font-size: 14px;
      padding-right: 20px;
    }
    .text_input {
      // width: 120px;
      flex: 1;
    }
    .text_btn {
      margin-left: 20px;
    }
  }
  .search_group {
    justify-content: flex-end;
  }
}
.pop_item {
  p {
    width: 100px;
  }
}
</style>