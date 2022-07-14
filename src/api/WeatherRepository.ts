import axios from 'axios'
import { useQuery } from 'react-query'

export const getCityGeoCodes = async (cityName: string) => {
  const city = await axios.get('http://api.openweathermap.org/geo/1.0/direct', {
    params: { q: cityName, limit: 5, appid: process.env.REACT_APP_WEATHER_ID },
  })
  return city.data
}

export const useCity = (lat: number, lon: number) => {
  return useQuery('city-weather', () => getWeatherForcast(lat, lon))
}
export const getWeatherForcast = async (lat: number, lon: number) => {
  const city = await axios.get('http://api.openweathermap.org/data/2.5/forecast', {
    params: { lat: lat, lon: lon, appid: process.env.REACT_APP_WEATHER_ID, units: 'metric' },
  })

  return city.data
}
