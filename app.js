const express = require("express");
const https = require("https");
const { stringify } = require("querystring");
const bodyParser = require("body-parser");
const app = express();
// const jsdom = require("jsdom");
// const { JSDOM } = jsdom;

// const document = new JSDOM(`city.ejs`).window.document;

// if (window.performance.navigation.type === 1) {
//     app.get();
//   }

var citySearch = "";
var temperatureDegree = "";
var weatherDescription = "";
var humidityPercent = "";
var windSpeed = "";
var cloudPercent = "";
var cityTime = "";
var cityDate = "";

app.set('view engine', 'ejs');

app.use(bodyParser.urlencoded({ extended: true }));

app.use(express.static("public"));

app.get("/", function (req, res) {
    // document.querySelector("weatherImage").setAttributeNS("src", "image/" + weatherDescription + ".png"); 
    // var today = new Date();

    // var options = {
    //     weekday: "long",
    //     day: "numeric",
    //     month: "long",
    //     year: "numeric"
    // };

    // const localTime = today.getTime()
    // const localOffset = today.getTimezoneOffset() * 60000
    // const currentUtcTime = localTime + localOffset
    // const cityOffset = currentUtcTime + 1000 * timeZone
    // const cityTime = new Date(cityOffset).toTimeString()

    // var day = today.toLocaleDateString(("en-", +region), options);
    // // var time = today.toLocaleTimeString("en-" +region);
    res.render("city", {
        kindOfDay: cityDate,
        localTime: cityTime,
        citySearch: citySearch,
        temperature: temperatureDegree,
        humidity: humidityPercent,
        wind: windSpeed,
        cloud: cloudPercent,
        description: weatherDescription
    });
});

app.post("/", function (req, res) {
    const query = req.body.cityName;
    console.log(query);
    const apiKeyTemp = "1028233e468ea25328dd3bf4357559d7";
    const apiKeyTime = "201aec817a8846d9b1e3ca6378eb4822";
    const unit = "metric";
    const urlTemp = "https://api.openweathermap.org/data/2.5/weather?q=" + query + "&appid=" + apiKeyTemp + "&units=" + unit;
    https.get(urlTemp, function (response) {
        console.log(response.statusCode);

        response.on("data", function (data) {
            const weatherData = JSON.parse(data);
            console.log(weatherData);

            temperatureDegree = weatherData.main.temp + "°";
            weatherDescription = weatherData.weather[0].main;
            humidityPercent = weatherData.main.humidity;
            windSpeed = weatherData.wind.speed;
            cloudPercent = weatherData.clouds.all;
            citySearch = query;
            console.log(weatherDescription);
            // req.body.weatherImage = weatherDescription;
            // timeZone = weatherData.timezone;
            // region = weatherData.sys.country;
            const latitude = weatherData.coord.lat;
            const longitude = weatherData.coord.lon;
            const urlTime = "https://api.ipgeolocation.io/timezone?apiKey=" + apiKeyTime + "&lat=" + latitude + "&long=" + longitude;
            // const urlTime = "https://api.ipgeolocation.io/timezone?apiKey=201aec817a8846d9b1e3ca6378eb4822&lat=-27.4748&long=153.017";
            https.get(urlTime, function (response) {
                console.log(response.statusCode);
                response.on("data", function (data) {
                    const timeData = JSON.parse(data);
                    console.log(timeData);

                    cityTime = timeData.time_24;
                    cityDate = timeData.date_time_txt;

                    res.redirect("/");
                })
            })
        })
    })
});

app.listen(3000, function () {
    console.log("Server is running on port 3000");
});
