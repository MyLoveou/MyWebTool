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
      <p class="long-desc">
        这里可以展示更详细的书籍介绍内容、出版信息、获奖记录等。由于目前是演示数据，暂时复用简介字段。
      </p>
    </div>
    <el-empty v-else description="未找到小说信息" />
  </div>
</template>

<script setup lang="ts">
import { computed } from 'vue'
import { useRoute } from 'vue-router'
import { novels } from './data'

const route = useRoute()
const novelName = route.params.itemId as string

const selectedNovel = computed(() => {
  return novels.find(n => n.name === novelName)
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
  text-indent: 2em;
  color: #333;
}
.mini-tag {
  margin-right: 5px;
}
</style>
