<template>
  <div class="common-container">
    <breadcrumb id="breadcrumb-container" class="breadcrumb-container" />
    <el-row :gutter="24" class="row_content">
      <el-col :span="12">
        <div class="input_group">
          <el-table
            :header-cell-style="{ background: '#F3F4F7', color: '#333333' }"
            :data="[1, 2]"
            border
            style="width: 100%"
          >
            <el-table-column align="center" label="课程名称">
              <template slot-scope="{ $index }">
                <span v-text="$index + 1"></span>
              </template>
            </el-table-column>
            <el-table-column align="center" prop="" label="总分">
            </el-table-column>
            <el-table-column align="center" prop="" label="理论分">
            </el-table-column>
            <el-table-column align="center" prop="" label="实操分">
            </el-table-column>
            <el-table-column width="120" align="center" label="操作">
              <template slot-scope="{ row, $index }">
                <el-button @click="detailShow = true" size="mini" type="warning"
                  >配置分数</el-button
                >
              </template>
            </el-table-column>
          </el-table>
        </div>
      </el-col>
    </el-row>
    <!-- 详情 -->
    <el-dialog
      custom-class="dialog_min_width"
      :title="'礼仪课'"
      :lock-scroll="false"
      :visible.sync="detailShow"
      :close-on-click-modal="false"
      width="70%"
      center
    >
      <div class="pop_content">
        <el-row :gutter="24" class="row_content">
          <el-col :span="24">
            <div class="input_group">
              <p class="sub_title">理论分</p>
              <el-button
                class="text_btn"
                type="primary"
                size="small"
                @click="popShow = true"
                >添加</el-button
              >
            </div>
          </el-col>
          <el-col :span="24">
            <div class="input_group">
              <el-table
                :header-cell-style="{ background: '#F3F4F7', color: '#333333' }"
                :data="[1, 2]"
                border
                style="width: 100%"
              >
                <el-table-column width="50" align="center" label="序号">
                  <template slot-scope="{ $index }">
                    <span v-text="$index + 1"></span>
                  </template>
                </el-table-column>
                <el-table-column align="center" prop="" label="评分项">
                </el-table-column>
                <el-table-column width="50" align="center" prop="" label="分值">
                </el-table-column>
                <el-table-column align="center" prop="" label="评分标准">
                </el-table-column>
                <el-table-column width="150" align="center" label="操作">
                  <template slot-scope="{ row, $index }">
                    <el-button
                      @click="popShow = true"
                      size="mini"
                      type="warning"
                      >修改</el-button
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
             <el-col :span="24">
            <div class="input_group">
              <p class="sub_title">实操分</p>
              <el-button
                class="text_btn"
                type="primary"
                size="small"
                @click="popShow = true"
                >添加</el-button
              >
            </div>
          </el-col>
          <el-col :span="24">
            <div class="input_group">
              <el-table
                :header-cell-style="{ background: '#F3F4F7', color: '#333333' }"
                :data="[1, 2]"
                border
                style="width: 100%"
              >
                <el-table-column width="50" align="center" label="序号">
                  <template slot-scope="{ $index }">
                    <span v-text="$index + 1"></span>
                  </template>
                </el-table-column>
                <el-table-column align="center" prop="" label="评分项">
                </el-table-column>
                <el-table-column width="50" align="center" prop="" label="分值">
                </el-table-column>
                <el-table-column align="center" prop="" label="评分标准">
                </el-table-column>
                <el-table-column width="150" align="center" label="操作">
                  <template slot-scope="{ row, $index }">
                    <el-button
                      @click="popShow = true"
                      size="mini"
                      type="warning"
                      >修改</el-button
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
      </div>

      <span slot="footer" class="dialog-footer">
        <el-button size="medium" type="primary" v-text="'确定'"></el-button>
        <el-button
          size="medium"
          @click="detailShow = false"
          v-text="'取消'"
        ></el-button>
      </span>
    </el-dialog>
    <!-- 添加修改 -->
    <el-dialog
      custom-class="dialog_min_width"
      :title="isAdd ? '添加' : '修改'"
      :lock-scroll="false"
      :visible.sync="popShow"
      :close-on-click-modal="false"
      width="50%"
      center
    >
      <div class="pop_content">
        <div class="pop_item">
          <p>评分项</p>
          <el-input
            class="pop_input"
            size="medium"
            placeholder="请输入评分项"
          ></el-input>
        </div>
        <div class="pop_item">
          <p>分值</p>
          <el-input
            class="pop_input"
            size="medium"
            placeholder="请输入分值"
          ></el-input>
        </div>
        <div class="pop_item">
          <p>评分标准</p>
          <el-input
            class="pop_input"
            size="medium"
            placeholder="请输入评分标准"
          ></el-input>
        </div>
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
  </div>
</template>
<script>
import Breadcrumb from "@/components/Breadcrumb";
export default {
  name: "TestScoreConfig",
  data() {
    return {
      isAdd: true,
      popShow: false,
      isLock: false,
      detailShow: false,
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
    .sub_title {
      font-size: 14px;
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