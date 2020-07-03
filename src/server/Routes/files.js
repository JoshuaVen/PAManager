const { Router } = require('express');
const fs = require('fs')

const router = new Router();

const DledAnime = require('../Models/dledAnime')

router.get('/', (req, res, next) => {
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
                    toInsert.push({ title: insertItem })
                });
                DledAnime.insertMany(toInsert, (err) => {
                    if (err) {
                        res.status(500).json({ error: err })
                    }
                    res.status(200).json({ message: 'Inserted items', count: toInsert.length })
                })
            } else {
                res.status(304).json({ message: 'No items inserted to database' })
            }
        }
    })
})

module.exports = router
