const Jikan = require('jikan-node');
const url = require('url')
const mal = new Jikan();

exports.searchDownloaded = (req, res, next) => {
    const address = req.url
    const query = url.parse(address, true).query.anime;

    mal.search('anime', query, { page: 1, limit: 10 })
        .then(response => res.send(response.results))
        .catch(err => res.status(400).json({ error: err }))
}
