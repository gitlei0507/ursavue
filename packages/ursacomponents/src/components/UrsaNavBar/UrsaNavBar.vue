<template>
    <el-header class="border-b flex items-center justify-between px-4 bg-white">
        <slot name="content">
            <slot name="left">
                <template v-if="showMenuToggle">
                    <el-tooltip :content="menuCollapsed ? expandMenuText : collapseMenuText" placement="right"
                        effect="dark">
                        <el-icon class="menu-toggle-icon" @click="emit('toggle-menu-collapse')">
                            <Expand v-if="menuCollapsed" />
                            <Fold v-else />
                        </el-icon>
                    </el-tooltip>
                </template>
            </slot>

            <slot name="right">
                <div class="ml-auto flex items-center gap-2">
                    <el-avatar :size="30" :src="user.avatar" />
                    <span class="text-sm">{{ usernameLabel }}：{{ user.username || '-' }}</span>
                    <span class="text-sm">{{ roleLabel }}：{{ roleDisplayText }}</span>
                    <el-button type="danger" @click="emit('logout-click')">{{ logoutText }}</el-button>
                </div>
            </slot>
        </slot>
    </el-header>
</template>

<script setup>
    import { Expand, Fold } from '@element-plus/icons-vue'
    import { computed } from 'vue'

    const emit = defineEmits(['toggle-menu-collapse', 'logout-click'])

    const props = defineProps({
        menuCollapsed: {
            type: Boolean,
            default: false,
        },
        showMenuToggle: {
            type: Boolean,
            default: true,
        },
        user: {
            type: Object,
            default: () => ({ username: '', avatar: '', role: '' }),
        },
        roleText: {
            type: String,
            default: '',
        },
        usernameLabel: {
            type: String,
            default: '用户',
        },
        roleLabel: {
            type: String,
            default: '角色',
        },
        logoutText: {
            type: String,
            default: '注销',
        },
        expandMenuText: {
            type: String,
            default: '展开菜单',
        },
        collapseMenuText: {
            type: String,
            default: '折叠菜单',
        },
    })

    const roleDisplayText = computed(() => {
        if (props.roleText) {
            return props.roleText
        }
        if (props.user?.role === undefined || props.user?.role === null || props.user?.role === '') {
            return '-'
        }
        return String(props.user.role)
    })

</script>

<style scoped>
    .menu-toggle-icon {
        cursor: pointer;
    }
</style>
