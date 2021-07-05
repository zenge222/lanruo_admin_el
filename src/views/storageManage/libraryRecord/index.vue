<template>
  <div>
    <div class="common-container">
      <breadcrumb id="breadcrumb-container" class="breadcrumb-container" />
      <el-row :gutter="24" class="row_content">
        <!-- <el-col :span="4">
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
        <el-col :span="4">
          <div class="input_group">
            <p>名称</p>
            <el-input
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
              class="text_input"
              size="medium"
              placeholder="请输入物品编码"
            ></el-input>
          </div>
        </el-col>
        <!-- <el-col :span="4">
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
        <el-col :span="4">
          <div class="input_group">
            <p>状态</p>
            <el-select
              placeholder="请选择状态"
              class="text_input"
              size="medium"
              v-model="formData.type"
            >
              <el-option
                :label="item.value"
                :value="item.id"
                v-for="item in typeList"
                :key="item.id"
              ></el-option>
            </el-select>
          </div>
        </el-col>
        <el-col :span="11">
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
            <el-table
              :header-cell-style="{ background: '#F3F4F7', color: '#333333' }"
              :data="resList"
              border
              style="width: 100%"
            >
              <el-table-column width="100" align="center" label="序号">
                <template slot-scope="{ $index }">
                  <span v-text="$index + 1"></span>
                </template>
              </el-table-column>
              <el-table-column align="center" prop="createTime" label="时间">
              </el-table-column>
              <el-table-column width="100" align="center" label="状态">
                <template slot-scope="{ row }">
                  {{ row.type == 0 ? "全部" : row.type == 1 ? "出库" : "入库" }}
                </template>
              </el-table-column>
              <el-table-column align="center" prop="toolCode" label="物品编码">
              </el-table-column>
              <el-table-column align="center" prop="toolName" label="名称">
              </el-table-column>
              <el-table-column
                width="100"
                align="center"
                prop="toolModel"
                label="型号"
              >
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
  </div>
</template>
<script>
import Breadcrumb from "@/components/Breadcrumb";
import Pagination from "@/components/Pagination";
import { _toolsStockLogList } from "@/services/system";
export default {
  name: "LibraryRecord",
  data() {
    return {
      formData: {
        pageNo: 1,
        pageSize: 10,
        name: "",
        code: "",
        type: 0,
      },
      total: 0,
      resList: [],
      typeList: [
        { value: "全部", id: 0 },
        { value: "出库", id: 1 },
        { value: "入库", id: 2 },
      ],
    };
  },
  components: {
    Breadcrumb,
    Pagination,
  },
  mounted() {
    this.getList();
  },
  methods: {
    getList() {
      _toolsStockLogList(this.formData).then((res) => {
        if (res.code == 1) {
          this.resList = res.data.list;
          this.total = Number(res.data.total);
        } else {
          this.$message.error(res.msg);
        }
      });
    },
    searchList() {
      this.formData.pageNo = 1;
      this.getList();
    },
    resetTable() {
      this.formData.pageNo = current.page;
      this.formData.pageSize = current.limit;
      this.getList();
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
      font-size: 12px;
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
</style>