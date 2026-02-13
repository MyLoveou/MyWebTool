# 工具接入指南 (Integration Guide)

本项目采用模块化设计，允许开发者轻松扩展新工具。

## 步骤 1：创建工具组件
在 `src/tools/` 目录下创建一个新文件夹，文件夹名称即为 `componentName`。
例如创建 `color-picker` 工具：

1. 创建目录 `src/tools/color-picker/`
2. 创建入口文件 `src/tools/color-picker/index.vue`

```vue
<template>
  <div class="color-picker-tool">
    <h2>颜色拾取器</h2>
    <!-- 你的代码 -->
  </div>
</template>
```

## 步骤 2：注册工具
目前支持两种注册方式：

### 方式 A: 静态配置 (开发阶段推荐)
修改 `src/core/store/tool-registry.ts`，在 `tools` 数组中添加配置：

```typescript
{
  id: 'color-picker',
  title: '颜色拾取',
  path: '/tools/color-picker',
  componentName: 'color-picker', // 对应 src/tools/ 下的目录名
  description: '简单的颜色选择工具'
}
```

### 方式 B: 动态添加 (运行时演示)
1. 启动项目，访问 `/admin` (管理后台)。
2. 点击"添加新工具"。
3. 输入工具 ID、名称、路径和 `componentName` (必须与目录名一致)。
4. 点击确定，左侧菜单即会出现新工具。

*注意：运行时添加的数据仅保存在内存中，刷新页面会重置。生产环境需对接后端 API。*

## 核心原理
核心组件 `src/core/components/ToolContainer.vue` 使用 Vite 的 `import.meta.glob` 特性动态匹配并加载组件：

```typescript
const toolModules = import.meta.glob('@/tools/*/index.vue')
// ...
const loader = toolModules[`/src/tools/${tool.componentName}/index.vue`]
```
这意味着新添加的工具必须遵循目录规范才能被正确加载。
