import express from 'express';
import {createUser, getAllUsers, getUserById, updateUser, deleteUser} from '../controller/user.controller.js';
const router=express.Router()

// router.get('/user', createUser);
router.post('/user', createUser);
router.get('/user', getAllUsers)
router.get('/user/:id',getUserById)
router.put('/user/:id',updateUser)
router.delete('/user/:id',deleteUser)
export default router;