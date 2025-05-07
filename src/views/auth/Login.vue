<template>
    <div class="container mt-3">
        <div class="row justify-content-center">
            <div class="col-md-6">
                <div class="card">
                    <div class="card-header bg-primary text-white">
                        <h3 class="mb-0 text-center">Login</h3>
                    </div>
                    <div class="card-body">
                        <form @submit.prevent="handleSubmit">
                            <div class="mb-3">
                                <label class="form-label">Email address</label>
                                <input
                                    type="email"
                                    class="form-control"
                                    v-model="formData.email"
                                    @input="formErrors.email = ''"
                                >
                                <div class="text-danger" v-if="formErrors.email">
                                    {{ formErrors.email }}
                                </div>
                            </div>

                            <div class="mb-3">
                                <label class="form-label">Password</label>
                                <input
                                    type="password"
                                    class="form-control"
                                    v-model="formData.password"
                                    @input="formErrors.password = ''"
                                >
                                <div class="text-danger" v-if="formErrors.password">
                                    {{ formErrors.password }}
                                </div>
                            </div>

                            <div class="d-grid gap-2">
                                <button type="submit" class="btn btn-primary">Submit</button>
                            </div>

                            <div class="text-center mt-3">
                                <router-link :to="{ name: 'register' }" class="text-decoration-none">
                                    Don't have an account? Register here
                                </router-link>
                            </div>
                        </form>

                        <LoaderOverlay :loading="loader"/>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<script setup>
import {ref, getCurrentInstance} from 'vue';
import {useRouter} from 'vue-router';

const router = useRouter();
const {proxy} = getCurrentInstance();
import LoaderOverlay from '../../components/LoaderOverlay.vue';

const formData = ref({
    email: '',
    password: ''
});
let formErrors = ref({});
let loader = ref(false);

const handleSubmit = async () => {
    try {
        loader.value = true;

        const response = await proxy.$apiClient.post('/auth/login', formData.value);
        localStorage.setItem('token', response.data?.data?.access_token);
        loader.value = false;
        proxy.$toast.success("Login successfully!")
        router.push({name: "dashboard"});
    } catch (error) {
        loader.value = false;

        if (error.response?.data?.errors) {
            formErrors.value = error.response?.data?.errors;
        } else {
            proxy.$toast.error(error.response?.data?.message)
        }
    }
};
</script>

<style scoped>
.card {
    margin-top: 5rem;
    box-shadow: 0 0.5rem 1rem rgba(0, 0, 0, 0.15);
}

.card-header {
    padding: 1.5rem;
}
</style>
