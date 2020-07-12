const mongoose = require('mongoose')
const bcrypt = require('bcrypt')

const UserSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
        unique: true
    },
    password: {
        type: String,
        required: true
    }
})

UserSchema.pre('save', function (next) {
    const user = this
    bcrypt.genSalt(10, (err, salt) => {
        if (err) { return next(err) }

        bcrypt.hash(user.password, salt, (err, hash) => {
            if (err) { return next(err) }

            user.password = hash
            next()
        })
    })
})

UserSchema.methods.comparePassword = function (candidatePassword, callback) {
    bcrypt.compare(candidatePassword, this.password, function (err, isMatch) {
        if (err) { return callback(err) }

        callback(null, isMatch)
    })
}

module.exports = mongoose.model('User', UserSchema)
