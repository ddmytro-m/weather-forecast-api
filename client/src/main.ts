import { createApp } from "vue"
import "./assets/main.css"
import App from "./App.vue"
import ToastPlugin from "vue-toast-notification"
import "vue-toast-notification/dist/theme-default.css"

createApp(App).use(ToastPlugin).mount("#app")
