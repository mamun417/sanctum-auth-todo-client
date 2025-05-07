import axios from "axios";
import router from "../router";

const apiCLient = axios.create({
    baseURL: import.meta.env.VITE_API_URL+'/api' || 'http://127.0.0.1:8000/api',
    headers: {
        'Content-Type': 'application/json',
        Accept: 'application/json',
    },
    withCredentials: false,
});

// handle before req happen
apiCLient.interceptors.request.use(
    req => {
        const token = localStorage.getItem("token");

        if (token) {
            req.headers["Authorization"] = "Bearer " + token;
        }

        return req;
    },
    err => {
        return Promise.reject(err);
    }
);

// handle before res is send to client
apiCLient.interceptors.response.use(
    res => {
        return res;
    },
    err => {
        let errorCode = err.response.status;

        if (errorCode === 401) {
            // store.dispatch("auth/logout").then(() => {
                return router.push({ name: "login" });
            // });
        } else {
            return Promise.reject(err);
        }
    }
);

export default apiCLient;
