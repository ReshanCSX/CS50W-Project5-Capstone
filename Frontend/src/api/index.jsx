import axios from "axios"

export const API = axios.create({
    baseURL: 'http://127.0.0.1:8000/api',
    headers: { 'content-type': 'application/json' },
    timeout: 3000,
})

API.interceptors.request.use((config) => {

    const value = localStorage.getItem('authTokens')
    const accessToken = value ? JSON.parse(value) : null
    
    return {
        ...config,
        headers: {
            ...config.headers,
            Authorization: accessToken ? 'Bearer ' + accessToken.access : null,
        },
    }
})