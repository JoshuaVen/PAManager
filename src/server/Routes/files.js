const { Router } = require('express');

const router = new Router();

const animeList = require('../Controllers/animeList')

router.get('/update', animeList.updateDB)

router.get('/downloaded_list', animeList.showDownloaded)

module.exports = router
