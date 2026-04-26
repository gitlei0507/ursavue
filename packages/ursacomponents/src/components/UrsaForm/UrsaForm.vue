<template>
    <el-dialog v-model="dialogVisible" :title="title" :width="width" :close-on-click-modal="closeOnClickModal"
        :destroy-on-close="destroyOnClose" :draggable="draggable" @open="emit('open')" @closed="emit('closed')">
        <el-form ref="formRef" :model="model" :rules="rules" :label-width="labelWidth" class="ursa-form">
            <template v-for="field in fields" :key="field.prop || field.label">
                <el-form-item v-if="!field.hidden" :label="field.label" :prop="field.prop">
                    <el-input v-if="field.type === 'input' || field.type === 'password'" v-model="model[field.prop]"
                        :type="field.type === 'password' ? 'password' : 'text'"
                        :placeholder="field.placeholder || `请输入${field.label || ''}`" :readonly="readonly"
                        :clearable="field.clearable ?? true" :show-password="field.type === 'password'"
                        :size="field.size ?? 'large'" v-bind="field.componentProps" />

                    <el-select v-else-if="field.type === 'select'" v-model="model[field.prop]"
                        :placeholder="field.placeholder || `请选择${field.label || ''}`" :disabled="readonly"
                        :size="field.size ?? 'large'" style="width: 100%" v-bind="field.componentProps">
                        <el-option v-for="option in field.options || []" :key="option.value" :label="option.label"
                            :value="option.value" />
                    </el-select>

                    <slot v-else name="field" :field="field" :model="model" :readonly="readonly" />
                </el-form-item>
            </template>
        </el-form>

        <template v-if="showFooter" #footer>
            <div class="dialog-footer">
                <el-button v-if="readonly" @click="dialogVisible = false" size="large">关闭</el-button>
                <template v-else>
                    <el-button @click="handleCancel" size="large">{{ cancelText }}</el-button>
                    <el-button type="primary" :loading="loading" @click="handleSubmit" size="large">
                        {{ loading ? loadingText : submitText }}
                    </el-button>
                </template>
            </div>
        </template>
    </el-dialog>
</template>

<script setup>
    import { computed, ref } from 'vue'

    defineOptions({
        name: 'UrsaForm'
    })

    // 接收表单配置
    const props = defineProps({
        // 弹窗显示状态
        modelValue: {
            type: Boolean,
            default: false
        },
        // 弹窗标题
        title: {
            type: String,
            default: '表单'
        },
        // 弹窗宽度
        width: {
            type: String,
            default: '560px'
        },
        // 表单标签宽度
        labelWidth: {
            type: String,
            default: '90px'
        },
        // 表单数据模型对象
        model: {
            type: Object,
            default: () => ({})
        },
        // 字段配置数组，用于决定表单项渲染内容
        fields: {
            type: Array,
            default: () => []
        },
        // Element Plus 表单校验规则
        rules: {
            type: Object,
            default: () => ({})
        },
        // 只读模式（true 时禁用编辑）
        readonly: {
            type: Boolean,
            default: false
        },
        // 提交按钮 loading 状态
        loading: {
            type: Boolean,
            default: false
        },
        // 是否显示底部操作区
        showFooter: {
            type: Boolean,
            default: true
        },
        // 提交按钮文本
        submitText: {
            type: String,
            default: '确定'
        },
        // 取消按钮文本
        cancelText: {
            type: String,
            default: '取消'
        },
        // 提交中按钮文本
        loadingText: {
            type: String,
            default: '提交中...'
        },
        // 点击遮罩是否可关闭弹窗
        closeOnClickModal: {
            type: Boolean,
            default: false
        },
        // 关闭时是否销毁表单内容
        destroyOnClose: {
            type: Boolean,
            default: true
        },
        // 是否允许拖拽弹窗
        draggable: {
            type: Boolean,
            default: true
        }
    })

    const emit = defineEmits(['update:modelValue', 'submit', 'cancel', 'open', 'closed'])
    const formRef = ref(null)

    // 统一用计算属性承接 v-model，内部关闭弹窗时同步通知父组件。
    const dialogVisible = computed({
        get: () => props.modelValue,
        set: (value) => emit('update:modelValue', value)
    })

    // 对外统一校验入口，返回布尔值，便于父组件直接判断提交条件。
    const validate = async () => {
        if (!formRef.value) {
            return false
        }
        return await formRef.value.validate().catch(() => false)
    }

    const clearValidate = () => {
        formRef.value?.clearValidate?.()
    }

    const handleCancel = () => {
        dialogVisible.value = false
        emit('cancel')
    }

    const handleSubmit = async () => {
        const valid = await validate()
        if (!valid) {
            return
        }
        emit('submit')
    }

    // 暴露给父组件的能力
    defineExpose({
        validate,
        clearValidate
    })
</script>

<style scoped>
    .ursa-form {
        padding: 10px 20px 0;
    }

    .dialog-footer {
        display: flex;
        justify-content: flex-end;
        gap: 12px;
    }
</style>
