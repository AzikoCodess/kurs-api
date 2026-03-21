const { required } = require("joi")
const mongoose = require("mongoose")

const courseSchema = new mongoose.Schema({
    title: {
        type: String,
        required: true,
        minlength: 3
    },
    description: {
        type: String,
        required: true,
        minlength: 5
    },
    price: {
        type: Number,
        required: true,
        min: 0
    },
    teacher: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
        required: true
    },
    category: {
        type: String,
        required: true,
        minlength: 3,
        enum: ["dasturlash", "dizayn", "marketing", "biznes", "til", "matematika"]
    },
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User"
    }
}, { timestamps: true })

const Course = mongoose.model("Course", courseSchema)

module.exports = Course