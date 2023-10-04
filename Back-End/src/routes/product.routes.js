import { Router } from "express";
import { getProducts, getProduct, checkForDuplicates, createProduct, updateProduct, toggleProductStatus, deleteProduct, getProductRecipes } from '../controllers/product.controller.js';
import { authRequired } from '../middlewares/validateToken.js'

const router = Router();

router.get('/product', getProducts);
router.get('/product/:id', getProduct);
router.post('/product', checkForDuplicates, createProduct);
router.put('/product/:id', checkForDuplicates, updateProduct);
router.put("/product/toggle/:id", toggleProductStatus)
router.delete('/product/:id', deleteProduct);
router.get('/product/:id/recipes', getProductRecipes);

export default router;