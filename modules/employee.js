import mongoose from "mongoose";    

const EmployeeSchema = new mongoose.Schema(
    {
        employeeName: {
            type: String,
            required: [true, "Employee name is required"],
            trim: true,
        },
        employeeId: {
            type: String,
            required: [true, "Employee ID is required"],
            unique: true,
            trim: true,
        },
        salary: {
            type: Number,
            required: [true, "Salary is required"],
            min: [0, "Salary must be a positive number"],
        },
        department: {
            type: String,
            enum: ['IT','BBA','Resource'],
            required: [true, "Department is required"]
        },
        createdAt: {
            type: Date,
            default: Date.now,
        },
        updatedAt: {
            type: Date,
            default: Date.now,
        },
    },
    {
        timestamps: true,
    }
)

export const Employee = mongoose.model("Employee", EmployeeSchema);