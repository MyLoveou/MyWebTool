<template>
  <div class="admin-crud">
    <div class="header-actions">
      <el-button type="primary" @click="handleCreate">新增{{ label }}</el-button>
      <el-button @click="fetchData">刷新</el-button>
    </div>

    <el-table :data="tableData" v-loading="loading" style="width: 100%">
      <el-table-column 
        v-for="col in columns" 
        :key="col.prop" 
        :prop="col.prop" 
        :label="col.label" 
        :width="col.width"
        :formatter="col.formatter"
      />
      
      <el-table-column label="操作" width="180" fixed="right">
        <template #default="scope">
          <el-button size="small" @click="handleEdit(scope.row)">编辑</el-button>
          <el-button 
            size="small" 
            type="danger" 
            @click="handleDelete(scope.row)"
          >删除</el-button>
        </template>
      </el-table-column>
    </el-table>
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted } from 'vue'
import { useRouter } from 'vue-router'
import { ElMessage, ElMessageBox } from 'element-plus'
import { getResource, deleteResource } from '@/core/api/client'

export interface Column {
  prop: string
  label: string
  width?: string | number
  formatter?: (row: any) => string
}

export interface FormField {
  prop: string
  label: string
  type?: 'text' | 'textarea' | 'tags' | 'json' | 'markdown' | 'works-list'
}

const props = defineProps<{
  resource: string
  label: string
  columns: Column[]
  formFields: FormField[]
  idField?: string // Default 'id'
}>()

const router = useRouter()
const idField = props.idField || 'name'

const tableData = ref([])
const loading = ref(false)

const fetchData = async () => {
  loading.value = true
  try {
    const res = await getResource(props.resource)
    tableData.value = res.data
  } catch (error) {
    ElMessage.error('加载数据失败')
    console.error(error)
  } finally {
    loading.value = false
  }
}

const handleCreate = () => {
  router.push(`/admin/create/${props.resource}`)
}

const handleEdit = (row: any) => {
  const id = row[idField]
  router.push(`/admin/edit/${props.resource}/${id}`)
}

const handleDelete = (row: any) => {
  ElMessageBox.confirm(
    `确定要删除 "${row[idField]}" 吗？`,
    '警告',
    {
      confirmButtonText: '确定',
      cancelButtonText: '取消',
      type: 'warning',
    }
  ).then(async () => {
    try {
      await deleteResource(props.resource, row[idField])
      ElMessage.success('删除成功')
      fetchData()
    } catch (error) {
      ElMessage.error('删除失败')
      console.error(error)
    }
  })
}

onMounted(() => {
  fetchData()
})
</script>

<style scoped>
.header-actions {
  margin-bottom: 20px;
}
</style>
