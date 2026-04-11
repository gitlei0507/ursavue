<template>
    <el-header class="border-b flex items-center justify-between px-4 bg-white">
        <slot name="content">
            <div class="flex items-center gap-2">
                <slot name="left">
                    <template v-if="haveMenuCollapsedAbility">
                        <el-tooltip :content="menuCollapsed ? '展开菜单' : '折叠菜单'" placement="right" effect="dark">
                            <el-icon class="menu-toggle-icon" @click="emit('toggle-menu-collapse')">
                                <Expand v-if="menuCollapsed" />
                                <Fold v-else />
                            </el-icon>
                        </el-tooltip>
                    </template>
                </slot>
            </div>
            <div class="ml-auto flex items-center gap-2">
                <slot name="right" :user-info="mergedUserInfo" :show-role="mergedShowRole" :logout="handleLogout">
                    <el-avatar :size="30" :src="mergedUserInfo.avatar" />
                    <span class="text-sm">用户：{{ mergedUserInfo.username }}</span>
                    <span class="text-sm">角色：{{ mergedShowRole }}</span>
                    <el-button type="danger" @click="handleLogout">注销</el-button>
                </slot>
            </div>
        </slot>
    </el-header>
</template>

<script setup>
    import { Expand, Fold } from '@element-plus/icons-vue';
    import { computed } from 'vue';
    import { useUrsaNavBar } from './useUrsaNavBar';


    const emit = defineEmits(['toggle-menu-collapse', 'logout'])

    const props = defineProps({
        menuCollapsed: {
            type: Boolean,
            default: false
        },
        userInfo: {
            type: Object,
            default: () => ({
                username: '',
                avatar: '',
                role: 0
            })
        },
        roleTextResolver: {
            type: Function,
            default: undefined
        },
        onLogout: {
            type: Function,
            default: undefined
        },
        userStore: {
            type: Object,
            default: undefined
        },
        useAuth: {
            type: Function,
            default: undefined
        },
        haveMenuCollapsedAbility: {
            type: Boolean,
            default: true
        }
    })

    const { userStore, useAuth, roleTextResolver, onLogout } = props
    const { userInfo: legacyUserInfo, showRole: legacyShowRole, logout: legacyLogout } = useUrsaNavBar(userStore, useAuth)

    const mergedUserInfo = computed(() => {
        const hasLegacyStore = !!userStore
        return hasLegacyStore ? legacyUserInfo.value : props.userInfo
    })

    const mergedShowRole = computed(() => {
        if (typeof roleTextResolver === 'function') {
            return roleTextResolver(mergedUserInfo.value)
        }

        const hasLegacyStore = !!userStore
        return hasLegacyStore ? legacyShowRole.value : (mergedUserInfo.value.role == 1 ? '系统管理员' : '普通用户')
    })

    async function handleLogout() {
        if (typeof onLogout === 'function') {
            await onLogout()
        } else if (userStore || useAuth) {
            await legacyLogout()
        }

        emit('logout')
    }

</script>

<style scoped>
    .menu-toggle-icon {
        cursor: pointer;
    }
</style>
