import { Router } from "express";
import { getUsers, getUser, checkForDuplicates, register, updateUser, toggleUserStatus, deleteUser, login, logout, profile } from '../controllers/user.controller.js';
import { authRequired } from '../middlewares/validateToken.js'

const router = Router();

router.get('/user', getUsers);
router.get('/user/:id', getUser);
router.post('/register', checkForDuplicates, register);
router.put('/user/:id', updateUser);
router.put("/user/toggle/:id", toggleUserStatus);
router.delete('/user/:id', deleteUser);

// ------------------------ ESTEFANIA ---------------- LOGIN --- LOGOUT --- PROFILE ----------------------//

router.post('/login', login);
router.post('/logout', logout);
router.get("/profile", authRequired, profile);

export default router;