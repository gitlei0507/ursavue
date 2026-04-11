# vue-admin

基于 Vue 3 + Vite + Element Plus 的管理后台项目。

## 核心技术栈说明

- `Vue 3`：前端核心框架，负责页面与组件化开发
- `Vite`：构建与开发工具，提供快速的本地开发与打包能力
- `Vue Router`：Vue 官方路由库，负责应用的页面导航与路由管理，支持动态路由和路由懒加载
- `Element Plus`：Vue 3 生态下的 UI 组件库，用于后台界面搭建
- `Tailwind CSS`：原子化 CSS 工具库，用于快速构建可复用、可维护的页面样式
- `Axios`：HTTP 请求库，用于封装接口调用、统一处理请求与响应
- `Pinia`：Vue 官方推荐状态管理库，用于管理全局共享状态
- `VueUse`：基于 Composition API 的工具函数集合，用于复用常见响应式逻辑
- `ursacomponents`：本地业务组件库依赖，提供通用业务组件与菜单/路由工具能力

## 非核心技术栈说明

- `pinia-plugin-persistedstate`：Pinia 状态持久化插件，实现状态的自动存储与恢复机制
- `@element-plus/icons-vue`：Element Plus 官方图标库，提供丰富的 SVG 图标组件
- `@vitejs/plugin-vue`：Vite 官方 Vue 3 支持插件，提供 .vue 单文件组件编译能力
- `unplugin-auto-import`：自动导入插件，自动注册全局函数与类型定义，减少重复导入代码
- `unplugin-vue-components`：Vue 组件自动注册插件，实现按需导入和全局注册组件
- `postcss`：CSS 后处理器，用于处理样式在编译过程中的转换与优化
- `autoprefixer`：PostCSS 插件，自动为 CSS 属性添加浏览器厂商前缀，提升浏览器兼容性
- `vite-plugin-vue-devtools`：Vite 开发增强插件，用于在开发阶段集成 Vue DevTools 能力

## 项目启动

```sh
npm install
npm run dev
```

## 组件库骨架启动

```sh
cd ursacomponents
npm install
npm run dev
```

## 组件库构建

```sh
cd ursacomponents
npm run build
```
