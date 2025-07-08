import { Employee } from "../models/employee.js";

export const createEmployee = async (req, res) => {
    try{
        const { employeeName, employeeId, salary, department } = req.body;
        if(
            employeeName == "" ||
            employeeId == "" ||
            salary == "" ||
            department == ""
        ) {
            return res.status(400).send("Please fill all the fields");
        }

        const alreadyExists = await Employee.findOne({ employeeId });
        if (alreadyExists) {
            return res.status(400).json({ message: "Employee with this ID already exists" });
        }

        if (department !== 'IT' && department !== 'BBA' && department !== 'Resource') {
            return res.status(400).json({ message: "Invalid department. Must be IT, BBA, or Resource." });
        }
        
        const newEmployee = new Employee({
            employeeName,
            employeeId,
            salary,
            department
        });

        await newEmployee.save();

        res.status(201).json({
            message: "Employee created successfully",
            employee: newEmployee,
        });
    } catch (error) {
        res.status(500).json({
            message: "Internal Server Error",
            error: error.message,
        });
    }
}

export const getAllEmployees = async (req, res) => {
    try{
        const employees = await Employee.find();
        res.status(200).json({
            message: "Employees fetched successfully",
            employees,
        });
    } catch (error) {
        res.status(500).json({
            message: "Internal Server Error",
            error: error.message,
        });
    }
}

export const getEmployeeById = async (req, res) => {
    try{
        const employeeId = req.params.id;
        const employee = await Employee.findById(employeeId);
        if (!employee) {
            return res.status(404).json({ message: "Employee not found" });
        }
        res.status(200).json({
            message: "Employee fetched successfully",
            employee,
        });
    } catch (error) {
        res.status(500).json({
            message: "Internal Server Error",
            error: error.message,
        });
    }
}

export const updateEmployee = async (req, res) => {
    try{
        const {id} = req.params;
        const update = req.body;
        if(update.department && !['IT', 'BBA', 'Resource'].includes(update.department)) {
            return res.status(400).json({ message: "Invalid department. Must be IT, BBA, or Resource." });
        }

        const employee = await Employee.findByIdAndUpdate(id, update, { new: true,runValidators: true });
        if (!employee) {
            return res.status(404).json({ message: "Employee not found" });
        }
        res.status(200).json({
            message: "Employee updated successfully",
            employee,
        });
    } catch (error) {
        res.status(500).json({
            message: "Internal Server Error",
            error: error.message,
        });
    }
}

export const deleteEmployee = async (req, res) => {
    try{
        const employeeId = req.params.id;
        const employee = await Employee.findByIdAndDelete(employeeId);
        if (!employee) {
            return res.status(404).json({ message: "Employee not found" });
        }
        res.status(200).json({
            message: "Employee deleted successfully",
            employee,
        });
    } catch (error) {
        res.status(500).json({
            message: "Internal Server Error",
            error: error.message,
        });
    }
}

