const mongoose = require('mongoose')

const animeSchema = new mongoose.Schema({
    anime_details: {
        type: Object,
        required: true,
    },
    mal_id: {
        type: Number,
        required: true,
        unique: true
    },
    title: {
        type: String,
        required: true,
        unique: true
    },
    offline_img: {
        type: String
    }
}, { autoCreate: true })

module.exports = mongoose.model('Anime', animeSchema)
