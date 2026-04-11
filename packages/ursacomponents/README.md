# ursacomponents

Ursa 通用 Vue 3 组件库。

## 安装

```bash
npm i ursacomponents
```

## 使用

```js
import { createApp } from "vue";
import App from "./App.vue";
import UrsaComponents from "ursacomponents";
import "ursacomponents/style.css";

const app = createApp(App);
app.use(UrsaComponents);
app.mount("#app");
```

按需引入：

```js
import { UrsaSearch, UrsaTable, useUrsaSearch } from "ursacomponents";
```

## 文档开发

```bash
# 本地启动文档
pnpm docs:dev

# 构建文档
pnpm docs:build

# 预览构建产物
pnpm docs:preview
```
