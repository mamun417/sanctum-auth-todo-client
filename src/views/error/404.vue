<template>
    <div class="error-page d-flex align-items-center justify-content-center min-vh-100 bg-light">
        <div class="text-center p-5">
            <div class="error-animation mb-4">
                <div class="error-code display-1 fw-bold text-gradient">404</div>
                <div class="error-icon mt-3">
                    <i class="bi bi-emoji-frown display-3 text-muted"></i>
                </div>
            </div>

            <h2 class="h1 mb-3">Oops! Page Not Found</h2>
            <p class="lead text-muted mb-4">
                The page you're looking for doesn't exist or has been moved.
            </p>

            <div class="d-flex gap-3 justify-content-center">
                <router-link
                    :to="{ name: 'dashboard' }"
                    class="btn btn-primary btn-lg px-4 py-2 rounded-pill shadow-sm"
                >
                    <i class="bi bi-house-door me-2"></i> Go to Dashboard
                </router-link>

                <button
                    @click="$router.go(-1)"
                    class="btn btn-outline-secondary btn-lg px-4 py-2 rounded-pill"
                >
                    <i class="bi bi-arrow-left me-2"></i> Go Back
                </button>
            </div>

            <div class="mt-5 text-muted small">
                <p>Need help? <a href="#" class="text-decoration-none">Contact support</a></p>
            </div>
        </div>
    </div>
</template>

<script setup>
// No script needed unless you want to add animations
</script>

<style scoped>
.error-page {
    background: linear-gradient(135deg, #f8f9fa 0%, #e9ecef 100%);
}

.text-gradient {
    background: linear-gradient(45deg, #dc3545, #fd7e14);
    -webkit-background-clip: text;
    background-clip: text;
    color: transparent;
    display: inline-block;
}

.error-animation {
    animation: bounce 2s infinite alternate;
}

@keyframes bounce {
    0% {
        transform: translateY(0);
    }
    100% {
        transform: translateY(-20px);
    }
}

.btn-primary {
    background: linear-gradient(45deg, #0d6efd, #0dcaf0);
    border: none;
    transition: all 0.3s ease;
}

.btn-primary:hover {
    transform: translateY(-2px);
    box-shadow: 0 5px 15px rgba(13, 110, 253, 0.3);
}

.rounded-pill {
    border-radius: 50rem !important;
}
</style>