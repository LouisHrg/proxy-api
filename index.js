const express = require('express');
const app = express();
const port = 3000;
const cors = require('cors');
const { response, response2, response3, response4, response5 } = require('./response.js');

app.use(cors())

app.get('/', (req, res) => {
  switch (req.query.page) {
    case "1":
      return res.json(response);
    case "2":
      return res.json(response2);
    case "3":
      return res.json(response3);
    case "4":
      return res.json(response4);
    case "5":
      return res.json(response5);
    default:
      return res.json(response);
  }
});

app.listen(process.env.PORT || port);
