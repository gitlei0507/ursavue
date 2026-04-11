import { computed } from 'vue';
import { useRouter } from 'vue-router';
import { UrsaMessageBox } from '../../utils/UrsaMessageBox';

export function useUrsaNavBar(userStore, useAuth) {
    const router = useRouter()

    const userInfo = computed(() => userStore?.userInfo || { username: '', avatar: '', role: 0 })

    const authApi = typeof useAuth === 'function' ? (useAuth() || {}) : {}
    const removeToken = typeof authApi.removeToken === 'function' ? authApi.removeToken : () => { }
    const removeUserInfo = typeof userStore?.removeUserInfo === 'function' ? userStore.removeUserInfo : () => { }

    const showRole = computed(() => {
        return userInfo.value.role == 1 ? '系统管理员' : '普通用户'
    })

    // 注销
    async function logout() {
        const confirmed = await UrsaMessageBox({
            message: '你确定要注销吗？',
        })

        if (!confirmed) {
            return
        }

        // 移除 token
        removeToken()
        // 移除 pinia 中用户信息
        removeUserInfo()
        // 跳转到登录页
        router.push('/login')
    }

    return {
        userInfo,
        showRole,
        logout
    }
}
