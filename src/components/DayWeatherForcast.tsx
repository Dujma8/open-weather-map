import React from 'react'
import { IShowData } from '../api/interfaces'
import { css } from '@emotion/css'

interface IProps {
  forecast: IShowData
  openModal: any
  selectDay: any
}

const ContainerStyle = css`
  height: 440px;
  width: 300px;
  background-color: #c7c3c3;
  opacity: 70%;
  display: inline-block;
  margin: 10px;
  border-radius: 30px;
  padding: 10px;
`
const containerDayStyle = css`
  border-bottom: solid 1px;
`
const weekDayNameStyle = css`
  font-weight: bold;
  font-size: 1.5rem;
  margin-bottom: 0px;
`

const dateNameStyle = css`
  margin-top: 0;
  font-size: 0.8rem;
`

const tableStyle = css`
  text-align: left;
`

const seeMoreBUttonStyle = css`
  border-style: none;
  background-color: #424141;
  color: white;
  padding: 10px;
  border-radius: 5px;
`

const tableLabelStyle = css`
  margin-top: 5px;
  font-weight: bold;
`

const tableValueStyle = css`
  margin-top: 5px;
`

export const DayWeatherForcast = (props: IProps) => {
  const { forecast, openModal, selectDay } = props
  return (
    <div className={ContainerStyle}>
      <div className={containerDayStyle}>
        <p className={weekDayNameStyle}>{forecast.dayOfTheWeek}</p>
        <p className={dateNameStyle}>{forecast.date}</p>
      </div>
      <div>
        <table className={tableStyle}>
          <tbody>
            <tr>
              <td>
                <p className={tableLabelStyle}>Morning temperature :</p>
              </td>
              <td>
                <p className={tableValueStyle}>{forecast.morningTemperature ?? ''} &deg;C </p>
              </td>
            </tr>
            <tr>
              <td>
                <p className={tableLabelStyle}>Day temperature :</p>
              </td>
              <td>
                <p className={tableValueStyle}>{forecast.dayTemperature ?? ''} &deg;C </p>
              </td>
            </tr>
            <tr>
              <td>
                <p className={tableLabelStyle}>Night temperature :</p>
              </td>
              <td>
                <p className={tableValueStyle}>{forecast.nightTemperature ?? ''} &deg;C </p>
              </td>
            </tr>
            <tr>
              <td>
                <p className={tableLabelStyle}>Min temperature :</p>
              </td>
              <td>
                <p className={tableValueStyle}>{forecast.minTemp} &deg;C </p>
              </td>
            </tr>
            <tr>
              <td>
                <p className={tableLabelStyle}>Max temperature :</p>
              </td>
              <td>
                <p className={tableValueStyle}>{forecast.maxTemp} &deg;C </p>
              </td>
            </tr>
            <tr>
              <td>
                <p className={tableLabelStyle}>Humidity :</p>
              </td>
              <td>
                <p className={tableValueStyle}>{forecast.humidity.toFixed(2) ?? 0} %</p>
              </td>
            </tr>
          </tbody>
        </table>
        <button
          className={seeMoreBUttonStyle}
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
