const Enrollment = require("../models/Enrollment.model")
const Course = require("../models/Course.model")
const User = require("../models/User.model")
const UserDro = require("../dtos/user.dto")

const enrollment = async (req, res) => {
    try {
        const { id } = req.params
        const courseId = await Course.findById(id)
        if (!courseId) {
            return res.status(404).json({ error: "Kurs topilmadi!" })
        }
        const kursgaQoshildi = new Enrollment({
            user: req.user.id,
            course: id
        })
        await kursgaQoshildi.save()
        res.status(201).json({ message: "Kursga qoshildi !", kursgaQoshildi })
    } catch (error) {
        console.log(error)
        res.status(500).json({ error: "Serverda xatolik!" })
    }
}

module.exports = { enrollment }

