const { sendStatus } = require("express/lib/response")
const jwt = require('jsonwebtoken')

module.exports = {
    authenticateToken:(req,res,next)=>{
    const authHeader = req.headers['authorization']
        const token = authHeader && authHeader.split(' ')[1]
        if (token == null) sendStatus(401)
        jwt.verify(token, process.env.ACCESS_TOKEN_SECRET, (err, user) => {
            if (err) return sendStatus(403)
            req.user = user
            next()
        })
   }
}