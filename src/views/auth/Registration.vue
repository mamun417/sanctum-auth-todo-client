<template>
    <div class="container">
        <div class="row justify-content-center">
            <div class="col-md-6">
                <div class="card">
                    <div class="card-header bg-primary text-white">
                        <h3 class="mb-0 text-center">Register</h3>
                    </div>
                    <div class="card-body">
                        <form @submit.prevent="handleSubmit">
                            <div class="mb-3">
                                <label for="name" class="form-label">Name</label>
                                <input
                                    type="text"
                                    class="form-control"
                                    id="name"
                                    v-model="formData.name"
                                    @input="formErrors.name = ''"
                                >
                                <div class="text-danger" v-if="formErrors.name">
                                    {{ formErrors.name }}
                                </div>
                            </div>

                            <div class="mb-3">
                                <label for="email" class="form-label">Email address</label>
                                <input
                                    type="email"
                                    class="form-control"
                                    id="email"
                                    v-model="formData.email"
                                    @input="formErrors.email = ''"
                                >
                                <div class="text-danger" v-if="formErrors.email">
                                    {{ formErrors.email }}
                                </div>
                            </div>

                            <div class="mb-3">
                                <label for="password" class="form-label">Password</label>
                                <input
                                    type="password"
                                    class="form-control"
                                    id="password"
                                    v-model="formData.password"
                                    @input="formErrors.password = ''"
                                >
                                <div class="text-danger" v-if="formErrors.password">
                                    {{ formErrors.password }}
                                </div>
                            </div>

                            <div class="mb-3">
                                <label for="confirmPassword" class="form-label">Confirm Password</label>
                                <input
                                    type="password"
                                    class="form-control"
                                    id="confirmPassword"
                                    v-model="formData.password_confirmation"
                                    @input="formErrors.password_confirmation = ''"
                                >
                                <div class="text-danger" v-if="formErrors.password_confirmation">
                                    {{ formErrors.password_confirmation }}
                                </div>
                            </div>

                            <div class="d-grid gap-2">
                                <button type="submit" class="btn btn-primary">Register</button>
                            </div>

                            <div class="text-center mt-3">
                                <router-link :to="{ name: 'login' }" class="text-decoration-none">
                                    Already have an account? Login here
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
import {getCurrentInstance, ref} from 'vue';
import { useRouter } from 'vue-router';
const { proxy } = getCurrentInstance();
import LoaderOverlay from '../../components/LoaderOverlay.vue';

const router = useRouter();
const formData = ref({
    name: '',
    email: '',
    password: '',
    confirmPassword: ''
});
let formErrors = ref({})
let loader = ref(false);

const handleSubmit = async () => {
    try {
        loader.value = true;

        const response = await proxy.$apiClient.post('/auth/register', formData.value);
        localStorage.setItem('token', response.data?.data?.access_token);
        loader.value = false;
        proxy.$toast.success("Registration successfully!")
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