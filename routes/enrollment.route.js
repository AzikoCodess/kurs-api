const express = require("express")
const route = express.Router()
const authMiddleware = require("../middleware/auth.middleware")
const { enrollment, myEnrollments, allEnrollments } = require("../controllers/enrollment.controller")

route.post("/:id/enrollment", authMiddleware, enrollment)

route.get("/myEnrollments", authMiddleware, myEnrollments)

route.get("/allEnrollments", authMiddleware, allEnrollments)

module.exports = route