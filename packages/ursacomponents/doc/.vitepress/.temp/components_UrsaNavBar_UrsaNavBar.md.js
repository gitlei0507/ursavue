import { ssrRenderAttrs, ssrRenderComponent, ssrRenderStyle } from "vue/server-renderer";
import { ref, reactive, mergeProps, unref, useSSRContext } from "vue";
import { V as Ve, S as SourceCodeViewer } from "./SourceCodeViewer.CXsMKroe.js";
import "@element-plus/icons-vue";
import "element-plus";
import "vue-router";
import "./plugin-vue_export-helper.1tPrXgE0.js";
const _sfc_main$1 = {
  __name: "BaseUrsaNavBar",
  __ssrInlineRender: true,
  setup(__props) {
    const menuCollapsed = ref(false);
    const userStore = reactive({
      userInfo: {
        username: "UrsaAdmin",
        avatar: "https://avatars.githubusercontent.com/u/9919?s=80&v=4",
        role: 1
      },
      removeUserInfo() {
        this.userInfo = {
          username: "",
          avatar: "",
          role: 0
        };
      }
    });
    const useAuth = () => ({
      removeToken() {
      }
    });
    const handleToggleMenuCollapse = () => {
      menuCollapsed.value = !menuCollapsed.value;
    };
    return (_ctx, _push, _parent, _attrs) => {
      _push(`<div${ssrRenderAttrs(mergeProps({ class: "w-full border border-gray-200 rounded" }, _attrs))}>`);
      _push(ssrRenderComponent(unref(Ve), {
        "menu-collapsed": menuCollapsed.value,
        "user-store": userStore,
        "use-auth": useAuth,
        "have-menu-collapsed-ability": true,
        onToggleMenuCollapse: handleToggleMenuCollapse
      }, null, _parent));
      _push(`</div>`);
    };
  }
};
const _sfc_setup$1 = _sfc_main$1.setup;
_sfc_main$1.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("components/UrsaNavBar/BaseUrsaNavBar.vue");
  return _sfc_setup$1 ? _sfc_setup$1(props, ctx) : void 0;
};
const __pageData = JSON.parse('{"title":"UrsaNavBar 导航组件","description":"","frontmatter":{},"headers":[],"relativePath":"components/UrsaNavBar/UrsaNavBar.md","filePath":"components/UrsaNavBar/UrsaNavBar.md"}');
const __default__ = { name: "components/UrsaNavBar/UrsaNavBar.md" };
const _sfc_main = /* @__PURE__ */ Object.assign(__default__, {
  __ssrInlineRender: true,
  setup(__props) {
    const loadBaseUrsaNavBarSource = async () => (await import("./BaseUrsaNavBar.BvH82izF.js")).default;
    return (_ctx, _push, _parent, _attrs) => {
      _push(`<div${ssrRenderAttrs(_attrs)}><h1 id="ursanavbar-导航组件" tabindex="-1">UrsaNavBar 导航组件 <a class="header-anchor" href="#ursanavbar-导航组件" aria-label="Permalink to &quot;UrsaNavBar 导航组件&quot;">​</a></h1><p>提供顶部导航，内置菜单折叠按钮、用户信息展示与退出登录行为，适合与 <code>UrsaMenu</code>、<code>UrsaTagsView</code> 组合使用。</p><h2 id="基础示例" tabindex="-1">基础示例 <a class="header-anchor" href="#基础示例" aria-label="Permalink to &quot;基础示例&quot;">​</a></h2>`);
      _push(ssrRenderComponent(_sfc_main$1, null, null, _parent));
      _push(ssrRenderComponent(SourceCodeViewer, {
        "load-source": loadBaseUrsaNavBarSource,
        language: "vue"
      }, null, _parent));
      _push(`<h2 id="属性" tabindex="-1">属性 <a class="header-anchor" href="#属性" aria-label="Permalink to &quot;属性&quot;">​</a></h2><table tabindex="0"><thead><tr><th>参数</th><th>说明</th><th>类型</th><th>默认值</th></tr></thead><tbody><tr><td><code>menuCollapsed</code></td><td>当前侧栏是否折叠</td><td><code>Boolean</code></td><td><code>false</code></td></tr><tr><td><code>userStore</code></td><td>用户状态对象（需包含用户信息）</td><td><code>Object</code></td><td><code>undefined</code></td></tr><tr><td><code>useAuth</code></td><td>认证能力函数（需返回 token 能力）</td><td><code>Function</code></td><td><code>undefined</code></td></tr><tr><td><code>haveMenuCollapsedAbility</code></td><td>是否显示菜单折叠按钮</td><td><code>Boolean</code></td><td><code>true</code></td></tr></tbody></table><h2 id="事件" tabindex="-1">事件 <a class="header-anchor" href="#事件" aria-label="Permalink to &quot;事件&quot;">​</a></h2><table tabindex="0"><thead><tr><th>事件名</th><th>说明</th><th>回调参数</th></tr></thead><tbody><tr><td><code>toggle-menu-collapse</code></td><td>点击折叠图标时触发</td><td>无</td></tr></tbody></table><h2 id="插槽" tabindex="-1">插槽 <a class="header-anchor" href="#插槽" aria-label="Permalink to &quot;插槽&quot;">​</a></h2><table tabindex="0"><thead><tr><th>插槽名</th><th>说明</th><th>作用域参数</th></tr></thead><tbody><tr><td><code>content</code></td><td>覆盖整个导航条默认内容（含左/右区）</td><td>无</td></tr></tbody></table><h2 id="依赖约定" tabindex="-1">依赖约定 <a class="header-anchor" href="#依赖约定" aria-label="Permalink to &quot;依赖约定&quot;">​</a></h2><p><code>UrsaNavBar</code> 内部会调用 <code>useUrsaNavBar(userStore, useAuth)</code>，因此建议确保以下结构：</p><ol><li><code>userStore.userInfo</code>：至少包含 <code>username</code>、<code>avatar</code>、<code>role</code></li><li><code>userStore.removeUserInfo</code>：退出后清理用户信息</li><li><code>useAuth()</code> 返回对象中包含 <code>removeToken</code>：退出后清理登录凭证</li></ol><h2 id="useursanavbar" tabindex="-1">useUrsaNavBar <a class="header-anchor" href="#useursanavbar" aria-label="Permalink to &quot;useUrsaNavBar&quot;">​</a></h2><p>组件库同时导出组合式方法 <code>useUrsaNavBar</code>，可在自定义导航实现中复用“角色显示 + 退出登录”逻辑。</p><div class="language-ts vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">ts</span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span style="${ssrRenderStyle({ "--shiki-light": "#D73A49", "--shiki-dark": "#F97583" })}">import</span><span style="${ssrRenderStyle({ "--shiki-light": "#24292E", "--shiki-dark": "#E1E4E8" })}"> { useUrsaNavBar } </span><span style="${ssrRenderStyle({ "--shiki-light": "#D73A49", "--shiki-dark": "#F97583" })}">from</span><span style="${ssrRenderStyle({ "--shiki-light": "#032F62", "--shiki-dark": "#9ECBFF" })}"> &quot;ursacomponents&quot;</span><span style="${ssrRenderStyle({ "--shiki-light": "#24292E", "--shiki-dark": "#E1E4E8" })}">;</span></span>
<span class="line"></span>
<span class="line"><span style="${ssrRenderStyle({ "--shiki-light": "#D73A49", "--shiki-dark": "#F97583" })}">const</span><span style="${ssrRenderStyle({ "--shiki-light": "#24292E", "--shiki-dark": "#E1E4E8" })}"> { </span><span style="${ssrRenderStyle({ "--shiki-light": "#005CC5", "--shiki-dark": "#79B8FF" })}">showRole</span><span style="${ssrRenderStyle({ "--shiki-light": "#24292E", "--shiki-dark": "#E1E4E8" })}">, </span><span style="${ssrRenderStyle({ "--shiki-light": "#005CC5", "--shiki-dark": "#79B8FF" })}">userInfo</span><span style="${ssrRenderStyle({ "--shiki-light": "#24292E", "--shiki-dark": "#E1E4E8" })}">, </span><span style="${ssrRenderStyle({ "--shiki-light": "#005CC5", "--shiki-dark": "#79B8FF" })}">logout</span><span style="${ssrRenderStyle({ "--shiki-light": "#24292E", "--shiki-dark": "#E1E4E8" })}"> } </span><span style="${ssrRenderStyle({ "--shiki-light": "#D73A49", "--shiki-dark": "#F97583" })}">=</span><span style="${ssrRenderStyle({ "--shiki-light": "#6F42C1", "--shiki-dark": "#B392F0" })}"> useUrsaNavBar</span><span style="${ssrRenderStyle({ "--shiki-light": "#24292E", "--shiki-dark": "#E1E4E8" })}">(userStore, useAuth);</span></span></code></pre></div><p>返回值说明：</p><table tabindex="0"><thead><tr><th>参数</th><th>说明</th><th>类型</th></tr></thead><tbody><tr><td><code>userInfo</code></td><td>用户信息响应式引用</td><td><code>Ref&lt;Object&gt;</code></td></tr><tr><td><code>showRole</code></td><td>角色展示文案（如“系统管理员”）</td><td><code>ComputedRef&lt;String&gt;</code></td></tr><tr><td><code>logout</code></td><td>退出登录方法（弹窗确认后执行清理）</td><td><code>Function</code></td></tr></tbody></table><h2 id="业务接入建议" tabindex="-1">业务接入建议 <a class="header-anchor" href="#业务接入建议" aria-label="Permalink to &quot;业务接入建议&quot;">​</a></h2><ol><li>将 <code>menuCollapsed</code> 状态统一放在布局层（Layout）管理，<code>UrsaNavBar</code> 只负责触发事件。</li><li>若业务需要自定义右侧区域（通知、主题切换、多租户切换），优先使用 <code>content</code> 插槽扩展。</li><li>若登录页路由不是 <code>/login</code>，建议基于 <code>useUrsaNavBar</code> 自行封装 <code>logout</code> 跳转行为。</li></ol></div>`);
    };
  }
});
const _sfc_setup = _sfc_main.setup;
_sfc_main.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("components/UrsaNavBar/UrsaNavBar.md");
  return _sfc_setup ? _sfc_setup(props, ctx) : void 0;
};
export {
  __pageData,
  _sfc_main as default
};
