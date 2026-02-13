<template>
  <div class="admin-panel">
    <el-tabs v-model="activeTab" type="card">
      <el-tab-pane label="作者管理" name="authors">
        <AdminCrud 
          resource="authors" 
          label="作者" 
          :columns="authorColumns" 
          :form-fields="getFields('authors')"
        />
      </el-tab-pane>
      
      <el-tab-pane label="小说管理" name="novels">
        <AdminCrud 
          resource="novels" 
          label="小说" 
          :columns="novelColumns" 
          :form-fields="getFields('novels')"
        />
      </el-tab-pane>
      
      <el-tab-pane label="软件管理" name="software">
        <AdminCrud 
          resource="software" 
          label="软件" 
          :columns="softwareColumns" 
          :form-fields="getFields('software')"
        />
      </el-tab-pane>
      
      <el-tab-pane label="导航管理" name="quick-links">
        <AdminCrud 
          resource="quick-links" 
          label="网站导航" 
          :columns="linkColumns" 
          :form-fields="getFields('quick-links')"
        />
      </el-tab-pane>
    </el-tabs>
  </div>
</template>

<script setup lang="ts">
import { ref, watch, onMounted } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import AdminCrud from './components/AdminCrud.vue'
import { adminConfigs } from '@/core/config/admin-config'

const route = useRoute()
const router = useRouter()
const activeTab = ref('authors')

// Sync tab with URL query param
onMounted(() => {
  if (route.query.tab) {
    activeTab.value = route.query.tab as string
  }
})

watch(activeTab, (newTab) => {
  router.replace({ query: { ...route.query, tab: newTab } })
})

const getFields = (resource: string) => adminConfigs[resource]?.formFields || []

// --- Authors Config ---
const authorColumns = [
  { prop: 'name', label: '姓名', width: 120 },
  { prop: 'category', label: '分类', width: 100 },
  { prop: 'life_span', label: '生卒年', width: 120 },
  { prop: 'desc', label: '简介' }
]

// --- Novels Config ---
const novelColumns = [
  { prop: 'name', label: '书名', width: 150 },
  { prop: 'author', label: '作者', width: 120 },
  { prop: 'category', label: '分类', width: 100 },
  { prop: 'desc', label: '简介' }
]

// --- Software Config ---
const softwareColumns = [
  { prop: 'name', label: '软件名', width: 150 },
  { prop: 'category', label: '分类', width: 120 },
  { prop: 'desc', label: '描述' },
  { prop: 'link', label: '链接' }
]

// --- Quick Links Config ---
const linkColumns = [
  { prop: 'name', label: '网站名', width: 150 },
  { prop: 'category', label: '分类', width: 120 },
  { prop: 'url', label: 'URL' },
  { prop: 'desc', label: '描述' }
]
</script>

<style scoped>
.admin-panel {
  padding: 20px;
  background-color: white;
  min-height: 80vh;
}
</style>

