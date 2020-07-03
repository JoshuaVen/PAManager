const mongoose = require('mongoose');

const dledAnimeSchema = new mongoose.Schema({
    title: {
        type: String,
        unique: true,
    },
}, { autoIndex: false })

const ModelClass = mongoose.model('Downloaded Anime', dledAnimeSchema)
module.exports = ModelClass
