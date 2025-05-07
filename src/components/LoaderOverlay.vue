<template>
    <div class="loader-overlay position-absolute top-0 start-0 w-100 h-100" v-if="loading">
        <div class="position-absolute top-0 start-0 w-100 h-100 bg-white opacity-75 overlay-blur"></div>
        <div class="position-absolute top-50 start-50 translate-middle">
            <div class="spinner-border text-primary" style="width: 3rem; height: 3rem;" role="status">
                <span class="visually-hidden">Loading...</span>
            </div>
        </div>
    </div>
</template>

<script setup>
defineProps({
    loading: {
        type: Boolean,
        required: true
    }
});
</script>

<style scoped>
.loader-overlay {
    z-index: 1000;
    pointer-events: auto;
}

.overlay-blur {
    backdrop-filter: blur(2px);
    -webkit-backdrop-filter: blur(2px);
    pointer-events: auto;
}

.loader-overlay > div:last-child {
    pointer-events: none;
}
</style>