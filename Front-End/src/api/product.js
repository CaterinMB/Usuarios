import axios from './axios.js'

export const createProductRequest = (product) => axios.post(`/product`, product);
export const getProductsRequest = () => axios.get(`/product`);
export const getProductRequest = (id) => axios.get(`/product/${id}`);
export const updateProductRequest = (ID_PRODUCTO, product) => axios.put(`/product/${ID_PRODUCTO}`, product);
export const statusProductRequest = (ID_PRODUCTO, product) => axios.put(`/product/${ID_PRODUCTO}`, product);
export const deleteProductRequest = (id) => axios.delete(`/product/${id}`);