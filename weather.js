import axios from "axios";

export function getWeather(lat, lon, timezone) {
  return axios.get(
    "https://api.open-meteo.com/v1/forecast?latitude=52.52&longitude=13.41&current=temperature_2m&hourly=temperature_2m,apparent_temperature,precipitation,weather_code,wind_speed_10m&daily=weather_code,temperature_2m_max,temperature_2m_min&timeformat=unixtime",
    {
      params: {
        latitude: lat,
        longitude: lon,
        timezone,
      },
    }
  ) .then(({data}) => {
    return data
    return {
        current: parseCurrentWeather(data) ,
        daily: parseDailyWeather(data),
        hourly: parseHourlyWeather(data) 
    }
}) 
}

function parseCurrentWeather({ current_weather, daily }) {
  const {
    temparature: currentTemp,
    windspeed: windSpeed,
    weathercode: iconCode,
  } = current_weather;

  const {
    temparature_2m_max: [maxTemp],
    temparature_2m_min: [minTemp],
    apparent_temparature_max: [maxFeelsLike],
    apparent_temparature_min: [minFeelsLike],
    precipitation_sum: [precip],
  } = daily;

  return {
    currentTemp: Math.round(currentTemp),
    highTemp: Math.round(highTemp),
    lowTemp: Math.round(lowTemp),
    highFeelsLike: Math.round(highFeelsLike),
    lowFeelsLike: Math.round(lowFeelsLike),
    windSpeed: Math.round(windSpeed),
    precip: Math.round(precip * 100) / 100,
    iconCode,
  };
}


function parseDailyWeather({daily}) {
    return daily.time.map((time, index) => {
        return {
            timestamp: time * 1000,
            iconCode: daily.weathercode[index],
            maxTemp: Math.round(daily.temparature_2m_max[index])
        }
    })
}


function parseHourlyWeather({ hourly, current_weather }) {
    return hourly.time
      .map((time, index) => {
        return {
          timestamp: time * 1000,
          iconCode: hourly.weathercode[index],
          temp: Math.round(hourly.temperature_2m[index]),
          feelsLike: Math.round(hourly.apparent_temperature[index]),
          windSpeed: Math.round(hourly.windspeed_10m[index]),
          precip: Math.round(hourly.precipitation[index] * 100) / 100,
        }
      })
      .filter(({ timestamp }) => timestamp >= current_weather.time * 1000)
  }