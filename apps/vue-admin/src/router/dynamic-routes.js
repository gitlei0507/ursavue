// 根据菜单数据动态生成并注册路由
import { createUrsaMenuRouterToolkit, getUrsaMenuIcon } from '@/router/modules';

// 扫描 views 下所有页面组件，按路径匹配菜单配置
// 示例：key：组件路径，value：懒加载函数
// {'/src/views/dashboard/index.vue': () => import('/src/views/dashboard/index.vue')}
const viewModules = import.meta.glob(['@/views/**/*.vue', '!@/views/login/index.vue'])

const { buildRoutesFromMenus, initDynamicRoutes, resolveComponent } = createUrsaMenuRouterToolkit({
    viewModules,
    viewsDir: '/src/views',
    debug: true
})

// 按需注入单一路由，适合按钮触发的页面跳转。
export const createDynamicRoute = (router, options = {}) => {
    const {
        parentRouteName = 'layout',
        path,
        name,
        viewPath,
        meta = {}
    } = options

    if (!router || typeof router.addRoute !== 'function' || typeof router.hasRoute !== 'function') {
        return null
    }

    if (!path || !viewPath) {
        return null
    }

    const normalizedPath = String(path).replace(/^\/+/, '')
    const routeName = name || normalizedPath.replace(/\//g, '_')

    if (!routeName || router.hasRoute(routeName)) {
        return null
    }

    const component = resolveComponent(viewPath)
    if (!component) {
        console.warn('未找到组件:', viewPath)
        return null
    }

    const route = {
        path: normalizedPath,
        name: routeName,
        component,
        meta: { title: routeName, ...meta }
    }

    router.addRoute(parentRouteName, route)
    return route
}

export { buildRoutesFromMenus, initDynamicRoutes };

// 根据图标名获取组件，未命中时使用默认图标
export const getMenuIcon = (iconName) => {
    return getUrsaMenuIcon(iconName)
}
