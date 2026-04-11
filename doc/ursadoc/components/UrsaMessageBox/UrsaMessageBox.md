<script setup>
import BaseUrsaMessageBox from './BaseUrsaMessageBox.vue'
import SourceCodeViewer from '../shared/SourceCodeViewer.vue'

const loadBaseUrsaMessageBoxSource = async () => (await import('./BaseUrsaMessageBox.vue?raw')).default
</script>

# UrsaMessageBox 确认框工具

## 组件概述

`UrsaMessageBox` 是基于 Element Plus `ElMessageBox.confirm` 的封装，统一了确认框默认实现，并扩展了“勾选后才能确认”的能力。

默认行为：

1. 打开确认框并返回 `Promise<boolean>`
2. 点击“确定”返回 `true`
3. 点击“取消 / 关闭”返回 `false`
4. 开启 `requireCheck` 后，需勾选才能点击确定

## 基础示例

<BaseUrsaMessageBox />

<SourceCodeViewer :load-source="loadBaseUrsaMessageBoxSource" language="vue" />

## API 说明

### Options

| 参数                | 说明             | 类型      | 默认值                     |
| ------------------- | ---------------- | --------- | -------------------------- |
| `message`           | 提示内容         | `String`  | `'你确定要执行该操作吗？'` |
| `title`             | 标题             | `String`  | `'提示'`                   |
| `confirmButtonText` | 确定按钮文字     | `String`  | `'确定'`                   |
| `cancelButtonText`  | 取消按钮文字     | `String`  | `'取消'`                   |
| `type`              | 类型             | `String`  | `'warning'`                |
| `requireCheck`      | 是否启用勾选确认 | `Boolean` | `false`                    |
| `checkLabel`        | 勾选项文字       | `String`  | `'我已阅读并确认'`         |
| `checked`           | 初始勾选状态     | `Boolean` | `false`                    |
| `customClass`       | 透传弹窗 class   | `String`  | `undefined`                |

### Return

| 返回值             | 说明                            | 类型               |
| ------------------ | ------------------------------- | ------------------ |
| `Promise<boolean>` | `true`=确认；`false`=取消或关闭 | `Promise<Boolean>` |

## 使用示例

### 示例 1：普通确认

```ts
async function remove() {
  const confirm = await UrsaMessageBox({
    message: "确认删除该记录吗？",
    title: "警告",
    type: "warning",
  });

  if (confirm) {
    removeRecord();
  }
}
```

### 示例 2：必须勾选后确认

```ts
const confirm = await UrsaMessageBox({
  message: "你确定要注销吗？",
  requireCheck: true,
  checkLabel: "我已阅读并确认",
});

if (confirm) {
  // 后续代码
}
```
