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
3. 注销确认与退出逻辑
4. 通过 `content` 插槽整体替换导航内容

通常与 `UrsaMenu`、`UrsaTagsView`、布局容器（Layout）一起使用。

## 基础示例

<BaseUrsaNavBar />

<SourceCodeViewer :load-source="loadBaseUrsaNavBarSource" language="vue" />

## API 说明

### Props

| 参数                       | 说明                         | 类型       | 默认值      |
| -------------------------- | ---------------------------- | ---------- | ----------- |
| `menuCollapsed`            | 当前侧栏是否折叠             | `Boolean`  | `false`     |
| `userStore`                | 用户状态对象（见“依赖说明”） | `Object`   | `undefined` |
| `useAuth`                  | 认证方法工厂（见“依赖说明”） | `Function` | `undefined` |
| `haveMenuCollapsedAbility` | 是否显示菜单折叠图标         | `Boolean`  | `true`      |

### Events

| 事件名                 | 说明               | 回调参数 |
| ---------------------- | ------------------ | -------- |
| `toggle-menu-collapse` | 点击折叠图标时触发 | 无       |

### Slots

| 插槽名    | 说明                                | 作用域参数 |
| --------- | ----------------------------------- | ---------- |
| `content` | 覆盖整个导航条默认内容（含左/右区） | 无         |

### Composable

`UrsaNavBar` 相关逻辑可通过 `useUrsaNavBar` 复用：

```ts
import { useUrsaNavBar } from "ursacomponents";

const { userInfo, showRole, logout } = useUrsaNavBar(userStore, useAuth);
```

| 返回值     | 说明                               | 类型                  |
| ---------- | ---------------------------------- | --------------------- |
| `userInfo` | 用户信息响应式对象                 | `ComputedRef<Object>` |
| `showRole` | 角色展示文案（如“系统管理员”）     | `ComputedRef<String>` |
| `logout`   | 退出登录方法（弹窗确认后执行清理） | `Function`            |

## 使用示例

### 示例 1：布局中接入并监听折叠事件

```vue
<template>
  <UrsaNavBar
    :menu-collapsed="menuCollapsed"
    :user-store="userStore"
    :use-auth="useAuth"
    @toggle-menu-collapse="menuCollapsed = !menuCollapsed"
  />
</template>
```

### 示例 2：通过插槽自定义右侧区域

```vue
<UrsaNavBar :user-store="userStore" :use-auth="useAuth">
  <template #content>
    <div class="ml-auto flex items-center gap-2">
      <el-button>消息</el-button>
      <el-button type="danger" @click="onLogout">退出</el-button>
    </div>
  </template>
</UrsaNavBar>
```
