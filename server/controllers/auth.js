import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import User from "../models/user.js";

export const register = async (req, res) => {
    try {
        const { username, password, email, avatarConfig } = req.body;

        // Checking for duplicate accounts
        const usernameCheck = await User.exists({ username: username });
        const emailCheck = await User.exists({ email: email });
        if (usernameCheck && emailCheck) {
            return res.status(400).json({
                message:
                    "An account with the same username & email already exists.",
            });
        }
        if (usernameCheck) {
            return res.status(400).json({
                message: "Username is already in use.",
            });
        }
        if (emailCheck) {
            return res.status(400).json({
                message: "Email is already in use.",
            });
        }

        const salt = await bcrypt.genSalt();
        const passwordHash = await bcrypt.hash(password, salt);
        const newUser = await User.create({
            username,
            password: passwordHash,
            email,
            avatarConfig,
        });
        res.status(201).json(newUser);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

export const login = async (req, res) => {
    try {
        const { email, password } = req.body;
        const user = await User.findOne({ email: email });
        if (!user)
            return res.status(400).json({ message: "User does not exist." });
        // CHECKING FOR PW & HASHEDPW MATCH

        const isMatch = await bcrypt.compare(password, user.password);
        if (!isMatch)
            return res.status(400).json({ message: "Invalid credentials." });
        // JWT

        const token = jwt.sign(
            {
                _id: user._id,
                username: user.username,
            },
            process.env.JWT_SECRET
        );
        user.password = undefined;
        res.status(200).json({ token, user });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};
