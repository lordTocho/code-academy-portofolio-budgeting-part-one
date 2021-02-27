// the main program that will start the backend API service for the application
const express = require('express');
const app = express();

module.exports = app;

const PORT = process.env.PORT || 4001;

// Mount your existing apiRouter below at the '/api' path.
const apiRouter = require('./server/api');
app.use('/api', apiRouter);

app.listen(PORT, () => {
    console.log(`Server listening on port ${PORT}`);
  });