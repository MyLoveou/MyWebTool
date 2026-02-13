<template>
  <div class="author-detail-page">
    <el-button @click="$router.back()" class="back-btn" icon="ArrowLeft">返回列表</el-button>
    
    <div v-if="selectedAuthor" class="author-detail">
      <div class="detail-header">
        <el-image 
          :src="selectedAuthor.avatarUrl" 
          class="detail-avatar"
          fit="cover"
        >
          <template #error>
            <div class="image-slot">
              <el-icon><Picture /></el-icon>
            </div>
          </template>
        </el-image>
        <div class="detail-meta">
          <h2>{{ selectedAuthor.name }}</h2>
          <el-tag>{{ selectedAuthor.category }}</el-tag>
          <p class="life-span" v-if="selectedAuthor.lifeSpan">生卒年: {{ selectedAuthor.lifeSpan }}</p>
          <div class="tags">
             <el-tag 
               v-for="tag in selectedAuthor.tags" 
               :key="tag" 
               size="small" 
               type="info" 
               effect="plain"
               class="mini-tag"
             >
               {{ tag }}
             </el-tag>
          </div>
        </div>
      </div>
      <el-divider content-position="left">简介</el-divider>
      <div class="long-desc rich-text">{{ selectedAuthor.desc }}</div>
      <el-divider content-position="left">生平简介</el-divider>
      <div class="long-desc rich-text">
        <MdPreview :modelValue="selectedAuthor.details" />
      </div>

      <el-divider content-position="left">主要作品</el-divider>
      <ul class="works-list">
        <li v-for="work in selectedAuthor.works" :key="work.title">
           <a :href="work.url" target="_blank" class="work-link">{{ work.title }}</a>
        </li>
      </ul>

      <el-divider content-position="left">成就与荣誉</el-divider>
      <p class="honors">{{ selectedAuthor.honors }}</p>
    </div>
    <el-empty v-else description="未找到作者信息" />
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted } from 'vue'
import { useRoute } from 'vue-router'
import { Picture } from '@element-plus/icons-vue'
import { type Author } from './data'
import { getAuthorByName } from '@/core/api'

const route = useRoute()
const authorName = route.params.itemId as string
const selectedAuthor = ref<Author | null>(null)

onMounted(async () => {
  try {
    const response = await getAuthorByName(authorName)
    const item = response.data
    selectedAuthor.value = {
      ...item,
      avatarUrl: item.avatar_url,
      lifeSpan: item.life_span
    }
  } catch (error) {
    console.error('Failed to fetch author detail:', error)
  }
})
</script>

<style scoped>
.author-detail-page {
  padding: 20px;
  background: white;
  min-height: 100%;
}
.back-btn {
  margin-bottom: 20px;
}
.detail-header {
  display: flex;
  gap: 20px;
  margin-bottom: 20px;
}
.detail-avatar {
  width: 150px;
  height: 200px;
  border-radius: 8px;
  box-shadow: 0 4px 12px rgba(0,0,0,0.1);
}
.detail-meta h2 {
  margin-top: 0;
}
.life-span {
  color: #666;
  font-style: italic;
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
.works-list {
  padding-left: 20px;
}
.honors {
  color: #d48806;
  background: #fffbe6;
  padding: 10px;
  border-radius: 4px;
  border: 1px solid #ffe58f;
}
.image-slot {
  display: flex;
  justify-content: center;
  align-items: center;
  width: 100%;
  height: 100%;
  background: #f5f7fa;
  color: #909399;
  font-size: 30px;
}
.work-link {
  color: #409EFF;
  text-decoration: none;
}
.work-link:hover {
  text-decoration: underline;
}
.mini-tag {
  margin-right: 5px;
}
</style>
