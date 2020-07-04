const { Router } = require('express');

const router = new Router();

const files = require('./Routes/files')

router.use('/files', files)

router.get('/', (req, res) => {
    res.send('This is the api entrypoint')
})

module.exports = router
