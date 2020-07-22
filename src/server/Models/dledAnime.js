const mongoose = require('mongoose');

const dledAnimeSchema = new mongoose.Schema({
    title: {
        type: String,
        unique: true,
    },
    isAssociated: {
        type: Boolean,
        default: false
    },
    associated_mal_id: {
        type: Number
    },
    episodes: {
        type: Array
    }
}, { autoIndex: false })

const ModelClass = mongoose.model('Downloaded Anime', dledAnimeSchema)
module.exports = ModelClass
