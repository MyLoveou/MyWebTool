<template>
  <div class="novel-detail-page">
    <el-button @click="$router.back()" class="back-btn" icon="ArrowLeft">返回列表</el-button>
    
    <div v-if="selectedNovel" class="novel-detail">
      <div class="detail-header">
         <div class="detail-meta">
           <h2>{{ selectedNovel.name }}</h2>
           <p><strong>作者:</strong> {{ selectedNovel.author }}</p>
           <el-tag>{{ selectedNovel.category }}</el-tag>
           <div class="detail-tags">
             <el-tag v-for="tag in selectedNovel.tags" :key="tag" type="info" size="small" class="mini-tag">{{ tag }}</el-tag>
           </div>
         </div>
      </div>
      <el-divider />
      <h3>简介</h3>
      <p class="long-desc">{{ selectedNovel.desc }}</p>
      
      <div v-if="selectedNovel.details">
        <el-divider />
        <h3>详细介绍</h3>
        <MdPreview :modelValue="selectedNovel.details" />
      </div>
    </div>
    <el-empty v-else description="未找到小说信息" />
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted } from 'vue'
import { useRoute } from 'vue-router'
import { type Novel } from './data'
import { getNovelByName } from '@/core/api'

const route = useRoute()
const novelName = route.params.itemId as string
const selectedNovel = ref<Novel | null>(null)

onMounted(async () => {
  try {
    const response = await getNovelByName(novelName)
    selectedNovel.value = response.data
  } catch (error) {
    console.error('Failed to fetch novel detail:', error)
  }
})
</script>

<style scoped>
.novel-detail-page {
  padding: 20px;
  background: white;
  min-height: 100%;
}
.back-btn {
  margin-bottom: 20px;
}
.novel-detail h2 {
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
.mini-tag {
  margin-right: 5px;
}
</style>
