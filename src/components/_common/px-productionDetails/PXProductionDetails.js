import React from 'react'
import PropTypes from 'prop-types'
import { injectIntl } from 'react-intl'
import PXHeadingDetails from '../heading-details/heading'
import PXAreaChart from '../px-area-chart/px-area-chart'

class PXProductionDetails extends React.Component {
  constructor(props) {
    super(props)
  }

  render() {
    const {
      details,
      intl: {
        messages
      },
      chartData,
      chartHeight,
      areaColor,
      stroke
    } = this.props
    return (
      <div>
        <PXHeadingDetails
          details={details}
        />
        <section className='chart-area'>
          <h2 className='section-header'>{messages.orchad.headings.sizeClass}</h2>
          <PXAreaChart
            chartData={chartData}
            height={chartHeight}
            areaColor={areaColor}
            stroke={stroke}
            dataKey='amt'
            labelKey='name'
            description='description'
          />
        </section>
        <section className="productionDetails" style={{ marginTop: '50px' }}>
          <div className='quick-details uk-flex'>
            <div className='uk-width-1-3'>
              <p className='first'>
                <span className='detail-label' style={{ width: '100%', display: 'inline-block' }}>{messages.PXCorporateDetails.BiggestFruitDiameter}</span>
                <span className='detail-value'><strong>{details.productionDetails.BiggestFruitDiameter}</strong></span>
              </p>
              <p className='second'>
                <span className='detail-label' style={{ width: '100%', display: 'inline-block' }}>{messages.PXCorporateDetails.SmallestFruitDiameter}</span>
                <span className='detail-value'><strong>{details.productionDetails.SmallestFruitDiameter}</strong></span>
              </p>
            </div>
            <div className='uk-width-1-3'>
              <p className='first'>
                <span className='detail-label' style={{ width: '100%', display: 'inline-block' }}>{messages.PXCorporateDetails.HighestDailyGrowthRate}</span>
                <span className='detail-value'><strong>{details.productionDetails.HighestDailyGrowthRate}</strong></span>
              </p>
              <p className='second'>
                <span className='detail-label' style={{ width: '100%', display: 'inline-block' }}>{messages.PXCorporateDetails.LowestDailyGrowthRate}</span>
                <span className='detail-value'><strong>{details.productionDetails.LowestDailyGrowthRate}</strong></span>
              </p>
            </div>
            <div className='uk-width-1-3'>
              <p className='first'>
                <span className='detail-label' style={{ width: '100%', display: 'inline-block' }}>{messages.PXCorporateDetails.MostRecentlyMeasured}</span>
                <span className='detail-value'><strong>{details.productionDetails.MostRecentlyMeasured}</strong></span>
              </p>
              <p className='second'>
                <span className='detail-label' style={{ width: '100%', display: 'inline-block' }}>{messages.PXCorporateDetails.LeastRecentlyMeasured}</span>
                <span className='detail-value'><strong>{details.productionDetails.LeastRecentlyMeasured}</strong></span>
              </p>
            </div>
          </div>
        </section>
      </div>
    )
  }
}

PXProductionDetails.propTypes = {
  details: PropTypes.object,
  chartData: PropTypes.array,
  chartHeight: PropTypes.number,
  areaColor: PropTypes.string,
  stroke: PropTypes.string
}

export default injectIntl(PXProductionDetails)