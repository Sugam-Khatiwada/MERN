import { User } from "../models/user.js";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";

export const login = async (req, res) => {
    try {
        const { email, password } = req.body;

        const user = await User.findOne({ email }).select('+password');
        console.log(user)

        if (!user) {
            return res.status(400).json({ message: "Invalid email" });
        }

        const check = bcrypt.compareSync(password, user.password);
        if (!check) {
            return res.status(400).json({ message: "Invalid password" });
        }

        if (user && check) {
            const { password: pass, ...rest } = user._doc;
            console.log('rest', rest);

            const token = jwt.sign(
                { id: rest._id, role: rest.role },
                process.env.JWT
            )
            console.log('token', token);

            res.status(200).json({ token, data: user });
        }

    } catch (error) {
        res.status(500).json({
            message: "Internal Server Error",
            error: error.message,
        });
    }
}