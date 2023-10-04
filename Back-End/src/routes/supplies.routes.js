import { Router } from 'express';
import { getSupplies, getSupplie, createSupplies, disableSupplies, updateSupplies, deleteSupplies } from '../controllers/supplies.controller.js'; 

const router = Router();

router.get("/supplies", getSupplies);
router.post("/supplies", createSupplies);
router.put("/supplies/disable/:id", disableSupplies);
router.put("/supplies/update/:id", updateSupplies);
router.delete("/supplies/:id", deleteSupplies);   
router.get("/supplies/:id", getSupplie);

export default router;
