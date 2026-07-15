import ApiError from "../utils/ApiError.js";

const validateRequest = (schema) => {
  return (req, res, next) => {
    const errors = []; // Array to hold validation errors

    // Iterate over each field in the schema and validate the corresponding value in req.body
    for(const [field, rule] of Object.entries(schema)) {
      const value = req.body[field];

      // Check for required fields
      if (rule.required && (value === undefined || value === null || value === "")) {
        errors.push({ field, message: rule.message || `${field} is required` });
        continue;
      }
      
       // Only validate if the value is present
      if (value !== undefined && value !== null) {
        // Validate type, pattern, and minLength if specified in the schema
        if (rule.type && typeof value !== rule.type) {
          errors.push({ field, message: `${field} must be a ${rule.type}` });
          continue;
        }

        if (rule.pattern && !rule.pattern.test(value)) {
          errors.push({ field, message: rule.message || `${field} is invalid` });
          continue;
        }

        if (rule.minLength && typeof value === "string" && value.length < rule.minLength) {
          errors.push({ field, message: rule.message || `${field} must be at least ${rule.minLength} characters` });
          continue;
        }
      }
    }

    // If there are validation errors, return a 400 response with the errors
    if (errors.length > 0) {
      return next(new ApiError(400, "Validation failed", errors));
    }

    // If validation passes, proceed to the next middleware or route handler
    next();
  };
};

export default validateRequest;
