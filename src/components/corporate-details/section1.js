import React from 'react'
import { injectIntl } from 'react-intl'

class Section1 extends React.Component {
    render() {
        const {
            intl: {
                messages
            },
            filtertype,
            filtervariety_text,
            orchardbyid_filtered_size: {
                calculatedSize,
                predictedDiameter,
                forecastProduction,
            }
        } = this.props
        const orchardbyid_filtered = Object.values(this.props.orchardbyid_filtered)
        // console.log('calculatedSize', calculatedSize, this.props)
        if (orchardbyid_filtered.length === 0) return ''

        let calculatedSize_sum = 0;
        if (calculatedSize.length > 0) {
            for (let i in calculatedSize) {
                calculatedSize_sum += calculatedSize[i]
            }
        }
        let predictedDiameter_avg = 0;
        if (predictedDiameter.length > 0) {
            for (let i in predictedDiameter) {
                predictedDiameter_avg += predictedDiameter[i]
            }
            predictedDiameter_avg = parseFloat(predictedDiameter_avg / predictedDiameter.length).toFixed(2)
        }
        let forecastProduction_avg = 0;
        if (forecastProduction.length > 0) {
            for (let i in forecastProduction) {
                forecastProduction_avg += forecastProduction[i]
            }
            forecastProduction_avg = parseFloat(forecastProduction_avg / forecastProduction.length).toFixed(2)
        }
        return (
            <section >
                <div className='uk-flex uk-flex-bottom'>
                    <div className='uk-flex uk-flex-middle'>
                        <h1 className='title'>{filtervariety_text} ({filtertype})</h1>
                    </div>
                </div>
                <div className='uk-flex uk-flex-row uk-width-1-1 quick-details'>
                    <div className='uk-width-1-4 summary uk-flex-column'>
                        <div className='label'>{messages.PXCorporateDetails.totalOrchards}:</div>
                        <div className='value'>{orchardbyid_filtered.length || '--'}</div>
                    </div>
                    <div className='uk-width-1-4 summary uk-flex-column'>
                        <div className='label'>{messages.PXCorporateDetails.hectares}:</div>
                        <div className='value'>{calculatedSize_sum || '--'}</div>
                    </div>
                    <div className='uk-width-1-4 summary uk-flex-column'>
                        <div className='label'>{messages.PXCorporateDetails.predictedDiameter}:</div>
                        <div className='value'>{predictedDiameter_avg || '--'} mm</div>
                    </div>
                    <div className='uk-width-1-4 summary uk-flex-column'>
                        <div className='label'>{messages.PXCorporateDetails.forecastProduction}:</div>
                        <div className='value'>{forecastProduction_avg || '--'} Tons</div>
                    </div>
                </div>
            </section>
        )
    }
}
export default injectIntl(Section1)