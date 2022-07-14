import React from 'react'
import { useNavigate } from 'react-router-dom'
import { getWeatherForcast } from '../api/WeatherRepository'
import { ICity } from '../pages/LandingPage'

interface IProps {
  city: ICity
}

export const CityOption = (props: IProps) => {
  const navigate = useNavigate()
  const { city } = props
  return (
    <div
      style={{
        border: 'solid 1px ',
        width: '200px',
        borderRadius: '10px',
        opacity: '70%',
        backgroundColor: '#000',
        textAlign: 'center',
        display: 'inline-block',
        margin: '10px',
      }}
      onClick={async () => {
        const weatherInfo = await getWeatherForcast(city.lat, city.lon)

        navigate('/weather', { state: { weatherInfo } })
      }}
    >
      <p style={{ color: '#fff' }}>
        {city.name} , {city.country}
      </p>
    </div>
  )
}
