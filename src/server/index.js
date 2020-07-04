const express = require('express');
const morgan = require('morgan');
const app = express();
const mongoose = require('mongoose');
const router = require('./router')
const cookieParser = require('cookie-parser')


// DB setup
mongoose.connect('mongodb://localhost/pamanager', {
    useNewUrlParser: true, useUnifiedTopology: true
})


// App setup
app.use(cookieParser());
app.use(express.static('dist'));
app.use(morgan('combined'));
app.use('/api', router)


app.listen(process.env.PORT || 8080, () => console.log(`Listening on port ${process.env.PORT || 8080}!`));
