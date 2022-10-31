const SpotifyApi = require('spotify-api/api')
const db = require('../../models/index');
const Playlist = db.playlists;
const Track = db.tracks;


const profile = async (req, res) => {
    let playlists = await Playlist.findAll({where: {User_userId: req.user.id}})

    await Promise.all(playlists.map(async (playlist) => {
        const {count, rows} = await Track.findAndCountAll({where:{Playlist_playlistId: playlist.id}})
        playlist.trackCount = count
    }))

    const searchQuery = req.query.searchQuery;
    let searchResults;
    if (searchQuery) {
        try {

            // Uncomment when you want to use API
            // const api = new SpotifyApi('search', searchQuery)
            // const response = await api.fetchResponse();
            // console.log('TRACKS => ', response.data)
            
            // searchResults = []
            // if (response) {
            //     (response.data.tracks.items).forEach(item => {
            //         searchResults.push({
            //             name: item.data.name,
            //             artist: item.data.artists.items[0].profile.name,
            //             trackId: item.data.id
            //         })
            //     });
            // }
            searchResults = [
            {
                name: 'Weapon Of Choice',
                artist: 'Fatboy Slim',
                trackId: '08kB9HSfrcIi83rymwgjMz'
            },
            {
                name: 'Say It Louder',
                artist: 'Panic! At The Disco',
                trackId: '61aS3LDHi60ZZr3ZpHG2AP'
            },
            {
                name: 'Weapon Of Choice',
                artist: 'Black Rebel Motorcycle Club',
                trackId: '4adPbUuejHaVDpC1SDpfQr'
            }
        ]

            return res.render('content/profile.njk', { user: req.user.username, searchResults: searchResults });
        } catch (error) {
            throw error
        }
    }

    return res.render('content/profile.njk', {
        user: req.user.username,
        searchResults: searchResults,
        playlists: playlists
    });
}

module.exports = profile