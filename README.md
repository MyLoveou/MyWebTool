# 多功能工具网站 (Utility Tools Platform)

基于 Vue 3 + TypeScript + Vite + Element Plus 构建的模块化工具平台。

## 特性
- **模块化架构**：工具以独立模块形式存在，易于扩展。
- **动态加载**：核心框架动态加载工具组件。
- **响应式设计**：适配移动端和桌面端。
- **管理后台**：支持动态配置工具菜单。

## 快速开始

### 安装依赖
```bash
npm install
```

### 启动开发服务器
```bash
npm run dev
```

### 构建生产环境
```bash
npm run build
```

## 目录结构
- `src/core`: 核心框架代码 (Layout, Router, Store)
- `src/tools`: 工具模块目录，每个工具一个子目录
- `src/views`: 核心页面 (Dashboard, Admin)
