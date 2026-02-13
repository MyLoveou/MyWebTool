<template>
  <div class="link-detail-page">
    <el-button @click="$router.back()" class="back-btn" :icon="ArrowLeft">返回列表</el-button>
    
    <div v-if="selectedLink" class="link-detail">
      <div class="detail-header">
        <div class="icon-wrapper">
          <img :src="`https://www.google.com/s2/favicons?domain=${selectedLink.url}&sz=64`" :alt="selectedLink.name" />
        </div>
        <div class="detail-meta">
          <h2>{{ selectedLink.name }}</h2>
          <el-tag>{{ selectedLink.category }}</el-tag>
        </div>
      </div>
      
      <el-divider />
      
      <h3>简介</h3>
      <p class="desc">{{ selectedLink.desc }}</p>
      
      <h3>详细介绍</h3>
      <p class="long-desc">{{ selectedLink.detailedDesc || selectedLink.desc }}</p>
      
      <div class="detail-footer">
         <el-button type="primary" size="large" @click="openLink(selectedLink.url)">
           访问网站 <el-icon class="el-icon--right"><TopRight /></el-icon>
         </el-button>
      </div>
    </div>
    <el-empty v-else description="未找到网站信息" />
  </div>
</template>

<script setup lang="ts">
import { computed } from 'vue'
import { useRoute } from 'vue-router'
import { ArrowLeft, TopRight } from '@element-plus/icons-vue'
import { allLinks } from './data'

const route = useRoute()
const linkName = route.params.itemId as string

const selectedLink = computed(() => {
  return allLinks.find(l => l.name === linkName)
})

const openLink = (url: string) => {
  window.open(url, '_blank')
}
</script>

<style scoped>
.link-detail-page {
  padding: 20px;
  background: white;
  min-height: 100%;
}
.back-btn {
  margin-bottom: 20px;
}
.detail-header {
  display: flex;
  align-items: center;
  gap: 20px;
  margin-bottom: 20px;
}
.icon-wrapper img {
  width: 64px;
  height: 64px;
  border-radius: 8px;
}
.detail-meta h2 {
  margin: 0 0 10px 0;
}
.desc {
  color: #666;
  font-size: 16px;
  margin-bottom: 20px;
}
.long-desc {
  line-height: 1.6;
  text-indent: 2em;
  color: #333;
}
.detail-footer {
  margin-top: 40px;
  text-align: center;
}
</style>
