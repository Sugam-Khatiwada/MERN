import express from 'express';
import { createEmployee, getAllEmployees, getEmployeeById, updateEmployee, deleteEmployee } from '../controller/employee.controller.js';

const router = express.Router();

router.post('/employee', createEmployee);
router.get('/employee', getAllEmployees);
router.get('/employee/:id', getEmployeeById);
router.put('/employee/:id', updateEmployee);
router.delete('/employee/:id', deleteEmployee);

export default router;