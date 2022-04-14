const express = require('express');
const router = express.Router();
const { getOwners, getNftByOwner } = require('../providers');

/**
 * @swagger
 * /owners:
 *   get:
 *     summary: Retrieve the list of nft owners
 *     description: Retrieve the list of nft owners from the api.
 *     tags:
 *       - Owner
 *     responses:
 *       200:
 *         description: A list of NFT owners.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 owners:
 *                   type: array
 *                   items:
 *                     $ref: '#/components/schemas/Owner'
*/
router.get('/owners', (req, res) => res.json({ owners: getOwners() }));

/**
 * @swagger
 * /owners/{username}:
 *   get:
 *     summary: Retrieve the list of nft by owner username
 *     description: Retrieve the list of nft by owner username from the api.
 *     tags:
 *       - Owner
 *     parameters:
 *       - in: path
 *         name: username
 *         required: true
 *         description: The owner username.
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
 *                 owner:
 *                   $ref: '#/components/schemas/Owner'
 *                 assets:
 *                   type: array
 *                   items:
 *                     $ref: '#/components/schemas/NFT'
*/
router.get('/owners/:username', (req, res) => {

  const username = req.params.username;

  const data = getNftByOwner(username);

  if(data.creator.username) return res.json({ ...data });

  return res.status(404).json({ message: 'Not found' });

});

module.exports = router;
