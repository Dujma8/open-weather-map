import React, { useEffect, useState } from 'react'
import { useLocation, useNavigate } from 'react-router-dom'
import Modal from 'react-modal'
import { WeatherModal } from '../components/WeatherModal'
import { IList, IWeatherDayObject, IWeatherRepport } from '../api/interfaces'
import { css } from '@emotion/css'
import { mode, mean } from 'mathjs'
import { DayWeatherForecastCard } from '../components/DayWeatherForecastCard'

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

const containerStyle = css`
  width: 100vw;
  min-height: 100vh;
  align-items: center;
  align-content: center;
  background-image: url(https://img1.goodfon.com/wallpaper/nbig/f/43/nebo-tuchi-tekstura-forma.jpg);
  background-size: cover;
  background-repeat: no-repeat;
  position: relative;
`

const buttonStyle = css`
  color: white;
  background-color: #1a61cb;
  width: 120px;
  height: 40px;
  border-radius: 10px;
  border-style: hidden;
  font-weight: bold;
  margin-top: 10px;
  position: absolute;
  left: 30px;
  top: 30px;
`
const cityNameContainerStyle = css`
  padding-top: 30px;
  text-align: center;
`

const cityNameStyle = css`
  color: #c7c3c3;
`
const dayForcastContainer = css`
  text-align: center;
`

interface IProps {
  weatherInfo: IWeatherRepport
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
  const daysDataList: any[] = []
  days.map((day) => {
    const showData: any = {}
    showData.date = day
    const dayData = weatherDayObject[day]
    let maxTemp = Math.floor(dayData[0].main.temp_max)
    let minTemp = Math.floor(dayData[0].main.temp_min)
    let humidity = Math.floor(dayData[0].main.humidity)
    const humidityList: number[] = []
    const tempList: number[] = []

    dayData.map((hour) => {
      showData.dayOfTheWeek = getDayOfTheWeek(hour.dt)
      const [date, time] = hour.dt_txt.split(' ')
      showData.date = date
      humidityList.push(Math.floor(hour.main.humidity))
      tempList.push(Math.floor(hour.main.temp))
      humidity = humidity + Math.floor(hour.main.humidity)
      if (Math.floor(hour.main.temp_max) > maxTemp) {
        maxTemp = Math.floor(hour.main.temp_max)
      }
      if (Math.floor(hour.main.temp_min) < minTemp) {
        minTemp = Math.floor(hour.main.temp_min)
      }
      if (time === '06:00:00') {
        showData.morningTemperature = Math.floor(hour.main.temp)
      } else if (time === '12:00:00') {
        showData.dayTemperature = Math.floor(hour.main.temp)
      } else if (time === '00:00:00') {
        showData.nightTemperature = Math.floor(hour.main.temp)
      }
    })
    showData.averageHumidity = showData.humidity = humidity / dayData.length
    showData.meanHumidity = mean(humidityList)
    showData.modeHumidity = mode(humidityList)
    showData.meanTemp = mean(tempList)
    showData.modeTemp = mode(tempList)
    showData.maxTemp = maxTemp
    showData.minTemp = minTemp

    daysDataList.push(showData)
  })

  return daysDataList
}

export const WeatherPage = () => {
  const location = useLocation()
  const navigation = useNavigate()
  const cityData = location.state as IProps
  const [daysForcastList, setDaysForcastList] = useState<any[]>()
  const [forcastObject, setForcastObject] = useState<any>()
  const [modalIsOpen, setIsOpen] = React.useState(false)
  const [selectedDay, setSelectedDay] = useState<string>()
  const [tempMode, setTempMode] = useState('')
  const [humidityMode, setHumidityMode] = useState('')

  function openModal() {
    setIsOpen(true)
  }

  function closeModal() {
    setIsOpen(false)
    setSelectedDay('')
    setTempMode('')
    setHumidityMode('')
  }

  useEffect(() => {
    const dayObject = transformDataToWeatherObject(cityData.weatherInfo.list)
    setForcastObject(dayObject)
    const days = createDayForcastList(dayObject)
    setDaysForcastList(days)
  }, [])

  if (!daysForcastList) {
    return <div>LOADING</div>
  }

  return (
    <div className={containerStyle}>
      {selectedDay && (
        <Modal
          isOpen={modalIsOpen}
          onRequestClose={closeModal}
          style={customStyles}
          ariaHideApp={false}
        >
          <WeatherModal
            forecastObject={forcastObject}
            selectedDay={selectedDay}
            closeModal={closeModal}
            tempMode={tempMode}
            humidityMode={humidityMode}
          ></WeatherModal>
        </Modal>
      )}

      <div className={cityNameContainerStyle}>
        <h1 className={cityNameStyle}>{cityData.weatherInfo.city.name}</h1>
      </div>
      <div className={dayForcastContainer}>
        {daysForcastList.slice(0, 5).map((forecast, index) => {
          return (
            <DayWeatherForecastCard
              key={index}
              forecast={forecast}
              openModal={openModal}
              selectDay={setSelectedDay}
              setTempMode={setTempMode}
              setHumidityMode={setHumidityMode}
            />
          )
        })}
      </div>
      <button className={buttonStyle} onClick={() => navigation('/')}>
        Back
      </button>
    </div>
  )
}
