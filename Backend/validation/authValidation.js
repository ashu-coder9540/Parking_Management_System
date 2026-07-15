export const registerSchema = {
    userName: {
        required: true,
        type: "String",
        message: "Name is required",
    },
    userEmail: {
        required: true,
        type: "String",
        pattern: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
        message: "A valid email address is required",
    },
    userPassword: {
        required: true, 
        type: "String",
        minLength: 8,
        message: "Password is required and must be at least 8 characters long",
    }
}

export const loginSchema = {
  userEmail: {
    required: true,
    type: "string",
    pattern: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
    message: "A valid email address is required",
  },
  userPassword: {
    required: true,
    type: "string",
    minLength: 8,
    message: "Password is required and must be at least 8 characters long",
  },
};
