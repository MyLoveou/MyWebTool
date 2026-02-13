<template>
  <div class="app-detail-page">
    <el-button @click="$router.back()" class="back-btn" icon="ArrowLeft">返回列表</el-button>
    
    <div v-if="selectedApp" class="app-detail">
      <div class="detail-header">
         <div class="detail-meta">
           <h2>{{ selectedApp.name }}</h2>
           <el-tag>{{ selectedApp.category }}</el-tag>
           <div class="detail-tags">
             <el-tag v-for="tag in selectedApp.tags" :key="tag" type="info" size="small" class="mini-tag">{{ tag }}</el-tag>
           </div>
         </div>
      </div>
      <el-divider />
      <h3>简介</h3>
      <p class="long-desc">{{ selectedApp.desc }}</p>
      
      <div v-if="selectedApp.details">
        <el-divider />
        <h3>详细介绍</h3>
        <MdPreview :modelValue="selectedApp.details" />
      </div>

      <div class="detail-footer">
         <el-button type="primary" size="large" @click="openLink(selectedApp.link)">
           前往官网下载 <el-icon class="el-icon--right"><TopRight /></el-icon>
         </el-button>
      </div>
    </div>
    <el-empty v-else description="未找到软件信息" />
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted } from 'vue'
import { useRoute } from 'vue-router'
import { TopRight } from '@element-plus/icons-vue'
import { type App } from './data'
import { getSoftwareByName } from '@/core/api'

const route = useRoute()
const appName = route.params.itemId as string
const selectedApp = ref<App | null>(null)

onMounted(async () => {
  try {
    const response = await getSoftwareByName(appName)
    selectedApp.value = response.data
  } catch (error) {
    console.error('Failed to fetch software detail:', error)
  }
})

const openLink = (url: string) => {
  window.open(url, '_blank')
}
</script>

<style scoped>
.app-detail-page {
  padding: 20px;
  background: white;
  min-height: 100%;
}
.back-btn {
  margin-bottom: 20px;
}
.app-detail h2 {
  margin-top: 0;
}
.detail-tags {
  margin-top: 10px;
}
.long-desc {
  line-height: 1.6;
  color: #333;
}
.rich-text :deep(p) {
  margin-bottom: 1em;
  text-indent: 2em;
}
.rich-text :deep(h1), .rich-text :deep(h2), .rich-text :deep(h3) {
  margin-top: 1em;
  margin-bottom: 0.5em;
  font-weight: bold;
}
.rich-text :deep(ul), .rich-text :deep(ol) {
  padding-left: 2em;
  margin-bottom: 1em;
}
.detail-footer {
  margin-top: 30px;
  text-align: center;
}
.mini-tag {
  margin-right: 5px;
}
</style>
