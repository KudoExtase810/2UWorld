import express from "express";
import helmet from "helmet";
import cors from "cors";
import bodyParser from "body-parser";
import cookieParser from "cookie-parser";
import dotenv from "dotenv";
import dbConnect from "./utils/dbConnect.js";
import http from "http";
import authRoutes from "./routes/auth.js";
import messageRoutes from "./routes/messages.js";
import userRoutes from "./routes/users.js";
import { Server } from "socket.io";

// CONFIGURATION

dotenv.config();

const app = express();

app.use(express.json({ limit: "30mb" }));
app.use(helmet());
app.use(helmet.crossOriginResourcePolicy({ policy: "cross-origin" }));
app.use(bodyParser.json({ limit: "30mb" }));
app.use(bodyParser.urlencoded({ limit: "30mb", extended: true }));
app.use(cors({ origin: process.env.CLIENT_URL }));
app.use(cookieParser());

const server = http.createServer(app);

// SOCKET IO

const io = new Server(server, { cors: { origin: process.env.CLIENT_URL } });
io.on("connection", (socket) => {
    console.log(`${socket.id} is connected.`);
});

// COUNTDOWN

global.timerValue = 30 * 60;
const countDown = () => {
    if (timerValue === 0) return (timerValue = 30 * 60);
    timerValue--;
    io.emit("timer", timerValue);
};

export const countDownControls = {
    start: () => {
        if (timerValue < 30 * 60) {
            console.log(
                `Timer is already running. Currently ${timerValue}s remaining.`
            );
            return;
        }
        const intervalId = setInterval(countDown, 1000);
        // Store the interval ID for later use
        countDownControls.intervalId = intervalId;
    },
    reset: () => {
        timerValue = 30 * 60;
        // Clear the interval using the stored interval ID
        clearInterval(countDownControls.intervalId);
    },
};
countDownControls.start();

// ROUTES

app.use("/auth", authRoutes);
app.use("/messages", messageRoutes);
app.use("/users", userRoutes);

// CONNECTION

dbConnect().then(() => {
    const PORT = process.env.PORT || 6001;
    server.listen(PORT, () => console.log(`Server is running on port ${PORT}`));
});
