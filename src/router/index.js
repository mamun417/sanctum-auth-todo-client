import {createRouter, createWebHistory} from 'vue-router'

const router = createRouter({
    history: createWebHistory(import.meta.env.BASE_URL),
    routes: [
        {
            path: '/',
            meta: {
                requireAuth: true,
            },
            component: () => import('../views/layouts/MainLayout.vue'),
            children: [
                {
                    path: "",
                    name: "dashboard",
                    component: () => import("../views/Hello.vue")
                },
                {
                    path: "tasks",
                    name: "tasks",
                    component: () => import("../views/task/Index.vue")
                }
            ]
        },

        {
            path: '/',
            meta: {
                requireAuth: false,
            },
            component: () => import('../views/layouts/AuthLayout.vue'),
            children: [
                {
                    path: "login",
                    name: "login",
                    component: () => import("../views/auth/Login.vue")
                },
                {
                    path: "register",
                    name: "register",
                    component: () => import("../views/auth/Registration.vue")
                }
            ]
        },

        {
            path: "/:pathMatch(.*)*",
            name: "404",
            component: () => import("../views/error/404.vue")
        }
    ],
})

router.beforeEach(async (to, _, next) => {
    // Remove trailing slash
    if (to.path !== "/" && to.path.slice(-1) === "/") {
        return next(to.path.slice(0, -1));
    }

    const login = localStorage.getItem('token') || '';
    const requiresAuth = to.matched.some(record => record?.meta?.requireAuth);


    if (requiresAuth) {
        if (login) {
            next();
        } else {
            next({ name: "login" });
        }
    } else if (!requiresAuth && login && to.name !== "404") {
        // Redirect to dashboard only if the route is not the 404 page
        next({ name: "dashboard" });
    } else {
        next(); // Always call next() if no conditions matched
    }
});

export default router
