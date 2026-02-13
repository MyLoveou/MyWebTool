<template>
  <div class="admin-panel">
    <el-card>
      <template #header>
        <div class="card-header">
          <span>工具管理 (演示模式 - 数据仅保存在内存)</span>
          <el-button type="primary" size="small" @click="openDialog()">添加新工具</el-button>
        </div>
      </template>
      <el-table :data="tools" style="width: 100%" border stripe>
        <el-table-column prop="id" label="ID" width="150" />
        <el-table-column prop="title" label="名称" width="180" />
        <el-table-column prop="path" label="访问路径" width="200" />
        <el-table-column prop="componentName" label="组件目录名" width="180" />
        <el-table-column prop="description" label="描述" />
        <el-table-column label="操作" width="180" fixed="right">
          <template #default="scope">
            <el-button size="small" @click="openDialog(scope.row)">编辑</el-button>
            <el-button size="small" type="danger" @click="handleDelete(scope.row)">删除</el-button>
          </template>
        </el-table-column>
      </el-table>
    </el-card>

    <el-dialog v-model="dialogVisible" :title="isEdit ? '编辑工具' : '添加工具'">
      <el-form :model="form" label-width="100px">
        <el-form-item label="ID">
          <el-input v-model="form.id" :disabled="isEdit" placeholder="唯一标识，如 my-tool" />
        </el-form-item>
        <el-form-item label="名称">
          <el-input v-model="form.title" placeholder="显示在菜单的名称" />
        </el-form-item>
        <el-form-item label="组件目录">
          <el-input v-model="form.componentName" placeholder="src/tools/下的目录名" />
        </el-form-item>
        <el-form-item label="描述">
          <el-input v-model="form.description" type="textarea" />
        </el-form-item>
      </el-form>
      <template #footer>
        <el-button @click="dialogVisible = false">取消</el-button>
        <el-button type="primary" @click="handleSubmit">确定</el-button>
      </template>
    </el-dialog>
  </div>
</template>

<script setup lang="ts">
import { computed, ref, reactive } from 'vue'
import { useToolRegistryStore, type Tool } from '@/core/store/tool-registry'
import { ElMessage, ElMessageBox } from 'element-plus'

const toolStore = useToolRegistryStore()
const tools = computed(() => toolStore.tools)

const dialogVisible = ref(false)
const isEdit = ref(false)
const form = reactive<Tool>({
  id: '',
  title: '',
  path: '',
  componentName: '',
  description: ''
})

const openDialog = (row?: Tool) => {
  if (row) {
    isEdit.value = true
    Object.assign(form, row)
  } else {
    isEdit.value = false
    Object.assign(form, { id: '', title: '', path: '', componentName: '', description: '' })
  }
  dialogVisible.value = true
}

const handleSubmit = () => {
  // Simple validation
  if (!form.id || !form.title || !form.componentName) {
    ElMessage.warning('请填写完整信息')
    return
  }

  // Auto-generate path if empty
  if (!form.path) {
    form.path = `/tools/${form.id}`
  }

  if (isEdit.value) {
    const index = toolStore.tools.findIndex(t => t.id === form.id)
    if (index !== -1) {
      toolStore.tools[index] = { ...form }
      ElMessage.success('更新成功')
    }
  } else {
    toolStore.registerTool({ ...form })
    ElMessage.success('添加成功')
  }
  dialogVisible.value = false
}

const handleDelete = (row: Tool) => {
  ElMessageBox.confirm('确认删除该工具吗？', '提示', {
    type: 'warning'
  }).then(() => {
    const index = toolStore.tools.findIndex(t => t.id === row.id)
    if (index !== -1) {
      toolStore.tools.splice(index, 1)
      ElMessage.success('删除成功')
    }
  })
}
</script>

<style scoped>
.card-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
}
</style>
