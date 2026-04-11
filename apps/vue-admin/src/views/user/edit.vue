<template>
    <div class="user-edit-page">
        <el-card class="user-edit-card" shadow="never">
            <template #header>
                <div class="card-header">
                    <span>编辑用户</span>
                    <div>
                        <el-button @click="goBack">关闭</el-button>
                        <el-button type="primary" :loading="submitLoading" @click="submitForm">
                            {{ submitLoading ? '提交中...' : '保存' }}
                        </el-button>
                    </div>
                </div>
            </template>

            <el-form ref="userFormRef" :model="userForm" :rules="rules" label-width="90px">
                <el-form-item label="ID" prop="id" v-show="false">
                    <el-input v-model="userForm.id" />
                </el-form-item>

                <el-form-item label="用户ID" prop="uid">
                    <el-input v-model="userForm.uid" placeholder="请输入用户ID" clearable size="large" />
                </el-form-item>

                <el-form-item label="用户名" prop="username">
                    <el-input v-model="userForm.username" placeholder="请输入用户名" clearable size="large" />
                </el-form-item>

                <el-form-item label="密码" prop="password">
                    <el-input v-model="userForm.password" type="password" placeholder="请输入密码" show-password clearable
                        size="large" />
                </el-form-item>

                <el-form-item label="邮箱" prop="email">
                    <el-input v-model="userForm.email" placeholder="请输入邮箱地址" clearable size="large" />
                </el-form-item>

                <el-form-item label="角色" prop="role">
                    <el-select v-model="userForm.role" placeholder="请选择角色" style="width: 100%" size="large">
                        <el-option label="管理员" value="1" />
                        <el-option label="普通用户" value="2" />
                    </el-select>
                </el-form-item>
            </el-form>
        </el-card>
    </div>
</template>

<script setup>
    import { getUserById, updateUser } from '@/api/user'
    import { ElMessage } from 'element-plus'
    import { inject, onMounted, reactive, ref } from 'vue'
    import { useRoute } from 'vue-router'

    const route = useRoute()
    const closeCurrentTag = inject('closeCurrentTag')

    const userFormRef = ref()
    const submitLoading = ref(false)

    const userForm = reactive({
        id: '',
        uid: '',
        username: '',
        password: '',
        email: '',
        role: ''
    })

    const rules = {
        uid: [{ required: true, message: '请输入用户ID', trigger: 'blur' }],
        username: [{ required: true, message: '请输入用户名', trigger: 'blur' }],
        password: [{ required: true, message: '请输入密码', trigger: 'blur' }],
        email: [
            { required: true, message: '请输入邮箱', trigger: 'blur' },
            { type: 'email', message: '邮箱格式不正确', trigger: ['blur', 'change'] }
        ],
        role: [{ required: true, message: '请选择角色', trigger: 'change' }]
    }

    onMounted(async () => {
        // 通过 route.query.id 去请求详情
        const res = await getUserById(route.query.id)
        const data = res?.data ?? res
        //  res 怎么赋值给 userForm
        Object.assign(userForm, {
            id: data?.id ?? '',
            uid: data?.uid ?? '',
            username: data?.username ?? '',
            password: data?.password ?? '',
            email: data?.email ?? '',
            role: data?.role ?? ''
        })

    })

    async function submitForm() {
        const valid = await userFormRef.value?.validate().catch(() => false)
        if (!valid) return

        submitLoading.value = true
        try {
            const res = await updateUser(userForm)
            if (res == 1) {
                ElMessage.success('编辑用户成功')
                goBack()
            } else {
                ElMessage.error('编辑用户失败')
            }
        } catch (e) {
            ElMessage.error(`编辑用户失败：${e?.message || e}`)
        } finally {
            submitLoading.value = false
        }
    }

    function goBack() {
        closeCurrentTag()
    }
</script>

<style scoped>
    .user-edit-page {
        box-sizing: border-box;
        padding: 20px;
        height: 100%;
        min-height: 100%;
        display: flex;
        flex-direction: column;
    }

    .user-edit-card {
        flex: 1;
        /* 关键：占满剩余高度 */
        display: flex;
        flex-direction: column;
    }

    .card-header {
        display: flex;
        justify-content: space-between;
        align-items: center;
    }

    :deep(.el-card__body) {
        flex: 1;
    }
</style>
