const { Router } = require('express');
const bodyParser = require('body-parser');

const router = new Router();
router.use(bodyParser.json());
router.use(bodyParser.raw());


const animeList = require('../Controllers/animeList')
const jikan = require('../Controllers/malList')

router.post('/unlink', jikan.unlinkFromMal)

router.post('/link', jikan.linkToMal)

router.post('/uploadList', animeList.uploadList)

router.get('/search', jikan.searchDownloaded)

router.get('/update', animeList.updateDB)

router.get('/addEpisode', animeList.addEpisodes)

router.get('/downloaded_list', animeList.showDownloaded)

module.exports = router
