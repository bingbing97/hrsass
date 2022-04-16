<template>
  <div class="dashboard-container">
    <div class="app-container">
      <el-card class="tree-card">
        <TreeTools :tree-node="company" :is-root="true" @addDepts="addDepts" />
        <!-- 用了一个行列布局 -->
        <!-- <el-row
          type="flex"
          justify="space-between"
          align="middle"
          style="height: 40px"
        >
          <el-col>
            <span>江苏传智播客教育科技股份有限公司</span>
          </el-col>
          <el-col :span="4">
            <el-row type="flex" justify="end">
              <! 两个内容 -->
        <!-- <el-col>负责人</el-col>
              <el-col> -->
        <!-- 下拉菜单 element -->
        <!-- <el-dropdown>
                  <span> 操作<i class="el-icon-arrow-down" /> </span> -->
        <!-- 下拉菜单 -->
        <!-- <el-dropdown-menu slot="dropdown">
                    <el-dropdown-item>添加子部门</el-dropdown-item>
                  </el-dropdown-menu>
                </el-dropdown>
              </el-col>
            </el-row>
          </el-col>
        </el-row> -->
        <el-tree
          :data="departs"
          :props="defaultProps"
          :default-expand-all="true"
        >
          <!-- 传入内容 插槽内容 会循环多次 有多少节点 就循环多少次 -->
          <!-- 作用域插槽 slot-scope="obj" 接收传递给插槽的数据   data 每个节点的数据对象-->
          <!-- <el-row
            slot-scope="{ data }"
            type="flex"
            justify="space-between"
            align="middle"
            style="height: 40px; width: 100%"
          >
            <el-col>
              <!左侧内容 -->
          <!-- <span>{{ data.name }}</span>
            </el-col>
            <el-col :span="4">
              <el-row type="flex" justify="end">
                <el-col>{{ data.manager }}</el-col>
                <el-col>
                  <!放置下拉菜单 -->
          <!-- <el-dropdown>
                    <! 内容 -->
          <!-- <span>操作
                      <i class="el-icon-arrow-down" />
                    </span> -->
          <!-- 具名插槽 -->
          <!-- <el-dropdown-menu slot="dropdown"> -->
          <!-- 下拉选项 -->
          <!-- <el-dropdown-item>添加子部门</el-dropdown-item>
                      <el-dropdown-item>编辑部门</el-dropdown-item>
                      <el-dropdown-item>删除部门</el-dropdown-item>
                    </el-dropdown-menu>
                  </el-dropdown>
                </el-col> -->
          <!-- </el-row> -->

          <!-- 右侧内容 -->
          <!-- </el-col>

          </el-row> -->
          <TreeTools
            slot-scope="{ data }"
            :tree-node="data"
            @delDepts="getDepartments"
            @addDepts="addDepts"
          />
        </el-tree>
      </el-card>
    </div>
    <AddDept :show-dialog="showDialog" :tree-node="currentNode" />
  </div>
</template>

<script>
import TreeTools from '@/views/departments/components/tree-tools.vue'
import { getDepartments } from '@/api/departments'
import { tranListToTreeData } from '@/utils/tranListToTreeData'
import AddDept from '@/views/departments/components/add-dept.vue'
export default {
  components: {
    TreeTools,
    AddDept
  },
  data() {
    return {
      company: { name: '', manager: '' },
      departs: [],
      defaultProps: {
        label: 'name' // 表示 从这个属性显示内容
      },
      showDialog: false,
      currentNode: null // 当前被点击的根节点
    }
  },
  created() {
    this.getDepartments()
  },
  methods: {
    async getDepartments() {
      const res = await getDepartments()
      // console.log(res)
      this.company = { name: res.companyName, manager: '管理员' }
      this.departs = tranListToTreeData(res.depts, '')
    },
    addDepts(node) {
      this.showDialog = true
      this.currentNode = node
    }
  }
}
</script>

<style scoped>
.tree-card {
  padding: 30px 140px;
  font-size: 14px;
}
</style>
