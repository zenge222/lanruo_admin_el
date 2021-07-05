<template>
  <div class="common-container">
    <breadcrumb id="breadcrumb-container" class="breadcrumb-container" />
    <el-row :gutter="24" class="row_content">
      <!-- <el-col :span="4">
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
      </el-col> -->
      <el-col :span="24">
        <div class="input_group">
          <p>起始分</p>
          <el-input
            oninput="value=value.replace(/[^\d]/g,'')"
            v-model="startParams.startPoint"
            class="text_input"
            size="medium"
            placeholder="请输入起始分"
            :disabled="locking"
          ></el-input>
          <el-button
            class="text_btn"
            :type="locking ? '' : 'primary'"
            @click="lockingSubmit"
            v-text="locking ? '解锁' : '提交'"
            size="small"
            >解锁</el-button
          >
        </div>
      </el-col>
      <el-col :span="24">
        <div class="input_group">
          <el-button size="small" @click="additem" type="primary "
            >添加</el-button
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
    <!-- 添加修改 -->
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
          <p>评分项</p>
          <el-input
            v-model="fromParams.name"
            class="pop_input"
            size="medium"
            placeholder="请输入评分项"
          ></el-input>
        </div>
        <div class="pop_item">
          <p>评分</p>
          <el-input
            v-model="fromParams.maxScore"
            oninput="value=value.replace(/[^\d]/g,'')"
            class="pop_input"
            size="medium"
            placeholder="请输入评分"
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
  </div>
</template>
<script>
import Breadcrumb from "@/components/Breadcrumb";
import {
  _getBaseScore,
  _baseScoreUpdate,
  _gradeConfigAddEdit,
} from "@/services/system";
export default {
  name: "DailyScoreConfig",
  data() {
    return {
      isAdd: true,
      addShow: false,
      locking: true,
      startParams: {
        type: 1, //  1达标日常起始分 2代表上课起始分
        startPoint: "",
      },
      fromParams: {
        id: "",
        maxScore: "",
        name: "",
        standard: "",
        type: 1, // 1日常评分配置，2：上课评分配置，3：实习评分配置
      },
    };
  },
  components: {
    Breadcrumb,
  },
  mounted() {
    this.getBaseScore();
  },
  methods: {
    getBaseScore() {
      _getBaseScore(this.startParams.type).then((res) => {
        if (res.code == 1) {
          this.startParams.startPoint = Number(res.data);
        } else {
          this.$message.error(res.msg);
        }
      });
    },
    addEditSubmit() {},
    lockingSubmit() {
      if (this.locking) {
        this.locking = false;
        return;
      }
      if (!this.startParams.startPoint)
        return this.$message.warning("请输入起始分");
      _baseScoreUpdate(this.startParams).then((res) => {
        if (res.code == 1) {
          this.$message.success("修改成功");
          this.locking = true;
        } else {
          this.$message.error(res.msg);
        }
      });
    },
    additem() {
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