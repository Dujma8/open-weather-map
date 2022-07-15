import React from 'react'
import { getDayOfTheWeek } from '../pages/WeatherPage'
import { HourlyWeatherContainer } from './HourlyWeatherContainer'
import { IWeatherDayObject } from '../api/interfaces'
import { css } from '@emotion/css'

interface IModalProps {
  forecastObject: IWeatherDayObject
  selectedDay: string
  closeModal: () => void
  tempMode: string
  humidityMode: string
}

const modalContainerStyle = css`
  min-width: 600px;
  min-height: 600px;
`

const containerStyle = css`
  height: 100px;
  width: 100%;
`

const dayLabelStyle = css`
  margin-top: 6px;
`

const buttonStyle = css`
  color: white;
  background-color: #1a61cb;
  width: 120px;
  height: 40px;
  border-radius: 10px;
  border-style: hidden;
  font-weight: bold;
`

const buttonContainerStyle = css`
  text-align: center;
`

const modeContainerStyle = css`
  margin-bottom: 20px;
`
const modeLabelStyle = css`
  font-weight: bold;
`

export const WeatherModal = (props: IModalProps) => {
  const { forecastObject, selectedDay, closeModal, tempMode, humidityMode } = props
  const data = forecastObject[selectedDay]

  return (
    <div className={modalContainerStyle}>
      <div className={containerStyle}>
        <h1>{getDayOfTheWeek(data[0].dt)}</h1>
        <p className={dayLabelStyle}>{selectedDay}</p>
      </div>
      <div>
        <div className={modeContainerStyle}>
          <table>
            <tbody>
              <tr>
                <td className={modeLabelStyle}>Temperature mode: </td>
                <td>{tempMode}</td>
              </tr>
              <tr>
                <td className={modeLabelStyle}>Humidity mode: </td>
                <td>{humidityMode}</td>
              </tr>
            </tbody>
          </table>
        </div>
        {data.map((hour, index) => (
          <HourlyWeatherContainer hourData={hour} key={index} />
        ))}
      </div>
      <div className={buttonContainerStyle}>
        <button className={buttonStyle} onClick={() => closeModal()}>
          Close
        </button>
      </div>
    </div>
  )
}
