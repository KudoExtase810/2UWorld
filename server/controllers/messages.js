import Message from "../models/message.js";

export const getLatestMessage = async (req, res) => {
    try {
        const latestMessage = await Message.find({})
            .sort({ createdAt: -1 })
            .limit(1);

        res.status(200).json(latestMessage[0]);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

export const getAllMessages = async (req, res) => {
    try {
        const allMessages = await Message.find({}).sort({ createdAt: -1 });

        res.status(200).json(allMessages);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

export const setCurrentMessage = async (req, res) => {
    try {
        if (timerValue > 0) {
            return res.status(403).json({
                message: `The timer is still running! Wait ${timerValue} more seconds.`,
            });
        }
        const newMessage = await Message.create(req.body);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};
