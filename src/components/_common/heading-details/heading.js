import React from 'react'
import PropTypes from 'prop-types'
import { injectIntl } from 'react-intl'

import './heading.css'

import config from '../../../config'

class PXHeadingDetails extends React.Component {
  constructor(props) {
    super(props)
  }

  render() {
    const {
      details
    } = this.props
    return (
      <section className='heading'>
        <h1 className='tagline'>{details.cTitle}</h1>
        <div className='quick-details uk-flex'>
          <div className='uk-width-1-4'>
            <p className='first'>
              <span className='detail-label' style={{ width: '100%', display: 'inline-block' }}>{details.orchads.label}</span>
              <span className='detail-value'><strong>{details.orchads.value}</strong></span>
            </p>
          </div>
          <div className='uk-width-1-4'>
            <p className='first'>
              <span className='detail-label' style={{ width: '100%', display: 'inline-block' }}>{details.hectares.label}</span>
              <span className='detail-value'><strong>{details.hectares.value}</strong></span>
            </p>
          </div>
          <div className='uk-width-1-4'>
            <p className='first'>
              <span className='detail-label' style={{ width: '100%', display: 'inline-block' }}>{details.predictedDiameter.label}</span>
              <span className='detail-value'><strong>{details.predictedDiameter.value}</strong></span>
            </p>
          </div>
          <div className='uk-width-1-4'>
            <p className='first'>
              <span className='detail-label' style={{ width: '100%', display: 'inline-block' }}>{details.forecastProduction.label}</span>
              <span className='detail-value'><strong>{details.forecastProduction.value}</strong></span>
            </p>
          </div>
        </div>
      </section>
    )
  }
}
PXHeadingDetails.propTypes = {
  details: PropTypes.object,
}

export default injectIntl(PXHeadingDetails)