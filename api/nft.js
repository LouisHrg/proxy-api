const express = require('express');
const router = express.Router();

const { searchNft, getNftCollection, getOneNft } = require('../providers');

/**
 * @swagger
 * components:
 *   schemas:
 *     Contract:
 *       type: object
 *       properties:
 *         name:
 *           type: string
 *           description: The contract name.
 *           example: OpenSea Collection
 *         address:
 *           type: string
 *           description: The contract address.
 *           example: 0x495f947276749ce646f68ac8c248420045cb7b5e
 *         type:
 *           type: string
 *           description: The contract type.
 *           example: semi-fungible
 *         created_at:
 *           type: date
 *           description: The contract creation date.
 *           example: 2020-12-02T17:40:53.232025
 *         owner:
 *           type: integer
 *           description: The contract owner id
 *           example: 54913
 *         schema:
 *           type: string
 *           description: The contract schema
 *           example: ERC1155
 *         symbol:
 *           type: string
 *           description: The contract symbol
 *           example: OPENSTORE
 *         description:
 *           type: string
 *           description: The contract description
 *           example: Loremipsum
 *         payout_address:
 *           type: string
 *           description: The contract payout address
 *           example: 0xb1e3b5b9a23e7507c6d43dd570a1473d477e1def
 *         seller_fees:
 *           type: string
 *           description: The contract seller fees
 *           example: 0
 *     Collection:
 *       type: object
 *       properties:
 *         name:
 *           type: string
 *           description: The collection name.
 *           example: Real 5D Metaverse Official Collection
 *         description:
 *           type: string
 *           description: The collection description.
 *           example: Lorem ipsum
 *         slug:
 *           type: string
 *           description: The collection slug.
 *           example: legend-maps-adventurers-official
 *         image_url:
 *           type: string
 *           description: The collection image.
 *           example: "https://lh3.googleusercontent.com/S9hnzYWa3a4DoOJ4KK57iUFzjBQw7fUGkChX9nHUI5jv0v4RvvAk_DFe31PAXWZ_facSg5I0_kJH4g-FltS7An1gMR0H5397Y39b=s120"
 *         created_at:
 *           type: date
 *           description: The collection creation date
 *           example: 2022-04-13T04:47:16.229122
 *         payout_address:
 *           type: string
 *           description: The collection payout address
 *           example: 0xb1e3b5b9a23e7507c6d43dd570a1473d477e1def
 *         external_link:
 *           type: string
 *           description: The collection external link
 *         banner_image_url:
 *           type: string
 *           description: The collection banner image
 *           example: "https://lh3.googleusercontent.com/UWKw0X8mvGii03umGbZzCE3KMWxzKv_OdDXljIOEUI1ENLz0agL89Xd4eNR8TQ8zF5KEG90Fu60r-6HpDuBgXsjH2vgRJ-4QYYDe=s2500"
 *         seller_fees:
 *           type: string
 *           description: The collection seller fees
 *           example: "0"
 *         safelist_request_status:
 *           type: string
 *           description: Is the collection is on the safelist
 *           example: "not_requested"
 *         primary_asset_contracts:
 *           type: array
 *         traits:
 *           type: object
 *         payment_tokens:
 *           type: array
 *         editors:
 *           type: array
 *         stats:
 *           type: object
 *
 *     Creator:
 *       type: object
 *       properties:
 *         username:
 *           type: string
 *           description: The creator username
 *           example: legend-maps-adventurers
 *         profile_url:
 *           type: string
 *           description: The creator avatar
 *           example: https://storage.googleapis.com/opensea-static/opensea-profile/9.png
 *         address:
 *           type: string
 *           description: The creator address
 *           example: 0x9395669092be2219f5ada4e8ec6f6f240d72f2f4
 *     Owner:
 *       type: object
 *       properties:
 *         username:
 *           type: string
 *           description: The owner username
 *           example: legend-maps-adventurers
 *         profile_url:
 *           type: string
 *           description: The owner avatar
 *           example: https://storage.googleapis.com/opensea-static/opensea-profile/9.png
 *         address:
 *           type: string
 *           description: The owner address
 *           example: 0x9395669092be2219f5ada4e8ec6f6f240d72f2f4
 *     NFT:
 *       type: object
 *       properties:
 *         id:
 *           type: integer
 *           description: The NFT ID.
 *           example: 20403295
 *         token_id:
 *           type: string
 *           description: The NFT token id.
 *           example: "66753956830205641912112180716283935030300926907297168283764293336112052568065"
 *         name:
 *           type: string
 *           description: The NFT name.
 *           example: "Legend Maps Adventurer #2963"
 *         description:
 *           type: string
 *           description: The NFT description.
 *           example: "Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod"
 *         image_url:
 *           type: string
 *           description: The NFT image.
 *           example: "https://lh3.googleusercontent.com/PX0e1jJgLWMJfqvhYAdTKW_4mydaXZ09LcpmGauD_yW5qOsOUdtHyYhVZqFOtL5ssmAuLaxOo2bOs6DZ_C4mSY_1z9Nw1S54jJp1"
 *         sales:
 *           type: integer
 *           description: The number of sales of the NFT.
 *           example: 0
 *         permalink:
 *           type: string
 *           description: The NFT permalink.
 *           example: "https://opensea.io/assets/0x495f947276749ce646f68ac8c248420045cb7b5e/66753956830205641912112180716283935030300926907297168283764293336112052568065"
 *         contract:
 *           type: object
 *           $ref: '#/components/schemas/Contract'
 *         collection:
 *           type: object
 *           $ref: '#/components/schemas/Collection'
 *         creator:
 *           type: object
 *           $ref: '#/components/schemas/Creator'
 *         owner:
 *           type: object
 *           $ref: '#/components/schemas/Owner'
 *         presale:
 *           type: boolean
 *           description: The number of sales of the NFT.
 *           example: "true"
 *         listing_date:
 *           type: string
 *           description: The NFT listing date.
 *           example: "2022-02-02"
 *         last_sale:
 *           type: object
 *           description: The NFT last sale infos
 *         traits:
 *           type: array
 *           description: The NFT traits
 */


/**
 * @swagger
 * /:
 *   get:
 *     summary: Retrieve a list of NFTs
 *     description: Retrieve a list of NFTs from the api.
 *     parameters:
 *       - in: query
 *         name: page
 *         required: false
 *         description: The number of the page.
 *         schema:
 *           type: integer
 *     tags:
 *       - NFT
 *     responses:
 *       200:
 *         description: A list of NFTs.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 assets:
 *                   type: array
 *                   items:
 *                     $ref: '#/components/schemas/NFT'
 *                 next:
 *                   type: integer
 *                   description: the next page number
 *                   example: 3
 *                 previous:
 *                   type: integer
 *                   description: the previous page number
 *                   example: 1
*/
router.get('/', (req, res) => {
  res.json(getNftCollection(req.query.page));
});

/**
 * @swagger
 * /search:
 *   get:
 *     summary: Search & retrieve matching NFTs
 *     description: Search & retrieve matching NFTs from the api.
 *     parameters:
 *       - in: query
 *         name: q
 *         required: true
 *         description: The search query.
 *         schema:
 *           type: string
 *     tags:
 *       - NFT
 *     responses:
 *       200:
 *         description: A list of NFTs.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 assets:
 *                   type: array
 *                   items:
 *                     $ref: '#/components/schemas/NFT'
 *                 query:
 *                   type: string
 *                   description: the search query
 *                   example: My search query
*/
router.get('/search', (req, res) => {
  const search = req.query.q;

  return res.json({
     assets: searchNft(search),
     query: search
  });
});

/**
 * @swagger
 * /nft/{id}:
 *   get:
 *     summary: Retrieve a NFT by id
 *     description: Retrieve a NFT by id from the api.
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         description: The NFT id.
 *         schema:
 *           type: string
 *     tags:
 *       - NFT
 *     responses:
 *       200:
 *         description: The NFT data.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               $ref: '#/components/schemas/NFT'
 *       404:
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: 'Not found'
*/
router.get('/nft/:id', (req, res) => {
  const search = req.params.id;

  const result = getOneNft(search);

  if(result) {
    return res.json(result);
  }

  return res.status(404).json({ message: 'Not found' });
});

module.exports = router;
