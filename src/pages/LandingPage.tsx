import React, { useState } from 'react'
import { getCityGeoCodes, getWeatherForcast } from '../api/WeatherRepository'
import { useNavigate } from 'react-router-dom'
import { CityOption } from '../components/CityOption'

export interface ICity {
  name: string
  lat: number
  lon: number
  country: string
}

export const LandingPage = () => {
  const [city, setCity] = useState('')
  const [isError, setIsError] = useState(false)
  const [foundCities, setFoundCities] = useState<ICity[]>([])
  const navigate = useNavigate()
  return (
    <div
      style={{
        width: '100vw',
        height: '100vh',
        alignItems: 'center',
        alignContent: 'center',
        backgroundImage:
          'url(https://img1.goodfon.com/wallpaper/nbig/f/43/nebo-tuchi-tekstura-forma.jpg)',
        backgroundSize: 'cover',
        backgroundRepeat: 'no-repeat',
      }}
    >
      <div style={{ width: '100%', textAlign: 'center', paddingTop: '10rem' }}>
        <h1>Weather Application</h1>
        <input
          type='text'
          placeholder='search City'
          onChange={(e) => setCity(e.target.value)}
          value={city}
          style={{
            width: '30rem',
            height: '2rem',
            borderRadius: '2rem',
            padding: '5px',
            paddingLeft: '20px',
          }}
        />
        <div style={{ marginTop: '10px' }}>
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
            disabled={city === ''}
            onClick={async () => {
              try {
                const cities = await getCityGeoCodes(city)
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
      <div style={{ textAlign: 'center', marginTop: '20px' }}>
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
