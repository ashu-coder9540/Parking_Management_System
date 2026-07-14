import express from "express";
// Step-3: Create authRoutes.js
import {
  register,
  login,
} from "../controllers/authController.js";

import auth from "../middleware/authMiddleWare.js";
import { permit } from "../middleware/permissionMiddleWare.js";

const router = express.Router();

router.post("/register", register);
router.post("/login", login);
// Admin test route — requires authentication + ADMIN or SUPER_ADMIN role
router.get("/admin-test", auth, permit(["ADMIN", "SUPER_ADMIN"]), (req, res) => {
  return res.json({ message: "Admin access granted" });
});

export default router;