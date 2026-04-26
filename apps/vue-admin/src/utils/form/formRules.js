// 规则生成器
export function createRules(ruleConfigs) {
    const rules = {}

    Object.entries(ruleConfigs).forEach(([field, config]) => {
        const fieldRules = []

        // 处理 required
        if (config.required) {
            const message = typeof config.required === 'string'
                ? config.required
                : `请输入${field}` // 默认提示
            fieldRules.push({
                required: true,
                message,
                trigger: config.trigger || 'blur'
            })
        }

        // 处理内置类型规则 (email, url, date, number 等)
        const builtInTypes = ['email', 'url', 'date', 'number', 'integer', 'float']
        builtInTypes.forEach(type => {
            if (config[type]) {
                fieldRules.push({
                    type,
                    message: typeof config[type] === 'string'
                        ? config[type]
                        : `${field}格式不正确`,
                    trigger: ['blur', 'change']
                })
            }
        })

        // 处理 min / max (用于字符串长度或数字)
        if (config.min !== undefined) {
            fieldRules.push({
                min: config.min,
                message: config.minMessage || `长度不能少于 ${config.min} 位`,
                trigger: 'blur'
            })
        }
        if (config.max !== undefined) {
            fieldRules.push({
                max: config.max,
                message: config.maxMessage || `长度不能超过 ${config.max} 位`,
                trigger: 'blur'
            })
        }

        // 自定义校验器
        if (config.validator) {
            fieldRules.push({
                validator: config.validator,
                trigger: config.validatorTrigger || 'blur'
            })
        }

        rules[field] = fieldRules
    })

    return rules
}