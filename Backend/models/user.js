import mongoose from "mongoose";

const {Schema, model} = mongoose;

// 1. Define the blueprint (Schema)
const userSchema = new Schema(
  {
    userName: {
      type: String,
      required: true,
    },

    userEmail: {
      type: String,
      required: true,
      unique: true,
    },

    userPassword: {
      type: String,
      required: true,
    },

    userRole: {
      type: String,
      enum: ["SUPER_ADMIN", "ADMIN", "USER"],
      default: "USER",
    },

    userPermissions: [
      {
        type: String,
      },
    ],
  },
  { timestamps: true } // Automatically creates createdAt and updatedAt fields
);

// 2. Compile into a usable interface (Model)
export default model("User", userSchema);