<script setup>
  import { UrsaSearch } from 'ursacomponents'
  import { ref } from 'vue'

  const searchForm = ref({
    name: '',
    status: '',
    cttime_start: ''
  })

  const fields = [
    {
      prop: 'name',
      label: '姓名',
      type: 'input',
      componentProps: {
        style: { width: '130px' }
      },
    },
    {
      prop: 'status',
      label: '状态',
      type: 'select',
      componentProps: {
        style: { width: '140px' }
      },
      options: [
        { label: '启用', value: 'enabled' },
        { label: '禁用', value: 'disabled' }
      ]
    }
  ]

  const handleSearch = () => {
    searched.value = true
  }

  const handleReset = () => {
    searched.value = false
  }
</script>

<template>
  <div>
    <UrsaSearch :model="searchForm" :fields="fields" @search="handleSearch" @reset="handleReset" />
  </div>
</template>

<style scoped></style>
