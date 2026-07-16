export const createEmployeeSchema = {
  fullName: {
    required: true,
    type: "string",
    minLength: 3,
    message: "Full name is required and must be at least 3 characters long",
  },
  employeeId: {
    required: true,
    type: "string",
    minLength: 3,
    message: "Employee ID is required and must be at least 3 characters long",
  },
  email: {
    required: true,
    type: "string",
    pattern: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
    message: "A valid email address is required",
  },
  phone: {
    required: false,
    type: "string",
    pattern: /^\+?[0-9\-\s]{7,20}$/,
    message: "Phone number must be valid",
  },
  department: {
    required: true,
    type: "string",
    minLength: 2,
    message: "Department is required",
  },
  designation: {
    required: true,
    type: "string",
    minLength: 2,
    message: "Designation is required",
  },
  dateOfJoining: {
    required: true,
    type: "string",
    pattern: /^\d{4}-\d{2}-\d{2}$/,
    message: "Date of joining is required and should be in YYYY-MM-DD format",
  },
  status: {
    required: false,
    type: "string",
    pattern: /^(ACTIVE|INACTIVE|TERMINATED)$/,
    message: "Status must be ACTIVE, INACTIVE, or TERMINATED",
  },
};

export const updateEmployeeSchema = {
  fullName: {
    required: false,
    type: "string",
    minLength: 3,
    message: "Full name must be at least 3 characters long",
  },
  employeeId: {
    required: false,
    type: "string",
    minLength: 3,
    message: "Employee ID must be at least 3 characters long",
  },
  email: {
    required: false,
    type: "string",
    pattern: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
    message: "A valid email address is required",
  },
  phone: {
    required: false,
    type: "string",
    pattern: /^\+?[0-9\-\s]{7,20}$/,
    message: "Phone number must be valid",
  },
  department: {
    required: false,
    type: "string",
    minLength: 2,
    message: "Department must be at least 2 characters long",
  },
  designation: {
    required: false,
    type: "string",
    minLength: 2,
    message: "Designation must be at least 2 characters long",
  },
  dateOfJoining: {
    required: false,
    type: "string",
    pattern: /^\d{4}-\d{2}-\d{2}$/,
    message: "Date of joining should be in YYYY-MM-DD format",
  },
  status: {
    required: false,
    type: "string",
    pattern: /^(ACTIVE|INACTIVE|TERMINATED)$/,
    message: "Status must be ACTIVE, INACTIVE, or TERMINATED",
  },
};
