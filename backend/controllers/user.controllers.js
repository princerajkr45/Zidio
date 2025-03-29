import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import dotenv from "dotenv";
import User from "../modals/userModal.js"

dotenv.config();

// Register User
const registerUser = async (req, res) => {
    try {
        const { name, email, password } = req.body;

        // Check if user already exists
        let user = await User.findOne({ email });
        if (user) return res.status(400).json({ message: "User already exists" });


        // Hash password
        const salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash(password, salt);

        // Create user
        user = new User({ name, email, password: hashedPassword });
        await user.save();

        res.status(201).json({ message: "User registered successfully" });
    } catch (error) {
        res.status(500).json({ message: "Server error", error: error.message });
    }
};

// Login User
const loginUser = async (req, res) => {
    try {
        const { email, password } = req.body;

        // Check if user exists
        let user = await User.findOne({ email });
        if (!user) return res.status(400).json({ message: "Invalid credentials" });

        // Check password
        const isMatch = await bcrypt.compare(password, user.password);
        if (!isMatch) return res.status(400).json({ message: "Invalid credentials" });

        // Generate JWT token
        const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET, { expiresIn: "1h" });

        res.status(200).json({ message: "Login successful", token, user: { id: user._id, name: user.name, email: user.email } });
    } catch (error) {
        res.status(500).json({ message: "Server error", error: error.message });
    }
};

// Get User by ID
const getUser = async (req, res) => {
    try {
        const {id } = req.headers;
        const user = await User.findById(id);
        console.log(user);
        if (!user) return res.status(404).json({ message: "User not found" });

        res.status(200).json({ user });
    } catch (error) {
        res.status(500).json({ message: "Server error", error: error.message });
    }
};

// Upload user profile
const uploadUserProfile = async (req, res) => {
    try {
        const { id} = req.headers;

        const user = await User.findById(id);

        if (!user) return res.status(404).json({ message: "User not found" });

        if(!req.file){
            return res.status(400).json({ message: "No profile picture uploaded" });
        }

        user.profile = req.file.filename;
        await user.save();

        res.status(200).json({
            message: "Profile picture updated successfully",
            profile: req.file.filename, 
        });

    } catch (error) {
        res.status(500).json({
            message: "Error updating profile",
            error: error.message,
        });
    }
};


export { registerUser, loginUser, getUser, uploadUserProfile };
