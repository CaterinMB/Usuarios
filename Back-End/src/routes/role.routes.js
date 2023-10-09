import { Router } from "express";
import { getRoles, getRole, checkForDuplicates, createRoles, updateRole, toggleRoleStatus, deleteRole, getRoleUser } from '../controllers/role.controller.js';
import { authRequired } from '../middlewares/validateToken.js'

const router = Router();

router.get('/role', getRoles);
router.get('/role/:id', getRole);
router.post('/role', checkForDuplicates, createRoles);
router.put('/role/:id', updateRole);
router.put('/role/toggle/:id', toggleRoleStatus);
router.delete('/role/:id', deleteRole);
router.get('/role/:id/user', getRoleUser);

export default router;