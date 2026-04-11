<script setup>
import BaseUrsaSearch from './BaseUrsaSearch.vue'
import SourceCodeViewer from '../shared/SourceCodeViewer.vue'

const loadBaseUrsaSearchSource = async () => (await import('./BaseUrsaSearch.vue?raw')).default
</script>

# UrsaSearch 搜索组件

提供通用的搜索栏，基于 Element Plus 的 `el-form`、`el-input`、`el-select` 封装，支持字段配置、查询重置和插槽扩展。一般与 `UrsaTable` 一起使用。

## 基础示例

<BaseUrsaSearch />

<SourceCodeViewer :load-source="loadBaseUrsaSearchSource" language="vue" />

## 查询字段配置

`UrsaSearch` 通过 `fields` 数组声明每个查询项。内置支持 `input` 和 `select`，也支持通过 `field` 插槽扩展自定义控件。

<details>
  <summary>查看源代码</summary>

```js
const fields = [
  {
    prop: "keyword",
    label: "关键字",
    type: "input",
    placeholder: "请输入关键字",
    clearable: true,
    class: "!w-56",
    componentProps: {
      maxlength: 20,
      showWordLimit: true,
    },
  },
  {
    prop: "status",
    label: "状态",
    type: "select",
    placeholder: "请选择状态",
    clearable: true,
    class: "!w-44",
    options: [
      { label: "启用", value: "enabled" },
      { label: "禁用", value: "disabled" },
    ],
  },
];
```

</details>

## 属性

| 参数     | 说明                 | 类型      | 默认值 |
| -------- | -------------------- | --------- | ------ |
| `model`  | 查询对象（双向读写） | `Object`  | `{}`   |
| `fields` | 查询字段配置         | `Array`   | `[]`   |
| `inline` | 是否行内表单布局     | `Boolean` | `true` |

## fields 子项

| 参数             | 说明                              | 类型                      | 默认值               |
| ---------------- | --------------------------------- | ------------------------- | -------------------- |
| `prop`           | 字段绑定键名，对应 `model[prop]`  | `String`                  | `''`                 |
| `label`          | 表单项标题                        | `String`                  | `''`                 |
| `type`           | 字段类型，支持 `input` / `select` | `String`                  | -                    |
| `placeholder`    | 占位提示                          | `String`                  | 组件内部兜底文案     |
| `clearable`      | 是否可清空                        | `Boolean`                 | `true`               |
| `class`          | 字段组件 class                    | `String`                  | `input` 默认 `!w-48` |
| `options`        | `select` 选项数组                 | `Array<{ label, value }>` | `[]`                 |
| `componentProps` | 透传给字段组件的属性              | `Object`                  | `{}`                 |

## 事件

| 事件名   | 说明             | 回调参数 |
| -------- | ---------------- | -------- |
| `search` | 点击查询按钮触发 | 无       |
| `reset`  | 点击重置后触发   | 无       |

说明：点击重置时会先把 `model` 的所有字段重置为空字符串，再触发 `reset`，最后触发一次 `search`，便于直接刷新列表。

## 插槽

| 插槽名    | 说明                                   | 作用域参数                   |
| --------- | -------------------------------------- | ---------------------------- |
| `default` | 当 `fields` 为空时，自定义整块查询内容 | 无                           |
| `field`   | 自定义字段渲染（`type` 非内置时）      | `{ field, value, setValue }` |

`field` 插槽示例：

```vue
<UrsaSearch :model="searchForm" :fields="fields" @search="fetchList">
  <template #field="{ field, value, setValue }">
    <el-date-picker
      v-if="field.type === 'daterange'"
      :model-value="value"
      type="daterange"
      start-placeholder="开始日期"
      end-placeholder="结束日期"
      @update:model-value="setValue"
    />
  </template>
</UrsaSearch>
```

## useUrsaSearch

组件库也导出了组合式方法 `useUrsaSearch`，适合在非组件场景中复用“重置并触发查询”的逻辑。

```ts
import { reactive } from "vue";
import { useUrsaSearch } from "ursacomponents";

const searchForm = reactive({
  keyword: "",
  status: "",
});

const fetchList = () => {
  // 请求列表
};

const onReset = () => {
  // 记录埋点 / 清理本地状态
};

const { resetSearch } = useUrsaSearch(searchForm, fetchList, onReset);

// resetSearch() 效果：
// 1. searchForm 全字段置空
// 2. 调用 onReset
// 3. 调用 fetchList
```

## 业务接入建议

### 1. 页面维护统一查询对象

建议将查询条件放在一个响应式对象中，作为 `UrsaSearch` 的 `model` 与列表请求的共享参数。

### 2. 查询与分页解耦

`search` 事件里只负责“重置页码 + 拉取数据”，避免将复杂逻辑散在模板事件中。

### 3. 重置后自动刷新

`UrsaSearch` 重置后会自动再触发一次 `search`，通常不需要手动重复调用接口。

### 4. 复杂筛选优先走 slot

对于日期范围、级联选择、远程搜索等复杂字段，优先使用 `field` 插槽扩展，不需要改动组件内部实现。
