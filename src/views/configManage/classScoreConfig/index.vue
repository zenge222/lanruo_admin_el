<template>
  <div class="common-container">
    <breadcrumb id="breadcrumb-container" class="breadcrumb-container" />
    <el-row :gutter="24" class="row_content">
      <el-col :span="4">
        <div class="input_group">
          <p>评分项</p>
          <el-input
            class="text_input"
            size="medium"
            placeholder="请输入评分项"
          ></el-input>
        </div>
      </el-col>
      <el-col :span="6">
        <div class="input_group">
          <p>评分</p>
          <el-input
            class="text_input"
            size="medium"
            placeholder="请输入评分"
          ></el-input>
          <el-button class="text_btn" type="primary" size="small"
            >添加</el-button
          >
        </div>
      </el-col>
      <el-col :span="24">
        <div class="input_group">
          <p>起始分</p>
          <el-input
            class="text_input"
            size="medium"
            placeholder="请输入起始分"
            :disabled="isLock"
          ></el-input>
          <el-button class="text_btn" @click="isLock = !isLock" size="small"
            >锁定</el-button
          >
        </div>
      </el-col>
      <el-col :span="12">
        <div class="input_group">
          <el-table
            :header-cell-style="{ background: '#F3F4F7', color: '#333333' }"
            :data="[1, 2]"
            border
            style="width: 100%"
          >
            <el-table-column :width="60" align="center" label="序号">
              <template slot-scope="{ $index }">
                <span v-text="$index + 1"></span>
              </template>
            </el-table-column>
            <el-table-column align="center" prop="" label="评分项">
            </el-table-column>
            <el-table-column align="center" prop="" label="评分">
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
        </div>
      </el-col>
      <el-col :span="24">
        <div class="input_group">
          <el-button class="submit_btn" size="medium" type="primary"
            >提交
          </el-button>
        </div>
      </el-col>
    </el-row>
  </div>
</template>
<script>
import Breadcrumb from "@/components/Breadcrumb";
export default {
  name:"ClassScoreConfig",
  data() {
    return {
      isLock: false,
    };
  },
  components: {
    Breadcrumb,
  },
  methods: {
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
      width: 120px;
    }
    .text_btn {
      margin-left: 20px;
    }
  }
}
</style>