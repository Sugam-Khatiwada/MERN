import bcrypt from 'bcryptjs';
import {User} from "../models/user.js"

export const createUser = async (req, res) => {
    try {
        const { firstName, lastName, email, password } = req.body;
        if (
            firstName == "" ||
            lastName == "" ||
            email == "" ||
            password == ""
        ) {
            return res.status(400).send("please fill all the fields");
        }

        const alreadyExists = await User.findOne({ email });
        if (alreadyExists) {
            return res
                .status(400)
                .json({ message: "User with this email already exists" });
        }

        const hashedPassword = bcrypt.hashSync(password, 10);

        const newUser = new User({
            firstName,
            lastName,
            email,
            password: hashedPassword,
        });

        await newUser.save();

        const userResponse = newUser.toObject();
        delete userResponse.password;

        res.status(201).json({
            message: "User created successfully",
            user: userResponse,
        });
    } catch (error) {
        res.status(500).json({
            message: "Internal Server Error",
            error: error.message,
        });
    }
};

export const getAllUsers = async (req, res) => {
    try{
        const users = await User.find();
        res.status(200).json({
            message: "Users fetched successfully",
            users,
        });
    } catch (error) {
        res.status(500).json({
            message: "Internal Server Error",
            error: error.message,
        });
    }
};

export const getUserById = async(req, res) => {
    try{
        const userId = req.params.id;
        const user = await User.findById(userId);
        if (!user) {
            return res.status(404).json({ message: "User not found" ,});
        }
        res.status(200).json({
            message: "User fetched successfully", 
            user,
        });
    }catch (error) {
        res.status(500).json({
            message: "Internal Server Error",
            error: error.message,
        });
    }
}

export const updateUser = async (req, res) => {
    try{
        const {id} = req.params;
        const update = req.body;
        if(update.password) {
            delete update.password;
        }

        const user = await User.findByIdAndUpdate(id, update, { new: true,runValidators: true });
        if (!user) {
            return res.status(404).json({ message: "User not found" });
        }
        res.status(200).json({
            message: "User updated successfully",
            user,
        });
    } catch (error) {
        res.status(500).json({
            message: "Internal Server Error",
            error: error.message,
        });
    }}

export const deleteUser = async (req, res) => {
    try{
        const userId = req.params.id;
        const user = await User.findByIdAndDelete(userId);
        if (!user) {
            return res.status(404).json({ message: "User not found" });
        }
        res.status(200).json({
            message: "User deleted successfully",
        });
    } catch (error) {
        res.status(500).json({
            message: "Internal Server Error",
            error: error.message,
        });
    }
}