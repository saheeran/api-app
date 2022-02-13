const jwt = require('jsonwebtoken')
let refreshToken = []
module.exports = {
    authenticateToken: (req, res, next) => {
        const authHeader = req.headers['authorization']
        const token = authHeader && authHeader.split(' ')[1]
        if (token == null) res.sendStatus(401)
        jwt.verify(token, process.env.ACCESS_TOKEN_SECRET, (err, user) => {
            if (err) return res.sendStatus(403)
            req.user = user
            next()
        })
    },
    generateAccessToken: (username) => {
        console.log('user',username);
        const token = jwt.sign({username:username},process.env.ACCESS_TOKEN_SECRET,{expiresIn:"4h"})
        return token
    }
    
}