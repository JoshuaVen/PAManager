const express = require('express');
const morgan = require('morgan');
const mongoose = require('mongoose');
const cookieParser = require('cookie-parser')
const cors = require('cors')

const corsOptions = {
    origin: 'http://localhost:3000'
}

const app = express();
const router = require('./router')

// DB setup
mongoose.connect('mongodb://localhost/pamanager', {
    useNewUrlParser: true, useUnifiedTopology: true
})


// App setup
app.use(cors(corsOptions))
app.use(cookieParser());
app.use(express.static('dist'));
app.use(morgan('combined'));
app.use('/api', router)


app.listen(process.env.PORT || 8080, () => console.log(`Listening on port ${process.env.PORT || 8080}!`));
