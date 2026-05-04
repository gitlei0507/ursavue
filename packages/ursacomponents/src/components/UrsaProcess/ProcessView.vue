<template>
    <el-dialog v-model="dialogVisible" title="查看流程图" width="800px" @opened="initBpmn" @close="destroyBpmn">
        <div ref="canvas" class="bpmn-canvas"></div>
    </el-dialog>
</template>

<script setup>
    import BpmnViewer from 'bpmn-js/lib/Viewer';
    import { computed, nextTick, ref } from 'vue';

    import 'bpmn-js/dist/assets/bpmn-js.css';
    import 'bpmn-js/dist/assets/diagram-js.css';


    const props = defineProps({
        modelValue: {
            type: Boolean,
            default: false
        },
        xml: {
            type: String,
            default: ''
        }
    })

    const canvas = ref(null);
    let viewer = null;

    // 弹窗打开渲染 viewer
    async function initBpmn() {
        // 防止重复初始化
        if (viewer) destroyBpmn();

        // 等待 DOM 更新 (canvas 挂载)
        await nextTick();

        if (!canvas.value || !props.xml) {
            console.warn('Canvas 容器不存在或 XML 为空');
            return;
        }

        viewer = new BpmnViewer({
            container: canvas.value
        });

        console.log('xml', props.xml);


        try {
            const { warnings } = await viewer.importXML(props.xml);
            console.log('BPMN 渲染成功', warnings);

            const canvasModule = viewer.get('canvas');
            canvasModule.zoom('fit-viewport');
        } catch (err) {
            console.error('BPMN 渲染失败:', err);
        }
    }

    // 关闭时销毁 viewer
    function destroyBpmn() {
        if (viewer) {
            viewer.destroy();
            viewer = null;
        }
    }

    const dialogVisible = computed({
        get: () => props.modelValue,
        set: (value) => emit('update:modelValue', value)
    })

</script>

<style scoped>
    .bpmn-canvas {
        width: 100%;
        height: 500px;
        border: 1px solid #ccc;
    }
</style>