<template>
    <div class="ursa-tags-view">
        <el-tabs v-model="activeTab" type="card" class="ursa-tags-tabs" @tab-click="handleTabClick"
            @tab-remove="handleTabRemove">
            <el-tab-pane v-for="tab in tabs" :key="tab.path" :label="tab.title" :name="tab.path"
                :closable="tab.closable" />
        </el-tabs>
    </div>
</template>

<script setup>
    import { computed, inject, ref, watch } from 'vue'
    import { routeLocationKey, routerKey } from 'vue-router'

    defineOptions({
        name: 'UrsaTagsView'
    })

    const props = defineProps({
        homePath: {
            type: String,
            default: '/dashboard'
        },
        homeTitle: {
            type: String,
            default: '首页'
        }
    })

    // 无 router 场景（如文档示例）下注入结果为 null，组件自动降级为静态标签展示。
    const route = inject(routeLocationKey, null)
    const router = inject(routerKey, null)
    // 判断当前是否处于路由环境：
    // 业务系统中一般为 true，文档演示等无路由场景为 false。
    const hasRouter = computed(() => Boolean(route && router))

    const tabs = ref([])

    const activeTab = computed({
        // 路由模式下使用当前路径作为激活标签；
        // 无路由模式下回退到首个标签或首页路径。
        get: () => (hasRouter.value ? route.path : (tabs.value[0]?.path || props.homePath)),
        set: (val) => val
    })

    const createTab = (currentRoute) => ({
        path: currentRoute.path,
        title: currentRoute.meta?.title || currentRoute.name || currentRoute.path,
        closable: currentRoute.path !== props.homePath
    })

    const ensureHomeTab = () => {
        // 保证首页标签始终存在，避免标签被关完后无可展示内容。
        const existed = tabs.value.some((tab) => tab.path === props.homePath)
        if (existed) {
            return
        }
        const homeRoute = hasRouter.value ? router.resolve(props.homePath) : null
        tabs.value.unshift(
            createTab({
                path: props.homePath,
                meta: { title: homeRoute?.meta?.title || props.homeTitle },
                name: homeRoute?.name || props.homeTitle
            })
        )
    }

    const addTabIfNotExists = (currentRoute) => {
        // 忽略无效路径与根路径占位，并避免重复添加同一路径标签。
        if (!currentRoute?.path || currentRoute.path === '/') {
            return
        }

        const existed = tabs.value.some((tab) => tab.path === currentRoute.path)
        if (!existed) {
            tabs.value.push(createTab(currentRoute))
        }
    }

    const handleTabClick = (tabPane) => {
        // 仅在路由可用时执行跳转，无路由时点击仅做展示交互。
        if (!hasRouter.value) {
            return
        }
        const targetPath = tabPane?.props?.name
        if (targetPath && targetPath !== route.path) {
            router.push(targetPath)
        }
    }

    const handleTabRemove = (targetPath) => {
        // 若关闭的是当前激活标签，按“右侧优先、其次左侧、最后首页”选择下一个目标页。
        const currentIndex = tabs.value.findIndex((tab) => tab.path === targetPath)
        if (currentIndex === -1) {
            return
        }

        tabs.value.splice(currentIndex, 1)

        if (!hasRouter.value || route.path !== targetPath) {
            return
        }

        const nextTab = tabs.value[currentIndex] || tabs.value[currentIndex - 1]
        const fallbackPath = nextTab?.path || props.homePath
        router.push(fallbackPath)
    }

    const closeCurrentTab = () => {
        // 没有路由时，默认关闭当前激活标签
        const targetPath = hasRouter.value ? route.path : activeTab.value
        console.log('targetPath', targetPath);

        if (!targetPath || targetPath === props.homePath) return
        handleTabRemove(targetPath)
    }


    watch(
        () => (hasRouter.value ? route.path : '__no_router__'),
        () => {
            // 路由变化时同步标签：
            // 先确保首页存在，再补充当前路由对应标签。
            ensureHomeTab()
            if (hasRouter.value) {
                addTabIfNotExists(route)
            }
        },
        { immediate: true }
    )


    defineExpose({
        closeCurrentTab
    })
</script>

<style scoped>
    .ursa-tags-view {
        border-bottom: 1px solid var(--el-border-color-light);
        background-color: #ffffff;
        padding: 0 16px;
    }

    :deep(.ursa-tags-tabs .el-tabs__header) {
        margin-bottom: 0;
    }

    :deep(.ursa-tags-tabs .el-tabs__nav-wrap::after) {
        height: 0;
    }
</style>
