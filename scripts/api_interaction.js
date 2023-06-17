// URL to my proxy server which forwards the request to a weather api.
const PROXY_URL = "https://weather.api-proxy-5c7.workers.dev?city="

async function get_city_weather(city) {
    url = PROXY_URL + city

    try {
        const response = await fetch(url, {
            "method": "GET"
        })
        const result = await response.text()

        // Fetch data is returned as a string. JSON.parse converts it into JSON format.
        return JSON.parse(result)
    }
    catch (error) {
        // Handles any error that occurs during the fetch.
        console.error({error})
        return -1
    }
}

