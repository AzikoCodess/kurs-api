const jwt = require("jsonwebtoken")

const authMiddleware = (req, res, next) => {
    try {
        const authHeader = req.headers.authorization
        const token = authHeader && authHeader.startsWith("Bearer ") ? authHeader.split(" ")[1] : authHeader
        if (!token){
            res.status(401).json({ error: "Token topilmadi!"})
        }
        const decodedToken = jwt.verify(token, process.env.JWT_SECRET)
        req.user = decodedToken
        next()
    } catch (error) {
        res.status(500).json({ error: "Token noto'g'ri" })
    }
}

module.exports = authMiddleware