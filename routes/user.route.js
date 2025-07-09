import express from 'express';
import {createUser, getAllUsers, getUserById, updateUser, deleteUser} from '../controller/user.controller.js';
import { verifyHR, verifyUser } from '../middleware/verify.token.js';
import upload from '../middleware/multer.js';

const router=express.Router()

// router.get('/user', createUser);
router.post('/user',upload.single('image'), createUser);
router.get('/user',verifyHR,getAllUsers)
router.get('/user/:id',verifyUser,getUserById)
router.put('/user/:id',verifyUser,updateUser)
router.delete('/user/:id',deleteUser)
export default router;