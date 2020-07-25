const Jikan = require('jikan-node');
const fs = require('fs')
const axios = require('axios')
const url = require('url')
const mal = new Jikan();

const Anime = require('../Models/anime')
const DledAnime = require('../Models/dledAnime');

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
    const params = {
        q: req.body.search,
        limit: 10
    };
    axios.get('https://api.myanimelist.net/v2/anime', {
        params: params,
        headers: {
            Authorization: `Bearer ${req.body.access_token}`
        }
    })
        .then((response) => {
            res.send({ data: response.data })
        })
        .catch((error) => {
            res.status(error.response.status).json({ error })
        })
}

exports.unlinkFromMal = (req, res, next) => {
    const animeToUnlink = req.body.animeTitle
    DledAnime.findOneAndUpdate(
        { 'title': animeToUnlink },
        { 'isAssociated': false, '$unset': { 'associated_mal_id': 1 } }
    )
        .then(doc => {
            if (!doc) {
                res.status(200).json({ message: 'Nothing found using title: ' + animeToUnlink })
            }
            const associated_mal_id = doc.associated_mal_id
            Anime.findOneAndRemove({ 'mal_id': associated_mal_id }, (errDeletion, doc) => {
                if (errDeletion) {
                    res.send(errDeletion)
                }
                if (!doc) {
                    res.status(200).json({ title: animeToUnlink, message: 'Title is currently unlinked' })
                } else {
                    res.send(doc)
                }
            })
        }).catch(errFinding => {
            res.status(500).json({ errFinding })
        })
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
                offline_img: imageFile,
                anime_details: response
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
