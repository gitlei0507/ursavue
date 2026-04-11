<script setup>
import BaseUrsaNavBar from './BaseUrsaNavBar.vue'
import SourceCodeViewer from '../shared/SourceCodeViewer.vue'

const loadBaseUrsaNavBarSource = async () => (await import('./BaseUrsaNavBar.vue?raw')).default
</script>

# UrsaNavBar 导航组件

## 组件概述

`UrsaNavBar` 用于后台布局顶部导航区域，默认提供以下能力：

1. 菜单折叠/展开触发
2. 用户头像、用户名、角色展示
3. 注销事件透传（业务层自行处理）
4. 支持通过插槽覆盖默认布局

通常与 `UrsaMenu`、`UrsaTagsView`、布局容器（Layout）一起使用。

## 基础示例

<BaseUrsaNavBar />

<SourceCodeViewer :load-source="loadBaseUrsaNavBarSource" language="vue" />

## API 说明

### Props

| 参数               | 说明                 | 类型      | 默认值       |
| ------------------ | -------------------- | --------- | ------------ |
| `menuCollapsed`    | 当前侧栏是否折叠     | `Boolean` | `false`      |
| `showMenuToggle`   | 是否显示菜单折叠图标 | `Boolean` | `true`       |
| `user`             | 用户展示对象         | `Object`  | `{}`         |
| `roleText`         | 角色展示文案         | `String`  | `''`         |
| `usernameLabel`    | 用户字段标签         | `String`  | `'用户'`     |
| `roleLabel`        | 角色字段标签         | `String`  | `'角色'`     |
| `logoutText`       | 注销按钮文案         | `String`  | `'注销'`     |
| `expandMenuText`   | 展开菜单提示文案     | `String`  | `'展开菜单'` |
| `collapseMenuText` | 折叠菜单提示文案     | `String`  | `'折叠菜单'` |

### Events

| 事件名                 | 说明               | 回调参数 |
| ---------------------- | ------------------ | -------- |
| `toggle-menu-collapse` | 点击折叠图标时触发 | 无       |
| `logout-click`         | 点击注销按钮时触发 | 无       |

### Slots

| 插槽名    | 说明                                | 作用域参数 |
| --------- | ----------------------------------- | ---------- |
| `content` | 覆盖整个导航条默认内容（含左/右区） | 无         |
| `left`    | 覆盖左侧区域（默认是折叠按钮）      | 无         |
| `right`   | 覆盖右侧区域（默认是用户区）        | 无         |

## 使用示例

### 示例 1：布局中接入并监听折叠事件

```vue
<template>
  <UrsaNavBar
    :menu-collapsed="menuCollapsed"
    :user="userInfo"
    :role-text="showRole"
    @toggle-menu-collapse="menuCollapsed = !menuCollapsed"
    @logout-click="handleLogout"
  />
</template>
```

### 示例 2：通过插槽自定义右侧区域

```vue
<UrsaNavBar :user="userInfo" :role-text="showRole" @logout-click="handleLogout">
  <template #right>
    <div class="ml-auto flex items-center gap-2">
      <el-button>消息</el-button>
      <el-button type="danger" @click="onLogout">退出</el-button>
    </div>
  </template>
</UrsaNavBar>
```
