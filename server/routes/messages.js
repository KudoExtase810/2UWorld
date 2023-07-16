import express from "express";
import { setCurrentMessage } from "../controllers/messages.js";
const router = express.Router();

router.post("/set", setCurrentMessage);

export default router;
