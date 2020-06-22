import React from 'react'
import { injectIntl } from 'react-intl'
import moment from 'moment'

import bloom from '../../assets/images/orchad/bloom.svg'
import harvest from '../../assets/images/orchad/harvest.svg'
import production from '../../assets/images/orchad/production.svg'

class SectionHeader extends React.Component {
    render() {
        const {
            intl: { messages, locale },
        } = this.props

        const {
            farm,
            farmer,
            isActive,
            fruit,
            location,
            calculatedSize,
            ageOfTrees,
            numberOfTrees,
            lastHarvest,
            bloomDate,
            harvestDate,
            lastBatch,
        } = this.props.orchardDetails
        let bloomDateformated = null
        if (bloomDate) {
            bloomDateformated = moment(bloomDate).format('D MMM YYYY')
        }
        let harvestDateformated = null
        if (harvestDate) {
            harvestDateformated = moment(harvestDate).format('D MMM YYYY')
        }

        let lastMeasure = null
        if (lastBatch && lastBatch.lastMeasurements && typeof (lastBatch.lastMeasurements) === 'string' && lastBatch.lastMeasurements !== '') {
            lastMeasure = moment(lastBatch.lastMeasurements).format('D MMM YYYY')
        }
        let forecastProduction = null
        if (lastBatch && lastBatch.forecastProduction) {
            forecastProduction = lastBatch.forecastProduction
        }

        let fruitTypeVariety = null
        if (fruit && fruit.type && fruit.variety) { fruitTypeVariety = fruit.type + ' ' + fruit.variety }
        return (
            <section className='heading-area'>
                <div className='title-holder uk-flex uk-flex-bottom'>
                    <div className='uk-flex uk-flex-middle'>
                        <span className='status-indicator pending'></span>
                        <h1 className='title'>Orchard Eden</h1>
                    </div>
                    <span className='status pending'>({messages.orchad.statuses.pending})</span>
                    <span className='orchad-status-action link'>Approve and activate</span>
                </div>
                <div className='uk-flex uk-flex-row uk-width-1-1 summary-holder'>
                    <div className='uk-width-1-2 summary uk-flex-column uk-column-1-2'>
                        <div className='orchad-detail detail uk-flex'>
                            <div className='label'>{messages.orchad.details.farm}:</div>
                            <div className='value link'>{farm || '--'}</div>
                        </div>
                        <div className='orchad-detail detail uk-flex'>
                            <div className='label'>{messages.orchad.details.farmer}:</div>
                            <div className='value link'>{farmer || '--'}</div>
                        </div>
                        <div className='orchad-detail detail uk-flex'>
                            <div className='label'>{messages.orchad.details.status}:</div>
                            <div className='value'>{isActive ? 'Active' : 'Inactive'}</div>
                        </div>
                        <div className='orchad-detail detail uk-flex'>
                            <div className='label'>{messages.orchad.details.fruitVariety}:</div>
                            <div className='value'>{fruitTypeVariety || '--'}</div>
                        </div>
                        <div className='orchad-detail detail uk-flex'>
                            <div className='label'>{messages.orchad.details.location}:</div>
                            <div className='value'>{location || '--'}</div>
                        </div>
                        <div className='orchad-detail detail uk-flex'>
                            <div className='label'>{messages.orchad.details.orchadSize}:</div>
                            <div className='value'>{calculatedSize || '--'}</div>
                        </div>
                        <div className='orchad-detail detail uk-flex'>
                            <div className='label'>{messages.orchad.details.treesAge}:</div>
                            <div className='value'>{ageOfTrees || '--'}</div>
                        </div>
                        <div className='orchad-detail detail uk-flex'>
                            <div className='label'>{messages.orchad.details.totalTrees}:</div>
                            <div className='value'>{numberOfTrees || '--'}</div>
                        </div>
                        <div className='orchad-detail detail uk-flex'>
                            <div className='label'>{messages.orchad.details.lastProd}:</div>
                            <div className='value'>{lastHarvest || '--'}</div>
                        </div>
                    </div>
                    <div className='uk-width-1-2 uk-flex uk-text-center uk-flex-between'>
                        <div className='orchad-dates uk-width-1-3'>
                            <div className='icon'><img src={bloom} /></div>
                            <div className='label'>{messages.orchad.details.firstBloom}</div>
                            <div className='value'>{bloomDateformated || '--'}</div>
                        </div>
                        <div className='orchad-dates uk-width-1-3'>
                            <div className='icon'><img src={harvest} /></div>
                            <div className='label'>{messages.orchad.details.anticipatedDate}</div>
                            <div className='value'>{harvestDateformated || '--'}</div>
                        </div>
                        <div className='orchad-dates uk-width-1-3'>
                            <div className='icon'><img src={production} /></div>
                            <div className='label'>{messages.orchad.details.anticipatedProd}</div>
                            <div className='value'>{forecastProduction||'--'}</div>
                        </div>
                    </div>
                </div>
            </section>
        )
    }
}

export default injectIntl(SectionHeader)