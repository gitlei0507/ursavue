<template>
    <el-input v-model="model[field.prop]" :placeholder="field.placeholder || `请输入${field.label || ''}`"
        :clearable="field.clearable ?? true" :class="field.class ?? props.source === 'form' ? '!w-full' : '!w-48'"
        :size="field.size ?? 'default'" :show-password="field.type === 'password'" :readonly="readonly"
        :type="field.type === 'password' ? 'password' : 'text'" v-bind="field.componentProps">
        <template v-if="field.icon" #prefix>
            <slot name="prefix">
                <el-icon>
                    <component :is="field.icon" />
                </el-icon>
            </slot>
        </template>
    </el-input>
</template>

<script setup>


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


</script>

<style scoped></style>