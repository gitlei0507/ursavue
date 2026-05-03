<template>
    <el-dropdown class="more-action-dropdown" popper-class="more-action-dropdown-menu"
        @command="handleMoreActionCommand">
        <el-button type="info">
            {{ btnName }}
            <el-icon class="el-icon--right">
                <ArrowDown />
            </el-icon>
        </el-button>
        <template #dropdown>
            <slot></slot>
        </template>
    </el-dropdown>
</template>

<script setup>
    const props = defineProps({
        btnName: {
            type: String,
            default: '更多操作'
        }
    })
</script>

<style scoped>

    .more-action-dropdown {
        margin-left: 12px;
    }

    .more-action-dropdown .el-button {
        width: 100px;
    }

    .more-action-dropdown .el-button--info {
        --el-button-border-color: #909399;
        --el-button-hover-bg-color: #7f8288;
        --el-button-hover-border-color: #7f8288;
        --el-button-active-bg-color: #6f7278;
        --el-button-active-border-color: #6f7278;
    }

    :global(.more-action-dropdown-menu .el-dropdown-menu) {
        width: 100px;
        min-width: 100px;
        box-sizing: border-box;
    }

    :global(.more-action-dropdown-menu .el-dropdown-menu__item) {
        width: 100px;
        min-width: 100px;
        box-sizing: border-box;
        justify-content: center;
    }
</style>