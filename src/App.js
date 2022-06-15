import React from 'react'
import { SpotifyAuth, Scopes } from 'react-spotify-auth';
import 'react-spotify-auth/dist/index.css';
import Cookies from 'js-cookie'
import SpotifyAPI from './Spotify-API'
import './App.css';

import { Tab, Tabs, TabList, TabPanel } from 'react-tabs';
import 'react-tabs/style/react-tabs.css';

function App() {
  
  const [token, setToken] = React.useState(Cookies.get("spotifyAuthToken"))

  return (
    <div className="App">
      {token ? (
        <SpotifyInfo/>
        
      ) : (
        //SHOW LOGIN 
        <SpotifyAuth
          clientID='0166a2461c6c4692b5dbb305776488d4'
          redirectUri='https://jacoba2000.github.io/Spotify-Uncovered/'
          //redirectUri='http://localhost:3000/'
          scopes={
            [
              Scopes.userReadEmail, 
              Scopes.userReadPrivate,
              Scopes.userTopRead
            ]
          }
        
          onAccessToken={(token) => setToken(token)}
        />
      )}
    </div>
  );
}

function SpotifyInfo() {

  const [token] = React.useState(Cookies.get("spotifyAuthToken"))

  const [profileImage, setProfileImage] = React.useState('')
  const [profileName, setProfileName] = React.useState('')
  const [profileURL, setProfileURL] = React.useState('')
  const [shortTermTracks, setShortTermTracks] = React.useState([])
  const [shortTermArtists, setShortTermArtists] = React.useState([])
  const [mediumTermTracks, setMediumTermTracks] = React.useState([])
  const [mediumTermArtists, setMediumTermArtists] = React.useState([])
  const [longTermTracks, setLongTermTracks] = React.useState([])
  const [longTermArtists, setLongTermArtists] = React.useState([])

  const getTopTracks = (api, term) => {
    let termTracksObj = api.getTopTracks(term)

    termTracksObj.then(res => {
      return res.items
    })
  }

  const getTopArtists = (api, term) => {
    let termArtistsObj = api.getTopArtists('short_term')

    termArtistsObj.then(res => {
      return res.items
    })
  }
    
  //GET SPOTIFY TOP TRACKS FOR CURRENT USER VIA THE GIVEN TOKEN ENSURING ONLY 1 FETCH IS SENT
  React.useEffect(() => {
    if(token) {
      let api = new SpotifyAPI(token)

      let profileObj = api.getProfile()

      profileObj.then(res => {
        setProfileImage(res.images[0].url)
        setProfileName(res.display_name)
        setProfileURL(res.external_urls.spotify)
      })

      //GET SHORT TERM TOP TRACKS AND ARTISTS
      let shortTermTracksObj = api.getTopTracks('short_term')

      shortTermTracksObj.then(res => {
        setShortTermTracks(res.items)
      })

      let shortTermArtistsObj = api.getTopArtists('short_term')

      shortTermArtistsObj.then(res => {
        setShortTermArtists(res.items)
      })

      //GET MEDIUM TERM TOP TRACKS AND ARTISTS
      let mediumTermTracksObj = api.getTopTracks('medium_term')

      mediumTermTracksObj.then(res => {
        setMediumTermTracks(res.items)
      })

      let mediumTermArtistsObj = api.getTopArtists('medium_term')

      mediumTermArtistsObj.then(res => {
        setMediumTermArtists(res.items)
      })

      //GET LONG TERM TOP TRACKS AND ARTISTS
      let longTermTracksObj = api.getTopTracks('long_term')

      longTermTracksObj.then(res => {
        setLongTermTracks(res.items)
      })

      let longTermArtistsObj = api.getTopArtists('long_term')

      longTermArtistsObj.then(res => {
        setLongTermArtists(res.items)
      })


    }
  }, [token])

  return (
    <div>
      <div className="profile">
        <img className="profile-img" src={profileImage} alt={profileName}/>
        <p className="profile-name">{profileName}</p>
        <a className="profile-url"href={profileURL} target="_blank">View Profile on Spotify</a>
      </div>

      <Tabs>
        <TabList>
          <Tab>Last Month</Tab>
          <Tab>Last 6 Months</Tab>
          <Tab>All-time</Tab>
        </TabList>

        {/* SHORT TERM */}
        <TabPanel>
          <h2>Top Tracks</h2>
          <ul className="track-list">
            {shortTermTracks.map(track => (
              <li className="track-list-item" key={track.id} onClick={() => openURI(track.uri)}>
                <div className="track-info">
                  <img className="track-img" src={track.album.images[0].url} alt={track.name}/>
                  <p className="track-name">{track.name}</p>
                </div>
              </li>
            ))}
          </ul>

          <h2>Top Artists</h2>
          <ul className="artist-list">
            {shortTermArtists.map(artist => (
              <li className="artist-list-item" key={artist.id} onClick={() => openURI(artist.uri)}>
                <div className="artist-info">

                  <img className="artist-img" src={artist.images[0].url} alt={artist.name}/>

                  <p className="artist-name">{artist.name}</p>
                </div>
              </li>
            ))}
          </ul>
        </TabPanel>
        
        {/* MEDIUM TERM */}
        <TabPanel>
          <h2>Top Tracks</h2>
          <ul className="track-list">
            {mediumTermTracks.map(track => (
              <li className="track-list-item" key={track.id} onClick={() => openURI(track.uri)}>
                <div className="track-info">
                  <img className="track-img" src={track.album.images[0].url} alt={track.name}/>
                  <p className="track-name">{track.name}</p>
                </div>
              </li>
            ))}
          </ul>

          <h2>Top Artists</h2>
          <ul className="artist-list">
            {mediumTermArtists.map(artist => (
              <li className="artist-list-item" key={artist.id} onClick={() => openURI(artist.uri)}>
                <div className="artist-info">
                  <img className="artist-img" src={artist.images[0].url} alt={artist.name}/>
                  <p className="artist-name">{artist.name}</p>
                </div>
              </li>
            ))}
          </ul>
        </TabPanel>
        
        {/* LONG TERM */}
        <TabPanel>
          <h2>Top Tracks</h2>
          <ul className="track-list">
            {longTermTracks.map(track => (
              <li className="track-list-item" key={track.id} onClick={() => openURI(track.uri)}>
                <div className="track-info">
                  <img className="track-img" src={track.album.images[0].url} alt={track.name}/>
                  <p className="track-name">{track.name}</p>
                </div>
              </li>
            ))}
          </ul>

          <h2>Top Artists</h2>
          <ul className="artist-list">
            {longTermArtists.map(artist => (
              <li className="artist-list-item" key={artist.id} onClick={() => openURI(artist.uri)}>
                <div className="artist-info">

                  <img className="artist-img" src={artist.images[0].url} alt={artist.name}/>

                  <p className="artist-name">{artist.name}</p>
                </div>
              </li>
            ))}
          </ul>
        </TabPanel>

      </Tabs>

    </div>

  )
}

function openURI(uri) {
  window.location = uri
};

export default App;
