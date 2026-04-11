/// <reference path="./types.d.ts" />

import type { EnhanceAppContext, Theme } from 'vitepress'
import DefaultTheme from 'vitepress/theme'
import ElementPlus from 'element-plus'
import 'element-plus/dist/index.css'
import 'ursacomponents/style.css'
import ImagePreview from '../../components/shared/ImagePreview.vue'

export default <Theme>{
  extends: DefaultTheme,
  enhanceApp({ app }: EnhanceAppContext) {
    app.use(ElementPlus)
    app.component('ImagePreview', ImagePreview)
  },
}
