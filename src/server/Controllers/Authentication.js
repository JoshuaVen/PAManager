const jwt = require('jwt-simple')

const config = require('../config')
const User = require('../Models/user')

const tokenForUser = (user) => {
    const timestamp = new Date().getTime()
    return jwt.encode({ sub: user.id, iat: timestamp }, config.secret)
}

exports.signin = (req, res, next) => {
    res.send({ token: tokenForUser(req.user) })
}

exports.signup = (req, res, next) => {
    const name = req.body.name
    const password = req.body.password

    if (!name || !password) {
        return res.status(422).json({ error: "You must provide a name and password" })
    }
    if (password.length < 8) {
        return res.status(422).json({ error: "Password should be at least 8 characters long" })
    }

    User.findOne({ name: name }, (err, existingUser) => {
        if (err) {
            return res.status(500).json({ error: err })
        }
        if (existingUser) {
            return res.status(422).json({ message: 'An existing users already occupied that name' })
        }
        const user = new User({
            name: name,
            password: password
        })
        user.save(err => {
            if (err) {
                return res.status(500).json({ error: err })
            }
            res.json({ token: tokenForUser(user) })
        })
    })
}
