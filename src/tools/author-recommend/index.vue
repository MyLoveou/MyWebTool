<template>
  <RecommendationLayout
    title="小说作者推荐"
    :items="authors"
    search-placeholder="搜索作者或作品..."
    category-key="category"
    tags-key="tags"
    title-key="name"
    item-key="name"
    :search-matcher="customSearch"
  >
    <template #card="{ item: author }">
      <el-card shadow="hover" class="author-card">
        <div class="author-header">
          <el-avatar :size="60" :src="author.avatarUrl" :alt="author.name">
            {{ author.name.charAt(0) }}
          </el-avatar>
          <div class="author-info">
            <h3>{{ author.name }}</h3>
            <el-tag size="small">{{ author.category }}</el-tag>
          </div>
        </div>
        <div class="author-tags">
           <el-tag 
             v-for="tag in author.tags" 
             :key="tag" 
             size="small" 
             type="info" 
             effect="plain"
             class="mini-tag"
           >
             {{ tag }}
           </el-tag>
        </div>
        <div class="author-desc">
          {{ author.desc }}
        </div>
        <div class="author-works">
          <strong>代表作:</strong>
          <span v-for="(work, index) in author.works" :key="work.title">
            <a :href="work.url" target="_blank" class="work-link">{{ work.title }}</a>
            <span v-if="Number(index) < author.works.length - 1">, </span>
          </span>
        </div>
        <div class="card-footer">
          <el-button type="primary" link @click="goToDetail(author)">查看详情介绍 >></el-button>
        </div>
      </el-card>
    </template>
  </RecommendationLayout>
</template>

<script setup lang="ts">
import { useRouter } from 'vue-router'
import RecommendationLayout from '@/core/components/RecommendationLayout.vue'
import { authors, type Author } from './data'

const router = useRouter()

const goToDetail = (author: Author) => {
  // Use 'author-recommend' as the tool ID, and author.name as the item ID
  router.push(`/tools/author-recommend/detail/${author.name}`)
}

const customSearch = (author: Author, query: string) => {
  const matchName = author.name.toLowerCase().includes(query)
  const matchDesc = author.desc.toLowerCase().includes(query)
  const matchWork = author.works.some(w => w.title.toLowerCase().includes(query))
  return matchName || matchDesc || matchWork
}
</script>

<style scoped>
.author-card {
  margin-bottom: 20px;
  height: 100%;
  display: flex;
  flex-direction: column;
}
.author-header {
  display: flex;
  align-items: center;
  margin-bottom: 15px;
}
.author-info {
  margin-left: 15px;
}
.author-info h3 {
  margin: 0 0 5px 0;
}
.author-desc {
  font-size: 14px;
  color: #666;
  margin-bottom: 10px;
  min-height: 40px;
  line-height: 1.4;
  overflow: hidden;
  text-overflow: ellipsis;
  display: -webkit-box;
  -webkit-line-clamp: 2;
  -webkit-box-orient: vertical;
}
.author-works {
  font-size: 13px;
  color: #333;
  margin-bottom: 10px;
  flex-grow: 1;
}
.card-footer {
  text-align: right;
  border-top: 1px solid #f0f0f0;
  padding-top: 10px;
}
.mini-tag {
  margin-right: 5px;
  margin-bottom: 5px;
}
.author-tags {
  margin-bottom: 10px;
}
.work-link {
  color: #409EFF;
  text-decoration: none;
}
.work-link:hover {
  text-decoration: underline;
}
</style>
