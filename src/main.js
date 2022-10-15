import { createApp } from "vue";
import { createPinia } from "pinia";
import axios from "axios";
import App from "./App.vue";
import router from "./router";

import "./assets/index.css";
import { useConfig } from "./stores/Config.js";

const app = createApp(App);
const pinia = createPinia();

app.use(pinia);
app.use(router);
app.mount("#app");
const config = useConfig();
axios.defaults.baseURL = config.API_URL;
