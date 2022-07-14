import React, { useEffect, useState } from 'react'
import { useLocation, useNavigate } from 'react-router-dom'
import { DayWeatherForcast } from '../components/DayWeatherForcast'
import Modal from 'react-modal'
import { WeatherModal } from '../components/WeatherModal'
import { IList, IWeatherDayObject, IWeatherRepport } from '../api/interfaces'
import { css } from '@emotion/css'

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
    daysDataList.push(showData)
  })

  return daysDataList
}

export const WeatherPage = (props: any) => {
  const location = useLocation()
  const navigation = useNavigate()
  const cityData = location.state as IProps
  const [daysForcastList, setDaysForcastList] = useState<any[]>()
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
    setDaysForcastList(days)
  }, [])

  if (!daysForcastList) {
    return <div>LOADING</div>
  }

  return (
    <div className={containerStyle}>
      {selectedDay && (
        <Modal isOpen={modalIsOpen} onRequestClose={closeModal} style={customStyles}>
          <WeatherModal
            forecastObject={forcastObject}
            selectedDay={selectedDay}
            closeModal={closeModal}
          ></WeatherModal>
        </Modal>
      )}

      <div className={cityNameContainerStyle}>
        <h1 className={cityNameStyle}>{cityData.weatherInfo.city.name}</h1>
      </div>
      <div className={dayForcastContainer}>
        {daysForcastList.map((forecast, index) => {
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
      <button className={buttonStyle} onClick={() => navigation('/')}>
        Back
      </button>
    </div>
  )
}
