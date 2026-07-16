import express from "express";
import asyncHandler from "../middleware/asyncHandler.js";
import auth from "../middleware/authMiddleWare.js";
import { permit } from "../middleware/permissionMiddleWare.js";
import validateRequest from "../middleware/validationMiddleware.js";
import {
  createEmployeeSchema,
  updateEmployeeSchema,
} from "../validation/employeeValidation.js";
import {
  createEmployee,
  getEmployees,
  getEmployeeById,
  updateEmployee,
  deleteEmployee,
  getMyProfile,
} from "../controllers/employeeController.js";

const router = express.Router();

// Create employee (admin only)
router.post(
  "/",
  auth,
  permit(["ADMIN", "SUPER_ADMIN"]),
  validateRequest(createEmployeeSchema),
  asyncHandler(createEmployee)
);

// List employees (admin only)
router.get("/", auth, permit(["ADMIN", "SUPER_ADMIN"]), asyncHandler(getEmployees));

// Get current user's employee profile
router.get("/me", auth, asyncHandler(getMyProfile));

// Get, update, delete by id (admin only)
router.get("/:id", auth, permit(["ADMIN", "SUPER_ADMIN"]), asyncHandler(getEmployeeById));
router.put(
  "/:id",
  auth,
  permit(["ADMIN", "SUPER_ADMIN"]),
  validateRequest(updateEmployeeSchema),
  asyncHandler(updateEmployee)
);
router.delete("/:id", auth, permit(["ADMIN", "SUPER_ADMIN"]), asyncHandler(deleteEmployee));

export default router;