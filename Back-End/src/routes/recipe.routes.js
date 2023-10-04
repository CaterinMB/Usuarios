import { Router } from "express";
import { createRecipe, deleteRecipe, getRecipe, getRecipes, updateRecipe } from '../controllers/recipe.controller.js';
import { authRequired } from '../middlewares/validateToken.js'

const router = Router();

router.get('/recipe', getRecipes);
router.post('/recipe', createRecipe);
router.put('/recipe/:id', updateRecipe);
router.delete('/recipe/:id', deleteRecipe);
router.get('/recipe/:id', getRecipe);

export default router;