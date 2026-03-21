const User = require("../models/User.model")
const bcrypt = require("bcryptjs")
const jwt = require("jsonwebtoken")
const UserDto = require("../dtos/user.dto")

async function register(req, res) {
    try {
        const { username, password } = req.body
        const hashedPassword = await bcrypt.hash(password, 10)
        if (await User.findOne({ username })) {
            return res.status(403).json({ error: "Bu username band" })
        }
        const user = new User({
            username, password: hashedPassword
        })
        await user.save()
        const userDto = new UserDto(user)
        res.status(201).json({ message: "Foydalanuchi qo'shildi", userDto })
    } catch (error) {
        res.status(500).json({ error: error.message })
    }
}

const login = async (req, res) => {
    try {
        const { password, username } = req.body
        const user = await User.findOne({ username })
        if (!user) {
            return res.status(404).json({ error: "User topilmadi!" })
        }
        const isPasswordValid = await bcrypt.compare(password, user.password)
        if (!isPasswordValid) {
            return res.status(404).json({ error: "User topilmadi!!" })
        }
        const userDto = new UserDto(user)
        const token = jwt.sign({ id: user.id, role: userDto.role }, process.env.JWT_SECRET, { expiresIn: "1h" })
        res.status(200).json({ userDto, token })
    } catch (error) {
        res.status(500).json({ error: error.message })
    }
}

module.exports = { register, login }