import React from 'react'
import { injectIntl } from 'react-intl'
import moment from 'moment'

class Section3 extends React.Component {
    render() {
        const {
            intl: {
                messages
            },
            orchardbyid_filtered_size: {
                averageDiameter,
                growthRate,
                lastMeasurements,
            }
        } = this.props
        const orchardbyid_filtered = Object.values(this.props.orchardbyid_filtered)
        console.log('Section3', this.props)
        if (orchardbyid_filtered.length === 0) return ''

        // compute max averageDiameter
        let averageDiameter_max = false
        let averageDiameter_orchard = '--'
        if (averageDiameter.length > 0) {
            averageDiameter_max = averageDiameter[0]
            for (let i in averageDiameter) {
                if (averageDiameter[i] > averageDiameter_max) {
                    averageDiameter_max = averageDiameter[i]
                }
            }
            if (averageDiameter_max) averageDiameter_max = parseFloat(averageDiameter_max).toFixed(2)
        }
        if (averageDiameter_max) {
            averageDiameter_orchard = orchardbyid_filtered.filter(orchard => orchard.lastBatch && parseFloat(orchard.lastBatch.averageDiameter).toFixed(2) >= averageDiameter_max)
            if (averageDiameter_orchard.length) averageDiameter_orchard = averageDiameter_orchard[0].orchardName
        }

        // compute min averageDiameter
        let averageDiameter_min = false
        let averageDiameter_min_orchard = '--'
        if (averageDiameter.length > 0) {
            averageDiameter_min = averageDiameter[0]
            for (let i in averageDiameter) {
                if (averageDiameter[i] < averageDiameter_min) {
                    averageDiameter_min = averageDiameter[i]
                }
            }
            if (averageDiameter_min) averageDiameter_min = parseFloat(averageDiameter_min).toFixed(2)
        }
        if (averageDiameter_min) {
            averageDiameter_min_orchard = orchardbyid_filtered.filter(orchard => orchard.lastBatch && parseFloat(orchard.lastBatch.averageDiameter).toFixed(2) <= averageDiameter_min)
            if (averageDiameter_min_orchard.length) averageDiameter_min_orchard = averageDiameter_min_orchard[0].orchardName
        }

        // compute max growthRate
        let growthRate_max = false
        let growthRate_orchard = '--'
        if (growthRate.length > 0) {
            growthRate_max = growthRate[0]
            for (let i in growthRate) {
                if (growthRate[i] > growthRate_max) {
                    growthRate_max = growthRate[i]
                }
            }
            if (growthRate_max) growthRate_max = parseFloat(growthRate_max).toFixed(2)
        }
        if (growthRate_max) {
            growthRate_orchard = orchardbyid_filtered.filter(orchard => orchard.lastBatch && parseFloat(orchard.lastBatch.growthRate).toFixed(2) >= growthRate_max)
            if (growthRate_orchard.length) growthRate_orchard = growthRate_orchard[0].orchardName
        }

        // compute min growthRate
        let growthRate_min = false
        let growthRate_min_orchard = '--'
        if (growthRate.length > 0) {
            growthRate_min = growthRate[0]
            for (let i in growthRate) {
                if (growthRate[i] < growthRate_min) {
                    growthRate_min = growthRate[i]
                }
            }
            if (growthRate_min) growthRate_min = parseFloat(growthRate_min).toFixed(2)
        }
        if (growthRate_min) {
            growthRate_min_orchard = orchardbyid_filtered.filter(orchard => orchard.lastBatch && parseFloat(orchard.lastBatch.growthRate).toFixed(2) <= growthRate_min)
            if (growthRate_min_orchard.length) growthRate_min_orchard = growthRate_min_orchard[0].orchardName
        }

        // compute max lastMeasurements
        let lastMeasurements_max = false
        let lastMeasurements_orchard = '--'
        if (lastMeasurements.length > 0) {
            let lastMeasurements_max_unix = moment(lastMeasurements[0]).valueOf()
            for (let i in lastMeasurements) {
                if (moment(lastMeasurements[i]).valueOf() > lastMeasurements_max_unix) {
                    lastMeasurements_max_unix = moment(lastMeasurements[i]).valueOf()
                }
            }
            lastMeasurements_max = moment(lastMeasurements_max_unix).format('YYYY-MM-DD')
            console.log('lastMeasurements_max', lastMeasurements_max)
        }
        if (lastMeasurements_max) {
            lastMeasurements_orchard = orchardbyid_filtered.filter(orchard => orchard.lastBatch && orchard.lastBatch.lastMeasurements === lastMeasurements_max)
            if (lastMeasurements_orchard.length) lastMeasurements_orchard = lastMeasurements_orchard[0].orchardName
            if (moment().year() === moment(lastMeasurements_max).year()) {
                lastMeasurements_max = moment(lastMeasurements_max).format('DD MMM')
            } else {
                lastMeasurements_max = moment(lastMeasurements_max).format('DD MMM YY')
            }
        }

        // compute min lastMeasurements
        let lastMeasurements_min = false
        let lastMeasurements_min_orchard = '--'
        if (lastMeasurements.length > 0) {
            let lastMeasurements_min_unix = moment(lastMeasurements[0]).valueOf()
            for (let i in lastMeasurements) {
                if (moment(lastMeasurements[i]).valueOf() < lastMeasurements_min_unix) {
                    lastMeasurements_min_unix = moment(lastMeasurements[i]).valueOf()
                }
            }
            lastMeasurements_min = moment(lastMeasurements_min_unix).format('YYYY-MM-DD')
            console.log('lastMeasurements_min', lastMeasurements_min)
        }
        if (lastMeasurements_min) {
            lastMeasurements_min_orchard = orchardbyid_filtered.filter(orchard => orchard.lastBatch && orchard.lastBatch.lastMeasurements === lastMeasurements_min)
            if (lastMeasurements_min_orchard.length) lastMeasurements_min_orchard = lastMeasurements_min_orchard[0].orchardName
            if (moment().year() === moment(lastMeasurements_min).year()) {
                lastMeasurements_min = moment(lastMeasurements_min).format('DD MMM')
            } else {
                lastMeasurements_min = moment(lastMeasurements_min).format('DD MMM YY')
            }
        }

        // console.log('Section3 orchard', this.props)
        return (
            <section className='detailed-stats'>
                <div className='uk-flex uk-flex-row uk-width-1-1'>
                    <div className='uk-width-1-3 summary uk-flex-column detail-row'>
                        <div className='label'>{messages.PXCorporateDetails.BiggestFruitDiameter}:</div>
                        <div className='value'>{averageDiameter_orchard} ({averageDiameter_max || '--'} mm)</div>
                    </div>
                    <div className='uk-width-1-3 summary uk-flex-column detail-row'>
                        <div className='label'>{messages.PXCorporateDetails.HighestDailyGrowthRate}:</div>
                        <div className='value'>{growthRate_orchard} ({growthRate_max || '--'} mm)</div>
                    </div>
                    <div className='uk-width-1-3 summary uk-flex-column detail-row'>
                        <div className='label'>{messages.PXCorporateDetails.MostRecentlyMeasured}:</div>
                        <div className='value'>{lastMeasurements_orchard} ({lastMeasurements_max || '--'})</div>
                    </div>
                </div>
                <div className='uk-flex uk-flex-row uk-width-1-1'>
                    <div className='uk-width-1-3 summary uk-flex-column detail-row'>
                        <div className='label'>{messages.PXCorporateDetails.SmallestFruitDiameter}:</div>
                        <div className='value'>{averageDiameter_min_orchard} ({averageDiameter_min || '--'}) mm</div>
                    </div>
                    <div className='uk-width-1-3 summary uk-flex-column detail-row'>
                        <div className='label'>{messages.PXCorporateDetails.LowestDailyGrowthRate}:</div>
                        <div className='value'>{growthRate_min_orchard} ({growthRate_min || '--'} mm)</div>
                    </div>
                    <div className='uk-width-1-3 summary uk-flex-column detail-row'>
                        <div className='label'>{messages.PXCorporateDetails.LeastRecentlyMeasured}:</div>
                        <div className='value'>{lastMeasurements_min_orchard} ({lastMeasurements_min || '--'})</div>
                    </div>
                </div>
            </section>
        )
    }
}
export default injectIntl(Section3)