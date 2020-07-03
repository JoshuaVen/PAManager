const mongoose = require('mongoose')

const animeSchema = new mongoose.Schema({
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
    offline_loc: {
        type: String,
    },
    jap_title: {
        type: String,
    },
    online_img: {
        type: String,
        required: true
    },
    offline_img: {
        type: String
    },
    synopsis: {
        type: String,
        required: true,
    },
    premierYear: {
        type: Number,
        required: true
    },
    episodes: {
        type: Number,
        required: true
    },
    studio: {
        type: Array,
        required: true
    },
    genre: {
        type: Array,
        required: true
    },
    rating: {
        type: String,
        required: true
    },
    opening: {
        type: Array
    },
    closing: {
        type: Array
    }
}, { autoCreate: true })

module.exports = mongoose.model('Anime', animeSchema)
