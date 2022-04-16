import request from '@/utils/request'

// 查询企业的部门列表
export function getDepartments() {
  return request({
    method: 'GET',
    url: '/company/department'
  })
}

// 根据ID删除部门
export function delDepartments(id) {
  return request({
    method: 'DELETE',
    url: `/company/department/${id}`
  })
}

// 新增部门
export function addDepartments(data) {
  return request({
    method: 'POST',
    url: '/company/department',
    data
  })
}
