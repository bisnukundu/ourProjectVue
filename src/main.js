import { createApp } from "vue";
import { createPinia } from "pinia";

import App from "./App.vue";
import router from "./router";

import "./assets/index.css";

const app = createApp(App);
app.use(createPinia());
app.use(router);
app.mount("#app");
app.config.globalProperties.api_base_url = "http://127.0.0.1:8000/api";
