import axios from "axios"

// https://api.open-meteo.com/v1/forecast?latitude=52.52&longitude=13.41&current=temperature_2m&hourly=temperature_2m,apparent_temperature,precipitation,weather_code,wind_speed_10m&daily=weather_code,temperature_2m_max,temperature_2m_min&timeformat=unixtime



export function getWeather(lat, lon, timezone) {
    return axios.get("https://api.open-meteo.com/v1/forecast", {
        
        params: {
        latitude: lat, 
        longitude: lon, 
        timezone,
    },
}


)/*.then(({data}) => {
    return {
        current: parseCurrentWeather(data) ,
        daily: parseDailyWeather(data),
        hourly: parseHourlyWeather(data) 
    }
}) */
} 


function parseCurrentWeather ({current_weather, daily}) {

    const {
        temparature: currentTemp,
        windspeed: windSpeed,
        weathercode: iconCode
    } = current_weather

    const {
        temparature_2m_max: [maxTemp],
        temparature_2m_min: [minTemp],
        apparent_temparature_max: [maxFeelsLike],
        apparent_temparature_min: [minFeelsLike],
        precipitation_sum: [precip],

    } = daily


    return {
      currentTemp : Math.round(currentTemp),
      highTemp: Math.round(highTemp) ,
      lowTemp: Math.round(lowTemp) ,
      highFeelsLike: Math.round(highFeelsLike) ,
      lowFeelsLike: Math.round(lowFeelsLike) ,
      windSpeed: Math.round(windSpeed),
      precip: Math.round(precip * 100) / 100 ,
      iconCode,
    }
}