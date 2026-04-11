// 统一导出，其他文件只需要 import {xxx} from '@/router/modules'

export { setupUrsaRouterGuard } from './guard'
export { getUrsaMenuIcon } from './icon'
export { buildMenuTree, flattenMenus, getFirstMenuPath } from './menu'
export { normalizeViewPath } from './path'
export { createMenuRouteMapper } from './route-mapper'
export { createUrsaMenuRouterToolkit } from './toolkit'
export { createViewResolver } from './view-resolver'

