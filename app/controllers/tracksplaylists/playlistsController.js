const _ = require('lodash');
const db = require('../../models');
const track = require('../../models/track');
const SpotifyApi = require('../../../spotify-api/api')
const User = db.users;
const Playlist = db.playlists;
const Track = db.tracks;

const addPlaylist = async (req, res) => {
    if (req.body.playlistName) {
        try {
            const name = req.body.playlistName;
            const User_userId = req.user.id
            const data = {
                name,
                User_userId
            }
            const playlist = await Playlist.create(data);
            return res.redirect('/profile')
        } catch (error) {
            throw error;
        }
    }
    res.render('content/playlist.njk', {addPlaylistPage: true})
}

const viewPlaylist = async (req, res) => {
    try {
        const playlist = await Playlist.findOne({where: {id: req.params.playlistId}});
        const tracks = await Track.findAll({where: {Playlist_playlistId: req.params.playlistId}});

        let trackIdsString = '';

        tracks.forEach(track => {
            trackIdsString += `${track.trackId},`
        });

        let api;
        if (!_.isEmpty(trackIdsString)) {
            api = new SpotifyApi('tracks', trackIdsString.slice(0, -1))
        }

        if (!_.isEmpty(api)) {
            // const response = await api.fetchResponse()
            if (true) {
                // let tracksData = []
                // response.data.tracks.forEach(track => {
                //     tracksData.push({
                //         name: track.name,
                //         artist: track.artists[0].name,
                //         previewUrl: track.preview_url,
                //         trackId: track.id
                //     })
                // });

                let tracksData = [{
                    name: 'WOP',
                    artist: 'Fatboy',
                    previewUrl: 'https://p.scdn.co/mp3-preview/668eed7e3cd09f3b9a828e2080c1cc69000f9af8?cid=f6a40776580943a7bc5173125a1e8832',
                    trackId: '1'
                },
                {
                name: 'WOP',
                artist: 'Fatboy',
                previewUrl: 'https://p.scdn.co/mp3-preview/668eed7e3cd09f3b9a828e2080c1cc69000f9af8?cid=f6a40776580943a7bc5173125a1e8832',
                trackId: '2'
                },
                {
                    name: 'Say It Louder',
                    artist: 'Panic! At The Disco',
                    previewUrl: 'https://p.scdn.co/mp3-preview/d01671e07066df5f3b8d7e2281f879c2d9d5b50f?cid=f6a40776580943a7bc5173125a1e8832',
                    trackId: '2'
                }
            ]
               
                        
                 

                return res.render('content/playlist.njk', {
                    tracks: tracksData,
                    playlist: playlist,
                    playlistPage: true
                })
            }
        }

        return 
    } catch (error) {
        throw error
    }
}

module.exports = {
    addPlaylist,
    viewPlaylist
};