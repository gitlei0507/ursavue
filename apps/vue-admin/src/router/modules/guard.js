// 默认从用户信息中读取菜单列表。
const defaultGetMenus = (store) => store?.userInfo?.menus || []
// 默认从 store 中读取“是否已加载过动态路由”标记。
const defaultHasLoadedRoutes = (store) => Boolean(store?.hasLoadedAsyncRoutes)
// 默认写入“已加载动态路由”标记。
const defaultSetLoadedRoutes = (store, loaded) => {
    if (typeof store?.setHasLoadedAsyncRoutes === 'function') {
        store.setHasLoadedAsyncRoutes(loaded)
    }
}

// 注册前置守卫：处理登录校验、动态路由注入与缺失菜单兜底。
export const setupUrsaRouterGuard = (router, options = {}) => {
    const {
        getToken = () => null,
        loginPath = '/login',
        getUserStore = () => null,
        getMenus = defaultGetMenus,
        hasLoadedRoutes = defaultHasLoadedRoutes,
        setLoadedRoutes = defaultSetLoadedRoutes,
        initDynamicRoutes,
        initDynamicRoutesOptions = {},
        shouldLoadRoutes,
        onMissingMenus,
        debug = false
    } = options


    // 基础参数校验：必须传入可用 router 实例。
    if (!router || typeof router.beforeEach !== 'function') {
        throw new Error('[admin-router] setupUrsaRouterGuard 需要有效的 router 实例')
    }

    // 必须提供动态路由初始化方法。
    if (typeof initDynamicRoutes !== 'function') {
        throw new Error('[admin-router] setupUrsaRouterGuard 需要 initDynamicRoutes 方法')
    }

    return router.beforeEach((to, from, next) => {
        if (debug) {
            console.log('[admin-router] 导航到:', to.path, '路由名称:', to.name)
        }

        // 登录页放行，避免登录页被二次拦截。
        if (to.path === loginPath) {
            next()
            return
        }

        // 无 token 则跳转登录。
        const token = typeof getToken === 'function' ? getToken() : null
        if (!token) {
            next(loginPath)
            return
        }

        const userStore = typeof getUserStore === 'function' ? getUserStore() : null

        const alreadyLoaded = hasLoadedRoutes(userStore)

        // 判断是否需要加载动态路由：可由外部自定义，也可走默认判定。
        // 注意：to.matched.length === 0 仅在「尚未加载」时才触发重新注册。
        // 若已完成一次加载但路由仍为空（组件路径配置错误导致注册失败），
        // 不能再次进入加载流程，否则会因无限 next({ replace: true }) 陷入死循环。
        const needLoadRoutes = typeof shouldLoadRoutes === 'function'
            ? shouldLoadRoutes({ to, from, router, userStore })
            : !alreadyLoaded || (to.name ? !router.hasRoute(to.name) : false)

        if (debug) {
            console.log('[admin-router] needLoadRoutes:', needLoadRoutes, 'alreadyLoaded:', alreadyLoaded)
        }

        // 已完成加载但目标路由仍不存在（组件配置错误 / 越权访问）
        // 此时直接兜底跳转，避免死循环。
        if (alreadyLoaded && to.matched.length === 0) {
            if (debug) {
                console.warn('[admin-router] 路由注册失败或无权访问，跳转兜底路径:', to.path)
            }
            const { notFoundPath = '/', onRouteNotFound } = options
            if (typeof onRouteNotFound === 'function') {
                const fallback = onRouteNotFound({ to, from, router, userStore })
                if (fallback) {
                    next(fallback)
                    return
                }
            }
            next(notFoundPath)
            return
        }

        if (!needLoadRoutes) {
            next()
            return
        }

        // 读取菜单并初始化动态路由。
        const menus = typeof getMenus === 'function' ? getMenus(userStore, to, from) : []
        if (Array.isArray(menus) && menus.length > 0) {
            initDynamicRoutes(router, menus, initDynamicRoutesOptions)
            if (typeof setLoadedRoutes === 'function') {
                setLoadedRoutes(userStore, true)
            }
            // replace 避免重复历史记录，并让新注入路由立即生效。
            next({ ...to, replace: true })
            return
        }

        if (debug) {
            console.warn('[admin-router] 没有菜单数据，跳转登录页')
        }

        // 菜单缺失时允许外部提供兜底跳转策略。
        if (typeof onMissingMenus === 'function') {
            const fallback = onMissingMenus({ to, from, router, userStore })
            if (fallback) {
                next(fallback)
                return
            }
        }

        next(loginPath)
    })
}
