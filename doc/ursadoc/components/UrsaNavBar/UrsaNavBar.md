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
5. 支持通过 `left` / `right` 插槽局部扩展，保留默认布局骨架

通常与 `UrsaMenu`、`UrsaTagsView`、布局容器（Layout）一起使用。

## 基础示例

<BaseUrsaNavBar />

<SourceCodeViewer :load-source="loadBaseUrsaNavBarSource" language="vue" />

## API 说明

### Props

| 参数                       | 说明                         | 类型       | 默认值      |
| -------------------------- | ---------------------------- | ---------- | ----------- |
| `menuCollapsed`            | 当前侧栏是否折叠             | `Boolean`  | `false`     |
| `userInfo`                 | 用户信息对象                 | `Object`   | `{ username: '', avatar: '', role: 0 }` |
| `onLogout`                 | 外部注销处理方法             | `Function` | `undefined` |
| `roleTextResolver`         | 角色文案解析函数             | `Function` | `undefined` |
| `userStore`                | 用户状态对象（见“依赖说明”） | `Object`   | `undefined` |
| `useAuth`                  | 认证方法工厂（见“依赖说明”） | `Function` | `undefined` |
| `haveMenuCollapsedAbility` | 是否显示菜单折叠图标         | `Boolean`  | `true`      |

### Events

| 事件名                 | 说明               | 回调参数 |
| ---------------------- | ------------------ | -------- |
| `toggle-menu-collapse` | 点击折叠图标时触发 | 无       |
| `logout`               | 点击注销后触发     | 无       |

### Slots

| 插槽名    | 说明                                | 作用域参数 |
| --------- | ----------------------------------- | ---------- |
| `content` | 覆盖整个导航条默认内容（含左/右区） | 无         |
| `left`    | 覆盖左侧区域（默认是折叠按钮）      | 无         |
| `right`   | 覆盖右侧区域（默认是用户与注销区）  | `userInfo`、`showRole`、`logout` |

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

### 示例 1：推荐用法（纯展示 + 外部处理注销）

```vue
<template>
  <UrsaNavBar
    :menu-collapsed="menuCollapsed"
    :user-info="userInfo"
    :on-logout="handleLogout"
    @toggle-menu-collapse="menuCollapsed = !menuCollapsed"
  />
</template>
```

### 示例 2：通过 `right` 插槽自定义右侧区域

```vue
<UrsaNavBar :user-info="userInfo" :on-logout="handleLogout">
  <template #right="{ logout }">
    <div class="ml-auto flex items-center gap-2">
      <el-button>消息</el-button>
      <el-button type="danger" @click="logout">退出</el-button>
    </div>
  </template>
</UrsaNavBar>
```

## 依赖说明（兼容模式）

`userStore` + `useAuth` 仍可使用，主要用于兼容旧项目。新项目优先使用 `userInfo` + `onLogout`，这样可降低组件与具体状态管理/鉴权实现的耦合。
