const CITY_INPUT = document.getElementById("city-location-input")
const WEATHER_INFO_IMG = document.getElementById("weather-graphical-showcase")
const WEATHER_INFO_TEXT = document.getElementById("weather-textual-info")
const TEMPERATURE_INFO = document.getElementById("temperature-info")
const HUMIDITY_INFO = document.getElementById("humidity-info")
const WIND_SPEED_INFO = document.getElementById("wind-speed-info")
const WIND_DIR_INFO = document.getElementById("wind-dir-info")

CITY_INPUT.addEventListener("keypress", function(key) {
    if(key.key !== "Enter") {
        return
    }

    city = (CITY_INPUT.value).trim()

    if(city == "") {
        alert("Please enter a valid city before submitting.")
        return -1
    }

    update_DOM(city)
})

function validate_weather_data(weather_data) {
    if(weather_data == -1 || weather_data == 1) {
        // Proxy server returns -1 or 1 in case of any error or an invalid city.
        return false
    }

    return true
}

function update_DOM(city) {
    get_city_weather(city).then(function(unparsed_weather_info) {
        if(validate_weather_data(unparsed_weather_info) !== true) {
            alert("Oops, something went wrong on our side.\nJust sit tight for a few minutes and we should be all good again. 🙂")
            return
        }

        weather_info = JSON.parse(unparsed_weather_info)

        CITY_INPUT.blur()  // Brings down the touch screen keyboard on mobile phones.

        try {
            WEATHER_INFO_IMG.setAttribute("src", `https://${(weather_info["current"]["condition"]["icon"]).replaceAll("64x64", "128x128")}`)
            WEATHER_INFO_TEXT.innerText = weather_info["current"]["condition"]["text"]
            TEMPERATURE_INFO.innerText = `The Temperature is ${weather_info["current"]["feelslike_c"]}℃`
            HUMIDITY_INFO.innerText = `The Humidity is ${weather_info["current"]["humidity"]}%`
            WIND_SPEED_INFO.innerText = `The Wind is at ${weather_info["current"]["wind_kph"]}kmph`
            WIND_DIR_INFO.innerText = `The Wind is with a heading of ${weather_info["current"]["wind_degree"]}deg`
        }
        catch(error) {
            console.error(error)
            alert("Unfortunately we cannot access the weather data of that city.\nPlease try another city.")
            CITY_INPUT.value = ""  // Clears the invalid input in the search box.
        }
    })
}