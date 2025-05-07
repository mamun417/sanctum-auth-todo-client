<template>
    <div class="container-fluid p-0">
        <TopBar/>

        <div class="row g-0">
            <LeftSidebar/>

            <main class="col-md-9 p-4">
                <RouterView/>
            </main>
        </div>
    </div>
</template>

<script setup>
import TopBar from "../../views/element/TopBar.vue";
import LeftSidebar from "../../views/element/LeftSidebar.vue";
</script>

<style scoped>

</style>