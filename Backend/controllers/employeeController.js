import * as employeeService from "../services/employeeService.js";
import ApiError from "../utils/ApiError.js";

export const createEmployee = async (req, res, next) => {
  try {
    const employeeData = req.body;
    const created = await employeeService.createEmployee(employeeData, req.user);

    return res.status(201).json({
      message: "Employee created successfully",
      employee: created,
    });
  } catch (error) {
    next(error);
  }
};

export const getEmployees = async (req, res, next) => {
  try {
    const employees = await employeeService.getEmployees();
    return res.status(200).json({
      count: employees.length,
      employees,
    });
  } catch (error) {
    next(error);
  }
};

export const getEmployeeById = async (req, res, next) => {
  try {
    const { id } = req.params;
    const employee = await employeeService.getEmployeeById(id);
    if (!employee) {
      throw new ApiError(404, "Employee not found");
    }
    return res.status(200).json({ employee });
  } catch (error) {
    next(error);
  }
};

export const updateEmployee = async (req, res, next) => {
  try {
    const { id } = req.params;
    const updated = await employeeService.updateEmployee(id, req.body);
    if (!updated) {
      throw new ApiError(404, "Employee not found");
    }
    return res.status(200).json({
      message: "Employee updated successfully",
      employee: updated,
    });
  } catch (error) {
    next(error);
  }
};

export const deleteEmployee = async (req, res, next) => {
  try {
    const { id } = req.params;
    const deleted = await employeeService.deleteEmployee(id);
    if (!deleted) {
      throw new ApiError(404, "Employee not found");
    }
    return res.status(200).json({ message: "Employee deleted successfully" });
  } catch (error) {
    next(error);
  }
};

export const getMyProfile = async (req, res, next) => {
  try {
    if (!req.user || !req.user.Id) {
      throw new ApiError(401, "Unauthorized");
    }
    const employee = await employeeService.getEmployeeByUserId(req.user.Id);
    if (!employee) {
      throw new ApiError(404, "Employee profile not found");
    }
    return res.status(200).json({ employee });
  } catch (error) {
    next(error);
  }
};
