import { createApp } from 'vue'
import App from './App.vue';
import 'element-plus/dist/index.css'

createApp(App)
  .mount('#app')
  .$nextTick(() => {
    postMessage({ payload: 'removeLoading' }, '*')
  })
