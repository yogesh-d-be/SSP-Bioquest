import axios from "axios";
import apiInstance from "../interceptors/axios";


export const adminLogin = async (values) => {
    const data = await apiInstance.post('/admin/login',values);
    return data;
};

export const refreshAccessToken = async () => {
    const data = await apiInstance.post('/admin/refreshaccesstoken');
    return data;
};

export const adminDashboardData = async () => {
    const data = await apiInstance.get('/admin/dashboard');
    return data;
}

