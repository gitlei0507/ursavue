# UrsaTable 组件说明（结合 `ursacomponents` 工程）

本文基于以下源码分析：

- `../ursacomponents/src/components/UrsaTable/UrsaTable.vue`
- `../ursacomponents/src/components/UrsaTable/useUrsaTable.js`
- `src/views/user/list.vue`

## 1. 组件定位

`UrsaTable` 是对 Element Plus 表格的业务封装，默认内置：

- 卡片布局（含 `toolbar` 区）
- 分页区域
- 索引列、选择列
- 动态列配置 `columnFields`
- 操作列 `actionColumn`
- 行内格式化、标签渲染、列插槽

通常和 `useUrsaTable` 搭配使用，统一处理分页、排序、请求与加载态。

## 2. 基础用法

```vue
<template>
  <UrsaTable
    :data="tableData"
    :columnFields="columnFields"
    :loading="loading"
    :current-page="currentPage"
    :page-size="pageSize"
    :total="total"
    @current-change="handleCurrentChange"
    @size-change="handleSizeChange"
    @sort-change="handleSortChange"
  />
</template>

<script setup>
import { reactive } from 'vue'
import { UrsaTable, useUrsaTable } from 'ursacomponents'
import { list } from '@/api/user'

const searchForm = reactive({ username: '' })

const columnFields = [
  { prop: 'username', label: '用户名', minWidth: 180 },
  { prop: 'email', label: '邮箱', minWidth: 220 }
]

const {
  tableData,
  loading,
  currentPage,
  pageSize,
  total,
  handleCurrentChange,
  handleSizeChange,
  handleSortChange
} = useUrsaTable(list, searchForm, { prop: 'username', order: 'ascending' })
</script>
```

## 3. `UrsaTable` 参数（Props）

| 参数 | 类型 | 默认值 | 说明 |
| --- | --- | --- | --- |
| `data` | `Array` | `[]` | 表格数据源 |
| `columnFields` | `Array` | `[]` | 列配置数组；为空时使用默认插槽列 |
| `loading` | `Boolean` | `false` | 加载状态 |
| `currentPage` | `Number` | `1` | 当前页 |
| `pageSize` | `Number` | `10` | 每页条数 |
| `total` | `Number` | `0` | 总条数 |
| `pageSizes` | `Array` | `[5,10,20,50]` | 分页可选条数 |
| `defaultSort` | `Object` | `{}` | 默认排序，如 `{ prop:'username', order:'ascending' }` |
| `showIndex` | `Boolean` | `true` | 是否显示索引列 |
| `indexLabel` | `String` | `序号` | 索引列标题 |
| `indexWidth` | `Number` | `70` | 索引列宽度 |
| `showSelection` | `Boolean` | `false` | 是否显示多选列 |
| `selectionWidth` | `Number` | `55` | 多选列宽度 |
| `showActionColumn` | `Boolean` | `false` | 是否显示操作列 |
| `actionColumn` | `Object` | `{}` | 操作列配置 |

## 4. `columnFields` 列配置

每个列对象支持如下字段：

| 字段 | 类型 | 默认值 | 说明 |
| --- | --- | --- | --- |
| `prop` | `String` | - | 字段名（取值 `row[prop]`） |
| `label` | `String` | - | 列标题 |
| `width` | `Number/String` | - | 列宽 |
| `minWidth` | `Number/String` | - | 最小列宽 |
| `align` | `String` | `'center'` | 对齐方式 |
| `sortable` | `Boolean/String` | `'custom'` | 排序配置，默认走后端排序 |
| `fixed` | `String/Boolean` | - | 固定列 |
| `showOverflowTooltip` | `Boolean` | `false` | 溢出提示 |
| `formatter` | `Function` | - | 单元格格式化：`({ value, row, index, column }) => any` |
| `slot` | `String` | `col-${prop}` | 指定列插槽名 |
| `tagMap` | `Object/Function` | - | 标签映射 |
| `tagDefault` | `Object/String/Function` | - | `tagMap` 未命中时回退值 |

### `tagMap` 说明

- 对象模式：`tagMap[value] => tagConfig`
- 函数模式：`tagMap({ value, row, index, column }) => tagConfig`
- `tagConfig` 支持：`label/type/effect/size/round/hit`

## 5. 操作列配置 `actionColumn`

### `actionColumn` 字段

| 字段 | 类型 | 默认值 | 说明 |
| --- | --- | --- | --- |
| `label` | `String` | `操作` | 操作列标题 |
| `width` | `Number` | `240` | 操作列宽 |
| `align` | `String` | `center` | 对齐 |
| `fixed` | `String` | `right` | 固定位置 |
| `buttons` | `Array` | 内置查看/编辑/删除 | 操作按钮配置 |

### `buttons` 每项字段

| 字段 | 类型 | 说明 |
| --- | --- | --- |
| `key` | `String` | 动作标识 |
| `event` | `String` | 触发事件名（如 `edit`） |
| `label` | `String` | 按钮文本 |
| `type` | `String` | 按钮类型 |
| `size` | `String` | 按钮尺寸 |
| `link` | `Boolean` | 是否 link 按钮 |
| `icon` | `Component` | 图标 |
| `visible` | `Boolean/Function` | 是否展示；函数签名 `({ row, index }) => boolean` |
| `onClick` | `Function` | 自定义点击逻辑；有该字段时不再自动 emit |

## 6. 插槽（Slots）

| 插槽名 | 说明 |
| --- | --- |
| `toolbar` | 表格顶部工具栏 |
| 默认插槽 | 当 `columnFields` 为空时，可手写 `<el-table-column>` |
| `col-字段名` 或自定义 `slot` | 自定义某列渲染 |

## 7. 事件（Emits）

| 事件 | 回调参数 | 说明 |
| --- | --- | --- |
| `sort-change` | `{ column, prop, order }` | 排序变化 |
| `current-change` | `page` | 页码变化 |
| `size-change` | `size` | 每页条数变化 |
| `selection-change` | `rows` | 多选变化 |
| `action` | `payload` | 任意操作按钮统一事件 |
| `<event/key>` | `payload` | 按钮指定事件，如 `edit`、`delete` |

`payload` 结构：

```js
{
  action, // button.key 或 button.event
  row,
  index,
  button
}
```

## 8. `useUrsaTable` API

### 入参

```js
useUrsaTable(apiFn, searchForm, defaultSort)
```

- `apiFn(payload)`：列表接口函数
- `searchForm`：查询对象
- `defaultSort`：默认排序（Element Plus 风格）

### 返回值

- 状态：`tableData`、`loading`、`currentPage`、`pageSize`、`total`
- 方法：`fetchData`、`handleSearch`、`handleCurrentChange`、`handleSizeChange`、`handleSortChange`、`handleDelete`

### 请求参数组装规则

`fetchData` 会提交：

- 分页：`pageNum`、`pageSize`
- 查询：`...searchForm`
- 排序：`sortField`、`sortOrder`（`ascending/descending` 自动转为 `asc/desc`）

### 返回数据兼容

支持以下返回格式：

- 数组：`[]`
- 对象：优先读取 `records/list/rows/data` 为列表，`total/count` 为总数

### `handleDelete` 正确调用

```js
handleDelete(index, row, options, callback)
```

- `options`：`{ nameField, confirmText, onSuccess }`
- `callback`：删除接口函数（接收 `row`）

## 9. 从简单到复杂的配置示例

### 示例 1：最小可用（仅配置列）

```vue
<UrsaTable
  :data="tableData"
  :columnFields="[
    { prop: 'username', label: '用户名' },
    { prop: 'email', label: '邮箱', minWidth: 220 }
  ]"
  :loading="loading"
  :current-page="currentPage"
  :page-size="pageSize"
  :total="total"
  @current-change="handleCurrentChange"
  @size-change="handleSizeChange"
  @sort-change="handleSortChange"
/>
```

### 示例 2：加工具栏 + 标签列

```vue
<UrsaTable ... :columnFields="columnFields">
  <template #toolbar>
    <el-button type="primary">新增</el-button>
  </template>
</UrsaTable>

<script setup>
const columnFields = [
  { prop: 'username', label: '用户名', minWidth: 180 },
  {
    prop: 'role',
    label: '角色',
    tagMap: {
      1: { label: '管理员', type: 'danger', effect: 'dark' },
      2: { label: '普通用户', type: 'success', effect: 'dark' }
    },
    tagDefault: ({ value }) => ({ label: value ?? '-' })
  }
]
</script>
```

### 示例 3：列格式化 + 插槽渲染

```vue
<UrsaTable :columnFields="columnFields" ...>
  <template #col-email="{ value }">
    <el-link type="primary">{{ value }}</el-link>
  </template>
</UrsaTable>

<script setup>
const columnFields = [
  { prop: 'email', label: '邮箱' },
  {
    prop: 'createdAt',
    label: '创建时间',
    formatter: ({ value }) => (value ? value.slice(0, 19).replace('T', ' ') : '-')
  }
]
</script>
```

### 示例 4：完整业务（多选 + 自定义操作列）

```vue
<UrsaTable
  :data="tableData"
  :columnFields="columnFields"
  :loading="loading"
  :current-page="currentPage"
  :page-size="pageSize"
  :total="total"
  :show-selection="true"
  :show-action-column="true"
  :action-column="actionColumn"
  @selection-change="onSelectionChange"
  @edit="onEdit"
  @delete="onDelete"
  @current-change="handleCurrentChange"
  @size-change="handleSizeChange"
  @sort-change="handleSortChange"
/>

<script setup>
const actionColumn = {
  width: 280,
  buttons: [
    { key: 'view', event: 'view', label: '查看', type: 'info' },
    { key: 'edit', event: 'edit', label: '编辑', type: 'primary' },
    {
      key: 'delete',
      event: 'delete',
      label: '删除',
      type: 'danger',
      visible: ({ row }) => row.status !== 'locked'
    },
    {
      key: 'resetPwd',
      label: '重置密码',
      type: 'warning',
      onClick: ({ row }) => {
        // 自定义逻辑，不走 emit
        console.log('reset password:', row.id)
      }
    }
  ]
}
</script>
```

## 10. 使用建议与注意点

- `columnFields` 未传或为空时，请改用默认插槽自行写列。
- 列排序默认是 `sortable: 'custom'`，需要监听 `sort-change` 并触发后端查询。
- 删除流程推荐统一走 `handleDelete(index, row, options, callback)`，避免遗漏确认弹窗和刷新逻辑。
- 如果按钮配置了 `onClick`，组件不会再触发对应 `emit`，这是有意设计。
