import express from 'express';
import {createUser, getAllUsers} from '../controller/user.controller.js';
const router=express.Router()

// router.get('/user', createUser);
router.post('/adduser', createUser);
router.get('/getallusers', getAllUsers)
export default router;