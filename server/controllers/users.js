import User from "../models/user.js";

export const getUserById = async (req, res) => {
    try {
        const { id } = req.params;
        const user = await User.findById(id);
        if (!user) return res.status(404).json({ message: "User not found." });
        user.password = undefined;
        res.status(200).json(user);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

export const deleteUser = async (req, res) => {
    try {
        const { id } = req.params;
        const user = await User.findByIdAndDelete(id);
        if (!user) return res.status(404).json({ message: "User not found" });
        res.status(200).json({ message: "User deleted successfully." });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

export const banUser = async (req, res) => {
    try {
        const { id } = req.params;
        const user = await User.findById(id);
        if (!user) return res.status(404).json({ message: "User not found." });
        user.isBanned = true;
        await user.save();
        res.status(200).json({ message: "User was banned successfully." });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

export const addUserPoints = async (req, res) => {
    try {
        const { id } = req.params;
        const { pointsToAdd } = req.body;
        const user = await User.findById(id);
        if (!user) return res.status(404).json({ message: "User not found" });
        user.points += pointsToAdd;
        await user.save();
        res.status(200).json({ message: "Points added successfully." });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

export const addMonthlyPoints = async (req, res) => {
    try {
        const allUsers = await User.find({ isBanned: false });

        const monthlyPoints = 50;
        for (let i = 0; i < allUsers.length; i++) {
            allUsers[i].points += monthlyPoints;
            allUsers[i].save();
        }

        res.status(200).json({
            message:
                "All users have receieved their monthly points with success.",
        });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

export const editUserSettings = async (req, res) => {
    try {
        const newSettings = req.body;
        const { id } = req.params;
        const user = await User.findById(id);
        if (!user) return res.status(404).json({ message: "User not found" });
        user.settings = newSettings;
        await user.save();
        res.status(200).json({
            message: "User settings updated successfully.",
        });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};
