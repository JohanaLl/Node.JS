import mongoose from "mongoose";

const usersSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
    },
    email: {
        type: String,
        required: true,
        unique: true,
    },
    password: {
        type: String,
        required: true,
    },
    role: {
        type: String,
        enum: ["TEACHER", "STUDENT"],
        default: "STUDENT",
    },
    courses: {
        type: [{
            type: mongoose.SchemaTypes.ObjectId, ref: 'Courses'
        }],
        default: [],
    }
})

export const usersModel = mongoose.model('users', usersSchema)