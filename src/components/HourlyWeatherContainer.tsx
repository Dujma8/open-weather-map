import React from 'react'
import Collapsible from 'react-collapsible'
import { IList } from '../api/interfaces'
import { css } from '@emotion/css'
interface IHourContainer {
  hourData: IList
}

const tableLabelStyle = css`
  margin-top: 5px;
  font-weight: bold;
`

const tableValueStyle = css`
  margin-top: 5px;
`
const containerStyle = css`
  border: 1px solid;
  border-radius: 20px;
  margin-bottom: 10px;
`

const headderStyle = css`
  display: flex;
  flex-direction: row;
  height: 100px;
  margin-bottom: 10px;
  border-radius: 10px;
`

const weatherDescriptionStyle = css`
  margin-top: 35px;
  margin-left: 5px;
  display: inline-block;
  font-weight: bold;
`
const iconContainerStyle = css`
  flex-direction: column;
`
const iconStyle = css`
  display: inline-block;
  height: 70%;
  margin-bottom: 0;
`

const weatherDescriptionContainerStyle = css`
  flex: 1;
  text-align: end;
  margin-right: 15px;
`

const temperatureStyle = css`
  margin: 0;
  margin-left: 10px;
`
const timeStyle = css`
  margin-top: 35px;
  margin-left: 15px;
`

const feelsLikeStyle = css`
  margin-top: 35px;
  margin-left: 5px;
`

const feelsLikeLabelStyle = css`
  margin-top: 35px;
  margin-left: 20px;
  font-weight: bold;
`

export const HourlyWeatherContainer = (props: IHourContainer) => {
  const { hourData } = props
  const weatherIcon = `http://openweathermap.org/img/wn/${hourData.weather[0].icon}@2x.png`
  const [date, time] = hourData.dt_txt.split(' ')

  const HeadderData = (
    <div>
      <div className={headderStyle}>
        <div className={iconContainerStyle}>
          <img src={weatherIcon} alt='' className={iconStyle} />
          <p className={temperatureStyle}>{Math.floor(hourData.main.temp)}&deg;C </p>
        </div>
        <p className={timeStyle}>{time.slice(0, 5)}</p>
        <p className={feelsLikeLabelStyle}>Feels like: </p>
        <p className={feelsLikeStyle}>{Math.floor(hourData.main.feels_like)}&deg;C</p>
        <div className={weatherDescriptionContainerStyle}>
          <p className={weatherDescriptionStyle}>{hourData.weather[0].description}</p>
        </div>
      </div>
    </div>
  )
  return (
    <div className={containerStyle}>
      <Collapsible trigger={HeadderData}>
        <div>
          <table>
            <tbody>
              <tr>
                <td>
                  <p className={tableLabelStyle}>Min temperature :</p>
                </td>
                <td>
                  <p className={tableValueStyle}>{Math.floor(hourData.main.temp_min)} &deg;C </p>
                </td>
              </tr>
              <tr>
                <td>
                  <p className={tableLabelStyle}>Max temperature :</p>
                </td>
                <td>
                  <p className={tableValueStyle}>{Math.floor(hourData.main.temp_max)} &deg;C </p>
                </td>
              </tr>
              <tr>
                <td>
                  <p className={tableLabelStyle}>Humidity :</p>
                </td>
                <td>
                  <p className={tableValueStyle}>{Math.floor(hourData.main.humidity)}%</p>
                </td>
              </tr>
            </tbody>
          </table>
        </div>
      </Collapsible>
    </div>
  )
}
