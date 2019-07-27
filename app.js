const express = require('express');
const app = express();
const morgan = require('morgan');
const bodyParse = require('body-parser');

app.use(morgan('combined'));
app.use(bodyParse.urlencoded({extended: false}));
app.use(bodyParse.json());

app.use((req, res, next) => {
    res.header('Access-Control-Allow-Origin', '*');
    res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept, Authorization');
    
    if (req.method === 'OPTIONS') {
        res.header('Access-Control-Allow-Methods', 'PUT, POST, PATCH, DELETE, GET');
        return res.status(200).json({});
    }

    next();
});

app.get('/', (req, res, next) => {
    console.log(req.headers.host);
    return res.status(200).json(
        {
            status: 'Success',
            message: 'Hostname: ' + req.headers.host
        }
    );
});

app.use((req, res, next) => {
    const error = new Error('Not found');
    error.status = 404;
    next(error);
});

app.use((error, req, res, next) => {
    res.status(error.status || 500);
    res.json({
        error: {
            message: error.message
        }
    });
});

module.exports = app;