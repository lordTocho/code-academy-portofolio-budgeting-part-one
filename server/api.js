// the main API router for the program
const express = require('express');
const envelopeRouter = require('./envelope');
const apiRouter = express.Router();

apiRouter.use('/envelope', envelopeRouter );

module.exports = apiRouter;