<script setup>
import BaseUrsaTagsView from './BaseUrsaTagsView.vue'
import SourceCodeViewer from '../shared/SourceCodeViewer.vue'

const loadBaseUrsaTagsViewSource = async () => (await import('./BaseUrsaTagsView.vue?raw')).default
</script>

# UrsaTagsView 标签组件

## 组件概述

`UrsaTagsView` 基于 Element Plus `el-tabs` 封装，用于展示和管理“已访问页面标签”。

默认行为：

1. 自动创建并固定首页标签
2. 路由变化时自动追加新标签（同路径不重复）
3. 点击标签可切换路由
4. 关闭当前标签时，按“右侧优先 -> 左侧 -> 首页”选择下一个激活页面
5. 无路由注入场景下自动降级为静态标签展示

## 基础示例

<BaseUrsaTagsView />

<SourceCodeViewer :load-source="loadBaseUrsaTagsViewSource" language="vue" />

说明：示例中通过 `provide(routeLocationKey / routerKey)` 模拟路由环境；真实项目接入 Vue Router 后可直接使用。

## API 说明

### Props

| 参数        | 说明           | 类型     | 默认值         |
| ----------- | -------------- | -------- | -------------- |
| `homePath`  | 首页标签路由   | `String` | `'/dashboard'` |
| `homeTitle` | 首页标签显示名 | `String` | `'首页'`       |

### Expose

| 方法名            | 说明                           | 参数 | 返回值 |
| ----------------- | ------------------------------ | ---- | ------ |
| `closeCurrentTab` | 关闭当前激活标签（首页不关闭） | 无   | 无     |

### Events

无自定义事件，标签切换与关闭行为通过内部路由逻辑处理。

### Slots

无具名插槽。

## 使用示例

### 示例 1：在布局中接入

```vue
<template>
  <UrsaTagsView home-path="/dashboard" home-title="首页" />
</template>
```

### 示例 2：关闭当前标签

```vue
<script setup>
const closeCurrentTag = inject("closeCurrentTag");

const close = () => {
  closeCurrentTag();
};
</script>

<template>
  <el-button @click="close">关闭当前标签</el-button>
</template>
```

## 业务接入建议

1. `homePath` 建议与系统首页路由保持一致，避免首页标签标题与跳转不一致。
2. 该组件依赖路由上下文，建议放在布局层（如顶部导航下方）统一管理。
3. 关闭当前页时如有“未保存变更”提示，建议在业务层先拦截，再调用 `closeCurrentTab`。
