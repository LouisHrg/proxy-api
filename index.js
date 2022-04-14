const express = require('express');
const app = express();
const port = 3000;
const cors = require('cors');
const { response } = require('./response.js');

app.use(cors())

app.get('/', (req, res) => {
  res.json(response);
});

app.listen(process.env.PORT || port);
