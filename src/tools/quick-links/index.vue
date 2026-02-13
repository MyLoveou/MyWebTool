<template>
  <div class="quick-links">
    <h2>常用网站导航</h2>
    <div class="category" v-for="cat in linkCategories" :key="cat.title">
      <h3>{{ cat.title }}</h3>
      <div class="links-grid">
        <div 
          v-for="link in cat.links" 
          :key="link.name" 
          class="link-card"
          @click="goToDetail(link)"
        >
           <div class="link-icon">
             <img :src="`https://www.google.com/s2/favicons?domain=${link.url}&sz=32`" alt="icon" />
           </div>
           <div class="link-info">
             <div class="link-name">{{ link.name }}</div>
             <div class="link-desc">{{ link.desc }}</div>
           </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { useRouter } from 'vue-router'
import { linkCategories, type BaseLinkItem } from './data'

const router = useRouter()

const goToDetail = (link: BaseLinkItem) => {
  router.push(`/tools/quick-links/detail/${link.name}`)
}
</script>

<style scoped>
.category {
  margin-bottom: 30px;
}
.links-grid {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(240px, 1fr));
  gap: 15px;
}
.link-card {
  display: flex;
  align-items: center;
  padding: 15px;
  background: white;
  border: 1px solid #e4e7ed;
  border-radius: 6px;
  cursor: pointer;
  transition: all 0.3s;
  color: #303133;
}
.link-card:hover {
  transform: translateY(-2px);
  box-shadow: 0 4px 12px rgba(0,0,0,0.1);
  border-color: #409EFF;
}
.link-icon {
  width: 32px;
  height: 32px;
  margin-right: 12px;
  display: flex;
  align-items: center;
  justify-content: center;
}
.link-icon img {
  width: 100%;
  height: 100%;
  object-fit: contain;
}
.link-info {
  flex: 1;
  overflow: hidden;
}
.link-name {
  font-weight: bold;
  font-size: 14px;
  margin-bottom: 4px;
}
.link-desc {
  font-size: 12px;
  color: #909399;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
}
</style>
