import React from 'react'
import DarkSky from 'darkskyjs'
import { injectIntl } from "react-intl";

import temperature from '../../../assets/images/weather/temperature.svg'
import wind from '../../../assets/images/weather/wind-speed.svg'
import precipitation from '../../../assets/images/weather/precipitation.svg'
import humidity from '../../../assets/images/weather/humidity-new.svg'
import evaporation from '../../../assets/images/weather/evapotranspiration.svg'
import gdd from '../../../assets/images/weather/gdd.svg'

import forecast from '../../../assets/images/weather/weather-forecast.svg'

import './forecast.css'
import { PXAreaChart } from '../index'

const apiURL = 'https://api.darksky.net/forecast/';
const apiKey = '9208a414578bb64d4d603453abe18ab0';
const exclude = '?exclude=minutely,hourly,alerts,flags';
const units = '&units=si'
const date = '255657600'

class PXWeather extends React.Component {
  constructor(props) {
    super(props)

    this.state = {
      weather: {},
      dateWeather: {},
      todayWeather: {},
      weekWeather: {},
      forecastWeather: {},
      chartTemp: []
    };
  }

  getTodayWeather = () => {
    fetch(apiURL + apiKey + '/' + this.props.latitude + ',' + this.props.longitude + exclude + units)
      .then(response => response.json())
      .then(weather => this.setState({
        todayWeather: weather.currently,
        weekWeather: weather.daily
      }));
  }
  getSpecificDateWeather = () => {
    fetch(apiURL + apiKey + '/' + this.props.latitude + ',' + this.props.longitude + ',' + date + exclude + units)
      .then(response => response.json())
      .then(dateWeather => this.setState({
        forecastWeather: dateWeather.currently
      }));
  }

  componentDidMount() {
    this.getTodayWeather();
    this.getSpecificDateWeather();
  }

  render() {
    const {
      intl: {
        messages
      },
    } = this.props

    const {
      chartHeight = 100,
      stroke = 'transparent',
      areaColor = '#1B87C3',
      chartId = 'tempIDChart',
      chartTemp = [
        {
          "name": "Today",
          "temp": 30
        },
        {
          "name": "That day",
          "temp": 20
        }
      ]
    } = this.props

    return (

      <div className='weather-details'>
        <div className='weather-summary uk-flex uk-flex-middle'>
          <img src={forecast} />
          <h2 className='title'>{messages.orchad.headings.forecast}</h2>
          <p className='week-summary'>{this.state.weekWeather.summary}</p>
        </div>
        <div className='weather-row uk-flex uk-flex-middle'>
          <div className='weather-label uk-width-1-3'>
            <img src={temperature} className='weather-icon' />
            <p className='label'>{messages.orchad.weather.temperature}</p>
          </div>
          <div className='weather-chart uk-width-2-3'>
            <p className="value">{this.state.todayWeather.temperature}</p>
          </div>
        </div>
        <div className='weather-row uk-flex uk-flex-middle'>
          <div className='weather-label uk-width-1-3'>
            <img src={wind} className='weather-icon' />
            <p className='label'>{messages.orchad.weather.windSpeed}</p>
          </div>
          <div className='weather-chart uk-width-2-3'>
            <p className="value">{this.state.todayWeather.windSpeed}</p>
          </div>
        </div>
        <div className='weather-row uk-flex uk-flex-middle'>
          <div className='weather-label uk-width-1-3'>
            <img src={precipitation} className='weather-icon' />
            <p className='label'>{messages.orchad.weather.precipitation}</p>
          </div>
          <div className='weather-chart uk-width-2-3'>
            <p className="value">{this.state.todayWeather.precipProbability}</p>
          </div>
        </div>
        <div className='weather-row uk-flex uk-flex-middle'>
          <div className='weather-label uk-width-1-3'>
            <img src={humidity} className='weather-icon' />
            <p className='label'>{messages.orchad.weather.humidity}</p>
          </div>
          <div className='weather-chart uk-width-2-3'>
            <p className="value">{this.state.todayWeather.humidity}</p>
          </div>
        </div>
        <div className='weather-row uk-flex uk-flex-middle'>
          <div className='weather-label uk-width-1-3'>
            <img src={evaporation} className='weather-icon' />
            <p className='label'>{messages.orchad.weather.evapotranspiration}</p>
          </div>
          <div className='weather-chart uk-width-2-3'>
            <p className="value">{this.state.todayWeather.temperature}</p>
          </div>
        </div>
        <div className='weather-row uk-flex uk-flex-middle'>
          <div className='weather-label uk-width-1-3'>
            <img src={gdd} className='weather-icon' />
            <p className='label'>{messages.orchad.weather.gdd}</p>
          </div>
          <div className='weather-chart uk-width-2-3'>
            <p className="value">{this.state.todayWeather.temperature}</p>
          </div>
        </div>
        <PXAreaChart
          chartData={chartTemp}
          chartHeight={chartHeight}
          areaColor={areaColor}
          stroke={stroke}
          dataKey='temp'
          labelKey='temp'
          id={chartId}
        />
      </div>
    )
  }
}
export default injectIntl(PXWeather)