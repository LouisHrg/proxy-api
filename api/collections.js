const express = require('express');
const router = express.Router();

const { getCollectionsCollection, getNftByCollection } = require('../providers');

/**
 * @swagger
 * /collections:
 *   get:
 *     summary: Retrieve the list of nft collections
 *     description: Retrieve the list of nft collections from the api.
 *     tags:
 *       - Collection
 *     responses:
 *       200:
 *         description: A list of NFT collections.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 collections:
 *                   type: array
 *                   items:
 *                     $ref: '#/components/schemas/Collection'
*/
router.get('/collections', (req, res) =>  res.json({ collections: getCollectionsCollection() }));


/**
 * @swagger
 * /collections/{slug}:
 *   get:
 *     summary: Retrieve the list of nft by collection slug
 *     description: Retrieve the list of nft by collection slug from the api.
 *     tags:
 *       - Collection
 *     parameters:
 *       - in: path
 *         name: slug
 *         required: true
 *         description: The collection slug.
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: A list of NFTs by collection.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 collection:
 *                   $ref: '#/components/schemas/Collection'
 *                 assets:
 *                   type: array
 *                   items:
 *                     $ref: '#/components/schemas/NFT'
*/
router.get('/collections/:slug', (req, res) => {
  const slug = req.params.slug;

  const data = getNftByCollection(slug);

  if(data.collection.slug) return res.json({ ...data });

  return res.status(404).json({ message: 'Not found' });
});

module.exports = router;
