import { createApp } from "vue";
import { createPinia } from "pinia";
import axios from "axios";
import App from "./App.vue";
import router from "./router";
import ls from "localstorage-slim";

import "./assets/index.css";

import { useConfig } from "./composable/useConfig.js";
const config = useConfig();
ls.config.encrypt = true;

const app = createApp(App);
const pinia = createPinia();

app.use(pinia);
app.use(router);
app.mount("#app");

axios.defaults.baseURL = config.API_URL;
