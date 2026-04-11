import UrsaMenu from './components/UrsaMenu/UrsaMenu.vue'
import UrsaMenuItem from './components/UrsaMenu/UrsaMenuItem.vue'
import UrsaNavBar from './components/UrsaNavBar/UrsaNavBar.vue'
import UrsaSearch from './components/UrsaSearch/UrsaSearch.vue'
import UrsaTable from './components/UrsaTable/UrsaTable.vue'
import UrsaTagsView from './components/UrsaTagsView/UrsaTagsView.vue'
import './styles/tailwind.css'
export { UrsaMessageBox } from './utils/UrsaMessageBox'

// 组合式能力按需导出。
export { useUrsaMenu } from './components/UrsaMenu/useUrsaMenu'
export { useUrsaMenuItem } from './components/UrsaMenu/useUrsaMenuItem'
export { useUrsaSearch } from './components/UrsaSearch/useUrsaSearch'
export { useUrsaTable } from './components/UrsaTable/useUrsaTable'
// 组件按需导出。
export { UrsaMenu, UrsaMenuItem, UrsaNavBar, UrsaSearch, UrsaTable, UrsaTagsView }

// 全量安装时需要注册的组件列表。
const components = [UrsaSearch, UrsaTable, UrsaMenu, UrsaMenuItem, UrsaTagsView, UrsaNavBar]

// Vue 插件安装入口：一次性注册所有组件。
const install = (app) => {
    components.forEach((component) => {
        // 兼容 SFC 在不同构建场景下的 name 字段。
        app.component(component.name || component.__name, component)
    })
}

// 默认导出插件对象，支持 app.use(UrsaComponents)。
export default {
    install
}
