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

app.get('/search', (req, res) => {
  const search = req.query.q;

  const data = [
    ...response.assets,
    ...response2.assets,
    ...response3.assets,
    ...response4.assets,
    ...response5.assets,
  ];

  const results = data.filter(el => {
    const { name, description, token_id, contract, collection, creator } = el;

    const fullText = `${name} ${description} ${token_id} ${contract.name} ${contract.type} ${collection.name} ${collection.description} ${collection.slug} ${creator.username}`;

    return fullText.indexOf(search) >= 0;
  });

  return res.json({
     assets: results,
     query: search
  });
});

app.listen(process.env.PORT || port);
