const swaggerDocument = {
  openapi: "3.0.0",
  info: {
    title: "Parking Management System API",
    version: "1.0.0",
    description: "API documentation for the Parking Management System backend.",
  },
  servers: [
    {
      url: "http://localhost:5000",
      description: "Local development server",
    },
  ],
  components: {
    securitySchemes: {
      bearerAuth: {
        type: "http",
        scheme: "bearer",
        bearerFormat: "JWT",
      },
    },
    schemas: {
      RegisterRequest: {
        type: "object",
        properties: {
          userName: { type: "string", example: "John Doe" },
          userEmail: { type: "string", format: "email", example: "john@example.com" },
          userPassword: { type: "string", example: "Password123!" },
        },
        required: ["userName", "userEmail", "userPassword"],
      },
      LoginRequest: {
        type: "object",
        properties: {
          userEmail: { type: "string", format: "email", example: "john@example.com" },
          userPassword: { type: "string", example: "Password123!" },
        },
        required: ["userEmail", "userPassword"],
      },
      AuthResponse: {
        type: "object",
        properties: {
          message: { type: "string" },
          token: { type: "string" },
          user: {
            type: "object",
            properties: {
              userName: { type: "string" },
              userEmail: { type: "string" },
            },
          },
        },
      },
      ErrorResponse: {
        type: "object",
        properties: {
          success: { type: "boolean" },
          status: { type: "string" },
          message: { type: "string" },
          extraDetails: {
            type: "array",
            items: {
              type: "object",
              properties: {
                field: { type: "string" },
                message: { type: "string" },
              },
            },
          },
        },
      },
    },
  },
  paths: {
    "/api/auth/register": {
      post: {
        tags: ["Auth"],
        summary: "Register a new user",
        requestBody: {
          required: true,
          content: {
            "application/json": {
              schema: { $ref: "#/components/schemas/RegisterRequest" },
            },
          },
        },
        responses: {
          "201": {
            description: "User registered successfully",
            content: {
              "application/json": {
                schema: {
                  type: "object",
                  properties: {
                    message: { type: "string" },
                  },
                  example: { message: "User registered Successfully" },
                },
              },
            },
          },
          "400": {
            description: "Validation or registration error",
            content: {
              "application/json": {
                schema: { $ref: "#/components/schemas/ErrorResponse" },
              },
            },
          },
        },
      },
    },
    "/api/auth/login": {
      post: {
        tags: ["Auth"],
        summary: "Login and receive a JWT",
        requestBody: {
          required: true,
          content: {
            "application/json": {
              schema: { $ref: "#/components/schemas/LoginRequest" },
            },
          },
        },
        responses: {
          "200": {
            description: "Login successful",
            content: {
              "application/json": {
                schema: { $ref: "#/components/schemas/AuthResponse" },
              },
            },
          },
          "400": {
            description: "Validation failed or invalid credentials",
            content: {
              "application/json": {
                schema: { $ref: "#/components/schemas/ErrorResponse" },
              },
            },
          },
        },
      },
    },
    "/api/auth/admin-test": {
      get: {
        tags: ["Auth"],
        summary: "Test admin-only access",
        security: [{ bearerAuth: [] }],
        responses: {
          "200": {
            description: "Admin access granted",
            content: {
              "application/json": {
                schema: {
                  type: "object",
                  properties: {
                    message: { type: "string" },
                  },
                  example: { message: "Admin access granted" },
                },
              },
            },
          },
          "401": {
            description: "Unauthorized",
            content: {
              "application/json": {
                schema: { $ref: "#/components/schemas/ErrorResponse" },
              },
            },
          },
          "403": {
            description: "Forbidden",
            content: {
              "application/json": {
                schema: { $ref: "#/components/schemas/ErrorResponse" },
              },
            },
          },
        },
      },
    },
  },
};

export default swaggerDocument;
