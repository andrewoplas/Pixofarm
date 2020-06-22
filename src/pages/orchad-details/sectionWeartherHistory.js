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

import './forecast.css'

import ComponentAreaChartSync from './componentAreaChartSync'

const interval = {
    value: '5',
    unit: 'days',
}

class SectionWeartherHistory extends React.Component {
    constructor(props) {
        super(props)
        let ret = { success: false, error: '', resp: '' }
        this.state = {
            historicalBase: moment().format('YYYY-MM-DD'),
            DarkSkyDayly: [],
            DarkSkyCurrently: {},
        };
        DarkSkyApi.apiKey = '9208a414578bb64d4d603453abe18ab0';
        DarkSkyApi.units = 'si'; // default 'us'
        DarkSkyApi.language = 'en'; // default 'en'
        this.DarkSkyApiresponseUnits = DarkSkyApi.getResponseUnits();
        let historicalStart = moment(this.state.historicalBase).subtract(3, 'months')
        let historicalEnd = moment(this.state.historicalBase)
        ret.retriveHistorical = this.retriveHistorical({
            start: historicalStart,
            end: historicalEnd,
            interval: interval,
        })
        console.log('SectionWeartherHistory constructor', ret, moment(this.state.historicalBase))
    }
    componentDidUpdate(prevProps, prevState) {
        if (moment(prevState.historicalBase).format('YYYY-MM-DD') !== moment(this.state.historicalBase).format('YYYY-MM-DD')) {
            console.log('componentDidUpdate historicalEnd', moment(this.state.historicalBase))
            let historicalStart = moment(this.state.historicalBase).subtract(3, 'months')
            let historicalEnd = moment(this.state.historicalBase)
            let retriveHistorical = this.retriveHistorical({
                start: historicalStart,
                end: historicalEnd,
                interval: interval,
            })
        }
    }
    retriveHistorical = (parr) => {
        // return
        let ret = { success: false, error: '', resp: '', dates: [], promisses: [] }
        ret.parr = parr
        if (!parr || !parr.start || !parr.end || !parr.interval || !parr.interval.unit || !parr.interval.value) {
            ret.error = 'parr'
            return ret
        }
        let datesimax = 100;
        let datesi = 0
        let current = parr.start
        while (datesi < datesimax && current.valueOf() < parr.end.valueOf()) {
            datesi++;
            ret.dates.push({
                formated: current.format(),
            })
            current = parr.start.add(parr.interval.value, parr.interval.unit)
        }
        if (ret.dates.length === 0) {
            ret.error = 'interval to small'
            return ret
        }
        for (let datei in ret.dates) {
            let date = ret.dates[datei]
            ret.promisses.push(new Promise((resolve) => {
                DarkSkyApi
                    .loadTime(date.formated, 'alerts,hourly,minutely,flags', {
                        latitude: this.props.latitude,
                        longitude: this.props.longitude
                    })
                    .then(result => {
                        resolve(result.daily.data[0])
                    });
            }))
        }
        Promise.all(ret.promisses).then((values) => {
            console.log(values);
            this.setState({
                DarkSkyDayly: [...values]
            })

        });
        ret.success = true
        return ret
    }
    rederTooltip = (parr) => {
        let ret = { success: false, error: '', resp: '' }
        ret.parr = parr
        if (!parr || !parr.format || !parr.data || !parr.data.active || !parr.data.payload || !parr.data.payload[0]) {
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
        if (this.state.DarkSkyDayly.length > 0) {
            chartData = this.state.DarkSkyDayly.map((day) => {
                let time = moment.unix(parseInt(day.time))
                return {
                    labelday: this.labeldayFormat(time),
                    temperatureMax: day.temperatureMax,
                    windSpeed: day.windSpeed,
                    precipIntensity: day.precipIntensity,
                    humidity: day.humidity,
                }
            })
        }
        console.log('SectionWeartherHistory render chartData', chartData)
        return (
            <div className='weather-details'>
                <div className='weather-row uk-flex uk-flex-middle'>
                    <div className='weather-label uk-width-expand'>
                        <img src={temperature} className='weather-icon' />
                        <p className='label'>{messages.orchad.weather.temperature}</p>
                    </div>
                    <div className='weather-chart uk-width-5-6'>
                        <ComponentAreaChartSync
                            chartData={chartData}
                            height={chartHeight}
                            areaColor={areaColor}
                            stroke={stroke}
                            dataKey='temperatureMax'
                            syncId='syncIdSeason'
                            tooltip={(data) => this.rederTooltip({ format: `__value__ ${this.DarkSkyApiresponseUnits.temperatureMax}`, data: data })}
                            labeltop='labelday'
                            labeltopInterval='preserveStart'
                        />
                    </div>
                </div>

                <div className='weather-row uk-flex uk-flex-middle'>
                    <div className='weather-label uk-width-expand'>
                        <img src={wind} className='weather-icon' />
                        <p className='label'>{messages.orchad.weather.wind}</p>
                    </div>
                    <div className='weather-chart uk-width-5-6'>
                        <ComponentAreaChartSync
                            chartData={chartData}
                            height={chartHeight}
                            areaColor={areaColor}
                            stroke={stroke}
                            dataKey='windSpeed'
                            syncId='syncIdSeason'
                            tooltip={(data) => this.rederTooltip({ format: `__value__ ${this.DarkSkyApiresponseUnits.windSpeed}`, data: data })}
                        />
                    </div>
                </div>

                <div className='weather-row uk-flex uk-flex-middle'>
                    <div className='weather-label uk-width-expand'>
                        <img src={precipitation} className='weather-icon' />
                        <p className='label'>{messages.orchad.weather.precipitation}</p>
                    </div>
                    <div className='weather-chart uk-width-5-6'>
                        <ComponentAreaChartSync
                            chartData={chartData}
                            height={chartHeight}
                            areaColor={areaColor}
                            stroke={stroke}
                            dataKey='precipIntensity'
                            syncId='syncIdSeason'
                            tooltip={(data) => this.rederTooltip({ format: `__value__ ${this.DarkSkyApiresponseUnits.precipIntensity}`, data: data })}
                        />
                    </div>
                </div>

                <div className='weather-row uk-flex uk-flex-middle'>
                    <div className='weather-label uk-width-expand'>
                        <img src={humidity} className='weather-icon' />
                        <p className='label'>{messages.orchad.weather.humidity}</p>
                    </div>
                    <div className='weather-chart uk-width-5-6'>
                        <ComponentAreaChartSync
                            chartData={chartData}
                            height={chartHeight}
                            areaColor={areaColor}
                            stroke={stroke}
                            dataKey='humidity'
                            syncId='syncIdSeason'
                            tooltip={(data) => this.rederTooltip({ format: `__value__ %`, data: data })}
                        />
                    </div>
                </div>
                <section className='uk-container uk-flex uk-flex-column uk-flex-center buttons-holder uk-text-center'>
                    {moment().year() !== moment(this.state.historicalBase).year() &&
                        <div 
                            className={`season-btn ${moment().year() === moment(this.state.historicalBase).year() ? 'active-btn' : 'link'}`}
                            onClick={() => {
                                this.setState({
                                    historicalBase: moment(this.state.historicalBase).set('year', moment().year())
                                })
                            }}
                        >
                            currrent season {moment().year()}
                        </div>
                    }
                    <div
                        className={`season-btn ${(moment().year() - 1) === moment(this.state.historicalBase).year() ? 'active-btn' : 'link'}`}
                        onClick={() => {
                            this.setState({
                                historicalBase: moment(this.state.historicalBase).set('year', moment().year() - 1).format('YYYY-MM-DD')
                            })
                        }}
                    >
                        previous season {moment().year() - 1}
                    </div>
                    <div
                        className={`season-btn ${(moment().year() - 2) === moment(this.state.historicalBase).year() ? 'active-btn' : 'link'}`}
                        onClick={() => {
                            this.setState({
                                historicalBase: moment(this.state.historicalBase).set('year', moment().year() - 2).format('YYYY-MM-DD')
                            })
                        }}
                    >
                        season {moment().year() - 2}
                    </div>
                    <div
                        className={`season-btn ${(moment().year() - 3) === moment(this.state.historicalBase).year() ? 'active-btn' : 'link'}`}
                        onClick={() => {
                            this.setState({
                                historicalBase: moment(this.state.historicalBase).set('year', moment().year() - 3).format('YYYY-MM-DD')
                            })
                        }}
                    >
                        season {moment().year() - 3}
                    </div>
                </section>
            </div>
        )
    }
}
export default injectIntl(SectionWeartherHistory)