<template>
  <RecommendationLayout
    title="小说推荐"
    :items="novels"
    search-placeholder="搜索小说、作者或简介..."
    category-key="category"
    tags-key="tags"
    title-key="name"
    item-key="name"
    :search-matcher="customSearch"
  >
    <template #card="{ item: novel }">
      <el-card shadow="hover" class="novel-card">
        <template #header>
          <div class="card-header">
            <h3>{{ novel.name }}</h3>
            <el-tag size="small">{{ novel.category }}</el-tag>
          </div>
        </template>
        <p class="author"><strong>作者:</strong> {{ novel.author }}</p>
        <div class="novel-tags">
           <el-tag 
             v-for="tag in novel.tags" 
             :key="tag" 
             size="small" 
             type="info" 
             effect="plain"
             class="mini-tag"
           >
             {{ tag }}
           </el-tag>
        </div>
        <p class="desc">{{ novel.desc }}</p>
        <div class="card-footer">
          <el-button type="primary" link @click="goToDetail(novel)">查看详情介绍 >></el-button>
        </div>
      </el-card>
    </template>
  </RecommendationLayout>
</template>

<script setup lang="ts">
import { ref, onMounted } from 'vue'
import { useRouter } from 'vue-router'
import RecommendationLayout from '@/core/components/RecommendationLayout.vue'
import { type Novel } from './data'
import { getNovels } from '@/core/api'

const router = useRouter()
const novels = ref<Novel[]>([])

onMounted(async () => {
  try {
    const response = await getNovels()
    novels.value = response.data
  } catch (error) {
    console.error('Failed to fetch novels:', error)
  }
})

const goToDetail = (novel: Novel) => {
  router.push(`/tools/novel-recommend/detail/${novel.name}`)
}

const customSearch = (novel: Novel, query: string) => {
  const matchName = novel.name.toLowerCase().includes(query)
  const matchAuthor = novel.author.toLowerCase().includes(query)
  const matchDesc = novel.desc.toLowerCase().includes(query)
  return matchName || matchAuthor || matchDesc
}
</script>

<style scoped>
.novel-card {
  height: 100%;
  display: flex;
  flex-direction: column;
}
.card-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
}
.card-header h3 {
  margin: 0;
  font-size: 16px;
}
.author {
  color: #333;
  margin-bottom: 10px;
}
.desc {
  color: #666;
  font-size: 14px;
  height: 60px;
  overflow: hidden;
  text-overflow: ellipsis;
  display: -webkit-box;
  -webkit-line-clamp: 3;
  -webkit-box-orient: vertical;
  line-height: 1.5;
}
.card-footer {
  text-align: right;
  border-top: 1px solid #f0f0f0;
  padding-top: 10px;
  margin-top: auto;
}
.mini-tag {
  margin-right: 5px;
  margin-bottom: 5px;
}
.novel-tags {
  margin-bottom: 10px;
}
</style>
