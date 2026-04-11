import vue from '@vitejs/plugin-vue'
import { resolve } from 'node:path'
import { fileURLToPath } from 'node:url'
import { defineConfig } from 'vite'

const __dirname = fileURLToPath(new URL('.', import.meta.url))

export default defineConfig({
    plugins: [vue()],
    build: {
        lib: {
            entry: resolve(__dirname, 'src/index.js'),
            name: 'UrsaComponents',
            fileName: (format) => `ursacomponents.${format}.js`,
            formats: ['es', 'umd']
        },
        rollupOptions: {
            external: ['vue', 'vue-router', 'element-plus', '@element-plus/icons-vue'],
            output: {
                exports: 'named',
                globals: {
                    vue: 'Vue',
                    'vue-router': 'VueRouter',
                    'element-plus': 'ElementPlus',
                    '@element-plus/icons-vue': 'ElementPlusIconsVue'
                }
            }
        }
    }
})
