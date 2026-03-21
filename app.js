require("dotenv").config()
const express = require("express")
const mongoose = require("mongoose")
const app = express()
app.use(express.json())


mongoose.connect(process.env.MONGO_URL)
    .then(() => console.log(`Connect to MongoDB ${process.env.MONGO_URL}`))
    .catch((err) => console.log(err))

const authRoute = require("./routes/auth.route")
const courseRoute = require("./routes/course.route")

app.use("/auth", authRoute)
app.use("/course", courseRoute)


app.listen(process.env.PORT, () => {
    console.log("Server is running on port ", process.env.BASE_URL)
})