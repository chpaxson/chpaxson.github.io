var weatherErrorOut = document.getElementById("weatherError");

function getLocation() {
    if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(showPosition, showError);
    }
}

function showPosition(position) {
    x.innerHTML = "Latitude: " + position.coords.latitude +
        "<br>Longitude: " + position.coords.longitude;
}

function showError(error) {
    switch (error.code) {
        case error.PERMISSION_DENIED:
            message = "User denied the request for Geolocation."
            break;
        case error.POSITION_UNAVAILABLE:
            message = "Location information is unavailable."
            break;
        case error.TIMEOUT:
            message = "The request to get user location timed out."
            break;
        case error.UNKNOWN_ERROR:
            message = "An unknown error occurred."
            break;
    }
    weatherErrorOut.innerHTML = message;
    weatherErrorOut.style.setProperty("display", "");
}

function weatherMenu() {

}