/// <reference path="./types.d.ts" />

import ElementPlus, { ID_INJECTION_KEY, ZINDEX_INJECTION_KEY } from 'element-plus'
import 'element-plus/dist/index.css'
import 'ursacomponents/style.css'
import type { EnhanceAppContext, Theme } from 'vitepress'
import DefaultTheme from 'vitepress/theme'
import ImagePreview from '../../components/shared/ImagePreview.vue'

export default <Theme>{
  extends: DefaultTheme,
  enhanceApp({ app }: EnhanceAppContext) {
    app.provide(ID_INJECTION_KEY, {
      prefix: 1024,
      current: 0,
    })
    app.provide(ZINDEX_INJECTION_KEY, {
      current: 0,
    })
    app.use(ElementPlus)
    app.component('ImagePreview', ImagePreview)
  },
}
