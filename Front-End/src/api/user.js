import axios from './axios.js'

export const registerRequest = (user) => axios.post(`/register`, user);
export const getUsersRequest = () => axios.get(`/user`);
export const getUserRequest = (id) => axios.get(`/user/${id}`);
export const updateUserRequest = (ID_USUARIO, user) => axios.put(`/user/${ID_USUARIO}`, user);
export const statusUserRequest = (ID_USUARIO, user) => axios.put(`/user/${ID_USUARIO}`, user);
export const deleteUserRequest = (id) => axios.delete(`/user/${id}`);