const express = require('express');
const router = express.Router();
const { getCreators, getNftByCreator } = require('../providers');

/**
 * @swagger
 * /creators:
 *   get:
 *     summary: Retrieve the list of nft creators
 *     description: Retrieve the list of nft creators from the api.
 *     tags:
 *       - Creator
 *     responses:
 *       200:
 *         description: A list of NFT creators.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 creators:
 *                   type: array
 *                   items:
 *                     $ref: '#/components/schemas/Creator'
*/
router.get('/creators', (req, res) => res.json({ creators: getCreators() }));

/**
 * @swagger
 * /creators/{username}:
 *   get:
 *     summary: Retrieve the list of nft by creator username
 *     description: Retrieve the list of nft by creator username from the api.
 *     tags:
 *       - Creator
 *     parameters:
 *       - in: path
 *         name: username
 *         required: true
 *         description: The creator username.
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
 *                 creator:
 *                   $ref: '#/components/schemas/Creator'
 *                 assets:
 *                   type: array
 *                   items:
 *                     $ref: '#/components/schemas/NFT'
*/
router.get('/creators/:username', (req, res) => {

  const username = req.params.username;

  const data = getNftByCreator(username);

  if(data.creator.username) return res.json({ ...data });

  return res.status(404).json({ message: 'Not found' });

});

module.exports = router;
