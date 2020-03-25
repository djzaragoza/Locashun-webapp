var APPID = "1a5840823ced3a26d3087be90dbb4989";
var icon;
var temp;
var loc;

function sendRequest(url) {
    var xmlhttp = new XMLHttpRequest();
    xmlhttp.onreadystatechange = function () {
        if (xmlhttp.readyState == 4 && xmlhttp.status == 200) {
            var data = JSON.parse(xmlhttp.responseText);
            var weather = {};
            weather.icon = data.weather[0].icon;
            weather.loc = data.name;
            weather.temp = K2F(data.main.temp);

            update(weather);
        }
    };

    xmlhttp.open("GET", url, true);
    xmlhttp.send();
}

function update(weather) {
    temp.innerHTML = weather.temp;
    loc.innerHTML = weather.loc;
    icon.src = "https://openweathermap.org/img/w/" + weather.icon + ".png";
}

window.onload = function () {
    icon = document.getElementById("icon");
    temp = document.getElementById("temp");
    loc = document.getElementById("loc");

    if (this.navigator.geolocation) {
        var showPosition = function (position) {
            updateByGeo(position.coords.latitude.position.coords.longitude);
        }
        this.navigator.geolocation.getCurrentPosition(showPosition);
    }
}

function updateByGeo(lat, lon) {
    var url = "https://api.openweathermap.org/data/2.5/weather?" + "lat=" + lat + "&lon=" + lon + "&APPID=" + APPID;
    sendRequest(url);
}

function K2F(k) {
    return Math.floor(9 / 5 * (k - 273) + 32);
}

function cToF(celsius) {
    return Math.floor(celsius * 9 / 5 + 32);
}

function fToC(fahrenheit) {
    return Math.floor((fahrenheit - 32) * 5 / 9);
}

function toggleScale() {
    if (temScale.innerHTML === "C") {
        temp.innerHTML = cToF(temp.innerHTML);
        temScale.innerHTML = "F";
    } else if (temScale.innerHTML === "F") {
        temp.innerHTML = fToC(temp.innerHTML);
        temScale.innerHTML = "C";
    }
}

// toggle the temperature scale
temScale.addEventListener("click", toggleScale);