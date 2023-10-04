import axios from './axios.js'

export const createRoleRequest = (role) => axios.post(`/role`, role);
export const getRolesRequest = () => axios.get(`/role`);
export const getRoleRequest = (id) => axios.get(`/role/${id}`);
export const updateRoleRequest = (ID_ROL, role) => axios.put(`/role/${ID_ROL}`, role);
export const statusRoleRequest = (ID_ROL, role) => axios.put(`/role/${ID_ROL}`, role);
export const deleteRoleRequest = (id) => axios.delete(`/role/${id}`);