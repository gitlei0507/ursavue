declare module '*.vue' {
    import type { DefineComponent } from 'vue'
    const component: DefineComponent<Record<string, unknown>, Record<string, unknown>, any>
    export default component
}

declare module '*.css'
declare module 'element-plus/dist/index.css'
declare module 'ursacomponents/style.css'
