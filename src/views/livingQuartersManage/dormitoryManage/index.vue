<template>
  <div>
    <div class="common-container">
      <breadcrumb id="breadcrumb-container" class="breadcrumb-container" />
      <el-row :gutter="24" class="row_content">
        <el-col :span="18">
          <div class="input_group">
            <p>名称</p>
            <el-input
              v-model="formData.name"
              class="text_input text_input2"
              size="medium"
              placeholder="请输入名称"
            ></el-input>
          </div>
        </el-col>
        <!-- <el-col :span="6">
          <div class="input_group">
            <p>城市</p>
            <el-select
              placeholder="请选择城市"
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
        </el-col>
        <el-col :span="6">
          <div class="input_group">
            <p>区域</p>
            <el-select
              placeholder="请选择区域"
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
        <el-col :span="6">
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
            <el-button size="medium" @click="addPopShow" type="primary "
              >新增</el-button
            >
          </div>
          <div class="input_group">
            <el-table
              :header-cell-style="{ background: '#F3F4F7', color: '#333333' }"
              :data="resList"
              border
              style="width: 100%"
            >
              <el-table-column width="80" align="center" label="序号">
                <template slot-scope="{ $index }">
                  <span v-text="$index + 1"></span>
                </template>
              </el-table-column>
              <el-table-column align="center" prop="name" label="宿舍名称">
              </el-table-column>
              <el-table-column align="center" prop="managerName" label="管理者">
              </el-table-column>
              <el-table-column
                width="130"
                align="center"
                prop="managerPhone"
                label="管理者手机号"
              >
              </el-table-column>
              <el-table-column align="center" prop="" label="省市区">
                <template slot-scope="{ row }">
                  {{ row.provinceName }}-{{ row.cityName }}-{{
                    row.districtName
                  }}
                </template>
              </el-table-column>
              <el-table-column align="center" prop="address" label="地址">
              </el-table-column>
              <!-- <el-table-column
                width="100"
                align="center"
                prop=""
                label="宿舍数"
              >
              </el-table-column>
              <el-table-column
                width="100"
                align="center"
                prop=""
                label="住宿人数"
              > 
              </el-table-column>
              -->
              <el-table-column width="250" align="center" label="操作">
                <template slot-scope="{ row, $index }">
                  <el-button
                    @click="editDormitoy(row)"
                    size="mini"
                    type="warning"
                    >修改</el-button
                  >
                  <el-button @click="toDetail(row.id)" size="mini"
                    >查看</el-button
                  >
                  <el-button
                    @click="delItem(row, $index)"
                    size="mini"
                    type="danger"
                    >删除</el-button
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
      :title="isAdd ? '添加' : '修改'"
      :lock-scroll="false"
      :visible.sync="popShow"
      :close-on-click-modal="false"
      width="40%"
      center
    >
      <div class="pop_content">
        <div class="pop_item">
          <p>宿舍楼名称</p>
          <el-input
            class="right_input"
            size="medium"
            v-model="fromParams.name"
            placeholder="请输入宿舍楼名称"
          ></el-input>
        </div>
        <div class="pop_item">
          <p>管理者</p>
          <el-select
            class="right_input"
            placeholder="请选择管理者"
            size="medium"
            @change="selManager"
            v-model="fromParams.managerId"
          >
            <el-option
              :label="item.name"
              :value="item.id"
              v-for="item in managerList"
              :key="item.id"
            ></el-option>
          </el-select>
        </div>
        <div class="pop_item">
          <p>联系方式</p>
          <el-input
            :disabled="true"
            v-model="fromParams.managerPhone"
            class="right_input"
            size="medium"
            placeholder="请输入联系方式"
          ></el-input>
        </div>
        <div class="pop_item pop_item2">
          <p>宿舍地址</p>
          <div style="flex: 1">
            <province-package
              @getData="getProvincePackage"
              :provinceId="fromParams.provinceId"
              :cityId="fromParams.cityId"
              :districtId="fromParams.districtId"
            ></province-package>
            <div style="margin-top: 14px">
              <el-input
                v-model="fromParams.address"
                class="right_input"
                size="medium"
                placeholder="请输入详细地址"
              ></el-input>
            </div>
          </div>
        </div>
      </div>

      <span slot="footer" class="dialog-footer">
        <el-button
          @click="addSmbmit"
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
  </div>
</template>
<script>
import Breadcrumb from "@/components/Breadcrumb";
import Pagination from "@/components/Pagination";
import ProvincePackage from "../../components/ProvincePackage";
import {
  _getManagerList,
  _dormitoryAddEdit,
  _getDormitoryList,
  _dormitoryDel,
} from "@/services/system";
export default {
  name: "DormitoryManage",
  data() {
    return {
      resList: [],
      formData: {
        pageNo: 1,
        pageSize: 10,
        name: "",
      },
      total: 0,
      popShow: false,
      isAdd: true,
      fromParams: {
        name: "",
        address: "",
        cityId: "",
        cityName: "",
        districtId: "",
        districtName: "",
        id: "",
        managerId: "",
        managerName: "",
        managerPhone: "",
        name: "",
        provinceId: "",
        provinceName: "",
      },
      managerList: [],
    };
  },
  components: {
    Breadcrumb,
    Pagination,
    ProvincePackage,
  },
  mounted() {
    this.getList();
    this.getManagerList();
  },
  methods: {
    getList() {
      _getDormitoryList(this.formData).then((res) => {
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
    editDormitoy(item) {
      this.isAdd = false;
      this.fromParams = item;
      this.popShow = true;
    },
    resetTable(current) {
      this.formData.pageNo = current.page;
      this.formData.pageSize = current.limit;
      this.getList();
    },
    addPopShow() {
      let data = {
        name: "",
        address: "",
        cityId: "",
        cityName: "",
        districtId: "",
        districtName: "",
        id: null,
        managerId: "",
        managerName: "",
        managerPhone: "",
        name: "",
        provinceId: "",
        provinceName: "",
      };
      Object.assign(this.fromParams, data);
      this.isAdd = true;
      this.popShow = true;
    },
    addSmbmit() {
      if (this.fromParams.name == "")
        return this.$message.warning("请输入宿舍楼名称");
      if (this.fromParams.managerId == "")
        return this.$message.warning("请选择管理者");
      if (this.fromParams.districtId == "")
        return this.$message.warning("请选择宿舍地址");
      if (!this.fromParams.address)
        return this.$message.warning("请输入宿舍详细地址");
      console.log(this.fromParams.address);
      _dormitoryAddEdit(this.fromParams).then((res) => {
        if (res.code == 1) {
          if (this.isAdd) {
            this.$message.success("添加成功！");
          } else {
            this.$message.success("修改成功！");
          }
          this.getList();
          this.popShow = false;
        } else {
          this.$message.error(res.msg);
        }
      });
    },
    getManagerList() {
      _getManagerList().then((res) => {
        if (res.code == 1) {
          this.managerList = res.data;
        } else {
          this.$message({ type: "error", message: res.msg });
        }
      });
    },
    selManager(e) {
      this.managerList.forEach((val) => {
        if (val.id == e) {
          console.log(val);
          this.fromParams.managerPhone = val.mobile;
          this.fromParams.managerName = val.name;
        }
      });
    },
    toDetail(id) {
      let params = { id: id };
      this.pushTo("DormitoryDetail", params);
    },
    getProvincePackage(data) {
      this.fromParams.provinceId = data.province;
      this.fromParams.provinceName = data.provinceName;
      this.fromParams.cityId = data.city;
      this.fromParams.cityName = data.cityName;
      this.fromParams.districtName = data.districtName;
      this.fromParams.districtId = data.district;
    },
    delItem(row, index) {
      let _this = this;
      this.$confirm("确定删除?", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "",
      })
        .then(() => {
          _dormitoryDel(row.id).then((res) => {
            if (res.code == 1) {
              this.getList();
              this.$message({
                type: "success",
                message: "删除成功!",
              });
            } else {
              this.$message({ message: res.msg, type: "warning" });
            }
          });
        })
        .catch(() => {});
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
    .text_input2 {
      flex: inherit;
      width: 200px;
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