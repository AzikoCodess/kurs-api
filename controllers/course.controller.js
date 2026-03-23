const Course = require("../models/Course.model")
const Enrollment = require("../models/Enrollment.model")
const userDto = require("../dtos/user.dto")
const mongoose = require("mongoose")
const AppError = require("../utils/appError")


const createKurs = async (req, res) => {
    try {
        if (req.user.role !== "admin" && req.user.role !== "teacher") {
            throw new AppError("Buni faqat admin qila oladi!!!", 403)
        }
        const { title, description, price, teacher, category } = req.body
        const image = req.file ? req.file.filename : null
        const course = new Course({ title, description, price, teacher, category, user: req.user.id, image })
        await course.save()
        res.status(201).json({ message: "Qo'shildi !", course })
    } catch (error) {
        res.status(500).json({ error: error.message })
    }
}

const allKurs = async (req, res) => {
    try {
        const allKurs = await Course.find()
            .populate("teacher", "username")
        res.status(200).json({ allKurs })
    } catch (error) {
        next(error)
    }
}

const allCourse = async (req, res, next) => {
    try {
        const page = parseInt(req.query.page) || 1
        const limit = parseInt(req.query.limit) || 3
        const skip = (page - 1) * limit

        const total = await Course.countDocuments()
        const courses = await Course.find()
            .populate("teacher", "username")
            .skip(skip)
            .limit(limit)

        res.status(200).json({
            total, page,
            totalPages: Math.ceil(total / limit),
            courses
        })

    } catch (error) {
        next(error)
    }
}

const updateKurs = async (req, res) => {
    try {
        const { id } = req.params
        const foundCourse = await Course.findById(id)
        if (req.user.role !== "admin" && req.user.id !== foundCourse?.user?.toString()) {
            return res.status(403).json({ error: "Sizga ruxsat yo'q!" })
        }
        if (!mongoose.Types.ObjectId.isValid(id)) {
            return res.status(400).json({ error: "Kurs id si xato yozilgan!" })
        }
        if (!foundCourse) {
            return res.status(404).json({ error: "Kurs topilmadi!" })
        }
        await Course.findByIdAndUpdate(id, req.body, { new: true })
        res.status(200).json({ message: "Yangilandi!" })
    } catch (error) {
        console.log(error)
        res.status(500).json({ error: "Serverda xatolik!" })
    }
}

const myKurs = async (req, res) => {
    try {
        const meniki = await Course.find({ user: req.user.id })
            .populate("user")
            .populate("teacher")
        res.json(meniki)
    } catch (error) {
        res.status(500).json({ error: "Serverda xatolik!" })
    }
}

const deleteKurs = async (req, res) => {
    try {
        const { id } = req.params
        if (req.user.role !== "admin") {
            return res.status(403).json({ error: "Faqat admin o'chira oladi" })
        }
        if (!mongoose.Types.ObjectId.isValid(id)) {
            return res.status(400).json({ error: "Kurs id si xato yozilgan!" })
        }
        const foundCourse = await Course.findById(id)
        if (!foundCourse) {
            return res.status(404).json({ error: "Kurs topilmadi" })
        }
        await Course.findByIdAndDelete(id)
        res.status(200).json({ message: "Kurs o'chirildi" })
    } catch (error) {
        res.status(500).json({ error: "Serverda xatolik!" })
    }
}

module.exports = { createKurs, allKurs, updateKurs, myKurs, deleteKurs, allCourse }
