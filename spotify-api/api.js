const axios = require("axios");
const config = require('config');

class SpotifyApi {
    constructor(path, query, type='tracks', offset=0, limit=10, numberOfTopResults=5) {
        this.path = path
        this.url = config.api.url + path + '/'
        this.query = query
        this.type = type
        this.apiKey = config.api.key
        this.apiHost = config.api.host
        this.offset = offset.toString()
        this.limit = limit.toString()
        this.numberOfTopResults = numberOfTopResults.toString()
    }

    fetchOptions() {
        const options = {
            method: 'GET',
            url: this.url,
            headers: {
                'X-RapidAPI-Key': this.apiKey,
                'X-RapidAPI-Host': this.apiHost
            }
        }
        if (this.path === 'search') {
            options.params = {
                q: this.query,
                type: this.type,
                offset: this.offset,
                limit: this.limit,
                numberOfTopResults: this.numberOfTopResults
            }
        }

        if (this.path === 'tracks') {
            options.params = {
                ids: this.query
            }
        }

        console.log('OPTIONS => ', options)
        return options;
    }

    fetchResponse() {
        return axios.request(this.fetchOptions())
    }
}

module.exports = SpotifyApi