import { ElMessageBox } from 'element-plus';
import { h } from 'vue';

const DEFAULT_CONFIRM_OPTIONS = {
    // 基础文案
    message: '你确定要执行该操作吗？',
    title: '提示',
    confirmButtonText: '确定',
    cancelButtonText: '取消',
    type: 'warning',
    // 勾选确认扩展项
    requireCheck: false,
    checkLabel: '我已阅读并确认',
    checked: false,
}

export function UrsaMessageBox(options = {}) {
    // 合并默认配置与调用方配置
    const {
        message,
        title,
        requireCheck,
        checkLabel,
        checked,
        customClass,
        ...config
    } = { ...DEFAULT_CONFIRM_OPTIONS, ...options }

    // 当前勾选状态（控制“确定”按钮是否可用）
    let isChecked = Boolean(checked)
    const messageBoxClass = 'ursa-message-box-with-check'

    // 根据勾选状态切换“确定”按钮的 disabled 状态
    const setConfirmDisabled = (disabled) => {
        const confirmBtn = document.querySelector(`.${messageBoxClass} .el-message-box__btns .el-button--primary`)
        if (!confirmBtn) return
        confirmBtn.disabled = disabled
        confirmBtn.classList.toggle('is-disabled', disabled)
    }

    // 开启 requireCheck 时，在弹窗左下角渲染勾选区域
    // 通过 vue 的内置函数 h，构建 VNode
    const content = requireCheck
        ? h('div', [
            h('div', message),
            h('div', { class: 'ursa-message-box-check' }, [
                h('label', { class: 'ursa-message-box-check-wrap' }, [
                    h('input', {
                        type: 'checkbox',
                        checked: isChecked,
                        onChange: (event) => {
                            isChecked = Boolean(event?.target?.checked)
                            setConfirmDisabled(!isChecked)
                        },
                    }),
                    h('span', checkLabel),
                ]),
            ]),
        ])
        : message

    const promise = ElMessageBox.confirm(content, title, {
        ...config,
        customClass: [messageBoxClass, customClass].filter(Boolean).join(' ')
    })

    // 弹窗挂载后同步一次初始按钮状态，等弹窗真实渲染到 DOM 之后，再去禁用确定按钮
    if (requireCheck) {
        setTimeout(() => setConfirmDisabled(!isChecked), 0)
    }

    return promise
        .then(() => true)
        .catch(() => false)
}

