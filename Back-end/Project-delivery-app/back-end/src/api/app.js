const express = require('express');
const cors = require('cors');
const path = require('path');
const router = require('../routers/router');
// const ErrorGlobal = require('../Error/ErrorGlobal');

const app = express();

app.use(express.json());
app.use(cors());
app.use('/images', express.static(path.resolve(__dirname, 'images')));

app.use('/', router);

app.get('/coffee', (_req, res) => res.status(418).end());

// app.use(ErrorGlobal.handle);

module.exports = app;
