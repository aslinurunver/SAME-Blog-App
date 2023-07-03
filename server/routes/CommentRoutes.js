import express from "express";
import {
  createComment,
  updateComment,
  deleteComment,
} from "../controllers/commentController.js";
import { authGuard } from "../middleware/authMiddleware.js";

const router = express.Router();

router.post("/", authGuard, createComment);
router.put("/:commentId", authGuard, updateComment);
router.delete("/:commentId", authGuard, deleteComment);

export default router;
