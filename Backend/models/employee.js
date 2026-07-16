import mongoose from "mongoose";

const {Schema, model} = mongoose;

// Define the blueprint (Schema)
const employeeSchema = new Schema(
    {
        fullName: {
            type: String,
            required: true,
            trim: true,
        },
        employeeId: {
            type: String,
            required: true,
            unique: true,
            trim: true,
            uppercase: true,
        },
        email: {
            type: String,
            required: true,
            unique: true,
            trim: true,
            lowercase: true,
            match: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
        },
        phone: {
            type: String,
            trim: true,
            match: /^\+?[0-9\-\s]{7,20}$/,
        },
        department: {
            type: String,
            required: true,
            trim: true,
        },
        designation: {
            type: String,
            required: true,
            trim: true,
        },
        dateOfJoining: {
            type: Date,
            required: true,
        },
        status: {
            type: String,
            enum: ["ACTIVE", "INACTIVE", "TERMINATED"],
            default: "ACTIVE",
        },
        manager: {
            type: Schema.Types.ObjectId,
            ref: "Employee",
            default: null,
        },
        photoUrl: {
            type: String,
            trim: true,
        },
        documents: [
            {
                filename: { type: String, trim: true },
                url: { type: String, trim: true },
                uploadedAt: { type: Date, default: Date.now },
            },
        ],
        createdBy: {
            type: Schema.Types.ObjectId,
            ref: "User",
            default: null,
        },
    },
    {
        timestamps: true, // createdAt, updatedAt
    }
);

export default model("Employee", employeeSchema);