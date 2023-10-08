import axios from './axios.js'

export const registerRequest = (users) => axios.post(`/register`, users);
export const getUsersRequest = () => axios.get(`/user`);
export const getUserRequest = (ID_USUARIO) => axios.get(`/user/${ID_USUARIO}`);
export const updateUserRequest = (ID_USUARIO, users) => axios.put(`/user/${ID_USUARIO}`, users);
export const statusUserRequest = (ID_USUARIO) => axios.put(`/user/toggle/${ID_USUARIO}`);
export const deleteUserRequest = (ID_USUARIO) => axios.delete(`/user/${ID_USUARIO}`);