import React from 'react'
import { IShowData } from '../pages/WeatherPage'

interface IProps {
  forecast: IShowData
  openModal: any
  selectDay: any
}

export const DayWeatherForcast = (props: IProps) => {
  const { forecast, openModal, selectDay } = props
  return (
    <div
      style={{
        height: '440px',
        width: '300px',
        backgroundColor: '#c7c3c3',
        opacity: '70%',
        display: 'inline-block',
        margin: '10px',
        borderRadius: '30px',
        padding: '10px',
      }}
    >
      <div style={{ borderBottom: 'solid 1px' }}>
        <p style={{ fontWeight: 'bold', fontSize: '1.5rem', marginBottom: '0px' }}>
          {forecast.dayOfTheWeek}
        </p>
        <p style={{ marginTop: 0, fontSize: '0.8rem' }}>{forecast.date}</p>
      </div>
      <div>
        <table style={{ textAlign: 'left' }}>
          <tbody>
            <tr style={{ margin: 0 }}>
              <td>
                <p style={{ marginTop: 5, fontWeight: 'bold' }}>Morning temperature :</p>
              </td>
              <td>
                <p style={{ marginTop: 5 }}>{forecast.morningTemperature ?? ''} &deg;C </p>
              </td>
            </tr>
            <tr>
              <td>
                <p style={{ marginTop: 5, fontWeight: 'bold' }}>Day temperature :</p>
              </td>
              <td>
                <p style={{ marginTop: 5 }}>{forecast.dayTemperature ?? ''} &deg;C </p>
              </td>
            </tr>
            <tr>
              <td>
                <p style={{ marginTop: 5, fontWeight: 'bold' }}>Night temperature :</p>
              </td>
              <td>
                <p style={{ marginTop: 5 }}>{forecast.nightTemperature ?? ''} &deg;C </p>
              </td>
            </tr>
            <tr>
              <td>
                <p style={{ marginTop: 5, fontWeight: 'bold' }}>Min temperature :</p>
              </td>
              <td>
                <p style={{ marginTop: 5 }}>{forecast.minTemp} &deg;C </p>
              </td>
            </tr>
            <tr>
              <td>
                <p style={{ marginTop: 5, fontWeight: 'bold' }}>Max temperature :</p>
              </td>
              <td>
                <p style={{ marginTop: 5 }}>{forecast.maxTemp} &deg;C </p>
              </td>
            </tr>
            <tr>
              <td>
                <p style={{ marginTop: 5, fontWeight: 'bold' }}>Humidity :</p>
              </td>
              <td>
                <p style={{ marginTop: 5 }}>{forecast.humidity.toFixed(2) ?? 0} %</p>
              </td>
            </tr>
          </tbody>
        </table>
        <button
          style={{
            borderStyle: 'none',
            backgroundColor: '#424141',
            color: 'white',
            padding: '10px',
            borderRadius: '5px',
          }}
          onClick={() => {
            selectDay(forecast.date)
            openModal()
          }}
        >
          See More
        </button>
      </div>
    </div>
  )
}
