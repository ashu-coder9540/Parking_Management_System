import express from "express";
// Step-3: Create authRoutes.js
import {
  register,
  login,
} from "../controllers/authController.js";
import asyncHandler from "../middleware/asyncHandler.js";
import validateRequest from "../middleware/validationMiddleware.js";
import { registerSchema, loginSchema } from "../validation/authValidation.js";

import auth from "../middleware/authMiddleWare.js";
import { permit } from "../middleware/permissionMiddleWare.js";

const router = express.Router();

router.post("/register", validateRequest(registerSchema), asyncHandler(register));
router.post("/login", validateRequest(loginSchema), asyncHandler(login));
// Admin test route — requires authentication + ADMIN or SUPER_ADMIN role
router.get("/admin-test", auth, permit(["ADMIN", "SUPER_ADMIN"]), (req, res) => {
  return res.json({ message: "Admin access granted" });
});

export default router;