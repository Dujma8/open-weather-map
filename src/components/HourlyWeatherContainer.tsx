import React from 'react'
import Collapsible from 'react-collapsible'
import { IList } from '../api/interfaces'
interface IHourContainer {
  hourData: IList
}

export const HourlyWeatherContainer = (props: IHourContainer) => {
  const { hourData } = props
  const weatherIcon = `http://openweathermap.org/img/wn/${hourData.weather[0].icon}@2x.png`
  const [date, time] = hourData.dt_txt.split(' ')
  console.log(hourData)

  const HeadderData = (
    <div>
      <div
        style={{
          display: 'flex',
          flexDirection: 'row',
          height: '100px',
          marginBottom: '10px',
          borderRadius: '10px',
        }}
      >
        <div style={{ flexDirection: 'column' }}>
          <img
            src={weatherIcon}
            alt=''
            style={{ display: 'inline-block', height: '70%', marginBottom: 0 }}
          />
          <p style={{ margin: 0, marginLeft: '10px' }}>{hourData.main.temp}&deg;C </p>
        </div>
        <p style={{ marginTop: '35px', marginLeft: '15px' }}>{time.slice(0, 5)}</p>
        <p style={{ marginTop: '35px', marginLeft: '20px', fontWeight: 'bold' }}>Feels like: </p>
        <p style={{ marginTop: '35px', marginLeft: '5px' }}>{hourData.main.feels_like}&deg;C</p>
        <div style={{ flex: '1', textAlign: 'end', marginRight: '15px' }}>
          <p
            style={{
              marginTop: '35px',
              marginLeft: '5px',
              display: 'inline-block',
              fontWeight: 'bold',
            }}
          >
            {hourData.weather[0].description}
          </p>
        </div>
      </div>
    </div>
  )
  return (
    <div style={{ border: '1px solid', borderRadius: '20px', marginBottom: '10px' }}>
      <Collapsible trigger={HeadderData}>
        <div>
          <table>
            <tr>
              <td>
                <p style={{ marginTop: 5, fontWeight: 'bold' }}>Min temperature :</p>
              </td>
              <td>
                <p style={{ marginTop: 5 }}>{hourData.main.temp_min} &deg;C </p>
              </td>
            </tr>
            <tr>
              <td>
                <p style={{ marginTop: 5, fontWeight: 'bold' }}>Max temperature :</p>
              </td>
              <td>
                <p style={{ marginTop: 5 }}>{hourData.main.temp_max} &deg;C </p>
              </td>
            </tr>
            <tr>
              <td>
                <p style={{ marginTop: 5, fontWeight: 'bold' }}>Humidity :</p>
              </td>
              <td>
                <p style={{ marginTop: 5 }}>{hourData.main.humidity.toFixed(2)}%</p>
              </td>
            </tr>
          </table>
        </div>
      </Collapsible>
    </div>
  )
}
