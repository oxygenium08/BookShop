import axios from 'axios';

// Создаем экземпляр axios
const $api_token = axios.create({
    baseURL: process.env.REACT_APP_API_URL || 'http://localhost:8000/',
    headers: {
        'Content-Type': 'application/json',
    },
});

// Добавляем перехватчик запросов
$api_token.interceptors.request.use((config) => {
    const token = localStorage.getItem('accessToken');
    console.log("Access token in interceptor:", token);
    if (token) {
        config.headers['Authorization'] = `Bearer ${token}`;
    } else {
        console.log("No token found in interceptor.");
    }
    return config;
}, (error) => {
    return Promise.reject(error);
});

// Добавляем перехватчик ответов
$api_token.interceptors.response.use((response) => {
    return response;
}, async (error) => {
    const originalRequest = error.config;
    if ((error.response.status === 401 || error.response.status === 403) && !originalRequest._isRetry) {
        originalRequest._isRetry = true;
        try {
            const refreshToken = localStorage.getItem('refreshToken');
            console.log('refreshtoken до обновления: ', refreshToken)
            if (refreshToken) {
                const { data } = await axios.post('http://127.0.0.1:8000/api/auth/token/refresh/', { refresh: refreshToken });
                localStorage.setItem('accessToken', data.access);
                // Повторяем запрос с новым токеном
                originalRequest.headers['Authorization'] = `Bearer ${data.access}`;
                return $api_token(originalRequest);
            }
        } catch (e) {
            console.log('Ошибка обновления токена, необходимо повторно авторизоваться');
            logout();
        }
    }
    return Promise.reject(error);
});

function logout() {
    localStorage.removeItem('accessToken');
    localStorage.removeItem('refreshToken');
    window.location.href = ''; // Перенаправляем пользователя на страницу входа
}

export default $api_token;
