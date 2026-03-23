const express = require("express")
const route = express.Router()
const authMiddleware = require("../middleware/auth.middleware")
const { createKurs, allKurs, updateKurs, myKurs, deleteKurs } = require("../controllers/course.controller")

route.get("/allKurs", allKurs)

route.post("/create", authMiddleware, createKurs)

route.put("/update/:id", authMiddleware, updateKurs)

route.delete("/delete/:id", authMiddleware, deleteKurs)

route.get("/myKurs", authMiddleware, myKurs)

module.exports = route
