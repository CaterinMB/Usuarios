import axios from './axios.js'

export const createRecipeRequest = (recipe) => axios.post(`/recipe`, recipe)
export const getRecipesRequest = () => axios.get(`/recipe`)
export const getRecipeRequest = (id) => axios.get(`/recipe/${id}`)
export const updateRecipeRequest = (recipe) => axios.put(`/recipe/${recipe.ID_RECETA}`, recipe)
export const deleteRecipeRequest = (id) => axios.delete(`/recipe/${id}`)