const express = require('express');
const bodyParser = require('body-parser');
const morgan = require('morgan');
const app = express();
const mongoose = require('mongoose');
const router = require('./router')

// DB setup
mongoose.connect('mongodb://localhost/pamanager', {
    useNewUrlParser: true, useUnifiedTopology: true
})


// App setup
app.use(express.static('dist'));
app.use(morgan('combined'));
app.use(bodyParser.json({ type: '*/*' }));
app.use('/api', router)

app.listen(process.env.PORT || 8080, () => console.log(`Listening on port ${process.env.PORT || 8080}!`));
