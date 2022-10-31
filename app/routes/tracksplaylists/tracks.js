const express = require('express');
const router = express.Router();
const addTrack = require('../../controllers/tracksplaylists/tracksController');

router.all('/', addTrack);

module.exports = router;