const db = require('../../models');
const _ = require('lodash')
const Playlist = db.playlists;
const Track = db.tracks;

const addTrack = async (req, res) => {
    const playlists = await Playlist.findAll({where:{User_userId: req.user.id}})
    console.log(req.body)
    if (!_.isEmpty(req.body)) {
        const { playlistChoice, trackName, trackId } = req.body
        try {
            const data = {
                name: trackName,
                trackId,
                Playlist_playlistId: playlistChoice
            }
            const track = await Track.create(data);
            return res.redirect('/profile')
        } catch (error) {
            throw error
        }
    }

    res.render('content/track.njk', {
        trackId: req.query.trackId,
        trackName: req.query.name,
        playlists: playlists
    })
}

module.exports = addTrack;