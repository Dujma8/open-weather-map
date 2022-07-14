import React from 'react'
import { getDayOfTheWeek, IWeatherDayObject } from '../pages/WeatherPage'
import Collapsible from 'react-collapsible'
import { HourlyWeatherContainer } from './HourlyWeatherContainer'

interface IModalProps {
  forecastObject: IWeatherDayObject
  selectedDay: string
  closeModal: any
}

export const WeatherModal = (props: IModalProps) => {
  const { forecastObject, selectedDay, closeModal } = props
  const data = forecastObject[selectedDay]

  return (
    <div
      style={{
        minWidth: '600px',
        minHeight: '600px',
      }}
    >
      <div style={{ height: '100px', width: '100%' }}>
        <h1>{getDayOfTheWeek(data[0].dt)}</h1>
        <p style={{ marginTop: '0px' }}>{selectedDay}</p>
      </div>
      <div>
        {data.map((hour, index) => (
          <HourlyWeatherContainer hourData={hour} key={index} />
        ))}
      </div>
      <div style={{ textAlign: 'center' }}>
        <button
          style={{
            color: 'white',
            backgroundColor: '#1a61cb',
            width: '120px',
            height: '40px',
            borderRadius: '10px',
            borderStyle: 'hidden',
            fontWeight: 'bold',
          }}
          onClick={() => closeModal()}
        >
          Close
        </button>
      </div>
    </div>
  )
}
