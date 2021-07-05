<template>
  <div>
    <div class="common-container">
      <breadcrumb id="breadcrumb-container" class="breadcrumb-container" />
      <el-row :gutter="24" class="row_content">
        <el-col :span="6">
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
        <el-col :span="6">
          <div class="input_group">
            <p>编码</p>
            <el-input
              v-model="formData.code"
              class="text_input"
              size="medium"
              placeholder="请输入名称"
            ></el-input>
          </div>
        </el-col>
        <!-- <el-col :span="6">
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
        <el-col :span="12">
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
            <el-button size="medium" @click="additem" type="primary "
              >添加</el-button
            >
          </div>
          <div class="input_group">
            <el-table
              :header-cell-style="{ background: '#F3F4F7', color: '#333333' }"
              :data="resList"
              border
              style="width: 100%"
            >
              <el-table-column align="center" prop="name" label="名称">
              </el-table-column>
              <el-table-column align="center" prop="code" label="编码">
              </el-table-column>
              <el-table-column align="center" prop="model" label="型号">
              </el-table-column>
              <el-table-column align="center" prop="brand" label="品牌">
              </el-table-column>
              <el-table-column width="120" align="center" label="操作">
                <template slot-scope="{ row }">
                  <el-button @click="editItem(row)" size="mini" type="warning"
                    >修改</el-button
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
      :visible.sync="addShow"
      :close-on-click-modal="false"
      width="50%"
      center
    >
      <div class="pop_content">
        <div class="pop_item">
          <p>物品编码</p>
          <el-input
            v-model="fromParams.code"
            class="pop_input"
            size="medium"
            placeholder="请输入物品编码"
          ></el-input>
        </div>
        <div class="pop_item">
          <p>物品名称</p>
          <el-input
            v-model="fromParams.name"
            class="pop_input"
            size="medium"
            placeholder="请输入物品名称"
          ></el-input>
        </div>
        <div class="pop_item">
          <p>型号</p>
          <el-input
            v-model="fromParams.model"
            class="pop_input"
            size="medium"
            placeholder="请输入型号"
          ></el-input>
        </div>
        <div class="pop_item">
          <p>品牌</p>
          <el-input
            v-model="fromParams.brand"
            class="pop_input"
            size="medium"
            placeholder="请输入品牌"
          ></el-input>
        </div>
        <div class="pop_item pop_item2">
          <p>图片</p>
          <el-upload
            action="#"
            class="avatar-uploader"
            accept="image/png,image/gif,image/jpg,image/jpeg"
            :show-file-list="false"
            :before-upload="handleBeforeUpload"
          >
            <img
              v-if="fromParams.img"
              :src="fromParams.baseUrl + fromParams.img"
              class="avatar"
            />
            <i v-else class="el-icon-plus avatar-uploader-icon"></i>
          </el-upload>
        </div>
      </div>

      <span slot="footer" class="dialog-footer">
        <el-button
          @click="addEditSubmit"
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
import { _toolList, _toolAddEdit } from "@/services/system";
import { _uploadPic } from "@/api/common";
export default {
  name: "GoodsConfig",
  data() {
    return {
      addShow: false,
      isAdd: true,
      picture: false,
      formData: {
        pageNo: 1,
        pageSize: 10,
        name: "",
        code: "",
      },
      fromParams: {
        brand: "",
        code: "",
        id: "",
        img: "",
        model: "",
        name: "",
        baseUrl: "",
      },
      total: 0,
      resList: [],
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
      _toolList(this.formData).then((res) => {
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
    additem() {
      let data = {
        brand: "",
        code: "",
        id: "",
        img: "",
        model: "",
        name: "",
      };
      Object.assign(this.fromParams, data);
      this.addShow = true;
    },
    resetTable() {
      this.formData.pageNo = current.page;
      this.formData.pageSize = current.limit;
      this.getList();
    },
    editItem(item) {
      this.isAdd = false;
      this.fromParams = item;
      this.addShow = true;
    },
    delItem(row, index) {
      let _this = this;
      this.$confirm("确定删除?", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "",
      })
        .then(() => {
          // _taskDel(row.id).then((res) => {
          //   if (res.code == 1) {
          //     this.getTaskList();
          //     this.$message({
          //       type: "success",
          //       message: "删除成功!",
          //     });
          //   } else {
          //     this.$message({ message: res.msg, type: "warning" });
          //   }
          // });
        })
        .catch(() => {});
    },
    handleBeforeUpload(file) {
      this.picture = true;
      if (
        !(
          file.type === "image/png" ||
          file.type === "image/gif" ||
          file.type === "image/jpg" ||
          file.type === "image/jpeg"
        )
      ) {
        this.$message({
          message:
            "请上传格式为image/png, image/gif, image/jpg, image/jpeg的图片",
          type: "warning",
        });
        return;
      }
      let size = file.size / 1024 / 1024 / 2;
      if (size > 2) {
        this.$message({
          message: "图片大小必须小于2M",
          type: "warning",
        });
        return;
      }
      let fd = new FormData(); //通过form数据格式来传
      fd.append("filename", file); //传文件
      _uploadPic(fd).then((res) => {
        if (res.code == 1) {
          this.fromParams.baseUrl = res.data.baseUrl;
          this.fromParams.img = res.data.key;
          this.picture = false;
        } else {
          this.$message({ message: res.msg, type: "warning" });
        }
      });
    },
    addEditSubmit() {
      if (!this.fromParams.code) return this.$message.warning("请输入编码");
      if (!this.fromParams.name) return this.$message.warning("请输入物品名称");
      if (!this.fromParams.model) return this.$message.warning("请输入型号");
      if (!this.fromParams.brand) return this.$message.warning("请输入品牌");
      if (!this.fromParams.img) return this.$message.warning("请上传图片");
      _toolAddEdit(this.fromParams).then((res) => {
        if (res.code == 1) {
          if (this.isAdd) {
            this.$message.success("添加成功！");
          } else {
            this.$message.success("修改成功！");
          }
          this.getList();
          this.addShow = false;
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