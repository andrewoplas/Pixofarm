import React from 'react'
import DarkSkyApi from 'dark-sky-api';
import { injectIntl } from "react-intl";
import moment from 'moment'

import temperature from '../../assets/images/weather/temperature.svg'
import wind from '../../assets/images/weather/wind-speed.svg'
import precipitation from '../../assets/images/weather/precipitation.svg'
import humidity from '../../assets/images/weather/humidity-new.svg'
import evaporation from '../../assets/images/weather/evapotranspiration.svg'
import gdd from '../../assets/images/weather/gdd.svg'
import forecast from '../../assets/images/weather/weather-forecast.svg'

import './forecast.css'

import ComponentAreaChartSync from './componentAreaChartSync'

class SectionWeartherForecast extends React.Component {
    constructor(props) {
        super(props)

        this.state = {
            DarkSkyDayly: {},
            DarkSkyCurrently: {},
        };
        DarkSkyApi.apiKey = '9208a414578bb64d4d603453abe18ab0';
        DarkSkyApi.units = 'si'; // default 'us'
        DarkSkyApi.language = 'en'; // default 'en'
        this.DarkSkyApiresponseUnits = DarkSkyApi.getResponseUnits();
        DarkSkyApi
            .loadItAll('alerts,hourly,minutely,flags', {
                latitude: this.props.latitude,
                longitude: this.props.longitude
            })
            .then(result => {
                // console.log('DarkSkyApi ', result, this.DarkSkyApiresponseUnits)
                this.setState({
                    DarkSkyDayly: result.daily,
                    DarkSkyCurrently: result.currently,
                })
            });
    }
    rederTooltip = (parr) => {
        let ret = { success: false, error: '', resp: '' }
        ret.parr = parr
        if (!parr || !parr.format || !parr.data || !parr.data.active) {
            ret.error = 'parr'
            return ret.resp
        }
        ret.dataKey = parr.data.payload[0].dataKey
        ret.value = parr.data.payload[0].payload[ret.dataKey]
        ret.resp = parr.format.replace("__value__", ret.value);
        // console.log('rederTooltip', ret)
        return ret.resp
    }
    labeldayFormat = (parr) => {
        let ret = { success: false, resp: '' }
        ret.parr = parr
        ret.today = moment();
        ret.tommorow = moment().add(1, 'days');
        if (parr.format('YYYY-MM-DD') === ret.today.format('YYYY-MM-DD')) {
            ret.resp = 'Today'
            return ret.resp
        }
        if (parr.format('YYYY-MM-DD') === ret.tommorow.format('YYYY-MM-DD')) {
            ret.resp = 'Tomorrow'
            return ret.resp
        }
        ret.resp = parr.format('D MMM')
        // console.log(ret)
        return ret.resp
    }
    render() {
        const {
            intl: {
                messages
            },
            chartHeight,
            stroke,
            areaColor,
        } = this.props
        let chartData = []
        if (this.state.DarkSkyDayly && this.state.DarkSkyDayly.data) {
            chartData = this.state.DarkSkyDayly.data.map((day) => {
                return {
                    labelday: this.labeldayFormat(day.dateTime),
                    temperatureMax: day.temperatureMax,
                    windSpeed: day.windSpeed,
                    precipIntensity: day.precipIntensity,
                    humidity: day.humidity,
                }
            })
        }
        console.log('SectionWeartherForecast render chartData', chartData)
        return (
            <div className='weather-details'>
                <div className='weather-summary uk-flex uk-flex-middle'>
                    <img src={forecast} />
                    <h2 className='title'>{messages.orchad.headings.forecast}</h2>
                    <p className='week-summary'>{this.state.DarkSkyDayly.summary}</p>
                </div>

                <div className='weather-row uk-flex uk-flex-middle'>
                    <div className='weather-label uk-width-1-3'>
                        <img src={temperature} className='weather-icon' />
                        <p className='label'>{messages.orchad.weather.temperature}</p>
                    </div>
                    <div className='weather-chart uk-width-2-3'>
                        <ComponentAreaChartSync
                            chartData={chartData}
                            height={chartHeight}
                            areaColor={areaColor}
                            stroke={stroke}
                            dataKey='temperatureMax'
                            syncId='syncIdDaily'
                            tooltip={(data) => this.rederTooltip({ format: `__value__ ${this.DarkSkyApiresponseUnits.temperatureMax}`, data: data })}
                            labeltop='labelday'
                        />
                    </div>
                </div>

                <div className='weather-row uk-flex uk-flex-middle'>
                    <div className='weather-label uk-width-1-3'>
                        <img src={wind} className='weather-icon' />
                        <p className='label'>{messages.orchad.weather.wind}</p>
                    </div>
                    <div className='weather-chart uk-width-2-3'>
                        <ComponentAreaChartSync
                            chartData={chartData}
                            height={chartHeight}
                            areaColor={areaColor}
                            stroke={stroke}
                            dataKey='windSpeed'
                            syncId='syncIdDaily'
                            tooltip={(data) => this.rederTooltip({ format: `__value__ ${this.DarkSkyApiresponseUnits.windSpeed}`, data: data })}
                        />
                    </div>
                </div>

                <div className='weather-row uk-flex uk-flex-middle'>
                    <div className='weather-label uk-width-1-3'>
                        <img src={precipitation} className='weather-icon' />
                        <p className='label'>{messages.orchad.weather.precipitation}</p>
                    </div>
                    <div className='weather-chart uk-width-2-3'>
                        <ComponentAreaChartSync
                            chartData={chartData}
                            height={chartHeight}
                            areaColor={areaColor}
                            stroke={stroke}
                            dataKey='precipIntensity'
                            syncId='syncIdDaily'
                            tooltip={(data) => this.rederTooltip({ format: `__value__ ${this.DarkSkyApiresponseUnits.precipIntensity}`, data: data })}
                        />
                    </div>
                </div>

                <div className='weather-row uk-flex uk-flex-middle'>
                    <div className='weather-label uk-width-1-3'>
                        <img src={humidity} className='weather-icon' />
                        <p className='label'>{messages.orchad.weather.humidity}</p>
                    </div>
                    <div className='weather-chart uk-width-2-3'>
                        <ComponentAreaChartSync
                            chartData={chartData}
                            height={chartHeight}
                            areaColor={areaColor}
                            stroke={stroke}
                            dataKey='humidity'
                            syncId='syncIdDaily'
                            tooltip={(data) => this.rederTooltip({ format: `__value__ %`, data: data })}
                        />
                    </div>
                </div>
                <>
                    {/* 

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
                     */}
                </>
            </div>
        )
    }
}
export default injectIntl(SectionWeartherForecast)