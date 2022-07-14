import React from 'react'
import { useNavigate } from 'react-router-dom'
import { getWeatherForcast } from '../api/WeatherRepository'
import { ICity } from '../pages/LandingPage'
import { css } from '@emotion/css'

interface ICityOptionProps {
  city: ICity
}

const containerStyle = css`
  border: solid 1px;
  width: 200px;
  border-radius: 10px;
  opacity: 70%;
  background-color: #000;
  text-align: center;
  display: inline-block;
  margin: 10px;
`
const cityNameStyle = css`
  color: #fff;
`

export const CityOption = (props: ICityOptionProps) => {
  const navigate = useNavigate()
  const { city } = props
  return (
    <div
      className={containerStyle}
      onClick={async () => {
        const weatherInfo = await getWeatherForcast(city.lat, city.lon)

        navigate('/weather', { state: { weatherInfo } })
      }}
    >
      <p className={cityNameStyle}>
        {city.name} , {city.country}
      </p>
    </div>
  )
}
