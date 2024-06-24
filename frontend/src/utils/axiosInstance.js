import axios from 'axios';

const baseUrl = "http://localhost:8080/api/v1"

export const axiosInstnce = axios.create({
    baseURL: baseUrl,
    withCredentials: true,
});

export const endpoints = {
    auth: {
        register: `/auth/register`, 
        login: `/auth/login`, 
        logout: `/auth/logout`, 
        me: `/auth/me`, 
    },
    todo: {
        add: `/todo`,
        delete: `/todo`,
        get: `/todo`
    }
};
