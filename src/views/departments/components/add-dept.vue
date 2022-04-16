<template>
  <!-- 新增部门的弹层 -->
  <el-dialog title="新增部门" :visible="showDialog">
    <!-- 表单组件  el-form   label-width设置label的宽度   -->
    <!-- 匿名插槽 -->
    <el-form label-width="120px" :model="formData" :rules="rules">
      <el-form-item label="部门名称" prop="name">
        <el-input
          v-model="formData.name"
          style="width: 80%"
          placeholder="1-50个字符"
        />
      </el-form-item>
      <el-form-item label="部门编码" prop="code">
        <el-input
          v-model="formData.code"
          style="width: 80%"
          placeholder="1-50个字符"
        />
      </el-form-item>
      <el-form-item label="部门负责人" prop="manager">
        <el-select
          v-model="formData.manager"
          style="width: 80%"
          placeholder="请选择"
        />
      </el-form-item>
      <el-form-item label="部门介绍" prop="introduce">
        <el-input
          v-model="formData.introduce"
          style="width: 80%"
          placeholder="1-300个字符"
          type="textarea"
          :rows="3"
        />
      </el-form-item>
    </el-form>
    <!-- el-dialog有专门放置底部操作栏的 插槽  具名插槽 -->
    <el-row slot="footer" type="flex" justify="center">
      <!-- 列被分为24 -->
      <el-col :span="6">
        <el-button type="primary" size="small">确定</el-button>
        <el-button size="small">取消</el-button>
      </el-col>
    </el-row>
  </el-dialog>
</template>

<script>
import { getDepartments } from '@/api/departments'
export default {
  name: 'HrsaasAddDept',
  props: {
    showDialog: {
      type: Boolean,
      default: false
    },
    treeNode: {
      type: Object,
      default: null
    }
  },
  data() {
    //   检查部门名称是否重复
    const checkNameRepeat = async(rule, value, callback) => {
      const { depts } = await getDepartments()
      //   查找所有同级部门下的子部门 子部门的pid===部门的id  部门的pid为空
      const arr = depts.filter((item) => item.pid === this.treeNode.id)
      //  如果为真 找到名称相同的部门，就不允许通过
      arr.some((item) => item.name === value)
        ? callback(new Error(`同级部门下${value}已存在`))
        : callback()
    }
    return {
      formData: {
        name: '',
        code: '',
        manager: '',
        introduce: ''
      },
      rules: {
        name: [
          { require: true, message: '部门名称必填', trigger: 'blur' },
          {
            min: 1,
            max: 50,
            message: '部门名称长度要求1-50个字符',
            trigger: 'blur'
          },
          {
            trigger: 'blur',
            validator: checkNameRepeat
          }
        ],
        code: [
          { require: true, message: '部门编码必填', trigger: 'blur' },
          {
            min: 1,
            max: 50,
            message: '部门编码长度要求1-50个字符',
            trigger: 'blur'
          }
        ],
        manager: [
          { require: true, message: '部门负责人必填', trigger: 'blur' },
          {
            min: 1,
            max: 50,
            message: '部门负责人长度要求1-50个字符',
            trigger: 'blur'
          }
        ],
        introduce: [
          { require: true, message: '部门介绍必填', trigger: 'blur' },
          {
            min: 1,
            max: 50,
            message: '部门介绍长度要求1-50个字符',
            trigger: 'blur'
          }
        ]
      }
    }
  },

  mounted() {},

  methods: {}
}
</script>

<style lang="scss" scoped></style>
