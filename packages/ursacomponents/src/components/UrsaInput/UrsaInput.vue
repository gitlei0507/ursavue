<template>
    <el-input v-model="model[field.prop]" :placeholder="field.placeholder || `请输入${field.label || ''}`"
        :clearable="field.clearable ?? true" :class="field.class ?? props.source === 'form' ? '!w-full' : '!w-48'"
        :size="field.size ?? 'default'" :show-password="field.type === 'password'"
        :resize="field.type === 'textarea' ? 'none' : ''" :readonly="effectiveReadonly" :type="inputType"
        :rows="textAreaNum" v-bind="field.componentProps">
        <template v-if="field.icon" #prefix>
            <slot name="prefixIcon">
                <el-icon>
                    <component :is="field.icon" />
                </el-icon>
            </slot>
        </template>
    </el-input>
</template>

<script setup>
    import { computed } from 'vue';



    defineOptions({
        name: 'UrsaInput'
    })

    const props = defineProps({
        model: {
            type: Object,
            default: () => ({})
        },
        field: {
            type: Object,
            default: () => ({})
        },
        source: {
            type: String,
            default: 'form'
        },
        readonly: {
            type: Boolean,
            default: false
        }
    })

    const effectiveReadonly = computed(() => {
        return props.field.readonly ?? props.readonly
    })

    const inputType = computed(() => {
        if (props.field.type === 'password') return 'password'
        if (props.field.type === 'textarea') return 'textarea'
        return 'text'
    })

    const textAreaNum = computed(() => {
        if (props.field.type === 'textarea') {
            return props.field.rows ?? 3
        }
    })


</script>

<style scoped></style>