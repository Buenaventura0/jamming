let accessToken;
const clientId = "2475498c3c8341e28bf92f70b1bc72c3";
const redirectUrl = "https://buenaventurajammingproject.surge.sh";

const Spotify = {
  getAccessToken() {
    // First check for the access token
    if(accessToken) return accessToken;

    const tokenInUrl = window.location.href.match(/access_token=([^&]*)/);
    const expiryTime = window.location.href.match(/expires_in=([^&]*)/);

    // Second check for the access token
    if(tokenInUrl && expiryTime) {
    // Setting access token and expiry time variables
      accessToken = tokenInUrl[1];
      const expiresIn = Number(expiryTime[1]);

    // Setting the access token to expire at the value for expiration time
      window.setTimeout(() => (accessToken = ""), expiresIn * 1000);

    // Clearing the URL after the access token expires
      window.history.pushState("Access token", null, "/");
      return accessToken;
    };

    // Third check for the access token if the first and second checks are both false
    const redirect = `https://accounts.spotify.com/authorize?client_id=${clientId}&response_type=token&scope=playlist-modify-public&redirect_uri=${redirectUrl}`;
    window.location = redirect;
  },

  search(term) {
    accessToken = Spotify.getAccessToken();
    return fetch(`https://api.spotify.com/v1/search?type=track&q=${term}`, {
      method: 'GET',
      headers: {Authorization: `Bearer ${accessToken}`},
    })
    .then(response => response.json())
    .then(jsonResponse => {
      if(!jsonResponse) {
        console.error("Response error");
      }
      console.log(accessToken);
      console.log(jsonResponse);

      return jsonResponse.tracks.items.map(t => ({
        id: t.id,
        name: t.name,
        artist: t.artists[0].name,
        album: t.album.name,
        uri: t.uri, 
      }))
    })
  },

  savePlaylist(name, trackUris) {
    if (!name || !trackUris) return;
    const aToken = Spotify.getAccessToken();
    const header = {Authorization: `Bearer ${aToken}`};
    let userId;
    return fetch(`https://api.spotify.com/v1/me`, {headers: header})
    .then(response => response.json())
    .then((jsonResponse) => {
      userId = jsonResponse.id;
      let playlistId;
      return fetch(`https://api.spotify.com/v1/users/${userId}/playlists`, {
        headers: header,
        method: 'POST',
        body: JSON.stringify({name: name}),
      })
      .then((response) => response.json())
      .then((jsonResponse) => {
        playlistId = jsonResponse.id;
        return fetch(`https://api.spotify.com/v1/playlists/${playlistId}/tracks`, {
          headers: header,
          method: 'POST',
          body: JSON.stringify({uris: trackUris}),
        });
      });
    });
  },
};

export {Spotify};