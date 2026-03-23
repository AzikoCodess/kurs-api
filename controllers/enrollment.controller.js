const Enrollment = require("../models/Enrollment.model")
const Course = require("../models/Course.model")
const User = require("../models/User.model")
const UserDto = require("../dtos/user.dto")
const mongoose = require("mongoose")

const enrollment = async (req, res) => {
    try {
        const { id } = req.params
        if (!mongoose.Types.ObjectId.isValid(id)) {
            return res.status(400).json({ error: "Kurs id si xato yozilgan!" })
        }
        const foundCourse = await Course.findById(id)
        const existingEnrollment = await Enrollment.findOne({ user: req.user.id, course: id })
        if (!foundCourse) {
            return res.status(404).json({ error: "Kurs topilmadi!" })
        }
        if (existingEnrollment) {
            return res.status(400).json({ error: "Siz bu kursga allaqachon qoshilgansiz!" })
        }
        const kursgaQoshildi = new Enrollment({
            user: req.user.id,
            course: id
        })
        await kursgaQoshildi.save()
        res.status(201).json({ message: "Kursga qoshildi !", kursgaQoshildi })
    } catch (error) {
        res.status(500).json({ error: "Serverda xatolik!" })
    }
}

const myEnrollments = async (req, res) => {
    try {
        const foundCourses = await Enrollment.find({ user: req.user.id })
        res.status(200).json(foundCourses)
    } catch (error) {
        res.status(500).json({ error: "Serverda xatolik!" })
    }
}

const allEnrollments = async (req, res) => {
    try {
        if (req.user.role !== "admin" && req.user.role !== "teacher") {
            return res.status(404).json({ message: "Ruxsat yo'q" })
        }
        const foundCourses = await Enrollment.find()
        res.json(foundCourses)
    } catch (error) {
        res.status(500).json({ error: "Serverda xatolik!" })
    }
}

module.exports = { enrollment, myEnrollments, allEnrollments }

