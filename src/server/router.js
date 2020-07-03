const { Router } = require('express');
const bodyParser = require('body-parser');

const router = new Router();

const files = require('./Routes/files')
const connect = require('./Controllers/connect')

router.use(bodyParser.urlencoded({ extended: false }))
router.use(bodyParser.json())
router.use('/files', files)

router.get('/', (req, res) => {
    res.send('This is the api entrypoint')
})

router.post('/connect', connect.connect)

module.exports = router
