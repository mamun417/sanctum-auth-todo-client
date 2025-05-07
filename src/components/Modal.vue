<template>
    <div
        class="modal fade show d-block"
        tabindex="-1"
        role="dialog"
        style="background: rgba(0, 0, 0, 0.5);"
    >
        <div class="modal-dialog" role="document">
            <div class="modal-content">
                <div class="modal-header">
                    <h5 class="modal-title">{{ title }}</h5>
                    <button
                        type="button"
                        class="btn-close"
                        @click="closeModal"
                    ></button>
                </div>
                <div class="modal-body">
                    <slot name="body"></slot>
                </div>
            </div>
        </div>
    </div>
</template>

<script setup>
    import { defineProps, defineEmits } from 'vue'; 

    const props = defineProps({
        title: {
            type: String,
            required: true,
        },
    });

    const emit = defineEmits(['closeModal']);

    const closeModal = () => {
        emit('closeModal');
    };

</script>

<style scoped>
  
</style>