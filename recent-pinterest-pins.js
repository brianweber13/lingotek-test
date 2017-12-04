// why javascript?

// function to get GET request parameters for a given key
function get(name) {
  if (name=(new RegExp('[?&]'+encodeURIComponent(name)+'=([^&]*)'))
    .exec(location.search)) {
    return decodeURIComponent(name[1]);
  }
}

function getPinterestAccessToken(accessCode) {
  $.ajax({
    type: 'POST',
    url: 'https://api.pinterest.com/v1/oauth/token',
    data: {
      grant_type: 'authorization_code',
      client_id: '4937253126393572047',
      client_secret:
        'e52e1d224be8e6161230ba89a25b1df13ab094ddcae1f3986fded7244a36f2f4',
      code: accessCode,
    },
    error: (jqXHRobject, status, errorMessage) => {
      // this will fail if an access code is old; it only lasts for a few
      // seconds. Therefore, we'll just redirect to the main page without the
      // access code, and if the user still doesn't have an access token,
      // they'll see an alert when they try to view recent pins again.
      window.location.replace('index.html');
    },
    success: (data, status) => {
      localStorage.setItem('access-token-object', JSON.stringify(data));
    },
  });
}

// requires 'access-token-object' to be set in local storage with an access
// token object as its value.
function getAuthenticatedUsersMostRecentPins() {
  let accessToken = JSON.parse(localStorage.getItem('access-token-object'));
  if (accessToken === undefined || accessToken === null) {
    alert('No access token! Please click "Authorize This Application".');
    return;
  }

  let url = 'https://api.pinterest.com/v1/me/pins/?';
  url += 'access_token=' + accessToken.access_token;
  url += '&fields=image,url';
  url += '&limit=12';

  $.ajax({
    type: 'GET',
    url: url,
    success: (data, status) => {
      localStorage.setItem('most-recent-pins', JSON.stringify(data.data));
      displayPins(data.data);
    },
    error: (jqXHRobject) => {
      let alertString = 'Access token expired! Please click "Authorize';
      alertString += ' This Application".';
      alert(alertString);
    },
  });
}

function displayPins(listOfPins) {
  let recentPinsContent = '';
  for (let i = 0; i < 4; i++) {
    recentPinsContent += '<div class="row">';
    for (let j = 0; j < 3; j++) {
      currentPinIndex = [i*3 + j];
      recentPinsContent += '<div class="col-sm">';
      if (currentPinIndex < listOfPins.length) {
        recentPinsContent += '<a href="' + listOfPins[currentPinIndex].url;
        recentPinsContent += '">';
        recentPinsContent += '<img src="';
        recentPinsContent += listOfPins[currentPinIndex].image.original.url;
        recentPinsContent += '"';
        // recentPinsContent += 'height="200" width="200">';
        recentPinsContent += '>';
        recentPinsContent += '</img>';
        recentPinsContent += '</a>';
      }
      recentPinsContent += '</div>';
    }
    recentPinsContent += '</div>';
  }
  $('#recent-pins').html(recentPinsContent);
}

function displayRecentPins() {
  let recentPins = JSON.parse(localStorage.getItem('most-recent-pins'));
  if (recentPins === undefined || recentPins === null) {
    getAuthenticatedUsersMostRecentPins();
  } else {
    displayPins(recentPins);
  }
}

// ---- script actually does stuff here ---- //
let pinterestAccessCode = get('code');

// get authToken if we're given an authorization code as an input
if (pinterestAccessCode !== undefined && pinterestAccessCode !== null) {
  getPinterestAccessToken(pinterestAccessCode);
}

