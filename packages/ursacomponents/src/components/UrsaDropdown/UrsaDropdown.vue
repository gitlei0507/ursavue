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
    const emit = defineEmits(['command'])

    const props = defineProps({
        btnName: {
            type: String,
            default: '更多操作'
        }
    })

    const handleMoreActionCommand = (command) => {
        emit('command', command)
    }
</script>

<style scoped>

    .more-action-dropdown {
        margin-left: 12px;
    }

    .more-action-dropdown .el-button {
        width: 100px;
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