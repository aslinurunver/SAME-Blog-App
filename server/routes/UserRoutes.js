import express from "express";
import {
  registerUser,
  loginUser,
  userProfile,
  updateProfile,
  updateProfilePicture,
  getAllUsers,
  verifyUser,
  deleteUser
} from "../controllers/userController.js";
import { authGuard } from "../middleware/authMiddleware.js";

const router = express.Router();

router.post("/register", registerUser);
router.post("/login", loginUser);

router.get("/profile", authGuard, userProfile);
router.get("/", getAllUsers);

router.put("/updateProfile", authGuard, updateProfile);
router.put("/updateProfilePicture", authGuard, updateProfilePicture);
router.put("/verify/:id", verifyUser)

router.delete("/delete/:id", authGuard, deleteUser)
router


export default router;
