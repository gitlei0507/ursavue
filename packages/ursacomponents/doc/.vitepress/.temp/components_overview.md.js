import { ssrRenderAttrs, ssrRenderAttr, ssrRenderList, ssrInterpolate } from "vue/server-renderer";
import { useSSRContext, ref, computed } from "vue";
import { _ as _export_sfc } from "./plugin-vue_export-helper.1tPrXgE0.js";
const __pageData = JSON.parse('{"title":"组件总览","description":"","frontmatter":{},"headers":[],"relativePath":"components/overview.md","filePath":"components/overview.md"}');
const __default__ = { name: "components/overview.md" };
const _sfc_main = /* @__PURE__ */ Object.assign(__default__, {
  __ssrInlineRender: true,
  setup(__props) {
    const keyword = ref("");
    const groups = [
      {
        title: "组件",
        items: [
          { name: "UrsaMenu", desc: "菜单组件", link: "/components/UrsaMenu/UrsaMenu" },
          { name: "UrsaTagsView", desc: "标签组件", link: "/components/UrsaTagsView/UrsaTagsView" },
          { name: "UrsaSearch", desc: "搜索组件", link: "/components/UrsaSearch/UrsaSearch" },
          { name: "UrsaNavBar", desc: "导航组件", link: "/components/UrsaNavBar/UrsaNavBar" }
        ]
      }
    ];
    const normalizedKeyword = computed(() => keyword.value.trim().toLowerCase());
    const filteredGroups = computed(() => {
      if (!normalizedKeyword.value) return groups;
      return groups.map((group) => {
        const items = group.items.filter((item) => {
          const target = `${item.name} ${item.desc}`.toLowerCase();
          return target.includes(normalizedKeyword.value);
        });
        return { ...group, items };
      }).filter((group) => group.items.length > 0);
    });
    const total = computed(() => filteredGroups.value.reduce((sum, group) => sum + group.items.length, 0));
    return (_ctx, _push, _parent, _attrs) => {
      _push(`<div${ssrRenderAttrs(_attrs)} data-v-a0fbde90><h1 id="组件总览" tabindex="-1" data-v-a0fbde90>组件总览 <a class="header-anchor" href="#组件总览" aria-label="Permalink to &quot;组件总览&quot;" data-v-a0fbde90>​</a></h1><p data-v-a0fbde90>以下是 Ursa Components 当前文档中的组件目录。</p><input${ssrRenderAttr("value", keyword.value)} class="overview-search" type="text" placeholder="Search Components" data-v-a0fbde90>`);
      if (total.value === 0) {
        _push(`<div class="overview-empty" data-v-a0fbde90>未找到匹配组件，请尝试其他关键字。</div>`);
      } else {
        _push(`<!---->`);
      }
      _push(`<!--[-->`);
      ssrRenderList(filteredGroups.value, (group) => {
        _push(`<section class="overview-group" data-v-a0fbde90><div class="overview-group-header" data-v-a0fbde90><h2 data-v-a0fbde90>${ssrInterpolate(group.title)}</h2><span class="overview-count" data-v-a0fbde90>${ssrInterpolate(group.items.length)}</span></div><div class="overview-grid" data-v-a0fbde90><!--[-->`);
        ssrRenderList(group.items, (item) => {
          _push(`<a${ssrRenderAttr("href", item.link)} class="overview-card" data-v-a0fbde90><div class="overview-card-head" data-v-a0fbde90><span data-v-a0fbde90>${ssrInterpolate(item.name)}</span>`);
          if (item.version) {
            _push(`<span class="overview-version" data-v-a0fbde90>${ssrInterpolate(item.version)}</span>`);
          } else {
            _push(`<!---->`);
          }
          _push(`</div><div class="overview-card-body" data-v-a0fbde90>${ssrInterpolate(item.desc)}</div></a>`);
        });
        _push(`<!--]--></div></section>`);
      });
      _push(`<!--]--></div>`);
    };
  }
});
const _sfc_setup = _sfc_main.setup;
_sfc_main.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("components/overview.md");
  return _sfc_setup ? _sfc_setup(props, ctx) : void 0;
};
const overview = /* @__PURE__ */ _export_sfc(_sfc_main, [["__scopeId", "data-v-a0fbde90"]]);
export {
  __pageData,
  overview as default
};
