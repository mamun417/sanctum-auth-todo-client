<template>
    <div class="col-md-3 bg-light vh-100 p-3">
        <div class="list-group">
            <RouterLink
                :to="{ name: 'dashboard' }"
                class="list-group-item list-group-item-action"
                exact-active-class="active">
                Dashboard
            </RouterLink>

            <RouterLink
                :to="{ name: 'tasks' }"
                class="list-group-item list-group-item-action"
                exact-active-class="active">
                Tasks
            </RouterLink>
        </div>
    </div>
</template>

<script>
export default {};
</script>
