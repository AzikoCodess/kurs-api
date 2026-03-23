const Course = require("../models/Course.model")
const Enrollment = require("../models/Enrollment.model")
const userDto = require("../dtos/user.dto")


const createKurs = async (req, res) => {
    try {
        if (req.user.role !== "admin" && req.user.role !== "teacher") {
            return res.status(403).json({ error: "Buni faqat admin qila oladi!!!" })
        }
        const { title, description, price, teacher, category } = req.body
        const course = new Course({ title, description, price, teacher, category, user: req.user.id })
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
            .populate("category")
        res.status(200).json(allKurs)
    } catch (error) {
        res.status(500).json({ error: "Serverda xatolik!" })
    }
}

const updateKurs = async (req, res) => {
    try {
        const { id } = req.body
        const courseId = await Course.findById(id)
        if (!courseId) {
            return res.status(404).json({ error: "Kurs topilmadi!" })
        }
        if (req.user.role !== "admin" && req.user.id !== courseId.user.toString()) {
            return res.status(403).json({ error: "Sizga ruxsat yo'q!" })
        }
        await Course.findByIdAndUpdate(id, req.body, { new: true })
        res.status(200).json({ message: "Yangilandi!" })
    } catch (error) {
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
            return res.status(404).json({ error: "Faqat admin o'chira oladi" })
        }
        const courseId = await Course.findByIdAndDelete(id)
        if (!courseId) {
            return res.status(404).json({ error: "Kurs topilmadi" })
        }
        await Course.findByIdAndDelete(id)
        res.status(200).json({ message: "Kurs o'chirildi" })
    } catch (error) {
        res.status(500).json({ error: "Serverda xatolik!" })
    }
}

module.exports = { createKurs, allKurs, updateKurs, myKurs, deleteKurs }
