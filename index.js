const express = require('express');
const app = express();
const port = 3000;
const cors = require('cors');

const swaggerJSDoc = require('swagger-jsdoc');
const swaggerUi = require('swagger-ui-express');

const nftRoutes = require('./api/nft.js')
const collectionsRoutes = require('./api/collections.js')
const creatorsRoutes = require('./api/creators.js')
const ownersRoutes = require('./api/owners.js')

const swaggerDefinition = {
  openapi: '3.0.0',
  info: {
    title: 'Awesome NFT Api',
    version: '1.0.0',
  },
  servers: [
    {
      url: 'https://awesome-nft-app.herokuapp.com/',
      description: 'Production server',
    },
    {
      url: 'http://localhost:3000/',
      description: 'Dev server',
    },
  ],
};

const options = {
  swaggerDefinition,
  apis: ['./api/*.js'],
};

const swaggerSpec = swaggerJSDoc(options);

app.use(cors());

app.use('/', nftRoutes);
app.use('/', collectionsRoutes);
app.use('/', creatorsRoutes);
app.use('/', ownersRoutes);

app.use('/docs', swaggerUi.serve, swaggerUi.setup(swaggerSpec));


app.listen(process.env.PORT || port);
