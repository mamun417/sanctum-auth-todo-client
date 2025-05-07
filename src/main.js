import { createApp } from 'vue'
import App from './App.vue'
import router from './router'
import apiClient from './axios';
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap';
import Toast from 'vue-toastification'
import 'vue-toastification/dist/index.css'
import { useToast } from 'vue-toastification'
const toast = useToast()
import Swal from 'sweetalert2'

import Paginate from 'vuejs-paginate-next'

const app = createApp(App)

app.config.globalProperties.$apiClient = apiClient;
app.config.globalProperties.$toast = toast;
app.config.globalProperties.$swal = Swal;

app.component('Paginate', Paginate)

app.use(Toast);

app.use(router).mount('#app');
