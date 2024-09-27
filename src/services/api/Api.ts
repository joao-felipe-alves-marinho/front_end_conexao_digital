import axios from 'axios';


const Api = axios.create({
    baseURL: import.meta.env.VITE_API_URL as string,
    withCredentials: true,
    headers: {
        'Content-Type': 'application/json',
        'accept': 'application/json',
    },
});

Api.interceptors.request.use(
    (config) => {
        const accessToken = localStorage.getItem('accessToken');
        if (accessToken) {
            config.headers.Authorization = `Bearer ${accessToken}`;
        }
        return config;
    },
    (error) => {
        return Promise.reject(error);
    }
);

Api.interceptors.response.use(
    (response) => {
        return response;
    },
    async (error) => {
        const originalRequest = error.config;
        if (error.response.status === 401 && !originalRequest._retry) {
            originalRequest._retry = true;
            const refreshToken = localStorage.getItem('refreshToken');
            await axios.post(import.meta.env.VITE_API_URL+'/auth/refresh', { refresh: refreshToken }).then((res) => {
                if (res.status === 200) {
                    localStorage.setItem('accessToken', res.data.access);
                    localStorage.setItem('refreshToken', res.data.refresh);
                    Api.defaults.headers.common.Authorization = `Bearer ${res.data.access}`;
                    Api(originalRequest).then(() => {
                        window.location.reload();
                    })
                }
            }).catch(() => {
                localStorage.removeItem('accessToken');
                localStorage.removeItem('refreshToken');
                window.location.href = '/login';
            });
        }
    }
);

export default Api;
