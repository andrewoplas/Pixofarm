import React from 'react'
import { withRouter } from 'react-router-dom'
import { injectIntl } from 'react-intl'
import { connect } from 'react-redux'
import PXSearchFarmForm from '../../components/search-farm'
import * as actionsFarm from "../../redux/farm/actions"

class PXSearchFarm extends React.Component {
  componentDidMount() {
    this.props.groupsFarmsGet()
  }



  render() {
    const {
      intl: {
        messages, locale
      },
    } = this.props
    return (
      <section className="full-screen">
        <section className='full-height uk-height-1-1 uk-flex uk-flex-column uk-flex-center'>
          <div className='uk-width-1-1 uk-height-1-1'>
            <PXSearchFarmForm
              groupsFarms={this.props.groupsFarms}
            />
          </div>
        </section>
      </section>
    )
  }
}

const mapStateToProps = state => {
  return {
    groupsFarms: state.farm.groupsFarms,
  }
}

const mapDispatchToProps = dispatch => ({
  
  groupsFarmsGet: data => dispatch(actionsFarm.groupsFarmsGet(data)),
})

export default withRouter(injectIntl(connect(mapStateToProps, mapDispatchToProps)(PXSearchFarm)))