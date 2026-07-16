import Employee from "../models/employee.js";
import ApiError from "../utils/ApiError.js";

export const createEmployee = async (employeeData, user) => {
  try {
    const data = {
      ...employeeData,
      createdBy: user?.Id || null,
    };
    const employee = await Employee.create(data);
    return employee;
  } catch (error) {
    if (error.code === 11000) {
      const duplicateField = Object.keys(error.keyPattern || {}).join(", ");
      throw new ApiError(409, `Duplicate value for field(s): ${duplicateField}`);
    }
    throw error;
  }
};

export const getEmployees = async () => {
  return Employee.find().sort({ createdAt: -1 });
};

export const getEmployeeById = async (id) => {
  return Employee.findById(id);
};

export const updateEmployee = async (id, updates) => {
  return Employee.findByIdAndUpdate(id, updates, {
    new: true,
    runValidators: true,
  });
};

export const deleteEmployee = async (id) => {
  const employee = await Employee.findById(id);
  if (!employee) {
    return null;
  }
  await employee.deleteOne();
  return true;
};

export const getEmployeeByUserId = async (userId) => {
  return Employee.findOne({ createdBy: userId });
};
