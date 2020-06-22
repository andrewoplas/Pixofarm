import React from 'react'
import { withRouter, Link } from "react-router-dom";
import { injectIntl } from 'react-intl'
import { connect } from 'react-redux'

import PXListing from '../../components/_common/px-listing'
import PXProductionDetails from '../../components/_common/px-productionDetails/PXProductionDetails'
import { getLocalizedPath } from "../../utils/funcs";
import { DETAILS, HOLDINGS_LIST } from '../../utils/constants'
import { getFruitsVarieties as getFruitsVarietiesRedux } from '../../redux/corporate/actions'
import { bindActionCreators } from 'redux'
import PXDropDown from '../../components/_common/px-dropdown/px-dropdown'
import { PXMegaMenu } from '../../components/_common';


class PXCorporateDetails extends React.Component {
  constructor(props) {
    super(props)

    this.state = {
      selectedFruit: null,
      fruitsVarieties: null,
      loading: false
    }
  }

  componentDidMount() {
    this.fetchFruitsVarieties()
  }

  fetchFruitsVarieties = async () => {
    const {
      getFruitsVarieties
    } = this.props

    this.setState({ loading: true })
    const fruitsVarieties = await getFruitsVarieties()

    if (fruitsVarieties.status == 200) {
      this.setState({
        loading: false,
        fruitsVarieties: fruitsVarieties.data
      })
    }
  }

  handleFruitSelectChange = (event) => {
    this.setState({ selectedFruit: event.target.value });
  }

  render() {
    const {
      chartHeight = 100,
      stroke = 'transparent',
      areaColor = '#1B87C3',
      intl: { messages, locale },
      chartData = [
        {
          "name": "Jam fruits",
          "description": "5 Tons (45%)",
          "amt": 600
        },
        {
          "name": "Juice",
          "description": "5 Tons (45%)",
          "amt": 2400
        },
        {
          "name": "Market",
          "description": "5 Tons (45%)",
          "amt": 4300
        },
        {
          "name": "Market supply",
          "description": "5 Tons (45%)",
          "amt": 1800
        },
        {
          "name": "Premium",
          "description": "5 Tons (45%)",
          "amt": 800
        }
      ]
    } = this.props

    const holdingsActions = [
      {
        key: `edit`,
        label: messages.listing.actions.edit
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

    const listHead = [
      {
        key: `name`,
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
        key: `size`,
        label: messages.list_header.size,
        sortable: true,
        order: 'asc'
      },
      {
        key: `forecastProd`,
        label: messages.list_header.forecastProd,
        sortable: true,
        order: 'asc'
      }
    ]

    const {
      fruitsVarieties
    } = this.state
    return (
      <section className='with-bkg'>
        <section className="uk-container full-height uk-height-1-1 uk-flex uk-flex-column uk-flex-center">
          <span style={{ float: "right" }}>{fruitsVarieties && <PXDropDown data={fruitsVarieties} handleChange={this.handleFruitSelectChange} selectedValue={this.state.selectedFruit} />}</span>
          <PXMegaMenu />
          <PXProductionDetails
            details={DETAILS}
            chartData={chartData}
            chartHeight={chartHeight}
            stroke={stroke}
            areaColor={areaColor}
          />
          <section className="orchadListing" style={{ marginTop: '50px' }}>
            <h2>{messages.list_header.orchads}({HOLDINGS_LIST.length})</h2>
            <PXListing
              data={HOLDINGS_LIST}
              mappingObj={listHead}
              mappingActions={holdingsActions}
              fullTextSearch={true}
            />
          </section>
        </section>
      </section>
    )
  }
}

const mapStateToProps = state => ({})

const mapDispatchToProps = (dispatch) => bindActionCreators({
  getFruitsVarieties: getFruitsVarietiesRedux,
}, dispatch)

export default withRouter(injectIntl(connect(mapStateToProps, mapDispatchToProps)(PXCorporateDetails)))