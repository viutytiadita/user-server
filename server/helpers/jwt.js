const jwt = require('jsonwebtoken')

module.exports = {
    sign(payload){
        return jwt.sign(payload, process.env.JWT_SECRET, { expiresIn: '16h' })
    },
    verify(token){
        return jwt.verify(token, process.env.JWT_SECRET)
    }
}