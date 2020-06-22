import React from 'react'
import { injectIntl } from 'react-intl'
import { PXListing } from '../../components/_common'

class Section2 extends React.Component {
    renderListingTable() {
        const {
            intl: {
                messages
            },
            farmbyid,
        } = this.props
        let orchardbyid_filtered = []
        for (let orchardi in this.props.orchardbyid_filtered) {
            let orchard = this.props.orchardbyid_filtered[orchardi]
            let farm = farmbyid['id_' + orchard.farm]
            orchard.id = orchard.fID
            orchard.farmName = ''
            if (farm && farm.farmName) {
                orchard.farmName = farm.farmName
            }
            orchard.orchardNameComponent = <div>
                <div>
                {orchard.orchardName}
                </div>
                <div>
                {orchard.farmName}
                </div>
            </div>
            orchard.calculatedSizeComponent = orchard.calculatedSize + ' ' + messages.PXCorporateDetails.calculatedSizeMetric
            orchard.forecastProductionComponent = '--'
            if (orchard.lastBatch && orchard.lastBatch.forecastProduction){
                orchard.forecastProductionComponent = orchard.lastBatch.forecastProduction + ' ' + messages.PXCorporateDetails.forecastProductionMetric
            }
            orchardbyid_filtered.push(orchard)
        }
        console.log('orchardbyid_filtered', orchardbyid_filtered)
        const listHead = [
            {
                key: `orchardNameComponent`,
                label: messages.PXCorporateDetails.listheaderOrchardNameComponent,
                sortable: true,
                order: 'asc',
            },
            {
                key: `farmer`,
                label: messages.PXCorporateDetails.listheaderFarmer,
                sortable: true,
                order: 'asc',
            },
            {
                key: `location`,
                label: messages.PXCorporateDetails.listheaderLocation,
                sortable: true,
                order: 'asc',
            },
            {
                key: `calculatedSizeComponent`,
                label: messages.PXCorporateDetails.listheaderCalculatedSize,
                sortable: true,
                order: 'asc',
            },
            {
                key: `forecastProductionComponent`,
                label: messages.PXCorporateDetails.listheaderForecastProductionComponent,
                sortable: true,
                order: 'asc',
            },
        ]
        const ListingPX = () => <PXListing
            data={orchardbyid_filtered}
            mappingObj={listHead}
            fullTextSearch={false}
        />
        return (
            <ListingPX />
        )
    }
    render() {
        const {
            intl: {
                messages
            },
        } = this.props
        const orchardbyid_filtered = Object.values(this.props.orchardbyid_filtered)
        if (!orchardbyid_filtered || !orchardbyid_filtered.length) return ''
        console.log('Section3', this.props)

        return (
            <section >
                <div className='uk-flex uk-flex-bottom'>
                    <div className='uk-flex uk-flex-middle'>
                        <h1 className='title'>{messages.PXCorporateDetails.titleOrchards} ({orchardbyid_filtered.length || '--'})</h1>
                    </div>
                </div>
                {this.renderListingTable()}
            </section>
        )
    }
}
export default injectIntl(Section2)