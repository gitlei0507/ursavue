<template>
    <el-aside :width="asideWidth" class="ursa-menu-aside">
        <div v-if="title && !collapse" class="ursa-menu-title">{{ title }}</div>

        <el-menu class="el-menu-vertical-demo" :router="router" :default-active="defaultActive" :collapse="collapse"
            :collapse-transition="false" background-color="#000000" text-color="#ffffff" active-text-color="#ffd04b"
            @open="handleOpen" @close="handleClose">
            <UrsaMenuItem v-for="menu in visibleMenus" :key="menu.path" :menu="menu" :default-title="defaultTitle"
                :icon-resolver="iconResolver" />
        </el-menu>
    </el-aside>
</template>

<script setup>
    import { computed } from 'vue'
    import UrsaMenuItem from './UrsaMenuItem.vue'

    const emit = defineEmits(['open', 'close'])

    const props = defineProps({
        menus: {
            type: Array,
            default: () => []
        },
        defaultActive: {
            type: String,
            default: ''
        },
        title: {
            type: String,
            default: '管理系统后台'
        },
        asideWidth: {
            type: String,
            default: '200px'
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
            default: '未命名菜单'
        },
        iconResolver: {
            type: Function,
            default: undefined
        }
    })

    // 通过计算属性，当开启过滤隐藏菜单功能时，进行过滤
    const visibleMenus = computed(() => {
        if (!Array.isArray(props.menus)) {
            return []
        }
        if (!props.filterHidden) {
            return props.menus
        }
        return props.menus.filter((menu) => !menu?.hidden)
    })

    const handleOpen = (key, keyPath) => {
        emit('open', key, keyPath)
    }

    const handleClose = (key, keyPath) => {
        emit('close', key, keyPath)
    }
</script>

<style>
    .ursa-menu-aside {
        background-color: #000000;
    }

    .el-menu-vertical-demo:not(.el-menu--collapse) {
        width: 100%;
        min-height: 400px;
    }

    .ursa-menu-aside .el-menu,
    .ursa-menu-aside .el-menu--collapse {
        transition: none !important;
    }

    .ursa-menu-title {
        color: #ffffff;
        background-color: #000000;
        height: 56px;
        display: flex;
        align-items: center;
        justify-content: center;
        font-weight: 600;
    }
</style>