<template>
  <RecommendationLayout
    title="软件推荐"
    :items="allApps"
    search-placeholder="搜索软件或描述..."
    category-key="category"
    tags-key="tags"
    title-key="name"
    item-key="name"
    :search-matcher="customSearch"
  >
    <template #card="{ item: app }">
      <el-card shadow="hover">
        <template #header>
          <div class="card-header">
            <span>{{ app.name }}</span>
            <div class="tags">
              <el-tag size="small" type="success" style="margin-right: 5px">{{ app.category }}</el-tag>
              <el-tag 
                v-for="tag in app.tags" 
                :key="tag" 
                size="small"
                style="margin-right: 5px"
              >{{ tag }}</el-tag>
            </div>
          </div>
        </template>
        <div class="card-content">
          <p>{{ app.desc }}</p>
          <div class="card-footer">
              <el-button type="primary" link @click="goToDetail(app)">查看详情介绍 >></el-button>
          </div>
        </div>
      </el-card>
    </template>
  </RecommendationLayout>
</template>

<script setup lang="ts">
import { ref, onMounted } from 'vue'
import { useRouter } from 'vue-router'
import RecommendationLayout from '@/core/components/RecommendationLayout.vue'
import { type App } from './data'
import { getSoftware } from '@/core/api'

const router = useRouter()
const allApps = ref<App[]>([])

onMounted(async () => {
  try {
    const response = await getSoftware()
    allApps.value = response.data
  } catch (error) {
    console.error('Failed to fetch software:', error)
  }
})

const goToDetail = (app: App) => {
  router.push(`/tools/software-recommend/detail/${app.name}`)
}

const customSearch = (app: App, query: string) => {
  const matchName = app.name.toLowerCase().includes(query)
  const matchDesc = app.desc.toLowerCase().includes(query)
  const matchTag = app.tags.some(t => t.toLowerCase().includes(query))
  return matchName || matchDesc || matchTag
}
</script>

<style scoped>
.card-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
}
.card-content p {
  color: #666;
  font-size: 14px;
  height: 40px; 
  overflow: hidden;
  text-overflow: ellipsis;
  display: -webkit-box;
  -webkit-line-clamp: 2;
  -webkit-box-orient: vertical;
}
.card-footer {
  margin-top: 10px;
  text-align: right;
  border-top: 1px solid #f0f0f0;
  padding-top: 10px;
}
.mini-tag {
  margin-right: 5px;
}
</style>
