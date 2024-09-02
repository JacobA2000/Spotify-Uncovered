import React from 'react'
import { SpotifyAuth, Scopes } from 'react-spotify-auth';
import 'react-spotify-auth/dist/index.css';
import Cookies from 'js-cookie'
import SpotifyAPI from './Spotify-API'
import './App.css';

import { Tab, Tabs, TabList, TabPanel } from 'react-tabs';
import 'react-tabs/style/react-tabs.css';

import { PieChart } from 'react-minimal-pie-chart';

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
          //redirectUri='https://jacoba2000.github.io/Spotify-Uncovered/'
          redirectUri='http://localhost:3000/'
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

async function convertGenresToPieData(genres) {
  //CONVERT GENRES OBJECT TO PIECHART DATA
  let data = []
  for (let genre in genres) {
    data.push({
      title: genre.toLocaleUpperCase(),
      value: genres[genre],
      color: '#' + Math.floor(Math.random() * (256-100) + 100).toString(16) + Math.floor(Math.random() * (256-100) + 100).toString(16) + Math.floor(Math.random() * (256-100) + 100).toString(16)
    })
  }

  //SORT GENRES BY VALUE
  data.sort((a, b) => {
    return b.value - a.value
  })

  return data
}

function SpotifyInfo() {

  const [token] = React.useState(Cookies.get("spotifyAuthToken"))

  const [profileImage, setProfileImage] = React.useState('')
  const [profileName, setProfileName] = React.useState('')
  const [profileURL, setProfileURL] = React.useState('')

  const [shortTermTracks, setShortTermTracks] = React.useState([])
  const [shortTermArtists, setShortTermArtists] = React.useState([])
  const [shortTermGenres, setShortTermGenres] = React.useState([])

  const [mediumTermTracks, setMediumTermTracks] = React.useState([])
  const [mediumTermArtists, setMediumTermArtists] = React.useState([])
  const [mediumTermGenres, setMediumTermGenres] = React.useState([])
    
  const [longTermTracks, setLongTermTracks] = React.useState([])
  const [longTermArtists, setLongTermArtists] = React.useState([])
  const [longTermGenres, setLongTermGenres] = React.useState([])

  //GET SPOTIFY TOP TRACKS FOR CURRENT USER VIA THE GIVEN TOKEN ENSURING ONLY 1 FETCH IS SENT
  React.useEffect(() => {
    if(token) {
      let api = new SpotifyAPI(token)

      let profileObj = api.getProfile()

      let genres = {}

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

        genres = api.getTopArtistsGenres(res)

        convertGenresToPieData(genres).then(res => {
          setShortTermGenres(res)
        })

        setShortTermArtists(res.items)
      })

      //GET MEDIUM TERM TOP TRACKS AND ARTISTS
      let mediumTermTracksObj = api.getTopTracks('medium_term')

      mediumTermTracksObj.then(res => {
        setMediumTermTracks(res.items)
      })

      let mediumTermArtistsObj = api.getTopArtists('medium_term')

      mediumTermArtistsObj.then(res => {
        genres = api.getTopArtistsGenres(res)

        convertGenresToPieData(genres).then(res => {
          setMediumTermGenres(res)
        })

        setMediumTermArtists(res.items)
      })

      //GET LONG TERM TOP TRACKS AND ARTISTS
      let longTermTracksObj = api.getTopTracks('long_term')

      longTermTracksObj.then(res => {
        setLongTermTracks(res.items)
      })

      let longTermArtistsObj = api.getTopArtists('long_term')

      longTermArtistsObj.then(res => {
        genres = api.getTopArtistsGenres(res)

        convertGenresToPieData(genres).then(res => {
          setLongTermGenres(res)
        })

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
                  {track.album.images.length > 0 ?
                    <img className="track-img" src={track.album.images[0].url} alt={track.name}/>
                    :
                    <img className="track-img" src={process.env.PUBLIC_URL + "/empty_art.png"} alt={track.name}/>
                  }
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

                  {artist.images.length > 0 ?
                    (<img className="artist-img" src={artist.images[0].url} alt={artist.name}/>) 
                    :
                    (<img className="artist-img" src={process.env.PUBLIC_URL + "/Default_pfp.svg"} alt={artist.name}/>)
                  }

                  <p className="artist-name">{artist.name}</p>
                </div>
              </li>
            ))}
          </ul>

          <h2>Top Genres</h2>
          {/* PIECHART THAT SHOWS LABELS FOR EACH GENRE */}
          <div className="piechart-container">
            {/* PIECHART KEY */}
            <div className="piechart-key">
              {shortTermGenres.map(genre => (
                <div className="piechart-key-item" key={genre.title}>
                  <p className="piechart-key-title" style={{color: genre.color, fontSize: '1em'}}>{genre.title}</p>
             </div>
              ))}
            </div>

            <PieChart
              data={shortTermGenres}
              lineWidth={50}
              radius={36}
              segmentsShift={2}
              style={{
                height: '75vw',
                width: '75vw',
                margin: '0 auto',
              }}
            />
          </div>
        </TabPanel>
        
        {/* MEDIUM TERM */}
        <TabPanel>
          <h2>Top Tracks</h2>
          <ul className="track-list">
            {mediumTermTracks.map(track => (
              <li className="track-list-item" key={track.id} onClick={() => openURI(track.uri)}>
                <div className="track-info">
                  {track.album.images.length > 0 ?
                    <img className="track-img" src={track.album.images[0].url} alt={track.name}/>
                    :
                    <img className="track-img" src={process.env.PUBLIC_URL + "/empty_art.png"} alt={track.name}/>
                  }
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
                  {artist.images.length > 0 ?
                    (<img className="artist-img" src={artist.images[0].url} alt={artist.name}/>) 
                    :
                    (<img className="artist-img" src={process.env.PUBLIC_URL + "/Default_pfp.svg"} alt={artist.name}/>)
                  }
                  <p className="artist-name">{artist.name}</p>
                </div>
              </li>
            ))}
          </ul>

          <h2>Top Genres</h2>
          {/* PIECHART THAT SHOWS LABELS FOR EACH GENRE */}
          <div className="piechart-container">
            {/* PIECHART KEY */}
            <div className="piechart-key">
              {mediumTermGenres.map(genre => (
                <div className="piechart-key-item" key={genre.title}>
                  <p className="piechart-key-title" style={{color: genre.color, fontSize: '1em'}}>{genre.title}</p>
             </div>
              ))}
            </div>

            <PieChart
              data={mediumTermGenres}
              lineWidth={50}
              radius={36}
              segmentsShift={2}
              style={{
                height: '75vw',
                width: '75vw',
                margin: '0 auto',
              }}
            />
          </div>
        </TabPanel>
        
        {/* LONG TERM */}
        <TabPanel>
          <h2>Top Tracks</h2>
          <ul className="track-list">
            {longTermTracks.map(track => (
              <li className="track-list-item" key={track.id} onClick={() => openURI(track.uri)}>
                <div className="track-info">
                  {track.album.images.length > 0 ?
                    <img className="track-img" src={track.album.images[0].url} alt={track.name}/>
                    :
                    <img className="track-img" src={process.env.PUBLIC_URL + "/empty_art.png"} alt={track.name}/>
                  }
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
                  
                  {artist.images.length > 0 ?
                    (<img className="artist-img" src={artist.images[0].url} alt={artist.name}/>) 
                    :
                    (<img className="artist-img" src={process.env.PUBLIC_URL + "/Default_pfp.svg"} alt={artist.name}/>)
                  }
                  
                  <p className="artist-name">{artist.name}</p>
                </div>
              </li>
            ))}
          </ul>
            
          <h2>Top Genres</h2>
          {/* PIECHART THAT SHOWS LABELS FOR EACH GENRE */}
          <div className="piechart-container">
            {/* PIECHART KEY */}
            <div className="piechart-key">
              {longTermGenres.map(genre => (
                <div className="piechart-key-item" key={genre.title}>
                  <p className="piechart-key-title" style={{color: genre.color, fontSize: '1em'}}>{genre.title}</p>
             </div>
              ))}
            </div>

            <PieChart
              data={longTermGenres}
              lineWidth={50}
              radius={36}
              segmentsShift={2}
              style={{
                height: '75vw',
                width: '75vw',
                margin: '0 auto',
              }}
            />
          </div>
        </TabPanel>

      </Tabs>

    </div>

  )
}

function openURI(uri) {
  window.location = uri
};

export default App;
