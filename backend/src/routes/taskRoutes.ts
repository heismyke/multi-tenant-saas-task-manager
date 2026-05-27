import express from "express";
import { createTask, getTasks } from "../controllers/taskController";
import { protect } from "../middleware/auth";

const router = express.Router();

router.route("/").get(protect, getTasks).post(protect, createTask);

export default router;

