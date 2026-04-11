import { computed, resolveComponent, openBlock, createBlock, withCtx, createElementBlock, toDisplayString, createCommentVNode, createVNode, Fragment, renderList, toRef, unref, resolveDynamicComponent, createElementVNode, mergeProps, renderSlot, createTextVNode, inject, ref, watch, useSSRContext } from "vue";
import * as Y from "@element-plus/icons-vue";
import { Search, Refresh, Expand, Fold } from "@element-plus/icons-vue";
import { ElMessageBox } from "element-plus";
import { routeLocationKey, routerKey, useRouter } from "vue-router";
import { ssrRenderAttrs, ssrInterpolate } from "vue/server-renderer";
import { _ as _export_sfc } from "./plugin-vue_export-helper.1tPrXgE0.js";
const Z = (e, a = {}) => {
  const { iconMap: t = Y, fallbackIcon: l = "Menu" } = a;
  return (t == null ? void 0 : t[e]) || (t == null ? void 0 : t[l]) || Y.Menu;
}, Me = (e, a = {}) => {
  const { defaultTitle: t = "未命名菜单", iconResolver: l = Z } = a, r = computed(() => {
    const o = unref(e);
    return Array.isArray(o == null ? void 0 : o.children) && o.children.length > 0;
  }), c = computed(() => {
    const o = unref(e);
    return (o == null ? void 0 : o.menu_name) || (o == null ? void 0 : o.title) || t;
  }), i = computed(() => {
    var _a;
    const o = unref(e), d = ((_a = o == null ? void 0 : o.meta) == null ? void 0 : _a.icon) || (o == null ? void 0 : o.icon);
    return (typeof l == "function" ? l : Z)(d);
  });
  return {
    hasChildren: r,
    menuTitle: c,
    menuIcon: i
  };
}, ae = /* @__PURE__ */ Object.assign({
  name: "UrsaMenuItem"
}, {
  __name: "UrsaMenuItem",
  props: {
    menu: {
      type: Object,
      required: true
    },
    defaultTitle: {
      type: String,
      default: "未命名菜单"
    },
    iconResolver: {
      type: Function,
      default: void 0
    }
  },
  setup(e) {
    const a = e, { hasChildren: t, menuTitle: l, menuIcon: r } = Me(toRef(a, "menu"), {
      defaultTitle: a.defaultTitle,
      iconResolver: a.iconResolver
    });
    return (c, i) => {
      const o = resolveComponent("el-icon"), d = resolveComponent("UrsaMenuItem", true), p = resolveComponent("el-sub-menu"), w = resolveComponent("el-menu-item");
      return unref(t) ? (openBlock(), createBlock(p, {
        key: 0,
        index: e.menu.path
      }, {
        title: withCtx(() => [
          createVNode(o, null, {
            default: withCtx(() => [
              (openBlock(), createBlock(resolveDynamicComponent(unref(r))))
            ]),
            _: 1
          }),
          createElementVNode("span", null, toDisplayString(unref(l)), 1)
        ]),
        default: withCtx(() => [
          (openBlock(true), createElementBlock(Fragment, null, renderList(e.menu.children, (g) => (openBlock(), createBlock(d, {
            key: g.path,
            menu: g,
            "default-title": e.defaultTitle,
            "icon-resolver": e.iconResolver
          }, null, 8, ["menu", "default-title", "icon-resolver"]))), 128))
        ]),
        _: 1
      }, 8, ["index"])) : (openBlock(), createBlock(w, {
        key: 1,
        index: e.menu.path
      }, {
        default: withCtx(() => [
          createVNode(o, null, {
            default: withCtx(() => [
              (openBlock(), createBlock(resolveDynamicComponent(unref(r))))
            ]),
            _: 1
          }),
          createElementVNode("span", null, toDisplayString(unref(l)), 1)
        ]),
        _: 1
      }, 8, ["index"]));
    };
  }
}), Se = {
  key: 0,
  class: "ursa-menu-title"
}, Te = {
  __name: "UrsaMenu",
  props: {
    menus: {
      type: Array,
      default: () => []
    },
    defaultActive: {
      type: String,
      default: ""
    },
    title: {
      type: String,
      default: "管理系统后台"
    },
    asideWidth: {
      type: String,
      default: "200px"
    },
    router: {
      type: Boolean,
      default: true
    },
    collapse: {
      type: Boolean,
      default: false
    },
    filterHidden: {
      type: Boolean,
      default: true
    },
    defaultTitle: {
      type: String,
      default: "未命名菜单"
    },
    iconResolver: {
      type: Function,
      default: void 0
    }
  },
  emits: ["open", "close"],
  setup(e, { emit: a }) {
    const t = a, l = e, r = computed(() => Array.isArray(l.menus) ? l.filterHidden ? l.menus.filter((o) => !(o == null ? void 0 : o.hidden)) : l.menus : []), c = (o, d) => {
      t("open", o, d);
    }, i = (o, d) => {
      t("close", o, d);
    };
    return (o, d) => {
      const p = resolveComponent("el-menu"), w = resolveComponent("el-aside");
      return openBlock(), createBlock(w, {
        width: e.asideWidth,
        class: "ursa-menu-aside"
      }, {
        default: withCtx(() => [
          e.title && !e.collapse ? (openBlock(), createElementBlock("div", Se, toDisplayString(e.title), 1)) : createCommentVNode("", true),
          createVNode(p, {
            router: e.router,
            "default-active": e.defaultActive,
            class: "el-menu-vertical-demo",
            collapse: e.collapse,
            "collapse-transition": false,
            "background-color": "#000000",
            "text-color": "#ffffff",
            "active-text-color": "#ffd04b",
            onOpen: c,
            onClose: i
          }, {
            default: withCtx(() => [
              (openBlock(true), createElementBlock(Fragment, null, renderList(r.value, (g) => (openBlock(), createBlock(ae, {
                key: g.path,
                menu: g,
                "default-title": e.defaultTitle,
                "icon-resolver": e.iconResolver
              }, null, 8, ["menu", "default-title", "icon-resolver"]))), 128))
            ]),
            _: 1
          }, 8, ["router", "default-active", "collapse"])
        ]),
        _: 1
      }, 8, ["width"]);
    };
  }
};
function Re(e, a) {
  const t = useRouter(), l = toRef(e, "userInfo"), { removeToken: r } = a(), { removeUserInfo: c } = e, i = computed(() => l.value.role == 1 ? "系统管理员" : "普通用户");
  function o() {
    ElMessageBox.confirm(
      "你确定要注销吗？",
      "警告",
      {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning"
      }
    ).then(() => {
      r(), c(), t.push("/login");
    }).catch(() => {
    });
  }
  return {
    userInfo: l,
    showRole: i,
    logout: o
  };
}
const H = (e, a) => {
  const t = e.__vccOpts || e;
  for (const [l, r] of a)
    t[l] = r;
  return t;
}, Ue = { class: "ml-auto flex items-center gap-2" }, ze = { class: "text-sm" }, Be = { class: "text-sm" }, Ie = {
  __name: "UrsaNavBar",
  props: {
    menuCollapsed: {
      type: Boolean,
      default: false
    },
    userStore: {
      type: Object,
      default: void 0
    },
    useAuth: {
      type: Function,
      default: void 0
    },
    haveMenuCollapsedAbility: {
      type: Boolean,
      default: true
    }
  },
  emits: ["toggle-menu-collapse"],
  setup(e, { emit: a }) {
    const t = a, l = e, { userStore: r, useAuth: c } = l, i = toRef(r, "userInfo"), { showRole: o, logout: d } = Re(r, c);
    return (p, w) => {
      const g = resolveComponent("el-icon"), h = resolveComponent("el-tooltip"), u = resolveComponent("el-avatar"), x = resolveComponent("el-button"), A = resolveComponent("el-header");
      return openBlock(), createBlock(A, { class: "border-b flex items-center justify-between px-4 bg-white" }, {
        default: withCtx(() => [
          renderSlot(p.$slots, "content", {}, () => [
            e.haveMenuCollapsedAbility ? (openBlock(), createBlock(h, {
              key: 0,
              content: e.menuCollapsed ? "展开菜单" : "折叠菜单",
              placement: "right",
              effect: "dark"
            }, {
              default: withCtx(() => [
                createVNode(g, {
                  class: "menu-toggle-icon",
                  onClick: w[0] || (w[0] = (S) => t("toggle-menu-collapse"))
                }, {
                  default: withCtx(() => [
                    e.menuCollapsed ? (openBlock(), createBlock(unref(Expand), { key: 0 })) : (openBlock(), createBlock(unref(Fold), { key: 1 }))
                  ]),
                  _: 1
                })
              ]),
              _: 1
            }, 8, ["content"])) : createCommentVNode("", true),
            createElementVNode("div", Ue, [
              createVNode(u, {
                size: 30,
                src: i.value.avatar
              }, null, 8, ["src"]),
              createElementVNode("span", ze, "用户：" + toDisplayString(i.value.username), 1),
              createElementVNode("span", Be, "角色：" + toDisplayString(unref(o)), 1),
              createVNode(x, {
                type: "danger",
                onClick: unref(d)
              }, {
                default: withCtx(() => [...w[1] || (w[1] = [
                  createTextVNode("注销", -1)
                ])]),
                _: 1
              }, 8, ["onClick"])
            ])
          ], true)
        ]),
        _: 3
      });
    };
  }
}, Ve = /* @__PURE__ */ H(Ie, [["__scopeId", "data-v-cafafa86"]]), Ne = (e, a, t) => ({
  resetSearch: () => {
    e && Object.keys(e).forEach((r) => {
      e[r] = "";
    }), typeof t == "function" && t(), typeof a == "function" && a();
  }
}), Pe = /* @__PURE__ */ Object.assign({
  name: "UrsaSearch"
}, {
  __name: "UrsaSearch",
  props: {
    model: {
      type: Object,
      default: () => ({})
    },
    fields: {
      type: Array,
      default: () => []
    },
    inline: {
      type: Boolean,
      default: true
    }
  },
  emits: ["search", "reset"],
  setup(e, { emit: a }) {
    const t = e, l = a, { resetSearch: r } = Ne(
      t.model,
      () => l("search"),
      () => l("reset")
    ), c = () => {
      r();
    }, i = (d) => !d || !t.model ? "" : t.model[d], o = (d, p) => {
      !d || !t.model || (t.model[d] = p);
    };
    return (d, p) => {
      const w = resolveComponent("el-input"), g = resolveComponent("el-option"), h = resolveComponent("el-select"), u = resolveComponent("el-form-item"), x = resolveComponent("el-button"), A = resolveComponent("el-form"), S = resolveComponent("el-card");
      return openBlock(), createBlock(S, {
        class: "search-card",
        shadow: "never"
      }, {
        default: withCtx(() => [
          createVNode(A, {
            inline: e.inline,
            class: "search-form"
          }, {
            default: withCtx(() => [
              e.fields.length > 0 ? (openBlock(true), createElementBlock(Fragment, { key: 0 }, renderList(e.fields, (s) => (openBlock(), createBlock(u, {
                key: s.prop || s.label,
                label: s.label
              }, {
                default: withCtx(() => [
                  s.type === "input" ? (openBlock(), createBlock(w, mergeProps({
                    key: 0,
                    "model-value": i(s.prop),
                    "onUpdate:modelValue": (v) => o(s.prop, v),
                    placeholder: s.placeholder || `请输入${s.label || ""}`,
                    clearable: s.clearable ?? true,
                    class: s.class ?? "!w-48"
                  }, { ref_for: true }, s.componentProps), null, 16, ["model-value", "onUpdate:modelValue", "placeholder", "clearable", "class"])) : s.type === "select" ? (openBlock(), createBlock(h, mergeProps({
                    key: 1,
                    "model-value": i(s.prop),
                    "onUpdate:modelValue": (v) => o(s.prop, v),
                    placeholder: s.placeholder || `请选择${s.label || ""}`,
                    clearable: s.clearable ?? true,
                    class: s.class
                  }, { ref_for: true }, s.componentProps), {
                    default: withCtx(() => [
                      (openBlock(true), createElementBlock(Fragment, null, renderList(s.options || [], (v) => (openBlock(), createBlock(g, {
                        key: v.value,
                        label: v.label,
                        value: v.value
                      }, null, 8, ["label", "value"]))), 128))
                    ]),
                    _: 2
                  }, 1040, ["model-value", "onUpdate:modelValue", "placeholder", "clearable", "class"])) : renderSlot(d.$slots, "field", {
                    key: 2,
                    field: s,
                    value: i(s.prop),
                    setValue: (v) => o(s.prop, v)
                  }, void 0, true)
                ]),
                _: 2
              }, 1032, ["label"]))), 128)) : renderSlot(d.$slots, "default", { key: 1 }, void 0, true),
              createVNode(u, null, {
                default: withCtx(() => [
                  createVNode(x, {
                    type: "primary",
                    onClick: p[0] || (p[0] = (s) => l("search")),
                    icon: unref(Search)
                  }, {
                    default: withCtx(() => [...p[1] || (p[1] = [
                      createTextVNode("查询", -1)
                    ])]),
                    _: 1
                  }, 8, ["icon"]),
                  createVNode(x, {
                    onClick: c,
                    icon: unref(Refresh)
                  }, {
                    default: withCtx(() => [...p[2] || (p[2] = [
                      createTextVNode("重置", -1)
                    ])]),
                    _: 1
                  }, 8, ["icon"])
                ]),
                _: 1
              })
            ]),
            _: 3
          }, 8, ["inline"])
        ]),
        _: 3
      });
    };
  }
}), je = /* @__PURE__ */ H(Pe, [["__scopeId", "data-v-b4f08e8f"]]), Ke = { class: "ursa-tags-view" }, qe = /* @__PURE__ */ Object.assign({
  name: "UrsaTagsView"
}, {
  __name: "UrsaTagsView",
  props: {
    homePath: {
      type: String,
      default: "/dashboard"
    },
    homeTitle: {
      type: String,
      default: "首页"
    }
  },
  setup(e) {
    const a = e, t = inject(routeLocationKey, null), l = inject(routerKey, null), r = computed(() => !!(t && l)), c = ref([]), i = computed({
      get: () => {
        var _a;
        return r.value ? t.path : ((_a = c.value[0]) == null ? void 0 : _a.path) || a.homePath;
      },
      set: (h) => h
    }), o = (h) => {
      var _a;
      return {
        path: h.path,
        title: ((_a = h.meta) == null ? void 0 : _a.title) || h.name || h.path,
        closable: h.path !== a.homePath
      };
    }, d = () => {
      var _a;
      if (c.value.some((x) => x.path === a.homePath))
        return;
      const u = r.value ? l.resolve(a.homePath) : null;
      c.value.unshift(
        o({
          path: a.homePath,
          meta: { title: ((_a = u == null ? void 0 : u.meta) == null ? void 0 : _a.title) || a.homeTitle },
          name: (u == null ? void 0 : u.name) || a.homeTitle
        })
      );
    }, p = (h) => {
      if (!(h == null ? void 0 : h.path) || h.path === "/")
        return;
      c.value.some((x) => x.path === h.path) || c.value.push(o(h));
    }, w = (h) => {
      var _a;
      if (!r.value)
        return;
      const u = (_a = h == null ? void 0 : h.props) == null ? void 0 : _a.name;
      u && u !== t.path && l.push(u);
    }, g = (h) => {
      var _a;
      const u = c.value.findIndex((S) => S.path === h);
      if (u === -1 || (c.value.splice(u, 1), !r.value || t.path !== h))
        return;
      const A = ((_a = c.value[u] || c.value[u - 1]) == null ? void 0 : _a.path) || a.homePath;
      l.push(A);
    };
    return watch(
      () => r.value ? t.path : "__no_router__",
      () => {
        d(), r.value && p(t);
      },
      { immediate: true }
    ), (h, u) => {
      const x = resolveComponent("el-tab-pane"), A = resolveComponent("el-tabs");
      return openBlock(), createElementBlock("div", Ke, [
        createVNode(A, {
          modelValue: i.value,
          "onUpdate:modelValue": u[0] || (u[0] = (S) => i.value = S),
          type: "card",
          class: "ursa-tags-tabs",
          onTabClick: w,
          onTabRemove: g
        }, {
          default: withCtx(() => [
            (openBlock(true), createElementBlock(Fragment, null, renderList(c.value, (S) => (openBlock(), createBlock(x, {
              key: S.path,
              label: S.title,
              name: S.path,
              closable: S.closable
            }, null, 8, ["label", "name", "closable"]))), 128))
          ]),
          _: 1
        }, 8, ["modelValue"])
      ]);
    };
  }
}), Je = /* @__PURE__ */ H(qe, [["__scopeId", "data-v-6a158b90"]]);
const _sfc_main = {
  __name: "SourceCodeViewer",
  __ssrInlineRender: true,
  props: {
    loadSource: {
      type: Function,
      required: true
    },
    language: {
      type: String,
      default: "vue"
    },
    buttonTextView: {
      type: String,
      default: "查看源代码"
    },
    buttonTextHide: {
      type: String,
      default: "隐藏源代码"
    },
    loadingText: {
      type: String,
      default: "源码加载中..."
    }
  },
  setup(__props) {
    const props = __props;
    ref("");
    const highlightedCode = ref("");
    ref(false);
    const sourceLoading = ref(false);
    const sourceOpen = ref(false);
    const copied = ref(false);
    const buttonTextComputed = computed(() => sourceOpen.value ? props.buttonTextHide : props.buttonTextView);
    return (_ctx, _push, _parent, _attrs) => {
      _push(`<details${ssrRenderAttrs(mergeProps({ class: "source-toggle" }, _attrs))} data-v-b186af90><summary data-v-b186af90>${ssrInterpolate(buttonTextComputed.value)}</summary>`);
      if (sourceLoading.value) {
        _push(`<div class="source-state" data-v-b186af90>${ssrInterpolate(__props.loadingText)}</div>`);
      } else {
        _push(`<div class="source-code-wrap" data-v-b186af90><button class="copy-btn" type="button" title="复制" data-v-b186af90>${ssrInterpolate(copied.value ? "已复制" : "复制")}</button><pre class="source-code" data-v-b186af90><code class="hljs" data-v-b186af90>${highlightedCode.value ?? ""}</code></pre></div>`);
      }
      _push(`</details>`);
    };
  }
};
const _sfc_setup = _sfc_main.setup;
_sfc_main.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("components/shared/SourceCodeViewer.vue");
  return _sfc_setup ? _sfc_setup(props, ctx) : void 0;
};
const SourceCodeViewer = /* @__PURE__ */ _export_sfc(_sfc_main, [["__scopeId", "data-v-b186af90"]]);
export {
  Je as J,
  SourceCodeViewer as S,
  Te as T,
  Ve as V,
  je as j
};
