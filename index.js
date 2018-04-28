'use strict';

const express = require('express');
const app = express();
const cors = require('cors');

app.use(express.static(`${__dirname}/build`));

// Serve up the index.html file
app.get('*', (req, res) => {
  res.sendFile(`${__dirname}/build/index.html`);
});

app.listen(process.env.PORT, () => {
  console.log(`Listening on port ${process.env.PORT}`);
});
