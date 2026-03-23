const express = require("express")
const route = express.Router()
const authMiddleware = require("../middleware/auth.middleware")
const { enrollment } = require("../controllers/enrollment.controller")

route.post("/:id/enrollment", authMiddleware, enrollment)

module.exports = route