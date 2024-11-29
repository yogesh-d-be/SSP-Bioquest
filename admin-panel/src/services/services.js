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

export const logout = async () => {
    const data = await apiInstance.post('/admin/logout');
    return data;
}

export const adminDashboardData = async () => {
    const data = await apiInstance.get('/admin/dashboard');
    return data;
}


//Category

export const createCategory = async () => {
    const data = await apiInstance.post('/admin/createcategory');
    return data;
}
export const listCategory = async () => {
    const data = await apiInstance.get('/admin/listcategory');
    return data;
}
export const updateCategory= async () => {
    const data = await apiInstance.put('/admin/updatecategory/:categoryId');
    return data;
}
export const removeCategory = async () => {
    const data = await apiInstance.delete('/admin/removecategory/:categoryId');
    return data;
}

