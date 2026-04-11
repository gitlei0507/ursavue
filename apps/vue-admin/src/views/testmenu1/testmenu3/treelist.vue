<template>
    <div class="tree-page">

        <!-- 左侧树 -->
        <div class="tree-panel">
            <div class="tree-header">
                <span class="tree-title">类型</span>
                <el-icon class="refresh-icon" @click="handleRefreshTree">
                    <RefreshRight />
                </el-icon>
            </div>


            <div class="tree-body">
                <el-tree ref="treeRef" :data="treeData" node-key="id" :props="treeProps"
                    :default-expanded-keys="defaultExpandedKeys" highlight-current @node-click="handleNodeClick"
                    @node-expand="handleNodeExpand" @node-collapse="handleNodeCollapse" :expand-on-click-node="false">
                    <template #default="{ data }">
                        <span class="node-row">
                            <el-icon class="node-icon">
                                <FolderOpened v-if="data.isFolderOpened" />
                                <Document v-else />
                            </el-icon>
                            <span class="node-label">{{ data.label }}</span>
                        </span>
                    </template>
                </el-tree>
            </div>
        </div>

        <!-- 右侧列表 -->
        <div class="right-pane">
            <UserList ref="userListRef" />
        </div>
    </div>
</template>

<script setup>
    import UserList from '@/views/user/list.vue'
    import { Document, FolderOpened } from '@element-plus/icons-vue'
    import { computed, ref } from 'vue'

    const treeRef = ref(null)
    const userListRef = ref(null)
    const currentNodeId = ref('')

    // 用于存放展开的节点
    const expandedKeySet = ref(new Set(['root']))


    const treeProps = {
        children: 'children',
        label: 'label'
    }

    const treeData = ref([
        {
            id: 'root',
            label: '资产类型',
            isFolderOpened: true,
            children: [
                {
                    id: 'camera',
                    label: '网络设备',
                    isFolderOpened: true,
                    children: [
                        { id: 'networkcamera', label: '网络摄像机', isFolderOpened: false },
                        { id: 'networkdisk', label: '网络硬盘录像机', isFolderOpened: false }
                    ]
                },
                { id: 'security', label: '安全设备', isFolderOpened: true }
            ]
        }
    ])

    // 只默认展开第1级（根节点）
    const defaultExpandedKeys = computed(() => Array.from(expandedKeySet.value))

    // 除根节点外，其它节点点击后联动右侧列表
    function handleNodeClick(data, node) {
        if (node.level === 1) return
        // 记录当前点击的节点ID
        currentNodeId.value = data.id
        alert('获取节点ID：' + data.id)

        // 扩展 refresh，传入筛选条件
        // 伪代码：userListRef.value.refresh({id: xx})
        userListRef.value.refresh()
    }

    // 监听展开事件，记录节点ID
    function handleNodeExpand(data) {
        expandedKeySet.value.add(data.id)
    }

    // 监听收起事件，记录节点ID
    function handleNodeCollapse(data) {
        expandedKeySet.value.delete(data.id)
    }


    // 刷新树
    async function handleRefreshTree() {
        // 调用接口，请求新树数据
        // 模拟在根节点下新增一个
        const newNode = {
            id: 'computer', label: '计算机设备', isFolderOpened: true
        }
        const root = treeData.value[0]
        root.children.push(newNode)
        // treeData.value = [...treeData.value]

        // 恢复之前选中的节点
        await nextTick()
        if (currentNodeId.value) {
            treeRef.value.setCurrentKey(currentNodeId.value)
        }
    }

</script>

<style scoped>
    .tree-page {
        height: 100%;
        min-height: 0;
        background: #f5f6f8;
        padding: 12px;
        box-sizing: border-box;
        display: flex;
        gap: 12px;
    }

    .tree-panel {
        width: 260px;
        height: 100%;
        border: 1px solid #dcdfe6;
        background: #fafafa;
        display: flex;
        flex-direction: column;
        flex-shrink: 0;
    }

    .tree-body {
        flex: 1;
        min-height: 0;
        overflow: auto;
        padding: 10px;
    }

    .right-pane {
        flex: 1;
        min-width: 0;
        min-height: 0;
        overflow: auto;
        background: #fff;
        border: 1px solid #dcdfe6;
    }

    .node-row {
        display: inline-flex;
        align-items: center;
        gap: 6px;
    }

    .node-icon {
        color: blue;
    }

    .node-label {
        color: #303133;
    }

    .tree-header {
        height: 38px;
        padding: 0 10px;
        border-bottom: 1px solid #e4e7ed;
        background: #fff;
        display: flex;
        align-items: center;
        justify-content: space-between;
    }

    .tree-title {
        font-size: 14px;
        color: #303133;
    }

    .refresh-icon {
        font-size: 16px;
        color: #909399;
        cursor: pointer;
    }

    .refresh-icon:hover {
        color: #409eff;
    }
</style>
