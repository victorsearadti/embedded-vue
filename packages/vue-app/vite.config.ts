import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import { resolve } from 'path'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [vue({
    customElement: true
  })],
  build: {
    lib: {
      entry: resolve(__dirname, 'src/widget.ts'),
      name: "Widget",
      fileName: "widget/index", 
    },   
  }, 
  define: {
    'process.env.NODE_ENV': '"production"'
  }, 
})
 