const mongoose = require('mongoose')

const Person = mongoose.model('Person', {
    name: String,
    email: String,
    approved: Boolean
})

module.exports = Person