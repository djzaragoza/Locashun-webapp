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


