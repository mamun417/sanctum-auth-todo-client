<template>
    <nav class="navbar navbar-expand navbar-dark bg-dark px-3">
        <a class="navbar-brand" href="#">Admin Panel</a>
        <div class="ms-auto">
            <a href="javascript:0" class="text-white text-decoration-none" @click="logout">Logout</a>
        </div>
    </nav>
</template>

<script setup>
import { useRouter } from 'vue-router';
import {getCurrentInstance} from "vue";
const router = useRouter();
const { proxy } = getCurrentInstance();

const logout = async () => {
    localStorage.clear();
    proxy.$toast.success("Logout successfully")
    router.push({ name: "login" });
};
</script>

<style scoped>

</style>