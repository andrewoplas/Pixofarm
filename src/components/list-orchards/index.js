import React from 'react'
import { injectIntl } from 'react-intl'
import { withRouter } from 'react-router-dom';
import { PXListing } from '../../components/_common'
import moment from 'moment'
import { getLocalizedPath } from "../../utils/funcs"

class OrchardListComponent extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            orchardList: this.parseList(this.props.orchardList.data)
        }
    }

    componentDidUpdate(prevProps) {
        if (prevProps.orchardList && this.props.orchardList && prevProps.orchardList.loading && !this.props.orchardList.loading) {
            console.log('OrchardListComponent componentDidUpdate setstate', this.props, this.state)
            this.setState({
                orchardList: this.parseList(this.props.orchardList.data)
            })

        }
    }
    parseList = (list) => {
        return list.map((item) => {
            let lastMeasure = null
            if (item.lastBatch && item.lastBatch.lastMeasurements && typeof (item.lastBatch.lastMeasurements) === 'string' && item.lastBatch.lastMeasurements !== '') {
                lastMeasure = moment(item.lastBatch.lastMeasurements).format('D MMM YYYY')
            }
            let forecastProduction = null
            if (item.lastBatch && item.lastBatch.forecastProduction) {
                forecastProduction = item.lastBatch.forecastProduction
            }

            return {
                ...item,
                id: item.fID,
                lastMeasure: lastMeasure,
                forecastProduction: forecastProduction,
            }
        })
    }
    renderListingTable = (list) => {
        const {
            intl: {
                messages
            }
        } = this.props

        const listHead = [
            {
                key: `orchardName`,
                label: messages.list_header.orchadName,
                sortable: true,
                order: 'asc'
            },
            {
                key: `location`,
                label: messages.list_header.location,
                sortable: true,
                order: 'asc'
            },
            {
                key: `harvestDate`,
                label: messages.list_header.harvestDate,
                sortable: true,
                order: 'asc'
            },
            {
                key: `lastMeasure`,
                label: messages.list_header.lastMeasure,
                sortable: true,
                order: 'asc'
            },
            {
                key: `numberOfTrees`,
                label: messages.list_header.size,
                sortable: true,
                order: 'asc'
            },
            {
                key: `forecastProduction`,
                label: messages.list_header.forecastProd,
                sortable: true,
                order: 'asc'
            }
        ]

        const listActions = [
            {
                key: `details`,
                label: messages.listing.actions.details,
                callback: this.onListDetails
            },
            {
                key: `edit`,
                label: messages.listing.actions.edit,
                callback:this.onEdit
            },
            {
                key: `suspend`,
                label: messages.listing.actions.suspend
            },
            {
                key: `reassign`,
                label: messages.listing.actions.reassign
            }
        ]

        const Listing = () => <PXListing
            data={list}
            mappingObj={listHead}
            mappingActions={listActions}
            fullTextSearch={true}
        />
        return (
            <Listing />
        )
    }
    onListDetails = (parr)=>{
        console.log('onListDetails',parr)
        this.props.history.push({
            pathname: getLocalizedPath(`/orchad-details`, this.props.intl.locale),
            search: `?id=` + parr,
        })
    }
    onEdit = (parr) => {
        this.props.history.push({
          pathname: getLocalizedPath('/add-orchard', this.props.intl.locale),
          search: `?orchardId=` + parr,
        })
      }
    
    render() {
        return (
            <section className='page users full-height with-bkg'>
                <section className='uk-container'>
                    {!this.props.orchardList.loading
                        && this.renderListingTable(this.state.orchardList)
                    }
                </section>
            </section>
        )
    }
}

export default injectIntl(withRouter(OrchardListComponent))