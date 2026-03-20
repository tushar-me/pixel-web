
// import 'swiper/css';
// import 'swiper/css/scrollbar';
// import 'swiper/css/navigation';

// import AppLayout from "@/components/Layouts/AppLayout.vue";
// import { createApp } from 'vue'
// import { createPinia } from 'pinia'
// import App from './App.vue'
// import { vueLaravelSanctum } from 'vue-laravel-sanctum';
// import router from './router'
// import Icon from "@/components/Icon.vue"
// import Container from "@/components/Container.vue"
// import VSelect from "vue-select";
// import "vue-select/dist/vue-select.css";
// import { createDataProvider } from '@/plugins/dataProvider.js';
// const dataProvider = createDataProvider();
// import 'vue3-toastify/dist/index.css';
// import PrimeVue from 'primevue/config';
// import Aura from '@primevue/themes/aura';
// import './assets/css/main.css'
// import 'primeicons/primeicons.css'

// const authConfig = {
//     apiURL: import.meta.env.VITE_APP_URL,
//     endpoints: {
//         csrf: '/sanctum/csrf-cookie',
//         login: '/api/customer/login',
//         logout: '/logout',
//         user: '/api/user',
//     },
// };

// createApp(App)
//     .use(PrimeVue, {
//      theme: {
//       preset: Aura
//      }
//     })
//     .use(PrimeVue)
//     .use(router)
//     .use(createPinia())
//     .use(vueLaravelSanctum, authConfig)
//     .provide('data', dataProvider.data)
//     .component('AppLayout', AppLayout)
//     .component('Container', Container)
//     .component("Select", VSelect)
//     .component('Icon', Icon)
//     .mount('#app')

import 'swiper/css';
import 'swiper/css/scrollbar';
import 'swiper/css/navigation';

import AppLayout from "@/components/Layouts/AppLayout.vue";
import { createApp } from 'vue'
import { createPinia } from 'pinia'
import App from './App.vue'
import { vueLaravelSanctum } from 'vue-laravel-sanctum';
import router from './router'
import Icon from "@/components/Icon.vue"
import Container from "@/components/Container.vue"
import VSelect from "vue-select";
import "vue-select/dist/vue-select.css";
import { createDataProvider } from '@/plugins/dataProvider.js';
const dataProvider = createDataProvider();
import 'vue3-toastify/dist/index.css';
import PrimeVue from 'primevue/config';
import Aura from '@primevue/themes/aura';
import './assets/css/main.css'
import 'primeicons/primeicons.css'
import axios from 'axios';

const authConfig = {
    apiURL: import.meta.env.VITE_APP_URL,
    endpoints: {
        csrf: '/sanctum/csrf-cookie',
        login: '/api/customer/login',
        logout: '/logout',
        user: '/api/user',
    },
};

const app = createApp(App)
    .use(PrimeVue, { theme: { preset: Aura } })
    .use(router)
    .use(createPinia())
    .use(vueLaravelSanctum, authConfig)
    .provide('data', dataProvider.data)
    .component('AppLayout', AppLayout)
    .component('Container', Container)
    .component("Select", VSelect)
    .component('Icon', Icon)
    .mount('#app');

async function pushUserToGTM() {
    try {
        const storedUser = JSON.parse(localStorage.getItem('user'));
        if (!storedUser?.token) return; // No logged-in user, skip silently

        const res = await axios.get(authConfig.apiURL + authConfig.endpoints.user, {
            headers: { Authorization: `Bearer ${storedUser.token}` }
        });
        const user = res.data;
        if (user && user.id) {
            window.dataLayer = window.dataLayer || [];
            window.dataLayer.push({
                event: 'customerDataReady',
                customerId: user.id,
                customerName: user.name,
                customerEmailHash: await sha256(user.email)
            });
        }
    } catch (e) {
        console.warn('GTM user data not pushed', e);
    }
}

async function sha256(message) {
    const msgBuffer = new TextEncoder().encode(message);
    const hashBuffer = await crypto.subtle.digest('SHA-256', msgBuffer);
    const hashArray = Array.from(new Uint8Array(hashBuffer));
    return hashArray.map(b => b.toString(16).padStart(2, '0')).join('');
}

pushUserToGTM();

router.afterEach((to) => {
    window.dataLayer = window.dataLayer || [];
    window.dataLayer.push({
        event: 'page_view',
        page_path: to.fullPath
    });
});

document.addEventListener('click', (e) => {
    const el = e.target.closest('.track-click'); 
    if (!el) return;

    window.dataLayer = window.dataLayer || [];
    window.dataLayer.push({
        event: 'button_click',
        button_text: el.innerText || el.value || '',
        button_id: el.id || '',
        button_classes: el.className || '',
    });
});
