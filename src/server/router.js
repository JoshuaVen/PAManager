const Authentication = require('./Controllers/Authentication')
const mal = require('./Controllers/mal')
const passportService = require('./Services/passport')
const passport = require('passport')
const bodyParser = require('body-parser');

const requireAuth = passport.authenticate('jwt', { session: false })
const requireSignin = passport.authenticate('local', { session: false })

const { Router } = require('express');

const router = new Router();
router.use(bodyParser.json());
router.use(bodyParser.raw());

const animes = require('./Routes/anime')
const files = require('./Routes/files')

router.use('/anime', requireAuth, animes)

router.use('/files', requireAuth, files)

router.get('/', requireAuth, (req, res) => {
    res.send({ message: 'hello' })
})

router.get('/mal', requireAuth, mal.mal)

router.post('/signin', requireSignin, Authentication.signin)

router.post('/signup', Authentication.signup)

module.exports = router
