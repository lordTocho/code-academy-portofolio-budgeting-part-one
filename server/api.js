// the main API router for the program
// The main router for the application

const express = require('express');
const envelopeRouter = require('./envelope');
const apiRouter = express.Router();

apiRouter.use('/envelope', envelopeRouter );

module.exports = apiRouter;