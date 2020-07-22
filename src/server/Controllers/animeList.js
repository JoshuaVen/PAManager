const DledAnime = require('../Models/dledAnime')
const Anime = require('../Models/anime')
const fs = require('fs')
const path = require('path')

exports.uploadList = (req, res, next) => {
    const localList = req.body

    // TODO: save the user's list to the database (downloaded animes)
    DledAnime.find({}, (err, docs) => {
        if (err) { return res.send({ err }) }

        // if there are no current list content in the database,
        // save it immediately
        let toBeInserted = localList.map(anime => ({ title: anime }))
        if (docs.length === 0) {
            DledAnime.insertMany(toBeInserted, (err) => {
                if (err) { return res.send({ err }) }

                return res.send({ status: 'OK', inserts: toBeInserted.length })
            })
        } else {
            // else, compare the two and save the new list items
            const docsResult = docs.map(anime => anime.title)
            let filterNew = localList.filter(anime => !docsResult.includes(anime))
            filterNew = filterNew.map(newItem => ({ title: newItem }))
            DledAnime.insertMany(filterNew, (err) => {
                if (err) { return res.send({ err }) }

                return res.send({ status: 'OK', inserts: filterNew.length })
            })
        }
    })
}

exports.showDownloaded = (req, res, next) => {
    DledAnime.find({ 'isAssociated': false }, { '_id': false, '__v': false }, { sort: { title: 1 } }, (err, unAssociated) => {
        if (err) {
            res.status(500).json({ error: err })
        }
        Anime.find({}, {
            'mal_id': true,
            'title': true,
            'offline_img': true,
            'anime_details': true
        }, { sort: { title: 1 } }, (err, docs) => {
            if (err) {
                res.status(500).json({ error: err })
            }
            let associatedDocs = []
            docs.forEach(doc => {
                let project = {
                    'mal_id': doc.anime_details.mal_id,
                    'title': doc.anime_details.title,
                    'offline_img': doc.offline_img,
                    'genre': doc.anime_details.genres,
                    'premier_year': doc.anime_details.aired.prop.from.year
                }
                associatedDocs.push(project)
            })
            res.status(200).json({ unAssociated, associatedDocs })
        })
    })
}

exports.addEpisodes = (req, res, next) => {
    const animeSource = 'E:/'
    DledAnime.find({}, {}, { 'sort': 'title' }, (err, docs) => {
        if (err) { return res.send({ err }) }
        docs.forEach(anime => {

            // get files in the folder
            const folder = anime.title
            fs.readdir(path.join(animeSource, folder), (err, files) => {

                // save the files to the database
                DledAnime.findOneAndUpdate({ 'title': folder }, { 'episodes': files }, (err, doc) => {
                    if (err) { return res.send({ err }) }

                })
            })
        })
        return res.send({ 'updated': docs.length, 'operation': 'OK', 'message': 'add/sync Episodes from folder' })
    })
}

exports.updateDB = (req, res, next) => {
    const animeSource = 'E:/'
    let dirs = []
    // Insert to dirs animes that are not yet in the collection
    fs.readdirSync(animeSource).map(
        name => {
            if (
                !name.includes('.') &&
                !name.includes('System Volume Information') &&
                !name.includes('Android') &&
                !name.includes('Images') &&
                !name.includes('Movies') &&
                !name.includes('Music')) {
                dirs.push(name)
            }
        }
    )

    DledAnime.find({ 'title': dirs }, { '_id': false, '__v': false }, (err, response) => {
        if (err) {
            res.status(500).json({ error: err })
        }
        if (response) {
            let updatedResponse = []
            response.forEach(dir => updatedResponse.push(dir.title))
            updatedResponse = dirs.filter(x => !updatedResponse.includes(x))
            if (updatedResponse.length >= 1) {
                let toInsert = []
                updatedResponse.forEach(insertItem => {
                    toInsert.push({ title: insertItem, isAssociated: false })
                });
                DledAnime.insertMany(toInsert, (err) => {
                    if (err) {
                        res.status(500).json({ error: err })
                    }
                    res.status(200).json({ message: 'Inserted items', count: toInsert.length, insertedItems: toInsert })
                })
            } else {
                res.status(304).json({ message: 'No items inserted to database' })
            }
        }
    })
}
