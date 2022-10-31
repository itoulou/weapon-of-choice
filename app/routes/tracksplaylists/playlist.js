const express = require('express');
const router = express.Router();
const { addPlaylist, viewPlaylist } = require('../../controllers/tracksplaylists/playlistsController');

router.all('/', addPlaylist);
router.get('/:playlistId', viewPlaylist)

module.exports = router;