import App from './App.vue'
import { createApp } from 'vue'
import { createPinia } from 'pinia'
import {useLoginStore} from "@/Stores/LoginStore";
import {useClientStore} from "@/Stores/ClientStore";

const pinia = createPinia()

const vueApp = createApp(App)
    .use(pinia)

vueApp.config.globalProperties.$useLoginStore = useLoginStore
vueApp.config.globalProperties.$useClientStore = useClientStore

vueApp.mount('#app')