const mongoose = require("mongoose")

const enrollmentSchema = new mongoose.Schema({
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User"
    },
    course: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Course"
    },
    status: {
        type: String,
        enum: ["active", "completed", "dropped"],
        default: "active"
    },
    progress: {
        type: Number,
        default: 0,
        min: 0,
        max: 100
    }
}, { timestamps: true })

const Enrollment = mongoose.model("Enrollment", enrollmentSchema)

module.exports = Enrollment