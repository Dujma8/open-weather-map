import React, { useEffect, useState } from 'react'
import { useLocation, useNavigate } from 'react-router-dom'
import { DayWeatherForcast } from '../components/DayWeatherForcast'

import Modal from 'react-modal'
import { WeatherModal } from '../components/WeatherModal'

const customStyles = {
  content: {
    top: '50%',
    left: '50%',
    right: 'auto',
    bottom: 'auto',
    marginRight: '-50%',
    transform: 'translate(-50%, -50%)',
    borderRadius: '30px',
    onferflow: 'scroll',
    maxHeight: '90vh',
    backgroundColor: '#ded9d9',
  },
}

interface IProps {
  weatherInfo: IWeatherRepport
}

export interface IShowData {
  morningTemperature: number
  dayTemperature: number
  nightTemperature: number
  humidity: number
  maxTemp: number
  minTemp: number
  dayOfTheWeek: string
  date: string
}

interface IMain {
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

interface IWeather {
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

export const getDayOfTheWeek = (dt: number) => {
  const days = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday']
  const dayNum = new Date(dt * 1000).getDay()
  const result = days[dayNum]
  return result
}

const transformDataToWeatherObject = (data: IList[]) => {
  const weatherDayObject: IWeatherDayObject = {}
  data.map((day) => {
    if (!day) {
      return
    }
    const [datePart, time] = day.dt_txt.split(' ')
    if (datePart && time) {
      weatherDayObject[datePart] = Object.keys(weatherDayObject).includes(datePart)
        ? [...weatherDayObject[datePart], day]
        : [day]
    }
  })
  return weatherDayObject
}
const createDayForcastList = (weatherDayObject: IWeatherDayObject) => {
  const days = Object.keys(weatherDayObject)
  const showDataForDays: any[] = []
  days.map((day) => {
    const showData: any = {}
    showData.date = day
    const dayData = weatherDayObject[day]
    let maxTemp = dayData[0].main.temp_max
    let minTemp = dayData[0].main.temp_min
    let humidity = dayData[0].main.humidity

    dayData.map((hour) => {
      showData.dayOfTheWeek = getDayOfTheWeek(hour.dt)
      const [date, time] = hour.dt_txt.split(' ')
      showData.date = date
      humidity = humidity + hour.main.humidity
      if (hour.main.temp_max > maxTemp) {
        maxTemp = hour.main.temp_max
      }
      if (hour.main.temp_min < minTemp) {
        minTemp = hour.main.temp_min
      }
      if (time === '06:00:00') {
        showData.morningTemperature = hour.main.temp
      } else if (time === '12:00:00') {
        showData.dayTemperature = hour.main.temp
      } else if (time === '00:00:00') {
        showData.nightTemperature = hour.main.temp
      }
    })
    showData.humidity = humidity / dayData.length
    showData.maxTemp = maxTemp
    showData.minTemp = minTemp
    showDataForDays.push(showData)
  })

  return showDataForDays
}

export const WeatherPage = (props: any) => {
  const location = useLocation()
  const navigation = useNavigate()
  const cityData = location.state as IProps
  const [dayForcast, setDayForcast] = useState<any[]>()
  const [forcastObject, setForcastObject] = useState<any>()
  const [modalIsOpen, setIsOpen] = React.useState(false)
  const [selectedDay, setSelectedDay] = useState<string>()

  function openModal() {
    setIsOpen(true)
  }

  function closeModal() {
    setIsOpen(false)
  }

  useEffect(() => {
    const dayObject = transformDataToWeatherObject(cityData.weatherInfo.list)
    setForcastObject(dayObject)
    const days = createDayForcastList(dayObject)
    setDayForcast(days)
  }, [])

  if (!dayForcast) {
    return <div>LOADING</div>
  }

  return (
    <div
      style={{
        width: '100vw',
        minHeight: '100vh',
        alignItems: 'center',
        alignContent: 'center',
        backgroundImage:
          'url(https://img1.goodfon.com/wallpaper/nbig/f/43/nebo-tuchi-tekstura-forma.jpg)',
        backgroundSize: 'cover',
        backgroundRepeat: 'no-repeat',
        position: 'relative',
      }}
    >
      {selectedDay && (
        <Modal
          isOpen={modalIsOpen}
          onRequestClose={closeModal}
          style={customStyles}
          contentLabel='Example Modal'
        >
          <WeatherModal
            forecastObject={forcastObject}
            selectedDay={selectedDay}
            closeModal={closeModal}
          ></WeatherModal>
        </Modal>
      )}

      <div style={{ paddingTop: '30px', textAlign: 'center' }}>
        <h1 style={{ color: '#c7c3c3' }}>{cityData.weatherInfo.city.name}</h1>
      </div>
      <div style={{ textAlign: 'center' }}>
        {dayForcast.map((forecast, index) => {
          return (
            <DayWeatherForcast
              key={index}
              forecast={forecast}
              openModal={openModal}
              selectDay={setSelectedDay}
            />
          )
        })}
      </div>
      <button
        style={{
          position: 'absolute',
          left: 30,
          top: 30,
          color: 'white',
          backgroundColor: '#1a61cb',
          width: '120px',
          height: '40px',
          borderRadius: '10px',
          borderStyle: 'hidden',
          fontWeight: 'bold',
        }}
        onClick={() => navigation('/')}
      >
        Back
      </button>
    </div>
  )
}
