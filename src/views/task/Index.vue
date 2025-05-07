<template>
    <div class="container mt-4">
        <div class="card shadow-sm">
            <div class="card-header bg-white border-bottom-0 d-flex justify-content-between align-items-center">
                <h5 class="mb-0">Tasks Management</h5>
                <button
                    class="btn btn-primary"
                    @click="openShowAddEditTaskModal"
                >
                    Add Task
                </button>
            </div>
            <div class="card-body">
                <div class="mb-3 d-flex">
                    <input
                        type="text"
                        class="form-control me-2"
                        placeholder="Search tasks..."
                        v-model="searchQuery"
                        @input="handleSearch"
                    />
                    <button
                        class="btn btn-outline-secondary"
                        @click="clearSearch"
                    >
                        Clear
                    </button>
                </div>
                <div class="table-responsive">
                    <table class="table table-hover">
                        <thead class="table-light">
                            <tr>
                                <th width="10%">ID</th>
                                <th width="25%">Title</th>
                                <th width="35%">Body</th>
                                <th width="15%">Status</th>
                                <th width="15%" class="text-end">Actions</th>
                            </tr>
                        </thead>
                        <tbody>
                            <tr v-if="tasks.length === 0">
                                <td colspan="5" class="text-center">No task found</td>
                            </tr>

                            <tr v-else v-for="task in tasks" :key="task.id">
                                <td>{{ task.id }}</td>
                                <td>{{ task.title }}</td>
                                <td>{{ task.body }}</td>
                                <td>
                                    <span
                                        class="badge"
                                        :class="task.is_completed ? 'bg-success' : 'bg-secondary'"
                                    >
                                        {{ task.is_completed ? 'Completed' : 'Pending' }}
                                    </span>
                                </td>
                                <td class="text-end">
                                    <div class="btn-group" role="group">
                                        <button
                                            @click="handleEdit(task.id)"
                                            class="btn btn-sm btn-outline-primary"
                                        >
                                            Edit
                                        </button>
                                        <button
                                            @click="handleDelete(task.id)"
                                            class="btn btn-sm btn-outline-danger ms-2"
                                        >
                                            Delete
                                        </button>
                                        <button
                                            @click="toggleTaskCompletion(task)"
                                            class="btn btn-sm btn-outline-success ms-2"
                                            style="width: 120px; white-space: nowrap;"
                                        >
                                            {{ task.is_completed ? 'Mark as Pending' : 'Mark as Complete' }}
                                        </button>
                                    </div>
                                </td>
                            </tr>
                        </tbody>
                    </table>

                    <Paginate
                        v-show="totalPages > 1"
                        :page-count="totalPages"
                        :click-handler="handlePageClick"
                        :page-range="3"
                        :margin-pages="1"
                    />

                    <LoaderOverlay :loading="loader.listLoader" />

                </div>
            </div>
        </div>

        <Teleport to="#modal-container">
            <Modal
                v-if="showAddEditTaskModal"
                :title="isUpdate ? 'Update Task' : 'Add Task'"
                @closeModal="closeShowAddEditTaskModal"
            >
                <template #body>
                    <form>
                        <div class="mb-3">
                            <label for="taskTitle" class="form-label">Title</label>
                            <input
                                type="text"
                                id="taskTitle"
                                class="form-control"
                                v-model="newTask.title"
                                @input="newTaskFormErrors.title = ''"
                            />
                            <div class="text-danger" v-if="newTaskFormErrors.title">
                                {{ newTaskFormErrors.title }}
                            </div>
                        </div>
                        <div class="mb-3">
                            <label for="taskBody" class="form-label">Body</label>
                            <textarea
                                id="taskBody"
                                class="form-control"
                                v-model="newTask.body"
                                @input="newTaskFormErrors.body = ''"
                                rows="3"
                            ></textarea>
                            <div class="text-danger" v-if="newTaskFormErrors.body">
                                {{ newTaskFormErrors.body }}
                            </div>
                        </div>
                        <button type="button" class="btn btn-primary" @click="isUpdate ? updateTask() : addTask()">
                            {{ isUpdate ? 'Update' : 'Submit' }}
                        </button>
                    </form>

                    <LoaderOverlay :loading="loader.formLoader" />
                </template>
            </Modal>
        </Teleport>
      
    </div>
</template>

<script setup>
import {ref, getCurrentInstance, onMounted, computed} from 'vue';
import Modal from '../../components/Modal.vue';
import LoaderOverlay from '../../components/LoaderOverlay.vue';

const {proxy} = getCurrentInstance();

const tasks = ref([]);
const searchQuery = ref('');
let currentPage = ref(1);
let totalPages = ref(0);
let debounceTimeout = null;
const showAddEditTaskModal = ref(false);
const loader = ref({
    listLoader: false,
    formLoader: false,
});

const newTask = ref({
    id: '',
    title: '',
    body: ''
});
const newTaskFormErrors = ref({});

const isUpdate = computed(() => newTask.value.id);

onMounted(() => {
    getTaskList();
});

const getTaskList = async () => {
    try {
        loader.value.listLoader = true;

        const response = await proxy.$apiClient.get('/tasks', {
            params: {
                page: currentPage.value,
                search: searchQuery.value
            }
        });

        tasks.value = response.data.data;
        totalPages.value = response.data.meta.last_page;

        loader.value.listLoader = false;
    } catch (error) {
        console.error('Error fetching tasks:', error);
    }
};

const handlePageClick = (page) => {
    currentPage.value = page;
    getTaskList();
};

const handleSearch = () => {
    if (debounceTimeout) {
        clearTimeout(debounceTimeout);
    }

    debounceTimeout = setTimeout(() => {
        getTaskList();
    }, 500);
};

const clearSearch = () => {
    searchQuery.value = '';
    getTaskList();
};

const openShowAddEditTaskModal = () => {
    showAddEditTaskModal.value = true;
}

const closeShowAddEditTaskModal = () => {
    resetForm();
    showAddEditTaskModal.value = false;
}

const addTask = async () => {
    try {
        loader.value.formLoader = true;

        await proxy.$apiClient.post('/tasks', newTask.value);
        proxy.$toast.success("Task has been created successfully!")

        closeShowAddEditTaskModal();
        resetForm();
        getTaskList();

        loader.value.formLoader = false;
    } catch (error) {
        if (error.response?.data?.errors) {
            newTaskFormErrors.value = error.response?.data?.errors;
        } else {
            proxy.$toast.error(error.response?.data?.message)
        }
    }
};

const handleEdit = (id) => {
    const taskToEdit = tasks.value.find(task => task.id === id);

    if (taskToEdit) {
        newTask.value = {...taskToEdit};
        openShowAddEditTaskModal();
    } else {
        proxy.$toast.error('Task not found!');
    }
};

const updateTask = async () => {
    try {
        loader.value.formLoader = true;

        await proxy.$apiClient.put(`/tasks/${newTask.value.id}`, newTask.value);
        proxy.$toast.success("Task has been updated successfully!")

        closeShowAddEditTaskModal();
        resetForm();
        getTaskList();

        loader.value.formLoader = false;
    } catch (error) {
        if (error.response?.data?.errors) {
            newTaskFormErrors.value = error.response?.data?.errors;
        } else {
            proxy.$toast.error(error.response?.data?.message)
        }
    }
};

const resetForm = () => {
    newTask.value = {title: '', body: ''};
}

const handleDelete = async (id) => {
    const {isConfirmed} = await proxy.$swal.fire({
        title: 'Are you sure??',
        text: 'You will not be able to recover this!',
        icon: 'warning',
        showCancelButton: true,
        confirmButtonText: 'Yes, delete it!',
    });

    if (!isConfirmed) return;

    try {
        await proxy.$apiClient.delete(`/tasks/${id}`);
        proxy.$toast.success('Deleted!');
        getTaskList();
    } catch (err) {
        proxy.$toast.error(err.response?.data?.message || 'Delete failed');
    }
};

const toggleTaskCompletion = async (task) => {
    try {
        const updatedStatus = !task.is_completed;
        await proxy.$apiClient.patch(`/tasks/${task.id}/complete`, {
            is_completed: updatedStatus
        });

        task.is_completed = updatedStatus;
        proxy.$toast.success(
            `Task marked as ${updatedStatus ? 'Completed' : 'Pending'}!`
        );
    } catch (error) {
        proxy.$toast.error(
            error.response?.data?.message || 'Failed to update task status'
        );
    }
};
</script>

<style scoped>
.card-header {
    padding: 1rem 1.25rem;
}

.table th {
    font-weight: 600;
    color: #495057;
}

.btn-sm {
    padding: 0.25rem 0.5rem;
    font-size: 0.765625rem;
}

.d-flex {
    display: flex;
    align-items: center;
}

.modal {
    z-index: 1050;
}

.modal-content {
    border-radius: 0.5rem;
}
</style>