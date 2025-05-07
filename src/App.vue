<template>
<!--    <div class="container-fluid p-0">-->
<!--        <TopBar/>-->

<!--        <div class="row g-0">-->
<!--            <LeftSidebar/>-->

<!--            <main class="col-md-9 p-4">-->
<!--                Main content here...-->
<!--            </main>-->
<!--        </div>-->
<!--    </div>-->
<!--    <div id="app">-->
        <router-view/>
<!--    </div>-->
</template>

<script setup>
import TopBar from "./views/element/TopBar.vue";
import LeftSidebar from "./views/element/LeftSidebar.vue";
</script>

