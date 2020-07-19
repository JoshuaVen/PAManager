const { Router } = require('express');
const bodyParser = require('body-parser');
const url = require('url')

const Anime = require('../Models/anime')
const router = new Router();
router.use(bodyParser.json());
router.use(bodyParser.raw());

router.get('/', (req, res, next) => {
    const req_url = req.url
    const mal_id = url.parse(req_url, true).query.mal_id
    if (mal_id)
        Anime.findOne({ 'mal_id': mal_id }, (err, doc) => {
            if (err) { return res.send({ err }) }
            if (!doc) { return res.sendStatus(204) }
            return res.send(doc)
        })
    else
        res.send('Anime data APIs entrypoint')
})

module.exports = router
