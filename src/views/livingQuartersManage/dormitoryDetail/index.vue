<template>
  <div class="common-container">
    <breadcrumb id="breadcrumb-container" class="breadcrumb-container" />
    <el-row :gutter="24" class="row_content">
      <el-col :span="24">
        <div class="input_group">宿舍名称：{{ resData.name }}</div>
      </el-col>
      <el-col :span="24">
        <div class="input_group">宿舍楼地址：{{ resData.address }}</div>
      </el-col>
      <el-col :span="24">
        <div class="input_group">管理者：{{ resData.managerName }}</div>
      </el-col>
      <el-col :span="24">
        <div class="input_group">手机：{{ resData.managerPhone }}</div>
      </el-col>
      <el-col :span="24">
        <div class="input_group">
          总住宿人数：{{ resData.studentCount }}/{{ resData.amountCount }}
        </div>
      </el-col>
      <el-col :span="24">
        <div class="input_group">宿舍数：{{ resData.roomCount }}</div>
      </el-col>
      <el-col :span="12">
        <div class="input_group">
          <el-table
            :header-cell-style="{ background: '#F3F4F7', color: '#333333' }"
            :data="resData.voList"
            border
            style="width: 100%"
          >
            <el-table-column align="center" prop="code" label="房间号">
            </el-table-column>
            <el-table-column align="center" label="住宿人数">
              <template slot-scope="{ row }">
                {{ row.currentQuantity }}/{{ row.totalQuantity }}
              </template>
            </el-table-column>
          </el-table>
        </div>
      </el-col>
      <el-col>
        <div class="input_group">
          <el-button size="medium" @click="goBack" v-text="'返回'"></el-button>
        </div>
      </el-col>
    </el-row>
  </div>
</template>
<script>
import Breadcrumb from "@/components/Breadcrumb";
import { _dormitoryDetail } from "@/services/system";
export default {
  name: "DormitoryDetail",
  data() {
    return {
      resData: {
        address: "",
        amountCount: 0,
        cityId: 0,
        cityName: "",
        districtId: 0,
        districtName: "",
        id: 0,
        managerId: 0,
        managerName: "",
        managerPhone: "",
        name: "",
        provinceId: 0,
        provinceName: "",
        roomCount: 0,
        studentCount: 0,
        voList: [],
      },
    };
  },
  components: {
    Breadcrumb,
  },
  mounted() {
    console.log(this.$route.params.id);
    if (this.$route.params.id) {
      this.getDetail(this.$route.params.id);
    }
  },
  methods: {
    getDetail(id) {
      _dormitoryDetail(id).then((res) => {
        console.log(res);
      });
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
    goBack() {
      this.$router.go(-1);
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