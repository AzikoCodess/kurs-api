const express = require("express")
const route = express.Router()
const authMiddleware = require("../middleware/auth.middleware")
const upload = require("../middleware/uploads")
const { createKurs, allKurs, updateKurs, myKurs, deleteKurs, allCourse } = require("../controllers/course.controller")

route.get("/allKurs", allKurs)

route.post("/create", authMiddleware, upload.single("image"), createKurs)

route.put("/update/:id", authMiddleware, updateKurs)

route.delete("/delete/:id", authMiddleware, deleteKurs)

route.get("/myKurs", authMiddleware, myKurs)

route.get("/allCourse", allCourse)

module.exports = route
