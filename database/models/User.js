const bcrypt = require('bcrypt')
    , mongoose = require('mongoose')

const UserSchema = new mongoose.Schema({
    pseudo: {
        type: String,
        unique: true
    },
    email: {
        type: String,
        required: [true, "L'email est obligatoire"],
        unique: true
    },
    password: {
        type: String,
        required: [true, 'Le mot de passe est obligatoire']
    },
    // Notre Status sera obligatoire pour la création de middleware
    status: {
        type: String,
        default: 'user'
    },
    isAdmin: {
        type: Boolean,
        default: true
    },
})

UserSchema.pre('save', function (next) {
    const user = this
    bcrypt.hash(user.password, 10, (error, encrypted) => {
        user.password = encrypted
        next()
    })
})

module.exports = mongoose.model('User', UserSchema)