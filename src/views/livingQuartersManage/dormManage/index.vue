<template>
  <div>
    <div class="common-container">
      <breadcrumb id="breadcrumb-container" class="breadcrumb-container" />
      <el-row :gutter="24" class="row_content">
        <el-col :span="6">
          <div class="input_group">
            <p>房间号</p>
            <el-input
              class="text_input"
              size="medium"
              placeholder="请输入房间号"
            ></el-input>
          </div>
        </el-col>
        <el-col :span="18">
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
            <el-button @click="addRoom" size="medium" type="primary "
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
              <el-table-column width="100" align="center" label="序号">
                <template slot-scope="{ $index }">
                  <span v-text="$index + 1"></span>
                </template>
              </el-table-column>
              <el-table-column align="center" prop="code" label="房间号">
              </el-table-column>

              <el-table-column width="300" align="center" label="操作">
                <template slot-scope="{ row }">
                  <el-button @click="editRoom(row)" size="mini" type="warning"
                    >修改</el-button
                  >
                  <el-button
                    @click="distributeItem(row)"
                    size="mini"
                    type="success"
                    >分配</el-button
                  >
                  <el-button @click="seeDetail(row)" size="mini"
                    >查看</el-button
                  >
                  <el-button @click="delRoom(row)" size="mini" type="danger"
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
    <!-- 添加 -->
    <el-dialog
      custom-class="dialog_min_width"
      :title="isAdd ? '添加' : '修改'"
      :lock-scroll="false"
      :visible.sync="addShow"
      :close-on-click-modal="false"
      width="40%"
      center
    >
      <div class="pop_content">
        <div class="pop_item">
          <p>宿舍楼</p>
          <el-select
            class="right_input"
            placeholder="请选择宿舍楼"
            size="medium"
            v-model="fromParams.dormitoryBuildingId"
          >
            <el-option
              :label="item.name"
              :value="item.id"
              v-for="item in dormitoryList"
              :key="item.id"
            ></el-option>
          </el-select>
        </div>
        <div class="pop_item">
          <p>房间号</p>
          <el-input
            v-model="fromParams.code"
            class="pop_input"
            size="medium"
            placeholder="请输入房间号"
          ></el-input>
        </div>
        <div class="pop_item">
          <p>住宿人数</p>
          <el-input
            v-model="fromParams.totalQuantity"
            class="pop_input"
            size="medium"
            placeholder="请输入住宿人数"
          ></el-input>
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
    <!-- 分配房间 -->
    <el-dialog
      custom-class="dialog_min_width"
      :title="'分配房间'"
      :lock-scroll="false"
      :visible.sync="popShow"
      :close-on-click-modal="false"
      width="40%"
      center
    >
      <div class="pop_content">
        <el-row :gutter="24" class="row_content">
          <el-col :span="12"
            ><div class="input_group2">
              房间号：{{ detailData.code }}
            </div></el-col
          >
          <el-col :span="12"
            ><div class="input_group2">
              住宿人数：{{ detailData.currentQuantity }}/{{
                detailData.totalQuantity
              }}
            </div></el-col
          >
          <el-col :span="24"
            ><div class="input_group2">
              住宿人员
              <el-button
                @click="addStudentPop"
                style="margin-left: 20px"
                size="small"
                type="primary "
                >添加</el-button
              >
            </div></el-col
          >
          <el-col :span="24"
            ><div class="input_group2">
              <el-table
                :header-cell-style="{
                  background: '#F3F4F7',
                  color: '#333333',
                }"
                :data="detailData.voList"
                border
                style="width: 100%"
              >
                <el-table-column width="80" align="center" label="序号">
                  <template slot-scope="{ $index }">
                    <span v-text="$index + 1"></span>
                  </template>
                </el-table-column>
                <el-table-column align="center" prop="studentName" label="姓名">
                </el-table-column>
                <el-table-column align="center" prop="" label="校区">
                </el-table-column>
                <el-table-column align="center" prop="" label="班级">
                </el-table-column>
                <el-table-column width="100" align="center" label="操作">
                  <template slot-scope="{ row, $index }">
                    <el-button
                      @click="delItem(row, $index)"
                      size="mini"
                      type="danger"
                      >删除</el-button
                    >
                  </template>
                </el-table-column>
              </el-table>
            </div></el-col
          >
        </el-row>
      </div>

      <span slot="footer" class="dialog-footer">
        <el-button size="medium" type="primary" v-text="'确定'"></el-button>
        <el-button
          size="medium"
          @click="popShow = false"
          v-text="'取消'"
        ></el-button>
      </span>
    </el-dialog>
    <!-- 添加住宿人员 -->
    <el-dialog
      custom-class="dialog_min_width"
      :title="'添加住宿人员'"
      :lock-scroll="false"
      :visible.sync="popShow2"
      :close-on-click-modal="false"
      width="25%"
      center
    >
      <div class="pop_content">
        <el-row :gutter="24" class="row_content">
          <el-col :span="24">
            <div class="pop_item pop_item2">
              <p>校区</p>
              <el-select
                class="right_input"
                placeholder="请选择校区"
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
          <el-col :span="24">
            <div class="pop_item pop_item2">
              <p>班级</p>
              <el-select
                class="right_input"
                placeholder="请选择班级"
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
          <el-col :span="24">
            <div class="pop_item pop_item2">
              <p>学员</p>
              <el-select
                class="right_input"
                placeholder="请选择学员"
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
        </el-row>
      </div>
      <span slot="footer" class="dialog-footer">
        <el-button size="medium" type="primary" v-text="'确定'"></el-button>
        <el-button
          size="medium"
          @click="popShow2 = false"
          v-text="'取消'"
        ></el-button>
      </span>
    </el-dialog>
    <!-- 房间详情 -->
    <el-dialog
      custom-class="dialog_min_width"
      :title="'房间详情'"
      :lock-scroll="false"
      :visible.sync="detailShow"
      :close-on-click-modal="false"
      width="40%"
      center
    >
      <div class="pop_content">
        <el-row :gutter="24" class="row_content">
          <!-- <el-col :span="24"
            ><div class="input_group2">宿舍名称：上海静安宿舍</div></el-col
          >
          <el-col :span="24"
            ><div class="input_group2">
              宿舍楼地址：上海静安区长兴路173号
            </div></el-col
          >
          <el-col :span="12"
            ><div class="input_group2">管理者：黄平</div></el-col
          >
          <el-col :span="12"
            ><div class="input_group2">手机：13000000000</div></el-col
          > -->
          <el-col :span="12"
            ><div class="input_group2">
              房间号：{{ detailData.code }}
            </div></el-col
          >
          <el-col :span="12"
            ><div class="input_group2">
              住宿人数：{{ detailData.currentQuantity }}/{{
                detailData.totalQuantity
              }}
            </div></el-col
          >
          <el-col :span="24"><div class="input_group2">住宿人员：</div></el-col>
          <el-col :span="24"
            ><div class="input_group2">
              <el-table
                :header-cell-style="{
                  background: '#F3F4F7',
                  color: '#333333',
                }"
                :data="detailData.voList"
                border
                style="width: 100%"
              >
                <el-table-column width="80" align="center" label="序号">
                  <template slot-scope="{ $index }">
                    <span v-text="$index + 1"></span>
                  </template>
                </el-table-column>
                <el-table-column align="center" prop="" label="姓名">
                </el-table-column>
                <el-table-column align="center" prop="" label="校区">
                </el-table-column>
                <el-table-column align="center" prop="" label="班级">
                </el-table-column>
              </el-table></div
          ></el-col>
        </el-row>
      </div>

      <span slot="footer" class="dialog-footer">
        <el-button
          size="medium"
          @click="detailShow = false"
          v-text="'返回'"
        ></el-button>
      </span>
    </el-dialog>
  </div>
</template>
<script>
import Breadcrumb from "@/components/Breadcrumb";
import Pagination from "@/components/Pagination";
import {
  _getDormitoryList,
  _roomAddEdit,
  _getRoomList,
  _roomDel,
  _roomDetail,
  _schoolList,
} from "@/services/system";
export default {
  name: "DormManage",
  data() {
    return {
      addShow: false,
      popShow: false,
      popShow2: false,
      detailShow: false,
      isAdd: true,
      resList: [],
      formData: {
        pageNo: 1,
        pageSize: 10,
        name: "",
      },
      total: 0,
      fromParams: {
        code: "",
        dormitoryBuildingId: "",
        id: "",
        totalQuantity: "",
      },
      dormitoryList: [],
      detailData: {
        code: "",
        currentQuantity: "",
        dormitoryBuildingId: "",
        id: "",
        totalQuantity: "",
        voList: [],
      },
    };
  },
  components: {
    Breadcrumb,
    Pagination,
  },
  mounted() {
    this.getList();
    this.getSelList();
  },
  methods: {
    getList() {
      _getRoomList(this.formData).then((res) => {
        if (res.code == 1) {
          this.resList = res.data.list;
          this.total = Number(res.data.total);
        } else {
          this.$message.error(res.msg);
        }
      });
    },
    resetTable(current) {
      this.formData.pageNo = current.page;
      this.formData.pageSize = current.limit;
      this.getList();
    },
    searchList() {
      this.formData.pageNo = 1;
      this.getList();
    },
    getSelList() {
      let params = {
        name: "",
        pageNo: 1,
        pageSize: 9999,
      };
      _getDormitoryList(params).then((res) => {
        if (res.code == 1) {
          this.dormitoryList = res.data.list;
        } else {
          this.$message.error(res.msg);
        }
      });
    },
    addRoom() {
      let data = {
        code: "",
        dormitoryBuildingId: "",
        id: "",
        totalQuantity: "",
      };
      Object.assign(this.fromParams, data);
      this.addShow = true;
    },
    editRoom(item) {
      this.isAdd = false;
      this.fromParams = item;
      this.addShow = true;
    },
    addStudentPop() {
      this.popShow2 = true;
    },
    distributeItem(item) {
      _roomDetail(item.id).then((res) => {
        if (res.code == 1) {
          this.detailData = res.data;
          this.popShow = true;
        } else {
          this.$message.error(res.msg);
        }
      });
    },
    seeDetail(item) {
      _roomDetail(item.id).then((res) => {
        if (res.code == 1) {
          this.detailData = res.data;
          this.detailShow = true;
        } else {
          this.$message.error(res.msg);
        }
      });
    },
    addEditSubmit() {
      if (!this.fromParams.dormitoryBuildingId)
        return this.$message.warning("请选择宿舍楼");
      console.log(this.fromParams.code);
      if (!this.fromParams.code) return this.$message.warning("请输入房间号");
      if (!this.fromParams.totalQuantity)
        return this.$message.warning("请输入住宿人数");
      _roomAddEdit(this.fromParams).then((res) => {
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
    delRoom(item) {
      let _this = this;
      this.$confirm("确定删除?", "提示", {
        lockScroll: false,
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "",
      })
        .then(() => {
          _roomDel(item.id).then((res) => {
            if (res.code == 1) {
              _this.getList();
              _this.$message({
                type: "success",
                message: "删除成功!",
              });
            } else {
              _this.$message({ message: res.msg, type: "warning" });
            }
          });
        })
        .catch(() => {});
    },
    delItem(row, index) {
      let _this = this;
      this.$confirm("确定删除?", "提示", {
        lockScroll: false,
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
  .input_group2 {
    padding: 0 0 16px 0;
    display: flex;
    align-items: center;
  }
}
.pop_item {
  align-items: center;
  p {
    max-width: 100px;
  }
}
.pop_item2 {
  p {
    width: inherit;
  }
}
.text_input {
  // width: 120px;
  flex: 1;
}
</style>