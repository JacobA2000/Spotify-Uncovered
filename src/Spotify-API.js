class SpotifyAPI {
    constructor(token) {
        this.token = token;
    }

    getProfile() {
        return fetch(`https://api.spotify.com/v1/me`, {
            headers: {
                'Authorization': `Bearer ${this.token}`
            }
        }).then(res => res.json());
    }

    getTopTracks(timeRange = 'short_term') {
        return fetch(`https://api.spotify.com/v1/me/top/tracks?limit=50&time_range=${timeRange}`, {
            headers: {
                'Authorization': `Bearer ${this.token}`
            }
        }).then(res => res.json());
    }

    getTopArtists(timeRange = 'short_term') {
        return fetch(`https://api.spotify.com/v1/me/top/artists?limit=50&time_range=${timeRange}`, {
            headers: {
                'Authorization': `Bearer ${this.token}`
            }
        }).then(res => res.json());
    }

    //GET THE GENRES OF EACH ARTIST IN THE TOP ARTISTS AND INCREMENT A COUNT FOR EACH GENRE
    getTopArtistsGenres(topArtists) {
        let genres = {};

        for (let artist of topArtists.items) {
            let artistGenres = artist.genres;

            for (let genre of artistGenres) {
                if (genres[genre]) {
                    genres[genre]++;
                } else {
                    genres[genre] = 1;
                }
            }
        }

        return genres;
    }


    
}

export default SpotifyAPI;