import "./assets/tailwind.css";
import "./assets/main.scss";
import { createApp } from "vue";
import { createPinia } from "pinia";
import PrimeVue from "primevue/config";
import ToastService from "primevue/toastservice";
import App from "./App.vue";
import router from "./router";
import ConfirmationService from "primevue/confirmationservice";
import { primeVueOptions } from "@/plugins/primeVueOptions.ts";
import { register } from "swiper/element/bundle";

const app = createApp(App);


app.use(createPinia());
app.use(router);
app.use(PrimeVue, primeVueOptions);
app.use(ToastService);
app.use(ConfirmationService);
register();
app.mount("#app");

