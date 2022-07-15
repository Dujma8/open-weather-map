export interface IShowData {
  morningTemperature: number
  dayTemperature: number
  nightTemperature: number
  humidity: number
  maxTemp: number
  minTemp: number
  dayOfTheWeek: string
  date: string
  modeHumidity: number[]
  meanHumidity: number
  averageHumidity: number
  meanTemp: number
  modeTemp: number[]
}

export interface IMain {
  temp: number
  feels_like: number
  temp_min: number
  temp_max: number
  pressure: number
  sea_level: number
  grnd_level: number
  humidity: number
  temp_kf: number
}

export interface IWeather {
  id: number
  main: string
  description: string
  icon: string
}

export interface IList {
  dt: number
  main: IMain
  dt_txt: string
  weather: IWeather[]
}

export interface IWeatherRepport {
  list: IList[]
  city: {
    id: number
    name: string
    coord: {
      lat: number
      lon: number
    }
    country: string
    population: number
    timezone: number
    sunrise: number
    sunset: number
  }
}

export interface IWeatherDayObject {
  [key: string]: IList[]
}
