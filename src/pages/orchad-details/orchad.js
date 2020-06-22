import React from 'react'
import { withRouter } from 'react-router-dom'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import { injectIntl } from 'react-intl'
import moment from 'moment'
import { getParamsAsObject } from '../../utils/funcs'

import * as actionsOrchard from "../../redux/orchard/actions"

import { PXAreaChart } from '../../components/_common'

import SectionHeader from './sectionHeader'
import SectionMap from './sectionMap'
import SectionWeartherForecast from './sectionWeartherForecast'
import SectionChartHistory from './sectionChartHistory'
import SectionWeartherHistory from './sectionWeartherHistory'

import forecast from '../../assets/images/weather/weather-forecast.svg'

import { ORCHAD } from '../../utils/constants'

import './orchad.css'

class PXOrchad extends React.Component {
  constructor(props) {
    super(props)

    this.state = {
      orchardDetails: {},
      dataloaded: false
    }
  }
  componentDidMount() {
    let ret = {}
    ret.getParamsAsObject = getParamsAsObject(window.location.search)
    ret.id = null
    if (typeof (ret.getParamsAsObject.id) !== 'undefined' && parseInt(ret.getParamsAsObject.id) > 0) {
      ret.id = parseInt(ret.getParamsAsObject.id)
    }
    if (ret.id > 0) {
      this.props.orchardDetailsGet(ret.id)
    }
    // console.log('PXOrchad componentDidMount', this.props)    
  }
  componentDidUpdate(prevProps, prevState) {
    // console.log('PXOrchad componentDidUpdate', prevProps, this.props)
    if (prevProps && prevProps.orchardDetails && prevProps.orchardDetails.loading && !this.props.orchardDetails.loading) {
      this.onDataRecived({ data: this.props.orchardDetails.data })
    }
  }
  onDataRecived = (parr) => {
    let ret = { success: false, error: '' };
    ret.parr = parr
    if (!parr || !parr.data) {
      ret.error = 'parr'
      return ret
    }
    ret.parsed = parr.data
    ret.orchardPolygonParse = this.orchardPolygonParse(parr.data)
    if (!ret.orchardPolygonParse.success) {
      ret.error = 'orchardPolygonParse'
      return ret
    }

    ret.parsed.position = ret.orchardPolygonParse.points
    // console.log('onDataRecived', ret)
    this.setState({
      orchardDetails: ret.parsed,
      dataloaded: true,
    })
    ret.success = true
    return ret
  }
  orchardPolygonParse = (parr) => {
    let ret = { success: false, points: [], error: '' };
    ret.parr = parr
    if (!parr || !parr.gpsLatitude || typeof (parr.gpsLatitude) !== 'string' || !parr.gpsLongitude || typeof (parr.gpsLongitude) !== 'string') {
      ret.error = 'parr'
      return ret
    }
    ret.gpsLatitude = parr.gpsLatitude.split(',').map(item => { return parseFloat(item) })
    ret.gpsLongitude = parr.gpsLongitude.split(',').map(item => { return parseFloat(item) })
    if (ret.gpsLatitude.length <= 2) {
      ret.error = 'polygon points count'
      return ret
    }
    if (ret.gpsLatitude.length !== ret.gpsLongitude.length) {
      ret.error = 'polygon points count mismach'
      return ret
    }
    for (let i in ret.gpsLatitude) {
      ret.points.push({
        lat: ret.gpsLatitude[i],
        lng: ret.gpsLongitude[i],
      })
    }
    ret.success = true
    return ret
  }
  render() {
    const {
      intl: { messages, locale },
    } = this.props
    const latitude = 58.28365,
      longitude = 12.28864,
      orchads = ORCHAD,
      chartHeight = 100,
      stroke = 'transparent',
      areaColor = '#1B87C3',
      chartData = [
        {
          "name": "Page A",
          "uv": 4000,
          "pv": 2400,
          "amt": 25
        },
        {
          "name": "Page B",
          "uv": 3000,
          "pv": 1398,
          "amt": 45
        },
        {
          "name": "Page C",
          "uv": 2000,
          "pv": 9800,
          "amt": 56
        },
        {
          "name": "Page D",
          "uv": 2780,
          "pv": 3908,
          "amt": 65
        },
        {
          "name": "Page E",
          "uv": 1890,
          "pv": 4800,
          "amt": 30
        },
        {
          "name": "Page F",
          "uv": 2390,
          "pv": 3800,
          "amt": 25
        },
        {
          "name": "Page G",
          "uv": 3490,
          "pv": 4300,
          "amt": 10
        }
      ]
    // console.log('PXOrchad render', this.props)

    const { orchardDetails, dataloaded } = this.state;
    const {
      lastBatch,
      position
    } = orchardDetails
    let lastMeasure = null
    if (lastBatch && lastBatch.lastMeasurements && typeof (lastBatch.lastMeasurements) === 'string' && lastBatch.lastMeasurements !== '') {
      lastMeasure = moment(lastBatch.lastMeasurements).format('D MMM YYYY')
    }
    let forecastProduction = null
    if (lastBatch && lastBatch.forecastProduction) {
      forecastProduction = lastBatch.forecastProduction
    }
    // console.log('render this.props.orchardDetails.data', orchardDetails)
    if (!dataloaded) return 'Loading...'
    return (
      <section className='page orchad-details with-bkg'>
        <section className='uk-container medium-pages uk-height-1-1 uk-flex uk-flex-column uk-flex-center'>
          <SectionHeader
            orchardDetails={orchardDetails}
          />
        </section>
        <section className='uk-container small-pages uk-height-1-1 uk-flex uk-flex-column uk-flex-center'>
          <section className='additional-area map-details'>
            <h2 className='section-heading'>{messages.orchad.headings.update}: <span className='date'>{lastMeasure || '--'}</span></h2>
            <div className='uk-flex uk-flex-wrap uk-child-width-1-2@m uk-child-width-1-1 uk-flex-middle'>
              <div className='map uk-flex'>
                <SectionMap
                  orchardDetails={orchardDetails}
                />
              </div>
              <div className='harvest-details uk-column-1-2'>
                <div className='orchad-detail uk-flex uk-flex-column'>
                  <div className='label'>{messages.orchad.details.averageDiameter}:</div>
                  <div className='value'>{orchads[0].averageDiameter}</div>
                </div>
                <div className='orchad-detail uk-flex uk-flex-column bottom'>
                  <div className='label'>{messages.orchad.details.predictedDiameter}:</div>
                  <div className='value'>{orchads[0].predictedDiameter}</div>
                </div>
                <div className='orchad-detail uk-flex uk-flex-column'>
                  <div className='label'>{messages.orchad.details.growthRate}:</div>
                  <div className='value'>{orchads[0].growthRate}</div>
                </div>
                <div className='orchad-detail uk-flex uk-flex-column bottom'>
                  <div className='label'>{messages.orchad.details.forecastProduction}:</div>
                  <div className='value'>{forecastProduction || '--'}</div>
                </div>
              </div>
            </div>
          </section>
          <section className='chart-area'>
            <h2 className='section-header'>{messages.orchad.headings.sizeClass}</h2>
            <PXAreaChart
              chartData={chartData}
              height={chartHeight}
              areaColor={areaColor}
              stroke={stroke}
              dataKey='amt'
              labelKey='name'
            />
          </section>
          <section className='weather-area'>
            <SectionWeartherForecast
              latitude={position[0].lat}
              longitude={position[0].lng}
              chartHeight={chartHeight}
              areaColor={areaColor}
              stroke={stroke}
            />
          </section>
        </section>
        <section className='dark-bg'>
          <section className='uk-container uk-height-1-1 uk-flex uk-flex-column uk-flex-center'>
            <section className='chart-history-area'>
              <SectionChartHistory
                areaColor={areaColor}
                stroke={stroke}
              />
            </section>
          </section>
          <section className='uk-container uk-height-1-1 uk-flex uk-flex-column uk-flex-center'>
            <div className='weather-summary uk-flex uk-flex-middle'>
                <img src={forecast} />
                <h2 className='title'>{messages.orchad.headings.wHistory}</h2>
            </div>
          </section>
          <section className='weather-history-area'>
              <SectionWeartherHistory
                latitude={position[0].lat}
                longitude={position[0].lng}
                chartHeight={chartHeight}
                areaColor = {areaColor}
                stroke = {stroke}
              />
          </section>
        </section>
      </section>
    )
  }
}

const mapStateToProps = state => {
  return {
    orchardDetails: state.orchard.orchardDetails
  }
}

const mapDispatchToProps = dispatch => ({

  orchardDetailsGet: data => dispatch(actionsOrchard.orchardDetailsGet(data)),
})

export default withRouter(injectIntl(connect(mapStateToProps, mapDispatchToProps)(PXOrchad)))