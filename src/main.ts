import "./assets/main.scss";
import "./assets/tailwind.css";

import { createApp } from "vue";
import { createPinia } from "pinia";
import PrimeVue from "primevue/config";
import ToastService from "primevue/toastservice";
import Aura from "@primevue/themes/aura";
import App from "./App.vue";
import router from "./router";

// import function to register Swiper custom elements
import { register } from 'swiper/element/bundle';
// register Swiper custom elements
register();

import ConfirmationService from "primevue/confirmationservice";

const app = createApp(App);



app.use(createPinia());
app.use(router);
app.use(PrimeVue, {
    theme: {
        preset: Aura,
        options: {
            darkModeSelector: ".app-dark",
        },
    },
});
app.use(ToastService);
app.use(ConfirmationService);

app.mount("#app");
