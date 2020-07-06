const Jikan = require('jikan-node');
const fs = require('fs')
const axios = require('axios')
const url = require('url')
const mal = new Jikan();

const Anime = require('../Models/anime')
const DledAnime = require('../Models/dledAnime')

const saveImage = (url, loc) => {
    let file = fs.createWriteStream(loc);
    axios({
        method: 'get',
        url: url,
        responseType: 'stream'
    }).then(
        response => {
            response.data.pipe(file)
        })
        .catch(e => console.log(e));
}

exports.searchDownloaded = (req, res, next) => {
    const address = req.url
    const query = url.parse(address, true).query.anime;

    mal.search('anime', query, { page: 1, limit: 10 })
        .then(response => res.send(response.results))
        .catch(err => res.status(400).json({ error: err }))
}

exports.linkToMal = (req, res, next) => {
    const search_title = req.body.searchTitle
    const mal_id = req.body.mal_id

    mal.findAnime(mal_id)
        .then(response => {

            let imageAsset = 'Assets/images/';
            if (!fs.existsSync(imageAsset)) {
                fs.mkdirSync(imageAsset)
            }

            let imageFile = imageAsset + response.mal_id + '.jpg';
            saveImage(response.image_url, imageFile)

            Anime.insertMany({
                mal_id: response.mal_id,
                title: response.title,
                jap_title: response.title_japanese,
                online_img: response.image_url,
                offline_img: imageFile,
                synopsis: response.synopsis,
                premier_year: response['aired']['prop']['from']['year'],
                episodes: response.episodes,
                studio: response.studios,
                related: response.related,
                genre: response.genres,
                opening: response.opening_themes,
                closing: response.ending_themes
            }).then(document => {
                DledAnime.updateOne({ 'title': search_title },
                    { 'isAssociated': true, 'associated_mal_id': response.mal_id })
                    .then(result => res.send(result))
                    .catch(updateError => res.status(500).json({ error: updateError }))
            })
                .catch(insertError => {
                    res.status(500).json({ error: insertError })
                })

        })
        .catch(error => res.status(400).json({ error: error }))
}
