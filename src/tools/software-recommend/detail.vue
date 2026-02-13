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
      <p class="long-desc">
        这里可以展示更详细的软件功能特性、版本更新日志、使用教程等。由于目前是演示数据，暂时复用简介字段。
      </p>
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
import { computed } from 'vue'
import { useRoute } from 'vue-router'
import { TopRight } from '@element-plus/icons-vue'
import { allApps } from './data'

const route = useRoute()
const appName = route.params.itemId as string

const selectedApp = computed(() => {
  return allApps.find(a => a.name === appName)
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
  text-indent: 2em;
  color: #333;
}
.detail-footer {
  margin-top: 30px;
  text-align: center;
}
.mini-tag {
  margin-right: 5px;
}
</style>
