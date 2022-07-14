import React, { useState } from 'react'
import { getCityGeoCodes } from '../api/WeatherRepository'
import { CityOption } from '../components/CityOption'
import { css } from '@emotion/css'

export interface ICity {
  name: string
  lat: number
  lon: number
  country: string
}

const containerStyle = css`
  width: 100vw;
  height: 100vh;
  align-items: center;
  align-content: center;
  background-image: url(https://img1.goodfon.com/wallpaper/nbig/f/43/nebo-tuchi-tekstura-forma.jpg);
  background-size: cover;
  background-repeat: no-repeat;
`

const inputStyle = css`
  width: 30rem;
  height: 2rem;
  border-radius: 2rem;
  padding: 5px;
  padding-left: 20px;
`
const itemContainerStyle = css`
  width: 100%;
  text-align: center;
  padding-top: 10rem;
`

const buttonContainerStyle = css`
  margin-top: 10px;
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
`

const foundCityContainer = css`
  text-align: center;
  margin-top: 20px;
`

export const LandingPage = () => {
  const [searchPhrase, setSearchPhrase] = useState('')
  const [isError, setIsError] = useState(false)
  const [foundCities, setFoundCities] = useState<ICity[]>([])

  return (
    <div className={containerStyle}>
      <div className={itemContainerStyle}>
        <h1>Weather Forecast Application</h1>
        <input
          type='text'
          placeholder='search City'
          onChange={(e) => setSearchPhrase(e.target.value)}
          value={searchPhrase}
          className={inputStyle}
        />
        <div className={buttonContainerStyle}>
          <button
            className={buttonStyle}
            disabled={searchPhrase === ''}
            onClick={async () => {
              try {
                const cities = await getCityGeoCodes(searchPhrase)
                if (!cities || cities.length === 0) {
                  setIsError(true)
                  setFoundCities([])
                } else {
                  setIsError(false)

                  setFoundCities(cities)
                }
              } catch (e) {
                console.error(e)
              }
            }}
          >
            Search
          </button>
        </div>
      </div>
      <div className={foundCityContainer}>
        {foundCities &&
          foundCities.map((city, index) => {
            return <CityOption city={city} key={index} />
          })}
        {isError && (
          <div>
            <p>
              We could not find your city with this name. please check if you typed the name
              correctly and try again
            </p>
          </div>
        )}
      </div>
    </div>
  )
}
