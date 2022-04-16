<template>
  <el-row
    type="flex"
    justify="space-between"
    align="middle"
    style="height: 40px; width: 100%"
  >
    <el-col>
      <!-- 左侧内容 -->
      <span>{{ treeNode.name }}</span>
    </el-col>
    <el-col :span="4">
      <el-row type="flex" justify="end">
        <el-col>{{ treeNode.manager }}</el-col>
        <el-col>
          <!-- 放置下拉菜单 -->
          <el-dropdown @command="handleCommand">
            <!-- 内容 -->
            <span>操作
              <i class="el-icon-arrow-down" />
            </span>
            <!-- 具名插槽 -->
            <el-dropdown-menu slot="dropdown">
              <!-- 下拉选项 -->
              <el-dropdown-item command="add">添加子部门</el-dropdown-item>
              <el-dropdown-item
                v-if="!isRoot"
                command="edit"
              >编辑部门</el-dropdown-item>
              <el-dropdown-item
                v-if="!isRoot"
                command="del"
              >删除部门</el-dropdown-item>
            </el-dropdown-menu>
          </el-dropdown>
        </el-col>
      </el-row>

      <!-- 右侧内容 -->
    </el-col>
  </el-row>
</template>

<script>
import { delDepartments } from '@/api/departments'
export default {
  name: 'HrsaasTreeTools',
  props: {
    treeNode: {
      type: Object,
      required: true
    },
    isRoot: {
      default: false,
      type: Boolean
    }
  },
  data() {
    return {}
  },

  mounted() {},

  methods: {
    handleCommand(command) {
      if (command === 'add') {
        this.$emit('addDepts', this.treeNode)
        // eslint-disable-next-line no-empty
      } else if (command === 'edit') {
      } else {
        this.$confirm('您确定要删除该部门嘛?', '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        })
          .then(() => {
            return delDepartments(this.treeNode.id)
          })
          .then(() => {
            this.$emit('delDepts')
            this.$message({
              type: 'success',
              message: '删除成功!'
            })
          })
      }
    }
  }
}
</script>

<style lang="scss" scoped></style>
