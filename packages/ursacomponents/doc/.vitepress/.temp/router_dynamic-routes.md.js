import { resolveComponent, useSSRContext } from "vue";
import { ssrRenderAttrs, ssrRenderComponent } from "vue/server-renderer";
import { _ as _export_sfc } from "./plugin-vue_export-helper.1tPrXgE0.js";
const __pageData = JSON.parse('{"title":"动态路由","description":"","frontmatter":{},"headers":[],"relativePath":"router/dynamic-routes.md","filePath":"router/dynamic-routes.md"}');
const _sfc_main = { name: "router/dynamic-routes.md" };
function _sfc_ssrRender(_ctx, _push, _parent, _attrs, $props, $setup, $data, $options) {
  const _component_ImagePreview = resolveComponent("ImagePreview");
  _push(`<div${ssrRenderAttrs(_attrs)}><h1 id="动态路由" tabindex="-1">动态路由 <a class="header-anchor" href="#动态路由" aria-label="Permalink to &quot;动态路由&quot;">​</a></h1><p>使用 ursacomponents 的路由工具完成动态路由生成、注入与守卫联动。</p><h2 id="_1-目标与整体思路" tabindex="-1">1. 目标与整体思路 <a class="header-anchor" href="#_1-目标与整体思路" aria-label="Permalink to &quot;1. 目标与整体思路&quot;">​</a></h2><p>在后台管理系统中，菜单通常由后端返回。需要把菜单数据转换为 Vue Router 可识别的路由记录，并在登录后按需注入。</p><h2 id="_2-整体流程" tabindex="-1">2. 整体流程 <a class="header-anchor" href="#_2-整体流程" aria-label="Permalink to &quot;2. 整体流程&quot;">​</a></h2><p>整个基于核心工具集（Toolkit）的路由生成与调用流程，可以划分为四个核心阶段：静态初始化、用户登录、守卫拦截、以及动态注入。以下是完整的调用流程分析：</p><ol><li><p>静态初始化阶段 (项目启动) 在项目初始化阶段，系统会准备好所有需要的“原材料”并挂载基础环境： 扫描组件： 在 <code>dynamic-routes.js</code> 中，通过 Vite 的 <code>import.meta.glob</code> 扫描并获取 views 目录下所有的页面组件资源（懒加载函数集 <code>viewModules</code>） 。 实例化工具箱： 将 <code>viewModules</code> 等配置传入 <code>createUrsaMenuRouterToolkit</code>，生成并导出核心的方法 <code>buildRoutesFromMenus</code> 和 <code>initDynamicRoutes</code> 。 注册静态路由与守卫： 在 <code>index.js</code> 中，首先创建包含 <code>/login</code> 和布局页 / 等基础页面的静态路由实例 。随后，调用 <code>setupUrsaRouterGuard</code> 设置前置路由守卫，并将上一步生成的 <code>initDynamicRoutes</code> 注入到守卫的配置中 。</p></li><li><p>用户登录与状态存储阶段 (认证流) 当用户访问登录页并提交凭证时，触发认证与数据初始化流程： 获取权限与数据： 在 <code>useLogin</code> 中，调用 login API 获取认证信息后，通过 setToken 保存 Token，并通过 <code>useUserStore</code> 的 <code>setUserInfo</code> 将包含用户菜单树（menus）在内的基本信息存入 Pinia 状态库 。 路由重定向： 登录成功后，可以通过工具箱提供的 <code>getFirstMenuPath</code> 工具（带有 <code>/dashboard</code> 兜底），从用户的菜单数据中解析出首个可访问的菜单路径，并重定向到该页面 。</p></li><li><p>路由守卫拦截阶段 (导航流) 当页面发生跳转（例如登录后的重定向）时，<code>setupUrsaRouterGuard</code> 注册的前置路由守卫会拦截此次导航： 登录校验： 守卫首先通过传入的 <code>getToken</code> 检查用户是否已登录 。 加载状态判断： 如果已登录，守卫会通过 <code>getUserStore</code> 获取用户信息，并调用 <code>hasLoadedRoutes</code>（默认读取 <code>store.hasLoadedAsyncRoutes</code> 标记）判断当前是否已经加载过动态路由 。 触发动态加载： 如果标记为未加载，守卫则会从 <code>store</code> 中读取用户菜单列表（<code>getMenus</code>），并调用由外部传入的 <code>initDynamicRoutes</code> 开启路由的动态生成过程 。</p></li><li><p>动态解析与注入阶段 (内部处理流) 这是 Toolkit 发挥“核心调度”作用的阶段，由 <code>initDynamicRoutes</code> 在内部完成复杂的流水线作业： 数据拍平： 调用 <code>flattenMenus</code> 将从服务端获取的树形菜单数据拍平为一维数组，方便后续逐一映射 。 路径解析： 针对每一个菜单项，通过 <code>normalizeViewPath</code> 统一处理组件路径格式（例如自动补齐 .vue 后缀、去除多余斜杠） 。 组件匹配： 利用 <code>createViewResolver</code>，将处理后的路径与阶段一中扫描的 <code>viewModules</code> 键值进行精确匹配，提取出对应的页面组件模块 。 路由映射与注册： <code>createMenuRouteMapper</code> 负责将拼装好的路径和组件转换为 Vue Router 能够识别的路由对象 ，并动态添加到 Router 实例中。 状态闭环： 路由注入完成后，守卫会调用 <code>setLoadedRoutes</code>（默认执行 store 的 <code>setHasLoadedAsyncRoutes</code> 方法）将加载状态标记为 <code>true</code> 。至此，流程闭环，放行用户的路由访问请求。</p><h2 id="_3-流程图" tabindex="-1">3. 流程图 <a class="header-anchor" href="#_3-流程图" aria-label="Permalink to &quot;3. 流程图&quot;">​</a></h2></li></ol>`);
  _push(ssrRenderComponent(_component_ImagePreview, {
    src: "./image/基于核心工具集Toolkit的路由生成与调用流程.png",
    alt: "基于核心工具集Toolkit的路由生成与调用流程"
  }, null, _parent));
  _push(`<h2 id="_4-核心方法说明" tabindex="-1">4. 核心方法说明 <a class="header-anchor" href="#_4-核心方法说明" aria-label="Permalink to &quot;4. 核心方法说明&quot;">​</a></h2><table tabindex="0"><thead><tr><th>方法</th><th>说明</th></tr></thead><tbody><tr><td><code>import.meta.glob</code></td><td>扫描指定目录下页面组件，key：文件路径，value：组件懒加载函数</td></tr><tr><td><code>normalizeViewPath</code></td><td>统一规范化页面组件路径</td></tr><tr><td><code>createViewResolver</code></td><td>根据页面组件路径获取组件懒加载函数</td></tr><tr><td><code>createMenuRouteMapper</code></td><td>构建路由对象，用于后续生成 route，内部调用了 <code>createViewResolver</code></td></tr><tr><td><code>buildRoutesFromMenus</code></td><td>对外暴露，将后台传递的菜单数据标准化后，转换成路由对象，内部调用了 <code>createMenuRouteMapper</code></td></tr><tr><td><code>initDynamicRoutes</code></td><td>对外暴露，生成 route 并挂载到 router，内部调用了 <code>buildRoutesFromMenus</code></td></tr></tbody></table></div>`);
}
const _sfc_setup = _sfc_main.setup;
_sfc_main.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("router/dynamic-routes.md");
  return _sfc_setup ? _sfc_setup(props, ctx) : void 0;
};
const dynamicRoutes = /* @__PURE__ */ _export_sfc(_sfc_main, [["ssrRender", _sfc_ssrRender]]);
export {
  __pageData,
  dynamicRoutes as default
};
